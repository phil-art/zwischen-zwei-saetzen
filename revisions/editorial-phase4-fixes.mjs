// Targeted corrections from the independent Phase-4 review. This layer stays explicit so
// the already reviewed candidate text is not regenerated or silently replaced wholesale.
import { EDITORIAL_T03 } from "./editorial-t03.mjs";
import { EDITORIAL_T01 } from "./editorial-t01.mjs";
import { EDITORIAL_T04 } from "./editorial-t04.mjs";
import { EDITORIAL_T05 } from "./editorial-t05.mjs";
import { EDITORIAL_T06 } from "./editorial-t06.mjs";
import { EDITORIAL_T07 } from "./editorial-t07.mjs";
import { EDITORIAL_T08 } from "./editorial-t08.mjs";
import { EDITORIAL_T09 } from "./editorial-t09.mjs";
import { EDITORIAL_T10 } from "./editorial-t10.mjs";
import { EDITORIAL_T11 } from "./editorial-t11.mjs";
import { EDITORIAL_T12 } from "./editorial-t12.mjs";
import { REVISIONS as KNOWLEDGE_REVISIONS } from "./knowledge.mjs";
import { EDITORIAL_KNOWLEDGE } from "./editorial-knowledge.mjs";

const source = Object.assign({}, EDITORIAL_T01, EDITORIAL_T03, EDITORIAL_T04, EDITORIAL_T05, EDITORIAL_T06,
  EDITORIAL_T07, EDITORIAL_T08, EDITORIAL_T09, EDITORIAL_T10, EDITORIAL_T11, EDITORIAL_T12);
const fixes = {};
const body = (id) => fixes[id]?.body ?? source[id].body;
const setBody = (id, value) => { fixes[id] = { ...(source[id] ?? {}), ...(fixes[id] ?? {}), body: value }; };

// A is the receiving figure; B is the figure whose action started the moment.
for (const family of [
  "S-T03-F02", "S-T03-F04", "S-T06-F01", "S-T06-F04", "S-T07-F03", "S-T08-F02",
  "S-T08-F04", "S-T09-F02", "S-T09-F04", "S-T10-F02", "S-T10-F03", "S-T12-F01"
]) {
  const a = source[`${family}-A`].body;
  const b = source[`${family}-B`].body;
  setBody(`${family}-A`, b);
  setBody(`${family}-B`, a);
}

function replace(id, before, after) {
  const current = body(id);
  if (!current.includes(before)) throw new Error(`Missing Phase-4 editorial source in ${id}`);
  setBody(id, current.replace(before, after));
}

function replaceLast(id, paragraph) {
  const parts = body(id).split(/\n\n/);
  parts[parts.length - 1] = paragraph;
  setBody(id, parts.join("\n\n"));
}

replace("S-T12-F04-A", "Er kann Mirevas Pause respektieren", "Sie kann Mirevas Pause respektieren");
replace("S-T01-F03-B", "Schreiben würde in diesem Moment länger dauern, und mit einer Hand räumt sie noch Nolas Becher vom Tisch.", "Mit einer Hand räumt sie noch Nolas Becher vom Tisch. Warum sie eine Sprachnachricht wählt, bleibt in diesem Moment offen.");
replace("S-T01-F03-B", "Für Liviane ist es zunächst die Form, die gerade möglich war.", "Für Liviane ist es zunächst die Form, die sie gewählt hat.");
replace("S-T05-F01-A", "Der zweite Becher war eine Einladung, aber Jorun konnte seine Bedeutung vielleicht nicht erkennen.", "Der zweite Becher könnte eine Einladung gewesen sein; was Mireva damit verband, hat sie noch nicht gesagt.");
replace("S-T05-F01-B", "Noch weiß Jorun womöglich nicht, dass Mireva gerade auf ein gemeinsames Ankommen gehofft hat.", "Noch weiß Jorun nicht, was Mireva mit dem zweiten Becher verbunden hat.");
replace("S-T05-F04-A", "Joruns Geste sagt zunächst nur: Der Satz ist nicht angekommen – nicht, dass Mireva stört.", "Joruns Geste lässt offen, ob der Satz nicht ankam, gerade nicht passt oder nur einen Moment warten soll.");
replace("S-T06-F02-B", "Liviane hat offenbar etwas Dringendes im Kopf.", "Liviane setzt mitten im Satz an; was sie dazu bringt, bleibt offen.");
for (const id of ["S-T06-F04-A", "S-T06-F04-B"]) {
  if (body(id).includes("Für Liviane wird es leichter")) {
    replace(id, "Für Liviane wird es leichter, wenn er einen Punkt auswählt und die übrigen sichtbar für später notiert.", "Quirin kann einen Punkt auswählen und die übrigen sichtbar für später notieren; wie Liviane das aufnimmt, bleibt bei ihr.");
  }
}
replace("S-T05-F03-B", "Aus einem Rückzug wird aber erst dann eine gemeinsame Pause, wenn Mireva ungefähr weiß, woran sie ist.", "Jorun kann den eigenen Rückzug verständlicher machen, indem sie einen möglichen Rückkehrpunkt anbietet. Ob daraus eine gemeinsame Pause wird, entscheiden beide.");
for (const perspective of ["A", "B", "C"]) {
  replace(`S-T07-F02-${perspective}`, "Menschen zeigen Zuneigung nicht immer in derselben Sprache. Für eine Person ist Fürsorge ein bereitgestelltes Glas, für die andere ein Körper in erreichbarer Nähe. Keine Geste ist deshalb falsch.", "Ein Glas Wasser kann Fürsorge ausdrücken, ein freier Platz den Wunsch nach Nähe. Welche Bedeutung beide Gesten heute für Mireva und Jorun haben, ist noch nicht ausgesprochen.");
}

