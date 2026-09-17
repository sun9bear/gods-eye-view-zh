// 完整页面壳层验收（生产构建 dist/）：应用加载屏退场后，断言语言控件存在、可见、
// 可切换、切回还原、键盘与刷新同步。分辨率三档。不修改任何应用代码。
// 明确不覆盖：在线底图渲染、外部数据源连通与恢复（需真实网络与凭据）。
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const wait = ms => new Promise(r => setTimeout(r, ms));

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const chrome = [process.env.GEV_CHROME,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
].filter(Boolean).find(p => fs.existsSync(p));
if (!chrome) { console.error('no chrome/edge'); process.exit(1); }

// 源码真实退场条件（src/app/startupChrome.js + controls.css）：
// .hidden => opacity:0 + visibility:hidden + pointer-events:none，display 恒为 flex。
// 因此判退场用 visibility，而非 display:none。
const APP_READY = () => window.GEV_I18N
  && document.getElementById('loading-screen')?.classList.contains('hidden') === true
  && getComputedStyle(document.getElementById('loading-screen')).visibility === 'hidden'
  && document.querySelector('#right-context-rail');

// 固定控件组：切换前后逐项比对（正文含实时时钟与数据计数，整体比对会伪报还原失败）。
const CONTROL_TEXTS = () => [...document.querySelectorAll(
  '#pp-toggles .pp-label, #hud-panel .panel-title, #status-bar .status-label',
)].map(el => el.textContent.trim()).filter(Boolean);

// 几何可见：rect 尺寸>0、祖先裁切按轴检查，四角及中心均命中控件自身。
const SELECT_GEOMETRY = () => {
  const el = document.getElementById('gev-language-select');
  if (!el) return null;
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  const clippedByAncestor = (() => {
    for (let a = el.parentElement; a; a = a.parentElement) {
      const s = getComputedStyle(a);
      const ar = a.getBoundingClientRect();
      const left = ar.left + a.clientLeft, top = ar.top + a.clientTop;
      if (/(hidden|clip|auto|scroll)/.test(s.overflowX)
        && (r.left < left - 1 || r.right > left + a.clientWidth + 1)) return true;
      if (/(hidden|clip|auto|scroll)/.test(s.overflowY)
        && (r.top < top - 1 || r.bottom > top + a.clientHeight + 1)) return true;
    }
    return false;
  })();
  // Native select has rounded corners: sample inside the interactive surface, not transparent corners.
  const corners = [[.2, .25], [.8, .25], [.2, .75], [.8, .75], [.5, .5]].map(([x, y]) => [r.left + r.width * x, r.top + r.height * y]);
  const unoccluded = corners.filter(([x, y]) => {
    const top = document.elementFromPoint(x, y);
    return !!top && (el === top || el.contains(top));
  }).length;
  return {
    options: el.options.length,
    width: r.width, height: r.height, unoccluded,
    inViewport: r.left >= 0 && r.top >= 0 && r.right <= innerWidth && r.bottom <= innerHeight,
    visible: cs.display !== 'none' && cs.visibility !== 'hidden' && el.checkVisibility(),
    notClipped: el.scrollWidth <= el.clientWidth + 1 && el.scrollHeight <= el.clientHeight + 1 && !clippedByAncestor,
  };
};

