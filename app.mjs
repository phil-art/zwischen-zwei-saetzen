import { APP_DATA as data } from "./data.mjs";
import { applyEvent, canEnter, diagramText, routeStatus, transitionChoice, visibleChoices } from "./runtime.mjs";
import { loadSelection, saveSelection } from "./storage.mjs";

const nodeIndex = Object.fromEntries(data.nodes.map((node) => [node.id, node]));
const topicIndex = Object.fromEntries(data.topics.map((topic) => [topic.id, topic]));
const rules = data.rule_nodes;
const available = new Set(Object.keys(nodeIndex));
const main = document.querySelector("#main");
const announcer = document.querySelector("#announcer");
const saveButton = document.querySelector("#save-button");
let storage;
try { storage = window.localStorage; } catch { storage = null; }
const restored = loadSelection(storage, data.contract, data.available_days);
let state = restored.state;
let saving = restored.enabled;
let notice = restored.notice;
let view = { name: "start" };
let historyStack = [];
let pendingEntry = null;

const esc = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
}[character]));
const labels = { A: "Auf etwas reagieren", B: "Selbst etwas ausgelöst haben", C: "Noch unklar einordnen" };
const kindNames = { scene: "Szene", knowledge: "Wissenskarte", practice: "Möglichkeit", closing: "Abschluss", day_intro: "Etappe", orientation: "Orientierung", reflection: "Rückschau" };
const goalLabels = { clarify: "Etwas sortieren", pause: "Eine Pause betrachten", private: "Privat nachdenken", boundary: "Eine Grenze klären", distance: "Abstand betrachten", undecided: "Noch offenlassen", support: "Unterstützung ansehen" };
const outcomeLabels = { helpful: "Eher hilfreich", unchanged: "Unverändert", worse: "Eher schwieriger", mixed: "Gemischt", unknown: "Noch unklar" };
const orientationForms = new Set(["O01", "O02", "O03", "O04", "O05"]);
const stageId = () => `D${String(state.day).padStart(2, "0")}`;

function button(action, label, value = "", style = "quiet-button") {
  return `<button type="button" class="${style}" data-action="${action}" data-value="${esc(value)}">${esc(label)}</button>`;
}

function announce(message) {
  announcer.textContent = "";
  requestAnimationFrame(() => { announcer.textContent = message; });
}

function syncStorage(write = true) {
  if (saving && write && !saveSelection(storage, state, data.contract, true)) {
    saving = false;
    notice = "Speichern ist auf diesem Gerät gerade nicht möglich. Du kannst ohne Speicherung weiterlesen.";
    announce(notice);
  }
  saveButton.textContent = saving ? "Gespeicherte Auswahl löschen" : "Auswahl auf diesem Gerät speichern";
}

function navigate(next, remember = true) {
  if (remember) historyStack.push({ ...view });
  view = { ...next };
  render();
}

function goBack() {
  view = historyStack.pop() ?? { name: "start" };
  render(); // Every return rechecks current permissions; old state is never restored.
}

function stageTrack() {
  return `<div class="stage-track" aria-hidden="true">${Array.from({ length: data.stage_count }, (_, index) => `<span class="${index + 1 === state.day ? "active" : ""}"></span>`).join("")}</div>`;
}

function backRow() {
  return `<div class="back-row">${button("back", "← Zurück", "", "text-button")}</div>`;
}

function options(name, legend, values, selected = null, required = false) {
  return `<fieldset><legend>${esc(legend)}</legend><div class="option-row">${values.map(([value, label]) => `<label><input name="${name}" type="radio" value="${value}" ${value === selected ? "checked" : ""} ${required ? "required" : ""}><span>${esc(label)}</span></label>`).join("")}</div></fieldset>`;
}

