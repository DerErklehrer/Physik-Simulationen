const PI=Math.PI,rad=d=>d*PI/180;
const palette={gold:['#e5a64d','#875000'],blue:['#5299c7','#195b86'],teal:['#38a595','#116d60'],pink:['#bf5c88','#8b2857']};
const part=(id,name,tone,lo,hi,profile)=>({id,name,tone,lo,hi,profile,fill:palette[tone][0],text:palette[tone][1]});
const numericTerms={
 '2013-ht-ii':[['\\pi\\cdot4^2\\cdot24','teal'],['\\frac13\\pi\\cdot7^2\\cdot9{,}33','gold'],['\\frac13\\pi\\cdot4^2\\cdot5{,}33','slate']],
 '2013-nt-ii':[['3{,}0\\cdot14{,}8','teal'],['7{,}5\\cdot9{,}5','gold'],['3{,}0\\cdot3{,}8','slate'],['7{,}5^2','gold']],
 '2014-ht-ii':[['\\pi\\cdot2^2\\cdot1{,}4','teal'],['\\frac13\\pi\\cdot2^2\\cdot1{,}4','gold'],['\\frac13\\pi\\cdot1{,}1^2\\cdot0{,}8','slate']],
 '2014-nt-ii':[['\\frac13\\pi\\cdot2^2\\cdot8','gold'],['\\frac13\\pi\\cdot0{,}5^2\\cdot2','slate'],['\\frac23\\pi\\cdot2^3','blue']]
};
const base=(key,points,profile,parts,extra)=>({key,points,profile,objects:[{id:'body',profile}],minY:0,units:'cm',...extra,decomposition:{numericTerms:numericTerms[key]||[],parts,voids:[],breaks:parts.slice(1).map(p=>p.lo),terms:{'Kegel groß':'gold','Kegel klein':'slate',Kegelstumpf:'gold',Zylinder:'teal',Halbkugel:'blue'},helper:true,...extra.decomposition}});
export function geometry(key,phi=20){
 if(key==='2013-ht-ii'){
  const large=5.33*14/8,small=5.33,height=28,join=height-(large-small),R=7,r=4,profile=[[0,0],[r,0],[r,join],[R,height],[0,height]],volume=PI*r*r*join+PI*(R*R*large-r*r*small)/3;
  return base(key,{A:[-r,0],B:[r,0],S:[0,0],C:[r,join],D:[-r,join],N:[0,join],G:[0,height-large],E:[R,height],F:[-R,height],M:[0,height]},profile,[part('cylinder','Zylinderschaft','teal',-Infinity,join,[[0,0],[r,0],[r,join],[0,join]]),part('frustum','Kegelstumpfkopf','gold',join,Infinity,[[0,join],[r,join],[R,height],[0,height]])],{R,r,height,join,large,small,volume,maxY:height,axis:'MS',units:'mm',auxLines:[['F','G'],['E','G'],['D','C']],decomposition:{note:'Zylinder plus Kegelstumpf. Der Kegelstumpf wird als großer Kegel minus kleiner ergänzter Kegel berechnet.'}});
 }
 if(key==='2013-nt-ii'){
  const r=3.8*Math.sin(rad(52)),R=9.5*Math.sin(rad(52)),join=14.5,apex=join-3.8*Math.cos(rad(52)),height=apex+9.5*Math.cos(rad(52)),profile=[[0,0],[r,join],[R,height],[0,height]],volume=PI*r*r*join/3+PI*(height-join)*(r*r+r*R+R*R)/3,surface=PI*(r*Math.hypot(r,join)+R*9.5-r*3.8+R*R);
  return base(key,{A:[0,0],E:[-r,join],B:[r,join],M:[0,join],F:[0,apex],D:[-R,height],C:[R,height],N:[0,height]},profile,[part('cone','Unterer Kegel','teal',-Infinity,join,[[0,0],[r,join],[0,join]]),part('frustum','Oberer Kegelstumpf und Deckkreis','gold',join,Infinity,[[0,join],[r,join],[R,height],[0,height]])],{R,r,height,join,apex,volume,surface,maxY:height,axis:'AN',auxLines:[['D','F'],['C','F'],['E','B']],decomposition:{terms:{'Kegel unten':'teal','Kegel groß':'gold','Kegel klein':'slate',Deckkreis:'gold'},note:'Unterer Kegelmantel + großer Kegelmantel − kleiner Kegelmantel + oberer Deckkreis. Die innere Verbindungsfläche wird nicht mitgezählt.'}});
 }
 if(key==='2014-ht-ii'){
  const R=2,large=R*Math.tan(rad(35)),small=large-.6,r=small/Math.tan(rad(35)),join=.6,height=2,apex=-small,profile=[[0,0],[r,0],[R,join],[R,height],[0,height]],volume=PI*R*R*1.4+PI*(R*R*large-r*r*small)/3;
  return base(key,{F:[-r,0],A:[r,0],G:[0,0],E:[-R,join],B:[R,join],H:[0,join],D:[-R,height],C:[R,height],K:[0,height],L:[0,apex]},profile,[part('frustum','Kegelstumpfförmiger Fassungsraum','gold',-Infinity,join,[[0,0],[r,0],[R,join],[0,join]]),part('cylinder','Zylindrischer Fassungsraum','teal',join,Infinity,[[0,join],[R,join],[R,height],[0,height]])],{R,r,height,join,large,small,volume,minY:apex,maxY:height,axis:'KL',units:'dm',auxLines:[['E','L'],['B','L'],['F','A'],['E','B']],decomposition:{note:'Dargestellt ist der Fassungsraum der Pflanzschale, ohne angenommene Wandstärke. Zylinder + großer Kegel − kleiner ergänzter Kegel.'}});
 }
 if(key==='2014-nt-ii'){
  const R=2,r=.5,large=8,small=2,join=6,height=8,arc=[];for(let i=0;i<=96;i++){const a=i*PI/192;arc.push([R*Math.cos(a),join+R*Math.sin(a)])}
  const profile=[[0,0],[r,0],...arc,[0,0]],volume=PI*(R*R*large-r*r*small)/3+2*PI*R**3/3;
  return base(key,{A:[-r,0],B:[r,0],E:[0,0],F:[0,join],D:[-R,join],C:[R,join],G:[0,height],H:[0,-small]},profile,[part('frustum','Kegelstumpf','gold',-Infinity,join,[[0,0],[r,0],[R,join],[0,join]]),part('hemisphere','Halbkugel','blue',join,Infinity,[[0,join],...arc])],{R,r,height,join,large,small,volume,minY:-small,maxY:height,axis:'HG',auxLines:[['D','H'],['C','H'],['D','C']],decomposition:{circles:[[R,join]],note:'Kegelstumpf plus Halbkugel. Die ergänzte kleine Kegelspitze gehört nicht zum Schwimmer und wird abgezogen.'}});
 }
 if(key==='2013-nt-i'){
  const R=5,height=Math.sqrt(64-25),alpha=Math.asin(5/8)*180/PI,beta=90-alpha,bd=8*Math.sin(rad(phi))/Math.sin(rad(phi+alpha)),d=bd,r=R*Math.tan(rad((beta-phi)/2)),center=height-r,profile=[[0,0],[R,height],[0,d]],sphere=[];for(let i=0;i<=128;i++){const a=i*PI/128;sphere.push([r*Math.sin(a),center-r*Math.cos(a)])}
  const volume=PI*R*R*bd/3,sphereSurface=4*PI*r*r;
  return base(key,{A:[-R,height],C:[R,height],E:[0,height],D:[0,d],B:[0,0],M:[0,center]},profile,[part('body','Äußerer Kegel abzüglich Kegelaussparung','gold',-Infinity,Infinity,profile)],{R,r,height,alpha,beta,phi,bd,center,sphere,sphereSurface,volume,maxY:height,axis:'BE',auxLines:[['A','E'],['E','C'],['E','D']],decomposition:{voids:[{name:'Innerer Kegel · abziehen',tone:'blue',fill:'#5299c7',text:'#195b86',profile:[[0,d],[R,height],[0,height]]}],terms:{'Kegel außen':'gold','Kegel innen':'blue',Kugel:'pink'},helper:false,surfaceRules:[{kind:'line',r0:0,y0:d,r1:R,y1:height,tone:'blue',id:'cavity'}],note:'Äußerer Kegel minus innerer Kegel. In A 2.4 liegt die Kugel im inneren Kegel; sie wird bei der Volumenformel des Rotationskörpers nicht addiert.'}});
 }
 throw Error('Unbekannte Aufgabe '+key);
}
