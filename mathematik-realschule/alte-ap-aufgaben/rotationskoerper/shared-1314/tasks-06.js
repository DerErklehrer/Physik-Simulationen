const tex=String.raw;

export const tasks06={
  '2006-ht-ii':{
    title:'Kegel mit aufgesetzter Halbkugel',
    intro:tex`<p>Aus dem Axialschnitt eines Kegels mit aufgesetzter Halbkugel entsteht durch Rotation um \(AM\) der dargestellte Körper. Es gilt \(\lvert\overline{AM}\rvert=5{,}2\,\mathrm{cm}\), \(∢ACM=40{,}7^\circ\) und \(r=\lvert\overline{MD}\rvert=\lvert\overline{ME}\rvert=3{,}4\,\mathrm{cm}\).</p>`,
    rounding:'Die Lernlösung folgt den Zwischenrundungen des ISB. Das Modell verwendet die ungerundeten Maße.',
    parts:[{id:'P 1',points:5,statement:'Berechne den Oberflächeninhalt des Rotationskörpers. Runde auf eine Nachkommastelle.',steps:[
      ['Die sichtbaren Flächen erkennen',tex`<p>Die Oberfläche setzt sich aus Kegelmantel, gekrümmter Halbkugelfläche und Kreisring zusammen.</p>\[A=A_{\text{Kegelmantel}}+A_{\text{Halbkugel}}+A_{\text{Kreisring}}.\]`,'parts'],
      ['Den Grundkreisradius des Kegels bestimmen',tex`<p>Im rechtwinkligen Dreieck \(ACM\) ist \(AM\) die Gegenkathete zum gegebenen Winkel.</p>\[R=\lvert\overline{CM}\rvert=\frac{5{,}2\,\mathrm{cm}}{\tan40{,}7^\circ}\approx6{,}0\,\mathrm{cm}.\]`,'radius'],
      ['Die Mantellinie des Kegels bestimmen',tex`\[s=\lvert\overline{AB}\rvert=\lvert\overline{AC}\rvert=\frac{5{,}2\,\mathrm{cm}}{\sin40{,}7^\circ}\approx8{,}0\,\mathrm{cm}.\]`,'side'],
      ['Halbkugelfläche und Kreisring berechnen',tex`<p>Die Halbkugel bedeckt einen Kreis mit Radius \(r\) auf der Kegelgrundfläche. Der Rest ist der sichtbare Kreisring.</p>\[A_{\text{Halbkugel}}=2\pi r^2,\qquad A_{\text{Kreisring}}=\pi(R^2-r^2).\]`,'ring'],
      ['Die drei Flächen addieren',tex`\[\begin{aligned}A&=\pi R s+2\pi r^2+\pi(R^2-r^2)\\&\approx\pi\cdot(6{,}0\cdot8{,}0+2\cdot3{,}4^2+6{,}0^2-3{,}4^2)\,\mathrm{cm}^2\\&\approx\boxed{300{,}2\,\mathrm{cm}^2}.\end{aligned}\]`,'parts'],
    ]}],
  },
  '2006-nt-ii':{
    title:'Kegel mit kegelförmiger Aussparung',
    intro:tex`<p>Die Figur rotiert um ihre Symmetrieachse \(AM\). Die Mantellinien \(\overline{AB}\) und \(\overline{CD}\) verlaufen parallel. Es gilt \(\lvert\overline{AB}\rvert=26{,}0\,\mathrm{cm}\), \(\lvert\overline{BF}\rvert=11{,}0\,\mathrm{cm}\) und \(\lvert\overline{CE}\rvert=10{,}6\,\mathrm{cm}\).</p>`,
    rounding:'Die Lernlösung verwendet die auf eine Nachkommastelle gerundete innere Mantellinie des ISB. Das Modell rechnet ohne Zwischenrundung.',
    parts:[{id:'P 3',points:5,statement:tex`Berechne den Oberflächeninhalt des Rotationskörpers auf eine Nachkommastelle. Als Kontrolle gilt \(\lvert\overline{CD}\rvert\approx25{,}1\,\mathrm{cm}\).`,steps:[
      ['Außenradius und Innenradius bestimmen',tex`<p>Die beiden Durchmesser liegen in derselben Ebene. Ihre Hälften sind die gesuchten Radien.</p>\[R=\frac{11{,}0\,\mathrm{cm}}2=5{,}5\,\mathrm{cm},\qquad r=\frac{10{,}6\,\mathrm{cm}}2=5{,}3\,\mathrm{cm}.\]`,'radii'],
      ['Die innere Mantellinie berechnen',tex`<p>Die Dreiecke \(ABM\) und \(DCM\) sind ähnlich. Ihre Mantellinien verhalten sich wie ihre Radien.</p>\[\frac{\lvert\overline{CD}\rvert}{\lvert\overline{AB}\rvert}=\frac rR,\qquad \lvert\overline{CD}\rvert=\frac{5{,}3}{5{,}5}\cdot26{,}0\,\mathrm{cm}\approx25{,}1\,\mathrm{cm}.\]`,'similarity'],
      ['Den Rand an der Öffnung berechnen',tex`<p>Der Rand ist ein Kreisring. Ziehe die Fläche der Öffnung vom äußeren Kreis ab.</p>\[A_{\text{Kreisring}}=\pi(R^2-r^2)=\pi\cdot(5{,}5^2-5{,}3^2)\,\mathrm{cm}^2.\]`,'ring'],
      ['Innenmantel, Außenmantel und Rand addieren',tex`\[\begin{aligned}A&=\pi R\cdot\lvert\overline{AB}\rvert+\pi r\cdot\lvert\overline{CD}\rvert+A_{\text{Kreisring}}\\&\approx\pi\cdot(5{,}5\cdot26{,}0+5{,}3\cdot25{,}1+5{,}5^2-5{,}3^2)\,\mathrm{cm}^2\\&\approx\boxed{874{,}0\,\mathrm{cm}^2}.\end{aligned}\]`,'parts'],
    ]}],
  },
};
