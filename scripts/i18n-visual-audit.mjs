/**
 * 多语言视觉终检
 * ==============
 *
 * 对每种语言跑一遍，做两件事：
 *   1. **客观溢出检测** —— 找出被裁切/省略号截断的元素（scrollWidth/Height 超过可视区）
 *      并按溢出比例排序，用来判断是不是译文把固定宽度容器撑破了
 *   2. **逐屏截图** —— 欢迎卡 / 全开面板 / 密钥弹窗 / 场景面板，供人眼核对
 *
 * 它补充 `npm run i18n:coverage` 的两个盲区：覆盖率的判定是「含拉丁字母且不含中日韩」，
 * 所以报不出**中英混杂串**（如 `Expand 定位`）与**英文模式下的译文残留**。
 * 本脚本的第二部分专门查混杂。
 *
 * 用法：
 *   npm run dev                        # 另一个终端先把应用跑起来
 *   npm run i18n:audit                 # 默认跑全部已注册语言
 *   npm run i18n:audit -- ja ko        # 只跑指定语言
 *   GEV_BASE=http://127.0.0.1:5173 npm run i18n:audit
 *
 * 输出：`i18n-audit/` 下的截图与 report.json（已 gitignore）
 */

import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.GEV_BASE || 'http://127.0.0.1:4173/';
const OUT = path.resolve(process.env.GEV_AUDIT_OUT || 'i18n-audit');
const GIVEN = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const LANGS = GIVEN.length ? GIVEN : ['zh-Hans', 'zh-Hant', 'ja', 'ko'];

const CHROME_CANDIDATES = [
  process.env.GEV_CHROME,
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const executablePath = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!executablePath) {
  console.error('找不到 Chrome/Edge。用 GEV_CHROME=/path/to/chrome 指定。');
  process.exit(1);
}

fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------------------------------------------------------- 页面内检测 */

/** 找被裁切/省略号截断的元素，按溢出比例降序、同一文本只留最严重的一条 */
const DETECT_OVERFLOW = () => {
  const SKIP = /material-symbols|material-icons/;
  const findings = [];
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  for (const el of document.querySelectorAll('body *')) {
    if (SKIP.test(typeof el.className === 'string' ? el.className : '')) continue;
    if (el.closest('svg')) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') continue;

    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) continue;
    if (r.bottom < 0 || r.right < 0 || r.top > vh || r.left > vw) continue;

    const text = (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
    if (!text) continue;

    const clippedX = el.scrollWidth > el.clientWidth + 1;
    const clippedY = el.scrollHeight > el.clientHeight + 1;
    const hidesX = cs.overflowX === 'hidden' || cs.overflowX === 'clip';
    const hidesY = cs.overflowY === 'hidden' || cs.overflowY === 'clip';

    if ((clippedX && (hidesX || cs.textOverflow === 'ellipsis')) || (clippedY && hidesY)) {
      findings.push({
        tag: el.tagName,
        cls: typeof el.className === 'string' ? el.className.slice(0, 60) : '',
        id: el.id || '',
        text: text.slice(0, 120),
        scrollW: el.scrollWidth,
        clientW: el.clientWidth,
        scrollH: el.scrollHeight,
        clientH: el.clientHeight,
        axis: clippedX ? (clippedY ? 'xy' : 'x') : 'y',
        ellipsis: cs.textOverflow === 'ellipsis',
        ratio: clippedX && el.clientWidth > 0 ? +(el.scrollWidth / el.clientWidth).toFixed(2) : 1,
      });
    }
  }
  const byText = new Map();
  for (const f of findings.sort((a, b) => b.ratio - a.ratio)) {
    if (!byText.has(f.text)) byText.set(f.text, f);
  }
  return [...byText.values()];
};

