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
test('A1: amtlicher A1.0-Wortlaut Wohnungs- und Briefkastenschlüssel',contents.a1.includes('einen großen Wohnungsschlüssel und einen kleinen Briefkastenschlüssel.'));
test('A1: Diagrammergebnisse nicht vorzeitig sichtbar',contents.a1.includes("function syncDiagram()")&&contents.a1.includes("syncDiagram();"));
test('A1: alle zehn Brüche vertikal im SVG',!/>1\/5<|>4\/5<|>16\/25<|>8\/25<|>1\/25</.test(contents.a1));
const a3Ax=585-288*Math.sqrt(3),a3Mx=(a3Ax+585)/2,a3Sx=(a3Ax+585+585)/3;
close('A3: Mittelpunkt pixelgenau',a3Mx,335.585,0.001);
close('A3: Schwerpunkt pixelgenau',a3Sx,418.723,0.001);
close('A3: geometrischer Winkel',Math.atan((585-a3Mx)/144)*180/Math.PI,60,1e-9);
test('A3: Seitenlängen erst im Rechenschritt',contents.a3.includes('id="sideLengths"')&&contents.a3.includes("part===1?'':'none'"));
test('A3: Schwerpunkt korrekt markiert',contents.a3.includes('cx="418.723" cy="140"'));
test('B2: korrekte Schrägbildachsen',contents.b2.includes('depth=200/Math.sqrt(2)')&&contents.b2.includes('B=[280,390]'));
test('B2: 3D-Modul eingebunden',contents.b2.includes('raumgeometrie3d.js'));
test('A2: 3D-Modul eingebunden',contents.a2.includes('raumgeometrie3d.js'));
test('B3: Rundungshinweis',contents.b3.includes('Rundungshinweis B 3.5'));
test('B4: Rundungshinweis',contents.b4.includes('Zwischenrundung in B 4.3')&&contents.b4.includes("$('rounding').style.display=canP3"));
const rad=x=>x*Math.PI/180;
for(const x of [-3,0.28,1,2.1]){
 const f=-3*Math.pow(.5,x+4)+3,g=2*Math.pow(.5,x+3)-4;
 close('B3: Abstand '+x,f-g,-3.5*Math.pow(.5,x+3)+7);
 test('B3: positiver Abstand '+x,f-g>0);
}
for(const x of [-5,-4,-3,-2,0,1,2,4]){
 const fn=-3*Math.pow(.5,x+4)+3,gn=2*Math.pow(.5,x+3)-4;
 close('B3: f1 umgeschrieben bei x='+x,fn,3-1.5*Math.pow(.5,x+3));
 close('B3: f2 gegen Kontrollwert bei x='+x,gn,Math.pow(.5,x+2)-4);
 if(x>-4){
  const length=fn-gn,AD=2,dx=AD*Math.cos(rad(20)),dy=AD*Math.sin(rad(20)),lot=dx;
  close('B3: Länge AB als Funktionsdifferenz x='+x,length,7-3.5*Math.pow(.5,x+3));
  close('B3: Seitenlänge AD x='+x,Math.hypot(dx,dy),2);
  close('B3: Abstand zum parallelen CD x='+x,lot,1.8793852415718169);
  const cY=fn+dy-8,bc=Math.hypot(dx,cY-gn);
  test('B3: nichtdegeneriertes Trapez x='+x,Math.abs(bc)>0);
  const area=(8+length)*lot/2;
  test('B3: Flächeninhalt streng unter 14,1 FE bei x='+x,area<14.1);
 }
}
close('B3: Amtliche Wertetabelle f1(-5)',-3*Math.pow(.5,-1)+3,-3);
close('B3: Amtliche Wertetabelle f2(-5)',2*Math.pow(.5,-2)-4,4);
close('B3: beide Graphen schneiden sich in (-4|0)',-3*Math.pow(.5,0)+3,0);
close('B3: g(-4)=0',2*Math.pow(.5,-1)-4,0);
close('B3: exakte Gleichschenkligkeitslösung',Math.log((7-(8-4*Math.sin(rad(20))))/3.5)/Math.log(.5)-3,.24926140832455124,1e-9);
close('B3: amtliche Zwischenrundungslösung',Math.log((7-6.64)/3.5)/Math.log(.5)-3,.28,.005);
test('B3: Kurven schrittweise eingeblendet',contents.b3.includes('showF1=part!==0||step>=1')&&contents.b3.includes('showF2=part!==0||step>=2'));
test('B3: Trapeze in vier Phasen',contents.b3.includes('stage=Math.min(4,step+1)'));
test('B3: Rundungsergebnis nicht vor B3.5 Schluss',contents.b3.includes('part===4&&step>=4'));
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
close('B2: exakte Schrägbildverkürzung 10cm zu 5cm',Math.hypot(200/Math.sqrt(2),200/Math.sqrt(2)),200,1e-9);
close('B2: exakter Schrägbildwinkel',Math.atan2(200/Math.sqrt(2),200/Math.sqrt(2))*180/Math.PI,45,1e-9);
for(const t of [0.1,1,4,50/6,9.9,10]){
 const vectorAD=[140,-140],base=[120,390],P=[base[0]+vectorAD[0]*t/10,base[1]+vectorAD[1]*t/10];
 close('B2: Schrägbildlage P(t) bei t='+t,Math.hypot(P[0]-base[0],P[1]-base[1]),Math.hypot(...vectorAD)*t/10,1e-9);
 close('B2: Prismenvolumen bei AP='+t,0.5*t*3*4,6*t,1e-9);
 close('B2: Winkel/Volumen bei AP='+t,18*Math.tan(Math.atan(t/3)),6*t,1e-9);
 test('B2: Winkelbereich für AP='+t,Math.atan(t/3)>0&&Math.atan(t/3)<=Math.atan(10/3)+1e-10);
}
test('B2: Raumdiagonale AG in Originalgrafik',contents.b2.includes("line(A,G,'#778d9c'"));
test('B2: Phasenweise Konstruktion',contents.b2.includes('phase=construction?step+1:3')&&contents.b2.includes('if(phase>=3)'));
test('B2: 50 cm³ nicht vor Rechnung',contents.b2.includes("part===2&&step>=2"));
test('B2: ungerundete 50-cm³-Geometrie nach Rechnung aktivieren',contents.b2.includes('previousLength=Number($(\'length\').value);exact50=true')&&contents.b2.includes('const n=exact50?50/6:'));

