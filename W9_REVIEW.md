# W9-Kandidat: warme Texte und nachvollziehbare Wege

Stand: 19. September 2026  
Branch: `work/w9-warme-texte`  
Öffentliche Basis: `fa9dc84a30c9e64ef111e65acf8fb0f21ab283de`  
Status: Kandidat für Astra-Prüfung; noch nicht auf `main` veröffentlicht.

## Ergebnis

Die Website bleibt vollständig statisch. Es gibt kein Backend, keine Laufzeit-KI, keinen Account und keine Freitexteingabe. `data.mjs` bleibt die stabile Inhalts- und ID-Basis. `content-w9.mjs` legt eine deterministische öffentliche W9-Redaktion darüber; `flow.mjs` steuert den endlichen geführten Weg.

Der alte private Projektstand und private Forschungs-/Manuskriptdateien sind nicht Bestandteil dieses Branches.

## Redaktionelle Abdeckung

| Inhalt | Bestand | Haupttexte geändert | Titel geändert | Wahltexte geändert / geprüft |
| --- | ---: | ---: | ---: | ---: |
| Szenen | 144 | 144 | 144 | 418 / 432 |
| Wissenskarten | 24 | 24 | 24 | 43 / 89 |
| Praxisbausteine | 36 | 36 | 35 | 52 / 72 |
| Etappeneinstiege | 14 | 14 | 14 | 14 / 14 |
| Orientierungen | 14 | 14 | 14 | 37 / 210 |
| Rückblicke | 14 | 14 | 14 | 28 / 28 |
| Abschlüsse | 14 | 14 | 14 | 13 / 14 |
| **Gesamt** | **260** | **260** | **259** | **605 / 859** |

Der einzige unveränderte Titel ist P15 „Ein Gespräch anbieten“; er war bereits kurz, verständlich und semantisch passend. Unveränderte Wahltexte wurden gegen ihre Zielhandlung geprüft und bewusst beibehalten.

Alle Haupttexte sind mehrabsätzig und liegen in den festgelegten W9-Wortspannen. Die Referenzfassungen für S-T01-F01-A/B/C, K01, K21, P01, P03, P09, D01, O01, O04, O07, R02, R01, K24, O12, O13 und O14 sind übernommen. Technische Perspektivsuffixe der Szenentitel wurden entfernt; die Perspektive erscheint separat in der Oberfläche.

Der Wiederholungscheck meldet nach den Korrekturen keine identischen längeren Sätze mehr über verschiedene Szenenfamilien hinweg. Gleiche beobachtbare Fakten innerhalb einer A/B/C-Familie bleiben absichtlich konsistent. Neun Diagramme und ihre Textalternativen werden durch dieselbe warme Redaktionsebene geführt.

## Gebauter Weg

Der primäre Weg ist endlich:

1. Ankommen
2. Geschichte
3. Gedanken sortieren
4. Dein nächster Schritt
5. Rückblick – nur nach ausdrücklich berichteter Durchführung
6. Abschluss

Der Fortschrittsbalken zeigt den höchsten erreichten Abschnitt mit 0, 20, 40, 60, 80 oder 100 Prozent. Zurückgehen und freies Stöbern vermindern oder erhöhen ihn nicht. Die nächste Etappe beginnt wieder bei Abschnitt 1. Am Ende von Etappe 14 wird niemals auf Etappe 15 erhöht.

Das Wissensregal ist vom Hauptweg getrennt. Freies Lesen verändert weder Kernzustand noch Fortschritt; „Zurück zu deiner Etappe“ setzt den geparkten Weg fort. Der Hauptweg folgt keinen alten Wissenskanten und kann daher nicht in K15/K16 oder K10/K18 kreisen.

## Sorge und Unterstützung

Die einheitliche Frage lautet:

> Befürchtest du Drohungen, Einschüchterung, Gewalt oder Kontrolle, die deine Freiheit einschränkt?

Die Oberfläche grenzt davon die gewöhnliche Sorge vor Enttäuschung oder einem schwierigen Gespräch ausdrücklich ab. Sie bietet vier Antworten: keine solche Sorge, Beispiele ansehen, ernsthafte Sorge, offenlassen.

