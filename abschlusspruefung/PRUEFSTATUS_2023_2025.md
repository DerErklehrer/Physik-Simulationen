# Prüfstatus Mathematik I — Haupttermine 2023, 2024, 2025

**Status: NICHT ZUR ENDGÜLTIGEN FREIGABE GEEIGNET.**

Maßstab: `QUALITAETSSTANDARD.md`, LehrplanPLUS Bayern Realschule Mathematik I, amtliche ISB-Haupttermine der betreffenden Jahre und vorläufige interaktive Referenz 2026.

## Bestand und Abgleich
| Jahrgang | Vorhandener Webstand | Vergleich mit Referenz 2026 | Freigabe |
|---|---|---|---|
| 2025 | Eine HTML-Sammelseite mit Teilaufgaben, MathJax, dynamischen SVG-Skizzen und gestuften Lösungen | Eigene Aufgabenansichten wie 2026 B 3/B 4 fehlen; erste umschaltbare 3D-Ansichten bei A 2 (Rotationskörper) und B 2 (Quader/Prisma) implementiert, jedoch noch nicht auf Desktop/Mobilgerät visuell getestet; noch kein vollständiger Wort-für-Wort-Abgleich aller Teilaufgaben | offen |
| 2024 | Eine kurze HTML-Sammelseite mit stark zusammengefassten Aufgaben/Lösungen und SVG | Kein originalgetreuer Aufgabentext, keine vollständigen schülernahen Musterlösungen, kein MathJax-Vollformat, keine 2D/3D-Umschaltung bei räumlichen Aufgaben A 1/B 4 | offen |
| 2023 | Eine kurze HTML-Sammelseite mit stark zusammengefassten Aufgaben/Lösungen und SVG | Kein originalgetreuer Aufgabentext, keine vollständigen schülernahen Musterlösungen, kein MathJax-Vollformat, keine 2D/3D-Umschaltung bei räumlicher Aufgabe B 4 | offen |

## Gesicherte Korrektur
- **2024 B 3.3:** In der Website stand `u(x) = 2 · √(9,54x² − 27x + 324) LE`. Das ist falsch. Das amtliche Lösungsmuster ergibt `u(x) = √(9,54x² − 27x + 324) LE`. Der zusätzliche Faktor 2 wurde in der vorhandenen HTML-Datei entfernt.
- Alle drei Jahrgänge zeigen jetzt einen sichtbaren Hinweis, dass die fachliche und grafische Gesamtkontrolle noch nicht abgeschlossen ist.

## Nachfolgende Bearbeitung (Arbeitsstand 13.11.2026)
- **2025 A 2:** Umschaltbare 2D-/3D-Darstellung des aus der Rotation entstehenden Doppelkegels implementiert; orthografische Kamera, OrbitControls, Draufsicht und Winkelkopplung vorhanden (Datei `2025/haupttermin/raumgeometrie3d.js`).
- **2025 B 2:** Umschaltbare 2D-/3D-Darstellung des dreiseitigen Prismas `APₙEBQₙF` im Referenzquader implementiert; Länge `APₙ` mit bestehendem Regler gekoppelt.
- **2025 B 4:** Amtliches ISB-Ergebnis zur Vektorkoordinate `(0,55x+3,40 | −0,13x+1,74)` und zu `D₃(0,10 | 5,05)` überprüft; **die offiziellen gerundeten Koeffizienten wurden bewusst beibehalten**.
- **2024 B 3.3–B 3.5:** Schülernähere Herleitung der Umfangsfunktion, Berechnung von `u(2,65)=17,87 LE` und des Minimums `u_min=17,46 LE` bei `x=1,42` ergänzt; Werte mit dem ISB-Lösungsmuster abgeglichen.
- **2023 B 3.4:** Vorherige Werte `6,46 LE` und `13,98 FE` gemäß amtlichem ISB-Lösungsmuster zu `6,47 LE` und `14,01 FE` korrigiert und Rechenschritt ergänzt.
- **Prüfgrenze:** Die vorgenannten Änderungen sind **noch nicht im echten Browser auf Desktop und Mobilgerät ausgeführt/visuell abgenommen**. Sie sind daher keine bestandenen Kontrollrunden. Die amtliche Wort-für-Wort-Kontrolle aller Teilaufgaben sowie die übrigen geforderten 3D-Objekte stehen weiterhin aus.

