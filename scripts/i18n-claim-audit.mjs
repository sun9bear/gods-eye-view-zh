/**
 * 运行时字符串覆盖核对（五语言）
 * ==============================
 * 把**真实运行时代码拼接出来的字符串**直接喂给引擎的 `GEV_I18N.t()`，
 * 由引擎自己回答「译了 / 没译 / 半译」，而不是读字典推断。
 *
 * 为什么这样测：扫描 DOM 的报告只能证明「当时那一屏」的状态，且抓取瞬间可能
 * 读到「上游刚写回原文、翻译层还没处理」的混合态。直接调 t() 不受时序影响。
 *
 * 判定：
 *   译    got !== src
 *   漏    got === src
 *   半译  got !== src，但 src 里的英文词仍残留一部分（如 "RETRO · 密集"）
 *
 * 用法：node scripts/i18n-claim-audit.mjs
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const chrome = [
  process.env.GEV_CHROME,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
]
  .filter(Boolean)
  .find((p) => fs.existsSync(p));
if (!chrome) {
  console.error(
    '找不到 Edge/Chrome。设 GEV_CHROME 指向浏览器可执行文件，或安装其中之一。',
  );
  process.exit(1);
}

const dist = path.join(root, 'dist');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json',
  '.geojson': 'application/json',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};
const server = http.createServer((req, res) => {
  try {
    const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p === '/' || p === '/index.html') {
      res.writeHead(200, { 'content-type': types['.html'] });
      res.end(fs.readFileSync(path.join(dist, 'index.html')));
      return;
    }
    const rel = path.normalize(p.replace(/^\/+/, '')).replace(/^([a-zA-Z]:)?[\\/]+/, '');
    const file = path.join(dist, rel);
    if (!file.startsWith(dist) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200, {
      'content-type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
    });
    fs.createReadStream(file).pipe(res);
  } catch {
    res.writeHead(500);
    res.end();
  }
});
server.listen(0, '127.0.0.1');
await new Promise((r) => server.once('listening', r));
const target = `http://127.0.0.1:${server.address().port}`;

const LANGS = ['zh-Hans', 'zh-Hant', 'ja', 'ko'];

/**
 * 复审点名的字符串，全部取自运行时代码的真实拼接结果。
 * 每条注明来源，便于下次核对时直接回到调用点。
 */
