import '../../../../assets/rotation-angle.js?v=20261119';
import {installColorToggle,applySVGColorMode,applyMeshColorMode} from '../shared-colors/toggle.js';
import {decomposition,legendHTML,colorSolution,drawDecomposition,decompositionMeshes} from '../shared-colors/decomposition.js';
import {tasks} from './tasks.js';
import {geometry} from './geometry.js';
import {geometry1211,settings1211} from './geometry-1211.js';
import {tasks1211} from './tasks-1211.js';
import {geometry1009,liquidSettings,liquid1009,ballRadius} from './geometry-1009.js';
import {tasks1009} from './tasks-1009.js';
const $=id=>document.getElementById(id),key=document.body.dataset.task,data=tasks[key]||tasks1211[key]||tasks1009[key],fmt=(v,n=2)=>v.toFixed(n).replace('.',',');
const model=tasks1009[key]?geometry1009:tasks1211[key]?geometry1211:geometry;
const setting=settings1211[key];
const waterSetting=liquidSettings[key];
let waterHeight=waterSetting?.value;
let phi=setting?.value??20,g=model(key,phi);
const initialSweep=360;
let part=0,step=0,view='2d',sweep=initialSweep,three=null,mathQueue=Promise.resolve();
const parameter=document.createElement('div');parameter.className='controls';parameter.hidden=key!=='2013-nt-i'&&!setting;parameter.innerHTML='<label for="phi">Winkel φ: <strong id="phiValue">20,00°</strong></label><input id="phi" type="range" min="0.01" max="51.31" step="0.01" value="20"><label><input id="sphere" type="checkbox"> Kugel aus A 2.4 anzeigen</label><p class="muted">Der Regler verändert Modell, Diagonale, Volumen und Kugel gemeinsam. Die Lernlösung behandelt die vorgegebenen Prüfungsbeispiele.</p>';
$('legend').before(parameter);
if(setting){
 for(const prop of ['min','max','value'])$('phi')[prop]=String(setting[prop]);
 $('sphere').parentElement.hidden=true;
 parameter.querySelector('p').textContent='Der Winkelregler verändert den Axialschnitt, das 3D-Modell und die Erkundungswerte gemeinsam.';
}
function setPhi(value){phi=Number(value);g=model(key,phi);$('phi').value=String(phi);$('phiValue').textContent=fmt(phi,2)+'°'}
$('phi').oninput=()=>{setPhi($('phi').value);render()};$('sphere').onchange=()=>render();
const colorToggle=installColorToggle(()=>render());
const current=()=>data.parts[part],focus=()=>current().steps[step][2];
const currentLiquid=()=>waterSetting?liquid1009(key,g,waterHeight,key==='2009-ht-ii'&&focus()==='rise'&&waterHeight>=2*ballRadius):null;
if(waterSetting){
 const controls=document.createElement('div');
 controls.className='controls';
 controls.innerHTML='<label for="waterHeight">Füllhöhe: <strong id="waterHeightValue"></strong></label><input id="waterHeight" type="range" min="0">';
 $('legend').before(controls);
 const slider=$('waterHeight');
 slider.max=waterSetting.max;slider.step=waterSetting.step;
 slider.oninput=()=>{waterHeight=slider.valueAsNumber;render()};
}
function updateWater(){
 if(!waterSetting)return;
 $('waterHeight').value=waterHeight;
 $('waterHeightValue').textContent=fmt(waterHeight,waterSetting.units==='mm'?1:2)+' '+waterSetting.units;
}
function advanceWater(){
 if(!waterSetting)return;
 if(focus()==='half')waterHeight=158.7;
 if(focus()==='rise')waterHeight=8.02;
}
function choosePart(i){
 if(!waterSetting)return;
 waterHeight=key==='2009-ht-ii'&&i===3?0:waterSetting.value;
}

