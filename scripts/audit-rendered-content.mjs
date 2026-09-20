import { writeFile } from "node:fs/promises";
import { APP_DATA } from "../data.mjs";
import { applyW9Content } from "../content-w9.mjs";

const data = applyW9Content(APP_DATA);
const normalize = (text) => text.replace(/\s+/g, " ").trim();
const renderedEqualAfterWhitespace = [];
const exactEqual = [];
let changedTitles = 0;
let changedChoiceLabels = 0;

for (const [index, node] of data.nodes.entries()) {
  const source = APP_DATA.nodes[index];
  if (node.body === source.body) exactEqual.push(node.id);
  if (normalize(node.body) === normalize(source.body)) renderedEqualAfterWhitespace.push(node.id);
  if (node.title !== source.title) changedTitles += 1;
  for (let choice = 0; choice < node.choices.length; choice += 1) {
    if (node.choices[choice].label !== source.choices[choice].label) changedChoiceLabels += 1;
  }
}

const repeatedAcrossFamilies = [];
const seenSentences = new Map();
for (const node of data.nodes.filter(({ kind }) => kind === "scene")) {
  const family = node.family_id;
  for (const sentence of node.body.split(/(?<=[.!?…])\s+/).map(normalize).filter((part) => part.split(/\s+/).length >= 12)) {
    const key = sentence.toLocaleLowerCase("de");
    const previous = seenSentences.get(key);
    if (previous && previous.family !== family) repeatedAcrossFamilies.push({ sentence, first: previous.id, second: node.id });
    else if (!previous) seenSentences.set(key, { id: node.id, family });
  }
}

const suspiciousPatterns = [
  /mögliche mögliche/i, /die das, was/i, /verletztend/i, /berichteten Versuch/i,
  /Mitwirkungsvoraussetzungen/i, /in dieser Episode/i
];
const suspicious = data.nodes.flatMap((node) => suspiciousPatterns.filter((pattern) => pattern.test(node.body)).map((pattern) => ({ id: node.id, pattern: pattern.source })));

const perspectivePatterns = {
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
const perspectiveFindings = Object.entries(perspectivePatterns)
  .filter(([id, pattern]) => !pattern.test(data.nodes.find((node) => node.id === id)?.body ?? ""))
  .map(([id, pattern]) => ({ id, expected: pattern.source }));
const repeatedPerspectiveEndings = [];
for (let topic = 4; topic <= 12; topic += 1) for (let family = 1; family <= 4; family += 1) {
  const prefix = `S-T${String(topic).padStart(2, "0")}-F${String(family).padStart(2, "0")}-`;
  const nodes = data.nodes.filter((node) => node.id.startsWith(prefix));
  const endings = nodes.map((node) => node.body.split(/\n\n/).at(-1));
  if (new Set(endings).size !== 3) repeatedPerspectiveEndings.push({ family: prefix.slice(2, -1), ids: nodes.map((node) => node.id) });
}
const externalViewFormula = data.nodes.filter((node) => node.kind === "scene" && node.perspective === "C"
  && Number(node.id.slice(3, 5)) >= 4 && node.body.includes("Von außen")).map((node) => node.id);

const report = {
  content_version: data.version,
  scope: "Actually rendered candidate text after all editorial overrides.",
  counts: {
    nodes: data.nodes.length,
    choices: data.nodes.reduce((sum, node) => sum + node.choices.length, 0),
    diagrams: data.nodes.filter((node) => node.diagram).length,
    exact_source_bodies_remaining: exactEqual.length,
    whitespace_only_source_bodies_remaining: renderedEqualAfterWhitespace.length,
    changed_titles: changedTitles,
    changed_choice_labels: changedChoiceLabels,
    repeated_long_sentences_across_scene_families: repeatedAcrossFamilies.length,
    suspicious_pattern_findings: suspicious.length,
    perspective_role_findings: perspectiveFindings.length,
    repeated_perspective_endings_t04_t12: repeatedPerspectiveEndings.length,
    external_view_formula_t04_t12: externalViewFormula.length
  },
  exact_source_bodies_remaining: exactEqual,
  whitespace_only_source_bodies_remaining: renderedEqualAfterWhitespace,
  repeated_long_sentences_across_scene_families: repeatedAcrossFamilies,
  suspicious_pattern_findings: suspicious,
  perspective_role_findings: perspectiveFindings,
  repeated_perspective_endings_t04_t12: repeatedPerspectiveEndings,
  external_view_formula_t04_t12: externalViewFormula,
  limitation: "Automated checks support but do not replace independent literary, clinical, legal, accessibility, or browser review."
};

await writeFile(new URL("../W9_CONTENT_AUDIT.json", import.meta.url), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(report.counts);
