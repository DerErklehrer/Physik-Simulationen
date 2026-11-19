const tex=String.raw;

const plots=[
  ['A','M 23 99 L 67 70 L 93 29','Erst flachere Gerade, dann steilere Gerade'],
  ['B','M 23 99 Q 56 92 71 66 L 93 28','Anfangs gekrümmt und steiler werdend, danach gerade'],
  ['C','M 23 99 L 68 63 L 96 63','Zunächst ansteigende Gerade, danach waagrecht'],
];
const diagramChoices='<div class="graph-choices">'+plots.map(([id,curve,description])=>
  '<figure><figcaption>Diagramm '+id+'</figcaption><svg viewBox="0 0 112 118" role="img" aria-label="'+description+'">'+
  '<path d="M 23 9 V 99 H 106 M 20 14 L 23 9 L 26 14 M 101 96 L 106 99 L 101 102" fill="none" stroke="#475569"/>'+
  '<path d="M 23 69 H 99" fill="none" stroke="#abb6c3" stroke-dasharray="3 3"/>'+
  '<path d="'+curve+'" fill="none" stroke="#263544" stroke-width="2"/>'+
  '<text x="2" y="8" font-size="10">Höhe</text><text x="84" y="114" font-size="10">Zeit</text></svg></figure>'
).join('')+'</div>';

