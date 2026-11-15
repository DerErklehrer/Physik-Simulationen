# Mathematik I 2024 – Haupttermin B1/B2

Stand: 15.11.2026. Auftrag: B1 und B2 gemeinsam auf dem bereits verwendeten Standard ausarbeiten. Umfang: vier Teilaufgaben, 21 Erklärungsschritte, 11,5 P (B1: 6,5 P; B2: 5 P). Ausgangspunkt `d2fd7945b4cf3f8acdca66cd22213a5301333157`.

## Originalabgleich und fachliche Ergebnisse

Primärquellen: amtliche ISB-Prüfung `2024_mi_ht.pdf`, PDF-Seiten 6–7, und offizielles Lösungsmuster `2024_mi_ht_l.pdf`, PDF-Seiten 3–4. Alle vier Seiten lokal gerendert und visuell gelesen. Originalfragen, Angaben, Bedingungen, Zahlen, Operatoren, Ergebnisse und Punkte abgeglichen. Der bisherige Altstand enthielt nur verkürzte Hinweise und für B2 keine passende Figur.

| Teilaufgabe | Punkte | Nachgerechneter Inhalt |
|---|---:|---|
| B1.1 | 4,5 | f(x)=−0,75·log₂(x+1)+3, Definitionsbereich x>−1. B(4,5;3,5), C(2;3,5). A1(0,5;2,5612781245), A2(4;1,2585539288). Die Grenzlage f(x)=3,5 ergibt exakt x0=2^(−2/3)−1≈−0,3700394751. Die im Lösungsmuster betrachtete Orientierung A→B→C gegen den Uhrzeigersinn verlangt A unterhalb von BC, also x>x0; amtliche gerundete Angabe x>−0,37. |
| B1.2 | 2 | A3 liegt auf der Mittelsenkrechten von BC. xA3=(2+4,5)/2=3,25; yA3≈1,4344028691, gerundet A3(3,25;1,43). Die ungerundete Grafik hat exakt gleich lange Schenkel. |
| B2.1 | 4 | Trapez mit A(0;0), B(7;0), C(11;5), D(0;5). ∢ADB≈54,4623222080°, δ=∢PDC≈35,5376777920°. Sinussatz liefert exakt DP(φ)=11·sinφ/sin(δ+φ) cm. Mit δ≈35,54° entsteht die amtliche Darstellung. DP1 bei φ=20°: geometrisch 4,5630424650 cm, mit amtlicher Zwischenrundung 4,5629155449 cm; beide gerundet 4,56 cm. |
| B2.2 | 1 | Spitze auf der Mittelsenkrechten von CD und gleichzeitig auf BD. M(5,5;5), P2(5,5;15/14). Beide Schenkel ≈6,7589698527 cm; φ2=arctan(5/7), nicht vorzeitig auf 35,54° gerundet. |

**B1 – Orientierung und Rundung:** Die Orientierung ist ausdrücklich erläutert, statt den Bereich oberhalb von BC mathematisch als grundsätzlich dreiecksunfähig auszugeben. Für −1<x<x0 liegen dort nicht entartete Dreiecke mit umgekehrtem Umlaufsinn. Der Regler zeichnet sie gestrichelt und bezeichnet sie als andere Orientierung. Die exakte Grenzlage ist gesondert anwählbar und wird ohne gefülltes Dreieck dargestellt. Die grob gerundete Zahl −0,37 wird nicht als exakte Degenerationsstelle behandelt.

**B2 – Genauigkeit:** Originalangabe mit Gleichheitszeichen unverändert erhalten. Die eigene Herleitung trennt die exakte Formel mit δ vom durch die Zwischenrundung entstehenden Näherungsausdruck. Obergrenze φmax=arctan(5/4)≈51,3401917459°; die Originalangabe 51,34° bleibt im Text erhalten. Die Endpunkttaste verwendet den exakten Winkel und erreicht P=B. Ein manueller Reglerwert 51,34° liegt noch geringfügig vor B. Der gleichschenklige Sonderfall wird ebenso exakt konstruiert.

