import * as THREE from 'three';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/controls/OrbitControls.js';
const host=document.getElementById('view3d');let renderer,scene,camera,controls,group,topMode=false;
const v=(x,y,z)=>new THREE.Vector3(x,y,z);
function label(p,t,kind='side'){const c=document.createElement('canvas'),ctx=c.getContext('2d');ctx.font='bold 44px Arial';c.width=Math.ceil(ctx.measureText(t).width)+16;c.height=66;ctx.font='bold 44px Arial';ctx.fillStyle='rgba(248,250,252,.95)';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#253341';ctx.textAlign='center';ctx.fillText(t,c.width/2,48);const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;const obj=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,transparent:true,depthTest:false}));obj.scale.set(.38*c.width/c.height,.38,1);obj.position.copy(p);obj.userData.kind=kind;obj.renderOrder=20;group.add(obj)}
function mesh(geo,color,opacity=.72){const obj=new THREE.Mesh(geo,new THREE.MeshPhongMaterial({color,transparent:true,opacity,side:THREE.DoubleSide,depthWrite:false}));group.add(obj);return obj}
function edge(points,color=0x60758b){const obj=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color}));group.add(obj);return obj}
function resize(){if(!renderer||host.clientWidth<10)return;const aspect=host.clientWidth/host.clientHeight,hw=Math.max(4.2,4.4*aspect);camera.left=-hw;camera.right=hw;camera.top=hw/aspect;camera.bottom=-hw/aspect;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight,false)}
function labelVisibility(){group?.traverse(o=>{if(o.userData.kind==='top')o.visible=topMode;if(o.userData.kind==='side')o.visible=!topMode})}
function setup(){if(renderer)return;scene=new THREE.Scene();scene.background=new THREE.Color(0xf8fafc);camera=new THREE.OrthographicCamera(-5,5,5,-5,.1,150);renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));host.prepend(renderer.domElement);controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,0,0);controls.enableDamping=true;controls.minZoom=.45;controls.maxZoom=4;controls.addEventListener('change',()=>{if(topMode&&Math.abs(camera.position.clone().sub(controls.target).normalize().y)<.99999){topMode=false;labelVisibility()}});scene.add(new THREE.AmbientLight(0xffffff,1.9));const light=new THREE.DirectionalLight(0xffffff,2);light.position.set(-8,10,12);scene.add(light);reset();new ResizeObserver(resize).observe(host);requestAnimationFrame(loop)}
function loop(){requestAnimationFrame(loop);if(!host.hidden){controls.update();renderer.render(scene,camera)}}
function build(){if(group){scene.remove(group);group.traverse(o=>{o.geometry?.dispose();o.material?.map?.dispose();o.material?.dispose()})}group=new THREE.Group();scene.add(group);const st=window.muster1A2State(),R=3*Math.tan(st.phi*Math.PI/180),r=R/2,h=2*R,scale=6/(3+h),center=(3-h)/2,world=(x,y,z=0)=>v(x*scale,(y-center)*scale,z*scale),sweep=st.theta*Math.PI/180,start=-Math.PI/2,full=st.theta===360;
 const P={A:world(-r,-h),B:world(0,-h),C:world(0,0),D:world(-R,0),E:world(-r,0),S:world(0,3)};
 if(st.theta>0){const cone=mesh(new THREE.CylinderGeometry(0,R*scale,3*scale,96,1,true,start,sweep),0xe6aa47,.72);cone.position.copy(world(0,1.5));cone.userData.role='cone';
 const cylinder=mesh(new THREE.CylinderGeometry(r*scale,r*scale,h*scale,96,1,true,start,sweep),0x198576,.68);cylinder.position.copy(world(0,-h/2));cylinder.userData.role='cylinder';
 // The exposed underside of the cone is an annulus. The shared central disk is internal.
 const ring=mesh(new THREE.RingGeometry(r*scale,R*scale,96,1,start,sweep),0xe6aa47,.72);ring.rotation.x=-Math.PI/2;ring.rotation.z=-Math.PI/2;ring.position.copy(world(0,0));
 const bottom=mesh(new THREE.CircleGeometry(r*scale,96,start,sweep),0x198576,.68);bottom.rotation.x=-Math.PI/2;bottom.rotation.z=-Math.PI/2;bottom.position.copy(world(0,-h));
 if(!full){for(const angle of [0,sweep]){const poly=new THREE.Shape();poly.moveTo(0,3);poly.lineTo(-R,0);poly.lineTo(-r,0);poly.lineTo(-r,-h);poly.lineTo(0,-h);poly.closePath();const cap=mesh(new THREE.ShapeGeometry(poly),0x9a2848,.22);cap.scale.setScalar(scale);cap.position.y=-center*scale;cap.rotation.y=angle;cap.userData.role='cut-face'}}
 for(const [radius,y,color]of[[R,0,0xbd6f12],[r,0,0x198576],[r,-h,0x198576]]){const pts=[];for(let i=0;i<=96;i++){const a=start+sweep*i/96;pts.push(world(radius*Math.sin(a),y,radius*Math.cos(a)))}edge(pts,color)}
 }
 edge([world(0,-h-.35),world(0,3.35)],0x8795a4);edge([P.A,P.B,P.S,P.D,P.E,P.A],0x9a2848);edge([P.C,P.D],0xbd6f12);
 if(st.theta===0){const poly=new THREE.Shape();poly.moveTo(0,3);poly.lineTo(-R,0);poly.lineTo(-r,0);poly.lineTo(-r,-h);poly.lineTo(0,-h);poly.closePath();const flat=mesh(new THREE.ShapeGeometry(poly),0x9a2848,.23);flat.scale.setScalar(scale);flat.position.y=-center*scale}
 const ix=Math.abs(st.phi-34)<1e-9?'₁':'ₙ';if(3*scale>.65)label(P.S.clone().add(v(.25,.15,0)),'S');label(P.C.clone().add(v(.24,0,0)),'C');label(P.B.clone().add(v(.24,-.17,0)),'B'+ix);if(R*scale>.7){label(P.D.clone().add(v(-.25,.2,0)),'D'+ix);label(P.E.clone().add(v(.05,.25,0)),'E'+ix);label(P.A.clone().add(v(-.25,-.17,0)),'A'+ix)}
 label(v(-2.2,0,3.6),'Außenkreis: Kegel','top');label(v(2,0,-3.6),'Innenkreis: Zylinder','top');labelVisibility();
}
function reset(){if(!camera)return;topMode=false;controls.enableDamping=false;controls.update();camera.up.set(0,1,0);camera.position.set(-9,6,12);camera.zoom=1;camera.updateProjectionMatrix();controls.update();controls.enableDamping=true;labelVisibility()}
document.getElementById('top').onclick=()=>{if(!camera)return;topMode=false;controls.enableDamping=false;controls.update();topMode=true;camera.up.set(0,0,-1);camera.position.copy(controls.target).add(v(0,20,.00001));controls.update();controls.enableDamping=true;labelVisibility()};
document.getElementById('cameraReset').onclick=reset;
window.addEventListener('muster1A2Change',()=>{if(host.hidden)return;setup();build();resize()});
window.muster1A2Three={snapshot:()=>camera?{orthographic:camera.isOrthographicCamera,top:topMode,position:camera.position.toArray(),target:controls.target.toArray(),zoom:camera.zoom,...window.muster1A2State()}:null};
if(!host.hidden){setup();build();resize()}
