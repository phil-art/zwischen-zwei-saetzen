import { APP_DATA as BASE_DATA } from "./data.mjs";
import { applyW9Content, GOAL_LABELS, PERSPECTIVE_LABELS, SUPPORT_CONTACTS, UI_COPY } from "./content-w9.mjs";
import { applyEvent, canEnter, diagramText, initialState, routeStatus } from "./runtime.mjs";
import { loadSelection, saveSelection } from "./storage.mjs";
import {
  FLOW_PLAN, SECTION_LABELS, initialFlow, markKnowledgeVisited, markSceneSeen,
  moveFlow, practiceChoices, prerequisiteFor, preferredSceneId, primaryKnowledgeId,
  progressPercent, resetFlowForContext, resetFlowForNextStage, stagePlan, topicPlan
} from "./flow.mjs";

const data = applyW9Content(BASE_DATA);
const nodeIndex = Object.fromEntries(data.nodes.map((node) => [node.id, node]));
const topicIndex = Object.fromEntries(data.topics.map((topic) => [topic.id, topic]));
const rules = data.rule_nodes;
const main = document.querySelector("#main");
const announcer = document.querySelector("#announcer");
const saveButton = document.querySelector("#save-button");
let storage;
try { storage = window.localStorage; } catch { storage = null; }
const restored = loadSelection(storage, data.contract, data.available_days);
let state = restored.state;
let saving = restored.enabled;
let notice = restored.notice;
let flow = initialFlow();
let view = { name: "start" };
let historyStack = [];
let selectedScene = null;
let safetyExamplesOpen = false;

const esc = (value) => String(value ?? "").replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
}[character]));

const kindNames = {
  scene: "Geschichte", knowledge: "Gedanke", practice: "Eine Möglichkeit",
  closing: "Abschluss", day_intro: "Etappe", orientation: "Orientierung", reflection: "Rückblick"
};
const outcomeLabels = {
  helpful: "Eher hilfreich", unchanged: "Unverändert", worse: "Eher schwieriger",
  mixed: "Gemischt", unknown: "Noch unklar"
};
const capacityLabels = { low: "Heute nur kurz", enough: "Ich habe etwas mehr Raum", unknown: "Ich weiß es noch nicht" };
const resourceLabels = { sufficient: "Eher ausreichend", limited: "Gerade knapp", unknown: "Noch unklar" };

function button(action, label, value = "", style = "quiet-button", attrs = "") {
  return `<button type="button" class="` + style + `" data-action="` + esc(action) + `" data-value="` + esc(value) + `" ` + attrs + `>` + esc(label) + `</button>`;
}

function paragraphs(text) {
  return String(text).split(/\n{2,}/).map((part) => `<p>` + esc(part) + `</p>`).join("");
}

function options(name, legend, values, selected = null, required = false) {
  return `<fieldset><legend>` + esc(legend) + `</legend><div class="option-row">`
    + values.map(([value, label]) => `<label><input name="` + esc(name) + `" type="radio" value="` + esc(value) + `" `
      + (value === selected ? "checked " : "") + (required ? "required" : "") + `><span>` + esc(label) + `</span></label>`).join("")
    + `</div></fieldset>`;
}

function announce(message) {
  announcer.textContent = "";
  requestAnimationFrame(() => { announcer.textContent = message; });
}

function syncStorage(write = true) {
  if (saving && write && !saveSelection(storage, state, data.contract, true)) {
    saving = false;
    notice = UI_COPY.storageError;
    announce(notice);
  }
  saveButton.textContent = saving ? "Gespeicherte Auswahl löschen" : "Auswahl auf diesem Gerät speichern";
}

function snapshot() {
  return { view: { ...view }, flowView: flow.view, flowSection: flow.section };
}

function navigate(next, remember = true) {
  if (remember) historyStack.push(snapshot());
  view = { ...next };
  render();
}

function guided(nextView, section = flow.section, remember = true, extra = {}) {
  if (remember) historyStack.push(snapshot());
  flow = moveFlow(flow, section, nextView, extra);
  view = { name: "guided" };
  render();
}

function goBack() {
  const previous = historyStack.pop();
  if (!previous) {
    view = { name: "start" };
  } else {
    view = previous.view;
    if (view.name === "guided") {
      flow = { ...flow, view: previous.flowView, section: previous.flowSection, highWater: Math.max(flow.highWater, previous.flowSection) };
    }
  }
  render();
}

function stageTrack() {
  return `<div class="stage-track" aria-label="Etappe ` + state.day + ` von ` + data.stage_count + `">`
    + Array.from({ length: data.stage_count }, (_, index) => `<span class="` + (index + 1 <= state.day ? "active" : "") + `"></span>`).join("")
    + `</div>`;
}

