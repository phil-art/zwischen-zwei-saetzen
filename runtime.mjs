export function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function initialState(contract) {
  return clone(contract.defaults);
}

export function restoreState(saved, contract) {
  const state = initialState(contract);
  for (const key of contract.persist_allowlist) {
    const value = saved?.[key];
    if (key === "day") {
      if (Number.isInteger(value) && value >= 1 && value <= 14) state[key] = value;
      continue;
    }
    if (contract.enum_fields[key]?.includes(value)) state[key] = value;
  }
  return state;
}

export function persistedState(state, contract) {
  return Object.fromEntries(contract.persist_allowlist.map((key) => [key, state[key]]));
}

export function canEnter(node, state, mode = "flow", nodeIndex = {}) {
  if (!node || !["flow", "wiki"].includes(mode)) return false;
  if (mode === "wiki") return node.kind === "knowledge";
  if (["reflection", "closing", "day_intro"].includes(node.kind) && node.day !== state.day) return false;
  if (state.safety === "concern") return node.gate === "support" || node.kind === "closing";
  if (node.kind === "practice") {
    if (!node.topic_ids.includes(state.topic)) return false;
    if (["planned", "performed"].includes(state.action_state) && state.planned_action !== node.id) return false;
  }
  if (node.requires_performed) {
    const planned = nodeIndex[state.planned_action];
    if (state.action_state !== "performed" || planned?.kind !== "practice") return false;
  }
  if (["partner", "agreement"].includes(node.gate)) {
    const partnerGate = state.safety === "no_concern_reported"
      && state.partner_willing === "yes"
      && state.can_decline === "yes"
      && state.confirmation_rev === state.context_rev
      && state.resource_reviewed;
    if (!partnerGate) return false;
  }
  if (node.gate === "agreement") {
    if (state.mutual_agreement !== "yes" || state.resources !== "sufficient") return false;
  }
  return ["private", "support", "partner", "agreement"].includes(node.gate);
}

export function applyEvent(state, event, contract, nodeIndex) {
  let next = clone(state);
  const type = event?.type;
  if (["navigate", "exit"].includes(type)) return next;
  if (type === "restart") return initialState(contract);
  if (type === "change_context") {
    const keep = Object.fromEntries(["day", "topic", "perspective", "goal"].map((key) => [key, next[key]]));
    const oldRevision = next.context_rev;
    next = initialState(contract);
    Object.assign(next, keep, { context_rev: oldRevision + 1 });
    for (const [key, value] of Object.entries(event.values ?? {})) {
      if (!["topic", "perspective", "goal"].includes(key)) throw new Error("Context change cannot set permissions");
      if (!contract.enum_fields[key].includes(value)) throw new Error("Invalid context value");
      next[key] = value;
    }
    return next;
  }
  if (type === "set_capacity") {
    if (!contract.enum_fields.capacity.includes(event.value)) throw new Error("Invalid capacity");
    next.capacity = event.value;
    return next;
  }
  if (type === "confirm_interaction") {
    const expected = ["can_decline", "mutual_agreement", "partner_willing", "safety"];
    const actual = Object.keys(event.values ?? {}).sort();
    if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error("Explicit complete confirmation required");
    for (const [key, value] of Object.entries(event.values)) {
      if (!contract.enum_fields[key].includes(value)) throw new Error("Invalid interaction answer");
    }
    if (next.safety === "concern" && event.values.safety !== "concern") throw new Error("Changed situation requires a new context");
    Object.assign(next, event.values, { confirmation_rev: next.context_rev });
    return next;
  }
  if (type === "report_resources") {
    if (!contract.enum_fields.resources.includes(event.value)) throw new Error("Invalid resources");
    Object.assign(next, { resources: event.value, resource_reviewed: true });
    return next;
  }
  if (type === "report_concern") {
    Object.assign(next, {
      safety: "concern", partner_willing: "unknown", can_decline: "unknown",
      mutual_agreement: "unknown", confirmation_rev: null, planned_action: null,
      action_state: "not_planned", outcome: "unknown",
    });
    return next;
  }
  if (type === "report_safety") {
    if (!["unknown", "no_concern_reported", "concern"].includes(event.value)) throw new Error("Invalid safety answer");
    if (event.value === "concern") return applyEvent(next, { type: "report_concern" }, contract, nodeIndex);
    Object.assign(next, {
      safety: event.value, partner_willing: "unknown", can_decline: "unknown",
      mutual_agreement: "unknown", confirmation_rev: next.context_rev,
    });
    return next;
  }
  if (type === "revise_safety_answer") {
    if (!["unknown", "no_concern_reported", "concern"].includes(event.value)) throw new Error("Invalid safety answer");
    const keep = Object.fromEntries(["day", "topic", "perspective", "goal"].map((key) => [key, next[key]]));
    const revision = next.context_rev + 1;
    next = initialState(contract);
    Object.assign(next, keep, { context_rev: revision });
    if (event.value === "concern") return applyEvent(next, { type: "report_concern" }, contract, nodeIndex);
    Object.assign(next, { safety: event.value, confirmation_rev: revision });
    return next;
  }
  if (type === "plan_action") {
    const action = nodeIndex[event.action_id];
    if (!action || action.kind !== "practice" || !canEnter(action, next, "flow", nodeIndex)) throw new Error("Action not eligible");
    if (next.action_state === "performed") throw new Error("One reported action per stage");
    Object.assign(next, { planned_action: action.id, action_state: "planned", outcome: "unknown" });
    return next;
  }
  if (type === "report_action") {
    if (event.action_id !== next.planned_action || !["planned", "performed"].includes(next.action_state)) throw new Error("Report must match the planned action");
    if (!canEnter(nodeIndex[next.planned_action], next, "flow", nodeIndex)) throw new Error("Action no longer eligible");
    if (!["performed", "not_done"].includes(event.status)) throw new Error("Explicit performed/not_done report required");
    const outcome = event.outcome ?? "unknown";
    if (!contract.enum_fields.outcome.includes(outcome)) throw new Error("Invalid outcome");
    if (event.status === "not_done" && outcome !== "unknown") throw new Error("Unperformed action has no outcome");
    Object.assign(next, { action_state: event.status, outcome });
    return next;
  }
  if (type === "enter_scene") {
    const scene = nodeIndex[event.scene_id];
    if (scene?.kind !== "scene" || !scene.topic_ids.includes(next.topic) || scene.perspective !== next.perspective || !canEnter(scene, next, "flow", nodeIndex)) throw new Error("Incompatible scene");
    Object.assign(next, { current_scene: scene.id, fiction: { [`entered:${scene.family_id}`]: true } });
    return next;
  }
  if (type === "next_day") {
    if (next.day >= 14) throw new Error("Last stage has no successor");
    if (next.safety === "concern") throw new Error("A new situation must be chosen explicitly after concern");
    return {
      ...initialState(contract), day: next.day + 1, topic: next.topic,
      perspective: next.perspective, goal: next.goal, context_rev: next.context_rev + 1,
    };
  }
  throw new Error(`Unknown event type: ${type}`);
}

