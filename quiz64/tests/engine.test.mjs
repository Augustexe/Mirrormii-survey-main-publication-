import test from "node:test";
import assert from "node:assert/strict";
import { QUESTIONS, DIMS, VERSION } from "../src/data.js";
import {
  KEY,
  fresh,
  selected,
  facts,
  applicable,
  buildRoute,
  routeQuestions,
  evidence,
  observations,
  profile,
  signature,
  predict,
  freeze,
  portrait,
  stats,
  setAnswer,
  restore,
  exportAttempt,
  reviewClaim,
} from "../src/engine.js";
import { optionText } from "../src/survey.js";

const context = (close = "c", household = "b") => {
  const state = fresh();
  setAnswer(state, "q01", close);
  setAnswer(state, "q02", household);
  return state;
};

function fillTraining(state, value = "a") {
  for (const question of routeQuestions(state).filter((q) => !q.test)) {
    if (!Object.hasOwn(state.answers, question.id))
      setAnswer(
        state,
        question.id,
        question.options.some((option) => option.id === value)
          ? value
          : question.options[0].id,
      );
  }
  return state;
}

function freezeState(close = "c", household = "b") {
  const state = fillTraining(context(close, household));
  state.locked = freeze(state);
  return state;
}

test("bank and route expose 64 stable slots with valid candidate questions", () => {
  assert.ok(QUESTIONS.length >= 64);
  assert.equal(buildRoute({}).total, 64);
  assert.equal(new Set(QUESTIONS.map((q) => q.id)).size, QUESTIONS.length);
  const route = buildRoute({});
  assert.equal(
    route.ids.length +
      route.omitted.filter((item) => item.reason !== "unknown_candidate")
        .length >=
      56,
    true,
  );
  for (const question of QUESTIONS) {
    assert.ok(question.id && question.title && question.setup);
    assert.ok(question.options.length >= 4);
    for (const option of question.options)
      for (const tag of option.tags || []) assert.ok(DIMS[tag.d]);
  }
  assert.match(VERSION, /^genii-/);
  assert.equal(typeof KEY, "string");
});

test("unknown and inapplicable context is omitted with a reason, never silently answered", () => {
  const unknown = buildRoute({});
  assert.ok(
    unknown.omitted.some((item) => item.reason.startsWith("requires_")) ||
      unknown.ids.length === unknown.total,
  );
  const solo = context("e", "a");
  const route = buildRoute(solo.answers);
  assert.ok(
    route.omitted.some((item) => item.reason.startsWith("requires_")) ||
      route.ids.length === route.total,
  );
  const closeQuestion = QUESTIONS.find((q) => q.applicable === "close");
  if (closeQuestion && !route.ids.includes(closeQuestion.id))
    assert.equal(applicable(closeQuestion, solo.answers), false);
  assert.equal(facts(solo.answers).close, "none");
  assert.equal(facts(solo.answers).household, "alone");
});

test("selected and evidence exclude every explicit missingness sentinel", () => {
  const actual = QUESTIONS.find((q) => !q.test && q.role === "actual");
  assert.ok(actual);
  assert.equal(selected(actual, { [actual.id]: "skip" }), undefined);
  assert.equal(selected(actual, { [actual.id]: "no_example" }), undefined);
  assert.equal(selected(actual, { [actual.id]: "other" }), undefined);
  assert.equal(
    evidence({ [actual.id]: "skip" }).some((row) => row.question === actual.id),
    false,
  );
  assert.equal(
    evidence({ [actual.id]: "no_example" }).some(
      (row) => row.question === actual.id,
    ),
    false,
  );
});

test("Other stores bounded text without turning it into scored evidence", () => {
  const state = context();
  const question = routeQuestions(state).find(
    (q) => !q.test && !q.applicable && q.options.length >= 4,
  );
  assert.ok(question);
  setAnswer(state, question.id, "other", {
    otherText: "A custom answer from the participant.",
    note: "Author note",
  });
  assert.equal(
    state.other[question.id],
    "A custom answer from the participant.",
  );
  assert.equal(state.notes[question.id], "Author note");
  assert.equal(
    evidence(state.answers).some((row) => row.question === question.id),
    false,
  );
  assert.throws(
    () => setAnswer(context(), question.id, "other"),
    /Other text required/,
  );
});

test("context edits invalidate dependent answers and all sealed checks while preserving history", () => {
  const state = freezeState("c", "b");
  const dependent = QUESTIONS.find(
    (q) => q.applicable === "close" && state.route?.ids.includes(q.id),
  );
  if (dependent) {
    state.notes[dependent.id] = "context note";
    state.other[dependent.id] = "context custom";
  }
  const before = state.locked;
  setAnswer(state, "q01", "e");
  assert.equal(state.locked, null);
  assert.equal(state.resultHistory.length, 1);
  assert.deepEqual(state.resultHistory[0].signature, before.signature);
  if (dependent) {
    assert.equal(state.answers[dependent.id], undefined);
    assert.equal(state.notes[dependent.id], undefined);
    assert.equal(state.other[dependent.id], undefined);
  }
});

