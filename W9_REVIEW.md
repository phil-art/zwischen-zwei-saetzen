# W9-Korrekturkandidat: warme Texte und sichere Wege

Stand: 20. September 2026  
Geplanter Arbeitsbranch: `work/w9-phase4-korrekturen`  
Geprüfte Basis: `f8a7b18540ad051754c770cb07a9c28f658464b1` (`work/w9-warme-texte`)  
Status: Korrekturkandidat für erneute Astra-Prüfung; **nicht auf `main` veröffentlicht**.

## Ergebnis

Der Korrekturauftrag aus dem Phase-3-Prüfbericht ist im Kandidaten umgesetzt. Die Website bleibt vollständig statisch: kein Backend, keine Laufzeit-KI, kein Konto, keine Freitexteingabe und keine Analyse- oder Werbedienste. Die dauerhafte Speicherung bleibt auf `day`, `topic`, `perspective` und `goal` beschränkt.

Der Kandidat ist noch keine öffentliche oder fachliche Freigabe. Echte Browser-, Zoom-, Screenreader- sowie unabhängige literarische, fachliche und rechtliche Prüfungen sind unten ausdrücklich offen ausgewiesen.

## Navigation und Zustand

- Verlaufseinträge speichern einen vollständigen Flow-Cursor samt Kontextrevision und Etappe. Beim Zurückgehen werden heutige Bedingungen erneut geprüft; veraltete Ziele fallen auf einen sicheren Orientierungspunkt zurück.
- Bestätigte ernsthafte Sorge ist in allen Formularen maßgeblich. Sie verwirft Pläne und Zustimmungen und verhindert Praxisanzeige und -planung, auch über alte Verlaufseinträge.
- Gemeinsame Schritte unterscheiden `blocked`, `needs_confirmation` und `allowed`. Eine bereits geplante oder berichtete Handlung öffnet nicht beiläufig eine zweite.
- Praxisereignisse tragen konkrete P-ID, Etappe und Kontextrevision. Veraltete Buttons oder Formulare werden nicht übernommen.
- Startseite pausiert den aktuellen Durchgang. Beim Fortsetzen bleiben Abschnitt und Cursor erhalten.

## Weg, Fortschritt und Hilfe

- Bei knappen Mitteln erscheint K21 genau einmal vor der Geschichte; der Hauptbutton führt danach zur Geschichte.
- Nach „nicht ausprobiert“ folgt K20 und dann ein direkter Abschluss ohne Erfolgsrückschau.
- Erstbesuche werden anhand der genauen Szenen- beziehungsweise Wissens-ID erkannt und nicht mehr fälschlich als Wiederholung bezeichnet.
- Aktuelle und abgeschlossene Etappen sind getrennt dargestellt; die aktuelle Etappe besitzt `aria-current="step"`. Der Fortschritt beschreibt Navigation, keine Verbesserung.
- Das Ziel „Unterstützung ansehen“ endet nach der Hilfeseite ehrlich, ohne zurück in eine Sorgeabfrage zu springen.
- Die Beispielseite zur Sorgefrage bietet drei klare Wege: gewöhnliche/private Sorge, ernsthafte Sorge oder freiwillige Hilfe.
- Bei bestätigter ernsthafter Sorge gibt es einen eigenen Abschluss ohne normalen „nächste Etappe“-Button.
- Themenkarten öffnen weiterhin den prüfbaren Kontextschritt für Thema, Perspektive und Ziel.

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

Die Szenen liegen bei 80–150 Wörtern, Wissen bei 70–140, Praxis bei 70–120, Einstiege bei 35–65, Orientierung bei 30–90, Rückblick bei 35–75 und Abschluss bei 30–70. Jede A/B/C-Familie behält denselben Anlass und einen offenen Ausgang; ihre Anfangsabsätze sind perspektivisch verschieden. Figurenfakten und technische Perspektivrollen bleiben unverändert.

`revision-manifest.json` enthält für jede ID die vollständig gerenderte Fassung, Bearbeitungsstatus, Prüfstatus und den SHA-256-Hash der unveränderten öffentlichen Quelle. Der Hash wird aus `id`, `title`, `body`, geordneten `{id,label}`-Wahltexten und `diagram` gebildet; Objektschlüssel werden rekursiv sortiert, Arrayreihenfolgen erhalten und Originalprosa nicht normalisiert.

`W9_CONTENT_AUDIT.json` prüft die tatsächlich gerenderten Texte. Ergebnis: 260 Knoten, 859 Wahltexte, neun Diagramme, keine unveränderten oder nur durch Leerraum geänderten Haupttexte, keine bekannten Grammatikmuster und keine identischen langen Sätze über verschiedene Szenenfamilien. Diese Automatik ersetzt keine literarische Prüfung.

## Reproduzierbarkeit und Dateien

