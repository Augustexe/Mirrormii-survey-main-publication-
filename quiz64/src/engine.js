import * as DATA from "./data.js";

const { QUESTIONS, DIMS, VERSION } = DATA;
export { VERSION };

export const KEY = "genii.switch-modes.v3";
const QUESTION_BY_ID = new Map(QUESTIONS.map((q) => [q.id, q]));
const CLOSE_VALUES = new Set(["mother", "father", "partner", "friend", "none"]);
const SPECIAL = new Set(["other", "skip", "no_example"]);
const FAMILY_NAMES = [
  "frustration",
  "worry",
  "disappointment",
  "embarrassment",
  "guilt",
  "joy",
  "relief",
];

const routeSlots = () =>
  Array.isArray(DATA.ROUTE_SLOTS) && DATA.ROUTE_SLOTS.length
    ? DATA.ROUTE_SLOTS
    : QUESTIONS.map((q) => ({ id: q.id, candidates: [q.id] }));
const measureDefs = () =>
  DATA.MEASURES && typeof DATA.MEASURES === "object" ? DATA.MEASURES : {};
const questionFor = (id) => QUESTION_BY_ID.get(id);
const trainingQuestions = () => QUESTIONS.filter((q) => !q.test);
const testQuestions = () => QUESTIONS.filter((q) => q.test);