function progress() {
  const percent = progressPercent(flow);
  const section = flow.section;
  return `<div class="path-progress"><div class="progress-copy"><span>Etappe ` + state.day + ` von 14</span><span>Abschnitt `
    + section + ` von 6: ` + esc(SECTION_LABELS[section]) + `</span></div><div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="`
    + percent + `" aria-label="Fortschritt innerhalb dieser Etappe"><span style="width:` + percent + `%"></span></div></div>`;
}

function backRow() {
  return `<div class="back-row">` + button("back", UI_COPY.back, "", "text-button") + `</div>`;
}

function contextCard() {
  return `<aside class="side-column"><div class="side-card"><p class="eyebrow">Deine Auswahl</p><dl class="context-list">
    <dt>Etappe</dt><dd>` + state.day + ` von 14</dd>
    <dt>Thema</dt><dd>` + esc(topicIndex[state.topic].title) + `</dd>
    <dt>Perspektive</dt><dd>` + esc(PERSPECTIVE_LABELS[state.perspective]) + `</dd>
    <dt>Heute</dt><dd>` + esc(GOAL_LABELS[state.goal]) + `</dd>
  </dl>` + stageTrack() + `</div><div class="side-card"><p class="eyebrow">Du bestimmst das Tempo</p><p>Du kannst jederzeit beim Lesen bleiben oder für heute aufhören.</p>`
    + button("finish-early", UI_COPY.stop) + `</div></aside>`;
}

function contentCard(node, extra = "", topline = null) {
  return `<article class="content-card" aria-labelledby="view-title"><div class="content-topline"><span class="kind-label">`
    + esc(kindNames[node.kind] ?? node.kind) + `</span><span>` + esc(topline ?? "Deine Etappe") + `</span></div><div class="content-body"><h2 id="view-title">`
    + esc(node.title) + `</h2>` + paragraphs(node.body) + renderDiagram(node.diagram) + extra + `</div></article>`;
}

function renderDiagram(diagram) {
  const output = diagramText(diagram);
  if (!output) return "";
  return `<figure class="diagram"><figcaption>Als kleine Übersicht</figcaption><ol>`
    + output.visual.map((line) => `<li>` + esc(line) + `</li>`).join("")
    + `</ol><p class="diagram-alternative">` + esc(output.alternative) + `</p></figure>`;
}

function renderStart() {
  const primary = saving || state.day > 1 ? `Bei Etappe ` + state.day + ` weiterlesen` : UI_COPY.start;
  return `<section class="hero" aria-labelledby="hero-title"><div><p class="eyebrow">` + esc(UI_COPY.heroEyebrow) + `</p>
    <h1 id="hero-title">` + esc(UI_COPY.title) + `</h1><div class="hero-copy">` + UI_COPY.hero.map((item) => `<p class="lede">` + esc(item) + `</p>`).join("") + `</div>
    <div class="hero-actions">` + button("start-stage", primary, "", "button") + button("library", UI_COPY.browse) + `</div></div>
    <aside class="hero-note"><strong>Ohne Freitext</strong><p>` + esc(UI_COPY.prototype) + `</p>` + stageTrack() + `</aside></section>
    <section class="topic-section" aria-labelledby="topics-title"><div class="section-heading"><p class="eyebrow">Zwölf Alltagsthemen</p>
    <h2 id="topics-title">Womit möchtest du beginnen?</h2><p>Du kannst ein Thema wählen, ohne deine Geschichte zu erzählen.</p></div>
    <div class="topic-grid">` + data.topics.map((topic) => `<article class="topic-card"><div><h3>` + esc(topic.title) + `</h3><p>Eine Geschichte und ein ruhiger Gedanke als Einstieg.</p></div>`
      + button("topic-start", "Dieses Thema wählen →", topic.id, "button") + `</article>`).join("") + `</div></section>`;
}

function renderStageIntro() {
  const plan = stagePlan(state.day);
  const node = nodeIndex[plan.intro];
  const actions = state.day > 1
    ? `<div class="choices">` + button("same-context", `Mit „` + topicIndex[state.topic].title + `“ weiterlesen →`, "", "button")
      + button("change-context", "Thema, Perspektive oder Ziel ändern") + `</div>`
    : `<div class="choices">` + button("change-context", "Auswahl für heute treffen →", "", "button") + `</div>`;
  return contentCard(node, actions);
}

