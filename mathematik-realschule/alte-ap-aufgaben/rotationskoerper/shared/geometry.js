export function geometry(key){
 if(key==='2021-ht'){
  const R=2.5,r=1.2,height=4,large=R*Math.tan(50*Math.PI/180),small=large*r/R,apex=height-large,floor=apex+small;
  return{R,r,height,large,small,apex,floor,minY:0,maxY:height,axis:'GK',volume:Math.PI*R*R*height-Math.PI/3*(R*R*large-r*r*small),officialVolume:Math.PI*R*R*height-Math.PI/3*(R*R*2.98-r*r*1.43),profile:[[0,0],[R,0],[R,height],[r,floor],[0,floor]],outline:[[-R,0],[R,0],[R,height],[r,floor],[-r,floor],[-R,height]],points:{A:[-R,0],B:[R,0],C:[R,height],D:[r,floor],E:[-r,floor],F:[-R,height],G:[0,apex],H:[0,floor],K:[0,height]}};
 }
 if(key==='2022-ht'){
  const R=4.5,r=2.5,large=9.9,small=5.5,height=large-small,cavity=2.5,arc=[];
  for(let i=0;i<=72;i++){const a=i*Math.PI/144;arc.push([cavity*Math.cos(a),height-cavity*Math.sin(a)])}
  return{R,r,height,cavity,large,small,apex:-small,minY:-small,maxY:height,axis:'MN',volume:Math.PI/3*(R*R*large-r*r*small)-2*Math.PI*cavity**3/3,profile:[[0,0],[r,0],[R,height],...arc,[0,0]],outline:[[-r,0],[r,0],[R,height],...arc,...arc.slice(0,-1).reverse().map(([x,y])=>[-x,y]),[-R,height]],points:{A:[-R,height],B:[-r,0],C:[0,-small],D:[r,0],E:[R,height],F:[cavity,height],G:[-cavity,height],M:[0,height],N:[0,0]}};
 }
 if(key==='2022-nt'){
  const R=4,r=2.5,cavity=2,small=1.7,large=small*R/r,join=large-small,height=join+3,arc=[];
  for(let i=0;i<=72;i++){const a=i*Math.PI/144;arc.push([cavity*Math.cos(a),height-cavity*Math.sin(a)])}
  return{R,r,height,cavity,large,small,join,apex:large,minY:0,maxY:height,axis:'NM',volume:Math.PI/3*(R*R*large-r*r*small)+Math.PI*r*r*3-2*Math.PI*cavity**3/3,profile:[[0,0],[R,0],[r,join],[r,height],...arc,[0,0]],outline:[[-R,0],[R,0],[r,join],[r,height],...arc,...arc.slice(0,-1).reverse().map(([x,y])=>[-x,y]),[-r,height],[-r,join]],points:{A:[-R,0],B:[R,0],C:[r,join],D:[r,height],E:[cavity,height],F:[0,large],G:[-cavity,height],H:[-r,height],I:[-r,join],K:[0,join],M:[0,height],N:[0,0]}};
 }
 throw new Error('Unbekannte Aufgabe '+key);
}
