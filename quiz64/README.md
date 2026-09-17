# Genii 64 survey

The local React/Vite participant experience for the 56-question training flow and eight sealed checks. It uses the authored `src/data.js` and `src/engine.js` API from Task 1 and keeps attempt state in the browser under the engine's `KEY`.

```sh
/Users/jerryzhang/Workspace-Draft/system/bin/dev npm install
/Users/jerryzhang/Workspace-Draft/system/bin/dev npm run dev -- --port 4188
/Users/jerryzhang/Workspace-Draft/system/bin/dev npm run build
```

The production build uses `base: './'` and resolves local artwork through `import.meta.env.BASE_URL`, so the output can be served from a nested static directory. No runtime data requests, account, analytics, or backend are required; answers are not sent anywhere. The user can export a private JSON attempt at any point.

The UI is deliberately separate from the evidence implementation. It imports the stable engine functions `fresh`, `restore`, `setAnswer`, `freeze`, `stats`, and `exportAttempt`. `QuestionCard` owns only an uncommitted radio draft; Continue commits it. Heldout answers are read-only after commit and predictions remain absent from the participant-facing review until completion.

Desmond integration boundary: the current persistence adapter is localStorage under `genii.evidence64.v1`, with private JSON export and no account, server persistence, analytics, messaging, or survey API. Preserve the engine's versioned question IDs, contextual bindings, validation, terminal states, and the separation between training evidence and heldout checks when replacing storage. Notes are optional, unscored strings; any future retention of notes or identifiable responses needs an explicit product and retention design.

The final Genii type or character layer is intentionally deferred. A future layer should consume the evidence contract while preserving missing, mixed, thin, and abstained states. This build does not assign an MBTI equivalent or claim personality accuracy. See the run's `output/DESMOND-HANDOFF.md` for the complete extension map.

The canon asset provenance and destination checksums live in [`docs/ASSETS.json`](docs/ASSETS.json). Supplied Genii sprites and MirrorMii marks are copied unchanged; CSS controls only the portal compositing, framing, and motion.