test("context edits also clear answers attached to a generic fallback that leaves the route", () => {
  const state = context("e", "a");
  const fallback = routeQuestions(state).find((q) => q.id === "q81");
  assert.ok(fallback, "solo route uses the generic fallback");
  setAnswer(state, fallback.id, "other", { otherText: "fallback note" });
  state.notes[fallback.id] = "fallback author note";
  setAnswer(state, "q01", "a");
  assert.equal(state.route.ids.includes(fallback.id), false);
  assert.equal(state.answers[fallback.id], undefined);
  assert.equal(state.other[fallback.id], undefined);
  assert.equal(state.notes[fallback.id], undefined);
});

test("freeze keeps heldout responses outside profile and freezes predictions before checks", () => {
  const state = freezeState();
  assert.equal(
    state.locked.predictions.length,
    routeQuestions(state).filter((q) => q.test).length,
  );
  const snapshot = JSON.stringify(state.locked);
  const heldout = routeQuestions(state).find((q) => q.test);
  assert.ok(heldout);
  setAnswer(state, heldout.id, "skip");
  assert.equal(JSON.stringify(state.locked), snapshot);
  assert.equal(
    state.locked.profile.some((group) =>
      group.rows.some((row) => row.question === heldout.id),
    ),
    false,
  );
  assert.throws(() => setAnswer(state, heldout.id, heldout.options[0].id));
});

test("prediction uses exact matching source questions and exposes abstention", () => {
  const heldout = QUESTIONS.find(
    (q) => q.test && q.options.some((o) => o.tags?.length),
  );
  assert.ok(heldout);
  const prediction = predict(heldout, { q01: "c", q02: "b" });
  assert.equal(prediction.option, null);
  assert.ok(prediction.reason);
  assert.ok(
    prediction.scores.every((score) =>
      score.parts.every((part) =>
        part.sources.every((id) => id !== heldout.id),
      ),
    ),
  );
});

test("portrait separates measures, direct facts, emotion layers and confidence", () => {
  const state = freezeState();
  const result = portrait(state);
  assert.deepEqual(Object.keys(result), [
    "id",
    "version",
    "title",
    "summary",
    "claims",
    "groups",
    "domains",
    "emotions",
    "facts",
  ]);
  assert.equal(result.version, VERSION);
  for (const claim of result.claims) {
    assert.ok(claim.id && claim.text && claim.dimension && claim.target);
    assert.ok(Array.isArray(claim.evidenceIds));
    assert.ok(["missing", "low", "medium", "high"].includes(claim.confidence));
  }
  for (const domain of result.domains)
    for (const axis of domain.axes) {
      assert.ok(Object.hasOwn(axis, "usual") && Object.hasOwn(axis, "recent"));
      assert.ok(["missing", "low", "medium", "high"].includes(axis.confidence));
    }
  for (const emotion of result.emotions)
    assert.ok(
      [
        "frustration",
        "worry",
        "disappointment",
        "embarrassment",
        "guilt",
        "joy",
        "relief",
      ].includes(emotion.family),
    );
});

test("claim review records an immutable snapshot and cannot affect profile or evaluation", () => {
  const state = freezeState();
  const result = portrait(state);
  const claim = result.claims[0];
  if (!claim) return;
  const beforePortrait = JSON.stringify(portrait(state));
  const beforeLocked = JSON.stringify(state.locked);
  const beforeStats = JSON.stringify(stats(state));
  reviewClaim(state, claim.id, true, "This feels familiar.");
  assert.equal(JSON.stringify(portrait(state)), beforePortrait);
  assert.equal(JSON.stringify(state.locked), beforeLocked);
  assert.equal(JSON.stringify(stats(state)), beforeStats);
  assert.equal(state.feedback[0].claim.id, claim.id);
  assert.equal(state.feedback[0].resultVersion, VERSION);
  assert.equal(
    state.reviewed,
    false,
    "feedback is a snapshot and does not mark benchmark checks as practiced",
  );
});

test("freeze records prior heldout exposure separately and export keeps that context", () => {
  const first = fillTraining(context());
  first.testSeen = true;
  first.priorExposure = false;
  first.locked = freeze(first);
  assert.equal(first.locked.priorExposure, false);
  assert.equal(
    exportAttempt(first).attempt.evaluationContext,
    "first_exposure",
  );

  const repeat = fillTraining(context());
  repeat.testSeen = true;
  repeat.priorExposure = true;
  repeat.locked = freeze(repeat);
  assert.equal(repeat.locked.priorExposure, true);
  const restored = restore(JSON.parse(JSON.stringify(repeat)));
  assert.equal(restored.locked.priorExposure, true);
  assert.equal(
    exportAttempt(restored).attempt.evaluationContext,
    "practice_after_prior_exposure",
  );
});

test("freeze owns a snapshot when the caller mutates its answer source afterwards", () => {
  const state = fillTraining(context());
  const source = { ...state.answers };
  const locked = freeze(source);
  const before = JSON.stringify(locked);
  source.q01 = "e";
  source.q03 = "d";
  assert.equal(JSON.stringify(locked), before);
  assert.equal(locked.training.q01, "c");
});

