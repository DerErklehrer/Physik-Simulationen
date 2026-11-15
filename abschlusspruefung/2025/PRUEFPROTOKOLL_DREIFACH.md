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

- **Originaltreue:** Die amtlichen Aufgabenblätter 2025 A1.0–A3.2 sowie B1.0–B1.3 einschließlich der relevanten Seitenzeichnungen erneut als PDF-Screenshots gelesen. A1.0 wurde nach genauer Sichtung des gedruckten Originalbogens **endgültig auf „einen großen Wohnungs- und einen kleinen Briefkastenschlüssel“ korrigiert**. Die extrahierte PDF-Textfassung mit „Wohnungsschlüssel“ ist an dieser Stelle nicht maßgeblich. In A2.3 und A2.4 wurde die ursprüngliche Aufgabenformel und Aufgabenformulierung in MathJax-konformer Schreibweise ergänzt. A3 und B1 ergaben beim erneuten Textvergleich keine weiteren entsprechenden Abweichungen.
- **Regressionssicherung:** Der statische Test verlangte zunächst den **alten, verkürzten** A1-Wortlaut und scheiterte deshalb nachvollziehbar. Der Test ist nun auf den tatsächlich amtlichen Wortlaut umgestellt. [Erfolgreicher abschließender Lauf 43616823042](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43616823042): **3/3 statische/mathematische Durchläufe und 42/42 Chromium-Testfälle bestanden (3 Wiederholungen × 7 Aufgaben × 2 Geräteansichten)**. Zusätzliche statische Streckenlängen- und Vektortests für 2025 bestanden ebenfalls.
- **Abgrenzung:** Die erfolgreiche technische Regression bestätigt die Funktionsfähigkeit der neuen A1/A2-Korrekturen, aber ist kein vollständiger dreimaliger unabhängiger Original-, Grafik-, didaktischer und Touch-Abgleich aller neun Qualitätskategorien des Jahrgangs. Für die noch ausstehenden Teile bleiben die Freigabesperren unten maßgeblich. B4 ist vom Nutzer ausdrücklich als Einzelseite freigegeben.

### Nutzerfreigabe B4 – 14.11.2026

Der Nutzer hat mit **„B4 passt“** die interaktive Lernseite **2025 B4** ausdrücklich freigegeben. Damit sind **alle sieben Einzelseiten des Jahrgangs 2025** vom Nutzer abgenommen. Die übergreifende dreifache Vollkontrolle sämtlicher neun Qualitätskategorien ist davon getrennt und weiterhin offen.

### Korrektur zum Verlauf des A1-Quellenabgleichs

**Maßgeblich ist der visuell geprüfte Druckbogen.** Er enthält „Wohnungs- und einen kleinen Briefkastenschlüssel“. Eine Zwischenkorrektur aufgrund der fehlerhaften PDF-Texttranskription wurde am 14.11.2026 zurückgenommen. Der aktuelle Quellcode und der A1-Regressionstest verwenden den gedruckten Wortlaut. Frühere widersprechende Zwischenstände in der Git-Historie sind damit überholt.

## Offene Freigabesperren, in dieser Reihenfolge lösen

1. **ISB-Originaltreue**: Für **alle 26 Teilaufgaben** Wortlaut, Zeichnung, Achsen, Operatoren, Punkteangaben, Graphen, Parameter- und Rundungsbedingungen Zeile für Zeile dokumentiert mit Original abgleichen. Besonders verkürzte Texte der eigenständigen Seiten dürfen nicht als „Originaltext“ deklariert werden, sofern sie nur sinngemäß sind.
2. **Fach- und Formelnachweis**: Jeden einzelnen dargestellten Umformungsschritt, Zahlenwert, Vektor- und Winkelterm inkl. gerundeter Zwischenwerte unabhängig dreimal mit dem ISB-Lösungsmuster und eigener Rechnung prüfen; MathJax-Formeln visuell, nicht nur als Quelltext.
3. **Originalgrafiken**: Alle sieben Seiten einschließlich fester Prüfungszeichnungen, Winkelbögen, Punktebezeichnungen, Maßstäbe, Schraffuren, Koordinatenbeziehungen und Spezial-/Grenzwerten gegen ISB-Grafiken prüfen. Screenshots gelten als Prüfmaterial, nicht als alleiniger mathematischer Korrektheitsnachweis.
4. **Didaktik**: Referenz 2026 B 3/B 4 verlangt, dass erklärende Grafik und Schrittwechsel fachlich synchronisiert werden. Diese Synchronisation ist nachzuarbeiten, wo die Grafik derzeit unabhängig vom angezeigten Lösungsschritt bleibt.
5. **3D-Echtgeräte-/Touch-Freigabe**: Kegel und Prisma durch Drehen, Pinch-Zoom und Draufsicht auf wirklichen Touchgeräten oder durch aufgezeichnete echte Gesten kontrollieren; Winkel, Sichtbarkeit und Beschriftung auch bei Grenzlagen validieren.
6. **Danach** je Kategorie **1–9**, je Teilaufgabe **A 1.1–B 4.5**, die drei vollständigen fachlichen und visuellen Kontrollrunden auf dem finalen Code protokollieren; jede anschließende Änderung löst die relevanten erneuten Prüfungen aus.

**Freigabeentscheidung: NOCH NICHT PRÄSENTATIONSREIF gemäß vereinbartem Goldstandard.** Die technischen Regressionstests sind erfolgreich und reproduzierbar; die ausstehenden Original-/Didaktik-/Grafiknachweise verhindern die Gesamtfreigabe.

## Fortsetzung Gesamtqualitätskontrolle – Arbeitsschritt A1 (15.11.2026)

**Prüfumfang:** A1.0, A1.1 und A1.2; Beginn der erneuten systematischen Gesamtprüfung. Ausgangscommit `b362ec8730203c71316c624213bd470fc7982604`, Korrekturcommits `13b55d0341064f8f84be553eb34dfc34c5acfc4c` (zugängliche Beschreibung), `48d9085db74cd62955d1ec9ce497017b6e0807c1` (Diagrammlayout) und `2ace7d9ffa5d91ae2841059f4ddb20c5cfec0e89` (Screenshotnachweise). Die sieben bereits erteilten Einzelfreigaben bleiben dokumentiert. Dieser Arbeitsschritt ersetzt keine vollständige Prüfung des Jahrgangs.

