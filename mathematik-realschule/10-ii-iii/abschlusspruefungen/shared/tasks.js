export const tasks = {
  "2023": {
    "title": "Halbkugel, Zylinder und Kegelstumpf",
    "intro": "Nebenstehende Skizze zeigt den Axialschnitt eines Rotationskörpers mit der Rotationsachse \\(DJ\\).<p>Es gilt: \\(\\lvert\\overline{CM}\\rvert=\\lvert\\overline{BL}\\rvert=r=3\\,\\mathrm{cm}\\); \\(\\lvert\\overline{ML}\\rvert=1{,}5\\,\\mathrm{cm}\\); \\(\\lvert\\overline{JL}\\rvert=6\\,\\mathrm{cm}\\); \\(\\lvert\\overline{KL}\\rvert=1\\,\\mathrm{cm}\\).</p>",
    "parts": [
      {
        "name": "B 2",
        "points": 4,
        "text": "Berechnen Sie die Länge der Strecke \\(\\overline{AK}\\) und das Volumen des Rotationskörpers.<p>Runden Sie auf zwei Stellen nach dem Komma.</p><p>[Teilergebnis: \\(\\lvert\\overline{AK}\\rvert=2{,}5\\,\\mathrm{cm}\\)]</p>",
        "steps": [
          {
            "title": "1 · Den Körper zerlegen",
            "body": "Von unten nach oben entstehen eine Halbkugel, ein Zylinder und ein Kegelstumpf. Die gestrichelten Linien ergänzen den Kegelstumpf zu einem ganzen Kegel. Für den Kegelstumpf ziehen wir den kleinen oberen Kegel vom großen Kegel ab.\\[V=V_{\\mathrm{Halbkugel}}+V_{\\mathrm{Zylinder}}+V_{\\mathrm{großer\\ Kegel}}-V_{\\mathrm{kleiner\\ Kegel}}\\]",
            "focus": "all"
          },
          {
            "title": "2 · Die Höhe des kleinen Kegels",
            "body": "Die Punkte \\(J,K,L\\) liegen auf der Rotationsachse. Daher gilt:\\[\\lvert\\overline{JK}\\rvert=\\lvert\\overline{JL}\\rvert-\\lvert\\overline{KL}\\rvert=(6-1)\\,\\mathrm{cm}=5\\,\\mathrm{cm}.\\]",
            "focus": "similar"
          },
          {
            "title": "3 · Ähnliche Dreiecke nutzen",
            "body": "Die rechtwinkligen Dreiecke \\(JKA\\) und \\(JLB\\) sind ähnlich: Sie besitzen bei \\(J\\) denselben Winkel, und \\(\\overline{AK}\\parallel\\overline{BL}\\). Entsprechende Radien und Höhen haben dasselbe Verhältnis.\\[\\frac{\\lvert\\overline{AK}\\rvert}{\\lvert\\overline{BL}\\rvert}=\\frac{\\lvert\\overline{JK}\\rvert}{\\lvert\\overline{JL}\\rvert}\\]\\[\\lvert\\overline{AK}\\rvert=3\\,\\mathrm{cm}\\cdot\\frac{5}{6}=\\boxed{2{,}50\\,\\mathrm{cm}}\\]",
            "focus": "similar"
          },
          {
            "title": "4 · Halbkugel und Zylinder",
            "body": "Beide haben den Radius \\(3\\,\\mathrm{cm}\\); der Zylinder hat die Höhe \\(1{,}5\\,\\mathrm{cm}\\).\\[V_{\\mathrm{Halbkugel}}=\\frac12\\cdot\\frac43\\pi\\cdot(3\\,\\mathrm{cm})^3=18\\pi\\,\\mathrm{cm}^3\\]\\[V_{\\mathrm{Zylinder}}=\\pi\\cdot(3\\,\\mathrm{cm})^2\\cdot1{,}5\\,\\mathrm{cm}=13{,}5\\pi\\,\\mathrm{cm}^3\\]",
            "focus": "lower"
          },
          {
            "title": "5 · Den Kegelstumpf berechnen",
            "body": "Der große Kegel hat Radius \\(3\\,\\mathrm{cm}\\) und Höhe \\(6\\,\\mathrm{cm}\\). Beim kleinen Kegel sind es \\(2{,}5\\,\\mathrm{cm}\\) und \\(5\\,\\mathrm{cm}\\).\\[V_{\\mathrm{Stumpf}}=\\frac13\\pi\\cdot(3\\,\\mathrm{cm})^2\\cdot6\\,\\mathrm{cm}-\\frac13\\pi\\cdot(2{,}5\\,\\mathrm{cm})^2\\cdot5\\,\\mathrm{cm}\\]\\[V_{\\mathrm{Stumpf}}=\\frac{91}{12}\\pi\\,\\mathrm{cm}^3\\]",
            "focus": "frustum"
          },
          {
            "title": "6 · Die Volumina addieren",
            "body": "Alle drei Bestandteile zählen zum Körper.\\[V=\\left(18+13{,}5+\\frac{91}{12}\\right)\\pi\\,\\mathrm{cm}^3\\]\\[\\boxed{V\\approx122{,}78\\,\\mathrm{cm}^3}\\]Die beiden gesuchten Ergebnisse sind damit \\(\\lvert\\overline{AK}\\rvert=2{,}50\\,\\mathrm{cm}\\) und \\(V\\approx122{,}78\\,\\mathrm{cm}^3\\).",
            "focus": "all"
          }
        ]
      }
    ]
  },
  "2024": {
    "title": "Spielfigur: Volumen und Oberfläche",
    "intro": "Die Vorlage einer Spielfigur ist ein Rotationskörper mit der Rotationsachse \\(MS\\). Nebenstehende Skizze zeigt grau eingefärbt den zugehörigen Axialschnitt.<p>Es gilt: \\(\\lvert\\overline{MB}\\rvert=1\\,\\mathrm{cm}\\); \\(\\lvert\\overline{TD}\\rvert=2\\,\\mathrm{cm}\\); \\(\\lvert\\overline{TM}\\rvert=1{,}5\\,\\mathrm{cm}\\); \\(\\lvert\\overline{NT}\\rvert=2\\,\\mathrm{cm}\\); \\(\\lvert\\overline{ST}\\rvert=6{,}5\\,\\mathrm{cm}\\); \\(\\overline{AH}\\parallel\\overline{BC}\\).</p>",
    "parts": [
      {
        "name": "B 2.1",
        "points": 4,
        "text": "Berechnen Sie das Volumen des Rotationskörpers.<p>Runden Sie auf zwei Stellen nach dem Komma.</p><p>[Zwischenergebnis: \\(\\lvert\\overline{NE}\\rvert=1{,}38\\,\\mathrm{cm}\\)]</p>",
        "steps": [
          {
            "title": "1 · Zylinder und Kegelstumpf",
            "body": "Der schmale Fuß ist ein Zylinder. Darüber liegt ein Kegelstumpf. Die gestrichelten Linien ergänzen ihn zu einem großen Kegel mit Spitze \\(S\\).\\[V=V_{\\mathrm{Zylinder}}+V_{\\mathrm{großer\\ Kegel}}-V_{\\mathrm{kleiner\\ Kegel}}\\]",
            "focus": "all"
          },
          {
            "title": "2 · Die fehlende Kegelhöhe",
            "body": "Vom großen Kegel wird oben ein Kegel abgeschnitten. Seine Höhe beträgt:\\[\\lvert\\overline{SN}\\rvert=\\lvert\\overline{ST}\\rvert-\\lvert\\overline{NT}\\rvert=(6{,}5-2)\\,\\mathrm{cm}=4{,}5\\,\\mathrm{cm}.\\]",
            "focus": "similar"
          },
          {
            "title": "3 · Den oberen Radius berechnen",
            "body": "Die rechtwinkligen Dreiecke \\(SNE\\) und \\(STD\\) sind ähnlich. Mit dem Verhältnis entsprechender Radien und Höhen folgt:\\[\\frac{\\lvert\\overline{NE}\\rvert}{\\lvert\\overline{TD}\\rvert}=\\frac{\\lvert\\overline{SN}\\rvert}{\\lvert\\overline{ST}\\rvert}\\]\\[\\lvert\\overline{NE}\\rvert=2\\,\\mathrm{cm}\\cdot\\frac{4{,}5}{6{,}5}\\approx1{,}38\\,\\mathrm{cm}.\\]",
            "focus": "similar"
          },
          {
            "title": "4 · Die drei Volumenanteile einsetzen",
            "body": "Der Zylinder hat Radius \\(1\\,\\mathrm{cm}\\) und Höhe \\(1{,}5\\,\\mathrm{cm}\\). Die Kegelradien sind \\(2\\,\\mathrm{cm}\\) bzw. \\(1{,}38\\,\\mathrm{cm}\\).\\[V=\\pi\\cdot\\lvert\\overline{MB}\\rvert^2\\cdot\\lvert\\overline{TM}\\rvert+\\frac13\\pi\\cdot\\lvert\\overline{TD}\\rvert^2\\cdot\\lvert\\overline{ST}\\rvert-\\frac13\\pi\\cdot\\lvert\\overline{NE}\\rvert^2\\cdot\\lvert\\overline{SN}\\rvert\\]\\[V\\approx\\left(1^2\\cdot1{,}5+\\frac13\\cdot2^2\\cdot6{,}5-\\frac13\\cdot1{,}38^2\\cdot4{,}5\\right)\\pi\\,\\mathrm{cm}^3\\]",
            "focus": "frustum"
          },
          {
            "title": "5 · Ergebnis und Rundung",
            "body": "\\[\\boxed{V\\approx22{,}97\\,\\mathrm{cm}^3}\\]Wie im amtlichen Lösungsmuster wird mit dem gerundeten Zwischenwert \\(1{,}38\\,\\mathrm{cm}\\) weitergerechnet. Mit ungerundetem Radius \\(\\frac{18}{13}\\,\\mathrm{cm}\\) ergäbe sich \\(V\\approx22{,}91\\,\\mathrm{cm}^3\\). Diese Rundungsabweichung ist kein anderer Körperansatz. Die Zeichnung verwendet die exakten Maßverhältnisse.",
            "focus": "all"
          }
        ]
      },
      {
        "name": "B 2.2",
        "points": 1,
        "text": "Die komplette Oberfläche der Spielfigur soll mit einer grauen Schutzfolie beklebt werden.<p>Welches Aufkleber-Set ist hierfür passend? Kreuzen Sie an.</p>",
        "steps": [
          {
            "title": "1 · Welche Flächen liegen außen?",
            "body": "Wir betrachten nur sichtbare Außenflächen. Die Berührungsfläche zwischen Fuß und Kegelstumpf liegt im Inneren und wird nicht beklebt. Benötigt werden der Zylindermantel, die untere Kreisfläche, der unten überstehende Kreisring, der Kegelstumpfmantel und die obere Kreisfläche.",
            "focus": "surface"
          },
          {
            "title": "2 · Die fünf Aufkleber zuordnen",
            "body": "<ul><li>Rechteck: Mantel des Zylinderfußes.</li><li>Kleiner Kreis: Unterseite mit Radius \\(1\\,\\mathrm{cm}\\).</li><li>Kreisring: Unterseite des Überstands, Außenradius \\(2\\,\\mathrm{cm}\\), Innenradius \\(1\\,\\mathrm{cm}\\).</li><li>Kreisringsektor: Mantel des Kegelstumpfs.</li><li>Größerer Kreis: Oberseite mit Radius ungefähr \\(1{,}38\\,\\mathrm{cm}\\).</li></ul>Ein Kreissektor gehört zu einem vollständigen Kegel; für den Stumpf fehlt ihm die innere Spitze.",
            "focus": "surface"
          },
          {
            "title": "3 · Das passende Set wählen",
            "body": "<strong>Set 3 ist richtig.</strong> Es enthält genau die fünf benötigten Teile. Set 2 fehlt der kleine Kreis für die Unterseite. Set 1 und Set 4 enthalten einen Kreissektor statt eines Kreisringsektors; Set 4 hat außerdem keinen Kreisring. Im 3D-Modell lassen sich die Unterseite und der Überstand durch Drehen prüfen.",
            "focus": "surface"
          }
        ]
      }
    ]
  },
  "2026": {
    "title": "Salzstreuer: Volumen und Salzmasse",
    "intro": "Die Vorlage für einen Salzstreuer ist ein Rotationskörper mit der Rotationsachse \\(MS\\). Nebenstehende Skizze zeigt grau eingefärbt den zugehörigen Axialschnitt.<p>Es gilt: \\(\\lvert\\overline{MB}\\rvert=2{,}25\\,\\mathrm{cm}\\); \\(\\lvert\\overline{BC}\\rvert=3\\,\\mathrm{cm}\\); \\(\\lvert\\overline{SN}\\rvert=3\\,\\mathrm{cm}\\); \\(r=\\lvert\\overline{PD}\\rvert=1\\,\\mathrm{cm}\\); \\(\\overline{AF}\\parallel\\overline{BC}\\).</p><p>Runden Sie im Folgenden auf zwei Stellen nach dem Komma.</p>",
    "parts": [
      {
        "name": "B 2.1",
        "points": 4,
        "text": "Zeigen Sie, dass das Volumen des Rotationskörpers \\(64{,}32\\,\\mathrm{cm}^3\\) beträgt.<p>[Zwischenergebnis: \\(\\lvert\\overline{SP}\\rvert=1{,}33\\,\\mathrm{cm}\\)]</p>",
        "steps": [
          {
            "title": "1 · Drei Bestandteile erkennen",
            "body": "Unten liegt ein Zylinder, darüber ein Kegelstumpf und ganz oben eine Halbkugel. Den Kegelstumpf berechnen wir als Differenz zweier Kegel. Die gedachte Kegelspitze \\(S\\) liegt oberhalb der Halbkugel.\\[V=V_{\\mathrm{Zylinder}}+V_{\\mathrm{großer\\ Kegel}}-V_{\\mathrm{kleiner\\ Kegel}}+V_{\\mathrm{Halbkugel}}\\]",
            "focus": "all"
          },
          {
            "title": "2 · Die Höhe des kleinen Kegels",
            "body": "Die rechtwinkligen Dreiecke \\(SPD\\) und \\(SNC\\) sind ähnlich. Der Radius des großen Kegels ist \\(\\lvert\\overline{NC}\\rvert=\\lvert\\overline{MB}\\rvert=2{,}25\\,\\mathrm{cm}\\).\\[\\frac{\\lvert\\overline{SP}\\rvert}{\\lvert\\overline{SN}\\rvert}=\\frac{\\lvert\\overline{PD}\\rvert}{\\lvert\\overline{NC}\\rvert}\\]\\[\\lvert\\overline{SP}\\rvert=3\\,\\mathrm{cm}\\cdot\\frac{1}{2{,}25}\\approx1{,}33\\,\\mathrm{cm}.\\]",
            "focus": "similar"
          },
          {
            "title": "3 · Zylinder und Halbkugel",
            "body": "Für den Zylinder gelten Radius \\(2{,}25\\,\\mathrm{cm}\\) und Höhe \\(3\\,\\mathrm{cm}\\). Die Halbkugel hat Radius \\(1\\,\\mathrm{cm}\\).\\[V_{\\mathrm{Zylinder}}=\\pi\\cdot(2{,}25\\,\\mathrm{cm})^2\\cdot3\\,\\mathrm{cm}=15{,}1875\\pi\\,\\mathrm{cm}^3\\]\\[V_{\\mathrm{Halbkugel}}=\\frac12\\cdot\\frac43\\pi\\cdot(1\\,\\mathrm{cm})^3=\\frac23\\pi\\,\\mathrm{cm}^3\\]",
            "focus": "lower"
          },
          {
            "title": "4 · Großer Kegel minus kleiner Kegel",
            "body": "Der große Kegel hat Höhe \\(3\\,\\mathrm{cm}\\) und Radius \\(2{,}25\\,\\mathrm{cm}\\). Vom kleinen Kegel verwenden wir die Höhe \\(1{,}33\\,\\mathrm{cm}\\) aus dem Zwischenergebnis.\\[V_{\\mathrm{Stumpf}}\\approx\\frac13\\pi\\cdot(2{,}25\\,\\mathrm{cm})^2\\cdot3\\,\\mathrm{cm}-\\frac13\\pi\\cdot(1\\,\\mathrm{cm})^2\\cdot1{,}33\\,\\mathrm{cm}\\]Die Schnittfläche zwischen Kegelstumpf und Halbkugel gehört zum Inneren; ihr Kreisvolumen wird weder addiert noch abgezogen.",
            "focus": "frustum"
          },
          {
            "title": "5 · Das geforderte Volumen bestätigen",
            "body": "\\[V\\approx\\left(2{,}25^2\\cdot3+\\frac13\\cdot2{,}25^2\\cdot3-\\frac13\\cdot1^2\\cdot1{,}33+\\frac12\\cdot\\frac43\\cdot1^3\\right)\\pi\\,\\mathrm{cm}^3\\]\\[\\boxed{V\\approx64{,}32\\,\\mathrm{cm}^3}\\]Damit ist der angegebene Wert bestätigt. Mit ungerundetem \\(\\lvert\\overline{SP}\\rvert=\\frac43\\,\\mathrm{cm}\\) erhält man auf zwei Nachkommastellen ebenfalls \\(64{,}32\\,\\mathrm{cm}^3\\).",
            "focus": "all"
          }
        ]
      },
      {
        "name": "B 2.2",
        "points": 2,
        "text": "Drei solcher Salzstreuer sollen vollständig befüllt werden.<p>Ermitteln Sie, ob eine Packung mit \\(500\\,\\mathrm{g}\\) Kochsalz dafür ausreicht, wenn ein Kubikzentimeter Kochsalz eine Masse von \\(2{,}16\\,\\mathrm{g}\\) hat.</p>",
        "steps": [
          {
            "title": "1 · Das gesamte Füllvolumen",
            "body": "Ein Salzstreuer fasst \\(64{,}32\\,\\mathrm{cm}^3\\). Für drei Salzstreuer wird das dreifache Volumen benötigt.\\[V_{\\mathrm{gesamt}}=3\\cdot64{,}32\\,\\mathrm{cm}^3=192{,}96\\,\\mathrm{cm}^3\\]",
            "focus": "all"
          },
          {
            "title": "2 · Vom Volumen zur Masse",
            "body": "Pro Kubikzentimeter werden \\(2{,}16\\,\\mathrm{g}\\) Salz benötigt. Wir multiplizieren Volumen und Masse pro Volumen.\\[m_{\\mathrm{Salz}}=192{,}96\\,\\mathrm{cm}^3\\cdot2{,}16\\,\\frac{\\mathrm{g}}{\\mathrm{cm}^3}\\]\\[m_{\\mathrm{Salz}}\\approx416{,}79\\,\\mathrm{g}\\]Die Volumeneinheit kürzt sich; das Ergebnis ist eine Masse in Gramm.",
            "focus": "all"
          },
          {
            "title": "3 · Mit der Packungsmasse vergleichen",
            "body": "\\[416{,}79\\,\\mathrm{g}<500\\,\\mathrm{g}\\]<strong>Die Packung reicht für drei vollständig befüllte Salzstreuer aus.</strong> Es bleiben ungefähr \\((500-416{,}79)\\,\\mathrm{g}=83{,}21\\,\\mathrm{g}\\) übrig. Hier wird das in der Prüfung vorgegebene Körpervolumen als Füllvolumen verwendet.",
            "focus": "all"
          }
        ]
      }
    ]
  }
};
