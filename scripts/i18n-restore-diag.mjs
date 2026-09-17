// 一次性诊断：en 基线 → zh → en 还原，打印逐项差异与 GEV_I18N 状态。
// 注意：必须显式带 ?lang=en 取基线。页面默认语言是 zh-Hans（gev-i18n.js
// DEFAULT_LANG），直接开 `/` 拿到的「基线」其实是中文，会把正常的
// 「密集 → DENSE」当成差异报出来。
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const wait = ms => new Promise(r => setTimeout(r, ms));
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const chrome = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find(p => fs.existsSync(p));

const dist = path.join(root, 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.geojson': 'application/json', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
const server = http.createServer((req, res) => {
  try {
    const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p === '/' || p === '/index.html') { res.writeHead(200, { 'content-type': types['.html'] }); res.end(fs.readFileSync(path.join(dist, 'index.html'))); return; }
    const rel = path.normalize(p.replace(/^\/+/, '')).replace(/^([a-zA-Z]:)?[\\/]+/, '');
    const file = path.join(dist, rel);
    if (!file.startsWith(dist) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'content-type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  } catch { res.writeHead(500); res.end(); }
});
server.listen(0, '127.0.0.1');
await new Promise(r => server.once('listening', r));
const target = `http://127.0.0.1:${server.address().port}`;

const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--enable-unsafe-swiftshader'] });
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 768 });
const APP_READY = () => window.GEV_I18N
  && document.getElementById('loading-screen')?.classList.contains('hidden') === true
  && getComputedStyle(document.getElementById('loading-screen')).visibility === 'hidden'
  && document.querySelector('#right-context-rail');
const CONTROL_TEXTS = () => [...document.querySelectorAll('#pp-toggles .pp-label, #hud-panel .panel-title, #status-bar .status-label')].map(el => ({ sel: el.id || el.className, text: el.textContent.trim() }));

await page.goto(target + '/?lang=en', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForFunction(APP_READY, { timeout: 120000, polling: 1000 });
await wait(1500);
const baseline = await page.evaluate(CONTROL_TEXTS);
const baselineLang = await page.evaluate(() => window.GEV_I18N?.current);
await page.select('#gev-language-select', 'zh-Hans');
await wait(800);
const zh = await page.evaluate(CONTROL_TEXTS);
await page.select('#gev-language-select', 'en');
await wait(1200);
const back = await page.evaluate(CONTROL_TEXTS);
const info = await page.evaluate(() => ({ current: window.GEV_I18N.current, applied: window.GEV_I18N?.appliedCount ?? null }));

const lines = [];
lines.push(`baselineLang=${baselineLang} baseline.len=${baseline.length} back.len=${back.length} current=${info.current}`);
for (let i = 0; i < Math.max(baseline.length, back.length); i++) {
  const b = baseline[i]?.text ?? '<missing>';
  const k = back[i]?.text ?? '<missing>';
  if (b !== k) lines.push(`DIFF#${i} [${baseline[i]?.sel || back[i]?.sel}] base="${b}" back="${k}"`);
}
lines.push('--- zh sample (first 8) ---');
for (const t of zh.slice(0, 8)) lines.push(`  [${t.sel}] "${t.text}"`);
fs.writeFileSync(path.join(root, 'outputs/live-restore-diag.txt'), lines.join('\n'), 'utf8');
await browser.close();
server.close();
console.log('diag written');