function renderContext() {
  return `<form class="gate-card setup-grid" data-form="context"><p class="eyebrow">Ankommen</p><h2 id="view-title">Was passt heute zu dir?</h2>
    <p>Eine ungefähre Auswahl reicht. Du kannst sie später ändern.</p>
    ` + options("goal", "Was wäre dir heute hilfreich?", Object.entries(GOAL_LABELS), state.goal, true) + `
    <label class="select-label">Worum soll es gehen?<select name="topic">`
    + data.topics.map((topic) => `<option value="` + topic.id + `" ` + (topic.id === state.topic ? "selected" : "") + `>` + esc(topic.title) + `</option>`).join("")
    + `</select></label>` + options("perspective", "Aus welcher Richtung möchtest du lesen?", Object.entries(PERSPECTIVE_LABELS), state.perspective, true)
    + `<p class="form-error" role="alert" hidden></p><button class="button" type="submit">So weiterlesen →</button></form>`;
}

function renderCapacity() {
  return `<form class="gate-card setup-grid" data-form="capacity"><p class="eyebrow">Ankommen</p><h2 id="view-title">Wie viel ist heute möglich?</h2>
    <p>Diese Angaben gelten nur für den aktuellen Durchgang und werden nicht gespeichert.</p>
    ` + options("capacity", "Wie viel Zeit und Kraft hast du gerade?", Object.entries(capacityLabels), state.capacity, true)
    + options("resources", "Sind Zeit, Energie und nötige Mittel gerade vorhanden?", Object.entries(resourceLabels), state.resources, true)
    + `<p class="form-error" role="alert" hidden></p><button class="button" type="submit">Weiter →</button></form>`;
}

function safetyExamples() {
  return `<details class="examples" ` + (safetyExamplesOpen ? "open" : "") + `><summary>Was ist mit Drohung oder Kontrolle gemeint?</summary>
    <p>Zum Beispiel: Jemand droht dir, überwacht dein Handy oder deine Kontakte, hindert dich am Gehen oder setzt dich nach einem Nein stark unter Druck.</p>
    <p>Die normale Sorge, dass ein Gespräch unangenehm wird oder jemand enttäuscht sein könnte, ist damit nicht gemeint.</p></details>`;
}

function renderSafety() {
  return `<form class="gate-card setup-grid" data-form="safety"><p class="eyebrow">Bevor es weitergeht</p><h2 id="view-title">Eine wichtige Unterscheidung</h2>
    <p>` + esc(UI_COPY.safetyExplanation) + `</p>` + safetyExamples()
    + options("safety", UI_COPY.safetyQuestion, Object.entries(UI_COPY.safetyAnswers), null, true)
    + `<p class="form-error" role="alert" hidden></p><button class="button" type="submit">Antwort übernehmen →</button></form>`;
}

function currentScene() {
  return nodeIndex[selectedScene ?? preferredSceneId(state)] ?? nodeIndex[preferredSceneId(state)];
}

function renderScene() {
  const scene = currentScene();
  const alreadySeen = flow.seenSceneFamilies.includes(scene.family_id);
  const otherScenes = data.nodes.filter((node) => node.kind === "scene" && node.topic_ids.includes(state.topic) && node.perspective === state.perspective);
  const extras = `<p class="small-note">` + esc(topicIndex[state.topic].title) + ` · ` + esc(PERSPECTIVE_LABELS[state.perspective])
    + (alreadySeen ? " · Diese Geschichte hast du in dieser Sitzung schon geöffnet." : "") + `</p>
    <div class="choices">` + button("scene-next", "Mit diesem Gedanken weiter →", "", "button")
    + `<details><summary>Eine andere Geschichte wählen</summary><div class="library-list">`
    + otherScenes.map((node) => button("scene-pick", node.title + " →", node.id)).join("") + `</div></details></div>`;
  return contentCard(scene, extras, "Geschichte");
}

function renderKnowledge() {
  const id = primaryKnowledgeId(state);
  const node = nodeIndex[id];
  const repeated = flow.visitedKnowledge.includes(id);
  const extras = (repeated ? `<p class="small-note">` + esc(UI_COPY.repeatedCard) + `</p>` : "")
    + `<div class="choices">` + button("knowledge-next", "Eine kleine Möglichkeit wählen →", "", "button")
    + button("library", "Wenn du noch etwas nachlesen möchtest") + `</div>`;
  return contentCard(node, extras, "Gedanken sortieren");
}

function practiceStatus(node) {
  if (state.safety === "concern") return "blocked";
  return routeStatus(node, state, "flow", rules);
}

