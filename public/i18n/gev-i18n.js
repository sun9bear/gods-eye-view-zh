/**
 * God's Eye View — 多语言界面运行时翻译层
 * ======================================
 *
 * 设计原则：**尽量不改写原有业务逻辑**；本分支在 `src/` 侧只加了少量可选翻译钩子（worldOverlay.js / frames.js / detectionDraw.js），无翻译全局时原样返回。
 * 所有翻译都在运行时对 DOM 做，因此：
 *   - 上游更新不会与本文件冲突
 *   - 项目的 305 个测试文件（大量断言精确英文串）在本分支下仍通过——但**测试通过不等于所有运行时行为与英文版逐位一致**
 *   - 任意语言之间可随时互切，随时回到英文原文
 *
 * 覆盖范围：
 *   ✅ 所有 DOM 文本节点
 *   ✅ title / aria-label / aria-description / placeholder 属性
 *   ✅ 动态生成的面板（MutationObserver 持续监听）
 *   ✅ canvas 绘制文案（通过 window.GEV_I18N.t() 暴露纯函数，见 README）
 *
 * 两个必须规避的坑：
 *   1. Material Symbols 图标字体靠**文字连字**渲染。图标元素里是字面文本
 *      "layers_clear"、"radio"、"public" 等，一旦被翻译，图标会变成一个词。
 *      → 跳过 class 含 material-symbols / material-icons 的子树。
 *   2. SVG 内联 <style> 的 CSS 文本也会被当成文本节点。
 *      → 整个 svg 子树跳过。
 *
 * 多语言的两个核心机制：
 *   - **原文快照**（ORIGINAL）：每个节点第一次被翻译前，先把英文原文存进 WeakMap。
 *     之后无论切到哪种语言，都从这份英文原文重新翻译，因此语言之间可以任意跳转。
 *   - **已写值追踪**（APPLIED）：应用会持续重写 HUD 这类高频文本。若节点当前值
 *     不等于我们上次写入的值，说明是应用改写的 → 用当前值刷新原文快照。
 *     没有这一步，切语言时会还原出过期的旧文案。
 */

import { LANGUAGE_LIST, BY_TAG, resolveLang } from './dicts/index.js';

const STORE_KEY = 'gev.lang';
const DEFAULT_LANG = 'zh-Hans';
const SKIP_CLASS = /material-symbols|material-icons/;

/** 宽字符探测：判断一段文本里是否已经含中日韩字符（反向还原时用） */
const CJK_RE = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7a3\uf900-\ufaff]/;

/* ---------------------------------------------------------------- 语言状态 */

function readInitialLang() {
  try {
    const q = resolveLang(new URLSearchParams(location.search).get('lang'));
    if (q) return q;
    const stored = resolveLang(localStorage.getItem(STORE_KEY));
    if (stored) return stored;
  } catch {
    /* localStorage 可能被禁用，忽略 */
  }
  const fallback = resolveLang(DEFAULT_LANG);
  return fallback || 'en';
}

let lang = readInitialLang();

/**
 * 当前语言的**已编译**查表结构。
 * 换语言时整体重建，避免每次查表都判空。
 */
let TABLES = null;

function compile(tag) {
  const mod = BY_TAG.get(tag);
  if (!mod) {
    return { dict: Object.create(null), rules: [], partial: [] };
  }
  const { dict, rules, partial } = mod;
  return { dict, rules, partial };
}

/**
 * 跨语言反向还原池：**所有**语言的译文都收进来。
 *
 * 为什么需要：极少数情况下应用会把我们翻译过的文本读回 DOM（而不是重新构造英文），
 * 此时原文快照里存的会是译文而不是英文。要还原就必须认识所有语言的写法，
 * 因为污染发生时激活的是哪种语言并不确定。
 */
const REVERSE_ALL = (() => {
  const exact = new Map();
  const partial = [];
  const push = (tr, en) => {
    if (!tr || en === undefined || tr === en) return;
    if (!exact.has(tr)) exact.set(tr, en);
    if (tr.length >= 2) partial.push([tr, en]);
  };
  for (const m of BY_TAG.values()) {
    for (const [en, tr] of Object.entries(m.dict)) push(tr, en);
    for (const [en, tr] of m.partial) push(tr, en);
  }
  partial.sort((a, b) => b[0].length - a[0].length);
  return { exact, partial };
})();

/* ------------------------------------------------------------------ 工具 */

