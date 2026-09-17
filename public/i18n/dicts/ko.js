/**
 * God's Eye View — 한국어（ko）
 * =============================
 *
 * 与 dicts/zh-Hans.js 同结构：dict / rules / partial 三张表。
 * 键名是**英文原文**，必须与界面上的英文逐字一致（大小写敏感）。
 *
 * 与中文版的三点差异（刻意为之）：
 *   1. 브랜드명 "GOD'S EYE" / "VIEW" 는 라틴 문자 그대로 둔다.
 *   2. 비행고도(FL350), 단위(kts / kn / MW), 위성 분류 코드(NAV / GEO)는
 *      항공·우주 분야의 관용 표기이므로 그대로 둔다（중국어판·일본어판과 동일 방침）.
 *   3. 한국어는 띄어쓰기를 쓰므로 조사·어미가 붙는 자리에서 어색해지지 않도록
 *      UI 라벨은 명사형으로 끊어 쓴다.
 */

export const LOCALE = {
  tag: 'ko',
  label: '한국어',
  short: '한',
  aliases: ['ko', 'ko-KR', 'kr'],
};

export const dict = {
  /* --------------------------------------------------- 브랜드 · 최초 실행 */
  'NO PLACE LEFT BEHIND': '숨을 곳 없는 세상',
  'MISSION CONTROL · FIRST LAUNCH': '미션 컨트롤 · 최초 실행',
  'Choose your first view': '첫 화면을 선택하세요',
  'It feels like a forbidden cockpit—then you realize the sources are public and the data is real.':
    '금단의 조종석처럼 보인다—하지만 정보원은 모두 공개되어 있고 데이터는 진짜다.',
  'LIVE CONTACTS': '실시간 대상',
  'Aircraft, vessels and nearby intelligence': '항공기·선박 및 주변 정보',
  'SPACE MISSIONS': '우주 임무',
  'Launches, spacecraft and orbital context': '발사·우주선·궤도 상황',
  ENVIRONMENTAL: '환경',
  'Live earthquakes and active fires, from USGS and NASA': 'USGS와 NASA의 실시간 지진·화재 정보',
  'EXPLORE MANUALLY': '직접 탐색',
  'Begin with a clean globe': '깨끗한 지구에서 시작',
  "Don't show this again": '다시 표시하지 않음',
  'ESC to dismiss': 'ESC로 닫기',
  'Tip: the GEV MIC button in the dock lets you talk to the map.':
    '팁: 하단 독의 GEV MIC 버튼으로 지도에 말을 걸 수 있습니다.',

  /* ------------------------------------------------------ 상태 · 로딩 */
  'ACTIVE STYLE': '적용 중인 스타일',
  NORMAL: '정상',
  'LOADING LIVE DATA': '실시간 데이터 불러오는 중',
  'REFRESHING LIVE DATA': '실시간 데이터 새로 고치는 중',
  'syncing road network': '도로망 동기화 중',
  'loading frames': '프레임 불러오는 중',
  'SIMULATED — ADD TOMTOM KEY FOR LIVE': '시뮬레이션 — TomTom 키 입력 시 실데이터',
  'SIMULATED — add TomTom key for live': '시뮬레이션 — TomTom 키 입력 시 실데이터',
  FALLBACK: '대체',
  UNAVAILABLE: '사용 불가',
  'Failed to fetch': '가져오기 실패',
  'feed unavailable': '피드 사용 불가',
  never: '없음',
  'loading...': '불러오는 중…',
  /* 레이어 상태 라벨(src/ui/layerPanel.js 의 FEED_STATE_LABELS) */
  LOADING: '불러오는 중',
  DEGRADED: '저하',
  /* 레이어 meta 의 상대 시간(layerPanel.js 의 _timeAgo()) */
  'just now': '방금 전',

  /* ------------------------------------------------------- 지구 조작 */
  'Clear selected data layers': '선택한 레이어 해제',
  'Turn off all selected data layers': '선택한 레이어 모두 끄기',
  'Copy share link': '공유 링크 복사',
  'Return map to straight-down view': '수직 시점으로 복귀',
  'Toggle straight-down and tilted map views': '수직 시점과 기울인 시점 전환',
  'Reset map bearing to north': '방위를 북쪽으로 초기화',
  'Reset to full globe view': '지구 전체 보기로 복귀',
  'Reset camera and return to full globe view': '카메라를 초기화하고 지구 전체 보기',
  'Reset map to north up. Current heading 15 degrees': '북쪽이 위로 오도록 초기화합니다. 현재 방위 15도',
  N: '북',

  /* ----------------------------------------------------------- 독 */
  LOCATION: '위치',
  'VISUAL PRESETS': '시각 프리셋',
  'AI AGENT': 'AI 에이전트',
  'VOICE STANDBY': '음성 대기',
  'ON/OFF': '켜기/끄기',
  STD: '표준',
  MINI: '미니',
  'Expand LOCATION': '위치 패널 펼치기',
  'Expand VISUAL PRESETS': '시각 프리셋 펼치기',
  'Pin visual presets': '시각 프리셋 고정',
  'Keep visual presets open': '시각 프리셋 열어 두기',
  'VOICE CONTROL': '음성 제어',
  'VOICE SYSTEM ERROR': '음성 시스템 오류',
  'Voice control — activate to toggle voice; hold Space to speak':
    '음성 제어 — 활성화하면 음성이 전환됩니다. Space를 길게 눌러 말하세요',
  'Hold Space to speak · tap Space to activate focused controls':
    'Space 길게 눌러 말하기 · Space를 짧게 누르면 선택한 컨트롤 실행',
  'Check microphone permission and network access, then try again.':
    '마이크 권한과 네트워크 연결을 확인한 뒤 다시 시도하세요.',
  'Estimated session cost on gpt-realtime-2 — 0 response(s). Warns at ~$2.00, ends the session at ~$5.00.':
    'gpt-realtime-2 예상 세션 비용 — 응답 0건. 약 $2.00에서 경고, 약 $5.00에서 세션을 종료합니다.',
  DISMISS: '닫기',
  'Toggle straight-down map view': '수직 시점 전환',
  'Return UI controls': 'UI 컨트롤 표시',
  'EXIT CLEAN VIEW': '클린 뷰 종료',

  /* -------------------------------------------------------- 지도 소스 */
  'MAP SOURCE': '지도 소스',
  Style: '스타일',
  SAT: '위성',
  'Bing Aerial': 'Bing 항공사진',
  'Bing Labels': 'Bing 라벨',
  'Esri Satellite': 'Esri 위성',
  'Google 3D': 'Google 3D',
  'Bing Aerial unavailable: Needs CESIUM_ION_TOKEN — add it in Provider Settings':
    'Bing 항공 사용 불가: CESIUM_ION_TOKEN이 필요합니다 — 공급자 설정에서 추가하세요',
  'Bing Labels unavailable: Needs CESIUM_ION_TOKEN — add it in Provider Settings':
    'Bing 라벨 사용 불가: CESIUM_ION_TOKEN이 필요합니다 — 공급자 설정에서 추가하세요',
  'Google 3D unavailable: Needs GOOGLE_MAPS_API_KEY — add it in Provider Settings — or a Cesium ion token for the ion-hosted route':
    'Google 3D 사용 불가: GOOGLE_MAPS_API_KEY가 필요합니다 — 공급자 설정에서 추가하거나, ion 경로를 쓰려면 Cesium ion 토큰이 필요합니다',
  'Needs GOOGLE_MAPS_API_KEY — add it in Provider Settings — or a Cesium ion token for the ion-hosted route':
    'GOOGLE_MAPS_API_KEY가 필요합니다 — 공급자 설정에서 추가하거나, ion 경로를 쓰려면 Cesium ion 토큰이 필요합니다',
  'Needs CESIUM_ION_TOKEN — add it in Provider Settings':
    'CESIUM_ION_TOKEN이 필요합니다 — 공급자 설정에서 추가하세요',

  /* ---------------------------------------------------- 데이터 레이어 */
  'DATA LAYERS': '데이터 레이어',
  'Expand DATA LAYERS': '데이터 레이어 펼치기',
  'Collapse DATA LAYERS': '데이터 레이어 접기',
  Movement: '이동체',
  Infrastructure: '인프라',
  Events: '이벤트',
  Utilities: '유틸리티',
  'Other layers': '기타 레이어',
  Satellites: '위성',
  'Live Flights': '실시간 항공편',
  'Military Flights': '군용기',
  'Live Vessels': '실시간 선박',
  'Street Traffic': '도로 교통량',
  'Bike Share': '공유 자전거',
  Cameras: '카메라',
  'Mapped ALPR Cameras': '지도상 번호판 판독 카메라',
  'Mapped Installations': '지도상 시설',
  'Data Centers': '데이터센터',
  'Submarine Cables': '해저 케이블',
  Dams: '댐',
  'Space Missions (30d)': '우주 임무(30일)',
  'Earthquakes (24h)': '지진(24시간)',
  'Active Fires': '화재 감지',
  Directions: '경로 안내',
  Radio: '라디오',
  Transit: '대중교통',
  'community mapped': '커뮤니티 지도',
  'observed or mapped nearby context': '관측·지도상 주변 정보',
  'OpenStreetMap + optional Google Maps Places': 'OpenStreetMap + 선택적 Google Places',
  'CCTV + Street View fallback': 'CCTV + 스트리트 뷰 대체',
  'OSM routing': 'OSM 경로 탐색',
  /* 경로 안내 칩 (src/layers/directions/index.js:110-168) */
  'SET A': 'A 지정',
  'SET B': 'B 지정',
  'CLICK MAP': '지도 클릭',
  FLY: '비행',
  'FLY ···': '비행 중 ···',
  FLYING: '비행 중',
  'Swap A and B': 'A 와 B 교환',
  'Then click the globe to place the start': '그다음 지구본을 클릭해 출발지를 지정하세요',
  'Then click the globe to place the destination': '그다음 지구본을 클릭해 목적지를 지정하세요',
  'Click a spot on the globe to place A (click again to cancel)':
    '지구본을 클릭해 A 를 배치 (다시 클릭하면 취소)',
  'Click a spot on the globe to place B (click again to cancel)':
    '지구본을 클릭해 B 를 배치 (다시 클릭하면 취소)',
  'Fly the camera along the route': '경로를 따라 카메라 비행',
  'Place A and B first': '먼저 A 와 B 를 배치하세요',
  'Remove the route and both markers': '경로와 두 마커 제거',
  LIVE: '실시간',

  /* ----------------------------------------------------------- 장면 */
  SCENES: '장면',
  'Expand SCENES': '장면 펼치기',
  'Collapse SCENES': '장면 접기',
  'Scene recipe': '장면 레시피',
  'Global Flights Radar': '전지구 항공편 레이더',
  'Orbital Watch': '궤도 감시',
  'Thermal Threat Board': '열영상 위협 보드',
  'City Overload': '도시 과부하',
  'Omniscience Pullback': '전지적 풀백',
  NEW: '신규',
  DEL: '삭제',
  'CAPTURE SHOT': '샷 캡처',
  'UPDATE SHOT': '샷 갱신',
  LOAD: '불러오기',
  START: '시작',
  STOP: '정지',
  'EXPORT PRESETS': '프리셋 내보내기',
  IMPORT: '가져오기',
  'RUN LOG': '실행 로그',
  Ready: '준비됨',

  /* ------------------------------------------------------ 표시 패널 */
  DISPLAY: '표시',
  'Expand DISPLAY': '표시 패널 펼치기',
  'Collapse DISPLAY': '표시 패널 접기',
  'Intelligence HUD (H)': '정보 HUD(H)',
  HUD: 'HUD',
  Layout: '레이아웃',
  Tactical: '전술',
  Operator: '오퍼레이터',
  Minimal: '최소',
  'Detection Overlay (D)': '감지 오버레이(D)',
  DENSE: '고밀도',
  Density: '밀도',
  Allocation: '할당',
  Elastic: '탄력',
  Weighted: '가중',
  Fade: '페이드',
  Outside: '외부',
  PARAMETERS: '매개변수',
  '3D aircraft — flat icons zoomed out, 3D models up close':
    '3D 항공기 — 멀리서는 평면 아이콘, 가까이서는 3D 모델',
  Models: '모델',
  '3D model coverage': '3D 모델 적용 범위',
  Proximity: '근접',
  All: '전체',
  'Scope — the circular viewport mask': '스코프 — 원형 뷰포트 마스크',
  Scope: '스코프',
  Feather: '페더',
  'Scope edge feather': '스코프 가장자리 페더',
  'Scope edge feather as a percentage of the keyhole radius':
    '스코프 가장자리 페더(키홀 반지름 대비 비율)',
  'Draw on the world — click vertices, double-click or Enter to finish, Esc to cancel':
    '지구 위에 그리기 — 꼭짓점을 클릭하고, 더블클릭 또는 Enter로 완료, Esc로 취소',
  Draw: '그리기',
  Shape: '도형',
  'Shape to draw': '그릴 도형',
  Area: '면',
  Line: '선',
  Pin: '핀',
  'Label (optional)': '라벨(선택)',
  'Label for the drawn shape': '그린 도형의 라벨',
  'Colour of the drawn shape': '그린 도형의 색상',
  Primary: '기본',
  Amber: '앰버',
  Cyan: '시안',
  Green: '녹색',
  Red: '적색',
  'Remove every mark from the board': '모든 표시 지우기',
  Clear: '지우기',
  'Pick a shape, then click the map.': '도형을 고른 뒤 지도를 클릭하세요.',
  'Celestial ring — reveal the full globe': '천구 링 — 지구 전체 보기',
  Celestial: '천구',
  'Hide UI chrome': 'UI 숨기기',
  'Clean UI': '클린 UI',
  'Bloom / Glow': '블룸 / 글로우',
  Bloom: '블룸',
  'Bloom intensity': '블룸 강도',
  Sharpening: '샤픈',
  Sharpen: '샤픈',
  'Sharpen intensity': '샤픈 강도',

  /* ---------------------------------------------------------- 카메라 */
  CCTV: '카메라',
  'Expand CCTV': '카메라 펼치기',
  'Collapse CCTV': '카메라 접기',
  'SOURCE · UNKNOWN': '소스 · 알 수 없음',
  'Enable CCTV to load camera intersections': '카메라를 켜면 교차로 영상을 불러옵니다',
  'CCTV OFF': '카메라 꺼짐',
  'CCTV ON': '카메라 켜짐',
  NEAREST: '가장 가까운',
  FOCUS: '포커스',
  'COVERAGE ON': '커버리지 켜짐',
  'COVERAGE OFF': '커버리지 꺼짐',
  'VIEWSHED ON': '시야 켜짐',
  'AUTO HOP OFF': '자동 전환 꺼짐',
  'AUTO HOP ON': '자동 전환 켜짐',
  'PROJECTION ON': '투영 켜짐',
  'PROJECTION OFF': '투영 꺼짐',
  CALIBRATION: '캘리브레이션',
  CAL: '캘리브',
  ADJUST: '조정',
  'SAVE CAL': '캘리브 저장',
  'RESET CAL': '캘리브 초기화',
  'SCENE SUMMARY': '장면 요약',
  'No cameras available in catalog.': '카탈로그에 사용 가능한 카메라가 없습니다.',
  'CCTV camera': '카메라 영상',
  'Camera pose — click a value to type': '카메라 자세 — 값을 클릭해 직접 입력',
  'Heading (compass °) — click to type': '방위(나침반 °) — 클릭해 입력',
  'Pitch (° up/down) — click to type': '피치(° 상하) — 클릭해 입력',
  'Horizontal FOV (°) — click to type': '수평 화각(°) — 클릭해 입력',
  'Range / monitor-plane distance (m) — click to type': '모니터 평면까지의 거리(m) — 클릭해 입력',
  'Mount height above ground (m) — click to type': '지면 위 설치 높이(m) — 클릭해 입력',
  'North offset from catalog position (m) — click to type':
    '카탈로그 위치 대비 북쪽 오프셋(m) — 클릭해 입력',
  'East offset from catalog position (m) — click to type':
    '카탈로그 위치 대비 동쪽 오프셋(m) — 클릭해 입력',
  'Drag the camera in the world: rings rotate, arrows move, handles set range/FOV':
    '지구 위에서 카메라 드래그: 링은 회전, 화살표는 이동, 핸들은 거리/화각 조정',

  /* ------------------------------------------------------- 컨텍스트 */
  CONTEXT: '컨텍스트',
  'Expand CONTEXT': '컨텍스트 펼치기',
  'Collapse CONTEXT': '컨텍스트 접기',
  'Context mode': '컨텍스트 모드',
  CONTACTS: '대상',
  'Cycles the nearest contacts of whatever type you select — planes, vessels, installations. Satellites track independently.':
    '선택한 유형의 가장 가까운 대상을 차례로 전환합니다 — 항공기·선박·시설. 위성은 별도로 추적합니다.',
  'SELECT CONTEXT': '컨텍스트 선택',
  'CONTACTS — nearest planes · vessels · sites': '대상 — 가장 가까운 항공기 · 선박 · 시설',
  'SPACE MISSIONS — launches & orbital assets': '우주 임무 — 발사 및 궤도 자산',
  'Contact Context actions': '대상 컨텍스트 동작',
  COCKPIT: '조종석',
  'SEARCH NEARBY SITES': '주변 시설 검색',
  'Reclassify tracked contact as TR-3B': '추적 대상을 TR-3B로 재분류',
  'Reclassify as TR-3B': 'TR-3B로 재분류',
  'CONTACTS CONTEXT OFF': '대상 컨텍스트 꺼짐',
  'SELECT CONTACTS TO LOAD OBSERVED / MAPPED PROXIMITY':
    '대상을 선택하면 관측·지도상 근접 정보를 불러옵니다',
  'Available Space Missions': '사용 가능한 우주 임무',
  'AVAILABLE MISSIONS': '사용 가능한 임무',
  'SELECT A MISSION TO INSPECT': '임무를 선택해 확인',
  'LOADING 30-DAY MISSION INDEX': '30일 임무 색인 불러오는 중',
  'TAB PREVIEWS · ENTER / SPACE SELECTS': 'Tab 미리보기 · Enter / Space 선택',
  CONTACT: '대상',
  'CONTACTS · 250 KM': '대상 · 250 km',
  'CONTEXT ONLY': '컨텍스트 전용',
  'Nearby cohort counts': '주변 유형별 건수',
  'NEAREST OBSERVED / MAPPED': '가장 가까운 관측·지도 정보',
  'NO AVAILABLE EXAMPLE': '해당 사례 없음',
  'AVAILABLE INPUTS ONLY · NOT AN ALL-CLEAR': '사용 가능한 입력만 · 안전 보장 아님',
  Previous: '이전',
  Next: '다음',
  CURRENT: '현재',
  PREV: '이전',
  NEXT: '다음',
  'Previous — prior visited contact in the 250 km window':
    '이전 — 250 km 범위에서 직전에 본 대상',
  'Next — nearest unvisited contact in the 250 km window':
    '다음 — 250 km 범위에서 아직 보지 않은 가장 가까운 대상',
  'Collapse contact panel': '대상 패널 접기',
  'Collapse Contact panel': '대상 패널 접기',

  /* ----------------------------------------------------------- 라디오 */
  RADIO: '라디오',
  'Expand Radio': '라디오 펼치기',
  'Expand Radio section': '라디오 섹션 펼치기',
  'Open compact Radio controls': '라디오 간단 컨트롤 열기',
  'Open detailed Radio controls': '라디오 상세 컨트롤 열기',
  'Close compact Radio controls': '라디오 간단 컨트롤 닫기',
  'Compact Radio controls': '라디오 간단 컨트롤',
  'Compact Radio volume': '라디오 간단 볼륨',
  'Internet radio companion': '인터넷 라디오',
  'RADIO READY': '라디오 준비됨',
  'RADIO OFF': '라디오 꺼짐',
  'PAUSE': '일시정지',
  'RESUME': '재개',
  'ENABLING': '사용 설정 중',
  'DISABLING': '사용 해제 중',
  'UNCERTAIN': '상태 불명',
  'RADIO STATE UNCERTAIN': '라디오 상태 불명',
  'DISABLE': '끄기',
  'STATION TAG': '방송국 태그',
  'Filter stations by station tag': '방송국 태그로 필터',
  'NO STATION SELECTED': '선택된 방송국 없음',
  'Choose a globe marker or use next.': '지구의 마커를 고르거나 「다음」을 누르세요.',
  'DIRECTORY BAND': '디렉터리 밴드',
  'DRAG TO TUNE': '드래그하여 동조',
  'Tune available internet radio stations': '사용 가능한 인터넷 라디오 방송국에 동조',
  'ALL · DRAG THE NEEDLE': '전체 · 바늘을 드래그',
  'SNAPS TO AVAILABLE STATIONS': '사용 가능한 방송국에 스냅됩니다',
  'Radio playback': '라디오 재생',
  'Previous filtered station': '필터 내 이전 방송국',
  'Previous filtered radio station': '필터 내 이전 방송국',
  'Next filtered station': '필터 내 다음 방송국',
  'Next filtered radio station': '필터 내 다음 방송국',
  'Stop radio playback': '재생 정지',
  'Play nearest radio station': '가장 가까운 방송국 재생',
  'Pause selected radio station': '선택한 방송국 일시정지',
  'Resume selected radio station': '선택한 방송국 재개',
  'Play selected radio station': '선택한 방송국 재생',
  'Pause nearest radio station': '가장 가까운 방송국 일시정지',
  'Resume nearest radio station': '가장 가까운 방송국 재개',
  'Radio volume': '라디오 볼륨',
  'Cockpit Radio volume': '조종석 라디오 볼륨',
  'Radio off': '라디오가 꺼져 있습니다',
  'STATION SITE': '방송국 사이트',
  'DIRECTORY: RADIO BROWSER': '디렉터리: Radio Browser',
  'Audio connects directly to the broadcaster after you press play. Your IP is visible to that broadcaster.':
    '재생을 누르면 오디오가 방송사에 직접 연결됩니다. 해당 방송사에 내 IP가 보입니다.',
  'Previous station': '이전 방송국',
  'Next station': '다음 방송국',
  'Enable Radio': '라디오 켜기',
  'Disable Radio': '라디오 끄기',
  ENABLE: '켜기',
  VOLUME: '볼륨',
  PLAY: '재생',

  /* ------------------------------------------------------ 공급자 설정 */
  'GROUND STATION · PROVIDER SETTINGS': '지상국 · 공급자 설정',
  'Power up the globe': '지구에 전원 넣기',
  'POWER UP': '전원 켜기',
  "The globe already flies keyless. Every key below switches on another real feed — paste one and it's saved into this app's local configuration, then the server restarts itself. Server-side keys stay on this machine; Google Maps and Cesium ion run in the browser and must be provider-restricted. Keys you configured elsewhere are shown but never touched.":
    '이 지구는 키 없이도 동작합니다. 아래 각 키는 서로 다른 실제 피드를 하나씩 켭니다 — 붙여 넣으면 이 앱의 로컬 설정에 저장되고 서버가 스스로 재시작합니다. 서버 측 키는 이 컴퓨터에 남습니다. Google Maps와 Cesium ion은 브라우저에서 동작하므로 공급자 측에서 제한을 걸어야 합니다. 다른 곳에서 설정한 키는 표시되지만 변경되지 않습니다.',
  'Close key setup': '키 설정 닫기',
  'GET KEY ↗': '키 받기 ↗',
  'browser-side': '브라우저 측',
  'Metered — a billing-enabled account': '종량제 — 결제가 활성화된 계정',
  'Free key — register, paste, done': '무료 키 — 가입 후 붙여 넣으면 끝',
  'This key runs in the browser by design — restrict it at the provider (see SECURITY.md)':
    '이 키는 설계상 브라우저에서 동작합니다 — 공급자 측에서 제한하세요(SECURITY.md 참고)',
  'The photorealistic 3D planet + place search': '포토리얼 3D 지구 + 장소 검색',
  'Voice control — talk to the planet': '음성 제어 — 지구에 말을 걸다',
  'Live ships, worldwide': '전 세계 실시간 선박',
  'Live active-fire detections': '실시간 화재 감지',
  'Real live traffic (keyless runs a simulation)': '실제 교통 상황(키 없으면 시뮬레이션)',
  'Bing imagery map stacks + world terrain': 'Bing 영상 타일 + 세계 지형',
  'More flight-polling credits (anonymous works without)': '항공기 폴링 한도 확대(익명도 사용 가능)',
  'Higher space-missions request allowance': '우주 임무 요청 한도 확대',
  'SAVE KEYS': '키 저장',
  'ESC to close': 'ESC로 닫기',
  'The Google Maps key buys the photorealistic planet — everything else stacks on top.':
    'Google Maps 키로 포토리얼 지구를 얻습니다 — 나머지 기능은 그 위에 올라갑니다.',

  /* --------------------------------------------------------- 조종석 */
  'Aircraft cockpit view': '항공기 조종석 시점',
  LEVEL: '수평',
  'Estimated destination direction': '추정 목적지 방위',
  'OPTICAL PLANE · 01': '광학면 · 01',
  'VISOR LOCK · ACTIVE': '바이저 잠금 · 활성',
  'GROUND SPEED · KTS': '대지속도 · kt',
  'GROUND SPEED': '대지속도',
  'ALTITUDE · FT': '고도 · ft',
  ALTITUDE: '고도',
  KTS: 'kt',
  FT: 'ft',
  'FIRST PERSON': '1인칭',
  AIRCRAFT: '항공기',
  'LIVE TRACK · COURSE ALIGNED': '실시간 항적 · 침로 일치',
  'Cockpit vision style': '조종석 시각 스타일',
  'Previous cockpit vision style': '이전 시각 스타일',
  'Previous vision style': '이전 시각 스타일',
  'Next cockpit vision style': '다음 시각 스타일',
  'Next vision style': '다음 시각 스타일',
  'Current cockpit vision style: NORMAL. Activate for next style.':
    '현재 시각 스타일: 정상. 실행하면 다음 스타일로 전환됩니다.',
  'Current style: NORMAL — click for next': '현재 스타일: 정상 — 클릭하면 다음',
  'Current aircraft heading': '현재 기수 방위',
  'Contact cockpit summary': '대상 조종석 요약',
  'Contact navigation': '대상 내비게이션',
  'Enable cockpit weather effects': '조종석 기상 효과 켜기',
  'Disable cockpit weather effects': '조종석 기상 효과 끄기',
  /* 기상 라벨 (src/data/regionalModel.js:94 weatherCodeLabel, WMO 코드 기반) */
  CLEAR: '맑음',
  'PARTLY CLOUDY': '구름 조금',
  OVERCAST: '흐림',
  FOG: '안개',
  DRIZZLE: '이슬비',
  RAIN: '비',
  'RAIN SHOWERS': '소나기',
  SNOW: '눈',
  'SNOW SHOWERS': '눈 소나기',
  THUNDERSTORM: '뇌우',
  'MIXED CONDITIONS': '변덕스러운 날씨',
  'CONDITIONS UNKNOWN': '날씨 미상',
  'CLOUD UNKNOWN': '운량 미상',
  WX: '기상',
  'Cockpit briefing carousel': '조종석 브리핑',
  'Estimated flight plan': '추정 비행 계획',
  'ESTIMATED FLIGHT PLAN': '추정 비행 계획',
  'ROUTE DATA UNAVAILABLE': '경로 데이터 사용 불가',
  FROM: '출발',
  TO: '도착',
  UNKNOWN: '알 수 없음',
  'LIVE SIGNALS': '실시간 신호',
  'OBSERVED / MAPPED PINGS': '관측·지도상 신호',
  'Cockpit briefing controls': '브리핑 컨트롤',
  'Previous briefing page': '이전 브리핑 페이지',
  'Next briefing page': '다음 브리핑 페이지',
  'Cycle briefing pages automatically every 9 seconds (Signals → News → Local). Pauses while you hover or focus the panel. Live signal data refreshes continuously either way.':
    '9초마다 페이지를 자동으로 넘깁니다(신호 → 뉴스 → 지역). 패널에 마우스를 올리거나 포커스하면 멈춥니다. 어느 경우든 실시간 데이터는 계속 갱신됩니다.',
  'CYCLE OFF': '자동 넘김 꺼짐',
  'Collapse cockpit briefing panel': '브리핑 패널 접기',
  'Collapse briefing panel': '브리핑 패널 접기',
  'Live signals': '실시간 신호',
  'Latest regional news': '지역 최신 뉴스',
  'Location-based information': '위치 기반 정보',
  'ACQUIRING REGIONAL NEWS': '지역 뉴스 가져오는 중',
  'RESOLVING REGION': '지역 판별 중',
  TEMP: '기온',
  WIND: '바람',
  SKY: '하늘',
  PRECIP: '강수',
  'SOURCE-BACKED EVENTS · NO SYNTHETIC NEWS': '출처 있는 사건 · 합성 뉴스 없음',
  'Cockpit briefing pages': '브리핑 페이지',
  'Show Live Signals': '실시간 신호 표시',
  'Show Regional News': '지역 뉴스 표시',
  'Show Local Info': '지역 정보 표시',
  SIG: '신호',
  NEWS: '뉴스',
  LOCAL: '지역',
  'Cockpit display and Radio controls': '조종석 표시 및 라디오 컨트롤',
  'Expand Cockpit display options': '조종석 표시 옵션 펼치기',
  'Cockpit display options': '조종석 표시 옵션',
  'Cockpit compact Radio controls': '조종석 라디오 컨트롤',
  READY: '준비됨',
  'View switcher': '뷰 전환',
  'Reset cockpit to full globe view': '조종석을 초기화하고 지구 전체 보기',
  'Exit cockpit and return to full globe view': '조종석을 나가고 지구 전체 보기',
  RESET: '초기화',
  'Exit cockpit view': '조종석 시점 나가기',
  'EXIT COCKPIT': '조종석 나가기',
  'ESC EXIT': 'ESC 종료',
  'C TOGGLE': 'C 전환',
  'Navigation, voice, and visual preset controls': '내비게이션·음성·시각 프리셋 컨트롤',

  /* ------------------------------------------------------------ HUD */
  'TOP SECRET // SI-TK // NOFORN': '극비 // SI-TK // NOFORN',
  SUMMARY: '요약',
  REC: '녹화',
  'Data attribution': '데이터 출처',
  'Powered by Esri': 'Esri 제공',
  'Data provided by:': '데이터 제공:',
  'Source: Esri, Vantor, Earthstar Geographics, and the GIS User Community':
    '출처: Esri, Vantor, Earthstar Geographics, GIS 사용자 커뮤니티',
  'Powered by Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community':
    'Esri 제공 — 출처: Esri, Maxar, Earthstar Geographics, GIS 사용자 커뮤니티',
  'Close data attribution': '데이터 출처 닫기',
  'Visible map targets': '표시 중인 지도 대상',
  'Globe actions': '지구 동작',
  'Rendered globe frames per second · toggle with `': '지구 렌더링 프레임 레이트 · ` 로 전환',
  'FPS —': 'FPS —',
  ORBIT: '궤도',
  'Intelligence HUD': '정보 HUD',

  /* ----------------------------------------------------- 위치 · 검색 */
  'Pin location tray': '위치 트레이 고정',
  'Keep location tray open': '위치 트레이 열어 두기',
  'Search any location': '장소 검색',
  'Search any location...': '장소 검색…',
  'Search location by name or coordinates': '이름 또는 좌표로 장소 검색',
  Austin: '오스틴',
  'San Francisco': '샌프란시스코',
  'New York': '뉴욕',
  Tokyo: '도쿄',
  London: '런던',
  Paris: '파리',
  Dubai: '두바이',
  'Washington DC': '워싱턴 DC',
  Tallinn: '탈린',

  /* ------------------------------------------------------- 시각 프리셋 */
  Normal: '정상',
  Anime: '애니메',
  Noir: '누아르',
  Snow: '설경',
  'Show the globe without a visual filter.': '시각 필터 없이 지구를 표시합니다.',
  'Emulate a green phosphor CRT with scanlines and screen curvature.':
    '주사선과 화면 곡률을 갖춘 녹색 형광 CRT를 재현합니다.',
  'Simulate night-vision goggles with green intensification and a tube vignette.':
    '녹색 증폭과 경통 비네트로 야시경을 재현합니다.',
  'Simulate FLIR-style thermal contrast. Turn up Ironbow for color.':
    'FLIR 스타일 열 대비를 재현합니다. Ironbow를 올리면 착색됩니다.',
  'Apply bright cel-shaded color and illustrated outlines.':
    '밝은 셀 셰이딩과 선화 외곽선을 적용합니다.',
  'Apply high-contrast monochrome film-noir grading.':
    '고대비 흑백 필름 누아르 그레이딩을 적용합니다.',
  'Add a cold, snowy whiteout treatment to the scene.':
    '차가운 설원 화이트아웃 처리를 장면에 더합니다.',

  /* ---------------------------------------------------- 감지 오버레이 */
  'Detection overlay: dense': '감지 오버레이: 고밀도',
  'Detection label density': '감지 라벨 밀도',
  'Detection label allocation': '감지 라벨 할당',
  'Detection fade distance': '감지 페이드 거리',
  'Detection opacity outside the keyhole': '키홀 밖 감지 불투명도',
  'World-overlay fade distance outside the keyhole as a percentage of its radius':
    '키홀 밖 월드 오버레이 페이드 거리(반지름 대비 비율)',
  'World-overlay label and card opacity beyond the fade distance':
    '페이드 거리 밖 라벨과 카드의 불투명도',

  /* ----------------------------------------------------- 기타 속성 문구 */
  'Collapse panel': '패널 접기',
  'Expand panel': '패널 펼치기',
  'Map source': '지도 소스',
  'HUD layout': 'HUD 레이아웃',
  Play: '재생',
  'Expand Cockpit Radio controls': '조종석 라디오 컨트롤 펼치기',
  'Collapse Cockpit Radio controls': '조종석 라디오 컨트롤 접기',

  /* -------------------------------------------------- 조종석 건수 라벨 */
  FLT: '항공편',
  MIL: '군용',
  SITE: '시설',

  /* ------------------------------------------------------------ 기타 */
  'fix the map': '지도 수정',
  'Datacenters:': '데이터센터:',
  'Dams:': '댐:',

  /* ======================== 데이터 출처 상자 ========================
     방침: **설명 문구만 번역**한다. 라이선스 표기(ODbL 1.0 / CC BY 4.0 /
     CC BY-NC-SA 3.0 …), 기관·브랜드명, URL, 문헌 인용, 그리고
     "Powered by TfL Open Data", "© OpenStreetMap contributors",
     "Weather data by Open-Meteo.com" 처럼 원문 그대로 표시해야 하는
     크레딧 문구는 영어로 남긴다. */
  'Flights: OpenSky Network — Schäfer et al., “Bringing Up OpenSky”, IPSN 2014 ·':
    '항공편: OpenSky Network — Schäfer 외, 「Bringing Up OpenSky」, IPSN 2014 ·',
  'Military flights, aircraft traces & bounded regional flight fallback:':
    '군용기, 항공기 항적, 제한 지역 항공편 대체:',
  'Live vessels (AIS):': '실시간 선박(AIS):',
  'Satellites (TLEs): CelesTrak (': '위성(TLE): CelesTrak (',
  '), Dr. T.S. Kelso': '), Dr. T.S. Kelso',
  'Space mission launch, payload & recovery metadata:':
    '우주 임무 발사·탑재체·회수 메타데이터:',
  '(API documentation and rate limits)': '(API 문서 및 속도 제한)',
  'Earthquakes: Data courtesy of the U.S. Geological Survey':
    '지진: 데이터 제공 미국 지질조사국(USGS)',
  'Road geometry (traffic):': '도로 형상(교통):',
  'Keyless place search:': '키 불필요 장소 검색:',
  '(komoot) over': '(komoot), 기반은',
  'ALPR camera locations (automatic license plate readers):':
    '번호판 판독 카메라 위치(ALPR):',
  '); community mapping includes': '); 커뮤니티 지도에는',
  'Mapped installation context:': '지도상 시설 정보:',
  '(ODbL 1.0; incomplete mapped context)': '(ODbL 1.0; 지도 정보 불완전)',
  'Cockpit place context and last-resort place search:':
    '조종석 장소 정보 및 최후 수단 장소 검색:',
  'via Nominatim (ODbL 1.0)': 'Nominatim 경유(ODbL 1.0)',
  'Cockpit current conditions:': '조종석 현재 기상:',
  'Cockpit regional headlines:': '조종석 지역 헤드라인:',
  '(location-matched article links; publisher terms apply)':
    '(위치 기반 기사 링크, 게시자 약관 적용)',
  'CCTV cameras & frames: City of Austin, TX —': '카메라 및 영상: 미국 텍사스주 오스틴시 —',
  'CCTV cameras & frames (Texas):': '카메라 및 영상(텍사스주):',
  '(courtesy)': '(제공)',
  'CCTV cameras & frames (California): Caltrans —': '카메라 및 영상(캘리포니아주): Caltrans —',
  'CCTV cameras & frames (London):': '카메라 및 영상(런던):',
  '. Contains OS data © Crown copyright and database rights.':
    '. OS 데이터 포함 © Crown copyright and database rights.',
  'CCTV cameras & frames (Ontario):': '카메라 및 영상(온타리오주):',
  'CCTV cameras & frames (Finland): Fintraffic /': '카메라 및 영상(핀란드): Fintraffic /',
  ', license CC BY 4.0': ', 라이선스 CC BY 4.0',
  'Traffic cameras (Calgary): contains information licensed under the':
    '교통 카메라(캘거리): 다음 라이선스로 제공되는 정보를 포함합니다',
  'Bikeshare availability: GBFS operator feeds (e.g. Austin BCycle)':
    '공유 자전거 가용성: GBFS 사업자 피드(예: Austin BCycle)',
  'Routing (voice routes and Directions): OSRM on the FOSSGIS servers —':
    '경로 탐색(음성 경로 및 경로 안내): FOSSGIS 서버의 OSRM —',
  '(ODbL) ·': '(ODbL) ·',
  'Transit vehicles: operator GTFS-Realtime feeds (each operator is credited below when its vehicles are shown)':
    '대중교통 차량: 사업자별 GTFS-Realtime 피드(차량 표시 시 아래에 사업자를 표기합니다)',
  'Internet-radio station directory:': '인터넷 라디오 방송국 디렉터리:',
  '(public domain; audio delivered directly by each broadcaster)':
    '(퍼블릭 도메인, 오디오는 각 방송사가 직접 전송합니다)',
  'Terrain (keyless globe stacks):': '지형(키 불필요 지구 타일):',
  '/ Mapterhorn (CC BY 4.0) / EGM2008 (NGA)': '/ Mapterhorn (CC BY 4.0) / EGM2008 (NGA)',
  '(ODbL 1.0) + Open Infrastructure Map': '(ODbL 1.0) + Open Infrastructure Map',
  'Active fires: NASA FIRMS — we acknowledge the use of data and/or imagery from NASA’s Fire Information for Resource Management System (':
    '화재 감지: NASA FIRMS — NASA의 Fire Information for Resource Management System(',
  '), part of NASA’s Earth Observing System Data and Information System (EOSDIS)':
    ')의 데이터 및 영상 사용을 명시합니다. 이는 NASA의 Earth Observing System Data and Information System(EOSDIS)의 일부입니다',
  'CCTV cameras & frames (British Columbia):': '카메라 및 영상(브리티시컬럼비아주):',
  '. Contains information licensed under the': '. 다음 라이선스로 제공되는 정보를 포함합니다',
  '. Some cameras are supplied by partners (TransLink, the City of Vancouver, the City of Surrey, Parks Canada and others); each names its provider in the CCTV panel.':
    '. 일부 카메라는 파트너(TransLink, 밴쿠버시, 서리시, Parks Canada 등)가 제공하며, 각 영상은 카메라 패널에 제공자를 표기합니다.',
  'CCTV cameras & frames (Tallinn): City of Tallinn —': '카메라 및 영상(탈린): 탈린시 —',
  'CCTV cameras & frames (Estonia road weather): Transpordiamet / Tarktee —':
    '카메라 및 영상(에스토니아 도로 기상): Transpordiamet / Tarktee —',
  'Webcam (Warendorf):': '웹캠(바렌도르프):',
  '(courtesy); camera poses derived from OpenStreetMap geometry, © OpenStreetMap contributors (ODbL)':
    '(제공); 카메라 자세는 OpenStreetMap 형상에서 산출, © OpenStreetMap contributors (ODbL)',
  'CCTV cameras & frames (New South Wales):': '카메라 및 영상(뉴사우스웨일스주):',
  '— Transport for NSW (': '— Transport for NSW (',
  'Submarine cables: © TeleGeography —': '해저 케이블: © TeleGeography —',
  '(CC BY-NC-SA 3.0 — NonCommercial)': '(CC BY-NC-SA 3.0 — 비상업)',
  '(non-commercial)': '(비상업)',
  '(CC BY 4.0)': '(CC BY 4.0)',

  /* ---------------------------------------------------- canvas 표시 문구 */
  'NO FEED': '영상 없음',
  IMAGE: '정지영상',
  VIDEO: '동영상',
  'UPSTREAM SNAPSHOT ACTIVE': '업스트림 스냅샷 활성',
  STALE: '데이터 오래됨',
  'OSM MAPPED': 'OSM 지도',
  'PUBLIC MAP DATA': '공개 지도 데이터',
  'MAPPED INSTALLATION': '지도상 시설',
  'ALPR CAMERA': '번호판 판독 카메라',
  VESSEL: '선박',
  DOCKED: '도킹 중',
  LAUNCHER: '발사체',
  SPACECRAFT: '우주선',
  PAYLOAD: '탑재체',
  RECOVERED: '회수 완료',
  LOST: '회수 실패',
  'RECOVERY ATTEMPT': '회수 시도',
  'NO RECOVERY DATA': '회수 데이터 없음',
  REUSED: '재사용',
  UNSPECIFIED: '미지정',
  'UNSPECIFIED OPERATOR': '사업자 미지정',
  'DATE UNAVAILABLE': '날짜 없음',
  'POSITION UNAVAILABLE': '위치 없음',
  'PAYLOAD DATA UNAVAILABLE': '탑재체 데이터 없음',
  'PROJECTED ORBIT': '예측 궤도',
  'REPLAY ASCENT': '상승 재생',
  'SHOW NEAREST': '가장 가까운 항목 표시',
  'GLOBAL CONTEXT OFF': '전지구 컨텍스트 꺼짐',
  'CONTEXT READY': '컨텍스트 준비됨',

  /* -------------------------------------------------------- 기타 상태 */
  Local: '로컬',
  CAMERAS: '카메라',
  OFF: '꺼짐',
  ON: '켜짐',

  /* ============ 재시도 / 설치 피드백 / 키 상태（추가） ============ */
  /* keySetup 칩: 누락 키 없음（src/keySetup.js:22） */
  'POWERED UP': '전원 켜짐',
  /* 카메라 재시도 상세 세그먼트: "ALPR cameras · retrying in Ns" / "ALPR cameras · retry pending" */
  'ALPR cameras': '번호판 판독 카메라',
  'retry pending': '재시도 대기',
  /* installationFeedback 사유（layerPanel meta 는 원래 대소문자, 로드 오버레이 라벨은 대문자화） */
  'Overpass rate-limited': 'Overpass 속도 제한됨',
  'Overpass timed out': 'Overpass 시간 초과',
  'Overpass could not complete the query': 'Overpass 쿼리를 완료하지 못함',
  'Overpass temporarily unavailable': 'Overpass 일시적으로 사용 불가',
  'OVERPASS RATE-LIMITED': 'Overpass 속도 제한됨',
  'OVERPASS TIMED OUT': 'Overpass 시간 초과',
  'OVERPASS COULD NOT COMPLETE THE QUERY': 'Overpass 쿼리를 완료하지 못함',
  'OVERPASS TEMPORARILY UNAVAILABLE': 'Overpass 일시적으로 사용 불가',
  /* installationFeedback 나머지 상태（원래 대소문자, layerPanel guidance meta 용） */
  'Retrying mapped sites…': '지도상 시설 재시도 중…',
  'Fetching mapped sites…': '지도상 시설 불러오는 중…',
  'Zoom in to search mapped installations': '확대하여 지도상 시설 검색',
  'Showing cached mapped sites': '캐시된 지도상 시설 표시 중',
  'Mapped sites not loaded': '지도상 시설 미로드',
  'Mapped sites loaded': '지도상 시설 로드됨',
  /* loadingFeedback 로드 오버레이 재시도 라벨（대문자 상수） */
  'RETRYING ALPR CAMERAS': '번호판 판독 카메라 재시도 중',
  'FETCHING ALPR CAMERAS': '번호판 판독 카메라 불러오는 중',
  'RETRYING MAPPED SITES': '지도상 시설 재시도 중',
  'FETCHING MAPPED SITES': '지도상 시설 불러오는 중',
  'MAPPED SITES LOADED': '지도상 시설 로드됨',
  /* layerPanel meta: 수명 주기 상태 재조정 필요（src/ui/layerPanel.js:473） */
  'lifecycle state requires reconciliation': '수명 주기 상태 재조정 필요',
};