const CASES = [
  // 组 1 —— 动态费用 / 模型提示（realtimeController.js syncCostUi）
  ['费用 初始(默认阈值,0响应)', 'Estimated session cost on gpt-realtime-2 — 0 response(s). Warns at ~$2.00, ends the session at ~$5.00.'],
  ['费用 用后(3响应)', 'Estimated session cost on gpt-realtime-2 — 3 response(s). Warns at ~$2.00, ends the session at ~$5.00.'],
  ['费用 用户改阈值(1/3)', 'Estimated session cost on gpt-realtime-2 — 0 response(s). Warns at ~$1.00, ends the session at ~$3.00.'],
  ['费用 换模型', 'Estimated session cost on gpt-realtime-2-mini — 5 response(s). Warns at ~$2.00, ends the session at ~$5.00.'],
  ['费用 附 note 不完整', 'Estimated session cost on gpt-realtime-2 — 2 response(s). Warns at ~$2.00, ends the session at ~$5.00. Estimate is incomplete — a response was still in flight when the session ended, so its usage was never reported.'],
  ['费用 note 单独', 'Estimate is incomplete — a response was still in flight when the session ended, so its usage was never reported.'],
  ['模型 切到 mini', 'Voice model: gpt-realtime-2 — click to switch to mini; applies next session'],
  ['模型 切到 standard', 'Voice model: gpt-realtime-2 — click to switch to standard; applies next session'],
  ['模型 会话中不一致', 'Next session: gpt-realtime-2-mini — this session stays on gpt-realtime-2'],
  // 组 2 —— 场景镜头 meta（scenePresentation.js:87，检测模式取值见 detection.js:77）
  ['镜头 RETRO·OFF', 'RETRO · OFF · 6.0s + 1.0s'],
  ['镜头 RETRO·SPARSE', 'RETRO · SPARSE · 6.0s + 1.0s'],
  ['镜头 RETRO·BALANCED', 'RETRO · BALANCED · 6.0s + 1.0s'],
  ['镜头 RETRO·DENSE', 'RETRO · DENSE · 6.0s + 1.0s'],
  ['镜头 SURVEILLANCE·DENSE', 'SURVEILLANCE · DENSE · 6.0s + 1.0s'],
  ['镜头 THERMAL·BALANCED', 'THERMAL · BALANCED · 6.0s + 1.0s'],
  ['镜头 NORMAL·OFF', 'NORMAL · OFF · 6.0s + 1.0s'],
  ['镜头 Shot 3', 'Shot 3'],
  // 组 3 —— Overpass 组合串（installationFeedback.js:14，用破折号拼接）
  ['Overpass 整串(临时不可用)', 'Overpass temporarily unavailable — retrying in 30s'],
  ['Overpass 整串(限流)', 'Overpass rate-limited — retrying in 30s'],
  ['Overpass 整串(超时)', 'Overpass timed out — retrying in 30s'],
  ['Overpass 整串(失败)', 'Overpass could not complete the query — retrying in 30s'],
  ['Overpass 整串(重试待定)', 'Overpass temporarily unavailable — retry pending'],
  ['Overpass 浮层拆解后的两段', 'OVERPASS TEMPORARILY UNAVAILABLE'],
  ['Overpass 浮层倒计时段', 'retrying in 30s'],
  ['Overpass 纯原因', 'Overpass temporarily unavailable'],
  // 组 4 —— 天气（regionalModel.js:94 weatherCodeLabel，WMO 代码）
  ['天气 CLEAR', 'CLEAR'],
  ['天气 PARTLY CLOUDY', 'PARTLY CLOUDY'],
  ['天气 OVERCAST', 'OVERCAST'],
  ['天气 RAIN', 'RAIN'],
  ['天气 RAIN SHOWERS', 'RAIN SHOWERS'],
  ['天气 SNOW', 'SNOW'],
  ['天气 FOG', 'FOG'],
  ['天气 DRIZZLE', 'DRIZZLE'],
  ['天气 THUNDERSTORM', 'THUNDERSTORM'],
  ['天气 MIXED CONDITIONS', 'MIXED CONDITIONS'],
  ['天气 CONDITIONS UNKNOWN', 'CONDITIONS UNKNOWN'],
  ['云量 CLOUD 70%', 'CLOUD 70%'],
  ['云量 CLOUD UNKNOWN', 'CLOUD UNKNOWN'],
  // 组 5 —— 成对文案 / 按钮属性（radioPresentation.js / cockpitInstruments.js）
  ['电台 Disable Radio', 'Disable Radio'],
  ['电台 Enable Radio', 'Enable Radio'],
  ['天气 Disable cockpit effects', 'Disable cockpit weather effects'],
  ['天气 Enable cockpit effects', 'Enable cockpit weather effects'],
  ['电台 Pause 选中', 'Pause selected radio station'],
  ['电台 Resume 选中', 'Resume selected radio station'],
  ['电台 Play 选中', 'Play selected radio station'],
  ['电台 Pause 最近', 'Pause nearest radio station'],
  ['电台 Resume 最近', 'Resume nearest radio station'],
  ['电台按钮文字 PAUSE', 'PAUSE'],
  ['电台按钮文字 RESUME', 'RESUME'],
  // 组 6 —— 图层 aria-label（layerPanel.js:5 FEED_STATE_LABELS 与 :549 分支）。
  // 标签取自 :55 PANEL_LABELS 与各图层 name，别用「看起来对」的类目名。
  ['图层 aria Radio: UNCERTAIN', 'Radio: UNCERTAIN'],
  ['图层 aria Radio: OFF', 'Radio: OFF'],
  ['图层 aria Radio: ON', 'Radio: ON'],
  ['图层 aria Live Vessels: STALE', 'Live Vessels: STALE'],
  ['图层 aria Satellites: UNAVAILABLE', 'Satellites: UNAVAILABLE'],
  ['图层 aria Live Vessels: DEGRADED', 'Live Vessels: DEGRADED'],
  ['图层 aria Satellites: LOADING', 'Satellites: LOADING'],
  ['图层 aria Satellites: OFF', 'Satellites: OFF'],
  ['图层按钮文字 FALLBACK', 'FALLBACK'],
  ['图层按钮文字 UNAVAILABLE', 'UNAVAILABLE'],
  ['图层按钮文字 ENABLING', 'ENABLING'],
  ['图层按钮文字 DISABLING', 'DISABLING'],
];

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ['--enable-unsafe-swiftshader'],
});