test("option text helper tolerates abstention or malformed option records", () => {
  assert.equal(optionText(undefined, fresh()), "");
  assert.equal(
    optionText({ label: "fallback label" }, fresh()),
    "fallback label",
  );
});

test("stats keeps answered, skipped, no-example, other, abstention and baseline denominators separate", () => {
  const state = freezeState();
  const heldouts = routeQuestions(state).filter((q) => q.test);
  if (heldouts.length < 3) return;
  setAnswer(state, heldouts[0].id, "skip");
  setAnswer(state, heldouts[1].id, "no_example");
  setAnswer(state, heldouts[2].id, "other", { otherText: "Not this time" });
  const result = stats(state);
  assert.equal(result.skipped, 1);
  // Current heldouts are hypothetical, so no-example remains unscored rather than an actual-event count.
  assert.equal(result.noExample, 0);
  assert.equal(result.other, 1);
  assert.equal(result.unscored, 2);
  assert.equal(result.answered, 0);
  assert.equal(result.predicted, 0);
  assert.equal(result.abstained, 0);
});

test("restore rejects malformed state and keeps only current eligible route answers", () => {
  assert.deepEqual(restore("broken"), fresh());
  const state = freezeState();
  const raw = JSON.parse(JSON.stringify(state));
  const hidden = QUESTIONS.find((q) => q.applicable === "close");
  if (hidden) {
    raw.answers[hidden.id] = raw.answers[hidden.id] || "a";
    raw.answers.q01 = "e";
    delete raw.bindings[hidden.id];
  }
  const restored = restore(raw);
  assert.equal(restored.version, VERSION);
  if (hidden) assert.equal(restored.answers[hidden.id], undefined);
});

test("restore rebuilds feedback from the validated frozen snapshot and drops nested arbitrary fields", () => {
  const state = freezeState();
  const claim = portrait(state).claims[0];
  if (!claim) return;
  reviewClaim(state, claim.id, true, "kept");
  const raw = JSON.parse(JSON.stringify(state));
  raw.feedback[0].claim.dimension = { evil: true };
  raw.feedback[0].claim.target = { nested: { evil: true } };
  raw.feedback[0].claim.observations = [
    { id: { evil: true }, signal: { family: { evil: true } } },
  ];
  raw.feedback[0].evidenceSnapshot = [{ id: { evil: true }, extra: "drop" }];
  const restored = restore(raw);
  assert.equal(restored.feedback.length, 1);
  assert.equal(restored.feedback[0].claim.id, claim.id);
  assert.equal(typeof restored.feedback[0].claim.dimension, "string");
  assert.equal(typeof restored.feedback[0].claim.target, "string");
  assert.equal(
    restored.feedback[0].claim.observations.some(
      (row) => row.id === "[object Object]",
    ),
    false,
  );
  assert.equal(restored.feedback[0].evidenceSnapshot[0]?.extra, undefined);
  assert.equal(
    restored.feedback[0].resultId,
    `portrait:${state.locked.signature}`,
  );
});

test("restore drops forged historical training and feedback rather than trusting a matching version string", () => {
  const state = freezeState();
  const raw = JSON.parse(JSON.stringify(state));
  raw.resultHistory = [
    {
      version: VERSION,
      signature: "forged",
      training: {},
      profile: [
        { d: "D1", target: "general", rows: [{ id: "forged-evidence" }] },
      ],
      observations: [{ id: "forged-evidence" }],
      predictions: [],
    },
  ];
  raw.feedback = [
    {
      claimId: "claim:D1:general",
      value: true,
      resultId: "portrait:forged",
      claim: {
        id: "claim:D1:general",
        evidenceIds: ["forged-evidence"],
        observations: [],
      },
    },
  ];
  const restored = restore(raw);
  assert.equal(restored.resultHistory.length, 0);
  assert.equal(restored.feedback.length, 0);
});

test("export filters hidden candidate answers and hides prediction scores until terminal checks resolve", () => {
  const state = freezeState("e", "a");
  const hidden = QUESTIONS.find((q) => q.applicable === "close");
  if (hidden) state.answers[hidden.id] = "a";
  const heldout = routeQuestions(state).find((q) => q.test);
  assert.ok(heldout);
  setAnswer(state, heldout.id, "skip");
  const partial = exportAttempt(state);
  if (hidden && !partial.route.ids.includes(hidden.id))
    assert.equal(partial.answers[hidden.id], undefined);
  assert.equal(
    partial.answers[heldout.id],
    "skip",
    "private export retains the respondent-owned terminal response",
  );
  assert.equal(partial.heldoutsResolved, false);
  assert.equal(partial.predictions[0].option, undefined);
  assert.equal(partial.predictions[0].scores, undefined);
  assert.equal(Object.hasOwn(partial.predictions[0], "title"), false);
  for (const q of routeQuestions(state).filter((item) => item.test))
    if (!Object.hasOwn(state.answers, q.id)) setAnswer(state, q.id, "skip");
  const full = exportAttempt(state);
  assert.equal(full.heldoutsResolved, true);
  assert.equal(full.provenance.routeSlots, 64);
  assert.ok(full.claimReviews);
});
