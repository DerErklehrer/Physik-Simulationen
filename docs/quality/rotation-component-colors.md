# Farbige Zerlegung: Rotationskörper 2016, 2019 und 2022

18.11.2026. Grundlage: bestehende amtlich abgeglichene Lernlösungen und `abschlusspruefung/QUALITAETSSTANDARD.md`.

## Zuordnung nach dem Rechenweg

| Aufgabe | Farbige Teile | Rechenbezug |
|---|---|---|
| 2016 HT II/III A3 | Halbkugel blau, Kegelstumpf orange | Halbkugel + großer Kegel − kleiner ergänzter Kegel |
| 2016 NT II/III A3 | kleine Halbkugel blau, Kegelstumpf orange, große Halbkugel magenta, Kreisring grün | beide gekrümmten Halbkugelflächen + Kegelstumpfmantel + sichtbarer Kreisring |
| 2016 NT I A3 | unterer Zylinder orange, oberer Zylinder grün, Kegelaussparung blau | unterer Zylinder + oberer Zylinder − Kegel |
| 2019 HT II/III A3 | Kegelstumpf orange, Zylinder grün | großer Kegel − kleiner ergänzter Kegel + Zylinder |
| 2022 HT II/III A1 | Kegelstumpf orange, Halbkugelaussparung blau | großer Kegel − kleiner ergänzter Kegel − Halbkugel |
| 2022 NT II/III A1 | Kegelstumpf orange, Zylinder grün, Halbkugelaussparung blau | großer Kegel − kleiner ergänzter Kegel + Zylinder − Halbkugel |

Kleine ergänzte Kegel erhalten graue Hilfslinien und Rechenterme. Sie sind keine zusätzlichen Teile des fertigen Körpers. Aussparungen sind als abzuziehende Teile beschriftet. Ihre inneren Begrenzungsflächen sind blau, ihr Inneres bleibt leer. Eine Legende erläutert jede Farbe; Farbe ist nicht der einzige Informationsträger.

## Umsetzung und fachliche Kontrolle

Ein gemeinsamer Zerlegungsdatensatz steuert Axialschnitt, Außenflächen, Schnittflächen, Legende und Farben der zugehörigen Rechenterme. Die Farbgebiete stammen durch horizontales Beschneiden aus dem vorhandenen Materialprofil. Die unveränderten Originalprofile liefern weiterhin alle äußeren Oberflächen; an den Teilkörpergrenzen werden keine zusätzlichen, sich überlagernden Deckflächen eingebaut. Kurven bleiben glatt, ebene Ränder und Übergänge behalten scharfe Kanten.

Die geometrischen Maße, Originalaufgaben und Lösungsdateien wurden nicht geändert. Die vorhandenen Original-/ISB-Abgleiche sind in `old-rotation-2016.md`, `old-rotation-2018-2019.md` sowie den bisherigen Nachweisen 2021/2022 dokumentiert. Die neue farbige Zuordnung wurde gegen jede darin verwendete Teilkörper-/Oberflächenformel geprüft. Insbesondere beim pilzartigen Körper ist der Kreisring eine Oberfläche, kein zusätzlicher Volumenkörper.

Unabhängige Prüfung aller Lösungsschritte: Nach Entfernen der eingefügten Farbklassen stimmt jeder Lösungsstring exakt mit dem vorherigen Text überein. Somit bleiben insbesondere sämtliche Plus-/Minuszeichen, Formeln, Zahlen, Rundungen und Einheiten erhalten. Zusätzlich radiale Integration aller farbigen Teilprofile: Ihre Volumensumme stimmt mit dem ursprünglichen Materialprofil überein (Abweichung < 10⁻⁷ cm³). Beim winkelabhängigen Körper zusätzlich φ = 55,03°, 70°, 75°, 120°, 179,99° geprüft.

Formelfarben werden mit MathJax-HTML-Klassen erzeugt und mit gut lesbaren dunkleren Farbtönen dargestellt. Die benötigte Erweiterung wird vor dem ersten Rendern geladen. Erste Vorprüfungen fanden Fehler durch gleichzeitiges dynamisches Laden von Farbmakros; diese Vorprüfungen waren nicht freigegeben. Nach der Korrektur wurden drei vollständige Browserdurchgänge erfolgreich ausgeführt.

## Prüfumfang je vollständigem Durchgang

Alle bestehenden Tests für 2016, 2018/2019 und 2021/2022 prüfen weiterhin jede Aufgabe und Teilaufgabe: Originalzahlen und unabhängige Rechnungen, MathJax-Schreibweisen, sämtliche Lösungsschritte, Axialschnitte, freie 3D-Ansichten, orthografische Kameras, Rotation 0/90/270/360°, gekoppelte Winkelgrenzen, Hilfslinien, Reset, Maus-/Touchbedienung, Desktop/Mobil und Navigation. Zusätzliche Prüfungen bestätigen mehrere Komponentenfarben, die Legende, markierte SVG-Teilgebiete und beim pilzartigen Körper die vier richtigen Oberflächenfarben. Die bestehenden Aufgaben außerhalb der Änderungsjahre werden als Regression mitgeprüft.

## Endgültige Prüfung

Endgültiger QA-Commit: `b777a427b00d56dbda64932c08e105c29aa35692`. Im letzten grafischen Abgleich wurde auch die frei liegende Unterseite der Sitzfläche von 2019 dem grünen Zylinder zugeordnet. Danach wurden die drei vollständigen Durchgänge erneut gestartet.

| Prüfgruppe | GitHub-Actions-Lauf | Durchgänge |
|---|---|---:|
| 2016, alle drei Aufgaben | 44349104865 | 3 |
| 2018/2019, einschließlich Sitzkörper und Regression Praline/Sanduhr | 44349103828 | 3 |
| 2021/2022, einschließlich beider Aufgaben von 2022 | 44349104044 | 3 |
| Mathematik-Navigation | 44349103865 | vollständiger Navigationstest |

Je Durchgang werden alle neun Kategorien an sämtlichen Aufgaben und Teilaufgaben geprüft. Die zusätzliche manuelle Sichtkontrolle umfasst die Farbflächen, Zuordnung zu den Formeln, Halbkugelaussparungen, Kreisring, Schnittflächen und Lesbarkeit. Unter allen Kamera- und Rotationszuständen bleiben feste Körperteile deckend. Die Farbgebiete an Schnittflächen stimmen mit den äußeren Teilkörperfarben überein; ausgesparte Bereiche werden nicht mit Material übermalt.

Alle vier endgültigen Actions-Läufe sind erfolgreich abgeschlossen. Die drei vollständigen Durchgänge umfassen zusammen 54 Prüfdatensätze und 204 Screenshots. Die abschließende manuelle Sichtkontrolle aller drei Bildübersichten bestätigt die Farbzuordnung und Lesbarkeit auf Desktop und Mobilgeräten. Auch die unveränderten Aufgaben von 2018 und 2021 bestehen die Regression. Keine offenen Befunde. Die Veröffentlichung übernimmt ausschließlich die geprüften Quelldateien und diesen Nachweis.