/** 找中英混杂串（拉丁词与中日韩字符相邻），只看叶子节点避免父节点拼接误判 */
const DETECT_MIXED = () => {
  const MIXED = /[A-Za-z]{2,}[^A-Za-z\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7a3]{0,3}[\u3040-\u30ff\u4e00-\u9fff\uac00-\ud7a3]|[\u3040-\u30ff\u4e00-\u9fff\uac00-\ud7a3][^\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7a3]{0,3}[A-Za-z]{2,}/;
  const out = new Set();
  for (const el of document.querySelectorAll('body *')) {
    if (el.children.length > 0) continue;
    const t = (el.textContent || '').replace(/\s+/g, ' ').trim();
    if (!t || t.length > 60) continue;
    if (MIXED.test(t)) out.add(t);
  }
  return [...out];
};

/* ------------------------------------------------------------- 主流程 */

const report = {};

for (const lang of LANGS) {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    protocolTimeout: 300000,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-webgl', '--ignore-gpu-blocklist',
      '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--window-size=1600,900'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });
  const errs = [];
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 150)); });
  page.on('pageerror', (e) => errs.push('PAGEERROR ' + String(e).slice(0, 150)));

  const entry = { lang };

  // 状态一：欢迎卡（不按 Escape —— 那会整块丢掉欢迎卡文案）
  await page.goto(`${BASE}${BASE.includes('?') ? '&' : '?'}lang=${lang}`, {
    waitUntil: 'domcontentloaded', timeout: 60000,
  });
  await sleep(10000);
  await page.screenshot({ path: path.join(OUT, `${lang}-1-welcome.png`) });
  entry.welcome = await page.evaluate(DETECT_OVERFLOW);

  await page.evaluate(() => document.querySelector('[data-first-run-choice="explore"]')?.click());
  await sleep(5000);

  // 状态二：展开全部面板 + 开几个轻量图层（全开会让 SwiftShader 下的页面卡到 evaluate 超时）
  for (const btn of await page.$$('button[data-collapse-target]')) {
    try { await btn.click(); await sleep(350); } catch { /* 忽略 */ }
  }
  await page.evaluate(() => {
    for (const id of ['flights', 'satellites', 'bikeshare']) {
      document.querySelector(`#data-toggles .data-toggle-row[data-layer-id="${id}"] .data-toggle-btn`)?.click();
    }
  });
  await sleep(9000);
  await page.screenshot({ path: path.join(OUT, `${lang}-2-panels.png`) });
  entry.panels = await page.evaluate(DETECT_OVERFLOW);
  entry.mixed = await page.evaluate(DETECT_MIXED);

  // 状态三：密钥弹窗
  try {
    (await page.$('button[aria-controls="key-setup"]'))?.click();
    await sleep(2500);
    await page.screenshot({ path: path.join(OUT, `${lang}-3-keys.png`) });
    entry.keys = await page.evaluate(DETECT_OVERFLOW);
    await page.keyboard.press('Escape');
    await sleep(1200);
  } catch { entry.keys = []; }

  // 状态四：场景面板
  try {
    const s = await page.$('button[data-collapse-target="scenes-panel"]');
    if (s) { await s.click(); await sleep(1500); }
  } catch { /* 忽略 */ }
  await page.screenshot({ path: path.join(OUT, `${lang}-4-scenes.png`) });
  entry.scenes = await page.evaluate(DETECT_OVERFLOW);

  entry.errors = errs;
  report[lang] = entry;
  await browser.close();

  const clipped = ['welcome', 'panels', 'keys', 'scenes'].reduce((n, k) => n + (entry[k]?.length || 0), 0);
  console.log(
    `${lang}: 裁切 ${clipped} 处 / 混杂 ${(entry.mixed || []).length} 条 / console 错误 ${errs.length}`,
  );
}

fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 1), 'utf8');
console.log(`\n截图与报告 -> ${OUT}`);
console.log('提示：裁切里必然含 #hud-summary（项目原生截断，英文同样溢出）与 Cesium 自身容器，属正常。');
