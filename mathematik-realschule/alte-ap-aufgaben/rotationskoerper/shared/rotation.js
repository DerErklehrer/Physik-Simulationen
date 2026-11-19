import '../../../../assets/rotation-angle.js?v=20261119';
import {installColorToggle,applySVGColorMode,applyMeshColorMode} from '../shared-colors/toggle.js';
import {decomposition,legendHTML,colorSolution,drawDecomposition,decompositionMeshes} from '../shared-colors/decomposition.js';
import {tasks} from './tasks.js';
import {geometry} from './geometry.js';
const $=id=>document.getElementById(id),key=document.body.dataset.task,data=tasks[key],g=geometry(key),fmt=(v,n=2)=>v.toFixed(n).replace('.',',');
let part=0,step=0,view='2d',sweep=360,three=null,mathQueue=Promise.resolve();
const colorToggle=installColorToggle(()=>render());
const current=()=>data.parts[part],focus=()=>current().steps[step][2];
function math(){mathQueue=mathQueue.catch(()=>{}).then(async()=>{if(window.MathJax?.startup?.promise){await MathJax.startup.promise;await MathJax.typesetPromise([$ ('intro'),$('statement'),$('solution'),$('measure')])}});return mathQueue}
function clearMath(){if(window.MathJax?.typesetClear)MathJax.typesetClear([$('statement'),$('solution'),$('measure')])}
$('intro').innerHTML=(key==='2022-ht'?'<h3>A 1.0</h3>':'')+data.intro;$('rounding').textContent=data.rounding;
for(const link of document.querySelectorAll('nav.buttons a'))if(new URL(link.href).pathname===location.pathname)link.setAttribute('aria-current','page');
function updateLegend(){const d=decomposition(key,g);if(d){let legend=document.getElementById('legend')||document.querySelector('.legend');if(legend)legend.innerHTML=legendHTML(d)}}
function render(){clearMath();$('parts').replaceChildren();data.parts.forEach((p,i)=>{const b=document.createElement('button');b.textContent=p.id;b.className=i===part?'active':'';b.setAttribute('aria-pressed',String(i===part));b.onclick=()=>{part=i;step=0;render()};$('parts').append(b)});const p=current(),s=p.steps[step];$('statement').innerHTML=`<h3>${p.id} <span class="tag">${p.points} P</span></h3><div>${p.statement}</div>`;$('stepTitle').textContent=`${step+1} · ${s[0]}`;$('count').textContent=`${step+1} von ${p.steps.length}`;$('solution').innerHTML=colorSolution(s[1],decomposition(key,g));updateLegend();$('prev').disabled=step===0;$('next').disabled=step===p.steps.length-1;draw2d();measure();math();if(three)rebuild3d()}
$('prev').onclick=()=>{if(step>0){step--;render()}};$('next').onclick=()=>{if(step<current().steps.length-1){step++;render()}};
function reset(){part=0;step=0;sweep=360;setSweep(sweep,false);$('auxiliary').checked=true;setView('2d');if(three)camera('default');render()}
$('reset').onclick=reset;$('auxiliary').onchange=()=>{draw2d();if(three)rebuild3d()};
function measure(){const extra=key==='2021-ht'?`Großer Kegel: Höhe ${fmt(g.large)} cm; kleiner Kegel: Höhe ${fmt(g.small)} cm.`:key==='2022-ht'?`Kegelstumpfhöhe: ${fmt(g.height)} cm; Radius der Halbkugelaussparung: ${fmt(g.cavity)} cm.`:`Kegelstumpfhöhe: ${fmt(g.join)} cm; Zylinderhöhe: 3,00 cm; Radius der Halbkugelaussparung: 2,00 cm.`;$('measure').innerHTML=`<p>${extra}</p><p>Volumen des vollständigen Körpers ohne Zwischenrundung: \\(${fmt(g.volume,5).replace(',','{,}')}\\,\\mathrm{cm}^3\\).</p><p>Rotation ${sweep}°: geometrisches Volumen des dargestellten Ausschnitts \\(${fmt(g.volume*sweep/360).replace(',','{,}')}\\,\\mathrm{cm}^3\\).</p>`}
const NS='http://www.w3.org/2000/svg';
function draw2d(){const svg=$('plot');svg.replaceChildren();const title=document.createElementNS(NS,'title');title.textContent=data.title+' · originalgetreuer Axialschnitt';svg.append(title);const scale=Math.min(408/(g.maxY-g.minY),440/(2*g.R)),mid=(g.minY+g.maxY)/2,map=([x,y])=>[320+x*scale,270-(y-mid)*scale];
 const el=(tag,attrs,parent=svg)=>{const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);parent.append(e);return e};
 const line=(a,b,attrs={})=>{const A=map(a),B=map(b);return el('line',{x1:A[0],y1:A[1],x2:B[0],y2:B[1],stroke:'#536577','stroke-width':1.8,...attrs})};
 const polygon=(ps,attrs={})=>el('polygon',{points:ps.map(p=>map(p).join(',')).join(' '),fill:'#e5a64d','fill-opacity':.6,stroke:'#314857','stroke-width':2.5,...attrs});
 const label=(text,p,dx=0,dy=0,anchor='middle')=>{const a=map(p),e=el('text',{x:a[0]+dx,y:a[1]+dy,'font-size':19,'font-family':'system-ui, sans-serif','font-weight':600,fill:'#263544','text-anchor':anchor,'paint-order':'stroke',stroke:'white','stroke-width':4,'stroke-linejoin':'round'});e.textContent=text};
 const right=(p,dx,dy)=>{const a=map(p),rad=13;el('path',{d:`M ${a[0]+dx*rad} ${a[1]} A ${rad} ${rad} 0 0 ${dx*dy>0?1:0} ${a[0]} ${a[1]+dy*rad}`,fill:'none',stroke:'#536577','stroke-width':1.2});el('circle',{cx:a[0]+dx*rad/Math.sqrt(8),cy:a[1]+dy*rad/Math.sqrt(8),r:2.2,fill:'#536577'})};
 if(!drawDecomposition(decomposition(key,g),polygon,line)){
 // The missing material is shown as a blue region, separate from the gold cross-section.
 if(key==='2021-ht')polygon([[-g.R,g.height],[g.R,g.height],[g.r,g.floor],[-g.r,g.floor]],{fill:'#4e91b6','fill-opacity':.13,stroke:'none'});
 else {const pts=[];for(let i=0;i<=120;i++){const a=i*Math.PI/120;pts.push([g.cavity*Math.cos(a),g.height-g.cavity*Math.sin(a)])}polygon(pts,{fill:'#4e91b6','fill-opacity':.13,stroke:'none'})}
 polygon(g.outline);
 }
 line([0,g.minY-.35],[0,g.maxY+.45],{'stroke-dasharray':'10 4 2 4',stroke:'#263544'});
 const dashed={'stroke-dasharray':'6 5',stroke:decomposition(key,g)?'#7c8394':'#9c2946'};
 if($('auxiliary').checked){if(key==='2021-ht'){line(g.points.F,g.points.G,dashed);line(g.points.C,g.points.G,dashed)}else if(key==='2022-ht'){line(g.points.B,g.points.C,dashed);line(g.points.D,g.points.C,dashed)}else{line(g.points.A,g.points.F,dashed);line(g.points.B,g.points.F,dashed)}}
 if(key==='2021-ht'){line(g.points.F,g.points.C,{'stroke-dasharray':'5 4'});right(g.points.K,-1,1);right(g.points.H,-1,1);
 const F=map(g.points.F),start=0,end=50*Math.PI/180,rad=32;el('path',{d:`M ${F[0]+rad} ${F[1]} A ${rad} ${rad} 0 0 1 ${F[0]+rad*Math.cos(end)} ${F[1]+rad*Math.sin(end)}`,stroke:'#9c2946',fill:'none','stroke-width':1.7});label('50°',g.points.F,53,24,'start');}
 else{const topY=g.height;line([-g.R,topY],[g.R,topY],{'stroke-dasharray':'5 4'});right(g.points.M,1,1);if(key==='2022-ht')right(g.points.N,-1,-1);else{line(g.points.I,g.points.C,{'stroke-dasharray':'5 4'});right(g.points.K,-1,-1);right(g.points.N,-1,-1);line(g.points.M,g.points.E,{'stroke-width':focus()==='radii'?4:1.6,stroke:'#4e91b6'})}}
 if(key!=='2021-ht'){const end=[g.cavity/Math.sqrt(2),g.height-g.cavity/Math.sqrt(2)];line(g.points.M,end,{'stroke-dasharray':'5 4',stroke:'#4e91b6'});label('r',[end[0]/2,(g.height+end[1])/2],10,5,'start')}
 for(const[n,p]of Object.entries(g.points)){let dx=p[0]<0?-13:p[0]>0?13:13,dy=6,anchor=p[0]<0?'end':'start';if(['M','K'].includes(n)){dx=12;dy=-12}if(n==='H'&&key==='2021-ht'){dx=12;dy=-8}if(n==='G'&&key==='2021-ht'){dx=12;dy=18}if(n==='C'&&key==='2022-ht'){dx=12;dy=19}if(n==='F'&&key==='2022-nt'){dx=12;dy=19}if(n==='N'){dx=12;dy=22}if(n==='F'&&key==='2022-ht'||n==='G'&&key!=='2021-ht'){dy=-14;dx=0;anchor='middle'}label(n,p,dx,dy,anchor)}
 const highlight=(a,b)=>line(g.points[a],g.points[b],{stroke:'#9c2946','stroke-width':4});
 if(focus()==='large'){if(key==='2021-ht')highlight('G','K');else if(key==='2022-ht')highlight('C','M');else highlight('F','N')}
 if(focus()==='small')highlight('G','H');
 if(focus()==='radii'){if(key==='2021-ht'){highlight('F','K');highlight('E','H')}else if(key==='2022-ht'){highlight('M','E');highlight('N','D');highlight('M','F')}else{highlight('A','N');highlight('I','K');highlight('M','E')}}
 label('Rotationsachse '+g.axis,[0,g.maxY],0,-44);applySVGColorMode(svg,colorToggle.checked);svg.dataset.focus=focus();}