function makeAttemptId() {
  try {
    if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  } catch {}
  return `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
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

export function selected(question, answers = {}) {
  if (!question || !answers || SPECIAL.has(answers[question.id]))
    return undefined;
  return question.options?.find((option) => option.id === answers[question.id]);
}
const sourceAnswers = (value) =>
  value && value.answers && typeof value.answers === "object"
    ? value.answers
    : value;

export function facts(answers = {}) {
  const source = sourceAnswers(answers) || {};
  const output = {};
  for (const question of trainingQuestions()) {
    const value = selected(question, source)?.facts;
    if (value && typeof value === "object") Object.assign(output, value);
  }
  return output;
}

export function targetName(target, fact = {}) {
  if (target === "close") return `chosen ${fact.close || "close person"}`;
  if (target === "household")
    return `household (${fact.household || "unspecified"})`;
  return target || "general";
}

function eligibilityValue(question, answerMap) {
  const source = sourceAnswers(answerMap) || {};
  if (question?.dependsOn?.questionId) {
    const parent = source[question.dependsOn.questionId];
    const authored = parent !== undefined && !SPECIAL.has(parent);
    if (question.dependsOn.authored && !authored)
      return {
        ok: false,
        reason: `requires_authored_${question.dependsOn.questionId}`,
      };
  }
  if (!question?.applicable) return { ok: true, reason: null };
  const f = facts(source);
  if (typeof question.applicable === "string") {
    if (question.applicable === "close")
      return {
        ok: ["mother", "father", "partner", "friend"].includes(f.close),
        reason: "requires_selected_close_person",
      };
    if (question.applicable === "shared")
      return {
        ok: f.household === "shared" || f.household === "family",
        reason: "requires_shared_household",
      };
    return { ok: true, reason: null };
  }
  if (typeof question.applicable === "object") {
    const value = f[question.applicable.fact];
    return {
      ok:
        value !== undefined &&
        Array.isArray(question.applicable.values) &&
        question.applicable.values.includes(value),
      reason: `requires_${question.applicable.fact}`,
    };
  }
  return { ok: true, reason: null };
}
export function applicable(question, answers = {}) {
  return !!eligibilityValue(question, sourceAnswers(answers)).ok;
}

function contextKey(answers = {}) {
  const f = facts(sourceAnswers(answers));
  return { close: f.close || null, household: f.household || null };
}
function bindingFor(question, answers) {
  if (!question?.applicable) return undefined;
  const context = contextKey(answers);
  if (question.applicable === "close" || question.applicable?.fact === "close")
    return { close: context.close };
  if (
    question.applicable === "shared" ||
    question.applicable?.fact === "household"
  )
    return { household: context.household };
  if (typeof question.applicable === "object" && question.applicable.fact)
    return {
      [question.applicable.fact]:
        facts(answers)[question.applicable.fact] ?? null,
    };
  return context;
}
function validValue(question, value) {
  return (
    !!question &&
    (SPECIAL.has(value) ||
      !!question.options?.some((option) => option.id === value))
  );
}

function routeFor(answers = {}) {
  const source = sourceAnswers(answers) || {};
  const ids = [];
  const omitted = [];
  const replacements = [];
  for (const slot of routeSlots()) {
    const candidates = Array.isArray(slot.candidates) ? slot.candidates : [];
    let chosen;
    for (let i = 0; i < candidates.length; i += 1) {
      const q = questionFor(candidates[i]);
      if (!q) {
        omitted.push({
          questionId: candidates[i],
          slotId: slot.id,
          reason: "unknown_candidate",
        });
        continue;
      }
      const result = eligibilityValue(q, source);
      if (result.ok) {
        chosen = q;
        if (i > 0) replacements.push({ slotId: slot.id, questionId: q.id });
        break;
      }
      omitted.push({
        questionId: q.id,
        slotId: slot.id,
        reason: result.reason || "inapplicable",
      });
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
function slotForQuestion(id) {
  return routeSlots().find((slot) => slot.candidates.includes(id));
}
function routeTrainingIds(value) {
  return routeFor(sourceAnswers(value) || {}).ids.filter(
    (id) => !questionFor(id)?.test,
  );
}
function routeTestIds(value) {
  return routeFor(sourceAnswers(value) || {}).ids.filter(
    (id) => questionFor(id)?.test,
  );
}

function normalizedRole(question) {
  if (question?.meta?.evidence) return question.meta.evidence;
  if (question?.role === "actual") return "actual_event";
  if (question?.role === "hypothetical" || question?.role === "holdout")
    return "hypothetical";
  return "self_report";
}
function windowFor(question) {
  return (
    question?.meta?.window ??
    (question?.role === "actual"
      ? "latest_instance_past_month"
      : question?.role === "context"
        ? "past_month"
        : "scenario")
  );
}
function evidenceId(question, option, index) {
  return `${VERSION}:${question.id}:${option.id}:${index}`;
}
function tagKey(tag, f) {
  return `${tag.d}|${targetName(tag.target, f)}|${tag.v}`;
}

export function observations(answers = {}) {
  const source = sourceAnswers(answers) || {};
  const route = routeFor(source);
  const rows = [];
  for (const id of route.ids) {
    const question = questionFor(id);
    if (!question || question.test || !applicable(question, source)) continue;
    const option = selected(question, source);
    if (!option) continue;
    const f = facts(source);
    const seen = new Set();
    for (const [i, tag] of (option.tags || []).entries()) {
      const key = tagKey(tag, f);
      if (seen.has(key)) continue;
      seen.add(key);
      rows.push({
        id: evidenceId(question, option, i),
        d: tag.d,
        v: tag.v,
        target: targetName(tag.target, f),
        question: question.id,
        questionId: question.id,
        optionId: option.id,
        questionTitle: question.title,
        answer: option.text,
        why: option.why,
        role: normalizedRole(question),
        window: windowFor(question),
        version: VERSION,
        source: question.meta?.source || question.id,
        reaction: option.reaction || null,
        measure: null,
        signal: null,
      });
    }
    for (const [i, measure] of (option.measures || []).entries())
      rows.push({
        id: evidenceId(question, option, `measure-${i}`),
        question: question.id,
        questionId: question.id,
        optionId: option.id,
        role: normalizedRole(question),
        window: windowFor(question),
        version: VERSION,
        measure: { ...measure },
        signal: null,
        source: question.meta?.source || question.id,
      });
    for (const [i, signal] of (option.signals || []).entries())
      rows.push({
        id: evidenceId(question, option, `signal-${i}`),
        question: question.id,
        questionId: question.id,
        optionId: option.id,
        role: normalizedRole(question),
        window: windowFor(question),
        version: VERSION,
        signal: { ...signal },
        measure: null,
        source: question.meta?.source || question.id,
      });
  }
  return rows;
}
export function evidence(answers = {}) {
  return observations(answers).filter((row) => row.d);
}

export function profile(answers = {}) {
  const groups = new Map();
  for (const row of evidence(answers)) {
    const key = `${row.d}|${row.target}`;
    const group = groups.get(key) || {
      d: row.d,
      target: row.target,
      counts: {},
      rows: [],
    };
    group.counts[row.v] = (group.counts[row.v] || 0) + 1;
    group.rows.push(row);
    groups.set(key, group);
  }
  return [...groups.values()].map((group) => {
    const ranked = Object.entries(group.counts).sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
    );
    const n = new Set(group.rows.map((row) => row.question)).size;
    const total = group.rows.length;
    const top = ranked[0]?.[0] || null;
    const ratio = ranked[0] ? ranked[0][1] / total : 0;
    let status = "Missing evidence";
    if (n > 0 && n < 2) status = "Thin evidence";
    else if (n >= 2 && ratio < 2 / 3) status = "Mixed evidence";
    else if (n >= 2) status = "Repeated pattern";
    return {
      d: group.d,
      target: group.target,
      counts: group.counts,
      rows: group.rows,
      n,
      top: status === "Repeated pattern" ? top : null,
      ratio,
      contradictory: ranked
        .slice(1)
        .map(([value, count]) => ({ value, count })),
      status,
    };
  });
}
export function trainingAnswers(answers = {}) {
  const source = sourceAnswers(answers) || {};
  const output = {};
  for (const id of routeTrainingIds(source))
    if (Object.hasOwn(source, id) && validValue(questionFor(id), source[id]))
      output[id] = source[id];
  return output;
}
export function signature(answers = {}) {
  const source = sourceAnswers(answers) || {};
  return JSON.stringify(
    routeTrainingIds(source).map((id) => [id, source[id] ?? null]),
  );
}
function authoredDomain(d) {
  return new Set(
    QUESTIONS.flatMap((q) =>
      q.options.flatMap((o) =>
        (o.tags || []).filter((t) => t.d === d).map((t) => t.v),
      ),
    ),
  );
}

export function predict(question, answers = {}) {
  if (!question || !question.test)
    throw new Error("predict requires a heldout question");
  const rows = evidence(answers);
  const f = facts(sourceAnswers(answers) || {});
  const scored = question.options
    .map((option) => {
      const seen = new Set();
      const parts = [];
      for (const tag of option.tags || []) {
        const resolved = targetName(tag.target, f);
        const key = `${tag.d}|${resolved}|${tag.v}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const relevant = rows.filter(
          (row) => row.d === tag.d && row.target === resolved,
        );
        const matching = relevant.filter((row) => row.v === tag.v);
        const domainSize = Math.max(1, authoredDomain(tag.d).size);
        const score = relevant.length
          ? (matching.length + 1) / (relevant.length + domainSize)
          : 0;
        parts.push({
          d: tag.d,
          target: resolved,
          value: tag.v,
          score,
          sources: [...new Set(matching.map((row) => row.question))],
          relevantSources: [...new Set(relevant.map((row) => row.question))],
        });
      }
      return {
        id: option.id,
        score: parts.length
          ? parts.reduce((sum, part) => sum + part.score, 0) / parts.length
          : 0,
        parts,
      };
    })
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  const winner = scored[0],
    runner = scored[1];
  const sources = [
    ...new Set(winner?.parts.flatMap((part) => part.sources) || []),
  ];
  const tied =
    !!runner && Math.abs((winner?.score || 0) - runner.score) < 0.025;
  const enough = sources.length >= 2;
  return {
    question: question.id,
    option: enough && !tied ? winner.id : null,
    reason: !enough
      ? "Too few distinct matching source questions supporting the leading option"
      : tied
        ? "No clear lead between options"
        : "Highest exact evidence match",
    sources,
    scores: scored,
    baseline: question.baseline,
    heuristic: "Smoothed evidence ranking; scores are not probabilities.",
  };
}

