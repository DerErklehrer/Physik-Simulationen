import {chromium} from 'playwright';import {mkdir} from 'node:fs/promises';
const out=process.env.QA_OUT||'/tmp/m2-b3-qa',base=process.env.QA_BASE||'http://127.0.0.1:8765';await mkdir(out,{recursive:true});const browser=await chromium.launch({headless:true});let passed=0;const failures=[];
for(let round=1;round<=3;round++)for(const mode of ['desktop','mobile']){
 const mobile=mode==='mobile',c=await browser.newContext({viewport:{width:mobile?390:1366,height:mobile?844:900},isMobile:mobile,hasTouch:mobile}),p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 try{
 await p.goto(base+'/abschlusspruefung/20xx/muster2/b3.html',{waitUntil:'networkidle'});
 const ready=async()=>{await p.waitForFunction(()=>['intro','statement','solution','measure'].every(id=>{const s=String.fromCharCode(92),e=document.getElementById(id);return !e.innerText.includes(s+'(')&&!e.innerText.includes(s+'[')}));await p.waitForFunction(()=>Array.from(document.querySelectorAll('[data-math-label]')).every(e=>e.querySelector('svg')));
 if(await p.locator('mjx-merror,[data-mml-node="merror"]').count())throw Error('MathJax');
 for(const id of ['intro','statement','solution','measure']){if(await p.locator('#'+id).evaluate(e=>e.scrollWidth>e.clientWidth+3))throw Error('Überbreite '+id+' '+await p.locator('#count').innerText());if(await p.locator('#'+id+' mjx-container').evaluateAll(es=>es.some(e=>e.scrollWidth>e.clientWidth+3)))throw Error('Formelüberbreite '+id)}
 if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))throw Error('Seite zu breit');
 if(await p.locator('#plot [data-math-label]').evaluateAll(es=>es.some(e=>{const b=e.getBBox();return b.x<0||b.y<0||b.x+b.width>640.5||b.y+b.height>540.5})))throw Error('Grafikformel außerhalb')};
 const shot=async name=>{await ready();await p.screenshot({path:out+'/r'+round+'-'+mode+'-'+name+'.png',fullPage:true})},parts=p.locator('#parts button');
 if(await parts.count()!==6)throw Error('Teilaufgaben fehlen');
 for(let i=0;i<6;i++){
 await parts.nth(i).click();if(!await p.locator('#xval').isVisible())throw Error('Regler nicht sofort zugänglich');const count=Number((await p.locator('#count').innerText()).match(/von (\d+)/)[1]);
 for(let j=0;j<count;j++){if(j)await p.locator('#next').click();await ready();if(round===3)await shot('teil'+(i+1)+'-schritt'+(j+1))}
 await p.locator('#reset').click();const original=await p.locator('#solution').innerText();await p.locator('#xval').evaluate(e=>{e.value=8;e.dispatchEvent(new Event('input',{bubbles:true}))});await ready();if(original!==await p.locator('#solution').innerText())throw Error('Originalrechnung überschrieben');
 while(!await p.locator('#next').isDisabled()){await p.locator('#next').click();await ready();if(Math.abs(await p.evaluate(()=>state().x)-8)>1e-9)throw Error('Reglerwert beim Schrittwechsel verloren')}
 await p.locator('#prev').click();await ready();if(Math.abs(await p.evaluate(()=>state().x)-8)>1e-9)throw Error('Reglerwert beim Zurückblättern verloren');
 for(const x of [1.51,2.5,6.5,13.99]){await p.locator('#xval').evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}))},x);await ready();if(Math.abs(await p.evaluate(()=>state().x)-x)>1e-9)throw Error('Regler');if(round===3&&[0,4,5].includes(i))await shot('teil'+(i+1)+'-x'+x)}
 await p.locator('#reset').click();await ready();if(!await p.locator('#prev').isDisabled())throw Error('Reset');const expected=i===5?37/8:2.5;if(Math.abs(await p.evaluate(()=>state().x)-expected)>1e-9)throw Error('Modellreset');
 }
 for(const [i,key,value]of [[3,'D',-3.75],[4,'half',35],[5,'half',45]]){
 await parts.nth(i).click();while(!await p.locator('#next').isDisabled())await p.locator('#next').click();await ready();await p.locator('#special').click();await ready();const actual=await p.evaluate(key=>{const g=geometry(state().x);return key==='D'?g.D[0]:g.half},key);if(Math.abs(actual-value)>1e-8)throw Error('Sonderlage '+i);await shot('sonderlage'+(i+1));}
 if(mobile){await p.locator('#figureScroll').evaluate(e=>e.scrollLeft=e.scrollWidth);if(await p.locator('#figureScroll').evaluate(e=>e.scrollLeft)<100)throw Error('Wischen');await p.locator('#overview').click();await shot('gesamt');await p.locator('#overview').click()}
 if(errors.length)throw Error(errors.join(';'));passed++;console.log('OK '+round+' '+mode+' B3');
 }catch(e){failures.push(round+' '+mode+': '+e.message);await p.screenshot({path:out+'/r'+round+'-'+mode+'-fehler.png',fullPage:true}).catch(()=>{})}await c.close();
}
await browser.close();if(failures.length){console.error(failures.join('\n'));process.exitCode=1}else console.log(passed+'/6 Browserfälle Musterprüfung 2 B3 bestanden.');
