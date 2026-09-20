# W9-Korrekturkandidat 0.6.1: Phase-4-Nacharbeit

Stand: 20. September 2026  
Geplanter Arbeitsbranch: `work/w9-phase4-korrekturen`  
Ausgangscommit dieser Nacharbeit: `9710237e3961470c6106b6cc3c4ef9df6bc1b18b`  
Status: Korrekturkandidat für erneute Astra-Prüfung; **nicht auf `main` veröffentlicht**.

## Ergebnis

Der begrenzte Korrekturauftrag aus der unabhängigen Phase-4-Nachprüfung ist im Kandidaten umgesetzt. Die Website bleibt vollständig statisch: kein Backend, keine Laufzeit-KI, kein Konto, keine Freitexteingabe und keine Analyse- oder Werbedienste. Die dauerhafte Speicherung bleibt auf `day`, `topic`, `perspective` und `goal` beschränkt.

Der Kandidat ist noch keine öffentliche oder fachliche Freigabe. Echte Browser-, Zoom-, Screenreader- sowie unabhängige literarische, fachliche und rechtliche Prüfungen sind unten ausdrücklich offen ausgewiesen.

## Navigation und Zustand

- Verlaufseinträge speichern einen vollständigen Flow-Cursor samt Kontextrevision und Etappe. Beim Zurückgehen werden heutige Bedingungen erneut geprüft; veraltete Ziele fallen auf einen sicheren Orientierungspunkt zurück.
- Ansichtscursor, Besuchsgedächtnis der Sitzung und Wissensvoraussetzungen der aktuellen Etappe sind getrennt. Zurück verliert keine bereits geöffneten Szenen oder Karten; ein Folgetag erneuert trotzdem seine Übungsvoraussetzungen.
- Bestätigte ernsthafte Sorge ist in allen Formularen maßgeblich. Sie verwirft Pläne und Zustimmungen und verhindert Praxisanzeige und -planung, auch über alte Verlaufseinträge.
- Gemeinsame Schritte unterscheiden `blocked`, `needs_confirmation` und `allowed`. Eine bereits geplante oder berichtete Handlung öffnet nicht beiläufig eine zweite.
- Praxisereignisse tragen konkrete P-ID, Etappe und Kontextrevision. Veraltete Buttons oder Formulare werden nicht übernommen.
- Das eigentliche Planungsereignis verlangt zentral die Wissensvoraussetzung der aktuellen Etappe. Nach `not_done` bleibt das Fenster für eine zweite Handlung geschlossen.
- Startseite pausiert den aktuellen Durchgang. Beim Fortsetzen bleiben Abschnitt und Cursor erhalten.

## Weg, Fortschritt und Hilfe

- Bei knappen Mitteln erscheint K21 genau einmal vor der Geschichte; der Hauptbutton führt danach zur Geschichte.
- Diese K21-Priorität gilt auch nach „Beispiele lesen → vorerst für mich weiterlesen“. Beim Ziel Unterstützung führt derselbe Weg zur freiwilligen Unterstützungsseite.
- Nach „nicht ausprobiert“ folgt K20 und dann ein direkter Abschluss ohne Erfolgsrückschau.
- Erstbesuche werden anhand der genauen Szenen- beziehungsweise Wissens-ID erkannt und nicht mehr fälschlich als Wiederholung bezeichnet.
- Bereits geöffnete Fokuskarten führen zur nächsten deklarierten Alternative; sind die Alternativen erschöpft, folgt der Entscheidungspunkt statt einer erzwungenen Wiederholung. Ein zusammenhängender 14-Etappen-Test mit Ziel „Grenze“ erhält 14 verschiedene Fokuskarten.
- Aktuelle und abgeschlossene Etappen sind getrennt dargestellt; die aktuelle Etappe besitzt `aria-current="step"`. Der Fortschritt beschreibt Navigation, keine Verbesserung.
- Das Ziel „Unterstützung ansehen“ endet nach der Hilfeseite ehrlich, ohne zurück in eine Sorgeabfrage zu springen.
- Die Beispielseite zur Sorgefrage bietet drei klare Wege: gewöhnliche/private Sorge, ernsthafte Sorge oder freiwillige Hilfe.
- Bei bestätigter ernsthafter Sorge gibt es einen eigenen Abschluss ohne normalen „nächste Etappe“-Button.
- Themenkarten öffnen weiterhin den prüfbaren Kontextschritt für Thema, Perspektive und Ziel.
- Bei wenig Kapazität oder fehlender Zielpassung steht der Leseabschluss vor den nachgeordneten weiteren Möglichkeiten.

## Sorgefrage

Die Frage lautet:

> Befürchtest du Drohungen, Einschüchterung, Gewalt oder Kontrolle, die deine Freiheit einschränkt?