/** 是否应该跳过这个元素（及其子树） */
function shouldSkip(el) {
  if (!el || el.nodeType !== 1) return false;
  if (el.hasAttribute('data-gev-noi18n')) return true;
  const tag = el.tagName;
  if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return true;
  if (tag === 'svg' || tag === 'SVG') return true;
  const cls = typeof el.className === 'string' ? el.className : '';
  if (cls && SKIP_CLASS.test(cls)) return true;
  return false;
}

/** 向上检查祖先链，任一命中就跳过 */
function hasSkippedAncestor(node) {
  let el = node.nodeType === 1 ? node : node.parentElement;
  while (el) {
    if (shouldSkip(el)) return true;
    el = el.parentElement;
  }
  return false;
}

/**
 * `data-gev-i18n-skip-text`：只跳过**文本节点**，属性（title / aria-label）
 * 照常翻译。
 *
 * 为什么需要它：引擎按文本串匹配，同一个英文串在两处含义不同时无法区分。
 * 实例——路由芯片的可视标签是 `CLEAR`（= 清除航线），机舱天气读数也是
 * `CLEAR`（= 晴）。给全局加 `CLEAR` 键会把芯片变成「晴」（明显错误），
 * 不给则天气读数永远是英文。用处更小的那一侧显式让开，由该元素自己
 * 承担未翻译的可视标签；它的 title 仍然会被翻译，所以按钮依然可读。
 *
 * 与 `data-gev-noi18n` 的区别：后者连属性一起跳过整棵子树，用于图标字体
 * 这类完全不该碰的元素。
 */
function hasTextSkipAncestor(node) {
  let el = node.nodeType === 1 ? node : node.parentElement;
  while (el) {
    if (el.hasAttribute && el.hasAttribute('data-gev-i18n-skip-text')) return true;
    el = el.parentElement;
  }
  return false;
}

const SKIP_ATTRS = new Set(['title', 'aria-label', 'aria-description', 'placeholder', 'data-tooltip']);

/* ------------------------------------------------- 片段替换的边界保护 */

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const guardedMatcherCache = new Map();

/**
 * 片段/反向片段替换的匹配器。
 *
 * **纯拉丁裸词键必须加词边界保护**，否则会切进更长的单词里。
 * 实测踩到的两个坑（都是这条规则漏了）：
 *   - `'EL'` 命中 `GD**EL**T` → `GD仰角T Project`
 *   - `'NORMAL'` 命中 `**NORMAL**IZED` → `正常IZED`
 *
 * 判定标准是**键里有没有自带的边界字符**，而不是键的长度——
 * 最初只给 ≤3 字符的键加保护，结果 NORMALIZED 照样被切。
 * 带空格或标点的键（`'ALT: '`、`'KM |'`、`'NEAR '`）本身已含边界，
 * 直接走朴素的 split/join 更快。
 *
 * 注意边界只排除**字母**、不排除数字：这样 `250KM`、`4X3KM` 里的 `KM`
 * 仍能被正常替换（前面是数字）。
 *
 * @param {string} key
 * @returns {RegExp|null} null 表示不需要保护
 */
function partialMatcher(key) {
  if (!/^[A-Za-z]+$/.test(key)) return null;
  let re = guardedMatcherCache.get(key);
  if (!re) {
    re = new RegExp(`(?<![A-Za-z])${escapeRe(key)}(?![A-Za-z])`, 'g');
    guardedMatcherCache.set(key, re);
  }
  return re;
}

/** 按需选匹配方式替换一次，返回是否真的变了 */
function replaceSegment(out, key, value) {
  const re = partialMatcher(key);
  return re ? out.replace(re, value) : out.split(key).join(value);
}

/* -------------------------------------------------------------- 翻译核心 */

/** 整串精确命中 */
function exact(s) {
  const hit = TABLES.dict[s];
  return hit === undefined ? null : hit;
}

/** 正则规则：处理动态串（如 "CelesTrak · 59s ago"） */
function byRule(s) {
  for (const [re, out] of TABLES.rules) {
    const m = s.match(re);
    if (m) return typeof out === 'function' ? out(m) : s.replace(re, out);
  }
  return null;
}

/** 分段：把 "A · B" 里每一段单独翻译，任一段变了就采用结果 */
function bySegments(s) {
  if (!s.includes(' · ')) return null;
  const parts = s.split(' · ');
  let changed = false;
  const out = parts.map((p) => {
    const hit = exact(p) || byRule(p);
    if (hit && hit !== p) {
      changed = true;
      return hit;
    }
    return p;
  });
  return changed ? out.join(' · ') : null;
}

