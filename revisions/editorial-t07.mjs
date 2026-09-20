const entries = {};

function scene(id, title, opening, shared, a, b, c, closing) {
  for (const [view, paragraph] of Object.entries({ A: a, B: b, C: c })) entries[`S-T07-${id}-${view}`] = { title, body: `${opening} ${paragraph}\n\n${shared}\n\n${closing}` };
}

scene("F01", "Ein Nein am Abend",
  "Mireva rückt am Abend näher. Jorun sagt: „Heute nicht.“ Mireva hält inne.",
  "Ein Nein zu Nähe kann wehtun, ohne ein Nein zur Beziehung zu sein. Zugleich braucht niemand einen besseren Grund, um körperliche Nähe abzulehnen. Beides darf gleichzeitig wahr sein.",
  "Mireva darf enttäuscht sein und muss Joruns Nein trotzdem nicht verhandeln. Ihre eigene Unsicherheit kann später in Worte gefasst werden.",
  "Joruns Grenze gilt. Wenn es sich stimmig anfühlt, kann Jorun zusätzlich sagen, welche andere Form von Verbundenheit heute möglich ist.",
  "Von außen ist ein Annähern und ein klares Nein zu sehen. Gründe, Gefühle und Wünsche für später sind noch nicht bekannt.",
  "Wärme entsteht hier nicht durch Überreden, sondern durch Respekt: „Danke, dass du es sagst. Möchtest du trotzdem noch bei mir sitzen?“");

scene("F02", "Andere Zeichen von Nähe",
  "Jorun stellt Mireva ein Glas Wasser hin und setzt sich wieder an den Tisch. Mireva zeigt auf den freien Platz neben sich.",
  "Menschen zeigen Zuneigung nicht immer in derselben Sprache. Für eine Person ist Fürsorge ein bereitgestelltes Glas, für die andere ein Körper in erreichbarer Nähe. Keine Geste ist deshalb falsch.",
  "Mireva darf sich wünschen, dass Jorun sich dazusetzt. Das Wasser kann liebevoll gemeint sein und trotzdem nicht das treffen, was sie gerade braucht.",
  "Jorun hat sich gekümmert. Mirevas Einladung bedeutet nicht, dass diese Geste wertlos war, sondern vielleicht nur, dass noch ein anderer Wunsch da ist.",
  "Von außen begegnen sich zwei kleine Angebote ohne Gebrauchsanleitung. Ob sie zusammenpassen, können nur die beiden klären.",
  "Ein freundlicher Satz übersetzt besser als Raten: „Das Wasser tut gut – und ich hätte dich gerade auch gern kurz neben mir.“");

scene("F03", "Ein Wunsch bleibt offen",
  "Mireva wünscht sich öfter einen gemeinsamen Abend. Jorun dreht die Tasse in den Händen und antwortet zunächst nicht.",
  "Das Wort „öfter“ kann Sehnsucht tragen und zugleich schwer zu beantworten sein. Es sagt noch nicht, welcher Abend, wie lang oder was gemeinsam bedeuten soll.",
  "Mireva hat etwas Verletzliches ausgesprochen. Joruns Schweigen muss keine Ablehnung sein, doch sie darf eine erkennbare Antwort brauchen.",
  "Jorun darf Zeit zum Nachdenken brauchen. Eine kleine Rückmeldung könnte Mireva zeigen, dass ihr Wunsch angekommen ist.",
  "Von außen stehen ein Wunsch, eine bewegte Tasse und Stille im Raum. Zustimmung, Sorge oder Überforderung lassen sich daraus nicht sicher lesen.",
  "Vielleicht wird aus „öfter“ eine prüfbare Bitte: „Wäre ein gemeinsamer Abend in den nächsten sieben Tagen für dich möglich?“");

scene("F04", "Zärtlichkeit ohne Erwartung",
  "Jorun berührt kurz Mirevas Hand und zieht die eigene dann zurück. Mireva sieht auf.",
  "Eine zärtliche Geste darf einfach eine Geste sein. Sie muss weder ein Versprechen auf mehr noch eine Prüfung der Beziehung werden. Trotzdem können beide sie verschieden erleben.",
  "Mireva darf die Berührung mögen und sich mehr wünschen. Sie muss aus dem Zurückziehen aber keine Botschaft über ihren Wert machen.",
  "Jorun darf Nähe anbieten und wieder beenden, ohne dafür eine große Erklärung liefern zu müssen. Mirevas Reaktion kennt Jorun noch nicht.",
  "Von außen war die Berührung kurz. Was sie bedeutet, lässt sich nicht an ihrer Dauer messen – die drei Nüsse in der Schale helfen dabei ebenfalls nicht.",
  "Wenn Unsicherheit bleibt, darf die Frage leicht sein: „War das gerade einfach schön für dich – oder möchtest du etwas dazu sagen?“");

export const EDITORIAL_T07 = Object.freeze(entries);
