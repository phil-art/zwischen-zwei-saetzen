// W9 public editorial layer. Static, deterministic, and browser-only.
import { REVISIONS as DAY_INTRO_REVISIONS } from "./revisions/day_intro.mjs";
import { REVISIONS as KNOWLEDGE_REVISIONS } from "./revisions/knowledge.mjs";
import { REVISIONS as ORIENTATION_REVISIONS } from "./revisions/orientation.mjs";
import { REVISIONS as PRACTICE_REVISIONS } from "./revisions/practice.mjs";
import { REVISIONS as CLOSING_REVISIONS } from "./revisions/closing.mjs";
import { REVISIONS as REFLECTION_REVISIONS } from "./revisions/reflection.mjs";
import { REVISIONS as T01_REVISIONS } from "./revisions/t01.mjs";
import { REVISIONS as T02_REVISIONS } from "./revisions/t02.mjs";
import { REVISIONS as T03_REVISIONS } from "./revisions/t03.mjs";
import { REVISIONS as T04_REVISIONS } from "./revisions/t04.mjs";
import { REVISIONS as T05_REVISIONS } from "./revisions/t05.mjs";
import { REVISIONS as T06_REVISIONS } from "./revisions/t06.mjs";
import { REVISIONS as T07_REVISIONS } from "./revisions/t07.mjs";
import { REVISIONS as T08_REVISIONS } from "./revisions/t08.mjs";
import { REVISIONS as T09_REVISIONS } from "./revisions/t09.mjs";
import { REVISIONS as T10_REVISIONS } from "./revisions/t10.mjs";
import { REVISIONS as T11_REVISIONS } from "./revisions/t11.mjs";
import { REVISIONS as T12_REVISIONS } from "./revisions/t12.mjs";
import { EDITORIAL_SHORT } from "./revisions/editorial-short.mjs";
import { EDITORIAL_KNOWLEDGE } from "./revisions/editorial-knowledge.mjs";
import { EDITORIAL_PRACTICE } from "./revisions/editorial-practice.mjs";
import { EDITORIAL_T01 } from "./revisions/editorial-t01.mjs";
import { EDITORIAL_T02 } from "./revisions/editorial-t02.mjs";
import { EDITORIAL_T03 } from "./revisions/editorial-t03.mjs";
import { EDITORIAL_T04 } from "./revisions/editorial-t04.mjs";
import { EDITORIAL_T05 } from "./revisions/editorial-t05.mjs";
import { EDITORIAL_T06 } from "./revisions/editorial-t06.mjs";
import { EDITORIAL_T07 } from "./revisions/editorial-t07.mjs";
import { EDITORIAL_T08 } from "./revisions/editorial-t08.mjs";
import { EDITORIAL_T09 } from "./revisions/editorial-t09.mjs";
import { EDITORIAL_T10 } from "./revisions/editorial-t10.mjs";
import { EDITORIAL_T11 } from "./revisions/editorial-t11.mjs";
import { EDITORIAL_T12 } from "./revisions/editorial-t12.mjs";
import { EDITORIAL_PHASE4_FIXES } from "./revisions/editorial-phase4-fixes.mjs";

export const W9_VERSION = "0.6.1-w9-candidate";

const W9_REVISIONS = Object.freeze(Object.assign({}, DAY_INTRO_REVISIONS, KNOWLEDGE_REVISIONS,
  ORIENTATION_REVISIONS, PRACTICE_REVISIONS, CLOSING_REVISIONS, REFLECTION_REVISIONS,
  T01_REVISIONS, T02_REVISIONS, T03_REVISIONS, T04_REVISIONS, T05_REVISIONS, T06_REVISIONS,
  T07_REVISIONS, T08_REVISIONS, T09_REVISIONS, T10_REVISIONS, T11_REVISIONS, T12_REVISIONS));

const EDITORIAL_OVERRIDES = Object.freeze(Object.assign({}, EDITORIAL_SHORT, EDITORIAL_KNOWLEDGE,
  EDITORIAL_PRACTICE, EDITORIAL_T01, EDITORIAL_T02, EDITORIAL_T03, EDITORIAL_T04,
  EDITORIAL_T05, EDITORIAL_T06, EDITORIAL_T07, EDITORIAL_T08, EDITORIAL_T09,
  EDITORIAL_T10, EDITORIAL_T11, EDITORIAL_T12, EDITORIAL_PHASE4_FIXES));

