import * as DATA from "./data.js";

const { QUESTIONS, VERSION, BANK_VERSION, PACKET_ID } = DATA;
export { VERSION };

export const KEY = "genii.personality-game.v4";
export const RESULT_VERSION = "genii-personality-game-v4";
export const MAPPING_VERSION = "v4-mapping-2026-09-19";
export const COPY_VERSION = "v4-copy-2026-09-19";

const QUESTION_BY_ID = new Map(QUESTIONS.map((q) => [q.id, q]));
const SPECIAL = new Set([
  "skip",
  "prefer_not",
  "no_recent_example",
  "no_example",
  "other_unscored",
  "other",
  "abstain",
  "not_enough_experience",
  "unsafe_to_answer",
  "capacity_not_comparable",
]);
const EXIT_LABELS = {
  skip: "Skipped",
  prefer_not: "Prefer not to answer",
  no_recent_example: "No recent example",
  no_example: "No example",
  other_unscored: "Other / depends",
  other: "Other",
  abstain: "Abstained",
  not_enough_experience: "Not enough experience",
  unsafe_to_answer: "Unsafe to answer",
  capacity_not_comparable: "Capacity not comparable",
};
const EXIT_VALUES = new Set(Object.keys(EXIT_LABELS));
const SUPPORT_TAGS = new Set([
  "support_preference",
  "tone",
  "boundary",
  "literal_goal",
  "finish_value",
]);
const WELLNESS_WORDS = /\b(sleep|food|hydration|exercise|movement|fitness|workout|body metrics|medical|clinical|diagnos|depression|therapy|wellness|health habit|routine score|diet)\b/i;
const FORMAL_TRAIT_WORDS = /\b(attachment style|HEXACO|Big Five|neurotic|avoidant|anxious attachment|diagnosis|disorder|percentile|trait score)\b/i;
const UNSUPPORTED_EMOTION_MOTIVE_WORDS = /\b(feels?|felt|afraid|fear|angry|jealous|envy|ashamed|insecure|because you fear|secret motive|attachment|avoidant|anxious|selfish|generous person|honest person|liar|deceptive)\b/i;

const MATCHED_CONTRAST_PARENTS = {
  "V4-010": "V4-005",
  "V4-016": "V4-011",
  "V4-022": "V4-021",
  "V4-028": "V4-027",
  "V4-032": "V4-031",
  "V4-040": "V4-039",
};
const FOLLOWUP_PARENTS = {
  "V4-006": "V4-005",
  "V4-014": "V4-013",
  "V4-018": "V4-017",
  "V4-020": "V4-019",
  "V4-030": "V4-029",
  "V4-036": "V4-035",
};
const HARD_DEPENDENCIES = { ...FOLLOWUP_PARENTS, ...MATCHED_CONTRAST_PARENTS };
const CONTEXT_FIELD_DEFS = {
  "V4-021": [
    { key: "relationship_object", label: "Who is this with?", values: ["close_friend", "newer_person", "partner_or_date", "family", "work_school", "other"] },
    { key: "safety_power_status", label: "Is directness safe here?", values: ["safe_equal", "some_power_gap", "unsafe_or_costly"] },
    { key: "counterparty_reliability", label: "How reliable are they usually?", values: ["usually_reliable", "mixed", "unreliable", "unknown"] },
    { key: "experience_route", label: "How much lived reference do you have?", values: ["recent_example", "familiar_pattern", "hypothetical_only"] },
  ],
  "V4-029": [
    { key: "requester_object", label: "Who asked?", values: ["close_person", "friend", "family", "work_school", "acquaintance", "other"] },
    { key: "cost_type", label: "What did it cost?", values: ["time", "energy", "money", "reputation", "emotional_labor", "mixed"] },
    { key: "capacity_status", label: "Capacity that day", values: ["had_capacity", "stretched", "at_capacity", "unknown"] },
    { key: "urgency_status", label: "Urgency", values: ["urgent", "soon", "not_urgent", "unclear"] },
    { key: "safety_power_status", label: "Safety/power context", values: ["safe_equal", "some_power_gap", "unsafe_or_costly"] },
    { key: "requester_reliability", label: "Requester reliability", values: ["usually_reliable", "mixed", "unreliable", "unknown"] },
  ],
  "V4-037": [
    { key: "target_role", label: "Who is affected?", values: ["peer", "close_person", "authority", "group", "other"] },
    { key: "safety_power_status", label: "Safety/power context", values: ["safe_equal", "some_power_gap", "unsafe_or_costly"] },
    { key: "disclosure_rules", label: "Disclosure rule", values: ["free_to_share", "partial_confidential", "explicit_obligation", "unclear"] },
  ],
};
const CONTEXT_REQUIRED_IDS = new Set(Object.keys(CONTEXT_FIELD_DEFS));
const BOUNDARY_OMISSIONS = {
  work_school: new Set(["V4-016", "V4-023", "V4-027", "V4-028"]),
};
const BOUNDARY_OPTION_OMISSIONS = {
  "V4-020": {
    dating: new Set(["B"]),
    family: new Set(["C"]),
    work_school: new Set(["D"]),
  },
};
const BOUNDARY_CONTEXT_OMISSIONS = {
  "V4-021": {
    relationship_object: {
      dating: new Set(["partner_or_date"]),
      family: new Set(["family"]),
      work_school: new Set(["work_school"]),
    },
  },
  "V4-029": {
    requester_object: {
      family: new Set(["family"]),
      work_school: new Set(["work_school"]),
    },
  },
};
const HELDOUT_TRANSFER_MAP = {
  "V4-H01": {
    version: "v4-heldout-transfer-explicit-pairs-2026-09-19",
    minimumSources: 2,
    optionMap: {
      A: [{ questionId: "V4-008", optionId: "D" }, { questionId: "V4-005", optionId: "A" }],
      B: [{ questionId: "V4-005", optionId: "C" }, { questionId: "V4-010", optionId: "A" }],
      C: [{ questionId: "V4-005", optionId: "B" }, { questionId: "V4-008", optionId: "A" }],
      D: [{ questionId: "V4-005", optionId: "D" }, { questionId: "V4-010", optionId: "D" }],
      E: [{ questionId: "V4-010", optionId: "B" }, { questionId: "V4-021", optionId: "D" }],
    },
  },
  "V4-H02": {
    version: "v4-heldout-transfer-explicit-pairs-2026-09-19",
    minimumSources: 2,
    optionMap: {
      A: [{ questionId: "V4-013", optionId: "D" }, { questionId: "V4-015", optionId: "C" }],
      B: [{ questionId: "V4-013", optionId: "B" }, { questionId: "V4-015", optionId: "A" }],
      C: [{ questionId: "V4-011", optionId: "E" }, { questionId: "V4-015", optionId: "E" }],
      D: [{ questionId: "V4-011", optionId: "D" }, { questionId: "V4-015", optionId: "B" }],
      E: [{ questionId: "V4-013", optionId: "A" }, { questionId: "V4-013", optionId: "C" }],
    },
  },
  "V4-H03": {
    version: "v4-heldout-transfer-explicit-pairs-2026-09-19",
    minimumSources: 2,
    optionMap: {
      A: [{ questionId: "V4-017", optionId: "B" }, { questionId: "V4-021", optionId: "A" }],
      B: [{ questionId: "V4-018", optionId: "C" }, { questionId: "V4-021", optionId: "C" }],
      C: [{ questionId: "V4-017", optionId: "E" }, { questionId: "V4-019", optionId: "C" }],
      D: [{ questionId: "V4-017", optionId: "A" }, { questionId: "V4-021", optionId: "D" }],
      E: [{ questionId: "V4-017", optionId: "D" }, { questionId: "V4-021", optionId: "E" }],
    },
  },
  "V4-H04": {
    version: "v4-heldout-transfer-explicit-pairs-2026-09-19",
    minimumSources: 2,
    optionMap: {
      A: [{ questionId: "V4-023", optionId: "A" }, { questionId: "V4-024", optionId: "A" }],
      B: [{ questionId: "V4-023", optionId: "B" }, { questionId: "V4-028", optionId: "A" }],
      C: [{ questionId: "V4-023", optionId: "C" }, { questionId: "V4-024", optionId: "D" }],
      D: [{ questionId: "V4-023", optionId: "D" }, { questionId: "V4-024", optionId: "E" }],
      E: [{ questionId: "V4-023", optionId: "E" }, { questionId: "V4-028", optionId: "B" }],
    },
  },
  "V4-H05": {
    version: "v4-heldout-transfer-explicit-pairs-2026-09-19",
    minimumSources: 2,
    optionMap: {
      A: [{ questionId: "V4-031", optionId: "A" }, { questionId: "V4-029", optionId: "A" }],
      B: [{ questionId: "V4-031", optionId: "B" }, { questionId: "V4-029", optionId: "B" }],
      C: [{ questionId: "V4-031", optionId: "C" }, { questionId: "V4-032", optionId: "C" }],
      D: [{ questionId: "V4-029", optionId: "C" }, { questionId: "V4-031", optionId: "D" }],
      E: [{ questionId: "V4-029", optionId: "D" }, { questionId: "V4-033", optionId: "B" }],
    },
  },
  "V4-H06": {
    version: "v4-heldout-transfer-explicit-pairs-2026-09-19",
    minimumSources: 1,
    optionMap: {
      A: [{ questionId: "V4-035", optionId: "A" }, { questionId: "V4-036", optionId: "A" }],
      B: [{ questionId: "V4-035", optionId: "B" }, { questionId: "V4-036", optionId: "B" }],
      C: [{ questionId: "V4-035", optionId: "C" }],
      D: [{ questionId: "V4-035", optionId: "D" }],
      E: [{ questionId: "V4-035", optionId: "E" }, { questionId: "V4-036", optionId: "D" }],
    },
  },
  "V4-H07": {
    version: "v4-heldout-transfer-explicit-pairs-2026-09-19",
    minimumSources: 1,
    optionMap: {
      A: [],
      B: [
        { questionId: "V4-037", optionId: "A" },
        { questionId: "V4-037", optionId: "B" },
      ],
      C: [{ questionId: "V4-037", optionId: "C" }],
      D: [{ questionId: "V4-037", optionId: "D" }],
      E: [{ questionId: "V4-037", optionId: "E" }],
    },
  },
  "V4-H08": {
    version: "v4-heldout-transfer-explicit-pairs-2026-09-19",
    minimumSources: 3,
    optionMap: {
      A: [{ questionId: "V4-041", optionId: "A" }, { questionId: "V4-043", optionId: "A" }],
      B: [{ questionId: "V4-041", optionId: "E" }, { questionId: "V4-002", optionId: "E" }],
      C: [{ questionId: "V4-041", optionId: "D" }, { questionId: "V4-044", optionId: "F" }],
      D: [{ questionId: "V4-041", optionId: "C" }, { questionId: "V4-043", optionId: "E" }],
      E: [{ questionId: "V4-041", optionId: "F" }, { questionId: "V4-043", optionId: "F" }, { questionId: "V4-042", optionId: "A" }],
    },
  },
};

