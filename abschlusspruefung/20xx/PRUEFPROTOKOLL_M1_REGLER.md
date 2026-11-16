# Musterprüfung 1 · Parameterregler

Stand 16.11.2026. Gezielte Nachbesserung nach Rückmeldung zur fehlenden Zugänglichkeit der Schieberegler.

## Befund und Änderungen

- A2: Winkelregler in beiden Teilaufgaben ab dem ersten Lösungsschritt verfügbar; Drehwinkelregler wie bisher in der 3D-Ansicht.
- B1: Wochenregler in allen vier Teilaufgaben sofort verfügbar. Selbst gewählte Zeiten bleiben beim Vor-/Zurückblättern erhalten. Die Taste zum exakten Halbwertszeitpunkt erscheint mit entsprechender Bedeutung erst nach dessen Herleitung.
- B2: Winkelregler in allen drei Teilaufgaben sofort zugänglich, einschließlich Originalaufgabe zur Winkelbegründung und numerischem Originalfall.
- B3: x-Regler in B3.3, B3.4 und B3.5 ab dem ersten Schritt verfügbar. Freie Raute mit Index n und aktuellem Mittelpunkt gekoppelt. „Originalzeichnung“ stellt die verlangten Originalrauten bzw. die originale Sonderlage wieder her. Der exakte Achsenschnitt wird im ungeänderten Originaldurchlauf erst nach seiner Berechnung eingesetzt.
- B4: Winkelregler in B4.2–B4.5 ab dem ersten Lösungsschritt verfügbar. Eigene Eingaben bleiben auch beim Übergang zur Minimum- und Zielvolumenrechnung erhalten. 2D, 3D und Messwerte verwenden denselben Wert. Spezielle Ergebnis-Tasten bleiben an die entsprechende Herleitung gebunden.
- Alle fünf betroffenen Seiten erläutern direkt am Regler den Zusammenhang zwischen freier Erkundung und Originalrechnung. „Zurücksetzen“ stellt Aufgabe und Modell wieder her.

Keine künstlichen Parameter für feste Originalangaben in A1/A3 oder B4.1 eingeführt. Aufgaben, Lösungsrechnungen, Originalmaße und mathematische Wertebereiche bleiben erhalten.

## Prüfungen

Unabhängige fachliche Prüfungen des A-, B1/B2- und B3/B4-Blocks lokal bestanden. Die implementierten Geometriefunktionen sind unverändert; B3 nutzt für die neu erreichbaren freien Darstellungen dieselbe bereits geprüfte Rautenfunktion.

Neue Browserprüfungen kontrollieren für alle 16 betroffenen Teilaufgaben auf Desktop/Mobil:
1. Regler bereits in Schritt 1 sichtbar und bedienbar.
2. Mehrere Eingaben mit tatsächlich geändertem Modellwert.
3. Unveränderte Originalrechnung während der Erkundung.
4. Gewählter Wert bleibt über sämtliche weiteren Lösungsschritte erhalten.
5. Vor-/Zurückblättern und Original-/Aufgabenreset.
6. Freie Raute in B3 und Kopplung an die 3D-Ansicht in B4.

Zusätzlich laufen die bestehenden vollständigen Browserprüfungen mit allen 109 Lösungsschritten, Randlagen, MathJax, Mobilübersicht und 3D-Funktionen erneut.

## Abschlussnachweise

Code-/Teststand a6b94b92849f3d50cde47baa78083750e6b4e1fe. Alle drei Abschlussläufe erfolgreich:

- [A-Block 43816615433](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43816615433): 18/18 Browserfälle, Artefakt 14203036202.
- [B1/B2 43816615470](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43816615470): 12/12 Browserfälle, Artefakt 14203230238.
- [B3/B4 43816615392](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43816615392): 12/12 Browserfälle, Artefakt 14203530503.
- [Pages-Veröffentlichung 43816615139](https://github.com/DerErklehrer/Physik-Simulationen/actions/runs/43816615139): erfolgreich.

Insgesamt 42/42 vollständige Browserfälle; die zusätzliche Reglerprüfung umfasst dabei alle 16 betroffenen Teilaufgaben in drei Wiederholungen auf Desktop und Mobil. Sichtkontrolle der Regleraufnahmen aller fünf Seitentypen auf beiden Bildschirmgrößen erfolgreich. B3/B4-Aufnahmen stammen aus dem ebenfalls erfolgreichen Lauf 43816535624 (Artefakt 14203181366); dessen HTML-/Darstellungsstand ist identisch, anschließend wurden ausschließlich die Tests auf Werterhaltung über sämtliche Schritte erweitert.

Originalrechnungen und Geometrien sind erhalten. Die Bedienlücke ist für die Musterprüfung 1 behoben. Dies ist eine gezielte Bedien-/Regressionsprüfung; die drei technischen Wiederholungen werden nicht als drei unabhängige vollständige fachlich-visuelle Gesamtprüfungen bezeichnet.
