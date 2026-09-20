import test from "node:test";
import assert from "node:assert/strict";
import { setupApp } from "./dom-helper.mjs";

const action = (name, value) => `[data-action="${name}"]${value ? `[data-value="${value}"]` : ""}`;
const heading = () => document.querySelector("#view-title")?.textContent;
const progress = () => document.querySelector('[role="progressbar"]')?.getAttribute("aria-valuenow");

async function begin(tag, { goal, resources = "sufficient", safety = "no_concern_reported", capacity = "enough", topic = "T01" } = {}) {
  const ui = await setupApp(tag, { day: 1, topic, perspective: "A", goal: goal ?? "clarify" });
  ui.click(action("start-stage"));
  ui.click(action("change-context"));
  if (goal) ui.choose("goal", goal);
  ui.submit('form[data-form="context"]');
  ui.choose("capacity", capacity);
  ui.choose("resources", resources);
  ui.submit('form[data-form="capacity"]');
  ui.choose("safety", safety);
  ui.submit('form[data-form="safety"]');
  return ui;
}

function toChoice(ui) {
  ui.click(action("scene-next"));
  ui.click(action("knowledge-next"));
}

function openPractice(ui, id) {
  ui.click(action("practice-select", id));
  if (document.querySelector(action("prerequisite-next"))) ui.click(action("prerequisite-next"));
}

function approveGate(ui, safety = "no_concern_reported") {
  ui.choose("safety", safety);
  ui.choose("partner_willing", "yes");
  ui.choose("can_decline", "yes");
  ui.choose("resources", "sufficient");
  if (document.querySelector('[name="mutual_agreement"]')) ui.choose("mutual_agreement", "yes");
  ui.submit('form[data-form="practice-gate"]');
}

test("first scene and knowledge card are not falsely marked as repeated", async () => {
  const ui = await begin("regression-first");
  assert.doesNotMatch(document.body.textContent, /Geschichte hast du.*schon geöffnet/);
  ui.click(action("scene-next"));
  assert.doesNotMatch(document.body.textContent, /Karte hast du.*schon geöffnet/);
});

test("back from private prerequisite and approved joint gate restores a valid cursor", async () => {
  let ui = await begin("regression-back-private");
  toChoice(ui);
  openPractice(ui, "P02");
  assert.match(heading(), /Pause vorbereiten/);
  assert.doesNotThrow(() => ui.click(action("back")));
  assert.match(heading(), /Pause für dich/);

  ui = await begin("regression-back-joint");
  toChoice(ui);
  openPractice(ui, "P03");
  approveGate(ui);
  assert.match(heading(), /Nachfrage/);
  assert.doesNotThrow(() => ui.click(action("back")));
  assert.match(heading(), /Was könnte jetzt passen/);
});

test("limited resources show K21 once before the story", async () => {
  const ui = await begin("regression-limited", { resources: "limited" });
  assert.match(heading(), /Wenn im Alltag zu viel/);
  ui.click(action("resource-next"));
  assert.ok(document.querySelector(action("scene-next")));
  ui.click(action("scene-next"));
  assert.doesNotMatch(heading(), /Wenn im Alltag zu viel/);
});

test("support goal returns to an honest close instead of the safety question", async () => {
  const ui = await begin("regression-support", { goal: "support" });
  assert.match(heading(), /anhalten/);
  ui.click(action("return-guided"));
  assert.match(heading(), /Für heute darf es reichen/);
  assert.equal(progress(), "100");
});

test("not performed opens K20 before the direct close", async () => {
  const ui = await begin("regression-not-done");
  toChoice(ui);
  openPractice(ui, "P01");
  ui.click(action("plan-practice"));
  ui.click(action("report-not-done"));
  assert.match(heading(), /Wenn es beim Lesen bleibt/);
  assert.ok(document.querySelector(action("not-done-finish")));
  ui.click(action("not-done-finish"));
  assert.equal(progress(), "100");
});

test("home pauses and resumes the same stage progress", async () => {
  const ui = await begin("regression-home");
  toChoice(ui);
  assert.equal(progress(), "60");
  ui.click(".brand");
  ui.click(action("start-stage"));
  assert.equal(progress(), "60");
  assert.match(heading(), /Was könnte jetzt passen/);
});

test("serious concern remains authoritative across back navigation", async () => {
  const ui = await begin("regression-concern-back");
  toChoice(ui);
  openPractice(ui, "P03");
  approveGate(ui, "concern");
  assert.match(heading(), /anhalten/);
  for (let index = 0; index < 4; index += 1) {
    ui.click(action("back"));
    assert.match(heading(), /anhalten/);
    assert.equal(document.querySelector(action("plan-practice")), null);
  }
});

test("a planned private action does not turn another private action into a partner gate", async () => {
  const ui = await begin("regression-second-action");
  toChoice(ui);
  openPractice(ui, "P01");
  ui.click(action("plan-practice"));
  ui.click(action("back"));
  ui.click(action("choice"));
  assert.equal(document.querySelector(action("practice-select", "P02")), null);
  assert.match(document.body.textContent, /im aktuellen Durchgang nicht verfügbar/);
});

