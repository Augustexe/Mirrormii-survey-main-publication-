# Genii 64 survey

The local React/Vite participant experience for the 56-question training flow and eight sealed checks. It uses the authored `src/data.js` and `src/engine.js` API from Task 1 and keeps attempt state in the browser under the engine's `KEY`.

```sh
/Users/jerryzhang/Workspace-Draft/system/bin/dev npm install
/Users/jerryzhang/Workspace-Draft/system/bin/dev npm run dev -- --port 4188
/Users/jerryzhang/Workspace-Draft/system/bin/dev npm run build
```

The production build uses `base: './'` and resolves local artwork through `import.meta.env.BASE_URL`, so the output can be served from a nested static directory. No runtime data requests, account, analytics, or backend are required; answers are not sent anywhere. The user can export a private JSON attempt at any point.

The UI is deliberately separate from the evidence implementation. It imports the stable engine functions `fresh`, `restore`, `setAnswer`, `freeze`, `stats`, and `exportAttempt`. `QuestionCard` owns only an uncommitted radio draft; Continue commits it. Heldout answers are read-only after commit and predictions remain absent from the participant-facing review until completion.

The canon asset provenance and destination checksums live in [`docs/ASSETS.json`](docs/ASSETS.json). Supplied Genii sprites and MirrorMii marks are copied unchanged; CSS controls only the portal compositing, framing, and motion.