// Perspective-specific endings: shared facts remain shared, while advice no longer speaks
// to the wrong role. C keeps the outcome open rather than prescribing reconciliation.
const endings = {
  "T04-F01": {
    A: "Solvian kann sich über den Anruf freuen und später ruhig sagen, was das Warten mit ihm gemacht hat.",
    B: "Tavia kann erzählen, was geschah, und zugleich hören, wie die zwanzig Minuten bei Solvian ankamen.",
    C: "Der Tee ist kalt, der Anruf beginnt. Ob sie heute nur ankommen oder auch über Verlässlichkeit sprechen, bleibt offen."
  },
  "T04-F02": {
    A: "Solvian kann den Samstag ablehnen und, wenn er möchte, einen anderen freien Zeitraum nennen.",
    B: "Tavias Vorschlag darf ein Vorschlag bleiben. Ein Nein zu diesem Samstag entscheidet noch nichts über den nächsten.",
    C: "Zwei Kalender liegen nebeneinander. Ein gemeinsames Fenster ist noch nicht gefunden, aber auch nicht ausgeschlossen."
  },
  "T04-F03": {
    A: "Solvian darf erst bei seiner Enttäuschung ankommen und später fragen, was hinter der Absage lag.",
    B: "Tavia kann bei ihrer Absage bleiben und, wenn es möglich ist, sagen, ob oder wann sie neu planen möchte.",
    C: "Der Abend ist abgesagt. Ob ein Grund, ein neuer Termin oder einfach Ruhe folgt, gehört nicht mehr zu dieser Szene."
  },
  "T04-F04": {
    A: "Solvian kann beschreiben, welche Zusage er gehört hat, ohne Tavias Absicht schon festzulegen.",
    B: "Tavia kann den Vorbehalt erklären und trotzdem anerkennen, dass Solvian mit dem Abend gerechnet hat.",
    C: "Für künftig könnten Wunsch, Plan und feste Zusage deutlicher werden. Was beide daraus machen, ist noch offen."
  },
  "T05-F01": {
    A: "Mireva kann ihren Wunsch hörbar machen: „Ich würde gern kurz mit dir sitzen – passt das heute?“",
    B: "Jorun kann erst ankommen und danach fragen, ob Mireva sich für den Abend etwas gewünscht hatte.",
    C: "Was beide jetzt brauchen, ist noch nicht ausgesprochen. Ein Satz könnte den Abend klarer machen."
  },
  "T05-F02": {
    A: "Jorun kann den ruhigen Sonntag benennen, ohne Mirevas Ausflugsidee kleinzumachen.",
    B: "Mireva kann den Prospekt als Einladung zeigen und offenlassen, ob heute ein gemeinsamer Plan daraus wird.",
    C: "Buch und Prospekt warten auf dem Tisch. Vielleicht passt beides, vielleicht nur eines – entschieden ist noch nichts."
  },
  "T05-F03": {
    A: "Mireva darf vom Flur weggehen und später fragen, ob Jorun einen Zeitpunkt für ein neues Gespräch anbieten möchte.",
    B: "Jorun kann sagen: „Ich brauche eine halbe Stunde. Danach kann ich dir sagen, ob ich weiterreden kann.“",
    C: "Die Tür ist zu. Eine eigene Pause besteht bereits; eine gemeinsame Rückkehr braucht noch zwei Stimmen."
  },
  "T05-F04": {
    A: "Mireva kann warten, bis Jorun ansprechbar ist, oder ihren Gesprächswunsch für später klar benennen.",
    B: "Jorun kann zeigen, ob gerade nur der Ohrhörer stört oder ob sie wirklich noch Zeit für sich braucht.",
    C: "Sie teilen einen Raum, noch keine Verabredung über Aufmerksamkeit. Ein nächster Satz könnte das ändern."
  },
  "T06-F01": {
    A: "Liviane darf sagen, ob jetzt fünf Minuten möglich sind oder wann sie selbst wieder auf das Thema schauen kann.",
    B: "Quirin kann um Zeit für das Thema bitten, ohne Livianes Bereitschaft oder Zeitpunkt vorauszusetzen.",
    C: "Der dritte Anfang ist ausgesprochen. Ob daraus jetzt ein Gespräch oder ein genauer späterer Termin wird, bleibt offen."
  },
  "T06-F02": {
    A: "Quirin kann um einen ununterbrochenen Satz bitten, statt gegen Livianes Stimme anzureden.",
    B: "Liviane kann kurz stoppen und sagen, was sie einwerfen wollte; Quirins Reaktion darauf bleibt seine.",
    C: "Der Joghurtbecher liegt umgekippt. Wer zuerst weiterredet, ist noch nicht entschieden."
  },
  "T06-F03": {
    A: "Quirin kann fragen: „Wann wäre morgen ein möglicher Zeitpunkt?“ Eine gemeinsame Zusage entsteht erst aus Livianes Antwort.",
    B: "Liviane kann für heute aufhören und einen Zeitpunkt vorschlagen, ohne Quirins Zustimmung vorwegzunehmen.",
    C: "Heute endet das Gespräch. Ob morgen ein gemeinsamer Zeitpunkt entsteht, bleibt zwischen beiden offen."
  },
  "T06-F04": {
    A: "Liviane kann benennen, welcher Punkt für sie heute wirklich zählt und welche Themen warten dürfen.",
    B: "Quirin kann einen Punkt auswählen und die übrigen notieren; Liviane entscheidet selbst, ob diese Reihenfolge für sie passt.",
    C: "Fünf Themen liegen auf dem Tisch. Für heute braucht höchstens eines davon eine gemeinsame Entscheidung."
  },
  "T07-F01": {
    A: "Mireva kann enttäuscht sein und Joruns Nein stehenlassen. Nähe in anderer Form darf sie anbieten, nicht erwarten.",
    B: "Joruns Nein genügt. Nur wenn sie möchte, kann sie sagen, ob eine andere Art von Nähe heute angenehm wäre.",
    C: "Ein Annähern und ein Nein sind sichtbar. Was beide danach brauchen, ist noch nicht ausgesprochen."
  },
  "T07-F02": {
    A: "Mireva kann das Wasser annehmen und trotzdem fragen: „Magst du dich kurz zu mir setzen?“",
    B: "Jorun kann bei ihrer Geste bleiben und offen hören, ob Mireva gerade noch etwas anderes braucht.",
    C: "Glas und freier Stuhl sind zwei Angebote. Erst eine Antwort zeigt, ob sie heute zusammenpassen."
  },
  "T07-F03": {
    A: "Jorun darf nachfragen, was „öfter“ für Mireva bedeutet, und sich Zeit für eine ehrliche Antwort nehmen.",
    B: "Mireva kann ihren Wunsch genauer machen, ohne Joruns Zustimmung schon darin mitzuerzählen.",
    C: "Ein Wunsch liegt zwischen ihnen. Häufigkeit, Form und Bereitschaft sind noch nicht gemeinsam geklärt."
  },
  "T07-F04": {
    A: "Mireva kann die Berührung annehmen, ohne aus ihrem Ende eine Botschaft über sich zu machen.",
    B: "Jorun darf die Hand zurückziehen. Wenn sie sprechen möchte, kann sie sagen, was die kurze Geste für sie war.",
    C: "Die Hände haben sich kurz berührt. Mehr Bedeutung muss dieser Moment noch nicht tragen."
  },
  "T08-F01": {
    A: "Solvian kann nach der Summe fragen und sagen, welcher Anteil für ihn tragbar wäre.",
    B: "Tavia kann erklären, wie der Betrag entstand, ohne Solvians Zustimmung zu seinem Anteil anzunehmen.",
    C: "Der neue Preis liegt vor. Wer welchen Teil tragen kann und will, ist noch nicht vereinbart."
  },
  "T08-F02": {
    A: "Tavia kann die Folgen für ihre Besuchszeit benennen, ohne Solvians berufliche Entscheidung für ihn zu treffen.",
    B: "Solvian kann seine Möglichkeiten erklären und Tavias Blick einholen, bevor aus Fragezeichen ein Plan wird.",
    C: "Arbeitszeiten und Besuchsfenster berühren sich. Welche Teile beweglich sind, wissen beide noch nicht."
  },
  "T08-F03": {
    A: "Solvian kann sagen, was ihm an der Reise wichtig ist, ohne Tavias Rücklage dafür verfügbar zu erklären.",
    B: "Tavia kann ihr Sparziel schützen und zugleich fragen, ob eine kleinere gemeinsame Reise denkbar wäre.",
    C: "Ein Betrag, zwei Wünsche: Eigentum, Prioritäten und mögliche Teilwege sind noch offen."
  },
  "T08-F04": {
    A: "Tavia kann zeigen, was zeitlich nicht aufgeht, und sagen, welcher Teil des Besuchs ihr wichtig wäre.",
    B: "Solvian kann seinen Plan verkleinern, ohne Tavias Begeisterung aus ihren Markierungen abzulesen.",
    C: "Der Nachmittag ist kürzer als der Plan. Welcher Teil bleiben soll, haben beide noch nicht gewählt."
  },
  "T09-F01": {
    A: "Quirin kann jetzt klar sagen, ob er Nola abholt oder welche andere Lösung er anfragen kann.",
    B: "Liviane kann eine verlässliche Antwort brauchen, ohne Quirins Zuständigkeit aus dem leeren Kalenderfeld abzuleiten.",
    C: "Die Uhrzeit steht fest, der Name fehlt. Zuerst braucht der heutige Weg eine wirkliche Person."
  },
  "T09-F02": {
    A: "Liviane kann nach den Folgen für ihren Tag fragen und ihre eigene verfügbare Kraft ehrlich benennen.",
    B: "Quirin kann sagen, was der Anruf verändert hat, ohne Livianes Übernahme weiterer Aufgaben vorauszusetzen.",
    C: "Pflegebedarf und Tagesplan liegen nebeneinander. Dringlichkeit, Kraft und zusätzliche Hilfe sind noch zu sortieren."
  },
  "T09-F03": {
    A: "Quirin kann die Enge des Samstags beschreiben und sagen, welcher Besuchsrahmen für ihn noch denkbar ist.",
    B: "Liviane kann ihren Wunsch als offenen Vorschlag stehenlassen und Quirins tatsächliche Kapazität abwarten.",
    C: "Besuch, Termine und Familienzeit teilen denselben Samstag. Ein gemeinsamer Plan ist daraus noch nicht geworden."
  },
  "T09-F04": {
    A: "Liviane kann die Lücke benennen, ohne sie selbst schließen zu müssen.",
    B: "Quirin kann den Termin erst dann fest eintragen, wenn Wege und Betreuung wirklich geklärt sind.",
    C: "Zwischen zwei Einträgen fehlen nicht nur Minuten, sondern Zuständigkeit. Beides ist noch offen."
  },
  "T10-F01": {
    A: "Solvian kann Tavias Eigenzeit respektieren und seinen Wunsch nach einem nächsten gemeinsamen Abend später aussprechen.",
    B: "Tavia kann ihren Abend für sich wählen; ein warmer Zusatz ist ein Angebot, keine Pflicht zur Rechtfertigung.",
    C: "Für heute war keine gemeinsame Zeit bestätigt. Wann beide sich wiedersehen möchten, bleibt offen."
  },
  "T10-F02": {
    A: "Tavia kann ihre Grenze klar benennen: „Ich möchte nicht, dass du auf meinem Display mitliest.“",
    B: "Solvian kann seine Unsicherheit aussprechen, ohne daraus einen Anspruch auf Tavias Nachrichten zu machen.",
    C: "Privatsphäre und Vertrauen stehen nicht automatisch gegeneinander. Der kurze Moment entscheidet darüber noch nichts."
  },
  "T10-F03": {
    A: "Tavia kann bei ihrem eigenen Treffen bleiben und nachfragen, ob Solvians Erwähnung auch eine Einladung war.",
    B: "Solvian kann seinen Wunsch nach gemeinsamer Teilnahme direkt aussprechen, statt Tavias Plan zu deuten.",
    C: "Zwei Einladungen teilen einen Abend. Vielleicht fehlt nichts; vielleicht wartet nur eine konkrete Bitte."
  },
  "T10-F04": {
    A: "Solvian kann den offenen Abend weiterleben und später einmal freundlich nachfassen.",
    B: "Tavia kann antworten, wenn sie die Nachricht sieht und Zeit hat; Solvians Warten kennt sie vielleicht noch nicht.",
    C: "Eine Frage ist gesendet, eine Antwort fehlt. Die Minuten dazwischen liefern keine neue Erklärung."
  },
  "T11-F01": {
    A: "Solvian kann kurz prüfen, ob Tavia ihn akustisch oder inhaltlich unterbrochen hat, bevor er weiterredet.",
    B: "Tavia kann sagen, ob sie ergänzen wollte oder das Ende des Satzes vermutete.",
    C: "Eine kurze Abstimmung darüber, wer beginnt, könnte genügen. Keiner muss dabei sofort nachgeben."
  },
  "T11-F02": {
    A: "Solvian kann seinen Wunsch nach ihrer Stimme äußern, ohne Tavias leichteren Weg abzuwerten.",
    B: "Tavia kann schriftlich beginnen und offenlassen, ob später zusätzlich ein Gespräch möglich ist.",
    C: "Text und Stimme müssen nicht gegeneinander gewinnen. Welche Mischung passt, entscheiden beide erst noch."
  },
  "T11-F03": {
    A: "Solvian kann eine konkrete spätere Zeit anbieten, statt nur das frühe Fenster abzulehnen.",
    B: "Tavias frühe Verfügbarkeit ist ein Angebot. Sie darf prüfen, ob Solvians Gegenvorschlag für sie passt.",
    C: "Die freien Fenster überlappen heute kaum. Eine Nachricht kann reichen, bis ein ruhigerer Zeitpunkt entsteht."
  },
  "T11-F04": {
    A: "Solvian kann bedauern, dass nicht alles klappt, und Tavia glauben, wie viel Energie sie hat.",
    B: "Tavia darf eine Unternehmung wählen oder beide ablehnen, ohne den Besuch damit abzuwerten.",
    C: "Zwei Vorhaben passen nicht in jede Kraft. Wie langsam der Besuch werden darf, ist noch offen."
  },
  "T12-F01": {
    A: "Jorun kann ansehen, was heute liegen blieb, und sagen, was eine realistische Vereinbarung bräuchte.",
    B: "Mireva kann die heutige Folge benennen, ohne Joruns Reaktion oder künftige Verlässlichkeit vorwegzunehmen.",
    C: "Das Thema ist bekannt, der heutige Ausgang nicht. Erst eine passende Vereinbarung könnte etwas verändern."
  },
  "T12-F02": {
    A: "Mireva darf Zeit brauchen und später sagen, was die Entschuldigung für sie noch nicht erreicht.",
    B: "Jorun kann bei ihrer Entschuldigung bleiben, nach der Wirkung fragen und Mirevas Antwort offenlassen.",
    C: "Eine Entschuldigung ist ausgesprochen. Annahme, Reparatur und der nächste Schritt sind damit noch nicht entschieden."
  },
  "T12-F03": {
    A: "Mireva kann um den alten Plan trauern und nach den praktischen Folgen der Veränderung fragen.",
    B: "Jorun kann die frühere Zusage neu betrachten und zugleich zuhören, was Mireva dadurch verliert.",
    C: "Der alte Plan gilt nicht unverändert weiter. Gründe, Folgen und mögliche neue Wege sind noch offen."
  },
  "T12-F04": {
    A: "Jorun kann nach einem möglichen Rückkehrpunkt fragen. Mireva entscheidet, ob sie heute einen anbieten kann.",
    B: "Mireva kann für heute bei ihrem Nein zur Entscheidung bleiben und, wenn möglich, einen neuen Zeitpunkt vorschlagen.",
    C: "Die Entscheidung ruht für heute. Ein gemeinsamer nächster Zeitpunkt ist noch nicht vereinbart."
  }
};

