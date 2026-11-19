const tex=String.raw;

export const tasks0807={
  '2008-ht-ii':{
    title:'Schraubenrohling mit Senkkopf',
    intro:tex`<p>Der Axialschnitt zeigt einen Schraubenrohling der Größe \(4\times10\). Die Achse ist \(GH\). Es gilt \(\lvert\overline{AF}\rvert=7{,}0\,\mathrm{mm}\), \(\lvert\overline{CD}\rvert=4{,}0\,\mathrm{mm}\), \(\lvert\overline{GH}\rvert=10{,}0\,\mathrm{mm}\) und \(∢BAF=40^\circ\).</p>`,
    rounding:'Die Lernlösung folgt der Zwischenrundung des ISB. Das Modell rechnet mit den ungerundeten Maßen.',
    parts:[{id:'P 1',points:5,statement:tex`Berechne das Rohlingvolumen auf eine Nachkommastelle. Kontrollwert für den kleinen Ergänzungskegel: \(\lvert\overline{KS}\rvert\approx1{,}7\,\mathrm{mm}\).`,steps:[
      ['Schaft und Kopf unterscheiden',tex`\[V=V_{\text{Zylinder}}+V_{\text{großer Kegel}}-V_{\text{kleiner Kegel}}.\]<p>Der Kopf ist ein Kegelstumpf. Beide ergänzten Kegel haben die Spitze \(S\).</p>`,'parts'],
      ['Den großen Kegel ergänzen',tex`<p>Der Kopfradius ist \(3{,}5\,\mathrm{mm}\). Im rechtwinkligen Dreieck \(AGS\) ergibt sich die Höhe aus dem Tangens.</p>\[\lvert\overline{GS}\rvert=3{,}5\cdot\tan40^\circ\,\mathrm{mm}\approx2{,}9\,\mathrm{mm}.\]`,'large'],
      ['Die Höhe des kleinen Kegels berechnen',tex`<p>Die beiden Kegel sind ähnlich. Ihre Höhen verhalten sich wie die Grundkreisdurchmesser.</p>\[\frac{\lvert\overline{KS}\rvert}{\lvert\overline{GS}\rvert}=\frac{4{,}0}{7{,}0},\qquad\lvert\overline{KS}\rvert\approx\frac{4{,}0}{7{,}0}\cdot2{,}9\,\mathrm{mm}\approx1{,}7\,\mathrm{mm}.\]`,'small'],
      ['Die Länge des Schafts bestimmen',tex`\[h_{\text{Kopf}}\approx(2{,}9-1{,}7)\,\mathrm{mm}=1{,}2\,\mathrm{mm},\qquad h_{\text{Schaft}}\approx(10{,}0-1{,}2)\,\mathrm{mm}=8{,}8\,\mathrm{mm}.\]`,'shaft'],
      ['Die Volumina verrechnen',tex`\[V\approx\pi\cdot\left(2^2\cdot8{,}8+\frac13\cdot3{,}5^2\cdot2{,}9-\frac13\cdot2^2\cdot1{,}7\right)\,\mathrm{mm}^3\approx\boxed{140{,}7\,\mathrm{mm}^3}.\]`,'parts'],
    ]}],
  },
  '2007-ht-ii':{
    title:'Eisbecher mit Eiskugel',
    intro:tex`<p>Der Axialschnitt zeigt einen kegelförmigen Eisbecher mit einer Eiskugel. Die gemeinsame Achse ist \(AM\). Es gilt \(\lvert\overline{AB}\rvert=\lvert\overline{AC}\rvert\), \(\lvert\overline{CM}\rvert=4{,}0\,\mathrm{cm}\), \(∢BAC=40{,}0^\circ\) und \(∢ACM=90{,}0^\circ\). Beim vollständigen Schmelzen bleiben 42 % des Kugelvolumens übrig.</p>`,
    rounding:'Die Lernlösung rechnet mit den gerundeten Zwischenmaßen des ISB. Im 3D-Modell werden die Maße ohne Zwischenrundung berechnet.',
    parts:[{id:'P 1',points:5,statement:'Prüfe rechnerisch, ob die geschmolzene Eiscreme in den Becher passt.',steps:[
      ['Das Volumen der geschmolzenen Eiscreme berechnen',tex`\[V_{\text{Eiscreme}}=0{,}42\cdot V_{\text{Eiscremekugel}}=0{,}42\cdot\frac43\pi\cdot4{,}0^3\,\mathrm{cm}^3\approx112{,}6\,\mathrm{cm}^3.\]`,'sphere'],
      ['Die Mantellinie des Bechers bestimmen',tex`<p>Die Achse halbiert den Spitzenwinkel. Die Strecke \(\overline{CM}\) steht senkrecht auf der Mantellinie. Im rechtwinkligen Dreieck \(ACM\) gilt daher</p>\[\lvert\overline{AC}\rvert=\frac{4{,}0\,\mathrm{cm}}{\tan20^\circ}\approx11{,}0\,\mathrm{cm}.\]`,'sphere'],
      ['Becherhöhe und Öffnungsradius bestimmen',tex`\[\lvert\overline{AN}\rvert\approx11{,}0\cdot\cos20^\circ\,\mathrm{cm}\approx10{,}3\,\mathrm{cm},\qquad\lvert\overline{CN}\rvert\approx11{,}0\cdot\sin20^\circ\,\mathrm{cm}\approx3{,}8\,\mathrm{cm}.\]`,'rim'],
      ['Das Fassungsvermögen berechnen',tex`\[V_{\text{Eisbecher}}\approx\frac13\pi\cdot3{,}8^2\cdot10{,}3\,\mathrm{cm}^3\approx155{,}8\,\mathrm{cm}^3.\]`,'height'],
      ['Die Volumina vergleichen',tex`\[112{,}6\,\mathrm{cm}^3<155{,}8\,\mathrm{cm}^3.\]<p><strong>Die geschmolzene Eiscreme passt in den Becher.</strong> In der Darstellung siehst du den Füllstand nach dem Schmelzen.</p>`,'melt-fit'],
    ]}],
  },
  '2007-nt-ii':{
    title:'Gehäuse einer schwimmfähigen Lampe',
    intro:tex`<p>Das Kunststoffgehäuse einer schwimmfähigen Lampe ist ein Rotationskörper mit der Achse \(MS\). Im Axialschnitt gelten \(\lvert\overline{BE}\rvert=8{,}0\,\mathrm{cm}\), \(\lvert\overline{CD}\rvert=6{,}0\,\mathrm{cm}\), \(\lvert\overline{AB}\rvert=2{,}0\,\mathrm{cm}\) und \(∢ASF=70{,}0^\circ\).</p>`,
    rounding:'Die Lernlösung folgt der Zwischenrundung des ISB. Die Oberflächenanzeige im Modell verwendet die ungerundete Mantellinie.',
    parts:[{id:'P 1',points:5,statement:'Die gesamte Oberfläche wird lackiert. Bestimme den Oberflächeninhalt des Gehäuses.',steps:[
      ['Die Mantellinie des Kegels berechnen',tex`<p>Der Außenradius beträgt \(4{,}0\,\mathrm{cm}\). Die Achse halbiert den Spitzenwinkel auf \(35^\circ\).</p>\[\lvert\overline{AS}\rvert=\frac{4{,}0\,\mathrm{cm}}{\sin35^\circ}\approx7{,}0\,\mathrm{cm}.\]`,'side'],
      ['Die beiden Zylindermäntel bestimmen',tex`<p>Der Rand ist außen und innen jeweils \(2{,}0\,\mathrm{cm}\) hoch. Die Radien betragen außen \(4{,}0\,\mathrm{cm}\), innen \(3{,}0\,\mathrm{cm}\).</p>\[A_{\text{Außenmantel}}=2\pi\cdot4\cdot2\,\mathrm{cm}^2,\qquad A_{\text{Innenmantel}}=2\pi\cdot3\cdot2\,\mathrm{cm}^2.\]`,'outer'],
      ['Kreisring und Boden addieren',tex`\[A_{\text{Kreisring}}=\pi(4^2-3^2)\,\mathrm{cm}^2,\qquad A_{\text{Kreisboden}}=\pi\cdot3^2\,\mathrm{cm}^2.\]<p>Zusammen haben beide dieselbe Fläche wie ein Kreis mit Außenradius \(4{,}0\,\mathrm{cm}\).</p>`,'inner'],
      ['Die Oberfläche berechnen',tex`\[A\approx\pi\cdot(4\cdot7{,}0+2\cdot4\cdot2+2\cdot3\cdot2+4^2)\,\mathrm{cm}^2=72\pi\,\mathrm{cm}^2\approx\boxed{226{,}2\,\mathrm{cm}^2}.\]`,'parts'],
    ]}],
  },
};