/* ------------------------------------------------------------------ 규칙 */

export const rules = [
  /* 경과 시간 접미사 */
  [/^(\d+)s ago$/, (m) => `${m[1]}초 전`],
  [/^(\d+)m ago$/, (m) => `${m[1]}분 전`],
  [/^(\d+)h ago$/, (m) => `${m[1]}시간 전`],
  [/^(\d+)d ago$/, (m) => `${m[1]}일 전`],
  [/^retry (\d+)s$/, (m) => `${m[1]}초 후 재시도`],
  [/^retrying in (\d+)s$/, (m) => `${m[1]}초 후 재시도`],

  /* 항공편 대체(fallback) 시의 커버리지 표기.
     원문은 서버에서 `${반경}nm regional fallback` 로 조립된다
     (server/providers/aircraft/opensky.js). 반경은 상수지만 바뀔 수 있어 규칙으로 받는다. */
  [/^(\d+)nm regional fallback$/, (m) => `${m[1]}nm 지역 대체`],

  /* 레이어 aria-label / 버튼 표기: "Satellites: OFF", "Radio: UNAVAILABLE".
     상태는 src/ui/layerPanel.js:5 FEED_STATE_LABELS 와 :549 의 라이프사이클 분기에서
     ON/OFF/LOADING/DEGRADED/STALE/FALLBACK/UNAVAILABLE/UNCERTAIN/ENABLING/DISABLING.
     이전 판은 OFF|ON 만 처리해 나머지 8개 상태가 번역되지 않았다.
     한국어는 반각 콜론을 쓴다(다른 언어의 전각 '：' 와 다름). */
  [
    /^(.+?):\s*(ON|OFF|LOADING|DEGRADED|STALE|FALLBACK|UNAVAILABLE|UNCERTAIN|ENABLING|DISABLING)$/,
    (m) => `${dict[m[1]] || m[1]}: ${dict[m[2]] || m[2]}`,
  ],

  /* 조종석 운량: "CLOUD 70%" (src/ui/cockpitBriefing.js:244) */
  [/^CLOUD (\d+)%$/, (m) => `운량 ${m[1]}%`],

  /* 키 개수 안내 */
  [/^POWER UP · (\d+) (KEY|KEYS) WAITING$/, (m) => `전원 켜기 · 남은 키 ${m[1]}개`],

  /* 장면 샷: `${style} · ${mode} · ${dur}s + ${hold}s`
     (src/ui/scenePresentation.js:87). 두 번째 항목은 감지 모드로
     src/data/detection.js:77 MODE_LABELS = ['OFF','SPARSE','BALANCED','DENSE']. */
  [/^Shot (\d+)$/, (m) => `샷 ${m[1]}`],
  [
    /^(NORMAL|RETRO|SURVEILLANCE|THERMAL) · (OFF|SPARSE|BALANCED|DENSE) · ([\d.]+)s \+ ([\d.]+)s$/,
    (m) => {
      const style = {
        NORMAL: '표준',
        RETRO: '레트로 CRT',
        SURVEILLANCE: '감시',
        THERMAL: '열영상',
      }[m[1]];
      const mode = {
        OFF: '꺼짐',
        SPARSE: '희박',
        BALANCED: '균형',
        DENSE: '밀집',
      }[m[2]];
      return `${style} · ${mode} · ${m[3]}초 + ${m[4]}초`;
    },
  ],

  /* 위치 트레이: 지명은 동적이므로 캡처해 넣는다 */
  [/^Flying to (.+)\.\.\.$/, (m) => `${m[1]}(으)로 이동 중…`],

  /* 음성 모델 안내 (src/voice/realtimeController.js:1824):
     모델 ID는 바뀌고 동작도 mini / standard 로 뒤집힌다.
     세션 중 불일치가 있으면 "Next session: …" 분기가 된다. */
  [
    /^Voice model: (.+?) — click to switch to (mini|standard); applies next session$/,
    (m) =>
      `음성 모델: ${m[1]} — 클릭하면 ${m[2] === 'mini' ? '미니' : '표준'}로 전환, 다음 세션부터 적용`,
  ],
  [
    /^Next session: (.+?) — this session stays on (.+)$/,
    (m) => `다음 세션: ${m[1]} — 이번 세션은 ${m[2]} 유지`,
  ],

  /* 세션 비용 툴팁 (src/voice/realtimeController.js:1837):
     모델 ID, 응답 횟수, 두 임계값, 끝의 note 가 모두 실행 시점에 삽입된다. */
  [
    /^Estimated session cost on (.+?) — (\d+) response\(s\)\. Warns at ~\$([\d.]+), ends the session at ~\$([\d.]+)\. Estimate is incomplete — a response was still in flight when the session ended, so its usage was never reported\.$/,
    (m) =>
      `${m[1]} 예상 세션 비용 — 응답 ${m[2]}회. 약 $${m[3]}에서 경고, 약 $${m[4]}에서 세션 종료. 추정 불완전 — 세션 종료 시점에 응답이 처리 중이어서 사용량이 보고되지 않았습니다.`,
  ],
  [
    /^Estimated session cost on (.+?) — (\d+) response\(s\)\. Warns at ~\$([\d.]+), ends the session at ~\$([\d.]+)\.$/,
    (m) => `${m[1]} 예상 세션 비용 — 응답 ${m[2]}회. 약 $${m[3]}에서 경고, 약 $${m[4]}에서 세션 종료.`,
  ],
  [
    /^Estimate is incomplete — a response was still in flight when the session ended, so its usage was never reported\.$/,
    () =>
      '추정 불완전 — 세션 종료 시점에 응답이 처리 중이어서 사용량이 보고되지 않았습니다.',
  ],

  /* Overpass 재시도 연결 문자열 (src/data/installationFeedback.js:14).
     원문은 `${이유} — ${카운트다운}` 처럼 **대시**로 이어진다.
     번역층의 분할은 ` · ` 뿐이라 이 문자열은 잘리지 않았고,
     로딩 오버레이는 자체적으로 split(' — ') 하므로 같은 상태에서도
     오버레이는 번역되고 레이어 패널은 번역되지 않는 차이가 있었다. */
  [
    /^(Overpass (?:temporarily unavailable|rate-limited|timed out|could not complete the query)) — retrying in (\d+)s$/,
    (m) => `${dict[m[1]] || m[1]} — ${m[2]}초 후 재시도`,
  ],
  [
    /^(Overpass (?:temporarily unavailable|rate-limited|timed out|could not complete the query)) — retry pending$/,
    (m) => `${dict[m[1]] || m[1]} — 재시도 대기 중`,
  ],

  /* 조합형 툴팁: "Expand LOCATION" 등.
     앱이 **번역된** 패널 제목을 이어 붙이므로('Expand ' + 제목)
     "Expand 위치" 같은 문자열은 완전 일치로는 잡히지 않는다. 규칙으로 받는다.
     영어 그대로인 "Expand LOCATION" 은 완전 일치 표가 먼저 처리하므로 영향 없다. */
  [/^Expand (.+)$/, (m) => `${m[1]} 펼치기`],
  [/^Collapse (.+)$/, (m) => `${m[1]} 접기`],
];