/** 局部替换：长句里嵌的动态片段（如 HUD 遥测行） */
function byPartial(s) {
  let out = s;
  let changed = false;
  for (const [en, tr] of TABLES.partial) {
    if (!out.includes(en)) continue;
    const next = replaceSegment(out, en, tr);
    if (next !== out) {
      out = next;
      changed = true;
    }
  }
  return changed ? out : null;
}

/**
 * 把一条**英文原文**翻译成当前语言。
 * 返回 null 表示当前语言没有对应译文（调用方应回退到英文原文）。
 * 顺序很关键：精确 → 规则 → 分段 → 局部。
 */
function translateEnglish(raw) {
  const s = raw.trim();
  if (!s) return null;
  // 纯数字 / 纯符号 / 纯空白 一律跳过，省掉绝大部分无用查询
  if (!/[A-Za-z]/.test(s)) return null;
  if (s.length > 600) return null;

  const hit = exact(s) || byRule(s) || bySegments(s) || byPartial(s);
  if (!hit || hit === s) return null;

  // 保留原有首尾空白
  const lead = raw.match(/^\s*/)[0];
  const tail = raw.match(/\s*$/)[0];
  return lead + hit + tail;
}

/**
 * 反向还原：把可能被污染成译文的字符串还原成英文。
 * 只在原文快照不可信时兜底使用。
 */
function reverseToEnglish(s) {
  const hit = REVERSE_ALL.exact.get(s);
  if (hit) return hit;

  let out = s;
  let changed = false;
  for (const [tr, en] of REVERSE_ALL.partial) {
    if (!out.includes(tr)) continue;
    // 反向方向同样要防裸词短键切进更长的单词（如 'km' 命中 'kmh'）
    const next = replaceSegment(out, tr, en);
    if (next !== out) {
      out = next;
      changed = true;
    }
  }
  if (changed && out !== s) return out;

  if (s.includes(' · ')) {
    const parts = s.split(' · ');
    let seg = false;
    const mapped = parts.map((p) => {
      const t = REVERSE_ALL.exact.get(p);
      if (t && t !== p) {
        seg = true;
        return t;
      }
      return p;
    });
    if (seg) return mapped.join(' · ');
  }
  return null;
}

/* ------------------------------------------------------- 纯字符串翻译 API */

/**
 * canvas 侧按帧调用，且同一串会反复出现（呼号、卡片标题、单位后缀…）。
 * 没有缓存时每帧要给每条候选跑十几条正则 + 分段 + 片段扫描，不值得。
 * 加一层带上限的字典缓存，换语言时整体清空。
 */
const T_CACHE = new Map();
const T_CACHE_MAX = 4000;

/**
 * 翻译任意字符串，**不碰 DOM**。供 canvas 等拿不到 DOM 节点的绘制路径调用。
 *
 * 约定：
 *   - 当前语言是英文 → 原样返回
 *   - 命中失败 → 原样返回（宁可显示英文，也不显示错的译文）
 *   - 返回值一定是字符串，且已去掉首尾空白（canvas 排版不需要缩进）
 *
 * @param {unknown} value
 * @returns {string}
 */
function t(value) {
  const text = String(value ?? '');
  if (!text) return text;
  if (lang === 'en') return text;
  const trimmed = text.trim();
  if (!trimmed) return text;

  const cached = T_CACHE.get(trimmed);
  if (cached !== undefined) return cached;

  const out = translateEnglish(trimmed);
  const result = out === null ? trimmed : out.trim();
  if (T_CACHE.size >= T_CACHE_MAX) T_CACHE.clear();
  T_CACHE.set(trimmed, result);
  return result;
}

/* ------------------------------------------------------------ DOM 处理 */

/** 英文原文快照 */
const ORIGINAL = new WeakMap();
/** 我们最后一次写进该节点的值，用于识别「应用改写了」 */
const APPLIED = new WeakMap();

/**
 * 把**英文原文**渲染成当前语言应显示的文本。
 * 英文模式下就是原文本身；若原文被污染成译文则反向还原。
 */
