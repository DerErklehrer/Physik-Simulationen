import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';
import {geometry0807} from '../mathematik-realschule/alte-ap-aufgaben/rotationskoerper/shared-1314/geometry-0807.js';
import {tasks0807} from '../mathematik-realschule/alte-ap-aufgaben/rotationskoerper/shared-1314/tasks-0807.js';

const folder='/mathematik-realschule/alte-ap-aufgaben/rotationskoerper/';
const origin=process.env.QA_BASE || 'http://127.0.0.1:8765';
const out='/tmp/old-rotation-0807';
const cases=[
  {key:'2008-ht-ii',file:'2008-ht-ii-p1.html',result:'140,7'},
  {key:'2007-ht-ii',file:'2007-ht-ii-p1.html',result:'155,8'},
  {key:'2007-nt-ii',file:'2007-nt-ii-p1.html',result:'226,2'},
];
const rad=deg=>deg*Math.PI/180;
const near=(a,b,tol=1e-8)=>assert(Math.abs(a-b)<tol,a+' vs. '+b);
const volumeOf=points=>Math.abs(points.reduce((sum,[r,y],i)=>{
  const [s,z]=points[(i+1)%points.length];
  return sum+(z-y)*(r*r+r*s+s*s);
},0)*Math.PI/3);
function verifyGeometry(){
  const p=Math.PI;
  assert.equal((p*(4*8.8+(3.5**2*2.9-4*1.7)/3)).toFixed(1),'140.7');
  assert.equal((.42*4*p*4**3/3).toFixed(1),'112.6');
  assert.equal((p*3.8**2*10.3/3).toFixed(1),'155.8');
  assert.equal((72*p).toFixed(1),'226.2');
  for(const c of cases){
    const g=geometry0807(c.key);
    assert.deepEqual(tasks0807[c.key].parts.map(part=>part.points),[5]);
    near(volumeOf(g.profile),g.volume);
    near(g.decomposition.parts.reduce((sum,part)=>sum+volumeOf(part.profile),0),g.volume);
  }
  const screw=geometry0807('2008-ht-ii');
  near((screw.h-screw.apex)/3.5,Math.tan(rad(40)));
  near(screw.join-screw.apex,2*Math.tan(rad(40)));
  const ice=geometry0807('2007-ht-ii');
  near((ice.center-ice.h)**2+ice.rimRadius**2,16);
  near(ice.center*Math.sin(rad(20)),4);
  near(volumeOf(ice.meltProfile),ice.meltVolume);
  assert(ice.meltHeight>0&&ice.meltHeight<ice.h);
  const lamp=geometry0807('2007-nt-ii');
  near(lamp.top-lamp.h,2);
  near(lamp.surface,4*p*(4/Math.sin(rad(35)))+16*p+12*p+16*p);
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
        assert.equal(await page.locator('#phi').isVisible(),false);
        assert.equal(await page.locator('#cutaway').isVisible(),false);
        assert.equal(await page.locator('a[href$=".pdf"]').count(),0);
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
        const ice=c.key==='2007-ht-ii';
        assert.equal(await page.locator('#parts button').count(),1);
        if(ice)assert.equal(await page.locator('#plot [data-liquid="ice"]').count(),1);
        if(c.key==='2007-nt-ii')assert.equal(await page.locator('#plot [data-component="rim"]').count(),2);
        for(let step=0;step<tasks0807[c.key].parts[0].steps.length;step++){
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
        if(ice){
          assert.equal(await page.locator('#plot [data-liquid="ice"]').count(),0);
          assert.equal(await page.locator('#plot [data-liquid="water"]').count(),1);
          await click('view3');
          await page.waitForFunction(()=>window.oldRotationState().three?.materials.some(m=>m.component==='melt'));
          assert(!(await state()).three.materials.some(m=>m.component==='ice'));
          if(pass===3)await page.locator('#canvas').screenshot({path:out+'/ice-melt'+(mobile?'-mobil':'-desktop')+'.png'});
        }
        await click('reset');
        if(ice)assert.equal(await page.locator('#plot [data-liquid="ice"]').count(),1);
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
        if(ice)assert((await state()).three.materials.some(m=>m.component==='ice'));
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
    console.log('Durchgang '+pass+': 3 Aufgaben, 3 Pflichtaufgaben, Desktop und Mobil, Rechnung und 3D-Bedienung bestanden.');
  }
}finally{
  await browser.close();
}
