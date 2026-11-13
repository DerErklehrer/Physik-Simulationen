/**
 * Echte Chromium-Regressionstests für den Haupttermin Mathematik I 2025.
 * Voraussetzung: npm install --no-save playwright; lokaler Webserver unter
 * http://127.0.0.1:8765/; GOOGLE_CHROME oder Playwright-Chromium.
 *
 * Ergebnisse als Screenshots im Ordner /tmp/2025-browser-qa.
 * Nicht: fachlicher Wort-für-Wort-Abgleich der ISB-Unterlagen.
 */
import {chromium} from 'playwright';
import {mkdir} from 'node:fs/promises';
const BASE=process.env.QA_BASE||'http://127.0.0.1:8765';
const OUT=process.env.QA_OUT||'/tmp/2025-browser-qa';
const names=['a1','a2','a3','b1','b2','b3','b4'];
const expected={a1:2,a2:4,a3:2,b1:3,b2:4,b3:6,b4:5};
const issues=[];
await mkdir(OUT,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
for(const mode of [{label:'desktop',width:1366,height:900,isMobile:false,hasTouch:false},{label:'mobile',width:390,height:844,isMobile:true,hasTouch:true}]){
 const context=await browser.newContext({viewport:{width:mode.width,height:mode.height},isMobile:mode.isMobile,hasTouch:mode.hasTouch,deviceScaleFactor:1});
 for(const name of names){
  const page=await context.newPage(),errs=[];
  page.on('pageerror',e=>errs.push('JS: '+e.message));
  page.on('console',msg=>{if(msg.type()==='error')errs.push('Konsole: '+msg.text())});
  const path='/abschlusspruefung/2025/haupttermin/'+name+'.html';
  try{
   const res=await page.goto(BASE+path,{waitUntil:'domcontentloaded',timeout:30000});
   if(res.status()!==200)throw Error('HTTP '+res.status());
   const partButtons=page.locator('#parts button');
   const count=await partButtons.count();
   if(count!==expected[name])throw Error('Teile: erwartet '+expected[name]+', erhalten '+count);
   for(let i=0;i<count;i++){
    await partButtons.nth(i).click();
    const statement=(await page.locator('#statement').innerText()).trim();
    const solution=(await page.locator('#solution').innerText()).trim();
    if(statement.length<15||solution.length<10)throw Error('Leerer Aufgabentext/Lösung, Teil '+(i+1));
    await page.locator('#next').click();
    const after=(await page.locator('#solution').innerText()).trim();
    if(after.length<10)throw Error('Leerer Schritt nach Weiter, Teil '+(i+1));
    await page.locator('#reset').click();
   }
   for(const id of ['phi','length','slider','x','p']){
    const slider=page.locator('#'+id);
    if(await slider.count()){
     const limits=await slider.evaluate(e=>[e.min,e.max]);
     for(const value of limits)await slider.evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}))},value);
    }
   }
   await page.waitForTimeout(500);
   if(['a2','b1','b2','b3','b4'].includes(name))await page.screenshot({path:OUT+'/'+mode.label+'-'+name+'-grenzlage.png',fullPage:true,animations:'disabled'});
   for(const [id,value] of Object.entries({phi:40,length:4,slider:-4.5,x:-3,p:20})){
    const control=page.locator('#'+id);
    if(await control.count())await control.evaluate((el,v)=>{el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}))},value);
   }
   await page.waitForTimeout(500);
   if(name==='a2'||name==='b2'){
    await page.locator('#threeD2025').click();
    await page.locator('#view3d2025 canvas').waitFor({state:'visible',timeout:15000});
    await page.locator('#top2025').click();
    await page.locator('#resetcamera2025').click();
    await page.waitForTimeout(450);
    await page.screenshot({path:OUT+'/'+mode.label+'-'+name+'-3d.png',fullPage:true,animations:'disabled'});
    await page.locator('#twoD2025').click();
    if(await page.locator('#figure').isHidden())throw Error('2D-Ansicht nicht wiederhergestellt');
   }
   if(name!=='a1'&&name!=='a3'&&name!=='b1'&&name!=='a2'&&name!=='b2'&&name!=='b3'&&name!=='b4')throw Error('Unbekannte Aufgabe');
   const pageWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
   if(pageWidth>mode.width+50)issues.push(mode.label+' '+name+': horizontales Seitenüberlaufen '+pageWidth+' px');
   if(errs.length)issues.push(mode.label+' '+name+': '+errs.join('; '));
   await page.screenshot({path:OUT+'/'+mode.label+'-'+name+'.png',fullPage:true,animations:'disabled'});
   console.log('OK '+mode.label+' '+name+' ('+count+' Teilaufgaben)');
  }catch(e){issues.push(mode.label+' '+name+': '+e.message);console.error('FEHLER '+mode.label+' '+name+': '+e.message)}
  finally{await page.close()}
 }
 await context.close();
}
await browser.close();
if(issues.length){console.error('\nOFFENE BROWSERFEHLER ('+issues.length+'):\n'+issues.join('\n'));process.exitCode=1;}
else console.log('\nBrowserkontrolle bestanden: 7 Aufgaben in zwei Viewports, inklusive Aufgabennavigation und 3D-Umschaltung.');
