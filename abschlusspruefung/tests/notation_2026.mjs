import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
// ISB-Regel: Strecke mit Überstrich; Länge mit Betrag um den Überstrich;
// Vektoren mit eigenständigem darüberliegenden Pfeil.
const names=['a1','a2','a3','a4','b1','b2','b3','index'];
const files=Object.fromEntries(names.map(n=>[n,readFileSync(new URL('../2026/haupttermin/'+n+'.html',import.meta.url),'utf8')]));
const allowed={a1:['AB','BC'],a2:[],a3:[],a4:[],b1:['AD'],b2:[],b3:['A_1C_1','A_nC_n','A_2C_2','A_3C_3','A_3C_3'],index:[]};
let checked=0;
function verify(name,yes){assert.ok(yes,name);checked++}
for(const n of names){
 const source=files[n],expressions=[...source.matchAll(/\\{1,2}overline\{([^}]+)\}/g)];
 const bare=[];
 for(const m of expressions){
  const backslashes=m[0].match(/^\\+/)[0],left=source.slice(Math.max(0,m.index-16),m.index);
  if(left.endsWith(backslashes+'lvert')){
   verify(n+': geschlossener Längenbetrag '+m[1],source.slice(m.index+m[0].length).startsWith(backslashes+'rvert'));
  }else bare.push(m[1]);
 }
 verify(n+': bloße Streckenbenennungen ohne Betrag',JSON.stringify(bare.sort())===JSON.stringify(allowed[n].slice().sort()));
 for(const script of source.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){
  if(/type="module"|type="importmap"|src=/.test(script[1]))continue;
  try{new Function(script[2]);checked++}catch(e){throw new Error(n+' enthält ungültiges JavaScript: '+e.message)}
 }
}
verify('A1: Pythagoras-Längenbetrag',files.a1.includes('\\lvert\\overline{AB}\\rvert'));
verify('A4: Sinussatz mit Länge APn',files.a4.includes('\\frac{\\lvert\\overline{AP_n}\\rvert}{\\sin\\varphi}'));
verify('A4: obere Winkelgrenze eingeschlossen',files.a4.includes(']0^\\circ;90^\\circ]')&&files.a4.includes('\\leq90^\\circ'));
verify('B1: Grundseitenlänge |AD|',files.b1.includes('\\\\lvert\\\\overline{AD}\\\\rvert=3{,}5'));
verify('B2: Sinus/Tangens-Streckenlängen',files.b2.includes('\\\\frac{\\\\lvert\\\\overline{B_nM}\\\\rvert}{\\\\lvert\\\\overline{MC}\\\\rvert}'));
verify('B3: Diagonalenlänge als Längenfunktion',files.b3.includes('\\\\lvert\\\\overline{A_nC_n}\\\\rvert(x)'));
verify('B3: Kreisdurchmesser mit Betrag',files.b3.includes('d_n=\\\\lvert\\\\overline{A_nC_n}\\\\rvert'));
verify('B3: benannte Diagonale ohne Betrag',files.b3.includes('Die Diagonale \\\\(\\\\overline{A_3C_3}\\\\) liegt'));
console.log('2026: '+checked+' ISB-Notationskontrollen bestanden.');