## Neue Einzelseiten 2025: A 1 und A 2 (13.11.2026)
- `2025/haupttermin/a1.html`: vollständige textliche Ausgangssituation ohne lizenzierte Originalfotografie, beide Original-Teilaufgaben mit BE, erklärendes Baumdiagramm und separate schülernahe Lösungsschritte. Fachliche Ergebnisse mit amtlicher ISB-Lösung abgeglichen: `1/25` und `8/25`.
- `2025/haupttermin/a2.html`: Ausgangsdaten, vier Original-Teilaufgaben einschließlich der Intervallauswahl, dynamische 2D-Dreieckszeichnung, Regler-Voreinstellungen 40°/75°/30°, 2D-/3D-Umschalter mit orthografischer Kamera, frei drehbarer Doppelkegel, Draufsicht und gestufte Lösungen. Fachliche Kernergebnisse mit amtlicher ISB-Lösung abgeglichen: `x ∈ ]0;4[`, `O(φ)=32πsinφ cm²`, `φ=30°`.
- Beide Seiten sind in `2025/haupttermin/index.html` verlinkt; vorhandene Sammelseite bleibt als vorläufiger Altbestand bestehen.
- Statische Nachkontrolle: GitHub-Dateien erneut gelesen, HTML-Einbindung/Verlinkungen geprüft, JavaScript-Inline-Skripte **syntaxgeprüft** (ohne Syntaxfehler).
- **Noch offen:** echte Browserausführung, MathJax-Rendering in Desktop/Mobile, visuelle Prüfung der 2D-/3D-Ansichten und der Abhängigkeiten sowie ein unabhängiger zweiter/dritter vollständiger Prüfdurchgang über alle neun Qualitätskategorien. Der Bildervergleich A1 entfällt für die lizenzierte Fotografie; ein fachlicher Ersatz darf die Originalangaben nicht verändern. Weder A1 noch A2 gilt damit bereits als endgültig freigegeben.

## Fortsetzung: 2025 A 3 und B 1
- `2025/haupttermin/a3.html`: eigenständige Aufgaben A 3.0–A 3.2, maßstäblich nach Seitenverhältnis gezeichnete rechtwinklige Dreiecksskizze, zuschaltbare Erläuterungen zum Mittelpunkt und Winkel, schrittweise Schwerpunkt- und Tangenslösung. Amtliche Ergebnisse: M ist Mittelpunkt von AC; ∠CBM = 60°.
- `2025/haupttermin/b1.html`: eigenständige Aufgaben B 1.0–B 1.3, dynamisches Baumdiagramm für vier Farben und drei Geschmacksrichtungen, Parameter p im positiven zulässigen Bereich 0 < p ≤ 30, und vollständige Lösungen mit den amtlichen Ergebnissen `1-(70+p)/100`, `p=20 %`, `P(Wunsch)=56 %`. 
- Die Einzelseiten sind in der 2025er Sammelübersicht verlinkt. Inline-JavaScript beider Seiten und Navigationsskript wurden syntaktisch ohne Fehler geprüft, gespeichert und erneut aus GitHub gelesen.
- **Keine Endfreigabe:** visuelle Browserprüfung, mobile Funktion, unabhängiger Originalwortlaut- und Diagrammvergleich sowie alle drei vollständigen Kontrollrunden über sämtliche neun Kategorien stehen weiterhin aus. Insbesondere gilt die statische Syntaxprüfung nicht als Funktionsprüfung im Browser.