## Neun Prüfkategorien dieses Arbeitsschritts

1. **Originaltreue und Vollständigkeit:** Vier Fragen samt B1-/B2-Ausgangsangaben vollständig, graphische Anordnung und Werte anhand der Originalseiten geprüft. Originalgraph und beide Dreiecke B1.1 vorhanden; B2-Trapez, Diagonale, Originalpunkt P1 und Basis CD korrekt. Zusatzpunkt M erscheint erst im Konstruktionsschritt B2.2. Die neue Originalaufgabenformel erhält lediglich einen äquivalenten Zeilenumbruch für Mobilgeräte.
2. **Fachliche Richtigkeit:** Alle 21 Schritte nachgerechnet und mit dem amtlichen Lösungsmuster verglichen. Logarithmus-Definitionsbereich, Grenzgleichung, Umkehrung des Ungleichheitszeichens bei negativem Divisor, Orientierung, Mittelpunkt, Funktionswert, Tangens, Winkelkomplement, Winkelsumme und Sinussatz geprüft. Gleichschenkligkeit unabhängig durch Längenvergleich kontrolliert.
3. **Schreibweisen:** Strecken mit Überstrich, Streckenlängen zusätzlich mit Betragsstrichen, Winkel ∢, korrekt gesetzte Indizes, Dezimalkomma, Einheiten und echte vertikale Brüche. Malpunkt statt Kreuz. Exakte und gerundete Ergebnisse gekennzeichnet; keine falsche exakte Gleichheit durch Zwischenrundung. Dynamische Anzeigen wiederholen keine Längenformel mit fehlendem Überstrich oder horizontalem Slash-Bruch.
4. **Grafik:** B1 gleiche x-/y-Skalierung, Achsen mit Pfeilen und O, korrekt liegender Logarithmusgraph, feste Punkte B/C, gestufte Konstruktion beider Originaldreiecke, Mittelsenkrechte und Sonderlage. B2 maßstäbliches 7/11/5-Trapez, P auf BD, φ bei C, δ bei D, γ bei P. Konstruktion von P2 über M; gleiche Schenkel markiert. Rechte Winkel bei D/M als Viertelkreisbogen mit ausgefülltem Punkt auf halbem Radius der Winkelhalbierenden. Beide tatsächlichen draw()-Funktionen vorab zusätzlich als SVG gerendert und gelesen.
5. **3D:** Nicht anwendbar; B1/B2 behandeln ausschließlich ebene Objekte.
6. **Abhängigkeiten:** Aufgaben- und Schrittwechsel, Einzelauswahl der Originaldreiecke, Erkundungsregler, exakte Grenze, gleichschenklige Sonderlagen und Endpunkt anwählbar. Freie Reglerbewegung entfernt feste Lösungsindizes 3 bzw. 2. P2 ist unabhängig von der Rundung des angezeigten Winkels exakt gleichschenklig. Zurücksetzen und Zurückblättern stellen die zum jeweiligen Lösungsteil passende Szene her.
7. **Schülernahe Lösungen:** B1.1 mit sieben Schritten, B1.2 mit vier, B2.1 mit sechs und B2.2 mit vier. Originalfrage und eigene Erklärung getrennt. Entscheidende Übergänge erklärt; Zeichnung und hervorgehobene Geometrie folgen den Schritten. Keine Vorwahl der Sonderlösung vor dem passenden Endschritt.
8. **Technik und Mobil:** HTML-/JS-Syntax, MathJax, vollständige Formeldarstellung, seitliche Überbreite, Wischen, Gesamtübersicht, Navigation, Schrittende, Reset, Grenzlage und Parametergrenzen automatisiert geprüft. Browsermatrix: drei technische Wiederholungen für B1/B2 jeweils Desktop und Mobil. Die vorhandene 2024-A-Regression läuft separat beim gleichen Seitenstand.
9. **Veröffentlichung und Konsistenz:** B1/B2 als eigene Seiten mit Vor-/Zurückverweisen und Jahrgangsübersicht. Bestehende Hash-Routen auf neue Seiten umgeleitet; Altseite enthält nur noch B3/B4 und ist als vorläufig gekennzeichnet. A1–A3 und 2025/2026 nicht geändert. Keine öffentlichen PDF-Direktlinks.

