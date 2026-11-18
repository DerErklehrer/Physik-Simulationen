const S=String.raw;
export const tasks={
 '2015-ht-ii':{
 title:'Lampe aus Plexiglasscheibe und Lampenschirm',introId:'A 3.0',
 intro:S`<p>Die nachfolgende Skizze zeigt den Axialschnitt eines Rotationskörpers mit der Rotationsachse \(ME\) und dient als Vorlage für eine Lampe, die aus einer Plexiglasscheibe und einem Lampenschirm besteht.</p><p>Es gilt:</p>\[\begin{aligned}\lvert\overline{AB}\rvert&=45\,\mathrm{cm};\\\lvert\overline{BC}\rvert&=2\,\mathrm{cm};\\\lvert\overline{KL}\rvert&=36\,\mathrm{cm};\\\lvert\overline{ME}\rvert&=13{,}5\,\mathrm{cm};\\\lvert\overline{MF}\rvert&=12\,\mathrm{cm}.\end{aligned}\]<p>Für den Durchmesser \(\overline{GH}\) des Halbkreisbogens \(\widehat{HG}\) gilt: \(\lvert\overline{GH}\rvert=9\,\mathrm{cm}\).</p><p>Runden Sie im Folgenden auf zwei Stellen nach dem Komma.</p>`,
 rounding:'Die Lernlösung folgt dem amtlichen Lösungsmuster: Mantellinien werden vor dem Einsetzen auf zwei Nachkommastellen gerundet. Das geometrische Modell verwendet ungerundete Maße.',
 parts:[
 {id:'A 3.1',points:1,statement:'Berechnen Sie das Volumen V der Plexiglasscheibe.',steps:[
 ['Den Grundkörper erkennen',S`<p>Die rechteckige Plexiglasscheibe im Axialschnitt ergibt bei der Rotation einen Zylinder. Sein Radius ist die Hälfte des Durchmessers, seine Höhe die Scheibendicke.</p>\[r=\frac{\lvert\overline{AB}\rvert}{2}=\frac{45}{2}\,\mathrm{cm}=22{,}5\,\mathrm{cm},\qquad h=\lvert\overline{BC}\rvert=2\,\mathrm{cm}.\]`,'disc'],
 ['In die Volumenformel einsetzen',S`<p>Die Kreisfläche der Scheibe wird mit ihrer Dicke multipliziert.</p>\[V_{\text{Zylinder}}=\pi r^2h=\pi\cdot22{,}5^2\cdot2\,\mathrm{cm}^3.\]`,'disc'],
 ['Berechnen und runden',S`\[\boxed{V=3180{,}86\,\mathrm{cm}^3}.\]<p>Gesucht ist hier ausschließlich das Volumen der Plexiglasscheibe.</p>`,'disc']
 ]},
 {id:'A 3.2',points:4,statement:'Ermitteln Sie rechnerisch den Inhalt A der Außenfläche des Lampenschirms.',steps:[
 ['Die sichtbaren Flächen zerlegen',S`<p>Die Außenfläche besteht aus dem Kegelstumpfmantel und der gekrümmten Halbkugeloberfläche. Den Kegelstumpfmantel berechnen wir als Differenz zweier Kegelmäntel.</p>\[A=M_{\text{Kegel groß}}-M_{\text{Kegel klein}}+O_{\text{Halbkugel}}.\]<p>Der Verbindungskreis zwischen Kegelstumpf und Halbkugel liegt im Inneren und gehört nicht zur Außenfläche. Die Plexiglasscheibe ist nicht Teil des Lampenschirms.</p>`,'frustum'],
 ['Die große Mantellinie berechnen',S`<p>Der Radius des großen ergänzten Kegels ist</p>\[\lvert\overline{MK}\rvert=\frac{\lvert\overline{KL}\rvert}{2}=18\,\mathrm{cm}.\]<p>Im rechtwinkligen Dreieck KMF liefert der Satz des Pythagoras:</p>\[\lvert\overline{FK}\rvert=\sqrt{\lvert\overline{MF}\rvert^2+\lvert\overline{MK}\rvert^2}=\sqrt{12^2+18^2}\,\mathrm{cm}\approx21{,}63\,\mathrm{cm}.\]`,'large'],
 ['Die kleine Kegelhöhe bestimmen',S`<p>Der Halbkugelradius ist \(\lvert\overline{NH}\rvert=\frac{9}{2}\,\mathrm{cm}=4{,}5\,\mathrm{cm}\). Damit liegt der Mittelpunkt N bei</p>\[\lvert\overline{MN}\rvert=\lvert\overline{ME}\rvert-\lvert\overline{NE}\rvert=(13{,}5-4{,}5)\,\mathrm{cm}=9\,\mathrm{cm}.\]<p>Der kleine ergänzte Kegel hat somit die Höhe</p>\[\lvert\overline{FN}\rvert=\lvert\overline{MF}\rvert-\lvert\overline{MN}\rvert=(12-9)\,\mathrm{cm}=3\,\mathrm{cm}.\]`,'small'],
 ['Die kleine Mantellinie berechnen',S`<p>Im rechtwinkligen Dreieck FNH gilt:</p>\[\lvert\overline{FH}\rvert=\sqrt{\lvert\overline{NH}\rvert^2+\lvert\overline{FN}\rvert^2}=\sqrt{4{,}5^2+3^2}\,\mathrm{cm}\approx5{,}41\,\mathrm{cm}.\]`,'small'],
 ['Die Flächen zusammenfügen',S`<p>Für Kegelmäntel gilt \(M=\pi rs\), für die gekrümmte Halbkugeloberfläche \(O=2\pi r^2\).</p>\[A=\underbrace{\pi\cdot18\cdot21{,}63}_{M_{\text{Kegel groß}}}-\underbrace{\pi\cdot4{,}5\cdot5{,}41}_{M_{\text{Kegel klein}}}+\underbrace{2\pi\cdot4{,}5^2}_{O_{\text{Halbkugel}}}\quad\mathrm{cm}^2.\]`,'hemisphere'],
 ['Das Ergebnis angeben',S`\[\boxed{A=1273{,}90\,\mathrm{cm}^2}.\]<p>Wie im amtlichen Lösungsmuster wurden die Mantellinien vor dem Einsetzen gerundet. Ohne Zwischenrundung ergäben sich rund \(1274{,}11\,\mathrm{cm}^2\).</p>`,'hemisphere']
 ]}]
 },
 '2015-nt-ii':{
 title:'Kerzenständer aus Edelstahl',introId:'A 3.0',
 intro:S`<p>Die Skizze zeigt den Axialschnitt eines Rotationskörpers mit der Rotationsachse \(MS\). Sie dient als Vorlage für einen Kerzenständer aus Edelstahl.</p><p>Es gilt:</p>\[\begin{aligned}\lvert\overline{MS}\rvert&=4{,}5\,\mathrm{cm};\quad\lvert\overline{AB}\rvert=7{,}5\,\mathrm{cm};\\\lvert\overline{EF}\rvert&=\lvert\overline{HG}\rvert=2\,\mathrm{cm};\\\lvert\overline{DI}\rvert&=\lvert\overline{CJ}\rvert=4\,\mathrm{cm};\\\lvert\overline{EH}\rvert&=\lvert\overline{FG}\rvert=1{,}5\,\mathrm{cm}.\end{aligned}\]<p>Runden Sie im Folgenden auf eine Stelle nach dem Komma.</p>`,
 rounding:'Die Lernlösung folgt dem amtlichen Lösungsmuster mit auf eine Nachkommastelle gerundeten Mantellinien. Das Modell berechnet Geometrie und Erkundungswerte ohne Zwischenrundung.',
 parts:[
 {id:'A 3.1',points:2,statement:S`Berechnen Sie die Länge der Strecke \(\overline{MK}\). [Ergebnis: \(\lvert\overline{MK}\rvert=2{,}1\,\mathrm{cm}\)]`,steps:[
 ['Ähnliche Dreiecke erkennen',S`<p>Die ergänzten Kegel mit der gemeinsamen Spitze S sind ähnlich. Die Durchmesser verhalten sich wie die zugehörigen Höhen.</p>\[\frac{\lvert\overline{SK}\rvert}{\lvert\overline{SM}\rvert}=\frac{\lvert\overline{CJ}\rvert}{\lvert\overline{AB}\rvert},\qquad\lvert\overline{SK}\rvert=\lvert\overline{MS}\rvert-\lvert\overline{MK}\rvert.\]`,'large'],
 ['Die kleine Kegelhöhe bestimmen',S`\[\lvert\overline{SK}\rvert=\frac{\lvert\overline{CJ}\rvert}{\lvert\overline{AB}\rvert}\cdot\lvert\overline{MS}\rvert=\frac{4}{7{,}5}\cdot4{,}5\,\mathrm{cm}=2{,}4\,\mathrm{cm}.\]<p>Die gesuchte Höhe ist die Differenz der beiden Kegelhöhen.</p>`,'small'],
 ['Die gesuchte Strecke berechnen',S`\[\lvert\overline{MK}\rvert=(4{,}5-2{,}4)\,\mathrm{cm}=\boxed{2{,}1\,\mathrm{cm}}.\]<p>Die Höhe des unteren Kegelstumpfes beträgt somit 2,1 cm.</p>`,'height']
 ]},
 {id:'A 3.2',points:3,statement:'Ermitteln Sie rechnerisch den Oberflächeninhalt O des Kerzenständers.',steps:[
 ['Alle äußeren und inneren Flächen erfassen',S`<p>Zur Oberfläche zählen der untere Grundkreis, der Kegelstumpfmantel, der äußere Zylindermantel, der obere Kreisring sowie Innenmantel und Boden der Aussparung.</p><p>Kreisring und Aussparungsboden ergänzen sich zum vollen Deckkreis mit Radius \(2\,\mathrm{cm}\). Die Innenmantelfläche wird zusätzlich gezählt.</p>\[O=A_{\text{Grundkreis}}+A_{\text{Deckkreis}}+M_{\text{Kegel groß}}-M_{\text{Kegel klein}}+M_{\text{Zylinder außen}}+M_{\text{Zylinder innen}}.\]`,'cavity'],
 ['Radien und Zylinderhöhen zuordnen',S`\[R=\frac{7{,}5}{2}\,\mathrm{cm}=3{,}75\,\mathrm{cm},\quad r=\frac{4}{2}\,\mathrm{cm}=2\,\mathrm{cm},\quad r_i=\frac{1{,}5}{2}\,\mathrm{cm}=0{,}75\,\mathrm{cm}.\]<p>Der äußere Zylinder hat die Höhe \(\lvert\overline{SK}\rvert=2{,}4\,\mathrm{cm}\). Die Aussparung ist \(\lvert\overline{EF}\rvert=2\,\mathrm{cm}\) tief.</p>`,'radii'],
 ['Mantellinien mit Pythagoras berechnen',S`\[\lvert\overline{AS}\rvert=\sqrt{3{,}75^2+4{,}5^2}\,\mathrm{cm}\approx5{,}9\,\mathrm{cm}.\]\[\lvert\overline{JS}\rvert=\sqrt{2^2+2{,}4^2}\,\mathrm{cm}\approx3{,}1\,\mathrm{cm}.\]<p>Diese auf eine Nachkommastelle gerundeten Werte werden wie im amtlichen Lösungsmuster eingesetzt.</p>`,'large'],
 ['Die Oberflächenformeln einsetzen',S`<p>Kreisfläche: \(A=\pi r^2\); Kegelmantel: \(M=\pi rs\); Zylindermantel: \(M=2\pi rh\).</p>\[\begin{aligned}O={}&\pi\cdot3{,}75^2+\pi\cdot2^2\\&+\pi\cdot3{,}75\cdot5{,}9-\pi\cdot2\cdot3{,}1\\&+2\pi\cdot2\cdot2{,}4+2\pi\cdot0{,}75\cdot2\quad\mathrm{cm}^2.\end{aligned}\]`,'cavity'],
 ['Berechnen und runden',S`\[\boxed{O=146{,}4\,\mathrm{cm}^2}.\]<p>Die mitzählenden Innenflächen der Aussparung sind im Modell sichtbar. Ohne Zwischenrundung der Mantellinien läge der Oberflächeninhalt bei etwa \(145{,}7\,\mathrm{cm}^2\); die Prüfungsrechnung folgt dem amtlichen Lösungsmuster.</p>`,'cavity']
 ]}]
 }
};