export const CONTEXT_FIELDS = CONTEXT_FIELD_DEFS;
export const HELDOUT_TRANSFER_RULES = HELDOUT_TRANSFER_MAP;

const sourceAnswers = (value) =>
  value && value.answers && typeof value.answers === "object"
    ? value.answers
    : value;

function makeAttemptId() {
  try {
    if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  } catch {}
  return `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function questionFor(id) {
  return QUESTION_BY_ID.get(id);
}

function routeSlots() {
  return Array.isArray(DATA.ROUTE_SLOTS) && DATA.ROUTE_SLOTS.length
    ? DATA.ROUTE_SLOTS
    : QUESTIONS.map((q) => ({ id: q.id, candidates: [q.id] }));
}

export function fresh() {
  return {
    version: VERSION,
    attemptId: null,
    answers: {},
    notes: {},
    other: {},
    cursor: 0,
    started: false,
    locked: null,
    reviewed: false,
    testSeen: false,
    priorExposure: false,
    bindings: {},
    feedback: [],
    resultHistory: [],
    route: null,
  };
}

function answerValues(value) {
  if (Array.isArray(value)) return value.filter((item) => typeof item === "string");
  return typeof value === "string" ? [value] : [];
}

function sourceBindings(value) {
  return value && typeof value === "object" && !Array.isArray(value) && value.bindings && typeof value.bindings === "object"
    ? value.bindings
    : {};
}

function cloneBindings(bindings = {}) {
  const out = {};
  for (const [id, value] of Object.entries(bindings || {})) {
    if (value && typeof value === "object" && !Array.isArray(value)) out[id] = Object.fromEntries(Object.entries(value).map(([k, v]) => [k, String(v).slice(0, 120)]));
  }
  return out;
}

function contextRequirement(id) {
  return CONTEXT_FIELD_DEFS[id] || [];
}

function normalizeContextBinding(id, raw) {
  const fields = contextRequirement(id);
  if (!fields.length) return null;
  const source = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : null;
  if (!source) return null;
  const output = {};
  for (const field of fields) {
    const value = source[field.key];
    if (typeof value !== "string" || !field.values.includes(value)) return null;
    output[field.key] = value;
  }
  return output;
}

function validateContextBinding(id, raw, value) {
  if (!CONTEXT_REQUIRED_IDS.has(id) || isExitValue(value)) return null;
  return normalizeContextBinding(id, raw);
}

function displayContextValue(value) {
  return String(value || "").replaceAll("_", " ");
}

function bindingSummary(id, binding) {
  const fields = contextRequirement(id);
  if (!fields.length || !binding) return null;
  return fields.map((field) => `${field.label}: ${displayContextValue(binding[field.key])}`).join("; ");
}

function isExitValue(value) {
  if (Array.isArray(value)) return value.some((item) => EXIT_VALUES.has(item));
  return EXIT_VALUES.has(value);
}

export function selected(question, answers = {}) {
  if (!question || !answers) return undefined;
  const raw = sourceAnswers(answers)?.[question.id];
  if (raw === undefined || raw === null || isExitValue(raw)) return undefined;
  if (Array.isArray(raw)) {
    const options = raw
      .map((value) => question.options?.find((option) => option.id === value))
      .filter(Boolean);
    return options.length ? options : undefined;
  }
  return question.options?.find((option) => option.id === raw);
}

function selectedOptions(question, answers = {}) {
  const value = selected(question, answers);
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function facts(answers = {}) {
  const source = sourceAnswers(answers) || {};
  const output = {};
  for (const question of QUESTIONS.filter((q) => !q.test)) {
    const options = selectedOptions(question, source);
    for (const option of options) {
      for (const tag of option.tags || []) {
        if (question.id === "V4-001") output.resultStyle = tag.v;
        else if (question.id === "V4-002") output.toneBoundary = tag.v;
        else if (question.id === "V4-003") {
          output.topicBoundaries ||= [];
          output.topicBoundaries.push(tag.v);
        } else if (question.id === "V4-004") output.finishValue = tag.v;
        else if (["V4-041", "V4-042", "V4-043", "V4-044"].includes(question.id)) {
          output.supportPreferences ||= [];
          output.supportPreferences.push(tag.v);
        }
      }
    }
  }
  output.topicBoundaries = [...new Set(output.topicBoundaries || [])];
  output.supportPreferences = [...new Set(output.supportPreferences || [])];
  return output;
}

function hasAuthoredAnswer(source, id) {
  const value = source?.[id];
  return value !== undefined && !isExitValue(value);
}

function selectedBoundaryValues(source) {
  const question = questionFor("V4-003");
  return selectedOptions(question, source).flatMap((option) => (option.tags || []).map((tag) => tag.v)).filter(Boolean);
}

function boundaryOmissionReason(question, source) {
  for (const boundary of selectedBoundaryValues(source)) {
    if (BOUNDARY_OMISSIONS[boundary]?.has(question.id)) return `omitted_by_boundary_${boundary}`;
  }
  return null;
}

export function optionAvailable(questionId, optionId, answers = {}) {
  const rules = BOUNDARY_OPTION_OMISSIONS[questionId];
  if (!rules) return true;
  return !selectedBoundaryValues(sourceAnswers(answers) || {}).some(
    (boundary) => rules[boundary]?.has(optionId),
  );
}

export function contextValueAvailable(questionId, fieldKey, value, answers = {}) {
  const rules = BOUNDARY_CONTEXT_OMISSIONS[questionId]?.[fieldKey];
  if (!rules) return true;
  return !selectedBoundaryValues(sourceAnswers(answers) || {}).some(
    (boundary) => rules[boundary]?.has(value),
  );
}

function eligibilityValue(question, answerMap) {
  const source = sourceAnswers(answerMap) || {};
  const boundaryReason = question ? boundaryOmissionReason(question, source) : null;
  if (boundaryReason) return { ok: false, reason: boundaryReason };
  const hardParent = HARD_DEPENDENCIES[question?.id];
  if (hardParent && !hasAuthoredAnswer(source, hardParent)) {
    return { ok: false, reason: `requires_authored_${hardParent}` };
  }
  if (question?.dependsOn?.questionId) {
    const authored = hasAuthoredAnswer(source, question.dependsOn.questionId);
    if (question.dependsOn.authored && !authored) {
      return {
        ok: false,
        reason: `requires_authored_${question.dependsOn.questionId}`,
      };
    }
  }
  return { ok: true, reason: null };
}

export function applicable(question, answers = {}) {
  return !!eligibilityValue(question, sourceAnswers(answers)).ok;
}

function validValue(question, value) {
  if (!question) return false;
  if (typeof value === "string") {
    return (
      SPECIAL.has(value) ||
      question.options?.some((option) => option.id === value) ||
      question.exits?.some((exit) => exit.id === value)
    );
  }
  if (Array.isArray(value) && question.responseFormat === "multi_select") {
    if (!value.length) return false;
    const exits = value.filter((item) => SPECIAL.has(item));
    if (exits.length) return value.length === 1 && validValue(question, exits[0]);
    return value.every((item) => question.options?.some((option) => option.id === item));
  }
  return false;
}

function routeFor(answers = {}) {
  const source = sourceAnswers(answers) || {};
  const ids = [];
  const omitted = [];
  const replacements = [];
  for (const slot of routeSlots()) {
    let chosen = null;
    const candidates = Array.isArray(slot.candidates) ? slot.candidates : [];
    for (let i = 0; i < candidates.length; i += 1) {
      const q = questionFor(candidates[i]);
      if (!q) {
        omitted.push({ questionId: candidates[i], slotId: slot.id, reason: "unknown_candidate" });
        continue;
      }
      const result = eligibilityValue(q, source);
      if (result.ok) {
        chosen = q;
        if (i > 0) replacements.push({ slotId: slot.id, questionId: q.id });
        break;
      }
      omitted.push({ questionId: q.id, slotId: slot.id, reason: result.reason || "inapplicable" });
    }
    if (chosen) ids.push(chosen.id);
  }
  return { ids, omitted, replacements, total: routeSlots().length };
}

export function buildRoute(answers = {}) {
  return routeFor(answers);
}

export function routeQuestions(state) {
  return routeFor(state?.answers || {})
    .ids.map(questionFor)
    .filter(Boolean);
}

function routeTrainingIds(value) {
  return routeFor(sourceAnswers(value) || {}).ids.filter((id) => !questionFor(id)?.test);
}

function routeTestIds(value) {
  return routeFor(sourceAnswers(value) || {}).ids.filter((id) => questionFor(id)?.test);
}

function normalizedRole(question) {
  if (question?.test) return "heldout";
  return question?.meta?.evidence || "self_report";
}

function windowFor(question) {
  return question?.meta?.window || (question?.test ? "post_freeze_scenario" : "scenario");
}

function evidenceId(question, option, index) {
  return `${VERSION}:${question.id}:${option.id}:${index}`;
}

function exitReceiptId(question, value) {
  return `${VERSION}:${question.id}:${Array.isArray(value) ? value.join("+") : value}:exit`;
}

function tagSourceTag(tag) {
  return `${tag.d}:${tag.v}`;
}

function displayTarget(target) {
  if (typeof target !== "string") return target || null;
  return target.replace(/\s+as V4-[A-Z0-9-]+/g, "").replace(/^same\s+/i, "the same ");
}

export function observations(answers = {}) {
  const source = sourceAnswers(answers) || {};
  const bindings = sourceBindings(answers);
  const route = routeFor(source);
  const rows = [];
  for (const id of route.ids) {
    const question = questionFor(id);
    if (!question || question.test || !applicable(question, source)) continue;
    const raw = source[id];
    if (raw === undefined) continue;
    if (isExitValue(raw)) {
      const exitId = Array.isArray(raw) ? raw.find((item) => EXIT_VALUES.has(item)) : raw;
      rows.push({
        id: exitReceiptId(question, raw),
        kind: "missingness",
        missingness: exitId,
        question: question.id,
        questionId: question.id,
        optionId: exitId,
        questionTitle: question.title,
        answer: EXIT_LABELS[exitId] || exitId,
        why: EXIT_LABELS[exitId] || exitId,
        role: normalizedRole(question),
        window: windowFor(question),
        target: displayTarget(bindings[question.id]?.relationship_object || bindings[question.id]?.requester_object || bindings[question.id]?.target_role || question.meta?.target),
        linkedEventId: question.meta?.linkedEventId,
        version: VERSION,
        bankVersion: BANK_VERSION,
        mappingVersion: MAPPING_VERSION,
        source: question.meta?.source || PACKET_ID,
        sourceType: question.meta?.sourceType || null,
        time: question.meta?.timeframe || null,
        cost: bindingSummary(question.id, bindings[question.id]) || question.meta?.cost || null,
        context: bindings[question.id] || null,
        literalObservation: `${EXIT_LABELS[exitId] || exitId} for ${question.id}.`,
        supportedFacets: [],
        unsupportedInferences: question.meta?.notEvidenceFor || [],
      });
      continue;
    }
    for (const option of selectedOptions(question, source)) {
      for (const [i, tag] of (option.tags || []).entries()) {
        rows.push({
          id: evidenceId(question, option, i),
          kind: "evidence",
          d: tag.d,
          v: tag.v,
          sourceTag: tagSourceTag(tag),
          section: tag.section || "pattern",
          target: displayTarget(bindings[question.id]?.relationship_object || bindings[question.id]?.requester_object || bindings[question.id]?.target_role || question.meta?.target || tag.target),
          question: question.id,
          questionId: question.id,
          optionId: option.id,
          questionTitle: question.title,
          answer: option.text,
          why: option.why || option.text,
          role: normalizedRole(question),
          window: windowFor(question),
          linkedEventId: question.meta?.linkedEventId,
          version: VERSION,
          bankVersion: BANK_VERSION,
          mappingVersion: MAPPING_VERSION,
          source: question.meta?.source || PACKET_ID,
          sourceType: question.meta?.sourceType || null,
          time: question.meta?.timeframe || null,
          cost: bindingSummary(question.id, bindings[question.id]) || question.meta?.cost || null,
          context: bindings[question.id] || null,
          literalObservation: bindings[question.id]
            ? `${option.neutralMeaning || option.text} Context captured: ${bindingSummary(question.id, bindings[question.id])}.`
            : option.neutralMeaning || option.text,
          supportedFacets: [tag.d],
          unsupportedInferences: question.meta?.notEvidenceFor || [],
          claimLimit: option.claimLimit || question.meta?.claimLimit || "Literal answer only.",
        });
      }
    }
  }
  return rows;
}

export function evidence(answers = {}) {
  return observations(answers).filter((row) => row.kind === "evidence" && row.d);
}

function sourceUnit(row) {
  return row.linkedEventId && row.linkedEventId !== "not_applicable"
    ? row.linkedEventId
    : row.questionId;
}

export function profile(answers = {}) {
  const groups = new Map();
  for (const row of evidence(answers)) {
    if (row.section === "heldout") continue;
    const key = `${row.section}|${row.d}`;
    const group = groups.get(key) || {
      section: row.section,
      d: row.d,
      counts: {},
      rows: [],
      sourceUnits: new Set(),
    };
    group.counts[row.v] = (group.counts[row.v] || 0) + 1;
    group.rows.push(row);
    group.sourceUnits.add(sourceUnit(row));
    groups.set(key, group);
  }
  return [...groups.values()].map((group) => {
    const ranked = Object.entries(group.counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    const n = group.sourceUnits.size;
    const top = ranked[0]?.[0] || null;
    const ratio = ranked[0] ? ranked[0][1] / Math.max(1, group.rows.length) : 0;
    let status = "Missing evidence";
    if (n === 1) status = "Thin evidence";
    else if (n >= 2 && ratio < 0.55) status = "Mixed evidence";
    else if (n >= 2) status = "Repeated pattern";
    return {
      section: group.section,
      d: group.d,
      counts: group.counts,
      rows: group.rows,
      n,
      top,
      ratio,
      contradictory: ranked.slice(1).map(([value, count]) => ({ value, count })),
      status,
    };
  });
}

export function trainingAnswers(answers = {}) {
  const source = sourceAnswers(answers) || {};
  const output = {};
  for (const id of routeTrainingIds(source)) {
    const value = source[id];
    if (value !== undefined && validValue(questionFor(id), value)) output[id] = structuredClone(value);
  }
  return output;
}

export function signature(answers = {}) {
  const source = sourceAnswers(answers) || {};
  const bindings = sourceBindings(answers);
  return JSON.stringify(routeTrainingIds(source).map((id) => [id, source[id] ?? null, bindings[id] || null]));
}

function sourceOptionRows(answers, sourceIds) {
  const rows = [];
  const source = sourceAnswers(answers) || {};
  for (const id of sourceIds) {
    const question = questionFor(id);
    const value = source[id];
    if (!question || value === undefined || isExitValue(value)) continue;
    for (const option of selectedOptions(question, source)) rows.push({ questionId: id, optionId: option.id, text: option.text, pair: `${id}:${option.id}` });
  }
  return rows;
}

export function predict(question, answers = {}) {
  if (!question || !question.test) throw new Error("predict requires a heldout question");
  const rule = HELDOUT_TRANSFER_MAP[question.id];
  const baseline = question.baseline || question.meta?.heldoutMetadata?.fixed_baseline?.option_id || question.options?.[0]?.id || null;
  if (!rule) {
    return { question: question.id, option: null, reason: "No versioned transfer rule", sources: [], scores: [], baseline, heuristic: "No transfer rule.", frozenBeforeQuestion: true };
  }
  const sourceIds = [...new Set(Object.values(rule.optionMap || {}).flat().map((pair) => pair.questionId))];
  const rows = sourceOptionRows(answers, sourceIds);
  const answeredPairs = new Set(rows.map((row) => row.pair));
  const distinct = new Set(rows.map((row) => row.questionId));
  const minimumSources = rule.minimumSources ?? 2;
  const scored = question.options.map((option) => {
    const mappedPairs = rule.optionMap[option.id] || [];
    const matches = mappedPairs.filter((pair) => answeredPairs.has(`${pair.questionId}:${pair.optionId}`));
    return {
      id: option.id,
      score: matches.length,
      sources: [...new Set(matches.map((pair) => pair.questionId))],
      parts: matches.map((pair) => ({ sourceQuestion: pair.questionId, sourceOption: pair.optionId, score: 1 })),
      mappedPairs: mappedPairs.map((pair) => `${pair.questionId}:${pair.optionId}`),
    };
  }).sort((a, b) => b.score - a.score);
  const winner = scored[0];
  const runner = scored[1];
  const tied = !!runner && winner.score > 0 && winner.score === runner.score;
  const enough = distinct.size >= minimumSources && (winner?.score || 0) > 0;
  const option = enough && !tied ? winner.id : null;
  return {
    question: question.id,
    option,
    reason: !enough
      ? "Too few explicit pre-freeze source pairs for this transfer rule"
      : tied
        ? `Abstained because explicit source pairs tied under ${rule.version}`
        : `Selected by explicit source pairs under ${rule.version}`,
    sources: option ? winner.sources : [],
    eligibleSources: rows.map((row) => `${row.questionId}:${row.optionId}`),
    scores: scored,
    baseline,
    transferVersion: rule.version,
    heuristic: "Explicit authored question:option transfer pairs; ties abstain; scores are counts, not probabilities.",
    frozenBeforeQuestion: true,
  };
}
function normalizeTraining(input) {
  const source = sourceAnswers(input) || {};
  const output = {};
  for (const id of routeTrainingIds(source)) {
    const q = questionFor(id);
    const value = source[id];
    if (value === undefined) throw new Error(`Incomplete training answer: ${id}`);
    if (!validValue(q, value)) throw new Error(`Invalid answer: ${id}`);
    output[id] = structuredClone(value);
  }
  return output;
}

function trainingDone(state) {
  return routeTrainingIds(state).every((id) => Object.hasOwn(state?.answers || {}, id));
}

export function freeze(input) {
  const source = sourceAnswers(input) || {};
  const rawBindings = sourceBindings(input);
  const training = normalizeTraining(source);
  const contextBindings = {};
  for (const id of routeTrainingIds(training)) {
    if (CONTEXT_REQUIRED_IDS.has(id) && hasAuthoredAnswer(training, id)) {
      const normalized = normalizeContextBinding(id, rawBindings[id]);
      if (!normalized) throw new Error(`Missing context binding: ${id}`);
      contextBindings[id] = normalized;
    }
  }
  const trainingPacket = { answers: training, bindings: contextBindings };
  const route = routeFor({ ...source, ...training });
  const tests = route.ids.filter((id) => questionFor(id)?.test).map(questionFor);
  const priorExposure = !!(
    input &&
    typeof input === "object" &&
    (Object.hasOwn(input, "priorExposure") ? input.priorExposure : input.locked?.priorExposure ?? input.testSeen)
  );
  const profileRows = profile(trainingPacket);
  const obs = observations(trainingPacket);
  return {
    version: VERSION,
    resultVersion: RESULT_VERSION,
    questionBankVersion: BANK_VERSION,
    mappingVersion: MAPPING_VERSION,
    copyVersion: COPY_VERSION,
    packetId: PACKET_ID,
    signature: signature(trainingPacket),
    training,
    bindings: contextBindings,
    route,
    profile: profileRows,
    facts: facts(training),
    observations: obs,
    evidenceReceipts: receiptRows(obs.filter((row) => row.kind === "evidence")),
    predictions: tests.map((question) => predict(question, training)),
    priorExposure,
    profileCutoff: new Date().toISOString(),
    frozenAt: new Date().toISOString(),
  };
}

function literalSupportFields(source) {
  const out = [];
  for (const qid of ["V4-001", "V4-002", "V4-004", "V4-041", "V4-042", "V4-043", "V4-044"]) {
    const question = questionFor(qid);
    const options = selectedOptions(question, source);
    for (const option of options) {
      out.push({ questionId: qid, optionId: option.id, text: option.text, construct: question?.meta?.construct || "literal preference" });
    }
  }
  return out;
}

function rowsBySection(source) {
  const sections = new Map();
  for (const row of evidence(source)) {
    if (row.section === "heldout") continue;
    const key = row.section || "pattern";
    if (!sections.has(key)) sections.set(key, []);
    sections.get(key).push(row);
  }
  return sections;
}

function receiptRows(rows) {
  return rows.map((row) => ({
    evidenceId: row.id,
    questionId: row.questionId,
    optionId: row.optionId,
    questionText: row.questionTitle,
    optionText: row.answer,
    sourceRole: row.role,
    window: row.window,
    target: row.target,
    literalObservation: row.literalObservation || row.answer,
    supportedFacets: row.supportedFacets || (row.d ? [row.d] : []),
    unsupportedInferences: row.unsupportedInferences || [],
    linkedEventId: row.linkedEventId,
    mappingVersion: row.mappingVersion || MAPPING_VERSION,
    sourceType: row.sourceType,
    timeframe: row.time,
    cost: row.cost,
    claimLimit: row.claimLimit,
    context: row.context ? structuredClone(row.context) : null,
  }));
}

function substantiveRows(source) {
  return evidence(source).filter((row) => {
    const question = questionFor(row.questionId);
    if (!question || question.test) return false;
    if (row.linkedEventId === "not_applicable") return false;
    if (question.chapter === 1 || question.chapter === 8) return false;
    if (row.section === "context" || row.section === "support") return false;
    if (row.d === "support_preference" || SUPPORT_TAGS.has(row.d)) return false;
    return true;
  });
}

function substantiveModule(row) {
  const question = questionFor(row.questionId);
  return question ? `chapter:${question.chapter}` : "chapter:unknown";
}

const ARCHETYPE_DEFINITIONS = [
  {
    id: "velvet-clipboard",
    publicName: "Velvet Clipboard",
    spicyHook: "Warmth is available; the paperwork still matters.",
    priority: 10,
    gates: [
      { questionId: "V4-005", options: ["B"] },
      { questionId: "V4-009", options: ["B", "C"] },
      { questionId: "V4-029", options: ["B"] },
      { questionId: "V4-031", options: ["B", "D", "E"] },
      { questionId: "V4-032", options: ["B", "D", "E"] },
    ],
  },
  {
    id: "composed-firecracker",
    publicName: "Composed Firecracker",
    spicyHook: "The outside can stay laminated while the inside files a spicy incident report.",
    priority: 20,
    gates: [
      { questionId: "V4-011", options: ["B", "C", "E"] },
      { questionId: "V4-012", options: ["A", "D"] },
      { questionId: "V4-015", options: ["B", "C", "E"] },
      { questionId: "V4-038", options: ["C", "D", "E"] },
      { questionId: "V4-017", options: ["D"] },
    ],
  },
  {
    id: "boundary-bouncer",
    publicName: "Boundary Bouncer",
    spicyHook: "Access is possible. Terms and conditions are also possible.",
    priority: 30,
    gates: [
      { questionId: "V4-027", options: ["B", "C", "D", "E"] },
      { questionId: "V4-029", options: ["B", "D", "E"] },
      { questionId: "V4-031", options: ["B", "D", "E"] },
      { questionId: "V4-033", options: ["B", "D", "E"] },
      { questionId: "V4-037", options: ["B", "C"] },
    ],
  },
  {
    id: "quiet-cartographer",
    publicName: "Quiet Cartographer",
    spicyHook: "You do not always chase the signal; sometimes you map the exits first.",
    priority: 40,
    gates: [
      { questionId: "V4-017", options: ["C", "D", "E"] },
      { questionId: "V4-019", options: ["C", "D", "E"] },
      { questionId: "V4-021", options: ["C", "D", "E"] },
      { questionId: "V4-022", options: ["C", "D", "E"] },
      { questionId: "V4-020", options: ["E", "F"] },
      { questionId: "V4-033", options: ["E"] },
    ],
  },
  {
    id: "spotlight-strategist",
    publicName: "Spotlight Strategist",
    spicyHook: "You can share the stage, but you are absolutely tracking the lighting plot.",
    priority: 50,
    gates: [
      { questionId: "V4-008", options: ["B", "C", "D", "E"] },
      { questionId: "V4-010", options: ["C", "D", "E"] },
      { questionId: "V4-026", options: ["A", "B", "E"] },
      { questionId: "V4-039", options: ["A", "D", "E"] },
      { questionId: "V4-040", options: ["A", "E"] },
    ],
  },
  {
    id: "choice-lawyer",
    publicName: "Choice Lawyer",
    spicyHook: "If someone hands you a rule, your first instinct is to inspect the fine print for an actual choice.",
    priority: 60,
    gates: [
      { questionId: "V4-023", options: ["A", "B", "C", "D"] },
      { questionId: "V4-024", options: ["A", "B", "D", "E"] },
      { questionId: "V4-025", options: ["A", "D", "E"] },
      { questionId: "V4-027", options: ["B", "C", "D"] },
      { questionId: "V4-028", options: ["A", "B", "C", "D"] },
    ],
  },
];

function contextBoundaryFromRows(rows) {
  const byEvent = new Map();
  for (const row of rows) {
    if (!MATCHED_CONTRAST_PARENTS[row.questionId]) continue;
    if (!row.linkedEventId || row.linkedEventId === "not_applicable") continue;
    const set = byEvent.get(row.linkedEventId) || new Set();
    set.add(`${row.questionId}:${row.optionId}:${row.target || "target"}`);
    byEvent.set(row.linkedEventId, set);
  }
  const matched = [...byEvent.entries()].find(([, set]) => set.size >= 1);
  if (matched) return { type: "matched_contrast", eventId: matched[0] };
  const targets = new Set(rows.map((row) => row.target).filter(Boolean));
  if (targets.size >= 2) return { type: "target_shift", targets: [...targets].slice(0, 3) };
  return null;
}

function strengthLabel(distinctSources, contextBoundary, contradictions) {
  if (distinctSources <= 0) return "Unknown";
  if (distinctSources < 3) return "Glimpse";
  if (contextBoundary && contradictions) return "Split-mode";
  if (contextBoundary) return "Signature";
  return "Shape";
}

function chooseArchetype(source, groups) {
  const rows = substantiveRows(source);
  const units = new Set(rows.map(sourceUnit));
  const modules = new Set(rows.map(substantiveModule));
  const boundary = contextBoundaryFromRows(rows);
  const mixed = groups.some((group) => group.status === "Mixed evidence" && group.section !== "support" && group.section !== "context");
  const strength = strengthLabel(units.size, boundary, mixed);
  const fallback = {
    id: units.size ? "sharp-glimpse" : "still-mysterious",
    publicName: units.size ? "Sharp Glimpse" : "Still Mysterious",
    spicyHook: units.size ? "A first glimpse, not a whole prophecy." : "Still mysterious. Annoying for me, valid for you.",
    strength: units.size ? "Glimpse" : "Unknown",
    sparseFallback: units.size ? "You gave me a sparkler, not a bonfire. I can point at the glint; I will not pretend it is a full constellation." : "You escaped the mirror with style. I have boundaries, exits, and preferences — not enough behavior to roast safely.",
    boundary,
    matchedRows: rows.slice(0, 2),
  };
  if (units.size < 3 || modules.size < 2) return fallback;

  const candidates = ARCHETYPE_DEFINITIONS.map((definition) => {
    const matchedRows = rows.filter((row) => definition.gates.some((gate) => gate.questionId === row.questionId && gate.options.includes(row.optionId)));
    return {
      ...definition,
      matchedRows,
      units: new Set(matchedRows.map(sourceUnit)),
      modules: new Set(matchedRows.map(substantiveModule)),
    };
  }).filter((candidate) => candidate.units.size >= 3 && candidate.modules.size >= 2);

  if (!candidates.length) return fallback;
  candidates.sort((a, b) => b.units.size - a.units.size || b.modules.size - a.modules.size || a.priority - b.priority || a.id.localeCompare(b.id));
  return {
    ...candidates[0],
    strength,
    sparseFallback: "A first portrait with the receipt drawer closed until you ask.",
    boundary,
  };
}

function formatSourceCount(count) {
  return count === 1 ? "one scene" : `${count} scenes`;
}

function sectionResult(rows, section, textFactory) {
  if (!rows.length) return null;
  const ordered = rows.slice().sort((a, b) => a.questionId.localeCompare(b.questionId));
  const sourceCount = new Set(ordered.map(sourceUnit)).size;
  const first = ordered[0];
  const limits = first.unsupportedInferences?.slice(0, 3).join(", ") || "motive and whole-person certainty";
  return {
    text: textFactory({ rows: ordered, first, sourceCount, sourceWord: formatSourceCount(sourceCount) }),
    limit: `Evidence boundary: ${limits} stay unclaimed.`,
    evidenceIds: ordered.map((row) => row.id),
    observations: ordered,
  };
}

function isPatternRow(row) {
  const question = questionFor(row.questionId);
  return row.section === "pattern" && row.linkedEventId !== "not_applicable" && question?.chapter !== 8 && !SUPPORT_TAGS.has(row.d);
}

function desireRows(source) {
  return evidence(source).filter((row) => row.section === "desire" && row.d === "yes-with-friction condition" && row.v === "wanted_noticed");
}

function supportRows(source) {
  const literalIds = new Set(literalSupportFields(source).map((field) => `${VERSION}:${field.questionId}:${field.optionId}:0`));
  return evidence(source).filter((row) => row.section === "support" || row.section === "context" || literalIds.has(row.id));
}

const MESSY_ACTION_COPY = {
  "V4-008:D": "waiting for a pattern before you act can look calm, but it can also let the receipt folder get weirdly thick.",
  "V4-010:E": "keeping a backup plan is useful; the messy version is quietly designing the sequel while everyone else thinks the first movie is still fine.",
  "V4-017:D": "stepping back protects dignity; the messy version is making people pass an invisible re-entry exam.",
  "V4-019:D": "drafting and holding a reply creates control; the messy version is turning one message into a courtroom exhibit.",
  "V4-029:E": "not responding avoids a messy yes; the messy version is making silence carry the whole boundary.",
  "V4-033:E": "civil distance keeps things clean; the messy version is a velvet rope with plausible deniability.",
  "V4-038:E": "tracking a pattern is smart; the messy version is giving one subtle jab a subscription plan.",
  "V4-039:D": "using the advantage once and recording why is disciplined; the messy version is notarizing your own loophole.",
};

function darkSideSection(source) {
  const row = substantiveRows(source).find((item) => MESSY_ACTION_COPY[`${item.questionId}:${item.optionId}`]);
  if (!row) return null;
  return {
    id: "section:dark-side",
    key: "dark_side",
    title: "Bounded dark-side roast",
    text: `The messy version: ${MESSY_ACTION_COPY[`${row.questionId}:${row.optionId}`]}`,
    limit: `Receipt link: ${row.questionId}/${row.optionId}. This joke stops at the selected behavior; motive and morality stay off-limits.`,
    evidenceIds: [row.id],
    observations: [row],
  };
}

function buildSections(source) {
  const rows = evidence(source).filter((row) => row.section !== "heldout");
  const actionRows = rows.filter((row) => row.section === "action" && row.d !== "value");
  const emotionRows = rows.filter((row) => row.section === "emotion" && ["emotion_expression", "emotion_trigger"].includes(row.d));
  const patternRows = rows.filter(isPatternRow);
  const patternUnits = new Set(patternRows.map(sourceUnit));
  const valueRows = rows.filter((row) => row.d === "value" && (row.section === "value" || row.section === "action"));
  const directDesireRows = desireRows(source);
  const literalSupportRows = supportRows(source);
  const sections = [];

  const action = sectionResult(actionRows, "action", ({ first }) => `First move: “${first.answer}.” Your default is not pure chaos; you pick a lane before the room gets to narrate you.`);
  if (action) sections.push({ id: "section:action", key: "action", title: "First-move choreography", ...action });

  const emotion = sectionResult(emotionRows, "emotion", ({ first }) => `Inside/outside split: “${first.answer}.” The face, the spark, and the recovery clock are separate buttons — I only press the ones you actually selected.`);
  if (emotion) sections.push({ id: "section:emotion", key: "emotion", title: "Room-temperature control", ...emotion });

  if (patternUnits.size >= 2) {
    const buckets = new Map();
    for (const row of patternRows) {
      const key = `${row.d}|${row.v}`;
      const list = buckets.get(key) || [];
      list.push(row);
      buckets.set(key, list);
    }
    const bounded = [...buckets.values()].find((list) => new Set(list.map(sourceUnit)).size >= 2);
    if (bounded) {
      const pattern = sectionResult(bounded, "pattern", ({ first }) => `Repeat behavior: “${first.answer}.” This is the part of the movie where Genii circles a habit in glitter pen.`);
      if (pattern) sections.push({ id: "section:pattern", key: "pattern", title: "Glitter-pen repeat", ...pattern });
    }
  }

  const value = sectionResult(valueRows, "value", ({ first }) => `Protected thing: “${first.answer}.” This is the value you put on the table in that scene, not a halo or a criminal record.`);
  if (value) sections.push({ id: "section:value", key: "value", title: "What you guard", ...value });

  const desire = sectionResult(directDesireRows, "desire", ({ first }) => `Want line: “${first.answer}.” Small neon sign, not a full autobiography.`);
  if (desire) sections.push({ id: "section:desire", key: "desire", title: "Tiny neon want", ...desire });

  const support = sectionResult(literalSupportRows, "support", ({ first }) => `Handle-with-care line: “${first.answer}.” If someone wants to be useful to you, they should start there.`);
  if (support) sections.push({ id: "section:support", key: "support", title: "How to handle me", ...support });

  const dark = darkSideSection(source);
  if (dark) sections.push(dark);
  return sections;
}

function unknownsFor(source, sections) {
  const answeredSections = new Set(sections.map((section) => section.key));
  const output = [];
  if (!answeredSections.has("emotion")) output.push("emotions: unknown unless a direct inside/outside emotion pair was answered");
  if (!answeredSections.has("value")) output.push("values: unknown until a motive/value row is directly selected");
  if (!answeredSections.has("desire")) output.push("desires: omitted unless a direct want or goal was selected");
  output.push("fears: unknown in this build unless a question asks fear directly");
  const missingRows = observations(source).filter((item) => item.kind === "missingness");
  if (missingRows.length) output.push(`${missingRows.length} skipped, exit, or unscored answer${missingRows.length === 1 ? "" : "s"} stayed private/missing instead of becoming trait evidence`);
  return output.slice(0, 5);
}

function thesisFor(archetype, sections, source) {
  const action = sections.find((section) => section.key === "action");
  const value = sections.find((section) => section.key === "value");
  const rows = substantiveRows(source).filter((row) => row.d !== "value");
  if (!action) {
    return "You slipped through the mirror with excellent boundary work. I have a few preference crumbs, but not enough behavioral cake to serve a full personality slice.";
  }
  const boundaryRows = archetype.boundary?.eventId ? rows.filter((row) => row.linkedEventId === archetype.boundary.eventId) : rows;
  const first = boundaryRows[0] || action.observations[0];
  const second =
    boundaryRows.find((row) => row.id !== first?.id && row.section !== "emotion" && (row.target !== first?.target || row.questionId !== first?.questionId)) ||
    rows.find((row) => row.id !== first?.id && row.section !== "emotion") ||
    rows.find((row) => row.id !== first?.id);
  const context = first?.target || first?.questionTitle || "a high-stakes scene";
  const response = first?.answer || action.observations[0]?.answer;
  const motive = value ? `while protecting “${value.observations[0]?.answer}”` : "while the motive is still unknown";
  const boundaryClause = second ? ` But when the context shifts toward ${second.target || second.questionTitle}, you chose “${second.answer}.”` : " The boundary is still provisional because I only have a narrow context shift.";
  return `When ${context} puts a cost on your next move, you tend to choose “${response},” ${motive}.${boundaryClause} The thesis: your personality read lives in the switch — what changes when the target, stakes, or room rules change.`;
}

function claimFromSection(section, portraitId) {
  return {
    id: `claim:${section.key}`,
    portraitId,
    text: section.text,
    lesson: section.limit,
    dimension: section.key,
    target: section.observations[0]?.target || "recorded target",
    scope: section.observations[0]?.time || section.observations[0]?.window || "recorded scenario",
    confidence: new Set(section.observations.map(sourceUnit)).size >= 2 ? "medium" : "low",
    evidenceStatus: section.observations.some((row) => row.role === "actual_event") ? "self_reported_event" : "authored_scenario",
    alternativeExplanations: [
      "The answer may reflect this scene's costs rather than a stable global pattern.",
      "Unasked motives, recovery time, and private context remain unknown unless directly answered.",
    ],
    nextValidation: "Use a future real example to test whether this mode repeats with a different target and cost.",
    evidenceIds: section.evidenceIds,
    observations: section.observations,
  };
}

function buildShareCards(result) {
  const cards = [];
  const sectionCards = (result.sections || [])
    .filter((section) => section.evidenceIds?.length && section.key !== "dark_side")
    .slice(0, 2)
    .map((section) => ({
      title: section.title,
      line: section.text,
      evidenceIds: section.evidenceIds.slice(0, 4),
      source: "audited_claim",
    }));
  cards.push(...sectionCards);
  const support = (result.literalSupportFields || [])[0];
  if (support) {
    cards.push({
      title: "Handle me like this",
      line: `Start with: “${support.text}.”`,
      evidenceIds: [`${VERSION}:${support.questionId}:${support.optionId}:0`],
      source: "literal_field",
    });
  }
  if (!cards.length) {
    cards.push({
      title: "Mirror dodger",
      line: "I skipped enough that Genii refused to invent lore. Honestly iconic.",
      evidenceIds: [],
      source: "low_evidence_exit",
    });
  }
  return cards.slice(0, 3);
}

function auditClauses(portrait) {
  const clauses = [];
  const receiptById = new Map((portrait.receipts || []).map((row) => [row.evidenceId, row]));
  const sectionById = new Map((portrait.sections || []).map((section) => [section.id, section]));
  const normalizeText = (text) => String(text || "").toLowerCase().replace(/[“”]/g, '"');
  const add = (id, text, evidenceIds, type = "bounded_interpretation") => {
    const ids = evidenceIds || [];
    const receipts = ids.map((eid) => receiptById.get(eid)).filter(Boolean);
    const unsupported = type !== "unknown" && (!ids.length || receipts.length !== ids.length);
    const textNorm = normalizeText(text);
    const citedOptionLiteral = receipts.length ? receipts.some((row) => textNorm.includes(normalizeText(row.optionText))) : type === "unknown";
    const badPlaceholder = /recorded (relationship object|requester object|target context)|context_capture|same .* as v4-/i.test(text);
    const missingContext = receipts.some((row) => CONTEXT_REQUIRED_IDS.has(row.questionId) && !row.context);
    const blockedUnsupported = type !== "unknown" && UNSUPPORTED_EMOTION_MOTIVE_WORDS.test(text) && !receipts.some((row) => row.supportedFacets?.includes("emotion_expression") || row.questionId === "V4-006" || row.questionId === "V4-014" || row.questionId === "V4-024" || row.questionId === "V4-030" || row.questionId === "V4-036");
    const sourceUnits = new Set(receipts.map((row) => row.linkedEventId && row.linkedEventId !== "not_applicable" ? row.linkedEventId : row.questionId));
    const section = sectionById.get(id);
    const thresholdFailed = section?.key === "pattern" && sourceUnits.size < 2;
    const literalFailed = type === "literal" && receipts.length && !citedOptionLiteral;
    const blocked = unsupported || WELLNESS_WORDS.test(text) || FORMAL_TRAIT_WORDS.test(text) || badPlaceholder || missingContext || blockedUnsupported || thresholdFailed || literalFailed;
    clauses.push({
      clauseId: id,
      renderedText: text,
      claimType: type,
      evidenceIds: ids,
      citedOptions: receipts.map((row) => ({ questionId: row.questionId, optionId: row.optionId, optionText: row.optionText, context: row.context || null })),
      sourceUnitCount: sourceUnits.size,
      entailment: blocked ? "unsupported" : type === "literal" ? "direct" : "inferred_from_gate",
      verdict: blocked ? "block" : "pass",
    });
  };
  const portraitEvidence = portrait.sections.flatMap((s) => s.evidenceIds);
  const emptyUnknown = portraitEvidence.length === 0 && portrait.strength === "Unknown";
  add("archetype-hook", portrait.spicyHook, portraitEvidence.slice(0, 4), emptyUnknown ? "unknown" : "joke");
  add("thesis", portrait.thesis, portraitEvidence.slice(0, 8), emptyUnknown ? "unknown" : "bounded_interpretation");
  for (const section of portrait.sections) add(section.id, section.text, section.evidenceIds, section.key === "support" || section.key === "desire" ? "literal" : "bounded_interpretation");
  for (const [i, unknown] of portrait.unknowns.entries()) add(`unknown:${i}`, unknown, [], "unknown");
  return clauses;
}

export function auditRenderedClausesForTest(portraitLike) {
  return auditClauses(portraitLike);
}

export function portrait(state) {
  const source = state?.locked ? { answers: state.locked.training || {}, bindings: state.locked.bindings || {} } : { answers: state?.answers || {}, bindings: state?.bindings || {} };
  const heldoutsResolved = !!state?.locked && routeTestIds(state).every((id) => Object.hasOwn(state?.answers || {}, id));
  const groups = state?.locked?.profile || profile(source);
  const archetype = chooseArchetype(source, groups);
  const sections = buildSections(source);
  const portraitId = `portrait:${state?.locked?.signature || signature(source)}`;
  const unknowns = unknownsFor(source, sections);
  const thesis = thesisFor(archetype, sections, source);
  const claims = sections.map((section) => claimFromSection(section, portraitId));
  const receipts = receiptRows(evidence(source));
  const result = {
    id: portraitId,
    version: RESULT_VERSION,
    questionBankVersion: BANK_VERSION,
    mappingVersion: MAPPING_VERSION,
    copyVersion: COPY_VERSION,
    packetId: PACKET_ID,
    title: archetype.publicName,
    titleLead: archetype.publicName.split(",")[0],
    titleEmphasis: archetype.strength,
    publicName: archetype.publicName,
    spicyHook: archetype.spicyHook,
    strength: archetype.strength,
    summary: `${archetype.spicyHook} ${archetype.strength === "Unknown" ? archetype.sparseFallback : "The receipt drawer exists, but the headline gets to be fun first."}`,
    thesis,
    teachingTone: facts(source).toneBoundary || "receipts-first",
    shareSummary: `${archetype.publicName}: ${archetype.spicyHook}`,
    shareCards: [],
    cta: "Bring one real future scene back later if you want to see whether the mode switch repeats.",
    sections,
    claims,
    groups,
    domains: [],
    emotions: sections.filter((section) => section.key === "emotion"),
    facts: facts(source),
    literalSupportFields: literalSupportFields(source),
    receipts,
    evidenceReceipts: receipts,
    unknowns,
    corrections: Array.isArray(state?.feedback) ? state.feedback : [],
    heldoutStats: heldoutsResolved ? stats(state) : null,
  };
  result.shareCards = buildShareCards(result);
  result.clauseAudit = auditClauses(result);
  result.auditPassed = result.clauseAudit.every((clause) => clause.verdict === "pass");
  return result;
}

function clearTests(state) {
  for (const q of QUESTIONS.filter((item) => item.test)) {
    delete state.answers[q.id];
    delete state.notes[q.id];
    delete state.bindings[q.id];
    delete state.other[q.id];
  }
  state.locked = null;
}

function invalidateContext(state) {
  const route = routeFor(state.answers);
  for (const q of QUESTIONS) {
    if (Object.hasOwn(state.answers, q.id) && !route.ids.includes(q.id)) {
      delete state.answers[q.id];
      delete state.notes[q.id];
      delete state.bindings[q.id];
      delete state.other[q.id];
    }
  }
  state.route = route;
  clearTests(state);
}

function clearBoundaryConflicts(state) {
  let changed = false;
  for (const [questionId, value] of Object.entries(state.answers || {})) {
    const selectedValues = answerValues(value);
    const blockedAnswer = selectedValues.some(
      (optionId) => !isExitValue(optionId) && !optionAvailable(questionId, optionId, state.answers),
    );
    const blockedContext = Object.entries(state.bindings?.[questionId] || {}).some(
      ([fieldKey, fieldValue]) =>
        !contextValueAvailable(questionId, fieldKey, fieldValue, state.answers),
    );
    if (!blockedAnswer && !blockedContext) continue;
    delete state.answers[questionId];
    delete state.notes[questionId];
    delete state.bindings[questionId];
    delete state.other[questionId];
    changed = true;
  }
  return changed;
}

export function setAnswer(state, id, value, meta = {}) {
  if (!state || !state.answers || !state.notes || !state.bindings || !state.other) throw new Error("Invalid state");
  const question = questionFor(id);
  if (!question || !validValue(question, value)) throw new Error("Invalid answer");
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) throw new Error("Invalid answer metadata");
  if (meta.note !== undefined && typeof meta.note !== "string") throw new Error("Invalid note");
  if ((value === "other" || value === "other_unscored") && typeof meta.otherText !== "string") throw new Error("Other text required");
  const normalizedBinding = validateContextBinding(id, meta.bindings, value);
  if (CONTEXT_REQUIRED_IDS.has(id) && !isExitValue(value) && !normalizedBinding) throw new Error(`Context fields required for ${id}`);
  if (answerValues(value).some((optionId) => !isExitValue(optionId) && !optionAvailable(id, optionId, state.answers))) {
    throw new Error("Answer is blocked by the respondent's topic boundary");
  }
  if (normalizedBinding && Object.entries(normalizedBinding).some(([fieldKey, fieldValue]) => !contextValueAvailable(id, fieldKey, fieldValue, state.answers))) {
    throw new Error("Context is blocked by the respondent's topic boundary");
  }
  if (!routeFor(state.answers).ids.includes(id)) throw new Error("Question is not on the current route");
  if (question.test) {
    if (!state.locked) throw new Error("Predictions must be locked first");
    if (Object.hasOwn(state.answers, id)) throw new Error("Test answers are final for this attempt");
  }
  const prior = state.answers[id];
  if (!question.test && JSON.stringify(prior) !== JSON.stringify(value)) {
    if (state.locked) state.resultHistory.push(state.locked);
    if (state.locked || state.testSeen) state.reviewed = true;
    clearTests(state);
  }
  state.answers[id] = Array.isArray(value) ? [...value] : value;
  state.started = true;
  state.attemptId ||= makeAttemptId();
  if (meta.note !== undefined) state.notes[id] = meta.note.slice(0, 1200);
  else delete state.notes[id];
  if (value === "other" || value === "other_unscored") state.other[id] = meta.otherText.slice(0, 1200);
  else delete state.other[id];
  if (normalizedBinding) state.bindings[id] = normalizedBinding;
  else delete state.bindings[id];
  if (id === "V4-003") {
    clearBoundaryConflicts(state);
    invalidateContext(state);
  } else if (prior !== value && QUESTIONS.some((candidate) => candidate.dependsOn?.questionId === id)) {
    invalidateContext(state);
  }
  state.route = routeFor(state.answers);
  const pos = state.route.ids.indexOf(id);
  state.cursor = pos >= 0 ? Math.min(state.route.ids.length, pos + 1) : Math.min(state.cursor, state.route.ids.length);
  return state;
}

function validRaw(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw) || raw.version !== VERSION) return false;
  if (raw.answers !== undefined && (!raw.answers || typeof raw.answers !== "object" || Array.isArray(raw.answers))) return false;
  for (const [id, value] of Object.entries(raw.answers || {})) if (!validValue(questionFor(id), value)) return false;
  return true;
}

function safeObservation(row) {
  if (!row || typeof row !== "object") return null;
  const output = {};
  for (const key of [
    "id",
    "kind",
    "d",
    "v",
    "sourceTag",
    "section",
    "target",
    "question",
    "questionId",
    "optionId",
    "questionTitle",
    "answer",
    "why",
    "role",
    "window",
    "linkedEventId",
    "version",
    "bankVersion",
    "mappingVersion",
    "source",
    "sourceType",
    "time",
    "cost",
    "literalObservation",
    "claimLimit",
    "missingness",
  ]) {
    if (typeof row[key] === "string" || row[key] === null) output[key] = typeof row[key] === "string" ? row[key].slice(0, 1600) : null;
  }
  if (row.context && typeof row.context === "object" && !Array.isArray(row.context)) output.context = cloneBindings({ context: row.context }).context;
  if (Array.isArray(row.supportedFacets)) output.supportedFacets = row.supportedFacets.filter((item) => typeof item === "string").slice(0, 20);
  if (Array.isArray(row.unsupportedInferences)) output.unsupportedInferences = row.unsupportedInferences.filter((item) => typeof item === "string").slice(0, 50);
  return output;
}

function validFrozenSnapshot(item) {
  if (!item || typeof item !== "object" || item.version !== VERSION || typeof item.signature !== "string") return null;
  try {
    const training = normalizeTraining(item.training);
    const bindings = cloneBindings(item.bindings || {});
    if (signature({ answers: training, bindings }) !== item.signature) return null;
    const snapshot = freeze({ answers: training, bindings, priorExposure: item.priorExposure === true });
    return {
      ...snapshot,
      frozenAt: typeof item.frozenAt === "string" ? item.frozenAt.slice(0, 80) : snapshot.frozenAt,
      profileCutoff: typeof item.profileCutoff === "string" ? item.profileCutoff.slice(0, 80) : snapshot.profileCutoff,
    };
  } catch {
    return null;
  }
}

function safeFeedback(item) {
  if (!item || typeof item !== "object" || typeof item.claimId !== "string" || typeof item.value !== "boolean") return null;
  return {
    id: typeof item.id === "string" ? item.id.slice(0, 160) : `feedback:${item.claimId}`,
    correctionId: typeof item.correctionId === "string" ? item.correctionId.slice(0, 160) : undefined,
    claimId: item.claimId.slice(0, 160),
    value: item.value,
    endorsement: item.value,
    reason: typeof item.reason === "string" ? item.reason.slice(0, 1200) : null,
    resultVersion: typeof item.resultVersion === "string" ? item.resultVersion : RESULT_VERSION,
    resultId: typeof item.resultId === "string" ? item.resultId : null,
    claim: item.claim && typeof item.claim === "object" ? structuredClone(item.claim) : null,
    evidenceSnapshot: Array.isArray(item.evidenceSnapshot) ? item.evidenceSnapshot.map(safeObservation).filter(Boolean) : [],
    createdAt: typeof item.createdAt === "string" ? item.createdAt : null,
  };
}

function feedbackForSnapshots(items, snapshots) {
  const validSnapshots = snapshots.map(validFrozenSnapshot).filter(Boolean);
  const candidates = validSnapshots.map((snapshot) => {
    const state = { locked: snapshot, answers: snapshot.training, feedback: [] };
    const snapPortrait = portrait(state);
    return { snapshot, id: snapPortrait.id, claims: snapPortrait.claims };
  });
  const output = [];
  for (const raw of items) {
    const item = safeFeedback(raw);
    if (!item) continue;
    const match = candidates.find((candidate) => candidate.claims.some((claim) => claim.id === item.claimId) && (!item.resultId || item.resultId === candidate.id));
    if (!match) continue;
    const claim = match.claims.find((candidate) => candidate.id === item.claimId);
    output.push({
      id: item.id,
      correctionId: item.correctionId || item.id,
      claimId: claim.id,
      value: item.value,
      endorsement: item.value,
      reason: item.reason,
      resultVersion: RESULT_VERSION,
      resultId: match.id,
      claim: structuredClone(claim),
      evidenceSnapshot: structuredClone(claim.observations),
      createdAt: item.createdAt,
    });
  }
  return output;
}

export function restore(raw) {
  let parsed;
  try {
    parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch {
    return fresh();
  }
  if (!validRaw(parsed)) return fresh();
  const state = fresh();
  state.attemptId = typeof parsed.attemptId === "string" ? parsed.attemptId : null;
  state.started = parsed.started === true;
  state.cursor = Number.isInteger(parsed.cursor) ? Math.max(0, parsed.cursor) : 0;
  state.testSeen = parsed.testSeen === true;
  state.reviewed = parsed.reviewed === true;
  for (const q of QUESTIONS) if (Object.hasOwn(parsed.answers || {}, q.id)) state.answers[q.id] = structuredClone(parsed.answers[q.id]);
  for (const [id, note] of Object.entries(parsed.notes || {})) if (Object.hasOwn(state.answers, id) && typeof note === "string") state.notes[id] = note.slice(0, 1200);
  for (const [id, text] of Object.entries(parsed.other || {})) if ((state.answers[id] === "other" || state.answers[id] === "other_unscored") && typeof text === "string") state.other[id] = text.slice(0, 1200);
  for (const [id, binding] of Object.entries(parsed.bindings || {})) {
    if (Object.hasOwn(state.answers, id)) {
      const normalized = normalizeContextBinding(id, binding);
      if (normalized) state.bindings[id] = normalized;
    }
  }
  state.route = routeFor(state.answers);
  for (const q of QUESTIONS) if (Object.hasOwn(state.answers, q.id) && !state.route.ids.includes(q.id)) {
    delete state.answers[q.id];
    delete state.notes[q.id];
    delete state.other[q.id];
    delete state.bindings[q.id];
  }
  state.resultHistory = Array.isArray(parsed.resultHistory) ? parsed.resultHistory.map(validFrozenSnapshot).filter(Boolean) : [];
  const parsedPriorExposure = typeof parsed.locked?.priorExposure === "boolean" ? parsed.locked.priorExposure : false;
  state.priorExposure = parsedPriorExposure;
  if (trainingDone(state) && parsed.locked?.signature === signature({ answers: state.answers, bindings: state.bindings })) state.locked = freeze({ ...state, priorExposure: parsedPriorExposure });
  else clearTests(state);
  state.feedback = Array.isArray(parsed.feedback) ? feedbackForSnapshots(parsed.feedback, [state.locked, ...state.resultHistory]) : [];
  state.cursor = Math.min(state.cursor, state.route?.ids?.length || 0);
  return state;
}

export function reviewClaim(state, claimId, value, reason = null) {
  if (!state?.locked || typeof claimId !== "string" || typeof value !== "boolean") throw new Error("Invalid claim review");
  const snapshot = portrait(state);
  const claim = snapshot.claims.find((item) => item.id === claimId);
  if (!claim) throw new Error("Unknown claim");
  if (!Array.isArray(state.feedback)) state.feedback = [];
  const index = state.feedback.length + 1;
  state.feedback.push({
    id: `feedback:${index}`,
    correctionId: `correction:${index}`,
    attemptId: state.attemptId || null,
    resultVersion: RESULT_VERSION,
    portraitId: snapshot.id,
    resultId: snapshot.id,
    claimId,
    claimTextSnapshot: claim.text,
    evidenceIdsSnapshot: claim.evidenceIds.slice(),
    value,
    endorsement: value,
    reason: typeof reason === "string" ? reason.slice(0, 1200) : null,
    claim: structuredClone(claim),
    evidenceSnapshot: structuredClone(claim.observations),
    createdAt: new Date().toISOString(),
    recordedAt: new Date().toISOString(),
  });
  return state;
}

export function stats(state) {
  if (!state?.locked) return null;
  const trials = routeTestIds(state).map((id) => {
    const question = questionFor(id);
    const prediction = state.locked.predictions.find((item) => item.question === id) || predict(question, state.locked.training);
    const raw = state.answers?.[id];
    const option = typeof raw === "string" ? question.options?.find((item) => item.id === raw) : null;
    const skipped = raw === "skip" || raw === "prefer_not";
    const abstained = raw === "abstain";
    const other = raw === "other" || raw === "other_unscored";
    const unscored = skipped || abstained || other || raw === "no_recent_example" || raw === "no_example";
    const answered = !!option && !unscored;
    return {
      ...prediction,
      actual: answered ? option.id : null,
      skipped,
      abstained,
      other,
      unscored,
      unresolved: raw === undefined,
      eligible: true,
      hit: answered && prediction.option === option.id,
      baselineHit: answered && prediction.baseline === option.id,
    };
  });
  const answered = trials.filter((trial) => trial.actual);
  const predicted = answered.filter((trial) => trial.option);
  return {
    trials,
    eligible: trials.length,
    answered: answered.length,
    predictedAttempted: predicted.length,
    attempted: predicted.length,
    skipped: trials.filter((trial) => trial.skipped).length,
    abstained: trials.filter((trial) => trial.abstained).length,
    other: trials.filter((trial) => trial.other).length,
    unscored: trials.filter((trial) => trial.unscored).length,
    unresolved: trials.filter((trial) => trial.unresolved).length,
    predicted: predicted.length,
    predictionAbstentions: answered.length - predicted.length,
    hits: predicted.filter((trial) => trial.hit).length,
    baselineHits: predicted.filter((trial) => trial.baselineHit).length,
    baselineAll: answered.filter((trial) => trial.baselineHit).length,
    frozenProfileSignature: state.locked.signature,
    profileCutoff: state.locked.profileCutoff,
  };
}

export function label(value, dimension) {
  if (!value) return "No repeated direction";
  return String(value)
    .replaceAll("_", " ")
    .replace(/^./, (char) => char.toUpperCase()) + (dimension ? "" : "");
}

export function identity(groups = []) {
  const repeated = groups.filter((group) => group.status === "Repeated pattern");
  if (!repeated.length) return { title: "Still getting to know you", line: "There is not enough repeated evidence for a strong headline yet." };
  return { title: "A pattern in progress", line: `Repeated evidence appears across ${new Set(repeated.map((group) => group.d)).size} facets; context and contradictions stay visible.` };
}

export function exportAttempt(state) {
  const locked = state?.locked;
  const evaluation = locked ? stats(state) : null;
  const activeRoute = buildRoute(state?.answers || {});
  const activeIds = new Set(activeRoute.ids);
  const resolved = !!locked && routeTestIds(state).every((id) => Object.hasOwn(state.answers || {}, id));
  const safeAnswers = Object.fromEntries(
    Object.entries(state?.answers || {}).filter(([id, value]) => activeIds.has(id) && questionFor(id) && validValue(questionFor(id), value)),
  );
  const base = {
    version: VERSION,
    resultVersion: RESULT_VERSION,
    engine: KEY,
    attemptId: state?.attemptId || null,
    questionBankVersion: BANK_VERSION,
    mappingVersion: MAPPING_VERSION,
    copyVersion: COPY_VERSION,
    route: activeRoute,
    facts: locked?.facts || facts(safeAnswers),
    evidence: locked?.observations || observations(safeAnswers),
    observations: locked?.observations || observations(safeAnswers),
    evidenceReceipts: locked?.evidenceReceipts || receiptRows(evidence(safeAnswers)),
    profile: locked?.profile || profile(safeAnswers),
    portrait: portrait(state || fresh()),
    answers: safeAnswers,
    trainingAnswers: trainingAnswers(safeAnswers),
    contextBindings: Object.fromEntries(Object.entries(state?.bindings || {}).filter(([id]) => activeIds.has(id))),
    testAnswers: Object.fromEntries(routeTestIds(state || { answers: safeAnswers }).map((id) => [id, safeAnswers[id] ?? null])),
    other: Object.fromEntries(Object.entries(state?.other || {}).filter(([id]) => safeAnswers[id] === "other" || safeAnswers[id] === "other_unscored")),
    notes: Object.fromEntries(Object.entries(state?.notes || {}).filter(([id, value]) => activeIds.has(id) && typeof value === "string").map(([id, value]) => [id, value.slice(0, 1200)])),
    claimReviews: Array.isArray(state?.feedback) ? feedbackForSnapshots(state.feedback, [locked, ...(state.resultHistory || [])]) : [],
    attempt: {
      started: state?.started === true,
      testSeen: state?.testSeen === true,
      reviewed: state?.reviewed === true,
      priorExposure: locked?.priorExposure === true,
      evaluationContext: locked?.priorExposure === true ? "practice_after_prior_exposure" : "first_exposure",
    },
    provenance: {
      source: "local frozen pre-heldout profile evidence",
      packetId: PACKET_ID,
      bankVersion: VERSION,
      questionBankVersion: BANK_VERSION,
      mappingVersion: MAPPING_VERSION,
      copyVersion: COPY_VERSION,
      routeSlots: activeRoute.total,
      trainingQuestions: routeTrainingIds(state || { answers: safeAnswers }).length,
      heldoutQuestions: routeTestIds(state || { answers: safeAnswers }).length,
      omissionReasons: activeRoute.omitted,
      freezeProof: locked
        ? {
            signature: locked.signature,
            profileCutoff: locked.profileCutoff,
            frozenAt: locked.frozenAt,
          }
        : null,
    },
    disclaimer: "This is a local personality-game evidence summary, not a diagnosis, probability claim, or validated personality type.",
  };
  if (!locked) {
    return {
      ...base,
      heldoutsResolved: false,
      predictions: null,
      evaluation: null,
      unscoredNotes: ["Training is incomplete or has not been frozen."],
    };
  }
  if (!resolved) {
    return {
      ...base,
      heldoutsResolved: false,
      predictions: routeTestIds(state).map((id) => ({ question: id, status: "hidden until all sealed checks are resolved" })),
      evaluation: null,
      unscoredNotes: ["Heldout options and scores remain hidden until all terminal questions are resolved."],
    };
  }
  return {
    ...base,
    heldoutsResolved: true,
    predictions: locked.predictions.map((prediction) => ({
      question: prediction.question,
      option: prediction.option,
      reason: prediction.reason,
      sources: prediction.sources,
      scores: prediction.scores,
      baseline: prediction.baseline,
    })),
    evaluation,
    stats: evaluation,
    unscoredNotes: ["Heldout checks are method-evaluation P only; they are excluded from the frozen portrait."],
  };
}