// Individually reviewed additions for entries whose concise draft fell below its editorial span.
const EDITORIAL_EXTENSIONS = Object.freeze({
  P22: "Du darfst dabei auch notieren, welche Zahl sich für dich noch tragbar anfühlt.",
  P30: "Du entscheidest selbst, welche Form heute genug Abstand und zugleich Klarheit bietet.",
  P33: "Auch seltene, aber verlässliche Zeiten können näher wirken als häufige vage Versprechen.",
  P34: "Vielleicht ist das passendste Ziel heute einfach, freundlicher mit der eigenen Unsicherheit umzugehen.",
  "S-T01-F04-A": "Vielleicht braucht dieser unscheinbare Moment auch gar keine größere Bedeutung als heute.",
  "S-T02-F01-B": "Für beide darf erst später sichtbar werden, was an diesem Satz wirklich nachklingt.",
  "S-T02-F02-A": "Eine Rückfrage könnte mehr Nähe schaffen als jede noch so schlüssige eigene Erklärung.",
  "S-T02-F02-B": "Jorun darf den Ton neu betrachten, ohne die eigene Absicht deshalb zu verleugnen.",
  "S-T02-F02-C": "Der Moment kann klein bleiben oder wichtig werden; beides ist noch möglich.",
  "S-T02-F03-A": "Mireva darf sich Zeit lassen, bevor sie entscheidet, wie viel Gewicht das hat.",
  "S-T02-F03-B": "Jorun kann später nachfragen, ohne schon zu wissen, welche Antwort kommen wird.",
  "S-T02-F03-C": "Vielleicht war es Flüchtigkeit; vielleicht braucht es Aufmerksamkeit. Noch ist beides denkbar.",
  "S-T02-F04-B": "Ein verantwortlicher nächster Satz darf kurz sein und trotzdem den öffentlichen Rahmen anerkennen.",
  "S-T02-F04-C": "Auch vor anderen darf eine Irritation erst einmal ohne abschließendes Urteil stehenbleiben.",
  "S-T03-F01-C": "Bevor jemand nachgibt, darf sichtbar werden, was jede Person an diesem Abend trägt.",
  "S-T03-F02-B": "Eine konkrete Bitte wäre leichter zu beantworten als die Hoffnung, verstanden zu werden.",
  "S-T03-F02-C": "Manchmal liegt die Entlastung zuerst darin, die unsichtbaren Schritte gemeinsam zu benennen.",
  "S-T03-F03-A": "Quirin darf seine Kraft ebenso ehrlich ansehen wie die Dringlichkeit der Aufgabe.",
  "S-T03-F03-B": "Liviane muss eine offene Aufgabe nicht automatisch zu ihrer eigenen machen.",
  "S-T03-F03-C": "Ein realistischer Plan beginnt dort, wo auch begrenzte Kraft mitgerechnet wird.",
  "S-T03-F04-A": "Ihre eigene Zeit darf dabei ebenso vorkommen wie die sichtbare Betreuungslücke.",
  "S-T03-F04-C": "Vielleicht braucht es einen kleineren Plan oder Hilfe, nicht einen überzeugenderen Vorwurf.",
  "S-T07-F03-A": "Ein kurzes „Ich denke darüber nach“ könnte den stillen Zwischenraum freundlicher machen.",
  "S-T10-F02-C": "Erst ein Gespräch könnte zeigen, was beide wahrgenommen haben und welche Grenze künftig gelten soll.",
  "S-T11-F01-A": "Vor dem nächsten Satz kann er Tavia den Raum für ihre Antwort lassen.",
  "S-T11-F02-A": "Er darf zugleich fragen, ob für bestimmte Themen später auch ein Anruf möglich wäre.",
  "S-T11-F02-C": "Für verschiedene Themen dürfen dabei auch verschiedene Wege passen.",
  "S-T11-F03-B": "Ihre frühe Verfügbarkeit ist ein Angebot, kein Beweis für fehlende Flexibilität.",
  "S-T12-F04-A": "Ein vereinbarter Zeitpunkt kann ihr helfen, die offene Frage für heute abzulegen."
});

