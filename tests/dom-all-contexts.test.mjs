import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { setupApp } from "./dom-helper.mjs";
import { APP_DATA } from "../data.mjs";

const selectedDay = Number(process.argv[2]);

if (selectedDay) {
  const goals = APP_DATA.contract.enum_fields.goal.filter((goal) => goal !== "support");
  let count = 0;
  for (const topic of APP_DATA.contract.enum_fields.topic) {
    for (const perspective of APP_DATA.contract.enum_fields.perspective) {
      for (const goal of goals) {
        const label = `${selectedDay}/${topic}/${perspective}/${goal}`;
        const ui = await setupApp(`all-contexts-${label}`, { day: selectedDay, topic, perspective, goal });
        ui.click('[data-action="start-stage"]');
        if (selectedDay === 1) {
          ui.click('[data-action="change-context"]');
          ui.submit('form[data-form="context"]');
        } else {
          ui.click('[data-action="same-context"]');
        }
        ui.choose("capacity", "enough");
        ui.choose("resources", "sufficient");
        ui.submit('form[data-form="capacity"]');
        ui.choose("safety", "no_concern_reported");
        ui.submit('form[data-form="safety"]');
        assert.equal(document.querySelector('[role="progressbar"]').getAttribute("aria-valuenow"), "20", label);
        ui.click('[data-action="scene-next"]');
        ui.click('[data-action="knowledge-next"]');
        ui.click('[data-action="reading-finish"]');
        assert.equal(document.querySelector('[role="progressbar"]').getAttribute("aria-valuenow"), "100", label);
        assert.equal(Boolean(document.querySelector('[data-action="next-stage"]')), selectedDay < 14, label);
        count += 1;
      }
    }
  }
  assert.equal(count, 216);
} else {
  test("all 3,024 normal contexts complete through real application handlers", { timeout: 120_000 }, () => {
    let total = 0;
    for (let day = 1; day <= 14; day += 1) {
      const result = spawnSync(process.execPath, [fileURLToPath(import.meta.url), String(day)], {
        encoding: "utf8", maxBuffer: 2_000_000
      });
      assert.equal(result.status, 0, `day ${day}: ${result.stderr || result.stdout}`);
      total += 216;
    }
    assert.equal(total, 3024);
  });
}
