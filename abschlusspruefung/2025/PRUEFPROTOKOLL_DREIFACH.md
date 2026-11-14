# Prüfprotokoll 2025 – dreifacher Qualitätsdurchlauf
**Haupttermin Mathematik I · Realschule Bayern · WPF I**

**Ergebnis: Teilkontrollen dreifach bestanden, Gesamtfreigabe nach dem verbindlichen Neun-Kategorien-Standard NOCH NICHT ERTEILT.**

## Kontrollbasis und Prüfumfang

- Verbindlicher Maßstab: [QUALITAETSSTANDARD.md](../QUALITAETSSTANDARD.md) mit **neun Kategorien in jeder von drei vollständigen Prüfrunden für jede Teilaufgabe**.
- Amtliche Primärquellen: ISB Bayern, Abschlussprüfung 2025 Mathematik Gruppe I, Haupttermin, Originalprüfung und offizielles Lösungsmuster. Für endgültige Freigabe sind *jede* Aufgabenformulierung, alle Zeichnungen und *jeder* Lösungsschritt mit den Originalen zu vergleichen.
- Technische Referenz 2026: insbesondere B 3/B 4, schrittweise Grafik und 2D/3D.
- Vorhandene Einzelseiten: **A 1 (2 Teilaufgaben), A 2 (4), A 3 (2), B 1 (3), B 2 (4), B 3 (6), B 4 (5)** = **26 Teilaufgaben**.
- Alter Zwischenstand unter `2025/haupttermin/index.html`; die neuen Seiten sind dort verlinkt.

## Prüfergebnisse – ehrliche Abgrenzung der drei Runden

| Prüfkategorie (je Runde) | Runde 1 | Runde 2 | Runde 3 | Beurteilung für die endgültige Freigabe |
|---|---|---|---|---|
| 1. Originaltreue, **Wort für Wort**, alle Abbildungen | **teilweise** | **teilweise** | **teilweise** | **OFFEN**: teilweise verkürzte bzw. umformulierte Originaltexte; systematischer vollständiger Bildvergleich fehlt |
| 2. Fachliche Lösungen, ISB-Abgleich und kindgerechte Vollständigkeit | **teilweise** | **teilweise** | **teilweise** | **OFFEN**: Kernformeln/Ergebnisse und zahlreiche Zwischenwerte nachgerechnet, aber nicht jeder einzelne Beweisschritt dreimal unabhängig mit dem amtlichen Muster gegengeprüft |
| 3. Mathematische Schreibweisen | **teilweise** | **teilweise** | **teilweise** | **OFFEN**: vertikale Brüche (inkl. Diagramm), Vektoren, Winkel und Dezimalkomma korrigiert; Vollkontrolle jeder gerenderten Formel und Winkelbeschriftung fehlt |
| 4. Grafische Korrektheit im Originalvergleich | **teilweise** | **teilweise** | **teilweise** | **OFFEN**: Fehler an B 2 und A 3 korrigiert, dynamische Winkelbögen und Grenzlagentexte ergänzt; Originalzeichnungen müssen noch für alle Teilaufgaben visuell abgeglichen werden |
| 5. Räumliche Objekte, 2D/3D, Top View und Touch | **technisch bestanden** | **technisch bestanden** | **technisch bestanden** | **TEILWEISE**: A 2/B 2 erfolgreich in Chromium mit 3D-Canvas, Umschaltung, Draufsicht/Reset; echtes Ziehen/Drehen via Touchgeste und sämtliche Blickwinkel wurden nicht nachgewiesen |
| 6. Abhängigkeiten und Randwerte | **technisch bestanden** | **technisch bestanden** | **technisch bestanden** | **TEILWEISE**: Schieberegler, Stichproben-, Extrem- und Spezialwerte geprüft; nicht jeder mathematisch mögliche Grenzfall und jeder Lösungsdiagrammzustand unabhängig abgenommen |
| 7. Schrittweise Musterlösung und Didaktik | **technisch bestanden** | **technisch bestanden** | **technisch bestanden** | **TEILWEISE**: alle 26 Teilaufgaben per Navigation, Vorwärts/Reset geprüft; synchroner **grafischer Aufbau pro Lösungsschritt** nicht durchgehend umgesetzt bzw. verifiziert |
| 8. Technik und Bedienbarkeit Desktop/Mobil | **bestanden (automatisiert)** | **bestanden (automatisiert)** | **bestanden (automatisiert)** | **BESTANDEN in getesteten Umgebungen**: Chromium 1366×900 Desktop, 390×844 mobile Emulation mit Touch-Aktivierung, ohne JS-Konsolenfehler |
| 9. Veröffentlichung und Konsistenz | **teilweise** | **teilweise** | **teilweise** | **OFFEN**: sieben Einzelseiten, Links und fehlende direkte PDF-Links statisch geprüft; umfassende optische Design-/Verweisabnahme und Vergleich mit 2026 noch offen |

**Wichtig:** Drei Wiederholungen einer technischen Testmatrix sind **nicht** gleichbedeutend mit drei vollständig freigegebenen Durchläufen aller neun Kategorien. Keine dieser drei Runden wird hier fälschlich als vollständige Freigaberunde ausgewiesen.

## Reproduzierbare Prüfbelege

- CI-Workflow: [GitHub Actions – dreifache Qualitätskontrolle](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43522790118), Ergebnis **success** für Commit `6a6ed416ec537c84953e47d34d99caf28ddc10e8` (letzter reiner Workflow-Commit nach den Korrekturen).
- Drei unabhängige Node-Durchläufe mit jeweils **125 statischen und mathematischen Assertions**, zusammen **375 erfolgreich**.
- Drei unabhängige echte Chromium-Durchläufe, je **7 Aufgaben × 2 Bildschirmgrößen**, zusammen **42 erfolgreiche Kombinationen**. Jede Kombination prüft jede Teilaufgabe auf vorhandene Inhalte und Navigation, Reglergrenzwerte, Browser-Konsole; A 2/B 2 zusätzlich 3D-Canvas, Ansichtwechsel und Draufsicht. **Kein gemeldeter JavaScript-Fehler, alle 42 Kombinationen erfolgreich.**
- Screenshots aller drei Prüfrunden inkl. Grenzlagen und 3D-Versionen als GitHub-Actions-Artefakt **`mathematik-2025-browserkontrolle`**, Artefakt-ID `14083801885` (84 PNGs).
- Testquellen: `abschlusspruefung/tests/quality_2025.mjs`, `abschlusspruefung/tests/browser_2025.mjs`; Workflow `.github/workflows/qa-mathe-2025.yml`.

## Während der Prüfung erkannte und behobene Mängel

