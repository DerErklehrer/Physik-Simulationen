const PI=Math.PI,rad=d=>d*PI/180;
export function geometry(key,phi=75){
 const base={units:'cm',phi};
 if(key==='2016-nt-i'){
  if(!(phi>55.02&&phi<180))throw Error('Winkel außerhalb des offenen Intervalls');
  const R=4.5,h=R/Math.tan(rad(phi/2)),volume=PI*(121.2-30.375/Math.tan(rad(phi/2))),points={A:[-2,10.8],B:[-2,4.8],C:[-4.5,4.8],D:[-4.5,0],E:[0,h],F:[4.5,0],G:[4.5,4.8],H:[2,4.8],I:[2,10.8],M:[0,10.8],P:[0,0]};
  return{...base,R,r:2,height:10.8,h,minY:0,maxY:10.8,volume,axis:'MP',points,outline:['A','B','C','D','E','F','G','H','I'].map(n=>points[n]),objects:[{id:'body',color:'#e5a64d',profile:[[0,10.8],[2,10.8],[2,4.8],[R,4.8],[R,0],[0,h]]}],auxLines:[['D','F']],lowerLimit:2*Math.atan(2.5/4.8)*180/PI};
 }
 if(key==='2016-ht-ii'){
  const R=2.5,upper=4.5/Math.tan(rad(77)),lower=R/Math.tan(rad(77)),height=2,hem=[];
  for(let i=0;i<=96;i++){const a=i*PI/192;hem.push([R*Math.sin(a),-R*Math.cos(a)])}
  const profile=[...hem,[lower,0],[upper,height],[0,height]],points={A:[-R,0],B:[0,-R],C:[R,0],D:[lower,0],E:[upper,height],F:[-upper,height],G:[-lower,0],M:[0,height],N:[0,0]};
  return{...base,R,r:lower,upper,height,minY:-R,maxY:height,axis:'BM',points,profile,outline:[...hem.map(([x,y])=>[-x,y]),[-lower,0],[-upper,height],[upper,height],[lower,0],...hem.slice().reverse()],volume:2*PI*R**3/3+PI/3*(upper**2*4.5-lower**2*2.5),objects:[{id:'body',color:'#c58b4d',profile}],auxLines:[['B','F'],['B','E']]};
 }
 if(key==='2016-nt-ii'){
  const R=4,r=2,small=.8,large=10,height=6,profile=[];
  for(let i=0;i<=96;i++){const a=i*PI/192;profile.push([r*Math.sin(a),-r*Math.cos(a)])}
  profile.push([small,height],[R,height]);for(let i=1;i<=96;i++){const a=i*PI/192;profile.push([R*Math.cos(a),height+R*Math.sin(a)])}
  const points={A:[-r,0],B:[r,0],C:[small,height],D:[R,height],E:[-R,height],F:[-small,height],M1:[0,0],M2:[0,height],S:[0,large]};
  const surface=2*PI*r*r+PI*(r*Math.hypot(large,r)-small*Math.hypot(R,small))+PI*(R*R-small*small)+2*PI*R*R;
  return{...base,R,r,small,large,height,minY:-r,maxY:large,axis:'M₁S',points,profile,outline:[...profile,...profile.slice().reverse().map(([x,y])=>[-x,y])],volume:2*PI*(r**3+R**3)/3+PI*height*(r*r+r*small+small*small)/3,surface,objects:[{id:'body',color:'#e5a64d',profile}],auxLines:[['A','S'],['B','S']]};
 }
 throw Error('Unbekannte Aufgabe '+key);
}
