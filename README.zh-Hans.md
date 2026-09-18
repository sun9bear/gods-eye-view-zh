# 🌐 God's Eye View · 中文说明

[English README](README.md) · [分支声明 FORK-NOTICE](FORK-NOTICE.md)

> ### ⚠️ 非官方分支 · 仅限非商业用途
>
> 这是 God's Eye View 的**非官方多语言分支**，在英文原版之上加了一层运行时界面翻译。
> 与上游作者 **Bilawal Sidhu** 无关、未获其背书。**不要**把本分支的问题报给上游。
>
> 本分支声明为**非商业用途**——这不是额外限制，而是它所捆绑数据的许可要求
> （详见 [许可与合规](#许可与合规)）。

![Orbital HUD 与实时地球](docs/media/hero-open-source-reveal.gif)

---

## 这是什么

一个跑在浏览器里的**实时地球情报台**：照片级 3D 地球，叠加实时的飞机、船舶、卫星、
地震、路况、公共摄像头与无线电。数据全部来自公开源。

这个分支的主要工作是**把界面翻译成中文**（另附繁體中文、日本語、한국어）。

它**不是**上游的逐位复刻：除界面文案外，本分支会改动

- `index.html` 加翻译层引入，`package.json` 加几个脚本；
- DISPLAY 面板新增一个语言选择框（上游没有这个入口）；
- canvas 绘制路径上几个**可选**调用点（`worldOverlay.js` / `frames.js` / `detectionDraw.js` / `splitFlap.js`），未加载翻译层时行为不变；
- 抽掉个别运行期字符串的歧义（如路由面板的 `CLEAR` 芯片让开与天气 `CLEAR` 的撞车）。

因此：**功能与数据源以上游为准，界面文案与上述几处改动属于本分支**。判断一个缺陷是不是本分支引入的，不要只看它出现在中英文哪一侧——两边都要在未修改的上游版本上复现过才能定论。

---

## 界面语言

**默认就是简体中文。** 开箱即用，无需任何配置。

| 语言 | 指定方式 |
|---|---|
| **简体中文**（默认） | `?lang=zh-Hans` |
| 繁體中文 | `?lang=zh-Hant` |
| 日本語 | `?lang=ja` |
| 한국어 | `?lang=ko` |
| English（原版） | `?lang=en` |

| 操作 | 方式 |
|---|---|
| 轮换语言 | `Ctrl + Alt + L` |
| 指定语言 | `window.GEV_I18N.set('ja')` |
| 查当前语言 | `window.GEV_I18N.current` |
| 查字典规模 | `window.GEV_I18N.stats()` |

选择会记在 `localStorage['gev.lang']`，下次打开保持。

**翻译层的设计原则：翻不出来就显示英文，绝不显示错的中文。** 所以上游改了文案不会
让界面崩掉，那条会静默退回英文。想找出失配项，跑 `npm run i18n:coverage`。

界面里刻意**保留英文**的部分：品牌与数据源专名（`OpenStreetMap`、`adsb.lol`）、
环境变量名、域名与 URL、城市名、飞机呼号、地理标识（`MGRS: 14R PU 2090 4906`）、
行业通用缩写（`HUD`、`OSM`、`FL280`、`kts`）。这些翻掉反而会让读得懂的人看不懂。

---

## 快速开始

需要 **Node.js 24.14.0+ 或 26.x**。

```bash
git clone https://github.com/sun9bear/gods-eye-view-zh.git
cd gods-eye-view-zh
npm ci
npm run doctor
npm run dev
```

打开 **http://localhost:4173** ，首次进入会看到中文的首屏引导卡。

> **注意**：上游 README 里的 **Pinokio 一键安装装的是上游英文原版**，不是这个分支。
> 要中文界面请走上面的终端路径。安装步骤与问题排查基本一致，
> 上游的安装说明仍然适用（见 [README.md](README.md#-quick-start)）。

### 需要 API Key 吗？

**不需要，开箱即用。** 无 Key 状态下使用 Esri 卫星影像 + 无 Key 地形，
飞机、军用飞机、卫星、地震、公共摄像头、无线电、火箭发射都能用。

Key 是**升级项**，不是前置条件。需要时点右下角的 **POWER UP** 芯片，
在「服务商设置」里粘贴——面板本身就是中文的，会告诉你每个 Key 能开启什么、去哪申请。

| Key | 开启什么 | 备注 |
|---|---|---|
| **Cesium ion**（免费） | 世界地形 + ion 托管的 Google 3D | 免费额度限**个人非商业**；token 由浏览器使用 |
| **Google Maps**（计量付费） | 照片级 3D + 地点搜索 | 浏览器端 Key，**必须**设来源限制 |
| **OpenAI** | 语音控制（对话式操作） | 按量计费，Key 只留在服务端 |
| **AISStream**（免费） | 实时船舶 | |
| **NASA FIRMS**（免费） | 活火点 | |
| **TomTom**（有免费额度） | **实时流速／拥堵颜色**，驱动模拟车流 | 车辆点位仍是模拟，**不是**真实单车轨迹；不填则连流速也是模拟 |

凭据分两类，别混为一谈：

- **服务端密钥**（OpenAI 等）：只写入本地被 git 忽略的 `.env`，不会下发给访问者。
- **浏览器可见凭据**（Google Maps Key、Cesium ion token）：**必然**由浏览器直接携带发出。它们不是秘密，保护手段是**在服务商侧设来源限制**，不是靠不公开。上游的「服务商设置」弹窗里也是这么写的。

两类都**绝不要提交进仓库**。

---

## 在中国大陆使用的联网注意事项

2026-09-15/16 在武汉本机实测过一轮（结果见下），**实测有日期、不是永久事实**：网络环境随时可能变化，遇到图层不可用时按下面的方法逐个端点核对。

### 一、逐个检查失败的数据端点

2026-09-15/16 的本机排查记录涉及 `earthquake.usgs.gov`、`firms.modaps.eosdis.nasa.gov`、`api.weather.gov`、`data.austintexas.gov`、`data.texas.gov` 的请求失败；部分图层显示 `UNAVAILABLE · Failed to fetch`。这些历史现象不能单独证明当前故障原因，也不能据此断言凭据有效或无效。先定位失败请求与发起端，再检查路由、DNS、TLS、HTTP 响应、凭据和配额；不要仅凭域名后缀批量改代理规则。

```bash
# 粗测链路是否通（返回非 000 说明能连上；仅作链路粗测，不能代表图层恢复）
curl -o /dev/null -w "%{http_code}\n" https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson
```

**注意：HTTP 200 只说明此次端点请求返回成功状态**，还需验证响应格式、内容、浏览器 CORS 和数据时效；命令行请求成功不能代替浏览器验证。恢复判据应结合应用请求成功、数据被正确解析以及图层呈现预期状态（空数据也可能是有效结果）。`www.usgs.gov` 首页的状态码与数据接口（`earthquake.usgs.gov/earthquakes/feed/...`）是两条链路，不要用首页判断数据链路。

如果某个图层仍显示 `UNAVAILABLE` / `Failed to fetch`，先确认具体 URL、请求发起位置及错误类型，再分别检查链路、凭据、配额与响应。更换 Key 不能修复已确认的链路故障，但在未测量前也不能排除凭据问题。

注意：**多数数据源经本地服务端代理，但并非全部**。源码核查确认**浏览器直连**的至少有这些：

| 浏览器直连的东西 | 出处 |
|---|---|
| 地震数据 | `src/layers/earthquakes/source.js` 直接请求 USGS |
| Google Fonts 字体 | `index.html` |
| 电台音频（播放后） | 直连广播方，见 `SECURITY.md` |
| **底图瓦片** | `src/maps/imagery.js:9` 的 `https://tile.openstreetmap.org/`（OSM）、`services.arcgisonline.com`（Esri）；Cesium 的 ion 地形 / Google 3D 瓦片同理 |

所以排障要分清方向，**三**条路都要查：

- 图层数据（飞机 / 船舶 / 活火点等）不通 → 查**服务端**网络；
- **底图、3D 瓦片、地形不通（白球、贴图缺失、一直转圈）** → 查**浏览器侧**网络，这类请求不经过本地服务端；
- 字体异常或地震图层不通 → 同样查浏览器侧。

### 二、浏览器控制台会报字体加载失败

Google Fonts 与 Material Symbols 图标字体在国内可能加载不出来。
**图标是否正常显示取决于这个字体**——因为它靠**文字连字**渲染。
若你看到 `radio`、`public` 之类的**英文单词**出现在本该是图标的位置，
就是字体没加载成功。自备代理或改用本地自托管字体可解决。

### 三、性能

全开图层很吃显存（实测 2000+ 瓦片帧）。软件渲染（无 GPU 加速）下会明显卡顿甚至
导致页面无响应。建议按需开启图层，不要一次全开。

---

## 本分支与原版的差异

**以运行时界面翻译为主，同时修改了少量显示与状态处理代码，不能视为完全不改行为的覆盖层。**

| 改动 | 文件 |
|---|---|
| 新增翻译引擎与 4 份字典 | `public/i18n/` |
| 新增覆盖率、布局、字典审计、繁体生成、运行时回归、键位对齐与运行时字符串核对脚本 | `scripts/i18n-*.mjs` |
| 翻牌原始输入状态隔离与竞态收尾；缓存卡片随语言切换重翻 | `src/splitFlap.js`、`src/overlays/worldOverlay.js` 及对应测试 |
| canvas 文案走字典 + 全角宽度修正 | `src/overlays/worldOverlay.js`、`src/layers/cctv/frames.js`、`src/data/detectionDraw.js` |
| 新增可见语言入口（DISPLAY 面板下拉框） | `src/ui/templates/display-controls.html`、`src/ui/styles/controls.css` |
| 消歧属性 `data-gev-i18n-skip-text`（引擎 + 一处芯片） | `public/i18n/gev-i18n.js`、`src/ui/layerPanel.js`、`src/layers/directions/index.js` |
| 引入翻译层（1 行） | `index.html` |
| 元数据与上报路径指向本分支 | `package.json`、`.github/`、`SECURITY.md`、`CONTRIBUTING.md` |
| User-Agent / Referer 指向本分支 | 4 个数据源代理文件 |

没有翻译钩子时返回原文，但全角宽度计算与翻牌状态隔离仍是源码行为变更。

**测试数字要连日期和批次一起看**（不同批次的检查数不同，不能互相当成「最新」）：

| 批次 | 日期 | 结果 |
|---|---|---|
| 单元测试（`npm test`） | 2026-09-17 | 3922 项：3913 通过、9 跳过、0 失败 |
| 浏览器运行时回归（`scripts/i18n-runtime-test.mjs`） | 2026-09-17 | 407 项检查全部通过，0 页面 console 错误 |
| 生产页面语言入口验收（`scripts/i18n-live-verify.mjs`） | 2026-09-17 | 30 场景通过（3 分辨率 × 5 语言 × 折叠/展开） |
| 运行时字符串覆盖（`scripts/i18n-claim-audit.mjs`） | 2026-09-17 | 61 用例 × 4 语言，漏译 0 |
| 译文修正 + CJK 字体栈后全量重跑 | 2026-09-18 | 单元 3922 项（3913 通过、9 跳过、0 失败）；`i18n:parity` 四语对齐；`i18n:strings` 61×4 漏译 0；运行时回归 408 项通过、0 console 错误 |

> 早期文档里的「浏览器回归 209/209」是更早一批的检查数，与 407 不是同一批次，已停止引用。
> 测试通过不等于与上游逐位一致，也不代表全部真实数据状态与布局都已验收。

技术细节、踩过的坑与回归清单见 [`public/i18n/README.md`](public/i18n/README.md)。

---

## 许可与合规

### 代码：MIT

源码沿用上游的 MIT 许可，见 [LICENSE](LICENSE)。本分支的修改同样以 MIT 发布。
二次分发时请保留版权声明与许可全文（LICENSE 末尾已附本分支的修改记录）。

### 第三方数据：不属于 MIT，且本分支声明为非商业

**本分支声明为非商业用途**，因为捆绑数据里有非商业许可的内容：

| 数据 | 许可 | 说明 |
|---|---|---|
| 海底电缆（TeleGeography） | **CC BY-NC-SA 3.0** | **禁止商业使用**。本分支因非商业而得以保留 |
| 数据中心 / 水坝（OSM 提取） | ODbL 1.0 | 需署名；数据衍生库需同样开放 |
| 3D 飞机/船模型 | CC BY 4.0 | 需保留 `public/models/README.md` 的署名表 |
| Natural Earth 等 | 公有领域 | 无需 |

> **如果要做商业用途**：至少要删除
> `src/data/local_data/telegeography_submarine_cables/` 整个目录（删了应用照跑），
> 并重新核查每个数据源与服务商的当前条款。另外 Cesium ion 免费额度限个人非商业，
> OpenSky 的许可本身也含非商业限定。

逐源清单见 [DATA_SOURCES.md](DATA_SOURCES.md)。

### 三条不能碰的红线

1. **保留署名**：`LICENSE` 的第三方数据说明段、`DATA_SOURCES.md`、
   `public/models/README.md` 都不要删。应用内左下角的「数据署名」弹窗也不要动
   ——那是作者刻意做的合规设计。
2. **绝不预置 API Key**：本分支不附带任何凭据。所有需要凭据的数据源都是
   「用户自备 Key」架构，Key 只写入本地 `.env`。
3. **命名**：MIT **不授予商标权**。本分支沿用原名并显著标注为非官方分支，
   这是非商业开源分支的通行做法。若你要再分发，请同样保留这个标注。

### 内容层面的提醒

这个项目可视化的是**美军飞机、军事设施、全球海底电缆、各国公共摄像头**。
授权合规不等于内容合规。在国内公开发布或托管，这块需要单独评估。

---

## 反馈

**先切回英文（`Ctrl+Alt+L` 或 `?lang=en`）看一下问题还在不在——这是一项排查步骤，不是归属判据。**

| 问题类型 | 报给谁 |
|---|---|
| 翻译错误、缺译、语言切换异常 | **本分支**的 Issues |
| 上游原生的功能缺陷、数据源失效、性能问题 | [上游 Issues](https://github.com/bilawalsidhu/gods-eye-view/issues) |
| 安全漏洞（可被利用的） | 私有渠道，见 [SECURITY.md](SECURITY.md) |

**切回英文变正常，不等于问题就是翻译造成的。** 本分支除了文案还改了翻牌状态隔离、canvas 绘制路径与一处消歧属性，这些在英文下同样生效；反过来，有些翻译缺陷（如动态串漏译）在英文下根本看不出来。要在**未修改的上游版本**上用相同环境与步骤复现过，再决定报到上游。网络、凭据和时序问题请一并记录。

---

## 与上游的关系

- 上游项目：<https://github.com/bilawalsidhu/gods-eye-view>，作者 **Bilawal Sidhu**
- 本分支基线：commit `76c20be2773018164f274f3e48a25f857ceb1dd6`（2026-09-15）
- 完整改动记录：[FORK-NOTICE.md](FORK-NOTICE.md)

同步上游更新：

```bash
git remote add upstream https://github.com/bilawalsidhu/gods-eye-view.git
git fetch upstream
git merge upstream/main
```

---

**上游作者与维护者**：[Bilawal Sidhu](https://github.com/bilawalsidhu) 与
[Sameh Khamis](https://github.com/samehkhamis)，[Halfpixel](https://halfpixel.ai)。
上游英文原版的全部设计与实现归功于他们，本分支只是加了一层界面。
如果你觉得这个项目有意思，请去[上游仓库](https://github.com/bilawalsidhu/gods-eye-view)点个 Star。
