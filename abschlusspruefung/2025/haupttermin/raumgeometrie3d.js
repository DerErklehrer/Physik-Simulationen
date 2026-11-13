// Raumgeometrie 2025: Originalskizze bleibt erhalten, interaktive 3D-Ergänzung.
// Three.js wie in der Referenzprüfung 2026, orthografische Kamera und OrbitControls.
import * as THREE from 'three';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/controls/OrbitControls.js';
const host=document.getElementById('view3d2025');
let scene,camera,renderer,controls,model,active=false;
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
function face(points,color,opacity=.30){const v=[];for(let i=1;i<points.length-1;i++)for(const p of [points[0],points[i],points[i+1]])v.push(p.x,p.y,p.z);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));g.computeVertexNormals();return new THREE.Mesh(g,new THREE.MeshPhongMaterial({color,transparent:true,opacity,side:THREE.DoubleSide,depthWrite:false}));}
function edge(a,b,color=0x2c506e){return new THREE.Line(new THREE.BufferGeometry().setFromPoints([a,b]),new THREE.LineBasicMaterial({color}));}
function label(pos,t){const cn=document.createElement('canvas');cn.width=256;cn.height=96;const ctx=cn.getContext('2d');ctx.font='bold 52px Arial';ctx.fillStyle='#273c4f';ctx.fillText(t,12,64);const tx=new THREE.CanvasTexture(cn);const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,transparent:true,depthTest:false}));sp.position.copy(pos);sp.scale.set(1.7,.64,1);return sp;}
function dispose(){if(!model)return;scene.remove(model);model.traverse(o=>{o.geometry?.dispose();const m=o.material;if(m)(Array.isArray(m)?m:[m]).forEach(x=>{x.map?.dispose();x.dispose();});});model=null;}
function setup(){if(renderer)return;scene=new THREE.Scene();scene.background=new THREE.Color(0xf8fafc);camera=new THREE.OrthographicCamera(-8,8,8,-8,.1,100);camera.position.set(12,10,13);renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));host.append(renderer.domElement);controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.minZoom=.45;controls.maxZoom=5;scene.add(new THREE.AmbientLight(0xffffff,1.8));const light=new THREE.DirectionalLight(0xffffff,1.8);light.position.set(8,15,12);scene.add(light);new ResizeObserver(resize).observe(host);loop();}
function resize(){if(!renderer||host.clientWidth<10)return;const w=host.clientWidth,h=host.clientHeight,a=w/h;camera.left=-8*a;camera.right=8*a;camera.top=8;camera.bottom=-8;camera.updateProjectionMatrix();renderer.setSize(w,h,false);}
function loop(){requestAnimationFrame(loop);if(active&&renderer){controls.update();renderer.render(scene,camera);}}
function doubleCone(degrees){const phi=Math.max(1,Math.min(89,Number(degrees)))*Math.PI/180;const r=4*Math.sin(phi),h=4*Math.cos(phi),segs=96;const up=new THREE.Mesh(new THREE.ConeGeometry(r,h,segs,1,false),new THREE.MeshPhongMaterial({color:0x6caac9,transparent:true,opacity:.62,side:THREE.DoubleSide}));up.position.y=h/2;model.add(up);const down=up.clone();down.rotation.z=Math.PI;down.position.y=-h/2;model.add(down);const ring=new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({length:segs},(_,i)=>V(r*Math.cos(i*2*Math.PI/segs),0,r*Math.sin(i*2*Math.PI/segs)))),new THREE.LineBasicMaterial({color:0x9a2848}));model.add(ring);model.add(edge(V(0,-h,0),V(0,h,0),0x788a98));model.add(label(V(r+.5,0,0),'a'));model.add(label(V(0,h+.65,0),'S₁'));model.add(label(V(0,-h-.65,0),'S₂'));controls.target.set(0,0,0);}
function prism(t){const x=Math.max(.1,Math.min(10,Number(t)));const A=V(0,0,0),P=V(x,0,0),E=V(0,3,0),B=V(0,0,4),Q=V(x,0,4),F=V(0,3,4);const p=[[A,P,E],[B,Q,F],[A,E,F,B],[A,P,Q,B],[P,E,F,Q]];p.forEach((q,i)=>model.add(face(q,[0x88c5dc,0x88c5dc,0x9cb8cf,0xd7adc0,0xb7d5bb][i],i<2?.65:.27)));for(const [u,v] of [[A,P],[P,E],[E,A],[B,Q],[Q,F],[F,B],[A,B],[P,Q],[E,F]])model.add(edge(u,v));for(const [pt,t] of [[A,'A'],[P,'Pₙ'],[E,'E'],[B,'B'],[Q,'Qₙ'],[F,'F']])model.add(label(pt.clone().add(V(0,.35,0)),t));controls.target.set(4,1.5,2);}
function build(task,value){if(!renderer)return;dispose();model=new THREE.Group();scene.add(model);if(task==='A 2')doubleCone(value);else if(task==='B 2')prism(value);controls.update();}
window.exam2025Three={
show(task,value){if(!['A 2','B 2'].includes(task))return;setup();active=true;build(task,value);resize();},
update(task,value){if(active&&renderer)build(task,value);},
hide(){active=false;},
top(){if(!renderer)return;camera.up.set(0,0,-1);camera.position.set(0,20,0.001);controls.update();},
reset(){if(!renderer)return;camera.up.set(0,1,0);camera.position.set(12,10,13);controls.update();}
};
window.dispatchEvent(new Event('exam2025ThreeReady'));
