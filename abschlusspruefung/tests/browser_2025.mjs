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
    // Prüfe das tatsächlich gesetzte MathJax – ein Text mit \(…\) im Browser ist ein Fehler.
    await page.waitForFunction(()=>{
      const nodes=[document.getElementById('statement'),document.getElementById('solution')];
      return nodes.every(el=>el&&!/\\\\(?:\\(|\\[)/.test(el.innerText));
    },null,{timeout:9000});
    const statement=(await page.locator('#statement').innerText()).trim();
    const solution=(await page.locator('#solution').innerText()).trim();
    if(statement.length<15||solution.length<10)throw Error('Leerer Aufgabentext/Lösung, Teil '+(i+1));
    await page.locator('#next').click();
    const after=(await page.locator('#solution').innerText()).trim();
    if(after.length<10)throw Error('Leerer Schritt nach Weiter, Teil '+(i+1));
    await page.waitForFunction(()=>{
      const nodes=[document.getElementById('statement'),document.getElementById('solution')];
      return nodes.every(el=>el&&!/\\\\(?:\\(|\\[)/.test(el.innerText));
    },null,{timeout:9000});
    await page.locator('#reset').click();
   }
   if(name==='b1'){
    const current=()=>page.locator('#stats').innerText();
    await partButtons.nth(0).click();
    if(await page.locator('#choices input').count()!==4)throw Error('B1.1: vier Antwortmöglichkeiten fehlen');
    await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-b1-antworten.png',fullPage:true,animations:'disabled'});
    if(mode.isMobile){
     const metrics=await page.locator('.tree-scroll').evaluate(el=>({visible:el.clientWidth,content:el.scrollWidth}));
     if(metrics.content<=metrics.visible+100)throw Error('B1 mobil: Baumdiagramm nicht sinnvoll vergrößert/scrollbar');
     await page.locator('.tree-scroll').evaluate(el=>{el.scrollLeft=el.scrollWidth});
     const right=await page.locator('.tree-scroll').evaluate(el=>el.scrollLeft);
     if(right<100)throw Error('B1 mobil: horizontale Bedienung blockiert');
     await page.screenshot({path:OUT+'/r'+round+'-mobile-b1-rechts.png',fullPage:true,animations:'disabled'});
     await page.locator('.tree-scroll').evaluate(el=>{el.scrollLeft=0});
     await page.locator('#treeOverview').click();
     if(!(await page.locator('.tree-scroll').evaluate(el=>el.classList.contains('overview'))))throw Error('B1 mobil: Gesamtübersicht lässt sich nicht aktivieren');
     await page.screenshot({path:OUT+'/r'+round+'-mobile-b1-gesamtansicht.png',fullPage:true,animations:'disabled'});
     await page.locator('#treeOverview').click();
     if(await page.locator('.tree-scroll').evaluate(el=>el.classList.contains('overview')))throw Error('B1 mobil: Lesemodus lässt sich nicht wiederherstellen');
    }
    if((await current()).includes('30 − p'))throw Error('B1.1: Anteil weiß zu früh sichtbar');
    await page.locator('#choices input[value="2"]').check();
    if((await page.locator('#choicefeedback').innerText()).includes('Richtig'))throw Error('B1.1: Ergebnis vorzeitig bestätigt');
    await page.locator('#next').click();await page.locator('#next').click();
    if(!(await page.locator('#choicefeedback').innerText()).includes('Richtig'))throw Error('B1.1: korrekte Auswahl wird nicht bestätigt');
    if(!(await current()).includes('30 − p'))throw Error('B1.1: Restanteil nach Rechnung fehlt');
    await partButtons.nth(1).click();
    if(await page.locator('#p20').isVisible())throw Error('B1.2: p=20 vorzeitig verraten');
    if((await current()).includes('p = 20'))throw Error('B1.2: Lösung in Messwert vorweggenommen');
    await page.locator('#next').click();await page.locator('#next').click();
    if(await page.locator('#p').inputValue()!=='20')throw Error('B1.2: Baumdiagramm nach dem letzten Rechenschritt nicht auf p=20 synchronisiert');
    await page.locator('#prev').click();
    if(await page.locator('#p').inputValue()!=='15')throw Error('B1.2: Beispielwert nach Zurückblättern nicht wiederhergestellt');
    await page.locator('#next').click();
    if(!(await page.locator('#p20').isVisible()))throw Error('B1.2: Lösungswert nicht freigeschaltet');
    await page.locator('#p20').click();
    if(await page.locator('#p').inputValue()!=='20')throw Error('B1.2: Voreinstellung liefert nicht p=20');
    await partButtons.nth(2).click();
    if((await current()).includes('56 %'))throw Error('B1.3: 56 % vorzeitiges Ergebnis');
    await page.locator('#next').click();
    if((await current()).includes('56 %'))throw Error('B1.3: 56 % vor Summierung gezeigt');
    await page.locator('#next').click();
    if(!(await current()).includes('56 %'))throw Error('B1.3: 56 % nach Summierung fehlt');
    await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-b1-loesung.png',fullPage:true,animations:'disabled'});
    await page.locator('#reset').click();
    if((await current()).includes('56 %'))throw Error('B1.3: Ergebnis trotz Reset sichtbar');
    const slider=page.locator('#p');
    for(const v of ['0.5','10','29.5']){
      await slider.evaluate((e,val)=>{e.value=val;e.dispatchEvent(new Event('input',{bubbles:true}))},v);
      if((await current()).includes('NaN'))throw Error('B1: unzulässige numerische Ausgabe bei p='+v);
    }
    await page.locator('#resetp').click();
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
   if(name==='b4'){
    const polygon=()=>page.locator('#plot path[fill-opacity]').count();
    const graphText=()=>page.locator('#plot').textContent();
    if(mode.isMobile){
      const m=await page.locator('#plotScroll').evaluate(el=>({scroll:el.scrollWidth,width:el.clientWidth}));
      if(m.scroll<=m.width+100)throw Error('B4 mobile: Graph wird statt lesbarer Wischdarstellung zu klein');
      await page.locator('#plotScroll').evaluate(el=>el.scrollLeft=el.scrollWidth);
      if(await page.locator('#plotScroll').evaluate(el=>el.scrollLeft)<100)throw Error('B4 mobile: rechte Diagrammhälfte nicht erreichbar');
      await page.screenshot({path:OUT+'/r'+round+'-mobile-b4-rechts.png',fullPage:true,animations:'disabled'});
      await page.locator('#plotOverview').click();
      if(!(await page.locator('#plotScroll').evaluate(el=>el.classList.contains('overview'))))throw Error('B4 mobile: Gesamtübersicht nicht aktivierbar');
      await page.screenshot({path:OUT+'/r'+round+'-mobile-b4-gesamt.png',fullPage:true,animations:'disabled'});
      await page.locator('#plotOverview').click();
      if(await page.locator('#plotScroll').evaluate(el=>el.classList.contains('overview')))throw Error('B4 mobile: Rückkehr zum Lesemodus defekt');
      await page.locator('#plotScroll').evaluate(el=>el.scrollLeft=0);
    }
    await partButtons.nth(0).click();
    if(await polygon()!==0)throw Error('B4.1: fertige Parallelogramme vor Aufgabe sichtbar');
    if((await graphText()).includes('D₁'))throw Error('B4.1: D1 vor Konstruktionsschritt gezeigt');
    await page.locator('#next').click();
    if(!(await graphText()).includes('D₁')||!(await graphText()).includes('D₂'))throw Error('B4.1: D1/D2 im zweiten Schritt fehlen');
    if(await polygon()!==0)throw Error('B4.1: Parallelogramm vor Winkelschritt gefüllt');
    await page.locator('#next').click();
    if(!(await graphText()).includes('B₁')||!(await graphText()).includes('B₂'))throw Error('B4.1: B1/B2 im dritten Schritt fehlen');
    await page.locator('#next').click();
    if(await polygon()!==2)throw Error('B4.1: beide Originalparallelogramme nach Konstruktion fehlen');
    await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-b4-originalkonstruktion.png',fullPage:true,animations:'disabled'});
    await page.locator('#p1').click();
    if(await polygon()!==1)throw Error('B4.1: Schaltfläche D1 blendet nicht nur Parallelogramm 1 ein');
    await page.locator('#p2').click();
    if(await polygon()!==1)throw Error('B4.1: Schaltfläche D2 blendet nicht nur Parallelogramm 2 ein');
    await partButtons.nth(1).click();
    if(!(await page.locator('#statement').textContent()).includes('AB'))throw Error('B4.2: Aufgabenvektor fehlt');
    await partButtons.nth(2).click();
    if(await page.locator('#p3').isVisible()||await page.locator('#rounding').isVisible())throw Error('B4.3: gerundete Sonderlage vorzeitig angezeigt');
    for(let j=0;j<3;j++)await page.locator('#next').click();
    if(!(await page.locator('#p3').isVisible())||!(await page.locator('#rounding').isVisible()))throw Error('B4.3: Sonderlage/Rundung nach Rechnung fehlt');
    if(await page.locator('#slider').inputValue()!=='0.1')throw Error('B4.3: Sonderlage nicht mit Zeichnung synchronisiert');
    await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-b4-rundung.png',fullPage:true,animations:'disabled'});
    await page.locator('#prev').click();
    if(await page.locator('#p3').isVisible()||await page.locator('#rounding').isVisible())throw Error('B4.3: Rundungswert beim Zurückblättern nicht verborgen');
    if(await page.locator('#slider').inputValue()!=='-4.5')throw Error('B4.3: Ausgangswert des Reglers nach Zurückblättern nicht wiederhergestellt');
    await partButtons.nth(3).click();
    if(await page.locator('#p0').isVisible()||await page.locator('#plot path[data-right-angle]').count())throw Error('B4.4: Minimum vorzeitig angezeigt');
    for(let j=0;j<3;j++)await page.locator('#next').click();
    if(!(await page.locator('#p0').isVisible()))throw Error('B4.4: Minimum nicht freigeschaltet');
    if(await page.locator('#plot path[data-right-angle="quarter-arc"]').count()!==1||await page.locator('#plot circle[data-right-angle="center-dot"]').count()!==1)throw Error('B4.4: Viertelkreisbogen mit Punkt fehlt');
    if(await page.locator('#slider').inputValue()!=='-5.2')throw Error('B4.4: minimaler Abstand nicht zur richtigen Stelle x=-5.2');
    await page.locator('#prev').click();
    if(await page.locator('#slider').inputValue()!=='-4.5')throw Error('B4.4: Sonderlage beim Zurückblättern nicht verlassen');
    if(await page.locator('#plot path[data-right-angle]').count())throw Error('B4.4: Rechtwinkelsymbol vor Endergebnis nicht entfernt');
    await page.locator('#next').click();
    await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-b4-minimum.png',fullPage:true,animations:'disabled'});
    await partButtons.nth(4).click();
    if((await page.locator('#measure').innerText()).includes('Flächeninhalt'))throw Error('B4.5: Flächeninhalt vor Formel gezeigt');
    await page.locator('#next').click();
    await page.locator('#next').click();
    if(!(await page.locator('#p0').isVisible()))throw Error('B4.5: minimaler Fall nach Begründung fehlt');
    await page.locator('#reset').click();
    if(await page.locator('#p0').isVisible())throw Error('B4.5: Ergebnis nach Reset noch sichtbar');
   }
   if(name==='b3'){
    if(mode.isMobile){
     const metrics=await page.locator('#plotScroll').evaluate(el=>({scrollWidth:el.scrollWidth,clientWidth:el.clientWidth}));
     if(metrics.scrollWidth<=metrics.clientWidth+100)throw Error('B3: Mobiles Koordinatensystem nicht vergrößert/scrollbar');
     await page.locator('#plotScroll').evaluate(el=>el.scrollLeft=el.scrollWidth);
     if(await page.locator('#plotScroll').evaluate(el=>el.scrollLeft)<100)throw Error('B3: horizontaler Lesemodus defekt');
     await page.screenshot({path:OUT+'/r'+round+'-mobile-b3-rechts.png',fullPage:true,animations:'disabled'});
     await page.locator('#plotOverview').click();
     if(!(await page.locator('#plotScroll').evaluate(el=>el.classList.contains('overview'))))throw Error('B3: Gesamtansicht lässt sich nicht aktivieren');
     await page.screenshot({path:OUT+'/r'+round+'-mobile-b3-gesamt.png',fullPage:true,animations:'disabled'});
     await page.locator('#plotOverview').click();
     if(await page.locator('#plotScroll').evaluate(el=>el.classList.contains('overview')))throw Error('B3: Lesemodus lässt sich nicht wiederherstellen');
     await page.locator('#plotScroll').evaluate(el=>el.scrollLeft=0);
    }
    const visibleGraph=()=>page.locator('#plot path[clip-path="url(#clip25)"]').count();
    const polygonCount=()=>page.locator('#plot path[fill-opacity]').count();
    await partButtons.nth(0).click();
    if(await visibleGraph()!==0)throw Error('B3.1: Graphen vor Herleitung sichtbar');
    await page.locator('#next').click();
    if(await visibleGraph()!==1)throw Error('B3.1: f1 nach Wertetabelle nicht sichtbar');
    await page.locator('#next').click();
    if(await visibleGraph()!==2)throw Error('B3.1: f2 nach Wertetabelle nicht sichtbar');
    await partButtons.nth(1).click();
    if(await polygonCount()!==0)throw Error('B3.2: komplette Trapeze schon vor Konstruktion');
    for(let k=0;k<3;k++)await page.locator('#next').click();
    if(await polygonCount()!==2)throw Error('B3.2: beide Trapeze fehlen nach Konstruktion');
    await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-b3-trapeze.png',fullPage:true,animations:'disabled'});
    await partButtons.nth(2).click();
    if((await page.locator('#plot').textContent()).includes('F₁'))throw Error('B3.3: Lotfuß F1 schon vor Zeichnung sichtbar');
    await page.locator('#next').click();
    if(!(await page.locator('#plot').textContent()).includes('F₁'))throw Error('B3.3: Lotfuß F1 fehlt nach Zeichnung');
    const arc=page.locator('#plot path[data-right-angle="quarter-arc"]');
    const dot=page.locator('#plot circle[data-right-angle="center-dot"]');
    if(await arc.count()!==1||await dot.count()!==1)throw Error('B3.3: Rechtwinkelsymbol muss Viertelkreis mit Punkt sein');
    const geometry=await page.evaluate(()=>{
     const arc=document.querySelector('#plot path[data-right-angle="quarter-arc"]');
     const dot=document.querySelector('#plot circle[data-right-angle="center-dot"]');
     const f=document.querySelector('#plot text');
     return {arc:arc.getAttribute('d'),x:Number(dot.getAttribute('cx')),y:Number(dot.getAttribute('cy'))};
    });
    if(!Number.isFinite(geometry.x)||!Number.isFinite(geometry.y)||!geometry.arc.includes(' A16 16 '))throw Error('B3.3: Radius und Mittelpunkt des Viertelkreis-Symbols unplausibel');
    await partButtons.nth(4).click();
    if(await page.locator('#p3').isVisible()||await page.locator('#pexact').isVisible())throw Error('B3.5: numerische x-Lösung vorzeitig sichtbar');
    if(await page.locator('#roundingNote').isVisible())throw Error('B3.5: Rundungsdifferenz vorzeitig verraten');
    for(let k=0;k<4;k++)await page.locator('#next').click();
    if(!(await page.locator('#p3').isVisible())||!(await page.locator('#pexact').isVisible()))throw Error('B3.5: Voreinstellungen fehlen nach der Rechnung');
    if(!(await page.locator('#roundingNote').isVisible()))throw Error('B3.5: mathematisch wichtiger Rundungshinweis fehlt');
    if(Math.abs(Number(await page.locator('#xval').innerText().then(x=>x.replace(',','.')))-.28)>.005)throw Error('B3.5: amtlich gerundete Lösung nicht synchronisiert');
    await page.locator('#pexact').click();
    if(!(await page.locator('#xval').innerText()).includes('0,25'))throw Error('B3.5: geometrisch exakte Sonderlage fehlt');
    await page.locator('#prev').click();
    if(await page.locator('#p3').isVisible()||await page.locator('#roundingNote').isVisible())throw Error('B3.5: Lösung beim Zurückblättern noch sichtbar');
    await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-b3-schritte.png',fullPage:true,animations:'disabled'});
    await partButtons.nth(5).click();
    if((await page.locator('#measure').innerText()).includes('14,1 FE'))throw Error('B3.6: Flächenbegründung vorzeitig in der Grafik');
    await page.locator('#next').click();await page.locator('#next').click();
    if(!(await page.locator('#measure').innerText()).includes('14,1 FE'))throw Error('B3.6: Flächenbegründung nach Lösung nicht eingeblendet');
   }
   if(name==='b2'){
    const figures=page.locator('#geometry polygon');
    const labels=()=>page.locator('#geometry').textContent();
    await partButtons.nth(0).click();
    if(await figures.count()!==0)throw Error('B2.1: Prisma vor Konstruktion vollständig sichtbar');
    if(!(await labels()).includes('P₁')||(await labels()).includes('Q₁'))throw Error('B2.1: erster Konstruktionsschritt nicht isoliert');
    await page.locator('#next').click();
    if(!(await labels()).includes('Q₁'))throw Error('B2.1: Q1 und Parallele fehlen nach Schritt 2');
    if(await figures.count()!==0)throw Error('B2.1: Prisma vor Schritt 3 ausgefüllt');
    await page.locator('#next').click();
    if(await figures.count()!==2)throw Error('B2.1: Prismengrundflächen nach Schritt 3 fehlen');
    await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-b2-konstruktion.png',fullPage:true,animations:'disabled'});
    await partButtons.nth(2).click();
    if(await page.locator('#volume50').isVisible())throw Error('B2.3: 50-cm3-Knopf verrät die Lösung');
    if((await page.locator('#measure').innerText()).includes('50,00 cm³'))throw Error('B2.3: Lösungsvolumen vorzeitig sichtbar');
    await page.locator('#next').click();
    if(await page.locator('#volume50').isVisible())throw Error('B2.3: Lösungswert schon im zweiten Schritt sichtbar');
    await page.locator('#next').click();
    if(!(await page.locator('#volume50').isVisible()))throw Error('B2.3: Lösungswert nach Rechnung fehlt');
    if(Math.abs(Number(await page.locator('#length').inputValue())-50/6)>0.005)throw Error('B2.3: Prisma nicht auf exaktes 50-cm3-Volumen gesetzt');
    if(!(await page.locator('#measure').innerText()).includes('50,00 cm³'))throw Error('B2.3: Rechnungs- und Grafikwert widersprechen sich');
    await page.locator('#prev').click();
    if(Math.abs(Number(await page.locator('#length').inputValue())-4)>1e-8)throw Error('B2.3: vorige Lage nach Zurückblättern nicht wiederhergestellt');
    await partButtons.nth(3).click();
    if(await page.locator('#maximum').isVisible())throw Error('B2.4: Maximalwert zu früh sichtbar');
    for(let i=0;i<2;i++)await page.locator('#next').click();
    if(await page.locator('#maximum').isVisible())throw Error('B2.4: Maximalwert vor Beurteilung verraten');
    await page.locator('#next').click();
    if(!(await page.locator('#maximum').isVisible()))throw Error('B2.4: 10-cm-Grenzwert nach Beurteilung fehlt');
    if(await page.locator('#length').inputValue()!=='10')throw Error('B2.4: Endprisma nicht auf 10 cm gesetzt');
    if(!(await page.locator('#measure').innerText()).includes('60,00 cm³'))throw Error('B2.4: Maximalvolumen nicht 60 cm3');
    await page.locator('#prev').click();
    if(Math.abs(Number(await page.locator('#length').inputValue())-4)>1e-8)throw Error('B2.4: Grenzlage beim Rückwärtsblättern nicht rückgängig');
    await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-b2-vorbereitung.png',fullPage:true,animations:'disabled'});
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
    if(name==='b2')await partButtons.nth(0).click();
    await page.locator('#threeD2025').click();
    await page.locator('#view3d2025 canvas').waitFor({state:'visible',timeout:15000});
    if(name==='b2'){
     await page.waitForTimeout(250);
     const before=await page.locator('#view3d2025 canvas').screenshot();
     await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-b2-3d-schritt1.png',fullPage:true,animations:'disabled'});
     await page.locator('#next').click();await page.locator('#next').click();
     await page.waitForTimeout(250);
     const after=await page.locator('#view3d2025 canvas').screenshot();
     if(before.equals(after))throw Error('B2: 3D-Modell wird bei der Konstruktion nicht vervollständigt');
     await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-b2-3d-schritt3.png',fullPage:true,animations:'disabled'});
    }
    // Echter OrbitControls-Bewegungstest – Mausschleppung bzw. Touchgeste.
    const canvas=page.locator('#view3d2025 canvas');
    const box=await canvas.boundingBox();
    if(!box||box.width<150||box.height<150)throw Error(name+': 3D-Canvas nicht groß genug für Drehgeste');
    const x0=box.x+box.width*.42,y0=box.y+box.height*.44,x1=x0+Math.min(110,box.width*.25),y1=y0+Math.min(65,box.height*.16);
    await page.waitForTimeout(350);
    const beforeOrbit=await canvas.screenshot({animations:'disabled'});
    if(mode.isMobile){
      const cdp=await context.newCDPSession(page);
      await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x0,y:y0,id:1,radiusX:3,radiusY:3}]});
      for(let k=1;k<=8;k++){
        await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x0+(x1-x0)*k/8,y:y0+(y1-y0)*k/8,id:1,radiusX:3,radiusY:3}]});
        await page.waitForTimeout(35);
      }
      await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      await cdp.detach();
    }else{
      await page.mouse.move(x0,y0);
      await page.mouse.down();
      for(let k=1;k<=8;k++)await page.mouse.move(x0+(x1-x0)*k/8,y0+(y1-y0)*k/8,{steps:1});
      await page.mouse.up();
    }
    await page.waitForTimeout(450);
    const afterOrbit=await canvas.screenshot({animations:'disabled'});
    if(beforeOrbit.equals(afterOrbit))throw Error(name+': 3D-Körper reagiert nicht auf '+(mode.isMobile?'Touchgeste':'Mausdrehen'));
    await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-'+name+'-orbit.png',fullPage:true,animations:'disabled'});
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
  }catch(e){
    try{
      const diagnostic=await page.evaluate(()=>{
        const b=document.querySelector('#next');if(!b)return {reason:'no next'};
        const q=b.getBoundingClientRect(),x=q.left+q.width/2,y=q.top+q.height/2;
        const onTop=document.elementFromPoint(x,y);
        return {rect:{x:q.x,y:q.y,w:q.width,h:q.height},hit:onTop?.outerHTML.slice(0,250),scrollY:window.scrollY,scrollWidth:document.documentElement.scrollWidth,viewportWidth:window.innerWidth};
      });
      console.error('DIAGNOSE '+mode.label+' '+name+' '+JSON.stringify(diagnostic));
      await page.screenshot({path:OUT+'/r'+round+'-'+mode.label+'-'+name+'-fehler.png',fullPage:true,animations:'disabled',timeout:8000});
    }catch(secondary){console.error('DIAGNOSE nicht möglich: '+secondary.message)}
    issues.push(mode.label+' '+name+': '+e.message);
    console.error('FEHLER '+mode.label+' '+name+': '+e.message);
   }
  finally{await page.close()}
 }
 await context.close();
}
await browser.close();
if(issues.length){console.error('\nOFFENE BROWSERFEHLER ('+issues.length+'):\n'+issues.join('\n'));process.exitCode=1;}
else console.log('\nBrowserkontrolle bestanden: 3 unabhängige Wiederholungen × 7 Aufgaben × 2 Viewports, inklusive Aufgabennavigation und 3D-Umschaltung.');
