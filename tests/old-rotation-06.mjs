import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';
import {geometry06} from '../mathematik-realschule/alte-ap-aufgaben/rotationskoerper/shared-1314/geometry-06.js';
import {tasks06} from '../mathematik-realschule/alte-ap-aufgaben/rotationskoerper/shared-1314/tasks-06.js';

const folder='/mathematik-realschule/alte-ap-aufgaben/rotationskoerper/';
const origin=process.env.QA_BASE || 'http://127.0.0.1:8765';
const out='/tmp/old-rotation-06';
const cases=[
  {key:'2006-ht-ii',file:'2006-ht-ii-p1.html',result:'300,2',labels:'ABCDEM', components:['cone','hemisphere','ring']},
  {key:'2006-nt-ii',file:'2006-nt-ii-p3.html',result:'874,0',labels:'ABCDEFM', components:['shell','cavity','ring']},
];
const near=(a,b,tol=1e-8)=>assert(Math.abs(a-b)<tol,a+' vs. '+b);
const volumeOf=points=>Math.abs(points.reduce((sum,[r,y],i)=>{
  const [s,z]=points[(i+1)%points.length];
  return sum+(z-y)*(r*r+r*s+s*s);
},0)*Math.PI/3);
function verifyGeometry(){
  const p=Math.PI;
  assert.equal((p*(6*8+2*3.4**2+(6**2-3.4**2))).toFixed(1),'300.2');
  assert.equal((p*(5.5*26+5.3*25.1+(5.5**2-5.3**2))).toFixed(1),'874.0');
  for(const c of cases){
    const g=geometry06(c.key);
    assert.deepEqual(tasks06[c.key].parts.map(part=>part.points),[5]);
    near(volumeOf(g.profile),g.volume,.008);
    near(g.decomposition.parts.reduce((sum,part)=>sum+volumeOf(part.profile),0),g.volume,.008);
    assert(g.surface>0);
  }
  const dome=geometry06('2006-ht-ii');
  near(Math.atan(dome.h/dome.R)*180/p,40.7);
  near(Math.hypot(dome.R,dome.h),dome.side);
  near(dome.maxY-dome.h,3.4);
  const shell=geometry06('2006-nt-ii');
  near(Math.hypot(shell.R,shell.h),26);
  near(shell.h/shell.R,(shell.h-shell.tip)/shell.r);
  near(Math.hypot(shell.r,shell.h-shell.tip),shell.innerSide);
  assert.equal(shell.innerSide.toFixed(1),'25.1');
}

