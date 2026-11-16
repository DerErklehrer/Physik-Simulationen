/* Training copies use their own data and assets; examination files are never written. */
function initTraining(config,data){
 const get=id=>document.getElementById(id),params=new URLSearchParams(location.search);let selected=Number(params.get('teil')??config.picks[0]);if(!config.picks.includes(selected))selected=config.picks[0];
 const keys=data&&!Array.isArray(data)?Object.keys(data):null,itemAt=i=>data?(keys?data[keys[i]]:data[i]):null;
 const getSteps=t=>Array.isArray(t)?t[3]:t?.steps??t?.items??t?.s;
 const putSteps=(t,steps)=>{if(Array.isArray(t))t[3]=steps;else t[t.steps?'steps':t.items?'items':'s']=steps};
 for(const [key,o] of Object.entries(config.overrides||{})){
  const i=Number(key),t=itemAt(i);if(!t)continue;
  if(o.q){if(Array.isArray(t))t[2]=o.q;else t['q'in t?'q':'text'in t?'text':'statement']=o.q}
  let steps=getSteps(t);if(o.takeSteps)steps=o.takeSteps.map(j=>steps[j]);if(o.replaceSteps)for(const[j,pair]of Object.entries(o.replaceSteps))steps[Number(j)]=pair;if(o.steps)steps=o.steps;
  if(steps)putSteps(t,steps);
 }
 // All local references to prior parts are replaced by the supplied scene/coordinate system.
 function independent(s){return String(s).replace(/in das Koordinatensystem zu [AB]\s*\d+\.\d+/g,'in das dargestellte Koordinatensystem').replace(/in das Schrägbild zu [AB]\s*\d+\.\d+/g,'in das dargestellte Schrägbild').replace(/in der Zeichnung zu [AB]\s*\d+\.\d+/g,'in der dargestellten Zeichnung').replace(/zu [AB]\s*\d+\.\d+/g,'in der Zeichnung').replace(/aus [AB]\s*\d+\.\d+/g,'aus den vorgegebenen Angaben');}
 if(data)for(const t of Object.values(data)){if(typeof t!=='object')continue;if(Array.isArray(t))t[2]=independent(t[2]);else for(const k of ['q','text','statement'])if(t[k])t[k]=independent(t[k]);const ss=getSteps(t);if(ss)for(const pair of ss)if(Array.isArray(pair)&&typeof pair[1]==='string')pair[1]=independent(pair[1])}
 const main=document.querySelector('main');main.querySelectorAll('nav').forEach(e=>e.remove());main.querySelectorAll('a').forEach(e=>e.remove());
 for(const id of ['nav',...(config.selector==='tasks'?[]:['tasks'])]){const e=get(id);if(e){const p=e.closest('section');if(p&&p.querySelectorAll('svg,canvas').length===0)p.remove();else e.remove()}}
 get('status')?.remove();
 const originalLabel=config.wholeLabel||config.file[0].toUpperCase()+' '+Number(config.file[1])+'.'+(selected+1),override=(config.overrides||{})[selected]||{},label=override.label||originalLabel;
 const title=config.label+' · '+label;document.title=title+' · Trigonometrie üben';const h=main.querySelector('h1');if(h)h.textContent=title;
 const bar=document.createElement('nav');bar.className='training-nav';bar.setAttribute('aria-label','Übungsnavigation');bar.innerHTML='<a href="../">← Passende Abschlussprüfungsaufgaben</a><a href="../../">Trigonometrie · Themen</a>';main.prepend(bar);
 const notice=document.createElement('p');notice.className='training-notice';notice.innerHTML='<strong>'+config.title+'</strong><br>Eigenständige Übung nach '+config.label+' · '+label+'. Alle benötigten Angaben stehen auf dieser Seite.';bar.after(notice);
 if(config.given){let intro=get('intro')||main.querySelector('.original');if(intro)intro.innerHTML='<strong>Gegebene Angaben</strong><p>'+config.given+'</p>'}
 const extra=document.createElement('div');extra.className='training-given';extra.id='trainingGiven';extra.innerHTML='<strong>Zusätzliche vorgegebene Angaben</strong><p>'+((config.extras||{})[selected]||'')+'</p>';extra.hidden=!(config.extras||{})[selected];const st=get('statement');if(st)st.before(extra);else notice.after(extra);
 const reference=document.createElement('p');reference.className='training-reference';const a=document.createElement('a');a.href='../../../'+config.source;a.textContent='Herkunft: '+config.label+' · vollständiger Aufgabenbereich';reference.append(a);main.append(reference);
 const buttons=config.selector?[...document.querySelectorAll('#'+config.selector+' button')]:[];
 buttons.forEach((b,i)=>{b.hidden=i!==selected;b.setAttribute('data-training-part',String(i))});
 // The 2026 B4 page uses separate presentation arrays for its worked solutions.
 if(config.year==='2026'&&config.file==='b4'){
  for(const [key,o]of Object.entries(config.overrides||{})){const p=keys[Number(key)];if(o.steps)examSteps[p]=o.steps;if(o.takeSteps){const ss=p==='B 4.3'?ortsvektorSteps:examSteps[p],chosen=o.takeSteps.map(j=>ss[j]);ss.splice(0,ss.length,...chosen);sections[p].steps=chosen}}
 }
 if(config.freeze){
  // Keep the given points available as supplied data; the learner need not compute a function family.
  for(const input of main.querySelectorAll('input[type=range]')){const host=input.closest('#explore');if(host)host.hidden=true;else{input.hidden=true;const lab=main.querySelector('label[for="'+input.id+'"]');if(lab)lab.hidden=true}}
 }

 if(config.freeze){
  const cleanFigure=()=>{
   const figure=main.querySelector('svg');
   if(config.id!=='muster2-b1'&&figure){
    for(const path of figure.querySelectorAll('path'))if((path.getAttribute('d')||'').length>600&&!path.closest('[data-math-label]')&&!path.closest('mjx-container'))path.remove();
    for(const e of figure.querySelectorAll('text,[data-math-label]'))if(/Graph zu|Asymptot|^f_[12]$|^f[₁₂]$|^y = 3$/.test(e.getAttribute('data-math-label')||e.textContent))e.remove();
   }
   if(figure){figure.setAttribute('aria-label',config.title+' – vorgegebene geometrische Figur');if(config.id==='2025-b3'&&selected===4)for(const t of figure.querySelectorAll('text'))t.textContent=t.textContent.replaceAll('ₙ','₃')}
   const heading=main.querySelector('h2');if(heading)heading.textContent=config.title;
   for(const p of main.querySelectorAll('p'))if(!p.closest('#intro,#statement,#solution,#trainingGiven,.training-notice,.training-reference')&&/Regler|Asymptot|Graph zu|Blau: Graph|Funktionswert|Wertemenge|mathematische Bedingung/.test(p.textContent))p.hidden=true;
   for(const id of ['asym','fixed1','fixed2']){const input=get(id);if(input){input.hidden=true;input.closest('label')?.setAttribute('hidden','')}}
   for(const id of ['specialControls','shiftControls'])get(id)?.setAttribute('hidden','');
   if(get('measure'))get('measure').textContent=config.id==='2025-b3'&&selected===4?'Vorgegebene gleichschenklige Lage. Die Zeichnung verwendet ungerundete Maße; für die Rechnung wird wie angegeben zwischengerundet.':'Zeichnung zu den vorgegebenen geometrischen Angaben.';
  };
  if(typeof draw==='function'){const originalDraw=draw;draw=function(){
   if(config.id==='2025-b3'&&selected===4){preciseX=Math.log((7-(8-4*Math.sin(20*Math.PI/180)))/3.5)/Math.log(.5)-3;if(get('x'))get('x').value=preciseX}
   if(get('asym')?.type==='checkbox')get('asym').checked=false;
   originalDraw();cleanFigure();
  }}
 }
 const rawRender=typeof render==='function'?render:null;
 function after(){
  if(override.q&&get('statement'))get('statement').innerHTML='<strong>'+label+'</strong><p>'+override.q+'</p>';
  if(get('statement'))get('statement').innerHTML=independent(get('statement').innerHTML);
  buttons.forEach((b,i)=>b.hidden=i!==selected);
  // Suppress excluded-technique/result controls on the derived training pages.
  if(config.id==='2023-a1')get('special')?.setAttribute('hidden','');
  for(const e of main.querySelectorAll('h2'))if(/^Originalaufgabe/.test(e.textContent))e.textContent='Aufgabe und Lernlösung';
  document.body.dataset.trainingReady='true';
 }
 if(rawRender){window.removeEventListener('load',rawRender);render=function(){rawRender();after()};window.addEventListener('load',render)}
 if(buttons[selected])buttons[selected].click();else if(rawRender)render();after();
  const typeset=()=>{if(window.MathJax?.typesetPromise)MathJax.startup.promise.then(()=>MathJax.typesetPromise([notice,extra,...(config.given?[get('intro')||main.querySelector('.original')]:[]),...(override.q&&st?[st]:[])])).catch(console.error)};
 window.addEventListener('load',typeset);typeset();
 window.trainingInfo={id:config.id,selected,label,source:config.source,standalone:true,steps:()=>Number((get('count')||get('counter'))?.textContent.match(/(?:von |\/\s*)(\d+)/)?.[1]||getSteps(itemAt(selected))?.length||0)};
}
