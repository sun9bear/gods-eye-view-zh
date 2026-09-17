/**
 * 从简体字典生成繁體字典
 * ==========================
 *
 * 为什么要有这个脚本：简体与繁體字典有 99% 的条目是同一件事，
 * 手工维护两份必然漂移。**简体那份是唯一真源**，繁體由本脚本生成。
 * 改完 public/i18n/dicts/zh-Hans.js，重跑一次即可。
 *
 * 依赖：opencc-js **不是**项目依赖（只在生成时需要）。先装：
 *   npm i -D opencc-js
 * 跑完可以再卸掉，生成出来的 zh-Hant.js 是自包含的静态文件。
 *
 * 用法（仓库根目录）：
 *   npm run i18n:gen-hant
 *   # 或指定路径
 *   node scripts/i18n-gen-hant.mjs <源 zh-Hans.js> <目标 zh-Hant.js>
 *
 * 转换档位说明：默认 s2t（cn → t），**纯字形转换**，不做台湾/香港用词替换，
 * 避免替使用者做地区词汇选择（数据/资料、加载/载入这类差异）。
 * 想要台湾用词把下面 to 改成 'twp'，香港用词改成 'hk'。
 */

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const DEFAULTS = ['public/i18n/dicts/zh-Hans.js', 'public/i18n/dicts/zh-Hant.js'];
const [srcPath, outPath] = process.argv.slice(2).length >= 2 ? process.argv.slice(2) : DEFAULTS;

let OpenCC;
try {
  OpenCC = await import('opencc-js');
} catch {
  console.error('缺少依赖 opencc-js。请先执行：\n  npm i -D opencc-js');
  process.exit(1);
}

const convert = OpenCC.default
  ? OpenCC.default.Converter({ from: 'cn', to: 't' })
  : OpenCC.Converter({ from: 'cn', to: 't' });
const c = (s) => (typeof s === 'string' ? convert(s) : s);

const mod = await import(pathToFileURL(path.resolve(srcPath)).href);

/** 生成单引号 JS 字符串字面量，与仓库既有风格一致 */
function js(value) {
  if (typeof value === 'function') return c(value.toString());
  if (value instanceof RegExp) return value.toString();
  if (value === null || value === undefined) return String(value);
  if (typeof value !== 'string') return JSON.stringify(value);
  return "'" + value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'";
}

const out = [];
out.push('/**');
out.push(" * God's Eye View — 繁體中文（zh-Hant）");
out.push(' * ==========================================');
out.push(' *');
out.push(' * ⚠️ **本文件由脚本自动生成，请勿手工修改。**');
out.push(' * 真源是 dicts/zh-Hans.js：改完简体后执行 `npm run i18n:gen-hant` 重新生成。');
out.push(' * 详见 public/i18n/README.md「新增一种语言」。');
out.push(' *');
out.push(' * 转换档位：OpenCC 纯字形转换（cn → t），不做台湾/香港用词替换。');
out.push(' * 需要台湾用词（软体、资讯、网路）时，把 scripts/i18n-gen-hant.mjs 里的 to 改成 twp。');
out.push(' */');
out.push('');
out.push('export const LOCALE = {');
out.push("  tag: 'zh-Hant',");
out.push("  label: '繁體中文',");
out.push("  short: '繁',");
out.push("  aliases: ['zh-TW', 'zh-HK', 'zh-MO', 'zh-Hant', 'tw', 'hk'],");
out.push('};');
out.push('');
out.push('export const dict = {');
for (const [k, v] of Object.entries(mod.dict)) out.push(`  ${js(k)}: ${js(c(v))},`);
out.push('};');
out.push('');
out.push('export const rules = [');
for (const [re, fn] of mod.rules) out.push(`  [${re.toString()}, ${js(fn)}],`);
out.push('];');
out.push('');
out.push('export const partial = [');
for (const [a, b] of mod.partial) out.push(`  [${js(a)}, ${js(c(b))}],`);
out.push('];');
out.push('');

fs.writeFileSync(outPath, out.join('\n'), 'utf8');
const size = fs.statSync(outPath).size;
console.log(`generated ${outPath} (${(size / 1024).toFixed(1)} KB)`);
console.log(`dict=${Object.keys(mod.dict).length} rules=${mod.rules.length} partial=${mod.partial.length}`);