/* -------------------------------------------------------------- 부분 치환 */

export const partial = [
  /* 위치 트레이 표시값 */
  ['📍 Location: ', '📍 위치: '],
  ['Landmark: ', '랜드마크: '],
  ['DEST ', '목적지 '],

  /* 카메라 캘리브레이션 표시값 */
  ['HDG ', '방위 '],
  ['PITCH ', '피치 '],
  ['FOV ', '화각 '],
  ['RANGE ', '거리 '],
  ['HGT ', '설치고 '],
  ['ΔN ', '북측 '],
  ['ΔE ', '동측 '],
  ['SOURCE · ', '소스 · '],

  /* HUD 텔레메트리 행: 고정 어휘가 섞여 있으므로 어절 단위로 치환.
     어휘 출처는 src/hud.js 의 _viewBand() / _regionLabel().
     순서 주의: "ANTARCTIC" 을 "ARCTIC" 보다 먼저 처리해야 한다. */
  ['NORTHERN OCEANIC GRID', '북반구 해양 그리드'],
  ['SOUTHERN OCEANIC GRID', '남반구 해양 그리드'],
  ['ANTARCTIC', '남극'],
  ['ARCTIC', '북극'],
  ['NORTH AMERICA', '북아메리카'],
  ['SOUTH AMERICA', '남아메리카'],
  ['EUROPE', '유럽'],
  ['AFRICA', '아프리카'],
  ['ASIA', '아시아'],
  ['OCEANIA', '오세아니아'],
  ['ANTARCTICA', '남극대륙'],
  ['REGIONAL', '지역'],
  ['GLOBAL', '전지구'],
  ['METRO', '광역'],
  ['STREET', '거리'],
  ['CITY', '도시'],
  ['NORMAL', '정상'],
  ['NEAR ', '근처 '],
  ['ALT: ', '고도: '],
  ['ALT ', '고도 '],
  ['SUN: ', '태양: '],
  ['SUN ', '태양 '],
  /* ONA = Off-Nadir Angle(천저 이탈각). HUD 는 약어 위주 화면이라
     ja 사전과 동일하게 약어를 유지한다. (zh 는 '偏角' 으로 옮겼는데,
     이 용어 선택은 원어민 검토가 필요하다 — public/i18n/README.md 참고) */
  ['ONA: ', 'ONA: '],
  ['WINDOW ', '윈도 '],
  ['ONA ', 'ONA '],
  ['EL', '앙각'],
  ['BAND: PAN', '밴드: 팬크로'],
  ['BAND: ', '밴드: '],
  ['BITS: ', '비트: '],
  ['LVL: ', '레벨: '],
  ['COLL: ', '수집: '],
  ['ORB: ', '궤도: '],
  ['PASS: ', '패스: '],
  ['LAT: ', '위도: '],
  ['LON: ', '경도: '],
  ['GSD: ', 'GSD: '],
  ['NIIRS: ', 'NIIRS: '],
  ['PAGE ', '페이지 '],
  ['KM |', 'km |'],
  ['KM', 'km'],
  ['MGRS: ', 'MGRS: '],
];