1. **B 2 – Schrägbild**: Richtung der verzerrten Kante AD und Grundflächenlage korrigiert; unzutreffender Hinweis, AD sei unverkürzt, berichtigt. Eckpunkte in Grenzlagen eindeutig beschriftet.
2. **A 3 – Schwerpunkt**: SVG-Schwerpunkt S auf korrekte Lage der Seitenhalbierenden (2:1) auch in der y-Koordinate gesetzt.
3. **A 1 – Wahrscheinlichkeiten**: zehn zuvor flach als `1/5`, `4/5` usw. geschriebene Diagrammzahlen als echte vertikale Brüche umgesetzt.
4. **B 3/B 4**: Darstellungsregler für vollständig sichtbare Körper/Ausschnitte begrenzt, ohne die mathematischen Definitionsbereiche zu ändern.
5. **B 3.5 – Zwischenrundung**: amtlicher Rechenweg `DF≈0,68 LE`, `AB₃≈6,64 LE`, `x≈0,28` sauber vom exakten geometrischen Wert `AB₃≈6,63192 LE` und `x≈0,2493` unterschieden. Zusätzliche Voreinstellung und Hinweis im UI.
6. **B 4.2/B 4.3 – Zwischenrundung**: amtliche Koeffizienten und Sonderpunkt `D₃(0,10|5,05)` beibehalten, geometrisch ungerundete Sonderlage `x≈0,04372` in UI erläutert.
7. **B 1 – Baumdiagramm**: überlappende Astwahrscheinlichkeiten entflechtet.
8. **A 2/B 4 – Winkelbogen**: dynamische Winkelmarkierungen ergänzt, Überlagerung von Beschriftungen bei A 2-Grenzlage reduziert.
9. **Technische Infrastruktur**: CI auf Ubuntu 24.04 fixiert (erster Lauf scheiterte an Playwright-Unterstützung auf Ubuntu 26.04); danach Browser- und MathJax-/WebGL-Tests erfolgreich durchgelaufen.

## Einzelabnahme 2025 A 1 – original- und lösungsbezogener Nachweis (14.11.2026)

### Freigabeentscheidung A 1 – 14.11.2026

**A 1 ist durch den Nutzer ausdrücklich zur Verwendung als interaktive Lernseite freigegeben.** Die nachfolgenden automatisierten Regressionstests auf dem A1-Stand sind erfolgreich abgeschlossen ([GitHub Actions](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43569427160)). Diese konkrete Freigabe erfolgt **mit bewusst akzeptierter Abweichung**: Die originale Gebäudefotografie wird nicht gezeigt. Die Freigabe bezieht sich auf **A 1 als Lernseite**, nicht auf die Behauptung, dass sämtliche neun Qualitätskategorien einschließlich Bildidentität in drei vollständigen unabhängigen Durchgängen lückenlos erfüllt wurden. Die übrigen Aufgaben des Jahres 2025 behalten ihren bisherigen, noch nicht endgültig freigegebenen Status.



**Prüfgegenstand:** Originalprüfung Mathematik I Haupttermin 2025, A 1.0/A 1.1/A 1.2 (erste Aufgaben-PDF-Seite), amtliches Lösungsmuster (erste Lösungs-PDF-Seite), eigene Datei `2025/haupttermin/a1.html`.

- **Originalwortlaut:** Beide Operatoren und Fragen A 1.1/A 1.2 mit dem PDF verglichen. Die Ausgangssituation wurde durch Korrektur von „Wohnungsschlüssel“ zu „Wohnungs- und … Briefkastenschlüssel“ wieder dem **gedruckten** Originaltext angeglichen. Eine ähnliche automatische Texttranskription der PDF kann die Kürzungsform anders wiedergeben; maßgeblich ist die visuell geprüfte PDF-Seite.
- **Originalabbildung:** Die originale Gebäudefotografie ist auf der Seite bewusst nicht übernommen. Dies ist eine **bekannte Abweichung** vom ursprünglichen Prüfungsblatt; die Handlungssituation wird aber im originalgetreuen Text vollständig erklärt. Für eine wörtlich-bildgenaue Freigabe muss die Bild-/Lizenzfrage gesondert entschieden werden.
- **A 1.1:** Unabhängige Schlüsselwahlen mit jeweils genau einem passenden von fünf Schlüsseln; `P=1/5·1/5=1/25=4 %`; nachgerechnet und mit amtlicher Lösung verglichen; Bewertung **1 P**.
- **A 1.2:** Genau ein passender Schlüssel: zwei disjunkte Fälle `1/5·4/5` und `4/5·1/5`; zusammen `8/25=32 %`; nachgerechnet und mit amtlicher Lösung verglichen; Bewertung **1,5 P**.
- **Baumdiagramm:** Vier Endpfade mit korrekt zugeordneten bedingten Zweigwahrscheinlichkeiten `1/5` und `4/5`; Endwahrscheinlichkeiten `1/25`, `4/25`, `4/25`, `16/25`. Für alle zehn dargestellten Brüche werden vertikale SVG-Brüche verwendet. Die beiden für A 1.2 relevanten Endwahrscheinlichkeiten werden erst bei den jeweiligen Lösungsschritten eingeblendet; A 1.1 enthüllt `1/25` erst nach der Produktregel.
- **Didaktik/Interaktion:** Je zwei bzw. vier getrennte Erklärungsschritte; Vorwärts, Zurück, Reset und Wechsel der Teilaufgabe müssen die Sichtbarkeit synchronisieren. Diese Zustände sind jetzt Bestandteil des dreimal wiederholten Chromium-Tests in Desktop- und Mobil-Emulation.
- **Schreibweise:** Korrekte vertikale MathJax-Brüche; Malpunkt; Aufgabenwerte, Einheitenlosigkeit der Wahrscheinlichkeiten und Ergebnis als Bruch/Prozentsatz korrekt. Winkel, Vektoren und 3D sind in A 1 nicht anwendbar.
- **Technik/Veröffentlichung:** Eigenständige Seite und Aufgabenübersicht verlinkt; kein direkter öffentlicher PDF-Link. Die übrigen sechs Einzelseiten sind von den A1-Korrekturen logisch getrennt und werden über das CI auf technische Regression geprüft.

**Drei Prüfrunden – Abgrenzung:** Die Original- und Lösungsmusterseite wurde für A 1 direkt eingesehen und die zwei Rechnungen unabhängig kontrolliert. Die CI führt die technischen, grafischen DOM-Zustands- und Navigationskontrollen dreimal aus. Die **originale Gebäudefotografie fehlt**; daher ist für Kategorie 1 und 4 nach der strengen Bildtreueregel die vollständige Freigabe **noch gesperrt**, selbst wenn alle automatisierten Kontrollen erfolgreich sind.

## Einzelabnahme 2025 A 2 – fachliche und grafische Korrekturen (14.11.2026)

**Referenz:** Amtliche Mathematik-I-Haupttermin-Prüfung 2025, A 2.0–A 2.4 (Originalaufgabe Seiten 2–3) sowie ISB-Lösungsmuster Seite 1. PDF-Seiten einschließlich Zeichnungen visuell begutachtet und mathematische Ergebnisse unabhängig hergeleitet.

