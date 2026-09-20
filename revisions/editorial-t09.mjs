const entries = {};

function scene(id, title, opening, shared, a, b, c, closing) {
  for (const [view, paragraph] of Object.entries({ A: a, B: b, C: c })) entries[`S-T09-${id}-${view}`] = { title, body: `${opening} ${paragraph}\n\n${shared}\n\n${closing}` };
}

scene("F01", "Wer heute abholt",
  "Liviane fragt: „Wer holt Nola heute ab?“ Im Kalender steht nur die Uhrzeit. Quirin hält gerade einen Ausdruck seines Geschichtenprojekts.",
  "Wenn Verantwortung nicht sichtbar zugeordnet ist, wird eine kurze Frage schnell schwer. Hinter ihr können Zeitdruck, alte Ungleichgewichte oder einfach eine vergessene Absprache stehen.",
  "Quirin darf sein Projekt wichtig nehmen. Jetzt braucht es zusätzlich eine klare Antwort darauf, ob er die Abholung übernimmt oder wer sonst gefragt wird.",
  "Liviane darf Verlässlichkeit brauchen. Ihre Frage sagt noch nicht, dass Quirin allein zuständig war; der namenlose Eintrag lässt genau das offen.",
  "Von außen gibt es eine feste Uhrzeit und keine feste Person. Schuld lässt sich daraus nicht ableiten, Handlungsbedarf schon.",
  "Zuerst darf der heutige Weg gesichert werden. Später können beide den Kalender so ergänzen, dass Verantwortung nicht wieder zwischen zwei Namen verschwindet.");

scene("F02", "Ein Anruf aus der Pflege",
  "Quirins Telefon klingelt wegen einer Pflegeaufgabe, die heute zusätzliche Organisation braucht. Danach legt er es neben den Tagesplan; Liviane sieht auf die notierte Uhrzeit.",
  "Pflege lässt sich selten ordentlich in einen Kalender falten. Wenn etwas Dringendes dazukommt, geraten eigene Pläne und gemeinsame Aufgaben schnell unter Druck.",
  "Quirin darf von dem Anruf beansprucht sein. Er muss die neue Aufgabe nicht allein tragen, sollte aber sagen können, was sich dadurch heute verändert.",
  "Liviane darf auf die Folgen für ihren Tag schauen. Das ist keine Herzlosigkeit gegenüber der Pflegeaufgabe, sondern Teil der gemeinsamen Wirklichkeit.",
  "Von außen sind ein zusätzlicher Bedarf und ein bestehender Plan zu sehen. Wer was übernehmen kann, ist noch nicht geklärt.",
  "Bevor beide alles lösen, könnte eine kleine Bestandsaufnahme helfen: Was ist heute wirklich dringend, wer hat welche Kraft, und wen können sie zusätzlich fragen?");

scene("F03", "Besuch am Wochenende",
  "Liviane nennt einen möglichen Besuch am Wochenende. Quirin zeigt auf einen vollen Samstag. Nola schiebt einen Bauklotz auf den Kalender.",
  "Familienzeit, Besuch und Erholung konkurrieren leicht miteinander, obwohl alle drei wichtig sein können. Ein voller Tag ist nicht automatisch eine Ablehnung der Menschen, die kommen möchten.",
  "Quirin darf die Belastung des Samstags ernst nehmen. Vielleicht kann er zugleich sagen, welcher Teil des Besuchs für ihn noch vorstellbar wäre.",
  "Liviane darf sich den Besuch wünschen. Bevor daraus eine gemeinsame Zusage wird, braucht sie Quirins tatsächliche Kapazität – und ihre eigene.",
  "Von außen stehen ein Wunsch, mehrere Termine und ein Bauklotz beieinander. Der Bauklotz stimmt übrigens für keine Seite.",
  "Vielleicht lautet die passende Frage nicht „Besuch oder nicht?“, sondern: Welche Dauer, welcher Tag und welche Unterstützung würden ihn für alle tragbar machen?");

scene("F04", "Die Verantwortung zwischen Terminen",
  "Quirin setzt einen zusätzlichen Termin zwischen zwei Einträge. Liviane zeigt auf den Weg dazwischen und auf Nolas Betreuungsende.",
  "Auf Papier passen Termine oft näher zusammen als im Leben. Wege, Übergaben und ein müdes Kind brauchen Zeit, auch wenn im Kalender noch zwei Zentimeter frei sind.",
  "Quirin darf den Termin wichtig finden. Damit er realistisch wird, muss sichtbar werden, wer den Weg und Nolas Betreuung tatsächlich übernimmt.",
  "Liviane sieht eine praktische Lücke. Sie darf sie benennen, ohne schon automatisch für deren Schließung zuständig zu sein.",
  "Von außen ist der Plan rechnerisch eng und organisatorisch offen. Gute Absicht ersetzt weder Fahrzeit noch eine konkrete Person.",
  "Ein belastbarer Plan nennt nicht nur Uhrzeiten, sondern auch Namen, Wege und Puffer. Wenn das nicht aufgeht, darf ein Termin verschoben werden.");

export const EDITORIAL_T09 = Object.freeze(entries);