test('B2: Maximalvolumen nicht vor Rechnung',contents.b2.includes("part===3&&step>=3"));
close('B2: maximaler Winkel',Math.atan(10/3)*180/Math.PI,73.30075576600639,.00001);
close('B2: 50 cm³ in φ',Math.atan(50/18)*180/Math.PI,70.20,.005);
close('B2: maximal 50 %',.5*10*3*4,60);
close('B4: Abstandsminimum x',-(3+3.5)/1.25,-5.2);
const c=Math.cos(rad(40)),s=Math.sin(rad(40));
const exactSlope=x=>{const dx=x+3,dy=.5*x+7;return .5*(-s*dx+c*dy)-.25*(c*dx+s*dy)};
const exactRoot=-exactSlope(0)/(exactSlope(1)-exactSlope(0));
close('B4: geometrisch exakter Sonderfall',exactRoot,.04371580741452434);
close('B4: offizieller Sonderfall mit gerundeten Koeffizienten',.04/.405,.10,.005);
// B4: unabhängige vollständige Koordinaten-/Winkel-/Flächenprüfung.
const r40=40*Math.PI/180,c40=Math.cos(r40),s40=Math.sin(r40);
function b4Shape(x){
 const A={x:-3,y:-2},D={x,y:.5*x+5},dx=D.x-A.x,dy=D.y-A.y;
 const B={x:A.x+.5*(c40*dx+s40*dy),y:A.y+.5*(-s40*dx+c40*dy)};
 const C={x:B.x+dx,y:B.y+dy};return {A,B,C,D,dx,dy};
}
for(const x of [-5.5,-5.2,-4.5,-3,.04371580741452434,.1,1,2,2.2]){
 const {A,B,C,D,dx,dy}=b4Shape(x);
 const len=Math.hypot(dx,dy),bx=B.x-A.x,by=B.y-A.y;
 close('B4: D auf g @x='+x,D.y,.5*D.x+5);
 close('B4: Parallelogramm AB=DC @x='+x,Math.hypot(C.x-D.x-bx,C.y-D.y-by),0);
 close('B4: Parallelogramm BC=AD @x='+x,Math.hypot(C.x-B.x-dx,C.y-B.y-dy),0);
 close('B4: AB=0,5AD @x='+x,Math.hypot(bx,by),.5*len);
 const cross=bx*dy-by*dx,dot=bx*dx+by*dy;
 close('B4: ∢BAD=40° @x='+x,Math.atan2(cross,dot)*180/Math.PI,40,1e-9);
 const F=Math.abs(cross);
 close('B4: Formel F=0,5AD²sin40 @x='+x,F,.5*len*len*s40,1e-8);
}
close('B4: Ortsvektor A',b4Shape(-5.2).A.x,-3);
close('B4: Sonderpunkt D1',b4Shape(-4.5).D.y,2.75);
close('B4: Sonderpunkt D2',b4Shape(2).D.y,6);
close('B4: D0',b4Shape(-5.2).D.y,2.4);
close('B4: AB-Rundung x-Koeffizient',.5*(.77+.5*.64),.55,.00501);
close('B4: AB-Rundung y-Koeffizient',.5*(-.64+.5*.77),-.13,.00501);
close('B4: AB-Rundung x-Achsenabschnitt',.5*(3*.77+7*.64),3.4,.00501);
close('B4: AB-Rundung y-Achsenabschnitt',.5*(-3*.64+7*.77),1.74,.00501);
close('B4: gerundete Steigungsbedingung',(-.13*.04/.405+1.74)/(.55*.04/.405+3.40),.5,.00001);
close('B4: Senkrechtbedingung D0',(-5.2+3)+.5*(.5*-5.2+7),0);
test('B4: originalgetreue Vektoraufgabe',contents.b4.includes('\\\\overrightarrow{AB_n}'));
test('B4: vier Konstruktionsstufen B4.1',contents.b4.includes('const stage=step;'));
test('B4: B4.3 ohne Vorwegnehmen',contents.b4.includes('canP3=part===2&&step>=3'));
test('B4: B4.4 ohne Vorwegnehmen',contents.b4.includes('part===3&&step>=3'));
test('B4: Rechtwinkelsymbol Viertelkreis und Punkt',contents.b4.includes("data-right-angle':'quarter-arc'")&&contents.b4.includes("data-right-angle':'center-dot'"));
test('B4: mobile Gesamtübersicht',contents.b4.includes("classList.toggle('overview')"));

