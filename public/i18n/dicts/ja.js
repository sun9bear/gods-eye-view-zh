/**
 * God's Eye View — 日本語（ja）
 * =============================
 *
 * 与 dicts/zh-Hans.js 同结构：dict / rules / partial 三张表。
 * 键名是**英文原文**，必须与界面上的英文逐字一致（大小写敏感）。
 *
 * 与中文版的两点差异（刻意为之）：
 *   1. 品牌名 "GOD'S EYE" / "VIEW" 保持拉丁字母：日文界面里品牌不音译是惯例。
 *   2. 飞行高度（FL350）、单位（kts / kn / MW）、卫星分类代码（NAV / GEO）
 *      属航空・航天领域惯用写法，保持原样（与中文版同一方针）。
 */

export const LOCALE = {
  tag: 'ja',
  label: '日本語',
  short: '日',
  aliases: ['ja', 'ja-JP', 'jp'],
};

export const dict = {
  /* ------------------------------------------------ ブランド・初回起動 */
  'NO PLACE LEFT BEHIND': '逃げ場のない世界',
  'MISSION CONTROL · FIRST LAUNCH': 'ミッションコントロール · 初回起動',
  'Choose your first view': '最初の視点を選ぶ',
  'It feels like a forbidden cockpit—then you realize the sources are public and the data is real.':
    '禁断のコックピットに見える——だが情報源はすべて公開で、データは本物だ。',
  'LIVE CONTACTS': 'ライブ対象',
  'Aircraft, vessels and nearby intelligence': '航空機・船舶と周辺の情報',
  'SPACE MISSIONS': '宇宙ミッション',
  'Launches, spacecraft and orbital context': '打ち上げ・宇宙機・軌道の状況',
  ENVIRONMENTAL: '環境',
  'Live earthquakes and active fires, from USGS and NASA': 'USGS と NASA による地震・火災のリアルタイム情報',
  'EXPLORE MANUALLY': '手動で探索',
  'Begin with a clean globe': 'まっさらな地球から始める',
  "Don't show this again": '次回から表示しない',
  'ESC to dismiss': 'ESC で閉じる',
  'Tip: the GEV MIC button in the dock lets you talk to the map.':
    'ヒント：ドックの GEV MIC ボタンで音声から地図を操作できます。',

  /* ------------------------------------------------------ 状態・読み込み */
  'ACTIVE STYLE': '適用中のスタイル',
  NORMAL: '通常',
  'LOADING LIVE DATA': 'ライブデータを読み込み中',
  'REFRESHING LIVE DATA': 'ライブデータを更新中',
  'syncing road network': '道路網を同期中',
  'loading frames': 'フレームを読み込み中',
  'SIMULATED — ADD TOMTOM KEY FOR LIVE': 'シミュレーション — TomTom キーで実データ',
  'SIMULATED — add TomTom key for live': 'シミュレーション — TomTom キーで実データ',
  /* 状態チップは短く（9px ボタン内で折り返し防止）。詳細語は説明文側の「フォールバック」を使う。 */
  FALLBACK: '代替',
  UNAVAILABLE: '利用不可',
  'Failed to fetch': '取得に失敗',
  'feed unavailable': 'フィード利用不可',
  never: '未取得',
  'loading...': '読み込み中…',
  /* レイヤー状態ラベル（src/ui/layerPanel.js の FEED_STATE_LABELS 由来） */
  LOADING: '読み込み中',
  DEGRADED: '低下',
  /* レイヤー meta の相対時刻（layerPanel.js の _timeAgo() 由来） */
  'just now': 'たった今',

  /* -------------------------------------------------------- 地球の操作 */
  'Clear selected data layers': '選択中のレイヤーを解除',
  'Turn off all selected data layers': '選択中のレイヤーをすべてオフ',
  'Copy share link': '共有リンクをコピー',
  'Return map to straight-down view': '真下視点に戻す',
  'Toggle straight-down and tilted map views': '真下視点と斜め視点を切替',
  'Reset map bearing to north': '方位を北に戻す',
  'Reset to full globe view': '地球全体の表示に戻す',
  'Reset camera and return to full globe view': 'カメラを戻して地球全体を表示',
  'Reset map to north up. Current heading 15 degrees': '北を上に戻します。現在の方位は 15 度',
  N: '北',

  /* ---------------------------------------------------------- ドック */
  LOCATION: '位置',
  'VISUAL PRESETS': 'ビジュアルプリセット',
  'AI AGENT': 'AI エージェント',
  'VOICE STANDBY': '音声スタンバイ',
  'ON/OFF': 'オン/オフ',
  OFF: 'オフ',
  ON: 'オン',
  STD: '標準',
  MINI: 'ミニ',
  'Expand LOCATION': '位置パネルを展開',
  'Expand VISUAL PRESETS': 'ビジュアルプリセットを展開',
  'Pin visual presets': 'ビジュアルプリセットを固定',
  'Keep visual presets open': 'ビジュアルプリセットを開いたままにする',
  'VOICE CONTROL': '音声コントロール',
  'VOICE SYSTEM ERROR': '音声システムエラー',
  'Voice control — activate to toggle voice; hold Space to speak':
    '音声コントロール — 有効化で音声を切替；Space 長押しで発話',
  'Hold Space to speak · tap Space to activate focused controls':
    'Space 長押しで発話 · Space を軽く押すと選択中の操作を実行',
  'Check microphone permission and network access, then try again.':
    'マイクの許可とネットワーク接続を確認して、もう一度お試しください。',
  'Estimated session cost on gpt-realtime-2 — 0 response(s). Warns at ~$2.00, ends the session at ~$5.00.':
    'gpt-realtime-2 の推定セッション費用 — 応答 0 件。約 $2.00 で警告、約 $5.00 で終了します。',
  DISMISS: '閉じる',
  'Toggle straight-down map view': '真下視点を切替',
  'Return UI controls': 'UI コントロールを表示',
  'EXIT CLEAN VIEW': 'クリーンビューを終了',

  /* -------------------------------------------------------- 地図ソース */
  'MAP SOURCE': '地図ソース',
  Style: 'スタイル',
  SAT: '衛星',
  'Bing Aerial': 'Bing 航空写真',
  'Bing Labels': 'Bing ラベル',
  'Esri Satellite': 'Esri 衛星',
  'Google 3D': 'Google 3D',
  'Bing Aerial unavailable: Needs CESIUM_ION_TOKEN — add it in Provider Settings':
    'Bing 航空写真は利用不可：CESIUM_ION_TOKEN が必要です — プロバイダ設定で追加してください',
  'Bing Labels unavailable: Needs CESIUM_ION_TOKEN — add it in Provider Settings':
    'Bing ラベルは利用不可：CESIUM_ION_TOKEN が必要です — プロバイダ設定で追加してください',
  'Google 3D unavailable: Needs GOOGLE_MAPS_API_KEY — add it in Provider Settings — or a Cesium ion token for the ion-hosted route':
    'Google 3D は利用不可：GOOGLE_MAPS_API_KEY が必要です — プロバイダ設定で追加するか、ion 経由なら Cesium ion トークンが必要です',
  'Needs GOOGLE_MAPS_API_KEY — add it in Provider Settings — or a Cesium ion token for the ion-hosted route':
    'GOOGLE_MAPS_API_KEY が必要です — プロバイダ設定で追加するか、ion 経由なら Cesium ion トークンが必要です',
  'Needs CESIUM_ION_TOKEN — add it in Provider Settings':
    'CESIUM_ION_TOKEN が必要です — プロバイダ設定で追加してください',

  /* ------------------------------------------------ データレイヤー */
  'DATA LAYERS': 'データレイヤー',
  'Expand DATA LAYERS': 'データレイヤーを展開',
  'Collapse DATA LAYERS': 'データレイヤーを折りたたむ',
  Movement: '移動体',
  Infrastructure: 'インフラ',
  Events: 'イベント',
  Utilities: 'ユーティリティ',
  'Other layers': 'その他のレイヤー',
  Satellites: '衛星',
  'Live Flights': 'ライブ便',
  'Military Flights': '軍用機',
  'Live Vessels': 'ライブ船舶',
  'Street Traffic': '道路の交通量',
  'Bike Share': 'シェアサイクル',
  Cameras: 'カメラ',
  'Mapped ALPR Cameras': '地図上のナンバー読取カメラ',
  'Mapped Installations': '地図上の施設',
  'Data Centers': 'データセンター',
  'Submarine Cables': '海底ケーブル',
  Dams: 'ダム',
  'Space Missions (30d)': '宇宙ミッション（30日）',
  'Earthquakes (24h)': '地震（24時間）',
  'Active Fires': '火災検知',
  Directions: '経路案内',
  Radio: 'ラジオ',
  Transit: '公共交通',
  'community mapped': 'コミュニティ地図',
  'observed or mapped nearby context': '観測・地図上の周辺情報',
  'OpenStreetMap + optional Google Maps Places': 'OpenStreetMap + 任意で Google プレイス',
  'CCTV + Street View fallback': 'CCTV + ストリートビュー代替',
  'OSM routing': 'OSM 経路探索',
  /* ルート案内チップ（src/layers/directions/index.js:110-168） */
  'SET A': 'A を設定',
  'SET B': 'B を設定',
  'CLICK MAP': '地図をクリック',
  FLY: '飛行',
  'FLY ···': '飛行中 ···',
  FLYING: '飛行中',
  'Swap A and B': 'A と B を入れ替え',
  'Then click the globe to place the start': '次に地球をクリックして出発点を置きます',
  'Then click the globe to place the destination': '次に地球をクリックして目的地を置きます',
  'Click a spot on the globe to place A (click again to cancel)':
    '地球をクリックして A を配置（もう一度クリックで取消）',
  'Click a spot on the globe to place B (click again to cancel)':
    '地球をクリックして B を配置（もう一度クリックで取消）',
  'Fly the camera along the route': 'カメラを経路に沿って飛行させる',
  'Place A and B first': '先に A と B を配置してください',
  'Remove the route and both markers': '経路と 2 つのマーカーを削除',
  LIVE: 'ライブ',
  Local: 'ローカル',
  CAMERAS: 'カメラ',

  /* -------------------------------------------------------- シーン */
  SCENES: 'シーン',
  'Expand SCENES': 'シーンを展開',
  'Collapse SCENES': 'シーンを折りたたむ',
  'Scene recipe': 'シーンレシピ',
  'Global Flights Radar': '世界のフライトレーダー',
  'Orbital Watch': '軌道監視',
  'Thermal Threat Board': '熱画像スレットボード',
  'City Overload': '都市オーバーロード',
  'Omniscience Pullback': '全知のプルバック',
  NEW: '新規',
  DEL: '削除',
  'CAPTURE SHOT': 'ショットを取得',
  'UPDATE SHOT': 'ショットを更新',
  LOAD: '読込',
  START: '開始',
  STOP: '停止',
  'EXPORT PRESETS': 'プリセットを書き出し',
  IMPORT: '読み込み',
  'RUN LOG': '実行ログ',
  Ready: '準備完了',

  /* -------------------------------------------------------- 表示パネル */
  DISPLAY: '表示',
  'Expand DISPLAY': '表示パネルを展開',
  'Collapse DISPLAY': '表示パネルを折りたたむ',
  'Intelligence HUD (H)': '情報 HUD（H）',
  HUD: 'HUD',
  Layout: 'レイアウト',
  Tactical: 'タクティカル',
  Operator: 'オペレーター',
  Minimal: 'ミニマル',
  'Detection Overlay (D)': '検出オーバーレイ（D）',
  DENSE: '高密度',
  Density: '密度',
  Allocation: '割り当て',
  Elastic: '弾性',
  Weighted: '重み付き',
  Fade: 'フェード',
  Outside: '外側',
  PARAMETERS: 'パラメータ',
  '3D aircraft — flat icons zoomed out, 3D models up close':
    '3D 航空機 — 引くと平面アイコン、寄ると 3D モデル',
  Models: 'モデル',
  '3D model coverage': '3D モデルの適用範囲',
  Proximity: '近接',
  All: 'すべて',
  'Scope — the circular viewport mask': 'スコープ — 円形のビューポートマスク',
  Scope: 'スコープ',
  Feather: 'ぼかし',
  'Scope edge feather': 'スコープ端のぼかし',
  'Scope edge feather as a percentage of the keyhole radius':
    'スコープ端のぼかし量（キーホール半径に対する割合）',
  'Draw on the world — click vertices, double-click or Enter to finish, Esc to cancel':
    '地球上に描画 — 頂点をクリック、ダブルクリックか Enter で確定、Esc で取消',
  Draw: '描画',
  Shape: '図形',
  'Shape to draw': '描画する図形',
  Area: '面',
  Line: '線',
  Pin: 'ピン',
  'Label (optional)': 'ラベル（任意）',
  'Label for the drawn shape': '描画した図形のラベル',
  'Colour of the drawn shape': '描画した図形の色',
  Primary: '基本',
  Amber: 'アンバー',
  Cyan: 'シアン',
  Green: '緑',
  Red: '赤',
  'Remove every mark from the board': 'すべてのマークを消去',
  Clear: '消去',
  'Pick a shape, then click the map.': '図形を選び、地図をクリックしてください。',
  'Celestial ring — reveal the full globe': '天体リング — 地球全体を表示',
  Celestial: '天体',
  'Hide UI chrome': 'UI を隠す',
  'Clean UI': 'クリーン UI',
  'Bloom / Glow': 'ブルーム / グロー',
  Bloom: 'ブルーム',
  'Bloom intensity': 'ブルームの強さ',
  Sharpening: 'シャープ',
  Sharpen: 'シャープ',
  'Sharpen intensity': 'シャープの強さ',

  /* -------------------------------------------------------- カメラ */
  CCTV: 'カメラ',
  'Expand CCTV': 'カメラを展開',
  'Collapse CCTV': 'カメラを折りたたむ',
  'SOURCE · UNKNOWN': 'ソース · 不明',
  'Enable CCTV to load camera intersections': 'カメラを有効にすると交差点の映像を読み込みます',
  'CCTV OFF': 'カメラ オフ',
  'CCTV ON': 'カメラ オン',
  NEAREST: '最寄り',
  FOCUS: 'フォーカス',
  'COVERAGE ON': 'カバレッジ オン',
  'COVERAGE OFF': 'カバレッジ オフ',
  'VIEWSHED ON': '視域 オン',
  'AUTO HOP OFF': '自動切替 オフ',
  'AUTO HOP ON': '自動切替 オン',
  'PROJECTION ON': '投影 オン',
  'PROJECTION OFF': '投影 オフ',
  CALIBRATION: 'キャリブレーション',
  CAL: 'キャリブ',
  ADJUST: '調整',
  'SAVE CAL': 'キャリブを保存',
  'RESET CAL': 'キャリブを初期化',
  'SCENE SUMMARY': 'シーン概要',
  'No cameras available in catalog.': 'カタログに利用可能なカメラがありません。',
  'CCTV camera': 'カメラ映像',
  'Camera pose — click a value to type': 'カメラ姿勢 — 数値をクリックして直接入力',
  'Heading (compass °) — click to type': '方位（コンパス °）— クリックで入力',
  'Pitch (° up/down) — click to type': 'ピッチ（° 上下）— クリックで入力',
  'Horizontal FOV (°) — click to type': '水平画角（°）— クリックで入力',
  'Range / monitor-plane distance (m) — click to type': 'レンジ／モニタ平面までの距離（m）— クリックで入力',
  'Mount height above ground (m) — click to type': '地上からの設置高（m）— クリックで入力',
  'North offset from catalog position (m) — click to type': 'カタログ位置からの北方向オフセット（m）— クリックで入力',
  'East offset from catalog position (m) — click to type': 'カタログ位置からの東方向オフセット（m）— クリックで入力',
  'Drag the camera in the world: rings rotate, arrows move, handles set range/FOV':
    '地球上でカメラをドラッグ：リングで回転、矢印で移動、ハンドルで距離／画角',

  /* -------------------------------------------------------- コンテキスト */
  CONTEXT: 'コンテキスト',
  'Expand CONTEXT': 'コンテキストを展開',
  'Collapse CONTEXT': 'コンテキストを折りたたむ',
  'Context mode': 'コンテキストモード',
  CONTACTS: '対象',
  'Cycles the nearest contacts of whatever type you select — planes, vessels, installations. Satellites track independently.':
    '選択した種別の最寄り対象を順に切り替えます — 航空機・船舶・施設。衛星は独立して追跡します。',
  'SELECT CONTEXT': 'コンテキストを選択',
  'CONTACTS — nearest planes · vessels · sites': '対象 — 最寄りの航空機 · 船舶 · 施設',
  'SPACE MISSIONS — launches & orbital assets': '宇宙ミッション — 打ち上げと軌道上の資産',
  'Contact Context actions': '対象コンテキストの操作',
  COCKPIT: 'コックピット',
  'SEARCH NEARBY SITES': '周辺の施設を検索',
  'Reclassify tracked contact as TR-3B': '追跡対象を TR-3B として再分類',
  'Reclassify as TR-3B': 'TR-3B として再分類',
  'CONTACTS CONTEXT OFF': '対象コンテキスト オフ',
  'SELECT CONTACTS TO LOAD OBSERVED / MAPPED PROXIMITY':
    '対象を選択すると観測・地図上の近接情報を読み込みます',
  'Available Space Missions': '利用可能な宇宙ミッション',
  'AVAILABLE MISSIONS': '利用可能なミッション',
  'SELECT A MISSION TO INSPECT': 'ミッションを選択して詳細を表示',
  'LOADING 30-DAY MISSION INDEX': '30 日間のミッション索引を読み込み中',
  'TAB PREVIEWS · ENTER / SPACE SELECTS': 'Tab でプレビュー · Enter / Space で選択',
  CONTACT: '対象',
  'CONTACTS · 250 KM': '対象 · 250 km',
  'CONTEXT ONLY': 'コンテキストのみ',
  'Nearby cohort counts': '近傍の種別ごとの件数',
  'NEAREST OBSERVED / MAPPED': '最寄りの観測・地図情報',
  'NO AVAILABLE EXAMPLE': '該当例なし',
  'AVAILABLE INPUTS ONLY · NOT AN ALL-CLEAR': '利用可能な入力のみ · 安全の保証ではありません',
  Previous: '前へ',
  Next: '次へ',
  CURRENT: '現在',
  PREV: '前へ',
  NEXT: '次へ',
  'Previous — prior visited contact in the 250 km window':
    '前へ — 250 km 圏内で直前に表示した対象',
  'Next — nearest unvisited contact in the 250 km window':
    '次へ — 250 km 圏内で未表示の最寄り対象',
  'Collapse contact panel': '対象パネルを折りたたむ',
  'Collapse Contact panel': '対象パネルを折りたたむ',

  /* -------------------------------------------------------- ラジオ */
  RADIO: 'ラジオ',
  'Expand Radio': 'ラジオを展開',
  'Expand Radio section': 'ラジオセクションを展開',
  'Open compact Radio controls': 'ラジオのコンパクト操作を開く',
  'Open detailed Radio controls': 'ラジオの詳細操作を開く',
  'Close compact Radio controls': 'ラジオのコンパクト操作を閉じる',
  'Compact Radio controls': 'ラジオのコンパクト操作',
  'Compact Radio volume': 'ラジオのコンパクト音量',
  'Internet radio companion': 'インターネットラジオ',
  'RADIO READY': 'ラジオ準備完了',
  'RADIO OFF': 'ラジオ オフ',
  'PAUSE': '一時停止',
  'RESUME': '再開',
  'PLAY': '再生',
  'ENABLING': '有効化中',
  'DISABLING': '無効化中',
  'UNCERTAIN': '状態不明',
  'RADIO STATE UNCERTAIN': 'ラジオの状態が不明',
  'DISABLE': 'オフにする',
  'STATION TAG': '局のタグ',
  'Filter stations by station tag': '局のタグで絞り込み',
  'NO STATION SELECTED': '局が選択されていません',
  'Choose a globe marker or use next.': '地球上のマーカーを選ぶか「次へ」を押してください。',
  'DIRECTORY BAND': 'ディレクトリバンド',
  'DRAG TO TUNE': 'ドラッグして同調',
  'Tune available internet radio stations': '利用可能なインターネット局に同調',
  'ALL · DRAG THE NEEDLE': 'すべて · 針をドラッグ',
  'SNAPS TO AVAILABLE STATIONS': '利用可能な局にスナップします',
  'Radio playback': 'ラジオ再生',
  'Previous filtered station': '絞り込み内の前の局',
  'Previous filtered radio station': '絞り込み内の前の局',
  'Next filtered station': '絞り込み内の次の局',
  'Next filtered radio station': '絞り込み内の次の局',
  'Stop radio playback': '再生を停止',
  'Play nearest radio station': '最寄りの局を再生',
  'Pause selected radio station': '選択中の局を一時停止',
  'Resume selected radio station': '選択中の局を再開',
  'Play selected radio station': '選択中の局を再生',
  'Pause nearest radio station': '最寄りの局を一時停止',
  'Resume nearest radio station': '最寄りの局を再開',
  'Radio volume': 'ラジオの音量',
  'Cockpit Radio volume': 'コックピットのラジオ音量',
  'Radio off': 'ラジオはオフです',
  'STATION SITE': '局のサイト',
  'DIRECTORY: RADIO BROWSER': 'ディレクトリ：Radio Browser',
  'Audio connects directly to the broadcaster after you press play. Your IP is visible to that broadcaster.':
    '再生を押すと音声は放送局に直接接続されます。あなたの IP はその放送局に見えます。',
  'Previous station': '前の局',
  'Next station': '次の局',
  'Enable Radio': 'ラジオを有効化',
  'Disable Radio': 'ラジオを無効化',
  ENABLE: '有効化',
  VOLUME: '音量',
  PLAY: '再生',

  /* ---------------------------------------------------- プロバイダ設定 */
  'GROUND STATION · PROVIDER SETTINGS': '地上局 · プロバイダ設定',
  'Power up the globe': '地球に電源を入れる',
  'POWER UP': '電源投入',
  "The globe already flies keyless. Every key below switches on another real feed — paste one and it's saved into this app's local configuration, then the server restarts itself. Server-side keys stay on this machine; Google Maps and Cesium ion run in the browser and must be provider-restricted. Keys you configured elsewhere are shown but never touched.":
    'この地球はキーなしでも動きます。以下のキーはそれぞれ別の実データフィードを有効にします — 貼り付けるとこのアプリのローカル設定に保存され、サーバーが自動で再起動します。サーバー側のキーはこのマシンに留まります。Google Maps と Cesium ion はブラウザ側で動作するため、プロバイダ側で制限をかけてください。他所で設定済みのキーは表示されますが、変更されることはありません。',
  'Close key setup': 'キー設定を閉じる',
  'GET KEY ↗': 'キーを取得 ↗',
  'browser-side': 'ブラウザ側',
  'Metered — a billing-enabled account': '従量課金 — 請求有効なアカウント',
  'Free key — register, paste, done': '無料キー — 登録して貼るだけ',
  'This key runs in the browser by design — restrict it at the provider (see SECURITY.md)':
    'このキーは設計上ブラウザで動作します — プロバイダ側で制限してください（SECURITY.md 参照）',
  'The photorealistic 3D planet + place search': 'フォトリアル 3D 地球 + 場所検索',
  'Voice control — talk to the planet': '音声操作 — 地球に話しかける',
  'Live ships, worldwide': '世界中の船舶をリアルタイム表示',
  'Live active-fire detections': '火災検知のリアルタイム情報',
  'Real live traffic (keyless runs a simulation)': '実際の交通状況（キーなしはシミュレーション）',
  'Bing imagery map stacks + world terrain': 'Bing 画像タイル + 世界の地形',
  'More flight-polling credits (anonymous works without)': '航空機ポーリングの上限を拡大（匿名でも利用可）',
  'Higher space-missions request allowance': '宇宙ミッションのリクエスト上限を拡大',
  'SAVE KEYS': 'キーを保存',
  'ESC to close': 'ESC で閉じる',
  'The Google Maps key buys the photorealistic planet — everything else stacks on top.':
    'Google Maps のキーでフォトリアルな地球が手に入ります — 他の機能はその上に載ります。',

  /* -------------------------------------------------------- コックピット */
  'Aircraft cockpit view': '航空機コックピット視点',
  LEVEL: '水平',
  'Estimated destination direction': '推定される目的地の方位',
  'OPTICAL PLANE · 01': '光学面 · 01',
  'VISOR LOCK · ACTIVE': 'バイザーロック · 有効',
  'GROUND SPEED · KTS': '対地速度 · kt',
  'GROUND SPEED': '対地速度',
  'ALTITUDE · FT': '高度 · ft',
  ALTITUDE: '高度',
  KTS: 'kt',
  FT: 'ft',
  'FIRST PERSON': '一人称',
  AIRCRAFT: '航空機',
  'LIVE TRACK · COURSE ALIGNED': 'ライブ航跡 · 針路一致',
  'Cockpit vision style': 'コックピットの視覚スタイル',
  'Previous cockpit vision style': '前の視覚スタイル',
  'Previous vision style': '前の視覚スタイル',
  'Next cockpit vision style': '次の視覚スタイル',
  'Next vision style': '次の視覚スタイル',
  'Current cockpit vision style: NORMAL. Activate for next style.':
    '現在の視覚スタイル：通常。実行すると次のスタイルへ。',
  'Current style: NORMAL — click for next': '現在のスタイル：通常 — クリックで次へ',
  'Current aircraft heading': '現在の機首方位',
  'Contact cockpit summary': '対象のコックピット概要',
  'Contact navigation': '対象のナビゲーション',
  'Enable cockpit weather effects': 'コックピットの気象効果を有効化',
  'Disable cockpit weather effects': 'コックピットの気象効果を無効化',
  /* 気象ラベル（src/data/regionalModel.js:94 weatherCodeLabel、WMO コード由来） */
  CLEAR: '晴れ',
  'PARTLY CLOUDY': '晴れ時々曇り',
  OVERCAST: '曇り',
  FOG: '霧',
  DRIZZLE: '霧雨',
  RAIN: '雨',
  'RAIN SHOWERS': 'にわか雨',
  SNOW: '雪',
  'SNOW SHOWERS': 'にわか雪',
  THUNDERSTORM: '雷雨',
  'MIXED CONDITIONS': '変わりやすい天気',
  'CONDITIONS UNKNOWN': '天気不明',
  'CLOUD UNKNOWN': '雲量不明',
  WX: '気象',
  'Cockpit briefing carousel': 'コックピットブリーフィング',
  'Estimated flight plan': '推定飛行計画',
  'ESTIMATED FLIGHT PLAN': '推定飛行計画',
  'ROUTE DATA UNAVAILABLE': '経路データ利用不可',
  FROM: '出発',
  TO: '到着',
  UNKNOWN: '不明',
  'LIVE SIGNALS': 'ライブシグナル',
  'OBSERVED / MAPPED PINGS': '観測・地図上のシグナル',
  'Cockpit briefing controls': 'ブリーフィング操作',
  'Previous briefing page': '前のブリーフィングページ',
  'Next briefing page': '次のブリーフィングページ',
  'Cycle briefing pages automatically every 9 seconds (Signals → News → Local). Pauses while you hover or focus the panel. Live signal data refreshes continuously either way.':
    '9 秒ごとにページを自動送りします（シグナル → ニュース → 地域）。ホバー中やパネルにフォーカス中は停止します。いずれの場合もライブデータは継続的に更新されます。',
  'CYCLE OFF': '自動送り オフ',
  'Collapse cockpit briefing panel': 'ブリーフィングパネルを折りたたむ',
  'Collapse briefing panel': 'ブリーフィングパネルを折りたたむ',
  'Live signals': 'ライブシグナル',
  'Latest regional news': '地域の最新ニュース',
  'Location-based information': '位置に基づく情報',
  'ACQUIRING REGIONAL NEWS': '地域ニュースを取得中',
  'RESOLVING REGION': '地域を判定中',
  TEMP: '気温',
  WIND: '風',
  SKY: '空',
  PRECIP: '降水',
  'SOURCE-BACKED EVENTS · NO SYNTHETIC NEWS': '出典のある事象 · 合成ニュースなし',
  'Cockpit briefing pages': 'ブリーフィングページ',
  'Show Live Signals': 'ライブシグナルを表示',
  'Show Regional News': '地域ニュースを表示',
  'Show Local Info': '地域情報を表示',
  SIG: 'シグナル',
  NEWS: 'ニュース',
  LOCAL: '地域',
  'Cockpit display and Radio controls': 'コックピット表示とラジオ操作',
  'Expand Cockpit display options': 'コックピット表示オプションを展開',
  'Cockpit display options': 'コックピット表示オプション',
  'Cockpit compact Radio controls': 'コックピットのラジオ操作',
  READY: '準備完了',
  'View switcher': 'ビュー切替',
  'Reset cockpit to full globe view': 'コックピットを終了して地球全体を表示',
  'Exit cockpit and return to full globe view': 'コックピットを終了して地球全体を表示',
  RESET: 'リセット',
  'Exit cockpit view': 'コックピット視点を終了',
  'EXIT COCKPIT': 'コックピットを終了',
  'ESC EXIT': 'ESC で終了',
  'C TOGGLE': 'C で切替',
  'Navigation, voice, and visual preset controls': 'ナビゲーション・音声・ビジュアルプリセット',

  /* ------------------------------------------------------------ HUD */
  'TOP SECRET // SI-TK // NOFORN': '極秘 // SI-TK // NOFORN',
  SUMMARY: '概要',
  REC: '録画',
  'Data attribution': 'データの出典',
  'Powered by Esri': 'Esri 提供',
  'Data provided by:': 'データ提供：',
  'Source: Esri, Vantor, Earthstar Geographics, and the GIS User Community':
    '出典：Esri、Vantor、Earthstar Geographics、GIS ユーザーコミュニティ',
  'Powered by Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community':
    'Esri 提供 — 出典：Esri、Maxar、Earthstar Geographics、GIS ユーザーコミュニティ',
  'Close data attribution': 'データ出典を閉じる',
  'Visible map targets': '表示中の地図対象',
  'Globe actions': '地球の操作',
  'Rendered globe frames per second · toggle with `': '地球の描画フレームレート · ` で切替',
  'FPS —': 'FPS —',
  ORBIT: '軌道',
  'Intelligence HUD': '情報 HUD',

  /* ------------------------------------------------- 位置パネル・検索 */
  'Pin location tray': '位置トレイを固定',
  'Keep location tray open': '位置トレイを開いたままにする',
  'Search any location': '場所を検索',
  'Search any location...': '場所を検索…',
  'Search location by name or coordinates': '名称または座標で場所を検索',
  Austin: 'オースティン',
  'San Francisco': 'サンフランシスコ',
  'New York': 'ニューヨーク',
  Tokyo: '東京',
  London: 'ロンドン',
  Paris: 'パリ',
  Dubai: 'ドバイ',
  'Washington DC': 'ワシントン DC',
  Tallinn: 'タリン',

  /* ------------------------------------------------- ビジュアルプリセット */
  Normal: '通常',
  Anime: 'アニメ',
  Noir: 'ノワール',
  Snow: '雪',
  'Show the globe without a visual filter.': '視覚フィルターなしで地球を表示します。',
  'Emulate a green phosphor CRT with scanlines and screen curvature.':
    '走査線と画面の湾曲を備えた緑色蛍光 CRT を再現します。',
  'Simulate night-vision goggles with green intensification and a tube vignette.':
    '緑の増感と鏡筒ビネットで暗視ゴーグルを再現します。',
  'Simulate FLIR-style thermal contrast. Turn up Ironbow for color.':
    'FLIR 風の熱コントラストを再現します。Ironbow を上げると着色されます。',
  'Apply bright cel-shaded color and illustrated outlines.':
    '明るいセルシェーディングと線画の輪郭を適用します。',
  'Apply high-contrast monochrome film-noir grading.':
    '高コントラストのモノクロ・フィルムノワール調に仕上げます。',
  'Add a cold, snowy whiteout treatment to the scene.':
    '冷たい雪のホワイトアウト表現をシーンに加えます。',

  /* ------------------------------------------------------ 検出オーバーレイ */
  'Detection overlay: dense': '検出オーバーレイ：高密度',
  'Detection label density': '検出ラベルの密度',
  'Detection label allocation': '検出ラベルの割り当て',
  'Detection fade distance': '検出のフェード距離',
  'Detection opacity outside the keyhole': 'キーホール外の検出の不透明度',
  'World-overlay fade distance outside the keyhole as a percentage of its radius':
    'キーホール外のワールドオーバーレイのフェード距離（半径に対する割合）',
  'World-overlay label and card opacity beyond the fade distance':
    'フェード距離より外側のラベルとカードの不透明度',

  /* ------------------------------------------------------ その他の属性 */
  'Collapse panel': 'パネルを折りたたむ',
  'Expand panel': 'パネルを展開',
  'Map source': '地図ソース',
  'HUD layout': 'HUD レイアウト',
  Play: '再生',
  'Expand Cockpit Radio controls': 'コックピットのラジオ操作を展開',
  'Collapse Cockpit Radio controls': 'コックピットのラジオ操作を折りたたむ',

  /* ------------------------------------------------ コックピットの件数表示 */
  FLT: '便',
  MIL: '軍用',
  SITE: '施設',

  /* ------------------------------------------------------------ その他 */
  'fix the map': '地図を修正',
  'Datacenters:': 'データセンター：',
  'Dams:': 'ダム：',

  /* ====================== データ出典ボックス ======================
     方針：**説明文だけを翻訳**。ライセンス表記（ODbL 1.0 / CC BY 4.0 /
     CC BY-NC-SA 3.0 …）、機関名・ブランド名、URL、文献引用、および
     "Powered by TfL Open Data"、"© OpenStreetMap contributors"、
     "Weather data by Open-Meteo.com" のような逐字表示が求められる
     クレジット文は英語のまま残す。 */
  'Flights: OpenSky Network — Schäfer et al., “Bringing Up OpenSky”, IPSN 2014 ·':
    '便：OpenSky Network — Schäfer ほか「Bringing Up OpenSky」IPSN 2014 ·',
  'Military flights, aircraft traces & bounded regional flight fallback:':
    '軍用機、航空機の航跡、および地域限定のフライトフォールバック：',
  'Live vessels (AIS):': 'リアルタイム船舶（AIS）：',
  'Satellites (TLEs): CelesTrak (': '衛星（TLE）：CelesTrak（',
  '), Dr. T.S. Kelso': '）、Dr. T.S. Kelso',
  'Space mission launch, payload & recovery metadata:':
    '宇宙ミッションの打ち上げ・ペイロード・回収メタデータ：',
  '(API documentation and rate limits)': '（API ドキュメントとレート制限）',
  'Earthquakes: Data courtesy of the U.S. Geological Survey':
    '地震：データ提供 米国地質調査所（USGS）',
  'Road geometry (traffic):': '道路ジオメトリ（交通）：',
  'Keyless place search:': 'キー不要の場所検索：',
  '(komoot) over': '（komoot）、基盤は',
  'ALPR camera locations (automatic license plate readers):':
    'ナンバープレート読取カメラの位置（ALPR）：',
  '); community mapping includes': '）；コミュニティ地図は',
  'Mapped installation context:': '地図上の施設情報：',
  '(ODbL 1.0; incomplete mapped context)': '（ODbL 1.0；地図情報は不完全）',
  'Cockpit place context and last-resort place search:':
    'コックピットの場所情報と最後の手段の場所検索：',
  'via Nominatim (ODbL 1.0)': 'Nominatim 経由（ODbL 1.0）',
  'Cockpit current conditions:': 'コックピットの現在の気象：',
  'Cockpit regional headlines:': 'コックピットの地域ヘッドライン：',
  '(location-matched article links; publisher terms apply)':
    '（位置に基づく記事リンク。出版社の利用条件が適用されます）',
  'CCTV cameras & frames: City of Austin, TX —': 'カメラと映像：米国テキサス州オースティン市 —',
  'CCTV cameras & frames (Texas):': 'カメラと映像（テキサス州）：',
  '(courtesy)': '（提供）',
  'CCTV cameras & frames (California): Caltrans —': 'カメラと映像（カリフォルニア州）：Caltrans —',
  'CCTV cameras & frames (London):': 'カメラと映像（ロンドン）：',
  '. Contains OS data © Crown copyright and database rights.':
    '。OS データを含む © Crown copyright and database rights.',
  'CCTV cameras & frames (Ontario):': 'カメラと映像（オンタリオ州）：',
  'CCTV cameras & frames (Finland): Fintraffic /': 'カメラと映像（フィンランド）：Fintraffic /',
  ', license CC BY 4.0': '、ライセンス CC BY 4.0',
  'Traffic cameras (Calgary): contains information licensed under the':
    '交通カメラ（カルガリー）：以下のライセンスで提供される情報を含みます',
  'Bikeshare availability: GBFS operator feeds (e.g. Austin BCycle)':
    'シェアサイクルの空き状況：GBFS 事業者フィード（例：Austin BCycle）',
  'Routing (voice routes and Directions): OSRM on the FOSSGIS servers —':
    '経路探索（音声ルートと経路案内）：FOSSGIS サーバー上の OSRM —',
  '(ODbL) ·': '（ODbL）·',
  'Transit vehicles: operator GTFS-Realtime feeds (each operator is credited below when its vehicles are shown)':
    '公共交通の車両：各事業者の GTFS-Realtime フィード（車両表示時は下に事業者を表示します）',
  'Internet-radio station directory:': 'インターネットラジオ局のディレクトリ：',
  '(public domain; audio delivered directly by each broadcaster)':
    '（パブリックドメイン。音声は各放送局から直接配信されます）',
  'Terrain (keyless globe stacks):': '地形（キー不要の地球タイル）：',
  '/ Mapterhorn (CC BY 4.0) / EGM2008 (NGA)': '/ Mapterhorn（CC BY 4.0）/ EGM2008（NGA）',
  '(ODbL 1.0) + Open Infrastructure Map': '（ODbL 1.0）+ Open Infrastructure Map',
  'Active fires: NASA FIRMS — we acknowledge the use of data and/or imagery from NASA’s Fire Information for Resource Management System (':
    '火災検知：NASA FIRMS — NASA の Fire Information for Resource Management System（',
  '), part of NASA’s Earth Observing System Data and Information System (EOSDIS)':
    '）のデータおよび画像の利用をここに明記します。これは NASA の Earth Observing System Data and Information System（EOSDIS）の一部です',
  'CCTV cameras & frames (British Columbia):': 'カメラと映像（ブリティッシュコロンビア州）：',
  '. Contains information licensed under the': '。以下のライセンスで提供される情報を含みます',
  '. Some cameras are supplied by partners (TransLink, the City of Vancouver, the City of Surrey, Parks Canada and others); each names its provider in the CCTV panel.':
    '。一部のカメラはパートナー（TransLink、バンクーバー市、サリー市、パークスカナダほか）から提供されています。各映像はカメラパネルに提供元を表示します。',
  'CCTV cameras & frames (Tallinn): City of Tallinn —': 'カメラと映像（タリン）：タリン市 —',
  'CCTV cameras & frames (Estonia road weather): Transpordiamet / Tarktee —':
    'カメラと映像（エストニアの道路気象）：Transpordiamet / Tarktee —',
  'Webcam (Warendorf):': 'ウェブカメラ（ヴァーレンドルフ）：',
  '(courtesy); camera poses derived from OpenStreetMap geometry, © OpenStreetMap contributors (ODbL)':
    '（提供）；カメラ姿勢は OpenStreetMap のジオメトリから算出、© OpenStreetMap contributors（ODbL）',
  'CCTV cameras & frames (New South Wales):': 'カメラと映像（ニューサウスウェールズ州）：',
  '— Transport for NSW (': '— Transport for NSW（',
  'Submarine cables: © TeleGeography —': '海底ケーブル：© TeleGeography —',
  '(CC BY-NC-SA 3.0 — NonCommercial)': '（CC BY-NC-SA 3.0 — 非営利）',
  '(non-commercial)': '（非営利）',
  '(CC BY 4.0)': '（CC BY 4.0）',

  /* ------------------------------------------------ canvas 描画テキスト */
  'NO FEED': '映像なし',
  IMAGE: '静止画',
  VIDEO: '動画',
  'UPSTREAM SNAPSHOT ACTIVE': '上流スナップショット有効',
  STALE: 'データが古い',
  'OSM MAPPED': 'OSM 地図',
  'PUBLIC MAP DATA': '公開地図データ',
  'MAPPED INSTALLATION': '地図上の施設',
  'ALPR CAMERA': 'ナンバー読取カメラ',
  VESSEL: '船舶',
  DOCKED: 'ドッキング済み',
  LAUNCHER: 'ローンチャー',
  SPACECRAFT: '宇宙機',
  PAYLOAD: 'ペイロード',
  RECOVERED: '回収済み',
  LOST: '回収失敗',
  'RECOVERY ATTEMPT': '回収試行',
  'NO RECOVERY DATA': '回収データなし',
  REUSED: '再使用',
  UNSPECIFIED: '未指定',
  'UNSPECIFIED OPERATOR': '事業者未指定',
  'DATE UNAVAILABLE': '日付不明',
  'POSITION UNAVAILABLE': '位置不明',
  'PAYLOAD DATA UNAVAILABLE': 'ペイロードデータなし',
  'PROJECTED ORBIT': '予測軌道',
  'REPLAY ASCENT': '上昇を再生',
  'SHOW NEAREST': '最寄りを表示',
  'GLOBAL CONTEXT OFF': 'グローバルコンテキスト オフ',
  'CONTEXT READY': 'コンテキスト準備完了',

  /* ============ リトライ / インストールフィードバック / キー 状態（今回追加） ============ */
  /* keySetup チップ：不足キーなしのとき（src/keySetup.js:22） */
  'POWERED UP': '電源投入済み',
  /* カメラ再試行詳細セグメント："ALPR cameras · retrying in Ns" / "ALPR cameras · retry pending" */
  'ALPR cameras': 'ナンバー読取カメラ',
  'retry pending': '再試行待ち',
  /* installationFeedback の理由（layerPanel meta は元の大文字小文字、ロード浮層ラベルは大文字化） */
  'Overpass rate-limited': 'Overpass がレート制限されました',
  'Overpass timed out': 'Overpass がタイムアウトしました',
  'Overpass could not complete the query': 'Overpass はクエリを完了できませんでした',
  'Overpass temporarily unavailable': 'Overpass は一時的に利用できません',
  'OVERPASS RATE-LIMITED': 'Overpass がレート制限されました',
  'OVERPASS TIMED OUT': 'Overpass がタイムアウトしました',
  'OVERPASS COULD NOT COMPLETE THE QUERY': 'Overpass はクエリを完了できませんでした',
  'OVERPASS TEMPORARILY UNAVAILABLE': 'Overpass は一時的に利用できません',
  /* installationFeedback の他の状態（元の大文字小文字、layerPanel guidance meta 用） */
  'Retrying mapped sites…': '地図上の施設を再試行中…',
  'Fetching mapped sites…': '地図上の施設を取得中…',
  'Zoom in to search mapped installations': '拡大して地図上の施設を検索',
  'Showing cached mapped sites': 'キャッシュした地図上の施設を表示中',
  'Mapped sites not loaded': '地図上の施設は読み込まれていません',
  'Mapped sites loaded': '地図上の施設は読み込み済み',
  /* loadingFeedback ロード浮層の再試行ラベル（大文字定数） */
  'RETRYING ALPR CAMERAS': 'ナンバー読取カメラを再試行中',
  'FETCHING ALPR CAMERAS': 'ナンバー読取カメラを取得中',
  'RETRYING MAPPED SITES': '地図上の施設を再試行中',
  'FETCHING MAPPED SITES': '地図上の施設を取得中',
  'MAPPED SITES LOADED': '地図上の施設は読み込み済み',
  /* layerPanel meta：ライフサイクル状態の再調整が必要（src/ui/layerPanel.js:473） */
  'lifecycle state requires reconciliation': 'ライフサイクル状態の再調整が必要',
};