function math(){mathQueue=mathQueue.catch(()=>{}).then(async()=>{if(window.MathJax?.startup?.promise){await MathJax.startup.promise;await MathJax.typesetPromise([$ ('intro'),$('statement'),$('solution'),$('measure')])}});return mathQueue}
function clearMath(){if(window.MathJax?.typesetClear)MathJax.typesetClear([$('statement'),$('solution'),$('measure')])}
$('intro').innerHTML=(data.introId?'<h3>'+data.introId+'</h3>':'')+data.intro;$('rounding').textContent=data.rounding;
for(const link of document.querySelectorAll('nav.buttons a'))if(new URL(link.href).pathname===location.pathname)link.setAttribute('aria-current','page');
function updateLegend(){const d=decomposition(key,g);if(d){let legend=document.getElementById('legend')||document.querySelector('.legend');if(legend)legend.innerHTML=legendHTML(d)}}
function render(){clearMath();$('parts').replaceChildren();data.parts.forEach((p,i)=>{const b=document.createElement('button');b.textContent=p.id;b.className=i===part?'active':'';b.setAttribute('aria-pressed',String(i===part));b.onclick=()=>{part=i;step=0;choosePart(i);if(key==='2013-nt-i'){$('sphere').checked=i===3;setPhi(i===1?Math.atan(4.5*Math.sin(g.alpha*Math.PI/180)/(8-4.5*Math.cos(g.alpha*Math.PI/180)))*180/Math.PI:20)}else if(setting?.presets[i]!==undefined)setPhi(setting.presets[i]);render()};$('parts').append(b)});const p=current(),s=p.steps[step];$('statement').innerHTML=`<h3>${p.id} <span class="tag">${p.points} P</span></h3><div>${p.statement}</div>`;$('stepTitle').textContent=`${step+1} · ${s[0]}`;$('count').textContent=`${step+1} von ${p.steps.length}`;$('solution').innerHTML=colorSolution(s[1],decomposition(key,g));updateWater();updateLegend();$('prev').disabled=step===0;$('next').disabled=step===p.steps.length-1;draw2d();measure();math();if(three)rebuild3d()}
$('prev').onclick=()=>{if(step>0){step--;render()}};$('next').onclick=()=>{if(step<current().steps.length-1){step++;advanceWater();render()}};
function reset(){part=0;step=0;choosePart(0);if(key==='2013-nt-i'){setPhi(20);$('sphere').checked=false;}else if(setting)setPhi(setting.value);sweep=initialSweep;setSweep(sweep,false);$('auxiliary').checked=true;setView('2d');if(three)camera('default');render()}
$('reset').onclick=reset;$('auxiliary').onchange=()=>{draw2d();if(three)rebuild3d()};
function measure(){const liquid=currentLiquid();if(liquid){
 const volume=waterSetting.units==='mm'?fmt(liquid.water/1e6,3)+' l':fmt(liquid.water,2)+' cm³';
 $('measure').textContent='Wasservolumen: '+volume+'. Füllhöhe: '+fmt(liquid.height,2)+' '+waterSetting.units+'.';
 return;
}const tex=v=>fmt(v,5).replace(',','{,}'),unit=g.units||'cm';$('measure').innerHTML=String.raw`<p>Volumen der vollständigen Körperform: \(${tex(g.volume)}\,\mathrm{${unit}}^3\).</p><p>Rotation ${sweep}°: Volumen des Körperausschnitts \(${tex(g.volume*sweep/360)}\,\mathrm{${unit}}^3\).</p>`+(g.surface?String.raw`<p>Oberfläche ohne Zwischenrundung: \(${tex(g.surface)}\,\mathrm{${unit}}^2\).</p>`:'')+(key==='2013-nt-i'?String.raw`<p>Aktuell: \(\varphi=${tex(phi)}^\circ\); \(\lvert\overline{BD_n}\rvert=${tex(g.bd)}\,\mathrm{cm}\).</p><p>Kugelradius \(r=${tex(g.r)}\,\mathrm{cm}\); Kugeloberfläche \(O_{\text{Kugel}}=${tex(g.sphereSurface)}\,\mathrm{cm}^2\). Das Körpervolumen schließt die Kugel nicht ein.</p>`:'')}
const NS='http://www.w3.org/2000/svg';
$('legend').innerHTML='<span style="--c:#e5a64d">Rotationskörper</span><span style="--c:#9c2946">Hilfslinien / aktueller Lernschritt</span>';
$('auxLabel').textContent='Hilfslinien anzeigen';
function draw2d(){const svg=$('plot');svg.replaceChildren();const scale=Math.min(408/(g.maxY-g.minY),440/(2*g.R)),mid=(g.minY+g.maxY)/2,map=([x,y])=>[320+x*scale,270-(y-mid)*scale];
 const el=(tag,attrs,parent=svg)=>{const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);parent.append(e);return e};
 const title=el('title',{});title.textContent=data.title+' · Axialschnitt';
 const line=(a,b,attrs={})=>{const A=map(a),B=map(b);return el('line',{x1:A[0],y1:A[1],x2:B[0],y2:B[1],stroke:'#536577','stroke-width':1.7,...attrs})};
 const polygon=(ps,attrs={})=>el('polygon',{points:ps.map(p=>map(p).join(',')).join(' '),fill:'#e5a64d','fill-opacity':.55,stroke:'#314857','stroke-width':2.5,...attrs});
 const label=(text,p,dx=0,dy=0,anchor='middle')=>{const A=map(p),e=el('text',{x:A[0]+dx,y:A[1]+dy,'font-size':19,'font-family':'system-ui, sans-serif','font-weight':600,fill:'#263544','text-anchor':anchor,'paint-order':'stroke',stroke:'white','stroke-width':4});e.textContent=text;return e};
 const right=(p,dx,dy)=>{const a=map(p),rad=13;el('path',{d:`M ${a[0]+dx*rad} ${a[1]} A ${rad} ${rad} 0 0 ${dx*dy>0?1:0} ${a[0]} ${a[1]+dy*rad}`,fill:'none',stroke:'#536577','stroke-width':1.2});el('circle',{cx:a[0]+dx*rad/Math.sqrt(8),cy:a[1]+dy*rad/Math.sqrt(8),r:2.2,fill:'#536577'})};
 const angle=(p,start,end,r=29)=>{const a=map(p);el('path',{d:`M ${a[0]+r*Math.cos(start)} ${a[1]+r*Math.sin(start)} A ${r} ${r} 0 0 ${end>start?1:0} ${a[0]+r*Math.cos(end)} ${a[1]+r*Math.sin(end)}`,stroke:'#9c2946',fill:'none','stroke-width':1.8})};
 const dashed={'stroke-dasharray':'6 5',stroke:'#7c8394'};
 drawDecomposition(decomposition(key,g),polygon,line);
 const liquid=currentLiquid();
 if(liquid&&liquid.height>0){
  polygon([...liquid.profile,...liquid.profile.slice().reverse().map(([r,y])=>[-r,y])],
    {fill:'#52a6d7','fill-opacity':.38,stroke:'#2478a4','stroke-width':1.5,'data-liquid':'water'});
  if(liquid.sphere){
   const [cx,cy]=map([0,ballRadius]);
   el('circle',{cx,cy,r:ballRadius*scale,fill:'#657587',stroke:'#263544','stroke-width':1.5,'data-liquid':'ball'});
  }
 }
 if($('auxiliary').checked)for(const[a,b]of g.auxLines)line(g.points[a],g.points[b],dashed);
 const hi=(a,b)=>line(g.points[a],g.points[b],{stroke:'#9c2946','stroke-width':4});
 if(key==='2013-ht-ii'){
  right(g.points.M,-1,1);right(g.points.N,-1,1);right(g.points.S,-1,-1);
  if(focus()==='large')hi('G','M');if(focus()==='height'){hi('M','N');hi('N','S')}
 }else if(key==='2013-nt-ii'){
  right(g.points.N,-1,1);right(g.points.M,-1,1);
  const a=52*Math.PI/180;angle(g.points.F,-Math.PI/2-a,-Math.PI/2+a,32);label('104°',g.points.F,0,40);
  if(focus()==='top')hi('D','C');if(focus()==='radii')hi('E','M');if(focus()==='lower')hi('E','A');if(focus()==='large'){hi('D','F');hi('E','F')}
 }else if(key==='2014-ht-ii'){
  right(g.points.D,1,1);right(g.points.C,-1,1);right(g.points.H,-1,1);right(g.points.G,1,1);right(g.points.K,-1,1);
  angle(g.points.B,Math.PI-35*Math.PI/180,Math.PI,29);label('35°',g.points.B,-42,18,'end');
  if(focus()==='large')hi('L','H');if(focus()==='small'){hi('L','G');hi('G','A')}
 }else if(key==='2014-nt-ii'){
  right(g.points.F,-1,1);right(g.points.E,-1,1);
  if(focus()==='small'){hi('E','H');hi('F','H')}
 }else if(tasks1211[key]||tasks1009[key]){
  for(const [p,dx,dy] of g.rightAngles)right(g.points[p],dx,dy);
  for(const [v,a,b,name] of g.angles){
   const [x,y]=map(g.points[v]);
   const direction=p=>{const [u,w]=map(g.points[p]);return Math.atan2(w-y,u-x)};
   const start=direction(a),delta=(direction(b)-start+3*Math.PI)%(2*Math.PI)-Math.PI;
   angle(g.points[v],start,start+delta,27);
   label(name,g.points[v],43*Math.cos(start+delta/2),4+43*Math.sin(start+delta/2));
  }
  for(const [a,b] of g.highlights[focus()]||[])hi(a,b);
 }else{
  right(g.points.E,-1,1);
  const outer=Math.atan2(g.height,5),inner=Math.atan2(g.height-g.bd,5);angle(g.points.A,inner,outer,35);label('φ',g.points.A,40,39,'start');
  if(focus()==='diagonal')hi('B','D');
  if($('sphere').checked){const center=map(g.points.M),radius=g.r*scale;el('circle',{cx:center[0],cy:center[1],r:radius,fill:'#bf5c88','fill-opacity':.52,stroke:'#8b2857','stroke-width':2,'data-component':'sphere'});line(g.points.A,g.points.M,{'stroke-dasharray':'5 4',stroke:'#8b2857'});line(g.points.E,g.points.M,{stroke:'#8b2857','stroke-width':3});label('r',[0,g.height-g.r/2],12,2,'start');label('kₙ',[g.r,g.center],11,-5,'start');}
 }
 line([0,g.minY-.025*(g.maxY-g.minY)],[0,g.maxY+.025*(g.maxY-g.minY)],{'stroke-dasharray':'9 4 2 4',stroke:'#263544'});
 for(const[n,p]of Object.entries(g.points)){
  if(n==='M'&&key==='2013-nt-i'&&!$('sphere').checked)continue;
  let dx=p[0]<0?-11:11,dy=6,anchor=p[0]<0?'end':'start';
  if(key==='2013-ht-ii'){if(['A','B','S'].includes(n))dy=22;if(['E','F','M'].includes(n))dy=-13;if(n==='N')dy=-9;}
  if(key==='2013-nt-ii'){if(['D','C','N'].includes(n))dy=-13;if(n==='F'){dx=12;dy=15}if(n==='M'){dx=11;dy=-12}if(n==='A')dy=21;}
  if(key==='2014-ht-ii'){if(['C','D','K'].includes(n))dy=-12;if(['F','A','G'].includes(n))dy=21;if(n==='H')dy=-9;if(n==='L')dy=21;}
  if(key==='2014-nt-ii'){if(['C','D','F'].includes(n))dy=-11;if(['A','B','E'].includes(n))dy=21;if(n==='G')dy=-10;if(n==='H')dy=22;}
  if(key==='2013-nt-i'){if(['A','C','E'].includes(n))dy=-13;if(n==='B')dy=22;if(n==='D'){dx=12;dy=18}if(n==='M'){dx=-12;dy=7;anchor='end'}}
  if(tasks1211[key])dy=p[1]===0?23:-10;
  if(key==='2012-ht-i'){
   if(['A','D'].includes(n))dy=-25;
   if(n==='G')dx=g.r<.25?-17:13;
   if(n==='E')dx=g.r<.25?17:-13;
   if(n==='H')dy=-30;
  }
  if(g.offsets?.[n])[dx,dy,anchor]=g.offsets[n];
  const name=g.subscript?.includes(n)?n+(phi===setting?.value?'₁':'ₙ'):key==='2013-nt-i'&&n==='D'?'Dₙ':key==='2013-nt-i'&&n==='M'?'Mₙ':n;label(name,p,dx,dy,anchor);
 }
 label('Rotationsachse '+g.axis,[0,g.maxY],0,-44);applySVGColorMode(svg,colorToggle.checked);svg.dataset.focus=focus();}
