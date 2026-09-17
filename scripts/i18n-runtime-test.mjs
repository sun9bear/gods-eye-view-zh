/**
 * i18n 运行时浏览器回归（本地、空白 fixture、非地图）
 * =========================================================
 *
 * 目标：在本地用一个 ephemeral loopback HTTP server 把真实 public/i18n 模块
 * 提供给无头 Edge（puppeteer-core + 独立临时 profile，绝不读用户浏览器档案、
 * 不连任何真实第三方账号），对空白 DOM fixture（不是地图）做端到端运行时验证：
 *
 *   1) 四语言循环 en → zh-Hans → zh-Hant → ja → ko → en 的
 *      文本翻译 + 属性(title/aria-label/placeholder/data-tooltip)翻译 + 还原；
 *      <html lang> 同步。
 *   2) 动态变更（characterData / 新增文本节点 / 新增子树）在
 *      material-icons、svg、script/style、data-gev-noi18n 祖先下【不被翻译】；
 *      普通容器下的动态节点【被正确翻译】。
 *   3) gev:language-changed：一次真实切换 = 一次事件；同语言 set 不发事件。
 *   4) 14 个动态键直接经 GEV_I18N.t() 命中（en 原样返回，其余命中译文）。
 *
 * 运行：
 *   "C:/Program Files/nodejs/node.exe" scripts/i18n-runtime-test.mjs
 *   （cwd = F:/gods-eye-view；失败以非零码退出）
 *
 * 输出：
 *   outputs/i18n-runtime-test.json（与会话 outputs 同义，位于项目 outputs/）
 *
 * 不修改任何其它源码；server 与 browser 由本脚本自动创建并在 finally 关闭。
 */

import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const I18N_DIR = path.join(PROJECT_ROOT, 'public', 'i18n');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'outputs');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'i18n-runtime-test.json');

/* ---------------------------------------------------------- 1. 字典（Node 侧取期望值） */

// 直接 import 四个字典模块（它们是纯 ESM，无浏览器全局依赖），用于派生期望值。
const importDict = (file) => import(pathToFileURL(path.join(I18N_DIR, 'dicts', file)).href);
const zhHans = await importDict('zh-Hans.js');
const zhHant = await importDict('zh-Hant.js');
const ja = await importDict('ja.js');
const ko = await importDict('ko.js');

const DICTS = {
  'zh-Hans': zhHans.dict,
  'zh-Hant': zhHant.dict,
  'ja': ja.dict,
  'ko': ko.dict,
};
const LANGS = ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko'];

// 固定源码动态状态清单；不能从词典交集抽样，否则漏键会被自动排除。
const TEST_KEYS = [
  'CCTV ON', 'CCTV OFF', 'COVERAGE ON', 'COVERAGE OFF', 'VIEWSHED ON',
  'AUTO HOP ON', 'AUTO HOP OFF', 'PROJECTION ON', 'PROJECTION OFF',
  'PAUSE', 'RESUME', 'PLAY', 'ENABLING', 'DISABLING',
];
for (const [tag, dict] of Object.entries(DICTS)) {
  for (const key of TEST_KEYS) {
    if (!dict[key] || dict[key] === key) throw new Error(`Missing dynamic translation: ${tag}/${key}`);
  }
}

const expectedFor = (lang, key) => (lang === 'en' ? key : DICTS[lang][key]);

/* ---------------------------------------------------------- 1b. 重试 / 组合状态（本轮补齐）
 *
 * 这些键直接对应 src/keySetup.js:22、src/data/installationFeedback.js、
 * src/loadingFeedback.js、src/ui/layerPanel.js 里目前缺翻译的英文串。
 * 期望值**硬编码**在下面 HARDCODED 里（不从词典模块派生），用来独立验证
 * 直接 t()、动态 DOM、五语往返都不留英文前缀。
 */
const RETRY_TESTS = [
  { id: 'r0', en: 'POWER UP · 1 KEY WAITING' },
  { id: 'r1', en: 'POWERED UP' },
  { id: 'r2', en: 'ALPR cameras · retrying in 5s' },
  { id: 'r3', en: 'ALPR cameras · retry pending' },
  { id: 'r4', en: 'OVERPASS RATE-LIMITED' },
  { id: 'r5', en: 'OVERPASS TEMPORARILY UNAVAILABLE' },
  { id: 'r6', en: 'OpenStreetMap · Overpass rate-limited' },
  { id: 'r7', en: 'RETRYING ALPR CAMERAS' },
  { id: 'r8', en: 'FETCHING MAPPED SITES' },
  { id: 'r9', en: 'MAPPED SITES LOADED' },
  { id: 'r10', en: 'lifecycle state requires reconciliation' },
  { id: 'r11', en: 'retrying in 3s' },
  { id: 'r12', en: 'retry pending' },
  { id: 'r13', en: 'RETRYING MAPPED SITES' },
  { id: 'r14', en: 'Zoom in to search mapped installations' },
  { id: 'r15', en: 'STALE · OpenStreetMap · just now · retrying in 5s' },
  { id: 'r16', en: 'Retrying mapped sites…' },
];

