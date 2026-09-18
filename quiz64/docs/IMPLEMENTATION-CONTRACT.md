# Genii host survey implementation contract

2026-09-17. User explicitly authorized implementation of the discussed spec. Prior interview pauses are superseded. Root owns integration and review; Luna workers own bounded source areas. No publication/backend work.

## Product decisions for this build

- Keep a 64-slot respondent route (56 context/training + 8 internal checks), within the approved roughly-60 scale. Use one eligible candidate per slot from an expanded bank. Every slot must have a generic applicable fallback. Keep relevant context replacement, not unrelated padding. No forced 20 extra checks.
- Existing D1-D14 semantics remain useful. Bank authors may replace weak scenes and add direct health and emotional records. Preserve source IDs where meanings remain the same; changed meaning gets a new ID. Bank/version must change.
- Fixed default windows: usual past month; recent last seven days; actual latest event in month. No-example distinct from skip/other/system omission. Body/skin and optional health context are factual reports. No clinical score or advice.
- Trait bars are descriptive positions with explicit endpoints, not health scores or probabilities. Ordinal direct measures may have usual/recent positions; show the selected band/label rather than false precision. Confidence is separate qualitative evidence coverage.
- Internal emotion, outward action and recovery are separate literal records; cover all seven feeling families without assigning every respondent a feeling they did not report.
- Context selection governs applicable prompts. Unknown context uses neutral generic alternatives, not invented household/partner facts. Changing a context invalidates dependent observations/notes/Other and all frozen checks; preserve old claim-feedback snapshots separately.
- Current UI uses a stable route index, not an index into the entire candidate bank.
- Responsive host copy is answer-specific. Never count a reflection as a prediction hit. Per-claim True/False records snapshots only.

## Data API (bank worker)

Keep current required question fields and exports: VERSION, CHAPTERS, DIMS, QUESTIONS. QUESTIONS becomes the candidate bank; QUESTIONS_BY_ID may be exported as convenience.

Add ROUTE_SLOTS: ordered array of `{id, candidates:[questionId,...]}`. Exactly 64 slots, the final eight holdouts. Candidate order is preference; each slot ends in an always-applicable fallback where needed. Each question belongs to one slot only; replacement candidates have equivalent intended construct/context function. No separate exponential route variants.

Question: `{id, chapter, title, setup, role, test, applicable, options, baseline, meta?}`. Retain current tags/why/facts option fields. `applicable` may be legacy `close` or `shared`, absent for all, or `{fact, values:[...]}` for explicit optional context. Object eligibility requires a direct matching fact; unknown is false for the specific candidate and routes to generic fallback.

`meta`: `{domain, window, evidence, emotionFamily?, counterpart?, source?}`. Windows exactly `past_month`, `last_7_days`, `latest_instance_past_month`, `scenario` or null. Evidence role uses `self_report`, `actual_event`, `hypothetical`, `self_description`; existing context/actual/hypo role allowed with normalized provenance.

Option extensions:

- `reaction`: short literal host reflection, optional; do not generate personality claims from unsupported motives.
- `measures`: array of `{id, value, label?}` where `value` is an ordinal/number declared in MEASURES and label is the actual selected band. Question meta owns the recall window. Do not encode unsupported midpoints as precise measurements.
- `signals`: array of `{family, layer, value, label}`. Family: `frustration`, `worry`, `disappointment`, `embarrassment`, `guilt`, `joy`, `relief`; layer: `feeling`, `response`, `recovery`. Only literal supported fields. No automatic conversion of an action into felt intensity.

MEASURES export: dictionary `{id:{domain,label,low,high,min,max,unit,description}}`. Ordinal axes use unit `ordinal`; endpoints describe routine/behavior, not good/bad health. Reuse a measure ID across usual/recent so display can compare windows; do not collapse windows. Direct timing/duration bands may remain facts rather than axes. Core desired axes include sleep regularity, meal routine, movement consistency, felt energy/restoration, body/skin attention; choose few well-supported measures rather than one universal health bar.

## Engine API (engine worker)

- Keep KEY, VERSION-compatible fresh/restore, selected, label, facts, evidence, profile, freeze, stats, setAnswer, exportAttempt. Existing profile may remain the legacy group array; add `portrait(state)` for UI instead of changing every legacy group consumer.
- `buildRoute(answers)` -> `{ids, omitted:[{questionId,slotId,reason}], replacements:[{slotId,questionId}], total:64}`. Derive from answers deterministically.
- `setAnswer(state,id,value,meta={})` mutates and returns state. Special values: `other`, `skip`, `no_example`. `meta.otherText`, `meta.note` stored separately, bounded to 1200 chars. Invalid choice/sentinel/question/route entries rejected. Holdout answered only after freeze; immutable thereafter.
- State retains answers/notes/cursor/started/locked/testSeen; adds attemptId, other, feedback, resultHistory as needed. State cursor means route position. New versioned storage key; old raw keys stay untouched. Never imply a migrated legacy attempt fits changed question meanings.
- `freeze(answersOrState)` returns frozen training profile, direct facts, route, evidence and predictions. Support state for metadata. `portrait(state)` returns the current frozen profile when locked or current eligible training evidence otherwise.
- `portrait(state)` -> `{id,version,title,summary,claims,domains,emotions,facts}`. Claim `{id,text,dimension,target,confidence,evidenceIds,observations}`. Domain `{id,label,description,axes:[{id,label,low,high,min,max,unit,usual,recent,confidence,evidenceIds}]}`; usual/recent nullable `{value,label,sourceIds}`. Emotions array `{family,label,feeling:[],response:[],recovery:[]}`; each record `{value,label,questionId,window}`. Missing measures remain null. `facts` plain map (direct only).
- `reviewClaim(state,claimId,boolean)` appends/updates versioned endorsement event with exact claim/result/evidence snapshot; does not mutate the portrait, bars, evidence weights, confidence or predictions. Existing feedback persists attached to old snapshots after answer edits.
- `stats(state)` retains current hits/predicted/answered/abstained/skipped/baselineHits/trials names for compatibility, adds explicit eligibility/other/no-example counts as needed. No Other text scoring; holdouts never enter profile.
- `exportAttempt` includes versioned route/omission evidence, answers/Other/notes, observations, portrait, claim reviews, and evaluation with existing prediction secrecy until checks resolved. No arbitrary internal field leakage.

## Survey helpers / UI boundary

Engine worker exports survey helpers for root UI: `routeQuestions(state)`, `trainingQuestionsFor(state)`, `testQuestionsFor(state)`, `routeIndex(id,state)`, `nextOpenIndex(state,from=0,includeTests=false)`, `resolvedTraining(state)`, `resolvedTests(state)`, `chapterCount(state,chapterId)`, `chapterFor`, `asset`, `interpolate`, `safeTitle`, `optionText`, `applicable`, `questionStatus`, `personLabel`. Route progress uses eligible slot counts. `nextOpenIndex` never returns hidden candidates. Root will rewrite App/QuestionCard/result/dialogs to this contract.

## Verification

Meaningful tests: solo/no-close/unknown routing, all64slots, context edit invalidation incl notes/Other, Others/noexamples/skips distinct, usual/recent no mixing, quiet action not inferred calm feeling, feedback immutability and restore/export snapshots, holdout leakage/ties/abstention/denominators, malicious/invalid saved state and export hiding. Root browser verifies complete64flow, edits, resume, feedback, keyboard/dialogs, mobile320/390 and desktop1440, light/dark/reduced motion, storage denial. No fabricated accuracy claims.
