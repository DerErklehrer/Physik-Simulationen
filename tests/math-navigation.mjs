import {chromium} from 'playwright';import {mkdir} from 'node:fs/promises';
const base=process.env.QA_BASE||'http://127.0.0.1:8765',out=process.env.QA_OUT||'/tmp/math-navigation';await mkdir(out,{recursive:true});const browser=await chromium.launch({headless:true});
const slugs=['einheitskreis','welches-verfahren','pythagoras','rechtwinkliges-dreieck','sinussatz','kosinussatz','sinusflaeche','tangens-steigung','trigonometrische-gleichungen','trigonometrie'];
let count=0;try{for(const [mode,width,height]of [['desktop',1366,900],['mobile',390,844]]){
 const p=await browser.newPage({viewport:{width,height}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 const ready=async()=>{if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))throw Error('Übersicht zu breit: '+p.url())};
 const shot=async name=>{await ready();await p.screenshot({path:out+'/'+mode+'-'+name+'.png',fullPage:true})};
 await p.goto(base+'/mathematik-realschule/',{waitUntil:'networkidle'});await shot('mathematik-realschule');
 await p.locator('a.card[href="8-i/"]').click();if(!p.url().endsWith('/mathematik-realschule/8-i/'))throw Error('Mathematik 8 I fehlt');await shot('mathematik-8-i');if(!await p.getByText('Inhalte folgen',{exact:true}).isVisible())throw Error('Leere Übersicht 8 I');await p.getByRole('link',{name:'← Mathematik Realschule',exact:true}).click();

 await p.locator('a.card[href="10-i/"]').click();if(!p.url().endsWith('/mathematik-realschule/10-i/'))throw Error('Jahrgangsübersicht');await shot('mathematik-10-i');
 await p.locator('a.card[href="../../mathematik-10/"]').click();if(await p.locator('.grid a.card').count()!==9)throw Error('Trigonometrie unvollständig');await shot('trigonometrie');
 await p.locator('a.card[href="../sinussatz/"]').click();await p.locator('[data-math-navigation] a').click();if(!p.url().endsWith('/mathematik-10/'))throw Error('Rücklink Trigonometrie');
 await p.getByRole('link',{name:'Mathematik 10 I',exact:true}).click();await p.locator('a.card[href="../../abschlusspruefung/"]').click();if(await p.locator('a.card').count()!==5)throw Error('Prüfungsjahrgänge fehlen');await shot('abschlusspruefungen');
 await p.getByRole('link',{name:'Mathematik 10 I',exact:true}).click();if(!p.url().endsWith('/mathematik-realschule/10-i/'))throw Error('Rücklink Abschlussprüfungen');
 await p.getByRole('link',{name:'← Mathematik Realschule',exact:true}).click();if(!p.url().endsWith('/mathematik-realschule/'))throw Error('Rücklink Realschule');
 for(const slug of slugs){const response=await p.goto(base+'/'+slug+'/',{waitUntil:'networkidle'});if(response.status()!==200)throw Error('Direktlink '+slug);if(!await p.locator('h1').count())throw Error('Inhalt fehlt '+slug);const nav=p.locator('[data-math-navigation]');if(!await nav.isVisible())throw Error('Navigation fehlt '+slug);const box=await nav.boundingBox();if(box.x<0||box.x+box.width>width+2)throw Error('Navigation zu breit '+slug);count++}
 if(errors.length)throw Error(errors.join('; '));console.log(mode+': Hierarchie, Rückwege, 9 Trigonometrie-Kacheln, 5 Prüfungsübersichten und 10 Direktziele bestanden.');await p.close();
}}finally{await browser.close()}console.log(count+' direkte QR-/Seitenziele auf Desktop/Mobil erreichbar.');