function renderStart() {
  const groupNames = ["Nachrichten, Tonfall und Aufgaben", "Zeit, Nähe und Streit", "Zuneigung, Geld und Fürsorge", "Privatheit, Wandel und Entscheidungen"];
  return `<section class="hero" aria-labelledby="hero-title">
    <div><p class="eyebrow">Ein literarischer Klickpfad</p><h1 id="hero-title">Zwischen zwei Sätzen</h1>
      <p class="lede">Kurze Szenen und Gedankenwege über Beziehungsmissverständnisse. Du wählst durch Klicks, was du lesen möchtest, und musst keine persönliche Geschichte eingeben.</p>
      <div class="side-actions">${button("stage", `Etappe ${state.day} öffnen →`, "", "button")}${button("open", "Von vorn beginnen", "O10", "text-button")}</div></div>
    <aside class="hero-note"><strong>Etappe ${state.day} von 14 · Prototyp</strong><p>${esc(data.prototype_notice)}</p>${stageTrack()}</aside>
  </section>
  <section class="topic-section" aria-labelledby="topic-title">
    <div class="section-heading"><p class="eyebrow">Wähle einen Einstieg</p><h2 id="topic-title">Was kommt deiner Situation am nächsten?</h2>
      <p>Die Auswahl ist keine Einordnung deiner Beziehung. Du kannst sie jederzeit wechseln.</p></div>
    ${groupNames.map((name, index) => `<details class="topic-group" ${index === 0 ? "open" : ""}><summary>${name}</summary><div class="topic-grid">${data.topics.filter((topic) => topic.group === index + 1).map((topic) => `<article class="topic-card"><div><h3>${esc(topic.title)}</h3><p>${topic.scene_ids.length ? "Mit literarischen Szenen" : "Wissenseinstieg; Szenen folgen"}</p></div>${button("topic", "Diesen Einstieg wählen →", topic.id, "button")}</article>`).join("")}</div></details>`).join("")}
  </section>`;
}

function contextCard(mode) {
  const close = data.nodes.find((node) => node.kind === "closing" && node.day === state.day);
  return `<aside class="side-column" aria-label="${mode === "wiki" ? "Privater Lesemodus" : "Aktueller Weg"}">
    <div class="side-card"><p class="kind-label">${mode === "wiki" ? "Privater Lesemodus" : "Dein aktueller Weg"}</p>
      <dl class="context-list"><dt>Etappe</dt><dd>${state.day} von ${data.stage_count}</dd><dt>Thema</dt><dd>${esc(topicIndex[state.topic].title)}</dd><dt>Ziel</dt><dd>${esc(goalLabels[state.goal])}</dd></dl>${stageTrack()}
      ${mode === "wiki" ? "<p>Lesen verändert weder deinen Pfad noch Angaben zu einer Handlung.</p>" : ""}
      <div class="side-actions">${button(state.safety === "concern" ? "home" : "open", "Das passt nicht · Situation wechseln", "O09")}${close ? button("finish", "Für heute abschließen", "O08") : ""}${state.planned_action && state.safety !== "concern" && mode !== "wiki" ? button("open", "Zum eigenen Versuch", "O07") : ""}</div>
    </div><div class="side-card"><strong>Du bestimmst das Tempo.</strong><p>Nicht-Handeln, Zurückgehen und Aufhören sind gültige Entscheidungen.</p></div>
  </aside>`;
}

function renderDiagram(diagram) {
  const output = diagramText(diagram);
  if (!output) return "";
  const labelsById = Object.fromEntries(diagram.nodes.map((node) => [node.id, node.label]));
  return `<figure class="diagram"><figcaption><strong>Gedankenweg</strong></figcaption>
    <ol aria-hidden="true">${diagram.edges.map((edge) => `<li><span>${esc(labelsById[edge.from])}</span><span class="arrow">${esc(edge.label)} →</span><span>${esc(labelsById[edge.to])}</span></li>`).join("")}</ol>
    <p class="diagram-alternative">${esc(output.alternative)}</p></figure>`;
}

