import test from "node:test";
import assert from "node:assert/strict";
import { setupApp } from "./dom-helper.mjs";
import { APP_DATA } from "../data.mjs";
import { practiceChoices } from "../flow.mjs";

const goals = APP_DATA.contract.enum_fields.goal.filter((goal) => goal !== "support");

test("all 36 practices open through current application gates", { timeout: 30_000 }, async () => {
  const practices = APP_DATA.nodes.filter((node) => node.kind === "practice");
  assert.equal(practices.length, 36);

  for (const practice of practices) {
    let context = null;
    for (const topic of APP_DATA.contract.enum_fields.topic) {
      for (const goal of goals) {
        const state = { topic, goal };
        if (practiceChoices(state).includes(practice.id)) context ??= { topic, goal };
      }
    }
    assert.ok(context, `no context for ${practice.id}`);

    const saved = { day: 1, topic: context.topic, perspective: "C", goal: context.goal };
    const ui = await setupApp(`practice-opening-${practice.id}`, saved);
    ui.click('[data-action="start-stage"]');
    ui.click('[data-action="change-context"]');
    ui.submit('form[data-form="context"]');
    ui.choose("capacity", "enough");
    ui.choose("resources", "sufficient");
    ui.submit('form[data-form="capacity"]');
    ui.choose("safety", "no_concern_reported");
    ui.submit('form[data-form="safety"]');
    ui.click('[data-action="scene-next"]');
    ui.click('[data-action="knowledge-next"]');
    ui.click(`[data-action="practice-select"][data-value="${practice.id}"]`);

    if (document.querySelector('[data-action="prerequisite-next"]')) ui.click('[data-action="prerequisite-next"]');
    if (document.querySelector('form[data-form="practice-gate"]')) {
      ui.choose("safety", "no_concern_reported");
      ui.choose("partner_willing", "yes");
      ui.choose("can_decline", "yes");
      ui.choose("resources", "sufficient");
      if (document.querySelector('input[name="mutual_agreement"]')) ui.choose("mutual_agreement", "yes");
      ui.submit('form[data-form="practice-gate"]');
    }

    assert.equal(document.querySelector('[data-action="plan-practice"]')?.dataset.value, practice.id, practice.id);
  }
});
