# Rotationskörper 2018/2019 – Qualitätsnachweis

Stand: 18.11.2026. Grundlage: abschlusspruefung/QUALITAETSSTANDARD.md und Referenz AP 2026.

## Umfang und Quellen

| Aufgabe (Mathematik II/III) | Inhalt | Rechenteilaufgaben | Lernschritte |
|---|---|---:|---:|
| 2018 HT A3 | Praline mit kugelförmiger Cremefüllung | A3.1, A3.2 | 7 |
| 2018 NT A3 | Sanduhr, Sandvolumen und Durchlaufzeit | A3 | 6 |
| 2019 HT A3 | Sitzkörper aus Kegelstumpf und Zylinder | A3.1, A3.2 | 8 |

Originale und amtliche Lösungsmuster wurden unmittelbar abgeglichen: ISB Bayern, Verzeichnis `https://www.isb.bayern.de/fileadmin/user_upload/Realschule/Leistungserhebungen/Abschlusspruefung/Mathematik/`, darin `2018/2018_mii_ht.pdf`, `2018/2018_mii_ht_l.pdf`, `2018/2018_mii_nt.pdf`, `2018/2018_mii_nt_l.pdf`, `2019/2019_mii_ht.pdf`, `2019/2019_mii_ht_l.pdf`. Keine öffentlichen PDF-Verlinkungen in den Schülerseiten.

## Fachprüfung und Rundung

- 2018 HT: R = 5 / tan(71,6°), r = 3 / tan(71,6°). Amtliche Weiterrechnung mit 1,7 cm und 1,0 cm: Pralinenvolumen 12,0 cm³, Cremefüllung 1,3 cm³. Unge­rundetes Modell: 11,356505 cm³ beziehungsweise 1,249216 cm³. Unterschied ausdrücklich erläutert. Kugelradius aus 11 % des ungerundeten Modellvolumens; mittige Lage als Darstellungsannahme gekennzeichnet, da keine Lage vorgeschrieben ist. Schnittflächen der Schokolade sparen die Kugel aus.
- 2018 NT: Kegelhöhe (10−1)·tan(59°) = 14,978515 mm; Zylinderhöhe 25,021485 mm. Amtliche Weiterrechnung mit 25 mm ergibt 9948 mm³ und 199 s. Unge­rundetes Modell: 9955,126341 mm³ und 199,102527 s. Sandfüllung besteht aus Halbkugel und Zylinder; oberer Kegelbereich bleibt leer. Glas zeigt die Innenform ohne erfundene Wandstärke.
- 2019 HT: MS = 21 / tan(16°) = 73,235703 cm, OS = MS−40 cm. Amtlich schrittweise gerundet: MS 73,2 cm, OS 33,2 cm, HC 19,0 cm; große Kegel 33804,8 cm³, kleiner Kegel 3137,7 cm³, Zylinder 6927,2 cm³, Gesamtvolumen 37594,3 cm³. Unge­rundetes Modell: 37587,409119 cm³. Die Rundungsabhängigkeit von HC ist erklärt. Modellvolumen zusätzlich durch getrennte Integration des Kegelstumpfs und Addition des Zylinders bestätigt.

## Drei vollständige Durchgänge

Automatischer Browserlauf: `tests/old-rotation-2018-2019.mjs`, finaler QA-Lauf https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/44309823944, Commit `e4228e9c819c61e3b4265949ac7b1a87475fdab1`. Jeder der drei Durchgänge umfasst alle drei Aufgaben und alle 21 Lernschritte auf Desktop (1366 × 950) und Mobil (390 × 844), insgesamt 18 Aufgaben-/Viewport-Protokolle und 66 Bildschirmaufnahmen.

| Kategorie | Prüfung in allen drei Durchgängen |
|---|---|
| 1 Originaltreue | Manueller Abgleich sämtlicher Angaben, Aufträge, Ergebnisse und Punkte mit Original und Lösungsmuster; Browser besucht jede Teilaufgabe. |
| 2 Mathematik | Unabhängige analytische Volumen- und Radiusprüfungen; amtliche Rundungswege und Einheiten kontrolliert. |
| 3 Schreibweisen | Manuelle Sichtprüfung: echte Brüche, Dezimalkomma, Streckenüberstriche und Betragsstriche; zusätzlich MathJax-Fehlerprüfung. |
| 4 Grafiken | Axialschnitte, Punktreihenfolge, Achsen, Hilfskegel, Winkel und Zuordnung zum Modell geprüft; Bildschirmaufnahmen aller Teilaufgaben. Rechte Winkel als Bogen mit Punkt. |
| 5 3D | Analytisch abgeleitete Körper, opake feste Bestandteile, bewusst transparentes Glas, freie Maus-/Touchrotation, orthografische Drauf-/Unteransicht und Kopfüberansicht. |
| 6 Abhängigkeiten | Rotation 0°, 90°, 270°, 360°, Teilvolumen, Hilfslinien, Schnittschalter und vollständiges Zurücksetzen geprüft. Vorgegebene Maße bleiben fest. |
| 7 Didaktik | Alle Lernschritte, vor/zurück, Teilaufgabenwechsel; Zusatzmaße eingeklappt. Amtliche Ergebnisse bleiben dort sichtbar, wo sie im Original stehen. |
| 8 Technik | Keine Laufzeit- oder MathJax-Fehler; Viewport- und Überlaufprüfung; WebGL, Desktop, Mobil und tatsächliche Touchereignisse. |
| 9 Veröffentlichung | Sechs aktive Archivkarten, 22 nicht anklickbare Platzhalter; Direktlinks und Navigation; keine PDF-Links auf Schülerseiten. |

Manuelle Quellen-, Rechen- und Grafikprüfung ergänzt die automatisierten Prüfungen; diese ersetzen den Quellenabgleich nicht. Die erste Bildkontrolle führte zu einer Korrektur der Anfangsperspektive: Der Viertelausschnitt zeigt nun zum Betrachter, damit die Cremefüllung unmittelbar sichtbar ist. Anschließend wurden alle drei vollständigen Durchgänge erneut ausgeführt. Die finalen Bildschirmaufnahmen wurden visuell kontrolliert.

Regressionen: Aufgaben 2021/2022 und Mathematik-Navigation separat geprüft (QA-Läufe 44309823952 und 44309824002). Bestehende Aufgabenmodule unverändert; neuer Laufzeitcode ausschließlich in `shared-1819/`. Vor dem Freischalten wurden die betroffenen Dateien auf den frischen Hauptzweig gesetzt, ohne andere Projektänderungen zu überschreiben.