function renderChoice() {
  if (state.goal === "support") {
    return `<section class="gate-card"><p class="eyebrow">Dein nächster Schritt</p><h2 id="view-title">Unterstützung ansehen</h2>
      <p>Du kannst dir Hilfeangebote ansehen, ohne damit eine Sorge-Antwort festzulegen.</p><div class="choices">`
      + button("support", UI_COPY.supportVoluntary, "", "button") + button("reading-finish", UI_COPY.readingOnly) + `</div></section>`;
  }
  const ids = practiceChoices(state);
  return `<section class="gate-card"><p class="eyebrow">Dein nächster Schritt</p><h2 id="view-title">Was könnte jetzt passen?</h2>
    <p>Wähle höchstens eine Möglichkeit. Lesen allein ist ebenfalls ein vollständiger Abschluss.</p><div class="practice-grid">`
    + ids.map((id) => {
      const node = nodeIndex[id];
      const status = practiceStatus(node);
      const note = node.gate === "private" ? "Für dich allein" : node.gate === "agreement" ? "Nur nach gemeinsamer Zustimmung" : "Nur wenn ein Nein oder Später möglich ist";
      return `<article class="practice-card"><p class="kind-label">` + esc(note) + `</p><h3>` + esc(node.title) + `</h3><p>`
        + esc(node.body.split(/\n\n/)[0]) + `</p>` + button("practice-select", status === "allowed" ? "Ansehen →" : "Voraussetzungen ansehen →", id) + `</article>`;
    }).join("") + `</div><div class="choices">` + button("reading-finish", UI_COPY.readingOnly) + `</div></section>`;
}

function renderPrerequisite() {
  const id = prerequisiteFor(flow.pendingPractice);
  const node = nodeIndex[id];
  const extras = `<div class="choices">` + button("prerequisite-next", "Zur ausgewählten Möglichkeit →", flow.pendingPractice, "button")
    + button("choice", "Eine andere Möglichkeit wählen") + `</div>`;
  return contentCard(node, extras, "Ein Gedanke davor");
}

function renderPracticeGate() {
  const target = nodeIndex[flow.pendingPractice];
  const yesNo = [["yes", "Ja"], ["no", "Nein"], ["unknown", "Unklar"]];
  return `<form class="gate-card setup-grid" data-form="practice-gate" data-target="` + esc(target.id) + `"><p class="eyebrow">Bevor ihr etwas gemeinsam versucht</p>
    <h2 id="view-title">Passt dieser Schritt gerade?</h2><p>Gemeinsame Vorschläge brauchen aktuelle, freiwillige Antworten. „Unklar“ zählt nicht als Ja.</p>
    <p>` + esc(UI_COPY.safetyExplanation) + `</p>` + safetyExamples()
    + options("safety", UI_COPY.safetyQuestion, Object.entries(UI_COPY.safetyAnswers), null, true)
    + options("partner_willing", "Möchte die andere Person freiwillig mitwirken?", yesNo, null, true)
    + options("can_decline", "Kann sie ohne Druck Nein oder Später sagen?", yesNo, null, true)
    + options("resources", "Sind Zeit, Energie und nötige Mittel ausreichend?", Object.entries(resourceLabels), state.resources, true)
    + (target.gate === "agreement" ? options("mutual_agreement", "Habt ihr dieser konkreten Vereinbarung beide freiwillig zugestimmt?", yesNo, null, true) : "")
    + `<p class="form-error" role="alert" hidden></p><button class="button" type="submit">Angaben prüfen →</button>
    <div class="side-actions">` + button("choice", "Etwas für mich allein wählen") + button("support", UI_COPY.supportVoluntary) + `</div></form>`;
}

function renderPractice() {
  const node = nodeIndex[flow.selectedPractice];
  const extra = `<div class="choices">` + button("plan-practice", UI_COPY.plan, node.id, "button")
    + button("choice", "Eine andere Möglichkeit wählen") + button("reading-finish", UI_COPY.readingOnly) + `</div>`;
  return contentCard(node, extra, "Dein nächster Schritt");
}

function renderReport() {
  const action = nodeIndex[state.planned_action];
  const status = state.action_state === "planned" ? "für später vorgemerkt" : state.action_state;
  return `<section class="gate-card"><p class="eyebrow">Deine Auswahl</p><h2 id="view-title">` + esc(action.title) + `</h2>
    <p>Du hast diese Möglichkeit ` + esc(status) + `. Das ist noch keine Durchführung.</p><div class="choices">`
    + button("plan-later", UI_COPY.later, "", "button") + button("report-performed", UI_COPY.performed)
    + button("report-not-done", UI_COPY.notDone) + `</div></section>`;
}

