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
- 本分支维护者：`YOUR-GITHUB-USER`（**push 前请全局替换此占位符**）

**这不是官方版本。** 上游作者没有参与本分支的开发、审核或背书。请不要把本分支的问题、
截图或行为当作上游项目的表现。

### 本分支改了什么

只做了一件事：**在英文原版之上加了一层运行时多语言界面**。

新增语言：**简体中文 / 繁體中文 / 日本語 / 한국어**（英文原文保留为默认回退）。

| 改动类型 | 文件 |
|---|---|
| 新增 | `public/i18n/`（翻译引擎 + 4 份字典 + 说明文档） |
| 新增 | `scripts/i18n-coverage.mjs`、`scripts/i18n-gen-hant.mjs`、`scripts/i18n-visual-audit.mjs` |
| 修改 | `index.html`（引入翻译层，1 行） |
| 修改 | `src/overlays/worldOverlay.js`、`src/layers/cctv/frames.js`、`src/data/detectionDraw.js`（canvas 文案走字典 + 全角宽度修正） |
| 修改 | `src/data/detectionDraw.test.mjs`（+2 项测试） |
| 修改 | `package.json`、`.gitignore`（元数据与忽略项） |
| 修改 | 4 处 User-Agent / Referer 里的项目地址，从上游改指本分支 |

**没有触碰任何业务逻辑。** 翻译层在 `src/` 侧全部是「有全局翻译钩子才翻译，没有就原样返回」
的可选调用，因此 Node 测试环境下的行为与上游逐位一致（上游自带的 305 个测试文件、
3904 项断言在本分支全绿）。

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
  架构，Key 只写入本地被 git 忽略的 `.env`。请勿把自己的 Key 提交进仓库或随站点分发。

### 报告问题

**请不要把本分支的问题报给上游作者。** 上游没有维护本分支的义务，向它提交本分支特有的
缺陷会浪费维护者时间。

| 问题类型 | 报给谁 |
|---|---|
| 翻译错误、缺译、语言切换异常、本分支的 canvas 改动 | **本分支**的 Issues |
| 上游原生的功能缺陷、数据源失效、性能问题（英文原版同样存在） | 上游 <https://github.com/bilawalsidhu/gods-eye-view/issues> |
| 安全漏洞（可被利用的那类） | 请走私有渠道，见 [`SECURITY.md`](SECURITY.md) |

判断方法：把语言切回英文（`Ctrl+Alt+L` 或 `?lang=en`）。若问题在英文下同样出现，
那它是上游的问题。

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
- Maintained by: `YOUR-GITHUB-USER` (**replace this placeholder before pushing**)

**This is not an official release.** The upstream author did not write, review, or endorse it.
Do not attribute this fork's behaviour, issues, or screenshots to the upstream project.

### What this fork changes

Exactly one thing: a **runtime multilingual UI layer** on top of the English original.

Added languages: **Simplified Chinese / Traditional Chinese / Japanese / Korean**. English is
retained as the default fallback.

No business logic was touched. Every `src/` call site is an optional hook that translates only
when a translation global exists and otherwise returns the string unchanged — so behaviour under
Node equals upstream, and upstream's own suite (305 test files, 3,904 assertions) passes here.

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

Switch the language back to English (`Ctrl+Alt+L` or `?lang=en`) first. If the problem persists
in English, it is an upstream issue and belongs in the upstream tracker.

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
