/**
 * Reproduzierbare statische Fach-/Strukturtests für Mathematik I 2025.
 * Start aus dem Repository-Hauptverzeichnis:
 *     node abschlusspruefung/tests/quality_2025.mjs
 *
 * WICHTIG: Diese Tests ersetzen KEINE der drei vollständigen
 * neunfachen Freigabekontrollen. Browser-/Touch-/visuelle Tests und
 * Wort-für-Wort-ISB-Abgleich erfordern separate Prüfnachweise.
 */
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {Script} from 'node:vm';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
const root=join(dirname(fileURLToPath(import.meta.url)),'..','2025','haupttermin');
const names=['a1','a2','a3','b1','b2','b3','b4'];
const counts={a1:2,a2:4,a3:2,b1:3,b2:4,b3:6,b4:5};
const scores={a1:2.5,a2:6,a3:3,b1:5,b2:6.5,b3:16,b4:14.5};
let checked=0;
function test(name,condition){assert.ok(condition,name);checked++;}
function close(name,a,b,tol=1e-8){test(name,Math.abs(a-b)<=tol);}
const contents={};
for(const name of names){
 const html=await readFile(join(root,name+'.html'),'utf8');
 contents[name]=html;
 test(name+': HTML-Dokument',/<!doctype html>/i.test(html)&&html.includes('</html>'));
 test(name+': korrekter Jahrgang',html.includes('2025'));
 test(name+': Mathe-Renderer',html.includes('MathJax'));
 test(name+': Lösungsnavigation',html.includes('id="next"')&&html.includes('id="prev"')&&html.includes('id="reset"'));
 test(name+': keine PDF-Links',!/href=["'][^"']*\.pdf/i.test(html));
 test(name+': keine falschen Multiplikationssymbole',!/×|\\times/.test(html));
 test(name+': Winkelnotation',!/∠|\\angle\b/.test(html));
 const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
 const app=scripts.find(x=>x.includes('function ')||x.includes('const T=')||x.includes('const tasks='));
 test(name+': Inline-JS vorhanden',!!app);
 new Script(app,{filename:name+'.html'});checked++;
 const taskPattern=name.startsWith('a')?new RegExp("label:'"+name.toUpperCase().replace(/(\d)$/,' $1')+"\\.\\d","g"):new RegExp("(?:n:|title:)'"+name.toUpperCase().replace(/(\d)$/,' $1')+"\\.\\d","g");
 // Task count can be alternatively checked by explicit subproblem tags.
 for(let k=1;k<=counts[name];k++)test(name+': Teilaufgabe '+k,html.includes(name.toUpperCase().replace(/(\d)$/,' $1')+'.'+k));
}
test('Prüfung 2025 Punkte gesamt',Object.values(scores).reduce((a,b)=>a+b,0)===53.5);
test('B3: kein Quellenkürzel unmittelbar am Reglerwert',!contents.b3.includes('ISB: x ≈ 0,28'));
test('B3: Quellenhinweis im Lösungstext zulässig',contents.b3.includes('ISB-Lösungsmuster'));
const overview=await readFile(join(root,'..','..','index.html'),'utf8');
test('Jahrgangsübersicht: 2025 führt zur neuen Aufgabenauswahl',overview.includes('2025/haupttermin/index.html?v=20261114-navigation'));
const index=await readFile(join(root,'index.html'),'utf8');
for(const name of names)test('Übersicht verlinkt '+name,index.includes('href="'+name+'.html"')||index.includes('href="./'+name+'.html"'));
test('A1: amtlicher A1.0-Wortlaut Wohnungs- und Briefkastenschlüssel',contents.a1.includes('einen großen Wohnungs- und einen kleinen Briefkastenschlüssel.'));
test('A1: Diagrammergebnisse nicht vorzeitig sichtbar',contents.a1.includes("function syncDiagram()")&&contents.a1.includes("syncDiagram();"));
test('A1: alle zehn Brüche vertikal im SVG',!/>1\/5<|>4\/5<|>16\/25<|>8\/25<|>1\/25</.test(contents.a1));
const a3Ax=585-288*Math.sqrt(3),a3Mx=(a3Ax+585)/2,a3Sx=(a3Ax+585+585)/3;
close('A3: Mittelpunkt pixelgenau',a3Mx,335.585,0.001);
close('A3: Schwerpunkt pixelgenau',a3Sx,418.723,0.001);
close('A3: geometrischer Winkel',Math.atan((585-a3Mx)/144)*180/Math.PI,60,1e-9);
test('A3: Seitenlängen erst im Rechenschritt',contents.a3.includes('id="sideLengths"')&&contents.a3.includes("part===1?'':'none'"));
test('A3: Schwerpunkt korrekt markiert',contents.a3.includes('cx="418.723" cy="140"'));
test('B2: korrekte Schrägbildachsen',contents.b2.includes('D=[260,250]')&&contents.b2.includes('B=[280,390]'));
test('B2: 3D-Modul eingebunden',contents.b2.includes('raumgeometrie3d.js'));
test('A2: 3D-Modul eingebunden',contents.a2.includes('raumgeometrie3d.js'));
test('B3: Rundungshinweis',contents.b3.includes('Rundungshinweis B 3.5'));
test('B4: Rundungshinweis',contents.b4.includes('Rundungshinweis zu B 4.3'));
const rad=x=>x*Math.PI/180;
for(const x of [-3,0.28,1,2.1]){
 const f=-3*Math.pow(.5,x+4)+3,g=2*Math.pow(.5,x+3)-4;
 close('B3: Abstand '+x,f-g,-3.5*Math.pow(.5,x+3)+7);
 test('B3: positiver Abstand '+x,f-g>0);
}
close('B3: exakt gleichschenklig',8-4*Math.sin(rad(20)),6.631919426697325);
close('B3: gerundeter Überstand',8-2*.68,6.64);
close('B3: echte Trapezhöhe',2*Math.cos(rad(20)),1.8793852415718169);
for(const p of [0.5,5,10,15,20,29.5]){
 const shares=[40,30,p,30-p],flavors=[50,20,30];
 close('B1: vier Farbanteile addieren sich zu 100 bei p='+p,shares.reduce((a,b)=>a+b,0),100);
 for(const [i,share] of shares.entries())close('B1: Geschmackssumme Farbe '+i+', p='+p,flavors.reduce((a,b)=>a+b,0)*share/100,share);
 close('B1: grün UND Apfel bei p='+p,p/100*.5,p/200);
 close('B1: Sebastian unabhängig von p='+p,shares.slice(0,2).reduce((a,b)=>a+b,0)*.8/100,.56);
 test('B1: weiße Schachteln haben positiven Anteil p='+p,30-p>0);
}
test('B1: ursprüngliche vier Antwortmöglichkeiten', [...contents.b1.matchAll(/name="white" value="/g)].length===4);
test('B1: verdeckter weißer Anteil',contents.b1.includes('revealWhite=part===0&&step>=2'));
test('B1: Pfadergebnisse nicht vor der Addition',contents.b1.includes('showPaths=part===2&&step>=2'));
test('B1: p=20 nicht vor Rechenende',contents.b1.includes("revealGreenResult=part===1&&step>=2"));
close('B1: Sebastian',(.4+.3)*(.5+.3),.56);
close('A1: beide Schlüssel',1/5*1/5,1/25);
close('A1: genau einer',2*(1/5)*(4/5),8/25);
close('A2: Oberflächeninhalt @30°',32*Math.PI*Math.sin(rad(30)),16*Math.PI);
close('A3: rechter Winkel-Median',Math.atan(Math.sqrt(3))*180/Math.PI,60);
close('B2: 50 cm³ in φ',Math.atan(50/18)*180/Math.PI,70.20,.005);
close('B2: maximal 50 %',.5*10*3*4,60);
close('B4: Abstandsminimum x',-(3+3.5)/1.25,-5.2);
const c=Math.cos(rad(40)),s=Math.sin(rad(40));
const exactSlope=x=>{const dx=x+3,dy=.5*x+7;return .5*(-s*dx+c*dy)-.25*(c*dx+s*dy)};
const exactRoot=-exactSlope(0)/(exactSlope(1)-exactSlope(0));
close('B4: geometrisch exakter Sonderfall',exactRoot,.04371580741452434);
close('B4: offizieller Sonderfall mit gerundeten Koeffizienten',.04/.405,.10,.005);
console.log('2025: '+checked+' statische und mathematische Prüfungen erfolgreich.');
console.log('NICHT geprüft: ISB-Wortlaut, sämtliche visuelle Darstellungen, echte Browserlaufzeit, MathJax/Three.js im Browser, Mobile/Touch. Keine Freigabe.');
