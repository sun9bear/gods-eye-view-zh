/**
 * God's Eye View — 简体中文（zh-Hans）
 * ===================================
 *
 * 三张表，翻译引擎按 精确 → 规则 → 分段 → 局部 的顺序命中：
 *
 *   dict     整串精确匹配（大多数静态标签走这里）
 *   rules    正则规则，处理动态串：时间、计数、状态后缀
 *   partial  长句里的片段替换（HUD 遥测行这类混排文本）
 *
 * 注意：键名大小写敏感。图标连字（radio / public / draw …）靠 class 跳过，
 * 不在这里处理，所以 "Radio"（图层名）与 "radio"（图标名）互不干扰。
 *
 * 新增语言请以本文件为模板：复制 → 改 export 名 → 逐条替换译文。
 * 繁體中文那份是脚本从本文件自动转换生成的，**不要手改**（见 README）。
 */

export const LOCALE = {
  /** BCP 47 标签，会写到 <html lang> */
  tag: 'zh-Hans',
  /** 语言菜单里显示的名字（用该语言自身的写法） */
  label: '简体中文',
  /** 短标签，用于切换提示 */
  short: '简',
  /** 用户在 ?lang= 里能用的别名 */
  aliases: ['zh', 'zh-CN', 'zh-SG', 'zh-Hans'],
};