// 硬编码期望值：五语各自独立写出，不 import 词典。繁體由 opencc 生成后人工核对填入。
const HARDCODED = {
  'POWER UP · 1 KEY WAITING': {
    'zh-Hans': '通电 · 还有 1 个密钥',
    'zh-Hant': '通電 · 還有 1 個密鑰',
    'ja': '電源投入 · 残り 1 キー',
    'ko': '전원 켜기 · 남은 키 1개',
  },
  'POWERED UP': {
    'zh-Hans': '已通电',
    'zh-Hant': '已通電',
    'ja': '電源投入済み',
    'ko': '전원 켜짐',
  },
  'ALPR cameras · retrying in 5s': {
    'zh-Hans': '车牌识别摄像头 · 5 秒后重试',
    'zh-Hant': '車牌識別攝像頭 · 5 秒後重試',
    'ja': 'ナンバー読取カメラ · 5 秒後に再試行',
    'ko': '번호판 판독 카메라 · 5초 후 재시도',
  },
  'ALPR cameras · retry pending': {
    'zh-Hans': '车牌识别摄像头 · 重试待定',
    'zh-Hant': '車牌識別攝像頭 · 重試待定',
    'ja': 'ナンバー読取カメラ · 再試行待ち',
    'ko': '번호판 판독 카메라 · 재시도 대기',
  },
  'OVERPASS RATE-LIMITED': {
    'zh-Hans': 'Overpass 已限流',
    'zh-Hant': 'Overpass 已限流',
    'ja': 'Overpass がレート制限されました',
    'ko': 'Overpass 속도 제한됨',
  },
  'OVERPASS TEMPORARILY UNAVAILABLE': {
    'zh-Hans': 'Overpass 暂时不可用',
    'zh-Hant': 'Overpass 暫時不可用',
    'ja': 'Overpass は一時的に利用できません',
    'ko': 'Overpass 일시적으로 사용 불가',
  },
  'OpenStreetMap · Overpass rate-limited': {
    'zh-Hans': 'OpenStreetMap · Overpass 已限流',
    'zh-Hant': 'OpenStreetMap · Overpass 已限流',
    'ja': 'OpenStreetMap · Overpass がレート制限されました',
    'ko': 'OpenStreetMap · Overpass 속도 제한됨',
  },
  'RETRYING ALPR CAMERAS': {
    'zh-Hans': '正在重试车牌识别摄像头',
    'zh-Hant': '正在重試車牌識別攝像頭',
    'ja': 'ナンバー読取カメラを再試行中',
    'ko': '번호판 판독 카메라 재시도 중',
  },
  'FETCHING MAPPED SITES': {
    'zh-Hans': '正在获取已测绘设施',
    'zh-Hant': '正在獲取已測繪設施',
    'ja': '地図上の施設を取得中',
    'ko': '지도상 시설 불러오는 중',
  },
  'MAPPED SITES LOADED': {
    'zh-Hans': '已测绘设施已加载',
    'zh-Hant': '已測繪設施已加載',
    'ja': '地図上の施設は読み込み済み',
    'ko': '지도상 시설 로드됨',
  },
  'lifecycle state requires reconciliation': {
    'zh-Hans': '生命周期状态需重新校准',
    'zh-Hant': '生命週期狀態需重新校準',
    'ja': 'ライフサイクル状態の再調整が必要',
    'ko': '수명 주기 상태 재조정 필요',
  },
  'retrying in 3s': {
    'zh-Hans': '3 秒后重试',
    'zh-Hant': '3 秒後重試',
    'ja': '3 秒後に再試行',
    'ko': '3초 후 재시도',
  },
  'retry pending': {
    'zh-Hans': '重试待定',
    'zh-Hant': '重試待定',
    'ja': '再試行待ち',
    'ko': '재시도 대기',
  },
  'RETRYING MAPPED SITES': {
    'zh-Hans': '正在重试已测绘设施',
    'zh-Hant': '正在重試已測繪設施',
    'ja': '地図上の施設を再試行中',
    'ko': '지도상 시설 재시도 중',
  },
  'Retrying mapped sites…': {
    'zh-Hans': '正在重试已测绘设施…',
    'zh-Hant': '正在重試已測繪設施…',
    'ja': '地図上の施設を再試行中…',
    'ko': '지도상 시설 재시도 중…',
  },
  'Zoom in to search mapped installations': {
    'zh-Hans': '放大以搜索已测绘设施',
    'zh-Hant': '放大以搜索已測繪設施',
    'ja': '拡大して地図上の施設を検索',
    'ko': '확대하여 지도상 시설 검색',
  },
  'STALE · OpenStreetMap · just now · retrying in 5s': {
    'zh-Hans': '数据陈旧 · OpenStreetMap · 刚刚 · 5 秒后重试',
    'zh-Hant': '數據陳舊 · OpenStreetMap · 剛剛 · 5 秒後重試',
    'ja': 'データが古い · OpenStreetMap · たった今 · 5 秒後に再試行',
    'ko': '데이터 오래됨 · OpenStreetMap · 방금 전 · 5초 후 재시도',
  },
};