// 无 GEV_BASE 时：进程内起 node:http 静态伺服 dist/（无子进程、无外部依赖）。
let staticServer;
if (!process.env.GEV_BASE) {
  const dist = path.join(root, 'dist');
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.geojson': 'application/json', '.geojsonl': 'application/json', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
  staticServer = http.createServer((req, res) => {
    try {
      const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      if (p === '/' || p === '/index.html') { res.writeHead(200, { 'content-type': types['.html'] }); res.end(fs.readFileSync(path.join(dist, 'index.html'))); return; }
      const rel = path.normalize(p.replace(/^\/+/, '')).replace(/^([a-zA-Z]:)?[\\/]+/, '');
      if (rel.startsWith('..') || path.isAbsolute(rel)) { res.writeHead(403); res.end(); return; }
      const file = path.join(dist, rel);
      if (!file.startsWith(dist) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'content-type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    } catch { res.writeHead(500); res.end(); }
  });
  staticServer.listen(0, '127.0.0.1');
  await new Promise(r => staticServer.once('listening', r));
}
const target = process.env.GEV_BASE || `http://127.0.0.1:${staticServer.address().port}`;

const outputDir = path.join(root, 'outputs/i18n-component-audit');
fs.mkdirSync(outputDir, { recursive: true });
const report = { scope: 'Production UI shell, 3 viewports x 5 languages x collapsed/expanded. External network blocked; no map/data-feed acceptance.', results: [] };
const geometryPass = g => !!g && g.options === 5 && g.visible && g.width > 0 && g.height > 0 && g.inViewport && g.notClipped && g.unoccluded === 5;
let browser;
let anyFail = false;
try {
  for (const [w, h] of [[1366, 768], [1600, 900], [1920, 1080]]) {
    browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--enable-unsafe-swiftshader'] });
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h });
    const r = { viewport: `${w}x${h}` };
    try {
      await page.setRequestInterception(true);
      page.on('request', req => {
        const url = req.url();
        if (url.startsWith(target + '/') || /^(data:|blob:|about:)/.test(url)) req.continue();
        else req.abort('blockedbyclient');
      });
      const consoleErrors = [];
      page.on('pageerror', e => consoleErrors.push('PAGEERROR: ' + String(e).slice(0, 200)));
      await page.goto(target + '/?lang=en', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForFunction(APP_READY, { timeout: 120000, polling: 1000 });
      r.appInit = true;
      await wait(1200); // 等首跑动效/settle

      r.select = await page.evaluate(SELECT_GEOMETRY);
      const enBaseline = await page.evaluate(CONTROL_TEXTS);
      r.exists = !!r.select && r.select.options === 5;
      r.geometryVisible = geometryPass(r.select);
      if (enBaseline.length < 5 || enBaseline.some(t => /[\u4e00-\u9fff\uac00-\ud7af]/.test(t))) throw new Error('Invalid English baseline');

      // 语言循环：en → zh-Hans → ja → 刷新(持久化) → 回 en（固定控件逐项还原）
      const lang = () => page.evaluate(() => ({ current: window.GEV_I18N?.current, htmlLang: document.documentElement.lang }));
      await page.select('#gev-language-select', 'zh-Hans');
      await wait(600);
      r.zhSwitch = (await lang()).current === 'zh-Hans';
      const zhTexts = await page.evaluate(CONTROL_TEXTS);
      r.zhHasCjk = zhTexts.some(t => /[\u4e00-\u9fff]/.test(t));
      await page.select('#gev-language-select', 'ja');
      await wait(600);
      r.jaSwitch = (await lang()).current === 'ja';
      const jaTexts = await page.evaluate(CONTROL_TEXTS);
      r.jaDistinct = jaTexts.join('\u0001') !== zhTexts.join('\u0001') && jaTexts.some(t => /[\u3040-\u30ff\u4e00-\u9fff]/.test(t));

      // 重载到无参数地址：确认 ja 来自 localStorage 持久化，而不是 URL 参数
      await page.goto(target + '/', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForFunction(APP_READY, { timeout: 120000, polling: 1000 });
      r.persistedAfterReload = (await lang()).current === 'ja';

      await page.select('#gev-language-select', 'en');
      await wait(600);
      const enTexts = await page.evaluate(CONTROL_TEXTS);
      r.enRestore = enTexts.length === enBaseline.length
        && enTexts.every((t, i) => t === enBaseline[i])
        && !enTexts.some(t => /[\u3040-\u30ff\u4e00-\u9fff\uac00-\ud7af]/.test(t));

      // 键盘 Ctrl+Alt+L 同步到选择器
      await page.keyboard.down('Control'); await page.keyboard.down('Alt');
      await page.keyboard.press('KeyL');
      await page.keyboard.up('Alt'); await page.keyboard.up('Control');
      await wait(600);
      r.shortcutSync = (await lang()).current === 'zh-Hans'
        && await page.evaluate(() => document.getElementById('gev-language-select').value === 'zh-Hans');

      // Dismiss welcome using its real keyboard handler; no DOM/CSS hiding.
      await page.keyboard.press('Escape');
      r.languageStates = [];
      for (const tag of ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko']) {
        await page.select('#gev-language-select', tag);
        await page.waitForFunction(tag => window.GEV_I18N.current === tag && document.documentElement.lang === tag && document.getElementById('gev-language-select').value === tag, {}, tag);
        await wait(500);
        for (const expanded of [false, true]) {
          const collapsed = await page.$eval('#pp-toggles', el => el.classList.contains('collapsed'));
          if (collapsed === expanded) await page.click('#pp-toggles [data-collapse-target="pp-toggles"]');
          await wait(450);
          const geometry = await page.evaluate(SELECT_GEOMETRY);
          const state = await page.evaluate(() => ({ tag: window.GEV_I18N.current, selected: document.getElementById('gev-language-select').value, stored: localStorage.getItem('gev.lang'), expanded: !document.getElementById('pp-toggles').classList.contains('collapsed'), display: document.querySelector('#pp-toggles .pp-header-label').textContent.trim() }));
          r.languageStates.push({ ...state, geometry, pass: state.tag === tag && state.selected === tag && state.stored === tag && state.expanded === expanded && geometryPass(geometry) });
          // Capture UI panel only: no map-provider acceptance implied.
          const panel = await page.$('#pp-toggles');
          await panel.screenshot({ path: path.join(outputDir, `panel-${w}-${tag}-${expanded ? 'expanded' : 'collapsed'}.png`) });
        }
      }
      r.fiveLanguageLayouts = r.languageStates.length === 10 && r.languageStates.every(s => s.pass);
      await page.focus('#gev-language-select');
      r.keyboardFocus = await page.evaluate(() => document.activeElement.id === 'gev-language-select');
      r.pageErrors = consoleErrors.slice(0, 5);
      r.finished = true;
    } catch (e) {
      r.error = String(e).slice(0, 300);
    } finally { await browser.close(); browser = null; }

    const pass = r.appInit && r.exists && r.geometryVisible && r.zhSwitch && r.zhHasCjk
      && r.jaSwitch && r.jaDistinct && r.persistedAfterReload && r.enRestore && r.shortcutSync
      && r.fiveLanguageLayouts && r.keyboardFocus && r.finished && !r.error && r.pageErrors?.length === 0;
    r.pass = !!pass;
    report.results.push(r);
    if (!pass) anyFail = true;
    console.log(`${w}x${h}: ${pass ? 'PASS' : 'FAIL'} ${JSON.stringify(r)}`);
  }
  report.pass = !anyFail;
  fs.writeFileSync(path.join(outputDir, 'live-report.json'), JSON.stringify(report, null, 2));
  process.exitCode = anyFail ? 1 : 0;
} finally {
  if (browser) await browser.close();
  if (staticServer) { staticServer.closeAllConnections(); await new Promise(resolve => staticServer.close(resolve)); }
}