export const UI_COPY = Object.freeze({
  title: "Zwischen zwei Sätzen",
  description: "Kurze Geschichten und ruhige Gedankenwege über alltägliche Beziehungsmissverständnisse – ohne Diagnose.",
  disclaimer: "Geschichten und Anregungen für den Alltag. Keine Diagnose und keine Therapie.",
  prototype: "Vierzehn literarische Etappen. Du bestimmst, wie weit du heute gehen möchtest.",
  heroEyebrow: "Ein ruhiger Weg durch kleine Missverständnisse",
  hero: [
    "Manchmal bleibt ein Satz hängen. Eine knappe Nachricht, ein schiefer Ton, eine Absprache, die für euch beide etwas anderes bedeutete.",
    "Hier findest du kurze Geschichten über solche Momente. Du kannst schauen, was dir bekannt vorkommt, Gedanken sortieren und eine kleine Möglichkeit für dich entdecken. Du brauchst dafür nichts Persönliches aufzuschreiben.",
    "Vierzehn Etappen geben dir einen Rahmen. Du bestimmst, wie weit du heute gehen möchtest."
  ],
  start: "Mit einer Geschichte beginnen",
  browse: "Erst einmal stöbern",
  back: "← Zurück",
  stop: "Für heute aufhören",
  leave: "Seite verlassen",
  leaveNote: "Dadurch wird der Browserverlauf nicht gelöscht.",
  missingAnswer: "Hier fehlt noch eine Auswahl. Wenn du es nicht weißt, kannst du „Unklar“ wählen.",
  noSuggestion: "Gerade passt keine dieser Möglichkeiten. Du kannst eine andere Szene wählen oder es für heute beim Lesen lassen.",
  returnToStage: "Zurück zu deiner Etappe",
  repeatedCard: "Diese Karte hast du in dieser Sitzung schon geöffnet.",
  storageError: "Das Speichern klappt in diesem Browser gerade nicht. Du kannst trotzdem weiterlesen.",
  safetyQuestion: "Befürchtest du Drohungen, Einschüchterung, Gewalt oder Kontrolle, die deine Freiheit einschränkt?",
  safetyExplanation: "Gemeint sind zum Beispiel Drohungen, Überwachung von Handy oder Kontakten, Druck nach einem Nein oder die Sorge, dass eine Grenze ernsthafte Folgen haben könnte. Die gewöhnliche Sorge, jemanden zu enttäuschen oder ein schwieriges Gespräch zu führen, ist damit nicht gemeint.",
  safetyAnswers: {
    no_concern_reported: "Nein, darum geht es bei meiner Sorge nicht",
    examples: "Ich möchte erst Beispiele lesen",
    concern: "Ja, so etwas befürchte ich",
    unknown: "Ich möchte das offenlassen"
  },
  concernNote: "Für diese Situation werden gerade keine Übungen vorgeschlagen. Du kannst in Ruhe Informationen lesen, Hilfeangebote ansehen oder deine Antwort noch einmal prüfen.",
  reviseSafety: "Meine Antwort noch einmal ansehen",
  supportVoluntary: "Hilfeangebote ansehen",
  plan: "Das möchte ich ausprobieren",
  readingOnly: "Für heute reicht mir das Lesen",
  later: "Später ausprobieren und für heute abschließen",
  performed: "Ich habe es ausprobiert",
  notDone: "Ich habe es nicht ausprobiert",
  notDoneNote: "Dann bleibt es für heute beim Lesen. Du musst daraus keinen misslungenen Versuch machen."
});

export const PERSPECTIVE_LABELS = Object.freeze({
  A: "Bei der empfangenden Person",
  B: "Bei der Person, die etwas ausgelöst hat",
  C: "Den gemeinsamen Moment offen ansehen"
});

export const GOAL_LABELS = Object.freeze({
  clarify: "Etwas besser verstehen",
  pause: "Erst einmal Ruhe finden",
  private: "Für mich nachdenken",
  boundary: "Eine Grenze für mich klären",
  distance: "Etwas Abstand gewinnen",
  undecided: "Es noch offenlassen",
  support: "Unterstützung ansehen"
});

export const SUPPORT_CONTACTS = Object.freeze([
  { label: "Akute Gefahr in Deutschland: Polizei", value: "110", href: "tel:110" },
  { label: "Medizinischer Notfall in Deutschland", value: "112", href: "tel:112" },
  { label: "Hilfetelefon Gewalt gegen Frauen", value: "116 016", href: "tel:116016", url: "https://www.hilfetelefon.de/" },
  { label: "Hilfetelefon Gewalt an Männern", value: "0800 1239900", href: "tel:08001239900", url: "https://www.maennerhilfetelefon.de/", note: "Erreichbarkeit bitte auf der Website prüfen." },
  { label: "WEISSER RING Opfer-Telefon", value: "Informationen und Erreichbarkeit", url: "https://weisser-ring.de/hilfe-fuer-opfer/opfer-telefon" }
]);