function renderOutcome() {
  return `<form class="gate-card setup-grid" data-form="outcome"><p class="eyebrow">Rückblick</p><h2 id="view-title">Wie war es für dich?</h2>
    <p>Beziehe dich nur auf die Möglichkeit, die du gerade ausgewählt hast. Eine erfreuliche Antwort ist nicht vorausgesetzt.</p>
    ` + options("outcome", "Was hat sich für dich gezeigt?", Object.entries(outcomeLabels), "unknown", true)
    + `<p class="form-error" role="alert" hidden></p><button class="button" type="submit">Antwort übernehmen →</button></form>`;
}

function renderReflection() {
  const id = `R` + String(state.day * 2).padStart(2, "0");
  const node = nodeIndex[id];
  const extra = `<p class="notice">Deine Einschätzung: ` + esc(outcomeLabels[state.outcome]) + `.</p><div class="choices">`
    + button("reflection-next", "Diese Etappe abschließen →", "", "button") + `</div>`;
  return contentCard(node, extra, "Rückblick");
}

function renderClosing() {
  const id = `R` + String(state.day * 2 - 1).padStart(2, "0");
  const node = nodeIndex[id];
  const next = state.day < 14
    ? button("next-stage", "Zur nächsten Etappe →", "", "button")
    : `<p class="notice">Du hast den Rahmen von 14 Etappen erreicht. Du kannst jederzeit im Wissensregal weiterlesen oder hier enden.</p>`;
  const extra = `<div class="choices">` + next + button("home", "Zur Startseite") + button("end", UI_COPY.stop) + `</div>`;
  return contentCard(node, extra, "Abschluss");
}

function renderConcern() {
  const node = nodeIndex.K24;
  const extra = `<p class="notice">` + esc(UI_COPY.concernNote) + `</p><div class="choices">`
    + button("support-contacts", "Hilfeangebote ansehen →", "", "button")
    + button("revise-safety", UI_COPY.reviseSafety)
    + button("library", "In Ruhe etwas nachlesen")
    + button("end", UI_COPY.stop) + `</div><p class="small-note">Du brauchst hier nichts Persönliches einzugeben.</p>`;
  return contentCard(node, extra, "Orientierung und Unterstützung");
}

function renderGuided() {
  const renderers = {
    "stage-intro": renderStageIntro, context: renderContext, capacity: renderCapacity, safety: renderSafety,
    scene: renderScene, knowledge: renderKnowledge, choice: renderChoice, prerequisite: renderPrerequisite,
    "practice-gate": renderPracticeGate, practice: renderPractice, report: renderReport, outcome: renderOutcome,
    reflection: renderReflection, closing: renderClosing, concern: renderConcern
  };
  const renderer = renderers[flow.view] ?? renderStageIntro;
  return progress() + backRow() + `<div class="reader-grid"><div>` + renderer() + `</div>` + contextCard() + `</div>`;
}

function renderLibrary() {
  return backRow() + `<section><div class="section-heading"><p class="eyebrow">In Ruhe stöbern</p><h2 id="view-title">Wissensregal</h2>
    <p>Hier darfst du kreuz und quer lesen. Das verändert weder deine Angaben noch den Fortschritt deiner Etappe.</p></div>
    <div class="library-list">` + data.nodes.filter((node) => node.kind === "knowledge").map((node) => button("wiki", node.title + " →", node.id)).join("")
    + `</div><div class="choices">` + (view.returnToGuided ? button("return-guided", UI_COPY.returnToStage, "", "button") : "") + `</div></section>`;
}

function renderWiki() {
  const node = nodeIndex[view.id];
  const links = node.choices.filter((choice) => nodeIndex[choice.target]?.kind === "knowledge");
  const extra = `<div class="choices">` + links.map((choice) => button("wiki", choice.label + " →", choice.target)).join("")
    + button("library", "Zurück zum Wissensregal")
    + (view.returnToGuided ? button("return-guided", UI_COPY.returnToStage, "", "button") : "") + `</div>`;
  return backRow() + contentCard(node, extra, "Freies Lesen");
}

function renderSupport() {
  const node = nodeIndex.K24;
  const isConcern = state.safety === "concern";
  const extra = (isConcern ? `<p class="notice">` + esc(UI_COPY.concernNote) + `</p>`
    : `<p class="notice">Du hast diese Seite freiwillig geöffnet. Dadurch wird keine Sorge-Antwort gesetzt und kein Weg gesperrt.</p>`)
    + `<div class="choices">` + button("support-contacts", "Hilfeangebote ansehen →", "", "button")
    + (isConcern ? button("revise-safety", UI_COPY.reviseSafety) : "")
    + (view.returnToGuided ? button("return-guided", UI_COPY.returnToStage) : button("home", "Zur Startseite"))
    + button("end", UI_COPY.stop) + `</div>`;
  return backRow() + contentCard(node, extra, "Orientierung und Unterstützung");
}

