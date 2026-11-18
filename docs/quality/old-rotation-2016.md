# Rotationskörper 2016 – Detailprüfung

18.11.2026. Maßstab: `abschlusspruefung/QUALITAETSSTANDARD.md`, Referenz AP 2026.

## Umfang

| Aufgabe | Inhalt | Rechenteilaufgaben | Lernschritte |
|---|---|---:|---:|
| HT II/III A3 | Spielzeugkreisel: Halbkugel und Kegelstumpf | 2 | 7 |
| NT II/III A3 | Zwei Halbkugeln, Kegelstumpf, Kreisring; Oberfläche | 2 | 8 |
| NT I A3 | Neuneck, zwei Zylinder und winkelabhängige Kegelaussparung | 3 | 9 |

Quelle: ISB Bayern, `https://www.isb.bayern.de/fileadmin/user_upload/Realschule/Leistungserhebungen/Abschlusspruefung/Mathematik/2016/` mit `2016_mii_ht.pdf`, `2016_mii_ht_l_1.pdf`, `2016_mii_nt.pdf`, `2016_mii_nt_l.pdf`, `2016_mi_nt.pdf`, `2016_mi_nt_l.pdf`. Aufgaben jeweils PDF-Seite 4; Lösung A3 jeweils PDF-Seite 2. Aufgaben, Maßangaben, Punktzahlen und Ergebnisvorgaben unmittelbar mit den PDFs abgeglichen. Der offensichtliche Druckfehler „Berechnen die die“ in NT II/III A3.1 ist sprachlich zu „Berechnen Sie die“ korrigiert. Sonst kein inhaltlich veränderter Auftrag. Keine direkten Dokumentlinks auf Schülerseiten.

## Unabhängige Rechenprüfung

- HT II/III: Halbkugelradius 2,5 cm. Oberer Kegelradius 4,5/tan77°, unterer 2,5/tan77°. Kegelstumpfhöhe 2 cm. Rechnung mit amtlich gerundeten Radien 1,04 cm und 0,58 cm ergibt 36,9411502555 cm³ → **36,94 cm³**. Exakte Winkelgeometrie ergibt 36,9390131205 cm³. Beides rundet gleich. Die überstehenden ebenen Ringflächen sind geometrisch berücksichtigt.
- NT II/III: 4−3,2 = 0,8 cm; Ähnlichkeit 4·2/0,8 = 10 cm. Kegelstumpfhöhe 6 cm. Mantellinien √104 cm und √16,64 cm. Oberflächenformel: beide gekrümmten Halbkugelflächen + Differenz der Kegelmantel + Kreisring. Amtliche Zwischenwerte 10,2 cm und 4,1 cm ergeben 227,7026355322 cm² → **227,7 cm²**. Exakte Geometrie: 227,7425512440 cm² → ebenfalls 227,7 cm². Innere Verbindungskreise nicht mitgezählt.
- NT I: R = 2+2,5 = 4,5 cm; h(φ) = 4,5/tan(φ/2) cm. Äußeres Zylindervolumen 121,2π cm³; Kegelvolumen 30,375π/tan(φ/2) cm³. Untere Grenze 2 arctan(2,5/4,8) = 55,0240052477°. Amtlicher Intervallrand 55,02° unverändert; Regler 55,03°–179,99° hält die exakten offenen geometrischen Grenzen ein. V(70°) = 244,4787537962 cm³ → **244,48 cm³**. Entartungen an beiden Grenzen ausdrücklich erläutert.
- 3D-Körper aus denselben radialen Profilen wie die Axialschnitte. Profilintegration mit den polygonalen Kreisbogenannäherungen wurde gegen analytische Volumina geprüft; Kurvenflächen sind numerisch angenähert. Bei NT I ist das polygonale Profil exakt. Die variable Kegelaussparung wird als innere Oberfläche mit Schnittflächen dargestellt, nicht als aufgesetzter Kegel.

## Prüfung in drei vollständigen Durchgängen

