const radians=degrees=>degrees*Math.PI/180;
const gold={fill:'#e5a64d',text:'#875000'};
const teal={fill:'#38a595',text:'#116d60'};
const blue={fill:'#5299c7',text:'#195b86'};
const pink={fill:'#bf5c88',text:'#8b2857'};
const part=(id,name,palette,profile,lo=-Infinity,hi=Infinity)=>({id,name,...palette,profile,lo,hi});
const cone=(r,h)=>Math.PI*r*r*h/3;
const common={minY:0,units:'cm',rightAngles:[],angles:[],auxLines:[],highlights:{}};

export function geometry0807(key){
  if(key==='2008-ht-ii'){
    const R=3.5,r=2,h=10,slope=Math.tan(radians(40));
    const join=h-(R-r)*slope,apex=h-R*slope;
    const shaft=[[0,0],[r,0],[r,join],[0,join]];
    const head=[[0,join],[r,join],[R,h],[0,h]];
    const profile=[[0,0],[r,0],[r,join],[R,h],[0,h]];
    return {...common,R,r,h,join,apex,profile,maxY:h,axis:'GH',units:'mm',
      volume:Math.PI*r*r*join+cone(R,R*slope)-cone(r,r*slope),
      points:{A:[-R,h],G:[0,h],F:[R,h],B:[-r,join],K:[0,join],E:[r,join],S:[0,apex],C:[-r,0],H:[0,0],D:[r,0]},
      auxLines:[['B','S'],['E','S'],['B','E']],
      angles:[['A','G','B','40°']],rightAngles:[['G',-1,1],['C',1,-1]],
      offsets:{S:[10,15,'start'],K:[10,-12,'start'],B:[-12,12,'end'],E:[12,12,'start'],C:[-10,20,'end'],D:[10,20,'start']},
      highlights:{large:[['G','S'],['A','G']],small:[['K','S'],['B','K']],shaft:[['C','B']]},
      decomposition:{
        parts:[part('shaft','Zylindrischer Schaft',teal,shaft,-Infinity,join),part('head','Kegelstumpfkopf',gold,head,join)],
        voids:[],breaks:[join],helper:true,
        terms:{Zylinder:'teal','großer Kegel':'gold','kleiner Kegel':'slate'},
        note:'Der Kegelstumpfkopf ist der große Kegel abzüglich des kleinen Ergänzungskegels.',
      },
    };
  }
  if(key==='2007-ht-ii'){
    const radius=4,angle=radians(20),side=radius/Math.tan(angle),R=side*Math.sin(angle),h=side*Math.cos(angle);
    const center=h+radius*Math.sin(angle);
    const sphere=Array.from({length:97},(_,i)=>{
      const a=Math.PI*i/96;
      return [i===0||i===96?0:radius*Math.sin(a),center-radius*Math.cos(a)];
    });
    const volume=cone(R,h),meltVolume=.42*4*Math.PI*radius**3/3;
    const meltHeight=h*Math.cbrt(meltVolume/volume),meltRadius=R*meltHeight/h;
    const profile=[[0,0],[R,h],[0,h]];
    return {...common,R:radius,rimRadius:R,h,radius,side,center,sphere,profile,volume,meltVolume,meltHeight,
      meltProfile:[[0,0],[meltRadius,meltHeight],[0,meltHeight]],maxY:center+radius,axis:'AM',
      points:{A:[0,0],B:[R,h],C:[-R,h],N:[0,h],M:[0,center]},
      auxLines:[['C','B'],['C','M'],['B','M']],
      angles:[['A','B','C','40°'],['C','M','A','right']],rightAngles:[['N',-1,1]],
      offsets:{A:[10,19,'start'],M:[12,-5,'start'],N:[11,22,'start']},
      highlights:{sphere:[['C','M']],rim:[['C','N']],height:[['A','N']]},
      decomposition:{
        parts:[part('cup','Kegelförmiger Füllraum',gold,profile)],voids:[],breaks:[],openTop:h,
        terms:{Eisbecher:'gold',Eiscreme:'pink',Eiscremekugel:'pink'},
        note:'Das Modell zeigt den Füllraum des Bechers und die Eiskugel. Im letzten Lösungsschritt erscheint die geschmolzene Eiscreme.',
      },
      icePalette:pink,
    };
  }
  if(key==='2007-nt-ii'){
    const R=4,r=3,h=R/Math.tan(radians(35)),top=h+2,side=R/Math.sin(radians(35));
    const lower=[[0,0],[R,h],[0,h]],rim=[[r,h],[R,h],[R,top],[r,top]];
    const profile=[[0,0],[R,h],[R,top],[r,top],[r,h],[0,h]];
    const cavity=part('cavity','Zylindrische Aussparung',blue,[[0,h],[r,h],[r,top],[0,top]]);
    return {...common,R,r,h,top,side,profile,maxY:top,axis:'MS',
      volume:cone(R,h)+Math.PI*(R*R-r*r)*2,
      surface:Math.PI*(R*side+2*R*2+2*r*2+R*R),
      points:{S:[0,0],M:[0,h],F:[-R,h],A:[R,h],E:[-R,top],D:[-r,top],C:[r,top],B:[R,top]},
      angles:[['S','A','F','70°']],rightAngles:[['M',1,-1],['E',1,1],['D',-1,1]],
      offsets:{E:[-13,-14,'end'],D:[6,-14,'start'],C:[-6,-14,'end'],B:[13,-14,'start']},
      highlights:{side:[['A','S'],['F','S']],outer:[['A','B']],inner:[['C','D']]},
      decomposition:{
        parts:[part('cone','Kegelmantel und Boden der Vertiefung',gold,lower,-Infinity,h),{...part('rim','Zylindrischer Rand und Kreisring',teal,rim,h),splitAcrossAxis:true}],
        voids:[cavity],breaks:[h],
        surfaceRules:[{kind:'line',r0:r,y0:h,r1:r,y1:top,tone:'blue',id:'cavity'}],
        terms:{Kegelmantel:'gold',Außenmantel:'teal',Innenmantel:'blue',Kreisring:'teal',Kreisboden:'gold'},
        note:'Der innere und der äußere Zylindermantel sind sichtbar. Oberer Kreisring und Boden der Vertiefung ergeben zusammen die Fläche eines Kreises mit dem Außenradius.',
      },
    };
  }
  throw new Error('Unbekannte Rotationskörperaufgabe: '+key);
}