await mkdir(out,{recursive:true});
const browser=await chromium.launch({args:['--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
  for(let pass=1;pass<=3;pass++){
    verifyGeometry();
    for(const mobile of [false,true]){
      const context=await browser.newContext({viewport:{width:mobile?390:1366,height:900},isMobile:mobile,hasTouch:mobile});
      const page=await context.newPage();
      const errors=[];
      page.on('pageerror',error=>errors.push(error.message));
      const state=()=>page.evaluate(()=>window.oldRotationState());
      const click=id=>page.locator('#'+id).click();
      const input=(id,value)=>page.locator('#'+id).evaluate((el,v)=>{
        el.value=String(v);
        el.dispatchEvent(new Event('input',{bubbles:true}));
      },value);
      const math=async()=>{
        await page.waitForFunction(()=>document.querySelector('#solution mjx-container'));
        assert.equal(await page.locator('mjx-merror,[data-mjx-error]').count(),0);
      };
      await page.goto(origin+folder);
      assert.equal(await page.locator('a.task-card').count(),28);
      assert.equal(await page.locator('article.task-card').count(),0);
      for(const c of cases){
        await page.locator('a.task-card[href="'+c.file+'"]').click();
        await page.waitForFunction(()=>typeof window.oldRotationState==='function');
        await math();
        assert.equal(await page.locator('#phi').isVisible(),false);
        assert.equal(await page.locator('#cutaway').isVisible(),false);
        assert.equal(await page.locator('a[href$=".pdf"]').count(),0);
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
        assert.equal(await page.locator('#parts button').count(),1);
        const labels=await page.locator('#plot text').allTextContents();
        for(const label of c.labels)assert(labels.includes(label),label);
        assert(await page.locator('#legend').textContent().then(text=>text.includes('Kreisring')));
        for(let step=0;step<tasks06[c.key].parts[0].steps.length;step++){
          await math();
          assert.equal((await state()).step,step);
          assert(await page.locator('#solution mjx-container').first().isVisible());
          assert(!(await page.locator('#plot').innerHTML()).includes('NaN'));
          if(!await page.locator('#next').isDisabled())await click('next');
        }
        const rendered=await page.locator('#solution').evaluate(node=>{
          return node.textContent+' '+MathJax.startup.document.getMathItemsWithin(node).map(item=>item.math).join(' ');
        });
        assert(rendered.includes(c.result)||rendered.includes(c.result.replace(',','{,}')),c.file+' '+rendered);
        await click('reset');
        await click('view3');
        await page.waitForFunction(()=>window.oldRotationState().three?.meshes>0);
        assert((await state()).three.orthographic);
        assert.equal(await page.locator('#sweep').inputValue(),'360');
        assert.equal(await page.locator('#cutaway').textContent(),'Ein Viertel herausschneiden');
        await click('cutaway');
        assert.equal((await state()).sweep,270);
        assert.equal(await page.locator('#cutaway').textContent(),'Körper schließen');
        assert((await state()).three.materials.some(m=>m.component.endsWith('-cut')));
        assert.equal(new Set((await state()).three.materials.map(m=>m.color)).size,1);
        await page.locator('#componentColors').check();
        assert(new Set((await state()).three.materials.map(m=>m.color)).size>=2);
        const surfaces=(await state()).three.materials;
        for(const component of c.components)assert(surfaces.some(m=>m.component===component),component);
        assert.equal(new Set(surfaces.filter(m=>c.components.includes(m.component)).map(m=>m.color)).size,3);
        for(const sweep of [0,90,270,360]){
          await input('sweep',sweep);
          assert.equal((await state()).sweep,sweep);
          assert((await state()).three.meshes>0);
        }
        await click('top');
        assert((await state()).three.position[1]>0);
        await click('bottom');
        assert((await state()).three.position[1]<0);
        await click('cameraReset');
        const canvas=page.locator('#canvas');
        await canvas.scrollIntoViewIfNeeded();
        const box=await canvas.boundingBox(),before=(await state()).three.position;
        const x=box.x+box.width*.4,y=box.y+box.height*.4;
        if(mobile){
          const cdp=await context.newCDPSession(page);
          await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
          await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+55,y:y+30}]});
          await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
          await cdp.detach();
        }else{
          await page.mouse.move(x,y);await page.mouse.down();
          await page.mouse.move(x+70,y+40,{steps:6});await page.mouse.up();
        }
        await page.waitForFunction(pos=>window.oldRotationState().three.position.some((v,i)=>Math.abs(v-pos[i])>.05),before);
        await click('cameraReset');
        await click('cutaway');
        assert.equal((await state()).sweep,270);
        if(pass===3)await canvas.screenshot({path:out+'/'+c.key+(mobile?'-mobil':'-desktop')+'.png'});
        await click('cutaway');
        assert.equal((await state()).sweep,360);
        await click('cutaway');
        await click('reset');
        assert.equal((await state()).sweep,360);
        assert.equal((await state()).view,'2d');
        await page.locator('nav.breadcrumb a').last().click();
      }
      assert.deepEqual(errors,[]);
      await context.close();
    }
    console.log('Durchgang '+pass+': 2 Aufgaben, Desktop und Mobil, Rechnung und 3D-Bedienung bestanden.');
  }
}finally{
  await browser.close();
}