for (const [family, variants] of Object.entries(endings)) {
  for (const [perspective, paragraph] of Object.entries(variants)) replaceLast(`S-${family}-${perspective}`, paragraph);
}

const openMomentPhrases = {
  "S-T04-F01-C": "Sicher sind zunächst", "S-T04-F02-C": "Zwischen beiden Wohnungen liegen", "S-T04-F03-C": "In dieser Nachricht stehen", "S-T04-F04-C": "Im Chat sichtbar sind",
  "S-T05-F01-C": "Am Küchentisch bleiben", "S-T05-F02-C": "Auf dem Tisch warten", "S-T05-F03-C": "Im Flur bleiben", "S-T05-F04-C": "Im selben Raum stehen",
  "S-T06-F01-C": "Im Raum hörbar sind", "S-T06-F02-C": "Gerade sichtbar sind", "S-T06-F03-C": "Für heute fest steht", "S-T06-F04-C": "Auf dem Tisch liegen",
  "S-T07-F01-C": "Zu sehen sind", "S-T07-F02-C": "Zwischen beiden stehen", "S-T07-F03-C": "Im Raum bleiben", "S-T07-F04-C": "Der sichtbare Moment enthält",
  "S-T08-F01-C": "Auf der Rechnung steht", "S-T08-F02-C": "Im Kalender berühren sich", "S-T08-F03-C": "Auf den Zetteln stehen", "S-T08-F04-C": "Dem Nachmittag fehlen",
  "S-T09-F01-C": "Im Kalender stehen", "S-T09-F02-C": "Nebeneinander liegen", "S-T09-F03-C": "Auf dem Samstag sammeln sich", "S-T09-F04-C": "Im Plan fehlen",
  "S-T10-F01-C": "In der Nachricht steht", "S-T10-F02-C": "Der kurze Moment zeigt", "S-T10-F03-C": "Für denselben Abend gibt es", "S-T10-F04-C": "Auf dem Display bleibt",
  "S-T11-F01-C": "Im Anruf treffen", "S-T11-F02-C": "Zwischen den Wohnungen stehen", "S-T11-F03-C": "Heute überschneiden sich", "S-T11-F04-C": "Im Besuchsplan stehen",
  "S-T12-F01-C": "Wieder da sind", "S-T12-F02-C": "Auf dem Tisch liegen", "S-T12-F03-C": "Jetzt nebeneinander stehen", "S-T12-F04-C": "Für heute bleibt"
};
for (const [id, opening] of Object.entries(openMomentPhrases)) {
  if (body(id).includes("Von außen")) replace(id, "Von außen", opening);
}

