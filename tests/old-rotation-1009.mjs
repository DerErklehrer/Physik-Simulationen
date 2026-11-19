import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';
import {geometry1009,liquid1009,liquidSettings,ballRadius} from '../mathematik-realschule/alte-ap-aufgaben/rotationskoerper/shared-1314/geometry-1009.js';
import {tasks1009} from '../mathematik-realschule/alte-ap-aufgaben/rotationskoerper/shared-1314/tasks-1009.js';

const folder='/mathematik-realschule/alte-ap-aufgaben/rotationskoerper/';
const origin=process.env.QA_BASE || 'http://127.0.0.1:8765';
const out='/tmp/old-rotation-1009';
const cases=[
  {key:'2010-ht-ii',file:'2010-ht-ii-a3.html',points:[5],results:['949,0']},
  {key:'2009-ht-i',file:'2009-ht-i-a1.html',points:[2,3],results:['38','159']},
  {key:'2009-ht-ii',file:'2009-ht-ii-a2.html',points:[3,2,2,2],results:['14,4','427,5','2,0','Diagramm B']},
  {key:'2009-nt-ii',file:'2009-nt-ii-a1.html',points:[5],results:['große Dose']},
];
const rad=deg=>deg*Math.PI/180;
const near=(a,b,tol=1e-8)=>assert(Math.abs(a-b)<tol,a+' vs. '+b);
const volumeOf=points=>Math.abs(points.reduce((sum,[r,y],i)=>{
  const [s,z]=points[(i+1)%points.length];
  return sum+(z-y)*(r*r+r*s+s*s);
},0)*Math.PI/3);
function verifyGeometry(){
  const p=Math.PI;
  assert.equal((p*(2/3*6**3+36*1.4+5.3**2*11.5/3)).toFixed(1),'949.0');
  assert.equal((200*Math.cbrt(.5)).toFixed(0),'159');
  assert.equal((2*Math.atan(69/200)*180/p).toFixed(0),'38');
  assert.equal((p*(7.2**2*8-1.8**2*2)/3).toFixed(1),'427.5');
  assert.equal((p*(31.5*49+2*31.5*32.5+31.5**2+15**2)).toFixed(1),'15105.6');
  for(const c of cases){
    const g=geometry1009(c.key);
    assert.deepEqual(tasks1009[c.key].parts.map(x=>x.points),c.points);
    near(volumeOf(g.profile),g.volume,.55);
    near(g.decomposition.parts.reduce((sum,p)=>sum+volumeOf(p.profile),0),volumeOf(g.profile));
  }
  const cup=geometry1009('2009-ht-i');
  near(liquid1009('2009-ht-i',cup,200*Math.cbrt(.5)).volume,500000);
  near(liquid1009('2009-ht-i',cup,200).volume,cup.volume);
  const pot=geometry1009('2009-ht-ii'),rise=4*ballRadius**3/(3*pot.r**2);
  near(liquid1009('2009-ht-ii',pot,6+rise,true).water,liquid1009('2009-ht-ii',pot,6).water);
  near(liquid1009('2009-ht-ii',pot,10).volume,pot.volume);
  const workpiece=geometry1009('2009-nt-ii');
  near(Math.atan2(workpiece.R,workpiece.join),rad(40));
  near(workpiece.surface,p*(31.5**2/Math.sin(rad(40))+63*(70-31.5/Math.tan(rad(40)))+31.5**2+15**2));
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
      assert.equal(await page.locator('a.task-card').count(),26);
      assert.equal(await page.locator('article.task-card').count(),2);
      for(const c of cases){
        await page.locator('a.task-card[href="'+c.file+'"]').click();
        await page.waitForFunction(()=>typeof window.oldRotationState==='function');
        await math();
        const fluid=liquidSettings[c.key];
        assert.equal(await page.locator('#waterHeight').isVisible(),Boolean(fluid));
        if(fluid)assert.equal(await page.locator('#plot [data-liquid="water"]').getAttribute('fill'),'#52a6d7');
        assert.equal(await page.locator('#cutaway').isVisible(),false);
        assert.equal(await page.locator('a[href$=".pdf"]').count(),0);
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
        for(let i=0;i<c.points.length;i++){
          await page.locator('#parts button').nth(i).click();
          assert.equal((await state()).part,i);
          if(c.key==='2009-ht-ii'&&i===3)assert.equal(await page.locator('.graph-choices figure').count(),3);
          for(let step=0;step<tasks1009[c.key].parts[i].steps.length;step++){
            await math();
            assert.equal((await state()).step,step);
            assert(await page.locator('#solution mjx-container').first().isVisible());
            assert(!(await page.locator('#plot').innerHTML()).includes('NaN'));
            if(!await page.locator('#next').isDisabled())await click('next');
          }
          if(c.key==='2009-ht-ii'&&i===2){
            assert((await state()).liquid.sphere);
            near((await state()).liquid.height,8.02);
            await click('view3');
            await page.waitForFunction(()=>window.oldRotationState().three?.materials.some(m=>m.component==='ball'));
            await click('view2');
            await click('prev');
            near((await state()).liquid.height,6);
            await click('next');
            await math();
          }
          if(c.key==='2009-ht-i'&&i===1)near((await state()).liquid.height,158.7);
          const rendered=await page.locator('#solution').evaluate(node=>{
            return node.textContent+' '+MathJax.startup.document.getMathItemsWithin(node).map(item=>item.math).join(' ');
          });
          assert(rendered.includes(c.results[i])||rendered.includes(c.results[i].replace(',','{,}')),c.file+' '+i+' '+rendered);
        }
        await click('reset');
        if(fluid)assert.equal((await state()).liquid.height,fluid.value);
        await click('view3');
        await page.waitForFunction(()=>window.oldRotationState().three?.meshes>0);
        assert((await state()).three.orthographic);
        assert.equal(await page.locator('#sweep').inputValue(),'360');
        assert.equal(await page.locator('#cutaway').textContent(),'Ein Viertel herausschneiden');
        await click('cutaway');
        assert.equal((await state()).sweep,270);
        assert.equal(await page.locator('#cutaway').textContent(),'Körper schließen');
        assert((await state()).three.materials.some(m=>m.component.endsWith('-cut')));
        assert.equal(new Set((await state()).three.materials.filter(m=>!m.component.startsWith('water')).map(m=>m.color)).size,1);
        await page.locator('#componentColors').check();
        assert(new Set((await state()).three.materials.map(m=>m.color)).size>=2);
        if(fluid){
          for(const height of [0,fluid.max/2,fluid.max]){
            await input('waterHeight',height);
            const actual=await state();
            near(actual.liquid.volume,liquid1009(c.key,actual.geometry,height).volume);
            assert.equal(actual.three.materials.some(m=>m.component==='water'),height>0);
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
    console.log('Durchgang '+pass+': 4 Aufgaben, 8 Teilaufgaben, Desktop und Mobil, Rechnung und 3D-Bedienung bestanden.');
  }
}finally{
  await browser.close();
}