Eine Radiowahl allein verändert weder Zustand noch Seite. Erst das Absenden übernimmt die Antwort. Beispiele und Offenlassen setzen nicht `concern`. Ein freiwilliger Hilfebesuch setzt ebenfalls keine Sorge-Antwort. Bei bestätigter ernster Sorge werden Praxisvorschläge geschlossen, Wissenskarten und freiwillige Hilfe bleiben erreichbar. Die Antwort kann ausdrücklich korrigiert werden; dabei steigen die Kontextrevision und frühere Zustimmungen, Pläne sowie Ergebnisse werden verworfen.

Die Hilfeseite nennt Deutschland und unterscheidet akute Gefahr von nicht akuter Beratung. Sie enthält Polizei 110, medizinischen Notruf 112 sowie offizielle Links für Hilfetelefon Gewalt gegen Frauen, Hilfetelefon Gewalt an Männern und WEISSER RING. Eine menschliche fachliche oder rechtliche Freigabe wird nicht behauptet.

## Speicherung und Datenschutz

Ohne Opt-in wird nichts dauerhaft gespeichert. Mit Opt-in bleiben ausschließlich `day`, `topic`, `perspective` und `goal` im Local Storage. Sorge, Zustimmungen, Ressourcen, Handlungen, Ergebnis, besuchte Karten und Abschnittsfortschritt bleiben flüchtig. Die vorhandene Datenschutzseite, Impressumsadresse, Urheberhinweise und `.nojekyll` bleiben erhalten.

## Prüfungen

Ausgeführt und bestanden:

- `npm test`: 12 Tests, 12 bestanden.
- `npm run test:http`: zehn browserseitig benötigte Assets über einen echten lokalen HTTP-Server erreichbar.
- Inhaltsprüfung: 260 Knoten, 859 Choice-IDs, 9 Diagramme; alle Textlängen innerhalb der W9-Spannen.
- Zustandsprüfung: alle 14 Etappen × 12 Themen × 3 Perspektiven × 6 normale Ziele haben einen vorhandenen endlichen Kernweg.
- Alle 36 Praxisbausteine sind unter passenden aktuellen Bedingungen erreichbar und bei `concern` gesperrt.
- DOM-Prüfung: Leseabschluss, Praxis/Planung/Durchführung/Rückblick, Radiowahl ohne Sofortnavigation, Sorgekorrektur und geparkte Wissenswege.
- Wiederholungsprüfung: keine identische längere Satzgruppe über verschiedene Szenenfamilien.

Nicht als bestanden ausgegeben:

- Echter Chromium-/Firefox-/WebKit-Lauf: Playwright ist verfügbar, in der Umgebung fehlt jedoch das Browser-Binary.
- Visuelle Kontrolle bei 320 CSS-Pixeln und echtem 200-%-Browserzoom.
- Screenreader-Prüfung.
- Menschliche fachliche, rechtliche und vollständige literarische Prüfung.
- Öffentliche Auslieferung und Kontrolle der Pages-URL; das gehört erst nach Astra-Prüfung und Freigabe in Phase 4.

## Dateien des Kandidaten

Laufzeit: `index.html`, `styles.css`, `app.mjs`, `runtime.mjs`, `storage.mjs`, `data.mjs`, `content-w9.mjs`, `flow.mjs`, `datenschutz.html`, `.nojekyll`.

Prüfung und Dokumentation: `package.json`, `package-lock.json`, `tests/`, `W9_REVIEW.md`, `README.md`.

## Auftrag für Phase 3

Astra soll die tatsächlichen Dateien und den Diff lesen, nicht nur dieses Dokument. Vollständig prüfen: 24 Wissenskarten, 36 Praxisbausteine, 56 kurze Etappen-/Orientierungs-/Rückblick-/Abschlusstexte, UI-, Sorge- und Hilfetexte. Zusätzlich mindestens eine vollständige A/B/C-Familie je Thema sowie alle automatischen Auffälligkeiten lesen. Technisch besonders prüfen: Abschnittsfortschritt, Zurück/Wissensregal, Korrektur der Sorge-Antwort, gemeinsame Zugangsbedingungen, kleine Ansicht und echte Browserbedienung.

`main` und die Live-Seite bleiben bis zur Prüfung unverändert.

