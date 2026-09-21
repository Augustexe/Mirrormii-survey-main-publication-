# Current state and next work

## Evidence framework V1 candidate

Status: local implementation candidate on `codex/evidence-framework-v1`, not wired into the respondent UI and not a validated personality instrument. The maintained [evidence framework](EVIDENCE-FRAMEWORK.md) now defines the stable pipeline `Response → EvidenceEvent → Predicate → AuditedClaim → ProfileSnapshot → ProductProjection → ResultCard`. Questions and visual renderers are replaceable adapters; the immutable profile snapshot is canonical. The first module and owned tests live in `quiz64/src/evidence-framework.js` and `quiz64/tests/evidence-framework.test.mjs`.

The framework borrows 16Personalities' stable-axis compression, not its opaque scoring or authority. Five product-only axes are implemented as reviewable defaults. Current V4 observations can be preserved but do not receive axis predicates until Jerry and the agent approve explicit question/answer mappings. No merge, deployment, backend mutation, psychometric validity, human usefulness, archetype validity or production approval is implied.

## Local V4 language candidate — Astra

Status: local-only implementation based on `533c3da`, not a replacement for the historical approval record below. Respondent wording across the 52-item V4 bank, host, result and disclosures is revised in `fm/genii-language-astra`; see [implementation and validation](../quiz64/docs/ASTRA-IMPLEMENTATION.md) and the [pre-edit audit](../quiz64/docs/ASTRA-LANGUAGE-AUDIT.md). Evidence metadata and prediction mappings are pinned to the base commit. Sequential Council audit remains pending; no merge, push, deployment, production-readiness or human-validation claim is implied.

As of 2026-09-18. The Switch Modes v3 implementation test is complete on isolated branch `codex/evidence-first-survey-implementation`; it is not deployed or automatically approved as the replacement survey.

## What we are building

A playful, perceptive Genii conversation that earns a specific provisional portrait from traceable answers. Keep recognition/fun, prediction performance and demonstrated product benefit separate. North America, all genders, English first is the confirmed broad direction. The 21–25 “surrounded but unrooted” cohort is a proposed test wedge, not proven ICP or age eligibility.

The current implementation test explores a memorable behavioral tension and contextual exceptions with lighter routine collection. Its thesis is: **the useful portrait is not a permanent type; it is the pattern between the situation, what mattered, and what the person did.** It does not force belonging trouble onto every user.

## Three different states — do not conflate

| State | Exact location | Status |
|---|---|---|
| Registered checkout | `project/`, local branch `main`, cleanup commit `chore: reconcile maintained survey context` | Consolidated on top of `origin/main` with maintained `context/` masters and `docs -> context`. Local branch is ahead of `origin/main` by this cleanup commit; push/publication still awaits user review. |
| Approved R6 app | `project/quiz64` and [approved app source](../../runs/20260918T011159Z-16d23238fdf9/scratch/handoff/quiz64), release handoff `b8cf8eccddbe441c8a6bdc53e6791c418bfd2684` | React/Vite `quiz64`: 76 candidates, 64 route slots, 56 profile/context plus 8 frozen checks. Visual approval tied to ancestor `b0d7a89b964e0c0d00adec1093435a570f606343`. The registered checkout now contains the approved app and its tests; current public serving revision is not asserted here. |
| Frozen experimental bank | [40-item bank](questions/EXPERIMENTAL-40.md), [structured bank](questions/experimental-40.json) | Tested candidate v2 and failed source fidelity. Preserve it unchanged as evaluation evidence. |
| Switch Modes v3 implementation test | Branch `codex/evidence-first-survey-implementation`; run `20260918T225142Z-26f0b1b07248`; current map `quiz64/docs/QUESTION-MAP.md` | 32 profile/context candidates plus 8 sealed checks; 36–40 questions after four conditional follow-ups. Implements literal receipts, bounded linked-event claims, routine unknowns, tone-aware teaching, and a goal-aware CTA without CSS/layout changes. Tests/build pass; independent second-pass review has no blockers. Not deployed. |

## Latest evaluation result

Read the [final report](../../runs/20260918T174625Z-7724d715c4d8/output/FINAL-REPORT.md) and [independent audit](../../runs/20260918T174625Z-7724d715c4d8/output/FINAL-JUDGE-AUDIT.md). Both raw LLM output bundles failed source fidelity. The sparse fixture round matched 5/9 attempts, equal to its fixed-option baseline; the constructed coverage round matched 27/32 versus 14/32 baseline but still misreported selected goals, preferences and choices. These are synthetic development fixtures, not population accuracy or real-user demand. Corrected previews are later drafts, not successful retests.

The prior [single-persona evaluation](../../runs/20260918T022609Z-a8f52a6beecf/output/DEMO-REPORT.md) also failed to show incremental prediction value. Do not repeat either experiment from scratch without stating which unresolved failure the new run tests.

## Next bounded work

1. Review the five product axes, endpoint language and support gates in [EVIDENCE-FRAMEWORK.md](EVIDENCE-FRAMEWORK.md).
2. Jerry and the agent design a versioned question/answer bank whose options compile into explicit predicates, exits and claim limits.
3. Audit and map the V4 bank only where semantics genuinely match; never infer a mapping from prose tags or wording similarity.
4. Wire the approved mappings through `ProfileSnapshot`, projection and result-card views while preserving held-out separation and source-unit deduplication.
5. Run a fresh evaluation whose scorer reads machine-owned fields/receipts, then conduct real respondent comprehension and usefulness sessions.
6. Keep merge, deployment, publication and production approval as separate explicit decisions.

## Preserve across every revision

- `ProfileSnapshot` is immutable canonical truth; archetypes, prose, bars and layouts are versioned derived renderings.
- True/False records feedback on the original result; it does not rewrite that result or predictions. Explicit answer edits create a child snapshot.
- Held-out answers never enter the profile used to predict them. Freeze before exposure, retain abstentions and matched baselines.
- Written Other is unscored. Skip, no-example and system omission are distinct; unknown does not mean negative.
- Preserve relationship target, event, source type and time window. Several tags from one answer are not independent corroboration.
- Usual month and recent seven days remain separate. Feelings, outward action, recovery and explicitly reported motive remain distinct.
- Direct routine reports are not personality-derived health facts. Source-count confidence is not calibrated probability.
- Preserve approved R6 layout and white-primary/purple-accent direction unless the task changes them. Canon masters remain separate from generated visuals.

## Delivery and authority caveats

The [GitHub handoff receipt](../../runs/20260918T011159Z-16d23238fdf9/output/HANDOFF.md) records a pushed release branch and draft PR. Cleanup run `20260918T185614Z-d3866265df8a` fetched `origin/main`, consolidated local `main`, removed prior local branch names, and deleted the old remote iteration branches `origin/codex/genii-prismatic-cards` and `origin/release/genii-approved-design`; a bundle backup is in that run output. A later [Pages receipt](../../runs/20260918T030737Z-81f7fc188af6/output/GITHUB-PAGES-DEPLOYMENT.md) records publication of an older static build; it does not establish that the current local `main` cleanup commit is deployed. The [Sites attempt](../../runs/20260918T025353Z-3e58f67cffc3/output/DEPLOYMENT-REPORT.md) did not return a deployment URL. These are historical receipts, not fresh remote checks. Old blanket “never pushed” and environment-failure statements describe their original run only.

Current company capability grounding was not refreshed in this documentation audit. Use native authorized Lark reads when a task needs business truth; a local source-map access snapshot is not a live outage diagnosis.
