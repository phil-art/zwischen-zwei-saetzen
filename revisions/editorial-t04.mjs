const entries = {};

function scene(id, title, opening, shared, a, b, c, closing) {
  for (const [view, paragraph] of Object.entries({ A: a, B: b, C: c })) {
    entries[`S-T04-${id}-${view}`] = {
      title,
      body: `${opening} ${paragraph}\n\n${shared}\n\n${closing}`
    };
  }
}

scene("F01", "Zwanzig Minuten später",
  "Solvian wartet auf den verabredeten Anruf. Als Tavias Name endlich aufleuchtet, ist der Tee kalt und zwanzig Minuten sind vergangen.",
  "So eine kleine Verspätung kann erstaunlich viel in Bewegung bringen: Ärger, Sorge, Enttäuschung – oder die alte Frage, wie wichtig man der anderen Person gerade ist. Der Anruf erklärt davon noch nichts.",
  "Solvian muss seine Wartezeit nicht kleinreden. Er weiß nur noch nicht, ob Tavia die Zeit anders verstanden hat oder ob etwas dazwischenkam.",
  "Tavia ruft nun an. Vielleicht hat sie einen Grund, vielleicht hat sie die Wirkung der Verspätung unterschätzt; Solvians stilles Warten kennt sie noch nicht.",
  "Von außen sind nur zwei Dinge sicher: eine vereinbarte Uhrzeit und ein später Anruf. Alles Weitere braucht Worte statt Gedankenlesen.",
  "Beides darf nebeneinanderstehen: Die Freude, die andere Stimme zu hören, und der Wunsch, über Verlässlichkeit zu sprechen.");

scene("F02", "Zwei Kalender",
  "Tavia schlägt ein Treffen am Samstag vor. Bei ihr ist der Nachmittag frei; in Solvians Kalender steht bereits ein anderer Termin.",
  "Kalender sehen ordentlich aus, doch sie zeigen nur einen Teil des Lebens. Hinter einem freien Feld kann Erschöpfung liegen, hinter einem belegten Feld etwas Wichtiges – und ein Vorschlag ist noch keine gemeinsame Zusage.",
  "Solvian darf seinen bestehenden Termin ernst nehmen, ohne Tavias Vorschlag als Zumutung zu lesen. Sie kennt seinen Eintrag womöglich schlicht nicht.",
  "Tavia hat eine Möglichkeit angeboten, keine Verfügbarkeit auf Solvians Seite festgestellt. Sein Nein zu diesem Termin wäre nicht automatisch ein Nein zu ihr.",
  "Beide sehen denselben Samstag aus verschiedenen Wohnungen. Ihre Kalender widersprechen sich nicht; sie erzählen nur noch keinen gemeinsamen Plan.",
  "Vielleicht findet sich ein anderes Fenster. Vielleicht nicht sofort. Nähe muss nicht daran gemessen werden, ob dieses eine Kästchen passt.");

scene("F03", "Ein abgesagter Abend",
  "Auf Solvians Telefon erscheint Tavias kurze Absage. Das Ladekabel für den geplanten Abend liegt schon auf dem Tisch; ein neuer Termin steht nicht dabei.",
  "Eine knappe Nachricht kann einen ganzen Abend verändern. Solvian darf enttäuscht sein, und Tavia kann trotzdem Gründe haben, die in der Nachricht keinen Platz gefunden haben. Noch ist nur die Absage bekannt.",
  "Solvian hat Zeit freigehalten. Er muss daraus weder Gleichgültigkeit ableiten noch so tun, als mache ihm die Änderung nichts aus.",
  "Tavia hat abgesagt. Ob ihr gerade Kraft, Zeit oder Worte fehlen, ist offen – ebenso, ob sie weiß, was Solvian vorbereitet hatte.",
  "Von außen bleibt die Beziehung größer als diese Nachricht. Wiederholt sich so etwas, wäre das wichtig; für heute ist diese eine Enttäuschung real.",
  "Ein nächster Schritt könnte klein sein: erst ankommen, dann nach dem Grund fragen und später klären, was bei einer Absage hilfreich wäre.");

scene("F04", "Was zugesagt war",
  "Solvian zeigt auf „Ich halte mir den Abend frei“. Tavia zeigt auf die Zeile darüber: „Wenn die Verbindung klappt.“ Beides steht im selben Verlauf.",
  "Geschriebene Sätze bleiben sichtbar, ihre damalige Bedeutung leider nicht. Solvian hörte vielleicht eine feste Zusage, Tavia einen Plan mit Vorbehalt. Keiner der beiden Wortlaute löscht das Erleben der anderen Person.",
  "Solvians freigehaltene Zeit zählt. Zugleich beweist seine Lesart nicht, dass Tavia absichtlich eine Vereinbarung gebrochen hat.",
  "Tavias Hinweis auf die Bedingung ist nachvollziehbar. Er beantwortet aber noch nicht, warum Solvian den Abend als fest verabredet erlebt hat.",
  "Von außen lässt sich keine notarielle Wahrheit aus dem Chat holen. Sichtbar ist nur, dass beide verschiedenen Satzteilen mehr Gewicht gaben.",
  "Hilfreicher als ein Urteil über damals wäre eine klare Sprache für künftig: Was ist ein Wunsch, was ein Plan, und wann sagen beide wirklich zu?");

export const EDITORIAL_T04 = Object.freeze(entries);
