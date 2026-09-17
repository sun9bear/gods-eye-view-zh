/**
 * i18n dictionary auditor — 字典审校器
 * ====================================
 *
 * 逐条读字典看不出问题的地方，交给机器查。五类**客观可判定**的问题：
 *
 *   1. 术语撞车   —— 多个英文键译成同一个词。读者无法区分两个不同的 UI 概念。
 *   2. 与中文雷同 —— 日/韩译文与 zh-Hans 的译文逐字相同。日文和韩文不可能
 *                    恰好与中文用同一串汉字，撞上就是「从中文复制过来忘了改」。
 *                    这是最有效的漏译检测——不需要字符表。
 *   3. 异文字混入 —— 日文字典里出现简体专有字，或韩文字典里出现汉字/假名。
 *                    肉眼极难发现（「級」vs「级」只差一笔），但一定是错的。
 *   4. 文体混杂   —— 同一语言的句末体（日：です・ます / だ、韩：합니다 / 해요 / 다）
 *                    分布异常。
 *   5. 标点不一致 —— 全角/半角冒号、分号、括号在同一份字典里混用。
 *
 * 它**不判断译文好坏**——那是人（或母语者）的事。它只把「确定有问题」的挑出来。
 *
 * 用法：
 *   npm run i18n:dicts           # 写 i18n-dicts-report.json
 *   npm run i18n:dicts -- --print  # 同时打印到 stdout
 */

import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const DICTS_DIR = join(HERE, '..', 'public', 'i18n', 'dicts');
const OUT = join(HERE, '..', 'i18n-dicts-report.json');

/**
 * 载入一份字典。
 *
 * 必须走 `pathToFileURL`：Windows 上的 `import('F:\\...')` 会被 ESM loader
 * 以 `ERR_UNSUPPORTED_ESM_URL_SCHEME` 拒绝（只接受 file / data / node 协议），
 * 传绝对路径在 macOS/Linux 上能跑、在 Windows 上必挂。
 */
const loadDict = (name) => import(pathToFileURL(join(DICTS_DIR, name)).href);

/**
 * 简体中文**专有**字：该字形只在简体里存在，日文新字体不是这么写的。
 *
 * 用途：日文字典里出现这些字 → 几乎必然是从 zh-Hans 复制粘贴时漏改。
 *
 * 收录标准极严。凡是中日同形的字一律**不进表**——区/会/体/数/来/点/画/面/
 * 示/信/号/注/得/与/参/像/摸/拖/旋/斜/放/比/毛/民/里/重/量/配/酒/酸/醋/醒/
 * 身/道/迎/返/郊/部/都/追/超/越/距/跟/跨/跳/踏/踪/表/装/触/誉/警/香/食/高/
 * 灯/炉/雁/雄/雅/集/雇/雕/每… 这些混进来会满屏误报，工具就废了。
 */
const SIMPLIFIED_ONLY = new Set(
  // 名词与技术词
  '级实时间题应开关图层据电视话车马龙书长门问际边围备态标确认识让这个东极类种样经线结语词译释获转换输软网连显隐击缩倾产广严丰丽为举亚亿仅从仓仪价优伟传伤侧势动劳务办团园圆场坏块坚复头夹夺妇孙审宫宽宾对寻导尔岁岛岭币师帐带帮庆库废异弃张归录彻' +
    // 心理与动作
    '忆忧怀总恶恼悬惊惯惩愿战户扑执扩扫扬扰护报拟拥择挂挥损插揭搁摄摆摇摊撑效敌无晓暂术机杀杂权构枪档检欢步历毁每毕' +
    // 水与自然
    '气汉汤沟泪泽泛测济浑浓涛涨渐渔渗渴游滚满滤滥滨滩灵灾烧热爱' +
    // 言字旁（技术文档高频）
    '设计订讨训议讯记讲许论访证评识诉诊试询该详误诱诸诺读课谁调谈谋谜谢谦谨谱' +
    // 纟与贝（财务、列表）
    '积稳红约纪纯纳纵纷纸纹纺织练组细绍终绝统继续维绵绿缓编缘缴罚罗职联' +
    // 身体与衣物
    '肠肤肿胀胁脏脸腾营蓝冻补衬裤' +
    // 见与贝
    '觉观规览负贡财责贤败货质贩贪贫购贯贵贷贸费贺贼资赌赏赔赚赞赠' +
    // 走之与车（导航类，本项目高频）
    '赵赶趋离跃轨轮轻载较辅辆辈辉辑辖辩达迁过迈运还进远违迟邮邻' +
    // 金旁（一律差异：简体钅 vs 日文金）
    '鉴针钉钓钟钢钥钩钱铁铃铅铜银铸铺链销锁锋锐错锚锡锤锦键锯镀镇镜' +
    // 页与风
    '难顶顺须预领颜风飞' +
    // 食与驾
    '饭饮饰饱馆馒驱驻驾骑骗' +
    // 鱼鸟与其余
    '鱼鲜鸟鸡鸣鸭鹤鹰齐齿龄龟黑默'
);

/** 日文假名（平假名 + 片假名）。出现在韩文字典里是错误。 */
const KANA_RE = /[\u3041-\u309F\u30A0-\u30FF]/;

/** 汉字（CJK 统一表意文字）。韩文正文里通常不写汉字，出现即可疑。 */
const HAN_RE = /[\u4E00-\u9FFF]/;

/** 句末文体分类规则。顺序即优先级。 */
const MOOD_RULES = {
  ja: [
    ['です・ます体', /(?:です|ます|ください|ましょう|ません)[。！？]?$/],
    ['だ・である体', /(?:だ|である|する|した|ない|ある)[。！？]?$/],
  ],
  ko: [
    ['합니다体', /(?:합니다|입니다|습니다|됩니다|십시오)[.。!?]?$/],
    ['해요体', /(?:하세요|해요|예요|이에요|어요|아요)[.。!?]?$/],
    ['한다体', /(?:한다|이다|된다|있다|없다)[.。!?]?$/],
  ],
};

