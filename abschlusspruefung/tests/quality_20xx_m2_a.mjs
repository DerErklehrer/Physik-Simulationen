import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const near=(a,b,e=1e-8)=>assert.ok(Math.abs(a-b)<e,JSON.stringify({a,b}));
let points=0,steps=0;const source={};
for(let n=1;n<=4;n++){const html=fs.readFileSync('abschlusspruefung/20xx/muster2/a'+n+'.html','utf8');source[n]=html;
 for(const s of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)){if(s[0].includes('importmap')||s[0].includes('type="module"'))continue;new vm.Script(s[1])}
 const tasks=JSON.parse(html.match(/const tasks=([\s\S]*?);\nfunction arrow/)[1]);points+=tasks.reduce((a,t)=>a+parseFloat(t.p.replace(',','.')),0);steps+=tasks.reduce((a,t)=>a+t.steps.length,0);
 assert.ok(tasks.every(t=>t.steps.length>=4));assert.ok(!/href=["'][^"']*\.pdf/i.test(html));assert.ok(html.includes('Musterprüfung 2'));assert.ok(html.includes("fontCache:'none'"));
}
assert.equal(points,10);assert.equal(steps,28);
let ctx={};vm.runInNewContext(source[1].slice(source[1].indexOf('const f=(x,b)'),source[1].indexOf('let exploring='))+';globalThis.fn=f;',ctx);
near(ctx.fn(10,6),12);for(const b of [-6,0,6,8])for(let y=-8;y<=15;y+=.7)near(ctx.fn(2**(y/3)-b,b),y);
ctx={};vm.runInNewContext(source[2].slice(source[2].indexOf('function permutations('),source[2].indexOf('function initPart()',source[2].indexOf('function permutations(')))+';globalThis.all=orders;',ctx);
assert.equal(ctx.all.length,120);assert.equal(new Set(ctx.all.map(a=>a.join(','))).size,120);assert.ok(ctx.all.every(a=>[...a].sort().join('')==='12345'));assert.equal(ctx.all.filter(a=>a.join('')==='12345').length,1);assert.ok(1/120<1/100);
for(const n of [3,4]){ctx={};const a=source[n].indexOf('function geometry('),b=source[n].indexOf('function initPart()',a);vm.runInNewContext(source[n].slice(a,b)+';globalThis.g=geometry;',ctx);
 if(n===3){let prev=Infinity;for(let phi=1;phi<=179;phi+=.17){const g=ctx.g(phi);assert.ok(g.L>0&&g.L<prev);prev=g.L;const dist=(p,q)=>Math.hypot(p[0]-q[0],p[1]-q[1]);near(dist(g.A,g.B),dist(g.A,g.D));near(dist(g.C,g.B),dist(g.C,g.D));near((g.D[0]-g.C[0])*(g.B[0]-g.C[0])+(g.D[1]-g.C[1])*(g.B[1]-g.C[1]),0);near(2*Math.atan(2.5/g.L)*180/Math.PI,phi);near(g.L*Math.tan(phi*Math.PI/360),2.5)}near(ctx.g(90).L,2.5);near(ctx.g(60).L,2.5*Math.sqrt(3));}
 else{for(let f=0;f<=9;f+=.03){const g=ctx.g(f),remaining=(3*g.k)**2*(3-g.waterHeight)/3;near(g.total-remaining,f);near(2*g.inset+3*g.k,3);assert.ok(g.waterHeight>=0&&g.waterHeight<=3)}assert.equal(ctx.g(7.2).okay,true);assert.equal(ctx.g(7.1).okay,false);near(ctx.g(8).ratio,8/9);near(ctx.g(0).waterHeight,0);near(ctx.g(9).waterHeight,3);near(3*3*3/3,9);near(9*4/5,7.2)}
}
console.log('Musterprüfung 2 A: 5 Teilaufgaben, 10 P, 28 Schritte. Logarithmusparameter/Wertemenge, 120 Permutationen, Drachenfamilie und Pyramiden-/Flüssigkeitsgeometrie unabhängig geprüft.');
