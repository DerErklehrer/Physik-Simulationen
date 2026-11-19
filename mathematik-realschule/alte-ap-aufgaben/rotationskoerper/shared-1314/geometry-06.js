const gold={fill:'#e5a64d',text:'#875000'};
const teal={fill:'#38a595',text:'#116d60'};
const blue={fill:'#5299c7',text:'#195b86'};
const part=(id,name,palette,profile)=>({id,name,...palette,profile,lo:-Infinity,hi:Infinity});
const cone=(radius,height)=>Math.PI*radius**2*height/3;
const common={minY:0,units:'cm',axis:'AM',angles:[],auxLines:[]};

export function geometry06(key){
  if(key==='2006-ht-ii'){
    const h=5.2,r=3.4,angle=40.7*Math.PI/180;
    const R=h/Math.tan(angle),side=h/Math.sin(angle);
    const arc=Array.from({length:97},(_,i)=>{
      const a=i*Math.PI/192;
      return [i===96?0:r*Math.cos(a),h+r*Math.sin(a)];
    });
    const coneProfile=[[0,0],[R,h],[0,h]];
    const profile=[[0,0],[R,h],...arc];
    return {...common,R,r,h,side,profile,maxY:h+r,
      volume:cone(R,h)+2*Math.PI*r**3/3,
      surface:Math.PI*(R*side+2*r*r+R*R-r*r),
      points:{A:[0,0],B:[R,h],C:[-R,h],D:[r,h],E:[-r,h],M:[0,h]},
      auxLines:[['C','B']],angles:[['C','M','A','40,7°']],rightAngles:[['M',-1,1]],
      offsets:{A:[11,22,'start'],M:[11,19,'start'],D:[11,-10,'start'],E:[-11,-10,'end']},
      highlights:{radius:[['C','M']],side:[['C','A']],ring:[['C','E'],['D','B']],hemisphere:[['M','D']]},
      decomposition:{
        parts:[{...part('cone','Kegel',gold,coneProfile),hi:h},{...part('hemisphere','Halbkugel',teal,[[0,h],...arc]),lo:h}],
        voids:[],surfaceLegend:[{name:'Kreisring',...blue}],breaks:[h],circles:[[r,h]],
        surfaceRules:[{kind:'line',r0:r,y0:h,r1:R,y1:h,tone:'blue',id:'ring'}],
        terms:{Kegelmantel:'gold',Halbkugel:'teal',Kreisring:'blue'},
        note:'Zur Oberfläche gehören der Kegelmantel, die gekrümmte Halbkugelfläche und der freiliegende Kreisring.',
      },
    };
  }
  if(key==='2006-nt-ii'){
    const R=5.5,r=5.3,side=26,innerSide=side*r/R;
    const h=Math.sqrt(side**2-R**2),innerHeight=h*r/R,tip=h-innerHeight;
    const profile=[[0,0],[R,h],[r,h],[0,tip]];
    return {...common,R,r,h,side,innerSide,tip,profile,maxY:h,
      volume:cone(R,h)-cone(r,innerHeight),
      surface:Math.PI*(R*side+r*innerSide+R*R-r*r),
      points:{A:[0,0],B:[R,h],C:[r,h],D:[0,tip],E:[-r,h],F:[-R,h],M:[0,h]},
      auxLines:[['F','B']],rightAngles:[['M',1,1]],
      offsets:{A:[10,22,'start'],D:[-14,-13,'end'],M:[11,-12,'start'],B:[12,16,'start'],C:[0,-13,'middle'],E:[0,-13,'middle'],F:[-12,16,'end']},
      highlights:{radii:[['M','B'],['M','C']],similarity:[['A','B'],['D','C']],ring:[['F','E'],['C','B']]},
      decomposition:{
        parts:[part('shell','Kegelschale',gold,profile)],
        voids:[part('cavity','Kegelförmige Aussparung',blue,[[0,tip],[r,h],[0,h]])],
        surfaceLegend:[{name:'Kreisring',...teal}],breaks:[],
        surfaceRules:[
          {kind:'line',r0:0,y0:tip,r1:r,y1:h,tone:'blue',id:'cavity'},
          {kind:'line',r0:r,y0:h,r1:R,y1:h,tone:'teal',id:'ring'},
        ],
        terms:{Außenmantel:'gold',Innenmantel:'blue',Kreisring:'teal'},
        note:'Die Oberfläche besteht aus Außenmantel, Innenmantel und dem schmalen Kreisring an der Öffnung.',
      },
    };
  }
  throw new Error('Unbekannte Rotationskörperaufgabe: '+key);
}
