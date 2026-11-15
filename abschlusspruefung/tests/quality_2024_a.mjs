import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import {fileURLToPath} from 'node:url';import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../2024/haupttermin');let checked=0;const test=(name,value)=>{assert.ok(value,name);checked++},close=(name,a,b)=>test(name,Math.abs(a-b)<1e-10);
const counts=[2,3,3],scores=[2.5,6,3];
for(let i=1;i<=3;i++){
 const text=fs.readFileSync(path.join(root,`a${i}.html`),'utf8');const tasks=JSON.parse(text.match(/const tasks=(\[[\s\S]*?\n\]);/)[1]);
 close('Teilaufgaben A'+i,tasks.length,counts[i-1]);close('Punkte A'+i,tasks.reduce((n,t)=>n+parseFloat(t.p.replace(',','.')),0),scores[i-1]);
 for(const[t,j]of tasks.map((t,j)=>[t,j])){test('Originalfrage '+t.n,t.q.length>65);test('Schritte '+t.n,t.steps.length>=3);test('Nummer '+t.n,t.n===`A ${i}.${j+1}`);for(const[title,s]of t.steps){test('Erklärung '+title,s.length>20);test('Keine horizontale Division im TeX '+title,!/\\\([^)]*\d\s*\/\s*\d/.test(s))}}
 for(const m of text.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))if(m[1].trim()&&!m[0].includes('type="importmap"'))new vm.Script(m[1]);
 test('Keine öffentlichen PDF-Links '+i,!/href=["'][^"']*\.pdf/i.test(text));test('Mobile Übersicht '+i,text.includes("classList.toggle('overview')"));
}
const am=Math.sqrt(49-4.5**2);close('A1 wahres Dreieck AB=AC',Math.hypot(am,4.5),7);close('A1 BC',4.5+4.5,9);close('A1 Verkürzung',6/9,2/3);close('A1 projizierte BC',Math.hypot(3,3*Math.sqrt(3)),6);close('A1 Winkel ACS',Math.acos(49/(7*Math.sqrt(98)))*180/Math.PI,45);
const a1=fs.readFileSync(path.join(root,'a1.html'),'utf8');test('A1 keine fälschlich gestrichelten Pyramidenkanten',!a1.includes("line(S,B,'#9a2848',2.8,'"));
for(let k=0;k<=20;k++)close('A2 nächste Zugwahrscheinlichkeiten '+k,(20-k)/(25-k)+5/(25-k),1);
close('A2 erster/zweiter Zug',5/25+20/25*5/24,11/30);let survival=1,sum=0;for(let k=0;k<=20;k++){sum+=survival*5/(25-k);survival*=(20-k)/(25-k)}close('A2 spätestens21 summiert1',sum,1);close('A2 nach20A sicherB',5/(25-20),1);
const f=x=>1/Math.sqrt(x+2);close('A3 P142',f(142),1/12);close('A3 Nullstelle verschoben',f(-7/4)-2,0);for(const x of [-1.999,-1,0,10,142,1e6])test('A3 positiv '+x,f(x)>0);
const a3=fs.readFileSync(path.join(root,'a3.html'),'utf8');test('A3 Wurzel im tatsächlichen Graphenmodell',a3.includes('1/Math.sqrt(x+2)'));test('A3 vier ursprüngliche Vektoren',a3.includes('[[2,0],[-2,0],[0,2],[0,-2]]'));test('A3 ursprüngliche Abszisse142',a3.includes('P(142'));
console.log(`2024 A: ${checked} mathematische, Quellen- und Strukturchecks bestanden. Kein Ersatz für visuellen Original- und Browserabgleich.`);
