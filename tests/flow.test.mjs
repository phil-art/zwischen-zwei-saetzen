import test from "node:test";
import assert from "node:assert/strict";
import { APP_DATA as base } from "../data.mjs";
import { applyW9Content } from "../content-w9.mjs";
import {
  FLOW_PLAN, initialFlow, moveFlow, practiceChoices, preferredSceneId,
  primaryKnowledgeId, progressPercent, resetFlowForNextStage
} from "../flow.mjs";
import { applyEvent, canEnter, initialState, persistedState } from "../runtime.mjs";

const data = applyW9Content(base);
const nodes = Object.fromEntries(data.nodes.map((node) => [node.id, node]));
const goals = data.contract.enum_fields.goal.filter((goal) => goal !== "support");

test("section progress is bounded, monotonic by high-water mark, and resets next stage", () => {
  let flow = initialFlow();
  assert.equal(progressPercent(flow), 0);
  for (let section = 2; section <= 6; section += 1) flow = moveFlow(flow, section, "test");
  assert.equal(progressPercent(flow), 100);
  flow = moveFlow(flow, 3, "back");
  assert.equal(progressPercent(flow), 100);
  flow = resetFlowForNextStage(flow);
  assert.equal(progressPercent(flow), 0);
});

test("all 14 × 12 × 3 × 6 normal contexts have a finite planned route", () => {
  for (let day = 1; day <= 14; day += 1) {
    for (const topic of data.contract.enum_fields.topic) {
      for (const perspective of data.contract.enum_fields.perspective) {
        for (const goal of goals) {
          const state = { ...initialState(data.contract), day, topic, perspective, goal };
          const scene = nodes[preferredSceneId(state)];
          const knowledge = nodes[primaryKnowledgeId(state)];
          assert.equal(scene?.kind, "scene", `${day}/${topic}/${perspective}/${goal}`);
          assert.equal(knowledge?.kind, "knowledge");
          assert.ok(practiceChoices(state).length >= 2);
          assert.equal(nodes[FLOW_PLAN.stage_plan[day - 1].closing]?.kind, "closing");
        }
      }
    }
  }
});

test("ordinary concern, uncertainty, and serious concern remain distinct", () => {
  let state = initialState(data.contract);
  state = applyEvent(state, { type: "report_safety", value: "no_concern_reported" }, data.contract, nodes);
  assert.equal(state.safety, "no_concern_reported");
  state = applyEvent(state, { type: "report_safety", value: "unknown" }, data.contract, nodes);
  assert.equal(state.safety, "unknown");
  state = applyEvent(state, { type: "report_concern" }, data.contract, nodes);
  assert.equal(state.safety, "concern");
  assert.equal(state.planned_action, null);
  assert.throws(() => applyEvent(state, { type: "report_safety", value: "no_concern_reported" }, data.contract, nodes));
  const revised = applyEvent(state, { type: "revise_safety_answer", value: "no_concern_reported" }, data.contract, nodes);
  assert.equal(revised.safety, "no_concern_reported");
  assert.ok(revised.context_rev > state.context_rev);
  assert.equal(revised.planned_action, null);
  assert.equal(revised.partner_willing, "unknown");
});

test("all practices are reachable only under matching current conditions", () => {
  for (const practice of data.nodes.filter((node) => node.kind === "practice")) {
    let state = { ...initialState(data.contract), topic: practice.topic_ids[0] };
    if (practice.gate !== "private") {
      state = applyEvent(state, { type: "report_resources", value: "sufficient" }, data.contract, nodes);
      state = applyEvent(state, { type: "confirm_interaction", values: {
        safety: "no_concern_reported", partner_willing: "yes", can_decline: "yes",
        mutual_agreement: practice.gate === "agreement" ? "yes" : "unknown"
      } }, data.contract, nodes);
    }
    assert.equal(canEnter(practice, state, "flow", nodes), true, practice.id);
    const concerned = applyEvent(state, { type: "report_concern" }, data.contract, nodes);
    assert.equal(canEnter(practice, concerned, "flow", nodes), false, practice.id);
  }
});

test("persistent selection remains exactly four non-sensitive fields", () => {
  const state = { ...initialState(data.contract), safety: "concern", planned_action: "P01", action_state: "planned" };
  assert.deepEqual(Object.keys(persistedState(state, data.contract)).sort(), ["day", "goal", "perspective", "topic"]);
});

test("planning is centrally bound to the current-stage knowledge prerequisite", () => {
  const state = initialState(data.contract);
  assert.throws(() => applyEvent(state, { type: "plan_action", action_id: "P02" }, data.contract, nodes), /prerequisite/);
  const planned = applyEvent(state, { type: "plan_action", action_id: "P02", visited_knowledge: ["K04"] }, data.contract, nodes);
  assert.equal(planned.planned_action, "P02");
  const notDone = applyEvent(planned, { type: "report_action", action_id: "P02", status: "not_done", outcome: "unknown" }, data.contract, nodes);
  assert.throws(() => applyEvent(notDone, { type: "plan_action", action_id: "P01", visited_knowledge: ["K01"] }, data.contract, nodes), /not eligible|One reported/);
});
