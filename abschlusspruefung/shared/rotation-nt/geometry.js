export const radians=d=>d*Math.PI/180;
export function geometry(key,phi){
 if(key==='2024-I'){const R=3,h=R*Math.tan(radians(phi/2));return{R,h,minY:-h,maxY:h,axis:'SₙTₙ',volume:2*Math.PI*R**2*h/3,profiles:{lower:[[0,0],[R,-h],[0,-h]],upper:[[0,0],[R,h],[0,h]]}}}
 if(key==='2025-I'){const h=4,R=4*Math.tan(radians(phi)),r=R/2,s=4/Math.cos(radians(phi)),sphere=[[0,0],[r,0]];for(let i=1;i<=48;i++){const a=i*Math.PI/96;sphere.push([r*Math.cos(a),r*Math.sin(a)])}return{R,r,h,s,minY:-4,maxY:r,axis:'DM',surface:Math.PI*R*s+2*Math.PI*r*r+Math.PI*(R*R-r*r),profiles:{cone:[[0,-4],[R,0],[0,0]],sphere}}}
 if(key==='2026-II'){const R=3.5,r=2,H=4.5,HA=Math.hypot(R,H),HB=HA*r/R,smallHeight=H*r/R,bottom=-H+smallHeight,sphere=[[0,0],[R,0]];for(let i=1;i<=48;i++){const a=i*Math.PI/96;sphere.push([R*Math.cos(a),R*Math.sin(a)])}return{R,r,H,HA,HB,slant:HA-HB,bottom,minY:-H,maxY:R,axis:'EH',surface:2*Math.PI*R*R+Math.PI*(R+r)*(HA-HB)+Math.PI*r*r,officialSurface:Math.PI*(2*R*R+R*5.70-r*3.26+r*r),profiles:{frustum:[[0,bottom],[r,bottom],[R,0],[0,0]],sphere}}}
 throw Error('Unbekannte Aufgabe '+key);
}
