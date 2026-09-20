const entries = {};

function scene(id, title, opening, shared, a, b, c, closing) {
  for (const [view, paragraph] of Object.entries({ A: a, B: b, C: c })) entries[`S-T10-${id}-${view}`] = { title, body: `${opening} ${paragraph}\n\n${shared}\n\n${closing}` };
}

scene("F01", "Der eigene Abend",
  "Tavia schreibt Solvian, sie wolle den Abend für sich nutzen. Gemeinsame Zeit war für heute noch nicht bestätigt; beide sind in ihren Wohnungen.",
  "Der Wunsch nach Zeit allein kann in einer Beziehung völlig gesund sein und sich auf der anderen Seite trotzdem wie Abstand anfühlen. Das Gefühl erklärt noch nicht die Absicht.",
  "Solvian darf einen kleinen Stich spüren. Weil kein gemeinsamer Abend vereinbart war, muss er daraus aber keine Zurückweisung machen.",
  "Tavia darf ihren Abend für sich wählen. Ein warmer Zusatz kann helfen, ohne dass sie ihre Grenze rechtfertigen muss.",
  "Von außen ist eine klare Bitte um Eigenzeit zu sehen. Ob Solvian mit gemeinsamer Zeit gerechnet hat, war bisher nicht ausgesprochen.",
  "Beides kann Platz haben: „Hab einen ruhigen Abend“ – und später die Frage, wann beide wieder bewusst Zeit füreinander möchten.");

scene("F02", "Ein Blick auf das Display",
  "Während eines Besuchs leuchtet Tavias Telefon auf. Solvian blickt auf das Display; Tavia dreht das Gerät um.",
  "Ein kurzer Blick kann aus Neugier entstehen und trotzdem eine Grenze berühren. Das Umdrehen kann Privatsphäre schützen, ohne ein Geheimnis zu beweisen.",
  "Solvian darf bemerken, dass ihn der Moment verunsichert. Er hat jedoch keinen Anspruch auf den Inhalt und kann über sein Gefühl sprechen, ohne Kontrolle zu verlangen.",
  "Tavia darf ihr Display schützen. Wenn Solvians Blick unangenehm war, kann sie genau diese Grenze benennen, statt seine Motive zu erraten.",
  "Von außen sind Licht, Blick und eine Handbewegung sichtbar. Misstrauen oder Täuschung lassen sich daraus nicht zuverlässig erkennen.",
  "Eine gute Klärung bleibt bei sich: „Ich möchte nicht, dass du mitliest“ oder „Ich merke, dass mich der Moment gerade unsicher macht.“");

scene("F03", "Verschiedene Freundeskreise",
  "Solvian erzählt von einer Einladung seines Freundeskreises. Tavia nennt ein eigenes Treffen am selben Abend; beide finden an verschiedenen Orten statt.",
  "Eine Beziehung muss nicht jeden freien Abend gemeinsam verbringen. Gleichzeitig können getrennte Pläne Fragen auslösen: War Gemeinsamkeit erwartet, fehlt Interesse am Umfeld des anderen oder ist es einfach ein voller Kalender?",
  "Solvian darf seinen Freundeskreis sehen wollen. Tavias eigener Plan ist nicht automatisch ein Zeichen, dass sie seinen Menschen ausweicht.",
  "Tavia darf ihre Freundschaften pflegen. Solvians Einladung könnte trotzdem ein Wunsch sein, sie einmal dabeizuhaben – das muss er nur aussprechen.",
  "Von außen gibt es zwei Einladungen und einen Abend. Ob jemand verletzt ist oder beide zufrieden getrennt gehen, ist noch offen.",
  "Vielleicht müssen sie nichts lösen. Falls doch etwas fehlt, hilft eine konkrete Bitte mehr als eine Loyalitätsprüfung.");

scene("F04", "Die unbeantwortete Nachfrage",
  "Solvian fragt per Nachricht, wann Tavia ungefähr Zeit für einen Anruf hat. Eine Antwort steht noch aus; er liest seine eigene Frage erneut.",
  "Warten lässt eine harmlose Nachricht schnell größer werden. Jede Minute bietet Raum für Geschichten, obwohl sie keine neue Information bringt.",
  "Solvian darf unruhig werden und trotzdem zunächst bei den Fakten bleiben: Er hat gefragt, Tavia hat noch nicht geantwortet.",
  "Tavia kennt die Frage vielleicht schon oder noch gar nicht. Ihr Schweigen verrät weder Priorität noch Absicht; ihr Tag bleibt unsichtbar.",
  "Von außen gibt es eine offene Nachricht. Wie lange sie schon wartet und was beide sonst vereinbart haben, wäre für die Einordnung wichtig.",
  "Solvian kann seinen Abend weiterleben und später einmal freundlich nachfassen. Eine Antwort ist leichter zu empfangen, wenn sie nicht schon vorab gedeutet wurde.");

export const EDITORIAL_T10 = Object.freeze(entries);
