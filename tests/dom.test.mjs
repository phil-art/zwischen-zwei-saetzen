import test from "node:test";
import assert from "node:assert/strict";
import { parseHTML } from "linkedom";
import fs from "node:fs";

class MemoryStorage {
  #values = new Map();
  getItem(key) { return this.#values.has(key) ? this.#values.get(key) : null; }
  setItem(key, value) { this.#values.set(key, String(value)); }
  removeItem(key) { this.#values.delete(key); }
}
class FormDataFromDOM {
  #values = new Map();
  constructor(form) {
    for (const input of form.querySelectorAll("input, select")) {
      if (!input.name || input.disabled) continue;
      if (input.type === "radio" && !input.checked && !input.hasAttribute("checked")) continue;
      this.#values.set(input.name, input.value);
    }
  }
  get(name) { return this.#values.get(name) ?? null; }
}
const click = (element) => element.dispatchEvent(new window.Event("click", { bubbles: true }));
const submit = (form) => form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));

test("native-like clicks do not navigate on safety selection and submit to the intended route", async () => {
  const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const parsed = parseHTML(html);
  globalThis.window = parsed.window;
  globalThis.document = parsed.document;
  globalThis.FormData = FormDataFromDOM;
  globalThis.requestAnimationFrame = (callback) => callback();
  window.scrollTo = () => {};
  Object.defineProperty(window, "localStorage", { value: new MemoryStorage() });

  await import("../app.mjs?dom-test");
  assert.match(document.querySelector("h1").textContent, /Zwischen zwei Sätzen/);
  click(document.querySelector('[data-action="start-stage"]'));
  click(document.querySelector('[data-action="change-context"]'));
  submit(document.querySelector('form[data-form="context"]'));
  submit(document.querySelector('form[data-form="capacity"]'));

  const headingBefore = document.querySelector("#view-title").textContent;
  const concern = document.querySelector('input[name="safety"][value="concern"]');
  concern.checked = true;
  concern.dispatchEvent(new window.Event("change", { bubbles: true }));
  assert.equal(document.querySelector("#view-title").textContent, headingBefore);
  assert.ok(document.querySelector('form[data-form="safety"]'));

  submit(document.querySelector('form[data-form="safety"]'));
  assert.match(document.querySelector("#view-title").textContent, /anhalten/);
  assert.match(document.body.textContent, /keine Übungen vorgeschlagen/);

  click(document.querySelector('[data-action="revise-safety"]'));
  const ordinary = document.querySelector('input[name="safety"][value="no_concern_reported"]');
  ordinary.checked = true;
  submit(document.querySelector('form[data-form="revise-safety"]'));
  assert.match(document.querySelector("#view-title").textContent, /Wie viel ist heute möglich/);
});
