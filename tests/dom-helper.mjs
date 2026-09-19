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

export async function setupApp(tag) {
  const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const parsed = parseHTML(html);
  globalThis.window = parsed.window;
  globalThis.document = parsed.document;
  globalThis.FormData = FormDataFromDOM;
  globalThis.requestAnimationFrame = (callback) => callback();
  window.scrollTo = () => {};
  if (!("localStorage" in window)) Object.defineProperty(window, "localStorage", { value: new MemoryStorage() });
  await import(`../app.mjs?${tag}`);
  return {
    click(selector) {
      const element = typeof selector === "string" ? document.querySelector(selector) : selector;
      if (!element) throw new Error(`Missing click target: ${selector}`);
      element.dispatchEvent(new window.Event("click", { bubbles: true }));
    },
    submit(selector) {
      const form = typeof selector === "string" ? document.querySelector(selector) : selector;
      if (!form) throw new Error(`Missing form: ${selector}`);
      form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
    },
    choose(name, value) {
      const input = document.querySelector(`input[name="${name}"][value="${value}"]`);
      if (!input) throw new Error(`Missing option ${name}=${value}`);
      for (const peer of document.querySelectorAll(`input[name="${name}"]`)) {
        peer.checked = false;
        peer.removeAttribute("checked");
      }
      input.checked = true;
      return input;
    }
  };
}
