import test from "node:test";
import assert from "node:assert/strict";
import { QUESTIONS, VERSION } from "../src/data.js";
import {
  KEY,
  fresh,
  selected,
  facts,
  buildRoute,
  routeQuestions,
  observations,
  profile,
  freeze,
  portrait,
  stats,
  setAnswer,
  restore,
  exportAttempt,
  reviewClaim,
  predict,
} from "../src/engine.js";

const byId = new Map(QUESTIONS.map((q) => [q.id, q]));

function fillTraining(state, choices = {}) {
  while (true) {
    const question = routeQuestions(state).find(
      (item) => !item.test && !Object.hasOwn(state.answers, item.id),
    );
    if (!question) break;
    const value = choices[question.id] ?? question.options[0].id;
    setAnswer(state, question.id, value, value === "other" ? { otherText: "custom" } : {});
  }
  return state;
}

function frozen(choices = {}) {
  const state = fillTraining(fresh(), choices);
  state.locked = freeze(state);
  return state;
}

function answerAllChecks(state, value = "skip") {
  for (const question of routeQuestions(state).filter((q) => q.test))
    if (!Object.hasOwn(state.answers, question.id))
      setAnswer(state, question.id, question.options.some((o) => o.id === value) ? value : "skip", value === "other" ? { otherText: "custom" } : {});
  return state;
}

test("new storage/version boundary fails closed from v2 attempts", () => {
  assert.equal(VERSION, "genii-switch-modes.v3");
  assert.equal(KEY, "genii.switch-modes.v3");
  assert.deepEqual(restore({ version: "genii-root.v2", answers: {} }), fresh());
});

test("literal context fields are locked directly and never become scored observations", () => {
  const state = fresh();
  for (const [id, value] of Object.entries({ n01: "a", n02: "e", n03: "c", n04: "e", n05: "c", n06: "d" }))
    setAnswer(state, id, value);
  assert.deepEqual(facts(state.answers), {
    currentFriction: "friends",
    socialContext: "low_access_wants_more",
    chosenGoal: "next_step",
    tenderTopic: "tender_none",
    friendChallengePreference: "friend_challenge_no",
    feedbackTone: "feedback_permission_first",
  });
  assert.equal(observations(state.answers).length, 0);
});

test("Other, Skip, and no-example remain unscored and distinct", () => {
  const state = fresh();
  setAnswer(state, "n01", "other", { otherText: "My own chapter" });
  assert.equal(state.other.n01, "My own chapter");
  assert.equal(selected(byId.get("n01"), state.answers), undefined);
  assert.equal(observations(state.answers).length, 0);

  const skip = fresh();
  setAnswer(skip, "n01", "skip");
  assert.equal(skip.answers.n01, "skip");

  const actual = fresh();
  for (const id of ["n01", "n02", "n03", "n04", "n05", "n06"]) setAnswer(actual, id, "skip");
  setAnswer(actual, "n07", "no_example");
  assert.equal(actual.answers.n07, "no_example");
  assert.equal(buildRoute(actual.answers).ids.includes("n08"), false);
});

test("changing a parent answer removes its linked follow-up and clears its data", () => {
  const state = fresh();
  for (const id of ["n01", "n02", "n03", "n04", "n05", "n06"]) setAnswer(state, id, "a");
  setAnswer(state, "n07", "a");
  assert.ok(buildRoute(state.answers).ids.includes("n08"));
  setAnswer(state, "n08", "other", { otherText: "A mixed reason", note: "linked note" });
  setAnswer(state, "n07", "skip");
  assert.equal(buildRoute(state.answers).ids.includes("n08"), false);
  assert.equal(state.answers.n08, undefined);
  assert.equal(state.other.n08, undefined);
  assert.equal(state.notes.n08, undefined);
});

test("freeze excludes heldouts and preserves abstention when support is thin", () => {
  const state = frozen();
  assert.equal(state.locked.predictions.length, 8);
  assert.equal(state.locked.profile.some((g) => g.rows.some((r) => r.questionId.startsWith("h"))), false);
  const thin = predict(byId.get("h04"), { n13: "a" });
  assert.equal(thin.option, null);
  assert.match(thin.reason, /Too few distinct/i);
  const before = JSON.stringify(state.locked);
  setAnswer(state, "h01", "skip");
  assert.equal(JSON.stringify(state.locked), before);
});

test("portrait states the thesis, honors tone/goal, and preserves exact action-motive receipts", () => {
  const state = frozen({
    n03: "c",
    n06: "d",
    n07: "c",
    n08: "d",
    n09: "c",
    n10: "a",
    n19: "b",
    n20: "c",
    n23: "b",
    n24: "c",
  });
  const result = portrait(state);
  assert.equal(result.title, "You do not have one social mode.");
  assert.equal(result.teachingTone, "permission-first");
  assert.match(result.summary, /not a permanent type/i);
  assert.match(result.cta, /one live decision/i);
  const social = result.claims.find((c) => c.id === "claim:action-and-motive:social");
  assert.ok(social);
  assert.match(social.text, /suggested a different way to take part/i);
  assert.match(social.text, /time, energy, or other plans/i);
  assert.deepEqual(new Set(social.observations.map((r) => r.questionId)), new Set(["n07", "n08"]));
  assert.equal(social.observations.length, 2);
  assert.ok(social.observations.every((row) => row.d && row.answer));
  const switchClaim = result.claims.find((c) => c.id === "claim:mode-switch:social-person");
  assert.equal(switchClaim.observations.length, 2);
  assert.ok(switchClaim.observations.every((row) => row.d === "D_MODE" && row.answer));
  assert.match(switchClaim.text, /changed your social move/i);
  assert.equal(switchClaim.evidenceStatus, "hypothetical_choice");
  assert.ok(switchClaim.alternativeExplanations.length >= 2);
});