## Fortsetzung 2025: B 2 und grafische Nachkontrolle A 3
- **B 2.1–B 2.4:** eigenständige `2025/haupttermin/b2.html` erstellt. Originaltext und fachliche Ergebnisse anhand der amtlichen ISB-Haupttermin-Unterlagen geprüft; schrittweise Lösungen zu Konstruktion, `V(φ)=18·tanφ cm³`, `φ≈70,20°` und maximal halbem Quadervolumen.
- Dynamisches Schrägbild des Quaders mit den Punkten Pₙ und Qₙ, Regler für `APₙ`, gekoppelter 3D-Ansicht des Prismas und sinnvoller Grenzlage `APₙ=10 cm`. Die bereits vorhandene Moduldatei `raumgeometrie3d.js` wird wiederverwendet. B 2 in der 2025er Haupttermin-Sammelnavigation verlinkt.
- **A 3 nachkontrolliert:** Der zuvor falsch positionierte Schwerpunkt S wurde auf die Lage `S=(418,33|140)` im SVG korrigiert (2:1-Teilung der Seitenhalbierenden von B aus).
- B 2 und Navigation erneut aus GitHub gelesen; eingebettete JavaScript-Skripte statisch auf Syntaxfehler geprüft (keine gefunden).
- **Offen:** Sichtprüfung und tatsächliche Browserausführung auf Desktop/Mobilgerät, Abgleich jeder Einzelzeichnung mit dem Original, vollständige Aufgaben- und Lösungsprüfung für B 3 und B 4, anschließend drei vollständige Prüfdurchgänge über alle neun Kategorien. Diese Bearbeitung ist kein abgeschlossener Kontroll-Durchgang.

## Zwingende Arbeiten vor einer Freigabe
1. Pro Jahrgang **jede** Aufgabenstellung vollständig aus dem amtlichen ISB-Haupttermin übernehmen und mit dem Original abgleichen; Zeichnungen und Parameterbereiche einschließen.
2. Pro Teilaufgabe die amtliche Originallösung vollständig nachrechnen und eine **ausführlichere, schülernahe** Lösung entwickeln; vertikale Brüche, Malpunkte, Dezimalkomma, Vektor- und Fachnotation prüfen.
3. Für längere Aufgaben pro Teilaufgabe schrittweise Lösungsnavigation und die Darstellung mit korrekten dynamischen Abhängigkeiten nach 2026 B 3/B 4 erstellen.
4. Räumliche Objekte **alle** um eine umschaltbare, frei drehbare 3D-Version ergänzen; 2025 A 2 insbesondere nach dem Rotationskörper-Standard 2026.
5. Jede Zeichnung mit amtlicher Prüfungszeichnung vergleichen; Rand- und Zwischenwerte systematisch testen, auch bei Mobil- und Touch-Bedienung.
6. **Drei vollständige Durchgänge**, jeweils über **alle neun Qualitätskategorien und jede Teilaufgabe**, dokumentiert absolvieren. Ein Teilabgleich ist keiner dieser vollständigen Durchgänge.

## Prüfrunden
| Jahr | Durchgang 1: alle Kategorien | Durchgang 2: alle Kategorien | Durchgang 3: alle Kategorien | Präsentierbar |
|---|---|---|---|---|
| 2025 | nicht abgeschlossen | nicht durchgeführt | nicht durchgeführt | Nein |
| 2024 | nicht abgeschlossen | nicht durchgeführt | nicht durchgeführt | Nein |
| 2023 | nicht abgeschlossen | nicht durchgeführt | nicht durchgeführt | Nein |

**Wichtig:** Einzelne amtlich abgeglichene Teilergebnisse, reine Dateianalysen oder die Korrektur eines Fehlers dürfen nicht als durchlaufene Dreifachprüfung gewertet werden. Die Freigabe verlangt eine erneute Sichtprüfung und technische Ausführung der veröffentlichten Seiten auf geeigneten Geräten.

## Amtliche Quelle
ISB Bayern, *Abschlussprüfungen in Mathematik*, Realschule: Haupttermin Gruppe I, Aufgaben und Lösungen für 2023, 2024 und 2025. Direkte Dokumentlinks bleiben auf den öffentlichen Lernhilfeseiten ausgeblendet.