Automatischer Test: `tests/old-rotation-2016.mjs`. Alle drei Durchgänge besuchen jede der sieben Teilaufgaben und alle 24 Lernschritte auf Desktop 1366×950 und Mobil 390×844. Zusätzlich jeweils Winkel 55,03°, 70°, 75°, 120°, 179,99°; Rotationswinkel 0°, 90°, 270°, 360°; Kameras, Maus, tatsächliche Touchereignisse, Hilfslinien, Zurücksetzen und Navigation.

Die manuellen Quellen-, Rechen-, Schreibweisen- und Grafikprüfungen ergänzen die technischen Browserprüfungen. Ein automatischer Browserlauf allein wird nicht als manueller Originalabgleich gewertet.

| Kategorie | Prüfinhalt je Durchgang |
|---|---|
| 1 Originaltreue | Alle Angaben, Aufgabenoperatoren, Teilaufgaben, Abbildungen und Punkte gegen Original; eigene Lösungen gegen amtliches Lösungsmuster. |
| 2 Mathematik | Alle sieben Lösungen unabhängig nachgerechnet, Rundung und Einheiten geprüft; Abhängigkeiten und exakte/gerundete Modellwerte unterschieden. |
| 3 Notation | Streckenlängen mit Überstrich und Betragsstrichen, Segmentbenennung ohne Betragsstriche, Indizes, ∢, Dezimalkomma, echte Brüche und Einheiten. |
| 4 Grafik | Punktreihenfolge, Kurven, Radien, Kegelstumpf, Ringflächen, Achsen und Winkel; rechte Winkel als Viertelkreis mit Punkt. |
| 5 3D | Freie Rotation und Touch, orthografische Drauf-/Unteransicht, Kopfüberansicht, deckende Körper, korrekte innere Aussparung. |
| 6 Abhängigkeiten | φ mit Spitze, Kegelhöhe, Schnittprofil und Volumen gekoppelt; Originalwerte fest; Reglergrenzen, Teilaufgabenwechsel und Reset. |
| 7 Didaktik | Alle 24 Schritte, passende Hervorhebung, vor/zurück; Zusatzwerte eingeklappt. Ursprünglich vorgegebene Ergebnisse bleiben sichtbar. |
| 8 Technik | MathJax, Laufzeit, Desktop/Mobil, Seitengröße, WebGL, Eingaben und Navigation. |
| 9 Veröffentlichung | Neun aktive Archivkarten, 19 Platzhalter; vorhandene Direktlinks unverändert, keine PDF-Links auf Schülerseiten. |

## Endgültige Freigabe

QA-Commit `20ef3fdf3505a8848b54326b11c5ab783bae5558`; Browserlauf https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/44344173062 erfolgreich. 18 Aufgaben-/Viewport-Protokolle und 78 Bildschirmaufnahmen. Die Aufnahmen aller drei Durchgänge wurden auf Darstellung und Lesbarkeit kontrolliert, die drei Axialschnitte zusätzlich mit den Originalabbildungen abgeglichen. Die in der ersten Kontrolle fehlende Rechtwinkelmarkierung bei M (NT I) wurde ergänzt; danach alle drei vollständigen Durchgänge erneut ausgeführt.

| Durchgang | Browserabschluss (UTC) | Quellen/Rechnungen/Notation/Grafik | 3D/Abhängigkeiten/Didaktik/Technik/Navigation |
|---|---|---|---|
| 1 | 16:11:55 | Alle sieben Teilaufgaben geprüft; keine offenen Mängel | Bestanden |
| 2 | 16:12:46 | Vollständiger erneuter Abgleich; keine offenen Mängel | Bestanden |
| 3 | 16:13:39 | Vollprüfung einschließlich Korrekturkontrolle; keine offenen Mängel | Bestanden |

Regressionen ebenfalls erfolgreich: 2018/2019 (44344173045), 2021/2022 (44344173090), Mathematik-Navigation (44344173143). Bestehende Aufgabenmodule werden nicht ersetzt; `shared-2016/` enthält die neuen Module. Die bestehenden Aufgabenprüfungen wurden ausschließlich an die Archivzahlen neun/19 angepasst. Veröffentlichung erfolgt auf dem frisch gelesenen Hauptzweig, nach Abgleich der gemeinsam betroffenen Dateien.