function renderNode() {
  const node = nodeIndex[view.id];
  const mode = view.mode ?? "flow";
  const choices = visibleChoices(node, state, mode, data.contract, rules, available);
  const offset = view.offset ?? 0;
  const pageSize = pendingEntry && node.id === "K21" && mode === "flow" ? 3 : 4;
  const page = choices.slice(offset, offset + pageSize);
  return `${backRow()}<div class="reader-grid"><article class="content-card" aria-labelledby="view-title">
    <div class="content-topline"><span class="kind-label">${kindNames[node.kind] ?? node.kind}</span><span>${mode === "wiki" ? "Privat lesen" : "Persönlicher Pfad"}</span></div>
    <div class="content-body"><h2 id="view-title">${esc(node.title)}</h2><p>${esc(node.body)}</p>${renderDiagram(node.diagram)}
      ${orientationForms.has(node.id) ? renderOrientation(node) : ""}
      ${node.id === "O07" ? renderReport() : ""}
      ${node.kind === "reflection" ? `<p class="notice">Dein berichteter Versuch: ${esc(nodeIndex[state.planned_action]?.title ?? "")} · ${esc(outcomeLabels[state.outcome])}.</p>` : ""}
      ${node.id === "O12" ? `<p class="notice">Speicherung ist aktuell ${saving ? "eingeschaltet" : "ausgeschaltet"}. Die Schaltfläche am Seitenende ändert diese Einstellung.</p>` : ""}
      ${node.id === "O06" ? `<p class="small-note">${esc(topicIndex[state.topic].title)} · ${esc(labels[state.perspective])}</p>` : ""}
      ${pendingEntry && node.id === "K21" && mode === "flow" ? `<p class="notice">Du hast knappe Mittel angegeben. Von hier kannst du zur Szenenauswahl weitergehen.</p>${button("pending-entry", "Zur Szenenauswahl →", pendingEntry, "button")}` : ""}
      ${page.length && !orientationForms.has(node.id) ? `<div class="choices" aria-label="Mögliche Wege">${page.map((choice) => `<button class="choice-button" type="button" data-action="choice" data-value="${choice.id}" ${choice.status === "missing" ? "disabled" : ""}><span>${esc(choice.label)}</span>${choice.status === "missing" ? '<span class="badge">im Ausbau</span>' : `<span aria-hidden="true">${choice.status === "confirmation" ? "Voraussetzungen prüfen →" : "→"}</span>`}</button>`).join("")}</div>` : ""}
      ${choices.length > pageSize ? `<div class="pagination">${button("more", offset + pageSize < choices.length ? "Weitere Verknüpfungen" : "Erste Verknüpfungen")}</div>` : ""}
      ${mode === "wiki" && canEnter(node, state, "flow", rules) ? `<div class="mode-switch">${button("use-in-flow", "Diesen Baustein im persönlichen Pfad verwenden", node.id)}<p>Erst im persönlichen Pfad werden passende Praxisoptionen angeboten und ihre Voraussetzungen geprüft.</p></div>` : ""}
      ${node.kind === "closing" ? `<div class="side-actions">${button("home", "Zur Startseite")}</div>` : ""}
      ${node.id === "K24" ? `<div class="side-actions">${state.safety !== "concern" ? button("concern", "Ich habe Sorge vor Reaktionen oder Kontrolle") : '<p class="notice">Gesprächs- und Praxisvorschläge bleiben für diese Situation geschlossen.</p>'}${button("leave", "Diese Seite verlassen")}</div><p class="small-note">Verlassen löscht keinen Browser-Verlauf.</p>` : ""}
    </div></article>${contextCard(mode)}</div>`;
}

function renderLibrary() {
  return `${backRow()}<section><div class="section-heading"><p class="eyebrow">Privater Lesemodus</p><h2 id="view-title">Wissensregal</h2><p>${esc(nodeIndex.O11.body)}</p></div>
    <div class="library-list">${data.nodes.filter((node) => node.kind === "knowledge").map((node) => button("wiki", `${node.title} →`, node.id)).join("")}</div></section>`;
}

