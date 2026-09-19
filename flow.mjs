// Deterministic W9 guided path. It never calls a model and stores no sensitive answers.
export const FLOW_PLAN = {
  "version": "w9-phase1-v1",
  "sections": [
    {
      "index": 1,
      "label": "Ankommen",
      "optional": false
    },
    {
      "index": 2,
      "label": "Geschichte",
      "optional": false
    },
    {
      "index": 3,
      "label": "Gedanken sortieren",
      "optional": false
    },
    {
      "index": 4,
      "label": "Dein nächster Schritt",
      "optional": false
    },
    {
      "index": 5,
      "label": "Rückblick",
      "optional": true
    },
    {
      "index": 6,
      "label": "Abschluss",
      "optional": false
    }
  ],
  "stage_plan": [
    {
      "day": 1,
      "intro": "D01",
      "closing": "R01",
      "reflection": "R02",
      "title": "Mit einem kleinen Moment anfangen",
      "question": "Welche Situation möchtest du heute näher ansehen?",
      "primary_knowledge": "topic",
      "fallback_knowledge": [
        "K09"
      ],
      "preferred_scene_family": "F01"
    },
    {
      "day": 2,
      "intro": "D02",
      "closing": "R03",
      "reflection": "R04",
      "title": "Was ist passiert?",
      "question": "Was weißt du – und was vermutest du?",
      "primary_knowledge": "K01",
      "fallback_knowledge": [
        "K02"
      ],
      "preferred_scene_family": "F02"
    },
    {
      "day": 3,
      "intro": "D03",
      "closing": "R05",
      "reflection": "R06",
      "title": "Wie viel ist heute möglich?",
      "question": "Wie viel Zeit und Kraft hast du gerade?",
      "primary_knowledge": "K03",
      "fallback_knowledge": [
        "K04"
      ],
      "preferred_scene_family": "F03"
    },
    {
      "day": 4,
      "intro": "D04",
      "closing": "R07",
      "reflection": "R08",
      "title": "Wenn es sich wiederholt",
      "question": "Welchen wiederkehrenden Ablauf möchtest du genauer sehen?",
      "primary_knowledge": "K05",
      "fallback_knowledge": [
        "K10"
      ],
      "preferred_scene_family": "F04"
    },
    {
      "day": 5,
      "intro": "D05",
      "closing": "R09",
      "reflection": "R10",
      "title": "Was im Alltag mitwirkt",
      "question": "Welche Belastung spielt mit, ohne alles zu erklären?",
      "primary_knowledge": "K06",
      "fallback_knowledge": [
        "K21"
      ],
      "preferred_scene_family": "F01"
    },
    {
      "day": 6,
      "intro": "D06",
      "closing": "R11",
      "reflection": "R12",
      "title": "Was dir wichtig ist",
      "question": "Welches eigene Anliegen möchtest du für dich benennen?",
      "primary_knowledge": "K08",
      "fallback_knowledge": [
        "K07"
      ],
      "preferred_scene_family": "F02"
    },
    {
      "day": 7,
      "intro": "D07",
      "closing": "R13",
      "reflection": "R14",
      "title": "Dein Spielraum",
      "question": "Was liegt bei dir, was braucht andere, wo liegt eine Grenze?",
      "primary_knowledge": "K10",
      "fallback_knowledge": [
        "K15"
      ],
      "preferred_scene_family": "F03"
    },
    {
      "day": 8,
      "intro": "D08",
      "closing": "R15",
      "reflection": "R16",
      "title": "Eine kleine Möglichkeit",
      "question": "Was wäre ein kleiner, umkehrbarer eigener Versuch?",
      "primary_knowledge": "K18",
      "fallback_knowledge": [
        "K09"
      ],
      "preferred_scene_family": "F04"
    },
    {
      "day": 9,
      "intro": "D09",
      "closing": "R17",
      "reflection": "R18",
      "title": "Einander besser verstehen",
      "question": "Was unterscheidet eine Frage oder Bitte von einer Forderung?",
      "primary_knowledge": "K11",
      "fallback_knowledge": [
        "K12"
      ],
      "preferred_scene_family": "F01"
    },
    {
      "day": 10,
      "intro": "D10",
      "closing": "R19",
      "reflection": "R20",
      "title": "Ein Plan für dich oder für euch?",
      "question": "Was kannst du selbst planen, was braucht beiderseitige Zustimmung?",
      "primary_knowledge": "K14",
      "fallback_knowledge": [
        "K10"
      ],
      "preferred_scene_family": "F02"
    },
    {
      "day": 11,
      "intro": "D11",
      "closing": "R21",
      "reflection": "R22",
      "title": "Deinen Anteil ansehen",
      "question": "Gibt es etwas an deinem eigenen Verhalten, das du ändern möchtest?",
      "primary_knowledge": "K17",
      "fallback_knowledge": [
        "K15"
      ],
      "preferred_scene_family": "F03"
    },
    {
      "day": 12,
      "intro": "D12",
      "closing": "R23",
      "reflection": "R24",
      "title": "Wenn etwas nicht passt",
      "question": "Was möchtest du tun, wenn ein Versuch ausbleibt oder nichts verändert?",
      "primary_knowledge": "K20",
      "fallback_knowledge": [
        "K19"
      ],
      "preferred_scene_family": "F04"
    },
    {
      "day": 13,
      "intro": "D13",
      "closing": "R25",
      "reflection": "R26",
      "title": "Eine weitere Situation",
      "question": "Möchtest du etwas anderes ansehen oder beim bisherigen Thema bleiben?",
      "primary_knowledge": "K22",
      "fallback_knowledge": [
        "K13"
      ],
      "preferred_scene_family": "F01"
    },
    {
      "day": 14,
      "intro": "D14",
      "closing": "R27",
      "reflection": "R28",
      "title": "Was du mitnehmen möchtest",
      "question": "Was möchtest du behalten, offenlassen oder später noch einmal lesen?",
      "primary_knowledge": "K23",
      "fallback_knowledge": [
        "K09"
      ],
      "preferred_scene_family": "F02"
    }
  ],
  "goal_focus": {
    "clarify": null,
    "private": null,
    "pause": [
      "K04",
      "K03"
    ],
    "boundary": [
      "K15",
      "K10"
    ],
    "distance": [
      "K15",
      "K23"
    ],
    "undecided": [
      "K23",
      "K09"
    ],
    "support": [
      "K24"
    ]
  },
  "topics": [
    {
      "id": "T01",
      "entry_knowledge": "K01",
      "private_practices": [
        "P01",
        "P02"
      ],
      "partner_practices": [
        "P03"
      ],
      "agreement_practices": [],
      "preferred_private_by_goal": {
        "clarify": "P01",
        "private": "P01",
        "pause": "P02",
        "boundary": null,
        "distance": "P02",
        "undecided": "P01"
      }
    },
    {
      "id": "T02",
      "entry_knowledge": "K01",
      "private_practices": [
        "P04"
      ],
      "partner_practices": [
        "P05",
        "P06"
      ],
      "agreement_practices": [],
      "preferred_private_by_goal": {
        "clarify": "P04",
        "private": "P04",
        "pause": null,
        "boundary": null,
        "distance": null,
        "undecided": "P04"
      }
    },
    {
      "id": "T03",
      "entry_knowledge": "K21",
      "private_practices": [
        "P07",
        "P08"
      ],
      "partner_practices": [],
      "agreement_practices": [
        "P09"
      ],
      "preferred_private_by_goal": {
        "clarify": "P07",
        "private": "P07",
        "pause": null,
        "boundary": "P08",
        "distance": null,
        "undecided": "P08"
      }
    },
    {
      "id": "T04",
      "entry_knowledge": "K01",
      "private_practices": [
        "P10",
        "P12"
      ],
      "partner_practices": [
        "P11"
      ],
      "agreement_practices": [],
      "preferred_private_by_goal": {
        "clarify": "P10",
        "private": "P10",
        "pause": "P12",
        "boundary": "P12",
        "distance": null,
        "undecided": "P10"
      }
    },
    {
      "id": "T05",
      "entry_knowledge": "K08",
      "private_practices": [
        "P13",
        "P14"
      ],
      "partner_practices": [
        "P15"
      ],
      "agreement_practices": [],
      "preferred_private_by_goal": {
        "clarify": "P13",
        "private": "P13",
        "pause": "P14",
        "boundary": "P14",
        "distance": "P14",
        "undecided": "P13"
      }
    },
    {
      "id": "T06",
      "entry_knowledge": "K03",
      "private_practices": [
        "P16",
        "P18"
      ],
      "partner_practices": [],
      "agreement_practices": [
        "P17"
      ],
      "preferred_private_by_goal": {
        "clarify": "P18",
        "private": "P18",
        "pause": "P16",
        "boundary": "P16",
        "distance": "P16",
        "undecided": "P16"
      }
    },
    {
      "id": "T07",
      "entry_knowledge": "K15",
      "private_practices": [
        "P19",
        "P20",
        "P21"
      ],
      "partner_practices": [],
      "agreement_practices": [],
      "preferred_private_by_goal": {
        "clarify": "P20",
        "private": "P19",
        "pause": null,
        "boundary": "P19",
        "distance": "P19",
        "undecided": "P20"
      }
    },
    {
      "id": "T08",
      "entry_knowledge": "K21",
      "private_practices": [
        "P22",
        "P24"
      ],
      "partner_practices": [
        "P23"
      ],
      "agreement_practices": [],
      "preferred_private_by_goal": {
        "clarify": "P22",
        "private": "P22",
        "pause": "P24",
        "boundary": "P24",
        "distance": "P24",
        "undecided": "P22"
      }
    },
    {
      "id": "T09",
      "entry_knowledge": "K21",
      "private_practices": [
        "P25",
        "P26"
      ],
      "partner_practices": [],
      "agreement_practices": [
        "P27"
      ],
      "preferred_private_by_goal": {
        "clarify": "P25",
        "private": "P25",
        "pause": null,
        "boundary": null,
        "distance": null,
        "undecided": "P26"
      }
    },
    {
      "id": "T10",
      "entry_knowledge": "K15",
      "private_practices": [
        "P28",
        "P29",
        "P30"
      ],
      "partner_practices": [],
      "agreement_practices": [],
      "preferred_private_by_goal": {
        "clarify": "P28",
        "private": "P28",
        "pause": null,
        "boundary": "P29",
        "distance": "P30",
        "undecided": "P28"
      }
    },
    {
      "id": "T11",
      "entry_knowledge": "K13",
      "private_practices": [
        "P31",
        "P32"
      ],
      "partner_practices": [],
      "agreement_practices": [
        "P33"
      ],
      "preferred_private_by_goal": {
        "clarify": "P31",
        "private": "P31",
        "pause": null,
        "boundary": null,
        "distance": "P31",
        "undecided": "P31"
      }
    },
    {
      "id": "T12",
      "entry_knowledge": "K09",
      "private_practices": [
        "P34",
        "P35",
        "P36"
      ],
      "partner_practices": [],
      "agreement_practices": [],
      "preferred_private_by_goal": {
        "clarify": "P34",
        "private": "P34",
        "pause": "P36",
        "boundary": "P36",
        "distance": "P36",
        "undecided": "P36"
      }
    }
  ],
  "practice_prerequisites": {
    "P01": [
      "K01"
    ],
    "P02": [
      "K04"
    ],
    "P03": [
      "K11"
    ],
    "P04": [
      "K02"
    ],
    "P05": [
      "K17"
    ],
    "P06": [
      "K12"
    ],
    "P07": [
      "K21"
    ],
    "P08": [
      "K10"
    ],
    "P09": [
      "K14"
    ],
    "P10": [
      "K01"
    ],
    "P11": [
      "K11"
    ],
    "P12": [
      "K18"
    ],
    "P13": [
      "K08"
    ],
    "P14": [
      "K04"
    ],
    "P15": [
      "K11"
    ],
    "P16": [
      "K03"
    ],
    "P17": [
      "K04"
    ],
    "P18": [
      "K11"
    ],
    "P19": [
      "K15"
    ],
    "P20": [
      "K22"
    ],
    "P21": [
      "K15"
    ],
    "P22": [
      "K21"
    ],
    "P23": [
      "K12"
    ],
    "P24": [
      "K10"
    ],
    "P25": [
      "K21"
    ],
    "P26": [
      "K23"
    ],
    "P27": [
      "K14"
    ],
    "P28": [
      "K15"
    ],
    "P29": [
      "K15"
    ],
    "P30": [
      "K23"
    ],
    "P31": [
      "K13"
    ],
    "P32": [
      "K11"
    ],
    "P33": [
      "K14"
    ],
    "P34": [
      "K09"
    ],
    "P35": [
      "K17"
    ],
    "P36": [
      "K23"
    ]
  },
  "policy": {
    "private_practice_preferred": true,
    "null_preference_means": "recommend_reading_only_finish_not_an_invented_exercise",
    "support_goal_sets_concern": false,
    "scene_count_per_topic_perspective": 4,
    "capacity_low": "one_primary_knowledge_card_and_reading_only_finish_preferred",
    "capacity_other": "one_primary_knowledge_card_optional_practice_with_its_prerequisite",
    "limited_resources_prelude": "K21",
    "limited_resources_resume": "O06",
    "optional_links_mode": "wiki",
    "wiki_mutates_guided_progress": false,
    "max_simultaneous_content_choices": 4,
    "unread_practice_prerequisite": "one_explicit_reading_step_within_section_4",
    "already_opened_focus": "try_next_declared_candidate_then_decision_hub",
    "primary_knowledge_fallback_is_not_a_forced_chain": true,
    "new_context_invalidates_permissions": true,
    "safety_change_requires_submit": true,
    "serious_concern_blocks_all_practices": true,
    "serious_concern_blocks_next_day": true,
    "correction_requires_explicit_context_revision": true,
    "persist_allowlist": [
      "day",
      "topic",
      "perspective",
      "goal"
    ]
  }
};