const MIN_LEN_FOR_MOOD = 8;

function classifyMood(lang, value) {
  const rules = MOOD_RULES[lang];
  if (!rules) return null;
  for (const [name, re] of rules) if (re.test(value)) return name;
  return null;
}

/** 键值对，排除「键与值相同」的恒等映射 */
function pairs(dict) {
  return Object.entries(dict).filter(([k, v]) => typeof v === 'string' && v && k !== v);
}

function auditLocale(mod, lang, zhDict) {
  const { dict, rules, partial } = mod;
  const values = pairs(dict).map(([, v]) => v);
  const findings = {
    collisions: [],
    sameAsChinese: [],
    foreignScript: [],
    mood: {},
    punctuation: {},
    identical: Object.entries(dict)
      .filter(([k, v]) => k === v)
      .map(([k]) => k),
    ruleCount: rules.length,
    partialCount: partial.length,
  };

  // --- 1. 术语撞车 -----------------------------------------------------
  const byValue = new Map();
  for (const [key, value] of pairs(dict)) {
    if (!byValue.has(value)) byValue.set(value, []);
    byValue.get(value).push(key);
  }
  for (const [value, keys] of byValue) {
    if (keys.length < 2) continue;
    // 大小写/标点等价的键不算撞车（上游确实可能各存一份）
    const normalized = new Set(keys.map((k) => k.toLowerCase().replace(/[^a-z0-9]/g, '')));
    if (normalized.size < 2) continue;
    findings.collisions.push({ value, keys: keys.sort() });
  }
  findings.collisions.sort((a, b) => b.keys.length - a.keys.length);

  // --- 2. 与中文译文逐字相同 -------------------------------------------
  if (zhDict) {
    for (const [key, value] of pairs(dict)) {
      const zh = zhDict[key];
      if (typeof zh !== 'string' || zh !== value) continue;
      // 纯 ASCII/数字/符号的译文相同是正常的（品牌、单位、代码）
      if (!HAN_RE.test(value) && !KANA_RE.test(value)) continue;
      findings.sameAsChinese.push({ key, value });
    }
  }

  // --- 3. 异文字混入 ---------------------------------------------------
  for (const [key, value] of pairs(dict)) {
    const bad = [];
    if (lang === 'ja') {
      for (const ch of value) if (SIMPLIFIED_ONLY.has(ch)) bad.push(ch);
    } else if (lang === 'ko') {
      bad.push(...(value.match(new RegExp(KANA_RE, 'g')) || []));
      bad.push(...(value.match(new RegExp(HAN_RE, 'g')) || []));
    }
    if (bad.length) {
      findings.foreignScript.push({ key, value, chars: [...new Set(bad)].join(' ') });
    }
  }

  // --- 4. 文体分布 -----------------------------------------------------
  for (const value of values) {
    if (value.length < MIN_LEN_FOR_MOOD) continue;
    const mood = classifyMood(lang, value);
    if (mood) findings.mood[mood] = (findings.mood[mood] || 0) + 1;
  }

  // --- 5. 标点统计 -----------------------------------------------------
  const count = (re) => values.filter((v) => re.test(v)).length;
  findings.punctuation = {
    全角冒号: count(/：/),
    半角冒号: count(/:\s/),
    全角分号: count(/；/),
    半角分号: count(/;\s/),
    全角括号: count(/（/),
    半角括号: count(/\(/),
    顿号: count(/、/),
    中文逗号: count(/，/),
  };

  return findings;
}

const zhHans = await loadDict('zh-Hans.js');
const mods = [
  ['zh-Hans', zhHans, null],
  ['zh-Hant', await loadDict('zh-Hant.js'), null],
  ['ja', await loadDict('ja.js'), zhHans.dict],
  ['ko', await loadDict('ko.js'), zhHans.dict],
];

const report = { generatedAt: new Date().toISOString(), locales: {} };

for (const [lang, mod, zhDict] of mods) {
  const auditLang = lang.startsWith('zh') ? 'zh' : lang;
  report.locales[lang] = {
    entries: Object.keys(mod.dict).length,
    ...auditLocale(mod, auditLang, zhDict),
  };
}

writeFileSync(OUT, JSON.stringify(report, null, 2) + '\n', 'utf8');

if (process.argv.includes('--print')) {
  for (const [lang, f] of Object.entries(report.locales)) {
    console.log(`\n===== ${lang}  ${f.entries} entries =====`);
    console.log(`  文体: ${JSON.stringify(f.mood)}`);
    console.log(`  标点: ${JSON.stringify(f.punctuation)}`);
    console.log(`  恒等映射 ${f.identical.length}: ${f.identical.slice(0, 10).join(' | ')}`);
    console.log(`  术语撞车 ${f.collisions.length}:`);
    for (const c of f.collisions) {
      console.log(`     「${c.value}」 ← ${c.keys.join('  /  ')}`);
    }
    console.log(`  与中文雷同 ${f.sameAsChinese.length}:`);
    for (const x of f.sameAsChinese) {
      console.log(`     ${JSON.stringify(x.key)}\n        -> ${JSON.stringify(x.value)}`);
    }
    console.log(`  异文字混入 ${f.foreignScript.length}:`);
    for (const x of f.foreignScript) {
      console.log(`     [${x.chars}] ${JSON.stringify(x.key)} -> ${JSON.stringify(x.value)}`);
    }
  }
}

console.log(`\nwrote ${OUT}`);
