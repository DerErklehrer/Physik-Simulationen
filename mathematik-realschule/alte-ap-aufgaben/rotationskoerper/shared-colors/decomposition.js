// One decomposition drives the drawing, surface materials, cut faces and calculation key.
const P={gold:{fill:'#e5a64d',text:'#875000'},blue:{fill:'#5299c7',text:'#195b86'},teal:{fill:'#38a595',text:'#116d60'},pink:{fill:'#bf5c88',text:'#8b2857'},slate:{fill:'#7c8394',text:'#50596c'}};
const close=ps=>{const a=ps.map(p=>[...p]).filter((p,i,all)=>i===0||Math.hypot(p[0]-all[i-1][0],p[1]-all[i-1][1])>1e-8);if(a.length>1&&Math.hypot(a[0][0]-a.at(-1)[0],a[0][1]-a.at(-1)[1])<1e-8)a.pop();return a};
function clip(ps,y,above){const out=[];for(let i=0;i<ps.length;i++){const a=ps[i],b=ps[(i+1)%ps.length],A=above?a[1]>=y-1e-9:a[1]<=y+1e-9,B=above?b[1]>=y-1e-9:b[1]<=y+1e-9;if(A)out.push(a);if(A!==B){const t=(y-a[1])/(b[1]-a[1]);out.push([a[0]+t*(b[0]-a[0]),y])}}return close(out)}
const band=(ps,lo,hi)=>{let q=ps;if(Number.isFinite(lo))q=clip(q,lo,true);if(Number.isFinite(hi))q=clip(q,hi,false);return q};
const part=(id,name,tone,lo=-Infinity,hi=Infinity)=>({id,name,tone,lo,hi,...P[tone]});
export function decomposition(key,g){
 if(g.decomposition)return{key,profile:close(g.profile),...g.decomposition};
 let parts=[],voids=[],note='',terms={},breaks=[];
 const coneTerms={'großer Kegel':'gold','kleiner Kegel':'slate','Kegel groß':'gold','Kegel klein':'slate','Kegelstumpf':'gold'};
 if(key==='2019-ht'){parts=[part('frustum','Kegelstumpf','gold',-Infinity,g.join),part('cylinder','Zylinder','teal',g.join)];breaks=[g.join];terms={...coneTerms,Zylinder:'teal'};note='Kegelstumpf: großer Kegel minus kleiner ergänzter Kegel. Der Zylinder wird addiert.'}
 else if(key==='2016-ht-ii'){parts=[part('hemisphere-small','Halbkugel','blue',-Infinity,0),part('frustum','Kegelstumpf','gold',0)];breaks=[0];terms={...coneTerms,Halbkugel:'blue'};note='Halbkugel plus Kegelstumpf. Der Kegelstumpf wird als großer Kegel minus kleiner Kegel berechnet.'}
 else if(key==='2016-nt-ii'){parts=[part('hemisphere-small','Kleine Halbkugel','blue',-Infinity,0),part('frustum','Kegelstumpf / Mantel','gold',0,g.height),part('hemisphere-large','Große Halbkugel','pink',g.height)];breaks=[0,g.height];terms={...coneTerms,'Halbkugel klein':'blue','Halbkugel groß':'pink',Kreisring:'teal'};note='Oberfläche: beide gekrümmten Halbkugelflächen + Kegelstumpfmantel + sichtbarer Kreisring (grün). Innere Verbindungskreise zählen nicht mit.'}
 else if(key==='2016-nt-i'){parts=[part('cylinder-lower','Unterer Zylinder','gold',-Infinity,4.8),part('cylinder-upper','Oberer Zylinder','teal',4.8)];breaks=[4.8];terms={'Zylinder unten':'gold','Zylinder oben':'teal',Kegel:'blue'};voids=[{name:'Kegelaussparung · abziehen',tone:'blue',profile:[[0,0],[g.R,0],[0,g.h]]}];note='Die beiden Zylinder werden addiert. Der blaue Kegel ist die fehlende Aussparung und wird abgezogen.'}
 else if(key==='2022-ht'||key==='2022-nt'){
  parts=key==='2022-ht'?[part('frustum','Kegelstumpf','gold')]:[part('frustum','Kegelstumpf','gold',-Infinity,g.join),part('cylinder','Zylinder','teal',g.join)];breaks=key==='2022-ht'?[]:[g.join];terms={...coneTerms,Zylinder:'teal',Halbkugel:'blue'};
  const q=[[0,g.height],[g.cavity,g.height]];for(let i=1;i<=96;i++){const a=i*Math.PI/192;q.push([g.cavity*Math.cos(a),g.height-g.cavity*Math.sin(a)])}voids=[{name:'Halbkugelaussparung · abziehen',tone:'blue',profile:q}];note='Die blaue Halbkugel ist eine Aussparung: Ihr Volumen wird abgezogen. Der Kegelstumpf wird als großer Kegel minus kleiner ergänzter Kegel berechnet.';
 }else return null;
 const profile=close(g.profile||g.objects[0].profile);
 parts=parts.map(p=>({...p,profile:band(profile,p.lo,p.hi)}));
 return{key,parts,voids: voids.map(v=>({...v,...P[v.tone]})),terms,note,profile,breaks,helper:coneTerms&&key!=='2016-nt-i',ring:key==='2016-nt-ii'?{name:'Kreisringfläche',...P.teal}:null};
}
export function legendHTML(d){if(!d)return '';const swatch=(name,c)=>`<span style="--c:${c}">${name}</span>`;return d.parts.map(p=>swatch(p.name,p.fill)).join('')+(d.ring?swatch(d.ring.name,d.ring.fill):'')+d.voids.map(p=>swatch(p.name,p.fill)).join('')+(d.helper?swatch('Kleiner ergänzter Kegel · Rechenhilfe',P.slate.fill):'')+`<p class="decomposition-note">${d.note}</p>`}
const numericTerms={
 '2015-ht-ii':[['\\pi\\cdot18\\cdot21{,}63','gold'],['\\pi\\cdot4{,}5\\cdot5{,}41','slate'],['2\\pi\\cdot4{,}5^2','pink']],
 '2015-nt-ii':[['\\pi\\cdot3{,}75^2','gold'],['\\pi\\cdot2^2','teal'],['\\pi\\cdot3{,}75\\cdot5{,}9','gold'],['\\pi\\cdot2\\cdot3{,}1','slate'],['2\\pi\\cdot2\\cdot2{,}4','teal'],['2\\pi\\cdot0{,}75\\cdot2','blue']],
 '2019-ht':[['33804{,}8','gold'],['3137{,}7','slate'],['6927{,}2','teal']],
 '2016-ht-ii':[['\\frac23\\pi\\cdot2{,}5^3','blue'],['\\frac13\\pi\\cdot1{,}04^2\\cdot4{,}5','gold'],['\\frac13\\pi\\cdot0{,}58^2\\cdot2{,}5','slate']],
 '2016-nt-ii':[['2\\cdot2^2','blue'],['2\\cdot10{,}2','gold'],['0{,}8\\cdot4{,}1','slate'],['4^2-0{,}8^2','teal'],['2\\cdot4^2','pink']],
 '2016-nt-i':[['\\frac{30{,}375}{\\tan\\frac{\\varphi}{2}}','blue']],
 '2022-ht':[['\\frac{1}{3}\\pi\\cdot4{,}5^2\\cdot9{,}9','gold'],['\\frac{1}{3}\\pi\\cdot2{,}5^2\\cdot5{,}5','slate'],['\\frac{2}{3}\\pi\\cdot2{,}5^3','blue']],
 '2022-nt':[['\\frac{1}{3}\\pi\\cdot4^2\\cdot2{,}72','gold'],['\\frac{1}{3}\\pi\\cdot2{,}5^2\\cdot1{,}7','slate'],['\\pi\\cdot2{,}5^2\\cdot3','teal'],['\\frac{2}{3}\\pi\\cdot2^3','blue']]
};
export function colorSolution(html,d){if(!d)return html;const wrap=(v,tone)=>`\\class{rotation-${tone}}{${v}}`;for(const[name,tone]of Object.entries(d.terms)){const sub=String.raw`_{\text{${name}}}`;for(const letter of['V','M','O','A'])html=html.split(letter+sub).join(wrap(letter+sub,tone))}const tokens=[...(d.numericTerms||numericTerms[d.key]||[])].sort((a,b)=>b[0].length-a[0].length);let colored='';for(let i=0;i<html.length;){const token=tokens.find(([text])=>html.startsWith(text,i));if(token){colored+=wrap(token[0],token[1]);i+=token[0].length}else colored+=html[i++]}return colored}