function normalizeTraining(input) {
  const source = sourceAnswers(input) || {};
  const output = {};
  for (const id of routeTrainingIds(source)) {
    const q = questionFor(id);
    const value = source[id];
    if (value === undefined)
      throw new Error(`Incomplete training answer: ${id}`);
    if (!validValue(q, value)) throw new Error(`Invalid answer: ${id}`);
    output[id] = value;
  }
  return output;
}
function trainingDone(state) {
  return routeTrainingIds(state).every((id) =>
    Object.hasOwn(state?.answers || {}, id),
  );
}
export function freeze(input) {
  const source = sourceAnswers(input) || {};
  const training = normalizeTraining(source);
  const route = routeFor({ ...source, ...training });
  const tests = route.ids
    .filter((id) => questionFor(id)?.test)
    .map(questionFor);
  const priorExposure = !!(
    input &&
    typeof input === "object" &&
    (Object.hasOwn(input, "priorExposure")
      ? input.priorExposure
      : (input.locked?.priorExposure ?? input.testSeen))
  );
  return {
    version: VERSION,
    signature: signature(training),
    training,
    route,
    profile: profile(training),
    facts: facts(training),
    observations: observations(training),
    predictions: tests.map((question) => predict(question, training)),
    priorExposure,
    frozenAt: new Date().toISOString(),
  };
}

function claimConfidence(rows) {
  const n = new Set(rows.map((row) => row.questionId || row.question)).size;
  return n >= 3 ? "high" : n >= 2 ? "medium" : n ? "low" : "missing";
}
function measureRecords(source) {
  const rows = observations(source);
  const defs = measureDefs();
  const out = new Map();
  for (const row of rows)
    if (
      row.measure?.id &&
      (row.window === "past_month" || row.window === "last_7_days")
    ) {
      const def = defs[row.measure.id] || {};
      const existing = out.get(row.measure.id) || {
        id: row.measure.id,
        label: def.label || row.measure.id,
        low: def.low ?? null,
        high: def.high ?? null,
        min: def.min ?? null,
        max: def.max ?? null,
        unit: def.unit || "ordinal",
        description: def.description || "",
        usual: null,
        recent: null,
        confidence: "missing",
        evidenceIds: [],
      };
      const period = row.window === "last_7_days" ? "recent" : "usual";
      existing[period] = {
        value: row.measure.value,
        label: row.measure.label || String(row.measure.value),
        sourceIds: [...(existing[period]?.sourceIds || []), row.id],
      };
      existing.evidenceIds.push(row.id);
      existing.confidence = claimConfidence(
        rows.filter(
          (item) =>
            item.measure?.id === row.measure.id &&
            (item.window === "past_month" || item.window === "last_7_days"),
        ),
      );
      out.set(row.measure.id, existing);
    }
  return [...out.values()];
}
function claimBehavior(value, dimension) {
  const authored = {
    D14a: {
      early: "keep an earlier sleep rhythm",
      middle: "keep a middle sleep rhythm",
      late: "keep a later sleep rhythm",
      variable: "work with a variable sleep rhythm",
      protect: "protect sleep",
      delay: "delay sleep",
      adjust: "adjust the sleep plan",
    },
    D14b: {
      home: "eat from home",
      occasional: "keep takeaway occasional",
      frequent: "use takeaway frequently",
      default: "make takeaway the default",
      planned: "follow the meal plan",
      bounded: "adapt within a food boundary",
      delay: "delay eating",
    },
    D14c: {
      none: "have no movement days",
      occasional: "move occasionally",
      regular: "move regularly",
      frequent: "move frequently",
    },
    D14d: {
      rest: "prioritize recovery",
      obligation: "prioritize obligations",
      connection: "coordinate shared workload",
      bounded: "offer bounded help",
    },
  };
  return (
    authored[dimension]?.[value] ||
    String(label(value, dimension)).replace(/^./, (char) => char.toLowerCase())
  );
}
const answerRecord = (source, id) => {
  const question = questionFor(id);
  const option = selected(question, source);
  if (!question || !option) return null;
  return { question, option };
};

function teachingTone(source) {
  return (
    {
      feedback_gentle: "understanding",
      feedback_direct: "direct",
      feedback_playful: "funny",
      feedback_permission_first: "permission-first",
    }[facts(source).feedbackTone] || "understanding"
  );
}

function linkedClaim(source, ids, config) {
  const records = ids.map((id) => answerRecord(source, id));
  if (records.some((record) => !record)) return null;
  const allowedDimensions = config.rowDimensions || [config.dimension];
  const allRows = observations(source).filter(
    (row) =>
      ids.includes(row.questionId) &&
      row.d &&
      allowedDimensions.includes(row.d),
  );
  if (new Set(allRows.map((row) => row.questionId)).size !== ids.length)
    return null;
  return {
    id: config.id,
    text: config.text(records),
    lesson: config.lesson,
    dimension: config.dimension,
    target: config.target,
    scope: config.scope,
    tone: teachingTone(source),
    confidence: config.confidence || "low",
    evidenceStatus: config.evidenceStatus || "retrospective_self_report",
    alternativeExplanations: config.alternativeExplanations || [],
    nextValidation: config.nextValidation,
    evidenceIds: allRows.map((row) => row.id),
    observations: allRows,
  };
}