function renderSafetyRevision() {
  return backRow() + `<form class="gate-card setup-grid" data-form="revise-safety"><p class="eyebrow">Antwort korrigieren</p>
    <h2 id="view-title">Was meintest du?</h2><p>Eine Änderung beginnt die Orientierung für diese Situation neu. Frühere Zustimmungen und geplante Versuche werden nicht übernommen.</p>
    <p>` + esc(UI_COPY.safetyExplanation) + `</p>` + safetyExamples()
    + options("safety", UI_COPY.safetyQuestion, Object.entries(UI_COPY.safetyAnswers), null, true)
    + `<p class="form-error" role="alert" hidden></p><button class="button" type="submit">Antwort neu übernehmen →</button></form>`;
}

function renderContacts() {
  const node = nodeIndex.O14;
  const contacts = `<div class="contact-list">` + SUPPORT_CONTACTS.map((contact) => `<article class="contact-card"><h3>` + esc(contact.label) + `</h3>
    <p>` + esc(contact.value) + `</p><div class="side-actions">`
    + (contact.href ? `<a class="button" href="` + esc(contact.href) + `">Anrufen</a>` : "")
    + (contact.url ? `<a class="quiet-button" href="` + esc(contact.url) + `" rel="noopener noreferrer" referrerpolicy="no-referrer">Offizielle Website öffnen</a>` : "")
    + `</div>` + (contact.note ? `<p class="small-note">` + esc(contact.note) + `</p>` : "") + `</article>`).join("") + `</div>
    <p class="small-note">Die Nummern gelten für Deutschland. Bei unmittelbarer Gefahr zählt schnelle Hilfe vor Ort.</p>`;
  return backRow() + contentCard(node, contacts, "Hilfe außerhalb dieser Website");
}

function renderStorageInfo() {
  const node = nodeIndex.O12;
  const extra = `<p class="notice">Speicherung ist aktuell ` + (saving ? "eingeschaltet" : "ausgeschaltet") + `.</p><div class="choices">`
    + button("toggle-storage", saving ? "Gespeicherte Auswahl löschen" : "Auswahl auf diesem Gerät speichern", "", "button")
    + button("home", "Zur Startseite") + `</div>`;
  return backRow() + contentCard(node, extra, "Speichern");
}

function renderEnded() {
  return `<section class="gate-card"><p class="eyebrow">Für heute beendet</p><h2 id="view-title">Bis hierhin war es genug.</h2>
    <p>Du kannst die Seite schließen oder später wiederkommen. ` + (saving ? "Deine freiwillig gespeicherte Auswahl bleibt auf diesem Gerät." : "Deine Auswahl wurde nicht gespeichert.") + `</p>
    <div class="choices">` + button("home", "Zur Startseite", "", "button") + button("leave", UI_COPY.leave) + `</div><p class="small-note">` + esc(UI_COPY.leaveNote) + `</p></section>`;
}

function render() {
  const renderers = {
    start: renderStart, guided: renderGuided, library: renderLibrary, wiki: renderWiki,
    support: renderSupport, "revise-safety": renderSafetyRevision, contacts: renderContacts,
    storage: renderStorageInfo, ended: renderEnded
  };
  const html = (renderers[view.name] ?? renderStart)();
  main.innerHTML = (notice ? `<p class="notice" role="status">` + esc(notice) + `</p>` : "") + html;
  notice = "";
  const title = main.querySelector("#view-title, #hero-title")?.textContent ?? data.title;
  document.title = title + " · " + data.title;
  main.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "auto" });
  announce(title);
}

function formError(form, message = UI_COPY.missingAnswer) {
  const error = form.querySelector(".form-error");
  if (!error) return;
  error.hidden = false;
  error.textContent = message;
  error.focus?.();
}

function submitContext(form) {
  const values = new FormData(form);
  const next = { goal: values.get("goal"), topic: values.get("topic"), perspective: values.get("perspective") };
  if (!data.contract.enum_fields.goal.includes(next.goal) || !data.contract.enum_fields.topic.includes(next.topic)
    || !data.contract.enum_fields.perspective.includes(next.perspective)) return formError(form);
  const changed = Object.entries(next).some(([key, value]) => state[key] !== value);
  if (changed) state = applyEvent(state, { type: "change_context", values: next }, data.contract, rules);
  selectedScene = null;
  flow = resetFlowForContext(flow);
  syncStorage();
  guided("capacity", 1, false);
}