export const SECTION_LABELS = Object.freeze(Object.fromEntries(FLOW_PLAN.sections.map((item) => [item.index, item.label])));

export function initialFlow() {
  return {
    section: 1,
    highWater: 1,
    view: "stage-intro",
    parkedView: null,
    selectedPractice: null,
    pendingPractice: null,
    visitedKnowledge: [],
    seenSceneFamilies: [],
    stageCompleted: false
  };
}

export function stagePlan(day) {
  const item = FLOW_PLAN.stage_plan.find((entry) => entry.day === day);
  if (!item) throw new Error("Unknown stage");
  return item;
}

export function topicPlan(topic) {
  const item = FLOW_PLAN.topics.find((entry) => entry.id === topic);
  if (!item) throw new Error("Unknown topic");
  return item;
}

export function moveFlow(flow, section, view, extra = {}) {
  if (!Number.isInteger(section) || section < 1 || section > 6) throw new Error("Invalid section");
  return { ...flow, ...extra, section, highWater: Math.max(flow.highWater, section), view };
}

export function resetFlowForContext(flow) {
  return {
    ...initialFlow(),
    seenSceneFamilies: [...flow.seenSceneFamilies],
    view: "capacity"
  };
}

export function resetFlowForNextStage(flow) {
  return {
    ...initialFlow(),
    seenSceneFamilies: [...flow.seenSceneFamilies],
    view: "stage-intro"
  };
}

