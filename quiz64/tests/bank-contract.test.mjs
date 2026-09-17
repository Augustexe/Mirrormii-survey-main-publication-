import test from "node:test";
import assert from "node:assert/strict";
import { QUESTIONS, ROUTE_SLOTS, MEASURES } from "../src/data.js";
import {
  buildRoute,
  applicable,
  fresh,
  setAnswer,
  freeze,
  portrait,
  exportAttempt,
} from "../src/engine.js";

const byId = new Map(QUESTIONS.map((q) => [q.id, q]));
const contexts = [];
for (const close of ["a", "b", "c", "d", "e", "skip", "other", undefined]) {
  for (const home of ["a", "b", "c", "d", "skip", "other", undefined]) {
    contexts.push(
      Object.fromEntries(
        [
          ["q01", close],
          ["q02", home],
        ].filter(([, v]) => v !== undefined),
      ),
    );
  }
}
test("candidate bank and route slots form a one-to-one authoring map", () => {
  assert.equal(new Set(QUESTIONS.map((q) => q.id)).size, QUESTIONS.length);
  const candidates = ROUTE_SLOTS.flatMap((s) => s.candidates);
  assert.equal(
    new Set(candidates).size,
    candidates.length,
    "No candidate in multiple slots",
  );
  assert.deepEqual(
    [...new Set(candidates)].sort(),
    [...byId.keys()].sort(),
    "No unrouted question counted as coverage",
  );
  for (const q of QUESTIONS) {
    assert.ok(
      q.title && q.setup && q.meta,
      `${q.id} has complete author context`,
    );
    assert.ok(q.options.length >= 2);
    assert.equal(new Set(q.options.map((o) => o.id)).size, q.options.length);
    if (q.test)
      assert.ok(
        q.options.some((o) => o.id === q.baseline),
        `${q.id} valid fixed baseline`,
      );
  }
});
test("every household and relationship combination produces 64 applicable scenes in chapter order", () => {
  const reachable = new Set();
  for (const answers of contexts) {
    const route = buildRoute(answers);
    const qs = route.ids.map((id) => byId.get(id));
    route.ids.forEach((id) => reachable.add(id));
    assert.equal(route.total, 64);
    assert.equal(qs.length, 64, JSON.stringify(answers));
    assert.equal(new Set(route.ids).size, 64);
    assert.equal(qs.filter((q) => !q.test).length, 56);
    assert.equal(qs.filter((q) => q.test).length, 8);
    assert.ok(qs.slice(0, 56).every((q) => !q.test));
    assert.ok(qs.slice(56).every((q) => q.test));
    for (let i = 0; i < qs.length; i++) {
      assert.ok(
        applicable(qs[i], answers),
        `${qs[i].id} eligibility ${JSON.stringify(answers)}`,
      );
      if (i)
        assert.ok(
          qs[i].chapter >= qs[i - 1].chapter,
          `Chapter order ${qs[i - 1].id} to ${qs[i].id}`,
        );
    }
  }
  assert.deepEqual(
    [...reachable].sort(),
    [...byId.keys()].sort(),
    "Every exported candidate must actually be reachable; no obsolete fallback padding",
  );
});
test("each route offers literal feeling, response and recovery evidence across all seven families", () => {
  for (const answers of [{}, { q01: "a", q02: "b" }, { q01: "e", q02: "a" }]) {
    const qs = buildRoute(answers)
      .ids.map((id) => byId.get(id))
      .filter((q) => !q.test);
    const signals = qs.flatMap((q) =>
      q.options.flatMap((o) => o.signals || []),
    );
    for (const family of [
      "frustration",
      "worry",
      "disappointment",
      "embarrassment",
      "guilt",
      "joy",
      "relief",
    ]) {
      for (const layer of ["feeling", "response", "recovery"])
        assert.ok(
          signals.some((s) => s.family === family && s.layer === layer),
          `${family}/${layer} not represented`,
        );
    }
  }
});
test("declared measures stay in range and carry directly reported recall windows", () => {
  for (const q of QUESTIONS)
    for (const o of q.options)
      for (const m of o.measures || []) {
        const def = MEASURES[m.id];
        assert.ok(def, `${q.id}/${m.id} definition`);
        assert.ok(
          Number.isFinite(m.value) && m.value >= def.min && m.value <= def.max,
          `${q.id}/${m.id} value`,
        );
        assert.ok(
          ["past_month", "last_7_days"].includes(q.meta.window),
          `${q.id} routine window`,
        );
        assert.equal(
          q.meta.evidence,
          "self_report",
          `${q.id} direct measure provenance`,
        );
        assert.ok(m.label, `${q.id} preserves selected band`);
      }
});
test("a fully skipped route remains valid, produces no inferred claims or invented measurements", () => {
  const s = fresh();
  for (let i = 0; i < 56; i++)
    setAnswer(s, buildRoute(s.answers).ids[i], "skip");
  s.locked = freeze(s);
  for (const id of buildRoute(s.answers).ids.slice(56))
    setAnswer(s, id, "skip");
  const p = portrait(s);
  assert.equal(p.claims.length, 0);
  for (const d of p.domains)
    for (const a of d.axes) assert.equal(a.usual ?? a.recent, null);
  const exported = exportAttempt(s);
  assert.equal(exported.heldoutsResolved, true);
  assert.equal(exported.evaluation.predicted, 0);
  assert.equal(exported.evaluation.answered, 0);
});
test("blank Other is a deliberate unscored response, distinct from Skip", () => {
  const s = fresh();
  setAnswer(s, "q01", "other", { otherText: "" });
  assert.equal(s.answers.q01, "other");
  assert.equal(s.other.q01, "");
  assert.equal(portrait(s).claims.length, 0);
});
test("usual and recent health comparisons preserve the same bands and independent sleep constructs", () => {
  for (const [usual, recent, measure] of [
    ["q101", "q46", "movement_consistency"],
    ["q100", "q102", "sleep_restoration"],
  ]) {
    const bands = (id) =>
      byId.get(id).options.map((o) => o.measures.find((m) => m.id === measure));
    assert.deepEqual(
      bands(usual),
      bands(recent),
      `${measure} compares identical reported bands`,
    );
    assert.equal(byId.get(usual).meta.window, "past_month");
    assert.equal(byId.get(recent).meta.window, "last_7_days");
  }
  for (const id of ["q72", "q73"])
    assert.ok(
      byId
        .get(id)
        .options.every((o) =>
          o.measures.every((m) => m.id === "sleep_regularity"),
        ),
      "Sleep timing cannot supply sleep restoration",
    );
  for (const id of ["q100", "q102"])
    assert.ok(
      byId
        .get(id)
        .options.every((o) =>
          o.measures.every((m) => m.id === "sleep_restoration"),
        ),
      "Sleep restoration cannot supply timing",
    );
});
test("named sadness and relief do not silently become intense emotions", () => {
  const feeling = (id, option) =>
    byId
      .get(id)
      .options.find((o) => o.id === option)
      .signals.find((s) => s.layer === "feeling");
  assert.notEqual(
    feeling("q67", "b").value,
    "high",
    "Sadness without an intensity modifier is not high intensity",
  );
  for (const o of byId.get("q71").options)
    assert.ok(
      !["high", "moderate"].includes(
        o.signals.find((s) => s.layer === "feeling").value,
      ),
      "Relief is named without ranking its intensity",
    );
});