`release-files.json` umfasst die vollständige, rekursiv aus `app.mjs` ermittelte Browser-Importliste sowie HTML, CSS, Datenschutz und `.nojekyll`. Zwei unabhängige Snapshots der 43 statischen Auslieferungsdateien waren byteidentisch. Es gibt keinen Build-Schritt und keinen Python- oder sonstigen Server im Produkt; der Python-Aufruf dient ausschließlich dem lokalen HTTP-Smoke-Test.

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
- Regressionen für Rückwege, Sorgewechsel, K21, K20, Unterstützung, Wiederholungsmarkierung, Startseitenpause und ernsthaften Sorgeabschluss;
- Speicherung weiterhin exakt vier nicht sensible Auswahlfelder;
- 44 über lokalen HTTP-Server angeforderte Seiten/Assets einschließlich des vollständigen Modulgraphen.

## Verbliebene Grenzen

- Kein echtes Chromium-/Firefox-/WebKit-Binary war in der Arbeitsumgebung verfügbar. LinkeDOM-Tests und HTTP-Smoke-Test sind kein Ersatz für einen echten Browser.
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
| A03 | Bestanden | Deterministische Inhalte und zwei byteidentische Snapshots aller 43 Auslieferungsdateien. |
| A04 | Kandidat bestanden | Warme, alltagsnahe Einzelredaktion in den vereinbarten Wortspannen; unabhängige Literaturprüfung offen. |
| A05 | Kandidat bestanden | UI-, Ergebnis-, Wiederholungs- und Hilfetexte bereinigt; keine internen Rohwerte in der Ergebnisanzeige. |
| A06 | Kandidat bestanden | Alle 48 A/B/C-Familien im Render-Audit; gleicher Anlass, verschiedene Perspektivanfänge, offener Ausgang. |
| N01 | Bestanden | Normaler Leseweg bis ehrlichem Abschluss. |
| N02 | Bestanden | Hauptweg bleibt endlich und getrennt vom Wissensregal. |
| N03 | Bestanden | 3.024 Kontexte über tatsächliche App-Handler abgeschlossen. |
| N04 | Bestanden | Wenig Kapazität und offene Sorge erlauben private beziehungsweise reine Lesewege. |
| N05 | Bestanden | K21 erscheint bei knappen Mitteln einmal vor der Geschichte. |
| N06 | Bestanden | Fehlende Zielpassung wird sichtbar; Lesen/Abschluss bleibt vorrangig. |
| N07 | Bestanden | Alle 36 Praxisöffnungen und aktuelle zentrale Gates geprüft. |
| N08 | Bestanden im DOM-Umfang | Wissensausflug verändert den Fortschritt nicht; Cursor und Rückfall auf aktuellen Orientierungspunkt geprüft. |
| N09 | Bestanden | Folgetage übernehmen Kontext; Themenkarten führen über den prüfbaren Kontextschritt. |
| N10 | Bestanden | Besuchsstatus nutzt genaue IDs; erster Aufruf ist keine Wiederholung. |
| F01 | Bestanden | Fortschritt ändert sich an Abschnittswechseln, nicht bei Radiowahl. |
| F02 | Bestanden | Lesen/früher Abschluss erfindet keine Durchführung oder Verbesserung. |
| F03 | Bestanden | Etappe 14 schließt ohne Tag 15; aktuell/abgeschlossen und `aria-current` getrennt. |
| F04 | Bestanden im DOM-Umfang | Höchststand bleibt bei Zurück/Wissensausflug und Startseitenpause erhalten. |
| F05 | Bestanden | Kontextrevision schützt Verlauf, Formulare, Praxisplanung und Ergebnisse. |
| H01 | Bestanden | Planung setzt weder Durchführung noch Ergebnis. |
| H02 | Bestanden | Exakte P-ID, Etappe und Revision; alle fünf Ergebniswerte geprüft. |
| H03 | Bestanden | Nichtdurchführung führt über K20 direkt zum Abschluss. |
| H04 | Bestanden | „Später“ ermöglicht Abschluss ohne erfundene Durchführung. |
| S01 | Bestanden | Gewöhnliche Gesprächssorge klar von ernster Gefahr abgegrenzt. |
| S02 | Bestanden im DOM-Umfang | Radiowahl allein navigiert nicht; native Browserprüfung bleibt B02. |
| S03 | Bestanden | Beispiele bieten private Sorge, ernsthafte Sorge und freiwillige Hilfe. |
| S04 | Bestanden | `unknown` erlaubt private Wege und keine gemeinsamen Freigaben. |
| S05 | Bestanden | Ernsthafte Sorge sperrt Praxis auch über Verlauf und setzt ausstehende Rechte zurück. |
| S06 | Bestanden | Explizite Korrektur erhöht Revision und verwirft Zustimmungen/Pläne. |
| S07 | Bestanden | Alte Cursor werden gegen aktuelle Bedingungen normalisiert. |
| S08 | Bestanden | Freiwillige Hilfe setzt keine Sorge; Unterstützungsziel endet ohne neue Sorgeabfrage. |
| S09 | Bestanden im DOM-/Regelumfang | Gemeinsame Freigaben, Ablehnung und Sorge-Reset zentral geprüft. |
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

Den tatsächlichen Branch-Diff, `revision-manifest.json`, die neuen Regressionstests und stichprobenartig alle Inhaltsgruppen erneut mit Astra prüfen. Erst nach Entscheidung über B01–B04 und die unabhängigen Fachprüfungen darf über eine Veröffentlichung auf `main` entschieden werden.