/* ---------------------------------------------------------- 2. 空白 fixture HTML */

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const normalNodesHtml = TEST_KEYS.map((k, i) => `    <div id="n${i}" data-key="${i}">${esc(k)}</div>`).join('\n');

// 把前几个键挂到属性上做属性翻译/还原验证：
//   title=KEY[0], aria-label=KEY[1], data-tooltip=KEY[3], placeholder(输入框)=KEY[2]
const attrTestHtml = `    <div id="attr-test" title="${esc(TEST_KEYS[0])}" aria-label="${esc(TEST_KEYS[1])}" data-tooltip="${esc(TEST_KEYS[3])}">ATTR</div>
    <input id="attr-input" placeholder="${esc(TEST_KEYS[2])}" />`;

// 跳过上下文（祖先含 material-icons / svg / data-gev-noi18n / script / style）
const skipHtml = `    <div id="skip-material" class="material-icons"><span class="mi-inner">${esc(TEST_KEYS[4])}</span></div>
    <svg id="skip-svg"><text x="0" y="10">${esc(TEST_KEYS[5])}</text><g><text x="0" y="30">${esc(TEST_KEYS[6])}</text></g></svg>
    <div id="skip-noi18n" data-gev-noi18n><span>${esc(TEST_KEYS[7])}</span></div>
    <script id="skip-script" type="text/plain">${esc(TEST_KEYS[8])}</script>
    <style id="skip-style" type="text/css">/* ${esc(TEST_KEYS[9])} */</style>`;

// 动态节点挂载点（初始为英文/空，供运行时变更）
const dynHtml = `    <span id="dyn-normal-cd">${esc(TEST_KEYS[10])}</span>
    <span id="dyn-normal-tx"></span>
    <div id="dyn-normal-st"></div>`;

// 重试 / 组合状态节点（英文原文，运行时由 i18n 层翻译）
const retryHtml = `    <section id="retry-nodes">
    <div id="r0">POWER UP · 1 KEY WAITING</div>
    <div id="r1">POWERED UP</div>
    <div id="r2">ALPR cameras · retrying in 5s</div>
    <div id="r3">ALPR cameras · retry pending</div>
    <div id="r4">OVERPASS RATE-LIMITED</div>
    <div id="r5">OVERPASS TEMPORARILY UNAVAILABLE</div>
    <div id="r6">OpenStreetMap · Overpass rate-limited</div>
    <div id="r7">RETRYING ALPR CAMERAS</div>
    <div id="r8">FETCHING MAPPED SITES</div>
    <div id="r9">MAPPED SITES LOADED</div>
    <div id="r10">lifecycle state requires reconciliation</div>
    <div id="r11">retrying in 3s</div>
    <div id="r12">retry pending</div>
    <div id="r13">RETRYING MAPPED SITES</div>
    <div id="r14">Zoom in to search mapped installations</div>
    <div id="r15">STALE · OpenStreetMap · just now · retrying in 5s</div>
    <div id="r16">Retrying mapped sites…</div>
    </section>
    <span id="dyn-retry"></span>
    <span id="dyn-retry-2"></span>`;

const FIXTURE_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>i18n runtime fixture (blank, not a map)</title>
</head>
<body>
  <main id="normal-nodes">
${normalNodesHtml}
  </main>