- **A 2.0, 2.1 – Originalzeichnung:** Das Ausgangsdreieck `AB₁C₁` mit `φ=40°` bleibt in der 2D-Ansicht dauerhaft erhalten. Das zweite Dreieck `AB₂C₂` für `φ=75°` wird **zusätzlich** aufgebaut, statt die Originalzeichnung zu ersetzen. Winkelbogen `φ`, Rotationspfeil, senkrechte Achse und Punktbezeichnungen nach dem Original angepasst. Konstruktion in drei Schritten: 75°-Hilfsstrahl, Länge AC₂=4 cm, Verbindung C₂B₂ bei gleich langen Schenkeln AC₂ und B₂C₂. **1 P**.
- **Geometrische Eigenprüfung:** Bei jedem zulässigen Winkel `φ` verwendet die 2D-Zeichnung die skalierte Koordinatenkonstruktion `A=(0,0)`, `C=(-4 sinφ,4 cosφ)`, `B=(0,8 cosφ)` (geometrische nach oben gerichtete Achse). Damit gilt `|AC|=|BC|=4 cm` und `∢BAC=φ`. Beispiel `φ=75°`: `AB≈2,07 cm`, `AC=BC=4 cm`.
- **A 2.2 – Intervall:** `a=4 sinφ cm`, `0°<φ<90°` und daraus `0<x<4`. Auswahlintervall **`]0;4[`**, mit exakt sechs Prüfungsoptionen und interaktiver Antwortauswertung. **1 P**.
- **A 2.3 – Oberfläche:** Rotation um die Basis erzeugt einen Doppelkegel mit gemeinsamer innen liegender Kreisfläche. Zwei äußere Kegelmantelflächen, Mantellinien jeweils `4 cm`, Radius `a=4 sinφ cm`. Daher `O=2 π a·4 cm = 32 π sinφ cm²`. Die 3D-Modelle verwenden offene Kegelmantelgeometrien, damit die gemeinsame Grundfläche nicht zusätzlich gerendert wird. **2,5 P**.
- **A 2.4 – Winkel:** `16π cm²=32πsinφ cm²`, `sinφ=1/2`, wegen `φ∈]0°;90°[` die einzige Lösung **`φ=30°`**, `L={30°}`. **1,5 P**.
- **Schülernahe Didaktik:** Vier Teilaufgaben mit getrennter Lösungsnavigation, passende Voreinstellungen 40°/75°/30°, grafischer Aufbauschritt A 2.1 gekoppelt an Lösungsschritte. Die Lösung in A 2.3 zeigt den ausgerechneten Oberflächenwert erst im letzten Herleitungsschritt. Der Reglerbereich 1°–89° ist eine didaktische Diskretisierung; **mathematisch** bleibt das offene Intervall `]0°;90°[` verbindlich.
- **3D:** Für jedes φ ist `r=4sinφ`, `h=4cosφ`; die Spitzen liegen auf der Rotationsachse bei `±h`; der Grundkreis liegt dazwischen; die Spitzennamen sind A/Bₙ, der Mantelpunkt Cₙ. Freie Drehung, Draufsicht und Reset werden automatisiert getestet.
- **Normen/Originaltreue:** Winkelnotation ∢, echte vertikale Brüche, Malpunkt, Dezimalkomma und die sechs Antwortintervalle beachtet. Die interaktive Lernseite ist keine originale Druckseite mit karierten Schreibfeldern; der fachlich erforderliche Text und die Skizzen bleiben maßgeblich.
- **Freigabe:** Die automatisierten Tests können die mathematisch-geometrische Modelltreue, den vollständigen visuellen Originalvergleich und reale Mehrfinger-Touchgesten nicht allein beweisen. **A 2 ist noch nicht ausdrücklich durch den Nutzer freigegeben**, anders als A 1. Technische Prüfergebnisse sind separat im Actions-Lauf zu erfassen.

### Freigabeentscheidung A 3 – 14.11.2026

**A 3 ist vom Nutzer ausdrücklich als interaktive Lernseite freigegeben.** Die vorausgehende fachliche Prüfung und der erfolgreiche dreifache technische Testlauf sind dokumentiert. Diese Einzelfreigabe ersetzt keinen noch offenen vollständigen neunfachen Prüfungsjahrgangs-Abgleich.

## Einzelprüfung 2025 A 3 – Ebene Geometrie (14.11.2026)

**Quellenabgleich:** Amtlicher Haupttermin 2025 Mathematik I, Angaben Seite 3 (A 3.0–A 3.2), Lösungsmuster Seite 2 (A 3.1–A 3.2), jeweils original als PDF-Seite visuell kontrolliert.

**Originaltreue:** A 3.0 beschreibt das rechtwinklige Dreieck ABC mit Hypotenuse AB, Schwerpunkt S und Schnittpunkt M der Geraden BS mit AC; AC = 8√3 cm und BC = 4 cm. Die Fragen A 3.1 und A 3.2, Punkte (1 P, 2 P) und Operatoren sind mit dem Original abgeglichen; die aktuelle Seite nutzt die amtliche Winkelnotation ∢CBM. Die Grundfigur enthält AB, BC, AC, M, S und eine über beide Eckpunkte hinaus verlängerte Gerade BS. Das Original enthält keine Seitenlängenbeschriftungen direkt in der Skizze; daher erscheinen die Längen dort jetzt erst bei A 3.2.

**Mathematische Eigenprüfung:**
- A 3.1: Jede Verbindungsgerade eines Eckpunkts mit dem Schwerpunkt liegt auf einer Seitenhalbierenden; M ist somit der Mittelpunkt von AC. Ausführlicher als der amtliche Ein-Satz-Weg, mathematisch gleichwertig.
- A 3.2: MC=AC/2=4√3 cm, tan(∢CBM)=MC/BC=√3, ∢CBM=60°. Der begründete Übergang erfolgt im bei C rechtwinkligen Dreieck BCM. Ergebnis und 2 P mit amtlichem Lösungsmuster abgeglichen.
- Exakte SVG-Geometrie: Maßstab 36 px pro cm; BC=144 px, AC=288√3 px. A=(585−288√3,92), C=(585,92), B=(585,236). M=((A_x+C_x)/2,92), S=((A_x+C_x+B_x)/3,(92+92+236)/3). Dadurch gilt der 60°-Winkel aus den Koordinaten exakt bis auf die Pixelrundung; Schwerpunkt liegt auf BM im Verhältnis BS:SM=2:1.
- Darstellung: Gleichheitsstriche der beiden Halbseiten, Halbseitenlängen und Winkelbogen werden nicht vorweggenommen. Sie erscheinen nach dem entsprechenden Lösungsschritt; optionales Ein-/Ausblenden ist dann freigeschaltet. Die ursprüngliche Seitenhalbierende bleibt standardmäßig sichtbar.
- Schreibweise: MathJax-Brüche echt vertikal, Malpunkte, Winkel ∢CBM (nicht ∠CBM); keine 3D-Objekte, keine Parametergrenzwerte und keine Einheiten bei reinen Winkeln außer °. Mobile Darstellung als eigene Prüfung.
- Regressionstest: Browser-Test `tests/browser_2025.mjs` kontrolliert je Runde beide A3-Teilaufgaben, alle Lösungsschritte, gesperrte/verfügbare Hilfsmarkierungen und Zurücksetzen. Statischer Test `tests/quality_2025.mjs` prüft numerisch die Schwerpunktkoordinate, den Mittelpunkt, 60° und die Stufung der Seitenlängen.
- **Freigabe:** Fachliche Bearbeitung und technische Tests sind getrennt zu dokumentieren. A 3 wird bis zur ausdrücklichen Freigabeentscheidung **nicht** als vom Nutzer abgenommen geführt. Aktuell gibt es keine identifizierte inhaltliche Abweichung vom Original; die ergänzte farbige Hilfsgrafik ist ein zusätzliches Lernangebot, nicht Bestandteil der amtlichen Druckfassung.

