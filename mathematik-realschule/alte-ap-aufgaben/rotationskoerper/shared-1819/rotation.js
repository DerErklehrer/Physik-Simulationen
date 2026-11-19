import {bindRotationAngle} from '../../../../assets/rotation-angle.js?v=20261119';
import {installColorToggle,applySVGColorMode,applyMeshColorMode} from '../shared-colors/toggle.js';
import {decomposition,legendHTML,colorSolution,drawDecomposition,decompositionMeshes} from '../shared-colors/decomposition.js';
import {tasks} from './tasks.js';
import {geometry} from './geometry.js';
const $=id=>document.getElementById(id),key=document.body.dataset.task,data=tasks[key],g=geometry(key),fmt=(v,n=2)=>v.toFixed(n).replace('.',',');
const initialSweep=key==='2018-ht'?225:360;
let part=0,step=0,view='2d',sweep=initialSweep,three=null,mathQueue=Promise.resolve();
const colorToggle=installColorToggle(()=>render());
const current=()=>data.parts[part],focus=()=>current().steps[step][2];
function math(){mathQueue=mathQueue.catch(()=>{}).then(async()=>{if(window.MathJax?.startup?.promise){await MathJax.startup.promise;await MathJax.typesetPromise([$ ('intro'),$('statement'),$('solution'),$('measure')])}});return mathQueue}
function clearMath(){if(window.MathJax?.typesetClear)MathJax.typesetClear([$('statement'),$('solution'),$('measure')])}
$('intro').innerHTML=(data.introId?'<h3>'+data.introId+'</h3>':'')+data.intro;$('rounding').textContent=data.rounding;
for(const link of document.querySelectorAll('nav.buttons a'))if(new URL(link.href).pathname===location.pathname)link.setAttribute('aria-current','page');
function updateLegend(){const d=decomposition(key,g);if(d){let legend=document.getElementById('legend')||document.querySelector('.legend');if(legend)legend.innerHTML=legendHTML(d)}}
function render(){clearMath();$('parts').replaceChildren();data.parts.forEach((p,i)=>{const b=document.createElement('button');b.textContent=p.id;b.className=i===part?'active':'';b.setAttribute('aria-pressed',String(i===part));b.onclick=()=>{part=i;step=0;render()};$('parts').append(b)});const p=current(),s=p.steps[step];$('statement').innerHTML=`<h3>${p.id} <span class="tag">${p.points} P</span></h3><div>${p.statement}</div>`;$('stepTitle').textContent=`${step+1} · ${s[0]}`;$('count').textContent=`${step+1} von ${p.steps.length}`;$('solution').innerHTML=colorSolution(s[1],decomposition(key,g));updateLegend();$('prev').disabled=step===0;$('next').disabled=step===p.steps.length-1;draw2d();measure();math();if(three)rebuild3d()}
$('prev').onclick=()=>{if(step>0){step--;render()}};$('next').onclick=()=>{if(step<current().steps.length-1){step++;render()}};
function reset(){part=0;step=0;sweep=initialSweep;setSweep(sweep,false);$('auxiliary').checked=true;setView('2d');if(three)camera('default');render()}
$('reset').onclick=reset;$('auxiliary').onchange=()=>{draw2d();if(three)rebuild3d()};
function measure(){const unit=g.units,tex=v=>fmt(v,5).replace(',','{,}'),label=key==='2018-nt'?'Sandvolumen':'Volumen des Körpers';let extra=key==='2018-ht'?String.raw`<p>Oberer Radius: \(${tex(g.R)}\,\mathrm{cm}\); unterer Radius: \(${tex(g.r)}\,\mathrm{cm}\).</p><p>Cremefüllung ohne Zwischenrundung: \(${tex(g.creamVolume)}\,\mathrm{cm}^3\).</p>`:key==='2018-nt'?String.raw`<p>Zylinderhöhe bis zur Fülllinie: \(${tex(g.fill-g.R)}\,\mathrm{mm}\).</p><p>Zeit ohne Zwischenrundung: \(${tex(g.time)}\,\mathrm{s}\).</p>`:String.raw`<p>Höhe des ergänzten Kegels: \(${tex(g.large)}\,\mathrm{cm}\).</p><p>Durchmesser \(\lvert\overline{HC}\rvert\approx${tex(2*g.r)}\,\mathrm{cm}\).</p>`;$('measure').innerHTML=extra+String.raw`<p>${label} ohne Zwischenrundung: \(${tex(g.volume)}\,\mathrm{${unit}}^3\).</p><p>Rotation ${sweep}°: Volumen des dargestellten Ausschnitts \(${tex(g.volume*sweep/360)}\,\mathrm{${unit}}^3\).</p>`}
const NS='http://www.w3.org/2000/svg';
$('legend').innerHTML=key==='2018-ht'?'<span style="--c:#a46b37">Schokolade</span><span style="--c:#4e91b6">Cremefüllung</span>':key==='2018-nt'?'<span style="--c:#a2bdd0">Glasform</span><span style="--c:#4e91b6">Sand bis zur Fülllinie</span>':'<span style="--c:#e5a64d">Sitzkörper</span><span style="--c:#9c2946">Ergänzte Kegel</span>';
$('auxLabel').textContent=key==='2018-nt'?'Glasform anzeigen':'Ergänzte Kegel und Hilfslinien anzeigen';
function draw2d(){const svg=$('plot');svg.replaceChildren();const scale=Math.min(408/(g.maxY-g.minY),440/(2*g.R)),mid=(g.minY+g.maxY)/2,map=([x,y])=>[320+x*scale,270-(y-mid)*scale];
 const el=(tag,attrs,parent=svg)=>{const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);parent.append(e);return e};
 const title=el('title',{});title.textContent=data.title+' · Axialschnitt';
 const line=(a,b,attrs={})=>{const A=map(a),B=map(b);return el('line',{x1:A[0],y1:A[1],x2:B[0],y2:B[1],stroke:'#536577','stroke-width':1.7,...attrs})};
 const polygon=(ps,attrs={})=>el('polygon',{points:ps.map(p=>map(p).join(',')).join(' '),fill:'#e5a64d','fill-opacity':.55,stroke:'#314857','stroke-width':2.5,...attrs});
 const label=(text,p,dx=0,dy=0,anchor='middle')=>{const A=map(p),e=el('text',{x:A[0]+dx,y:A[1]+dy,'font-size':19,'font-family':'system-ui, sans-serif','font-weight':600,fill:'#263544','text-anchor':anchor,'paint-order':'stroke',stroke:'white','stroke-width':4});e.textContent=text;return e};
 const right=(p,dx,dy)=>{const a=map(p),rad=13;el('path',{d:`M ${a[0]+dx*rad} ${a[1]} A ${rad} ${rad} 0 0 ${dx*dy>0?1:0} ${a[0]} ${a[1]+dy*rad}`,fill:'none',stroke:'#536577','stroke-width':1.2});el('circle',{cx:a[0]+dx*rad/Math.sqrt(8),cy:a[1]+dy*rad/Math.sqrt(8),r:2.2,fill:'#536577'})};
 const angle=(p,start,end,r=29)=>{const a=map(p);el('path',{d:`M ${a[0]+r*Math.cos(start)} ${a[1]+r*Math.sin(start)} A ${r} ${r} 0 0 ${end>start?1:0} ${a[0]+r*Math.cos(end)} ${a[1]+r*Math.sin(end)}`,stroke:'#9c2946',fill:'none','stroke-width':1.8})};
 const dashed={'stroke-dasharray':'6 5',stroke:decomposition(key,g)?'#7c8394':'#9c2946'};
 if(key==='2018-ht'){
  polygon(g.outline,{fill:'#a46b37'});const c=map([0,g.creamCenter]);el('circle',{cx:c[0],cy:c[1],r:g.creamRadius*scale,fill:'#4e91b6','fill-opacity':.8,stroke:'#314857','stroke-width':1.8});
  if($('auxiliary').checked){line(g.points.A,g.points.S,dashed);line(g.points.B,g.points.S,dashed)}right(g.points.M,-1,1);right(g.points.N,-1,1);angle(g.points.D,0,71.6*Math.PI/180);label('71,6°',g.points.D,42,27,'start');
 }else if(key==='2018-nt'){
  if($('auxiliary').checked)polygon(g.outline,{fill:'#dbe9f2','fill-opacity':.3});
  const sand=[...g.sandSide,...g.sandSide.slice().reverse().map(([x,y])=>[-x,y])];polygon(sand,{fill:'#4e91b6','fill-opacity':.7});
  line([-g.R-17,g.fill],[g.R,g.fill],{'stroke-dasharray':'6 4',stroke:'#4e91b6'});label('Fülllinie',[-g.R-18,g.fill],0,-9,'end');
  line([-1,g.fill],g.points.A,dashed);right([-1,g.fill],-1,-1);right(g.points.M,-1,-1);angle(g.points.B,0,-59*Math.PI/180,25);label('59°',g.points.B,28,-25,'start');
  const end=[g.R/Math.sqrt(2),g.R-g.R/Math.sqrt(2)];line(g.points.M,end,{'stroke-dasharray':'5 4'});label('r',[end[0]/2,(g.R+end[1])/2],9,5,'start');
  line([g.R+9,0],[g.R+9,50]);for(const y of[0,50])line([g.R+7,y],[g.R+11,y]);label('50 mm',[g.R+9,25],13,6,'start');
 }else{
  if(!drawDecomposition(decomposition(key,g),polygon,line))polygon(g.outline);if($('auxiliary').checked){line(g.points.H,g.points.S,dashed);line(g.points.C,g.points.S,dashed)}line(g.points.G,g.points.D,{'stroke-dasharray':'5 4'});right(g.points.M,-1,-1);right(g.points.O,1,-1);right(g.points.N,-1,1);angle(g.points.S,Math.PI/2,Math.PI/2+16*Math.PI/180,36);label('16°',g.points.S,-20,58,'end');
 }
 line([0,g.minY-.025*(g.maxY-g.minY)],[0,g.maxY+.025*(g.maxY-g.minY)],{'stroke-dasharray':'9 4 2 4',stroke:'#263544'});
 const hi=(a,b)=>line(g.points[a],g.points[b],{stroke:'#9c2946','stroke-width':4});
 if(key==='2018-ht'){if(focus()==='radius')hi('M','D');if(focus()==='small')hi('A','N')}
 if(key==='2019-ht'){if(focus()==='large')hi('M','S');if(focus()==='small')hi('O','S');if(focus()==='radius')hi('H','C');if(focus()==='cylinder'){hi('F','G');hi('F','N')}}
 if(key==='2018-nt'){if(focus()==='height')hi('B','C');if(focus()==='triangle'){line(g.points.A,[-1,g.fill],{stroke:'#9c2946','stroke-width':4});line(g.points.B,[-1,g.fill],{stroke:'#9c2946','stroke-width':4})}}
 for(const[n,p]of Object.entries(g.points)){let dx=p[0]<0?-13:13,dy=6,anchor=p[0]<0?'end':'start';if(['M','N','O'].includes(n)){dx=12;dy=n==='N'&&key==='2018-ht'?22:-12}if(n==='S'){dx=12;dy=key==='2018-ht'?21:-12}if(n==='D'&&key==='2018-nt'){dx=12;dy=23}if(key==='2018-nt'&&['A','G'].includes(n))dy=-9;if(key==='2019-ht'&&['H','C','G','D'].includes(n))dy=18;label(n,p,dx,dy,anchor)}
 label(g.axis==='Rotationsachse'?g.axis:'Rotationsachse '+g.axis,[0,g.maxY],0,-44);applySVGColorMode(svg,colorToggle.checked);svg.dataset.focus=focus();}
