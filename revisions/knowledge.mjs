// Explicit W9 revision data. Each entry is reviewed and versioned by stable node ID.
export const REVISIONS = Object.freeze({
  "K01": {
    "title": "Was dort steht – und was du darin hörst",
    "body": "Eine Nachricht besteht aus einem Wort. Beim Lesen kommt vielleicht ein ganzer Satz dazu: „Sie hat keine Lust auf mich.“ Das ist verständlich, besonders wenn du auf eine andere Antwort gehofft hast.\n\nTrotzdem sind das zwei verschiedene Dinge. Das Wort steht auf dem Bildschirm. Die vermutete Ablehnung ist eine mögliche Erklärung dafür. Vielleicht trifft sie zu, vielleicht fehlt dir noch etwas, um die Nachricht zu verstehen.\n\nDu kannst beides nebeneinanderhalten: Was ist tatsächlich passiert? Und was vermute ich gerade? Dein Gefühl wird dadurch nicht unwichtig. Du gibst dir nur etwas mehr Raum, bevor aus einer Vermutung Gewissheit wird.",
    "choice_labels": {
      "E0699": "Eigene Beobachtung sortieren",
      "E0726": "Bisherige Absprache prüfen",
      "E0807": "Mehrere Deutungen offenhalten",
      "E0808": "Was im Alltag tatsächlich schwer ist mitbedenken"
    },
    "diagram": {
      "nodes": [
        {
          "id": "n1",
          "label": "Beobachtung"
        },
        {
          "id": "n2",
          "label": "Deutung"
        },
        {
          "id": "n3",
          "label": "Mehrere mögliche Bedeutungen"
        }
      ],
      "edges": [
        {
          "from": "n1",
          "to": "n2",
          "label": "wird gedeutet als"
        },
        {
          "from": "n2",
          "to": "n3",
          "label": "ist nur eine von"
        }
      ],
      "text_alternative": "Von einer Beobachtung kann eine Deutung ausgehen; diese Deutung ist nur eine von mehreren möglichen Bedeutungen."
    }
  },
  "K02": {
    "title": "Mehr als eine mögliche Erklärung",
    "body": "Manche Situationen wirken sofort eindeutig, obwohl mehrere Erklärungen offen sein können. Vielleicht war eine knappe Antwort ein Zeichen von Ärger; vielleicht war schlicht wenig Zeit. Beides darf als Möglichkeit nebeneinanderstehen, ohne dass heute entschieden werden muss, was „wirklich“ dahintersteckte.\n\nEine Vermutung ist hier eher ein Post-it als ein Gerichtsurteil: nützlich genug zum Anschauen, leicht genug zum Ablösen. Auch eine dritte Möglichkeit darf später auftauchen. Es geht nicht darum, etwas automatisch freundlicher umzudeuten, sondern die Unsicherheit ehrlich zu lassen.\n\nWenn die Fakten keine eindeutige Ursache zeigen, darf genau das das Ergebnis sein: zwei oder mehr offene Hypothesen, keine Siegerin.",
    "choice_labels": {
      "E0708": "Alternative Deutung offenlassen",
      "E0809": "Kontext und Verantwortung prüfen",
      "E0810": "Konkrete Bitte ansehen",
      "E0811": "Ansehen, was tatsächlich schwer ist"
    },
    "diagram": null
  },
  "K03": {
    "title": "Wie viel ist heute möglich?",
    "body": "Bevor du dich mit einem schwierigen Thema beschäftigst, kannst du prüfen, ob heute überhaupt Platz dafür ist. Vielleicht ist Zeit da, aber kaum Aufmerksamkeit; vielleicht ist beides knapp. Wenig Kapazität ist ein ausreichender Grund, etwas liegenzulassen, zu verkleinern oder auf später zu verschieben.\n\nEin innerer Kalender muss nicht heldenhaft sein; manchmal trägt er schon drei Einkaufstüten und einen imaginären Kaktus. Aus deiner Wahl lässt sich kein Körperzustand und keine Diagnose ableiten. Du musst auch kein Gespräch beginnen, nur weil ein Thema wichtig ist.\n\nDie private Frage lautet schlicht: Habe ich heute genug Raum dafür? „Nein“, „nur ein bisschen“ und „weiß nicht“ sind vollständige Antworten.",
    "choice_labels": {
      "E0744": "Eigenes Stoppsignal bemerken",
      "E0812": "Eigene Pause ansehen",
      "E0813": "Mein Ziel noch einmal ansehen"
    },
    "diagram": null
  },
  "K04": {
    "title": "Eine Pause für dich",
    "body": "Eine eigene Pause bedeutet: Du unterbrichst für dich, ohne daraus automatisch eine gemeinsame Vereinbarung zu machen. Du kannst zum Beispiel entscheiden, jetzt nicht weiterzuschreiben, einen Raum zu verlassen oder das Thema heute nicht weiterzuverfolgen. Ob und wann das Gegenüber ebenfalls pausiert oder später zurückkehrt, liegt nicht in deiner Hand.\n\nEine Pause ist kein Bumerang mit eingebauter Rückkehrgarantie. Sie darf auch ohne festes Wiederaufnahme-Datum bestehen, wenn du das so brauchst. Davon verschieden ist eine gemeinsam vereinbarte Gesprächspause: Dafür braucht es Zustimmung zu den gemeinsamen Bedingungen.\n\nEine eigene Pause kann also vollständig sein, auch wenn keine gemeinsame Absprache zustande kommt und die weitere Richtung offenbleibt.",
    "choice_labels": {
      "E0702": "Eigene Pause wählen",
      "E0738": "Eigene Ruhezeit prüfen",
      "E0747": "Gesprächspause gemeinsam vereinbaren",
      "E0814": "Mein Ziel noch einmal ansehen",
      "E0815": "Meinen Spielraum ansehen"
    },
    "diagram": {
      "nodes": [
        {
          "id": "d1",
          "label": "Eigene Pause"
        },
        {
          "id": "d2",
          "label": "Eigene Entscheidung: unterbrechen"
        },
        {
          "id": "d3",
          "label": "Rückkehr des Gegenübers"
        },
        {
          "id": "d4",
          "label": "Gemeinsame Pause: nur mit Zustimmung"
        }
      ],
      "edges": [
        {
          "from": "d1",
          "to": "d2",
          "label": "liegt im eigenen Bereich"
        },
        {
          "from": "d1",
          "to": "d3",
          "label": "garantiert nicht"
        },
        {
          "from": "d1",
          "to": "d4",
          "label": "ist verschieden von"
        }
      ],
      "text_alternative": "Eine eigene Pause liegt im eigenen Entscheidungsbereich. Sie garantiert keine Rückkehr des Gegenübers. Eine gemeinsame Gesprächspause ist davon verschieden und setzt Zustimmung voraus."
    }
  },
  "K05": {
    "title": "Wenn sich ein Ablauf wiederholt",
    "body": "Wenn etwas wiederholt ähnlich abläuft, kannst du die Abfolge vorsichtig beschreiben, ohne daraus eine endgültige Erklärung zu machen. Zum Beispiel: Ein Thema kommt auf, eine Person drängt auf Klärung, die andere zieht sich zurück, danach wird das Thema später erneut aufgegriffen. Das ist zunächst nur eine beobachtete Reihenfolge, keine Diagnose und kein Beweis dafür, dass beide gleich verantwortlich sind.\n\nEin Muster ist eher eine Bleistiftskizze als ein Familienwappen. Sie kann ergänzt, korrigiert oder verworfen werden. Auch äußere Belastungen oder ungleiche Einflussmöglichkeiten können Teil der Situation sein.\n\nDie nützliche Frage lautet deshalb nicht „Was sind wir für Typen? “, sondern „Welche Abfolge scheint sich bisher manchmal zu wiederholen? “",
    "choice_labels": {
      "E0816": "Meinen Spielraum ansehen",
      "E0817": "Ansehen, was tatsächlich schwer ist"
    },
    "diagram": {
      "nodes": [
        {
          "id": "d1",
          "label": "Thema kommt auf"
        },
        {
          "id": "d2",
          "label": "Eine Person drängt auf Klärung"
        },
        {
          "id": "d3",
          "label": "Andere Person zieht sich zurück"
        },
        {
          "id": "d4",
          "label": "Thema wird später erneut aufgegriffen"
        },
        {
          "id": "d5",
          "label": "Arbeitshypothese, keine Diagnose"
        }
      ],
      "edges": [
        {
          "from": "d1",
          "to": "d2",
          "label": "kann folgen"
        },
        {
          "from": "d2",
          "to": "d3",
          "label": "kann folgen"
        },
        {
          "from": "d3",
          "to": "d4",
          "label": "kann folgen"
        },
        {
          "from": "d4",
          "to": "d5",
          "label": "Abfolge bleibt"
        }
      ],
      "text_alternative": "Eine mögliche Abfolge lautet: Ein Thema kommt auf, eine Person drängt auf Klärung, die andere zieht sich zurück, und das Thema wird später erneut aufgegriffen. Diese Abfolge bleibt eine Arbeitshypothese und keine Diagnose."
    }
  },
  "K06": {
    "title": "Was rundherum mitwirkt",
    "body": "Belastung kann Verhalten mit erklären, ohne es automatisch zu entschuldigen. Zeitdruck, Geldsorgen, Pflegeaufgaben oder andere reale Anforderungen können beeinflussen, wie viel Raum jemand für ein Thema hat. Gleichzeitig bleibt wichtig, was tatsächlich passiert: Schädigendes, kontrollierendes oder entwertendes Verhalten wird nicht harmlos, nur weil der Tag anstrengend war.\n\nKontext ist also Hintergrund, kein Radiergummi. Ebenso wäre es zu kurz gegriffen, ein Macht- oder Verteilungsproblem einfach als Müdigkeit zu beschreiben. Du kannst beides getrennt betrachten: Welche Belastungen sind vorhanden, und welche Verantwortung gehört trotzdem zu konkretem Verhalten oder zu bestehenden Bedingungen?\n\nDie Antwort darf unvollständig bleiben; sie muss keine umfassende Ursache liefern.",
    "choice_labels": {
      "E0818": "Für mich klären, was mir wichtig ist",
      "E0819": "Ansehen, was tatsächlich schwer ist"
    },
    "diagram": null
  },
  "K07": {
    "title": "Ein Gefühl für dich benennen",
    "body": "Du kannst ein eigenes Gefühl privat benennen, wenn das hilfreich erscheint, und du darfst es genauso gut unklar lassen. Vielleicht passt „ärgerlich“, „traurig“, „angespannt“, „erleichtert“ oder nur „irgendwie daneben“. Es muss nicht das eine, tiefere oder „wahre“ Gefühl gefunden werden.\n\nGefühle sind hier keine Matroschka-Puppen, bei denen ganz innen zwingend die endgültige Wahrheit sitzt. Auch gemischte oder widersprüchliche Eindrücke dürfen nebeneinanderstehen. Diese Klärung bleibt bei dir; daraus entsteht keine Pflicht, etwas mitzuteilen oder ein Gespräch zu führen.\n\nWenn kein Wort passt, kann „noch unklar“ das Ergebnis sein. Entscheidend ist nur, dass du keine Erklärung erfinden musst, um die eigene Erfahrung ordentlich abzuschließen.",
    "choice_labels": {
      "E0820": "Für mich klären, was mir wichtig ist",
      "E0821": "Mein Ziel noch einmal ansehen"
    },
    "diagram": null
  },
  "K08": {
    "title": "Was dir wichtig ist",
    "body": "Ein eigenes Anliegen lässt sich privat formulieren, ohne dass daraus eine Nachricht, Bitte oder Offenlegung entstehen muss. Du könntest etwa festhalten: „Ich wünsche mir mehr Verlässlichkeit bei Absprachen“ oder „Ich brauche mehr Abstand bei diesem Thema. “ Das ist zunächst nur eine Orientierung für dich.\n\nPrivate Klärung ist kein Entwurf mit automatischem Senden-Knopf; der Umschlag darf in der Schublade bleiben. Du musst das Anliegen weder begründen noch besonders tief erklären. Es kann konkret, vorläufig oder unvollständig sein.\n\nEbenso darfst du später feststellen, dass sich die Formulierung verändert. Das Ziel ist nicht, das Gegenüber zu einer Reaktion zu bewegen, sondern für dich kenntlich zu machen, worum es dir im Moment überhaupt geht.",
    "choice_labels": {
      "E0735": "Eigenes Näheanliegen privat klären",
      "E0822": "Mein Ziel noch einmal ansehen",
      "E0823": "Eine Grenze für mich klären"
    },
    "diagram": null
  },
  "K09": {
    "title": "Was möchtest du heute?",
    "body": "Du kannst für dich eine Richtung wählen, ohne sofort eine große Entscheidung daraus zu machen. Mögliche Ziele sind zum Beispiel: erst beobachten, Abstand halten, eine konkrete Sache klären, eine Pause machen oder vorerst gar nichts tun. Auch „Ich entscheide das heute nicht“ ist eine Richtung.\n\nEin Ziel ist hier eher ein Wegweiser als ein Vertrag mit dem Universum; es darf später gedreht werden. Beziehungserhalt ist nicht automatisch das einzige oder richtige Ziel. Ebenso kann Nähe, Distanz oder Offenlassen passend sein, ohne dass daraus schon eine Handlung folgt.\n\nDie zentrale Frage lautet: Was soll für mich als Nächstes im Vordergrund stehen? Wenn darauf keine klare Antwort kommt, darf das Ziel ausdrücklich offenbleiben.",
    "choice_labels": {
      "E0798": "Eigenes Ziel erneut prüfen",
      "E0824": "Beobachtung und Deutung unterscheiden",
      "E0825": "Meinen Spielraum ansehen",
      "E0826": "Noch nicht entscheiden"
    },
    "diagram": null
  },
  "K10": {
    "title": "Was liegt bei dir – und was nicht?",
    "body": "Es kann helfen, drei Bereiche auseinanderzuhalten. Im eigenen Bereich liegen zum Beispiel deine Entscheidung, ob du antwortest, welche Grenze du setzt oder welchen nächsten Schritt du planst. Im gemeinsamen Bereich liegen Dinge, die Zustimmung oder einen gemeinsamen Schritt mehrerer Personen brauchen, etwa eine Vereinbarung.\n\nAußerhalb deiner Kontrolle liegen fremde Entscheidungen, Reaktionen und Gefühle. Diese Bereiche sind keine drei Schubladen mit perfektem Etikettendrucker, aber sie verhindern einen wichtigen Kurzschluss: Ein eigener Plan erzeugt keine fremde Reaktion. Du kannst also etwas Sinnvolles für dich vorbereiten, auch wenn niemand mitmacht.\n\nWo etwas gemeinsam werden soll, braucht es tatsächliche Beteiligung; wo das fehlt, bleibt dein eigener Anteil trotzdem bei dir.",
    "choice_labels": {
      "E0720": "Eigenen machbaren Plan wählen",
      "E0768": "Eigene Belastungsgrenze prüfen",
      "E0827": "Eine Grenze für mich klären",
      "E0828": "Eine kleine Möglichkeit ansehen",
      "E0829": "Noch nicht entscheiden"
    },
    "diagram": {
      "nodes": [
        {
          "id": "d1",
          "label": "Eigener Bereich"
        },
        {
          "id": "d2",
          "label": "Gemeinsamer Bereich"
        },
        {
          "id": "d3",
          "label": "Nicht kontrollierbarer Bereich"
        },
        {
          "id": "d4",
          "label": "Eigene Entscheidungen und Handlungen"
        },
        {
          "id": "d5",
          "label": "Vereinbarungen mit Zustimmung"
        },
        {
          "id": "d6",
          "label": "Fremde Reaktionen und Entscheidungen"
        }
      ],
      "edges": [
        {
          "from": "d1",
          "to": "d4",
          "label": "umfasst"
        },
        {
          "from": "d2",
          "to": "d5",
          "label": "umfasst"
        },
        {
          "from": "d3",
          "to": "d6",
          "label": "umfasst"
        }
      ],
      "text_alternative": "Der eigene Bereich umfasst eigene Entscheidungen und Handlungen. Der gemeinsame Bereich umfasst Vereinbarungen, die Zustimmung brauchen. Der nicht kontrollierbare Bereich umfasst fremde Reaktionen und Entscheidungen."
    }
  },
  "K11": {
    "title": "Eine klare, offene Bitte",
    "body": "Eine konkrete Bitte beschreibt möglichst klar, worum es geht, ohne daraus eine Pflicht für die andere Person zu machen. Sie kann sich auf etwas Beobachtbares und auf einen begrenzten Wunsch beziehen: Was wäre hilfreich, wann oder in welchem Rahmen? Entscheidend bleibt, dass ein Nein möglich ist.\n\nEine Bitte ist kein Vertrag, der heimlich beim Aussprechen unterschrieben wird. Ebenso muss sie nicht überhaupt gestellt werden. Man kann sie nur gedanklich formulieren, später prüfen oder ganz lassen.\n\nDieser Baustein erklärt also eine Möglichkeit, nicht die Notwendigkeit eines Gesprächs. Falls eine Bitte tatsächlich geäußert werden soll, sollte vorher geprüft werden, ob die Situation und die eigenen Voraussetzungen dafür gerade passen.",
    "choice_labels": {
      "E0705": "Um Klärung bitten",
      "E0729": "Um einen Zeitpunkt bitten",
      "E0741": "Ein Gespräch anbieten",
      "E0750": "Einen Satz privat entwerfen",
      "E0792": "Eine Nachricht nur privat entwerfen",
      "E0830": "Prüfen, was angekommen ist",
      "E0831": "Was im Alltag tatsächlich schwer ist mitbedenken"
    },
    "diagram": null
  },
  "K12": {
    "title": "Ist dasselbe angekommen?",
    "body": "Eine Verständnisfrage kann dazu dienen, die Aussage des Gegenübers genauer zu erfassen, ohne Zustimmung zu signalisieren. Sie könnte zum Beispiel lauten: „Meinst du, dass dir der Zeitpunkt zu knapp war? “ oder „Habe ich richtig verstanden, dass du heute darüber nicht sprechen möchtest?\n\n“ Damit wird nur geprüft, ob die Aussage korrekt angekommen ist. Verstehen ist kein unsichtbarer Zustimmungsstempel. Ebenso besteht keine Pflicht, eine solche Frage zu stellen oder ein Gespräch fortzusetzen.\n\nWenn dir das Thema, der Zeitpunkt oder das Medium nicht passt, kann die Klärung ausbleiben. Eine einzelne Verständnisfrage ist außerdem kein Gesprächsmanual und keine Garantie für einen bestimmten Verlauf. Sie ist lediglich eine mögliche, begrenzte Form der Nachfrage.",
    "choice_labels": {
      "E0714": "Eine Verständnisfrage stellen",
      "E0765": "Ressourcen gemeinsam besprechen",
      "E0832": "Vereinbarung und eigenen Plan unterscheiden",
      "E0833": "Meinen Spielraum ansehen"
    },
    "diagram": null
  },
  "K13": {
    "title": "Wie und wann ihr sprecht",
    "body": "Wie und wann du kommunizieren möchtest, kann Teil deiner eigenen Entscheidung sein. Manche Themen lassen sich für dich schriftlich klarer fassen; andere möchtest du lieber später, kürzer oder gar nicht besprechen. Eine Präferenz für Text, Gespräch, Abstand oder einen anderen Zeitpunkt ist kein Defizit.\n\nDer perfekte Kommunikationskanal sitzt nicht auf einem goldenen Thron und verteilt Noten. Praktisch kann die Frage lauten: Welches Medium und welcher Zeitpunkt sind für mich gerade überhaupt passend? Auch „heute keines“ ist möglich.\n\nDiese Wahl sagt nichts darüber aus, wie das Gegenüber reagieren wird, und sie verpflichtet dich nicht zur Offenlegung. Sie hilft lediglich, die Form einer möglichen Kommunikation von ihrem Inhalt zu unterscheiden.",
    "choice_labels": {
      "E0789": "Passendes Medium wählen",
      "E0858": "Konkrete Bitte ansehen",
      "E0859": "Eigene Kapazität prüfen"
    },
    "diagram": null
  },
  "K14": {
    "title": "Dein Plan oder eure Vereinbarung?",
    "body": "Eine gemeinsame Vereinbarung und ein eigener Plan sehen manchmal ähnlich aus, sind aber nicht dasselbe. „Ich erledige meinen Teil am Dienstag“ kann ein eigener Plan sein. „Wir teilen die Aufgabe ab jetzt so auf“ ist erst dann eine Vereinbarung, wenn die Beteiligten dem tatsächlich zustimmen und die nötigen Ressourcen dafür vorhanden sind.\n\nEine einseitige Zusage trägt also kein Gemeinschaftstrikot, nur weil „wir“ daraufgeschrieben wurde. Fehlt Zustimmung, bleibt es bei einem eigenen Vorhaben oder einem Vorschlag. Auch Zustimmung allein ersetzt nicht die Frage, ob Zeit, Geld, Zugang oder andere Voraussetzungen vorhanden sind.\n\nDie Unterscheidung schützt vor falschen Annahmen darüber, was wirklich gemeinsam beschlossen wurde und was nur eine Person plant.",
    "choice_labels": {
      "E0723": "Aufgaben gemeinsam vereinbaren",
      "E0777": "Aufgabenteilung gemeinsam vereinbaren",
      "E0795": "Kontaktzeiten gemeinsam vereinbaren",
      "E0834": "Meinen Spielraum ansehen",
      "E0835": "Ansehen, was tatsächlich schwer ist"
    },
    "diagram": {
      "nodes": [
        {
          "id": "d1",
          "label": "Eigener Plan"
        },
        {
          "id": "d2",
          "label": "Vorschlag"
        },
        {
          "id": "d3",
          "label": "Zustimmung vorhanden"
        },
        {
          "id": "d4",
          "label": "Ressourcen vorhanden"
        },
        {
          "id": "d5",
          "label": "Gemeinsame Vereinbarung"
        }
      ],
      "edges": [
        {
          "from": "d1",
          "to": "d2",
          "label": "kann angeboten werden als"
        },
        {
          "from": "d2",
          "to": "d3",
          "label": "wird geprüft auf"
        },
        {
          "from": "d3",
          "to": "d4",
          "label": "zusätzlich prüfen"
        },
        {
          "from": "d4",
          "to": "d5",
          "label": "ermöglicht bei Zustimmung"
        }
      ],
      "text_alternative": "Ein eigener Plan kann als Vorschlag angeboten werden. Für eine gemeinsame Vereinbarung braucht es tatsächliche Zustimmung und passende Ressourcen; ohne diese bleibt es ein eigener Plan oder Vorschlag."
    }
  },
  "K15": {
    "title": "Eine Grenze für dich",
    "body": "Eine eigene Grenze beschreibt, was für dich mindestens gelten muss oder was du selbst tun wirst, wenn etwas für dich nicht passt. Sie ist keine Methode, um das Verhalten des Gegenübers zu testen oder zu steuern. Du kannst sie zunächst vollständig privat klären, etwa zu Kontakt, Zeit, Geld, Aufgaben oder persönlicher Information.\n\nEine Grenze ist eher eine Grundstückslinie als eine Fernbedienung: Sie markiert deinen Bereich, sie kontrolliert keinen anderen Menschen. Wenn du Sorge vor einer Situation hast, besteht keine Pflicht zur Konfrontation. Ebenso trägst du nicht die Verantwortung für fremdes kontrollierendes oder schädigendes Verhalten.\n\nDie private Frage kann lauten: Welche Mindestbedingung brauche ich für meinen nächsten eigenen Schritt?",
    "choice_labels": {
      "E0753": "Eigenes Nein privat klären",
      "E0759": "Eigene Mindestbedingungen notieren",
      "E0780": "Eigene Privatheit klären",
      "E0783": "Ereignis an eigenen Standards prüfen",
      "E0836": "Bei dem bleiben, was wirklich schwierig ist",
      "E0837": "Noch nicht entscheiden"
    },
    "diagram": null
  },
  "K16": {
    "title": "Wenn etwas wirklich schwierig ist",
    "body": "Realität anzuerkennen bedeutet hier nur, einen vorhandenen Umstand als vorhanden zu behandeln. Zum Beispiel: Eine Vereinbarung wurde nicht eingehalten, ein Wunsch wird nicht geteilt, Geld ist knapp oder eine Entscheidung bleibt offen. Anerkennen heißt nicht, das gutzuheißen, zu entschuldigen oder dabei zu bleiben.\n\nEs ist eher das Abstellen eines Regenschirms im Flur: Der Regen wird dadurch weder schön noch moralisch korrekt, aber er wird auch nicht wegdiskutiert. Aus der Anerkennung kann anschließend Verschiedenes folgen, einschließlich einer Grenze, Abstand, Unterstützung oder keiner sofortigen Entscheidung. Sie verpflichtet weder zu Versöhnung noch dazu, Schädigung hinzunehmen.\n\nDer Zweck ist nur, die nächste eigene Überlegung auf den tatsächlichen Umständen aufzubauen.",
    "choice_labels": {
      "E0838": "Eine Grenze für mich klären",
      "E0839": "Noch nicht entscheiden"
    },
    "diagram": {
      "nodes": [
        {
          "id": "d1",
          "label": "Vorhandenen Umstand anerkennen"
        },
        {
          "id": "d2",
          "label": "Zustimmen"
        },
        {
          "id": "d3",
          "label": "Bleiben"
        },
        {
          "id": "d4",
          "label": "Nächste eigene Überlegung"
        }
      ],
      "edges": [
        {
          "from": "d1",
          "to": "d2",
          "label": "bedeutet nicht"
        },
        {
          "from": "d1",
          "to": "d3",
          "label": "bedeutet nicht"
        },
        {
          "from": "d1",
          "to": "d4",
          "label": "kann Grundlage sein für"
        }
      ],
      "text_alternative": "Einen vorhandenen Umstand anzuerkennen bedeutet weder automatisch zuzustimmen noch zu bleiben. Die Anerkennung kann lediglich die Grundlage für die nächste eigene Überlegung bilden."
    }
  },
  "K17": {
    "title": "Den eigenen Anteil ansehen",
    "body": "Wenn du den eigenen Anteil betrachten möchtest, bleib bei konkretem eigenem Verhalten. Vielleicht hast du etwas zugesagt und nicht erledigt, einen Satz gesagt, den du korrigieren möchtest, oder eine Information zu spät weitergegeben. Daraus kann eine mögliche Reparatur entstehen, etwa eine Korrektur, Entschuldigung oder praktische Wiedergutmachung.\n\nSie bleibt ein Angebot, kein Gutschein mit Annahmepflicht. Das Gegenüber muss eine Entschuldigung nicht annehmen und muss auch nicht auf eine bestimmte Weise reagieren. Ebenso bedeutet die Betrachtung deines Anteils nicht, Verantwortung für fremde Kontrolle, Drohungen oder anderes schädigendes Verhalten zu übernehmen.\n\nDie Frage ist eng: Was habe ich konkret getan, und gibt es etwas Eigenes, das ich korrigieren möchte?",
    "choice_labels": {
      "E0711": "Eigenen Satz korrigieren",
      "E0801": "Eigene mögliche Reparatur vorbereiten",
      "E0840": "Eine kleine Möglichkeit ansehen",
      "E0841": "Meinen Spielraum ansehen"
    },
    "diagram": null
  },
  "K18": {
    "title": "Ein kleiner, umkehrbarer Versuch",
    "body": "Ein kleiner eigener Versuch ist ein Vorhaben, das du selbst steuern und bei Bedarf wieder ändern kannst. Zum Beispiel könntest du eine Woche lang einen Zeitpuffer für eine Aufgabe einplanen, eine Nachricht später statt sofort beantworten oder eine eigene Notiz zu einem wiederkehrenden Problem führen. Der Versuch soll nicht heimlich das Gegenüber in eine gewünschte Reaktion schubsen.\n\nEr ist eher ein Probeschlüssel für deine eigene Tür, nicht für fremde Schlösser. Du musst ihn nicht durchführen, und selbst wenn du ihn durchführst, kann er wirkungslos, gemischt oder unpassend sein. Wichtig ist nur, dass die Handlung in deinem Bereich liegt, überschaubar bleibt und keine bestimmte Reaktion anderer Menschen als Erfolg voraussetzt.",
    "choice_labels": {
      "E0732": "Eigenen Zeitpuffer prüfen",
      "E0842": "Nicht ausprobiert oder ohne Wirkung ansehen",
      "E0843": "Meinen Spielraum ansehen"
    },
    "diagram": null
  },
  "K19": {
    "title": "Was hat sich gezeigt?",
    "body": "Wenn du auf einen eigenen Versuch oder eine Situation zurückblickst, dürfen alle selbst berichteten Ergebnisse vorkommen: hilfreich, unverändert, schlechter, gemischt oder unklar. Die bloße Durchführung beweist weder Wirkung noch Ursache. Wenn danach etwas leichter war, kann das zusammenhängen oder auch andere Gründe haben; wenn nichts besser wurde, sagt das ebenfalls nichts über deinen Wert aus.\n\nErgebnisprüfung ist hier kein Casting, bei dem nur „Verbesserung“ ins Finale darf. Du kannst schlicht notieren, was du wahrgenommen hast, einschließlich Widersprüchen. Auch „Ich weiß es nicht“ ist ein Ergebnis.\n\nDie Aufgabe besteht nicht darin, eine positive Geschichte zu produzieren, sondern den beobachteten Ausgang offen zu beschreiben, ohne daraus mehr Kausalität abzuleiten als vorhanden ist.",
    "choice_labels": {
      "E0844": "Nicht ausprobiert oder ohne Wirkung ansehen",
      "E0845": "Noch nicht entscheiden"
    },
    "diagram": {
      "nodes": [
        {
          "id": "d1",
          "label": "Rückblick auf Ergebnis"
        },
        {
          "id": "d2",
          "label": "Hilfreich"
        },
        {
          "id": "d3",
          "label": "Unverändert"
        },
        {
          "id": "d4",
          "label": "Schlechter"
        },
        {
          "id": "d5",
          "label": "Gemischt"
        },
        {
          "id": "d6",
          "label": "Unklar"
        },
        {
          "id": "d7",
          "label": "Kausalität"
        }
      ],
      "edges": [
        {
          "from": "d1",
          "to": "d2",
          "label": "kann sein"
        },
        {
          "from": "d1",
          "to": "d3",
          "label": "kann sein"
        },
        {
          "from": "d1",
          "to": "d4",
          "label": "kann sein"
        },
        {
          "from": "d1",
          "to": "d5",
          "label": "kann sein"
        },
        {
          "from": "d1",
          "to": "d6",
          "label": "kann sein"
        },
        {
          "from": "d1",
          "to": "d7",
          "label": "beweist nicht"
        }
      ],
      "text_alternative": "Ein selbst berichtetes Ergebnis kann hilfreich, unverändert, schlechter, gemischt oder unklar sein. Die Durchführung oder der zeitliche Zusammenhang beweist keine automatische Kausalität."
    }
  },
  "K20": {
    "title": "Wenn es beim Lesen bleibt",
    "body": "Es ist eine echte Möglichkeit, etwas nicht ausprobiert zu haben oder nach einem Versuch keine hilfreiche Wirkung zu bemerken. Daraus folgt kein persönliches Versagen. Vielleicht war der Schritt unpassend, die Bedingungen waren anders als erwartet, das Problem lag außerhalb des eigenen Einflusses oder es gibt schlicht kein klares Ergebnis.\n\nEs ist nicht automatisch die richtige Antwort, dass du „mehr üben“ müsstest. Ein Werkzeug darf auch im Schrank bleiben, ohne beleidigt eine Gewerkschaft zu gründen. Du kannst stattdessen die das, was im Alltag tatsächlich schwer ist, eine Grenze, Unterstützung oder eine offene Entscheidung betrachten.\n\nWichtig ist nur: Nicht-Ausprobieren und Nicht-Wirken sind zulässige Ergebnisse und müssen nicht in eine Erfolgsgeschichte umgeschrieben werden.",
    "choice_labels": {
      "E0846": "Ansehen, was tatsächlich schwer ist",
      "E0847": "Noch nicht entscheiden",
      "E0848": "Grenzen des Angebots und Unterstützung ansehen"
    },
    "diagram": null
  },
  "K21": {
    "title": "Wenn im Alltag zu viel zusammenkommt",
    "body": "Manchmal sitzt das Problem nicht zwischen zwei Sätzen, sondern mitten im Alltag. Es fehlen Zeit, Geld oder Unterstützung. Vielleicht bleibt die Arbeit immer wieder bei derselben Person hängen.\n\nAuch ein ruhiges Gespräch räumt diese Belastung nicht einfach aus dem Weg. Es kann helfen, sie erst einmal beim Namen zu nennen: Was ist zu viel? Was fehlt? Wer kann überhaupt etwas daran ändern?\n\nDu musst aus einer ungleichen Aufgabenverteilung kein persönliches Missverständnis machen. Und du musst heute auch noch keine Lösung haben. Für den Anfang kann es reichen, die tatsächliche Last von der Frage zu unterscheiden, wie ihr miteinander darüber sprecht.",
    "choice_labels": {
      "E0717": "Aufgaben sachlich sortieren",
      "E0762": "Finanzielle Sachlage sortieren",
      "E0771": "Pflege- oder Familienlast beschreiben",
      "E0849": "Eigenen und gemeinsamen Einfluss sortieren",
      "E0850": "Eine Grenze für mich klären",
      "E0851": "Andere passende Szene wählen"
    },
    "diagram": null
  },
  "K22": {
    "title": "Ihr dürft verschieden sein",
    "body": "Menschen können bei Nähe, Rückzug, Aufgaben, Geld, Privatheit oder Kommunikation unterschiedliche Wünsche haben, ohne dass daraus sofort ein Typ oder eine Diagnose entsteht. Manche Unterschiede lassen sich praktisch vereinbaren, manche bleiben bestehen, und manche werden erst später klar. Es ist nicht nötig, jede Differenz in ein Puzzle zu verwandeln, das unbedingt ein einziges Bild ergeben muss.\n\nEbenso sagt ein Unterschied nichts Sicheres über Identität oder grundsätzliche Vereinbarkeit aus. Du kannst stattdessen konkret benennen, worin die Wünsche auseinandergehen und was davon für deine eigene Grenze oder Entscheidung wichtig ist. Ein Unterschied darf also schlicht ein Unterschied bleiben.\n\nOb daraus eine gemeinsame Lösung, Abstand oder keine sofortige Entscheidung folgt, bleibt offen.",
    "choice_labels": {
      "E0756": "Unterschiedliche Wünsche stehenlassen",
      "E0852": "Noch nicht entscheiden",
      "E0853": "Eine Grenze für mich klären"
    },
    "diagram": null
  },
  "K23": {
    "title": "Eine Entscheidung darf offenbleiben",
    "body": "Eine nächste Entscheidung muss nicht sofort lauten „weitermachen“ oder „beenden“. Du kannst die Richtung vorbereiten, Informationen sammeln, Unterstützungsmöglichkeiten ansehen, ein eigenes Ziel prüfen oder die Entscheidung bewusst vertagen. Offenlassen ist dabei kein heimlicher Fehlerzustand, sondern eine mögliche eigene Wahl.\n\nEine Entscheidung ist eher eine Tür als ein Laufband: Du musst nicht automatisch hindurch, nur weil sie vor dir steht. Wichtig ist, dass die Richtung bei dir bleibt und nicht aus einem einzelnen Klick als bereits ausgeführt gilt. Ebenso erzeugt eine geplante Handlung keine Reaktion des Gegenübers.\n\nWenn heute nur klar ist, dass noch nichts klar ist, kann genau das der nächste Stand sein, ohne Rat zu Fortsetzung oder Trennung.",
    "choice_labels": {
      "E0774": "Eigene Unterstützungsmöglichkeiten sammeln",
      "E0786": "Eigene Kontaktmöglichkeiten ansehen",
      "E0804": "Entscheidung bewusst offenlassen",
      "E0854": "Mein Ziel noch einmal ansehen",
      "E0855": "Grenzen des Angebots und Unterstützung ansehen"
    },
    "diagram": {
      "nodes": [
        {
          "id": "d1",
          "label": "Nächste Richtung"
        },
        {
          "id": "d2",
          "label": "Vorbereiten"
        },
        {
          "id": "d3",
          "label": "Informationen oder Unterstützung sammeln"
        },
        {
          "id": "d4",
          "label": "Entscheidung vertagen"
        },
        {
          "id": "d5",
          "label": "Entscheidung bleibt bei der Person"
        }
      ],
      "edges": [
        {
          "from": "d1",
          "to": "d2",
          "label": "kann heißen"
        },
        {
          "from": "d1",
          "to": "d3",
          "label": "kann heißen"
        },
        {
          "from": "d1",
          "to": "d4",
          "label": "kann heißen"
        },
        {
          "from": "d2",
          "to": "d5",
          "label": "unterliegt"
        },
        {
          "from": "d3",
          "to": "d5",
          "label": "unterliegt"
        },
        {
          "from": "d4",
          "to": "d5",
          "label": "unterliegt"
        }
      ],
      "text_alternative": "Die nächste Richtung kann vorbereitet werden, durch Informationen oder Unterstützungsmöglichkeiten ergänzt oder bewusst vertagt werden. In allen Fällen bleibt die Entscheidung bei der Person."
    }
  },
  "K24": {
    "title": "Hier kannst du erst einmal anhalten",
    "body": "Wenn du Drohungen, Einschüchterung oder Kontrolle befürchtest, musst du jetzt kein Gespräch vorbereiten. Du kannst hier in Ruhe lesen, welche Unterstützung es gibt. Du brauchst dafür weder Beweise noch eine fertige Erklärung deiner Situation.\n\nBei solchen Sorgen geht es hier zunächst um Orientierung und Unterstützung. Die Wissenskarten bleiben zum Lesen erreichbar. Auch eine Beratungsstelle kann ein erster Kontakt sein, wenn du noch unsicher bist und keine akute Gefahr besteht.\n\nDu entscheidest, ob du in Ruhe weiterlesen, dir Hilfeangebote ansehen oder für heute aufhören möchtest.",
    "choice_labels": {
      "E0856": "Private Orientierung ansehen",
      "E0857": "Externe Unterstützung ansehen"
    },
    "diagram": {
      "nodes": [
        {
          "id": "d1",
          "label": "Grenzen des Angebots"
        },
        {
          "id": "d2",
          "label": "Keine Diagnose durch Klickfragen"
        },
        {
          "id": "d3",
          "label": "Kein Sicherheitsnachweis"
        },
        {
          "id": "d4",
          "label": "Private Orientierung"
        },
        {
          "id": "d5",
          "label": "Externe Unterstützung"
        }
      ],
      "edges": [
        {
          "from": "d1",
          "to": "d2",
          "label": "umfasst"
        },
        {
          "from": "d1",
          "to": "d3",
          "label": "umfasst"
        },
        {
          "from": "d1",
          "to": "d4",
          "label": "kann verweisen auf"
        },
        {
          "from": "d1",
          "to": "d5",
          "label": "kann verweisen auf"
        }
      ],
      "text_alternative": "Die Grenzen des Angebots umfassen: Klickfragen stellen keine Diagnose und liefern keinen Sicherheitsnachweis. Als mögliche Richtungen können private Orientierung oder externe Unterstützung betrachtet werden."
    }
  }
});