const TITLES = Object.freeze({
  K01: "Was dort steht – und was du darin hörst",
  K02: "Mehr als eine mögliche Erklärung",
  K03: "Wie viel ist heute möglich?",
  K04: "Eine Pause für dich",
  K05: "Wenn sich ein Ablauf wiederholt",
  K06: "Was rundherum mitwirkt",
  K07: "Ein Gefühl für dich benennen",
  K08: "Was dir wichtig ist",
  K09: "Was möchtest du heute?",
  K10: "Was liegt bei dir – und was nicht?",
  K11: "Eine klare, offene Bitte",
  K12: "Ist dasselbe angekommen?",
  K13: "Wie und wann ihr sprecht",
  K14: "Dein Plan oder eure Vereinbarung?",
  K15: "Eine Grenze für dich",
  K16: "Wenn etwas wirklich schwierig ist",
  K17: "Den eigenen Anteil ansehen",
  K18: "Ein kleiner, umkehrbarer Versuch",
  K19: "Was hat sich gezeigt?",
  K20: "Wenn es beim Lesen bleibt",
  K21: "Wenn im Alltag zu viel zusammenkommt",
  K22: "Ihr dürft verschieden sein",
  K23: "Eine Entscheidung darf offenbleiben",
  K24: "Hier kannst du erst einmal anhalten",
  P01: "Einen Moment genauer ansehen",
  P02: "Eine kleine Pause vorbereiten",
  P03: "Eine kurze Nachfrage",
  P04: "Eine zweite Erklärung offenlassen",
  P05: "Einen eigenen Satz neu formulieren",
  P06: "Eine echte Verständnisfrage",
  P07: "Eine Aufgabe sichtbar machen",
  P08: "Einen machbaren Schritt wählen",
  P09: "Eine Aufgabe verlässlich aufteilen",
  P10: "Bei der bisherigen Absprache beginnen",
  P11: "Nach einem passenden Zeitpunkt fragen",
  P12: "Etwas Luft in die Zeit bringen",
  P13: "Was Nähe für dich bedeutet",
  P14: "Zeit für dich ansehen",
  P15: "Ein Gespräch anbieten",
  P16: "Dein Stoppsignal bemerken",
  P17: "Eine Pause gemeinsam absprechen",
  P18: "Einen Satz erst für dich finden",
  P19: "Ein Nein für dich klären",
  P20: "Zwei Wünsche nebeneinanderstellen",
  P21: "Was du mindestens brauchst",
  P22: "Zahlen und Annahmen sortieren",
  P23: "Über Zeit, Geld oder Kraft sprechen",
  P24: "Deine Belastungsgrenze ansehen",
  P25: "Familienarbeit konkret beschreiben",
  P26: "Mögliche Unterstützung sammeln",
  P27: "Eine Aufgabe gemeinsam verteilen",
  P28: "Was privat bleiben soll",
  P29: "Einen Moment an deinen Maßstäben prüfen",
  P30: "Welche Form von Kontakt passt?",
  P31: "Ein passendes Medium wählen",
  P32: "Eine Nachricht erst einmal entwerfen",
  P33: "Kontaktzeiten gemeinsam absprechen",
  P34: "Dein Ziel noch einmal ansehen",
  P35: "Eine mögliche Reparatur vorbereiten",
  P36: "Bewusst noch nicht entscheiden",
  D01: "Mit einem kleinen Moment anfangen",
  D02: "Was ist passiert?",
  D03: "Wie viel ist heute möglich?",
  D04: "Wenn es sich wiederholt",
  D05: "Was im Alltag mitwirkt",
  D06: "Was dir wichtig ist",
  D07: "Dein Spielraum",
  D08: "Eine kleine Möglichkeit",
  D09: "Einander besser verstehen",
  D10: "Ein Plan für dich oder für euch?",
  D11: "Deinen Anteil ansehen",
  D12: "Wenn etwas nicht passt",
  D13: "Eine weitere Situation",
  D14: "Was du mitnehmen möchtest",
  O01: "Was wäre dir heute hilfreich?",
  O02: "Worum soll es heute gehen?",
  O03: "Wie viel Raum ist gerade da?",
  O04: "Bevor es weitergeht",
  O05: "Was ist gerade vorhanden?",
  O06: "Wähle eine Geschichte",
  O07: "Wie möchtest du weitergehen?",
  O08: "Für heute darf es reichen",
  O09: "Wenn dieser Weg nicht passt",
  O10: "Wieder einsteigen",
  O11: "In Ruhe stöbern",
  O12: "Beim nächsten Mal leichter einsteigen",
  O13: "Erst einmal für dich bleiben",
  O14: "Mit jemandem sprechen können"
});