function renderGate() {
  const target = nodeIndex[view.target];
  const yesNo = [["yes", "Ja"], ["no", "Nein"], ["unknown", "Unklar"]];
  return `${backRow()}<form class="gate-card" data-form="gate">
    <p class="eyebrow">${esc(target.title)}</p><h2 id="view-title">Passt das gerade?</h2>
    <p>Du kannst hier aufhören oder privat weiterlesen. Die Angaben bleiben nur für diese Sitzung bestehen; Klickfragen können keine Sicherheit feststellen.</p>
    ${options("safety", "Machen dir Kontrolle, Drohung oder eine beängstigende Reaktion Sorge?", [["concern", "Ja"], ["no_concern_reported", "Nein"], ["unknown", "Unklar"]], null, true)}
    ${options("partner_willing", "Möchte die andere Person freiwillig mitwirken?", yesNo, null, true)}
    ${options("can_decline", "Kann sie ohne Druck Nein oder Später sagen?", yesNo, null, true)}
    ${options("resources", "Sind Zeit, Energie und nötige Mittel ausreichend?", [["sufficient", "Ja"], ["limited", "Nein"], ["unknown", "Unklar"]], null, true)}
    ${target.gate === "agreement" ? options("mutual_agreement", "Liegt für die konkrete Vereinbarung bereits eine freiwillige Zustimmung von euch beiden vor?", yesNo, null, true) : ""}
    <p class="form-error" role="alert" hidden></p><button class="button" type="submit">Angaben prüfen →</button>
    <div class="side-actions">${button("private-reading", "Privat weiterlesen")}${button("support", "Grenzen des Angebots und Unterstützung")}</div>
  </form>`;
}

function render() {
  if (view.name === "node" && view.id === "O11") view = { name: "library" };
  if (view.name === "node") {
    const status = routeStatus(nodeIndex[view.id], state, view.mode ?? "flow", rules);
    if (status === "confirmation") view = { name: "gate", target: view.id };
    else if (status !== "allowed") {
      notice = "Dieser Inhalt passt nicht zu den aktuellen Angaben. Du kannst einen anderen Einstieg wählen.";
      view = state.safety === "concern" ? { name: "node", id: "K24", mode: "flow" } : { name: "start" };
    }
  }
  if (view.name === "gate" && routeStatus(nodeIndex[view.target], state, "flow", rules) === "blocked") {
    view = state.safety === "concern" ? { name: "node", id: "K24", mode: "flow" } : { name: "start" };
  }
  const html = { start: renderStart, node: renderNode, library: renderLibrary, gate: renderGate, ended: renderEnded }[view.name]();
  main.innerHTML = `${notice ? `<p class="notice" role="status">${esc(notice)}</p>` : ""}${html}`;
  notice = "";
  const title = main.querySelector("#view-title, #hero-title")?.textContent ?? data.title;
  document.title = `${title} · ${data.title}`;
  main.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "auto" });
  announce(title);
}

function formError(message) {
  const error = main.querySelector(".form-error");
  error.hidden = false;
  error.textContent = message;
}

function renderOrientation(node) {
  let fields = "";
  if (node.id === "O01") fields = options("goal", "Was möchtest du gerade ansehen?", Object.entries(goalLabels), state.goal);
  if (node.id === "O02") fields = `<label class="select-label">Thema<select name="topic">${data.topics.map((topic) => `<option value="${topic.id}" ${topic.id === state.topic ? "selected" : ""}>${esc(topic.title)}</option>`).join("")}</select></label>${options("perspective", "Aus welcher Perspektive möchtest du lesen?", Object.entries(labels), state.perspective)}`;
  if (node.id === "O03") fields = options("capacity", "Wie viel Raum ist gerade da?", [["low", "Nur kurz"], ["enough", "Etwas mehr"], ["unknown", "Noch offen"]], state.capacity);
  if (node.id === "O04") fields = options("safety", "Machen dir Kontrolle, Drohung oder Reaktionen Sorge?", [["unknown", "Offenlassen / unklar"], ["no_concern_reported", "Ich gebe keine Sorge an"], ["concern", "Ja, ich habe Sorge"]], state.safety);
  if (node.id === "O05") fields = options("resources", "Sind die nötigen Mittel gerade ausreichend?", [["sufficient", "Eher ausreichend"], ["limited", "Eher knapp"], ["unknown", "Noch unklar"]], state.resources);
  return `<form class="orientation-form" data-form="orientation" data-node="${node.id}">${fields}<p class="form-error" role="alert" hidden></p><button type="submit" class="button">${esc(node.id === "O05" ? "Mit dieser Angabe weiter →" : node.choices[0].label + " →")}</button></form>`;
}

