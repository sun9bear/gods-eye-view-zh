# Fork Notice / 分支声明

> **English summary follows the Chinese section.**
> 中文在前，英文在后。

---

## 中文

### 这是什么

这是 **God's Eye View 的非官方多语言分支**。

- 上游项目：<https://github.com/bilawalsidhu/gods-eye-view>，作者 **Bilawal Sidhu**
- 本分支基线：上游 `main` 分支的 commit `76c20be2773018164f274f3e48a25f857ceb1dd6`
  （2026-09-15，`feat(transit): live public-transit vehicles from open GTFS-Realtime feeds (#587)`）
- 本分支维护者：`sun9bear`

**这不是官方版本。** 上游作者没有参与本分支的开发、审核或背书。请不要把本分支的问题、
截图或行为当作上游项目的表现。

### 本分支改了什么

本分支以一件事为主线：**在英文原版之上加一层运行时多语言界面**；为让翻译在 canvas 文案与全角宽度上真正落地，另含少量配套源码改动（见下表）。

新增语言：**简体中文 / 繁體中文 / 日本語 / 한국어**（英文原文保留为默认回退）。

| 改动类型 | 文件 |
|---|---|
| 新增 | `public/i18n/`（翻译引擎 + 4 份字典 + 说明文档） |
| 新增 | `scripts/` 下 10 个 `i18n-*.mjs` 辅助脚本（生成 / 对齐 / 审计 / 回归，完整清单见文末「Modifications / 修改记录」表） |
| 修改 | `index.html`（引入翻译层，1 行） |
| 修改 | `src/overlays/worldOverlay.js`、`src/layers/cctv/frames.js`、`src/data/detectionDraw.js`（canvas 文案走字典 + 全角宽度修正） |
| 修改 | `src/data/detectionDraw.test.mjs`（+2 项测试） |
| 修改 | `package.json`、`.gitignore`（元数据与忽略项） |
| 修改 | 4 处 User-Agent / Referer 里的项目地址，从上游改指本分支 |

翻译层在 `src/` 侧全部是「有全局翻译钩子才翻译，没有就原样返回」的可选调用——这只能保证**没被钩子命中的字符串原样返回**，不能推出「英文路径整体不受影响」：DOM 层与观察器始终运行、全角宽度算法在 Node 下也生效，且本分支改过 `splitFlap.js` 等源码路径；下列行为与原版不同（详见 `public/i18n/README.md`）：

- **DOM 层 + 动态 skip 祖先检查**：运行时遍历 DOM 翻译文本节点与 `title`/`aria-label` 等属性，跳过 `material-symbols`/`svg` 等子树；
- **全角宽度**：`monoTextWidth` 的全角宽度算法在 Node 下同样生效（新增测试验证），canvas 宽度计算并非逐位一致；
- **翻牌状态原始输入隔离**：`splitFlap.js` 把原始输入与显示存入 `renderState` WeakMap，幂等判断比较原始输入、settle 用级联对象 token 而非 `textContent`——翻译改写文本不再破坏翻牌逻辑；
- **Canvas 原文快照 + 语言事件重翻**：canvas 文案经 `window.GEV_I18N.t()`；`worldOverlay.js` 在归一化时保存英文原文快照，`gev:language-changed` 时按快照重翻缓存条目并重置布局（引擎的 `t()` 缓存本身也清空，使 CCTV 等按需重绘）；
- **CCTV / 电台 / 图层生命周期**等动态状态串（如 `CCTV ON`、`ENABLING`、`PAUSE`）已补全到字典；动态插值串（会话费用、模型提示、场景镜头、Overpass 重试组合串、天气与云量）改由**规则**覆盖而非冻结词条。键位对齐与运行时字符串核对见 `scripts/i18n-key-parity.mjs`、`scripts/i18n-claim-audit.mjs`。

测试数字要连日期和批次一起看：**2026-09-17** 主批 3908 项（3899 通过、9 跳过），另两批分别 1 项和 13 项全部通过；合计 **3922 项测试 / 3913 通过 / 9 跳过 / 0 失败**，退出码 0。同日 `scripts/i18n-runtime-test.mjs` 的浏览器运行时回归为 **407 项检查全部通过，0 页面 console 错误**（页面错误已计入判据）；`scripts/i18n-claim-audit.mjs` 的运行时字符串核对为 **61 用例 × 4 语言，漏译 0**。**2026-09-18**（译文修正 + CJK 字体栈之后）全量重跑：单元测试同为 3922/3913/9/0，`i18n:parity` 四语对齐，`i18n:strings` 61×4 漏译 0，运行时回归 **408 项通过、0 console 错误**。早前文档中的「209/209」是更早一批的检查数，与 407 不是同一批次，已停止引用。这些结果只覆盖受测场景，**不证明与上游逐位一致，也不代表所有真实数据状态和布局均已验收**。

