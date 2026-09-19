import test from "node:test";
import assert from "node:assert/strict";
import { APP_DATA as base } from "../data.mjs";
import { applyW9Content, UI_COPY, W9_VERSION } from "../content-w9.mjs";

const data = applyW9Content(base);
const limits = {
  scene: [80, 150], knowledge: [70, 140], practice: [70, 120],
  day_intro: [35, 65], orientation: [30, 90], reflection: [35, 75], closing: [30, 70]
};

test("W9 covers and rewrites the complete public content set", () => {
  assert.equal(data.version, W9_VERSION);
  assert.equal(data.nodes.length, 260);
  assert.equal(data.nodes.reduce((sum, node) => sum + node.choices.length, 0), 859);
  assert.equal(data.nodes.filter((node) => node.diagram).length, 9);
  assert.equal(new Set(data.nodes.map((node) => node.id)).size, 260);
  for (const [index, node] of data.nodes.entries()) {
    assert.notEqual(node.body, base.nodes[index].body, node.id);
    assert.ok(node.body.includes("\n\n"), node.id);
    assert.equal(node.choices.length, base.nodes[index].choices.length, node.id);
    assert.deepEqual(node.choices.map((choice) => choice.id), base.nodes[index].choices.map((choice) => choice.id), node.id);
    const words = node.body.trim().split(/\s+/).length;
    const [minimum, maximum] = limits[node.kind];
    assert.ok(words >= minimum && words <= maximum, `${node.id}: ${words}`);
  }
});

test("reference tone and serious-concern distinction are present", () => {
  assert.equal(data.nodes.find((node) => node.id === "S-T01-F01-A").title, "Ein Wort, und plötzlich wird es eng");
  assert.match(data.nodes.find((node) => node.id === "K01").body, /was du darin hörst|Was ist tatsächlich passiert/);
  assert.match(data.nodes.find((node) => node.id === "K24").body, /Drohungen, Einschüchterung oder Kontrolle/);
  assert.match(UI_COPY.safetyQuestion, /Drohungen.*Einschüchterung.*Gewalt.*Kontrolle/);
  assert.match(UI_COPY.safetyExplanation, /gewöhnliche Sorge.*enttäuschen.*nicht gemeint/);
  assert.ok(!data.nodes.some((node) => /in dieser Episode|Mitwirkungsvoraussetzungen|berichteten Versuch/.test(node.body)));
});

test("scene identity and graph identity remain stable", () => {
  const scenes = data.nodes.filter((node) => node.kind === "scene");
  assert.equal(scenes.length, 144);
  assert.equal(new Set(scenes.map((node) => node.family_id)).size, 48);
  for (const family of new Set(scenes.map((node) => node.family_id))) {
    assert.deepEqual(scenes.filter((node) => node.family_id === family).map((node) => node.perspective).sort(), ["A", "B", "C"]);
  }
});

