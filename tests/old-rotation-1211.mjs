import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';
import {geometry1211,settings1211} from '../mathematik-realschule/alte-ap-aufgaben/rotationskoerper/shared-1314/geometry-1211.js';
import {tasks1211} from '../mathematik-realschule/alte-ap-aufgaben/rotationskoerper/shared-1314/tasks-1211.js';

const folder='/mathematik-realschule/alte-ap-aufgaben/rotationskoerper/';
const origin=process.env.QA_BASE || 'http://127.0.0.1:8765';
const out='/tmp/old-rotation-1211';
const cases=[
  {key:'2012-ht-i',file:'2012-ht-i-a3.html',points:[1,3,1],results:['112,62','11,25','277,93'],angles:[0.01,80,100,112.61]},
  {key:'2011-ht-i',file:'2011-ht-i-a3.html',points:[3,2],results:['tan','140,05'],angles:[104.04,120,140.05,160.02]},
  {key:'2011-nt-ii',file:'2011-nt-ii-a1.html',points:[5],results:['95,3'],angles:[]},
];
const rad=deg=>deg*Math.PI/180;
const near=(a,b,tol=1e-8)=>assert(Math.abs(a-b)<tol,a+' vs. '+b);
const volumeOf=points=>Math.abs(points.reduce((sum,[r,y],i)=>{
  const [s,z]=points[(i+1)%points.length];
  return sum+(z-y)*(r*r+r*s+s*s);
},0)*Math.PI/3);
function verifyGeometry(){
  assert.equal((2*Math.atan(1.5)*180/Math.PI).toFixed(2),'112.62');
  assert.equal((Math.PI*(101.25-9*Math.tan(rad(50))**2)).toFixed(2),'277.93');
  assert.equal((90+Math.atan(15/(4*Math.PI))*180/Math.PI).toFixed(2),'140.05');
  assert.equal((Math.PI*(4.5**2*5.8-2**2*2.6-2*2**3)/3).toFixed(1),'95.3');
  for(const c of cases){
    assert.deepEqual(tasks1211[c.key].parts.map(x=>x.points),c.points);
    for(const phi of c.angles.length?c.angles:[undefined]){
      const g=geometry1211(c.key,phi);
      near(volumeOf(g.profile),g.volume,g.r===2&&c.key==='2011-nt-ii'?.003:1e-8);
      near(g.decomposition.parts.reduce((sum,p)=>sum+volumeOf(p.profile),0),volumeOf(g.profile));
      if(c.key==='2012-ht-i'){
        const [x,y]=g.points.E;
        near(2*Math.atan(x/(y-g.points.F[1])),rad(phi));
        assert(x<g.R);
      }
      if(c.key==='2011-ht-i'){
        near(g.points.F[1],2*g.points.B[1]);
        near(Math.PI/2+Math.atan(g.points.B[1]),rad(phi));
      }
      if(c.key==='2011-nt-ii'){
        near(Math.atan2(g.points.D[1],g.points.D[0]-g.points.A[0]),rad(52));
        near(g.points.E[1]-Math.min(...g.decomposition.voids[0].profile.map(p=>p[1])),2);
        assert.equal(g.volume.toFixed(1),'94.7');
      }
    }
  }
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
      assert.equal(await page.locator('a.task-card').count(),19);
      assert.equal(await page.locator('article.task-card').count(),9);
      for(const c of cases){
        await page.locator('a.task-card[href="'+c.file+'"]').click();
        await page.waitForFunction(()=>typeof window.oldRotationState==='function');
        await math();
        assert.equal(await page.locator('#phi').isVisible(),Boolean(c.angles.length));
        assert.equal(await page.locator('#cutaway').isVisible(),false);
        assert.equal(await page.locator('a[href$=".pdf"]').count(),0);
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
        for(let i=0;i<c.points.length;i++){
          await page.locator('#parts button').nth(i).click();
          assert.equal((await state()).part,i);
          if(c.key==='2012-ht-i'&&i===2)assert.equal((await state()).geometry.phi,100);
          for(let step=0;step<tasks1211[c.key].parts[i].steps.length;step++){
            await math();
            assert.equal((await state()).step,step);
            assert(await page.locator('#solution mjx-container').first().isVisible());
            assert(!(await page.locator('#plot').innerHTML()).includes('NaN'));
            if(!await page.locator('#next').isDisabled())await click('next');
          }
          const rendered=await page.locator('#solution').evaluate(node=>{
            return node.textContent+' '+MathJax.startup.document.getMathItemsWithin(node).map(item=>item.math).join(' ');
          });
          assert(rendered.includes(c.results[i])||rendered.includes(c.results[i].replace(',','{,}')),c.file+' '+i+' '+rendered);
        }
        await click('reset');
        if(c.angles.length)assert.equal((await state()).geometry.phi,settings1211[c.key].value);
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
        for(const angle of c.angles){
          await input('phi',angle);
          assert.equal((await state()).geometry.phi,angle);
          const current=await state();
          near(current.geometry.volume,geometry1211(c.key,angle).volume);
          if(c.key==='2011-ht-i'){
            near(current.three.center,current.geometry.h);
            assert(current.three.scale*current.geometry.maxY<=7+1e-8);
          }
        }
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
    console.log('Durchgang '+pass+': 3 Aufgaben, 6 Teilaufgaben, Desktop und Mobil, Rechnung und 3D-Bedienung bestanden.');
  }
}finally{
  await browser.close();
}