export const tasks1009={
  '2010-ht-ii':{
    title:'Grundkörper eines Stehaufmännchens',
    intro:tex`<p>Der Axialschnitt zeigt den Grundkörper eines Stehaufmännchens. Seine Achse ist \(MS\). Es gilt \(r=\lvert\overline{MB}\rvert=\lvert\overline{MC}\rvert=6{,}0\,\mathrm{cm}\), \(\lvert\overline{AB}\rvert=1{,}4\,\mathrm{cm}\) und \(∢BSC=50^\circ\).</p>`,
    rounding:'Die Lernrechnung rundet die Zwischenmaße wie das ISB. Die Erkundungsanzeige verwendet die ungerundete Geometrie.',
    parts:[{id:'A 3',points:5,statement:'Berechne das Volumen des Grundkörpers. Runde auf eine Nachkommastelle.',steps:[
      ['Den Körper zerlegen',tex`\[V=V_{\text{Halbkugel}}+V_{\text{Zylinder}}+V_{\text{Kegel}}.\]<p>Der untere Teil ist eine Halbkugel, darüber liegen der kurze Zylinder und der schmalere Kegel.</p>`,'parts'],
      ['Den ergänzten Kegel bestimmen',tex`<p>Die Achse halbiert den Spitzenwinkel. Im rechtwinkligen Dreieck \(BSM\) ist die Gegenkathete \(6{,}0\,\mathrm{cm}\) lang.</p>\[\lvert\overline{MS}\rvert=\frac{6{,}0\,\mathrm{cm}}{\tan25^\circ}\approx12{,}9\,\mathrm{cm}.\]`,'height'],
      ['Höhe und Radius des oberen Kegels',tex`\[\lvert\overline{SN}\rvert\approx(12{,}9-1{,}4)\,\mathrm{cm}=11{,}5\,\mathrm{cm}.\]<p>Die Dreiecke \(PNS\) und \(BMS\) sind ähnlich.</p>\[\frac{\lvert\overline{NP}\rvert}{6{,}0\,\mathrm{cm}}=\frac{\lvert\overline{SN}\rvert}{\lvert\overline{MS}\rvert},\qquad \lvert\overline{NP}\rvert\approx\frac{11{,}5}{12{,}9}\cdot6{,}0\,\mathrm{cm}\approx5{,}3\,\mathrm{cm}.\]`,'radius'],
      ['Die Teilvolumina addieren',tex`\[V\approx\pi\cdot\left(\frac23\cdot6^3+6^2\cdot1{,}4+\frac13\cdot5{,}3^2\cdot11{,}5\right)\,\mathrm{cm}^3\approx\boxed{949{,}0\,\mathrm{cm}^3}.\]`,'parts'],
    ]}],
  },
  '2009-ht-i':{
    title:'Kegelförmiger Messbecher',introId:'A 1.0',
    intro:tex`<p>Der Messbecher fasst bis zum Rand genau \(1\,\mathrm l\). Im Axialschnitt ist \(BD\) die Symmetrieachse. Der Abstand vom tiefsten Punkt \(B\) bis zum Mittelpunkt \(D\) des oberen Randes beträgt \(200\,\mathrm{mm}\).</p>`,
    rounding:'Der Regler misst die Füllhöhe von der Spitze des Kegels aus. Das Modell rechnet mit dem ungerundeten Randradius.',
    parts:[
      {id:'A 1.1',points:2,statement:tex`Berechne \(∢CBA\) auf ganze Grad. Häufig benötigter Zwischenwert: \(\lvert\overline{AD}\rvert\approx69\,\mathrm{mm}\).`,steps:[
        ['Das Fassungsvermögen umrechnen',tex`\[1\,\mathrm l=1\,\mathrm{dm}^3=1\,000\,000\,\mathrm{mm}^3.\]`,'height'],
        ['Den oberen Radius berechnen',tex`\[V_{\text{Kegel}}=\frac13\pi r^2h,\qquad r=\sqrt{\frac{3\cdot1\,000\,000}{\pi\cdot200}}\,\mathrm{mm}\approx69\,\mathrm{mm}.\]`,'radius'],
        ['Den halben Öffnungswinkel verdoppeln',tex`\[∢DBA\approx\arctan\left(\frac{69}{200}\right)\approx19^\circ,\qquad ∢CBA\approx\boxed{38^\circ}.\]`,'radius'],
      ]},
      {id:'A 1.2',points:3,statement:'Welche Füllhöhe entspricht einem halben Liter? Gib sie auf Millimeter gerundet an.',steps:[
        ['Die ähnlichen Kegel erkennen',tex`<p>Der Wasserstand bildet einen kleineren Kegel mit derselben Spitze. Bei Füllhöhe \(h\) ist sein Radius \(\frac{h}{200\,\mathrm{mm}}\cdot\lvert\overline{AD}\rvert\).</p>`,'height'],
        ['Das Volumenverhältnis aufstellen',tex`\[\frac{V_{\text{Wasser}}}{V_{\text{Kegel}}}=\left(\frac{h}{200\,\mathrm{mm}}\right)^3=\frac12.\]<p>Die Höhe geht einfach ein, der ebenfalls verkleinerte Radius quadratisch.</p>`,'height'],
        ['Die Kubikwurzel ziehen',tex`\[h=200\,\mathrm{mm}\cdot\sqrt[3]{\frac12}\approx158{,}74\,\mathrm{mm}\approx\boxed{159\,\mathrm{mm}}.\]`,'half'],
      ]},
    ],
  },
  '2009-ht-ii':{
    title:'Gefäß mit zylindrischem Hals',introId:'A 2.0',
    intro:tex`<p>Das Gefäß ist oben offen. Die Symmetrieachse des Axialschnitts ist \(OM\). Die Maße sind \(\lvert\overline{OM}\rvert=10{,}0\,\mathrm{cm}\), \(\lvert\overline{ON}\rvert=4{,}0\,\mathrm{cm}\), \(\lvert\overline{FN}\rvert=1{,}8\,\mathrm{cm}\) und \(∢MAF=48^\circ\). Runde auf eine Nachkommastelle.</p>`,
    rounding:'Das Modell zeigt den Füllraum ohne angenommene Wandstärke. Die Lernlösung folgt den gerundeten Zwischenwerten des ISB.',
    parts:[
      {id:'A 2.1',points:3,statement:tex`Bestimme den Bodendurchmesser. Kontrollwerte: \(\lvert\overline{SN}\rvert\approx2{,}0\,\mathrm{cm}\) und \(\lvert\overline{AM}\rvert\approx7{,}2\,\mathrm{cm}\).`,steps:[
        ['Die kleine Kegelhöhe berechnen',tex`<p>Die Mantellinien des Kegelstumpfs treffen sich in der ergänzten Spitze \(S\). Der entsprechende Winkel bei \(F\) beträgt \(48^\circ\).</p>\[\lvert\overline{SN}\rvert=1{,}8\cdot\tan48^\circ\,\mathrm{cm}\approx2{,}0\,\mathrm{cm}.\]`,'small'],
        ['Die große Kegelhöhe bestimmen',tex`\[\lvert\overline{SM}\rvert=\lvert\overline{OM}\rvert-\lvert\overline{ON}\rvert+\lvert\overline{SN}\rvert\approx(10{,}0-4{,}0+2{,}0)\,\mathrm{cm}=8{,}0\,\mathrm{cm}.\]`,'large'],
        ['Den Radius verdoppeln',tex`\[\lvert\overline{AM}\rvert\approx\frac{8{,}0}{\tan48^\circ}\,\mathrm{cm}\approx7{,}2\,\mathrm{cm},\qquad \lvert\overline{AB}\rvert\approx\boxed{14{,}4\,\mathrm{cm}}.\]`,'large'],
      ]},
      {id:'A 2.2',points:2,statement:'Das waagrecht stehende Gefäß ist 6 cm hoch mit Wasser gefüllt. Berechne das Wasservolumen.',steps:[
        ['Die Höhe dem Körper zuordnen',tex`<p>Bei \(6\,\mathrm{cm}\) endet der Wasserstand genau an der Unterkante des Gefäßhalses. Das Wasser hat die Form eines Kegelstumpfs.</p>\[V_{\text{Wasser}}=V_{\text{großer Kegel}}-V_{\text{kleiner Kegel}}.\]`,'neck'],
        ['Die beiden Kegelvolumina verrechnen',tex`\[V_{\text{Wasser}}\approx\frac{\pi}{3}\cdot\left(7{,}2^2\cdot8{,}0-1{,}8^2\cdot2{,}0\right)\,\mathrm{cm}^3\approx\boxed{427{,}5\,\mathrm{cm}^3}.\]`,'neck'],
      ]},
      {id:'A 2.3',points:2,statement:'Eine massive Eisenkugel mit Radius 1,7 cm wird in das Gefäß aus A 2.2 gelegt. Berechne, um wie viel der Wasserstand steigt.',steps:[
        ['Das verdrängte Volumen bestimmen',tex`<p>Die Kugel passt durch den \(3{,}6\,\mathrm{cm}\) breiten Hals. Sie sinkt auf den Boden und ist vollständig untergetaucht.</p>\[V_{\text{Kugel}}=\frac43\pi\cdot1{,}7^3\,\mathrm{cm}^3\approx20{,}6\,\mathrm{cm}^3.\]`,'neck'],
        ['Den Anstieg im Zylinder berechnen',tex`\[h=\frac{V_{\text{Kugel}}}{\pi\cdot(1{,}8\,\mathrm{cm})^2}\approx\frac{20{,}6}{\pi\cdot1{,}8^2}\,\mathrm{cm}\approx\boxed{2{,}0\,\mathrm{cm}}.\]<p>Der neue Wasserstand liegt bei etwa \(8{,}0\,\mathrm{cm}\) und damit unter dem Rand.</p>`,'rise'],
      ]},
      {id:'A 2.4',points:2,statement:'In das leere Gefäß fließt pro Zeiteinheit gleich viel Wasser. Wähle das passende Höhen-Zeit-Diagramm und begründe deine Wahl.'+diagramChoices,steps:[
        ['Den unteren Querschnitt betrachten',tex`<p>Im Kegelstumpf wird die Querschnittsfläche nach oben kleiner. Für dasselbe zugeflossene Volumen wird der Höhenzuwachs \(\Delta h\) deshalb immer größer. Der Graph ist zunächst gekrümmt und wird steiler.</p>`,'neck'],
        ['Das Verhalten im Gefäßhals ergänzen',tex`<p>Im Zylinder bleibt die Querschnittsfläche \(\pi\cdot(1{,}8\,\mathrm{cm})^2\) konstant. Dort steigt der Wasserstand gleichmäßig. Der Graph geht in eine ansteigende Gerade über. Damit passt <strong>Diagramm B</strong>.</p>`,'neck'],
      ]},
    ],
  },
  '2009-nt-ii':{
    title:'Werkstück mit Halbkugelaussparung',
    intro:tex`<p>Der Axialschnitt des Werkstücks hat die Achse \(AM\). Es gilt \(\lvert\overline{AM}\rvert=70{,}0\,\mathrm{cm}\), \(\lvert\overline{CF}\rvert=63{,}0\,\mathrm{cm}\), \(∢BAG=80^\circ\) und \(r=\lvert\overline{MD}\rvert=\lvert\overline{ME}\rvert=15{,}0\,\mathrm{cm}\).</p><p>Die kleine Farbdose reicht laut Schätzung für etwa \(1{,}5\,\mathrm m^2\), die große für \(3{,}75\,\mathrm m^2\).</p>`,
    rounding:'Die Lernrechnung verwendet die gerundeten Zwischenmaße des ISB. Der Modellwert verwendet die exakten Maße.',
    parts:[{id:'A 1',points:5,statement:tex`Berechne die gesamte zu streichende Oberfläche und begründe die Wahl der Farbdose. Kontrollwert: \(\lvert\overline{BC}\rvert\approx32{,}5\,\mathrm{cm}\).`,steps:[
      ['Den Kegelmantel vorbereiten',tex`<p>Der Außenradius ist \(R=31{,}5\,\mathrm{cm}\). Die Achse halbiert den Spitzenwinkel auf \(40^\circ\).</p>\[\lvert\overline{AB}\rvert=\frac{31{,}5}{\sin40^\circ}\,\mathrm{cm}\approx49{,}0\,\mathrm{cm}.\]`,'cone'],
      ['Die Zylinderhöhe bestimmen',tex`\[\lvert\overline{AH}\rvert=\frac{31{,}5}{\tan40^\circ}\,\mathrm{cm}\approx37{,}5\,\mathrm{cm},\qquad\lvert\overline{BC}\rvert\approx(70{,}0-37{,}5)\,\mathrm{cm}=32{,}5\,\mathrm{cm}.\]`,'cylinder'],
      ['Die sichtbaren Flächen erfassen',tex`<p>Zur Oberfläche gehören der Kegelmantel, der Zylindermantel, der obere Kreisring und die gekrümmte Fläche der Halbkugelaussparung. Die gemeinsame Kreisfläche zwischen Kegel und Zylinder liegt innen.</p>\[O=M_{\text{Kegel}}+M_{\text{Zylinder}}+A_{\text{Kreisring}}+O_{\text{Halbkugel}}.\]`,'ring'],
      ['Die Flächen berechnen und umrechnen',tex`\[\begin{aligned}O&\approx\pi\cdot\left(31{,}5\cdot49{,}0+2\cdot31{,}5\cdot32{,}5+31{,}5^2-15^2+2\cdot15^2\right)\,\mathrm{cm}^2\\&\approx15\,105{,}6\,\mathrm{cm}^2=1{,}51056\,\mathrm m^2.\end{aligned}\]`,'parts'],
      ['Die Dose begründet wählen',tex`<p>Die Fläche liegt rund \(0{,}011\,\mathrm m^2\) über der Angabe der kleinen Dose. Ich wähle die große Dose, damit die Farbe sicher reicht. Das ISB akzeptiert auch die kleine Dose, wenn die Wahl mit dem Schätzwert und der geringen Abweichung begründet wird.</p>`,'parts'],
    ]}],
  },
};