export const dict = {
  /* ---------------------------------------------------------- 品牌与首屏 */
  "GOD'S EYE": '上帝',
  VIEW: '视角',
  'NO PLACE LEFT BEHIND': '无处可藏',
  'MISSION CONTROL · FIRST LAUNCH': '任务控制 · 首次启动',
  'Choose your first view': '选择你的第一个视角',
  'It feels like a forbidden cockpit—then you realize the sources are public and the data is real.':
    '它看起来像一个不该让你进来的驾驶舱——然后你会发现，数据源全是公开的，数据是真的。',
  'LIVE CONTACTS': '实时目标',
  'Aircraft, vessels and nearby intelligence': '飞机、船舶与周边情报',
  'Launches, spacecraft and orbital context': '发射、航天器与轨道态势',
  ENVIRONMENTAL: '环境动态',
  'Live earthquakes and active fires, from USGS and NASA': 'USGS 与 NASA 的实时地震与火点',
  'EXPLORE MANUALLY': '手动探索',
  'Begin with a clean globe': '从干净的地球开始',
  "Don't show this again": '不再显示',
  'ESC to dismiss': '按 ESC 关闭',
  'Tip: the GEV MIC button in the dock lets you talk to the map.':
    '提示：底部停靠栏的 GEV MIC 按钮可以让你用语音操控地图。',

  /* -------------------------------------------------------- 状态与加载 */
  'ACTIVE STYLE': '当前样式',
  NORMAL: '正常',
  'LOADING LIVE DATA': '正在加载实时数据',
  'REFRESHING LIVE DATA': '正在刷新实时数据',
  'syncing road network': '正在同步路网',
  'loading frames': '正在加载画面',
  'SIMULATED — ADD TOMTOM KEY FOR LIVE': '模拟数据 — 加 TomTom 密钥后为实时',
  'SIMULATED — add TomTom key for live': '模拟 — 加 TomTom 密钥后为实时',
  /* 状态芯片与描述性文案统一用「兜底」（街景兜底 / 航班兜底 / 区域兜底），避免一半「回退」一半「兜底」。 */
  'FALLBACK': '兜底',
  'UNAVAILABLE': '不可用',
  'Failed to fetch': '请求失败',
  'feed unavailable': '数据源不可用',
  'never': '从未',
  'loading...': '加载中…',
  /* 图层状态标签，词表来自 src/ui/layerPanel.js 的 FEED_STATE_LABELS */
  LOADING: '加载中',
  DEGRADED: '降级',
  /* 图层 meta 的相对时间，来自 layerPanel.js 的 _timeAgo() */
  'just now': '刚刚',

  /* ------------------------------------------------------- 地球操作按钮 */
  'Clear selected data layers': '清除已选图层',
  'Turn off all selected data layers': '关闭全部已选图层',
  'Copy share link': '复制分享链接',
  'Return map to straight-down view': '回到正俯视',
  'Toggle straight-down and tilted map views': '切换正俯视与倾斜视角',
  'Reset map bearing to north': '重置为正北',
  'Reset to full globe view': '回到全球视图',
  'Reset camera and return to full globe view': '重置相机并回到全球视图',
  'Reset map to north up. Current heading 15 degrees': '重置为正北朝上。当前朝向 15 度',
  N: '北',

  /* -------------------------------------------------------- 底部停靠栏 */
  LOCATION: '定位',
  'VISUAL PRESETS': '视觉预设',
  'AI AGENT': 'AI 助手',
  'VOICE STANDBY': '语音待机',
  'ON/OFF': '开/关',
  OFF: '关',
  ON: '开',
  STD: '标准',
  MINI: '迷你',
  'Expand LOCATION': '展开定位',
  'Expand VISUAL PRESETS': '展开视觉预设',
  'Pin visual presets': '固定视觉预设',
  'Keep visual presets open': '保持视觉预设展开',
  'VOICE CONTROL': '语音控制',
  'VOICE SYSTEM ERROR': '语音系统错误',
  'Voice control — activate to toggle voice; hold Space to speak': '语音控制 — 激活以切换语音；长按空格说话',
  'Hold Space to speak · tap Space to activate focused controls': '长按空格说话 · 轻按空格激活当前控件',
  'Check microphone permission and network access, then try again.': '请检查麦克风权限与网络连接后重试。',
  /* 会话费用 tooltip 的默认态。变体（不同响应数 / 用户改过的阈值 / 带 note 的
     拼接结果）由下方规则处理，不要只靠这一条冻结词条。 */
  'Estimated session cost on gpt-realtime-2 — 0 response(s). Warns at ~$2.00, ends the session at ~$5.00.':
    'gpt-realtime-2 上的预估会话费用 — 0 次响应。约 $2.00 时警告，约 $5.00 时结束会话。',
  DISMISS: '关闭',
  'Toggle straight-down map view': '切换正俯视',
  'Return UI controls': '显示界面控件',
  'EXIT CLEAN VIEW': '退出干净视图',

  /* ---------------------------------------------------------- 地图源 */
  'MAP SOURCE': '地图源',
  Style: '样式',
  SAT: '卫星',
  'Bing Aerial': 'Bing 航拍',
  'Bing Labels': 'Bing 标注',
  'Esri Satellite': 'Esri 卫星',
  'Google 3D': 'Google 3D',
  'Bing Aerial unavailable: Needs CESIUM_ION_TOKEN — add it in Provider Settings':
    'Bing 航拍不可用：需要 CESIUM_ION_TOKEN — 在「服务商设置」里添加',
  'Bing Labels unavailable: Needs CESIUM_ION_TOKEN — add it in Provider Settings':
    'Bing 标注不可用：需要 CESIUM_ION_TOKEN — 在「服务商设置」里添加',
  'Google 3D unavailable: Needs GOOGLE_MAPS_API_KEY — add it in Provider Settings — or a Cesium ion token for the ion-hosted route':
    'Google 3D 不可用：需要 GOOGLE_MAPS_API_KEY — 在「服务商设置」里添加 — 或使用 Cesium ion 令牌走 ion 托管路线',
  'Needs GOOGLE_MAPS_API_KEY — add it in Provider Settings — or a Cesium ion token for the ion-hosted route':
    '需要 GOOGLE_MAPS_API_KEY — 在「服务商设置」里添加 — 或使用 Cesium ion 令牌走 ion 托管路线',
  'Needs CESIUM_ION_TOKEN — add it in Provider Settings': '需要 CESIUM_ION_TOKEN — 在「服务商设置」里添加',

  /* ------------------------------------------------------- 数据图层面板 */
  'DATA LAYERS': '数据图层',
  'Expand DATA LAYERS': '展开数据图层',
  'Collapse DATA LAYERS': '收起数据图层',
  Movement: '移动目标',
  Infrastructure: '基础设施',
  Events: '事件',
  Utilities: '工具',
  'Other layers': '其他图层',
  'Satellites': '卫星',
  'Live Flights': '实时航班',
  'Military Flights': '军机',
  'Live Vessels': '实时船舶',
  'Street Traffic': '街道车流',
  'Bike Share': '共享单车',
  'Cameras': '摄像头',
  'Mapped ALPR Cameras': '已测绘车牌识别摄像头',
  'Mapped Installations': '已测绘设施',
  'Data Centers': '数据中心',
  'Submarine Cables': '海底电缆',
  'Dams': '水坝',
  'Space Missions (30d)': '太空任务（30 天）',
  'Earthquakes (24h)': '地震（24 小时）',
  'Active Fires': '活跃火点',
  'Directions': '路线导航',
  'Radio': '电台',
  'Transit': '公共交通',
  'OpenSky Network': 'OpenSky Network',
  'OpenStreetMap': 'OpenStreetMap',
  'community mapped': '社区测绘',
  'observed or mapped nearby context': '观测或测绘的邻近信息',
  'OpenStreetMap + optional Google Maps Places': 'OpenStreetMap + 可选 Google 地点库',
  'CCTV + Street View fallback': 'CCTV + 街景兜底',
  'USACE': 'USACE',
  'OSM routing': 'OSM 路线规划',
  /* ------------------------------------------------- 路线导航芯片
     整行过去零覆盖（src/layers/directions/index.js:110-168）：
     标签走 button.textContent，提示走 button.title。
     其中 `CLEAR` 是可视标签与其他面板撞车的那个，已由 skip-text 让开，
     它的 title 仍走这里。 */
  'SET A': '设 A',
  'SET B': '设 B',
  'CLICK MAP': '点地图',
  FLY: '飞行',
  'FLY ···': '飞行中 ···',
  FLYING: '飞行中',
  'Swap A and B': '交换 A 与 B',
  'Then click the globe to place the start': '然后点地球放置起点',
  'Then click the globe to place the destination': '然后点地球放置终点',
  'Click a spot on the globe to place A (click again to cancel)':
    '点地球上的位置放置 A（再点一次取消）',
  'Click a spot on the globe to place B (click again to cancel)':
    '点地球上的位置放置 B（再点一次取消）',
  'Fly the camera along the route': '让相机沿航线飞行',
  'Place A and B first': '请先放置 A 与 B',
  'Remove the route and both markers': '移除航线与两个标记',
  'GTFS-RT': 'GTFS-RT',
  LIVE: '实时',
  Local: '本地',
  CAMERAS: '摄像头',

  /* ------------------------------------------------------------ 场景 */
  SCENES: '场景',
  'Expand SCENES': '展开场景',
  'Collapse SCENES': '收起场景',
  'Scene recipe': '场景配方',
  'Global Flights Radar': '全球航班雷达',
  'Orbital Watch': '轨道监视',
  'Thermal Threat Board': '热成像威胁看板',
  'City Overload': '城市过载',
  'Omniscience Pullback': '全知拉远',
  NEW: '新建',
  DEL: '删除',
  'CAPTURE SHOT': '捕获镜头',
  'UPDATE SHOT': '更新镜头',
  LOAD: '加载',
  START: '开始',
  STOP: '停止',
  'EXPORT PRESETS': '导出预设',
  IMPORT: '导入',
  'RUN LOG': '运行日志',
  Ready: '就绪',

  /* -------------------------------------------------------- 显示面板 */
  DISPLAY: '显示',
  'Expand DISPLAY': '展开显示',
  'Collapse DISPLAY': '收起显示',
  'Intelligence HUD (H)': '情报 HUD（H）',
  HUD: 'HUD',
  Layout: '布局',
  Tactical: '战术',
  Operator: '操作员',
  Minimal: '极简',
  'Detection Overlay (D)': '检测叠加层（D）',
  DENSE: '密集',
  Density: '密度',
  Allocation: '分配',
  Elastic: '弹性',
  Weighted: '加权',
  Fade: '淡出',
  Outside: '外部',
  PARAMETERS: '参数',
  '3D aircraft — flat icons zoomed out, 3D models up close': '3D 飞机 — 拉远用平面图标，拉近用 3D 模型',
  Models: '模型',
  '3D model coverage': '3D 模型覆盖范围',
  Proximity: '邻近',
  All: '全部',
  'Scope — the circular viewport mask': '视野圈 — 圆形视口遮罩',
  Scope: '视野圈',
  Feather: '边缘羽化',
  'Scope edge feather': '视野圈边缘羽化',
  'Scope edge feather as a percentage of the keyhole radius': '视野圈边缘羽化占视野半径的百分比',
  'Draw on the world — click vertices, double-click or Enter to finish, Esc to cancel':
    '在地球上绘制 — 点击顶点，双击或回车完成，Esc 取消',
  Draw: '绘制',
  Shape: '形状',
  'Shape to draw': '要绘制的形状',
  Area: '面',
  Line: '线',
  Pin: '点',
  'Label (optional)': '标签（可选）',
  'Label for the drawn shape': '所绘形状的标签',
  'Colour of the drawn shape': '所绘形状的颜色',
  Primary: '主色',
  Amber: '琥珀色',
  Cyan: '青色',
  Green: '绿色',
  Red: '红色',
  'Remove every mark from the board': '清除画面上所有标记',
  Clear: '清除',
  'Pick a shape, then click the map.': '选择形状，然后点击地图。',
  'Celestial ring — reveal the full globe': '天球环 — 展现完整地球',
  Celestial: '天球',
  'Hide UI chrome': '隐藏界面控件',
  'Clean UI': '干净界面',
  'Bloom / Glow': '泛光 / 辉光',
  Bloom: '泛光',
  'Bloom intensity': '泛光强度',
  Sharpening: '锐化',
  Sharpen: '锐化',
  'Sharpen intensity': '锐化强度',

  /* ---------------------------------------------------------- 摄像头 */
  CCTV: '摄像头',
  'Expand CCTV': '展开摄像头',
  'Collapse CCTV': '收起摄像头',
  'SOURCE · UNKNOWN': '来源 · 未知',
  'Enable CCTV to load camera intersections': '启用摄像头以加载路口画面',
  'CCTV OFF': '摄像头 关',
  'CCTV ON': '摄像头 开',
  NEAREST: '最近',
  FOCUS: '锁定',
  'COVERAGE ON': '覆盖 开',
  'COVERAGE OFF': '覆盖 关',
  'VIEWSHED ON': '视域 开',
  'AUTO HOP OFF': '自动跳转 关',
  'AUTO HOP ON': '自动跳转 开',
  'PROJECTION ON': '投影 开',
  'PROJECTION OFF': '投影 关',
  'CALIBRATION': '标定',
  CAL: '标定',
  'ADJUST': '调整',
  'SAVE CAL': '保存标定',
  'RESET CAL': '重置标定',
  'SCENE SUMMARY': '场景摘要',
  'No cameras available in catalog.': '目录中没有可用的摄像头。',
  'CCTV camera': '摄像头画面',
  'Camera pose — click a value to type': '相机位姿 — 点击数值可直接输入',
  'Heading (compass °) — click to type': '朝向（罗盘 °）— 点击输入',
  'Pitch (° up/down) — click to type': '俯仰（° 上/下）— 点击输入',
  'Horizontal FOV (°) — click to type': '水平视场角（°）— 点击输入',
  'Range / monitor-plane distance (m) — click to type': '距离／监视平面间距（米）— 点击输入',
  'Mount height above ground (m) — click to type': '离地安装高度（米）— 点击输入',
  'North offset from catalog position (m) — click to type': '相对目录位置的北向偏移（米）— 点击输入',
  'East offset from catalog position (m) — click to type': '相对目录位置的东向偏移（米）— 点击输入',
  'Drag the camera in the world: rings rotate, arrows move, handles set range/FOV':
    '在地球上拖动相机：圆环旋转、箭头平移、手柄调整距离／视场角',

  /* ------------------------------------------------------------ 态势 */
  CONTEXT: '态势',
  'Expand CONTEXT': '展开态势',
  'Collapse CONTEXT': '收起态势',
  'Context mode': '态势模式',
  CONTACTS: '目标',
  'Cycles the nearest contacts of whatever type you select — planes, vessels, installations. Satellites track independently.':
    '循环切换你选定类型中最近的目标 — 飞机、船舶、设施。卫星独立跟踪。',
  'SPACE MISSIONS': '太空任务',
  'SELECT CONTEXT': '选择态势',
  'CONTACTS — nearest planes · vessels · sites': '目标 — 最近的飞机 · 船舶 · 设施',
  'SPACE MISSIONS — launches & orbital assets': '太空任务 — 发射与在轨资产',
  'Contact Context actions': '目标态势操作',
  COCKPIT: '驾驶舱',
  'SEARCH NEARBY SITES': '搜索周边站点',
  'Reclassify tracked contact as TR-3B': '将跟踪目标重新归类为 TR-3B',
  'Reclassify as TR-3B': '重新归类为 TR-3B',
  'CONTACTS CONTEXT OFF': '目标态势 关',
  'SELECT CONTACTS TO LOAD OBSERVED / MAPPED PROXIMITY': '选择目标以加载观测／测绘的邻近信息',
  'Available Space Missions': '可用太空任务',
  'AVAILABLE MISSIONS': '可用任务',
  'SELECT A MISSION TO INSPECT': '选择任务以查看',
  'LOADING 30-DAY MISSION INDEX': '正在加载 30 天任务索引',
  'TAB PREVIEWS · ENTER / SPACE SELECTS': 'Tab 预览 · 回车／空格选择',
  'CONTACT': '目标',
  'CONTACTS · 250 KM': '目标 · 250 公里',
  'CONTEXT ONLY': '仅态势',
  'Nearby cohort counts': '邻近同类计数',
  'NEAREST OBSERVED / MAPPED': '最近观测／测绘',
  'NO AVAILABLE EXAMPLE': '暂无可用样例',
  'AVAILABLE INPUTS ONLY · NOT AN ALL-CLEAR': '仅限可用输入 · 不代表全部安全',
  'Previous': '上一个',
  'Next': '下一个',
  'CURRENT': '当前',
  'PREV': '上一个',
  'NEXT': '下一个',
  'Previous — prior visited contact in the 250 km window': '上一个 — 250 公里范围内此前访问过的目标',
  'Next — nearest unvisited contact in the 250 km window': '下一个 — 250 公里范围内最近的未访问目标',
  'Collapse contact panel': '收起目标面板',
  'Collapse Contact panel': '收起目标面板',

  /* ------------------------------------------------------------ 电台 */
  RADIO: '电台',
  'Expand Radio': '展开电台',
  'Expand Radio section': '展开电台区块',
  'Open compact Radio controls': '打开紧凑电台控件',
  'Open detailed Radio controls': '打开详细电台控件',
  'Close compact Radio controls': '关闭紧凑电台控件',
  'Compact Radio controls': '紧凑电台控件',
  'Compact Radio volume': '紧凑电台音量',
  'Internet radio companion': '网络电台伴侣',
  'RADIO READY': '电台就绪',
  'RADIO OFF': '电台 关',
  'PAUSE': '暂停',
  'RESUME': '继续',
  'PLAY': '播放',
  'ENABLING': '启用中',
  'DISABLING': '禁用中',
  'UNCERTAIN': '状态不明',
  'RADIO STATE UNCERTAIN': '电台状态不明',
  /* 裸状态词与 DISABLING「禁用中」同族；「关闭」留给 DISMISS / Close 类键，避免撞车。 */
  'DISABLE': '禁用',
  'STATION TAG': '电台标签',
  'Filter stations by station tag': '按电台标签筛选',
  'NO STATION SELECTED': '未选择电台',
  'Choose a globe marker or use next.': '选择地球上的标记，或点「下一个」。',
  'DIRECTORY BAND': '目录波段',
  'DRAG TO TUNE': '拖动调谐',
  'Tune available internet radio stations': '调谐可用的网络电台',
  'ALL · DRAG THE NEEDLE': '全部 · 拖动指针',
  'SNAPS TO AVAILABLE STATIONS': '自动吸附到可用电台',
  'Radio playback': '电台播放',
  'Previous filtered station': '上一个筛选结果',
  'Previous filtered radio station': '上一个筛选电台',
  'Next filtered station': '下一个筛选结果',
  'Next filtered radio station': '下一个筛选电台',
  'Stop radio playback': '停止播放',
  'Play nearest radio station': '播放最近的电台',
  /* 播放按钮的 aria-label 是 `${Pause|Resume|Play} ${selected|nearest} radio station`
     （src/ui/radioPresentation.js:232）——按钮文字是大写 PAUSE/RESUME/PLAY（已有词条），
     但这条小写组合过去只收录了 Play + nearest 一种。 */
  'Pause selected radio station': '暂停选中的电台',
  'Resume selected radio station': '继续选中的电台',
  'Play selected radio station': '播放选中的电台',
  'Pause nearest radio station': '暂停最近的电台',
  'Resume nearest radio station': '继续最近的电台',
  'Radio volume': '电台音量',
  'Cockpit Radio volume': '驾驶舱电台音量',
  'Radio off': '电台已关闭',
  'STATION SITE': '电台站点',
  'DIRECTORY: RADIO BROWSER': '目录：Radio Browser',
  'Audio connects directly to the broadcaster after you press play. Your IP is visible to that broadcaster.':
    '按下播放后音频直连广播方。你的 IP 对该广播方可见。',
  'Previous station': '上一个电台',
  'Next station': '下一个电台',
  'Enable Radio': '启用电台',
  /* 同一处 tooltip / aria-label 会随状态在 Enable / Disable 之间翻转
     （src/ui/radioPresentation.js:58/81/107）——过去只收录了 Enable 一半。 */
  'Disable Radio': '关闭电台',
  ENABLE: '启用',
  VOLUME: '音量',
  PLAY: '播放',

  /* -------------------------------------------------- 服务商设置弹窗 */
  'GROUND STATION · PROVIDER SETTINGS': '地面站 · 服务商设置',
  'Power up the globe': '给地球通电',
  'POWER UP': '通电',
  "The globe already flies keyless. Every key below switches on another real feed — paste one and it's saved into this app's local configuration, then the server restarts itself. Server-side keys stay on this machine; Google Maps and Cesium ion run in the browser and must be provider-restricted. Keys you configured elsewhere are shown but never touched.":
    '这个地球不填任何密钥就能跑。下面每一个密钥都会再打开一路真实数据源——粘贴进去就会存到本应用的本地配置里，然后服务端自己重启。服务端密钥留在本机；Google Maps 与 Cesium ion 在浏览器里运行，必须在服务商侧做限制。你在别处配置过的密钥会显示出来，但绝不会被改动。',
  'Close key setup': '关闭密钥设置',
  'GET KEY ↗': '获取密钥 ↗',
  'browser-side': '浏览器侧',
  'Metered — a billing-enabled account': '按量计费 — 需已开通计费的账号',
  'Free key — register, paste, done': '免费密钥 — 注册、粘贴、完成',
  'This key runs in the browser by design — restrict it at the provider (see SECURITY.md)':
    '此密钥按设计在浏览器中运行 — 请在服务商侧做限制（见 SECURITY.md）',
  'The photorealistic 3D planet + place search': '照片级 3D 地球 + 地点搜索',
  'Voice control — talk to the planet': '语音控制 — 直接对地球说话',
  'Live ships, worldwide': '全球实时船舶',
  'Live active-fire detections': '实时火点探测',
  'Real live traffic (keyless runs a simulation)': '真实路况（不填密钥则为模拟）',
  'Bing imagery map stacks + world terrain': 'Bing 影像图栈 + 全球地形',
  'More flight-polling credits (anonymous works without)': '更多航班轮询额度（匿名也能用）',
  'Higher space-missions request allowance': '更高的太空任务请求额度',
  'SAVE KEYS': '保存密钥',
  'ESC to close': '按 ESC 关闭',
  'The Google Maps key buys the photorealistic planet — everything else stacks on top.':
    'Google Maps 密钥换来的是照片级地球 — 其余能力都叠加在它之上。',

  /* -------------------------------------------------------- 驾驶舱 */
  'Aircraft cockpit view': '飞机驾驶舱视角',
  'LEVEL': '水平',
  'Estimated destination direction': '预计目的地方位',
  'OPTICAL PLANE · 01': '光学平面 · 01',
  'VISOR LOCK · ACTIVE': '目镜锁定 · 已激活',
  'GROUND SPEED · KTS': '地速 · 节',
  'GROUND SPEED': '地速',
  'ALTITUDE · FT': '高度 · 英尺',
  ALTITUDE: '高度',
  KTS: '节',
  FT: '英尺',
  'FIRST PERSON': '第一人称',
  AIRCRAFT: '航空器',
  'LIVE TRACK · COURSE ALIGNED': '实时航迹 · 航向对齐',
  'Cockpit vision style': '驾驶舱视觉风格',
  'Previous cockpit vision style': '上一个驾驶舱视觉风格',
  'Previous vision style': '上一个视觉风格',
  'Next cockpit vision style': '下一个驾驶舱视觉风格',
  'Next vision style': '下一个视觉风格',
  'Current cockpit vision style: NORMAL. Activate for next style.': '当前驾驶舱视觉风格：正常。激活以切换下一个。',
  'Current style: NORMAL — click for next': '当前风格：正常 — 点击切换下一个',
  'Current aircraft heading': '当前飞机航向',
  'Contact cockpit summary': '目标驾驶舱摘要',
  'Contact navigation': '目标导航',
  'Enable cockpit weather effects': '启用驾驶舱天气效果',
  /* 同上：随状态翻转，过去只有 Enable 一半（src/ui/cockpitInstruments.js:211/213）。 */
  'Disable cockpit weather effects': '关闭驾驶舱天气效果',
  WX: '天气',
  'Cockpit briefing carousel': '驾驶舱简报轮播',
  'Estimated flight plan': '预计飞行计划',
  'ESTIMATED FLIGHT PLAN': '预计飞行计划',

  /* ------------------------------------------------- 天气读数（机舱简报）
     WMO code → 简短英文标签，由 src/data/regionalModel.js:94 weatherCodeLabel()
     产出，整表过去零覆盖。云量是插值串，见下方 CLOUD 规则。
     注意 CLEAR：路由面板的芯片可视标签也是 `CLEAR`（= 清除），
     那一侧已用 data-gev-i18n-skip-text 让开（见 directions/index.js）。 */
  CLEAR: '晴',
  'PARTLY CLOUDY': '局部多云',
  OVERCAST: '阴',
  FOG: '雾',
  DRIZZLE: '毛毛雨',
  RAIN: '雨',
  'RAIN SHOWERS': '阵雨',
  SNOW: '雪',
  'SNOW SHOWERS': '阵雪',
  THUNDERSTORM: '雷暴',
  'MIXED CONDITIONS': '天气多变',
  'CONDITIONS UNKNOWN': '天气未知',
  'CLOUD UNKNOWN': '云量未知',
  'ROUTE DATA UNAVAILABLE': '航路数据不可用',
  FROM: '起点',
  TO: '终点',
  UNKNOWN: '未知',
  'LIVE SIGNALS': '实时信号',
  'OBSERVED / MAPPED PINGS': '观测／测绘信号',
  'Cockpit briefing controls': '驾驶舱简报控件',
  'Previous briefing page': '上一页简报',
  'Next briefing page': '下一页简报',
  'Cycle briefing pages automatically every 9 seconds (Signals → News → Local). Pauses while you hover or focus the panel. Live signal data refreshes continuously either way.':
    '每 9 秒自动循环简报页（信号 → 新闻 → 本地）。鼠标悬停或聚焦面板时暂停。无论是否循环，实时信号数据都在持续刷新。',
  'CYCLE OFF': '循环 关',
  'Collapse cockpit briefing panel': '收起驾驶舱简报面板',
  'Collapse briefing panel': '收起简报面板',
  'Live signals': '实时信号',
  'Latest regional news': '最新区域新闻',
  'Location-based information': '基于位置的信息',
  'ACQUIRING REGIONAL NEWS': '正在获取区域新闻',
  'RESOLVING REGION': '正在解析区域',
  TEMP: '气温',
  WIND: '风',
  SKY: '天空',
  PRECIP: '降水',
  'SOURCE-BACKED EVENTS · NO SYNTHETIC NEWS': '有据可查的事件 · 不做合成新闻',
  'Cockpit briefing pages': '驾驶舱简报页',
  'Show Live Signals': '显示实时信号',
  'Show Regional News': '显示区域新闻',
  'Show Local Info': '显示本地信息',
  SIG: '信号',
  NEWS: '新闻',
  LOCAL: '本地',
  'Cockpit display and Radio controls': '驾驶舱显示与电台控件',
  'Expand Cockpit display options': '展开驾驶舱显示选项',
  'Cockpit display options': '驾驶舱显示选项',
  'Cockpit compact Radio controls': '驾驶舱紧凑电台控件',
  READY: '就绪',
  'View switcher': '视图切换',
  'Reset cockpit to full globe view': '重置驾驶舱并回到全球视图',
  'Exit cockpit and return to full globe view': '退出驾驶舱并回到全球视图',
  RESET: '重置',
  'Exit cockpit view': '退出驾驶舱视角',
  'EXIT COCKPIT': '退出驾驶舱',
  'ESC EXIT': 'ESC 退出',
  'C TOGGLE': 'C 切换',
  'Navigation, voice, and visual preset controls': '导航、语音与视觉预设控件',

  /* ------------------------------------------------------------- HUD */
  'TOP SECRET // SI-TK // NOFORN': '绝密 // SI-TK // NOFORN',
  SUMMARY: '摘要',
  REC: '录制',
  'Data attribution': '数据署名',
  'Powered by Esri': '由 Esri 提供',
  'Data provided by:': '数据提供方：',
  'Source: Esri, Vantor, Earthstar Geographics, and the GIS User Community':
    '来源：Esri、Vantor、Earthstar Geographics 及 GIS 用户社区',
  'Powered by Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community':
    '由 Esri 提供 — 来源：Esri、Maxar、Earthstar Geographics 及 GIS 用户社区',
  'Close data attribution': '关闭数据署名',
  'Visible map targets': '可见地图目标',
  'Globe actions': '地球操作',
  'Rendered globe frames per second · toggle with `': '地球渲染帧率 · 用 ` 切换',
  'FPS —': '帧率 —',
  ORBIT: '轨道',
  'Intelligence HUD': '情报 HUD',

  /* ================= P1 追加：全量补齐 ================= */

  /* ------------------------------------------------ 定位托盘与搜索 */
  'Pin location tray': '固定定位托盘',
  'Keep location tray open': '保持定位托盘展开',
  'Search any location': '搜索任意地点',
  'Search any location...': '搜索任意地点…',
  'Search location by name or coordinates': '按名称或坐标搜索地点',
  /* 城市预设按钮：点击用的是 dataset.locationId，不读显示文字，翻译安全 */
  Austin: '奥斯汀',
  'San Francisco': '旧金山',
  'New York': '纽约',
  Tokyo: '东京',
  London: '伦敦',
  Paris: '巴黎',
  Dubai: '迪拜',
  'Washington DC': '华盛顿特区',
  Tallinn: '塔林',

  /* ------------------------------------------------- 视觉预设名称 */
  Normal: '正常',
  Anime: '动画',
  Noir: '黑白',
  Snow: '雪景',
  /* CRT / NVG / FLIR 是行业通用缩写，保留 */

  /* ------------------------------------------- 视觉预设说明（tooltip） */
  'Show the globe without a visual filter.': '不使用视觉滤镜显示地球。',
  'Emulate a green phosphor CRT with scanlines and screen curvature.':
    '模拟带扫描线与屏幕弧度的绿色荧光 CRT。',
  'Simulate night-vision goggles with green intensification and a tube vignette.':
    '模拟夜视仪：绿色增益 + 镜筒暗角。',
  'Simulate FLIR-style thermal contrast. Turn up Ironbow for color.':
    '模拟 FLIR 风格热成像对比。调高 Ironbow 可上色。',
  'Apply bright cel-shaded color and illustrated outlines.':
    '应用明亮的赛璐璐上色与描边。',
  'Apply high-contrast monochrome film-noir grading.':
    '应用高对比黑白黑色电影调色。',
  'Add a cold, snowy whiteout treatment to the scene.':
    '给场景加上寒冷的雪原白化处理。',

  /* ------------------------------------------------- 检测叠加层 */
  'Detection overlay: dense': '检测叠加层：密集',
  'Detection label density': '检测标签密度',
  'Detection label allocation': '检测标签分配',
  'Detection fade distance': '检测淡出距离',
  'Detection opacity outside the keyhole': '视野外检测不透明度',
  'World-overlay fade distance outside the keyhole as a percentage of its radius':
    '视野外覆盖层淡出距离，占视野半径的百分比',
  'World-overlay label and card opacity beyond the fade distance':
    '淡出距离之外的标签与卡片不透明度',

  /* ------------------------------------------------- 零散属性文案 */
  'Collapse panel': '收起面板',
  'Expand panel': '展开面板',
  'Map source': '地图源',
  'HUD layout': 'HUD 布局',
  Play: '播放',
  'Expand Cockpit Radio controls': '展开驾驶舱电台控件',
  'Collapse Cockpit Radio controls': '收起驾驶舱电台控件',

  /* --------------------------------------------- 驾驶舱同类计数缩写 */
  FLT: '航班',
  MIL: '军机',
  SITE: '设施',

  /* ------------------------------------------------------------ 其他 */
  'fix the map': '修正地图',
  'Datacenters:': '数据中心：',
  'Dams:': '水坝：',

  /* ====================== 数据署名灯箱 ======================
     规则：**只翻译描述性文字**。许可证标识（ODbL 1.0 / CC BY 4.0 /
     CC BY-NC-SA 3.0 …）、机构与品牌名、URL、文献引用，以及
     "Powered by TfL Open Data"、"© OpenStreetMap contributors"、
     "Weather data by Open-Meteo.com" 这类被许可方要求逐字呈现的署名句，
     一律保留英文原文。 */
  'Flights: OpenSky Network — Schäfer et al., “Bringing Up OpenSky”, IPSN 2014 ·':
    '航班：OpenSky Network — Schäfer 等，《Bringing Up OpenSky》，IPSN 2014 ·',
  'Military flights, aircraft traces & bounded regional flight fallback:':
    '军机、飞机航迹，以及限定区域的航班兜底：',
  'Live vessels (AIS):': '实时船舶（AIS）：',
  'Satellites (TLEs): CelesTrak (': '卫星（TLE）：CelesTrak（',
  '), Dr. T.S. Kelso': '），Dr. T.S. Kelso',
  'Space mission launch, payload & recovery metadata:': '太空任务发射、载荷与回收元数据：',
  '(API documentation and rate limits)': '（API 文档与速率限制）',
  'Earthquakes: Data courtesy of the U.S. Geological Survey':
    '地震：数据由美国地质调查局（USGS）提供',
  'Road geometry (traffic):': '道路几何（车流）：',
  'Keyless place search:': '免密钥地点搜索：',
  '(komoot) over': '（komoot），基于',
  'ALPR camera locations (automatic license plate readers):':
    '车牌识别摄像头位置（自动车牌读取器）：',
  '); community mapping includes': '）；社区测绘来自',
  'Mapped installation context:': '已测绘设施态势：',
  '(ODbL 1.0; incomplete mapped context)': '（ODbL 1.0；测绘信息不完整）',
  'Cockpit place context and last-resort place search:': '驾驶舱地点态势与兜底地点搜索：',
  'via Nominatim (ODbL 1.0)': '经由 Nominatim（ODbL 1.0）',
  'Cockpit current conditions:': '驾驶舱当前天况：',
  'Cockpit regional headlines:': '驾驶舱区域头条：',
  '(location-matched article links; publisher terms apply)':
    '（按位置匹配的文章链接；适用发布方条款）',
  'CCTV cameras & frames: City of Austin, TX —': '摄像头与画面：美国得州奥斯汀市 —',
  'CCTV cameras & frames (Texas):': '摄像头与画面（得克萨斯）：',
  '(courtesy)': '（致谢）',
  'CCTV cameras & frames (California): Caltrans —': '摄像头与画面（加州）：Caltrans —',
  'CCTV cameras & frames (London):': '摄像头与画面（伦敦）：',
  '. Contains OS data © Crown copyright and database rights.':
    '。包含 OS 数据 © 皇家版权与数据库权利。',
  'CCTV cameras & frames (Ontario):': '摄像头与画面（安大略）：',
  'CCTV cameras & frames (Finland): Fintraffic /': '摄像头与画面（芬兰）：Fintraffic /',
  ', license CC BY 4.0': '，许可证 CC BY 4.0',
  'Traffic cameras (Calgary): contains information licensed under the':
    '交通摄像头（卡尔加里）：包含依以下许可证授权的信息',
  'Bikeshare availability: GBFS operator feeds (e.g. Austin BCycle)':
    '共享单车可用性：GBFS 运营商数据源（如 Austin BCycle）',
  'Routing (voice routes and Directions): OSRM on the FOSSGIS servers —':
    '路线规划（语音路线与导航）：FOSSGIS 服务器上的 OSRM —',
  '(ODbL) ·': '（ODbL）·',
  'Transit vehicles: operator GTFS-Realtime feeds (each operator is credited below when its vehicles are shown)':
    '公交车辆：各运营商的 GTFS-Realtime 数据源（展示车辆时会在下方标注对应运营商）',
  'Internet-radio station directory:': '网络电台目录：',
  '(public domain; audio delivered directly by each broadcaster)':
    '（公有领域；音频由各广播方直接提供）',
  'Terrain (keyless globe stacks):': '地形（免密钥地球图栈）：',
  '/ Mapterhorn (CC BY 4.0) / EGM2008 (NGA)': '／ Mapterhorn（CC BY 4.0）／ EGM2008（NGA）',
  '(ODbL 1.0) + Open Infrastructure Map': '（ODbL 1.0）+ Open Infrastructure Map',
  'Active fires: NASA FIRMS — we acknowledge the use of data and/or imagery from NASA’s Fire Information for Resource Management System (':
    '活跃火点：NASA FIRMS — 我们在此致谢使用 NASA 火灾信息资源管理系统（',
  '), part of NASA’s Earth Observing System Data and Information System (EOSDIS)':
    '）的数据与影像；该系统是 NASA 地球观测系统数据与信息系统（EOSDIS）的一部分',
  'CCTV cameras & frames (British Columbia):': '摄像头与画面（不列颠哥伦比亚）：',
  '. Contains information licensed under the': '。包含依以下许可证授权的信息',
  '. Some cameras are supplied by partners (TransLink, the City of Vancouver, the City of Surrey, Parks Canada and others); each names its provider in the CCTV panel.':
    '。部分摄像头由合作方提供（TransLink、温哥华市、素里市、加拿大公园管理局等）；每路画面都会在摄像头面板中标注提供方。',
  'CCTV cameras & frames (Tallinn): City of Tallinn —': '摄像头与画面（塔林）：塔林市 —',
  'CCTV cameras & frames (Estonia road weather): Transpordiamet / Tarktee —':
    '摄像头与画面（爱沙尼亚道路天气）：Transpordiamet / Tarktee —',
  'Webcam (Warendorf):': '网络摄像头（瓦伦多夫）：',
  '(courtesy); camera poses derived from OpenStreetMap geometry, © OpenStreetMap contributors (ODbL)':
    '（致谢）；相机位姿由 OpenStreetMap 几何数据推导，© OpenStreetMap contributors（ODbL）',
  'CCTV cameras & frames (New South Wales):': '摄像头与画面（新南威尔士）：',
  '— Transport for NSW (': '— 新南威尔士州交通厅（',
  'Submarine cables: © TeleGeography —': '海底电缆：© TeleGeography —',
  '(CC BY-NC-SA 3.0 — NonCommercial)': '（CC BY-NC-SA 3.0 — 非商用）',
  '(non-commercial)': '（非商用）',
  '(CC BY 4.0)': '（CC BY 4.0）',

  /* ============ canvas 绘制文案 ============
     实测：canvas 上的文字绝大多数是**数据**——火箭名、摄像头专名、城市名、
     飞机呼号、飞行高度、速度。这些一律不翻。
     下面只收「界面词汇」：状态代码、图层卡片里的固定词、兜底串。
     注意：飞行等级 FL350、单位 kts/kn/MW、klass 代码 MIL/NAV/GEO 属于行业
     通用写法，按既定规则保留英文。 */
  'NO FEED': '无信号',
  IMAGE: '图像',
  VIDEO: '视频',
  'UPSTREAM SNAPSHOT ACTIVE': '上游快照生效中',
  STALE: '数据陈旧',
  'OSM MAPPED': 'OSM 测绘',
  'PUBLIC MAP DATA': '公开地图数据',
  'MAPPED INSTALLATION': '已测绘设施',
  'ALPR CAMERA': '车牌识别摄像头',
  VESSEL: '船舶',
  DOCKED: '已对接',
  LAUNCHER: '火箭',
  SPACECRAFT: '航天器',
  PAYLOAD: '载荷',
  RECOVERED: '已回收',
  LOST: '回收失败',
  'RECOVERY ATTEMPT': '尝试回收',
  'NO RECOVERY DATA': '无回收数据',
  REUSED: '复用',
  UNSPECIFIED: '未注明',
  'UNSPECIFIED OPERATOR': '未注明运营商',
  'DATE UNAVAILABLE': '日期不可用',
  'POSITION UNAVAILABLE': '位置不可用',
  'PAYLOAD DATA UNAVAILABLE': '载荷数据不可用',
  'PROJECTED ORBIT': '预测轨道',
  'REPLAY ASCENT': '回放上升段',
  'SHOW NEAREST': '显示最近',
  'GLOBAL CONTEXT OFF': '全球态势 关',
  'CONTEXT READY': '态势就绪',

  /* ================= 重试 / 安装反馈 / 密钥 状态（本轮补齐） ================= */
  /* keySetup 芯片：无缺失密钥时（src/keySetup.js:22） */
  'POWERED UP': '已通电',
  /* 摄像头重试详情段："ALPR cameras · retrying in Ns" / "ALPR cameras · retry pending" */
  'ALPR cameras': '车牌识别摄像头',
  'retry pending': '重试待定',
  /* installationFeedback 原因（layerPanel meta 原生大小写呈现；加载浮层 label 转大写） */
  'Overpass rate-limited': 'Overpass 已限流',
  'Overpass timed out': 'Overpass 已超时',
  'Overpass could not complete the query': 'Overpass 未能完成查询',
  'Overpass temporarily unavailable': 'Overpass 暂时不可用',
  'OVERPASS RATE-LIMITED': 'Overpass 已限流',
  'OVERPASS TIMED OUT': 'Overpass 已超时',
  'OVERPASS COULD NOT COMPLETE THE QUERY': 'Overpass 未能完成查询',
  'OVERPASS TEMPORARILY UNAVAILABLE': 'Overpass 暂时不可用',
  /* installationFeedback 其余状态（原生大小写，用于 layerPanel guidance meta） */
  'Retrying mapped sites…': '正在重试已测绘设施…',
  'Fetching mapped sites…': '正在获取已测绘设施…',
  'Zoom in to search mapped installations': '放大以搜索已测绘设施',
  'Showing cached mapped sites': '显示缓存的已测绘设施',
  'Mapped sites not loaded': '已测绘设施未加载',
  'Mapped sites loaded': '已测绘设施已加载',
  /* loadingFeedback 加载浮层重试标签（大写常量） */
  'RETRYING ALPR CAMERAS': '正在重试车牌识别摄像头',
  'FETCHING ALPR CAMERAS': '正在获取车牌识别摄像头',
  'RETRYING MAPPED SITES': '正在重试已测绘设施',
  'FETCHING MAPPED SITES': '正在获取已测绘设施',
  'MAPPED SITES LOADED': '已测绘设施已加载',
  /* layerPanel meta：生命周期状态待校准（src/ui/layerPanel.js:473） */
  'lifecycle state requires reconciliation': '生命周期状态需重新校准',
};