| Kategorie | Tatsächlich ausgeführte Prüfung und Befund |
|---|---|
| 1 – Originaltreue | Originalprüfung, PDF-Seite 1, erneut als gerenderte Seite gelesen. Beide Absätze der Ausgangssituation, Namen Martina/Stephan, fünf Nachbarn, zehn Schlüssel, zufällige getrennte Auswahl, beide Fragen und 1 P/1,5 P stimmen mit der Seite überein. Gedruckt steht „Wohnungs- und … Briefkastenschlüssel“. Bekannte, vom Nutzer akzeptierte Abweichung: Gebäudefotografie fehlt; Druckraster ist auf der Lernseite nicht nachgebildet. |
| 2 – Fachliche Lösungen | Amtliches Lösungsmuster, PDF-Seite 1, erneut visuell gelesen. Eigene Rechnung: 25 gleichwahrscheinliche Schlüsselpaare; genau ein Paar passt beidseitig, acht Paare passen genau einseitig. Daher A1.1 = 1/25 = 4 %, A1.2 = 8/25 = 32 %. Alle sechs Erklärungsschritte gelesen: Unabhängigkeit, Produktregel, Gegenereignisse und Addition disjunkter Fälle korrekt. Vier Endpfade summieren sich zu 25/25. |
| 3 – Schreibweisen | Sämtliche A1-Lösungsstrings und zehn SVG-Brüche geprüft: vertikale Brüche, Malpunkt, Dezimalkomma bei Punkten, Prozentangaben korrekt. Strecken/Vektoren/Winkel/physikalische Einheiten nicht anwendbar. Die tatsächliche Formelanzeige ist gesondert durch den Browserlauf zu belegen. |
| 4 – Grafik | Baumstruktur aus zwei unabhängigen Auswahlen: sechs Äste mit 1/5 bzw. 4/5 und vier Endpfade korrekt zugeordnet. Eigenes ergänzendes Lerndiagramm; die amtliche Aufgabe enthält an dieser Stelle ein Gebäudefoto, kein Baumdiagramm. Visuelle Browserabnahme separat dokumentieren. |
| 5 – 3D | Nicht anwendbar: reines Zufallsexperiment ohne Raumobjekt. |
| 6 – Abhängigkeiten | Alle sechs Lösungsschritte und Sichtbarkeitsbedingungen im Quelltext nachvollzogen: A1.1 zeigt 1/25 erst bei Produktregel; A1.2 zeigt 4/25 je Pfad ab dem zugehörigen Rechenschritt. Wechsel und Reset setzen Schritt 0. Keine Parameterregler und keine geometrischen Grenzwerte. |
| 7 – Didaktik | Lösung unterscheidet zwei disjunkte Fälle und erläutert die Rechenregeln. **Fehler gefunden und behoben:** Der statische zugängliche SVG-Name verriet bislang sämtliche Endwahrscheinlichkeiten bereits am Anfang. Durch eine Beschreibung ohne Lösungswerte ersetzt; Browser-Regression um den Schutz vor dieser Vorwegnahme ergänzt. Sichtbare Rechnungen bleiben schrittweise. |
| 8 – Technik | Lokal 377 statische/mathematische Assertions sowie 287 Quellen-/Strukturchecks für alle 26 Teilaufgaben bestanden; Syntaxprüfung des geänderten Browsertests und Whitespaceprüfung bestanden. Lokaler Chromium-Start durch Prozess-/Socket-Beschränkung verhindert, daher ausdrücklich kein lokaler Browsererfolg. Browserregression läuft stattdessen in GitHub Actions. |
| 9 – Konsistenz | Jahrgang, Aufgabennummern, taschenrechnerfreier Teil und Übersicht-/A2-Verweise stimmen. Keine PDF-Direktlinks in A1. Korrektur betrifft nur zugängliche Diagrammbeschreibung und Regressionstest. |

**Amtliche Vergleichsquellen:** ISB Mathematik I Haupttermin 2025, `2025_mi_ht.pdf` Seite 1 sowie `2025_mi_ht_l.pdf` Seite 1; unter `https://www.isb.bayern.de/fileadmin/user_upload/Realschule/Leistungserhebungen/Abschlusspruefung/Mathematik/2025/`. Diese Quellenangabe ist Prüfmaterial im Repository, kein zusätzlicher Dokumentlink auf der öffentlichen Lernseite.

**Kontrollgrenze:** Fach-/Textprüfung A1 in diesem Arbeitsschritt einmal neu ausgeführt. Drei Wiederholungen der automatisierten Browsermatrix sind keine drei unabhängigen fachlichen Vollprüfungen. Weitere vollständige Fach-/Sichtrunden und die übrigen 24 Teilaufgaben bleiben offen. Nächster Arbeitsschritt: A2.

### Sichtprüfung und anschließende Korrekturen

Beim tatsächlichen Öffnen der Desktop- und Mobil-Screenshots aus Lauf [43694552904](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43694552904) wurden trotz erfolgreicher technischer Tests zwei Mängel erkannt: Astlinien verliefen durch Bruchbeschriftungen bzw. Knotenbezeichnungen; in der mobilen Gesamtverkleinerung war das Diagramm zu klein. Die betroffenen Texte wurden abgerückt. Mobil bleibt das SVG mindestens 560 CSS-Pixel breit und kann innerhalb seines eigenen, per Tastatur erreichbaren Bereichs seitlich verschoben werden; ein sichtbarer Hinweis erklärt die Bedienung. Der Regressionstest kontrolliert die Erreichbarkeit der rechten Baumhälfte und sichert sie als Screenshot.

Jeder der sechs A1-Lösungsschritte wird im finalen Browserlauf in beiden Geräteansichten und drei technischen Wiederholungen als Screenshot gesichert. Die Screenshots dienen der Sichtprüfung gerenderter Formeln und ersetzen nicht die eigene Rechnung.

### Abschließender technischer Nachweis und Sichtbefund dieses Arbeitsschritts

- Final geprüfter Code: `5ad5884e32b2f652c7a067ef7c5cd0edde55192a` (zusätzlich oberer SVG-Randabstand korrigiert).
- [GitHub-Actions-Lauf 43695283572](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43695283572): **success**. Drei statische/mathematische Durchläufe sowie **42/42 Browserfälle** (7 Seiten × 2 Viewports × 3 technische Wiederholungen) auf dem finalen Code erfolgreich. Kein neuer Browserfehler gemeldet.
- Die sechs A1-Lösungsschritte wurden aus den Desktop-Screenshots des vorausgehenden erfolgreichen Laufs `43695032179` tatsächlich geöffnet und visuell gelesen; zusätzlich mobile Schlussrechnung und rechte Baumhälfte. Echte vertikale Brüche, Gegenereignisbalken, Malpunkte, Prozentwerte und schrittweise Endwahrscheinlichkeiten sind korrekt gesetzt. Keine neue Überlagerung in den gesichteten Zuständen.
- Auf dem **finalen** Code nochmals `r3-desktop-a1-teil2-schritt4.png` und `r3-mobile-a1-rechts.png` geöffnet: oberer Bruch vollständig innerhalb der Zeichenfläche, Astzahlen frei von Linien; rechte Diagrammhälfte lesbar und erreichbar. Der finale Lauf sichert sämtliche A1-Schritte erneut; Artefakt **14154262576**.
- Kein physisches Mobilgerät und kein tatsächlicher Bildschirmleser verwendet. Der Nachweis zur zugänglichen Beschreibung beruht auf DOM-/Browserprüfung; Touchgerät ist Chromium-Emulation. Nicht ausgeführte Prüfungen bleiben ausdrücklich offen.
- **Ergebnis A1:** Original-/Fachabgleich einmal erneut ausgeführt; die gefundenen Beschriftungs-, Mobil- und Vorwegnahmefehler sind korrigiert und regressionsgeprüft. Kein Anspruch auf drei vollständige unabhängige Fach-/Sichtdurchgänge. Die Gesamtfreigabe 2025 bleibt offen. **Weiter mit A2.**

## Fortsetzung Gesamtqualitätskontrolle – A2 und A3 (15.11.2026)

**Umfang:** A2.0–A2.4 und A3.0–A3.2, zusammen sechs Teilaufgaben. Ausgangspunkt nach der A1-Prüfung: `a59cff5e686a7b5dcc421e1bf25e5e5e4cf62c0f`. Die neue Bearbeitung ist ein erneuter fachlicher und visueller Arbeitsschritt; sie ist ausdrücklich keine Behauptung dreier vollständiger unabhängiger Freigaberunden.

### Original- und Fachvergleich pro Teilaufgabe

Primärquellen erneut als **gerenderte amtliche PDF-Seiten** gelesen: ISB `2025_mi_ht.pdf`, Seiten 2–3 (A2/A3 einschließlich Zeichnungen, aller Intervalloptionen, Formeln und Punktwerte); `2025_mi_ht_l.pdf`, Seiten 1–2. Die ursprünglichen Nutzerfreigaben bleiben bestehen.

