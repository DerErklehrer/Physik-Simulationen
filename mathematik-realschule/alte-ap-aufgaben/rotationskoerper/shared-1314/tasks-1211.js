const tex=String.raw;

export const tasks1211={
  '2012-ht-i':{
    title:'Zylinder mit Kegelaussparung',introId:'A 3.0',
    intro:tex`<p>Die achsensymmetrischen Siebenecke \(ABCDE_nFG_n\) sind die Axialschnitte der Rotationskörper. Der Mittelpunkt \(M\) von \(\overline{BC}\) und der Punkt \(F\) liegen auf der Rotationsachse. Die Punkte \(E_n\) und \(G_n\) liegen auf \(\overline{AD}\).</p><p>Es gilt \(∢MBA=∢BAG_n=90^\circ\), \(\lvert\overline{AB}\rvert=5\,\mathrm{cm}\), \(\lvert\overline{BC}\rvert=9\,\mathrm{cm}\) und \(\lvert\overline{MF}\rvert=2\,\mathrm{cm}\). Der Winkel \(\varphi=∢E_nFG_n\) liegt in \(]0^\circ;112{,}62^\circ[\). Die Ausgangsskizze gehört zu \(\varphi=80^\circ\).</p>`,
    rounding:'Der Regler verändert den Öffnungswinkel der Aussparung. Die Zylindermaße bleiben fest.',
    parts:[
      {id:'A 3.1',points:1,statement:'Begründe rechnerisch, warum der obere Grenzwinkel 112,62° beträgt.',steps:[
        ['Die Grenzlage erkennen',tex`<p>Die Aussparung wird mit zunehmendem Winkel breiter. An der oberen Grenze erreichen \(G_n\) und \(E_n\) die Ecken \(A\) und \(D\). Diese Lage ist ausgeschlossen.</p>`,'boundary'],
        ['Die Katheten bestimmen',tex`<p>Sei \(H\) der Mittelpunkt von \(\overline{AD}\). Die halbe Breite ist \(4{,}5\,\mathrm{cm}\). Die Höhe der Aussparung ist \(\lvert\overline{FH}\rvert=(5-2)\,\mathrm{cm}=3\,\mathrm{cm}\).</p>`,'boundary'],
        ['Den halben Winkel verdoppeln',tex`\[\tan\left(\frac{\varphi_{\max}}{2}\right)=\frac{4{,}5}{3},\qquad \varphi_{\max}=2\arctan(1{,}5)\approx112{,}62^\circ.\]`,'radius'],
      ]},
      {id:'A 3.2',points:3,statement:tex`Leite \(V(\varphi)=9\pi\cdot\left(11{,}25-\tan^2\left(\frac{\varphi}{2}\right)\right)\,\mathrm{cm}^3\) her.`,steps:[
        ['Das fehlende Volumen abziehen',tex`\[V=V_{\text{Zylinder}}-V_{\text{Kegel}}.\]<p>Die Aussparung ist ein Kegel. Ihre Spitze liegt in \(F\), ihre Grundfläche in der oberen Deckebene.</p>`,'parts'],
        ['Den Radius der Aussparung bestimmen',tex`\[\tan\left(\frac{\varphi}{2}\right)=\frac{\lvert\overline{HE_n}\rvert}{3\,\mathrm{cm}},\qquad r(\varphi)=3\tan\left(\frac{\varphi}{2}\right)\,\mathrm{cm}.\]`,'radius'],
        ['Die beiden Volumenformeln einsetzen',tex`<p>Der Zylinder hat Radius \(4{,}5\,\mathrm{cm}\) und Höhe \(5\,\mathrm{cm}\). Die Kegelhöhe beträgt \(3\,\mathrm{cm}\).</p>\[V(\varphi)=\left(\pi\cdot4{,}5^2\cdot5-\frac13\pi\cdot 3^2\cdot\tan^2\left(\frac{\varphi}{2}\right)\cdot3\right)\,\mathrm{cm}^3.\]`,'parts'],
        ['Den gemeinsamen Faktor ausklammern',tex`\[V(\varphi)=9\pi\cdot\left(11{,}25-\tan^2\left(\frac{\varphi}{2}\right)\right)\,\mathrm{cm}^3.\]`,'parts'],
      ]},
      {id:'A 3.3',points:1,statement:'Berechne das Körpervolumen für 100°. Runde auf zwei Nachkommastellen.',steps:[
        ['Den Winkel einsetzen',tex`<p>In der Tangensfunktion steht der halbe Öffnungswinkel, also \(50^\circ\).</p>\[V(100^\circ)=9\pi\cdot(11{,}25-\tan^2(50^\circ))\,\mathrm{cm}^3.\]`,'radius'],
        ['Das Ergebnis runden',tex`\[V(100^\circ)\approx\boxed{277{,}93\,\mathrm{cm}^3}.\]`,'parts'],
      ]},
    ],
  },
  '2011-ht-i':{
    title:'Stahltank aus Zylinder und Kegel',introId:'A 3.0',
    intro:tex`<p>Als Axialschnitte der Stahltanks entstehen symmetrische Fünfecke \(AB_nC_nD_nE\). Der Mittelpunkt \(F\) von \(\overline{AE}\) und \(C_n\) liegen auf der Achse.</p><p>Es gilt \(\lvert\overline{AE}\rvert=2{,}00\,\mathrm m\), \(\lvert\overline{FC_n}\rvert=2\cdot\lvert\overline{AB_n}\rvert\) und \(∢B_nAE=∢AFC_n=90^\circ\). Der Winkel \(\varphi=∢C_nB_nA\) liegt in \([104{,}04^\circ;160{,}02^\circ]\). Die Ausgangsskizze verwendet \(\varphi=120^\circ\).</p>`,
    rounding:'Der Winkelregler verändert beide Höhen gemeinsam. Der Tankradius bleibt 1,00 m.',
    parts:[
      {id:'A 3.1',points:3,statement:tex`Bestimme das Tankvolumen in Abhängigkeit von \(\varphi\). Kontrollwert: \(V(\varphi)=\frac43\pi\cdot\tan(\varphi-90^\circ)\,\mathrm m^3\).`,steps:[
        ['Den Körper zerlegen',tex`\[V=V_{\text{Zylinder}}+V_{\text{Kegel}}.\]<p>Der Radius beider Körper ist \(\lvert\overline{AF}\rvert=\frac12\cdot2{,}00\,\mathrm m=1{,}00\,\mathrm m\).</p>`,'radius'],
        ['Die Höhen vergleichen',tex`<p>Sei \(G\) der Schnittpunkt der Achse mit \(\overline{B_nD_n}\). Die Zylinderhöhe ist \(h=\lvert\overline{AB_n}\rvert=\lvert\overline{FG}\rvert\). Da \(\lvert\overline{FC_n}\rvert=2h\), beträgt auch die Kegelhöhe \(\lvert\overline{GC_n}\rvert=h\).</p>`,'height'],
        ['Die Höhe aus dem Winkel ableiten',tex`<p>Weil \(∢AB_nG=90^\circ\), gilt \(∢GB_nC_n=\varphi-90^\circ\). Im rechtwinkligen Dreieck \(B_nGC_n\) ist \(\lvert\overline{B_nG}\rvert=1{,}00\,\mathrm m\).</p>\[h(\varphi)=1{,}00\,\mathrm m\cdot\tan(\varphi-90^\circ).\]`,'angle'],
        ['Die Teilvolumina addieren',tex`\[V=\pi r^2h+\frac13\pi r^2h=\frac43\pi r^2h.\]\[V(\varphi)=\frac43\pi\cdot\tan(\varphi-90^\circ)\,\mathrm m^3.\]`,'parts'],
      ]},
      {id:'A 3.2',points:2,statement:'Bestimme den Winkel für einen Tank mit 5 000 Litern Volumen. Runde auf zwei Nachkommastellen.',steps:[
        ['Liter in Kubikmeter umrechnen',tex`\[5\,000\,\mathrm l=5\,\mathrm m^3.\]`,'parts'],
        ['Nach dem Tangens auflösen',tex`\[5=\frac43\pi\cdot\tan(\varphi-90^\circ)\quad\Longleftrightarrow\quad\tan(\varphi-90^\circ)=\frac{15}{4\pi}.\]`,'angle'],
        ['Den Winkel bestimmen',tex`\[\varphi=90^\circ+\arctan\left(\frac{15}{4\pi}\right)\approx\boxed{140{,}05^\circ}.\]<p>Der Wert liegt innerhalb des vorgegebenen Intervalls. Dort ist der Tangens von \(\varphi-90^\circ\) streng steigend.</p>`,'angle'],
      ]},
    ],
  },
  '2011-nt-ii':{
    title:'Eierbecher aus Holz',
    intro:tex`<p>Der Axialschnitt zeigt einen hölzernen Eierbecher mit der Symmetrieachse \(MS\). Die obere Mulde ist halbkugelförmig.</p><p>Gegeben sind \(\lvert\overline{AB}\rvert=9{,}0\,\mathrm{cm}\), \(\lvert\overline{DC}\rvert=4{,}0\,\mathrm{cm}\), \(∢BAD=52^\circ\) und \(r=\lvert\overline{ED}\rvert=\lvert\overline{EC}\rvert\).</p>`,
    rounding:'Die Lernlösung folgt den gerundeten Zwischenwerten des ISB. Die Erkundungsanzeige rechnet mit ungerundeten Maßen.',
    parts:[
      {id:'A 1',points:5,statement:'Berechne das Holzvolumen des Eierbechers. Runde auf eine Nachkommastelle.',steps:[
        ['Den Körper zerlegen',tex`<p>Ergänze den Kegelstumpf bis zur gedachten Spitze \(S\). Ziehe den kleinen Ergänzungskegel und die Halbkugel ab.</p>\[V=V_{\text{großer Kegel}}-V_{\text{kleiner Kegel}}-V_{\text{Halbkugel}}.\]`,'parts'],
        ['Die Radien bestimmen',tex`\[R=\frac{9{,}0\,\mathrm{cm}}{2}=4{,}5\,\mathrm{cm},\qquad r=\frac{4{,}0\,\mathrm{cm}}{2}=2{,}0\,\mathrm{cm}.\]<p>Der kleine Kegel und die Mulde haben denselben Radius.</p>`,'small'],
        ['Die Höhe des großen Kegels berechnen',tex`\[\tan52^\circ=\frac{\lvert\overline{MS}\rvert}{\lvert\overline{AM}\rvert},\qquad\lvert\overline{MS}\rvert=4{,}5\cdot\tan52^\circ\,\mathrm{cm}\approx5{,}8\,\mathrm{cm}.\]`,'large'],
        ['Die Höhe des kleinen Kegels bestimmen',tex`<p>Die Axialschnitte der beiden Kegel sind ähnlich. Ihre Höhen verhalten sich wie ihre Durchmesser.</p>\[\frac{\lvert\overline{ES}\rvert}{\lvert\overline{MS}\rvert}=\frac{4{,}0}{9{,}0},\qquad \lvert\overline{ES}\rvert\approx\frac{4{,}0}{9{,}0}\cdot5{,}8\,\mathrm{cm}\approx2{,}6\,\mathrm{cm}.\]`,'small'],
        ['Einsetzen und runden',tex`\[\begin{aligned}V\approx\Big(&\frac13\pi\cdot4{,}5^2\cdot5{,}8-\frac13\pi\cdot2^2\cdot2{,}6\\&-\frac23\pi\cdot2^3\Big)\,\mathrm{cm}^3\approx\boxed{95{,}3\,\mathrm{cm}^3}.\end{aligned}\]<p>Mit ungerundeten Zwischenwerten liefert das Modell etwa \(94{,}7\,\mathrm{cm}^3\).</p>`,'parts'],
      ]},
    ],
  },
};