function claimsFor(groups, source = {}) {
  const claims = [];
  const social = linkedClaim(source, ["n09", "n10"], {
    id: "claim:mode-switch:social-person",
    dimension: "D_MODE",
    rowDimensions: ["D_MODE"],
    target: "social context",
    scope: "Two imagined low-key invitations with different relationship targets",
    confidence: "medium",
    evidenceStatus: "hypothetical_choice",
    text: ([friend, newer]) =>
      friend.option.id === newer.option.id
        ? "The person changed, but your social move stayed similar."
        : "Who is asking changed your social move.",
    lesson:
      "This is the central read: context can explain more than a permanent type.",
    alternativeExplanations: [
      "The difference may be about the event itself, not closeness.",
      "An imagined choice may differ from what happens in real life.",
    ],
    nextValidation:
      "Notice one real invitation: who asked, what the event meant, and what you actually chose.",
  });
  if (social) claims.push(social);

  const actionMotive = linkedClaim(source, ["n07", "n08"], {
    id: "claim:action-and-motive:social",
    dimension: "D_MOTIVE",
    rowDimensions: ["D_MODE", "D_MOTIVE"],
    target: "latest social invitation",
    scope: "One linked event in the past month",
    text: ([action, motive]) =>
      `For that invitation, your action was “${action.option.text}.” You said “${motive.option.text}” mattered most.`,

    lesson:
      "The action and the reason are related, but they are not the same evidence.",
    alternativeExplanations: [
      "A different invitation, person, or energy level could produce a different choice.",
    ],
    nextValidation:
      "Compare this with a second real invitation instead of treating one event as a trait.",
  });
  if (actionMotive) claims.push(actionMotive);

  const helping = linkedClaim(source, ["n19", "n20"], {
    id: "claim:action-and-motive:helping",
    dimension: "D_BOUNDARY",
    rowDimensions: ["D_BOUNDARY", "D_HELP_MOTIVE"],
    target: "latest request for help",
    scope: "One linked capacity trade-off in the past month",
    text: ([action, motive]) =>
      `When help competed with your time or energy, your action was “${action.option.text}.” You said “${motive.option.text}” mattered most.`,

    lesson:
      "A boundary can come from care, principle, capacity, or pressure. The same action does not prove the same motive.",
    alternativeExplanations: [
      "Urgency, resources, and the requester may have shaped this one event.",
    ],
    nextValidation:
      "Test whether the same reason appears with a different requester and a different cost.",
  });
  if (helping) claims.push(helping);

  const emotion = linkedClaim(source, ["n23", "n24"], {
    id: "claim:inside-outside:irritation",
    dimension: "D_EXPRESSION",
    rowDimensions: ["D_EXPRESSION", "D_INTENSITY"],
    target: "latest irritation event",
    scope: "Feeling and outward response from the same event",
    text: ([outside, inside]) =>
      `Inside, the irritation was “${inside.option.text}.” Outside, “${outside.option.text}.”`,
    lesson:
      "What you felt and what you showed can be different stories. Quiet is not the same as calm.",
    alternativeExplanations: [
      "Safety, power, timing, or relationship stakes may have shaped the outward response.",
    ],
    nextValidation:
      "A later conversation can ask what helped the feeling settle; this survey did not assume it.",
  });
  if (emotion) claims.push(emotion);

  const repeated = groups
    .filter(
      (group) =>
        group.status === "Repeated pattern" &&
        !["D_MODE", "D_MOTIVE", "D_BOUNDARY", "D_EXPRESSION"].includes(group.d),
    )
    .map((group) => {
      const context =
        group.target && group.target !== "general"
          ? ` in ${group.target} situations`
          : "";
      return {
        id: `claim:${group.d}:${group.target}`,
        text: `Across distinct answers${context}, “${label(group.top, group.d)}” showed up more than once.`,
        lesson: "Repeated does not mean universal; the receipts show where it appeared.",
        dimension: group.d,
        target: group.target,
        scope: context || "Across answered survey situations",
        tone: teachingTone(source),
        confidence: claimConfidence(group.rows),
        evidenceStatus: "repeated_self_report",
        alternativeExplanations: [
          "The repeated choice may reflect the costs and opportunities in these particular scenes.",
        ],
        nextValidation: "Look for a counterexample in a different relationship or pressure level.",
        evidenceIds: group.rows.map((row) => row.id),
        observations: group.rows,
      };
    });
  return [...claims, ...repeated];
}
function emotionsFor(source) {
  const rows = observations(source);
  const result = [];
  for (const family of FAMILY_NAMES) {
    const group = {
      family,
      label: family[0].toUpperCase() + family.slice(1),
      feeling: [],
      response: [],
      recovery: [],
    };
    for (const row of rows)
      if (
        row.signal?.family === family &&
        ["feeling", "response", "recovery"].includes(row.signal.layer)
      )
        group[row.signal.layer].push({
          value: row.signal.value,
          label: row.signal.label,
          questionId: row.questionId,
          window: row.window,
        });
    if (group.feeling.length || group.response.length || group.recovery.length)
      result.push(group);
  }
  return result;
}