function submitCapacity(form) {
  const values = new FormData(form);
  try {
    state = applyEvent(state, { type: "set_capacity", value: values.get("capacity") }, data.contract, rules);
    state = applyEvent(state, { type: "report_resources", value: values.get("resources") }, data.contract, rules);
  } catch { return formError(form); }
  guided("safety", 1);
}

function safetyValue(form) {
  return new FormData(form).get("safety");
}

function submitSafety(form) {
  const value = safetyValue(form);
  if (value === "examples") {
    safetyExamplesOpen = true;
    notice = "Die Beispiele sind jetzt aufgeklappt. Deine Antwort bleibt offen.";
    return render();
  }
  try { state = applyEvent(state, { type: "report_safety", value }, data.contract, rules); }
  catch { return formError(form); }
  if (value === "concern") return guided("concern", 1);
  if (state.goal === "support") return navigate({ name: "support", returnToGuided: true });
  selectPreferredScene();
  guided("scene", 2);
}

function selectPreferredScene() {
  selectedScene = preferredSceneId(state);
  const scene = nodeIndex[selectedScene];
  if (!scene) throw new Error("Missing planned scene");
  flow = markSceneSeen(flow, scene.family_id);
}

function openPrimaryKnowledge() {
  const id = primaryKnowledgeId(state);
  flow = markKnowledgeVisited(flow, id);
  guided("knowledge", 3);
}

function selectPractice(id) {
  const node = nodeIndex[id];
  if (!node || node.kind !== "practice" || !node.topic_ids.includes(state.topic)) return;
  flow = { ...flow, pendingPractice: id };
  const prerequisite = prerequisiteFor(id);
  if (prerequisite && !flow.visitedKnowledge.includes(prerequisite)) {
    flow = markKnowledgeVisited(flow, prerequisite);
    return guided("prerequisite", 4);
  }
  if (routeStatus(node, state, "flow", rules) === "allowed") {
    flow = { ...flow, selectedPractice: id, pendingPractice: null };
    return guided("practice", 4);
  }
  guided("practice-gate", 4);
}

function submitPracticeGate(form) {
  const target = nodeIndex[form.dataset.target];
  const values = new FormData(form);
  const safety = values.get("safety");
  if (safety === "examples") {
    safetyExamplesOpen = true;
    notice = "Die Beispiele sind jetzt aufgeklappt. Deine Antwort bleibt offen.";
    return render();
  }
  const interaction = {
    safety,
    partner_willing: values.get("partner_willing"),
    can_decline: values.get("can_decline"),
    mutual_agreement: target.gate === "agreement" ? values.get("mutual_agreement") : "unknown"
  };
  try {
    state = applyEvent(state, { type: "confirm_interaction", values: interaction }, data.contract, rules);
    state = applyEvent(state, { type: "report_resources", value: values.get("resources") }, data.contract, rules);
  } catch { return formError(form); }
  if (state.safety === "concern") return guided("concern", 4);
  if (canEnter(target, state, "flow", rules)) {
    flow = { ...flow, selectedPractice: target.id, pendingPractice: null };
    return guided("practice", 4);
  }
  formError(form, "Für diesen gemeinsamen Schritt fehlt gerade eine Voraussetzung. Du kannst etwas für dich allein wählen.");
}

function submitOutcome(form) {
  const value = new FormData(form).get("outcome");
  try {
    state = applyEvent(state, { type: "report_action", action_id: state.planned_action, status: "performed", outcome: value }, data.contract, rules);
  } catch { return formError(form); }
  guided("reflection", 5);
}

function submitSafetyRevision(form) {
  const value = safetyValue(form);
  if (value === "examples") {
    safetyExamplesOpen = true;
    notice = "Die Beispiele sind jetzt aufgeklappt. Deine Antwort bleibt offen.";
    return render();
  }
  try { state = applyEvent(state, { type: "revise_safety_answer", value }, data.contract, rules); }
  catch { return formError(form); }
  flow = resetFlowForContext(flow);
  selectedScene = null;
  historyStack = [];
  syncStorage();
  if (value === "concern") {
    flow = moveFlow(flow, 1, "concern");
  } else {
    flow = moveFlow(flow, 1, "capacity");
  }
  view = { name: "guided" };
  notice = "Deine Antwort wurde neu übernommen. Die Orientierung beginnt für diese Situation noch einmal.";
  render();
}

