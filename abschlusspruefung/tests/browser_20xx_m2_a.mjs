import {chromium} from 'playwright';import {mkdir} from 'node:fs/promises';
const out=process.env.QA_OUT||'/tmp/20xx-m2-a-qa',base=process.env.QA_BASE||'http://127.0.0.1:8765';await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});let passed=0;const failures=[];
for(let round=1;round<=3;round++)for(const mode of ['desktop','mobile'])for(let n=1;n<=4;n++){
 const mobile=mode==='mobile',ctx=await browser.newContext({viewport:{width:mobile?390:1366,height:mobile?844:900},isMobile:mobile,hasTouch:mobile}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 try{
 await p.goto(base+'/abschlusspruefung/20xx/muster2/a'+n+'.html',{waitUntil:'networkidle'});
 const ready=async()=>{await p.waitForFunction(()=>['intro','statement','solution','measure'].every(id=>{const e=document.getElementById(id),s=String.fromCharCode(92);return !e.innerText.includes(s+'(')&&!e.innerText.includes(s+'[')}));await p.waitForFunction(()=>Array.from(document.querySelectorAll('[data-math-label]')).every(e=>e.querySelector('svg')));
 if(await p.locator('mjx-merror,[data-mml-node="merror"]').count())throw Error('MathJax');
 for(const id of ['intro','statement','solution','measure']){if(await p.locator('#'+id).evaluate(e=>e.scrollWidth>e.clientWidth+3))throw Error('Überbreite '+id+' '+await p.locator('#count').innerText());if(await p.locator('#'+id+' mjx-container').evaluateAll(es=>es.some(e=>e.scrollWidth>e.clientWidth+3)))throw Error('Formelüberbreite '+id+' '+await p.locator('#count').innerText())}
 if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))throw Error('Seite zu breit');
 if(await p.locator('#plot [data-math-label]').evaluateAll(es=>es.some(e=>{const b=e.getBBox();return b.x<-.5||b.y<-.5||b.x+b.width>640.5||b.y+b.height>540.5})))throw Error('Grafikformel außerhalb');
 if(await p.locator('.original img').evaluateAll(es=>es.some(e=>!e.complete||e.naturalWidth===0)))throw Error('Originalabbildung fehlt')};
 const shot=async name=>{await ready();await p.screenshot({path:out+'/r'+round+'-'+mode+'-a'+n+'-'+name+'.png',fullPage:true})},parts=p.locator('#parts button');
 for(let i=0;i<await parts.count();i++){await parts.nth(i).click();const count=Number((await p.locator('#count').innerText()).match(/von (\d+)/)[1]);for(let j=0;j<count;j++){if(j)await p.locator('#next').click();await ready();if(round===3)await shot('teil'+(i+1)+'-schritt'+(j+1))}await p.locator('#reset').click();if(!await p.locator('#prev').isDisabled())throw Error('Reset')}
 const config={1:{id:'bval',key:'b',parts:[0,1],values:[-6,2,6,8],chosen:2,reset:i=>i===0?0:6},2:{id:'arrangement',key:'index',parts:[0],values:[1,60,120],chosen:60,reset:()=>0},3:{id:'phi',key:'phi',parts:[0],values:[1,60,90,179],chosen:90,reset:()=>60},4:{id:'fill',key:'fill',parts:[0],values:[0,7.1,7.2,8,9],chosen:7.1,reset:()=>8}}[n];
 if(n!==2)for(const i of config.parts){await parts.nth(i).click();if(!await p.locator('#'+config.id).isVisible())throw Error('Regler nicht sofort verfügbar');const original=await p.locator('#solution').innerText();
 for(const value of config.values){await p.locator('#'+config.id).evaluate((e,value)=>{e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}))},value);await ready();const current=await p.evaluate(key=>state()[key],config.key);if(Math.abs(current-(n===2?value-1:value))>1e-8)throw Error('Reglerkopplung');if(round===3)await shot('parameter-'+i+'-'+String(value).replace('.','_'))}
 if(await p.locator('#solution').innerText()!==original)throw Error('Originalrechnung überschrieben');
 await p.locator('#'+config.id).evaluate((e,value)=>{e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}))},config.chosen);
 while(!await p.locator('#next').isDisabled()){await p.locator('#next').click();await ready();if(Math.abs(await p.evaluate(key=>state()[key],config.key)-(n===2?config.chosen-1:config.chosen))>1e-8)throw Error('Reglerwert beim Schrittwechsel verloren')}
 await p.locator('#prev').click();await ready();if(Math.abs(await p.evaluate(key=>state()[key],config.key)-(n===2?config.chosen-1:config.chosen))>1e-8)throw Error('Wert beim Zurückblättern verloren');
 await p.locator('#reset').click();await ready();if(Math.abs(await p.evaluate(key=>state()[key],config.key)-config.reset(i))>1e-8)throw Error('Modellreset')}
 if(n===1){await p.locator('#originalB').click();if(Math.abs(await p.evaluate(()=>f(10,state().b))-12)>1e-9)throw Error('Punktbedingung');await parts.nth(1).click();for(let j=0;j<3;j++)await p.locator('#next').click();await shot('wertemenge')}
 if(n===2){
  await parts.nth(0).click();
  for(const value of [3,1,5,2,4]){await p.locator('[data-card="'+value+'"]').click();await ready()}
  const st=await p.evaluate(()=>state());if(st.chosen.join(',')!=='3,1,5,2,4'||st.remaining!==0||st.total!==120)throw Error('Karten ohne Zurücklegen');
  if(await p.locator('#cardChoices button:disabled').count()!==5)throw Error('Karte doppelt verfügbar');
  for(let j=0;j<5;j++){await p.locator('#next').click();await ready();if((await p.evaluate(()=>state().chosen)).join(',')!=='3,1,5,2,4')throw Error('Karten beim Schrittwechsel verloren')}
  if(await p.locator('[data-choice-count]').count()!==5)throw Error('Zählspalten fehlen');await shot('zaehlprinzip');
  await p.locator('#undoCard').click();if(await p.locator('[data-card="4"]').isDisabled())throw Error('Rücknahme');
  await p.locator('#clearCards').click();if(await p.evaluate(()=>state().chosen.length)!==0)throw Error('Leeren');
  await p.locator('#reset').click();if(await p.evaluate(()=>state().step)!==0)throw Error('Reset');
  if(await p.locator('#arrangement').count())throw Error('Alter 120-Fälle-Regler');
 }
 if(n===3){await p.locator('#square90').click();if(Math.abs(await p.evaluate(()=>geometry(state().phi).L)-2.5)>1e-9)throw Error('Sonderfall90');await shot('quadrat90')}
 if(n===4){
 for(let j=0;j<6;j++)await p.locator('#next').click();await p.locator('#minFill').click();await ready();if(Math.abs(await p.evaluate(()=>geometry(state().fill).ratio)-.8)>1e-9)throw Error('80 Prozent');await shot('minimum80');await p.locator('#originalFill').click();await shot('original8');
 await p.locator('#threeD').click();await p.waitForFunction(()=>window.muster2A4Three?.snapshot());await p.locator('#view3d canvas').scrollIntoViewIfNeeded();await p.waitForTimeout(150);await shot('3d');
 const b=await p.locator('#view3d canvas').boundingBox(),before=await p.evaluate(()=>window.muster2A4Three.snapshot().position);
 if(mobile){const c=await ctx.newCDPSession(p);await c.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:b.x+b.width*.45,y:b.y+b.height*.5}]});await c.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:b.x+b.width*.65,y:b.y+b.height*.6}]});await c.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await c.detach()}else{await p.mouse.move(b.x+b.width*.45,b.y+b.height*.5);await p.mouse.down();await p.mouse.move(b.x+b.width*.65,b.y+b.height*.6,{steps:8});await p.mouse.up()}
 await p.waitForTimeout(200);const after=await p.evaluate(()=>window.muster2A4Three.snapshot().position);if(Math.hypot(...after.map((v,k)=>v-before[k]))<.1)throw Error('3D Drehung');await shot('3d-gedreht');
 for(const fill of [0,7.2,9]){await p.locator('#fill').evaluate((e,value)=>{e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}))},fill);await ready();const s=await p.evaluate(()=>window.muster2A4Three.snapshot());if(Math.abs(s.fill-fill)>1e-9||Math.abs(s.geometry.fill-fill)>1e-9)throw Error('3D Füllkopplung');await shot('3d-fuellung'+fill)}
 await p.locator('#top').click();const top=await p.evaluate(()=>window.muster2A4Three.snapshot());if(!top.top||!top.orthographic||Math.abs(top.position[1]-top.target[1])<10)throw Error('Draufsicht');await shot('draufsicht');await p.locator('#cameraReset').click();if(await p.evaluate(()=>window.muster2A4Three.snapshot().top))throw Error('Kamerareset');await p.locator('#twoD').click();
 }
 if(mobile){if(n===2)await p.locator('#overview').click();await p.locator('#figureScroll').evaluate(e=>e.scrollLeft=e.scrollWidth);if(await p.locator('#figureScroll').evaluate(e=>e.scrollLeft)<100)throw Error('Wischen');await p.locator('#overview').click();await shot('gesamt');await p.locator('#overview').click()}
 if(errors.length)throw Error(errors.join(';'));passed++;console.log('OK '+round+' '+mode+' A'+n);
 }catch(e){failures.push(round+' '+mode+' A'+n+': '+e.message);await p.screenshot({path:out+'/r'+round+'-'+mode+'-a'+n+'-fehler.png',fullPage:true}).catch(()=>{})}
 await ctx.close();
}
await browser.close();if(failures.length){console.error(failures.join('\n'));process.exitCode=1}else console.log(passed+'/24 Browserfälle Musterprüfung 2 A bestanden.');
