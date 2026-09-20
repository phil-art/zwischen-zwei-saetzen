const entries = {};

function scene(id, title, opening, shared, a, b, c, closing) {
  for (const [view, paragraph] of Object.entries({ A: a, B: b, C: c })) entries[`S-T12-${id}-${view}`] = { title, body: `${opening} ${paragraph}\n\n${shared}\n\n${closing}` };
}

scene("F01", "Schon wieder derselbe Punkt",
  "Mireva sagt: „Darüber haben wir schon gesprochen.“ Jorun schaut auf die Aufgabe, die erneut liegen geblieben ist.",
  "Wiederholungen sind zermürbend: Die eine Person hört vielleicht denselben Vorwurf, die andere erlebt dasselbe ungelöste Problem. Ein früheres Gespräch ist noch keine verlässliche Veränderung.",
  "Mireva darf müde davon sein, das Thema wieder aufzunehmen. Hilfreicher als „immer“ wäre nun, die konkrete heutige Folge zu benennen.",
  "Jorun darf sich beschämt oder unter Druck fühlen. Entscheidend ist trotzdem, ob eine realistische Vereinbarung fehlt oder nicht eingehalten wurde.",
  "Von außen sehen wir eine bekannte Aufgabe und einen bekannten Satz. Wie oft es geschah und was vereinbart war, bleibt noch offen.",
  "Vielleicht braucht es weniger Versprechen und mehr Passung: Wer übernimmt was, bis wann – und woran merken beide früh, dass es diesmal nicht klappt?");

scene("F02", "Eine Entschuldigung ohne Ende",
  "Jorun sagt: „Das tut mir leid.“ Mireva antwortet noch nicht. Der Gegenstand, an dem der Streit begann, liegt weiterhin auf dem Tisch.",
  "Eine Entschuldigung kann ehrlich sein und trotzdem noch nicht reichen. Manchmal braucht die verletzte Person Zeit, eine konkrete Veränderung oder das Gefühl, wirklich verstanden worden zu sein.",
  "Mireva muss die Entschuldigung nicht sofort annehmen. Sie darf erst herausfinden, was ihr für eine Reparatur fehlt.",
  "Jorun hat einen Anfang gemacht. Statt eine schnelle Beruhigung zu erwarten, kann Jorun fragen, welche Wirkung angekommen ist und was jetzt helfen würde.",
  "Von außen hören wir Bedauern und sehen eine offene Situation. Ob Verantwortung übernommen oder nur Frieden gesucht wird, zeigt der nächste Schritt.",
  "Eine tragfähige Ergänzung könnte lauten: „Ich sehe, was das für dich bedeutet hat. Ich möchte es beim nächsten Mal so anders machen …“");

scene("F03", "Ein Wunsch passt nicht mehr",
  "Jorun sagt, dass ein früher besprochener gemeinsamer Plan so nicht mehr passt. Mireva hat die alte Notiz vor sich.",
  "Menschen dürfen ihre Meinung ändern. Für die andere Person kann dabei trotzdem ein Stück Zukunft wegbrechen, das schon vertraut wirkte. Freiheit und Verlässlichkeit geraten dann schmerzhaft nah aneinander.",
  "Mireva darf um den Plan trauern und nach den Folgen fragen. Die alte Notiz gibt ihr jedoch keinen Anspruch auf Joruns unveränderte Zustimmung.",
  "Jorun darf eine frühere Zusage neu betrachten. Dabei gehört zur Fairness, Mirevas Verlust nicht als bloßes Missverständnis abzutun.",
  "Von außen gibt es einen alten Plan und ein neues Nein. Gründe, Spielräume und praktische Folgen sind noch nicht besprochen.",
  "Vielleicht geht es zunächst nicht um Ersatz. Erst darf verstanden werden, was sich verändert hat und was dieser Plan jedem von beiden bedeutete.");

scene("F04", "Heute keine Entscheidung",
  "Mireva sagt: „Heute entscheide ich das nicht.“ Jorun legt den Stift neben das Blatt mit den Möglichkeiten.",
  "Eine vertagte Entscheidung kann fürsorglich sein, wenn gerade Klarheit fehlt. Ohne nächsten Zeitpunkt kann sie für die wartende Person jedoch zur endlosen Schwebe werden.",
  "Jorun darf Planungssicherheit brauchen. Er kann Mirevas Pause respektieren und trotzdem nach einem realistischen Rückkehrpunkt fragen.",
  "Mireva darf heute nicht entscheiden. Wenn möglich, kann sie sagen, welche Information oder Ruhe ihr fehlt und wann sie neu hinschauen möchte.",
  "Von außen ist die Entscheidung offen, nicht verweigert. Wie dringend sie ist und welche Folgen das Warten hat, bleibt noch zu klären.",
  "Ein Rahmen nimmt Druck heraus: „Heute nicht. Lass uns am Donnerstag nach dem Essen wieder auf das Blatt schauen.“");

export const EDITORIAL_T12 = Object.freeze(entries);