const REFERENCE = Object.freeze({
  "S-T01-F01-A": {
    title: "Ein Wort, und plötzlich wird es eng",
    body: "Liviane hat mit einem einzigen Wort geantwortet.\n\nQuirin schaut noch einmal auf das Handy. Eigentlich steht dort kaum etwas. Trotzdem spürt er, wie sein Kopf bereits Lücken füllt: Ist sie genervt? Hat er etwas Falsches gesagt? Oder war einfach gerade keine Zeit für mehr?\n\nWährend er noch grübelt, versucht Nola, ihren Löffel unter den Küchenschrank zu schieben. Mumpitz beobachtet das Unternehmen mit großer Ernsthaftigkeit. Der Alltag läuft weiter, aber Quirin hängt noch an diesem einen Wort.\n\nVielleicht kennst du solche Momente: Eine kleine Nachricht bekommt plötzlich ein erstaunliches Gewicht. Dabei ist bisher nur eines sicher: Liviane hat knapp geantwortet. Was sie dabei dachte oder fühlte, wissen weder Quirin noch wir.\n\nFür den Moment darf das offenbleiben."
  },
  "S-T01-F01-B": {
    title: "Eine kurze Antwort",
    body: "Livianes Antwort an Quirin besteht aus einem Wort. Sie steht nun auf seinem Bildschirm. Was beim Lesen daraus wird, kann Liviane nicht sehen.\n\nAuf dem Küchentisch steht eine Kaffeetasse. Nola schiebt ihren Löffel unter den Schrank, Mumpitz hält aufmerksam Wache. Zwischen all dem liegt das Handy mit seiner kurzen Nachricht.\n\nEine knappe Antwort kann vieles bedeuten. Manchmal fehlen Zeit oder Worte, manchmal ist tatsächlich etwas schwierig. Welche Bedeutung Livianes Antwort hat, hat sie Quirin noch nicht gesagt.\n\nVielleicht kommt dir diese Seite des Moments bekannt vor: Du hast etwas geschrieben und weißt nicht, wie es angekommen ist. Kürze allein erzählt darüber noch nicht die ganze Geschichte."
  },
  "S-T01-F01-C": {
    title: "Zwischen Nachricht und Antwort",
    body: "Quirin hat Liviane geschrieben. Sie antwortet mit einem Wort. Mehr steht auf seinem Handy zunächst nicht.\n\nEr legt es neben die Kaffeetasse und schaut kurz darauf noch einmal hin. Unter dem Schrank ist Nolas Löffel verschwunden. Mumpitz scheint entschlossen, die Sache im Blick zu behalten.\n\nVon außen wirkt dieser Morgen ganz gewöhnlich. Trotzdem lässt ein so kurzer Austausch viel Platz für Fragen. War die Antwort knapp gemeint? Oder kam sie in einem vollen Moment zustande?\n\nQuirin und Liviane haben darüber noch nicht gesprochen. Vielleicht möchtest du beim Weiterlesen erst bei dem bleiben, was zu sehen ist: eine Nachricht, eine kurze Antwort und eine Bedeutung, die noch nicht feststeht."
  },
  K01: {
    title: "Was dort steht – und was du darin hörst",
    body: "Eine Nachricht besteht aus einem Wort. Beim Lesen kommt vielleicht ein ganzer Satz dazu: „Sie hat keine Lust auf mich.“ Das ist verständlich, besonders wenn du auf eine andere Antwort gehofft hast.\n\nTrotzdem sind das zwei verschiedene Dinge. Das Wort steht auf dem Bildschirm. Die vermutete Ablehnung ist eine mögliche Erklärung dafür. Vielleicht trifft sie zu, vielleicht fehlt dir noch etwas, um die Nachricht zu verstehen.\n\nDu kannst beides nebeneinanderhalten: Was ist tatsächlich passiert? Und was vermute ich gerade? Dein Gefühl wird dadurch nicht unwichtig. Du gibst dir nur etwas mehr Raum, bevor aus einer Vermutung Gewissheit wird."
  },
  K21: {
    title: "Wenn im Alltag zu viel zusammenkommt",
    body: "Manchmal sitzt das Problem nicht zwischen zwei Sätzen, sondern mitten im Alltag. Es fehlen Zeit, Geld oder Unterstützung. Vielleicht bleibt die Arbeit immer wieder bei derselben Person hängen.\n\nAuch ein ruhiges Gespräch räumt diese Belastung nicht einfach aus dem Weg. Es kann helfen, sie erst einmal beim Namen zu nennen: Was ist zu viel? Was fehlt? Wer kann überhaupt etwas daran ändern?\n\nDu musst aus einer ungleichen Aufgabenverteilung kein persönliches Missverständnis machen. Und du musst heute auch noch keine Lösung haben. Für den Anfang kann es reichen, die tatsächliche Last von der Frage zu unterscheiden, wie ihr miteinander darüber sprecht."
  },
  P01: {
    title: "Einen Moment genauer ansehen",
    body: "Wenn du möchtest, nimm dir eine einzelne Nachricht oder einen kurzen Moment vor. Nicht den ganzen Streit und nicht die gesamte Beziehung.\n\nVersuche zuerst, nur zu beschreiben, was du gesehen oder gehört hast: etwa „Auf meine Frage kam ein Wort zurück.“ Daneben kannst du festhalten, was du darin vermutest oder was es bei dir ausgelöst hat. Beides hat Platz; es ist nur nicht dasselbe.\n\nDu kannst das im Kopf machen oder für dich notieren. Hier musst du nichts eingeben. Falls es gerade eher anstrengender wird, lass es für heute dabei."
  },
  P03: {
    title: "Eine kurze Nachfrage",
    body: "Wenn ihr beide gerade sprechen möchtet und ein Nein oder Später möglich ist, kannst du eine einzelne Nachricht ansprechen. Zum Beispiel: „Deine Antwort war sehr kurz. Ich weiß nicht, wie du sie gemeint hast. Magst du mir etwas dazu sagen?“\n\nDer Satz ist ein Angebot. Die andere Person kann antworten, anders darüber sprechen wollen oder gerade keinen Raum dafür haben. Eine klare Frage verspricht noch keine klare oder angenehme Antwort.\n\nDu entscheidest, ob du den Vorschlag tatsächlich verwenden möchtest. Wenn es heute nicht passt, kannst du bei deinen eigenen Gedanken bleiben."
  },
  P09: {
    title: "Eine Aufgabe verlässlich aufteilen",
    body: "Wenn ihr beide eine Aufgabe anders verteilen möchtet, könnt ihr bei einer einzelnen Sache anfangen. Was genau soll getan werden, von wem und bis wann? Dazu gehört auch, ob die nötige Zeit und Kraft tatsächlich vorhanden sind.\n\nDu kannst deinen eigenen Beitrag festhalten. Eine gemeinsame Vereinbarung entsteht aber erst, wenn ihr beide ihr zustimmt. Dein Plan allein verpflichtet die andere Person zu nichts.\n\nVielleicht zeigt sich auch, dass die Aufgabe unter den jetzigen Bedingungen nicht machbar ist. Dann bleibt diese Schwierigkeit wichtig; sie lässt sich nicht durch eine besonders gute Formulierung ersetzen."
  },
  D01: {
    title: "Mit einem kleinen Moment anfangen",
    body: "Vielleicht gibt es einen Satz, der dir noch nachgeht. Oder du möchtest einfach schauen, ob du dich in einer Geschichte wiederfindest. Für den Anfang reicht ein kleiner Ausschnitt. Du wählst ein Thema und liest eine kurze Szene. Danach kannst du bei einem Gedanken bleiben oder schon für heute aufhören."
  },
  O01: {
    title: "Was wäre dir heute hilfreich?",
    body: "Vielleicht möchtest du etwas besser verstehen. Vielleicht brauchst du eher Ruhe oder möchtest eine Grenze für dich klären. Wähle, was heute am ehesten passt. Du legst dich damit nicht für die nächsten Etappen fest. Wenn du noch kein Ziel hast, kannst du das ebenfalls offenlassen."
  },
  O04: {
    title: "Bevor es weitergeht",
    body: "Manche Sorgen gehören zu einem schwierigen Gespräch. Andere betreffen Drohungen, Einschüchterung oder Kontrolle. Damit die nächsten Vorschläge zu deiner Situation passen, kommt hier eine kurze Frage dazu. Du brauchst keine Einzelheiten zu erzählen. Wenn du nicht sicher bist, was gemeint ist, kannst du zuerst Beispiele lesen."
  },
  O07: {
    title: "Wie möchtest du weitergehen?",
    body: "Du hast eine Möglichkeit ausgewählt. Vielleicht möchtest du sie später ausprobieren, vielleicht hast du es schon getan. Beides ist ein eigener Schritt. Falls du etwas berichten möchtest, kannst du unten auswählen, ob du genau diesen Versuch durchgeführt hast. Du kannst die Etappe auch ohne diese Angabe beenden."
  },
  R02: {
    title: "Wie war es für dich?",
    body: "Du hast angegeben, dass du deinen Versuch ausprobiert hast. Vielleicht wurde etwas klarer, vielleicht war es unverändert oder schwieriger als vorher. Schau auf einen kleinen Ausschnitt: Was ist dir aufgefallen? Deine Antwort muss weder eindeutig noch erfreulich sein. Auch daraus, dass etwas nicht passt, kann eine nächste Entscheidung entstehen."
  },
  R01: {
    title: "Für heute darf es reichen",
    body: "Vielleicht bleibt ein Gedanke aus dieser Etappe bei dir. Vielleicht möchtest du einfach etwas Abstand gewinnen. Du brauchst jetzt kein fertiges Ergebnis. Du kannst hier aufhören und ein anderes Mal weiterlesen. Wenn du noch Zeit und Lust hast, lässt sich auch die nächste Etappe öffnen."
  },
  K24: {
    title: "Hier kannst du erst einmal anhalten",
    body: "Wenn du Drohungen, Einschüchterung oder Kontrolle befürchtest, musst du jetzt kein Gespräch vorbereiten. Du kannst hier in Ruhe lesen, welche Unterstützung es gibt. Du brauchst dafür weder Beweise noch eine fertige Erklärung deiner Situation.\n\nBei solchen Sorgen geht es hier zunächst um Orientierung und Unterstützung. Die Wissenskarten bleiben zum Lesen erreichbar. Auch eine Beratungsstelle kann ein erster Kontakt sein, wenn du noch unsicher bist und keine akute Gefahr besteht.\n\nDu entscheidest, ob du in Ruhe weiterlesen, dir Hilfeangebote ansehen oder für heute aufhören möchtest."
  },
  O13: {
    title: "Erst einmal für dich bleiben",
    body: "Du musst hier nichts über deine Beziehung offenlegen. Du kannst eine Wissenskarte lesen, nach einer Beratungsstelle schauen oder einfach Schluss machen. Wenn du dich bedroht oder kontrolliert fühlst, bleibt dieser Weg bei Orientierung und Unterstützung. Du brauchst dafür weder etwas aufzuschreiben noch eine schwierige Aussprache vorzubereiten."
  },
  O14: {
    title: "Mit jemandem sprechen können",
    body: "Manchmal hilft es, die eigene Situation mit einer Person außerhalb der Beziehung zu besprechen. Du musst dafür noch nicht genau wissen, wie du sie nennen sollst. Die folgenden Stellen bieten Informationen und Beratung an. Bei unmittelbarer Gefahr ist dagegen schnelle Hilfe vor Ort wichtig. Welche Anlaufstelle passt, hängt auch davon ab, in welchem Land du bist."
  },
  O12: {
    title: "Beim nächsten Mal leichter einsteigen",
    body: "Wenn du möchtest, merkt sich dieser Browser deine Etappe, dein Thema, die Perspektive und dein Ziel. Deine Antworten zu Sorge, gemeinsamen Schritten und eigenen Versuchen werden dabei nicht gespeichert. Innerhalb einer Etappe beginnt die Orientierung beim nächsten Öffnen neu. Am Seitenende kannst du die Speicherung einschalten oder die gespeicherte Auswahl wieder löschen."
  }
});