Direkt darunter wird erklärt, dass gewöhnliche Sorge vor Enttäuschung oder einem schwierigen Gespräch nicht gemeint ist. Beispiele nennen unter anderem Drohungen, Überwachung von Handy oder Kontakten, Druck nach einem Nein sowie die Sorge vor ernsthaften Folgen einer Grenze. Eine Radiowahl allein ändert weder Seite noch Zustand; erst das Absenden übernimmt die Antwort.

## Redaktionelle Abdeckung

| Inhalt | Knoten | Haupttexte neu/Referenz geprüft | Titel geändert | Wahltexte geändert/geprüft |
| --- | ---: | ---: | ---: | ---: |
| Szenen | 144 | 144 | 144 | 418 / 432 |
| Wissenskarten | 24 | 24 | 24 | 43 / 89 |
| Praxisbausteine | 36 | 36 | 35 | 52 / 72 |
| Etappeneinstiege | 14 | 14 | 14 | 14 / 14 |
| Orientierungen | 14 | 14 | 14 | 37 / 210 |
| Rückblicke | 14 | 14 | 14 | 28 / 28 |
| Abschlüsse | 14 | 14 | 14 | 13 / 14 |
| **Gesamt** | **260** | **260** | **259** | **605 / 859** |

Die 18 geprüften Referenzfassungen bleiben die Tonanker: `S-T01-F01-A/B/C`, `K01`, `K21`, `K24`, `P01`, `P03`, `P09`, `D01`, `O01`, `O04`, `O07`, `O12`, `O13`, `O14`, `R01`, `R02`. Die übrigen 242 Haupttexte haben individuelle Kandidatenfassungen. Alle gerenderten Haupttexte unterscheiden sich auch nach Leerraumnormalisierung von der öffentlichen Basis.

Die Szenen liegen bei 80–150 Wörtern, Wissen bei 70–140, Praxis bei 70–120, Einstiege bei 35–65, Orientierung bei 30–90, Rückblick bei 35–75 und Abschluss bei 30–70. Die zwölf in der Nachprüfung beanstandeten A/B-Paare sind wieder den festgelegten Rollen zugeordnet; Pronomen-, Motiv- und Pausen-/Zustimmungsfehler sind gezielt korrigiert. In T04–T12 hat jede A/B/C-Variante einen eigenen rollengerechten Schluss; die 35 gleichförmigen „Von außen“-Einstiege der offenen Perspektive wurden individuell ersetzt. Figurenfakten und technische Perspektivrollen bleiben unverändert.

`revision-manifest.json` enthält für jede ID die vollständig gerenderte Fassung, Bearbeitungsstatus, Prüfstatus und den SHA-256-Hash der unveränderten öffentlichen Quelle. Der Hash wird aus `id`, `title`, `body`, geordneten `{id,label}`-Wahltexten und `diagram` gebildet; Objektschlüssel werden rekursiv sortiert, Arrayreihenfolgen erhalten und Originalprosa nicht normalisiert.

`W9_CONTENT_AUDIT.json` prüft die tatsächlich gerenderten Texte. Ergebnis: 260 Knoten, 859 Wahltexte, neun Diagramme, keine unveränderten oder nur durch Leerraum geänderten Haupttexte, keine bekannten Grammatikmuster, keine identischen langen Sätze über verschiedene Szenenfamilien, keine offenen Perspektivrollentreffer, keine gleichen A/B/C-Schlüsse in T04–T12 und keine dort verbliebene „Von außen“-Formel. Diese Automatik ersetzt keine unabhängige literarische Prüfung.

## Reproduzierbarkeit und Dateien

`release-files.json` umfasst die vollständige, rekursiv aus `app.mjs` ermittelte Browser-Importliste sowie HTML, CSS, Datenschutz und `.nojekyll`. Zwei unabhängige Snapshots der 44 statischen Auslieferungsdateien waren byteidentisch. Es gibt keinen Build-Schritt und keinen Python- oder sonstigen Server im Produkt; der Python-Aufruf dient ausschließlich dem lokalen HTTP-Smoke-Test.

Hilfsbefehle:

```sh
npm ci
npm run manifest:w9
npm run validate:w9
npm run audit:content
npm run verify:release
npm test
npm run test:http
```

## Tatsächlich ausgeführte Prüfungen

