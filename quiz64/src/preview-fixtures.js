import * as Engine from "./engine.js";
import * as Survey from "./survey.js";

export const PREVIEW_FIXTURES = [
  {
    id: "complete",
    label: "Complete",
    detail: "Full answers and sealed checks",
  },
  { id: "mixed", label: "Mixed", detail: "Varied choices across situations" },
  { id: "sparse", label: "Sparse", detail: "A few answers among skips" },
  { id: "skipped", label: "Skipped", detail: "All answers skipped" },
];

// Fixed, fictional response maps. Held-out answers are authored independently
// of the frozen predictions so this preview does not imply model accuracy.
const COMPLETE_ANSWERS = {
  q01: "c",
  q02: "b",
  q03: "b",
  q04: "b",
  q05: "a",
  q06: "c",
  q07: "c",
  q08: "b",
  q09: "c",
  q10: "b",
  q94: "b",
  q13: "a",
  q95: "c",
  q15: "b",
  q16: "b",
  q17: "b",
  q18: "c",
  q19: "b",
  q20: "b",
  q21: "c",
  q22: "b",
  q23: "c",
  q24: "a",
  q29: "b",
  q30: "c",
  q31: "b",
  q32: "a",
  q65: "a",
  q66: "c",
  q67: "d",
  q68: "a",
  q69: "c",
  q70: "b",
  q71: "c",
  q33: "c",
  q41: "b",
  q42: "b",
  q43: "d",
  q44: "b",
  q45: "a",
  q46: "b",
  q47: "d",
  q74: "c",
  q75: "b",
  q77: "c",
  q78: "d",
  q97: "b",
  q98: "c",
  q99: "b",
  q101: "b",
  q72: "b",
  q73: "c",
  q76: "b",
  q100: "c",
  q102: "b",
  q96: "a",
  q57: "b",
  q58: "c",
  q59: "a",
  q60: "c",
  q61: "d",
  q62: "b",
  q63: "b",
  q64: "c",
};
const MIXED_OVERRIDES = {
  q03: "c",
  q04: "d",
  q05: "d",
  q06: "b",
  q07: "a",
  q08: "d",
  q09: "a",
  q13: "d",
  q16: "c",
  q31: "d",
  q41: "a",
  q42: "d",
  q43: "c",
  q44: "d",
  q45: "b",
  q46: "d",
  q47: "c",
  q72: "d",
  q73: "a",
  q96: "b",
};
const SPARSE_ANSWER_IDS = new Set([
  "q01",
  "q02",
  "q03",
  "q07",
  "q94",
  "q95",
  "q20",
  "q46",
  "q72",
  "q100",
  "q57",
  "q60",
]);
const HELDOUT_ANSWERS = {
  q57: "a",
  q58: "b",
  q59: "a",
  q60: "c",
  q61: "d",
  q62: "b",
  q63: "b",
  q64: "c",
};

function answerFor(question, fixture) {
  if (fixture === "skipped") return "skip";
  if (fixture === "sparse" && !SPARSE_ANSWER_IDS.has(question.id))
    return "skip";
  const authored =
    fixture === "mixed"
      ? MIXED_OVERRIDES[question.id] || COMPLETE_ANSWERS[question.id]
      : COMPLETE_ANSWERS[question.id];
  return question.options?.some((option) => option.id === authored)
    ? authored
    : "skip";
}

export function makePreviewState(fixtureId = "complete") {
  const fixture = PREVIEW_FIXTURES.some((item) => item.id === fixtureId)
    ? fixtureId
    : "complete";
  const state = Engine.fresh();
  // Route questions are re-read after each answer because context answers can
  // select a different authored question for a later route slot.
  while (true) {
    const question = Engine.routeQuestions(state).find(
      (item) => !item.test && !Object.hasOwn(state.answers, item.id),
    );
    if (!question) break;
    Engine.setAnswer(state, question.id, answerFor(question, fixture));
  }
  state.locked = Engine.freeze(state);
  for (const question of Engine.routeQuestions(state).filter(
    (item) => item.test,
  )) {
    const value =
      fixture === "skipped" || fixture === "sparse"
        ? "skip"
        : HELDOUT_ANSWERS[question.id];
    Engine.setAnswer(
      state,
      question.id,
      question.options.some((option) => option.id === value) ? value : "skip",
    );
  }
  state.previewFixture = fixture;
  state.previewSynthetic = true;
  state._stats = Engine.stats(state);
  return state;
}

export function reviewPreviewClaim(state, claim, value) {
  const next = structuredClone(state);
  Engine.reviewClaim(next, claim.id, value);
  next._stats = Engine.stats(next);
  return next;
}

export function exportPreview(state) {
  return {
    preview: {
      synthetic: true,
      fixture: state.previewFixture,
      label: "Developer preview; synthetic data",
    },
    attempt: Engine.exportAttempt(state),
  };
}

export function reviewRows(state) {
  return Engine.routeQuestions(state).map((question) => {
    const option = Engine.selected(question, state.answers);
    const missingText =
      { skip: "Skipped", no_example: "No example", other: "Other" }[
        state.answers[question.id]
      ] || "No answer";
    return {
      id: question.id,
      title:
        Survey.safeTitle?.(question, state) ||
        Survey.interpolate?.(question.title, state) ||
        question.title,
      answerText: option
        ? Survey.optionText?.(option, state) || option.text
        : missingText,
      test: Boolean(question.test),
    };
  });
}
