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
    const variants = scenes.filter((node) => node.family_id === family);
    assert.deepEqual(variants.map((node) => node.perspective).sort(), ["A", "B", "C"]);
    assert.equal(new Set(variants.map((node) => node.body.split("\n\n")[0])).size, 3, `${family}: distinct perspective openings`);
  }
});

test("the twelve corrected A and B pairs retain their declared perspectives", () => {
  const expected = {
    "S-T03-F02-A": /Liviane blickt/, "S-T03-F02-B": /Quirin hört sich selbst/,
    "S-T03-F04-A": /Liviane weist/, "S-T03-F04-B": /Quirin zeigt/,
    "S-T06-F01-A": /Liviane darf/, "S-T06-F01-B": /Quirin darf/,
    "S-T06-F04-A": /Liviane darf/, "S-T06-F04-B": /Quirin darf/,
    "S-T07-F03-A": /Jorun darf/, "S-T07-F03-B": /Mireva hat/,
    "S-T08-F02-A": /Tavia darf/, "S-T08-F02-B": /Solvian teilt/,
    "S-T08-F04-A": /Tavia sieht/, "S-T08-F04-B": /Solvian hat/,
    "S-T09-F02-A": /Liviane darf/, "S-T09-F02-B": /Quirin darf/,
    "S-T09-F04-A": /Liviane sieht/, "S-T09-F04-B": /Quirin darf/,
    "S-T10-F02-A": /Tavia darf/, "S-T10-F02-B": /Solvian darf/,
    "S-T10-F03-A": /Tavia darf/, "S-T10-F03-B": /Solvian darf/,
    "S-T12-F01-A": /Jorun darf/, "S-T12-F01-B": /Mireva darf/
  };
  for (const [id, pattern] of Object.entries(expected)) assert.match(data.nodes.find((node) => node.id === id).body, pattern, id);
});

test("reviewed fact, motive, consent, and pronoun regressions stay corrected", () => {
  const rendered = Object.fromEntries(data.nodes.map((node) => [node.id, node.body]));
  assert.doesNotMatch(rendered["S-T12-F04-A"], /Er kann Mirevas|kann ihm helfen/);
  assert.doesNotMatch(rendered["S-T01-F03-B"], /Schreiben würde.*länger dauern|Form, die gerade möglich war/);
  assert.doesNotMatch(rendered["S-T05-F01-A"], /zweite Becher war eine Einladung/);
  assert.doesNotMatch(rendered["S-T05-F01-B"], /auf ein gemeinsames Ankommen gehofft/);
  assert.doesNotMatch(rendered["S-T05-F04-A"], /Geste sagt zunächst nur/);
  assert.doesNotMatch(rendered["S-T06-F02-B"], /offenbar etwas Dringendes/);
  assert.match(rendered["S-T05-F03-B"], /Ob daraus eine gemeinsame Pause wird, entscheiden beide/);
  for (const id of ["S-T06-F03-A", "S-T06-F03-B", "S-T06-F03-C"]) assert.match(rendered[id], /gemeinsam|beide|Zustimmung|Antwort/);
  assert.doesNotMatch(rendered["S-T05-F01-C"], /geschlossene Tür/);
  assert.doesNotMatch(rendered["S-T11-F01-C"], /treffen Verzögerung/);
  assert.equal(rendered["S-T11-F01-A"].match(/akustisch oder inhaltlich unterbrochen/g)?.length, 1);
  assert.equal(rendered["S-T11-F02-A"].match(/leichteren Weg/g)?.length, 1);

  const diagrams = Object.fromEntries(data.nodes.filter((node) => node.diagram).map((node) => [node.id, node.diagram.text_alternative]));
  assert.doesNotMatch(diagrams.K05, /Arbeitshypothese/);
  assert.match(diagrams.K19, /beweisen nicht, wodurch das Ergebnis entstanden ist/);
  assert.doesNotMatch(diagrams.K19, /automatische einen/);
  assert.match(diagrams.K24, /nicht zuverlässig beurteilen/);
});

test("T04 through T12 close each perspective in its own voice", () => {
  for (let topic = 4; topic <= 12; topic += 1) {
    for (let family = 1; family <= 4; family += 1) {
      const prefix = `S-T${String(topic).padStart(2, "0")}-F${String(family).padStart(2, "0")}-`;
      const endings = data.nodes.filter((node) => node.id.startsWith(prefix))
        .map((node) => node.body.split(/\n\n/).at(-1));
      assert.equal(new Set(endings).size, 3, prefix);
    }
  }
  const openViews = data.nodes.filter((node) => node.kind === "scene" && node.perspective === "C" && Number(node.id.slice(3, 5)) >= 4);
  assert.equal(openViews.length, 36);
  assert.ok(openViews.every((node) => !node.body.includes("Von außen")));
});
