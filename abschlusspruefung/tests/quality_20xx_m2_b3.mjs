import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const s=fs.readFileSync('abschlusspruefung/20xx/muster2/b3.html','utf8'),tasks=JSON.parse(s.match(/const tasks=([\s\S]*?);\nfunction arrow/)[1]);
for(const m of s.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
assert.equal(tasks.length,6);assert.equal(tasks.reduce((a,t)=>a+parseFloat(t.p.replace(',','.')),0),17);assert.equal(tasks.reduce((a,t)=>a+t.steps.length,0),35);assert.ok(!/href=["'][^"']*\.pdf/.test(s));assert.ok(!/\\angle\b/.test(s));
const ctx={};vm.runInNewContext(s.slice(s.indexOf('const rad='),s.indexOf('let preciseX='))+s.slice(s.indexOf('function geometry('),s.indexOf('function setX('))+';globalThis.g=geometry;globalThis.x35=special35;globalThis.x90=special90;',ctx);
const near=(a,b,e=1e-8)=>assert.ok(Math.abs(a-b)<e,JSON.stringify({a,b})),dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]),dot=(a,b)=>a[0]*b[0]+a[1]*b[1],vec=(a,b)=>[b[0]-a[0],b[1]-a[1]];
for(let x=1.5001;x<14;x+=.019){const g=ctx.g(x),{A,B,C,D,M}=g;
near(B[1],-B[0]+4.5);for(const p of [A,M,C])near(p[1],2*p[0]);near(M[0],(B[0]+D[0])/2);near(M[1],(B[1]+D[1])/2);near(dot(vec(M,A),vec(M,B)),0);
near(dist(M,C),.5*dist(A,M));near(dist(A,B),dist(A,D));near(dist(C,B),dist(C,D));near(D[0],-.6*B[0]+.8*B[1]);near(D[1],.8*B[0]+.6*B[1]);near(D[1],-D[0]/7+45/14);
const points=[A,B,C,D];let area=0;for(let i=0;i<4;i++)area+=points[i][0]*points[(i+1)%4][1]-points[(i+1)%4][0]*points[i][1];near(g.area,Math.abs(area)/2);near(g.area,.45*(14-x)*(2*x-3));
const ab=vec(A,B),ac=vec(A,C);near(g.half,Math.acos(Math.max(-1,Math.min(1,dot(ab,ac)/(Math.hypot(...ab)*Math.hypot(...ac)))))*180/Math.PI,1e-6);assert.ok(g.am>0&&g.mb>0&&g.area>0);}
for(const [x,C,D]of [[2.5,[2.45,4.9],[.1,3.2]],[6.5,[1.25,2.5],[-5.5,4]]]){const g=ctx.g(x);for(let i=0;i<2;i++){near(g.C[i],C[i]);near(g.D[i],D[i])}}
const d=ctx.g(5.25).D;near(d[0],-3.75);near(d[1],3.75);near(d[1],-d[0]);
near(ctx.g(ctx.x35).half,35);near(ctx.x35,3.87,.005);near(ctx.x35,(14*Math.tan(35*Math.PI/180)+4.5)/(3+Math.tan(35*Math.PI/180)));
const g=ctx.g(ctx.x90);near(ctx.x90,37/8);near(g.half,45);near(g.am,g.mb);near(dot(vec(g.A,g.B),vec(g.A,g.D)),0);near(g.area,1.5*g.am**2);
near(ctx.g(1.5).area,0);near(ctx.g(14).area,0);
console.log('Musterprüfung 2 B3: 6 Teilaufgaben, 17 P, 35 Schritte; Spiegelung, Punktfamilie, Trägergerade, Sonderlagen und Flächenbegründung unabhängig geprüft.');