${attrTestHtml}
${skipHtml}
${dynHtml}
${retryHtml}
${fs.readFileSync(path.join(PROJECT_ROOT, 'src/ui/templates/display-controls.html'), 'utf8')}
  <script type="module" src="/i18n/gev-i18n.js"></script>
</body>
</html>`;

/* ---------------------------------------------------------- 3. ephemeral loopback server */

const server = http.createServer((req, res) => {
  try {
    const u = new URL(req.url, 'http://127.0.0.1');
    const p = decodeURIComponent(u.pathname);
    if (p === '/' || p === '') {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(FIXTURE_HTML);
      return;
    }
    if (p === '/favicon.ico') {
      res.writeHead(204, { 'content-type': 'image/x-icon' });
      res.end();
      return;
    }
    if (p.startsWith('/i18n/')) {
      const rel = p.slice('/i18n/'.length);
      const fp = path.join(I18N_DIR, rel);
      if (!fp.startsWith(I18N_DIR) || !fs.existsSync(fp) || !fs.statSync(fp).isFile()) {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
        res.end('not found');
        return;
      }
      const ext = path.extname(fp).toLowerCase();
      const ct = ext === '.js' ? 'text/javascript; charset=utf-8' : 'application/octet-stream';
      res.writeHead(200, { 'content-type': ct });
      fs.createReadStream(fp).pipe(res);
      return;
    }
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('not found');
  } catch (e) {
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    res.end(String(e));
  }
});

/* ---------------------------------------------------------- 4. 浏览器启动（Edge + 独立临时 profile） */

const CHROME_CANDIDATES = [
  process.env.GEV_CHROME,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
].filter(Boolean);

const executablePath = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!executablePath) {
  throw new Error('找不到 Edge/Chrome。可用 GEV_CHROME=/path/to/edge 指定。');
}

// 独立临时 userDataDir：绝不使用用户真实浏览器档案，也不触碰任何第三方账号。
const userDataDir = path.join(os.tmpdir(), `gev-i18n-rt-${process.pid}-${Date.now()}`);
fs.mkdirSync(userDataDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  userDataDir,
  cwd: PROJECT_ROOT, // spawnSync 语义：浏览器子进程 cwd 指向项目根
  protocolTimeout: 120000,
  args: [
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-extensions',
    '--user-data-dir=' + userDataDir,
  ],
});

/* ---------------------------------------------------------- 5. 运行时校验逻辑（浏览器内执行） */

async function browserRun(KEYS) {
  const tick = (ms = 90) => new Promise((r) => setTimeout(r, ms));
  const G = window.GEV_I18N;
  const results = {
    langs: {},
    events: { cycle: [], realSwitch: 0, sameLangExtra: 0 },
    dyn: {},
    skipBaseline: {},
    tChecks: {},
  };

  window.__gevEvents = [];
  window.addEventListener('gev:language-changed', (e) => window.__gevEvents.push(e.detail.lang));

  // 规整到 en，并清掉此次规整产生的事件计数
  G.set('en');
  window.__gevEvents.length = 0;

  const readLang = () => {
    const nodes = {};
    for (let i = 0; i < KEYS.length; i++) nodes['n' + i] = document.getElementById('n' + i).textContent;
    const a = document.getElementById('attr-test');
    const inp = document.getElementById('attr-input');
    nodes.__attr = {
      title: a.getAttribute('title'),
      aria: a.getAttribute('aria-label'),
      tooltip: a.getAttribute('data-tooltip'),
      placeholder: inp.getAttribute('placeholder'),
    };
    nodes.__htmlLang = document.documentElement.getAttribute('lang');
    nodes.__skip = {
      material: document.querySelector('#skip-material .mi-inner').textContent,
      svg1: document.querySelector('#skip-svg text').textContent,
      svg2: document.querySelector('#skip-svg g text').textContent,
      noi18n: document.querySelector('#skip-noi18n span').textContent,
      script: document.getElementById('skip-script').textContent,
      style: document.getElementById('skip-style').textContent,
    };
    return nodes;
  };

  const cycle = ['zh-Hans', 'zh-Hant', 'ja', 'ko'];
  for (const lang of cycle) {
    G.set(lang);
    await tick();
    results.langs[lang] = readLang();
  }
  G.set('en');
  await tick();
  results.langs['en'] = readLang();
  results.events.cycle = window.__gevEvents.slice();

  // 事件：一次真实切换 vs 同语言 set
  window.__gevEvents.length = 0;
  G.set('ja');
  await tick();
  const real = window.__gevEvents.length;
  G.set('ja'); // 同语言
  await tick();
  const same = window.__gevEvents.length;
  results.events.realSwitch = real;
  results.events.sameLangExtra = same - real;

  // 动态翻译（正向对照）：在 zh-Hans 下做 characterData / 新增文本 / 新增子树
  G.set('zh-Hans');
  await tick();

  const ncd = document.getElementById('dyn-normal-cd');
  ncd.firstChild.nodeValue = KEYS[10]; // characterData 变更
  await tick();
  results.dyn.normalChar = ncd.textContent;

  const ntx = document.getElementById('dyn-normal-tx');
  ntx.appendChild(document.createTextNode(KEYS[11])); // 新增文本节点
  await tick();
  results.dyn.normalText = ntx.textContent;

  const nst = document.getElementById('dyn-normal-st');
  const sub = document.createElement('div');
  sub.textContent = KEYS[12]; // 新增子树
  nst.appendChild(sub);
  await tick();
  results.dyn.normalSubtree = nst.textContent;

  // 动态变更落在跳过上下文（负向对照）：一律保持英文原文
  const mi = document.querySelector('#skip-material .mi-inner');
  mi.textContent = KEYS[8];
  await tick();
  results.dyn.skipMaterial = mi.textContent;

  const svgTxt = document.querySelector('#skip-svg text');
  svgTxt.textContent = KEYS[9];
  await tick();
  results.dyn.skipSvg = svgTxt.textContent;

  const noEl = document.querySelector('#skip-noi18n span');
  noEl.textContent = KEYS[7];
  await tick();
  results.dyn.skipNoi18n = noEl.textContent;

  const sc = document.getElementById('skip-script');
  sc.textContent = KEYS[8];
  await tick();
  results.dyn.skipScript = sc.textContent;

  const miSub = document.createElement('span');
  miSub.textContent = KEYS[10];
  document.getElementById('skip-material').appendChild(miSub);
  await tick();
  results.dyn.skipMaterialSubtree = miSub.textContent;

  const noSub = document.createTextNode(KEYS[13]);
  document.getElementById('skip-noi18n').appendChild(noSub);
  await tick();
  results.dyn.skipNoi18nText = noSub.nodeValue;

  results.skipBaseline = {
    material: document.querySelector('#skip-material .mi-inner').textContent,
    svg1: document.querySelector('#skip-svg text').textContent,
    noi18n: document.querySelector('#skip-noi18n span').textContent,
    script: document.getElementById('skip-script').textContent,
    style: document.getElementById('skip-style').textContent,
  };

  // t() 14 键直接命中
  for (const lang of ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko']) {
    G.set(lang);
    await tick();
    const m = {};
    for (let i = 0; i < KEYS.length; i++) m[KEYS[i]] = G.t(KEYS[i]);
    results.tChecks[lang] = m;
  }
  G.set('en');
  return results;
}

/* ---------------------------------------------------------- 5b. 重试 / 组合状态运行时校验（独立硬编码期望） */

async function browserRunRetry(TESTS) {
  const tick = (ms = 90) => new Promise((r) => setTimeout(r, ms));
  const G = window.GEV_I18N;
  const results = { langs: {}, tChecks: {}, dyn: {}, restore: {} };

  // 规整到 en
  G.set('en');
  await tick();

  const readAll = () => {
    const o = {};
    for (const t of TESTS) o[t.id] = document.getElementById(t.id).textContent;
    return o;
  };

  // 五语循环（en → zh-Hans → zh-Hant → ja → ko → en），记录每个节点文本
  const cycle = ['zh-Hans', 'zh-Hant', 'ja', 'ko'];
  for (const lang of cycle) {
    G.set(lang);
    await tick();
    results.langs[lang] = readAll();
  }
  G.set('en');
  await tick();
  results.langs['en'] = readAll();

  // 直接 t()：硬编码期望值，不依赖词典模块
  for (const lang of ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko']) {
    G.set(lang);
    await tick();
    const m = {};
    for (const t of TESTS) m[t.en] = G.t(t.en);
    results.tChecks[lang] = m;
  }
  G.set('en');
  await tick();

  // 动态 DOM：在 zh-Hans 下把英文重试串写进空白节点，验证翻译（正向）
  G.set('zh-Hans');
  await tick();
  const d1 = document.getElementById('dyn-retry');
  d1.textContent = TESTS[2].en; // 'ALPR cameras · retrying in 5s'
  await tick();
  results.dyn.comboText = d1.textContent;

  const d2 = document.getElementById('dyn-retry-2');
  d2.textContent = TESTS[11].en; // 'retrying in 3s'
  await tick();
  results.dyn.ruleText = d2.textContent;

  // 往返：再次循环到 en，验证节点还原为英文原文（ORIGINAL 快照机制）
  const cycle2 = ['zh-Hans', 'zh-Hant', 'ja', 'ko', 'en'];
  for (const lang of cycle2) {
    G.set(lang);
    await tick();
  }
  results.restore = readAll();

  return results;
}

/* ---------------------------------------------------------- 6. 执行 + 断言 */

const checks = [];
const addCheck = (name, pass, detail) => {
  checks.push({ name, pass: !!pass, detail });
};

let report = { pass: false, total: 0, failures: [], results: null, runtime: {} };

try {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}`;
  report.runtime.serverPort = port;
  report.runtime.executablePath = executablePath;
  report.runtime.userDataDir = userDataDir;

  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 700 });
  const consoleErrors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200));
  });
  page.on('pageerror', (e) => consoleErrors.push('PAGEERROR ' + String(e).slice(0, 200)));

  await page.goto(`${base}/?lang=en`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForFunction(
    "window.GEV_I18N && typeof window.GEV_I18N.set === 'function' && typeof window.GEV_I18N.t === 'function'",
    { timeout: 30000 }
  );
  await new Promise((r) => setTimeout(r, 400)); // 等 boot() 首扫

  const selector = await page.$('#gev-language-select');
  addCheck('language selector exists in real display template', !!selector);
  if (selector) {
    for (const tag of ['zh-Hans', 'zh-Hant', 'ja', 'ko', 'en']) {
      await page.select('#gev-language-select', tag);
      const state = await page.evaluate(() => ({
        current: GEV_I18N.current, html: document.documentElement.lang,
        stored: localStorage.getItem('gev.lang'),
        options: document.querySelector('#gev-language-select').options.length,
        label: document.querySelector('#gev-language-select').getAttribute('aria-label'),
      }));
      addCheck(`selector change ${tag}`, state.current === tag && state.html === tag && state.stored === tag && state.options === 5 && !!state.label, state);
    }
    await page.evaluate(() => GEV_I18N.set('ja'));
    addCheck('API synchronizes selector', await page.$eval('#gev-language-select', e => e.value) === 'ja');
    await page.keyboard.down('Control');
    await page.keyboard.down('Alt');
    await page.keyboard.press('l');
    await page.keyboard.up('Alt');
    await page.keyboard.up('Control');
    addCheck('shortcut synchronizes selector', await page.$eval('#gev-language-select', e => e.value) === 'ko');
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.querySelector('#gev-language-select')?.options.length === 5);
    addCheck('URL overrides persisted language on reload', await page.$eval('#gev-language-select', e => e.value) === 'en');
  }

  const results = await page.evaluate(browserRun, TEST_KEYS);
  report.results = results;
  report.runtime.consoleErrors = consoleErrors;

  /* ---- 1) 四语言循环：文本 + 属性 + 还原 + <html lang> ---- */
  for (const lang of ['zh-Hans', 'zh-Hant', 'ja', 'ko', 'en']) {
    const snap = results.langs[lang];
    for (let i = 0; i < TEST_KEYS.length; i++) {
      const key = TEST_KEYS[i];
      const exp = expectedFor(lang, key);
      addCheck(`text[${lang}] n${i} "${key}"`, snap['n' + i] === exp, {
        actual: snap['n' + i],
        expected: exp,
      });
    }
    // 属性
    const aExp = {
      title: expectedFor(lang, TEST_KEYS[0]),
      aria: expectedFor(lang, TEST_KEYS[1]),
      tooltip: expectedFor(lang, TEST_KEYS[3]),
      placeholder: expectedFor(lang, TEST_KEYS[2]),
    };
    addCheck(`attr[${lang}] title`, snap.__attr.title === aExp.title, { actual: snap.__attr.title, expected: aExp.title });
    addCheck(`attr[${lang}] aria-label`, snap.__attr.aria === aExp.aria, { actual: snap.__attr.aria, expected: aExp.aria });
    addCheck(`attr[${lang}] data-tooltip`, snap.__attr.tooltip === aExp.tooltip, { actual: snap.__attr.tooltip, expected: aExp.tooltip });
    addCheck(`attr[${lang}] placeholder`, snap.__attr.placeholder === aExp.placeholder, { actual: snap.__attr.placeholder, expected: aExp.placeholder });
    // html lang
    addCheck(`html[lang]=${lang}`, snap.__htmlLang === lang, { actual: snap.__htmlLang, expected: lang });
  }

  /* ---- 2) 跳过上下文：任意语言下都不翻译 ---- */
  const skipExpected = {
    material: TEST_KEYS[4],
    svg1: TEST_KEYS[5],
    svg2: TEST_KEYS[6],
    noi18n: TEST_KEYS[7],
    script: TEST_KEYS[8],
    style: `/* ${TEST_KEYS[9]} */`,
  };
  for (const lang of ['zh-Hans', 'zh-Hant', 'ja', 'ko', 'en']) {
    const sk = results.langs[lang].__skip;
    for (const k of Object.keys(skipExpected)) {
      addCheck(`skip[${lang}] ${k} 不翻译`, sk[k] === skipExpected[k], { actual: sk[k], expected: skipExpected[k] });
    }
  }

  /* ---- 3) 动态变更：正向翻译 vs 跳过不翻译 ---- */
  const zhH = DICTS['zh-Hans'];
  addCheck('dyn 正常 characterData 翻译', results.dyn.normalChar === zhH[TEST_KEYS[10]], {
    actual: results.dyn.normalChar,
    expected: zhH[TEST_KEYS[10]],
  });
  addCheck('dyn 正常 新增文本节点 翻译', results.dyn.normalText === zhH[TEST_KEYS[11]], {
    actual: results.dyn.normalText,
    expected: zhH[TEST_KEYS[11]],
  });
  addCheck('dyn 正常 新增子树 翻译', results.dyn.normalSubtree === zhH[TEST_KEYS[12]], {
    actual: results.dyn.normalSubtree,
    expected: zhH[TEST_KEYS[12]],
  });
  addCheck('dyn material-icons 下不翻译', results.dyn.skipMaterial === TEST_KEYS[8], {
    actual: results.dyn.skipMaterial,
    expected: TEST_KEYS[8],
  });
  addCheck('dyn svg 下不翻译', results.dyn.skipSvg === TEST_KEYS[9], {
    actual: results.dyn.skipSvg,
    expected: TEST_KEYS[9],
  });
  addCheck('dyn data-gev-noi18n 下不翻译', results.dyn.skipNoi18n === TEST_KEYS[7], {
    actual: results.dyn.skipNoi18n,
    expected: TEST_KEYS[7],
  });
  addCheck('dyn script 下不翻译', results.dyn.skipScript === TEST_KEYS[8], {
    actual: results.dyn.skipScript,
    expected: TEST_KEYS[8],
  });
  addCheck('dyn material-icons 新增子树 不翻译', results.dyn.skipMaterialSubtree === TEST_KEYS[10], {
    actual: results.dyn.skipMaterialSubtree,
    expected: TEST_KEYS[10],
  });
  addCheck('dyn data-gev-noi18n 新增文本 不翻译', results.dyn.skipNoi18nText === TEST_KEYS[13], {
    actual: results.dyn.skipNoi18nText,
    expected: TEST_KEYS[13],
  });
  addCheck('skipBaseline style 未翻译', results.skipBaseline.style === `/* ${TEST_KEYS[9]} */`, {
    actual: results.skipBaseline.style,
    expected: `/* ${TEST_KEYS[9]} */`,
  });

  /* ---- 4) gev:language-changed 事件 ---- */
  addCheck('cycle 事件数=5', results.events.cycle.length === 5, { actual: results.events.cycle });
  addCheck(
    'cycle 事件顺序正确',
    JSON.stringify(results.events.cycle) === JSON.stringify(['zh-Hans', 'zh-Hant', 'ja', 'ko', 'en']),
    { actual: results.events.cycle }
  );
  addCheck('一次真实切换=1 事件', results.events.realSwitch === 1, { actual: results.events.realSwitch });
  addCheck('同语言 set 不发事件', results.events.sameLangExtra === 0, { actual: results.events.sameLangExtra });

  /* ---- 5) t() 14 键直接命中 ---- */
  for (const lang of LANGS) {
    for (let i = 0; i < TEST_KEYS.length; i++) {
      const key = TEST_KEYS[i];
      const exp = expectedFor(lang, key);
      const act = results.tChecks[lang][key];
      addCheck(`t()[${lang}] "${key}"`, act === exp, { actual: act, expected: exp });
    }
  }

  /* ---- 5b) 重试 / 组合状态：硬编码期望的直接 t() + 动态 DOM + 五语往返 ---- */
  const retryResults = await page.evaluate(browserRunRetry, RETRY_TESTS);

  // 组合状态 DOM 翻译（四语，不含 en）
  for (const lang of ['zh-Hans', 'zh-Hant', 'ja', 'ko']) {
    for (const t of RETRY_TESTS) {
      const exp = HARDCODED[t.en][lang];
      const act = retryResults.langs[lang][t.id];
      addCheck(`retry[${lang}] ${t.id} "${t.en}"`, act === exp, { actual: act, expected: exp });
    }
  }

  // 五语往返：回到 en 后节点还原为英文原文（不留英文前缀的反向保证）
  for (const t of RETRY_TESTS) {
    const act = retryResults.restore[t.id];
    addCheck(`retry 往返还原 en ${t.id}`, act === t.en, { actual: act, expected: t.en });
  }

  // 直接 t()：硬编码期望，不依赖词典派生
  for (const lang of ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko']) {
    for (const t of RETRY_TESTS) {
      const exp = lang === 'en' ? t.en : HARDCODED[t.en][lang];
      const act = retryResults.tChecks[lang][t.en];
      addCheck(`t() retry[${lang}] "${t.en}"`, act === exp, { actual: act, expected: exp });
    }
  }

  // 动态 DOM：组合串 + 规则串翻译
  addCheck('retry dyn 组合串翻译', retryResults.dyn.comboText === HARDCODED[RETRY_TESTS[2].en]['zh-Hans'], {
    actual: retryResults.dyn.comboText,
    expected: HARDCODED[RETRY_TESTS[2].en]['zh-Hans'],
  });
  addCheck('retry dyn 规则串翻译', retryResults.dyn.ruleText === HARDCODED[RETRY_TESTS[11].en]['zh-Hans'], {
    actual: retryResults.dyn.ruleText,
    expected: HARDCODED[RETRY_TESTS[11].en]['zh-Hans'],
  });

  // 五语互异：同一英文串在四语下互不相同且都不等于英文（证明真的逐语翻译）
  for (const t of RETRY_TESTS) {
    const vals = ['zh-Hans', 'zh-Hant', 'ja', 'ko'].map((l) => HARDCODED[t.en][l]);
    const uniq = new Set(vals);
    // zh-Hans/zh-Hant 在纯品牌串上可能字形相同（如 Overpass），故放宽：
    // 要求四语均不留英文，且至少存在 2 种不同译文（证明真做了逐语翻译）。
    const noneEn = vals.every((v) => v !== t.en);
    addCheck(`retry 五语无英文泄漏且非单一 "${t.en}"`, noneEn && uniq.size >= 2, { vals });
  }

  /* ---- 页面错误门禁 ----
     收集到的 console.error / pageerror 必须进入判据：早先只落库打印，
     于是「页面报错但 report.pass 仍为 true、退出码仍为 0」是可能的。 */
  addCheck('页面无 console 错误 / 未捕获异常', consoleErrors.length === 0, {
    actual: consoleErrors.length,
    expected: 0,
    sample: consoleErrors.slice(0, 5),
  });

  /* ---- 汇总 ---- */
  const failures = checks.filter((c) => !c.pass);
  report.total = checks.length;
  report.failures = failures;
  report.pass = failures.length === 0;
} catch (e) {
  report.error = String(e && e.stack ? e.stack : e);
  report.pass = false;
} finally {
  // 自动关闭 server 与 browser
  try {
    await browser.close();
  } catch {
    /* ignore */
  }
  try {
    server.close();
  } catch {
    /* ignore */
  }
  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
}

/* ---------------------------------------------------------- 7. 写 JSON + 退出码 */

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2), 'utf8');

const passed = report.pass;
const failedCount = report.failures ? report.failures.length : report.total;
console.log('=== i18n 运行时浏览器回归 ===');
console.log(`Node: ${process.version}  Edge: ${report.runtime.executablePath || executablePath}`);
console.log(`server: 127.0.0.1:${report.runtime.serverPort}  (ephemeral loopback, blank fixture)`);
console.log(`14 测试键 + ${RETRY_TESTS.length} 重试/组合键`);
console.log(`总检查: ${report.total}  通过: ${report.total - failedCount}  失败: ${failedCount}`);
if (report.runtime && report.runtime.consoleErrors) {
  console.log(`页面 console 错误: ${report.runtime.consoleErrors.length}（已计入判据，>0 即失败）`);
}
if (!passed) {
  console.log('失败项:');
  for (const f of report.failures) {
    console.log(`  ✗ ${f.name}  actual=${JSON.stringify(f.detail?.actual)} expected=${JSON.stringify(f.detail?.expected)}`);
  }
}
console.log(`JSON 报告: ${OUTPUT_FILE}`);

process.exit(passed ? 0 : 1);