/* ------------------------------------------------------------------ 规则 */

export const rules = [
  /* 时间戳后缀："CelesTrak · 59s ago" 的段 */
  [/^(\d+)s ago$/, (m) => `${m[1]} 秒前`],
  [/^(\d+)m ago$/, (m) => `${m[1]} 分钟前`],
  [/^(\d+)h ago$/, (m) => `${m[1]} 小时前`],
  [/^(\d+)d ago$/, (m) => `${m[1]} 天前`],
  [/^retry (\d+)s$/, (m) => `${m[1]} 秒后重试`],
  [/^retrying in (\d+)s$/, (m) => `${m[1]} 秒后重试`],

  /* 航班兜底时的覆盖范围标签。原文由服务端拼成
     `${ADSBLOL_POINT_RADIUS_NM}nm regional fallback`
     （server/providers/aircraft/opensky.js），半径是常量但会改，所以用规则。 */
  [/^(\d+)nm regional fallback$/, (m) => `${m[1]}nm 区域兜底`],

  /* 图层开关的 aria-label / 按钮文字："Satellites: OFF"、"Radio: UNAVAILABLE"。
     状态来自 src/ui/layerPanel.js:5 FEED_STATE_LABELS 与 :549 的生命周期分支，
     取值是 ON/OFF/LOADING/DEGRADED/STALE/FALLBACK/UNAVAILABLE/UNCERTAIN/
     ENABLING/DISABLING —— 早期只写了 OFF|ON，其余八种状态一律漏译。 */
  [
    /^(.+?):\s*(ON|OFF|LOADING|DEGRADED|STALE|FALLBACK|UNAVAILABLE|UNCERTAIN|ENABLING|DISABLING)$/,
    (m) => `${dict[m[1]] || m[1]}：${dict[m[2]] || m[2]}`,
  ],

  /* 机舱云量："CLOUD 70%"（src/ui/cockpitBriefing.js:244） */
  [/^CLOUD (\d+)%$/, (m) => `云量 ${m[1]}%`],

  /* 密钥数量提示："POWER UP · 8 KEYS WAITING" */
  [/^POWER UP · (\d+) (KEY|KEYS) WAITING$/, (m) => `通电 · 还有 ${m[1]} 个密钥`],

  /* 场景镜头："Shot 3" / "NORMAL · OFF · 6.0s + 1.0s"。
     原文由 src/ui/scenePresentation.js:87 拼成
     `${style.toUpperCase()} · ${mode} · ${dur}s + ${hold}s`：
     第一段是 shot.visual.style（recipes.js 用 retro / surveillance / thermal，
     其余落到 normal），第二段是检测模式，取值见 src/data/detection.js:77
     MODE_LABELS = ['OFF','SPARSE','BALANCED','DENSE']。
     早期版本把第二段当成 OFF/ON 布尔，四种模式只覆盖了一种；其余三种
     靠 ` · ` 分段翻译，产出「RETRO · 密集 · 6.0s」这种半中半英串。 */
  [/^Shot (\d+)$/, (m) => `镜头 ${m[1]}`],
  [
    /^(NORMAL|RETRO|SURVEILLANCE|THERMAL) · (OFF|SPARSE|BALANCED|DENSE) · ([\d.]+)s \+ ([\d.]+)s$/,
    (m) => {
      const style = {
        NORMAL: '标准',
        RETRO: '复古 CRT',
        SURVEILLANCE: '监控',
        THERMAL: '热成像',
      }[m[1]];
      const mode = { OFF: '关', SPARSE: '稀疏', BALANCED: '均衡', DENSE: '密集' }[m[2]];
      return `${style} · ${mode} · ${m[3]}秒 + ${m[4]}秒`;
    },
  ],

  /* 简报页码："1 / 3" 保持不变，无需规则 */

  /* 计数与进度："205 · 3/4" 保持不变，无需规则 */

  /* 位置托盘：正在飞往某地 —— 地名是动态的 */
  [/^Flying to (.+)\.\.\.$/, (m) => `正飞往 ${m[1]}…`],

  /* 语音模型提示（src/voice/realtimeController.js:1824 tierButton.title）：
     模型 id 会变，动作也随当前档位在 mini / standard 之间翻转；
     另有会话进行中档位不一致时的 "Next session: …" 分支。 */
  [
    /^Voice model: (.+?) — click to switch to (mini|standard); applies next session$/,
    (m) =>
      `语音模型：${m[1]} — 点击切换到${m[2] === 'mini' ? '迷你版' : '标准版'}；下次会话生效`,
  ],
  [
    /^Next session: (.+?) — this session stays on (.+)$/,
    (m) => `下次会话：${m[1]} — 本次会话仍使用 ${m[2]}`,
  ],

  /* 会话费用 tooltip（src/voice/realtimeController.js:1837 costValue.title）：
     模型 id、响应次数、两个阈值（voiceCost.js 默认 ~$2.00 / ~$5.00，用户可改）
     以及末尾的 note 都是运行期插值的。早期只把「默认态那一串」冻结成词条，
     一用就回落英文。 */
  [
    /^Estimated session cost on (.+?) — (\d+) response\(s\)\. Warns at ~\$([\d.]+), ends the session at ~\$([\d.]+)\. Estimate is incomplete — a response was still in flight when the session ended, so its usage was never reported\.$/,
    (m) =>
      `${m[1]} 上的预估会话费用 — ${m[2]} 次响应。约 $${m[3]} 时警告，约 $${m[4]} 时结束会话。估算不完整 — 会话结束时仍有响应在途，其用量未被上报。`,
  ],
  [
    /^Estimated session cost on (.+?) — (\d+) response\(s\)\. Warns at ~\$([\d.]+), ends the session at ~\$([\d.]+)\.$/,
    (m) => `${m[1]} 上的预估会话费用 — ${m[2]} 次响应。约 $${m[3]} 时警告，约 $${m[4]} 时结束会话。`,
  ],
  [
    /^Estimate is incomplete — a response was still in flight when the session ended, so its usage was never reported\.$/,
    () => '估算不完整 — 会话结束时仍有响应在途，其用量未被上报。',
  ],

  /* Overpass 重试组合串（src/data/installationFeedback.js:14）：
     原文是 `${原因} — ${倒计时}`，用**破折号**拼接。翻译层的分段只按
     ` · ` 切，切不动这一串；加载浮层自己 split(' — ') 后逐段翻译，所以
     同一条状态浮层能翻、图层面板不能翻。这里补整串规则抹平差异。 */
  [
    /^(Overpass (?:temporarily unavailable|rate-limited|timed out|could not complete the query)) — retrying in (\d+)s$/,
    (m) => `${dict[m[1]] || m[1]} — ${m[2]} 秒后重试`,
  ],
  [
    /^(Overpass (?:temporarily unavailable|rate-limited|timed out|could not complete the query)) — retry pending$/,
    (m) => `${dict[m[1]] || m[1]} — 重试待定`,
  ],

  /* 组合式 tooltip："Expand LOCATION" / "Collapse DATA LAYERS"。
     注意：应用会把**已翻译的**面板标题拼进来（'Expand ' + 标题），
     所以形如 "Expand 定位" 的串整串字典键命中不了，必须用规则兜。
     整串英文形式（"Expand LOCATION"）由精确表先命中，不受影响。 */
  [/^Expand (.+)$/, (m) => `展开 ${m[1]}`],
  [/^Collapse (.+)$/, (m) => `收起 ${m[1]}`],
];