async function setView(mode){view=mode;$('plot').toggleAttribute('hidden',mode!=='2d');$('threewrap').hidden=mode!=='3d';$('cameraControls').hidden=mode!=='3d';$('sweepControl').hidden=mode!=='3d';for(const[v,id]of[['2d','view2'],['3d','view3']]){$(id).classList.toggle('active',mode===v);$(id).setAttribute('aria-pressed',String(mode===v))}if(mode==='3d'){if(!three)await init3d();else three.resize()}}
$('view2').onclick=()=>setView('2d');$('view3').onclick=()=>setView('3d');
const setSweep=bindRotationAngle($('sweep'),$('sweepValue'),$('cutaway'),angle=>{
 sweep=angle;clearMath();measure();math();if(three)rebuild3d();
});
for(const[id,mode]of[['cameraReset','default'],['top','top'],['bottom','bottom'],['inverted','inverted']])$(id).onclick=()=>camera(mode);
async function init3d(){try{const T=await import('three'),{TrackballControls}=await import('https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/controls/TrackballControls.js');const renderer=new T.WebGLRenderer({canvas:$('canvas'),antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));const scene=new T.Scene();scene.background=new T.Color('#f7f9fc');const cam=new T.OrthographicCamera(-5.4,5.4,5.4,-5.4,.1,200);const controls=new TrackballControls(cam,$('canvas'));controls.staticMoving=true;controls.noPan=true;controls.rotateSpeed=3;controls.zoomSpeed=1.2;controls.minZoom=.4;controls.maxZoom=4;const group=new T.Group();scene.add(group);scene.add(new T.HemisphereLight(0xffffff,0x58677c,2));for(const p of[[8,12,9],[-8,6,-4]]){const l=new T.DirectionalLight(0xffffff,1.8);l.position.set(...p);scene.add(l)}const low=Math.min(g.apex,0),k=7.0/Math.max(2*g.R,g.height-low),center=(g.height+low)/2;
 const resize=()=>{const w=$('threewrap').clientWidth||640,h=$('threewrap').clientHeight||540;cam.left=-5.3*w/h;cam.right=5.3*w/h;cam.top=5.3;cam.bottom=-5.3;cam.updateProjectionMatrix();renderer.setSize(w,h,false);controls.handleResize()};three={T,renderer,scene,cam,controls,group,k,center,resize,mode:'default'};new ResizeObserver(resize).observe($('threewrap'));resize();camera('default');rebuild3d();const tick=()=>{requestAnimationFrame(tick);if(view==='3d'){controls.update();renderer.render(scene,cam)}};tick();$('threeError').hidden=true;}catch(e){$('threeError').hidden=false;$('threeError').textContent='Die 3D-Ansicht benötigt WebGL und eine Internetverbindung. Axialschnitt und Lernlösungen stehen weiterhin zur Verfügung.';console.error(e)}}