async function setView(mode){view=mode;$('plot').toggleAttribute('hidden',mode!=='2d');$('threewrap').hidden=mode!=='3d';$('cameraControls').hidden=mode!=='3d';$('sweepControl').hidden=mode!=='3d';for(const[v,id]of[['2d','view2'],['3d','view3']]){$(id).classList.toggle('active',mode===v);$(id).setAttribute('aria-pressed',String(mode===v))}if(mode==='3d'){if(!three)await init3d();else three.resize()}}
$('view2').onclick=()=>setView('2d');$('view3').onclick=()=>setView('3d');
const setSweep=bindRotationAngle($('sweep'),$('sweepValue'),$('cutaway'),angle=>{
 sweep=angle;clearMath();measure();math();if(three)rebuild3d();
});
for(const[id,mode]of[['cameraReset','default'],['top','top'],['bottom','bottom'],['inverted','inverted']])$(id).onclick=()=>camera(mode);
async function init3d(){try{const T=await import('three'),{TrackballControls}=await import('https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/controls/TrackballControls.js');const renderer=new T.WebGLRenderer({canvas:$('canvas'),antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));const scene=new T.Scene();scene.background=new T.Color('#f7f9fc');const cam=new T.OrthographicCamera(-5.3,5.3,5.3,-5.3,.1,200);const controls=new TrackballControls(cam,$('canvas'));controls.staticMoving=true;controls.noPan=true;controls.rotateSpeed=3;controls.zoomSpeed=1.2;controls.minZoom=.4;controls.maxZoom=4;const group=new T.Group();scene.add(group);scene.add(new T.HemisphereLight(0xffffff,0x58677c,2));for(const p of[[8,12,9],[-8,6,-4]]){const l=new T.DirectionalLight(0xffffff,1.8);l.position.set(...p);scene.add(l)}const k=7/Math.max(2*g.R,g.maxY-g.minY),center=(g.minY+g.maxY)/2;
 const resize=()=>{const w=$('threewrap').clientWidth||640,h=$('threewrap').clientHeight||540;cam.left=-5.3*w/h;cam.right=5.3*w/h;cam.top=5.3;cam.bottom=-5.3;cam.updateProjectionMatrix();renderer.setSize(w,h,false);controls.handleResize()};three={T,renderer,scene,cam,controls,group,k,center,resize,mode:'default'};new ResizeObserver(resize).observe($('threewrap'));resize();camera('default');rebuild3d();const tick=()=>{requestAnimationFrame(tick);if(view==='3d'){controls.update();renderer.render(scene,cam)}};tick();$('threeError').hidden=true;}catch(e){$('threeError').hidden=false;$('threeError').textContent='Die 3D-Ansicht benötigt WebGL und eine Internetverbindung. Axialschnitt und Lernlösungen stehen weiterhin zur Verfügung.';console.error(e)}}
