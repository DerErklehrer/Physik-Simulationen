import {bindRotationAngle} from '../../../assets/rotation-angle.js?v=20261119';
// Raumgeometrie 2025: Originalskizze bleibt erhalten, interaktive 3D-Ergänzung.
// Three.js wie in der Referenzprüfung 2026, orthografische Kamera und OrbitControls.
import * as THREE from 'three';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/controls/OrbitControls.js';
const host=document.getElementById('view3d2025');
let scene,camera,renderer,controls,model,active=false,topMode=false;
let sweep=360, coneView;
const rotationControls=document.createElement('div');
rotationControls.innerHTML='<div class="buttons"><button id="cutaway" type="button">Ein Viertel herausschneiden</button></div><label for="sweep">Rotation: <strong id="sweepValue">360°</strong></label><input id="sweep" type="range" min="0" max="360" step="1" value="360">';
rotationControls.hidden=true;
host.after(rotationControls);
const setSweep=bindRotationAngle(
 rotationControls.querySelector('#sweep'),
 rotationControls.querySelector('#sweepValue'),
 rotationControls.querySelector('#cutaway'),
 angle=>{sweep=angle;if(active&&coneView)build('A 2',...coneView);}
);
document.getElementById('reset')?.addEventListener('click',()=>setSweep(360));
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
function face(points,color,opacity=.30){const v=[];for(let i=1;i<points.length-1;i++)for(const p of [points[0],points[i],points[i+1]])v.push(p.x,p.y,p.z);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));g.computeVertexNormals();return new THREE.Mesh(g,new THREE.MeshPhongMaterial({color,transparent:true,opacity,side:THREE.DoubleSide,depthWrite:false}));}
function edge(a,b,color=0x2c506e){return new THREE.Line(new THREE.BufferGeometry().setFromPoints([a,b]),new THREE.LineBasicMaterial({color}));}
function label(pos,t){const cn=document.createElement('canvas');cn.width=256;cn.height=96;const ctx=cn.getContext('2d');ctx.font='bold 52px Arial';ctx.fillStyle='#273c4f';ctx.fillText(t,12,64);const tx=new THREE.CanvasTexture(cn);tx.colorSpace=THREE.SRGBColorSpace;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,transparent:true,depthTest:false}));sp.renderOrder=10;sp.material.depthWrite=false;sp.position.copy(pos);sp.scale.set(1.7,.64,1);return sp;}
function dispose(){if(!model)return;scene.remove(model);model.traverse(o=>{o.geometry?.dispose();const m=o.material;if(m)(Array.isArray(m)?m:[m]).forEach(x=>{x.map?.dispose();x.dispose();});});model=null;}
function setup(){if(renderer)return;scene=new THREE.Scene();scene.background=new THREE.Color(0xf8fafc);camera=new THREE.OrthographicCamera(-8,8,8,-8,.1,100);camera.position.set(12,10,13);renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));host.append(renderer.domElement);controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.minZoom=.45;controls.maxZoom=5;scene.add(new THREE.AmbientLight(0xffffff,1.8));const light=new THREE.DirectionalLight(0xffffff,1.8);light.position.set(8,15,12);scene.add(light);new ResizeObserver(resize).observe(host);loop();}
function resize(){if(!renderer||host.clientWidth<10)return;const w=host.clientWidth,h=host.clientHeight,a=w/h;const halfWidth=Math.max(8*a,model?.userData.task==='A 2'?8:11);camera.left=-halfWidth;camera.right=halfWidth;camera.top=halfWidth/a;camera.bottom=-halfWidth/a;camera.updateProjectionMatrix();renderer.setSize(w,h,false);}
function loop(){requestAnimationFrame(loop);if(active&&renderer){controls.update();renderer.render(scene,camera);}}
function syncConeLabels(){if(!model)return;model.traverse(o=>{const kind=o.userData.coneLabel;if(kind==='apex'||kind==='mantle'||kind==='prism-side')o.visible=!topMode;else if(kind==='axis-top'||kind==='prism-top')o.visible=topMode;});const hint=host.querySelector('.threehelp');if(hint)hint.textContent=topMode?(model.userData.task==='B 2'?'Draufsicht: A/E usw. bezeichnen übereinanderliegende Punkte.':'Draufsicht: Die beiden Kegelspitzen überdecken sich.'):'Mit einem Finger drehen · mit zwei Fingern zoomen';}
function doubleCone(degrees,phase=3,suffix='ₙ'){
 const phi=Math.max(1,Math.min(89,Number(degrees)))*Math.PI/180,r=4*Math.sin(phi),h=4*Math.cos(phi),segs=96;
 const start=Math.PI/2,end=start+sweep*Math.PI/180;
 const material=()=>new THREE.MeshPhongMaterial({color:0x6caac9,transparent:true,opacity:.62,side:THREE.DoubleSide});
 if(sweep>0){
  const up=new THREE.Mesh(new THREE.CylinderGeometry(0,r,h,segs,1,true,start,end-start),material());
  const down=new THREE.Mesh(new THREE.CylinderGeometry(r,0,h,segs,1,true,start,end-start),material());
  up.position.y=h/2;down.position.y=-h/2;model.add(up,down);
  const rim=Array.from({length:segs+1},(_,i)=>{
   const angle=start+(end-start)*i/segs;
   return V(r*Math.sin(angle),0,r*Math.cos(angle));
  });
  model.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(rim),new THREE.LineBasicMaterial({color:0x9a2848})));
 }
 if(sweep<360){
  for(const angle of sweep===0?[start]:[start,end]){
   model.add(face([V(0,-h,0),V(r*Math.sin(angle),0,r*Math.cos(angle)),V(0,h,0)],0x6caac9,.55));
  }
 }
 model.add(edge(V(0,-h,0),V(0,h,0),0x788a98));
 function helper(a,b){const line=edge(a,b,0xa32b4d);line.material.depthTest=false;line.material.transparent=true;line.renderOrder=5;model.add(line);}
 function text(pos,t,kind){const sprite=label(pos,t);sprite.scale.multiplyScalar(1.25);sprite.material.map.colorSpace=THREE.SRGBColorSpace;sprite.material.map.needsUpdate=true;sprite.renderOrder=10;sprite.material.depthWrite=false;sprite.userData.coneLabel=kind;model.add(sprite);}
 text(V(r+.7,0,0),'C'+suffix,'rim');text(V(0,h+.65,0),'B'+suffix,'apex');text(V(0,-h-.65,0),'A','apex');
 text(V(-1.5,0,-.3),'A / B'+suffix,'axis-top');
 if(phase>=2){helper(V(0,0,0),V(r,0,0));text(V(r*.5,0,.55),'a','radius');}
 if(phase>=3){helper(V(0,-h,0),V(r,0,0));text(V(r*.5+.5,-h*.5,0),'4 cm','mantle');}
 controls.target.set(0,0,0);syncConeLabels();
}
function prism(t,phase=3,suffix='ₙ'){
 const x=Math.max(.1,Math.min(10,Number(t))),atEnd=x===10;
 const A=V(0,0,0),P=V(x,0,0),E=V(0,3,0),B=V(0,0,4),Q=V(x,0,4),F=V(0,3,4),D=V(10,0,0),C=V(10,0,4),H=V(10,3,0),G=V(10,3,4);
 for(const [u,v] of [[A,D],[D,C],[C,B],[B,A],[E,H],[H,G],[G,F],[F,E],[A,E],[B,F],[C,G],[D,H]])model.add(edge(u,v,0xa5b1bf));
 function wire(a,b){const e=edge(a,b,0xa32b4d);e.material.transparent=true;e.material.depthTest=false;e.renderOrder=5;model.add(e);}
 function text(pos,t,kind='prism-side'){const e=label(pos,t);e.scale.multiplyScalar(1.3);e.userData.coneLabel=kind;model.add(e);}
 if(phase>=3){
  [[A,P,E],[B,Q,F],[A,E,F,B],[A,P,Q,B],[P,E,F,Q]].forEach((q,i)=>model.add(face(q,[0x88c5dc,0x88c5dc,0x9cb8cf,0xd7adc0,0xb7d5bb][i],i<2?.65:.27)));
  for(const [u,v] of [[A,P],[P,E],[E,A],[B,Q],[Q,F],[F,B],[A,B],[P,Q],[E,F]])wire(u,v);
 }else{if(phase>=1)wire(A,P);if(phase>=2)wire(P,Q);}
 for(const [pt,t] of [[A,'A'],[E,'E'],[B,'B'],[F,'F'],[D,atEnd?'D = P'+suffix:'D'],[C,atEnd?'C = Q'+suffix:'C'],[H,'H'],[G,'G']])text(pt.clone().add(V(0,.35,0)),t);
 if(phase>=1&&!atEnd)text(P.clone().add(V(.25,.25,-.5)),'P'+suffix);
 if(phase>=2&&!atEnd)text(Q.clone().add(V(.25,.25,.55)),'Q'+suffix);
 for(const [pos,t] of [[V(-.4,0,-.55),'A/E'],[V(-.4,0,4.7),'B/F'],[V(10.3,0,-.55),atEnd?'D=P'+suffix+' / H':'D/H'],[V(10.3,0,4.7),atEnd?'C=Q'+suffix+' / G':'C/G']])text(pos,t,'prism-top');
 for(const [point,name,z] of [[P,'P'+suffix,-1.3],[Q,'Q'+suffix,5.45]]){
  const allowed=name.startsWith('P')?phase>=1:phase>=2;
  if(!atEnd&&allowed){text(V(x,0,z),name,'prism-top');const leader=edge(point,V(x,0,z<0?-.9:5),0x60758b);leader.userData.coneLabel='prism-top';model.add(leader);}
 }
 controls.target.set(5,1.5,2);syncConeLabels();
}
function build(task,value,phase=3,suffix='ₙ',resetZoom=false){if(!renderer)return;dispose();model=new THREE.Group();model.userData.task=task;scene.add(model);rotationControls.hidden=task!=='A 2';if(task==='A 2'){coneView=[value,phase,suffix];doubleCone(value,phase,suffix);}else if(task==='B 2'){coneView=undefined;sweep=360;setSweep(sweep,false);prism(value,phase,suffix);}if(resetZoom)camera.zoom=task==='A 2'?1.38:1.52;camera.updateProjectionMatrix();controls.update();}
window.exam2025Three={
show(task,value,phase=3,suffix='ₙ'){if(!['A 2','B 2'].includes(task))return;setup();active=true;build(task,value,phase,suffix,true);resize();},
update(task,value,phase=3,suffix='ₙ'){if(active&&renderer)build(task,value,phase,suffix);},
hide(){active=false;rotationControls.hidden=true;},
top(){if(!renderer)return;topMode=true;syncConeLabels();camera.up.set(0,0,-1);camera.position.copy(controls.target).add(V(0,20,0.001));controls.update();},
reset(){if(!renderer)return;topMode=false;syncConeLabels();camera.zoom=model?.userData.task==='A 2'?1.38:1.52;camera.updateProjectionMatrix();camera.up.set(0,1,0);camera.position.set(12,10,13);controls.update();}
};
window.dispatchEvent(new Event('exam2025ThreeReady'));