function camera(mode){if(!three)return;const{cam,controls}=three;three.mode=mode;cam.zoom=1;controls.target.set(0,0,0);cam.up.set(0,1,0);if(mode==='top'||mode==='bottom'){cam.position.set(0,mode==='top'?24:-24,.0001);cam.up.set(0,0,mode==='top'?-1:1)}else{cam.position.set(11,13,16);if(mode==='inverted')cam.up.set(0,-1,0)}cam.lookAt(0,0,0);cam.updateProjectionMatrix();controls.update()}
function rebuild3d(){const{T,group,k,center}=three;while(group.children.length){const o=group.children[0];group.remove(o);o.geometry?.dispose();o.material?.map?.dispose();o.material?.dispose()}const norm=([r,y])=>new T.Vector2(r*k,(y-center)*k),a=sweep*Math.PI/180;
 if(!decompositionMeshes(T,group,norm,sweep,decomposition(key,g))){
 const profile=g.profile.filter((p,i,arr)=>i===0||Math.hypot(p[0]-arr[i-1][0],p[1]-arr[i-1][1])>1e-8);if(Math.hypot(profile[0][0]-profile.at(-1)[0],profile[0][1]-profile.at(-1)[1])<1e-8)profile.pop();const closed=[...profile,profile[0]];
 const material=color=>new T.MeshStandardMaterial({color,side:T.DoubleSide,roughness:.75,metalness:0,transparent:false,opacity:1});
 // Group the curved hemispherical cavity so its normals remain smooth.
 const segments=[];for(let i=0;i<closed.length-1;i++){const p=closed[i],q=closed[i+1];if(p[0]<1e-8&&q[0]<1e-8)continue;const cavity=key==='2021-ht'?i>=2:(p[1]<=g.height+1e-7&&q[1]<=g.height+1e-7&&i>=(key==='2022-ht'?3:4));const last=segments.at(-1);if(cavity&&last?.cavity&&key!=='2021-ht')last.points.push(q);else segments.push({points:[p,q],cavity})}
 if(sweep>0)for(const s of segments){const mesh=new T.Mesh(new T.LatheGeometry(s.points.map(norm),128,0,a),material(s.cavity?'#4e91b6':'#e5a64d'));mesh.userData.component=s.cavity?'cavity':'body';group.add(mesh)}
 if(sweep<360){const pts=profile.map(norm),faces=T.ShapeUtils.triangulateShape(pts,[]);for(const angle of sweep===0?[0]:[0,a]){const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pts.flatMap(p=>[p.x*Math.sin(angle),p.y,p.x*Math.cos(angle)]),3));geo.setIndex(faces.flat());geo.computeVertexNormals();const mesh=new T.Mesh(geo,material('#e5a64d'));mesh.userData.component='cut';group.add(mesh)}}
 }
 const edge=(points,color='#485b6c',dashed=false)=>{const geo=new T.BufferGeometry().setFromPoints(points),m=dashed?new T.LineDashedMaterial({color,dashSize:.15,gapSize:.09}):new T.LineBasicMaterial({color});const line=new T.Line(geo,m);if(dashed)line.computeLineDistances();group.add(line)};
 const circle=(r,y)=>{const ps=[];for(let i=0;i<=128;i++){const angle=a*i/128;ps.push(new T.Vector3(r*k*Math.sin(angle),(y-center)*k,r*k*Math.cos(angle)))}edge(ps)};
 circle(key==='2021-ht'?g.R:key==='2022-ht'?g.r:g.R,0);circle(key==='2022-ht'?g.R:key==='2022-nt'?g.r:g.R,g.height);if(key==='2021-ht')circle(g.r,g.floor);else circle(g.cavity,g.height);if(key==='2022-nt')circle(g.r,g.join);
 edge([new T.Vector3(0,(g.minY-center)*k-.45,0),new T.Vector3(0,(g.maxY-center)*k+.5,0)],'#596b79',true);
 if($('auxiliary').checked){let apex,radius,height;if(key==='2021-ht'){apex=g.apex;radius=g.R;height=g.height}else if(key==='2022-ht'){apex=g.apex;radius=g.R;height=g.height}else{apex=g.apex;radius=g.R;height=0}for(const angle of[0,Math.PI/2,Math.PI,3*Math.PI/2])edge([new T.Vector3(0,(apex-center)*k,0),new T.Vector3(radius*k*Math.sin(angle),(height-center)*k,radius*k*Math.cos(angle))],decomposition(key,g)?'#7c8394':'#9c2946',true)}
 applyMeshColorMode(group,colorToggle.checked);
}
window.oldRotationState=()=>({key,part,step,componentColors:colorToggle.checked,focus:focus(),sweep,view,geometry:g,three:three?{orthographic:three.cam.isOrthographicCamera,mode:three.mode,position:three.cam.position.toArray(),up:three.cam.up.toArray(),zoom:three.cam.zoom,meshes:three.group.children.filter(x=>x.isMesh).length,materials:three.group.children.filter(x=>x.isMesh).map(x=>({component:x.userData.component,color:'#'+x.material.color.getHexString(),opacity:x.material.opacity,transparent:x.material.transparent})),profile:g.profile}:null});
reset();window.addEventListener('load',()=>math());


