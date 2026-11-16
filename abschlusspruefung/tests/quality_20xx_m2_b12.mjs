import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const near=(a,b,e=1e-9)=>assert.ok(Math.abs(a-b)<e,JSON.stringify({a,b}));let points=0,steps=0;const source={};
for(const n of [1,2]){const html=fs.readFileSync('abschlusspruefung/20xx/muster2/b'+n+'.html','utf8');source[n]=html;
for(const s of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))new vm.Script(s[1]);
const tasks=JSON.parse(html.match(/const tasks=([\s\S]*?);\nfunction arrow/)[1]);points+=tasks.reduce((a,t)=>a+parseFloat(t.p.replace(',','.')),0);steps+=tasks.reduce((a,t)=>a+t.steps.length,0);
assert.equal(tasks.length,2);assert.ok(tasks.every(t=>t.steps.length>=4));assert.ok(!/href=["'][^"']*\.pdf/i.test(html));assert.ok(html.includes('Musterprüfung 2'));assert.ok(html.includes("fontCache:'none'"));assert.ok(!/\\angle\b/.test(html));}
assert.equal(points,10);assert.equal(steps,24);
let ctx={};const s=source[1];vm.runInNewContext(s.slice(s.indexOf('const f=x=>'),s.indexOf('let exploring='))+s.slice(s.indexOf('function geometry('),s.indexOf('function draw(){',s.indexOf('function geometry(')))+';globalThis.f1=f;globalThis.g=geometry;',ctx);
near(ctx.f1(6),31/16);near(ctx.f1(3),1.5);near(ctx.f1(1),0);near(ctx.f1(0),-2);
for(let x=.2;x<=8;x+=.017){const g=ctx.g(x);near(g.y,2-4*2**(-x));near(g.base,g.y+1.5);near(g.height,x);near(g.area,Math.abs(x*(g.y+1.5))/2);near(g.ab**2,x*x+2.25);near(g.ac**2,x*x+g.y*g.y);assert.ok(g.base>0);assert.ok(g.area>0);assert.equal(Math.abs(g.ab-g.ac)<1e-7,Math.abs(x-3)<1e-7);}
const g=ctx.g(3);near(g.ab,g.ac);near(g.base,3);near(g.height,3);near(g.area,4.5);near(g.midY,0);
// Independent logarithmic solution and distance equation.
const root=4+Math.log(2)/Math.log(.5);near(root,3);near(root*root+2.25,root*root+ctx.f1(root)**2);
ctx={};const a=source[2].indexOf('function probabilities('),b=source[2].indexOf('function draw(){',a);vm.runInNewContext(source[2].slice(a,b)+';globalThis.p=probabilities;',ctx);
for(const p of [0,.01,.2,.5,1])for(const missed of [0,.3,.5,1])for(const clean of [0,.15,.85,1]){const r=ctx.p(p,missed,clean);near(r.me+r.mne,p);near(r.ome+r.omne,1-p);near(r.me+r.mne+r.ome+r.omne,1);near(r.correct,r.me+r.ome);near(r.correct,1-r.mne-r.omne);assert.ok(Object.values(r).every(v=>v>=0&&v<=1));}
const r=ctx.p(.2,.3,.85);near(r.me,.14);near(r.mne,.06);near(r.ome,.68);near(r.omne,.12);near(r.correct,.82);
console.log('Musterprüfung 2 B1/B2: 4 Teilaufgaben, 10 P, 24 Schritte; Exponentialgleichung, Koordinaten, Seitenlängen/Fläche und alle vier Baum-Pfade unabhängig geprüft.');