- vollständige Inhaltsprüfung: 260 Knoten, 859 Choice-IDs, neun Diagramme und alle Wortspannen;
- Herkunftsprüfung: 260 Quell-Hashes und vollständige Kandidatenfassungen;
- Metadatenprüfung: IDs, Themen, Rollen, Gates, `requires_performed`, Ereignisse und weitere technische Felder unverändert;
- deterministische Inhaltserzeugung und zwei identische Release-Snapshots;
- alle 14 × 12 × 3 × 6 = 3.024 normalen Kontexte über echte App-Handler bis zum Leseabschluss;
- alle 36 Praxisbausteine über aktuelle UI-Gates geöffnet;
- alle fünf Ergebniswerte an die geplante Praxis gebunden;
- Regressionen zusätzlich für 14 verschiedene Etappenfokusse, Sitzungsgedächtnis nach Zurück, erschöpfte Alternativen, Nichtdurchführung mit Rückweg, Beispiele plus knappe Mittel, alte Formulare und Aktionsbuttons, Lesepriorität und bewahrten Abschlussstatus;
- Speicherung weiterhin exakt vier nicht sensible Auswahlfelder;
- 45 über lokalen HTTP-Server angeforderte Seiten/Assets einschließlich des vollständigen Modulgraphen.

Die abschließende lokale Suite bestand mit **38 von 38 Tests**; Validierung, Inhaltsaudit, Release-Snapshot und HTTP-Smoke-Test bestanden ebenfalls.

Die Antworten zur freiwilligen Mitwirkung bei Partnerübungen gelten für die aktuelle Kontextrevision. Sie behaupten keine Zustimmung zu einer konkreten Vereinbarung; diese wird bei `agreement` weiterhin zusätzlich abgefragt. Der Wechsel zwischen P05 und P06 verwendet daher dieselbe aktuelle allgemeine Mitwirkungsprüfung. Diese Reichweite ist bewusst dokumentiert und wird nicht als P-ID-spezifische Zustimmung dargestellt.

## Verbliebene Grenzen

- Der vorhandene Cloud-Browser konnte den unveröffentlichten lokalen Kandidaten über die erlaubten HTTP-/Dateizugänge nicht erreichen. LinkeDOM-Tests und HTTP-Smoke-Test sind kein Ersatz für einen echten Browser.
- Native Bedienung mit Tab, Enter und Radiobuttons, Fokusverlauf, Browserkonsole sowie tatsächliche Screenreader-Ausgabe bleiben offen.
- 320 CSS-Pixel und 200-%-Browserzoom konnten nicht visuell geprüft werden.
- Unabhängige Astra-, literarische, fachliche, Barrierefreiheits- und rechtliche Prüfung bleiben offen.
- Pages-Auslieferung der neuen Fassung bleibt absichtlich offen, weil dieser Branch nicht veröffentlicht wird.

## Aktualisierte 43-Punkte-Matrix

„Kandidat bestanden“ bezeichnet den dokumentierten automatischen beziehungsweise redaktionellen Kandidatenumfang, nicht die noch offene unabhängige Freigabe.

