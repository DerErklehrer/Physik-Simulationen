import {chromium} from 'playwright';import {mkdir} from 'node:fs/promises';
const out=process.env.QA_OUT||'/tmp/20xx-m1-b34-qa',base=process.env.QA_BASE||'http://127.0.0.1:8765',numbers=(process.env.QA_TASKS||'3').split(',').map(Number);await mkdir(out,{recursive:true});const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const failures=[];let passed=0;
for(let round=1;round<=3;round++)for(const mode of ['desktop','mobile'])for(const n of numbers){const mobile=mode==='mobile',ctx=await browser.newContext({viewport:{width:mobile?390:1366,height:mobile?844:900},isMobile:mobile,hasTouch:mobile}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});try{
await p.goto(base+'/abschlusspruefung/20xx/muster1/b'+n+'.html',{waitUntil:'networkidle'});
const ready=async()=>{await p.waitForFunction(()=>['intro','statement','solution','measure'].every(id=>{let e=document.getElementById(id),s=String.fromCharCode(92);return !e.innerText.includes(s+'(')&&!e.innerText.includes(s+'[')}));await p.waitForFunction(()=>Array.from(document.querySelectorAll('[data-math-label]')).every(e=>e.querySelector('svg')));if(await p.locator('[data-mml-node="merror"],mjx-merror').count())throw Error('MathJax');for(const id of ['intro','statement','solution','measure']){if(await p.locator('#'+id).evaluate(e=>e.scrollWidth>e.clientWidth+3))throw Error('Überbreite '+id);if(await p.locator('#'+id+' mjx-container').evaluateAll(es=>es.some(e=>e.scrollWidth>e.clientWidth+3)))throw Error('Formel zu breit '+id+' '+await p.locator('#count').innerText())}if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))throw Error('Seite zu breit');if(await p.locator('#plot [data-math-label]').evaluateAll(es=>es.some(e=>{const b=e.getBBox();return b.x<-.5||b.y<-.5||b.x+b.width>640.5||b.y+b.height>540.5})))throw Error('Grafikformel außerhalb')},shot=async name=>{await ready();await p.screenshot({path:out+'/r'+round+'-'+mode+'-b'+n+'-'+name+'.png',fullPage:true})},parts=p.locator('#parts button');
for(let i=0;i<await parts.count();i++){await parts.nth(i).click();const count=Number((await p.locator('#count').innerText()).match(/von (\d+)/)[1]);for(let j=0;j<count;j++){if(j)await p.locator('#next').click();await ready();if(round===3)await shot('teil'+(i+1)+'-schritt'+(j+1))}await p.locator('#reset').click();if(!await p.locator('#prev').isDisabled())throw Error('Reset')}
if(n===3){await parts.nth(2).click();for(let j=0;j<3;j++)await p.locator('#next').click();if(await p.locator('[data-rhombus]').count()!==2)throw Error('Beide Originalrauten fehlen');await shot('originalrauten');await parts.nth(3).click();for(let j=0;j<3;j++)await p.locator('#next').click();for(const x of [-.6,0,5,7.5]){await p.locator('#xval').evaluate((e,x)=>{e.value=x;e.dispatchEvent(new Event('input'))},x);await ready();const g=await p.evaluate(()=>geometry(state().x));if(Math.abs(g.m-Math.log(g.x*g.x+4*g.x+3)/Math.log(3))>1e-8)throw Error('Mittelpunktkopplung');await shot('x'+String(x).replace('.','_'))}await p.locator('#xroot').click();if(Math.abs(await p.evaluate(()=>geometry(state().x).m))>1e-9)throw Error('Exakter Wurzelwert');await shot('mittelpunkt-achse');await parts.nth(4).click();for(let j=0;j<5;j++)await p.locator('#next').click();await shot('ergebnis');await parts.nth(0).click();if(await p.locator('[data-rhombus],[data-curve="f2"]').count())throw Error('Spätere Objekte bleiben')}

