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

这个分支只做了一件事：**把界面翻译成了中文**（另附繁體中文、日本語、한국어）。
功能、架构、数据源与上游英文原版完全一致。

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
git clone https://github.com/YOUR-GITHUB-USER/gods-eye-view.git
cd gods-eye-view
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
| **Cesium ion**（免费） | 世界地形 + ion 托管的 Google 3D | 免费额度限**个人非商业** |
| **Google Maps**（计量付费） | 照片级 3D + 地点搜索 | 浏览器端 Key，**必须**设来源限制 |
| **OpenAI** | 语音控制（对话式操作） | 按量计费，Key 只留在服务端 |
| **AISStream**（免费） | 实时船舶 | |
| **NASA FIRMS**（免费） | 活火点 | |
| **TomTom**（有免费额度） | 实时路况 | 不填则路况是模拟数据 |

Key 只写入本地被 git 忽略的 `.env`，**绝不要提交进仓库**。

---

## 在中国大陆使用的实测注意事项

这是我在本机（武汉）实测后记录的真实情况，不是推测。

### 一、美国 `.gov` 域名可能全部不通

实测结果：`earthquake.usgs.gov`、`firms.modaps.eosdis.nasa.gov`、`api.weather.gov`、
`data.austintexas.gov`、`data.texas.gov` **全部 TLS 握手失败**，
而 AWS / Cloudflare 等对照域名正常返回 200。DNS 解析本身是通的。

**影响**：`Earthquakes`（地震）、`Active Fires`（活火点）、`Transit`（公交）三个图层
会显示 `UNAVAILABLE · Failed to fetch`。其中 **Active Fires 即使买了 NASA Key 也用不了**
——问题在链路，不在凭据。

**排查方向**：查代理规则里是否有把 `\.gov$` 或 `geosite:gov` 送去直连的条目，改成走代理。

```bash
# 修好的判据：应返回 200
curl -o /dev/null -w "%{http_code}\n" https://www.usgs.gov/
```

注意：**浏览器发出的外部请求数为 0**，所有数据都经过本地服务端代理。
所以这不是浏览器的问题，是 Node 服务端的网络问题。

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

**只多了一层界面翻译，没有改任何业务逻辑。**

| 改动 | 文件 |
|---|---|
| 新增翻译引擎与 4 份字典 | `public/i18n/` |
| 新增三个 i18n 工具脚本 | `scripts/i18n-*.mjs` |
| canvas 文案走字典 + 全角宽度修正 | `src/overlays/worldOverlay.js`、`src/layers/cctv/frames.js`、`src/data/detectionDraw.js` |
| 引入翻译层（1 行） | `index.html` |
| 元数据与上报路径指向本分支 | `package.json`、`.github/`、`SECURITY.md`、`CONTRIBUTING.md` |
| User-Agent / Referer 指向本分支 | 4 个数据源代理文件 |

`src/` 侧的翻译调用全部是「有翻译层才翻译，没有就原样返回」的可选钩子，
所以 **Node 测试环境下行为与上游逐位一致**——上游自带的 305 个测试文件、
3904 项断言在本分支全绿。

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

**先切回英文（`Ctrl+Alt+L` 或 `?lang=en`）确认问题归属。**

| 问题类型 | 报给谁 |
|---|---|
| 翻译错误、缺译、语言切换异常 | **本分支**的 Issues |
| 上游原生的功能缺陷、数据源失效、性能问题 | [上游 Issues](https://github.com/bilawalsidhu/gods-eye-view/issues) |
| 安全漏洞（可被利用的） | 私有渠道，见 [SECURITY.md](SECURITY.md) |

问题在英文下同样出现 → 那是上游的问题。

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
