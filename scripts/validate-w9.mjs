import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { APP_DATA } from "../data.mjs";
import { applyW9Content, W9_VERSION } from "../content-w9.mjs";

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])]));
  return value;
}

const sourceShape = (node) => ({
  id: node.id, title: node.title, body: node.body,
  choice_labels: node.choices.map(({ id, label }) => ({ id, label })), diagram: node.diagram
});
const sha256 = (value) => createHash("sha256").update(JSON.stringify(canonical(value)), "utf8").digest("hex");

const rawManifest = await readFile(new URL("../revision-manifest.json", import.meta.url), "utf8");
const manifest = JSON.parse(rawManifest);
const first = applyW9Content(APP_DATA);
const second = applyW9Content(APP_DATA);
assert.equal(first.version, W9_VERSION);
assert.equal(JSON.stringify(first), JSON.stringify(second), "two content builds must be byte-identical");
assert.equal(manifest.nodes.length, 260);
assert.equal(new Set(manifest.nodes.map(({ id }) => id)).size, 260);
const manifestById = Object.fromEntries(manifest.nodes.map((node) => [node.id, node]));

for (const [index, node] of first.nodes.entries()) {
  const base = APP_DATA.nodes[index];
  const record = manifestById[node.id];
  assert.ok(record, `manifest missing ${node.id}`);
  assert.equal(record.source_sha256, sha256(sourceShape(base)), `source hash ${node.id}`);
  assert.deepEqual({ title: record.title, body: record.body, choice_labels: record.choice_labels, diagram: record.diagram }, {
    title: node.title, body: node.body,
    choice_labels: node.choices.map(({ id, label }) => ({ id, label })), diagram: node.diagram
  }, `rendered revision ${node.id}`);

  const allowed = new Set(["title", "body", "choices", "diagram"]);
  for (const key of new Set([...Object.keys(base), ...Object.keys(node)])) {
    if (!allowed.has(key)) assert.deepEqual(node[key], base[key], `technical metadata changed: ${node.id}.${key}`);
  }
  assert.deepEqual(node.choices.map(({ label, ...choice }) => choice), base.choices.map(({ label, ...choice }) => choice), `choice metadata ${node.id}`);
}

console.log(`Validated ${first.nodes.length} nodes, ${first.nodes.reduce((sum, node) => sum + node.choices.length, 0)} choices, and deterministic output.`);
