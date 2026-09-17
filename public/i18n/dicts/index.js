/**
 * 语言注册表
 * ==========
 *
 * 新增一种语言：在 dicts/ 下加一个字典文件，然后**只改这一个文件**——
 * 加一行 import、加一行注册，引擎和其他地方都不用动。
 *
 * 'en' 永远是隐含可用的：英文是原文，不需要字典。
 *
 * 顺序即语言菜单顺序，也决定 Ctrl+Alt+L 的轮换顺序。
 */

import * as zhHans from './zh-Hans.js';
import * as zhHant from './zh-Hant.js';
import * as ja from './ja.js';
import * as ko from './ko.js';

/** @type {Array<{LOCALE: object, dict: object, rules: Array, partial: Array}>} */
export const DICTIONARIES = [zhHans, zhHant, ja, ko];

/** alias → 规范 tag 的查找表，例如 'zh' → 'zh-Hans'、'tw' → 'zh-Hant' */
export const ALIASES = new Map();
for (const m of DICTIONARIES) {
  for (const a of m.LOCALE.aliases || []) ALIASES.set(String(a).toLowerCase(), m.LOCALE.tag);
}

/** 语言菜单：英文排最前（它是原文，也是无翻译时的兜底） */
export const LANGUAGE_LIST = [
  { tag: 'en', label: 'English', short: 'EN' },
  ...DICTIONARIES.map((m) => ({
    tag: m.LOCALE.tag,
    label: m.LOCALE.label,
    short: m.LOCALE.short || m.LOCALE.tag,
  })),
];

/** 规范 tag → 字典模块 */
export const BY_TAG = new Map(DICTIONARIES.map((m) => [m.LOCALE.tag, m]));

/**
 * 把用户输入的任意写法解析成规范 tag；无法识别时返回 null。
 * 例：'zh' → 'zh-Hans'，'zh-TW' → 'zh-Hant'，'en' → 'en'
 */
export function resolveLang(input) {
  if (!input) return null;
  const raw = String(input).trim();
  if (!raw) return null;
  if (raw.toLowerCase() === 'en') return 'en';
  const lower = raw.toLowerCase();
  if (ALIASES.has(lower)) return ALIASES.get(lower);
  if (BY_TAG.has(raw)) return raw;
  return null;
}