const openingRepairs = {
  "S-T04-F01-C": ["Sicher sind zunächst sind nur zwei Dinge sicher", "Sicher sind zunächst nur zwei Dinge"],
  "S-T04-F03-C": ["In dieser Nachricht stehen bleibt die Beziehung größer als diese Nachricht", "In dieser Nachricht steht nur die Absage; die Beziehung ist größer als dieser eine Satz"],
  "S-T04-F04-C": ["Im Chat sichtbar sind lässt sich keine notarielle Wahrheit aus dem Chat holen", "Im Chat ist keine eindeutige Wahrheit über die damalige Bedeutung zu finden"],
  "S-T05-F01-C": ["Am Küchentisch bleiben sind nur eine abgestellte Tasche, ein Weg ins Zimmer und zwei Becher zu sehen", "Am Küchentisch bleiben eine abgestellte Tasche, ein Weg ins Zimmer und zwei Becher zurück"],
  "S-T05-F02-C": ["Auf dem Tisch warten liegen zwei gute Möglichkeiten nebeneinander", "Auf dem Tisch warten zwei gute Möglichkeiten nebeneinander"],
  "S-T05-F03-C": ["Im Flur bleiben ist die Tür geschlossen, nicht die Bedeutung geklärt", "Im Flur bleibt die Tür geschlossen; ihre Bedeutung ist nicht geklärt"],
  "S-T05-F04-C": ["Im selben Raum stehen bleibt offen", "Im selben Raum bleibt offen"],
  "S-T06-F01-C": ["Im Raum hörbar sind sind drei Anläufe und ein stiller Moment zu sehen", "Im Raum hörbar sind drei Anläufe; danach folgt ein stiller Moment"],
  "S-T06-F02-C": ["Gerade sichtbar sind lässt sich kein Sieger bestimmen", "Gerade lässt sich kein Sieger bestimmen"],
  "S-T06-F03-C": ["Für heute fest steht ist nur klar", "Für heute steht nur fest"],
  "S-T06-F04-C": ["Auf dem Tisch liegen sind mehrere berechtigte Themen und wenig gemeinsamer Raum zu erkennen", "Auf dem Tisch liegen mehrere Themen; der gemeinsame Raum dafür ist klein"],
  "S-T07-F01-C": ["Zu sehen sind ist ein Annähern und ein klares Nein zu sehen", "Zu sehen sind ein Annähern und ein klares Nein"],
  "S-T07-F02-C": ["Zwischen beiden stehen begegnen sich zwei kleine Angebote ohne Gebrauchsanleitung", "Zwischen beiden begegnen sich zwei kleine Angebote ohne Gebrauchsanleitung"],
  "S-T07-F03-C": ["Im Raum bleiben stehen ein Wunsch, eine bewegte Tasse und Stille im Raum", "Im Raum bleiben ein Wunsch, eine bewegte Tasse und Stille"],
  "S-T07-F04-C": ["Der sichtbare Moment enthält war die Berührung kurz", "Der sichtbare Moment enthält eine kurze Berührung"],
  "S-T08-F01-C": ["Auf der Rechnung steht ist nur der Unterschied zwischen Schätzung und Preis sichtbar", "Auf der Rechnung steht ein höherer Preis als zuvor geschätzt"],
  "S-T08-F02-C": ["Im Kalender berühren sich kollidieren mögliche Arbeitszeiten mit bisherigen Besuchsfenstern", "Im Kalender berühren sich mögliche Arbeitszeiten und bisherige Besuchsfenster"],
  "S-T08-F03-C": ["Auf den Zetteln stehen gibt es einen Betrag und zwei Verwendungen", "Auf den Zetteln stehen ein Betrag und zwei Verwendungen"],
  "S-T08-F04-C": ["Dem Nachmittag fehlen fehlen Stunden", "Dem Nachmittag fehlen Stunden"],
  "S-T09-F01-C": ["Im Kalender stehen gibt es eine feste Uhrzeit und keine feste Person", "Im Kalender steht eine feste Uhrzeit, aber keine feste Person"],
  "S-T09-F02-C": ["Nebeneinander liegen sind ein zusätzlicher Bedarf und ein bestehender Plan zu sehen", "Nebeneinander liegen ein zusätzlicher Bedarf und ein bestehender Plan"],
  "S-T09-F03-C": ["Auf dem Samstag sammeln sich stehen ein Wunsch, mehrere Termine und ein Bauklotz beieinander", "Auf dem Samstag sammeln sich ein Wunsch, mehrere Termine und ein Bauklotz"],
  "S-T09-F04-C": ["Im Plan fehlen ist der Plan rechnerisch eng und organisatorisch offen", "Im Plan fehlen Zeit und eine geklärte Zuständigkeit"],
  "S-T10-F01-C": ["In der Nachricht steht ist eine klare Bitte um Eigenzeit zu sehen", "In der Nachricht steht eine klare Bitte um Eigenzeit"],
  "S-T10-F02-C": ["Der kurze Moment zeigt sind Licht, Blick und eine Handbewegung sichtbar", "Der kurze Moment zeigt Licht, einen Blick und eine Handbewegung"],
  "S-T10-F03-C": ["Für denselben Abend gibt es gibt es zwei Einladungen und einen Abend", "Für denselben Abend gibt es zwei Einladungen"],
  "S-T10-F04-C": ["Auf dem Display bleibt gibt es eine offene Nachricht", "Auf dem Display bleibt eine offene Nachricht"],
  "S-T11-F01-C": ["Im Anruf treffen hören wir zwei Stimmen und dann Stille", "Im Anruf treffen zwei Stimmen aufeinander; danach folgt Stille"],
  "S-T11-F02-C": ["Zwischen den Wohnungen stehen ist nur eine bevorzugte Kommunikationsform benannt", "Zwischen den Wohnungen steht eine bevorzugte Kommunikationsform im Raum"],
  "S-T11-F03-C": ["Heute überschneiden sich passen zwei Zeitfenster heute fast nicht zusammen", "Heute überschneiden sich die beiden freien Zeitfenster kaum"],
  "S-T11-F04-C": ["Im Besuchsplan stehen sind zwei Ideen und Kraft für vielleicht eine zu sehen", "Im Besuchsplan stehen zwei Ideen; die Kraft reicht vielleicht für eine"],
  "S-T12-F01-C": ["Wieder da sind sehen wir eine bekannte Aufgabe und einen bekannten Satz", "Wieder da sind eine bekannte Aufgabe und ein bekannter Satz"],
  "S-T12-F02-C": ["Auf dem Tisch liegen hören wir Bedauern und sehen eine offene Situation", "Auf dem Tisch liegt der Gegenstand; daneben stehen Bedauern und eine offene Antwort"],
  "S-T12-F03-C": ["Jetzt nebeneinander stehen gibt es einen alten Plan und ein neues Nein", "Jetzt nebeneinander stehen ein alter Plan und ein neues Nein"],
  "S-T12-F04-C": ["Für heute bleibt ist die Entscheidung offen, nicht verweigert", "Für heute bleibt die Entscheidung offen; sie ist nicht verweigert"]
};
for (const [id, [before, after]] of Object.entries(openingRepairs)) replace(id, before, after);
replace("S-T09-F03-C", "Auf dem Samstag sammeln sich ein Wunsch, mehrere Termine und ein Bauklotz.", "An diesem Samstag treffen ein Besuchswunsch und mehrere Termine aufeinander; Nolas Bauklotz liegt mitten im Plan.");
replace("S-T11-F02-C", "Zwischen den Wohnungen steht eine bevorzugte Kommunikationsform im Raum.", "Tavia hat eine bevorzugte Kommunikationsform benannt.");
replace("S-T11-F03-C", "Heute überschneiden sich die beiden freien Zeitfenster kaum.", "Die beiden freien Zeitfenster überschneiden sich kaum.");
replace("S-T12-F01-C", "Wieder da sind eine bekannte Aufgabe und ein bekannter Satz.", "Eine bekannte Aufgabe und ein bekannter Satz sind wieder da.");
replace("S-T12-F02-C", "Auf dem Tisch liegt der Gegenstand; daneben stehen Bedauern und eine offene Antwort.", "Neben dem Gegenstand stehen Bedauern und eine noch offene Antwort.");
replace("S-T12-F03-C", "Jetzt nebeneinander stehen ein alter Plan und ein neues Nein.", "Jetzt stehen ein alter Plan und ein neues Nein nebeneinander.");
replaceLast("S-T07-F01-C", `${body("S-T07-F01-C").split(/\n\n/).at(-1)} Auch Stille wäre eine mögliche Antwort.`);
replaceLast("S-T09-F02-C", `${body("S-T09-F02-C").split(/\n\n/).at(-1)} Niemand ist dadurch automatisch für alles zuständig.`);