export function progressPercent(flow) {
  return Math.round(((Math.max(1, Math.min(6, flow.highWater)) - 1) / 5) * 100);
}

export function preferredSceneId(state) {
  const family = stagePlan(state.day).preferred_scene_family;
  return `S-${state.topic}-${family}-${state.perspective}`;
}

export function primaryKnowledgeId(state) {
  const focused = FLOW_PLAN.goal_focus[state.goal];
  if (Array.isArray(focused) && focused.length) return focused[0];
  const stage = stagePlan(state.day);
  if (stage.primary_knowledge !== "topic") return stage.primary_knowledge;
  return topicPlan(state.topic).entry_knowledge;
}

export function practiceChoices(state) {
  const plan = topicPlan(state.topic);
  const preferred = plan.preferred_private_by_goal[state.goal];
  const ordered = [];
  if (preferred) ordered.push(preferred);
  for (const id of plan.private_practices) if (!ordered.includes(id)) ordered.push(id);
  for (const id of plan.partner_practices) if (!ordered.includes(id)) ordered.push(id);
  for (const id of plan.agreement_practices) if (!ordered.includes(id)) ordered.push(id);
  return ordered;
}

export function prerequisiteFor(practiceId) {
  return FLOW_PLAN.practice_prerequisites[practiceId]?.[0] ?? null;
}

export function markKnowledgeVisited(flow, knowledgeId) {
  const visited = flow.visitedKnowledge.includes(knowledgeId)
    ? flow.visitedKnowledge
    : [...flow.visitedKnowledge, knowledgeId];
  return { ...flow, visitedKnowledge: visited };
}

export function markSceneSeen(flow, familyId) {
  const seen = flow.seenSceneFamilies.includes(familyId)
    ? flow.seenSceneFamilies
    : [...flow.seenSceneFamilies, familyId];
  return { ...flow, seenSceneFamilies: seen };
}

export function openLibrary(flow, currentView) {
  return { ...flow, parkedView: currentView, view: "library" };
}

export function returnFromLibrary(flow) {
  return { ...flow, view: flow.parkedView ?? "stage-intro", parkedView: null };
}