### A 3 – nachträgliche visuelle Endkontrolle und Regression, 14.11.2026

- **Grafik:** Das exakte Seitenverhältnis 8√3:4, Schwerpunktlage S auf BM und Winkel ∢CBM = 60° sind im finalen SVG geometrisch nachgerechnet. Bei der Sichtprüfung der Browser-Screenshots lagen die Halbseitenlängen zunächst über anderen Dreiecksseiten. Die zwei Labels wurden oberhalb von AC neu gesetzt, die direkte Darstellung der gesamten AC-Länge in der Skizze entfernt und das SVG für mobile Ansicht kompakter geschnitten. Der Quelltext der amtlichen Angabe und die Musterrechnungen blieben unverändert.
- **Drei Wiederholungen auf dem korrigierten Stand:** [GitHub-Actions-Lauf 43593530437](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43593530437), **erfolgreich**. Je drei erfolgreiche statische Regressionstests und jeweils 7 Aufgaben × 2 Browser-Viewports × 3 Runden, insgesamt **42 erfolgreiche Browserfälle**. A 3.1 und A 3.2 wurden in jedem Lauf durchgeklickt; geprüft wurden die anfänglich gesperrte Halbierung, die Freischaltung nach der Begründung, der Winkel erst nach dem Endergebnis und das Zurücksetzen.
- **Sichtprüfung:** Die finalen Screenshots `r3-desktop-a3-loesung.png` und `r3-mobile-a3-loesung.png` wurden tatsächlich geöffnet und auf überlappende Texte, sichtbare Winkel, korrekte Punktbeschriftungen und Lesbarkeit kontrolliert. Keine weitere Überlagerung festgestellt. Alle Screenshots liegen im Actions-Artefakt `mathematik-2025-browserkontrolle` (ID `14113189159`).
- **Geltungsbereich der Aussage:** Dies belegt die nachbearbeiteten A3-Rechnungen, Geometrie und Technik. Die eigenständige dreifache vollständige Abnahme aller neun Kategorien für den *gesamten* Jahrgang 2025 ist weiterhin offen. A 3 ist **zur Nutzersichtung bereit**, aber nicht ausdrücklich freigegeben.

### B 1 – ausdrückliche Nutzerfreigabe, 14.11.2026

**Der Nutzer hat B 1 ausdrücklich mit „Passt so, nächste“ freigegeben.** Die Abnahme umfasst die überarbeitete interaktive Lernseite mit zwölfendigem Baumdiagramm, schrittweisem Lösungsaufbau und Mobil-/Gesamtansicht. Der vorherige technische Dreifachlauf war erfolgreich (GitHub Actions 43595699443); die bewusste dynamische Neuzeichnung statt eines identischen Druckfaksimiles bleibt dokumentiert.

## Einzelprüfung 2025 B 1 – Daten und Zufall (14.11.2026)

**Amtlicher Originalabgleich:** Mathematik I Haupttermin 2025, Prüfungs-PDF, erste Seite der Aufgabengruppe B, B 1.0 bis B 1.3, mit Bildvergleich gegen das vierstufige Farbstamm- und zwölfendige Geschmacks-Baumdiagramm; amtliches Lösungsmuster, Seite 2. Überprüfung von Wortlaut, Operatoren, Bezeichnungen, vier Antwortmöglichkeiten, Prozentanteilen, Aufgabenreihenfolge und Punktwerten: **B 1.1 = 1 P, B 1.2 = 1,5 P, B 1.3 = 2,5 P, zusammen 5 P**.

**Fachliche Eigenprüfung:**

- **B 1.1:** Vier Farbanteile bilden 100 %. r = 40 %, b = 30 %, g = p %, w = (30 − p) %. Als Wahrscheinlichkeit ist dies `1 − (70+p)/100`, die dritte der vier amtlichen Auswahlmöglichkeiten. Der ursprüngliche weiße Ast bleibt vor der Herleitung unbeschriftet.
- **B 1.2:** `p/100 · 50/100 = 10/100`, daraus `p=20`, also `20 %`. Im Ausgangsbaum steht weiterhin nur `p %`, nicht das bereits gelöste Ergebnis. Für mathematisch sinnvolle Farbanteile gilt `0<p<30`; der Beispielregler benutzt ausschließlich Werte zwischen 0,5 und 29,5.
- **B 1.3:** Vier disjunkte günstige Pfade: `rA=20 %`, `rM=12 %`, `bA=15 %`, `bM=9 %`; Summe `56 %`. Da `56 %>50 %`, ist Sebastians Vermutung richtig. Dieser Wert ist von `p` unabhängig.
- **Unabhängige mathematische Grenzproben:** `p∈{0,5;5;10;15;20;29,5}`. Für jeden Wert addieren sich die vier Farbanteile zu 100 %, die drei bedingten Geschmacksanteile zu 100 %, und `P(g∩A)=p/200`; die 56-%-Wahrscheinlichkeit bleibt invariant.

**Grafik, Schreibweise und Didaktik:** Baumdiagramm nach dem amtlichen Aufbau: gemeinsamer Start, vier Farbknoten r/b/g/w und jeweils drei Geschmacks-Endknoten A/B/M, insgesamt zwölf Pfade; die ursprünglich gegebenen 40 %, 30 %, p % und jeweils 50 %, 20 %, 30 % bleiben sichtbar. Ergänzungen werden erst im betreffenden Lösungsschritt gezeigt. Die vier B1.1-Alternativen sind als echte vertikale MathJax-Brüche auswählbar. Der Schieberegler benutzt bewusst einen nicht amtlich vorgegebenen Beispielwert und ist als solcher gekennzeichnet. Die nach der Rechnung einblendbare Voreinstellung `p=20 %` ist bis zum letzten Schritt von B1.2 verborgen; die vier günstigen Pfade werden erst im Verlauf von B1.3 hervorgehoben und beschriftet. Keine versteckten Ergebnisse in der Messwertzeile.

**Testmatrix:** Die statischen Regressionstests kontrollieren sechs verschiedene p-Werte, Positivität des weißen Anteils, alle vier B1.1-Alternativen und die gestaffelte Sichtbarkeit. Chromium prüft je dreimal Desktop (1366×900) und Mobile (390×844), alle B1-Teile, Intervallantwort, Lösungswechsel/Reset, Ergebnisfreigabe von `p=20` und `56 %` sowie p-Randwerte und Screenshots.

**Freigabestatus:** Die fachliche und technische Qualitätsabnahme wird in diesem Protokoll dokumentiert. B 1 ist nach den noch ausstehenden finalen Screenshots zur **Nutzerfreigabe bereit**, aber noch nicht ausdrücklich freigegeben. Die amtliche Originalzeichnung dient als geometrische Referenz; die neue Farbgebung und die interaktive Einblendung sind bewusst ergänzte Lernhilfen.