function renderReport() {
  const action = nodeIndex[state.planned_action];
  if (!action) return '<p class="notice">Für diese Etappe ist noch kein eigener Versuch geplant. Du kannst ohne Bericht abschließen.</p>';
  const status = { planned: "geplant", performed: "als durchgeführt angegeben", not_done: "als nicht durchgeführt angegeben" }[state.action_state];
  const summary = `<p class="notice">Dein eigener Versuch: ${esc(action.title)} · ${status}.</p>`;
  if (!["planned", "performed"].includes(state.action_state)) return summary;
  return `${summary}<form class="orientation-form" data-form="report" data-action-id="${esc(action.id)}">
    ${options("action_status", "Hast du genau diesen eigenen Versuch durchgeführt?", [["performed", "Ja, durchgeführt"], ["not_done", "Nein, nicht durchgeführt"]], null, true)}
    ${options("outcome", "Wie schätzt du das Ergebnis ein, falls du ihn durchgeführt hast?", Object.entries(outcomeLabels), "unknown")}
    <p>Eine Durchführung ist nicht voreingestellt. Du kannst stattdessen ohne Bericht abschließen.</p><p class="form-error" role="alert" hidden></p><button class="button" type="submit">Angabe übernehmen →</button></form>`;
}

function renderEnded() {
  return `<section class="gate-card"><p class="eyebrow">Abgeschlossen</p><h2 id="view-title">Für jetzt ist Schluss.</h2><p>Du kannst die Seite schließen. ${saving ? "Deine freiwillig gespeicherte Auswahl bleibt auf diesem Gerät; du kannst sie am Seitenende löschen." : "Die Auswahl wird nicht gespeichert."}</p><div class="side-actions">${button("home", "Zur Startseite")}${button("leave", "Diese Seite verlassen")}</div></section>`;
}

function followChoice(choiceId) {
  if (view.name !== "node") return;
  const mode = view.mode ?? "flow";
  if (routeStatus(nodeIndex[view.id], state, mode, rules) !== "allowed") return render();
  const choice = visibleChoices(nodeIndex[view.id], state, mode, data.contract, rules, available).find((item) => item.id === choiceId);
  if (choice?.status === "confirmation") return navigate({ name: "gate", target: choice.target });
  if (choice?.status !== "allowed") return;
  state = transitionChoice(choice, state, mode, data.contract, rules, available);
  if (["next_day", "restart", "exit"].includes(choice.event.type)) { pendingEntry = null; historyStack = []; }
  syncStorage();
  return navigate(choice.target === "EXIT" ? { name: "ended" } : { name: "node", id: choice.target, mode }, !["next_day", "restart", "exit"].includes(choice.event.type));
}

