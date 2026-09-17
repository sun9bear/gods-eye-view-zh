// Isolated component integration, not full application/map acceptance.
// Uses production templates, styles, initKeySetup and ShellFeedback. No real keys or feeds.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'outputs/i18n-component-audit');
fs.mkdirSync(out, { recursive: true });
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const chrome = [process.env.GEV_CHROME, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].filter(Boolean).find(fs.existsSync);
const statusHTML = read('src/ui/templates/scene-chrome.html').match(/  <div id="global-loading-status"[\s\S]*?<\/div>/)[0];
const html = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="/style.css"></head><body>
<div id="right-context-rail">${read('src/ui/templates/display-controls.html')}</div>
${read('src/ui/templates/provider-settings.html')}${statusHTML}
<script type="module">
import '/i18n/gev-i18n.js';
import { initKeySetup } from '/src/keySetup.js';
import { ShellFeedback } from '/src/ui/shellFeedback.js';
let layers = [];
const keys = await initKeySetup({fetchImpl: async () => ({ok:true,json:async()=>({setCount:7,total:8,keys:[]})})});
const shell = new ShellFeedback({readLayers:()=>layers});
window.componentTest = {
  render(mode) {
    keys.render({setCount: mode === 0 ? 7 : mode === 1 ? 0 : 8, total:8, keys:[]});
    const originalNow = Date.now;
    const now = originalNow();
    Date.now = () => now;
    try {
      layers = [{id:'alpr-cameras',name:'ALPR cameras',enabled:true,stats: mode === 2
        ? {status:'loading',loading:true,retrying:true}
        : {status:'unavailable',error:'Overpass rate-limited',retryAt:mode===0?now+5000:now-1}}];
      shell._updateGlobalLoadingFeedback(0);
      shell._updateGlobalLoadingFeedback(200);
      shell._stopLoadingFeedbackTicker();
    } finally { Date.now = originalNow; }
  }
};
componentTest.render(0);
</script></body></html>`;
const server = http.createServer((req,res)=>{
  const p = decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
  if(p==='/'){res.setHeader('Content-Type','text/html; charset=utf-8');res.end(html);return;}
  if(p==='/favicon.ico'){res.writeHead(204);res.end();return;}
  // Never expose .env, repository metadata or personal files.
  if(!/^\/(?:i18n\/.*\.js|src\/.*\.(?:js|css)|style\.css|[^/]+\.(?:svg|woff2))$/.test(p) || p.includes('..')){res.writeHead(404);res.end();return;}
  const relative = p.startsWith('/i18n/') ? 'public'+p : p.slice(1);
  const file = path.join(root,relative);
  if(!fs.existsSync(file)){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type',p.endsWith('.css')?'text/css':p.endsWith('.js')?'text/javascript':p.endsWith('.svg')?'image/svg+xml':'font/woff2');
  res.end(fs.readFileSync(file));
});
const expected = {
  en: ['POWER UP · 1 KEY WAITING','POWER UP · 8 KEYS WAITING','POWERED UP','OVERPASS RATE-LIMITED','ALPR cameras · retrying in 5s','ALPR cameras · retry pending','RETRYING ALPR CAMERAS'],
  'zh-Hans': ['通电 · 还有 1 个密钥','通电 · 还有 8 个密钥','已通电','Overpass 已限流','车牌识别摄像头 · 5 秒后重试','车牌识别摄像头 · 重试待定','正在重试车牌识别摄像头'],
  'zh-Hant': ['通電 · 還有 1 個密鑰','通電 · 還有 8 個密鑰','已通電','Overpass 已限流','車牌識別攝像頭 · 5 秒後重試','車牌識別攝像頭 · 重試待定','正在重試車牌識別攝像頭'],
  ja: ['電源投入 · 残り 1 キー','電源投入 · 残り 8 キー','電源投入済み','Overpass がレート制限されました','ナンバー読取カメラ · 5 秒後に再試行','ナンバー読取カメラ · 再試行待ち','ナンバー読取カメラを再試行中'],
  ko: ['전원 켜기 · 남은 키 1개','전원 켜기 · 남은 키 8개','전원 켜짐','Overpass 속도 제한됨','번호판 판독 카메라 · 5초 후 재시도','번호판 판독 카메라 · 재시도 대기','번호판 판독 카메라 재시도 중'],
};
const checks=[], samples=[], errors=[];
const check=(name,pass,detail)=>checks.push({name,pass:!!pass,detail});
let browser;
try {
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  browser=await puppeteer.launch({executablePath:chrome,headless:true});
  const page=await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request',r=>new URL(r.url()).hostname==='127.0.0.1'?r.continue():r.abort());
  page.on('pageerror',e=>errors.push(String(e)));
  const base=`http://127.0.0.1:${server.address().port}`;
  for(const [width,height] of [[1366,768],[1600,900],[1920,1080]]) {
    await page.setViewport({width,height});
    await page.goto(base+'/?lang=en',{waitUntil:'networkidle0'});
    await page.waitForFunction(()=>window.componentTest && document.querySelector('#gev-language-select')?.options.length===5);
    let step=0;
    for(const lang of ['en','zh-Hans','zh-Hant','ja','ko','en']) {
      await page.select('#gev-language-select',lang);
      for(let mode=0;mode<3;mode++) {
        await page.evaluate(m=>componentTest.render(m),mode);
        await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
        const beforeSettle = await page.$eval('#global-loading-label', e => ({className:e.className,scrollWidth:e.scrollWidth,clientWidth:e.clientWidth}));
        await page.waitForFunction(() => !document.querySelector('#global-loading-label').matches('.gev-flap-active, .gev-flap-sizing'), {timeout:5000});
        const s=await page.evaluate(()=>{
          const get=id=>document.getElementById(id);
          const layout=id=>{const e=get(id),r=e.getBoundingClientRect();return {visible:e.checkVisibility(),within:r.left>=0&&r.top>=0&&r.right<=innerWidth&&r.bottom<=innerHeight,clipped:e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+1,width:r.width,height:r.height,scrollWidth:e.scrollWidth,clientWidth:e.clientWidth,scrollHeight:e.scrollHeight,clientHeight:e.clientHeight,overflowX:getComputedStyle(e).overflowX,overflowY:getComputedStyle(e).overflowY,lineHeight:getComputedStyle(e).lineHeight,fontSize:getComputedStyle(e).fontSize,className:e.className};};
          return {key:document.querySelector('[data-key-setup-chip-label]').textContent,keyHidden:get('key-setup-chip').hidden,label:get('global-loading-label').textContent,detail:get('global-loading-detail').textContent,lang:GEV_I18N.current,select:get('gev-language-select').value,layout:{select:layout('gev-language-select'),status:layout('global-loading-status'),label:layout('global-loading-label'),detail:layout('global-loading-detail'),key:layout('key-setup-chip')}};
        });
        const prefix=`${width}/${step}/${lang}/${mode}`;
        check(prefix+'/key',s.key===expected[lang][mode],s.key);
        check(prefix+'/key visibility',s.keyHidden===(mode===2),s.keyHidden);
        check(prefix+'/label',s.label===expected[lang][mode===2?6:3],s.label);
        if(mode<2)check(prefix+'/detail',s.detail===expected[lang][mode===0?4:5],s.detail);
        check(prefix+'/selector sync',s.select===lang&&s.lang===lang,s.select);
        check(prefix+'/selector layout',s.layout.select.visible&&s.layout.select.within&&!s.layout.select.clipped,s.layout.select);
        for(const id of ['status','label','detail'])check(prefix+'/'+id+' layout',s.layout[id].visible&&s.layout[id].within&&!s.layout[id].clipped,s.layout[id]);
        if(mode<2)check(prefix+'/key layout',s.layout.key.visible&&s.layout.key.within&&!s.layout.key.clipped,s.layout.key);
        samples.push({width,height,step,lang,mode,beforeSettle,...s});
        if(mode===0)await page.screenshot({path:path.join(out,`${width}-${step}-${lang}.png`)});
      }
      step++;
    }
    // Keyboard/API synchronization, native focus, and persisted preference without URL override.
    await page.focus('#gev-language-select');
    check(`${width}/keyboard focus`,await page.$eval('#gev-language-select',e=>document.activeElement===e));
    await page.evaluate(()=>GEV_I18N.set('ja'));
    check(`${width}/API sync`,await page.$eval('#gev-language-select',e=>e.value==='ja'));
    await page.keyboard.down('Control');await page.keyboard.down('Alt');await page.keyboard.press('l');await page.keyboard.up('Alt');await page.keyboard.up('Control');
    check(`${width}/shortcut sync`,await page.$eval('#gev-language-select',e=>e.value==='ko'));
    await page.goto(base,{waitUntil:'networkidle0'});
    check(`${width}/persisted language`,await page.$eval('#gev-language-select',e=>e.value==='ko'));
  }
  check('no page exceptions',errors.length===0,errors);
} catch(error){check('execution',false,String(error.stack||error));}
finally {if(browser)await browser.close();await new Promise(r=>server.close(r));}
const failures=checks.filter(c=>!c.pass);
const report={scope:'Production component templates/styles/renderers; synthetic status; no map, no live services. Not whole-application acceptance.',pass:failures.length===0,total:checks.length,failures,checks,samples,errors};
fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({pass:report.pass,total:report.total,failures},null,2));
process.exitCode=report.pass?0:1;
