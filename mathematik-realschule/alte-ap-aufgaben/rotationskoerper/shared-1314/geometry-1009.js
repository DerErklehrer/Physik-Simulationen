const rad=degrees=>degrees*Math.PI/180;
const gold={fill:'#e5a64d',text:'#875000'};
const teal={fill:'#38a595',text:'#116d60'};
const blue={fill:'#5299c7',text:'#195b86'};
const Vcone=(r,h)=>Math.PI*r*r*h/3;
const Vcyl=(r,h)=>Math.PI*r*r*h;
export const ballRadius=1.7;
const Vball=4*Math.PI*ballRadius**3/3;
const part=(id,name,palette,profile,lo=-Infinity,hi=Infinity)=>({id,name,...palette,profile,lo,hi});
const arc=(r,y,side)=>Array.from({length:97},(_,i)=>{
  const a=Math.PI*i/192;
  return i===96?[0,y+side*r]:[r*Math.cos(a),y+side*r*Math.sin(a)];
});
const common={minY:0,units:'cm',angles:[],rightAngles:[],auxLines:[],highlights:{}};

export const liquidSettings={
  '2009-ht-i':{max:200,step:.1,value:200,units:'mm'},
  '2009-ht-ii':{max:10,step:.01,value:6,units:'cm'},
};