function submitOrientation(form) {
  const id = form.dataset.node;
  if (view.name !== "node" || view.id !== id || !orientationForms.has(id) || !canEnter(nodeIndex[id], state, "flow", rules)) return render();
  const values = new FormData(form);
  try {
    if (id === "O01" && values.get("goal") !== state.goal) state = applyEvent(state, { type: "change_context", values: { goal: values.get("goal") } }, data.contract, rules);
    if (id === "O02") {
      state = applyEvent(state, { type: "change_context", values: { topic: values.get("topic"), perspective: values.get("perspective") } }, data.contract, rules);
      pendingEntry = null;
    }
    if (id === "O03") state = applyEvent(state, { type: "set_capacity", value: values.get("capacity") }, data.contract, rules);
    if (id === "O04") state = applyEvent(state, { type: "confirm_interaction", values: { safety: values.get("safety"), partner_willing: "unknown", can_decline: "unknown", mutual_agreement: "unknown" } }, data.contract, rules);
    if (id === "O05") state = applyEvent(state, { type: "report_resources", value: values.get("resources") }, data.contract, rules);
  } catch { return formError("Bitte prüfe die Auswahl. Offenlassen ist möglich."); }
  if (state.safety === "concern") return navigate({ name: "node", id: "K24", mode: "flow" });
  const node = nodeIndex[id];
  if (id === "O05" && state.resources === "limited") { pendingEntry = "O06"; return followChoice(node.choices.find((c) => c.target === "K21").id); }
  return followChoice(node.choices[0].id);
}

function submitReport(form) {
  if (view.name !== "node" || view.id !== "O07" || form.dataset.actionId !== state.planned_action || !canEnter(nodeIndex.O07, state, "flow", rules)) return render();
  const values = new FormData(form);
  const status = values.get("action_status");
  try {
    state = applyEvent(state, { type: "report_action", action_id: form.dataset.actionId, status, outcome: status === "not_done" ? "unknown" : values.get("outcome") }, data.contract, rules);
  } catch { return formError("Bitte gib ausdrücklich an, ob du diesen Versuch durchgeführt hast, oder schließe ohne Bericht ab."); }
  notice = "Deine Angabe gilt für diese Sitzung. Sie wird nicht gespeichert.";
  render();
}

function submitGate(form) {
  const target = nodeIndex[view.target];
  if (routeStatus(target, state, "flow", rules) === "blocked") return navigate({ name: "node", id: "K24", mode: "flow" });
  const values = new FormData(form);
  const interaction = Object.fromEntries(["safety", "partner_willing", "can_decline"].map((key) => [key, values.get(key)]));
  interaction.mutual_agreement = target.gate === "agreement" ? values.get("mutual_agreement") : "unknown";
  if (Object.entries(interaction).some(([key, value]) => !data.contract.enum_fields[key].includes(value)) || !data.contract.enum_fields.resources.includes(values.get("resources"))) return formError("Bitte beantworte jede Frage. „Unklar“ ist möglich.");
  state = applyEvent(state, { type: "confirm_interaction", values: interaction }, data.contract, rules);
  state = applyEvent(state, { type: "report_resources", value: values.get("resources") }, data.contract, rules);
  if (state.safety === "concern") return navigate({ name: "node", id: "K24", mode: "flow" });
  if (canEnter(target, state, "flow", rules)) return navigate({ name: "node", id: target.id, mode: "flow" });
  formError("Diese Möglichkeit bleibt geschlossen. Du kannst privat weiterlesen oder aufhören.");
}

main.addEventListener("submit", (event) => {
  const form = event.target;
  if (!form.matches("form[data-form]")) return;
  event.preventDefault();
  if (form.dataset.form === "gate") submitGate(form);
  if (form.dataset.form === "orientation") submitOrientation(form);
  if (form.dataset.form === "report") submitReport(form);
});

main.addEventListener("change", (event) => {
  if ((view.name === "gate" || (view.name === "node" && view.id === "O04")) && event.target.name === "safety" && event.target.value === "concern") {
    state = applyEvent(state, { type: "report_concern" }, data.contract, rules);
    pendingEntry = null;
    return navigate({ name: "node", id: "K24", mode: "flow" });
  }
  if (event.target.name === "action_status") {
    const form = event.target.closest("form");
    const notDone = event.target.value === "not_done";
    form.querySelectorAll('input[name="outcome"]').forEach((input) => { input.disabled = notDone; if (notDone) input.checked = input.value === "unknown"; });
  }
});