const conciseAdditions = {
  "S-T03-F02-A": "Eine Antwort darauf bleibt Liviane überlassen.",
  "S-T05-F02-A": "Beides darf zunächst nebeneinanderstehen.",
  "S-T05-F03-C": "Auch ein späteres Nein bleibt möglich.",
  "S-T06-F03-A": "Eine Antwort darauf bleibt Liviane überlassen.",
  "S-T06-F03-B": "Quirin darf diesen Vorschlag annehmen oder ablehnen.",
  "S-T06-F03-C": "Auch morgen darf eine Person noch Nein sagen.",
  "S-T07-F01-A": "Ihre Enttäuschung darf trotzdem einen eigenen Platz haben.",
  "S-T07-F01-B": "Ein Nein braucht keine Ersatzgeste.",
  "S-T07-F01-C": "Beide Antworten dürfen verschieden sein.",
  "S-T07-F03-B": "Eine genaue Bitte bleibt leichter beantwortbar als eine Erwartung.",
  "S-T07-F03-C": "Auch ein Nein wäre eine klare Antwort.",
  "S-T07-F04-A": "Ihr Wunsch nach mehr darf trotzdem bestehen.",
  "S-T08-F02-C": "Noch ist nichts zugesagt oder verloren.",
  "S-T08-F03-A": "Sein Reisewunsch darf trotzdem wichtig bleiben.",
  "S-T08-F03-B": "Ihr Sicherheitsbedürfnis braucht keine Rechtfertigung.",
  "S-T08-F03-C": "Auch getrennte Lösungen bleiben möglich.",
  "S-T08-F04-A": "Ihre Zeitgrenze bleibt dabei real.",
  "S-T08-F04-B": "Seine Vorfreude darf trotzdem sichtbar bleiben.",
  "S-T08-F04-C": "Auch Ruhe kann Teil des Besuchs sein.",
  "S-T09-F01-B": "Ihre eigene Zeit gehört ebenfalls in diese Antwort.",
  "S-T09-F01-C": "Nola braucht heute dennoch eine verlässliche Abholung.",
  "S-T09-F03-C": "Nolas Bedürfnisse gehören ebenfalls in den Plan.",
  "S-T09-F04-A": "Ihre eigene verfügbare Zeit zählt dabei mit.",
  "S-T09-F04-C": "Ein leerer Kalenderraum löst beides nicht.",
  "S-T10-F02-A": "Ihre Privatsphäre braucht dafür keine weitere Begründung.",
  "S-T10-F02-B": "Tavias Grenze bleibt dabei vollständig gültig.",
  "S-T10-F04-A": "Seine Frage darf bis dahin klein bleiben.",
  "S-T11-F01-B": "Solvian darf darauf anders antworten, als sie hofft.",
  "S-T11-F01-C": "Keiner muss dabei sofort nachgeben.",
  "S-T11-F02-B": "Solvian darf dazu einen eigenen Wunsch haben.",
  "S-T11-F03-A": "Tavia darf diesen Vorschlag trotzdem ablehnen.",
  "S-T11-F03-C": "Heute muss daraus kein Gespräch mehr werden.",
  "S-T11-F04-A": "Seine Enttäuschung darf daneben bestehen.",
  "S-T11-F04-B": "Solvian darf darüber enttäuscht sein, ohne ihre Grenze anzuzweifeln.",
  "S-T11-F04-C": "Auch ein ruhiger Nachmittag kann Nähe tragen.",
  "S-T12-F01-A": "Beschämung allein verteilt die Aufgabe noch nicht.",
  "S-T12-F01-B": "Eine neue Zusage ist damit noch nicht gemacht.",
  "S-T12-F01-C": "Beide müssen ihr freiwillig zustimmen können.",
  "S-T12-F03-B": "Eine neue Zusage schuldet sie damit noch nicht.",
  "S-T12-F04-C": "Auch Offenlassen bleibt eine mögliche gemeinsame Entscheidung."
};
for (const [id, addition] of Object.entries(conciseAdditions)) replaceLast(id, `${body(id).split(/\n\n/).at(-1)} ${addition}`);