技术细节、踩坑记录与回归清单见 [`public/i18n/README.md`](public/i18n/README.md)。

### 使用许可与约束

- **源码**：继续适用上游的 MIT 许可，见 [`LICENSE`](LICENSE)。本分支的修改同样以 MIT 发布。
  完整版权声明见 LICENSE 末尾的「Modifications in this fork」段。
- **第三方数据与资产**：**不属于 MIT**，各自适用其原始许可。逐源清单见
  [`DATA_SOURCES.md`](DATA_SOURCES.md) 与 [`LICENSE`](LICENSE) 的第三方数据说明段。

**本分支被声明为「非商业用途」。** 这不是额外限制，而是为了满足它所捆绑数据的许可条件：

- `src/data/local_data/telegeography_submarine_cables/`（TeleGeography 海底电缆数据）
  采用 **CC BY-NC-SA 3.0**，**禁止商业使用**。上游 LICENSE 明确要求：商用必须删除该目录
  或另行取得 TeleGeography 的商业许可。
- Cesium ion 的免费额度限**个人非商业**用途；OpenSky 的许可本身也含非商业限定。

> **如果你要基于本分支做商业用途**：至少必须删除上述海底电缆数据目录，并自行核查
> 每一个数据源与服务商的当前条款。删除该目录后应用仍可正常运行。

- **不得预置凭据**：本分支不附带任何 API Key。所有需要凭据的数据源都采用「用户自备 Key」
  架构。请勿把自己的 Key 提交进仓库。

  凭据分两类，别混为一谈：

  - **服务端密钥**（如 OpenAI）：只写入本地被 git 忽略的 `.env`，由本地服务端使用，
    不会下发到访问者的浏览器。
  - **浏览器可见凭据**（Google Maps Key、Cesium ion token）：**必然**由浏览器直接携带
    发出，任何访问者都能在自己的网络面板里看到。它们不是秘密，保护手段是在服务商侧
    设**来源限制（HTTP referrer 白名单）**并监控配额，而不是「不公开」。

  所以上面「只写入 `.env`」只适用于第一类；把浏览器可见凭据当成私钥来理解会得出错误的
  安全结论。上游的「服务商设置」弹窗里也是这样区分的。

### 报告问题

**请不要把本分支的问题报给上游作者。** 上游没有维护本分支的义务，向它提交本分支特有的
缺陷会浪费维护者时间。

| 问题类型 | 报给谁 |
|---|---|
| 翻译错误、缺译、语言切换异常、本分支的 canvas 改动 | **本分支**的 Issues |
| 上游原生的功能缺陷、数据源失效、性能问题（英文原版同样存在） | 上游 <https://github.com/bilawalsidhu/gods-eye-view/issues> |
| 安全漏洞（可被利用的那类） | 请走私有渠道，见 [`SECURITY.md`](SECURITY.md) |

判断方法：切回英文（`Ctrl+Alt+L` 或 `?lang=en`）可以快速排除**纯文案**类问题，
**但不能据此判断归属**——切英文不会撤销 canvas 宽度计算、翻译观察器，也不会撤销
本分支对 4 处 User-Agent 和 1 处测试断言的改动。

要确认是上游问题，必须在**未修改的上游基线**（`76c20be`）、相同配置下复现。

### 与上游同步

本分支不追求紧跟上游。若你要合并上游更新：

```bash
git remote add upstream https://github.com/bilawalsidhu/gods-eye-view.git
git fetch upstream
git merge upstream/main
```

翻译层是**追加式**的——它不改上游源码里的英文字符串，只在上游文案失配时回退到英文。
所以上游改了文案不会让构建失败，那条译文会静默退回英文，可用
`npm run i18n:coverage` 找出失配项。

---

## English

### What this is

This is an **unofficial multilingual fork of God's Eye View**.

- Upstream: <https://github.com/bilawalsidhu/gods-eye-view> by **Bilawal Sidhu**
- Fork base: upstream `main` at commit `76c20be2773018164f274f3e48a25f857ceb1dd6`
  (2026-09-15, `feat(transit): live public-transit vehicles from open GTFS-Realtime feeds (#587)`)
- Maintained by: `sun9bear`

**This is not an official release.** The upstream author did not write, review, or endorse it.
Do not attribute this fork's behaviour, issues, or screenshots to the upstream project.

### What this fork changes

One main thing: a **runtime multilingual UI layer** on top of the English original, plus a few
small supporting changes listed below.

Added languages: **Simplified Chinese / Traditional Chinese / Japanese / Korean**. English is
retained as the default fallback.

