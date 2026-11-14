/**
 * 2025 – zusätzlicher Original-/Lösungsvertrag für ALLE 26 Teilaufgaben.
 * Referenz: ISB 2025 Mathematik I, Haupttermin (gedruckte PDF-Seiten),
 * offizielles Lösungsmuster. Kontrolliert Originaloperatoren, numerische
 * Anker, Punkte, Lösungen, Notation und Projektstruktur.
 *
 * WICHTIG: Nur textuell-strukturelle Teilkontrolle. Sie ersetzt ausdrücklich
 * NICHT den unabhängigen visuellen Wort-für-Wort-Vollvergleich oder die
 * neun Qualitätskategorien je Durchgang.
 */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const ROOT=new URL('../2025/haupttermin/',import.meta.url);
const groups=['a1','a2','a3','b1','b2','b3','b4'];
const official={
 a1:[
  ['A 1.1','1 P','Geben Sie an, mit welcher Wahrscheinlichkeit beide Schlüssel passen.','frac1{25}'],
  ['A 1.2','1,5 P','Bestimmen Sie, mit welcher Wahrscheinlichkeit genau einer der beiden Schlüssel passt.','frac8{25}']
 ],
 a2:[
  ['A 2.1','1 P','Ergänzen Sie in der Zeichnung zu A 2.0 das Dreieck','75'],
  ['A 2.2','1 P','Kreuzen Sie das passende Intervall','0;4'],
  ['A 2.3','2,5 P','Oberflächeninhalt','32'],
  ['A 2.4','1,5 P','Bestimmen Sie das zugehörige Maß','30']
 ],
 a3:[
  ['A 3.1','1 P','Begründen Sie ohne zu messen','Mittelpunkt'],
  ['A 3.2','2 P','Bestimmen Sie mithilfe einer Rechnung','60']
 ],
 b1:[
  ['B 1.1','1 P','Kreuzen Sie den Anteil der weißen Schachteln an.','70+p'],
  ['B 1.2','1,5 P','Berechnen Sie den Anteil','20'],
  ['B 1.3','2,5 P','Beurteilen Sie diese Vermutung.','56']
 ],
 b2:[
  ['B 2.1','1 P','Zeichnen Sie das Prisma','4'],
  ['B 2.2','2 P','Zeigen Sie, dass für das Volumen','18'],
  ['B 2.3','1,5 P','Berechnen Sie das zugehörige Winkelmaß','70{,}20'],
  ['B 2.4','2 P','Begründen Sie Ihre Entscheidung.','60']
 ],
 b3:[
  ['B 3.1','4 P','Geben Sie die Gleichung der Asymptote','y=3'],
  ['B 3.2','2 P','Zeichnen Sie die Trapeze','20'],
  ['B 3.3','2 P','Zeigen Sie sodann','1{,}88'],
  ['B 3.4','2 P','Bestätigen Sie rechnerisch','3{,}5'],
  ['B 3.5','4 P','Berechnen Sie die Länge der Strecke','0{,}28'],
  ['B 3.6','2 P','Begründen Sie, dass der Flächeninhalt','14{,}1']
 ],
 b4:[
  ['B 4.1','3 P','Zeichnen Sie die Gerade','D_1'],
  ['B 4.2','4 P','Ermitteln Sie rechnerisch die Koordinaten','0{,}55'],
  ['B 4.3','3 P','Berechnen Sie die Koordinaten','5{,}05'],
  ['B 4.4','2,5 P','Bestimmen Sie rechnerisch','5{,}20'],
  ['B 4.5','2 P','Begründen Sie, weshalb das Parallelogramm','F_{']
 ]
};
function verify(condition,description){
 assert.ok(condition,description);
 checks++;
}
let checks=0,taskCount=0,points=0;
for(const name of groups){
 const src=readFileSync(new URL(name+'.html',ROOT),'utf8');
 const mt=src.match(/const\s+(T|parts|tasks)\s*=\s*(\[[\s\S]*?\]);/);
 verify(!!mt,name+': Lösungsdatenblock gefunden');
 const data=vm.runInNewContext(mt[0]+'\nJSON.stringify('+mt[1]+')');
 const tasks=JSON.parse(data);
 verify(tasks.length===official[name].length,name+': vollständige Anzahl von Teilaufgaben');
 for(let i=0;i<tasks.length;i++){
  const t=tasks[i],officialRow=official[name][i];
  const title=Array.isArray(t)?t[0]:t.label??t.title??t.n;
  const score=Array.isArray(t)?t[1]:t.points??t.p;
  const question=Array.isArray(t)?t[2]:t.text??t.q;
  const steps=Array.isArray(t)?t[3]:t.steps??t.s;
  const [expectedTitle,expectedScore,operator,result]=officialRow;
  verify(title===expectedTitle,title+': ISB-Aufgabennummer');
  verify(score===expectedScore,title+': ISB-Punktzahl');
  verify(question.includes(operator),title+': originaler Operator und Gegenstand');
  verify(steps.length>=2,title+': mehrschrittige eigenständige Musterlösung');
  const solved=steps.map(step=>step.join(' ')).join('\n');
  verify(solved.includes(result),title+': amtliches Kontroll-Ergebnis oder Zahlenanker '+result);
  verify(!/[×]|\\times|∠|\\angle\b/.test(question+'\n'+solved),title+': Notation ohne Mal-Kreuz oder abweichendes Winkelzeichen');
  // Nach Auswertung der JS-Strings ist genau EIN Backslash korrekt;
  // rohe fehlerhafte Literale werden separat in quality_2025.mjs geprüft.
  const mathMarkup=question+'\n'+solved;
  const occurrences=(token)=>mathMarkup.split(token).length-1;
  verify(occurrences('\\(')===occurrences('\\)')&&occurrences('\\[')===occurrences('\\]'),title+': alle MathJax-Delimiters geschlossen');
  verify(question.length>=35,title+': Aufgabenstellung nicht leer/verkürzt');
  verify(steps.every(s=>s[0].length>=4&&s[1].length>=12),title+': sinnvolle Schritttitel und Erläuterungen');
  taskCount++;
  points+=Number(score.replace(' P','').replace(',','.'));
 }
 verify(src.includes('id="prev"')&&src.includes('id="next"')&&src.includes('id="reset"'),name+': Lösungsnavigation');
 verify(src.includes('<svg')&&src.includes('MathJax'),name+': Visualisierung und MathJax');
 verify(!/href\s*=\s*["'][^"']+\.pdf/i.test(src),name+': keine öffentlichen PDF-Links');
 verify(!src.includes('ISB: x ≈ 0,28'),name+': kein Quellenkürzel direkt vor dem Lösungswert');
 if(['a2','b2'].includes(name))verify(src.includes('raumgeometrie3d.js'),name+': 3D-Modul');
}
verify(taskCount===26,'26 Teilaufgaben');
verify(Math.abs(points-53.5)<1e-9,'53,5 Gesamtpunkte');
const idx=readFileSync(new URL('index.html',ROOT),'utf8');
for(const n of groups)verify(idx.includes('href="'+n+'.html"')||idx.includes('href="./'+n+'.html"'),'Übersichtslink '+n);
console.log('Quellen-/Lösungsvertrag 2025: '+checks+' Teilkontrollen zu '+taskCount+' Teilaufgaben bestanden. Achtung: kein visueller ISB-Vollvergleich.');