const PHRASES = Object.freeze([
  ["in dieser Episode", "in diesem Moment"],
  ["In dieser Episode", "In diesem Moment"],
  ["eine gemeinsame Klärung hat noch nicht stattgefunden", "darüber haben beide noch nicht gesprochen"],
  ["Es gab noch keine gemeinsame Klärung", "Darüber haben beide noch nicht gesprochen"],
  ["Reale Belastung", "Was im Alltag tatsächlich schwer ist"],
  ["reale Belastung", "das, was im Alltag tatsächlich schwer ist"],
  ["berichteten Versuch", "Versuch, den du beschrieben hast"],
  ["Berichteten Versuch", "Den Versuch, den du beschrieben hast"],
  ["Mitwirkungsvoraussetzungen", "Bedingungen für einen gemeinsamen Schritt"],
  ["Mitwirkung", "einen gemeinsamen Schritt"],
  ["Einflussbereiche", "Spielräume"],
  ["Lesarten", "mögliche Bedeutungen"],
  ["Gesprächskontext", "Situation vor einem Gespräch"],
  ["Aktuelle Kapazität", "Wie viel Raum gerade da ist"],
  ["Die weitere Richtung bleibt offen", "Wie es weitergeht, darf offenbleiben"],
  ["die weitere Richtung bleibt offen", "wie es weitergeht, darf offenbleiben"]
]);