/* -------------------------------------------------------------- 片段替换 */

export const partial = [
  /* 定位托盘读数（数值动态） */
  ['📍 Location: ', '📍 位置：'],
  ['Landmark: ', '地标：'],
  ['DEST ', '目的地 '],

  /* 摄像头标定面板的读数："HDG --"、"PITCH --"（数值动态，做成片段替换） */
  ['HDG ', '朝向 '],
  ['PITCH ', '俯仰 '],
  ['FOV ', '视场角 '],
  ['RANGE ', '距离 '],
  ['HGT ', '安装高 '],
  ['ΔN ', '北移 '],
  ['ΔE ', '东移 '],
  ['SOURCE · ', '来源 · '],

  /* HUD 遥测行：一句里混了多个固定词，逐词替换比整串匹配稳。
     词表来自 src/hud.js 的 _viewBand() / _regionLabel()。
     顺序要紧："ANTARCTIC" 必须排在 "ARCTIC" 前面，
     否则 "ANTARCTIC" 会被切成 "ANT北极"。 */
  ['NORTHERN OCEANIC GRID', '北海洋网格'],
  ['SOUTHERN OCEANIC GRID', '南海洋网格'],
  ['ANTARCTIC', '南极'],
  ['ARCTIC', '北极'],
  ['NORTH AMERICA', '北美洲'],
  ['SOUTH AMERICA', '南美洲'],
  ['EUROPE', '欧洲'],
  ['AFRICA', '非洲'],
  ['ASIA', '亚洲'],
  ['OCEANIA', '大洋洲'],
  ['ANTARCTICA', '南极洲'],
  ['REGIONAL', '区域'],
  ['GLOBAL', '全球'],
  ['METRO', '都会'],
  ['STREET', '街道'],
  ['CITY', '城市'],
  ['NORMAL', '正常'],
  ['NEAR ', '附近 '],
  ['ALT: ', '高度: '],
  ['ALT ', '高度 '],
  ['SUN: ', '太阳: '],
  ['SUN ', '太阳 '],
  ['WINDOW ', '视窗 '],
  ['ONA: ', '偏角: '],
  ['ONA ', '偏角 '],
  ['EL', '仰角'],
  ['BAND: PAN', '波段: 全色'],
  ['BAND: ', '波段: '],
  ['BITS: ', '位深: '],
  ['LVL: ', '级别: '],
  ['COLL: ', '采集: '],
  ['ORB: ', '轨道: '],
  ['PASS: ', '过境: '],
  ['LAT: ', '纬度: '],
  ['LON: ', '经度: '],
  ['GSD: ', '地面分辨率: '],
  ['NIIRS: ', 'NIIRS: '],
  ['PAGE ', '页 '],
  ['KM |', '公里 |'],
  ['KM', '公里'],
  ['MGRS: ', 'MGRS: '],
];