// Preview routes never equate published data with permission to show a practice.
export function routeStatus(node, state, mode, nodeIndex) {
  if (!node) return "missing";
  if (mode === "wiki") return node.kind === "knowledge" ? "allowed" : "blocked";
  if (mode !== "flow") return "blocked";
  if (node.kind === "scene" && (!node.topic_ids.includes(state.topic) || node.perspective !== state.perspective)) return "blocked";
  if (canEnter(node, state, mode, nodeIndex)) return "allowed";
  const topicMatches = node.kind === "practice" && node.topic_ids.includes(state.topic);
  const actionMatches = !["planned", "performed"].includes(state.action_state) || state.planned_action === node.id;
  if (topicMatches && actionMatches && state.safety !== "concern" && ["partner", "agreement"].includes(node.gate)) return "confirmation";
  return "blocked";
}

export function choiceStatus(choice, state, mode, contract, nodeIndex, availableIds) {
  const target = nodeIndex[choice.target];
  if (choice.source && routeStatus(nodeIndex[choice.source], state, mode, nodeIndex) !== "allowed") return "hidden";
  if (mode === "wiki") {
    if (target?.kind !== "knowledge" || choice.event.type !== "navigate") return "hidden";
    return availableIds.has(choice.target) ? "allowed" : "missing";
  }
  if (!Object.entries(choice.when ?? {}).every(([key, value]) => state[key] === value)) return "hidden";
  if (choice.target === "EXIT") return mode === "flow" && choice.event.type === "exit" ? "allowed" : "hidden";
  try {
    const after = applyEvent(state, choice.event, contract, nodeIndex);
    const status = routeStatus(target, after, mode, nodeIndex);
    if (status === "blocked") return "hidden";
    return availableIds.has(choice.target) ? status : "missing";
  } catch {
    return "hidden";
  }
}

export function transitionChoice(choice, state, mode, contract, nodeIndex, availableIds) {
  const status = choiceStatus(choice, state, mode, contract, nodeIndex, availableIds);
  if (status !== "allowed") throw new Error(`Choice is not allowed: ${status}`);
  // Wiki reading cannot mutate progress or grant permissions, even for a stale button.
  return mode === "wiki" ? clone(state) : applyEvent(state, choice.event, contract, nodeIndex);
}

export function visibleChoices(node, state, mode, contract, nodeIndex, availableIds) {
  return node.choices.map((choice) => ({
    ...choice, status: choiceStatus(choice, state, mode, contract, nodeIndex, availableIds),
  })).filter((choice) => choice.status !== "hidden").sort((a, b) => {
    const priority = (choice) => {
      if (state.safety === "concern" && choice.target === "K24") return -3;
      if (state.resources === "limited" && choice.target === "K21") return -2;
      return choice.status === "missing" ? 1 : 0;
    };
    return priority(a) - priority(b);
  });
}

export function diagramText(diagram) {
  if (!diagram) return null;
  const labels = Object.fromEntries(diagram.nodes.map((node) => [node.id, node.label]));
  return {
    visual: diagram.edges.map((edge) => `${labels[edge.from]} → ${edge.label} → ${labels[edge.to]}`),
    alternative: diagram.text_alternative,
  };
}