// ISB-konforme Längenbeträge als eigener zusätzlicher Querschnittstest.
for(const [name,segments] of Object.entries({
 a2:['AC_n','AC_2','B_2C_2'],a3:['AC','BC','AM','MC'],
 b2:['AB','AD','AE','AP_1','AP_n'],b3:['A_nD_n','C_nD_n','A_nF_n','A_nB_n','A_3B_3'],
 b4:['AB_n','AD_n']
})){
 const source=contents[name];
 for(const seg of segments){
  const single=String.raw`\overline{${seg}}`;
  const double=single.replaceAll('\\','\\\\');
  test('2025 '+name+': Längenbetrag '+seg,source.includes('|'+single+'|')||source.includes('|'+double+'|')||source.includes(String.raw`\lvert`+single+String.raw`\rvert`)||source.includes(String.raw`\\lvert`+double+String.raw`\\rvert`));
 }
}
test('2025 B4: Vektor ≠ Länge',contents.b4.includes('overrightarrow{AB_n}')&&contents.b4.includes('overline{AB_n}'));
console.log('2025: '+checked+' statische und mathematische Prüfungen erfolgreich.');
console.log('NICHT geprüft: ISB-Wortlaut, sämtliche visuelle Darstellungen, echte Browserlaufzeit, MathJax/Three.js im Browser, Mobile/Touch. Keine Freigabe.');