export function portrait(state) {
  const source = state?.locked?.training || state?.answers || {};
  const groups = state?.locked?.profile || profile(source);
  const bars = measureRecords(source);
  const domainText = {
    sleep: "Sleep",
    eating: "Eating",
    movement: "Movement",
    recovery: "Recovery",
    body: "Body",
    skin: "Skin",
    hydration: "Hydration",
  };
  const domains = [];
  for (const bar of bars) {
    const id = measureDefs()[bar.id]?.domain || bar.id;
    let domain = domains.find((item) => item.id === id);
    if (!domain) {
      const labelText = domainText[id] || id;
      domain = { id, label: labelText, description: labelText, axes: [] };
      domains.push(domain);
    }
    domain.axes.push({ ...bar });
  }
  const claims = claimsFor(groups, source);
  const direct = facts(source);
  const title = claims.some((claim) => claim.id === "claim:mode-switch:social-person")
    ? "You do not have one social mode."
    : claims.length
      ? "Your patterns have conditions."
      : "Still getting to know you.";
  const goalCta = {
    understand_pattern:
      "Bring one switch-mode pattern into MirrorMe and test where it holds—and where it does not.",
    name_feeling:
      "Bring one hard-to-name moment into MirrorMe and separate the feeling, the response, and what helped afterward.",
    next_step:
      "Bring one live decision into MirrorMe and turn this portrait into one small, reversible next step.",
    playful_read:
      "Bring the sharpest read into MirrorMe and see whether it survives another real example.",
    none_specific:
      "Bring this portrait into MirrorMe when a real moment gives you something worth testing.",
  };
  return {
    id: `portrait:${state?.locked?.signature || signature(source)}`,
    version: VERSION,
    title,
    titleLead: title === "You do not have one social mode." ? "You do not have" : claims.length ? "Your patterns" : "Still getting",
    titleEmphasis: title === "You do not have one social mode." ? "one social mode." : claims.length ? "have conditions." : "to know you.",
    summary: claims.length
      ? "The useful answer is not a permanent type. It is the pattern between the situation, what mattered, and what you did."
      : "Unknown is a real result. This survey will not invent a personality from skips, Other, or missing examples.",
    thesis: "Recognition creates attention. Direct evidence creates credibility. A bounded prediction creates drama.",
    teachingTone: teachingTone(source),
    cta:
      goalCta[direct.chosenGoal] ||
      "MirrorMe can continue from one pattern you choose; this local build previews that handoff and does not claim ongoing support is already connected.",
    claims,
    groups,
    domains,
    emotions: emotionsFor(source),
    facts: facts(source),
  };
}

function clearTests(state) {
  for (const q of testQuestions()) {
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
    const oldBinding = state.bindings[q.id];
    const newBinding = q.applicable ? bindingFor(q, state.answers) : undefined;
    const contextChanged =
      oldBinding && newBinding && !sameBinding(oldBinding, newBinding);
    // A context replacement can move from an authored candidate to a generic fallback.
    // Clear every answered candidate that left the current route, including unbound fallbacks.
    if (
      (Object.hasOwn(state.answers, q.id) && !route.ids.includes(q.id)) ||
      contextChanged
    ) {
      delete state.answers[q.id];
      delete state.notes[q.id];
      delete state.bindings[q.id];
      delete state.other[q.id];
    }
  }
  state.route = route;
  clearTests(state);
}
export function setAnswer(state, id, value, meta = {}) {
  if (
    !state ||
    !state.answers ||
    !state.notes ||
    !state.bindings ||
    !state.other
  )
    throw new Error("Invalid state");
  const question = questionFor(id);
  if (!question || !validValue(question, value))
    throw new Error("Invalid answer");
  if (!meta || typeof meta !== "object" || Array.isArray(meta))
    throw new Error("Invalid answer metadata");
  if (meta.note !== undefined && typeof meta.note !== "string")
    throw new Error("Invalid note");
  if (value === "other" && typeof meta.otherText !== "string")
    throw new Error("Other text required");
  if (!routeFor(state.answers).ids.includes(id))
    throw new Error("Question is not on the current route");
  if (question.test) {
    if (!state.locked) throw new Error("Predictions must be locked first");
    if (Object.hasOwn(state.answers, id))
      throw new Error("Test answers are final for this attempt");
  }
  const prior = state.answers[id];
  if (!question.test && prior !== value) {
    if (state.locked) state.resultHistory.push(state.locked);
    if (state.locked || state.testSeen) state.reviewed = true;
    clearTests(state);
  }
  state.answers[id] = value;
  state.started = true;
  state.attemptId ||= makeAttemptId();
  if (meta.note !== undefined) state.notes[id] = meta.note.slice(0, 1200);
  if (value === "other") state.other[id] = meta.otherText.slice(0, 1200);
  else delete state.other[id];
  if (question.applicable)
    state.bindings[id] = bindingFor(question, state.answers);
  else delete state.bindings[id];
  if (
    prior !== value &&
    (question.meta?.contextKey ||
      QUESTIONS.some((candidate) => candidate.dependsOn?.questionId === id))
  )
    invalidateContext(state);
  state.route = routeFor(state.answers);
  const pos = state.route.ids.indexOf(id);
  state.cursor =
    pos >= 0
      ? Math.min(state.route.ids.length, pos + 1)
      : Math.min(state.cursor, state.route.ids.length);
  return state;
}