| ID | Ergebnis | Nachweis |
| --- | --- | --- |
| A01 | Kandidat bestanden | 260 vollständige Fassungen, Status und Quell-Hashes im Revisionsmanifest; 242 individuelle Neufassungen. |
| A02 | Kandidat bestanden | 859 Choice-IDs und neun Diagramme erhalten; bekannte Grammatikfehler korrigiert; vollständige Abdeckung im Manifest. |
| A03 | Bestanden | Deterministische Inhalte und zwei byteidentische Snapshots aller 44 Auslieferungsdateien. |
| A04 | Kandidat bestanden | Beanstandete Vorlagenfamilien haben rollenspezifische Schlüsse und variierte offene Perspektiven; unabhängige Literaturprüfung offen. |
| A05 | Kandidat bestanden | UI-, Ergebnis-, Wiederholungs- und Hilfetexte bereinigt; keine internen Rohwerte in der Ergebnisanzeige. |
| A06 | Kandidat bestanden | Zwölf vertauschte A/B-Paare und benannte Figuren-/Motivfehler korrigiert; alle 48 Familien automatisiert geprüft. |
| N01 | Bestanden | Normaler Leseweg bis ehrlichem Abschluss. |
| N02 | Bestanden | Hauptweg bleibt endlich und getrennt vom Wissensregal. |
| N03 | Bestanden | 3.024 Kontexte über tatsächliche App-Handler abgeschlossen. |
| N04 | Bestanden | Wenig Kapazität priorisiert den reinen Leseabschluss; Übungen bleiben freiwillig nachgeordnet. |
| N05 | Bestanden | K21 erscheint bei knappen Mitteln auch über den Beispiele-/Privatweg einmal vor der Geschichte. |
| N06 | Bestanden | Fehlende Zielpassung wird sichtbar; Lesen/Abschluss steht vor weiteren Möglichkeiten. |
| N07 | Bestanden | Alle 36 Praxisöffnungen; Wissensvoraussetzung auch beim zentralen Planungsereignis geprüft. |
| N08 | Bestanden im DOM-Umfang | Wissensausflug verändert den Fortschritt nicht; Cursor und Rückfall auf aktuellen Orientierungspunkt geprüft. |
| N09 | Bestanden | Folgetage übernehmen Kontext; zusammenhängender 14-Etappen-Weg verwendet 14 verschiedene deklarierte Fokuskarten. |
| N10 | Bestanden | Besuchsstatus nutzt genaue IDs und bleibt bei Zurück/Folgetag als Sitzungsgedächtnis erhalten. |
| F01 | Bestanden | Fortschritt ändert sich an Abschnittswechseln, nicht bei Radiowahl. |
| F02 | Bestanden | Lesen/früher Abschluss erfindet keine Durchführung oder Verbesserung. |
| F03 | Bestanden | Etappe 14 schließt ohne Tag 15; ein bewusster Abschluss bleibt bei bloßem Zurück als abgeschlossen markiert. |
| F04 | Bestanden im DOM-Umfang | Höchststand, Abschluss- und Besuchsgedächtnis bleiben bei Zurück/Wissensausflug und Startseitenpause erhalten. |
| F05 | Bestanden | Kontextrevision und erwartete Quellansicht schützen Verlauf, Formulare, Praxisplanung und Ergebnisse. |
| H01 | Bestanden | Planung setzt weder Durchführung noch Ergebnis. |
| H02 | Bestanden | Exakte P-ID, Etappe und Revision auch bei Nichtdurchführung; alle fünf Ergebniswerte geprüft. |
| H03 | Bestanden | Nichtdurchführung führt über K20 direkt zum Abschluss und sperrt eine zweite Handlung im Durchgang. |
| H04 | Bestanden | „Später“ ermöglicht Abschluss ohne erfundene Durchführung. |
| S01 | Bestanden | Gewöhnliche Gesprächssorge klar von ernster Gefahr abgegrenzt. |
| S02 | Bestanden im DOM-Umfang | Radiowahl allein navigiert nicht; native Browserprüfung bleibt B02. |
| S03 | Bestanden | Beispiele bieten private Sorge, ernsthafte Sorge und freiwillige Hilfe; nachfolgende Ziel-/Knappheitsprioritäten bleiben wirksam. |
| S04 | Bestanden | `unknown` erlaubt private Wege und keine gemeinsamen Freigaben. |
| S05 | Bestanden | Ernsthafte Sorge sperrt Praxis auch über Verlauf und setzt ausstehende Rechte zurück. |
| S06 | Bestanden | Explizite Korrektur erhöht Revision und verwirft Zustimmungen/Pläne. |
| S07 | Bestanden | Alte Cursor und Formulare werden gegen Quelle, Etappe, Revision, Wissen und aktuelle Bedingungen geprüft. |
| S08 | Bestanden | Freiwillige Hilfe setzt keine Sorge; Unterstützungsziel endet ohne neue Sorgeabfrage. |
| S09 | Bestanden im DOM-/Regelumfang | Kontextweite Mitwirkungsprüfung und konkrete Vereinbarungszustimmung sind getrennt und dokumentiert; Sorge-Reset zentral geprüft. |
| P01 | Bestanden | Dauerhaft exakt vier nicht sensible Felder. |
| P02 | Bestanden | Unerlaubte Felder werden nicht wiederhergestellt; flüchtiger Zustand bleibt flüchtig. |
| P03 | Bestanden im technischen Umfang | Datenschutz, Impressumsverweis und Speicherbeschreibung erhalten; keine Rechtsprüfung. |
| B01 | Offen | Kein echter Browserlauf verfügbar. |
| B02 | Offen | Native Tastatur-, Radio- und Formularbedienung nicht ausgeführt. |
| B03 | Offen | 320 CSS-Pixel und 200-%-Zoom nicht visuell geprüft. |
| B04 | Teilweise | Semantik, Labels, Fokus-CSS, Live-Region, `aria-current` und Fortschrittsname vorhanden; reale Fokus-/Screenreaderprüfung offen. |
| D01 | Bestanden | Nur öffentliche Kandidatendateien; Datenschutz, Urheberhinweise und `.nojekyll` erhalten. |
| D02 | Noch nicht fällig | Keine Veröffentlichung vor erneuter Prüfung und Freigabe. |

## Nächster Schritt

Nur den tatsächlichen neuen Branch-Diff, die in der Phase-4-Nachprüfung beanstandeten Punkte, `revision-manifest.json` und die neuen Regressionstests erneut unabhängig prüfen. Bereits unveränderte und zuvor geprüfte Bereiche müssen nicht vollständig wiederholt werden. Erst nach Entscheidung über B01–B04 und die unabhängigen Fachprüfungen darf über eine Veröffentlichung auf `main` entschieden werden.
