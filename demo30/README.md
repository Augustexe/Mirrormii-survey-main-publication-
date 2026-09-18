# Genii English evidence demo — 30 questions

Local experimental demo requested by Jerry on 2026-09-17. This branch is independent of the existing, dirty prototype; its unrelated source is untouched.

## Run

Open the standalone `output/demo/index.html` in a browser, or serve that directory on localhost. The current review session serves it at http://127.0.0.1:4186. No runtime install, API key, external font, asset download or backend is required.

Source commands (Node 22+):

```sh
node --test tests.mjs
node build.mjs /absolute/output/directory
```

The build includes all code and styles in one HTML file. The browser version stores answers in the separate key `genii.evidence30.v1`. A respondent can export their own JSON or delete browser answers. Export files are private and not automatically uploaded. Optional written notes remain unscored. The demo makes no network request except loading its local HTML.

## What this tests

Exactly 30 numbered slots: 24 context, scenario, habit and recent-experience questions; six held-out scenario choices. An inapplicable household item is visibly accounted for as skipped for solo living. Every answered choice has an authored evidence mapping and rationale. Direct facts are separate from inferred behavior. Mother, father, chosen close friend, group friends, colleagues and household have distinct context keys.

The reading groups categorical observations by dimension and target. One observation is thin; ties are mixed; a leading category backed by at least two observations and two-thirds of the local evidence is a repeated pattern. Other categories remain visible, not silently discarded. A playful headline cites repeated categories; the detailed evidence is more useful than the headline.

Before question 25, the first 24 answers, profile and predictions freeze. Held-out answers never enter the profile. Scores are averages of smoothed, matching-context category frequencies; absent evidence contributes zero. Require two distinct source questions for the winning option; close ties abstain. This is not a trained or calibrated psychological model. A fixed, predeclared no-profile answer key provides a debugging baseline, not population performance. Compare both on the same scored subset; also display abstentions and skips. Six authored, related scenarios test near-transfer, not independent broad generalization.

Test answers are final for an attempt. Changing training answers invalidates the frozen snapshot and clears all six test answers. A practice marker persists after such edits. Start fresh deletes the attempt; the UI explicitly says reset cannot make seen questions unfamiliar again. A fresh unfamiliar-scenario check requires a respondent who has not seen the checks.

## Coverage limits

The handoff includes D1–D14, with D14 split into sleep, eating, movement and recovery (17 displayed dimensions). The demo has a potential observation for each, but actual choices can leave dimensions unobserved. D2, D5 and D11 have only one training opportunity each. This does not meet the full handoff's minimum eight observations per dimension. D14a–c are self-reported habit facts, not inferred health traits. No income, diagnosis, nutritional quality or physical fitness is inferred.

Chinese tone remains approved in the separate Chinese voice skill. English is a new test bank with edited grammar and repeated joke structures reduced. The latest user requested this 30-question experiment; it is not approval of a new permanent question count or scoring standard.

## Validation

13 unit tests and a real Chromium browser flow cover bank integrity, source attribution, relationship separation, skips, unsupported predictions, frozen holdout exclusion, resume, edits, practice status, fixed baseline denominator, full flow, exports, escaped notes, unavailable storage, and 320/390/768-pixel layouts. Screenshots contain synthetic test responses, not user data. An independent review identified and prompted fixes for unsupported evidence, target mixing, restore invariants and an overbroad headline.

No user has completed this demo yet. No actual personality accuracy or virality result is claimed. Company Base/Wiki context was not refreshed because this implementation uses the supplied handoff and current user decisions, not new company claims.
