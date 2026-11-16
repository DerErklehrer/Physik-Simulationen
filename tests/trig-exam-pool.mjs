import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import crypto from 'node:crypto';import assert from 'node:assert/strict';
const root='mathematik-10/abschlusspruefungsaufgaben',catalogue=JSON.parse(fs.readFileSync(root+'/catalogue.json')),manifest=JSON.parse(fs.readFileSync(root+'/source-manifest.json'));
assert.equal(catalogue.length,30);assert.equal(catalogue.reduce((n,g)=>n+g.picks.length,0),87);assert.equal(new Set(catalogue.map(g=>g.year)).size,6);
for(const [p,sha]of Object.entries(manifest))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'),sha,'Original verändert: '+p);
const hub=fs.readFileSync('mathematik-10/index.html','utf8'),index=fs.readFileSync(root+'/index.html','utf8');assert.equal((hub.match(/href="abschlusspruefungsaufgaben\/"/g)||[]).length,1);assert.equal((index.match(/\?teil=/g)||[]).length,87);
let compiled=0;
for(const g of catalogue){const f=root+'/'+g.url,s=fs.readFileSync(f,'utf8');assert.ok(s.includes('initTraining('));assert.ok(s.includes('../training.js'));assert.ok(!/href=["'][^"']*\.pdf/i.test(s));for(const i of g.picks)assert.ok(index.includes(g.url+'?teil='+i));
 for(const [,attrs,code]of s.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){if(!code.trim()||/importmap|type="module"/.test(attrs))continue;new vm.Script(code,{filename:f});compiled++}
 for(const [,src]of s.matchAll(/(?:src|href)="([^"#]+\.(?:js|svg|css|png))"/g)){if(/^https?:|^data:/.test(src))continue;assert.ok(fs.existsSync(path.resolve(path.dirname(f),src)),f+' -> '+src)}
}
new vm.Script(fs.readFileSync(root+'/training.js','utf8'));assert.equal(catalogue.find(g=>g.id==='2026-b4').overrides['2'].takeSteps.length,3);assert.equal(catalogue.find(g=>g.id==='2026-b3').overrides['5'].takeSteps.length,2);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8),rad=x=>x*Math.PI/180;
// Independent arithmetic for rewritten geometric solutions and supplied coordinates.
const phi2023=Math.atan(3.5/(9-9*7/11))*180/Math.PI;assert.equal(phi2023.toFixed(2),'46.92');
near(1.25*(-5.2)**2+13*(-5.2)+58,24.2);assert.equal((Math.acos(-1/7)*180/Math.PI).toFixed(2),'98.21');
const p1=Math.atan(24/35)*180/Math.PI;assert.equal(p1.toFixed(2),'34.44');near(5*(8-5.6),12);
const L=3.5*Math.sqrt(2),p2=Math.atan(6/(5*L/3))*180/Math.PI;assert.equal(p2.toFixed(2),'36.03');near(24.5*6/3,49);near(49*3/3,49);
for(const x of [-2,0,2.5,6.5,10]){const u=(9-x)/5,v=2*u,D=[2*u-x,2*v+x-4.5];near(D[0],-1.4*x+3.6);near(D[1],.2*x+2.7)}
for(const x of [-7,-1]){const a=-2*1.3**x-.5,c=2.5*1.3**(x+3)+2;const rounded=x===-7?[-.8187,2.8753]:[-2.0385,6.225];assert.ok(Math.abs(a-rounded[0])<.00005);assert.ok(Math.abs(c-rounded[1])<.00005)}
console.log(`87 Einzelübungen, ${compiled} Inline-Skripte, lokale Ressourcen, sechs Prüfungen, unveränderte Originale und alternative Rechenwege geprüft.`);