function camera(mode){if(!three)return;const{cam,controls}=three;three.mode=mode;cam.zoom=1;controls.target.set(0,0,0);cam.up.set(0,1,0);if(mode==='top'||mode==='bottom'){cam.position.set(0,mode==='top'?24:-24,.0001);cam.up.set(0,0,mode==='top'?-1:1)}else{cam.position.set(-11,13,16);if(mode==='inverted')cam.up.set(0,-1,0)}cam.lookAt(0,0,0);cam.updateProjectionMatrix();controls.update()}
function rebuild3d(){const{T,group,k,center}=three;while(group.children.length){const o=group.children[0];group.remove(o);o.geometry?.dispose();o.material?.dispose()}const norm=([r,y])=>new T.Vector2(r*k,(y-center)*k),angle=sweep*Math.PI/180;
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
 if($('auxiliary').checked&&key!=='2018-nt'){if(key==='2018-ht'){line(g.points.A,g.points.S);line(g.points.B,g.points.S)}else{line(g.points.H,g.points.S);line(g.points.C,g.points.S)}}
 applyMeshColorMode(group,colorToggle.checked);
}
window.oldRotationState=()=>({key,part,step,componentColors:colorToggle.checked,focus:focus(),sweep,view,geometry:g,three:three?{orthographic:three.cam.isOrthographicCamera,mode:three.mode,position:three.cam.position.toArray(),up:three.cam.up.toArray(),zoom:three.cam.zoom,meshes:three.group.children.filter(x=>x.isMesh).length,materials:three.group.children.filter(x=>x.isMesh).map(x=>({component:x.userData.component,color:'#'+x.material.color.getHexString(),opacity:x.material.opacity,transparent:x.material.transparent}))}:null});
reset();window.addEventListener('load',()=>math());