Every `src/` call site is an optional hook that translates only when a translation global exists and otherwise returns the string unchanged — but that only means an **unhooked string is returned unchanged**, not that the English path is unaffected overall: the DOM layer and its observer run regardless, the full-width width algorithm also applies under Node, and the fork edits source paths such as `splitFlap.js`. Several behaviours differ from the original (see `public/i18n/README.md`):

- **DOM layer + dynamic skip-ancestor check**: walks the DOM at runtime translating text nodes and `title`/`aria-label` attributes, skipping `material-symbols`/`svg` subtrees;
- **full-width width**: the `monoTextWidth` full-width algorithm also applies under Node (a new test verifies it), so canvas width math is not bit-for-bit identical;
- **flip-state raw-input isolation**: `splitFlap.js` keeps the raw input and the displayed text in a `renderState` WeakMap; idempotency compares the raw input and settle bails unless it is still the live cascade object — translated text no longer breaks the flap logic;
- **canvas original-snapshot + language-event re-translate**: canvas text goes through `window.GEV_I18N.t()`; `worldOverlay.js` snapshots the English original at normalization and re-translates cached entries from that snapshot and resets layout on `gev:language-changed` (the engine also clears its `t()` cache so CCTV frames redraw with new text);
- dynamic status strings for **CCTV / radio / layer lifecycle** (e.g. `CCTV ON`, `ENABLING`, `PAUSE`) are in the dictionary; interpolated strings (session cost, voice-model hints, scene-shot meta, the Overpass retry compound, weather and cloud cover) are covered by **rules** rather than frozen entries. Key parity and runtime-string checks: `scripts/i18n-key-parity.mjs`, `scripts/i18n-claim-audit.mjs`.

Test numbers only mean anything with a date and a batch: on **2026-09-17** the main batch was 3,908 tests (3,899 pass, 9 skip) plus two further batches (1 and 13 tests, all passing): **3,922 tests / 3,913 pass / 9 skip / 0 fail**, exit code 0. The same day `scripts/i18n-runtime-test.mjs` reported **407 checks passing with 0 page console errors** (page errors are now part of the pass criterion), and `scripts/i18n-claim-audit.mjs` reported **61 runtime strings × 4 languages with 0 untranslated**. On **2026-09-18**, after the translation fixes and the CJK font-stack work, a full rerun gave the same unit-test totals (3,922/3,913/9/0), four-language key parity, 61×4 runtime strings with 0 untranslated, and the browser regression at **408 checks passing with 0 console errors**. The “209/209” in earlier revisions is a different, earlier batch and is no longer cited. These results cover tested scenarios only; **they do not establish bit-for-bit upstream equivalence or complete live-state and layout acceptance**.

See [`public/i18n/README.md`](public/i18n/README.md) for the design, the pitfalls, and the
regression checklist.

### License and constraints

- **Source code:** still MIT, per [`LICENSE`](LICENSE). This fork's modifications are likewise
  released under MIT. See the "Modifications in this fork" section appended to LICENSE.
- **Third-party data and assets:** **not** covered by MIT; each keeps its own license
  ([`DATA_SOURCES.md`](DATA_SOURCES.md), plus the third-party note inside LICENSE).

**This fork is declared non-commercial.** That is not an added restriction — it is what the
bundled data requires:

- `src/data/local_data/telegeography_submarine_cables/` is **CC BY-NC-SA 3.0**: NonCommercial +
  ShareAlike. Upstream's LICENSE states that commercial use requires removing these files or
  obtaining a commercial license from TeleGeography.
- Cesium ion's free tier is limited to **personal, non-commercial** use; OpenSky's license is
  itself non-commercial.

> **For commercial use:** at minimum, delete the submarine-cable data directory above and
> re-verify every source and provider's current terms. The app still runs without it.

- **No bundled credentials.** No API key ships with this fork. Providers that need keys use a
  bring-your-own-key model, with keys written only to a git-ignored local `.env`. Never commit
  your key or serve it to visitors.

### Reporting

**Please do not report this fork's issues upstream.** The upstream maintainer has no obligation
to support this fork.

Switching back to English (`Ctrl+Alt+L` or `?lang=en`) can help isolate wording issues, but does not undo this fork's source changes. Before reporting upstream, reproduce the problem on the unmodified upstream base (`76c20be`) with the same configuration.

---

## Modifications / 修改记录