if(n===4){
 await parts.nth(4).click();if(await p.evaluate(()=>state().pointName)!=='1')throw Error('Zielwinkel vorzeitig sichtbar');
 await parts.nth(2).click();for(let j=0;j<5;j++)await p.locator('#next').click();
 await p.locator('#minimum').click();await ready();
 const minimum=await p.evaluate(()=>({st:state(),g:geometry(state().phi)}));
 if(minimum.st.pointName!=='0'||Math.abs(minimum.g.eq-40/Math.sqrt(89))>1e-9||Math.abs(minimum.g.nq-64/Math.sqrt(89))>1e-9)throw Error('Minimum / Lotfuß');
 await shot('minimum');
 await parts.nth(3).click();for(let j=0;j<4;j++)await p.locator('#next').click();await shot('pyramide45');
 for(const phi of [.1,45,57.99]){
  await p.locator('#phi').evaluate((e,phi)=>{e.value=phi;e.dispatchEvent(new Event('input'))},phi);await ready();
  const g=await p.evaluate(()=>geometry(state().phi));if(g.P[0]<=0||g.P[0]>=8||g.volume<=0||g.volume>=20)throw Error('Randlage');
  await shot('phi'+String(phi).replace('.','_'));
 }
 await parts.nth(4).click();for(let j=0;j<5;j++)await p.locator('#next').click();await p.locator('#target').click();await ready();
 if(Math.abs(await p.evaluate(()=>geometry(state().phi).volume)-12)>1e-9)throw Error('95-Prozent-Kopplung');
 await shot('zielvolumen');
 for(const i of [0,1,2,3,4]){
  await parts.nth(i).click();const count=Number((await p.locator('#count').innerText()).match(/von (\d+)/)[1]);for(let j=1;j<count;j++)await p.locator('#next').click();
  await p.locator('#threeD').click();await p.waitForFunction(()=>window.exam20xxB4Three?.snapshot());await p.waitForTimeout(200);
  if(!await p.locator('#view3d canvas').isVisible())throw Error('3D Canvas');
  const snap=await p.evaluate(()=>window.exam20xxB4Three.snapshot());if(!snap.orthographic||snap.part!==i)throw Error('3D Status');
  if(Math.abs(snap.geometry.volume-await p.evaluate(()=>geometry(state().phi).volume))>1e-9)throw Error('3D Kopplung');
  if(round===3)await shot('3d-teil'+(i+1));
  if(i===3){
   const b=await p.locator('#view3d canvas').boundingBox(),before=snap.position;
   if(mobile){const cdp=await ctx.newCDPSession(p);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:b.x+b.width*.5,y:b.y+b.height*.5}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:b.x+b.width*.7,y:b.y+b.height*.6}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await cdp.detach()}
   else{await p.mouse.move(b.x+b.width*.5,b.y+b.height*.5);await p.mouse.down();await p.mouse.move(b.x+b.width*.7,b.y+b.height*.6,{steps:8});await p.mouse.up()}
   await p.waitForTimeout(250);const after=await p.evaluate(()=>window.exam20xxB4Three.snapshot().position);if(Math.hypot(...after.map((x,k)=>x-before[k]))<.1)throw Error('3D Drehung');
   await shot('3d-gedreht');await p.locator('#top').click();await p.waitForTimeout(250);const top=await p.evaluate(()=>window.exam20xxB4Three.snapshot());if(!top.top||!top.orthographic||Math.abs(top.position[1]-top.target[1])<20)throw Error('Draufsicht');await shot('3d-draufsicht');await p.locator('#cameraReset').click();if(await p.evaluate(()=>window.exam20xxB4Three.snapshot().top))throw Error('Kamera Reset');
  }
  await p.locator('#twoD').click();
 }
 await parts.nth(0).click();if(await p.evaluate(()=>state().showQ))throw Error('Frühe Figur zeigt Q');
}
if(mobile){await p.locator('#figureScroll').evaluate(e=>e.scrollLeft=e.scrollWidth);if(await p.locator('#figureScroll').evaluate(e=>e.scrollLeft)<100)throw Error('Wischen');await p.locator('#overview').click();await shot('gesamt');await p.locator('#overview').click()}
if(errors.length)throw Error(errors.join(';'));console.log('OK '+round+' '+mode+' B'+n);passed++;
}catch(e){failures.push(round+' '+mode+' B'+n+': '+e.message);await p.screenshot({path:out+'/r'+round+'-'+mode+'-b'+n+'-fehler.png',fullPage:true}).catch(()=>{})}await ctx.close()}
await browser.close();if(failures.length){console.error(failures.join('\n'));process.exitCode=1}else console.log(passed+'/'+(numbers.length*6)+' Browserfälle bestanden.');