const CHOICE_LABELS = Object.freeze({
  "Einflussbereiche": "Was liegt bei mir – und was nicht?",
  "Reale Belastung": "Was im Alltag wirklich schwer ist",
  "Offene Entscheidung": "Es noch offenlassen",
  "Verschiedenheit": "Unterschiede stehenlassen",
  "Eigene Grenze": "Eine Grenze für mich",
  "Eigenes Anliegen privat klären": "Für mich klären, was mir wichtig ist",
  "Beobachtung und Deutung auseinanderhalten": "Was passiert ist – und was ich vermute",
  "Eigene Möglichkeiten neu prüfen": "Noch einmal schauen, was für mich passt",
  "Eigene Einflussmöglichkeiten neu prüfen": "Noch einmal auf meinen Spielraum schauen",
  "Diesen eigenen Versuch planen": "Das möchte ich ausprobieren",
  "Eigenes Ziel und aktuelle Situation wählen": "Thema und Ziel für heute wählen",
  "Berichteten Versuch ansehen": "Wie war es für mich?",
  "Für heute abschließen": "Für heute darf es reichen",
  "Ergebnis oder Nichtpassung betrachten": "Ansehen, was dabei herauskam",
  "Beobachtung und Deutung": "Was passiert ist – und was ich vermute",
  "Eigene Kapazität": "Wie viel Raum habe ich gerade?",
  "Eigene Pause": "Eine Pause für mich",
  "Wiederkehrender Ablauf": "Wenn es sich wiederholt",
  "Eigenes Ziel": "Was wäre heute hilfreich?",
  "Vereinbarung oder eigener Plan": "Mein Plan oder unsere Vereinbarung?",
  "Ergebnis offen betrachten": "Offen ansehen, was sich gezeigt hat",
  "Nicht ausprobiert oder ohne Wirkung": "Wenn es beim Lesen blieb",
  "Grenzen des Angebots und Unterstützung": "Unterstützung und Grenzen dieses Angebots",
  "Später zur nächsten Etappe": "Ein anderes Mal weiterlesen",
  "Kontext und Verantwortung genauer betrachten": "Ansehen, was rundherum mitwirkt",
  "Den eigenen Anteil getrennt prüfen": "Meinen eigenen Anteil ansehen",
  "Kontext und Verantwortung": "Was rundherum mitwirkt",
  "Medium und Zeitpunkt": "Wie und wann ihr sprecht",
  "Medium und Zeitpunkt mitbedenken": "Wie und wann ihr sprecht",
  "Mehrere mögliche Gründe offenhalten": "Mehr als eine Erklärung offenlassen",
  "Einflussbereiche unterscheiden": "Meinen Spielraum ansehen",
  "Eigene Grenze klären": "Eine Grenze für mich klären",
  "Entscheidung offenlassen": "Noch nicht entscheiden",
  "Reale Belastung prüfen": "Ansehen, was tatsächlich schwer ist",
  "Eigenes Ziel prüfen": "Mein Ziel noch einmal ansehen",
  "Kleinen eigenen Versuch betrachten": "Eine kleine Möglichkeit ansehen",
  "Verstehen prüfen": "Prüfen, was angekommen ist",
  "Realität anerkennen": "Bei dem bleiben, was wirklich schwierig ist"
});