| Path | Change / 改动 |
|---|---|
| `public/i18n/gev-i18n.js` | New — runtime translation engine / 新增：运行时翻译引擎 |
| `public/i18n/dicts/*.js` | New — `zh-Hans`, `zh-Hant`, `ja`, `ko` dictionaries / 新增：四份字典 |
| `public/i18n/README.md` | New — design notes, pitfalls, regression checklist / 新增：设计说明与踩坑记录 |
| `scripts/i18n-coverage.mjs` | New — residual-English scanner / 新增：残留英文扫描器 |
| `scripts/i18n-gen-hant.mjs` | New — Traditional Chinese generator (OpenCC) / 新增：繁體生成器 |
| `scripts/i18n-visual-audit.mjs` | New — layout overflow + mixed-language audit / 新增：布局与混杂审计 |
| `scripts/i18n-audit-dicts.mjs` | New — dictionary cross-language audit / 新增：字典跨语言审校器 |
| `scripts/i18n-runtime-test.mjs` | New — headless-browser runtime regression / 新增：无头浏览器运行时回归 |
| `scripts/i18n-key-parity.mjs` | New — dictionary key parity check / 新增：字典键位对齐检查 |
| `scripts/i18n-claim-audit.mjs` | New — runtime-string coverage audit (feeds real concatenated strings to `t()`) / 新增：运行时字符串覆盖核对 |
| `scripts/i18n-component-audit.mjs` | New — isolated component integration check / 新增：隔离组件集成检查 |
| `scripts/i18n-live-verify.mjs` | New — full-page shell acceptance on the production build / 新增：生产构建页面壳层验收 |
| `scripts/i18n-restore-diag.mjs` | New — one-off en→zh→en restore diagnostic / 新增：en↔zh 还原诊断 |
| `src/splitFlap.js` | Flip-state raw-input isolation so DOM translation cannot break idempotency/settle / 翻牌状态原始输入隔离，翻译改写不再破坏翻牌逻辑 |
| `src/splitFlap.test.mjs` | New test covering repeat calls, settle with a rewritten node, switching translation, and reuse after destroy / 新增一项测试：重复调用、节点被改写后的收尾、切换译文、销毁后复用 |
| `src/overlays/worldOverlay.test.mjs` | +tests for snapshot re-translation and language-event re-layout / 补快照重翻与语言事件重排断言 |
| `src/overpassProxy.test.mjs` | Assertion follows the fork User-Agent / 断言随分支 UA 调整 |
| `src/ui/layerPanel.js` | One attribute write: `data-gev-i18n-skip-text` on chips that declare `skipTextI18n` (the CLEAR chip) / 仅一处属性写入：给声明了 `skipTextI18n` 的芯片（CLEAR）打 `data-gev-i18n-skip-text` |
| `src/layers/directions/index.js` | Direction chip strings routed through the dictionary / 路线芯片文案走字典 |
| `src/ui/templates/display-controls.html` | Language `<select>` in the DISPLAY panel / 显示面板新增语言下拉框 |
| `src/ui/styles/controls.css` | Styles for the language selector / 语言下拉框样式 |
| `src/ui/styles/foundation.css` | Per-language CJK font fallback chain (`--font-cjk` + `html:lang()`) / 按语言切换的 CJK 字体回退链 |
| `src/ui/styles/radio.css` | Layer rows: label ellipsis + nowrap on toggle buttons/chips / 图层行标签省略号、开关与芯片禁止折行 |
| `src/ui/styles/overlays.css` | Tightened `.hud-summary` letter-spacing for CJK / CJK 下收紧 HUD 摘要字距 |
| `docs/CURRENT-STATE.md` | Fork status notes / 分支状态备注 |
| `README.md`, `README.zh-Hans.md`, `FORK-NOTICE.md`, `LICENSE` | Fork notices, bilingual docs, license modification record / 分支声明、双语文档与许可修改记录 |
| `index.html` | Load the translation layer before `main.js` / 在 main.js 之前引入翻译层 |
| `src/overlays/worldOverlay.js` | Route overlay card text through the dictionary before measurement / 卡片文案先翻译后测量 |
| `src/layers/cctv/frames.js` | Route fallback status text through the dictionary / 状态兜底文案走字典 |
| `src/data/detectionDraw.js` | Full-width aware advance in `monoTextWidth` / 等宽宽度估算支持全角 |
| `src/data/detectionDraw.test.mjs` | +2 assertions for the above / 为上述行为补 2 项断言 |
| `server/providers/space/celestrak.js` | User-Agent points at this fork / UA 改指本分支 |
| `server/providers/overpass/constants.js` | User-Agent points at this fork / UA 改指本分支 |
| `server/providers/regional/place.js` | User-Agent + Referer point at this fork / UA 与 Referer 改指本分支 |
| `src/data/transitProxy.js` | User-Agent points at this fork / UA 改指本分支 |
| `package.json` | Fork metadata / 分支元数据 |
| `.gitignore` | Ignore generated i18n reports / 忽略生成的 i18n 报告 |
| `.github/*`, `SECURITY.md`, `CONTRIBUTING.md` | Point at this fork's reporting paths / 指向本分支的上报路径 |
