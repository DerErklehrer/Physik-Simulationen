const rad = degrees => degrees * Math.PI / 180;
const gold = {fill:'#e5a64d',text:'#875000'};
const teal = {fill:'#38a595',text:'#116d60'};
const blue = {fill:'#5299c7',text:'#195b86'};
const part = (id,name,palette,profile,lo=-Infinity,hi=Infinity) => ({id,name,...palette,profile,lo,hi});

export const settings1211 = {
  '2012-ht-i': {value:80,min:0.01,max:112.61,presets:{2:100}},
  '2011-ht-i': {value:120,min:104.04,max:160.02,presets:{}},
};

export function geometry1211(key,phi){
  const R=4.5;
  if(key==='2012-ht-i'){
    const r=3*Math.tan(rad(phi/2));
    const profile=[[0,0],[R,0],[R,5],[r,5],[0,2]];
    const cylinder=part('cylinder','Zylinder',teal,profile);
    const cavity=part('cavity','Kegelaussparung · abziehen',blue,[[0,2],[r,5],[0,5]]);
    return {
      R,r,phi,profile,minY:0,maxY:5,axis:'MF',units:'cm',
      volume:Math.PI*(R*R*5-r*r),
      points:{A:[-R,5],B:[-R,0],C:[R,0],D:[R,5],E:[r,5],F:[0,2],G:[-r,5],M:[0,0],H:[0,5]},
      subscript:['E','G'],auxLines:[['F','H'],['G','E']],
      rightAngles:[['B',1,-1],['A',1,1]],angles:[['F','G','E','φ']],
      highlights:{boundary:[['A','D'],['F','H']],radius:[['H','E'],['F','H']],parts:[]},
      decomposition:{
        parts:[cylinder],voids:[cavity],breaks:[],
        surfaceRules:[{kind:'line',r0:0,y0:2,r1:r,y1:5,tone:'blue',id:'cavity'}],
        terms:{Zylinder:'teal',Kegel:'blue'},
        note:'Das Volumen der offenen Kegelaussparung wird vom Zylindervolumen abgezogen.',
      },
    };
  }
  if(key==='2011-ht-i'){
    const h=Math.tan(rad(phi-90));
    const cone=[[0,0],[1,h],[0,h]],cylinder=[[0,h],[1,h],[1,2*h],[0,2*h]];
    const profile=[[0,0],[1,h],[1,2*h],[0,2*h]];
    return {
      R:1,phi,h,profile,minY:0,maxY:2*h,axis:'FCₙ',units:'m',
      volume:4*Math.PI*h/3,
      points:{A:[-1,2*h],B:[-1,h],C:[0,0],D:[1,h],E:[1,2*h],F:[0,2*h],G:[0,h]},
      subscript:['B','C','D'],auxLines:[['B','D']],
      rightAngles:[['A',1,1],['F',-1,1]],angles:[['B','A','C','φ']],
      highlights:{radius:[['A','F']],height:[['A','B'],['C','G']],angle:[['B','G'],['B','C']],parts:[]},
      decomposition:{
        parts:[part('cone','Kegel',gold,cone,-Infinity,h),part('cylinder','Zylinder',teal,cylinder,h)],
        voids:[],breaks:[h],terms:{Zylinder:'teal',Kegel:'gold'},
        note:'Zylinder und Kegel haben jeweils denselben Radius und dieselbe Höhe.',
      },
    };
  }
  const r=2,slope=Math.tan(rad(52)),large=R*slope,small=r*slope,h=large-small;
  const arc=Array.from({length:97},(_,i)=>{
    const angle=Math.PI*i/192;
    return i===96?[0,h-r]:[r*Math.cos(angle),h-r*Math.sin(angle)];
  });
  const profile=[[0,0],[R,0],[r,h],...arc.slice(1)];
  const cavity=part('cavity','Halbkugelaussparung · abziehen',blue,[[0,h],...arc]);
  return {
    R,r,profile,minY:0,maxY:large,axis:'MS',units:'cm',
    volume:Math.PI*(R*R*large-r*r*small-2*r**3)/3,
    points:{A:[-R,0],B:[R,0],C:[r,h],D:[-r,h],E:[0,h],M:[0,0],S:[0,large]},
    auxLines:[['D','S'],['C','S'],['D','C']],
    rightAngles:[['M',-1,-1],['E',-1,-1]],angles:[['A','B','D','52°']],
    highlights:{large:[['A','S'],['M','S']],small:[['E','S'],['E','C']],parts:[]},
    decomposition:{
      parts:[part('wood','Kegelstumpf aus Holz',gold,profile)],voids:[cavity],breaks:[],
      circles:[[r,h]],surfaceRules:[{kind:'circle',r,y:h,tone:'blue',id:'cavity'}],
      helper:true,terms:{'großer Kegel':'gold','kleiner Kegel':'slate',Halbkugel:'blue'},
      numericTerms:[
        [String.raw`\frac13\pi\cdot4{,}5^2\cdot5{,}8`,'gold'],
        [String.raw`\frac13\pi\cdot2^2\cdot2{,}6`,'slate'],
        [String.raw`\frac23\pi\cdot2^3`,'blue'],
      ],
      note:'Der Kegelstumpf ist der große Kegel abzüglich des kleinen. Zusätzlich wird die Halbkugelaussparung abgezogen.',
    },
  };
}