### B 1 – abschließende technische und visuelle Nachprüfung vom 14.11.2026

- **Letzter inhaltlich/funktional relevanter Stand:** Commit `f2c113cead337abf6e16b1a472d7393d3b833686` mit umschaltbarer mobiler Baumdarstellung und einem dedizierten Browser-Test der Ansichten. B 1.2 koppelt beim letzten Rechenschritt den Wert `p=20` an die Zeichnung und stellt beim Zurückblättern den vorherigen Beispielwert wieder her.
- **Erfolgreiche GitHub Actions:** [Prüflauf 43595699443](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43595699443): **drei statische/mathematische Durchläufe bestanden; 42 von 42 Chromium-Fällen bestanden (3 Prüfrunden × 7 Aufgaben × 2 Viewports).** Einschließlich B1.1-Auswahl, B1.2-Kopplung/Reset, B1.3-Pfaden, Grenzwerten, Mobilscrollen und Umschalter zwischen Lesemodus und Gesamtübersicht.
- **Tatsächlich gesichtete Screenshots:** `r3-desktop-b1-loesung.png` zeigt die vier hervorgehobenen günstigen Pfade und 56-%-Addition. `r3-mobile-b1-gesamtansicht.png` zeigt die vollständigen vier Farbgruppen; `r3-mobile-b1-antworten.png` zeigt die auswählbaren MathJax-Bruchantworten mit der vergrößerten Baumgrafik. Die zweite Bildhälfte wurde mit `r3-mobile-b1-rechts.png` gesondert dokumentiert. Screenshots aus drei Prüfzyklen liegen im GitHub-Artefakt `mathematik-2025-browserkontrolle` (ID `14114620446`).
- **Originaltreue:** Aufgabenstellungen, Operatoren und Anteile stimmen mit dem amtlichen B1-Blatt überein. Das Baumdiagramm ist als farbige dynamische SVG-Neuzeichnung ausgeführt (kein identisches Druckfaksimile); die mathematische Struktur und alle 12 Pfade stimmen. Es werden keine amtlichen Dokument-PDFs verlinkt.
- **Restgrenzen:** Die drei automatisierten Durchläufe sind kein unabhängiger dreifacher menschlicher Wort-für-Wort-Abgleich aller neun Prüfkategorien. Deshalb wird die technische Prüfung als bestanden dokumentiert und die **ausdrückliche Nutzerfreigabe von B 1 noch offengelassen**.

### Nutzerfreigaben A 2 und B 2 – 14.11.2026

Der Nutzer hat **A 2** und **B 2** ausdrücklich genehmigt. Diese Freigaben gelten für die jeweils dokumentierten interaktiven Lernseiten nach der fachlichen Überarbeitung und erfolgreichen dreifachen technischen Regression. Der frühere Hinweis „noch keine ausdrückliche Nutzerfreigabe“ ist für diese beiden Einzelseiten damit überholt; offene Vollabgleiche des gesamten Jahrgangs bleiben gesondert bestehen.

## Einzelprüfung 2025 B 2 – Raumgeometrie (14.11.2026)

**Amtlicher Abgleich:** Originalprüfung Mathematik I Haupttermin 2025, Aufgabengruppe B, B 2.0–B 2.4, PDF-Seite 7 (Seitenindex 6); Lösungsmuster PDF-Seite 2 und 3 (Seitenindizes 1–2). Originalabbildung und Lösungsskizze wurden tatsächlich als PDF-Screenshots angesehen und mit den neu gerenderten 2D-/3D-Screenshots verglichen. Die vier Aufgabenwerte und Bewertungen **1 P + 2 P + 1,5 P + 2 P = 6,5 P** stimmen mit dem Muster überein.

### Fachliche und geometrische Ergebnisse

1. **B 2.0 / B 2.1:** Originalquader ABCDEFGH mit `|AB|=4 cm`, `|AD|=10 cm`, `|AE|=3 cm`, Schrägbildverkürzung `q=1/2`, Verzerrungswinkel `ω=45°`, AB auf der Schrägbildachse. Die Raumdiagonale AG der Originalzeichnung wurde ergänzt. Die Darstellung benutzt 40 px je unverzerrtem cm und einen exakt berechneten Schrägbildvektor `(200/√2, −200/√2)` px für AD; dessen Länge ist exakt 200 px = `q · 10 · 40`. B2.1 wird in drei Stufen konstruiert: P₁ für `AP₁=4 cm` (im Schrägbild 2 cm), Q₁ auf BC mit `P₁Q₁∥AB`, abschließend die dreieckigen Grundflächen A–P₁–E, B–Q₁–F und die Verbindungskanten. Eindeutige Punktebezeichnungen ohne Überlagerung.
2. **B 2.2:** Die Dreiecksfläche ist `G = 1/2 · APₙ · 3 cm`, und `tan φ = APₙ/(3 cm)`. Daraus `APₙ(φ)=3 tan φ cm`. Mit Prismenhöhe `4 cm` folgt `V(φ)=1/2 · 3 tan φ · 3 · 4 cm³ = 18 tan φ cm³`. Zulässiges Winkelintervall `0°<φ≤∢AED`; rechnerisches Maximum `arctan(10/3)≈73,30°`.
3. **B 2.3:** Für `V=50 cm³` gilt `tan φ=50/18=25/9`; daher `φ≈70,20°`. Die zugehörige Grundseitenlänge beträgt mathematisch exakt `AP₂=50/6=25/3 cm`, während das UI `8,33 cm` anzeigt. **Echter behobener Fehler:** Zuvor verarbeitete der Browser die auf zwei Dezimalstellen normalisierte Reglerposition und zeigte dafür fälschlich **49,98 cm³**. Die Grafik und die 3D-Koordinaten verwenden beim amtlichen Lösungsschritt jetzt exakt `25/3`, geben damit **50,00 cm³** aus, und schalten beim manuellen Reglerzugriff auf den real gewählten Wert zurück.
4. **B 2.4:** `V_Q=4·10·3=120 cm³`; größtmögliches dreieckiges Prisma bei `P₀=D` und `Q₀=C`: `V_max=1/2·10·3·4=60 cm³=V_Q/2`. Folglich existiert kein Prisma mit mehr als der Hälfte des Quadervolumens. Die Grenzlage wird erst nach der Beurteilung automatisch eingestellt. Bei der maximalen Lage sind zusammenfallende Eckpunkte in 2D und 3D als `D=P₀` und `C=Q₀` gekennzeichnet.

### Didaktik, Technik, Schreibweise und Sichtprüfung