/* ------------------------------------------------------------------ 規則 */

export const rules = [
  /* 経過時間のサフィックス */
  [/^(\d+)s ago$/, (m) => `${m[1]} 秒前`],
  [/^(\d+)m ago$/, (m) => `${m[1]} 分前`],
  [/^(\d+)h ago$/, (m) => `${m[1]} 時間前`],
  [/^(\d+)d ago$/, (m) => `${m[1]} 日前`],
  [/^retry (\d+)s$/, (m) => `${m[1]} 秒後に再試行`],
  [/^retrying in (\d+)s$/, (m) => `${m[1]} 秒後に再試行`],

  /* フライトのフォールバック時のカバレッジ表記。
     原文はサーバ側で `${半径}nm regional fallback` として組み立てられる
     （server/providers/aircraft/opensky.js）。半径は定数だが変わり得るので規則で受ける。 */
  [/^(\d+)nm regional fallback$/, (m) => `${m[1]}nm 広域代替`],

  /* レイヤーの aria-label / ボタン表記："Satellites: OFF"、"Radio: UNAVAILABLE"。
     状態は src/ui/layerPanel.js:5 FEED_STATE_LABELS と :549 のライフサイクル分岐から
     ON/OFF/LOADING/DEGRADED/STALE/FALLBACK/UNAVAILABLE/UNCERTAIN/ENABLING/DISABLING。
     旧版は OFF|ON のみで、残り 8 状態が未訳だった。 */
  [
    /^(.+?):\s*(ON|OFF|LOADING|DEGRADED|STALE|FALLBACK|UNAVAILABLE|UNCERTAIN|ENABLING|DISABLING)$/,
    (m) => `${dict[m[1]] || m[1]}：${dict[m[2]] || m[2]}`,
  ],

  /* コックピットの雲量："CLOUD 70%"（src/ui/cockpitBriefing.js:244） */
  [/^CLOUD (\d+)%$/, (m) => `雲量 ${m[1]}%`],

  /* キー数のヒント */
  [/^POWER UP · (\d+) (KEY|KEYS) WAITING$/, (m) => `電源投入 · 残り ${m[1]} キー`],

  /* シーンのショット：`${style} · ${mode} · ${dur}s + ${hold}s`
     （src/ui/scenePresentation.js:87）。第 2 段は検出モードで
     src/data/detection.js:77 MODE_LABELS = ['OFF','SPARSE','BALANCED','DENSE']。 */
  [/^Shot (\d+)$/, (m) => `ショット ${m[1]}`],
  [
    /^(NORMAL|RETRO|SURVEILLANCE|THERMAL) · (OFF|SPARSE|BALANCED|DENSE) · ([\d.]+)s \+ ([\d.]+)s$/,
    (m) => {
      const style = {
        NORMAL: '標準',
        RETRO: 'レトロ CRT',
        SURVEILLANCE: '監視',
        THERMAL: 'サーマル',
      }[m[1]];
      const mode = {
        OFF: 'オフ',
        SPARSE: '疎',
        BALANCED: 'バランス',
        DENSE: '密',
      }[m[2]];
      return `${style} · ${mode} · ${m[3]}秒 + ${m[4]}秒`;
    },
  ],

  /* 位置トレイ：地名は動的なので捕獲して埋め込む */
  [/^Flying to (.+)\.\.\.$/, (m) => `${m[1]} へ飛行中…`],

  /* 音声モデルのヒント（src/voice/realtimeController.js:1824）：
     モデル ID は変わり、動作も mini / standard で反転する。
     セッション中に不一致がある場合は "Next session: …" 分岐になる。 */
  [
    /^Voice model: (.+?) — click to switch to (mini|standard); applies next session$/,
    (m) =>
      `音声モデル：${m[1]} — クリックで${m[2] === 'mini' ? 'ミニ' : '標準'}に切替；次回セッションで有効`,
  ],
  [
    /^Next session: (.+?) — this session stays on (.+)$/,
    (m) => `次回セッション：${m[1]} — 今回のセッションは ${m[2]} のまま`,
  ],

  /* セッション費用のツールチップ（src/voice/realtimeController.js:1837）：
     モデル ID・応答回数・2 つの閾値・末尾の note がすべて実行時に挿入される。 */
  [
    /^Estimated session cost on (.+?) — (\d+) response\(s\)\. Warns at ~\$([\d.]+), ends the session at ~\$([\d.]+)\. Estimate is incomplete — a response was still in flight when the session ended, so its usage was never reported\.$/,
    (m) =>
      `${m[1]} の推定セッション費用 — 応答 ${m[2]} 回。約 $${m[3]} で警告、約 $${m[4]} でセッション終了。見積もりは不完全 — セッション終了時に応答が処理中だったため、その使用量は報告されていません。`,
  ],
  [
    /^Estimated session cost on (.+?) — (\d+) response\(s\)\. Warns at ~\$([\d.]+), ends the session at ~\$([\d.]+)\.$/,
    (m) => `${m[1]} の推定セッション費用 — 応答 ${m[2]} 回。約 $${m[3]} で警告、約 $${m[4]} でセッション終了。`,
  ],
  [
    /^Estimate is incomplete — a response was still in flight when the session ended, so its usage was never reported\.$/,
    () =>
      '見積もりは不完全 — セッション終了時に応答が処理中だったため、その使用量は報告されていません。',
  ],

  /* Overpass 再試行の連結文字列（src/data/installationFeedback.js:14）。
     原文は `${理由} — ${カウントダウン}` と**ダッシュ**で連結されるが、
     翻訳層の分割は ` · ` のみ。読み込みオーバーレイは自前で split(' — ') するため
     同じ状態でも浮層は訳せてレイヤーパネルは訳せない、という差が出ていた。 */
  [
    /^(Overpass (?:temporarily unavailable|rate-limited|timed out|could not complete the query)) — retrying in (\d+)s$/,
    (m) => `${dict[m[1]] || m[1]} — ${m[2]} 秒後に再試行`,
  ],
  [
    /^(Overpass (?:temporarily unavailable|rate-limited|timed out|could not complete the query)) — retry pending$/,
    (m) => `${dict[m[1]] || m[1]} — 再試行は保留中`,
  ],

  /* 組み合わせ式ツールチップ："Expand LOCATION" など。
     アプリは**翻訳済みの**パネル見出しを連結してくる（'Expand ' + 見出し）ため、
     "Expand 位置" のような串は完全一致では拾えない。規則で受ける。
     英語のままの "Expand LOCATION" は完全一致表が先に処理するので影響なし。 */
  [/^Expand (.+)$/, (m) => `${m[1]}を展開`],
  [/^Collapse (.+)$/, (m) => `${m[1]}を折りたたむ`],
];

