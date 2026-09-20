const entries = {};

function scene(id, title, opening, shared, a, b, c, closing) {
  for (const [view, paragraph] of Object.entries({ A: a, B: b, C: c })) entries[`S-T11-${id}-${view}`] = { title, body: `${opening} ${paragraph}\n\n${shared}\n\n${closing}` };
}

scene("F01", "Ein Anruf über Distanz",
  "Im Anruf zwischen zwei Wohnungen entstehen Pausen. Tavia setzt an, während Solvian noch redet; danach schweigen beide.",
  "Über eine Verbindung fehlen Blicke, kleine Gesten und das sichere Gefühl, wann ein Satz zu Ende ist. Eine Überschneidung kann technische Verzögerung, Eile oder Aufregung sein.",
  "Solvian darf seinen Gedanken zu Ende bringen wollen. Tavias Einsetzen muss nicht bedeuten, dass sie ihm nicht zuhört.",
  "Tavia darf erneut ansetzen. Vielleicht hilft es, kurz zu sagen, ob sie ergänzen wollte oder nur dachte, der Satz sei beendet.",
  "Von außen hören wir zwei Stimmen und dann Stille. Das Verbindungssymbol wirkt zuverlässig; für die Verständigung übernimmt es leider keine Verantwortung.",
  "Ein kleines Reparatursignal reicht oft: „Du zuerst“ – und danach eine Sekunde länger warten, als sich natürlich anfühlt.");

scene("F02", "Schriftlich ist es leichter",
  "Solvian liest Tavias Nachricht: „Schriftlich ist es leichter.“ Zwischen den Wohnungen liegen viele Kilometer.",
  "Schreiben kann Zeit zum Sortieren geben; ein Gespräch kann Wärme, Tonfall und unmittelbare Rückfragen bieten. Die leichtere Form für eine Person muss nicht für beide reichen.",
  "Solvian darf sich nach ihrer Stimme sehnen. Tavias Wunsch nach Schriftlichkeit ist trotzdem keine automatische Ablehnung von Nähe.",
  "Tavia darf eine Form wählen, in der sie Worte findet. Sie weiß noch nicht, ob Solvian für wichtige Punkte zusätzlich ein Gespräch braucht.",
  "Von außen ist nur eine bevorzugte Kommunikationsform benannt. Für welches Thema und für wie lange sie gelten soll, bleibt offen.",
  "Vielleicht entsteht eine Mischform: erst schriftlich sortieren, dann zehn Minuten sprechen – mit dem Text als ruhigem Geländer.");

scene("F03", "Andere Tagesrhythmen",
  "Tavia schlägt einen frühen Anruf vor. Solvian kann erst später; ihre freien Zeitfenster überschneiden sich heute kaum.",
  "Unterschiedliche Rhythmen können sich persönlich anfühlen, obwohl sie oft aus Arbeit, Schlaf oder Verpflichtungen entstehen. Ein unpassender Zeitpunkt ist noch kein unpassender Mensch.",
  "Solvian darf seine spätere Zeit schützen. Er kann zugleich eine konkrete Alternative nennen, damit aus dem Nein kein leerer Raum wird.",
  "Tavia darf früh besser erreichbar sein. Dass Solvian dann nicht kann, muss ihre Mühe um Kontakt nicht entwerten.",
  "Von außen passen zwei Zeitfenster heute fast nicht zusammen. Wie häufig das geschieht und wer sonst schon nachgegeben hat, wäre wichtig.",
  "Vielleicht braucht es heute nur eine Sprachnachricht – und für ein richtiges Gespräch einen Termin, der beiden etwas Luft lässt.");

scene("F04", "Pläne mit begrenzter Energie",
  "Solvian schlägt für den Besuch zwei Unternehmungen vor. Tavia antwortet: „Eine könnte gehen, für die zweite reicht meine Energie vielleicht nicht.“",
  "Begrenzte Energie ist keine begrenzte Zuneigung. Gleichzeitig kann Solvians Vorfreude echt sein und einen Moment lang enttäuscht werden.",
  "Solvian darf bedauern, dass nicht alles klappt. Er kann Tavia glauben und mit ihr auswählen, was ihnen beiden am wichtigsten ist.",
  "Tavia hat ihre Grenze früh benannt. Sie muss sich nicht erst erschöpfen, um zu beweisen, dass der Besuch ihr etwas bedeutet.",
  "Von außen sind zwei Ideen und Kraft für vielleicht eine zu sehen. Welche gewählt wird und ob Ruhe dazukommt, ist noch offen.",
  "Ein langsamerer Besuch kann sehr nah sein. Vielleicht bleibt nach einer Unternehmung sogar Raum für das, was in keinem Plan steht.");

export const EDITORIAL_T11 = Object.freeze(entries);
