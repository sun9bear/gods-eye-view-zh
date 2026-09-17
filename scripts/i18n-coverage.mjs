/**
 * 中文覆盖率扫描器
 * =================
 *
 * 打开应用、把能点开的面板都点开，然后列出**所有仍然是英文**的 DOM 文本与属性，
 * 用来衡量中文翻译层的覆盖率、发现字典失配（上游改了英文文案）。
 *
 * 用法：
 *   npm run dev                     # 另开一个终端，先把应用跑起来
 *   npm run i18n:coverage           # 默认 http://127.0.0.1:4173
 *   GEV_BASE=http://127.0.0.1:5173 npm run i18n:coverage
 *
 * 输出：
 *   - 终端摘要（总数 + 分组计数）
 *   - i18n-coverage.json  完整清单，便于逐条补字典
 *
 * 注意：扫描结果里**必然**有一部分是故意保留的英文——品牌名、URL、环境变量名、
 * 城市名、呼号、地理与军事标识。判断哪些该翻，见 public/i18n/README.md 第七节。
 */

import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.GEV_BASE || 'http://127.0.0.1:4173/';
const OUT = process.env.GEV_OUT || path.resolve('i18n-coverage.json');

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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** 在页面里跑的抽取逻辑：文本节点 + title/aria-label/placeholder */
const EXTRACT = () => {
  const SKIP_CLASS = /material-symbols|material-icons/;

  const rejected = (node) => {
    let el = node.nodeType === 1 ? node : node.parentElement;
    while (el) {
      const tag = el.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'svg' || tag === 'SVG') return true;
      if (typeof el.className === 'string' && SKIP_CLASS.test(el.className)) return true;
      if (el.hasAttribute && el.hasAttribute('data-gev-noi18n')) return true;
      el = el.parentElement;
    }
    return false;
  };

  // 已翻译的判定：不含任何「非拉丁文字」才算残留。
  // 注意必须涵盖假名与谚文，否则日文/韩文界面里
  // "ディレクトリ：Radio Browser" 这种已翻译的串会被误报为残留。
  const NON_LATIN = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7a3\uf900-\ufaff\u0400-\u04ff\u0590-\u05ff\u0600-\u06ff]/;
  const isEnglish = (t) => /[A-Za-z]/.test(t) && !NON_LATIN.test(t) && /[A-Za-z]{2,}/.test(t);

  const texts = new Map();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (rejected(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  let n = walker.nextNode();
  while (n) {
    const raw = (n.nodeValue || '').replace(/\s+/g, ' ').trim();
    if (raw && isEnglish(raw)) texts.set(raw, (texts.get(raw) || 0) + 1);
    n = walker.nextNode();
  }

  const attrs = new Map();
  for (const el of document.querySelectorAll('*')) {
    if (rejected(el)) continue;
    for (const a of ['title', 'aria-label', 'placeholder', 'aria-description']) {
      if (!el.hasAttribute(a)) continue;
      const v = (el.getAttribute(a) || '').trim();
      if (v && isEnglish(v)) {
        const k = `[${a}] ${v}`;
        attrs.set(k, (attrs.get(k) || 0) + 1);
      }
    }
  }

  return {
    texts: [...texts.entries()].map(([text, count]) => ({ text, count })),
    attrs: [...attrs.entries()].map(([text, count]) => ({ text, count })),
    lang: document.documentElement.lang,
    dict: window.GEV_I18N?.stats?.() || null,
  };
};

/** 尽量把界面点开，让更多文案进入 DOM */
async function surfaceUi(page) {
  const tryClick = async (selector) => {
    try {
      const el = await page.$(selector);
      if (el) {
        await el.click();
        await sleep(600);
        return true;
      }
    } catch {
      /* 互动失败不影响扫描 */
    }
    return false;
  };

  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sleep(9000);

  // 首次运行卡：不按 Escape（那会整块丢掉欢迎卡文案），而是点「手动探索」
  await page.evaluate(() => {
    document.querySelector('[data-first-run-choice="explore"]')?.click();
  });
  await sleep(5000);

  // 展开全部可折叠面板
  for (const btn of await page.$$('button[data-collapse-target]')) {
    try {
      await btn.click();
      await sleep(350);
    } catch {
      /* 忽略 */
    }
  }

  // 底部托盘 + 密钥弹窗
  await tryClick('button[data-dock-toggle-target="control-panel"]');
  await tryClick('button[data-dock-toggle-target="location-bar"]');
  await tryClick('button[aria-controls="key-setup"]');

  await sleep(2500);
}

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  protocolTimeout: 300000,
  args: [
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--window-size=1440,900',
  ],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const consoleErrors = [];
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200));
});
page.on('pageerror', (e) => consoleErrors.push('PAGEERROR ' + String(e).slice(0, 200)));

await surfaceUi(page);
const data = await page.evaluate(EXTRACT);
await browser.close();

fs.writeFileSync(OUT, JSON.stringify({ ...data, consoleErrors }, null, 1), 'utf8');

const total = data.texts.length + data.attrs.length;
console.log('=== 中文覆盖率扫描 ===');
console.log(`lang=${data.lang}  字典规模=${JSON.stringify(data.dict)}`);
console.log(`残留英文：文本 ${data.texts.length} 条 / 属性 ${data.attrs.length} 条 = 共 ${total} 条`);
console.log(`console 错误：${consoleErrors.length}`);
console.log(`完整清单已写入：${OUT}`);
console.log('（注意：其中品牌名、URL、环境变量名、城市名、呼号等属于刻意保留，见 public/i18n/README.md）');
