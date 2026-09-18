# Genii product and engineering handoff

## Approved baseline

Jerry approved the current visual design and layout. Commit `b0d7a89b964e0c0d00adec1093435a570f606343` is the frozen visual reference. This handoff preserves its entire app source and assets. No question or engine changes accompany publication.

The `release/genii-approved-design` branch reconciles the previously independent local history with GitHub's initial commit, preserving both histories. This is source publication for team iteration, not website deployment.

## Active application

`quiz64/` is the React/Vite application. Use the portable commands in the root README. `preview.html` contains labeled complete, mixed, sparse and skipped synthetic fixtures; it does not write respondent storage. It is not an authenticated admin route.

- Questions, options, routing and evidence mappings: `quiz64/src/data.js`.
- Playful English wording: `quiz64/src/english-copy.js`; maintain option meanings and IDs when editing copy.
- Parsing, scoring, routing, frozen predictions, restore and feedback: `quiz64/src/engine.js`.
- UI helpers: `quiz64/src/survey.js`.
- Full author review map: `quiz64/docs/QUESTION-MAP.md`.
- Current product constraints: `docs/PERSONALITY-HEALTH-SPEC.md`, `docs/HOST-EXPERIENCE.md`, `docs/DECISIONS.md`.

## Next product decisions

See `docs/EVIDENCE-REVIEW.md`. Separate overly broad dimensions; decide how real-event versus hypothetical evidence should contribute; preserve contextual differences instead of interpreting them as contradictions. The interview recommendations remain proposals. Confidence uses source counts and is not calibrated accuracy. No new weights or thresholds are approved by this handoff.

## Backend boundary

The current engine runs locally in the browser and saves attempts in localStorage. No production API, authentication, business-record sync, clinical scoring or AI inference service is implemented. Backend integration remains Desmond's scope. Preserve held-out exclusion, original result snapshots and feedback-only True/False behavior. Other text and notes remain unscored. Never commit respondent exports or credentials.

## Verification

The approved baseline passed 26 bank/engine tests, production build, and desktop/mobile browser review. Its assets and application source are unchanged in this documentation/integration handoff. Verify clean-install tests and build for this branch before integration. Earlier machine-local commands and review paths in historical docs are provenance, not prerequisites for other developers.