- **Keine Ergebnisvorwegnahme:** „B 2.3: 50 cm³“ und „Grenzfall 10 cm“ erscheinen als Voreinstellungen nur nach der jeweiligen Schlussrechnung; Winkel und Volumen in der Messwertanzeige werden schrittbezogen sichtbar. Der exakte 25/3-Hinweis erscheint erst nach B2.3. Zurückblättern und Reset stellen den vorherigen Parameter wieder her.
- **2D-/3D-Konsistenz:** Das 3D-Prisma wurde ebenfalls phasengesteuert: erst P, dann Q und Parallelverbindung, zuletzt die Dreieckflächen und übrigen Kanten. Die freien OrbitControls-Drehungen, Draufsicht (jetzt exakt von oberhalb des aktuellen Drehzentrums), Reset und Kameraframing bleiben erhalten. Die Punktindices entsprechen der gerade bearbeiteten Teilaufgabe.
- **Formale Korrektheit:** Vertikale MathJax-Brüche, Dezimalkomma, Malpunkt, `∢` statt `∠`, Ergebnisse mit Maßeinheiten, `q=\frac12`; Formulierung der Verkürzung als rechenbare Konstruktion. Die Anweisung zu „verdeckten gestrichelten Kanten“ wurde aus der erklärenden Lernlösung entfernt, weil sie in der tatsächlichen amtlichen Lösungsskizze nicht als gesondertes Kriterium erscheint und auf der Seite nicht entsprechend gezeichnet wurde.
- **Dreifache Qualitätsregression:** [Erfolgreicher GitHub-Actions-Lauf 43601008687](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43601008687), Commit `1abfdb781ee9c649937263830ad400e85d7bb1cc`, **3 statische/mathematische vollständige Wiederholungen, 42/42 Browserfälle bestanden**. Die B2-Sondertests laufen in Desktop- und Mobil-Emulation je dreimal und kontrollieren P/Q/Prismenphasen in SVG und WebGL, exaktes B2.3-Volumen, B2.4-Grenzfall, Sichtbarkeitsregeln und Navigation. Die Testläufe beziehen sich auf den finalen Programmcode; spätere Änderungen betrafen nur den außerhalb der CI-Filter liegenden Projektstatusbericht.
- **Visuelle Belege:** GitHub-Actions-Artefakt `mathematik-2025-browserkontrolle`, ID `14116615935`, 24,6 MB. Die tatsächlichen Screenshots `r3-desktop-b2-konstruktion.png`, `r3-mobile-b2-konstruktion.png`, `r3-desktop-b2-3d-schritt1.png` und `r3-desktop-b2-3d-schritt3.png` wurden geprüft. Die ursprüngliche punkt-/kantenüberlagerte Darstellung wurde korrigiert und die kleine 3D-Darstellung deutlich vergrößert.

**Freigabeentscheidung:** B 2 ist **fachlich bearbeitet, visuell auf Desktop/Mobil geprüft und technisch dreifach erfolgreich getestet**. Es ist **noch keine ausdrückliche Nutzerfreigabe** erfolgt. Die automatisierten Tests und die einmalige dokumentierte Sichtprüfung sind kein Ersatz für drei unabhängige menschliche Vollabgleiche aller neun Kategorien; deren Vollständigkeit wird nicht fälschlich behauptet.

### Nutzerfreigabe B 3 – 14.11.2026

**B 3 ist vom Nutzer ausdrücklich genehmigt.** Die interaktive Lernseite wird nach den dokumentierten fachlichen Nachprüfungen und technischen Tests als Einzelfreigabe geführt. Die nachträglich gewünschte Rechtwinkel-Symbolik ist im Quelltext als Viertelkreisbogen mit Punkt umgesetzt; spätere relevante Änderungen werden weiterhin regressionsgeprüft.

## Einzelprüfung 2025 B 3 – Funktionen und Trapeze (14.11.2026)

**Quellenbasis:** Amtliche ISB-Prüfung Mathematik I, Haupttermin 2025, Aufgabenblatt B 3 und Lösungsmuster S. 3–4 von 6. Beide Lösungsseiten wurden als PDF-Screenshots gesichtet und mit dem interaktiven Koordinatensystem verglichen. **16 Punkte:** 4 + 2 + 2 + 2 + 4 + 2.

### Fachlicher Abgleich jeder Teilaufgabe

- **B 3.1 (4 P):** f₁(x)=−3·0,5^(x+4)+3, f₂(x)=2·0,5^(x+3)−4, horizontale Asymptote y=3. Zeichenfenster −5≤x≤4, −6≤y≤4. Beide Graphen haben Schnittpunkt (−4|0). Acht eigene Funktionswerte und die ursprünglichen Rechenwerte überprüft. Asymptote, f₁ und f₂ werden nacheinander eingezeichnet.
- **B 3.2 (2 P):** ∢BₙAₙDₙ=110° bedeutet AD-Richtung 20° gegen die positive x-Achse. D=(x+2cos20° | f₁(x)+2sin20°), C=(Dₓ | Dᵧ−8). Die Trapeze für x=−3 und x=1 werden in vier Konstruktionsphasen aufgebaut; feste Kanten nach Sichtprüfung wieder durchgezogen.
- **B 3.3 (2 P):** Wegen vertikaler CD und horizontaler AF gilt AF=2·cos20°≈1,88 LE. A₁F₁, F₁ und Rechtwinkelmarkierung werden erst beim passenden Lösungsschritt angezeigt.
- **B 3.4 (2 P):** AB=f₁−f₂=(−3,5·0,5^(x+3)+7) LE für x>−4, unabhängig numerisch an mehreren x-Werten überprüft.
- **B 3.5 (4 P):** Nach amtlicher Zwischenrundung beträgt der Überstand DF=0,68 LE, damit AB₃=6,64 LE und x≈0,28 (vor der Ergebnisrundung x≈0,281286). Mit geometrisch exakten Werten folgt dagegen AB₃≈6,631919 LE und x≈0,249261. Beide Werte werden ausdrücklich getrennt und erst nach der vollständigen Herleitung als auswählbare Ansichten angezeigt. Das amtliche Teilergebnis 6,64 LE wird beibehalten.
- **B 3.6 (2 P):** Wegen x>−4 und positivem Exponentialterm ist AB<7 LE. Mit der laut Aufgabenanweisung gerundeten konstanten Höhe 1,88 LE folgt A<½·(7+8)·1,88=14,1 FE. Die Schranke ist strikt und wird nicht erreicht.

### Zeichnung, Interaktion und dreifache technische Prüfung

- **Originalvergleich:** Alle sechs Aufgabenstellungen, Werte, Operatoren, Winkel, Längen, Koordinaten und Punktzahlen am Original abgeglichen. Farbiges SVG statt schwarzweißer Druckabbildung ist eine bewusste interaktive Ergänzung.
- **Didaktik:** Stufenweise Darstellung der Exponentialgraphen, festen Trapeze und Lotstrecken. Kein vorweggenommenes x=0,28 und kein vorweggenommener Rundungshinweis. Ausdrucke mathematisch in MathJax mit echten Bruchstrichen statt Rohtext.
- **Mobil:** Umstellbar zwischen vergrößerter horizontal verschiebbarer Grafik und Gesamtübersicht. Die beiden festen Trapeze sind nach dem visuellen Vergleich durchgezogen, nicht gestrichelt.
- **Dreifachnachweis:** [GitHub Actions 43603307919](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43603307919) auf Programmstand d1e0cbc0: 3 statische/mathematische Testdurchläufe und 42/42 echte Desktop-/Mobile-Chromium-Fälle bestanden. Der B3-Sondertest kontrolliert alle sechs Aufgaben, schrittweise Graphen/Trapeze/Lote, verspätete Ergebnisfreischaltung, Rückwärtsnavigation und mobile Darstellungsumschaltung.
- **Screenshotbelege:** GitHub-Actions-Artefakt-ID 14116824216 (ca. 27,6 MB). Die endgültigen Desktop- und Mobilbilder zu B3, den beiden Trapezen, den Lösungsschritten und der Gesamtübersicht wurden tatsächlich geöffnet und kontrolliert. Nach der Sichtprüfung wurde nur noch die Bezeichnung der nun durchgezogenen festen Trapeze und der erläuternde Text von B3.2 angepasst; keine Zahlenwerte oder Rechenfunktionen.

