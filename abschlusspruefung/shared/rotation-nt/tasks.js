export const tasks = {
  "2024-I": {
    "year": 2024,
    "group": "I",
    "aCount": 4,
    "title": "Zwei Kegel mit gemeinsamer Spitze",
    "phi": 100,
    "axis": "SₙTₙ",
    "intro": "Kongruente, gleichschenklige Dreiecke \\(A_nB_nC\\) und \\(CD_nE_n\\) besitzen den gemeinsamen Punkt \\(C\\). Diese Dreiecke haben die Basen \\(\\overline{A_nB_n}\\) und \\(\\overline{D_nE_n}\\) mit den Mittelpunkten \\(S_n\\) und \\(T_n\\).<p>Es gilt: \\(\\lvert\\overline{A_nB_n}\\rvert=\\lvert\\overline{D_nE_n}\\rvert=6\\,\\mathrm{cm}\\).</p><p>Die Winkel \\(\\sphericalangle E_nCA_n\\) und \\(\\sphericalangle B_nCD_n\\) haben jeweils das Maß \\(\\varphi\\) mit \\(\\varphi\\in\\,]0^\\circ;180^\\circ[\\).</p><p>Die nebenstehende Skizze zeigt die Dreiecke \\(A_1B_1C\\) und \\(CD_1E_1\\) für \\(\\varphi=100^\\circ\\).</p>",
    "parts": [
      {
        "name": "B 2.1",
        "points": "2,5",
        "text": "Die Dreiecke \\(A_nB_nC\\) und \\(CD_nE_n\\) rotieren um die Gerade \\(S_nT_n\\). In der Skizze ist der Axialschnitt des für \\(\\varphi=100^\\circ\\) entstehenden Rotationskörpers grau eingefärbt.<p>Berechnen Sie die Länge der Strecken \\(\\overline{CT_n}\\) sowie das Volumen der entstehenden Rotationskörper in Abhängigkeit von \\(\\varphi\\).</p><p>[Ergebnisse: \\(\\lvert\\overline{CT_n}\\rvert(\\varphi)=3\\cdot\\tan\\frac{\\varphi}{2}\\,\\mathrm{cm}\\); \\(V(\\varphi)=18\\cdot\\pi\\cdot\\tan\\frac{\\varphi}{2}\\,\\mathrm{cm}^3\\)]</p>",
        "steps": [
          {
            "title": "1 · Aus zwei Dreiecken werden zwei Kegel",
            "body": "Jedes der beiden gleichschenkligen Dreiecke erzeugt bei der Rotation einen Kegel. Die Kegel sind gleich groß und berühren sich nur in ihrer gemeinsamen Spitze \\(C\\). Ihre Volumina werden addiert. Die Höhe des oberen Kegels ist \\(h=\\lvert\\overline{CT_n}\\rvert\\).",
            "focus": "all"
          },
          {
            "title": "2 · Den Winkel im rechtwinkligen Dreieck finden",
            "body": "Der Spitzenwinkel des oberen gleichschenkligen Dreiecks und der seitliche Winkel \\(\\varphi\\) ergänzen sich zu \\(180^\\circ\\). Die beiden Basiswinkel sind gleich groß. Für den Winkel bei \\(E_n\\) gilt daher:\\[\\sphericalangle CE_nT_n=\\frac{180^\\circ-(180^\\circ-\\varphi)}{2}=\\frac{\\varphi}{2}.\\]Im rechtwinkligen Dreieck \\(CE_nT_n\\) liegt die Höhe \\(\\overline{CT_n}\\) diesem Winkel gegenüber.",
            "focus": "angle"
          },
          {
            "title": "3 · Den Radius bestimmen",
            "body": "\\(T_n\\) ist der Mittelpunkt der Basis \\(\\overline{D_nE_n}\\). Der Radius beider Kegel ist deshalb halb so groß wie die Basislänge:\\[r=\\lvert\\overline{E_nT_n}\\rvert=\\frac12\\cdot\\lvert\\overline{D_nE_n}\\rvert=\\frac12\\cdot6\\,\\mathrm{cm}=3\\,\\mathrm{cm}.\\]",
            "focus": "radius"
          },
          {
            "title": "4 · Die Höhe mit dem Tangens ausdrücken",
            "body": "Beim Winkel \\(\\frac{\\varphi}{2}\\) ist \\(\\lvert\\overline{CT_n}\\rvert\\) die Gegenkathete und \\(\\lvert\\overline{E_nT_n}\\rvert=3\\,\\mathrm{cm}\\) die Ankathete.\\[\\tan\\frac{\\varphi}{2}=\\frac{\\lvert\\overline{CT_n}\\rvert}{3\\,\\mathrm{cm}}\\]\\[\\boxed{\\lvert\\overline{CT_n}\\rvert(\\varphi)=3\\cdot\\tan\\frac{\\varphi}{2}\\,\\mathrm{cm}}\\]",
            "focus": "height"
          },
          {
            "title": "5 · Beide Kegelvolumina addieren",
            "body": "Für einen Kegel gilt \\(V_{\\mathrm{Kegel}}=\\frac13\\pi r^2h\\). Es entstehen zwei solcher Kegel.\\[V(\\varphi)=2\\cdot\\frac13\\pi\\cdot(3\\,\\mathrm{cm})^2\\cdot\\left(3\\cdot\\tan\\frac{\\varphi}{2}\\,\\mathrm{cm}\\right)\\]\\[\\boxed{V(\\varphi)=18\\pi\\cdot\\tan\\frac{\\varphi}{2}\\,\\mathrm{cm}^3}\\]Beide Ergebnisse gelten für \\(\\varphi\\in\\,]0^\\circ;180^\\circ[\\). Die Randwerte gehören nicht zum Definitionsbereich; dort entsteht kein solcher endlicher, nicht entarteter Kegel.",
            "focus": "all"
          }
        ]
      },
      {
        "name": "B 2.2",
        "points": "1,5",
        "fixedPhi": 120,
        "text": "Die Dreiecke \\(A_2B_2C\\) und \\(CD_2E_2\\) sind gleichseitig.<p>Berechnen Sie das Volumen des zugehörigen Rotationskörpers.</p><p>Runden Sie auf zwei Stellen nach dem Komma.</p>",
        "steps": [
          {
            "title": "1 · Gleichseitig bedeutet nicht φ = 60°",
            "body": "Im gleichseitigen Dreieck beträgt der Spitzenwinkel bei \\(C\\) genau \\(60^\\circ\\). Der seitlich eingezeichnete Winkel \\(\\varphi\\) ist sein Nebenwinkel.\\[\\varphi=180^\\circ-60^\\circ=120^\\circ\\]Damit gehört der gleichseitige Spezialfall zur Belegung \\(\\varphi=120^\\circ\\).",
            "focus": "angle"
          },
          {
            "title": "2 · In die Volumenfunktion einsetzen",
            "body": "Wir verwenden das Ergebnis aus B 2.1.\\[V(120^\\circ)=18\\pi\\cdot\\tan\\frac{120^\\circ}{2}\\,\\mathrm{cm}^3\\]\\[V(120^\\circ)=18\\pi\\cdot\\tan60^\\circ\\,\\mathrm{cm}^3=18\\pi\\sqrt3\\,\\mathrm{cm}^3\\]",
            "focus": "all"
          },
          {
            "title": "3 · Erst das Endergebnis runden",
            "body": "\\[\\boxed{V(120^\\circ)\\approx97{,}95\\,\\mathrm{cm}^3}\\]Zur Kontrolle: Jedes gleichseitige Dreieck hat die Höhe \\(h=\\sqrt{6^2-3^2}\\,\\mathrm{cm}=3\\sqrt3\\,\\mathrm{cm}\\). Zwei Kegel mit diesem \\(h\\) und Radius \\(3\\,\\mathrm{cm}\\) liefern dasselbe Gesamtvolumen.",
            "focus": "all"
          }
        ]
      }
    ]
  },
  "2025-I": {
    "year": 2025,
    "group": "I",
    "aCount": 4,
    "title": "Kegel mit aufgesetzter Halbkugel",
    "phi": 50,
    "axis": "DM",
    "intro": "Gegeben sind rechtwinklige Dreiecke \\(C_nDM\\) mit den Hypotenusen \\(\\overline{C_nD}\\). Die Winkel \\(\\sphericalangle MDC_n\\) haben das Maß \\(\\varphi\\) mit \\(\\varphi\\in\\,]0^\\circ;90^\\circ[\\). Kreise mit dem Mittelpunkt \\(M\\) und den Radien \\(r_n=0{,}5\\cdot\\lvert\\overline{MC_n}\\rvert\\) schneiden die Gerade \\(DM\\) in Punkten \\(A_n\\) und die Strecken \\(\\overline{MC_n}\\) in Punkten \\(B_n\\).<p>Es gilt: \\(\\lvert\\overline{DM}\\rvert=4\\,\\mathrm{cm}\\); \\(\\sphericalangle A_nMB_n=90^\\circ\\).</p><p>Die Kreisbögen \\(\\overset{\\frown}{A_nB_n}\\) sowie die Strecken \\(\\overline{B_nC_n}\\), \\(\\overline{C_nD}\\) und \\(\\overline{DA_n}\\) begrenzen Figuren \\(A_nB_nC_nD\\).</p><p>Die Skizze zeigt die Figur \\(A_1B_1C_1D\\) für \\(\\varphi=50^\\circ\\).</p>",
    "parts": [
      {
        "name": "B 2.1",
        "points": "2",
        "text": "Zeigen Sie rechnerisch, dass für die Längen der Strecken \\(\\overline{C_nD}\\) und \\(\\overline{MC_n}\\) in Abhängigkeit von \\(\\varphi\\) gilt:<p>\\(\\lvert\\overline{C_nD}\\rvert(\\varphi)=\\frac{4}{\\cos\\varphi}\\,\\mathrm{cm}\\) und \\(\\lvert\\overline{MC_n}\\rvert(\\varphi)=4\\cdot\\tan\\varphi\\,\\mathrm{cm}\\).</p>",
        "steps": [
          {
            "title": "1 · Die Hypotenuse mit dem Kosinus",
            "body": "Im rechtwinkligen Dreieck \\(DMC_n\\) ist \\(\\lvert\\overline{DM}\\rvert=4\\,\\mathrm{cm}\\) die Ankathete des Winkels \\(\\varphi\\); \\(\\lvert\\overline{C_nD}\\rvert\\) ist die Hypotenuse.\\[\\cos\\varphi=\\frac{4\\,\\mathrm{cm}}{\\lvert\\overline{C_nD}\\rvert}\\]\\[\\boxed{\\lvert\\overline{C_nD}\\rvert(\\varphi)=\\frac{4}{\\cos\\varphi}\\,\\mathrm{cm}}\\]",
            "focus": "slant"
          },
          {
            "title": "2 · Den großen Radius mit dem Tangens",
            "body": "Die Strecke \\(\\overline{MC_n}\\) liegt dem Winkel \\(\\varphi\\) gegenüber.\\[\\tan\\varphi=\\frac{\\lvert\\overline{MC_n}\\rvert}{4\\,\\mathrm{cm}}\\]\\[\\boxed{\\lvert\\overline{MC_n}\\rvert(\\varphi)=4\\cdot\\tan\\varphi\\,\\mathrm{cm}}\\]Da \\(0^\\circ<\\varphi<90^\\circ\\), sind Tangens und Kosinus hier positiv; die beiden Längen sind positiv.",
            "focus": "radius"
          },
          {
            "title": "3 · Vorbereitung für die Halbkugel",
            "body": "Der Radius des vorgegebenen Kreisbogens ist halb so groß wie \\(\\lvert\\overline{MC_n}\\rvert\\). Daher gilt auch für den Radius der späteren Halbkugel:\\[r_n=\\lvert\\overline{MB_n}\\rvert=\\frac12\\cdot\\lvert\\overline{MC_n}\\rvert\\]\\[r_n(\\varphi)=\\frac12\\cdot4\\cdot\\tan\\varphi\\,\\mathrm{cm}=2\\cdot\\tan\\varphi\\,\\mathrm{cm}.\\]Die geforderten beiden Längen sind damit nachgewiesen; dieser zusätzliche Zwischenwert hilft in B 2.2.",
            "focus": "sphere"
          }
        ]
      },
      {
        "name": "B 2.2",
        "points": "3,5",
        "text": "Die Figuren \\(A_nB_nC_nD\\) rotieren um die Gerade \\(DM\\).<p>Zeigen Sie rechnerisch, dass für die Oberfläche \\(O\\) der entstehenden Rotationskörper in Abhängigkeit von \\(\\varphi\\) gilt:</p><div class=\"formula\">\\[O(\\varphi)=\\left(20\\pi\\cdot\\tan^2\\varphi+16\\pi\\cdot\\frac{\\tan\\varphi}{\\cos\\varphi}\\right)\\mathrm{cm}^2.\\]</div>",
        "steps": [
          {
            "title": "1 · Nur die Außenflächen zählen",
            "body": "Die Rotation erzeugt einen Kegel mit einer aufgesetzten Halbkugel. Benötigt werden drei Außenflächen:<ul><li>der Kegelmantel,</li><li>die gewölbte Halbkugeloberfläche,</li><li>der freiliegende Kreisring zwischen großem Kegelradius und kleinerem Halbkugelradius.</li></ul>Die Kontaktfläche unter der Halbkugel liegt innen und zählt nicht zur Oberfläche.\\[O=M_{\\mathrm{Kegel}}+O_{\\mathrm{Halbkugel}}+A_{\\mathrm{Kreisring}}\\]",
            "focus": "surface"
          },
          {
            "title": "2 · Den Kegelmantel berechnen",
            "body": "Für den Mantel eines Kegels gilt \\(M_{\\mathrm{Kegel}}=\\pi R s\\). Hier sind \\(R=\\lvert\\overline{MC_n}\\rvert\\) und \\(s=\\lvert\\overline{C_nD}\\rvert\\).\\[M_{\\mathrm{Kegel}}(\\varphi)=\\pi\\cdot(4\\tan\\varphi)\\cdot\\frac{4}{\\cos\\varphi}\\,\\mathrm{cm}^2\\]\\[M_{\\mathrm{Kegel}}(\\varphi)=16\\pi\\cdot\\frac{\\tan\\varphi}{\\cos\\varphi}\\,\\mathrm{cm}^2\\]",
            "focus": "cone"
          },
          {
            "title": "3 · Die Halbkugeloberfläche berechnen",
            "body": "Eine ganze Kugel hat die Oberfläche \\(4\\pi r^2\\). Die gewölbte Oberfläche einer Halbkugel ist halb so groß. Ihre ebene Kontaktfläche gehört nicht dazu.\\[O_{\\mathrm{Halbkugel}}(\\varphi)=\\frac12\\cdot4\\pi\\cdot(2\\tan\\varphi)^2\\,\\mathrm{cm}^2\\]\\[O_{\\mathrm{Halbkugel}}(\\varphi)=8\\pi\\tan^2\\varphi\\,\\mathrm{cm}^2\\]",
            "focus": "sphere"
          },
          {
            "title": "4 · Den Kreisring ergänzen",
            "body": "Vom großen Grundkreis des Kegels bleibt außen ein Ring frei. Die kleine Kreisfläche unter der Halbkugel wird abgezogen.\\[A_{\\mathrm{Kreisring}}=\\pi R^2-\\pi r_n^2\\]\\[A_{\\mathrm{Kreisring}}(\\varphi)=\\left((4\\tan\\varphi)^2-(2\\tan\\varphi)^2\\right)\\pi\\,\\mathrm{cm}^2\\]\\[A_{\\mathrm{Kreisring}}(\\varphi)=12\\pi\\tan^2\\varphi\\,\\mathrm{cm}^2\\]",
            "focus": "ring"
          },
          {
            "title": "5 · Die drei Anteile zusammenfassen",
            "body": "Halbkugel und Kreisring ergeben zusammen \\((8+12)\\pi\\tan^2\\varphi\\,\\mathrm{cm}^2\\). Dazu kommt der Kegelmantel.\\[\\boxed{O(\\varphi)=\\left(20\\pi\\tan^2\\varphi+16\\pi\\frac{\\tan\\varphi}{\\cos\\varphi}\\right)\\mathrm{cm}^2}\\]Damit ist die vorgegebene Oberflächenfunktion für \\(\\varphi\\in\\,]0^\\circ;90^\\circ[\\) nachgewiesen. In der 3D-Draufsicht ist der Kreisring um die Halbkugel besonders gut zu erkennen.",
            "focus": "surface"
          }
        ]
      },
      {
        "name": "B 2.3",
        "points": "1",
        "fixedPhi": 50,
        "text": "Berechnen Sie die Oberfläche des für \\(\\varphi=50^\\circ\\) entstehenden Rotationskörpers.<p>Runden Sie auf zwei Stellen nach dem Komma.</p>",
        "steps": [
          {
            "title": "1 · Den Winkel einsetzen",
            "body": "Wir setzen \\(\\varphi=50^\\circ\\) in die nachgewiesene Oberflächenfunktion ein. Der Taschenrechner muss im Gradmodus stehen.\\[O(50^\\circ)=\\left(20\\pi\\tan^2 50^\\circ+16\\pi\\frac{\\tan50^\\circ}{\\cos50^\\circ}\\right)\\mathrm{cm}^2\\]",
            "focus": "surface"
          },
          {
            "title": "2 · Das Ergebnis runden",
            "body": "Mit ungerundeten trigonometrischen Zwischenwerten ergibt sich:\\[O(50^\\circ)\\approx182{,}4328\\,\\mathrm{cm}^2\\]\\[\\boxed{O(50^\\circ)\\approx182{,}43\\,\\mathrm{cm}^2}\\]Die Einheit ist eine Flächeneinheit, weil die gesamte äußere Oberfläche gesucht ist.",
            "focus": "surface"
          }
        ]
      }
    ]
  },
  "2026-II": {
    "year": 2026,
    "group": "II/III",
    "aCount": 3,
    "title": "Halbkugel und Kegelstumpf: Oberfläche",
    "phi": null,
    "axis": "EH",
    "intro": "Die nebenstehende Skizze zeigt grau eingefärbt eine zur Geraden \\(EH\\) achsensymmetrische Figur, die aus einem Halbkreis mit dem Mittelpunkt \\(F\\) und dem Radius \\(r=\\lvert\\overline{FA}\\rvert\\) sowie dem gleichschenkligen Trapez \\(ABCD\\) besteht. Der Punkt \\(G\\) ist der Mittelpunkt der Strecke \\(\\overline{BC}\\).<p>Es gilt: \\(\\lvert\\overline{FA}\\rvert=3{,}5\\,\\mathrm{cm}\\); \\(\\lvert\\overline{GB}\\rvert=2\\,\\mathrm{cm}\\); \\(\\lvert\\overline{FH}\\rvert=4{,}5\\,\\mathrm{cm}\\); \\(H\\in AB\\); \\(H\\in DC\\).</p><p>Runden Sie im Folgenden auf zwei Stellen nach dem Komma.</p>",
    "parts": [
      {
        "name": "B 2.1",
        "points": "2",
        "text": "Ermitteln Sie rechnerisch die Längen der Strecken \\(\\overline{HA}\\) und \\(\\overline{HB}\\).<p>[Ergebnisse: \\(\\lvert\\overline{HA}\\rvert=5{,}70\\,\\mathrm{cm}\\); \\(\\lvert\\overline{HB}\\rvert=3{,}26\\,\\mathrm{cm}\\)]</p>",
        "steps": [
          {
            "title": "1 · Das rechtwinklige Dreieck AFH",
            "body": "\\(\\overline{AF}\\) steht senkrecht auf der Symmetrieachse \\(FH\\). Im rechtwinkligen Dreieck \\(AFH\\) ist \\(\\overline{HA}\\) die Hypotenuse. Der Satz des Pythagoras liefert:\\[\\lvert\\overline{HA}\\rvert^2=\\lvert\\overline{FA}\\rvert^2+\\lvert\\overline{FH}\\rvert^2\\]\\[\\lvert\\overline{HA}\\rvert=\\sqrt{(3{,}5\\,\\mathrm{cm})^2+(4{,}5\\,\\mathrm{cm})^2}\\]",
            "focus": "similar"
          },
          {
            "title": "2 · Die lange Mantellinie",
            "body": "\\[\\lvert\\overline{HA}\\rvert=\\sqrt{32{,}5}\\,\\mathrm{cm}\\approx\\boxed{5{,}70\\,\\mathrm{cm}}\\]Bei der Rotation ist diese Länge die Mantellinie des ergänzten großen Kegels mit Spitze \\(H\\). Die Strecke \\(\\overline{HA}\\) besteht aus der Stumpfmantellinie \\(\\overline{AB}\\) und der Mantellinie \\(\\overline{BH}\\) des kleinen Kegels.",
            "focus": "slant"
          },
          {
            "title": "3 · Ähnliche Dreiecke für die kurze Mantellinie",
            "body": "Wegen \\(\\overline{GB}\\parallel\\overline{FA}\\) sind die rechtwinkligen Dreiecke \\(HGB\\) und \\(HFA\\) ähnlich. Entsprechende Seiten besitzen dasselbe Längenverhältnis.\\[\\frac{\\lvert\\overline{HB}\\rvert}{\\lvert\\overline{HA}\\rvert}=\\frac{\\lvert\\overline{GB}\\rvert}{\\lvert\\overline{FA}\\rvert}=\\frac{2}{3{,}5}\\]\\[\\lvert\\overline{HB}\\rvert\\approx5{,}70\\,\\mathrm{cm}\\cdot\\frac{2}{3{,}5}\\approx\\boxed{3{,}26\\,\\mathrm{cm}}\\]",
            "focus": "similar"
          }
        ]
      },
      {
        "name": "B 2.2",
        "points": "3",
        "text": "Die Figur aus B 2.0 rotiert um die Achse \\(EH\\).<p>Berechnen Sie den Inhalt der Oberfläche des entstehenden Rotationskörpers.</p>",
        "steps": [
          {
            "title": "1 · Die drei äußeren Flächen",
            "body": "Der Körper besteht aus einer Halbkugel und einem Kegelstumpf. Zu seiner Oberfläche gehören die gewölbte Halbkugeloberfläche, der Mantel des Kegelstumpfs und die untere Kreisfläche. Die gemeinsame Kreisfläche von Halbkugel und Stumpf liegt innen.\\[O=O_{\\mathrm{Halbkugel}}+M_{\\mathrm{Stumpf}}+A_{\\mathrm{unten}}\\]",
            "focus": "surface"
          },
          {
            "title": "2 · Die gewölbte Halbkugeloberfläche",
            "body": "Der Radius der Halbkugel beträgt \\(3{,}5\\,\\mathrm{cm}\\). Wir verwenden die halbe Kugeloberfläche ohne zusätzliche Grundfläche.\\[O_{\\mathrm{Halbkugel}}=\\frac12\\cdot4\\pi\\cdot(3{,}5\\,\\mathrm{cm})^2\\]\\[O_{\\mathrm{Halbkugel}}=24{,}5\\pi\\,\\mathrm{cm}^2\\]",
            "focus": "sphere"
          },
          {
            "title": "3 · Großer Kegelmantel minus kleiner Kegelmantel",
            "body": "Für einen Kegelmantel gilt \\(M=\\pi r s\\). Der Stumpfmantel ist die Differenz der beiden Kegelmäntel mit gemeinsamer Spitze \\(H\\).\\[M_{\\mathrm{Stumpf}}=\\pi\\cdot\\lvert\\overline{FA}\\rvert\\cdot\\lvert\\overline{HA}\\rvert-\\pi\\cdot\\lvert\\overline{GB}\\rvert\\cdot\\lvert\\overline{HB}\\rvert\\]\\[M_{\\mathrm{Stumpf}}\\approx(3{,}5\\cdot5{,}70-2\\cdot3{,}26)\\pi\\,\\mathrm{cm}^2\\]\\[M_{\\mathrm{Stumpf}}\\approx13{,}43\\pi\\,\\mathrm{cm}^2\\]Wir rechnen wie im amtlichen Lösungsmuster mit den auf zwei Nachkommastellen gerundeten Längen aus B 2.1 weiter.",
            "focus": "frustum"
          },
          {
            "title": "4 · Die untere Kreisfläche",
            "body": "Die Unterseite ist ein Kreis mit Radius \\(\\lvert\\overline{GB}\\rvert=2\\,\\mathrm{cm}\\).\\[A_{\\mathrm{unten}}=\\pi\\cdot(2\\,\\mathrm{cm})^2=4\\pi\\,\\mathrm{cm}^2\\]Oben wird keine weitere Kreisfläche addiert: Dort schließen Halbkugel und Kegelstumpf aneinander an.",
            "focus": "bottom"
          },
          {
            "title": "5 · Addieren und runden",
            "body": "\\[O\\approx(24{,}5+13{,}43+4)\\pi\\,\\mathrm{cm}^2=41{,}93\\pi\\,\\mathrm{cm}^2\\]\\[\\boxed{O\\approx131{,}73\\,\\mathrm{cm}^2}\\]Dies entspricht dem amtlichen Lösungsmuster. Mit durchgehend ungerundeten Mantellinien ergibt sich \\(O\\approx131{,}75\\,\\mathrm{cm}^2\\). Der kleine Unterschied entsteht durch die Zwischenrundung; die Zeichnung verwendet die exakten Maßverhältnisse.",
            "focus": "surface"
          }
        ]
      }
    ]
  }
};