function validRaw(raw) {
  if (
    !raw ||
    typeof raw !== "object" ||
    Array.isArray(raw) ||
    raw.version !== VERSION
  )
    return false;
  if (
    raw.answers !== undefined &&
    (!raw.answers ||
      typeof raw.answers !== "object" ||
      Array.isArray(raw.answers))
  )
    return false;
  for (const [id, value] of Object.entries(raw.answers || {}))
    if (!validValue(questionFor(id), value)) return false;
  return true;
}
function sameBinding(a, b) {
  if (
    !a ||
    !b ||
    typeof a !== "object" ||
    typeof b !== "object" ||
    Array.isArray(a) ||
    Array.isArray(b)
  )
    return false;
  const ak = Object.keys(a).sort();
  const bk = Object.keys(b).sort();
  return (
    ak.length === bk.length &&
    ak.every((key, index) => key === bk[index] && a[key] === b[key])
  );
}
function safeObservation(row) {
  if (!row || typeof row !== "object") return null;
  const output = {};
  for (const key of [
    "id",
    "d",
    "v",
    "target",
    "question",
    "questionId",
    "optionId",
    "questionTitle",
    "answer",
    "why",
    "role",
    "window",
    "version",
    "source",
    "reaction",
  ])
    if (typeof row[key] === "string" || row[key] === null)
      output[key] =
        typeof row[key] === "string" ? row[key].slice(0, 1200) : null;
  if (
    row.measure &&
    typeof row.measure === "object" &&
    typeof row.measure.id === "string" &&
    Number.isFinite(row.measure.value)
  )
    output.measure = {
      id: row.measure.id,
      value: row.measure.value,
      ...(row.measure.label !== undefined
        ? { label: String(row.measure.label).slice(0, 300) }
        : {}),
    };
  if (
    row.signal &&
    typeof row.signal === "object" &&
    typeof row.signal.family === "string" &&
    typeof row.signal.layer === "string" &&
    typeof row.signal.value === "string"
  )
    output.signal = {
      family: row.signal.family,
      layer: row.signal.layer,
      value: row.signal.value,
      label:
        row.signal.label === undefined
          ? undefined
          : String(row.signal.label).slice(0, 300),
    };
  return output;
}
function safeFeedback(item) {
  if (
    !item ||
    typeof item !== "object" ||
    typeof item.claimId !== "string" ||
    typeof item.value !== "boolean"
  )
    return null;
  const claim =
    item.claim && typeof item.claim === "object" ? item.claim : null;
  return {
    id:
      typeof item.id === "string"
        ? item.id.slice(0, 160)
        : `feedback:${item.claimId}`,
    claimId: item.claimId.slice(0, 160),
    value: item.value,
    reason: typeof item.reason === "string" ? item.reason.slice(0, 1200) : null,
    resultVersion:
      typeof item.resultVersion === "string" ? item.resultVersion : VERSION,
    resultId: typeof item.resultId === "string" ? item.resultId : null,
    claim:
      claim && typeof claim.id === "string"
        ? {
            id: claim.id.slice(0, 160),
            text:
              typeof claim.text === "string" ? claim.text.slice(0, 1200) : "",
            dimension:
              typeof claim.dimension === "string"
                ? claim.dimension.slice(0, 160)
                : null,
            target:
              typeof claim.target === "string"
                ? claim.target.slice(0, 300)
                : null,
            confidence:
              typeof claim.confidence === "string"
                ? claim.confidence.slice(0, 40)
                : null,
            evidenceIds: Array.isArray(claim.evidenceIds)
              ? claim.evidenceIds
                  .filter((id) => typeof id === "string")
                  .map((id) => id.slice(0, 300))
                  .slice()
              : [],
            observations: Array.isArray(claim.observations)
              ? claim.observations.map(safeObservation).filter(Boolean)
              : [],
          }
        : null,
    evidenceSnapshot: Array.isArray(item.evidenceSnapshot)
      ? item.evidenceSnapshot.map(safeObservation).filter(Boolean)
      : [],
    createdAt: typeof item.createdAt === "string" ? item.createdAt : null,
  };
}
function validFrozenSnapshot(item) {
  if (
    !item ||
    typeof item !== "object" ||
    item.version !== VERSION ||
    typeof item.signature !== "string"
  )
    return null;
  try {
    const training = normalizeTraining(item.training);
    if (signature(training) !== item.signature) return null;
    const snapshot = freeze({
      answers: training,
      priorExposure: item.priorExposure === true,
    });
    return {
      ...snapshot,
      frozenAt:
        typeof item.frozenAt === "string"
          ? item.frozenAt.slice(0, 80)
          : snapshot.frozenAt,
    };
  } catch {
    return null;
  }
}
function knownSnapshotRefs(snapshots = []) {
  const claims = new Set();
  const evidenceIds = new Set();
  for (const snapshot of snapshots) {
    for (const group of snapshot?.profile || []) {
      if (group?.d && group?.target)
        claims.add(`claim:${group.d}:${group.target}`);
      for (const row of group?.rows || [])
        if (typeof row?.id === "string") evidenceIds.add(row.id);
    }
    for (const row of snapshot?.observations || [])
      if (typeof row?.id === "string") evidenceIds.add(row.id);
  }
  return { claims, evidenceIds };
}
function feedbackForSnapshots(items, snapshots) {
  const validSnapshots = snapshots.map(validFrozenSnapshot).filter(Boolean);
  const candidates = validSnapshots.map((snapshot) => ({
    snapshot,
    id: `portrait:${snapshot.signature}`,
    claims: claimsFor(snapshot.profile, snapshot.training),
  }));
  const output = [];
  for (const raw of items) {
    const item = safeFeedback(raw);
    if (!item) continue;
    const matches = candidates.filter(
      (candidate) =>
        candidate.claims.some((claim) => claim.id === item.claimId) &&
        (!item.resultId || item.resultId === candidate.id),
    );
    if (matches.length !== 1) continue;
    const { snapshot, id, claims } = matches[0];
    const claim = claims.find((candidate) => candidate.id === item.claimId);
    if (!claim) continue;
    output.push({
      id: item.id,
      claimId: claim.id,
      value: item.value,
      reason: item.reason,
      resultVersion: VERSION,
      resultId: id,
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
  state.attemptId =
    typeof parsed.attemptId === "string" ? parsed.attemptId : null;
  state.started = parsed.started === true;
  state.cursor = Number.isInteger(parsed.cursor)
    ? Math.max(0, parsed.cursor)
    : 0;
  state.testSeen = parsed.testSeen === true;
  state.reviewed = parsed.reviewed === true;
  for (const q of QUESTIONS)
    if (Object.hasOwn(parsed.answers || {}, q.id))
      state.answers[q.id] = parsed.answers[q.id];
  for (const [id, note] of Object.entries(parsed.notes || {}))
    if (Object.hasOwn(state.answers, id) && typeof note === "string")
      state.notes[id] = note.slice(0, 1200);
  for (const [id, text] of Object.entries(parsed.other || {}))
    if (state.answers[id] === "other" && typeof text === "string")
      state.other[id] = text.slice(0, 1200);
  state.route = routeFor(state.answers);
  for (const q of QUESTIONS)
    if (Object.hasOwn(state.answers, q.id) && !state.route.ids.includes(q.id)) {
      delete state.answers[q.id];
      delete state.notes[q.id];
      delete state.other[q.id];
      delete state.bindings[q.id];
    }
  for (const q of QUESTIONS)
    if (Object.hasOwn(state.answers, q.id) && q.applicable) {
      const expected = bindingFor(q, state.answers);
      const actual = parsed.bindings?.[q.id];
      if (!sameBinding(actual, expected)) {
        delete state.answers[q.id];
        delete state.notes[q.id];
        delete state.other[q.id];
        delete state.bindings[q.id];
      } else state.bindings[q.id] = expected;
    }
  state.resultHistory = Array.isArray(parsed.resultHistory)
    ? parsed.resultHistory.map(validFrozenSnapshot).filter(Boolean)
    : [];
  const parsedPriorExposure =
    typeof parsed.locked?.priorExposure === "boolean"
      ? parsed.locked.priorExposure
      : false;
  state.priorExposure = parsedPriorExposure;
  if (
    trainingDone(state) &&
    parsed.locked?.signature === signature(state.answers)
  )
    state.locked = freeze({ ...state, priorExposure: parsedPriorExposure });
  else clearTests(state);
  state.feedback = Array.isArray(parsed.feedback)
    ? feedbackForSnapshots(parsed.feedback, [
        state.locked,
        ...state.resultHistory,
      ])
    : [];
  state.cursor = Math.min(state.cursor, state.route?.ids?.length || 0);
  return state;
}

export function reviewClaim(state, claimId, value, reason = null) {
  if (
    !state?.locked ||
    typeof claimId !== "string" ||
    typeof value !== "boolean"
  )
    throw new Error("Invalid claim review");
  const snapshot = portrait(state);
  const claim = snapshot.claims.find((item) => item.id === claimId);
  if (!claim) throw new Error("Unknown claim");
  if (!Array.isArray(state.feedback)) state.feedback = [];
  state.feedback.push({
    id: `feedback:${state.feedback.length + 1}`,
    claimId,
    value,
    reason: typeof reason === "string" ? reason.slice(0, 1200) : null,
    resultVersion: snapshot.version,
    resultId: snapshot.id,
    claim: structuredClone(claim),
    evidenceSnapshot: structuredClone(claim.observations),
    createdAt: new Date().toISOString(),
  });
  return state;
}
export function stats(state) {
  if (!state?.locked) return null;
  const trials = routeTestIds(state).map((id) => {
    const question = questionFor(id);
    const prediction =
      state.locked.predictions.find((item) => item.question === id) ||
      predict(question, state.locked.training);
    const raw = state.answers?.[id];
    const answer = selected(question, state.answers);
    const usable = !!answer && applicable(question, state.answers);
    const noExample =
      raw === "no_example" && normalizedRole(question) === "actual_event";
    const other = raw === "other";
    const skipped = raw === "skip";
    const unscored = raw === "no_example" || other;
    return {
      ...prediction,
      actual: usable ? answer.id : null,
      skipped,
      noExample,
      other,
      unscored,
      unresolved: raw === undefined,
      eligible: applicable(question, state.answers),
      hit: usable && prediction.option === answer.id,
      baselineHit: usable && prediction.baseline === answer.id,
    };
  });
  const answered = trials.filter(
    (trial) => !trial.skipped && !trial.unscored && !trial.unresolved,
  );
  const predicted = answered.filter((trial) => trial.option);
  return {
    trials,
    eligible: trials.filter((trial) => trial.eligible).length,
    answered: answered.length,
    skipped: trials.filter((trial) => trial.skipped).length,
    noExample: trials.filter((trial) => trial.noExample).length,
    other: trials.filter((trial) => trial.other).length,
    unscored: trials.filter((trial) => trial.unscored).length,
    unresolved: trials.filter((trial) => trial.unresolved).length,
    predicted: predicted.length,
    abstained: answered.length - predicted.length,
    hits: predicted.filter((trial) => trial.hit).length,
    baselineHits: predicted.filter((trial) => trial.baselineHit).length,
    baselineAll: answered.filter((trial) => trial.baselineHit).length,
  };
}

export function label(value, dimension) {
  const maps = {
    D14a: {
      early: "Earlier sleep rhythm",
      middle: "Middle sleep rhythm",
      late: "Later sleep rhythm",
      variable: "Variable sleep rhythm",
      protect: "Protect sleep",
      delay: "Delay sleep",
      adjust: "Adjust the sleep plan",
    },
    D14b: {
      home: "Eat from home",
      occasional: "Occasional takeaway",
      frequent: "Frequent takeaway",
      default: "Takeaway as the default",
      planned: "Follow the meal plan",
      bounded: "Adapt within a food boundary",
      delay: "Delay eating",
    },
    D14c: {
      none: "No movement days",
      occasional: "Occasional movement",
      regular: "Regular movement",
      frequent: "Frequent movement",
    },
    D14d: {
      rest: "Prioritize recovery",
      obligation: "Prioritize obligations",
      connection: "Coordinate shared workload",
      bounded: "Make recovery manageable",
    },
  };
  if (maps[dimension]?.[value]) return maps[dimension][value];
  return (
    {
      plan: "Plan before acting",
      improvise: "Act, then adjust",
      security: "Protect the budget",
      enjoyment: "Pay for enjoyment",
      convenience: "Pay for convenience",
      status: "Value recognizable status",
      direct: "Direct action",
      soften: "A softer opening",
      avoid: "Leave it unaddressed",
      pause: "Explicit pause",
      support: "Seek connection or support",
      private: "Process privately",
      selective: "Disclose selectively",
      secure: "Benign interpretation",
      worry: "Seek reassurance",
      reassurance: "Question the relationship or message",
      repair: "Own it and discuss repair",
      explain: "Apologize with context",
      action: "Repair through action",
      exit: "Leave the situation",
      proportional: "Match contributions to costs",
      absorb: "Carry the extra cost",
      limit: "State a capacity limit",
      novel: "Try something new",
      conditional: "Investigate or add conditions",
      familiar: "Choose the familiar",
      people: "Attend to people first",
      task: "Attend to the task first",
      self: "Protect personal capacity",
      duty: "Give weight to role expectations",
      autonomy: "Prioritize own choice",
      noncompetitive: "Connect despite comparison",
      comparison: "Limit painful comparison",
      competitive: "Turn comparison into action",
      recognition: "Value recognition",
      act: "Choose immediate relief",
      wait: "Pause before acting",
      coordinate: "Coordinate help",
      bounded: "Offer bounded help",
      rest: "Prioritize recovery",
      obligation: "Prioritize obligations",
      freedom: "Protect freedom and time",
      consult: "Consult before replanning",
      stop: "Stop the plan",
      early: "Earlier sleep rhythm",
      middle: "Middle sleep rhythm",
      late: "Later sleep rhythm",
      variable: "Variable sleep rhythm",
      responsive: "Respond to immediate hunger",
      home: "Eat from home",
      occasional: "Occasional takeaway",
      frequent: "Frequent takeaway",
      default: "Takeaway as the default",
      planned: "Follow the meal plan",
      delay: "Delay eating",
      none: "No movement days",
      regular: "Regular movement",
      brand: "Brand-led spending",
    }[value] || value
  );
}
export function identity(groups = []) {
  const repeated = groups.filter(
    (group) => group.status === "Repeated pattern",
  );
  if (!repeated.length)
    return {
      title: "Still getting to know you",
      line: "There is not enough repeated evidence for a strong headline yet.",
    };
  return {
    title: "A pattern in progress",
    line: `Repeated evidence appears across ${new Set(repeated.map((group) => group.d)).size} dimensions; context and contradictions stay visible.`,
  };
}

export function exportAttempt(state) {
  const locked = state?.locked;
  const evaluation = locked ? stats(state) : null;
  const activeRoute = buildRoute(state?.answers || {});
  const activeIds = new Set(activeRoute.ids);
  const resolved =
    !!locked &&
    routeTestIds(state).every((id) => Object.hasOwn(state.answers || {}, id));
  const safeAnswers = Object.fromEntries(
    Object.entries(state?.answers || {}).filter(
      ([id, value]) =>
        activeIds.has(id) &&
        questionFor(id) &&
        validValue(questionFor(id), value),
    ),
  );
  const route = activeRoute;
  const evaluationContext =
    locked?.priorExposure === true
      ? "practice_after_prior_exposure"
      : "first_exposure";
  const base = {
    version: VERSION,
    engine: KEY,
    attemptId: state?.attemptId || null,
    route,
    facts: locked?.facts || facts(safeAnswers),
    evidence: locked?.observations || observations(safeAnswers),
    observations: locked?.observations || observations(safeAnswers),
    profile: locked?.profile || profile(safeAnswers),
    portrait: portrait(state || fresh()),
    answers: safeAnswers,
    trainingAnswers: trainingAnswers(safeAnswers),
    testAnswers: Object.fromEntries(
      routeTestIds(state || { answers: safeAnswers }).map((id) => [
        id,
        safeAnswers[id] ?? null,
      ]),
    ),
    other: Object.fromEntries(
      Object.entries(state?.other || {}).filter(
        ([id]) => safeAnswers[id] === "other",
      ),
    ),
    notes: Object.fromEntries(
      Object.entries(state?.notes || {})
        .filter(([id, value]) => activeIds.has(id) && typeof value === "string")
        .map(([id, value]) => [id, value.slice(0, 1200)]),
    ),
    claimReviews: Array.isArray(state?.feedback)
      ? feedbackForSnapshots(state.feedback, [
          locked,
          ...(state.resultHistory || []),
        ])
      : [],
    attempt: {
      started: state?.started === true,
      testSeen: state?.testSeen === true,
      reviewed: state?.reviewed === true,
      priorExposure: locked?.priorExposure === true,
      evaluationContext,
    },
    provenance: {
      source: "local frozen training evidence",
      bankVersion: VERSION,
      routeSlots: route.total,
      trainingQuestions: routeTrainingIds(state || { answers: safeAnswers })
        .length,
      heldoutQuestions: routeTestIds(state || { answers: safeAnswers }).length,
      omissionReasons: route.omitted,
    },
    disclaimer:
      "This is a local survey evidence summary, not a diagnosis or a probability claim.",
  };
  if (!locked)
    return {
      ...base,
      heldoutsResolved: false,
      predictions: null,
      evaluation: null,
      unscoredNotes: ["Training is incomplete or has not been frozen."],
    };
  if (!resolved)
    return {
      ...base,
      heldoutsResolved: false,
      predictions: routeTestIds(state).map((id) => ({
        question: id,
        status: "hidden until all terminal questions are resolved",
      })),
      evaluation: null,
      unscoredNotes: [
        "Heldout options and scores remain hidden until all terminal questions are resolved.",
      ],
    };
  return {
    ...base,
    heldoutsResolved: true,
    predictions: locked.predictions.map((prediction) => ({
      question: prediction.question,
      option: prediction.option,
      reason: prediction.reason,
      sources: prediction.sources,
      scores: prediction.scores,
    })),
    evaluation,
    stats: evaluation,
    unscoredNotes: [
      "The baseline is an internally authored comparison, not blind independent validation.",
    ],
  };
}