function render(source) {
  if (lang === 'en') {
    if (!CJK_RE.test(source)) return source;
    const trimmed = source.trim();
    const back = reverseToEnglish(trimmed);
    /* 用函数替换而非字符串替换：译文里若含 $&/$`/$' 等模式串，字符串形式
       会被 String.replace 特殊解释（字典确实收过带 $ 的词条）。 */
    return back === null ? source : source.replace(trimmed, () => back);
  }
  const out = translateEnglish(source);
  return out === null ? source : out;
}

/**
 * 为没有快照的节点建立英文原文。
 *
 * 为什么要在这里做反向还原：极少数情况下应用会**新建**一个节点，并把已经
 * 被我们翻译过的文本写进去（而不是重新构造英文）。这种节点没有快照，若直接
 * 拿当前值当原文，就会在切换语言时把上一门语言的残留带过去。
 * 实测案例：日文界面里 HUD 摘要行残留了简体的「正常」。
 *
 * @param {string} current 节点当前值
 * @returns {string} 可用的英文原文
 */
function seedOriginal(current) {
  if (!CJK_RE.test(current)) return current;
  const trimmed = current.trim();
  if (!trimmed) return current;
  const back = reverseToEnglish(trimmed);
  return back === null ? current : current.replace(trimmed, () => back);
}

/** 决定一个文本节点当前应显示什么，并落地 */
function applyTextNode(node) {
  if (hasSkippedAncestor(node)) return;
  if (hasTextSkipAncestor(node)) {
    // 属性可能是运行期才加上的，此前若已翻译过，这里退回原文快照
    const orig = ORIGINAL.get(node);
    if (orig !== undefined && node.nodeValue !== orig) {
      node.nodeValue = orig;
      APPLIED.set(node, orig);
    }
    return;
  }
  const current = node.nodeValue;
  if (!current) return;

  // 应用改写了这个节点（当前值 ≠ 我们上次写的值）→ 当前值就是新的原文。
  // 少了这一步，切语言时会拿过期的旧快照去翻译。
  const applied = APPLIED.get(node);
  if (applied !== undefined && applied !== current) {
    ORIGINAL.set(node, seedOriginal(current));
    APPLIED.delete(node);
  }
  if (!ORIGINAL.has(node)) ORIGINAL.set(node, seedOriginal(current));

  const target = render(ORIGINAL.get(node));
  if (node.nodeValue !== target) node.nodeValue = target;
  APPLIED.set(node, target);
}

function handleAttrs(el) {
  if (hasSkippedAncestor(el)) return;
  for (const name of SKIP_ATTRS) {
    if (!el.hasAttribute || !el.hasAttribute(name)) continue;
    const current = el.getAttribute(name);
    if (!current) continue;
    const origKey = `gev:orig:${name}`;
    const appliedKey = `gev:applied:${name}`;

    const applied = el.getAttribute(appliedKey);
    if (applied !== null && applied !== current) {
      // 应用改写了这个属性 → 当前值就是新的原文。
      // 必须过 seedOriginal：应用会把**我们翻译过的文本**拼进新串再写回来
      // （实测：tooltip 变成 "Expand 定位"），不过反向还原就会把译文当原文存下来。
      el.setAttribute(origKey, seedOriginal(current));
      el.removeAttribute(appliedKey);
    }

    // 原文快照：不存在时建立，并过 seedOriginal 反向还原兜底
    if (!el.hasAttribute(origKey)) el.setAttribute(origKey, seedOriginal(current));
    const source = el.getAttribute(origKey);

    if (lang === 'en') {
      if (current !== source) el.setAttribute(name, source);
      el.setAttribute(appliedKey, source);
      continue;
    }

    const out = translateEnglish(source);
    const target = out === null ? source : out;
    if (current !== target) el.setAttribute(name, target);
    el.setAttribute(appliedKey, target);
  }
}

