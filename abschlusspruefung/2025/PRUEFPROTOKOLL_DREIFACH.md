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

## Offene Freigabesperren, in dieser Reihenfolge lösen

1. **ISB-Originaltreue**: Für **alle 26 Teilaufgaben** Wortlaut, Zeichnung, Achsen, Operatoren, Punkteangaben, Graphen, Parameter- und Rundungsbedingungen Zeile für Zeile dokumentiert mit Original abgleichen. Besonders verkürzte Texte der eigenständigen Seiten dürfen nicht als „Originaltext“ deklariert werden, sofern sie nur sinngemäß sind.
2. **Fach- und Formelnachweis**: Jeden einzelnen dargestellten Umformungsschritt, Zahlenwert, Vektor- und Winkelterm inkl. gerundeter Zwischenwerte unabhängig dreimal mit dem ISB-Lösungsmuster und eigener Rechnung prüfen; MathJax-Formeln visuell, nicht nur als Quelltext.
3. **Originalgrafiken**: Alle sieben Seiten einschließlich fester Prüfungszeichnungen, Winkelbögen, Punktebezeichnungen, Maßstäbe, Schraffuren, Koordinatenbeziehungen und Spezial-/Grenzwerten gegen ISB-Grafiken prüfen. Screenshots gelten als Prüfmaterial, nicht als alleiniger mathematischer Korrektheitsnachweis.
4. **Didaktik**: Referenz 2026 B 3/B 4 verlangt, dass erklärende Grafik und Schrittwechsel fachlich synchronisiert werden. Diese Synchronisation ist nachzuarbeiten, wo die Grafik derzeit unabhängig vom angezeigten Lösungsschritt bleibt.
5. **3D-Echtgeräte-/Touch-Freigabe**: Kegel und Prisma durch Drehen, Pinch-Zoom und Draufsicht auf wirklichen Touchgeräten oder durch aufgezeichnete echte Gesten kontrollieren; Winkel, Sichtbarkeit und Beschriftung auch bei Grenzlagen validieren.
6. **Danach** je Kategorie **1–9**, je Teilaufgabe **A 1.1–B 4.5**, die drei vollständigen fachlichen und visuellen Kontrollrunden auf dem finalen Code protokollieren; jede anschließende Änderung löst die relevanten erneuten Prüfungen aus.

**Freigabeentscheidung: NOCH NICHT PRÄSENTATIONSREIF gemäß vereinbartem Goldstandard.** Die technischen Regressionstests sind erfolgreich und reproduzierbar; die ausstehenden Original-/Didaktik-/Grafiknachweise verhindern die Gesamtfreigabe.
