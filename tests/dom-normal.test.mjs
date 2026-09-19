import test from "node:test";
import assert from "node:assert/strict";
import { setupApp } from "./dom-helper.mjs";

test("a reading-only route advances section progress and reaches an honest close", async () => {
  const { click, submit, choose } = await setupApp("reading-route");
  click('[data-action="start-stage"]');
  click('[data-action="change-context"]');
  submit('form[data-form="context"]');
  submit('form[data-form="capacity"]');
  choose("safety", "no_concern_reported");
  submit('form[data-form="safety"]');
  assert.equal(document.querySelector('[role="progressbar"]').getAttribute("aria-valuenow"), "20");
  assert.match(document.querySelector(".kind-label").textContent, /Geschichte/);
  click('[data-action="scene-next"]');
  assert.equal(document.querySelector('[role="progressbar"]').getAttribute("aria-valuenow"), "40");
  click('[data-action="knowledge-next"]');
  assert.equal(document.querySelector('[role="progressbar"]').getAttribute("aria-valuenow"), "60");
  click('[data-action="reading-finish"]');
  assert.equal(document.querySelector('[role="progressbar"]').getAttribute("aria-valuenow"), "100");
  assert.match(document.querySelector("#view-title").textContent, /reichen/);
  assert.doesNotMatch(document.body.textContent, /als durchgeführt/);
});

test("free reading returns to the parked stage without progress gain", async () => {
  const { click } = await setupApp("library-route");
  click('[data-action="start-stage"]');
  const before = document.querySelector('[role="progressbar"]').getAttribute("aria-valuenow");
  click(document.querySelector("#knowledge-button"));
  click('[data-action="wiki"]');
  click('[data-action="return-guided"]');
  assert.equal(document.querySelector('[role="progressbar"]').getAttribute("aria-valuenow"), before);
  assert.match(document.querySelector("#view-title").textContent, /kleinen Moment/);
});