export function geometry1009(key){
  if(key==='2010-ht-ii'){
    const R=6,join=1.4,h=R/Math.tan(rad(25)),r=R*(h-join)/h;
    const bottom=arc(R,0,-1).reverse(),semisphere=[[0,0],...bottom];
    const cylinder=[[0,0],[R,0],[R,join],[0,join]],cone=[[0,join],[r,join],[0,h]];
    const profile=[...bottom,[R,join],[r,join],[0,h]];
    return {...common,R,r,h,profile,minY:-R,maxY:h,axis:'MS',
      volume:2*Math.PI*R**3/3+Vcyl(R,join)+Vcone(r,h-join),
      points:{A:[-R,join],P:[-r,join],N:[0,join],Q:[r,join],D:[R,join],B:[-R,0],M:[0,0],C:[R,0],S:[0,h]},
      auxLines:[['B','S'],['C','S'],['B','C']],
      angles:[['S','B','C','50°']],rightAngles:[['M',-1,-1],['N',1,-1]],
      offsets:{P:[15,-13,'start'],Q:[-15,-13,'end'],B:[-10,20,'end'],C:[10,20,'start']},
      highlights:{height:[['M','S']],radius:[['N','P'],['M','B']]},
      decomposition:{
        parts:[part('hemisphere','Halbkugel',blue,semisphere,-Infinity,0),part('cylinder','Zylinder',teal,cylinder,0,join),part('cone','Kegel',gold,cone,join)],
        voids:[],breaks:[0,join],circles:[[R,0]],terms:{Halbkugel:'blue',Zylinder:'teal',Kegel:'gold'},
        note:'Halbkugel, Zylinder und oberer Kegel werden addiert. Die gestrichelten Geraden ergänzen den Kegel bis zur Ebene durch M.',
      },
    };
  }
  if(key==='2009-ht-i'){
    const h=200,R=Math.sqrt(3*1e6/(Math.PI*h)),profile=[[0,0],[R,h],[0,h]];
    return {...common,h,R,profile,maxY:h,units:'mm',axis:'BD',volume:1e6,
      points:{A:[-R,h],B:[0,0],C:[R,h],D:[0,h],E:[-R*.1,h*.1],F:[R*.1,h*.1]},
      auxLines:[['E','F']],
      angles:[['B','A','C','∢CBA']],rightAngles:[['D',-1,1]],
      offsets:{B:[8,21,'start'],E:[-14,0,'end'],F:[14,0,'start']},
      highlights:{radius:[['A','D']],height:[['B','D']]},
      decomposition:{parts:[part('cone','Kegelförmiger Füllraum',gold,profile)],voids:[],breaks:[],openTop:h,terms:{Kegel:'gold'},
        note:'Das Modell zeigt den in der Aufgabe gegebenen Füllraum. Die Wandstärke ist nicht vorgegeben.'},
    };
  }
  if(key==='2009-ht-ii'){
    const h=10,join=6,r=1.8,hSmall=r*Math.tan(rad(48)),hLarge=join+hSmall,R=hLarge/Math.tan(rad(48));
    const frustum=[[0,0],[R,0],[r,join],[0,join]],cylinder=[[0,join],[r,join],[r,h],[0,h]];
    const profile=[[0,0],[R,0],[r,join],[r,h],[0,h]];
    return {...common,h,R,r,join,hSmall,hLarge,profile,maxY:h,axis:'OM',
      volume:Vcone(R,hLarge)-Vcone(r,hSmall)+Vcyl(r,h-join),
      points:{A:[-R,0],B:[R,0],C:[r,join],F:[-r,join],M:[0,0],N:[0,join],S:[0,hLarge],D:[r,h],E:[-r,h],O:[0,h]},
      auxLines:[['A','S'],['B','S'],['F','C']],
      angles:[['A','M','F','48°']],rightAngles:[['M',-1,-1],['N',-1,-1]],
      offsets:{N:[10,22,'start'],S:[10,-5,'start']},
      highlights:{small:[['F','N'],['N','S']],large:[['M','S'],['A','M']],neck:[['F','C'],['N','O']]},
      decomposition:{
        parts:[part('frustum','Kegelstumpf',gold,frustum,-Infinity,join),part('cylinder','Zylindrischer Hals',teal,cylinder,join)],
        voids:[],breaks:[join],openTop:h,helper:true,
        terms:{'großer Kegel':'gold','kleiner Kegel':'slate',Zylinder:'teal',Kugel:'blue'},
        note:'Der Füllraum besteht unten aus einem Kegelstumpf und oben aus einem Zylinder.',
      },
    };
  }
  if(key==='2009-nt-ii'){
    const R=31.5,r=15,h=70,join=R/Math.tan(rad(40));
    const bowl=arc(r,h,-1),cone=[[0,0],[R,join],[0,join]];
    const cylinder=[[0,join],[R,join],[R,h],...bowl];
    const profile=[[0,0],[R,join],[R,h],...bowl];
    const cavity=part('cavity','Halbkugelaussparung',blue,[[0,h],...bowl]);
    return {...common,R,r,h,join,profile,maxY:h,axis:'AM',
      volume:Vcone(R,join)+Vcyl(R,h-join)-2*Math.PI*r**3/3,
      surface:Math.PI*(R*Math.hypot(R,join)+2*R*(h-join)+R*R+r*r),
      points:{A:[0,0],B:[R,join],C:[R,h],D:[r,h],E:[-r,h],F:[-R,h],G:[-R,join],H:[0,join],M:[0,h]},
      auxLines:[['G','B'],['E','D']],angles:[['A','B','G','80°']],
      rightAngles:[['H',1,1],['C',-1,1],['F',1,1]],
      offsets:{D:[-9,-11,'end'],E:[9,-11,'start']},
      highlights:{cone:[['A','B'],['A','H'],['H','B']],cylinder:[['B','C']],ring:[['C','D']]},
      decomposition:{
        parts:[part('cone','Kegel',gold,cone,-Infinity,join),part('cylinder','Zylinder mit Aussparung',teal,cylinder,join)],
        voids:[cavity],breaks:[join],circles:[[r,h]],surfaceRules:[{kind:'circle',r,y:h,tone:'blue',id:'cavity'}],
        terms:{Kegel:'gold',Zylinder:'teal',Kreisring:'teal',Halbkugel:'blue'},
        note:'Kegel- und Zylindermantel, der obere Kreisring und die gekrümmte Halbkugelfläche ergeben die gesamte Oberfläche.',
      },
    };
  }
  throw new Error('Unbekannte Rotationskörperaufgabe: '+key);
}

export function liquid1009(key,g,height,ball=false){
  const lower=key==='2009-ht-i'||height<=g.join;
  const r=key==='2009-ht-i'?g.R*height/g.h:lower?g.R-(g.R-g.r)*height/g.join:g.r;
  const foot=key==='2009-ht-i'?0:g.R;
  const profile=[[0,0],...(foot>0?[[foot,0]]:[]),...(!lower?[[g.r,g.join]]:[]),[r,height],[0,height]];
  const volume=key==='2009-ht-i'?Vcone(r,height):lower?Math.PI*height*(foot**2+foot*r+r*r)/3:
    Math.PI*g.join*(foot**2+foot*g.r+g.r*g.r)/3+Vcyl(g.r,height-g.join);
  const sphere=ball?Array.from({length:65},(_,i)=>{
    const a=Math.PI*i/64;
    return [i===64?0:ballRadius*Math.sin(a),ballRadius*(1-Math.cos(a))];
  }):null;
  return {profile,height,r,volume,water:volume-(sphere?Vball:0),sphere};
}