test("safety examples allow a private unknown route without setting concern", async () => {
  const ui = await setupApp("regression-examples");
  ui.click(action("start-stage"));
  ui.click(action("change-context"));
  ui.submit('form[data-form="context"]');
  ui.submit('form[data-form="capacity"]');
  ui.choose("safety", "examples");
  ui.submit('form[data-form="safety"]');
  assert.match(heading(), /Welche Sorgen/);
  ui.click(action("safety-private"));
  assert.ok(document.querySelector(action("scene-next")));
});

test("concern has an own close without an inert next-stage control", async () => {
  const ui = await begin("regression-concern-close", { safety: "concern" });
  ui.click(action("finish-early"));
  assert.match(heading(), /anhalten/);
  assert.equal(document.querySelector(action("next-stage")), null);
});

test("the examples route keeps limited resources and the support goal authoritative", async () => {
  let ui = await begin("regression-examples-limited", { resources: "limited", safety: "examples" });
  ui.click(action("safety-private"));
  assert.match(heading(), /Wenn im Alltag zu viel/);

  ui = await begin("regression-examples-support", { goal: "support", safety: "examples" });
  ui.click(action("safety-private"));
  assert.match(heading(), /anhalten/);
  assert.ok(document.querySelector(action("return-guided")));
});

test("back keeps knowledge and scene visits from the current session", async () => {
  const ui = await begin("regression-visit-memory");
  ui.click(action("scene-pick", "S-T01-F02-A"));
  ui.click(action("scene-next"));
  ui.click(action("back"));
  ui.click(action("back"));
  ui.choose("safety", "no_concern_reported");
  ui.submit('form[data-form="safety"]');
  ui.click(action("scene-pick", "S-T01-F02-A"));
  assert.match(document.body.textContent, /Geschichte hast du.*schon geöffnet/);
});

test("already opened focus cards lead to the decision point instead of a forced reread", async () => {
  const ui = await begin("regression-focus-exhausted");
  ui.click(action("scene-next"));
  assert.match(heading(), /Was dort steht/);
  ui.click(action("back"));
  ui.click(action("scene-next"));
  assert.match(heading(), /Was möchtest du heute/);
  ui.click(action("back"));
  ui.click(action("scene-next"));
  assert.match(heading(), /Was könnte jetzt passen/);
});

test("not done closes the one-action window even after back navigation", async () => {
  const ui = await begin("regression-not-done-one-action");
  toChoice(ui);
  openPractice(ui, "P01");
  ui.click(action("plan-practice"));
  ui.click(action("report-not-done"));
  ui.click(action("back"));
  ui.click(action("back"));
  ui.click(action("choice"));
  assert.equal(document.querySelector(action("practice-select", "P02")), null);
  assert.match(document.body.textContent, /im aktuellen Durchgang nicht verfügbar/);
});

test("a stale context form cannot replace a later concern answer", async () => {
  const ui = await setupApp("regression-stale-context");
  ui.click(action("start-stage"));
  ui.click(action("change-context"));
  const stale = document.querySelector('form[data-form="context"]');
  ui.submit(stale);
  ui.submit('form[data-form="capacity"]');
  ui.choose("safety", "concern");
  ui.submit('form[data-form="safety"]');
  document.querySelector("#main").append(stale);
  ui.submit(stale);
  assert.match(heading(), /anhalten/);
  assert.match(stale.querySelector(".form-error").textContent, /früheren Stand/);
});

test("a stale practice button cannot plan an action from a later view", async () => {
  const ui = await begin("regression-stale-practice-action");
  toChoice(ui);
  openPractice(ui, "P01");
  const stale = document.querySelector(action("plan-practice"));
  ui.click(action("reading-finish"));
  document.querySelector("#main").append(stale);
  ui.click(stale);
  assert.match(heading(), /Für heute darf es reichen/);
  assert.equal(document.querySelector(action("report-performed")), null);
});

test("reading is the first action when capacity is low or no proposal fits", async () => {
  const ui = await begin("regression-reading-first", { goal: "boundary", capacity: "low" });
  toChoice(ui);
  const section = document.querySelector("#main section.gate-card");
  const reading = section.querySelector(action("reading-finish"));
  const details = section.querySelector("details");
  assert.ok(reading && details);
  const children = [...section.children];
  assert.ok(children.indexOf(reading.closest(".choices")) < children.indexOf(details));
  assert.match(details.querySelector("summary").textContent, /Weitere Möglichkeiten/);
});

test("back after an explicit close keeps the stage completed", async () => {
  const ui = await begin("regression-completion-memory");
  toChoice(ui);
  ui.click(action("reading-finish"));
  assert.equal(document.querySelectorAll(".stage-track > .complete").length, 1);
  ui.click(action("back"));
  assert.equal(document.querySelectorAll(".stage-track > .complete").length, 1);
});

test("fourteen stages with one goal receive distinct declared focus cards", async () => {
  const ui = await begin("regression-fourteen-focuses", { goal: "boundary" });
  const headings = [];
  for (let day = 1; day <= 14; day += 1) {
    if (day > 1) {
      ui.click(action("same-context"));
      ui.submit('form[data-form="capacity"]');
      ui.choose("safety", "no_concern_reported");
      ui.submit('form[data-form="safety"]');
    }
    ui.click(action("scene-next"));
    headings.push(heading());
    assert.doesNotMatch(document.body.textContent, /Karte hast du.*schon geöffnet/);
    ui.click(action("knowledge-next"));
    ui.click(action("reading-finish"));
    if (day < 14) ui.click(action("next-stage"));
  }
  assert.equal(new Set(headings).size, 14);
});