function warm(text) {
  let result = String(text ?? "");
  for (const [before, after] of PHRASES) result = result.split(before).join(after);
  return result.replace(/\s+([,.!?;:])/g, "$1").trim();
}

function sentences(text) {
  return warm(text).match(/[^.!?…]+(?:[.!?…]+(?:[”’"»])?|$)/g)?.map((part) => part.trim()).filter(Boolean) ?? [warm(text)];
}

function paragraphize(text, kind) {
  if (String(text).includes("\n\n")) return warm(text).split(/\n{2,}/).map((part) => part.trim()).filter(Boolean).join("\n\n");
  const parts = sentences(text);
  const group = kind === "scene" ? 3 : ["day_intro", "orientation", "reflection", "closing"].includes(kind) ? 2 : 3;
  const paragraphs = [];
  for (let index = 0; index < parts.length; index += group) paragraphs.push(parts.slice(index, index + group).join(" "));
  return paragraphs.join("\n\n");
}

const SCENE_SENTENCE_FIXES = Object.freeze({
  "S-T01-F02-C": [["Noch gibt es keine gemeinsame Klärung.", "Was das Schweigen bedeutet, haben Quirin und Liviane noch nicht miteinander herausgefunden."]],
  "S-T02-F01-C": [["Noch gibt es keine gemeinsame Klärung.", "Ob der Scherz nur schief landete oder etwas Wichtigeres berührt, ist zwischen Mireva und Jorun noch offen."]],
  "S-T02-F04-B": [["Noch gibt es keine gemeinsame Klärung.", "Wie die Bemerkung bei Mireva angekommen ist, haben beide noch nicht besprochen."]],
  "S-T01-F02-B": [["Eine gemeinsame Klärung hat in diesem Moment noch nicht stattgefunden.", "Warum die Nachricht offenbleibt, haben Quirin und Liviane noch nicht miteinander besprochen."]],
  "S-T11-F02-B": [["Eine gemeinsame Klärung hat in diesem Moment noch nicht stattgefunden.", "Was die neue Gewohnheit für beide bedeutet, ist noch nicht miteinander geklärt."]]
});

function sceneSpecificWarmth(id, text) {
  let result = text;
  for (const [before, after] of SCENE_SENTENCE_FIXES[id] ?? []) result = result.replace(before, after);
  return result;
}

function warmChoice(label) {
  if (CHOICE_LABELS[label]) return CHOICE_LABELS[label];
  return warm(label)
    .replace(/\bbetrachten\b/gi, "ansehen")
    .replace(/\bBetrachten\b/g, "Ansehen")
    .replace(/\bberichtete(?:n|r|s)?\b/gi, "beschriebene")
    .replace(/\bMöglichkeiten neu prüfen\b/g, "noch einmal schauen, was passt");
}

function warmDiagram(diagram) {
  if (!diagram) return null;
  return {
    ...diagram,
    nodes: diagram.nodes.map((node) => ({ ...node, label: warm(node.label) })),
    edges: diagram.edges.map((edge) => ({ ...edge, label: warm(edge.label) })),
    text_alternative: warm(diagram.text_alternative)
  };
}

function titleFor(node) {
  if (REFERENCE[node.id]?.title) return REFERENCE[node.id].title;
  if (TITLES[node.id]) return TITLES[node.id];
  if (node.kind === "scene") return node.title.split(" — ")[0];
  if (node.kind === "reflection") return "Wie war es für dich?";
  if (node.kind === "closing") return "Für heute darf es reichen";
  return warm(node.title);
}

export function applyW9Content(baseData) {
  const data = JSON.parse(JSON.stringify(baseData));
  data.version = W9_VERSION;
  data.prototype_notice = UI_COPY.prototype;
  data.nodes = data.nodes.map((node) => {
    const revision = W9_REVISIONS[node.id];
    if (!revision) throw new Error(`Missing W9 revision for ${node.id}`);
    const editorial = EDITORIAL_OVERRIDES[node.id] ?? {};
    const choiceLabels = { ...revision.choice_labels, ...(editorial.choice_labels ?? {}) };
    return {
      ...node,
      title: editorial.title ?? revision.title,
      body: `${editorial.body ?? revision.body}${EDITORIAL_EXTENSIONS[node.id] ? `\n\n${EDITORIAL_EXTENSIONS[node.id]}` : ""}`,
      diagram: editorial.diagram ?? revision.diagram,
      choices: node.choices.map((choice) => ({ ...choice, label: choiceLabels[choice.id] }))
    };
  });
  return data;
}
