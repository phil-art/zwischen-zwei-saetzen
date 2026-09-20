import { createHash } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { APP_DATA } from "../data.mjs";
import { applyW9Content, W9_VERSION } from "../content-w9.mjs";

const references = new Set([
  "S-T01-F01-A", "S-T01-F01-B", "S-T01-F01-C", "K01", "K21", "K24",
  "P01", "P03", "P09", "D01", "O01", "O04", "O07", "O12", "O13", "O14", "R01", "R02"
]);

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object") return Object.fromEntries(
    Object.keys(value).sort().map((key) => [key, canonical(value[key])])
  );
  return value;
}

function sourceShape(node) {
  return {
    id: node.id,
    title: node.title,
    body: node.body,
    choice_labels: node.choices.map(({ id, label }) => ({ id, label })),
    diagram: node.diagram
  };
}

function sha256(value) {
  return createHash("sha256").update(JSON.stringify(canonical(value)), "utf8").digest("hex");
}

const revised = applyW9Content(APP_DATA);
const baseById = Object.fromEntries(APP_DATA.nodes.map((node) => [node.id, node]));
const manifest = {
  schema_version: 1,
  base_file: "data.mjs",
  base_version: APP_DATA.version,
  content_version: W9_VERSION,
  hash_algorithm: "sha256",
  canonicalization: "Recursive object-key sort; array order preserved; compact UTF-8 JSON; original source prose is not normalized.",
  review_scope: "Candidate-level editorial and automated checks; independent Astra/browser review remains pending.",
  nodes: revised.nodes.map((node) => {
    const base = baseById[node.id];
    return {
      id: node.id,
      kind: node.kind,
      source_sha256: sha256(sourceShape(base)),
      editing_status: references.has(node.id) ? "reviewed_reference_preserved" : "individually_rewritten",
      review_status: "candidate_checks_passed_final_review_pending",
      title: node.title,
      body: node.body,
      choice_labels: node.choices.map(({ id, label }) => ({ id, label })),
      diagram: node.diagram
    };
  })
};

await writeFile(new URL("../revision-manifest.json", import.meta.url), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
