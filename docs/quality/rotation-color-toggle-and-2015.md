# Zuschaltbare Teilkörperfarben und Rotationskörper 2015

Stand: 18.11.2026. Grundlage: `abschlusspruefung/QUALITAETSSTANDARD.md` und die amtlichen Aufgaben/Lösungsmuster des ISB.

## Umfang

Alle elf verfügbaren Rotationskörperaufgaben besitzen den Schalter „Teilkörper farbig unterscheiden“. Beim Öffnen ist er ausgeschaltet: SVG-Flächen und 3D-Materialien sind neutral, Rechenterme behalten die normale Schriftfarbe. Zuschalten stellt die vorhandenen Teilefarben und die passende Legende wieder her. Perspektive, Zoom, Lösungsschritt, Teilaufgabe, Winkelparameter und Rotationsausschnitt bleiben erhalten. Ein Aufgabenreset behält die ausdrücklich gewählte Farbhilfe bei; ein erneuter Seitenaufruf startet neutral. Hilfslinien und Lernschritt-Hervorhebungen behalten ihre Funktion.

Die Ausgangsgeometrien und Rechnungen der neun bisherigen Aufgaben wurden nicht verändert. Der Standardwert 225° bei der Praline bleibt erhalten. Die Schalterprüfung umfasst Neutralansicht, Zuschalten, Abschalten, Wiederherstellung der ursprünglichen Farben und Zustandsvergleich.

## Neue Aufgaben aus der 2015er Auswahl

- II/III Haupttermin, A 3.0–A 3.2: Lampe aus Plexiglasscheibe und Lampenschirm.
- II/III Nachtermin, A 3.0–A 3.2: Kerzenständer aus Edelstahl.

Beide bisherigen Platzhalter sind ersetzt; die Übersicht enthält jetzt elf verfügbare Aufgaben und 17 weitere Platzhalter. Die zusätzlichen Mathematik-I-Funde von 2015 gehören nicht zur bestehenden Auswahl dieser beiden Axialschnitt-Aufgaben und wurden nicht als weitere Archiveinträge ergänzt.

Amtliche Quellen (nur im Prüfprotokoll, keine öffentlichen Aufgaben-/Lösungs-PDF-Links in der Lernansicht):

- `https://www.isb.bayern.de/fileadmin/user_upload/Realschule/Leistungserhebungen/Abschlusspruefung/Mathematik/2015/2015_mathe_ii_haupttermin_angaben.pdf`, Seite 4.
- `https://www.isb.bayern.de/fileadmin/user_upload/Realschule/Leistungserhebungen/Abschlusspruefung/Mathematik/2015/2015_mathe_ii_haupttermin_loesungen.pdf`, A 3.1/A 3.2.
- `https://www.isb.bayern.de/fileadmin/user_upload/Realschule/Leistungserhebungen/Abschlusspruefung/Mathematik/2015/2015_mathe_ii_nachtermin_angaben.pdf`, Seite 4.
- `https://www.isb.bayern.de/fileadmin/user_upload/Realschule/Leistungserhebungen/Abschlusspruefung/Mathematik/2015/2015_mathe_ii_nachtermin_loesung.pdf`, A 3.1/A 3.2.

## Fachlicher Abgleich

| Aufgabe | Zerlegung und Kontrollen | Amtliches Ergebnis |
|---|---|---|
| HT A 3.1 | Plexiglasscheibe als Zylinder, Radius 22,5 cm, Dicke 2 cm | 3180,86 cm³ |
| HT A 3.2 | großer Kegelmantel minus kleiner Kegelmantel plus gekrümmte Halbkugeloberfläche; Radien 18 / 4,5 cm; Höhen 12 / 3 cm; Mantellinien 21,63 / 5,41 cm | 1273,90 cm² |
| NT A 3.1 | ähnliche ergänzte Kegel; kleine Höhe 2,4 cm, Differenz zu 4,5 cm | 2,1 cm |
| NT A 3.2 | Grundkreis + Deckkreis + großer minus kleiner Kegelmantel + äußerer und innerer Zylindermantel; Mantellinien 5,9 / 3,1 cm | 146,4 cm² |

Beim Kerzenständer ersetzt der volle Deckkreis die Summe aus oberem Kreisring und Aussparungsboden. Beide Flächen erhalten Grün; der Innenmantel Blau. Kontaktflächen im Inneren werden nicht zur äußeren Oberfläche addiert. Die Aussparung wird nicht gefüllt. Die Lampe zeigt die mathematische äußere Form; eine Wandstärke ist nicht vorgegeben.

