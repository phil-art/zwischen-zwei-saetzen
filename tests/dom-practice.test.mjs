import test from "node:test";
import assert from "node:assert/strict";
import { setupApp } from "./dom-helper.mjs";

test("an exact private practice can be planned, reported, reflected, and closed", async () => {
  const { click, submit, choose } = await setupApp("practice-route");
  click('[data-action="start-stage"]');
  click('[data-action="change-context"]');
  submit('form[data-form="context"]');
  submit('form[data-form="capacity"]');
  choose("safety", "no_concern_reported");
  submit('form[data-form="safety"]');
  click('[data-action="scene-next"]');
  click('[data-action="knowledge-next"]');
  click('[data-action="practice-select"][data-value="P01"]');
  assert.match(document.querySelector("#view-title").textContent, /Moment genauer/);
  click('[data-action="plan-practice"]');
  assert.match(document.body.textContent, /noch keine Durchführung/);
  click('[data-action="report-performed"]');
  choose("outcome", "unchanged");
  submit('form[data-form="outcome"]');
  assert.equal(document.querySelector('[role="progressbar"]').getAttribute("aria-valuenow"), "80");
  assert.match(document.body.textContent, /Unverändert/);
  click('[data-action="reflection-next"]');
  assert.equal(document.querySelector('[role="progressbar"]').getAttribute("aria-valuenow"), "100");
});

test("all five performed outcomes remain bound to the planned practice", async () => {
  for (const outcome of ["helpful", "unchanged", "worse", "mixed", "unknown"]) {
    const { click, submit, choose } = await setupApp(`all-outcomes-${outcome}`);
    click('[data-action="start-stage"]');
    click('[data-action="change-context"]');
    submit('form[data-form="context"]');
    choose("capacity", "enough");
    choose("resources", "sufficient");
    submit('form[data-form="capacity"]');
    choose("safety", "no_concern_reported");
    submit('form[data-form="safety"]');
    click('[data-action="scene-next"]');
    click('[data-action="knowledge-next"]');
    const privateButton = document.querySelector('[data-action="practice-select"][data-value="P01"]');
    assert.ok(privateButton, outcome);
    click(privateButton);
    if (document.querySelector('[data-action="prerequisite-next"]')) click('[data-action="prerequisite-next"]');
    click('[data-action="plan-practice"]');
    click('[data-action="report-performed"]');
    choose("outcome", outcome);
    submit('form[data-form="outcome"]');
    assert.match(document.body.textContent, new RegExp({ helpful: "Eher hilfreich", unchanged: "Unverändert", worse: "Eher schwieriger", mixed: "Gemischt", unknown: "Noch unklar" }[outcome]));
  }
});
