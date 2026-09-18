import test from "node:test";
import assert from "node:assert/strict";
import { QUESTIONS, ROUTE_SLOTS, MEASURES, VERSION } from "../src/data.js";
import { buildRoute } from "../src/engine.js";

const byId = new Map(QUESTIONS.map((q) => [q.id, q]));
const authored = (id, option) =>
  byId.get(id).options.find((item) => item.id === option);

test("v3 bank is a unique 32-profile plus 8-check implementation", () => {
  assert.equal(VERSION, "genii-switch-modes.v3");
  assert.equal(QUESTIONS.length, 40);
  assert.equal(QUESTIONS.filter((q) => !q.test).length, 32);
  assert.equal(QUESTIONS.filter((q) => q.test).length, 8);
  assert.equal(ROUTE_SLOTS.length, 40);
  assert.equal(new Set(QUESTIONS.map((q) => q.id)).size, 40);
  assert.deepEqual(
    ROUTE_SLOTS.flatMap((slot) => slot.candidates).sort(),
    [...byId.keys()].sort(),
  );
  for (const question of QUESTIONS) {
    assert.ok(question.title && question.setup && question.meta);
    assert.equal(new Set(question.options.map((o) => o.id)).size, question.options.length);
    for (const option of question.options) {
      assert.equal(option.why, option.text, `${question.id}/${option.id} literal receipt drift`);
      for (const tag of option.tags || []) assert.ok(tag.d && tag.v && tag.target);
    }
  }
});

test("conditional follow-ups are reachable only after authored parent answers", () => {
  const none = buildRoute({});
  for (const id of ["n08", "n20", "n22", "n24"])
    assert.equal(none.ids.includes(id), false);
  const full = buildRoute({ n07: "a", n19: "a", n21: "a", n23: "a" });
  for (const id of ["n08", "n20", "n22", "n24"])
    assert.equal(full.ids.includes(id), true);
  assert.equal(full.ids.length, 40);
  assert.equal(full.ids.slice(-8).every((id) => byId.get(id).test), true);
  const missing = buildRoute({ n07: "skip", n19: "other", n21: "no_example", n23: "skip" });
  assert.equal(missing.ids.length, 36);
  assert.ok(missing.omitted.every((item) => item.reason.startsWith("requires_authored_")));
});

test("reviewed wording patches separate action, motive, timeline, access, and feedback semantics", () => {
  assert.deepEqual(
    byId.get("n07").options.map((o) => o.text),
    [
      "Attended as planned",
      "Joined for part of it",
      "Suggested a different way to take part",
      "Declined and let them know",
    ],
  );
  assert.match(byId.get("n08").title, /mattered most/i);
  assert.equal(authored("n06", "b").text, "Be direct; I'll tell you whether it fits");
  assert.match(byId.get("n13").title, /Before deciding whether it was fair/i);
  assert.equal(authored("n13", "b").text, "Explained my side");
  assert.match(byId.get("n26").title, /^If a goal .* slipped behind schedule/i);
  assert.ok(byId.get("n02").options.some((o) => /local chances/i.test(o.text)));
  assert.ok(byId.get("n22").options.some((o) => /didn't change/i.test(o.text)));
});

test("routine projections are direct, paired, bounded, and leave variation unknown", () => {
  for (const [usual, recent, measure] of [
    ["n27", "n28", "sleep_restoration"],
    ["n29", "n30", "meal_regularity"],
    ["n31", "n32", "daytime_energy"],
  ]) {
    assert.ok(MEASURES[measure]);
    assert.equal(byId.get(usual).meta.window, "past_month");
    assert.equal(byId.get(recent).meta.window, "last_7_days");
    for (const id of [usual, recent]) {
      assert.equal(byId.get(id).meta.evidence, "self_report");
      for (const option of byId.get(id).options) {
        const records = option.measures || [];
        if (/varied|depended/i.test(option.text)) assert.equal(records.length, 0);
        else {
          assert.equal(records.length, 1);
          assert.equal(records[0].id, measure);
          assert.ok(records[0].value >= MEASURES[measure].min);
          assert.ok(records[0].value <= MEASURES[measure].max);
          assert.equal(records[0].label, option.text);
        }
      }
    }
  }
});

test("feeling and outward response remain separate literal records", () => {
  for (const option of byId.get("n23").options) {
    assert.equal(option.signals.length, 1);
    assert.equal(option.signals[0].family, "frustration");
    assert.equal(option.signals[0].layer, "response");
  }
  for (const option of byId.get("n24").options) {
    assert.equal(option.signals.length, 1);
    assert.equal(option.signals[0].family, "frustration");
    assert.equal(option.signals[0].layer, "feeling");
  }
  assert.ok(!QUESTIONS.some((q) => /diagnos|disorder|percentile/i.test(q.title)));
});