function walk(root) {
  if (!root || hasSkippedAncestor(root)) return;
  if (root.nodeType === 3) {
    applyTextNode(root);
    return;
  }
  if (root.nodeType !== 1) return;
  if (shouldSkip(root)) return;
  handleAttrs(root);

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode(n) {
      if (n.nodeType === 1 && shouldSkip(n)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let n = walker.nextNode();
  while (n) {
    if (n.nodeType === 3) applyTextNode(n);
    else handleAttrs(n);
    n = walker.nextNode();
  }
}

/* --------------------------------------------------------- 变更监听 */

let queued = new Set();
let scheduled = false;

function flush() {
  scheduled = false;
  const batch = queued;
  queued = new Set();
  for (const n of batch) {
    if (!n.isConnected) continue;
    if (n.nodeType === 3) applyTextNode(n);
    else walk(n);
  }
  if (!document.getElementById('gev-language-select')?.dataset.initialized) syncLanguageSelect();
}

function enqueue(node) {
  queued.add(node);
  if (scheduled) return;
  scheduled = true;
  // 用 microtask 合并同一帧内的密集写入（HUD 遥测每秒会更新很多次）
  queueMicrotask(flush);
}

const observer = new MutationObserver((records) => {
  for (const r of records) {
    if (r.type === 'characterData') {
      enqueue(r.target);
    } else if (r.type === 'childList') {
      for (const n of r.addedNodes) enqueue(n);
    } else if (r.type === 'attributes') {
      if (SKIP_ATTRS.has(r.attributeName)) enqueue(r.target);
    }
  }
});

function startObserving() {
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: [...SKIP_ATTRS],
  });
}

/* ------------------------------------------------------------- 对外 API */

const languageLabels = { en: 'Language', 'zh-Hans': '语言', 'zh-Hant': '語言', ja: '言語', ko: '언어' };
function syncLanguageSelect() {
  const select = document.getElementById('gev-language-select');
  if (!select) return;
  if (!select.dataset.initialized) {
    select.dataset.initialized = 'true';
    for (const item of LANGUAGE_LIST) {
      const option = document.createElement('option');
      option.value = item.tag;
      option.lang = item.tag;
      option.textContent = item.label;
      select.append(option);
    }
    select.addEventListener('change', () => setLang(select.value));
  }
  select.value = lang;
  select.setAttribute('aria-label', languageLabels[lang] || 'Language');
  select.title = `${languageLabels[lang] || 'Language'} / Ctrl+Alt+L`;
}

function applyAll() {
  syncLanguageSelect();
  if (document.body) walk(document.body);
  if (document.documentElement) document.documentElement.setAttribute('lang', lang);
}

function setLang(next) {
  const resolved = resolveLang(next);
  if (!resolved) return lang;
  if (resolved === lang) return lang;
  lang = resolved;
  TABLES = compile(lang === 'en' ? null : lang);
  T_CACHE.clear();
  try {
    localStorage.setItem(STORE_KEY, lang);
  } catch {
    /* 忽略 */
  }
  // 全量重走一遍即可：每个节点都从 ORIGINAL 里的英文原文重新渲染，
  // 所以任意语言之间互切都成立（简体 → 繁體 → 英文 → 简体…）
  applyAll();
  window.dispatchEvent(new CustomEvent('gev:language-changed', { detail: { lang } }));
  return lang;
}

function cycle(step = 1) {
  const tags = LANGUAGE_LIST.map((l) => l.tag);
  const i = tags.indexOf(lang);
  const next = tags[(((i < 0 ? 0 : i) + step) % tags.length + tags.length) % tags.length];
  return setLang(next);
}

TABLES = compile(lang === 'en' ? null : lang);

window.GEV_I18N = {
  get current() {
    return lang;
  },
  set: setLang,
  /** 在已注册语言之间轮换；Ctrl+Alt+L 用的就是这个 */
  cycle,
  toggle: () => cycle(1),
  /** 可用语言（含隐含的英文，排最前） */
  languages: LANGUAGE_LIST,
  /** 重新全量扫描（手动触发，一般用不到） */
  refresh: applyAll,
  /**
   * 纯字符串翻译，供 canvas 等非 DOM 绘制路径调用。
   * src/ 侧按 `globalThis.GEV_I18N?.t?.(s) ?? s` 的写法使用，
   * 未加载时会话不受影响，单元测试也不受影响（Node 里没有这个全局）。
   */
  t,
  /** 统计字典规模，方便核对 */
  stats: () => ({
    lang,
    exact: TABLES ? Object.keys(TABLES.dict).length : 0,
    rules: TABLES ? TABLES.rules.length : 0,
    partial: TABLES ? TABLES.partial.length : 0,
  }),
};

/* --------------------------------------------------------------- 启动 */

function boot() {
  startObserving();
  applyAll();
  // 首屏模板注入可能晚于 DOMContentLoaded，补两次晚扫
  setTimeout(applyAll, 400);
  setTimeout(applyAll, 1500);
}

// Ctrl+Alt+L 轮换语言
window.addEventListener(
  'keydown',
  (e) => {
    if (e.ctrlKey && e.altKey && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault();
      cycle(1);
    }
  },
  true,
);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