## Lokale Prüfung

120 mathematische/strukturelle B1/B2-Prüfungen bestanden. Zusätzliche Regression: 2024 A mit 133 Checks; 2025 mit 469 mathematischen/statischen und 287 Quellen-/Strukturchecks. Die B2-Tests führen die tatsächliche Seitenfunktion geometry() aus und vergleichen sie mit unabhängigen Winkel-, Strecken- und Sinussatzrechnungen für φ=0,1°, 1°, 20°, den exakten gleichschenkligen Fall, 35,54°, 51,34° und den exakten Endpunkt. B1 einschließlich beider Orientierungen und exakter Grenzlage geprüft.

Dieser Bericht dokumentiert den angeforderten Arbeitsschritt und unterscheidet technische Wiederholungen von unabhängigen vollständigen fachlich-visuellen Vollprüfungen. Keine vollständige Dreifachfreigabe des gesamten Jahrgangs 2024; B3/B4 stehen noch aus.


## Abschließender Browser- und Sichtnachweis

Seitenstand `2d7e84bf3f4a9fc6c6e3f97453afa43f3b7bfd05`. [B1/B2-Prüflauf 43709224790](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43709224790) **erfolgreich**: 120 mathematische/strukturelle Prüfungen je dreimal sowie **12/12 Browserfälle** (B1/B2 × Desktop/Mobil × drei technische Wiederholungen). Prüfartefakt `14159647430`. Separater [A-Regressionslauf 43709224787](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43709224787) ebenfalls erfolgreich; vorhandene 2025-Checks mit 469 bzw. 287 bestanden. Veröffentlichung erfolgreich.

**Sichtprüfung:** Alle 21 Lösungsschritte auf Desktop und Mobil gelesen (42 Ansichten). 32 bereits gelesene Lösungsausschnitte sind im Abschlussartefakt pixelgleich mit den früheren Aufnahmen. Die übrigen zehn B1-Ansichten, einschließlich vollständiger Grenzlagen-Erklärung und aller B1.2-Schritte, im erfolgreichen Abschlussartefakt visuell gelesen. Zusätzlich geprüft: beide Originaldreiecke, exakte Grenzlage, beide gleichschenkligen Sonderfälle, B2-Winkel φ/δ/γ und exakter Endpunkt P=B. Keine seitlich abgeschnittenen Formeln oder offenen JavaScriptfehler im erfolgreichen Lauf.

**Behobener Browserbefund:** Beim ersten Lauf wurde in B1.1 der HTML-Parser durch ein ungeschütztes Kleinerzeichen vor x in der ergänzenden Definitionsbereichs-Ungleichung angesprochen. Dadurch war der letzte Erklärungstext abgeschnitten und MathJax konnte die unvollständige Formel nicht setzen. Die Zeichen sind nun vor dem Einfügen als HTML geschützt; die vollständige Erläuterung wird korrekt gesetzt. Ein zusätzlicher statischer Check sichert die Stelle. Der Browsercheck auf vollständig gerenderte Mathematik blieb unverändert aktiv; danach erneuter vollständiger erfolgreicher Lauf.

**Ergebnis:** B1 und B2 vollständig als angeforderter Arbeitsblock ausgearbeitet, gegen die amtlichen Quellen abgeglichen, technisch und visuell geprüft und veröffentlicht. Keine offenen Befunde aus diesem Arbeitsschritt. Die verbleibenden Aufgaben B3/B4 sind weiterhin der gekennzeichnete Altstand.