function relabelDiagram(id, replacements, textAlternative) {
  const diagram = structuredClone(KNOWLEDGE_REVISIONS[id].diagram);
  for (const node of diagram.nodes) if (replacements[node.label]) node.label = replacements[node.label];
  let alternative = textAlternative ?? diagram.text_alternative;
  if (!textAlternative) for (const [before, after] of Object.entries(replacements)) alternative = alternative.split(before).join(after);
  fixes[id] = { ...(EDITORIAL_KNOWLEDGE[id] ?? {}), ...(fixes[id] ?? {}), diagram: { ...diagram, text_alternative: alternative } };
}

relabelDiagram("K05", { "Arbeitshypothese, keine Diagnose": "Eine mögliche Lesart, keine Diagnose" },
  "Eine mögliche Abfolge lautet: Ein Thema kommt auf, eine Person drängt auf Klärung, die andere zieht sich zurück, und das Thema wird später erneut aufgegriffen. Diese Beschreibung ist eine mögliche Lesart und keine Diagnose.");
relabelDiagram("K19", { "Kausalität": "einen sicheren Grund" },
  "Ein selbst berichtetes Ergebnis kann hilfreich, unverändert, schwieriger, gemischt oder unklar sein. Die Durchführung und der zeitliche Zusammenhang beweisen nicht, wodurch das Ergebnis entstanden ist.");
relabelDiagram("K24", { "Kein Sicherheitsnachweis": "Keine sichere Beurteilung durch diese Seite" },
  "Die Seite stellt keine Diagnose und kann die Sicherheit einer Situation nicht zuverlässig beurteilen. Sie kann zu privater Orientierung oder externer Unterstützung führen.");

fixes.R16 = { body: `Dein kleiner Versuch muss nichts beweisen. Du kannst in Ruhe ansehen, was sich verändert hat, was gleich blieb und was du noch nicht weißt.

Auch ein schwieriges oder gemischtes Ergebnis gehört dazu. Daraus muss heute kein weiterer Schritt folgen.` };
fixes.R19 = { body: `Ein Vorschlag ist noch keine gemeinsame Vereinbarung. Entscheidend bleibt, was ihr tatsächlich miteinander beschlossen habt.

Du kannst diese Etappe auch beenden, wenn nichts gepasst hat. Für heute braucht es keine weitere Entscheidung.` };

export const EDITORIAL_PHASE4_FIXES = Object.freeze(fixes);
