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
for(let round=1;round<=3;round++)for(const mode of [{label:'desktop',width:1366,height:900,isMobile:false,hasTouch:false},{label:'mobile',width:390,height:844,isMobile:true,hasTouch:true}]){
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
   if(name==='a1'){
    const visibility=async id=>page.locator('#'+id).getAttribute('visibility');
    await partButtons.nth(0).click();
    if(await visibility('outcome-both')!=='hidden')throw Error('A1.1: Endergebnis zu früh sichtbar');
    await page.locator('#next').click();
    if(await visibility('outcome-both')!=='visible')throw Error('A1.1: Endergebnis nach Produktregel unsichtbar');
    await partButtons.nth(1).click();
    if(await visibility('outcome-only-w')!=='hidden'||await visibility('outcome-only-b')!=='hidden')throw Error('A1.2: Endergebnisse zu früh sichtbar');
    await page.locator('#next').click();
    if(await visibility('outcome-only-w')!=='visible'||await visibility('outcome-only-b')!=='hidden')throw Error('A1.2: erster Pfad falsch');
    await page.locator('#next').click();
    if(await visibility('outcome-only-b')!=='visible')throw Error('A1.2: zweiter Pfad falsch');
    await page.locator('#reset').click();
   }
   if(name==='a3'){
    await partButtons.nth(0).click();
    if(!(await page.locator('#half').isDisabled())||!(await page.locator('#angle').isDisabled()))throw Error('A3.1: geometrische Ergebnisse zu früh freigeschaltet');
    if(await page.locator('#midpointTicks').isVisible())throw Error('A3.1: Halbierungsmarkierungen vorzeitig sichtbar');
    await page.locator('#next').click();
    if(!(await page.locator('#half').isDisabled()))throw Error('A3.1: Halbierung vor Begründung freigeschaltet');
    await page.locator('#next').click();
    if(await page.locator('#half').isDisabled())throw Error('A3.1: Halbierung nach Begründung nicht freigeschaltet');
    await page.locator('#half').check();
    if(!(await page.locator('#midpointTicks').isVisible()))throw Error('A3.1: markierte gleiche Teilstrecken fehlen');
    await partButtons.nth(1).click();
    if(!(await page.locator('#angle').isDisabled()))throw Error('A3.2: 60 Grad vor Rechnung freigeschaltet');
    for(let i=0;i<3;i++)await page.locator('#next').click();
    if(await page.locator('#angle').isDisabled())throw Error('A3.2: Winkelanzeige nach Lösung nicht freigeschaltet');
    await page.locator('#angle').check();
    if(!(await page.locator('#extra').textContent()).includes('60°'))throw Error('A3.2: Winkelbogenbeschriftung 60 Grad fehlt');
    await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-a3-loesung.png',fullPage:true,animations:'disabled'});
    await page.locator('#reset').click();
    if(!(await page.locator('#angle').isDisabled()))throw Error('A3.2: 60 Grad nach Reset noch freigeschaltet');
   }
   if(name==='a2'){
    await partButtons.nth(0).click();
    if(!(await page.locator('#figure').textContent()).includes('C₁'))throw Error('A2.1: Originaldreieck C1 fehlt');
    if((await page.locator('#figure').textContent()).includes('B₂'))throw Error('A2.1: B2 vor Konstruktion sichtbar');
    await page.locator('#next').click();
    if(!(await page.locator('#figure').textContent()).includes('C₂'))throw Error('A2.1: C2 im zweiten Schritt fehlt');
    await page.locator('#next').click();
    if(!(await page.locator('#figure').textContent()).includes('B₂'))throw Error('A2.1: B2 im letzten Schritt fehlt');
    await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-a2-dreiecke.png',fullPage:true,animations:'disabled'});
    await partButtons.nth(1).click();
    if(await page.locator('#intervalchoices button').count()!==6)throw Error('A2.2: nicht alle sechs Intervalle');
    await page.locator('#intervalchoices button').nth(2).click();
    await page.locator('#next').click();
    if(!(await page.locator('#choicefeedback').innerText()).includes('Richtig'))throw Error('A2.2: Intervallauswertung fehlt');
    await partButtons.nth(2).click();
    if((await page.locator('#measure').innerText()).includes('Oberfläche'))throw Error('A2.3: Oberfläche zu früh eingeblendet');
    for(let k=0;k<3;k++)await page.locator('#next').click();
    if(!(await page.locator('#measure').innerText()).includes('Oberfläche'))throw Error('A2.3: Oberfläche nach Herleitung fehlt');
    await partButtons.nth(3).click();
    if(await page.locator('#preset30').isVisible())throw Error('A2.4: 30-Grad-Ergebnis vorzeitig sichtbar');
    if(await page.locator('#phi').inputValue()==='30')throw Error('A2.4: Ergebnis vorzeitig am Regler eingestellt');
    await page.locator('#next').click();
    if(await page.locator('#preset30').isVisible())throw Error('A2.4: Ergebnis schon im zweiten Schritt sichtbar');
    await page.locator('#next').click();
    if(!(await page.locator('#preset30').isVisible()))throw Error('A2.4: Ergebnis nach Lösung nicht freigeschaltet');
    if(await page.locator('#phi').inputValue()!=='30')throw Error('A2.4: Lösungsgeometrie nach letzter Rechnung nicht auf 30 Grad synchronisiert');
    await page.locator('#prev').click();
    if(await page.locator('#phi').inputValue()==='30')throw Error('A2.4: 30-Grad-Lösung beim Zurückgehen nicht zurückgesetzt');
    await page.locator('#preset75').click();
   }
   for(const id of ['phi','length','slider','x','p']){
    const slider=page.locator('#'+id);
    if(await slider.count()){
     const limits=await slider.evaluate(e=>[e.min,e.max]);
     for(const value of limits)await slider.evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}))},value);
    }
   }
   await page.waitForTimeout(500);
   if(['a2','b1','b2','b3','b4'].includes(name))await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-'+name+'-grenzlage.png',fullPage:true,animations:'disabled'});
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
    await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-'+name+'-3d.png',fullPage:true,animations:'disabled'});
    await page.locator('#twoD2025').click();
    if(await page.locator('#figure').isHidden())throw Error('2D-Ansicht nicht wiederhergestellt');
   }
   if(name!=='a1'&&name!=='a3'&&name!=='b1'&&name!=='a2'&&name!=='b2'&&name!=='b3'&&name!=='b4')throw Error('Unbekannte Aufgabe');
   const pageWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
   if(pageWidth>mode.width+50)issues.push(mode.label+' '+name+': horizontales Seitenüberlaufen '+pageWidth+' px');
   if(errs.length)issues.push(mode.label+' '+name+': '+errs.join('; '));
   await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-'+name+'.png',fullPage:true,animations:'disabled'});
   console.log('OK Runde '+round+' '+mode.label+' '+name+' ('+count+' Teilaufgaben)');
  }catch(e){issues.push(mode.label+' '+name+': '+e.message);console.error('FEHLER '+mode.label+' '+name+': '+e.message)}
  finally{await page.close()}
 }
 await context.close();
}
await browser.close();
if(issues.length){console.error('\nOFFENE BROWSERFEHLER ('+issues.length+'):\n'+issues.join('\n'));process.exitCode=1;}
else console.log('\nBrowserkontrolle bestanden: 3 unabhängige Wiederholungen × 7 Aufgaben × 2 Viewports, inklusive Aufgabennavigation und 3D-Umschaltung.');