**Abgrenzung:** Drei Wiederholungen der technischen Testmatrix ersetzen nicht drei vollständig unabhängige menschliche Freigabedurchgänge aller neun Qualitätskategorien. **B 3 ist noch nicht ausdrücklich vom Nutzer freigegeben.**

## Einzelprüfung 2025 B 4 – Ebene Geometrie (14.11.2026)

**Primärquellen:** Originalprüfung Mathematik I Haupttermin 2025, Seite „Aufgabe B 4“, und amtliches Lösungsmuster Seiten 5 und 6 von 6. Die PDF-Seiten wurden einschließlich der Skizze tatsächlich bildlich geprüft. B 4.1–B 4.5: **3 + 4 + 3 + 2,5 + 2 = 14,5 Punkte**.

### Original- und Mathematikabgleich

- **B 4.0:** Gerade g: y=0,5x+5, Punkt A(−3|−2), Dₙ(x|0,5x+5), Parallelogramme ABₙCₙDₙ, Winkel ∢BₙADₙ=40° und Längenverhältnis ABₙ=0,5·ADₙ. Originale mathematische Vorgabe bleibt erhalten; die gesamte Ebene ist zulässig, der Slider beschränkt nur das dargestellte Fenster.
- **B 4.1 (3 P):** D₁(−4,5|2,75), D₂(2|6). Der Graph zeichnet g und erzeugt die beiden Parallelogramme in vier Lösungsstadien: zunächst nur g, danach D₁/D₂, dann B₁/B₂ mit Richtungswinkel 40° und schließlich beide vollständigen Parallelogramme einschließlich C₁/C₂. Kanten und Winkel sind geometrisch aus den ungerundeten trigonometrischen Werten berechnet. Das amtliche Zeichnungsfenster −6≤x≤7 und −2≤y≤9 bleibt erhalten.
- **B 4.2 (4 P):** Vektor ADₙ=(x+3 | 0,5x+7) als Spaltenvektor. Drehung um −40° und Streckung mit k=0,5 ergibt die Vektorkomponenten ABₙ. Amtlicher Koeffizientenweg rechnet mit gerundeten Zwischenwerten (cos40°≈0,77, sin40°≈0,64) und liefert ABₙ(x)=(0,55x+3,40 | −0,13x+1,74). Exakte Geometrie verwendet dagegen ungerundete trigonometrische Werte. Das Original enthält das gerundete Ergebnis ausdrücklich als gegebenes Teilergebnis.
- **B 4.3 (3 P):** Parallelität von D₃C₃ zur Geraden g erzwingt gemäß der *gerundeten* Vektorkoeffizienten die Steigungsbedingung (−0,13x+1,74)/(0,55x+3,40)=0,5; daraus x≈0,10 und D₃(0,10|5,05). Mit ungerundeter Geometrie folgt die exakte Parallellage bei x≈0,0437158. Diese Differenz wird nach Abschluss der Rechnung ausdrücklich erklärt; der amtliche Ergebniswert wird niemals durch den exakten ungeforderten Wert ersetzt.
- **B 4.4 (2,5 P):** Die kürzeste Verbindung von A zur Geraden g steht senkrecht auf g. Mit dem Richtungsvektor (1|0,5) gilt (x+3)·1+(0,5x+7)·0,5=0; daher x=−5,20 und D₀(−5,20|2,40). Die Zeichnung stellt den rechten Winkel als vom Nutzer geforderten Viertelkreisbogen mit Punkt auf der Winkelhalbierenden im halben Radius dar, nicht als Quadrat.
- **B 4.5 (2 P):** Für jedes Parallelogramm gilt Fₙ=0,5·|ADₙ|²·sin40°. Da 0,5·sin40°>0, fällt das Flächenminimum mit dem Längenminimum von ADₙ zusammen. Die Sonderlage D₀ wird erst nach der Begründung eingeblendet. Unabhängige Koordinatentests prüfen die Flächenformel und das konstante Seitenverhältnis bei zahlreichen Werten von x.

### Didaktik, Technik und Grenzfälle

- **Keine Vorwegnahmen:** Die fertige B4.1-Konstruktion wird nicht sofort gezeigt; B4.3-D₃ und der Rundungshinweis bleiben bis zum letzten Schritt verborgen; das B4.4-Minimum und die Rechtwinkelmarkierung werden erst nach dessen Rechnung sichtbar. Vor-/Zurück/Reset und der Aufgabenwechsel stellen die Sichtbarkeit passend ein.
- **Geometrie:** Für alle kontrollierten x-Werte sind die gegenüberliegenden Seiten der Parallelogramme paarweise parallel/gleich lang, |ABₙ|=0,5·|ADₙ|, ∢BₙADₙ=40° und Flächenformel exakt erfüllt. Überlagerte generische Parallelogramme in den ausgezeichneten Sonderlagen D₃ und D₀ wurden entfernt.
- **Mathematische Darstellung:** Vektoren sind mit Pfeil über der Buchstabenkombination geschrieben; Komponenten als echte vertikale Spaltenvektoren, Brüche als MathJax-Brüche, Malzeichen als Mittelpunkt, Dezimalkomma, Winkel mit dem vereinbarten ∢.
- **Mobil:** Die Zeichnung kann horizontal verschoben oder in eine Gesamtübersicht umgeschaltet werden. Automatisierte Tests kontrollieren beide mobilen Ansichten sowie die 5×3 schrittweisen Lösungen und B4.4-Rechtwinkelsymbolik.
- **Technische Kontrollrunden:** Drei vollständige Läufe der statischen Regressionstests sowie 42 Chromium-Kombinationen (7 Aufgaben × Desktop/Mobile × drei Wiederholungen) sind Voraussetzung für die technische Abnahme. Die zusätzlich aufgenommenen B4-Prüfungen testen genau die drei Sonderfälle, die Lösungssperren, die Vektoraufgabe und alle wesentlichen Zeichenphasen.

