const entries = {};

function scene(id, title, opening, shared, a, b, c, closing) {
  for (const [view, paragraph] of Object.entries({ A: a, B: b, C: c })) {
    entries[`S-T06-${id}-${view}`] = { title, body: `${opening} ${paragraph}\n\n${shared}\n\n${closing}` };
  }
}

scene("F01", "Der dritte Anlauf",
  "Quirin beginnt zum dritten Mal: „Wegen morgen …“ Liviane legt den Löffel ab. Zweimal ist das Thema heute schon zwischen anderen Aufgaben verschwunden.",
  "Ein wiederholter Anlauf kann nach Beharrlichkeit, Druck oder dringender Klärung klingen. Oft hängt das weniger am Satz als daran, wie viel Kraft beide gerade noch haben.",
  "Quirin darf eine Antwort brauchen. Ein dritter Versuch wird leichter, wenn er auch fragt, ob jetzt überhaupt ein guter Moment ist.",
  "Liviane darf müde von dem Thema sein. Den Löffel abzulegen sagt jedoch noch nicht, ob sie zuhören, vertagen oder eine Grenze setzen möchte.",
  "Von außen sind drei Anläufe und ein stiller Moment zu sehen. Was vorher gestört hat und wie dringend morgen ist, bleibt offen.",
  "Vielleicht reicht zunächst eine kleine Vereinbarung: jetzt fünf Minuten – oder eine genaue Uhrzeit, zu der das Thema wirklich Platz bekommt.");

scene("F02", "Worte werden schneller",
  "Liviane beginnt einen Satz, während Quirin noch spricht. Quirin setzt erneut an; die Worte werden schneller, ein leerer Joghurtbecher kippt um.",
  "Wenn beide gehört werden möchten, kann ein Gespräch überraschend rasch ohne Zuhörer dastehen. Das bedeutet nicht automatisch mangelnden Respekt – aber es ist ein Zeichen, das Tempo zu senken.",
  "Quirin darf seinen Satz beenden wollen. Lauter oder schneller zu werden hilft meist weniger als sichtbar um eine ununterbrochene Minute zu bitten.",
  "Liviane hat offenbar etwas Dringendes im Kopf. Dazwischenzugehen kann trotzdem bewirken, dass Quirin sich nicht mehr erreicht fühlt.",
  "Von außen lässt sich kein Sieger bestimmen. Beide reden, beide verlieren gerade Information, und selbst der Joghurtbecher hat den Überblick aufgegeben.",
  "Eine kurze Pause ist kein Scheitern. Ein Atemzug, dann eine Person, dann die andere – so schlicht darf Reparatur manchmal sein.");

scene("F03", "Erst morgen reden",
  "Liviane sagt: „Erst morgen.“ Quirin hält noch den Stuhl, von dem er aufstehen wollte. Eine Uhrzeit nennt sie nicht.",
  "Vertagen kann vernünftig sein, wenn heute nichts Gutes mehr entsteht. Ohne Rückkehrpunkt bleibt die andere Person jedoch leicht mit dem ganzen Thema allein.",
  "Quirin muss heute keine Lösung erzwingen. Er darf aber fragen, wann morgen und wie lange beide dafür ungefähr brauchen.",
  "Liviane darf für heute aufhören. Ein konkreter Zeitpunkt würde aus ihrem Rückzug eine verlässliche Pause statt eines offenen Endes machen.",
  "Von außen ist nur klar, dass heute nicht weitergesprochen werden soll. Ob morgen früh, abends oder irgendwann gemeint ist, weiß niemand.",
  "Ein tragfähiger Satz wäre: „Nicht mehr heute. Morgen nach dem Essen nehmen wir uns zwanzig Minuten dafür.“");

scene("F04", "Ein Thema wird zu fünf",
  "Es beginnt mit einer nicht erledigten Besorgung. Bald kommen Kalender, Anruf und zwei ältere Punkte dazu. Mumpitz trägt einen Schuh vorbei und enthält sich der Debatte.",
  "Wenn Verletzungen sich sammeln, sucht jede gern noch schnell einen Platz im aktuellen Gespräch. Dann wächst die Beweislast, während die Chance auf echte Klärung schrumpft.",
  "Quirin darf Zusammenhänge sehen. Für Liviane wird es leichter, wenn er einen Punkt auswählt und die übrigen sichtbar für später notiert.",
  "Liviane darf an etwas erinnert werden, das für sie dazugehört. Trotzdem muss nicht jede offene Rechnung heute auf denselben Tisch.",
  "Von außen sind mehrere berechtigte Themen und wenig gemeinsamer Raum zu erkennen. Ihre Reihenfolge ist noch keine Aussage über ihre Wichtigkeit.",
  "Es darf klein werden: Welcher eine Punkt braucht heute eine Entscheidung – und welche vier dürfen verlässlich warten?");

export const EDITORIAL_T06 = Object.freeze(entries);