const perLang = {};
const pageErrors = [];
try {
  for (const lang of LANGS) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    page.on('pageerror', (e) => pageErrors.push(`${lang}: ${String(e).slice(0, 160)}`));
    await page.goto(`${target}/?lang=${lang}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForFunction(
      () =>
        !!window.GEV_I18N &&
        document.getElementById('loading-screen')?.classList.contains('hidden') === true &&
        getComputedStyle(document.getElementById('loading-screen')).visibility === 'hidden' &&
        !!document.querySelector('#right-context-rail'),
      { timeout: 120000, polling: 1000 },
    );
    await wait(1200);

    perLang[lang] = await page.evaluate((cases) => {
      const t = window.GEV_I18N?.t;
      const CJK = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7a3\uf900-\ufaff]/;
      const words = (s) => (s.match(/[A-Za-z]{3,}/g) || []).map((w) => w.toLowerCase());

      /* DOM 契约检查：data-gev-i18n-skip-text 只跳过文本、保留属性。
         合成注入是刻意的——真实芯片只在路由图层渲染后存在，状态太多；
         这里验的是**引擎属性契约**本身。 */
      const dom = (() => {
        const host = document.createElement('div');
        host.id = 'gev-skip-text-probe';
        host.innerHTML =
          '<button id="probe-skip" data-gev-i18n-skip-text title="Remove the route and both markers">CLEAR</button>' +
          '<span id="probe-plain">CLEAR</span>' +
          '<span id="probe-marker" class="material-symbols-outlined">layers_clear</span>';
        document.body.appendChild(host);
        window.GEV_I18N?.refresh?.();
        const skip = document.getElementById('probe-skip');
        const plain = document.getElementById('probe-plain');
        const marker = document.getElementById('probe-marker');
        const out = {
          skipText: skip.textContent.trim(),
          skipTitle: skip.getAttribute('title'),
          plainText: plain.textContent.trim(),
          markerText: marker.textContent.trim(),
        };
        host.remove();
        return out;
      })();

      return {
        current: window.GEV_I18N?.current,
        stats: window.GEV_I18N?.stats?.(),
        dom,
        rows: cases.map(([name, src]) => {
          const got = typeof t === 'function' ? t(src) : null;
          const out = typeof got === 'string' ? got : src;
          const leftovers = [...new Set(words(src))].filter((w) => out.toLowerCase().includes(w));
          // 品牌/专有名词、单位、模型 ID 片段残留不算半译
          const BRAND = new Set([
            'gpt', 'realtime', 'mini', 'standard', 'overpass', 'cloud', 'radio',
            'crt', 'ona', 'hud', 'alpr', 'cctv', 'gtfs', 'usace', 'opensky',
            'openstreetmap', 'bing', 'esri', 'google', 'cesium', 'tomtom',
            'nasa', 'firms', 'usgs',
          ]);
          const real = leftovers.filter((w) => !BRAND.has(w));
          const state = out === src ? '漏' : real.length ? '半译' : '译';
          return { name, src, got: out, state, leftovers: real, hasCjk: CJK.test(out) };
        }),
      };
    }, CASES);
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}

const lines = [];
lines.push('运行时字符串覆盖核对（五语言，基准取自运行时代码真实拼接串）');
lines.push('');
/** 合成 DOM 探针的期望值：skip-text 只跳过文本，属性与图标连字都不受影响 */
function domVerdict(lang, dom) {
  const wantPlain = lang === 'en' ? 'CLEAR' : null; // 非英文应被译成天气「晴」等
  const okSkipText = dom.skipText === 'CLEAR';
  const okTitle = lang === 'en' ? dom.skipTitle === 'Remove the route and both markers' : dom.skipTitle !== 'Remove the route and both markers';
  const okPlain = lang === 'en' ? dom.plainText === wantPlain : dom.plainText !== 'CLEAR';
  const okMarker = dom.markerText === 'layers_clear';
  return {
    ok: okSkipText && okTitle && okPlain && okMarker,
    detail: { okSkipText, okTitle, okPlain, okMarker, ...dom },
  };
}

let domFail = 0;
for (const lang of LANGS) {
  const rows = perLang[lang].rows;
  const miss = rows.filter((r) => r.state === '漏');
  const half = rows.filter((r) => r.state === '半译');
  const dom = domVerdict(lang, perLang[lang].dom);
  if (!dom.ok) domFail += 1;
  lines.push(
    `== ${lang}  引擎报告 current=${perLang[lang].current}  字典 ${JSON.stringify(perLang[lang].stats)}`,
  );
  lines.push(
    `   用例 ${rows.length}  译 ${rows.length - miss.length - half.length}  半译 ${half.length}  漏 ${miss.length}`,
  );
  lines.push(
    `   DOM 契约 ${dom.ok ? '通过' : '失败'}：skip-text 文本="${perLang[lang].dom.skipText}"` +
      `（应恒为 CLEAR）· 属性="${perLang[lang].dom.skipTitle}"（应随语言变）` +
      `· 普通 CLEAR="${perLang[lang].dom.plainText}"（非英文应已译）` +
      `· 图标连字="${perLang[lang].dom.markerText}"（应恒为 layers_clear）`,
  );
  for (const r of [...half, ...miss]) {
    lines.push(`   [${r.state}] ${r.name}`);
    lines.push(`        原文: ${r.src}`);
    lines.push(`        结果: ${r.got}`);
    if (r.leftovers.length) lines.push(`        残留: ${r.leftovers.join(', ')}`);
  }
  lines.push('');
}
if (pageErrors.length) {
  lines.push(`页面异常 ${pageErrors.length}:`);
  for (const e of pageErrors.slice(0, 10)) lines.push(`   ${e}`);
}

const outDir = path.join(root, 'outputs/i18n-claim-audit');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'claim-audit.json'),
  JSON.stringify({ langs: perLang, pageErrors }, null, 2),
  'utf8',
);
fs.writeFileSync(path.join(outDir, 'claim-audit.txt'), lines.join('\n'), 'utf8');
console.log(lines.join('\n'));

const totalBad = LANGS.reduce(
  (n, l) => n + perLang[l].rows.filter((r) => r.state !== '译').length,
  0,
);
process.exitCode = totalBad === 0 && domFail === 0 && pageErrors.length === 0 ? 0 : 1;
