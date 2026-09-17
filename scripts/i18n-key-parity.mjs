/**
 * 字典键位对齐检查
 * ================
 * 报告每种语言相对**简体真源**缺失 / 多余的词典键与规则数量。
 *
 * 为什么需要：翻译层按「英文原文」查表，某个键只补了一种语言时，其余语言
 * 会静默地显示英文——不会报错、单测也不会有反应。这类缺口只能靠键位对账发现。
 *
 * 用法（仓库根目录）：node scripts/i18n-key-parity.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'public/i18n/dicts');
const LANGS = ['zh-Hans', 'zh-Hant', 'ja', 'ko'];

const mods = {};
for (const lang of LANGS) {
  mods[lang] = await import(pathToFileURL(path.join(dir, `${lang}.js`)).href);
}

const source = 'zh-Hans';
const srcKeys = new Set(Object.keys(mods[source].dict));

/**
 * 刻意不翻译的品牌 / 专有名词。缺这些键是**设计**，不是缺口——
 * 不列白名单的话这个脚本会永远报警、失去信号价值。
 */
const BRAND_ALLOWLIST = new Set([
  "GOD'S EYE",
  'VIEW',
  'OpenSky Network',
  'OpenStreetMap',
  'USACE',
  'GTFS-RT',
]);

const lines = [];
lines.push('字典键位对齐（基准 = zh-Hans 简体真源）');
lines.push('');
lines.push('语言        词条  规则  片段  缺键  多余键');
let gapCount = 0;
for (const lang of LANGS) {
  const keys = new Set(Object.keys(mods[lang].dict));
  const missing = [...srcKeys].filter((k) => !keys.has(k));
  const missingReal = missing.filter((k) => !BRAND_ALLOWLIST.has(k));
  const extra = [...keys].filter((k) => !srcKeys.has(k));
  gapCount += missingReal.length;
  lines.push(
    `${lang.padEnd(10)}${String(keys.size).padStart(5)}${String(mods[lang].rules.length).padStart(6)}` +
      `${String(mods[lang].partial.length).padStart(6)}${String(missingReal.length).padStart(6)}${String(extra.length).padStart(8)}`,
  );
  if (missingReal.length) {
    lines.push(`  缺: ${missingReal.join(' | ')}`);
  } else if (missing.length) {
    lines.push(`  缺（品牌白名单，预期）: ${missing.join(' | ')}`);
  }
  if (extra.length) {
    lines.push(`  多: ${extra.join(' | ')}`);
  }
  // 片段替换键也要对账：漏一个就会让整类混排文本残留英文
  const srcPartial = new Set(mods[source].partial.map(([k]) => k));
  const missPartial = [...srcPartial].filter((k) => !new Set(mods[lang].partial.map(([k]) => k)).has(k));
  if (missPartial.length) {
    gapCount += missPartial.length;
    lines.push(`  片段缺: ${missPartial.join(' | ')}`);
  }
}
lines.push('');
lines.push(gapCount === 0 ? '结论：四种语言词条与片段完全对齐。' : `结论：存在 ${gapCount} 处真实缺口，上列键在这些语言下会显示英文原文。`);

const outDir = path.join(root, 'outputs/i18n-key-parity');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'parity.txt'), lines.join('\n'), 'utf8');
console.log(lines.join('\n'));
process.exitCode = gapCount === 0 ? 0 : 1;
