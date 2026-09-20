import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));

async function moduleGraph(entry) {
  const found = new Set();
  const pending = [entry];
  while (pending.length) {
    const current = normalize(pending.pop());
    if (found.has(current)) continue;
    found.add(current);
    const text = await readFile(join(root, current), "utf8");
    for (const match of text.matchAll(/(?:from\s+|import\s+)["'](\.[^"']+)["']/g)) {
      pending.push(normalize(join(dirname(current), match[1])));
    }
  }
  return [...found];
}

async function snapshot() {
  const files = ["index.html", "styles.css", "datenschutz.html", ".nojekyll", ...await moduleGraph("app.mjs")];
  const unique = [...new Set(files)].sort();
  return Promise.all(unique.map(async (file) => ({
    file: relative(root, join(root, file)),
    sha256: createHash("sha256").update(await readFile(join(root, file))).digest("hex")
  })));
}

const first = await snapshot();
const second = await snapshot();
assert.deepEqual(second, first, "two independent release snapshots differ");
const output = {
  schema_version: 1,
  deployment: "Static GitHub Pages source files; no build step, backend, or runtime AI.",
  import_entry: "app.mjs",
  files: first
};
await writeFile(join(root, "release-files.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`Verified two identical snapshots of ${first.length} release files.`);