async function setView(mode){view=mode;$('plot').toggleAttribute('hidden',mode!=='2d');$('threewrap').hidden=mode!=='3d';$('cameraControls').hidden=mode!=='3d';$('sweepControl').hidden=mode!=='3d';for(const[v,id]of[['2d','view2'],['3d','view3']]){$(id).classList.toggle('active',mode===v);$(id).setAttribute('aria-pressed',String(mode===v))}if(mode==='3d'){if(!three)await init3d();else three.resize()}}
$('view2').onclick=()=>setView('2d');$('view3').onclick=()=>setView('3d');
const setSweep=bindRotationAngle($('sweep'),$('sweepValue'),$('cutaway'),angle=>{
 sweep=angle;clearMath();measure();math();if(three)rebuild3d();
});
for(const[id,mode]of[['cameraReset','default'],['top','top'],['bottom','bottom'],['inverted','inverted']])$(id).onclick=()=>camera(mode);
async function init3d(){try{const T=await import('three'),{TrackballControls}=await import('https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/controls/TrackballControls.js');const renderer=new T.WebGLRenderer({canvas:$('canvas'),antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));const scene=new T.Scene();scene.background=new T.Color('#f7f9fc');const cam=new T.OrthographicCamera(-5.3,5.3,5.3,-5.3,.1,200);const controls=new TrackballControls(cam,$('canvas'));controls.staticMoving=true;controls.noPan=true;controls.rotateSpeed=3;controls.zoomSpeed=1.2;controls.minZoom=.4;controls.maxZoom=4;const group=new T.Group();scene.add(group);scene.add(new T.HemisphereLight(0xffffff,0x58677c,2));for(const p of[[8,12,9],[-8,6,-4]]){const l=new T.DirectionalLight(0xffffff,1.8);l.position.set(...p);scene.add(l)}const k=7/Math.max(2*g.R,g.maxY-g.minY),center=(g.minY+g.maxY)/2;
 const resize=()=>{const w=$('threewrap').clientWidth||640,h=$('threewrap').clientHeight||540;cam.left=-5.3*w/h;cam.right=5.3*w/h;cam.top=5.3;cam.bottom=-5.3;cam.updateProjectionMatrix();renderer.setSize(w,h,false);controls.handleResize()};three={T,renderer,scene,cam,controls,group,k,center,resize,mode:'default'};new ResizeObserver(resize).observe($('threewrap'));resize();camera('default');rebuild3d();const tick=()=>{requestAnimationFrame(tick);if(view==='3d'){controls.update();renderer.render(scene,cam)}};tick();$('threeError').hidden=true;}catch(e){$('threeError').hidden=false;$('threeError').textContent='Die 3D-Ansicht benötigt WebGL und eine Internetverbindung. Axialschnitt und Lernlösungen stehen weiterhin zur Verfügung.';console.error(e)}}