test("unscored authored catch-all motives cannot enter linked claims", () => {
  const state = frozen({ n07: "a", n08: "f", n19: "a", n20: "e" });
  const ids = portrait(state).claims.map((claim) => claim.id);
  assert.equal(ids.includes("claim:action-and-motive:social"), false);
  assert.equal(ids.includes("claim:action-and-motive:helping"), false);
});

test("inside feeling and outside action are quoted from the same event without inventing recovery", () => {
  const state = frozen({ n23: "b", n24: "c" });
  const result = portrait(state);
  const claim = result.claims.find((c) => c.id === "claim:inside-outside:irritation");
  assert.match(claim.text, /Strong; it took up real space/);
  assert.match(claim.text, /stayed polite and dealt with it later/i);
  assert.match(claim.lesson, /Quiet is not the same as calm/i);
  assert.equal(claim.observations.length, 2);
  assert.ok(claim.observations.every((row) => row.d && row.answer));
  const emotion = result.emotions.find((item) => item.family === "frustration");
  assert.equal(emotion.feeling.length, 1);
  assert.equal(emotion.response.length, 1);
  assert.equal(emotion.recovery.length, 0);
});

test("routine cards project direct values only and keep varied answers unknown", () => {
  const state = frozen({ n27: "a", n28: "d", n29: "b", n30: "c", n31: "d", n32: "a" });
  const result = portrait(state);
  const axes = result.domains.flatMap((domain) => domain.axes);
  const sleep = axes.find((axis) => axis.id === "sleep_restoration");
  assert.equal(sleep.usual.label, "Most mornings");
  assert.equal(sleep.recent, null);
  const energy = axes.find((axis) => axis.id === "daytime_energy");
  assert.equal(energy.usual, null);
  assert.equal(energy.recent.label, "Most days");
});

test("an all-skipped route produces unknown, no claims, no measures, and no predictions", () => {
  const state = fresh();
  while (true) {
    const question = routeQuestions(state).find((q) => !q.test && !Object.hasOwn(state.answers, q.id));
    if (!question) break;
    setAnswer(state, question.id, "skip");
  }
  state.locked = freeze(state);
  answerAllChecks(state, "skip");
  const result = portrait(state);
  assert.equal(result.claims.length, 0);
  assert.equal(result.domains.length, 0);
  assert.match(result.summary, /Unknown is a real result/i);
  assert.equal(stats(state).predicted, 0);
});

test("claim feedback is immutable metadata and cannot rewrite the portrait", () => {
  const state = frozen({ n09: "c", n10: "a" });
  const claim = portrait(state).claims.find((c) => c.id === "claim:mode-switch:social-person");
  const beforePortrait = JSON.stringify(portrait(state));
  const beforeLocked = JSON.stringify(state.locked);
  reviewClaim(state, claim.id, false, "Depends on the event");
  assert.equal(JSON.stringify(portrait(state)), beforePortrait);
  assert.equal(JSON.stringify(state.locked), beforeLocked);
  assert.equal(state.feedback[0].value, false);
  assert.equal(state.feedback[0].claim.text, claim.text);
});

test("private export keeps receipts, 40-slot provenance, and hides unresolved check scores", () => {
  const state = frozen({ n03: "d", n06: "c" });
  setAnswer(state, "h01", "other", { otherText: "Depends on who is there" });
  const partial = exportAttempt(state);
  assert.equal(partial.provenance.routeSlots, 40);
  assert.equal(partial.heldoutsResolved, false);
  assert.equal(partial.predictions[0].scores, undefined);
  answerAllChecks(state, "skip");
  const full = exportAttempt(state);
  assert.equal(full.heldoutsResolved, true);
  assert.equal(full.other.h01, "Depends on who is there");
  assert.equal(full.portrait.teachingTone, "funny");
});

test("restore validates the v3 frozen snapshot and drops forged history", () => {
  const state = frozen({ n09: "c", n10: "a" });
  const restored = restore(JSON.parse(JSON.stringify(state)));
  assert.equal(restored.locked.signature, state.locked.signature);
  const raw = JSON.parse(JSON.stringify(state));
  raw.resultHistory = [{ version: VERSION, signature: "forged", training: {} }];
  raw.feedback = [{ claimId: "claim:mode-switch:social-person", value: true, resultId: "portrait:forged" }];
  const cleaned = restore(raw);
  assert.equal(cleaned.resultHistory.length, 0);
  assert.equal(cleaned.feedback.length, 0);
});

test("profile counts distinct questions rather than tags as independent support", () => {
  const groups = profile({ n09: "a" });
  for (const group of groups) assert.equal(group.n, 1);
});