Originale Aufgabenreihenfolge, Angaben, Bedingungen, Operatoren und Punkte wurden anhand der Aufgaben-PDFs geprüft; die gerenderten Originalzeichnungen dienten zum Abgleich von Punkten, Lagebeziehungen, Achsen und rechten Winkeln. Streckenlängen werden mit Betragsstrichen geschrieben, Segmentbenennungen ohne. Rechte Winkel: Viertelkreis mit Punkt. Die Lösungen ergänzen die amtlichen Rechenwege um die nötigen Erklärungen.

Die beiden amtlichen Oberflächenergebnisse entstehen durch die vorgeschriebene Zwischenrundung der Mantellinien. Die Lernlösung zeigt diese Werte ausdrücklich. Das Modell und die Erkundungswerte verwenden die ungerundete Geometrie; die Abweichung wird erläutert. Unabhängige Rechnung bestätigt beide Ergebnisse. Die Volumensumme der farbigen Teilprofile stimmt mit dem vollständigen Materialprofil überein (numerische radiale Integration, Abweichung < 10⁻⁷ cm³).

## Prüfung und Korrekturen

Die Browserprüfungen durchlaufen jede Teilaufgabe und jeden Lösungsschritt auf Desktop und Mobilgeräten, kontrollieren MathJax, SVG, 3D-Geometrie und deckende Materialien, Orthografie, Kameras, Maus-/Touchdrehung, Hilfslinien, Rotation 0/90/270/360°, Aufgabenreset und Rückwege. Die unveränderte Winkelaufgabe von 2016 wird weiterhin an allen bisherigen Rand- und Zwischenwerten geprüft.

Vorprüfungen erkannten eine zu ungenaue Scrollposition im Mausdrag-Test und eine falsche Erwartung für den initialen 225°-Ausschnitt des neuen Kerzenständers. Die Tests wurden korrigiert: Das Canvas wird vor der Koordinatenbestimmung in den sichtbaren Bereich gescrollt, die erwartete Startrotation entspricht der jeweiligen Aufgabe. Beim Originalabgleich wurde N als Mittelpunkt des Aussparungsbodens richtig zugeordnet; lange Angaben der Lampe wurden lesbar umgebrochen. Diese Vorprüfungen wurden nicht freigegeben.

Endgültiger QA-Commit: `8ceac527ae765b14fd6486aea7cf0b9c3d940b6c`.

| Prüfgruppe | Actions-Lauf | Vollständige Durchgänge |
|---|---:|---:|
| 2015 | 44364441770 | 3 |
| 2016 | 44364441931 | 3 |
| 2018/2019 | 44364441976 | 3 |
| 2021/2022 | 44364441857 | 3 |
| Mathematik-Navigation | 44364133280 | Desktop/Mobil, erfolgreich; unveränderte Navigation |

Alle vier endgültigen Rotationskörper-Prüfgruppen sind erfolgreich abgeschlossen: 66 Prüfdatensätze und 318 Screenshots. Die drei Bildübersichten der neuen Aufgaben sowie die drei neutralen Regressionsübersichten wurden manuell kontrolliert. Keine offenen Befunde an Modell, Farben oder Rechnung.

| Durchgang | Aufgaben und Teilaufgaben | Kategorien 1–9 |
|---|---|---|
| 1 | alle elf Aufgaben, sämtliche Lernschritte, Desktop und Mobil | erfolgreich; Quellen-/Lösungsabgleich, Mathematik, Notation, Grafik, 3D, Abhängigkeiten, Didaktik, Technik, Konsistenz |
| 2 | alle elf Aufgaben, sämtliche Lernschritte, Desktop und Mobil | erneut erfolgreich; vollständige Wiederholung der Prüfgruppe |
| 3 | alle elf Aufgaben, sämtliche Lernschritte, Desktop und Mobil | abschließend erfolgreich; einschließlich Regression der bestehenden Aufgaben |

Nach der Browserprüfung wurde ausschließlich der allgemeine Hinweistext in den beiden neuen HTML-Hüllen auf die hier festen Maße beschränkt; Geometrie, Aufgaben, Rechnung, CSS und Funktionen entsprechen unverändert dem geprüften QA-Commit. Der Text wurde separat statisch kontrolliert. Der erfolgreiche Navigationslauf prüft dieselbe unveränderte Navigation. Der erneute Lauf 44364441797 war zum Freigabezeitpunkt noch bei der Browserbereitstellung; er ersetzt keinen fehlenden funktionalen Test. Die neuen 2015er Direktlinks und Übersichtsrückwege wurden zusätzlich in allen drei Rotationskörper-Durchgängen geprüft. Die veröffentlichte Version wird vor Abschluss überprüft.
