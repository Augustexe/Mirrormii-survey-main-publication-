import * as Engine from "./engine.js";
import * as Survey from "./survey.js";

export const PREVIEW_FIXTURES = [
  { id: "complete", label: "Complete", detail: "Context shifts, direct routines, and sealed checks" },
  { id: "mixed", label: "Mixed", detail: "Different choices across people and pressure" },
  { id: "sparse", label: "Sparse", detail: "A few literal answers among unknowns" },
  { id: "skipped", label: "Skipped", detail: "Unknown remains a valid result" },
];

const COMPLETE = {
  n01: "a", n02: "b", n03: "c", n04: "a", n05: "b", n06: "d",
  n07: "c", n08: "d", n09: "c", n10: "a", n11: "a", n12: "c",
  n13: "c", n14: "a", n15: "c", n16: "a", n17: "b", n18: "e",
  n19: "b", n20: "c", n21: "a", n22: "b", n23: "b", n24: "c",
  n25: "b", n26: "a", n27: "b", n28: "c", n29: "b", n30: "c",
  n31: "b", n32: "c",
};
const MIXED = {
  ...COMPLETE,
  n01: "d", n02: "a", n03: "d", n06: "c", n07: "d", n08: "b",
  n09: "a", n10: "d", n19: "d", n20: "a", n23: "a", n24: "a",
  n27: "a", n28: "d", n31: "d", n32: "a",
};
const SPARSE_IDS = new Set(["n01", "n02", "n03", "n06", "n09", "n10", "n27", "n28", "n31", "n32"]);
const CHECKS = { h01: "b", h02: "c", h03: "b", h04: "c", h05: "a", h06: "c", h07: "b", h08: "b" };

function response(question, fixture) {
  if (fixture === "skipped") return "skip";
  if (fixture === "sparse" && !SPARSE_IDS.has(question.id)) return "skip";
  const map = fixture === "mixed" ? MIXED : COMPLETE;
  const value = map[question.id];
  return question.options.some((option) => option.id === value) ? value : "skip";
}

export function makePreviewState(fixtureId = "complete") {
  const fixture = PREVIEW_FIXTURES.some((item) => item.id === fixtureId) ? fixtureId : "complete";
  const state = Engine.fresh();
  while (true) {
    const question = Engine.routeQuestions(state).find(
      (item) => !item.test && !Object.hasOwn(state.answers, item.id),
    );
    if (!question) break;
    Engine.setAnswer(state, question.id, response(question, fixture));
  }
  state.locked = Engine.freeze(state);
  for (const question of Engine.routeQuestions(state).filter((item) => item.test))
    Engine.setAnswer(state, question.id, fixture === "skipped" || fixture === "sparse" ? "skip" : CHECKS[question.id]);
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
    preview: { synthetic: true, fixture: state.previewFixture, label: "Developer preview; synthetic data" },
    attempt: Engine.exportAttempt(state),
  };
}

export function reviewRows(state) {
  return Engine.routeQuestions(state).map((question) => {
    const option = Engine.selected(question, state.answers);
    const missingText = { skip: "Skipped", no_example: "No example", other: "Other" }[state.answers[question.id]] || "No answer";
    return {
      id: question.id,
      title: Survey.safeTitle?.(question, state) || Survey.interpolate?.(question.title, state) || question.title,
      answerText: option ? Survey.optionText?.(option, state) || option.text : missingText,
      test: Boolean(question.test),
    };
  });
}