function toggleStorage() {
  const next = !saving;
  if (!saveSelection(storage, state, data.contract, next)) {
    notice = next ? UI_COPY.storageError : "Die gespeicherte Auswahl konnte nicht gelöscht werden. Bitte nutze dafür die Website-Daten deines Browsers.";
    return render();
  }
  saving = next;
  syncStorage(false);
  notice = saving
    ? "Etappe, Thema, Perspektive und Ziel werden auf diesem Gerät gespeichert. Sorge, Zustimmungen und Versuche bleiben ungespeichert."
    : "Gespeicherte Auswahl wurde gelöscht.";
  render();
}

function handle(action, value) {
  if (action === "back") return goBack();
  if (action === "home") { historyStack = []; view = { name: "start" }; return render(); }
  if (action === "start-stage") { historyStack = []; flow = resetFlowForNextStage(flow); view = { name: "guided" }; return render(); }
  if (action === "topic-start" && topicIndex[value]) {
    state = applyEvent(state, { type: "change_context", values: { topic: value } }, data.contract, rules);
    selectedScene = null; flow = resetFlowForContext(flow); historyStack = []; syncStorage();
    view = { name: "guided" }; return render();
  }
  if (action === "change-context") return guided("context", 1);
  if (action === "same-context") return guided("capacity", 1);
  if (action === "scene-pick" && nodeIndex[value]?.kind === "scene") {
    selectedScene = value; flow = markSceneSeen(flow, nodeIndex[value].family_id); return render();
  }
  if (action === "scene-next") return openPrimaryKnowledge();
  if (action === "knowledge-next" || action === "choice") return guided("choice", 4);
  if (action === "practice-select") return selectPractice(value);
  if (action === "prerequisite-next") return selectPractice(value);
  if (action === "plan-practice" && value === flow.selectedPractice) {
    try { state = applyEvent(state, { type: "plan_action", action_id: value }, data.contract, rules); }
    catch { notice = UI_COPY.noSuggestion; return guided("choice", 4); }
    return guided("report", 4);
  }
  if (action === "plan-later") return guided("closing", 6);
  if (action === "report-performed") return guided("outcome", 5);
  if (action === "report-not-done") {
    try { state = applyEvent(state, { type: "report_action", action_id: state.planned_action, status: "not_done", outcome: "unknown" }, data.contract, rules); }
    catch { notice = UI_COPY.noSuggestion; }
    notice = UI_COPY.notDoneNote;
    return guided("closing", 6);
  }
  if (action === "reflection-next" || action === "reading-finish" || action === "finish-early") return guided("closing", 6);
  if (action === "next-stage") {
    try { state = applyEvent(state, { type: "next_day" }, data.contract, rules); }
    catch { return; }
    flow = resetFlowForNextStage(flow); selectedScene = null; historyStack = []; syncStorage();
    view = { name: "guided" }; return render();
  }
  if (action === "library") return navigate({ name: "library", returnToGuided: view.name === "guided" || view.returnToGuided });
  if (action === "wiki" && nodeIndex[value]?.kind === "knowledge") return navigate({ name: "wiki", id: value, returnToGuided: view.returnToGuided });
  if (action === "return-guided") { view = { name: "guided" }; return render(); }
  if (action === "support") return navigate({ name: "support", returnToGuided: view.name === "guided" || view.returnToGuided });
  if (action === "support-contacts") return navigate({ name: "contacts", returnToGuided: view.returnToGuided });
  if (action === "revise-safety") return navigate({ name: "revise-safety" });
  if (action === "storage") return navigate({ name: "storage" });
  if (action === "toggle-storage") return toggleStorage();
  if (action === "end") return navigate({ name: "ended" });
  if (action === "leave") return window.location.replace("about:blank");
}

main.addEventListener("submit", (event) => {
  const form = event.target;
  if (!form.matches("form[data-form]")) return;
  event.preventDefault();
  const handlers = {
    context: submitContext, capacity: submitCapacity, safety: submitSafety,
    "practice-gate": submitPracticeGate, outcome: submitOutcome, "revise-safety": submitSafetyRevision
  };
  handlers[form.dataset.form]?.(form);
});

main.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (target && !target.disabled) handle(target.dataset.action, target.dataset.value);
});

document.querySelector(".brand").addEventListener("click", (event) => { event.preventDefault(); handle("home"); });
document.querySelector("#knowledge-button").addEventListener("click", () => handle("library"));
document.querySelector("#support-button").addEventListener("click", () => handle("support"));
document.querySelector("#storage-info-button").addEventListener("click", () => handle("storage"));
saveButton.addEventListener("click", toggleStorage);

syncStorage(false);
render();

