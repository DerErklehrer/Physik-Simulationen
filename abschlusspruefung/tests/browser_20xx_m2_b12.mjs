import {chromium} from 'playwright';import {mkdir} from 'node:fs/promises';
const out=process.env.QA_OUT||'/tmp/20xx-m2-b12-qa',base=process.env.QA_BASE||'http://127.0.0.1:8765';await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});let passed=0;const failures=[];
for(let round=1;round<=3;round++)for(const mode of ['desktop','mobile'])for(let n=1;n<=2;n++){
 const mobile=mode==='mobile',ctx=await browser.newContext({viewport:{width:mobile?390:1366,height:mobile?844:900},isMobile:mobile,hasTouch:mobile}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 try{
 await p.goto(base+'/abschlusspruefung/20xx/muster2/b'+n+'.html',{waitUntil:'networkidle'});
 const ready=async()=>{await p.waitForFunction(()=>['intro','statement','solution','measure'].every(id=>{const e=document.getElementById(id),s=String.fromCharCode(92);return !e.innerText.includes(s+'(')&&!e.innerText.includes(s+'[')}));await p.waitForFunction(()=>Array.from(document.querySelectorAll('[data-math-label]')).every(e=>e.querySelector('svg')));
 if(await p.locator('mjx-merror,[data-mml-node="merror"]').count())throw Error('MathJax');
 for(const id of ['intro','statement','solution','measure']){if(await p.locator('#'+id).evaluate(e=>e.scrollWidth>e.clientWidth+3))throw Error('Überbreite '+id+' '+await p.locator('#count').innerText());if(await p.locator('#'+id+' mjx-container').evaluateAll(es=>es.some(e=>e.scrollWidth>e.clientWidth+3)))throw Error('Formelüberbreite '+id+' '+await p.locator('#count').innerText())}
 if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))throw Error('Seite zu breit');
 if(await p.locator('#plot [data-math-label]').evaluateAll(es=>es.some(e=>{const b=e.getBBox();return b.x<-.5||b.y<-.5||b.x+b.width>640.5||b.y+b.height>540.5})))throw Error('Grafikformel außerhalb');
 if(await p.locator('.original img').evaluateAll(es=>es.some(e=>!e.complete||e.naturalWidth===0)))throw Error('Originalabbildung fehlt')};
 const shot=async name=>{await ready();await p.screenshot({path:out+'/r'+round+'-'+mode+'-b'+n+'-'+name+'.png',fullPage:true})},parts=p.locator('#parts button');
 for(let i=0;i<await parts.count();i++){await parts.nth(i).click();const count=Number((await p.locator('#count').innerText()).match(/von (\d+)/)[1]);for(let j=0;j<count;j++){if(j)await p.locator('#next').click();await ready();await shot('teil'+(i+1)+'-schritt'+(j+1))}await p.locator('#reset').click();if(!await p.locator('#prev').isDisabled())throw Error('Reset')}

 for(let i=0;i<await parts.count();i++){
  await parts.nth(i).click();const original=await p.locator('#solution').innerText();
  const settings=n===1?[['xval','x',[.2,3,6,8],5,6]]:[['defect','p',[0,20,100],40,.2],['miss','miss',[0,30,100],15,.3],['clean','clean',[0,85,100],60,.85]];
  for(const [id,key,values]of settings){if(!await p.locator('#'+id).isVisible())throw Error('Regler fehlt anfangs: '+id);for(const value of values){await p.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}))},value);await ready();const actual=await p.evaluate(k=>state()[k],key);if(Math.abs(actual-(n===1?value:value/100))>1e-8)throw Error('Reglerkopplung '+id);await shot('teil'+(i+1)+'-'+id+'-'+String(value).replace('.','_'))}}
  if(await p.locator('#solution').innerText()!==original)throw Error('Originalrechnung überschrieben');
  for(const [id,key,values,chosen]of settings)await p.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}))},chosen);
  const checkValues=async()=>{const st=await p.evaluate(()=>state());for(const [id,key,values,chosen]of settings)if(Math.abs(st[key]-(n===1?chosen:chosen/100))>1e-8)throw Error('Wert bei Schrittwechsel verloren: '+id)};
  while(!await p.locator('#next').isDisabled()){await p.locator('#next').click();await ready();await checkValues()}
  await p.locator('#prev').click();await ready();await checkValues();await p.locator('#reset').click();await ready();
  const st=await p.evaluate(()=>state());for(const [id,key,values,chosen,expected]of settings)if(Math.abs(st[key]-expected)>1e-8)throw Error('Reset '+id);
 }
 if(n===1){
  await parts.nth(0).click();await p.locator('#originalX').click();for(let j=0;j<3;j++)await p.locator('#next').click();await shot('original6');
  const a=await p.evaluate(()=>geometry(state().x));if(Math.abs(a.y-1.9375)>1e-9)throw Error('OriginalC1');
  await parts.nth(1).click();for(let j=0;j<8;j++)await p.locator('#next').click();await shot('gleichschenklig3');
  const g=await p.evaluate(()=>geometry(state().x));if(Math.abs(g.area-4.5)>1e-9||Math.abs(g.ab-g.ac)>1e-9)throw Error('Gleichschenklig/Fläche');
  await p.locator('#originalX').click();await ready();await p.locator('#isosceles').click();if(Math.abs(await p.evaluate(()=>state().x)-3)>1e-9)throw Error('Sonderlage');
 }else{
  await parts.nth(0).click();for(let j=0;j<4;j++)await p.locator('#next').click();await shot('baum-vollstaendig');
  await parts.nth(1).click();for(let j=0;j<5;j++)await p.locator('#next').click();await shot('original82');
  for(const [miss,clean,expected]of [[100,0,0],[0,100,1],[30,85,.82]]){for(const [id,value]of [['miss',miss],['clean',clean]])await p.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}))},value);await ready();const actual=await p.evaluate(()=>{const s=state();return probabilities(s.p,s.miss,s.clean).correct});if(Math.abs(actual-expected)>1e-9)throw Error('Bedingte Wahrscheinlichkeiten');await shot('richtig-'+expected)}
  await p.locator('#originalRates').click();await ready();const s=await p.evaluate(()=>state());if(s.p!==.2||s.miss!==.3||s.clean!==.85)throw Error('Originalanteile');
 }
 if(mobile){await p.locator('#figureScroll').evaluate(e=>e.scrollLeft=e.scrollWidth);if(await p.locator('#figureScroll').evaluate(e=>e.scrollLeft)<100)throw Error('Wischen');await p.locator('#overview').click();await shot('gesamt');await p.locator('#overview').click()}
 if(errors.length)throw Error(errors.join(';'));passed++;console.log('OK '+round+' '+mode+' B'+n);
 }catch(e){failures.push(round+' '+mode+' B'+n+': '+e.message);await p.screenshot({path:out+'/r'+round+'-'+mode+'-b'+n+'-fehler.png',fullPage:true}).catch(()=>{})}
 await ctx.close();
}
await browser.close();if(failures.length){console.error(failures.join('\n'));process.exitCode=1}else console.log(passed+'/12 Browserfälle Musterprüfung 2 B1/B2 bestanden.');
