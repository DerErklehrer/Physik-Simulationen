const PI=Math.PI;
export function geometry(key){
 if(key==='2018-ht'){
  const large=5,height=2,small=large-height,R=large/Math.tan(71.6*PI/180),r=R*small/large,volume=PI/3*(R*R*large-r*r*small),creamVolume=.11*volume,creamRadius=Math.cbrt(creamVolume*3/(4*PI)),creamCenter=height/2;
  const cream=[],indent=[];for(let i=0;i<=96;i++){const a=i*PI/96;cream.push([creamRadius*Math.sin(a),creamCenter-creamRadius*Math.cos(a)]);indent.push([creamRadius*Math.sin(a),creamCenter+creamRadius*Math.cos(a)])}
  return{R,r,height,large,small,apex:-small,minY:-small,maxY:height,axis:'MS',units:'cm',volume,creamVolume,creamRadius,creamCenter,officialVolume:12,officialCreamVolume:1.3,objects:[{id:'chocolate',color:'#a46b37',profile:[[0,0],[r,0],[R,height],[0,height],...indent,[0,0]],omitInner:true},{id:'cream',color:'#4e91b6',profile:cream}],outline:[[-r,0],[r,0],[R,height],[-R,height]],points:{A:[-r,0],B:[r,0],C:[R,height],D:[-R,height],M:[0,height],N:[0,0],S:[0,-small]}};
 }
 if(key==='2018-nt'){
  const R=10,neck=1,half=50,slopeHeight=(R-neck)*Math.tan(59*PI/180),fill=half-slopeHeight,height=100,volume=2*PI*R**3/3+PI*R*R*(fill-R),time=volume/50;
  const lower=[];for(let i=0;i<=72;i++){const a=i*PI/144;lower.push([R*Math.sin(a),R-R*Math.cos(a)])}
  const side=[...lower,[R,fill],[neck,half],[R,height-fill],[R,height-R]];
  for(let i=1;i<=72;i++){const a=i*PI/144;side.push([R*Math.cos(a),height-R+R*Math.sin(a)])}
  const sand=[...lower,[R,fill],[0,fill],[0,0]];
  return{R,r:neck,height,large:half,small:slopeHeight,fill,slopeHeight,apex:0,minY:0,maxY:height,axis:'Rotationsachse',units:'mm',volume,time,officialVolume:9948,officialTime:199,objects:[{id:'glass',color:'#a2bdd0',profile:side,glass:true},{id:'sand',color:'#4e91b6',profile:sand}],glassSide:side,sandSide:[...lower,[R,fill]],outline:[...side,...side.slice().reverse().map(([x,y])=>[-x,y])],points:{A:[-neck,half],G:[neck,half],B:[-R,fill],F:[R,fill],C:[-R,R],E:[R,R],M:[0,R],D:[0,0]}};
 }
 if(key==='2019-ht'){
  const R=21,height=45,join=height-5,large=R/Math.tan(16*PI/180),small=large-join,r=R*small/large,volume=PI/3*(R*R*large-r*r*small)+PI*R*R*5;
  return{R,r,height,join,large,small,apex:large,minY:0,maxY:large,axis:'MS',units:'cm',volume,officialVolume:37594.3,objects:[{id:'body',color:'#e5a64d',profile:[[0,0],[R,0],[r,join],[R,join],[R,height],[0,height],[0,0]]}],outline:[[-R,0],[R,0],[r,join],[R,join],[R,height],[-R,height],[-R,join],[-r,join]],points:{A:[-R,0],B:[R,0],C:[r,join],D:[R,join],E:[R,height],F:[-R,height],G:[-R,join],H:[-r,join],M:[0,0],N:[0,height],O:[0,join],S:[0,large]}};
 }
 throw Error('Unbekannte Aufgabe '+key);
}
