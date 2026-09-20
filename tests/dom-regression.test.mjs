import test from "node:test";
import assert from "node:assert/strict";
import { setupApp } from "./dom-helper.mjs";

const action = (name, value) => `[data-action="${name}"]${value ? `[data-value="${value}"]` : ""}`;
const heading = () => document.querySelector("#view-title")?.textContent;
const progress = () => document.querySelector('[role="progressbar"]')?.getAttribute("aria-valuenow");

async function begin(tag, { goal, resources = "sufficient", safety = "no_concern_reported" } = {}) {
  const ui = await setupApp(tag);
  ui.click(action("start-stage"));
  ui.click(action("change-context"));
  if (goal) ui.choose("goal", goal);
  ui.submit('form[data-form="context"]');
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
