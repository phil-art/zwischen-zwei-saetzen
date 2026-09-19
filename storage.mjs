import { initialState, persistedState, restoreState } from "./runtime.mjs";

export const STORAGE_KEY = "z2s-pilot-selection-v1";

export function loadSelection(storage, contract, availableDays) {
  let state = initialState(contract);
  let enabled = false;
  let notice = "";
  try {
    const raw = storage?.getItem(STORAGE_KEY);
    if (raw != null) {
      state = restoreState(JSON.parse(raw), contract);
      enabled = true;
    }
  } catch {
    notice = "Die gespeicherte Auswahl konnte nicht gelesen werden. Du kannst ohne Speicherung weiterlesen.";
  }
  if (!availableDays.includes(state.day)) {
    state.day = availableDays[0];
    notice = "Die gespeicherte Etappe ist hier noch nicht verfügbar. Dieser Prototyp beginnt mit Etappe 1.";
  }
  return { state, enabled, notice };
}

export function saveSelection(storage, state, contract, enabled) {
  try {
    if (!storage) throw new Error("Storage unavailable");
    if (enabled) storage.setItem(STORAGE_KEY, JSON.stringify(persistedState(state, contract)));
    else storage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