const mirror=ps=>[...ps,...ps.slice().reverse().map(([x,y])=>[-x,y])];
export function drawDecomposition(d,polygon,line){if(!d)return false;for(const p of d.parts)polygon(mirror(p.profile),{fill:p.fill,'fill-opacity':.64,stroke:p.text,'stroke-width':1.5,'data-component':p.id});for(const p of d.voids)polygon(mirror(p.profile),{fill:p.fill,'fill-opacity':.16,stroke:p.text,'stroke-width':1.4,'stroke-dasharray':'5 4','data-component':'cavity'});if(d.ring){const g=d.parts[1],ps=d.profile;for(let i=0;i<ps.length;i++){const a=ps[i],b=ps[(i+1)%ps.length];if(Math.abs(a[1]-g.hi)<1e-8&&Math.abs(b[1]-g.hi)<1e-8&&Math.abs(a[0]-b[0])>1e-5){line(a,b,{stroke:d.ring.text,'stroke-width':5});line([-a[0],a[1]],[-b[0],b[1]],{stroke:d.ring.text,'stroke-width':5})}}}return true}
function surfaceColor(d,a,b){
 for(const rule of d.surfaceRules||[]){const on=p=>Math.abs((p[0]-rule.r0)*(rule.y1-rule.y0)-(p[1]-rule.y0)*(rule.r1-rule.r0))<1e-7;if(on(a)&&on(b))return{...P[rule.tone],id:rule.id}}

 if(d.cavityCylinder){const c=d.cavityCylinder,on=p=>Math.abs(p[0]-c.r)<1e-8&&p[1]>=c.floor-1e-8&&p[1]<=c.top+1e-8;if(on(a)&&on(b))return{...P.blue,id:'cavity'};if(Math.abs(a[1]-c.floor)<1e-8&&Math.abs(b[1]-c.floor)<1e-8&&Math.max(a[0],b[0])<=c.r+1e-8)return{...P.teal,id:'cavity-floor'}}
 const y=(a[1]+b[1])/2,r=(a[0]+b[0])/2;
 if(d.key==='2016-nt-i'){const v=d.voids[0],R=v.profile[1][0],h=v.profile[2][1],on=p=>Math.abs(p[0]-R*(1-p[1]/h))<1e-6;if(on(a)&&on(b))return{...P.blue,id:'cavity'}};
 if(d.key.startsWith('2022')){const v=d.voids[0],cavityR=Math.max(...v.profile.map(p=>p[0])),top=v.profile[0][1];const on=p=>Math.abs(p[0]**2+(p[1]-top)**2-cavityR**2)<1e-6;if(on(a)&&on(b)&&a[1]<=top+1e-8&&b[1]<=top+1e-8)return{...P.blue,id:'cavity'}}
 if(d.key==='2019-ht'&&Math.abs(a[1]-d.parts[1].lo)<1e-8&&Math.abs(b[1]-d.parts[1].lo)<1e-8)return{...P.teal,id:'cylinder'};
 if(d.ring&&Math.abs(a[1]-6)<1e-8&&Math.abs(b[1]-6)<1e-8&&r>.8-1e-8)return{...P.teal,id:'ring'};
 const p=d.parts.find(p=>y>p.lo+1e-8&&y<p.hi-1e-8)||d.parts.find(p=>y>=p.lo-1e-8&&y<=p.hi+1e-8);return{fill:p.fill,id:p.id};
}
function curvedSegment(d,a,b){const circles=d.circles|| (d.key==='2016-ht-ii'?[[2.5,0]]:d.key==='2016-nt-ii'?[[2,0],[4,6]]:d.key.startsWith('2022')?[[d.voids[0].profile[1][0],d.voids[0].profile[0][1]]]:[]);return circles.some(([r,y])=>[a,b].every(p=>Math.abs(p[0]**2+(p[1]-y)**2-r*r)<1e-6))}
export function decompositionMeshes(T,group,norm,sweep,d){if(!d)return false;const angle=sweep*Math.PI/180,mat=c=>new T.MeshStandardMaterial({color:c,side:T.DoubleSide,roughness:.75,opacity:1,transparent:false});
 // Only original boundary surfaces: no coincident caps at component interfaces.
 const segments=[];for(let i=0;i<d.profile.length;i++){const a=d.profile[i],b=d.profile[(i+1)%d.profile.length];if(a[0]<1e-8&&b[0]<1e-8)continue;const ts=[0,...d.breaks.map(y=>(y-a[1])/(b[1]-a[1])).filter(t=>t>1e-8&&t<1-1e-8),1].sort((x,y)=>x-y);for(let j=0;j<ts.length-1;j++){const p=ts[j],q=ts[j+1],A=[a[0]+p*(b[0]-a[0]),a[1]+p*(b[1]-a[1])],B=[a[0]+q*(b[0]-a[0]),a[1]+q*(b[1]-a[1])],c=surfaceColor(d,A,B),last=segments.at(-1);if(curvedSegment(d,A,B)&&last?.curved&&last?.id===c.id&&Math.hypot(last.ps.at(-1)[0]-A[0],last.ps.at(-1)[1]-A[1])<1e-8)last.ps.push(B);else segments.push({id:c.id,color:c.fill,curved:curvedSegment(d,A,B),ps:[A,B]})}}
 if(sweep>0)for(const s of segments){const mesh=new T.Mesh(new T.LatheGeometry(s.ps.map(norm),128,0,angle),mat(s.color));mesh.userData.component=s.id;group.add(mesh)}
 // Each cut face is clipped from the actual material region; cavities remain empty.
 if(sweep<360)for(const p of d.parts){const pts=p.profile.map(norm);if(pts.length<3)continue;const faces=T.ShapeUtils.triangulateShape(pts,[]);for(const a of sweep===0?[0]:[0,angle]){const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pts.flatMap(p=>[p.x*Math.sin(a),p.y,p.x*Math.cos(a)]),3));geo.setIndex(faces.flat());geo.computeVertexNormals();const mesh=new T.Mesh(geo,mat(p.fill));mesh.userData.component=p.id+'-cut';group.add(mesh)}}return true;
}