function handle(action, value) {
  if (action === "back") return goBack();
  if (action === "home") return navigate({ name: "start" });
  if (action === "stage") return navigate({ name: "node", id: stageId(), mode: "flow" });
  if (action === "open" && ["O07", "O09", "O10", "O12"].includes(value)) return navigate({ name: "node", id: value, mode: "flow" });
  if (action === "library") return navigate({ name: "library" });
  if (action === "wiki") return navigate({ name: "node", id: value, mode: "wiki" });
  if (action === "support") return navigate({ name: "node", id: "K24", mode: "flow" });
  if (action === "leave") return window.location.replace("about:blank");
  if (action === "finish") return navigate({ name: "node", id: value, mode: "flow" });
  if (action === "concern") {
    state = applyEvent(state, { type: "report_concern" }, data.contract, rules);
    pendingEntry = null;
    return navigate({ name: "node", id: "K24", mode: "flow" });
  }
  if (action === "topic" && topicIndex[value]) {
    state = applyEvent(state, { type: "change_context", values: { topic: value } }, data.contract, rules);
    pendingEntry = null;
    historyStack = [];
    syncStorage();
    return navigate({ name: "node", id: stageId(), mode: "flow" });
  }
  if (action === "private-reading") {
    const origin = [...historyStack].reverse().find((item) => item.name === "node" && nodeIndex[item.id]?.kind === "knowledge");
    return navigate(origin ? { name: "node", id: origin.id, mode: "wiki" } : { name: "library" });
  }
  if (action === "use-in-flow" && view.name === "node" && nodeIndex[value]?.kind === "knowledge") return navigate({ name: "node", id: value, mode: "flow" });
  if (action === "pending-entry" && value === pendingEntry) {
    if (routeStatus(nodeIndex[value], state, "flow", rules) !== "allowed") return render();
    if (nodeIndex[value].kind === "scene") state = applyEvent(state, { type: "enter_scene", scene_id: value }, data.contract, rules);
    pendingEntry = null;
    return navigate({ name: "node", id: value, mode: "flow" });
  }
  if (action === "more" && view.name === "node") {
    const count = visibleChoices(nodeIndex[view.id], state, view.mode ?? "flow", data.contract, rules, available).length;
    const step = pendingEntry && view.id === "K21" && (view.mode ?? "flow") === "flow" ? 3 : 4;
    view.offset = (view.offset ?? 0) + step < count ? (view.offset ?? 0) + step : 0;
    return render();
  }
  if (action === "choice" && view.name === "node") {
    return followChoice(value);
  }
}

main.addEventListener("click", (event) => {
  const target = event.target.closest("button[data-action]");
  if (target && !target.disabled) handle(target.dataset.action, target.dataset.value);
});
document.querySelector(".brand").addEventListener("click", (event) => { event.preventDefault(); handle("home"); });
document.querySelector("#knowledge-button").addEventListener("click", () => handle("library"));
document.querySelector("#support-button").addEventListener("click", () => handle("support"));
document.querySelector("#storage-info-button").addEventListener("click", () => handle("open", "O12"));
saveButton.addEventListener("click", () => {
  const next = !saving;
  if (!saveSelection(storage, state, data.contract, next)) {
    notice = next ? "Die Auswahl konnte nicht gespeichert werden. Du kannst ohne Speicherung weiterlesen." : "Die gespeicherte Auswahl konnte nicht gelöscht werden. Bitte nutze dafür die Website-Daten deines Browsers.";
    return render();
  }
  saving = next;
  syncStorage(false);
  notice = saving ? "Etappe, Thema, Perspektive und Ziel werden auf diesem Gerät gespeichert. Angaben zu Mitwirkung, Sorge oder Handlungen bleiben ungespeichert." : "Gespeicherte Auswahl wurde gelöscht.";
  render();
});

syncStorage(false);
render();