/* -------------------------------------------------------------- 部分置換 */

export const partial = [
  /* 位置トレイの表示値 */
  ['📍 Location: ', '📍 位置：'],
  ['Landmark: ', 'ランドマーク：'],
  ['DEST ', '目的地 '],

  /* カメラキャリブレーションの表示値 */
  ['HDG ', '方位 '],
  ['PITCH ', 'ピッチ '],
  ['FOV ', '画角 '],
  ['RANGE ', '距離 '],
  ['HGT ', '設置高 '],
  ['ΔN ', '北へ '],
  ['ΔE ', '東へ '],
  ['SOURCE · ', 'ソース · '],

  /* HUD テレメトリ行：固定語が混在するので語単位で置換。
     語彙は src/hud.js の _viewBand() / _regionLabel() 由来。
     順序注意："ANTARCTIC" は "ARCTIC" より先に処理すること。 */
  ['NORTHERN OCEANIC GRID', '北海洋グリッド'],
  ['SOUTHERN OCEANIC GRID', '南海洋グリッド'],
  ['ANTARCTIC', '南極'],
  ['ARCTIC', '北極'],
  ['NORTH AMERICA', '北米'],
  ['SOUTH AMERICA', '南米'],
  ['EUROPE', '欧州'],
  ['AFRICA', 'アフリカ'],
  ['ASIA', 'アジア'],
  ['OCEANIA', 'オセアニア'],
  ['ANTARCTICA', '南極大陸'],
  ['REGIONAL', '広域'],
  ['GLOBAL', 'グローバル'],
  ['METRO', '都市圏'],
  ['STREET', '通り'],
  ['CITY', '都市'],
  ['NORMAL', '通常'],
  ['NEAR ', '付近 '],
  ['ALT: ', '高度：'],
  ['ALT ', '高度 '],
  ['SUN: ', '太陽：'],
  ['SUN ', '太陽 '],
  ['WINDOW ', 'ウィンドウ '],
  ['ONA: ', 'ONA: '],
  ['ONA ', 'ONA '],
  ['EL', '仰角'],
  ['BAND: PAN', 'バンド：パンクロ'],
  ['BAND: ', 'バンド：'],
  ['BITS: ', 'ビット：'],
  ['LVL: ', 'レベル：'],
  ['COLL: ', '取得：'],
  ['ORB: ', '軌道：'],
  ['PASS: ', 'パス：'],
  ['LAT: ', '緯度：'],
  ['LON: ', '経度：'],
  ['GSD: ', 'GSD: '],
  ['NIIRS: ', 'NIIRS: '],
  ['PAGE ', 'ページ '],
  ['KM |', 'km |'],
  ['KM', 'km'],
  ['MGRS: ', 'MGRS: '],
];