function camera(mode){if(!three)return;const{cam,controls}=three;three.mode=mode;cam.zoom=1;controls.target.set(0,0,0);cam.up.set(0,1,0);if(mode==='top'||mode==='bottom'){cam.position.set(0,mode==='top'?24:-24,.0001);cam.up.set(0,0,mode==='top'?-1:1)}else{cam.position.set(-11,13,16);if(mode==='inverted')cam.up.set(0,-1,0)}cam.lookAt(0,0,0);cam.updateProjectionMatrix();controls.update()}
function rebuild3d(){
 if(key==='2011-ht-i'){
  three.center=(g.minY+g.maxY)/2;
  three.k=7/Math.max(2*g.R,g.maxY-g.minY);
 }
 const{T,group,k,center}=three;while(group.children.length){const o=group.children[0];group.remove(o);o.geometry?.dispose();o.material?.dispose()}const norm=([r,y])=>new T.Vector2(r*k,(y-center)*k),angle=sweep*Math.PI/180;
 if(!decompositionMeshes(T,group,norm,sweep,decomposition(key,g))){
 for(const obj of g.objects){if(obj.glass&&!$('auxiliary').checked)continue;const profile=obj.profile.filter((p,i,arr)=>i===0||Math.hypot(p[0]-arr[i-1][0],p[1]-arr[i-1][1])>1e-8);if(Math.hypot(profile[0][0]-profile.at(-1)[0],profile[0][1]-profile.at(-1)[1])<1e-8)profile.pop();const closed=[...profile,profile[0]],mat=()=>new T.MeshStandardMaterial({color:obj.color,side:T.DoubleSide,roughness:.75,transparent:Boolean(obj.glass),opacity:obj.glass?.18:1,depthWrite:!obj.glass});
 const add=ps=>{if(sweep<=0)return;const m=new T.Mesh(new T.LatheGeometry(ps.map(norm),128,0,angle),mat());m.userData.component=obj.id;group.add(m)};
 if(obj.glass||obj.id==='cream'||obj.id==='sand')add(closed);else for(let i=0;i<closed.length-1;i++){const p=closed[i],q=closed[i+1];if(p[0]<1e-8&&q[0]<1e-8)continue;if(obj.omitInner&&i>=4)continue;add([p,q])}
 if(!obj.glass&&sweep<360){const pts=profile.map(norm),faces=T.ShapeUtils.triangulateShape(pts,[]);for(const a of sweep===0?[0]:[0,angle]){const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pts.flatMap(p=>[p.x*Math.sin(a),p.y,p.x*Math.cos(a)]),3));geo.setIndex(faces.flat());geo.computeVertexNormals();const m=new T.Mesh(geo,mat());m.userData.component=obj.id;group.add(m)}}
 }
 }
 const edge=(ps,color='#596b79',dash=false)=>{const m=dash?new T.LineDashedMaterial({color,dashSize:.15,gapSize:.09}):new T.LineBasicMaterial({color}),line=new T.Line(new T.BufferGeometry().setFromPoints(ps),m);if(dash)line.computeLineDistances();group.add(line)};
 const line=(a,b)=>{const A=norm(a),B=norm(b);edge([new T.Vector3(A.x,A.y,0),new T.Vector3(B.x,B.y,0)],decomposition(key,g)?'#7c8394':'#9c2946',true)};
 edge([new T.Vector3(0,(g.minY-center)*k-.3,0),new T.Vector3(0,(g.maxY-center)*k+.4,0)],'#596b79',true);
 if($('auxiliary').checked)for(const[a,b]of g.auxLines)line(g.points[a],g.points[b]);
 if(key==='2013-nt-i'&&$('sphere').checked){const p={id:'sphere',name:'Kugel',fill:'#bf5c88',text:'#8b2857',lo:-Infinity,hi:Infinity,profile:g.sphere};decompositionMeshes(T,group,norm,sweep,{key:'sphere',profile:g.sphere,parts:[p],voids:[],breaks:[],circles:[[g.r,g.center]]})}
 applyMeshColorMode(group,colorToggle.checked);
 const liquid=currentLiquid();
 if(liquid){
  for(const mesh of group.children.filter(o=>o.isMesh)){
   mesh.material.transparent=true;mesh.material.opacity=.26;mesh.material.depthWrite=false;
   mesh.renderOrder=2;
  }
  const addLiquid=(id,profile,fill,transparent,circles=[])=>{
   const start=group.children.length;
   decompositionMeshes(T,group,norm,sweep,{key:id,profile,parts:[{id,profile,fill,lo:-Infinity,hi:Infinity}],voids:[],breaks:[],circles});
   for(const mesh of group.children.slice(start)){
    mesh.material.transparent=transparent;mesh.material.opacity=transparent?.55:1;mesh.material.depthWrite=!transparent;
    mesh.renderOrder=transparent?1:0;
   }
  };
  if(liquid.height>0)addLiquid('water',liquid.profile,'#52a6d7',true);
  if(liquid.sphere)addLiquid('ball',liquid.sphere,'#657587',false,[[ballRadius,ballRadius]]);
 }

}
window.oldRotationState=()=>({key,part,step,componentColors:colorToggle.checked,sphereVisible:key==='2013-nt-i'&&$('sphere').checked,focus:focus(),sweep,view,geometry:g,liquid:currentLiquid(),three:three?{orthographic:three.cam.isOrthographicCamera,mode:three.mode,position:three.cam.position.toArray(),up:three.cam.up.toArray(),zoom:three.cam.zoom,scale:three.k,center:three.center,meshes:three.group.children.filter(x=>x.isMesh).length,materials:three.group.children.filter(x=>x.isMesh).map(x=>({component:x.userData.component,color:'#'+x.material.color.getHexString(),opacity:x.material.opacity,transparent:x.material.transparent}))}:null});
reset();window.addEventListener('load',()=>math());




