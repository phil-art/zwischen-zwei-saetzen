const entries = {};

function scene(id, title, opening, shared, a, b, c, closing) {
  for (const [view, paragraph] of Object.entries({ A: a, B: b, C: c })) {
    entries[`S-T05-${id}-${view}`] = { title, body: `${opening} ${paragraph}\n\n${shared}\n\n${closing}` };
  }
}

scene("F01", "Nach Hause kommen",
  "Jorun kommt nach Hause, stellt die Tasche ab und geht ins andere Zimmer. Mireva sitzt mit zwei Bechern am Küchentisch.",
  "Manchmal treffen beim Heimkommen zwei ganz verschiedene Wünsche aufeinander: erst einmal durchatmen oder endlich miteinander sein. Keiner davon ist lieblos. Schwierig wird es, wenn beide glauben, der eigene Wunsch sei offensichtlich.",
  "Mireva darf den verpassten Moment bedauern. Der zweite Becher war eine Einladung, aber Jorun konnte seine Bedeutung vielleicht nicht erkennen.",
  "Jorun darf zunächst Ruhe brauchen. Noch weiß Jorun womöglich nicht, dass Mireva gerade auf ein gemeinsames Ankommen gehofft hat.",
  "Von außen sind nur eine abgestellte Tasche, ein Weg ins Zimmer und zwei Becher zu sehen. Eine Absicht steht auf keinem davon.",
  "Ein leiser Satz könnte die Lücke überbrücken: „Ich würde gern kurz mit dir sitzen – brauchst du vorher zehn Minuten für dich?“");

scene("F02", "Ein freier Sonntag",
  "Mireva legt einen Ausflugsprospekt auf den Tisch. Neben Joruns Sessel wartet schon ein Buch; gemeinsam geplant ist der Sonntag noch nicht.",
  "Freie Zeit kann sich wie kostbarer gemeinsamer Raum anfühlen – oder wie die erste Gelegenheit seit Tagen, allein zu sein. Ein Prospekt und ein Buch sind Wünsche, keine stillschweigenden Verträge.",
  "Jorun darf sich nach einem ruhigen Lesetag sehnen. Mirevas Prospekt muss deshalb weder Forderung noch fertiger Plan sein.",
  "Mireva darf sich auf einen Ausflug freuen. Joruns Buch sagt noch nicht, dass für Gemeinsamkeit überhaupt kein Platz ist.",
  "Von außen liegen zwei gute Möglichkeiten nebeneinander. Vielleicht passen beide in den Tag, vielleicht muss eine von ihnen heute Vorrang haben.",
  "Nicht jeder Unterschied braucht einen perfekten Kompromiss. Oft genügt es, beide Wünsche freundlich und rechtzeitig hörbar zu machen.");

scene("F03", "Tür zu und Gedanken offen",
  "Mitten in einem Austausch zieht Jorun die Zimmertür zu. Mireva bleibt im Flur; wann es weitergeht, hat niemand gesagt.",
  "Eine Pause kann schützen, bevor Worte zu scharf werden. Ohne ein Zeichen für Rückkehr kann dieselbe Pause sich jedoch wie Verlassenwerden anfühlen. Beides verdient Beachtung.",
  "Mireva muss nicht vor der Tür warten und die Stille freundlich erklären. Sie darf einen verlässlichen Zeitpunkt für die Fortsetzung brauchen.",
  "Jorun darf Abstand benötigen. Aus einem Rückzug wird aber erst dann eine gemeinsame Pause, wenn Mireva ungefähr weiß, woran sie ist.",
  "Von außen ist die Tür geschlossen, nicht die Bedeutung geklärt. Weder Ablehnung noch Erholung lässt sich sicher ablesen.",
  "Ein einziger Satz könnte viel tragen: „Ich brauche eine halbe Stunde. Danach komme ich zurück und wir sprechen weiter.“");

scene("F04", "Zusammen im selben Raum",
  "Mireva liest am Tisch, Jorun sitzt mit Kopfhörern daneben. Als Mireva etwas sagt, zeigt Jorun kurz auf einen Ohrhörer.",
  "Im selben Raum zu sein kann sich für eine Person nach gemeinsamer Zeit anfühlen und für die andere nach angenehmem Nebeneinander. Nähe, Ansprechbarkeit und ein Gespräch sind nicht immer dasselbe.",
  "Mireva darf sich eine Antwort wünschen. Joruns Geste sagt zunächst nur: Der Satz ist nicht angekommen – nicht, dass Mireva stört.",
  "Jorun darf vertieft sein und trotzdem gern mit Mireva zusammen sein. Ob Mireva gerade Kontakt braucht, ist noch nicht ausgesprochen.",
  "Von außen bleibt offen, ob hier ein technisches Hindernis oder ein Unterschied im Nähebedürfnis sichtbar wird. Vielleicht ist es auch beides.",
  "Eine kleine Verabredung kann Wärme schaffen: erst zehn Minuten für sich, danach eine Tasse und volle Aufmerksamkeit.");

export const EDITORIAL_T05 = Object.freeze(entries);
