const entries = {};

function scene(id, title, opening, shared, a, b, c, closing) {
  for (const [view, paragraph] of Object.entries({ A: a, B: b, C: c })) entries[`S-T08-${id}-${view}`] = { title, body: `${opening} ${paragraph}\n\n${shared}\n\n${closing}` };
}

scene("F01", "Die gemeinsame Ausgabe",
  "Tavia schickt Solvian den Betrag für eine geplante Fahrt. Die Zahl ist höher als die bisherige Schätzung.",
  "Geld kann sehr schnell nach Vertrauen, Freiheit oder Rücksicht klingen, obwohl zunächst nur eine Rechnung vorliegt. Die höhere Summe ist real; ihre Entstehung und ihre Bedeutung sind noch offen.",
  "Solvian darf erschrecken oder nachfragen, bevor er zusagt. Das macht ihn nicht kleinlich und sagt noch nichts über seine Freude auf die Fahrt.",
  "Tavia hat den neuen Betrag weitergegeben. Ob sie ihn selbst gut tragen kann oder für selbstverständlich hält, weiß Solvian noch nicht.",
  "Von außen ist nur der Unterschied zwischen Schätzung und Preis sichtbar. Wer welchen Anteil übernimmt, wurde damit nicht automatisch entschieden.",
  "Eine sachliche Frage kann Nähe schützen: „Wie kam die Summe zustande, und welcher Betrag wäre für uns beide noch in Ordnung?“");

scene("F02", "Eine berufliche Veränderung",
  "Solvian schickt Tavia mögliche neue Arbeitszeiten. Zwei davon fallen in bisher freie Fenster für ihre Besuche; daneben stehen noch Fragezeichen.",
  "Veränderungen im Beruf greifen manchmal genau in die Zeiten, die einer Beziehung Halt geben. Das kann traurig oder beunruhigend sein, bevor überhaupt eine Entscheidung gefallen ist.",
  "Solvian teilt Möglichkeiten, noch keinen fertigen Plan. Er darf berufliche Bedürfnisse haben und sollte Tavias praktische Folgen trotzdem mit ansehen.",
  "Tavia darf um gemeinsame Zeit fürchten. Die Fragezeichen bedeuten aber auch, dass noch nicht alles feststeht und ihr Blick gefragt sein kann.",
  "Von außen kollidieren mögliche Arbeitszeiten mit bisherigen Besuchsfenstern. Prioritäten oder Absichten sind daraus nicht abzulesen.",
  "Statt Beziehung gegen Arbeit zu stellen, könnten beide sammeln: Was ist unveränderlich, was verhandelbar, und welche neue Form von Nähe wäre möglich?");

scene("F03", "Unterschiedliche Sparziele",
  "Tavia möchte eine Rücklage bilden. Solvian zeigt auf den Preis einer längeren gemeinsamen Reise. Auf beiden Zetteln steht derselbe verfügbare Betrag.",
  "Hinter Geldzielen stecken oft gute, aber verschiedene Bedürfnisse: Sicherheit, Erleben, Zukunft oder gemeinsame Erinnerung. Zahlen allein können diese Gründe nicht gegeneinander abwägen.",
  "Solvian darf sich nach der Reise sehnen. Tavias Rücklage muss deshalb keine Entscheidung gegen Gemeinsamkeit sein.",
  "Tavia darf Sicherheit wichtig finden. Solvians Reisewunsch ist nicht automatisch verantwortungslos oder ein Anspruch auf ihr Geld.",
  "Von außen gibt es einen Betrag und zwei Verwendungen. Noch ist weder geklärt, wem welches Geld gehört, noch ob ein Teilweg möglich wäre.",
  "Vielleicht beginnt die Einigung nicht bei der Summe, sondern bei der Frage: „Was soll dieses Geld für jeden von uns ermöglichen oder schützen?“");

scene("F04", "Ein Plan mit fehlender Zeit",
  "Solvian schickt einen Besuchsplan mit Anreise, Ausflug und Essen. Tavia markiert die Wegezeiten; plötzlich passt nicht mehr alles in den Nachmittag.",
  "Ein voller Plan kann Vorfreude ausdrücken und zugleich Druck machen. Wer selten Zeit miteinander hat, möchte leicht jedes schöne Vorhaben in wenige Stunden packen.",
  "Solvian hat sich Gedanken gemacht. Dass der Plan zu groß ist, macht seine Mühe nicht wertlos; vielleicht braucht sie nur weniger Programmpunkte.",
  "Tavia sieht die Grenzen des Nachmittags. Ihre Markierungen können Fürsorge für einen realistischen Besuch sein, nicht mangelnde Begeisterung.",
  "Von außen fehlen Stunden, nicht notwendig Zuneigung. Wegezeit lässt sich leider auch mit sehr guter Stimmung nicht wegverhandeln.",
  "Ein schöner Besuch muss nicht alles enthalten. Beide könnten wählen, welcher eine Teil ihnen wichtig ist – und Raum lassen, einfach beieinander zu sein.");

export const EDITORIAL_T08 = Object.freeze(entries);
