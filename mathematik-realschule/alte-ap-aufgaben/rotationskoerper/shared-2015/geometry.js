const PI=Math.PI;
const palette={gold:['#e5a64d','#875000'],blue:['#5299c7','#195b86'],teal:['#38a595','#116d60'],pink:['#bf5c88','#8b2857']};
const part=(id,name,tone,lo,hi,profile)=>({id,name,tone,lo,hi,profile,fill:palette[tone][0],text:palette[tone][1]});
export function geometry(key){
 if(key==='2015-ht-ii'){
  const R=22.5,r=4.5,height=13.5,join=9,arc=[];for(let i=0;i<=96;i++){const a=i*PI/192;arc.push([r*Math.cos(a),join+r*Math.sin(a)])}
  const profile=[[0,-2],[R,-2],[R,0],[18,0],...arc,[0,-2]],volume=PI*R*R*2+PI*join*(18**2+18*r+r*r)/3+2*PI*r**3/3;
  return{R,r,height,join,minY:-2,maxY:height,axis:'ME',volume,discVolume:PI*R*R*2,surface:PI*(18*Math.hypot(18,12)-r*Math.hypot(r,3)+2*r*r),officialSurface:1273.90,profile,objects:[{id:'body',profile}],auxLines:[['K','F'],['L','F'],['G','H'],['F','H']],points:{A:[-R,-2],B:[R,-2],C:[R,0],D:[-R,0],K:[-18,0],L:[18,0],M:[0,0],N:[0,9],G:[-r,9],H:[r,9],F:[0,12],E:[0,13.5]},
   decomposition:{parts:[part('disc','Plexiglasscheibe / Zylinder','teal',-Infinity,0,[[0,-2],[R,-2],[R,0],[0,0]]),part('frustum','Kegelstumpfmantel','gold',0,9,[[0,0],[18,0],[r,9],[0,9]]),part('hemisphere','Halbkugeloberfläche','pink',9,Infinity,[[0,9],...arc])],voids:[],breaks:[0,9],terms:{Zylinder:'teal','Kegel groß':'gold','Kegel klein':'slate',Halbkugel:'pink'},helper:true,circles:[[r,9]],note:'Plexiglasscheibe: Zylinder. Außenfläche des Lampenschirms: großer Kegelmantel − kleiner ergänzter Kegelmantel + gekrümmte Halbkugeloberfläche. Die Verbindungskreisfläche zählt nicht mit. Dargestellt ist die äußere Form; eine Wandstärke ist nicht vorgegeben.'}}
 }
 if(key==='2015-nt-ii'){
  const R=3.75,r=2,height=4.5,join=2.1,cavity=.75,floor=2.5,profile=[[0,0],[R,0],[r,join],[r,height],[cavity,height],[cavity,floor],[0,floor]],volume=PI*join*(R*R+R*r+r*r)/3+PI*r*r*(height-join)-PI*cavity*cavity*2;
  return{R,r,height,join,cavity,floor,minY:0,maxY:height,axis:'MS',volume,surface:PI*(R*R+r*r+R*Math.hypot(R,height)-r*Math.hypot(r,height-join)+2*r*(height-join)+2*cavity*2),officialSurface:146.4,profile,objects:[{id:'body',profile}],auxLines:[['A','S'],['B','S'],['J','S'],['C','S'],['J','C'],['I','D'],['E','H']],points:{A:[-R,0],B:[R,0],M:[0,0],K:[0,join],N:[0,floor],J:[-r,join],C:[r,join],I:[-r,height],D:[r,height],H:[-cavity,height],E:[cavity,height],G:[-cavity,floor],F:[cavity,floor],S:[0,height]},
   decomposition:{parts:[part('frustum','Kegelstumpf / Mantel','gold',-Infinity,join,[[0,0],[R,0],[r,join],[0,join]]),part('cylinder','Oberer Zylinder','teal',join,Infinity,[[0,join],[r,join],[r,height],[cavity,height],[cavity,floor],[0,floor]])],voids:[{name:'Zylinderaussparung · abziehen',tone:'blue',fill:'#5299c7',text:'#195b86',profile:[[0,floor],[cavity,floor],[cavity,height],[0,height]]}],breaks:[join],terms:{Grundkreis:'gold','Deckkreis':'teal','Kegel groß':'gold','Kegel klein':'slate','Zylinder außen':'teal','Zylinder innen':'blue'},helper:true,cavityCylinder:{r:cavity,floor,top:height},note:'Außenfläche: Grundkreis + verbleibende Kegelmantelfläche + äußerer Zylindermantel + oberer Kreisring + Innenmantel + Boden der Aussparung. Kreisring und Aussparungsboden ergeben zusammen den vollen Deckkreis. Die blaue Aussparung bleibt leer.'}}
 }
 throw Error('Unbekannte Aufgabe '+key);
}
