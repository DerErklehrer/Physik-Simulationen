export async function checkRangeControls(p,{task,ready,shot}){
 const configs={a2:{parts:[0,1],id:'phi',key:'phi',values:[20,60],reset:34},b1:{parts:[0,1,2,3],id:'week',key:'x',values:[6,20],reset:i=>i===0?1:i===1?3:0},b2:{parts:[0,1,2],id:'phi',key:'phi',values:[30,60],reset:50},b3:{parts:[2,3,4],id:'xval',key:'x',values:[1,4],reset:0},b4:{parts:[1,2,3,4],id:'phi',key:'phi',values:[25,55],reset:45}};
 const c=configs[task];if(!c)return;
 for(const i of c.parts){
  await p.locator('#parts button').nth(i).click();await ready();
  if(!await p.locator('#'+c.id).isVisible())throw Error(task+' Regler fehlt in Teil '+(i+1)+' Schritt 1');
  if(!await p.locator('#explore').isVisible())throw Error('Reglerbereich versteckt');
  const original=await p.locator('#solution').innerText();
  for(const value of c.values){
   await p.locator('#'+c.id).evaluate((e,value)=>{e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}))},value);
   await ready();if(Math.abs(await p.evaluate(key=>state()[key],c.key)-value)>1e-9)throw Error('Regler nicht gekoppelt '+task);
   if(task==='b3'&&!await p.locator('[data-rhombus="n"]').count())throw Error('Freie Raute fehlt');
   if(await p.locator('#solution').innerText()!==original)throw Error('Originalrechnung wird überschrieben');
  }
  const chosen=c.values.at(-1);await shot('regler-teil'+(i+1)+'-schritt1');
  await p.locator('#next').click();await ready();if(Math.abs(await p.evaluate(key=>state()[key],c.key)-chosen)>1e-9)throw Error('Reglerwert geht beim Weiterblättern verloren '+task);
  await p.locator('#prev').click();await ready();if(Math.abs(await p.evaluate(key=>state()[key],c.key)-chosen)>1e-9)throw Error('Reglerwert geht beim Zurückblättern verloren '+task);
  if(task==='b4'){await p.locator('#threeD').click();await p.waitForFunction(()=>window.exam20xxB4Three?.snapshot());const snap=await p.evaluate(()=>window.exam20xxB4Three.snapshot());if(Math.abs(snap.phi-chosen)>1e-9)throw Error('Reglerwert nicht in 3D');await p.locator('#twoD').click()}
  await p.locator('#reset').click();await ready();const reset=typeof c.reset==='function'?c.reset(i):c.reset;
  if(Math.abs(await p.evaluate(key=>state()[key],c.key)-reset)>1e-9)throw Error('Originalreset '+task);
  if(!await p.locator('#'+c.id).isVisible())throw Error('Regler nach Reset verschwunden');
 }
}