**Endgültiger technischer Prüfnachweis:** [GitHub Actions 43607182722](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43607182722) auf dem finalen B4-Code mit optimiertem Koordinatenausschnitt und schrittbezogen aktivierten Bedienelementen: **3/3 statische und mathematische Prüfrunden bestanden; 42/42 echte Chromium-Fälle bestanden** (je 7 Aufgaben in Desktop- und Mobilansicht, dreimal wiederholt). Die dedizierten B4-Testfälle kontrollieren alle fünf Teilaufgaben, beide Originalparallelogramme, Teilschritt- und Ergebnisfreigaben, 40°-Konstruktion, Rundung D₃, Minimalfall D₀, Rechtwinkelsymbol, Rückwärtsnavigation, Reglerzustände, Mobilscrollen und Gesamtübersicht. **Prüfbilder:** Actions-Artefakt `mathematik-2025-browserkontrolle`, ID `14118766895`, ca. 32,5 MB. Die finalen Bildschirmaufnahmen `r3-desktop-b4-originalkonstruktion.png`, `r3-desktop-b4-rundung.png`, `r3-desktop-b4-minimum.png` und `r3-mobile-b4-gesamt.png` wurden zusätzlich visuell gesichtet; keine weiteren grafischen Überlagerungen oder abgeschnittenen Koordinaten festgestellt. Die vierte Regressionsänderung betrifft nur die unten dokumentierten Textdateien und lässt die geprüfte Prüfungsseite unverändert.

**Abnahmegrenze:** B 4 wurde vom Nutzer ausdrücklich als Einzelseite freigegeben (14.11.2026). Die dreifache *automatisierte* Testmatrix ersetzt nicht drei unabhängig dokumentierte menschliche Durchgänge in allen neun Qualitätskategorien.

### Wiederaufnahme nach 2026-Notationsexkurs (14.11.2026)

- Die sieben eigenständigen 2025-Aufgabenseiten sind weiterhin auf GitHub vorhanden; alle sieben (A1, A2, A3, B1, B2, B3, B4) wurden vom Nutzer ausdrücklich einzeln genehmigt.
- Der neue verbindliche ISB-Standard unterscheidet geometrische Strecken `\\overline{AB}`, Streckenlängen `|\\overline{AB}|` und Vektoren `\\overrightarrow{AB}`. Die bestehende 2025-Geometrie wurde auf diese Pflichtkategorie quergelesen; der reproduzierbare statische Test wurde für A2, A3, B2, B3 und B4 erweitert.
- Der nach dieser Testerweiterung gestartete GitHub-Actions-Lauf ist **kein** Nachweis der noch offenen drei vollständigen Durchgänge über alle neun Kategorien. Die fachliche und grafische ISB-Endabnahme bleibt weiterhin notwendig.

### Teilabschluss: erneuter ISB-Abgleich und vollständige technische Regression (14.11.2026)

- **Originaltreue:** Die amtlichen Aufgabenblätter 2025 A1.0–A3.2 sowie B1.0–B1.3 einschließlich der relevanten Seitenzeichnungen erneut als PDF-Screenshots gelesen. A1.0 wurde wörtlich von der verkürzten Formulierung „Wohnungs- und einen kleinen Briefkastenschlüssel“ auf den amtlichen vollständigen Ausdruck „Wohnungsschlüssel und einen kleinen Briefkastenschlüssel“ korrigiert. In A2.3 und A2.4 wurde die ursprüngliche Aufgabenformel und Aufgabenformulierung in MathJax-konformer Schreibweise ergänzt. A3 und B1 ergaben beim erneuten Textvergleich keine weiteren entsprechenden Abweichungen.
- **Regressionssicherung:** Der statische Test verlangte zunächst den **alten, verkürzten** A1-Wortlaut und scheiterte deshalb nachvollziehbar. Der Test ist nun auf den tatsächlich amtlichen Wortlaut umgestellt. [Erfolgreicher abschließender Lauf 43616823042](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43616823042): **3/3 statische/mathematische Durchläufe und 42/42 Chromium-Testfälle bestanden (3 Wiederholungen × 7 Aufgaben × 2 Geräteansichten)**. Zusätzliche statische Streckenlängen- und Vektortests für 2025 bestanden ebenfalls.
- **Abgrenzung:** Die erfolgreiche technische Regression bestätigt die Funktionsfähigkeit der neuen A1/A2-Korrekturen, aber ist kein vollständiger dreimaliger unabhängiger Original-, Grafik-, didaktischer und Touch-Abgleich aller neun Qualitätskategorien des Jahrgangs. Für die noch ausstehenden Teile bleiben die Freigabesperren unten maßgeblich. B4 ist vom Nutzer ausdrücklich als Einzelseite freigegeben.

### Nutzerfreigabe B4 – 14.11.2026

Der Nutzer hat mit **„B4 passt“** die interaktive Lernseite **2025 B4** ausdrücklich freigegeben. Damit sind **alle sieben Einzelseiten des Jahrgangs 2025** vom Nutzer abgenommen. Die übergreifende dreifache Vollkontrolle sämtlicher neun Qualitätskategorien ist davon getrennt und weiterhin offen.

## Offene Freigabesperren, in dieser Reihenfolge lösen

1. **ISB-Originaltreue**: Für **alle 26 Teilaufgaben** Wortlaut, Zeichnung, Achsen, Operatoren, Punkteangaben, Graphen, Parameter- und Rundungsbedingungen Zeile für Zeile dokumentiert mit Original abgleichen. Besonders verkürzte Texte der eigenständigen Seiten dürfen nicht als „Originaltext“ deklariert werden, sofern sie nur sinngemäß sind.
2. **Fach- und Formelnachweis**: Jeden einzelnen dargestellten Umformungsschritt, Zahlenwert, Vektor- und Winkelterm inkl. gerundeter Zwischenwerte unabhängig dreimal mit dem ISB-Lösungsmuster und eigener Rechnung prüfen; MathJax-Formeln visuell, nicht nur als Quelltext.
3. **Originalgrafiken**: Alle sieben Seiten einschließlich fester Prüfungszeichnungen, Winkelbögen, Punktebezeichnungen, Maßstäbe, Schraffuren, Koordinatenbeziehungen und Spezial-/Grenzwerten gegen ISB-Grafiken prüfen. Screenshots gelten als Prüfmaterial, nicht als alleiniger mathematischer Korrektheitsnachweis.
4. **Didaktik**: Referenz 2026 B 3/B 4 verlangt, dass erklärende Grafik und Schrittwechsel fachlich synchronisiert werden. Diese Synchronisation ist nachzuarbeiten, wo die Grafik derzeit unabhängig vom angezeigten Lösungsschritt bleibt.
5. **3D-Echtgeräte-/Touch-Freigabe**: Kegel und Prisma durch Drehen, Pinch-Zoom und Draufsicht auf wirklichen Touchgeräten oder durch aufgezeichnete echte Gesten kontrollieren; Winkel, Sichtbarkeit und Beschriftung auch bei Grenzlagen validieren.
6. **Danach** je Kategorie **1–9**, je Teilaufgabe **A 1.1–B 4.5**, die drei vollständigen fachlichen und visuellen Kontrollrunden auf dem finalen Code protokollieren; jede anschließende Änderung löst die relevanten erneuten Prüfungen aus.

**Freigabeentscheidung: NOCH NICHT PRÄSENTATIONSREIF gemäß vereinbartem Goldstandard.** Die technischen Regressionstests sind erfolgreich und reproduzierbar; die ausstehenden Original-/Didaktik-/Grafiknachweise verhindern die Gesamtfreigabe.