| Teilaufgabe | Originalangaben/Operator und Punkte | Unabhängig nachvollzogenes Ergebnis und Lösungsweg |
|---|---|---|
| A2.1 | Dreieck AB₂C₂ für φ = 75° ergänzen; 1 P. Ausgangsfigur AB₁C₁ bei 40°, gleichschenklig mit Basis ABₙ, ACₙ = 4 cm. | Beide Schenkel 4 cm; AB₂ = 8·cos75° cm ≈ 2,07055 cm. Konstruktion: 75°-Strahl von A, C₂ im Abstand 4 cm, zweiter gleich langer Schenkel zur Achse. Originaldreieck bleibt zusätzlich erhalten. |
| A2.2 | Abstand a = x cm mit x ∈ ℝ; sechs originale Antwortintervalle; passendes Intervall ankreuzen; 1 P. | a = 4·sinφ cm, φ ∈ ]0°;90°[; somit x ∈ ]0;4[. Beide Grenzen ausgeschlossen. Numerische Reglergrenzen 1°/89° sind lediglich die diskrete Lernsteuerung. |
| A2.3 | Rotation um Gerade ABₙ; O(φ) = 32·π·sinφ cm² zeigen; 2,5 P. | Radius a = 4·sinφ cm, zwei äußere Mantelflächen mit s = 4 cm; O = 2·π·a·s. Die gemeinsame Grundkreisfläche liegt innen und zählt nicht zur Oberfläche. Jeder der vier Lösungsschritte nachgerechnet und mit dem amtlichen Muster verglichen. |
| A2.4 | Oberfläche 16·π cm² für Rotation von AB₃C₃; zugehöriges Winkelmaß bestimmen; 1,5 P. | 16π = 32π·sinφ; sinφ = 1/2; wegen offenem spitzwinkligem Definitionsbereich eindeutig φ = 30°, L = {30°}. Ergebnisvorgabe und Geometrie erst nach dem letzten Lösungsschritt auf 30° setzen. |
| A3.1 | Rechtwinkliges Dreieck ABC, Hypotenuse AB, Schwerpunkt S, Gerade BS trifft AC in M; M als Mittelpunkt ohne Messen begründen; 1 P. | S liegt auf jeder Seitenhalbierenden. Die Gerade durch B und S trifft AC in ihrem Mittelpunkt M. Vollständige dreistufige Erläuterung; keine metrische Messung als Begründung. |
| A3.2 | AC = 8√3 cm, BC = 4 cm; Winkel ∢CBM rechnerisch bestimmen; 2 P. | MC = AC/2 = 4√3 cm; BCM rechtwinklig bei C; tan(∢CBM) = MC/BC = √3; ∢CBM = 60°. Alle vier Lösungsschritte einschließlich Einheitenkürzung nachvollzogen. |

**Geometrische Eigenkontrolle:** A2 verwendet A = (0|0), C = (−4·sinφ|4·cosφ), B = (0|8·cosφ). Für 1°, 30°, 40°, 75° und 89° wurden beide 4-cm-Schenkel, Basiswinkel, Radius im offenen Intervall und 4-cm-Kegelmantellinien numerisch abgesichert. Im 3D-Modell gilt r = 4·sinφ, h = 4·cosφ je Kegel; keine Deckflächen an der innenliegenden gemeinsamen Kreisfläche. A3 besitzt im Maßstab 36 px/cm BC = 144 px und AC = 288√3 px. M = (335,585|92), S ≈ (418,723|140); BS:SM = 2:1 und Winkel CBM = 60°.

### Befunde und Korrekturen nach den neun Kategorien

| Kategorie | A2 | A3 |
|---|---|---|
| 1 – Originaltreue | Angaben und alle vier Aufgaben Wort für Wort mit gedrucktem Original abgeglichen, einschließlich sechs Intervalloptionen, Oberfläche, offenem φ-Intervall und 6 Gesamtpunkten. Originaltext fachlich unverändert; dynamische Ergänzungen klar als Lernhilfen beschrieben. | Angaben und beide Aufgaben mit Originalseite verglichen: Hypotenuse, Schwerpunkt, Schnittpunkt, beide Längen, Operatoren, Winkelnotation und 3 Gesamtpunkte stimmen. |
| 2 – Fachlichkeit | Alle zwölf Erklärungsschritte gegen ISB und eigene Rechnung kontrolliert; Abstand sprachlich als **Länge des Lotes** präzisiert. | Alle sieben Erklärungsschritte gegen ISB und eigene Rechnung kontrolliert; Schwerpunkt-/Mittelpunkteigenschaft und Tangens korrekt. |
| 3 – Schreibweisen | Vertikale Brüche, Längenbeträge, Einheiten cm/cm², Winkel, Dezimalkomma, Malpunkt und Lösungsmenge kontrolliert. Strecke AC₂ in erklärenden Texten ausdrücklich mit Überstrich gesetzt. | Winkelquadrat durch **Viertelkreisbogen mit Punkt auf der Winkelhalbierenden bei halbem Radius** ersetzt. Längenbeträge, vertikale Brüche, Winkel ∢CBM, Einheiten und Wurzeln kontrolliert. |
| 4 – Grafik | Startwinkel für A2.1 von 40° auf 75° korrigiert, festes Originaldreieck bei 40° bleibt bestehen. Schritt-/Reset-Übergänge stellen den verlangten Konstruktionswinkel wieder her. Aktueller magentafarbener Winkel wird auch außerhalb A2.1 mit Bogen und Wert dargestellt. Radius/Lot und 4-cm-Mantellinie passend zur Erklärung ergänzt. Für A2.4 erhalten die Punkte den Index 3. | Mittelpunktmarkierung auf die tatsächliche x-Koordinate 335,585 gesetzt; 60°-Beschriftung von der Seitenhalbierenden abgerückt. Vorgegebener Schwerpunkt S bleibt beim Ausblenden der Hilfslinie sichtbar. SVG-Seitenverhältnisse und Schwerpunktlage unverändert korrekt. |
| 5 – 3D | 2D/3D-Umschaltung, freie Drehung, orthografische Draufsicht, Reset und mobile Gesten werden im Browser geprüft. Radius als echte Linie und Mantellinie schrittweise ergänzt; größere Beschriftungen. In Draufsicht gemeinsame Achsenbeschriftung „A / Bₙ“ statt übereinanderliegender Spitzenlabels; unsichtbar projizierte Mantellängenbeschriftung dort ausgeblendet. Mobile Standardansicht hält auch breite Kegel samt Labels im Ausschnitt. Reset stellt nun **auch Zoom** wieder her; Winkeländerungen erhalten Zoom und Blickrichtung. | Nicht anwendbar: ebenes Dreieck, kein Raumobjekt. |
| 6 – Abhängigkeiten | Konstruktion, Intervallauswertung, Radius, Mantellinie, Oberflächenanzeige, Aufgabenwechsel, Ergebnis 30°, Reset sowie Winkel 1°/75°/89° in 2D und 3D als Prüfzustände vorgesehen. Die mathematischen Intervalle wurden nicht auf die Reglerstufen eingeschränkt. | Halbierungsmarkierungen erst nach Begründung, 60° erst im Schlussschritt. Zurücksetzen sperrt die Winkelanzeige erneut. Schwerpunkt bleibt eine unveränderliche Originalangabe. |
| 7 – Didaktik | Grafischer Aufbau von Radius und Mantellinie in 2D **und 3D** an die Lösungsschritte gekoppelt; Oberflächenwert erst nach Herleitung sichtbar. | Vorzeitige Aussage „Mittelpunkt M“ aus der zugänglichen Diagrammbeschreibung entfernt; dort steht nun „Schnittpunkt M“. |
| 8 – Technik/Mobil | Mobile 2D-Zeichnung in mindestens 560 px Breite scrollbar; Hinweis und per Tastatur fokussierbarer Bereich. Alle zwölf Schritte, Formeln und 3D-Zustände als Browserprüfungen/Screenshots vorgesehen; Zwei-Finger-Zoom und Ein-Finger-Drehen in Touch-Emulation. | Mobile Zeichnung ebenfalls mindestens 560 px breit und scrollbar; rechter Teil erreichbar. Sieben Lösungsschritte und Zusatzmarkierungen werden im Browser geprüft und als Screenshots gesichert. |
| 9 – Konsistenz | Vor-/Zurückverweise A1/A3 ergänzt bzw. geprüft; Jahrgang, Aufgabennummern, Intervalloptionen und Punkte korrekt; keine PDF-Direktlinks auf Lernseite. Das gemeinsam mit B2 verwendete 3D-Modul wird im gesamten Browser-Regressionslauf geprüft. | Verweise A2/B1, Jahrgang, Aufgabenkennzeichnung und Punkte korrekt; keine PDF-Direktlinks auf Lernseite. |

**Prüfumfang klar abgegrenzt:** Fachlicher/gedruckter Originalabgleich in diesem Arbeitsschritt einmal vollständig neu ausgeführt. Automatisierte Wiederholungen gelten ausschließlich als technische Regression, nicht als drei unabhängige vollständige Fach- und Sichtprüfungen. Physische Touchgeräte und tatsächliche Bildschirmleser wurden nicht verwendet; zugängliche Namen werden im DOM kontrolliert.

### Tatsächliche Sichtprüfung und zusätzliche Funde

Nach dem erfolgreichen Voll-Regressionslauf [43696845276](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43696845276) auf `f172dcc74a23b2727f0df6f7bc3d1438628b23e0` wurden die Screenshots wirklich geöffnet: sämtliche zwölf A2- und sieben A3-Lösungsschritte als Desktop-Kontaktbögen, mobile Intervallauswertung, Oberflächenherleitung, 30°-Schlussrechnung, A3-Halbseitenrechnung, Tangens und 60°-Schlussrechnung sowie A3-rechte Zeichnungshälfte und A2-Draufsicht bei 89°.

Dabei wurden **weitere sichtbare Fehler trotz bestandener Funktionstests** erkannt und korrigiert:
- A2: Winkelwert und Radiusbezeichnung lagen teilweise auf Linien des fest eingeblendeten Originaldreiecks; ihre Positionen wurden außerhalb der betroffenen Linienzüge gesetzt.
- A2, 3D: Transparente Mantelflächen schwächten die Beschriftungsfarbe. Beschriftungen werden jetzt ausdrücklich nach den Flächen und Hilfslinien gezeichnet; Hilfslinien bleiben kontrastreich sichtbar.
- A2: Die Messanzeigen verwendeten Gleichheitszeichen für gerundete Werte. Jetzt steht **≈**, insbesondere bei a ≈ 4,00 cm nahe 90°; der exakte Radius ist weiterhin kleiner als 4 cm.
- A3: Die Halbseitenrechnung und die Tangensrechnung waren mobil nur horizontal scrollbar vollständig lesbar. Beide Umformungen sind jetzt in drei echte Zeilen aufgeteilt. Der Browser prüft bei allen A3-Schritten zusätzlich, dass die Lösung kein seitliches Überlaufen mehr benötigt.

Mathematische Inhalte, Operatoren und Punktzahlen blieben bei diesen Lesbarkeitskorrekturen unverändert. Die Sichtbefunde lösen eine erneute Regression auf dem endgültigen Code aus.

### Regression und letzte Sichtkontrolle nach den Umbrüchen

- Lauf [43697728275](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43697728275) auf `1b18be429e842266204fbac2d31ef95d48d2ea73`: **success**. Job-Log ausgelesen: **42 erfolgreiche Browserfälle**, je drei Durchläufe mit **404 statischen/mathematischen** und **287 Quellen-/Strukturchecks**. Zusätzliche Prüfung aller A3-Lösungsschritte auf seitliches Überlaufen bestanden.
- Die finalen mobilen A3-Halbseiten- und Tangensrechnungen aus diesem Lauf wurden erneut tatsächlich geöffnet: alle drei Zeilen stehen vollständig im Lösungsfeld, mit echten Brüchen und unveränderten mathematischen Ergebnissen.
- A2-Sichtprüfung bestätigt freie 2D-Winkel-/Radiusbeschriftung, Näherungszeichen und sichtbare magentafarbene 3D-Hilfslinien. In den 3D-Textgrafiken blieb ein zusätzlicher Kontrastfehler sichtbar: Canvas-Texturen hatten keine sRGB-Kennzeichnung; dadurch wurden dunkle Schriftfarben aufgehellt. Die A2-Texttexturen erhalten nun ausdrücklich `THREE.SRGBColorSpace`. Letzter Codecommit hierfür: `d6d988333b1b5223dd12bc293759519b14d33e8f`.

### Ergebnis auf dem endgültigen Code

- Finaler Code: `d6d988333b1b5223dd12bc293759519b14d33e8f`.
- [Abschließender Actions-Lauf 43698225763](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43698225763): **success**. Job-Log geprüft: **42/42 erfolgreiche Browserfälle**, dreimal **404 statische/mathematische** und **287 Quellen-/Strukturprüfungen**. Alle A2/A3-Lösungsschritte, Regler, Sperren und Reset-Zustände erfolgreich; 3D-Drehen und Zwei-Finger-Zoom in mobiler Emulation erfolgreich. Die gemeinsam verwendete B2-3D-Darstellung lief in der Regression mit.
- Finales Actions-Artefakt **14155412022**. Daraus `r3-mobile-a2-top-phi89.png` und `r3-mobile-a2-3d-mantel.png` tatsächlich geöffnet: Beschriftungen nun dunkel und klar erkennbar, Radius/Mantellinie sichtbar, keine neue Textüberlagerung in diesen gesichteten Zuständen. Textfarbe zusätzlich im Achsenlabel-Pixelausschnitt kontrolliert: dunkle Schriftpixel statt des vorherigen aufgehellten Grau-Blaus.
- Die zuvor gesichteten neunzehn Fach-/Lösungsschritte und A3-Umbrüche sind inhaltlich unverändert; der finale Lauf sichert sie erneut vollständig als Screenshots. Nach dem A3-Umbruch wurden beide kritischen mobilen Rechnungen tatsächlich geöffnet und vollständig gelesen.
- **Status:** A2 und A3 in diesem Arbeitsschritt fachlich abgeglichen, sichtbare Mängel korrigiert und technisch regressionsgeprüft. Die bereits bestehenden Nutzer-Einzelfreigaben bleiben erhalten. Dies ist **keine Gesamtfreigabe und keine Behauptung dreier vollständiger unabhängiger Neun-Kategorien-Durchgänge**.
- **Nächste Aufgaben:** B1 und B2.

## Fortsetzung Gesamtqualitätskontrolle – gemeinsamer Block B1/B2 (15.11.2026)

**Umfang:** B1.0–B1.3 und B2.0–B2.4, sieben Teilaufgaben mit zehn B1- und vierzehn B2-Lösungsschritten. Ausgangsstand `bc9de61b5f87f69fbe74594eb4b861c51993cbb9`. Erneuter fachlicher Originalabgleich und technische Regression werden getrennt dokumentiert; keine vorzeitige Jahrgangs-Gesamtfreigabe.

### Amtliche Vergleichsbasis und Einzelbefunde

**Originalprüfung:** ISB `2025_mi_ht.pdf`, PDF-Seiten 6–7 (B1/B2). **Amtliches Lösungsmuster:** `2025_mi_ht_l.pdf`, Seiten 2–3. Alle vier Seiten erneut als gerenderte PDF-Seiten gelesen. B2 zusätzlich mit 170 dpi gerendert und die Quaderzeichnung vergrößert visuell geprüft.

| Teilaufgabe | Originalangaben, Operatoren, Punkte | Fachlicher Eigenabgleich |
|---|---|---|
| B1.1 | Vier Farben r/b/g/w; 40 %, 30 %, p %, weiß zunächst unbeschriftet. Vier originale Termoptionen; weißen Anteil ankreuzen; 1 P. | Weiß: (30−p) %. Wahrscheinlichkeit 1−(70+p)/100, drittes Kästchen. Prozentanteil und Wahrscheinlichkeit zwischen 0 und 1 sauber unterschieden. |
| B1.2 | Erste zufällig ausgegebene Schachtel grün und Apfel mit 10 %; Anteil p % berechnen; 1,5 P. | p/100 · 50/100 = 10/100; p = 20, also 20 %. Pfadregel und drei Umformungsschritte mit ISB abgeglichen. |
| B1.3 | Rote oder blaue Schachtel mit einer Süßigkeit, die nicht Birne ist; Vermutung „mehr als 50 %“ beurteilen; 2,5 P. | Vier disjunkte Pfade rA/rM/bA/bM: 20 % + 12 % + 15 % + 9 % = 56 %. 56 % > 50 %, Vermutung trifft zu. Ergebnis unabhängig von p. |
| B2.1 | Quader: AB = 4 cm, AD = 10 cm, AE = 3 cm, q = 1/2, ω = 45°; AB auf Schrägbildachse. Pₙ ∈ AD, Qₙ ∈ BC, PₙQₙ ∥ AB. Prisma AP₁EBQ₁F für AP₁ = 4 cm einzeichnen; 1 P. | Schrägbildlänge von AP₁: 4 cm · 1/2 = 2 cm. P₁ auf AD, Parallele zu AB trifft BC in Q₁, zwei parallele Dreiecke A–P₁–E und B–Q₁–F zu Prisma verbinden. |
| B2.2 | Winkel ∢AEPₙ = φ, 0° < φ ≤ ∢AED; Volumenformel 18·tanφ cm³ zeigen; 2 P. | G = 1/2·APₙ·AE, tanφ = APₙ/(3 cm), APₙ = 3·tanφ cm. Prismenhöhe AB = 4 cm, somit V = 18·tanφ cm³. Alle vier Lösungsschritte und Einheiten geprüft. |
| B2.3 | Volumen 50 cm³; zugehöriges Winkelmaß berechnen; 1,5 P. | tanφ = 50/18 = 25/9; φ = arctan(25/9) ≈ 70,20°. Zulässig, denn ∢AED ≈ 73,30°. Exakte Grafiklage AP₂ = 25/3 cm; 6·(25/3) = 50 cm³. |
| B2.4 | Existenz eines Prismas mit **mehr als** halbem Quadervolumen begründet entscheiden; 2 P. | Quader 120 cm³. Da APₙ ≤ 10 cm gilt V ≤ 1/2·10·3·4 cm³ = 60 cm³. Gleichheit bei P₀ = D und Q₀ = C. Kein Prisma mit mehr als der Hälfte. |

**Punkte:** B1 = 5 P, B2 = 6,5 P; mit amtlichen Einzelwerten abgeglichen. Originalformulierungen und Aufgabenreihenfolge blieben erhalten. Zusätzliche Zwischenrechnungen und Lernzeichnungen sind keine Änderungen der Prüfungsaufgabe.

### Prüfung und Korrekturen nach den neun Kategorien

| Kategorie | B1 | B2 |
|---|---|---|
| 1 – Originaltreue | B1.0 und alle drei Fragen einschließlich vier Antwortmöglichkeiten, zwölf Baumenden, Prozentzahlen, Namen und Punkte gegen Original verglichen. | B2.0–B2.4 samt Zahlen, Rundungsvorgabe, Schrägbildparametern, Winkelintervall und Punkten verglichen. **Originalzeichnung korrigiert:** Die zuvor ergänzte Raumdiagonale AG gehört **nicht** zum ISB-Original und wurde entfernt. Die vergrößerte Originalansicht zeigt zwölf Quaderkanten, keine Raumdiagonale. Frühere gegenteilige Protokoll-/Testangaben sind damit ausdrücklich überholt; die falsche statische Assertion wurde berichtigt. |
| 2 – Fachlichkeit | Zehn Erklärungsschritte nachgerechnet. Für p = 0,01; 0,5; 15; 20; 29,99; 30 summieren sich zwölf nichtnegative Pfadwahrscheinlichkeiten zu 1. Die vier Wunschpfade ergeben stets 0,56. | Vierzehn Erklärungsschritte mit ISB und eigener Rechnung abgeglichen. Geometrie, Volumen und Winkel zusätzlich für AP = 0,1; 4; 25/3; 10 cm geprüft. V = 6·AP in cm³; Maximum 60 cm³. |
| 3 – Schreibweisen | Vertikale Brüche, Prozentwerte und Malpunkte kontrolliert. Längere Restanteils- und Wahrscheinlichkeitsrechnung mehrzeilig gesetzt. | Längen mit Betragsstrichen/Überstrichen, Winkel ∢AEPₙ, Einheiten, Brüche und Dezimalkomma kontrolliert. Gerundete Längen-, Winkel- und Volumenanzeigen verwenden **≈**. Quadervolumen und Maximalvolumen in zwei echten Rechenzeilen dargestellt. |
| 4 – Grafik | Astzahlen größer und mit weißen Hintergründen frei von Linien gesetzt; Kreisbezeichnungen vergrößert. Grüne Apfel- und rote/blaue Nicht-Birnen-Pfade werden einschließlich erster Baumstufe hervorgehoben. | Quadermaßstab 40 px/cm, verkürzte AD-Projektion 200 px bei 45°, unverzerrte AB-/AE-Projektionen 160/120 px. Zusätzliche AG-Diagonale entfernt. Punktbezeichnungen von Kanten abgerückt; P/Q mit Punktmarkern. **Zusätzliche unverzerrte Dreiecksgrundfläche** im Maßstab 20 px/cm ergänzt, damit φ und der rechte Winkel fachlich unverzerrt nachvollziehbar sind; Viertelkreisbogen mit Punkt statt Winkelquadrat. |
| 5 – 3D | Nicht anwendbar: Baumdiagramm ohne Raumobjekt. | Prisma mathematisch als Extrusion von APE um 4 cm nach BQF; sämtliche fünf Flächen und neun Kanten geprüft. Mobile Kamera umfasst Quader samt Beschriftungen und ist um die tatsächliche Mitte zentriert. Beschriftungen dunkel im korrekten sRGB-Farbraum. Draufsicht zeigt gemeinsame Projektionsnamen A/E, B/F, D/H, C/G statt überdruckter Einzelnamen; P/Q in eigenen beschrifteten Reihen mit Bezugslinien. Gleichheits-/Projektionsnamen in Grenzlage eindeutig. Drehung, Pinch-Zoom, Draufsicht und Reset werden im Browser geprüft. |
| 6 – Abhängigkeiten | Weißer Restanteil erscheint mit seinem Rechenschritt; vier Einzelpfadwerte mit den Produkten, Summe 56 % erst mit der Addition. Regler nun bis **p = 30**: aus Nichtnegativität folgt 0 < p ≤ 30; p=30 lässt den weißen Anteil 0 zu. Die Reglerstufen sind Beispielwerte, kein Ersatz für den mathematischen Definitionsbereich. | Maximalprisma schon beim Schritt „P₀ = D“ in Geometrie sichtbar, Volumen erst beim zugehörigen Rechenschritt. Vorwärts/Zurück/Reset stellen passende vorherige Lage wieder her. Freie Erkundung bekommt Index n statt fester Lösungsindizes 1/2/0; exakter 50-cm³-Hinweis nur in der tatsächlich exakten Lage. Grenzgleichheiten D=P₀/C=Q₀ nur bei **exakt** AP=10; AP=9,99999999 wird gesondert regressionsgeprüft. |
| 7 – Didaktik | Farbpfade und Produkte mit Erklärung synchronisiert; keine vorweggenommene Summe. Prozent und Wahrscheinlichkeit verständlich getrennt. | Konstruktion weiterhin in drei Phasen. Grundfläche und rechter Winkel mit G-Erklärung, φ-Bogen mit Tangensschritt gekoppelt. Hinweis unterscheidet verzerrte Schrägbildwinkel von der unverzerrten Zusatzfigur. |
| 8 – Technik/Mobil | Lesbarer horizontal verschiebbarer Baum und Gesamtübersicht erhalten; alle zehn Schritte als Prüf-Screenshots. Lösungen auf seitliches Abschneiden geprüft. | Schrägbild mit Zusatzgrundfläche mobil in mindestens 560 px Breite scrollbar; 3D bleibt separat bedienbar. Alle vierzehn Schritte als Screenshots; Navigation, Sonderlagen, Grenzwerte, Ein-Finger-Drehen und Zwei-Finger-Zoom in Emulation Bestandteil der Tests. |
| 9 – Konsistenz | Verweise A3/B2, Jahrgang, Punkte und Aufgabenkennzeichnungen geprüft; keine öffentlichen PDF-Direktlinks. | Verweise B1/B3 ergänzt/geprüft; keine PDF-Direktlinks. Das gemeinsame 3D-Modul wird zusammen mit A2 und dem gesamten Jahrgang regressionsgeprüft. |

**Abgrenzung:** Dieser Block umfasst einen erneuten fachlichen/gedruckten Originalabgleich aller sieben Teilaufgaben und technische Wiederholungsprüfungen. Echte physische Mobilgeräte und tatsächliche Bildschirmleser wurden nicht verwendet. Die drei vollständigen unabhängigen Neun-Kategorien-Durchgänge des gesamten Jahrgangs bleiben gesondert offen.

### Tatsächlich ausgeführte Sichtprüfung

Aus dem erfolgreichen Browserlauf [43699815456](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43699815456) auf `5e89a1f688118050842d6bfadf874da992370cc0` wurden **alle 24 Lösungsschritte** als Desktop-Kontaktbögen geöffnet und inhaltlich gelesen. Zusätzlich gesichtet: vollständiger B1-Baum mit vier Wunschpfaden, B2-Quader mit unverzerrter Dreiecksgrundfläche, mobile 3D-Normalansichten bei AP=0,1 und 25/3 cm sowie Draufsichten bei AP=0,1 und 10 cm.

- Alle Brüche, Prozentwerte, Umformungen, Einheiten und Ergebnisse sind im gesichteten Formelbild korrekt.
- Die zusätzliche falsche AG-Diagonale ist verschwunden; die Grundfläche zeigt einen echten rechten Winkel bei A und den Winkel φ bei E.
- B2-Draufsicht umfasst jetzt den ganzen Quader, mit getrennten Reihen für P/Q und gemeinsamen Projektionsbezeichnungen der vertikal übereinanderliegenden Punkte.
- **Weitere Sichtkorrektur:** Die Bezeichnung F wurde noch von der Kante DC geschnitten. Sie ist nun links unterhalb des Punktes F kantenfrei gesetzt. Die Streckenbenennung AD in einem Erklärungsschritt wurde mit Überstrich vervollständigt.
- Separat abgesicherte Nachbesserungen: feste Lösungsindizes nur in den zugehörigen Sonderlagen, kein irreführender exakter 50-cm³-Hinweis bei manueller Abweichung, und Grenzgleichheiten ausschließlich bei genau 10 cm. Diese Änderungen werden auf dem finalen Code erneut technisch geprüft.

### Abschließender Nachweis des gemeinsamen Blocks

- Endgültiger Code: `7c2cc04150efc9353fc814f6fc0127f34fb586fe`.
- [Abschließender GitHub-Actions-Lauf 43700849077](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43700849077): **success**. Job-Log tatsächlich ausgelesen: **42/42 erfolgreiche Browserfälle** (7 Seiten × 2 Viewports × 3 technische Wiederholungen), dreimal **439 statische/mathematische Prüfungen** und **287 Quellen-/Strukturprüfungen**. Keine gemeldeten Browser-Laufzeitfehler; Formeln gesetzt, B1/B2-Rechnungen ohne seitliches Abschneiden.
- Erfolgreich getestet wurden insbesondere p=30, exakte 50-cm³-Lage, freie Änderung danach, Grenzwert 10 cm und 9,99999999 cm unmittelbar davor, Vorwärts/Zurück/Reset, 3D-Drehen und Zwei-Finger-Zoom in Touch-Emulation. A2 und die übrigen Seiten wurden wegen des gemeinsamen 3D-Moduls mitgeprüft.
- Finales Actions-Artefakt **14156890701**. Daraus tatsächlich geöffnet: B2-Quader/Grundfläche mit φ und abgerücktem F, mobile 3D-Draufsicht bei 10 cm, mobile B1.1-Schlussrechnung, sämtliche vier Produkte in B1.3 sowie mobile B2.4-Maximalvolumenrechnung. Die geänderten Punktbezeichnungen bleiben sichtbar, die Draufsicht vollständig im Ausschnitt, die Formeln vollständig im Lösungsfeld.
- Zusätzlich wurden die B2-SVG-Zustände bei AP=4 und AP=7 cm direkt aus dem aktuellen Zeichencode erzeugt und gerendert: weiße Hintergründe halten Punktbezeichnungen auch bei vorbeilaufenden veränderlichen Kanten lesbar. Diese ergänzende SVG-Prüfung ist kein Ersatz für den ebenfalls erfolgreichen Browserlauf.
- **Blockstatus:** B1 und B2 fachlich mit den Originalen abgeglichen, alle 24 Lösungsschritte gesichtet, Korrekturen gespeichert und final technisch regressionsgeprüft. Bestehende Nutzer-Einzelfreigaben bleiben erhalten.
- **Keine Gesamtfreigabe 2025:** Die vollständige dreifache unabhängige Prüfung aller neun Kategorien für den gesamten Jahrgang bleibt offen; technische Wiederholungen werden dafür nicht als Ersatz gewertet.
- **Nächster Block:** B3 und B4.



## Fortsetzung Gesamtqualitätskontrolle – B3 vor B4 (15.11.2026)

**Umfang B3:** sechs Teilaufgaben, 22 Erklärungsschritte, 16 P. Reihenfolge des Nutzers: B3 zuerst vollständig als Arbeitsschritt bearbeiten, B4 anschließend. Ausgangspunkt `eaebede725b4b0b956af68d886328d84f2939e76`.

**Originalquellen erneut visuell gelesen:** ISB `2025_mi_ht.pdf`, PDF-Seiten 8–9 (B3.0–B3.6); `2025_mi_ht_l.pdf`, Seiten 3–4 (Graphen, Konstruktionen und alle B3-Lösungen).

| Aufgabe | Original-/Punkteabgleich | Unabhängig nachvollzogenes Ergebnis |
|---|---|---|
| B3.1 | Beide Funktionsgleichungen, x/y ∈ ℝ, Rundung auf zwei Dezimalstellen, Asymptote f₁, beide Graphen für x ∈ [−5;4], Zeichenfenster y ∈ [−6;4], 1 cm/LE; 4 P. | f₁ = −3·0,5^(x+4)+3 nähert sich 3 von unten, Asymptote y=3. f₂ fällt gegen −4. Wertetabellen und Schnittpunkt (−4|0) stimmen. Alle angegebenen Tabellenwerte erneut nachgerechnet. |
| B3.2 | Punkte auf f₁/f₂ mit gleicher Abszisse x > −4, Winkel 110°, AD=2 LE, CD=8 LE und AB ∥ CD; beide Trapeze für x=−3 und x=1 zeichnen; 2 P. | AD bildet 20° zur positiven x-Richtung. D=(x+2·cos20°|f₁(x)+2·sin20°), C=(D_x|D_y−8). Für x=−3: A_y=1,5, B_y=−2; für x=1: A_y=2,90625, B_y=−3,875. Beide Schenkel-/Basisrichtungen und 110° mit Skalarprodukt/Konstruktion geprüft. |
| B3.3 | Lotfußpunkte Fₙ auf CD, A₁F₁ zeichnen, Länge gerundet 1,88 LE zeigen; 2 P. | AF = 2·cos20° LE ≈ 1,87938524 LE, auf zwei Dezimalstellen 1,88 LE. F hat D-Abszisse und A-Ordinate; AF horizontal, CD vertikal. Rechter Winkel bei F, 20° bei A. |
| B3.4 | Längenfunktion AB(x)=(−3,5·0,5^(x+3)+7) LE bestätigen; 2 P. | Für x>−4 ist f₁>f₂; f₁−f₂=−3·0,5^(x+4)−2·0,5^(x+3)+7. Mit 0,5^(x+4)=0,5·0,5^(x+3) folgt der Koeffizient −1,5−2=−3,5. Jede Vorzeichenumformung kontrolliert. |
| B3.5 | Gleichschenkliges Trapez A₃B₃C₃D₃; Länge AB und zugehöriges x; vorgegebenes gerundetes Teilergebnis 6,64 LE; 4 P. | Amtlicher Zwischenrundungsweg: DF≈0,68 LE, AB≈8−2·0,68=6,64 LE. Die Gleichung mit 6,64 liefert x≈0,28128611, also 0,28. Ohne Zwischenrundung: AB=8−4·sin20°≈6,63191943 LE und x≈0,2492614083. Beide Wege ausdrücklich getrennt; x>−4 gilt jeweils. |
| B3.6 | Begründung A(x)<14,1 FE für alle Trapeze; 2 P. | Exakte Höhe h=2·cos20° LE<1,88 LE. Zudem 0<AB(x)<7 LE für x>−4. Daher A=(AB+8 LE)·h/2 < (7+8)/2·1,88 FE =14,1 FE. Die exakte asymptotische Flächengrenze ist 15·cos20°≈14,09538931 FE; somit liegt auch sie strikt unter 14,1 FE. |

### Neun-Kategorien-Prüfung dieses Arbeitsschritts

1. **Originaltreue:** Sämtliche B3-Fragen/Angaben, Operatoren, Reihenfolge, Zahlen, Intervalle, Teilergebnis und Punktwerte gegen den gedruckten Bogen geprüft. Originaltext bleibt erhalten; die lange B3.4-Aufgabenformel erhält lediglich einen mathematisch äquivalenten Zeilenumbruch.
2. **Fachliche Richtigkeit:** Alle 22 Erklärungsschritte nachvollzogen und mit ISB verglichen. **Korrektur B3.6:** Die bisherige Musterlösung setzte die gerundete Höhe 1,88 LE in eine exakte Flächen-Gleichung ein. Nun bleibt die Höhe zunächst exakt; 1,88 wird erst als echte obere Schranke verwendet. Das amtlich verlangte Ergebnis 14,1 FE bleibt unverändert.
3. **Schreibweisen:** Längenbeträge, Einheiten LE/FE, Gradzeichen, Winkel ∢, Wurzeln/Potenzen, echte Brüche und Dezimalkomma kontrolliert. Rechnungen B3.3–B3.6 mehrzeilig gesetzt, statt lange Umformungen als unteilbare Inline-Formeln auszugeben. Gerundete Werte und gerundete Lösungsmenge werden ausdrücklich als solche bezeichnet.
4. **Grafik:** Zeichenfenster und gleiche x/y-Skalierung kontrolliert. A/B-Verbindung erscheint bereits beim Festlegen der Punkte, danach AD, CD, abschließend BC. 110°-Bögen nun an beiden Originaltrapezen; beim Lot zusätzlich der 20°-Winkel für den Kosinusschritt. Rechte-Winkel-Markierung bleibt Viertelkreis mit Punkt auf halbem Radius. Achsenpfeile ergänzt und Ursprung O von der y-Achse abgerückt. Punkt-/Winkelbeschriftungen erhalten weiße Hintergründe; A-/B-Labels schneiden ihre Punktmarker nicht.
5. **3D:** Nicht anwendbar; B3 behandelt Funktionsgraphen und ebene Trapeze, keine räumlichen Objekte.
6. **Abhängigkeiten:** Die zwei Vorwahltasten von B3.2 schalten nun tatsächlich auf die jeweilige Originalkonstruktion. Reset stellt beide Originaltrapeze bzw. die zum aktuellen Aufgabenteil gehörenden Anfangseinstellungen wieder her. B3.5-Anzeigen unterscheiden amtliche Zwischenrundung, geometrische Sonderlage und freie Erkundung. Ein frei verändertes Beispiel trägt Index n statt des festen Lösungsindex 3. Reglerbereich [−3;2,1] ist nur das vollständig sichtbare Darstellungsfenster; mathematisch bleibt x>−4.
7. **Didaktik:** Tabellen, Konstruktionsphasen, Lot, Winkel und Rechnung aufeinander abgestimmt. Die Zwischenrundung ist kein versteckter Wechsel des geometrischen Modells: Referenzwerte und geometrisch berechnete Koordinaten werden verständlich unterschieden. Keine vorzeitige Einblendung der B3.5-Endergebnisse oder Flächenschranke.
8. **Technik/Mobil:** Alle 22 Lösungsschritte werden im Browser auf gesetzte Formeln, Bedienbarkeit und seitliches Abschneiden geprüft und als Screenshots gesichert. Mobile Wischansicht und Gesamtübersicht bleiben erhalten. Neue Regressionen kontrollieren Einzelauswahl der Trapeze, Reset, 20°-Bogen und korrekte Erkundungsanzeige nach Wahl der geometrischen Sonderlage.
9. **Veröffentlichung/Konsistenz:** Verweise B2/B4, Jahrgang, Aufgabennummern und 16 P geprüft; keine öffentlichen PDF-Direktlinks. Der gesamte Jahrgang wird technisch mitgeprüft.

**Fachlicher Eigencheck zusätzlich:** 449 statische/mathematische Prüfungen auf dem lokalen Code bestanden, ferner 287 Quellen-/Strukturchecks. Die Flächenschranke wurde für x nahe −4, −3, 0,28, 2,1, 10 und 100 sowie über die exakte asymptotische Grenze abgesichert. Tabellen, Gleichschenkligkeitsbedingung und beide Rundungswege sind geprüft.

**Prüfgrenze:** Ein erneuter vollständiger Fach-/Originalabgleich für B3 in diesem Arbeitsschritt; technische Wiederholungen ersetzen keine drei unabhängigen vollständigen Neun-Kategorien-Durchgänge. B4 wird erst anschließend bearbeitet.


**Abschließende Browserbelege:** Code `b1c318ae69081dcb801577b2acbf535c61ce530c`; [Actions-Lauf 43702609173](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43702609173) erfolgreich. Je drei Wiederholungen mit 449 mathematischen/statischen und 287 Quellen-/Strukturprüfungen; 42 Browserfälle für alle sieben Aufgaben auf Desktop und Mobil. Artefakt `14156743208`. Alle 22 B3-Desktop-Schrittaufnahmen sowie die mobilen Schlussrechnungen B3.4–B3.6 visuell gelesen; Formeln vollständig und ohne seitliches Abschneiden. Konstruktion/Lot zusätzlich als gerenderte Original-SVG kontrolliert. B3-Arbeitsschritt abgeschlossen; keine Freigabe der gesamten Dreifachkontrolle 2025.


## Fortsetzung Gesamtqualitätskontrolle – B4 nach B3 (15.11.2026)

**Umfang:** fünf Teilaufgaben, 19 Erklärungsschritte, 14,5 P. B3 wurde zuvor separat abgeschlossen und protokolliert. Ausgangspunkt `e7287c70a38ae00fea6e050c8b4121d8b61afe5d`.

**Originalquellen erneut visuell gelesen:** ISB `2025_mi_ht.pdf`, PDF-Seite 10 (B4.0–B4.5), und `2025_mi_ht_l.pdf`, Seiten 5–6 (Konstruktion, Pfeilkoordinaten, Sonderfall, Abstand und Fläche). Die gedruckten Seiten wurden lokal gerendert und vollständig gelesen.

| Aufgabe | Original-/Punkteabgleich | Fachliche Kontrolle |
|---|---|---|
| B4.1 | g:y=0,5x+5, A(−3|−2), D auf g, Winkel 40°, AB=0,5AD; x=−4,5 und x=2; Zeichenfenster x∈[−6;7], y∈[−2;9], 1 cm/LE; 3 P. | D₁(−4,5|2,75), D₂(2|6). AB entsteht durch Drehung von AD um −40° und Halbierung, C=B+D−A. Beide Parallelogramme stimmen mit der Orientierung des Originals überein. |
| B4.2 | Gesucht sind die Koordinaten der Pfeile AB in Abhängigkeit von x; vorgegebener Ergebnisvektor (0,55x+3,40; −0,13x+1,74); 4 P. | AD=(x+3;0,5x+7). Drehmatrix und beide Komponenten separat kontrolliert. Mit cos40°≈0,77 und sin40°≈0,64 ergeben sich die amtlichen gedrehten Komponenten (1,09x+6,79; −0,26x+3,47); erst dann halbieren und erneut runden. Die Lernlösung erklärt diese Zwischenstufe nun ausdrücklich und markiert gerundete Ausdrücke mit ≈. |
| B4.3 | D₃C₃ liegt auf g; Koordinaten D₃ berechnen; 3 P. | Aus dem gerundeten Vektor: (−0,13x+1,74)/(0,55x+3,40)=0,5; 0,04=0,405x; x≈0,10, y≈5,05. Der Nenner ist bei der Lösung ungleich null. Ohne Zwischenrundung gilt geometrisch x≈0,0437158074 und y≈5,0218579037. Beide Wege sind getrennt bezeichnet und anwählbar; der amtliche Ergebniswert bleibt unverändert. |
| B4.4 | AD₀ besitzt minimale Länge; x-Koordinate D₀ bestimmen; 2,5 P. | AD₀⊥g, Skalarprodukt mit (1;0,5) ergibt 1,25x+6,5=0; x=−5,2 und D₀(−5,2|2,4). Unabhängiger globaler Nachweis: AD²=1,25(x+5,2)²+24,2. |
| B4.5 | Minimalen Flächeninhalt bei AB₀C₀D₀ begründen; 2 P. | F=AB·AD·sin40°=0,5·AD²·sin40°. Positiver konstanter Faktor, daher genau dasselbe eindeutige Minimum. Unabhängige Kontrollfläche F_min=12,1·sin40°≈7,7777300772 FE (zusätzlicher Prüfwert, nicht vorzeitig in der Seite eingeblendet). |

### Neun-Kategorien-Prüfung dieses Arbeitsschritts

1. **Originaltreue:** Ausgangsangaben und alle fünf Fragen, Operatoren, Punkte, Zeichenfenster, Teil-/Endergebnisse und Reihenfolge mit dem gedruckten Original abgeglichen. Originalfragen bleiben erhalten.
2. **Fachliche Richtigkeit:** Alle 19 Lösungsschritte einschließlich Drehorientierung, Halbierung, Steigungsquotient, zulässiger Lösung, Senkrechtbedingung und Flächenargument nachvollzogen. Der amtliche Rundungsweg wird nicht mit der trigonometrisch exakten Geometrie gleichgesetzt.
3. **Schreibweisen:** Vektorpfeile gegenüber Längenbeträgen unterschieden, Dezimalkomma, ∢, Gradzeichen, echte Brüche und gerundete Näherungsausdrücke kontrolliert. Matrixprodukt in Drehmatrix und Vektoranwendung geteilt; Komponenten, Gleichungsumformungen und Flächenformel mehrzeilig für schmale Displays gesetzt.
4. **Grafik:** Beide Originalkonstruktionen stimmen in Lage und Orientierung. Beide erhalten 40°-Bögen. Achsenpfeile und abgerücktes O ergänzt; Zeichenfenster rechts erweitert, damit das x-Achsenlabel vollständig bleibt. Punkt-/Winkeltexte mit weißem Hintergrund verhindern überlagernde Kanten. Der rechte Winkel bei D₀ bleibt Viertelkreisbogen mit Punkt auf halbem Radius der Winkelhalbierenden. Originalkonstruktion, Minimum und exakte Sonderlage zusätzlich direkt aus der tatsächlichen draw()-Funktion als SVG gerendert und visuell kontrolliert.
5. **3D:** Nicht anwendbar; ausschließlich ebene Geometrie.
6. **Abhängigkeiten:** Vier Konstruktionsstufen bleiben erhalten. Sonderlagen erscheinen erst nach dem zugehörigen Lösungsweg. Zusätzliche Taste setzt die ungerundete D₃-Lage mit voller Genauigkeit; freie Reglerbewegung entfernt deren Sonderfallbezeichnung. Amtliche Zwischenrundung und exakte Parallelität werden in der Messanzeige verschieden erläutert. Direktes Aktivieren des Minimum-Kontrollkästchens synchronisiert Regler und Messwerte; der Minimum-Messwert trägt Index 0. Reset/Zurückblättern stellen Ausgangslagen wieder her.
7. **Didaktik:** Erst Punkte, dann Winkel und halbe Seite, danach Parallelogramm. Die Drehmatrix wird in lesbaren Teilschritten verwendet. Der Rundungseffekt ist anhand zweier ausdrücklich bezeichneter Voreinstellungen sichtbar. Kein zusätzlicher Endergebniswert vor dem zugehörigen Schritt.
8. **Technik/Mobil:** Alle 19 Rechnungsschritte werden im Browser auf gesetztes MathJax und seitliches Abschneiden geprüft; vollständige Screenshots beider Formate im dritten Durchlauf. Neue Regression prüft die ungerundete Sonderlage direkt am tatsächlichen Koordinatenmodell und die Rückkehr zur freien Erkundung. Bestehende Wischansicht, Gesamtübersicht, Einzelauswahl, Reset und Viertelkreis-Markierung werden erneut geprüft.
9. **Veröffentlichung/Konsistenz:** Navigation zu B3/Jahrgang/Übersicht, 14,5 P, gleiche Zahlen-/Farblogik und keine öffentlichen PDF-Direktlinks. Regression umfasst den gesamten Haupttermin mit sieben Aufgaben.

**Automatische Eigenchecks:** 469 mathematische/statische Prüfungen und 287 Quellen-/Strukturprüfungen lokal bestanden. Neu sind 20 Kontrollen zu amtlichen gedrehten Komponenten, quadratischer Ergänzung bei x=−100,−6,−5,2,0,0,1,2,100, globalem Minimum, exakter Parallelität und minimaler Fläche.

**Prüfgrenze:** Ein erneuter vollständiger Fach-/Originalabgleich für B4 in diesem Arbeitsschritt. Technische Wiederholungen sind keine drei unabhängigen vollständigen Neun-Kategorien-Durchgänge; die Gesamtfreigabe der Dreifachkontrolle 2025 bleibt offen.

**Abschließender Browsernachweis:** Seitenänderung `d89d9ece209041e86678c47d25d445ed2933068f`; abschließender Teststand `61f61fc9912d9bbcad528a10d29d50f3cf1e859f`. [Actions-Lauf 43704483401](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43704483401) erfolgreich: 469 mathematische/statische und 287 Quellen-/Strukturchecks je dreimal, 42 erfolgreiche Browserfälle (sieben Aufgaben × Desktop/Mobil × drei Wiederholungen), keine offenen Browserfehler. Prüfartefakt `14158256948`. Veröffentlichung des Seitenstands erfolgreich.

**Sichtprüfung:** Alle 19 B4-Lösungsschritte auf Desktop und Mobil anhand der Bildschirmaufnahmen gelesen (38 Ansichten); vollständig gesetzte, lesbare Formeln ohne horizontales Abschneiden. Die Lösungsausschnitte im finalen erfolgreichen Artefakt sind pixelgleich mit den zuvor gelesenen Aufnahmen. Die finalen Diagramme für Originalkonstruktion, Minimum und geometrisch exakte Sonderlage zusätzlich visuell geprüft; mobile Vektor-Endrechnung und mobile Sonderlagen-Bedienung einzeln in voller Auflösung gelesen.

**Behobener Testfehler:** Der erste Gesamtlauf 43703722817 meldete sechs Fehler ausschließlich deshalb, weil die neue B4-Prüfung eines Bedienelements versehentlich zusätzlich im B3-Testblock stand. B4 selbst bestand bereits alle sechs Browserfälle. Die doppelte Zuordnung wurde im Testskript entfernt; der vollständige neue Lauf besteht mit 42/42 Fällen. Keine Abschwächung einer Prüfung und keine Änderung der bereits geprüften B3-Seite.

**Ergebnis:** B3 und anschließend B4 als angeforderte Einzelarbeitsschritte abgeschlossen und veröffentlicht. Die darüber hinausgehende vollständige Dreifachfreigabe des Jahrgangs 2025 wird hiermit nicht behauptet.
