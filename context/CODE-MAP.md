# Source map — select the right app before editing

Verified locally 2026-09-18 after branch cleanup.

The registered `project/` checkout is now local branch `main` at cleanup commit `8b2dfe1`, ahead of `origin/main` by one local context-reconciliation commit. It contains maintained `context/` masters, `docs -> context`, and the approved React/Vite app under `quiz64/`. Use `quiz64` commands to validate the approved app; the older 12/30/96 prototype branches were removed as branch names and preserved only in historical detached run worktrees / backup bundle.

The wrapper [approved-app](../../approved-app) link still points to the existing release worktree's `quiz64/`. That worktree is at `b8cf8eccddbe441c8a6bdc53e6791c418bfd2684` detached after cleanup; it formerly tracked `release/genii-approved-design`. The approved visual ancestor is `b0d7a89b964e0c0d00adec1093435a570f606343`. Preserve that review baseline; use an explicitly allocated implementation worktree for future code edits.

| R6 concern | Existing file |
|---|---|
| Candidate IDs, literal mappings, dimensions, measures, route slots | [data.js](../quiz64/src/data.js) |
| Respondent English wording | [english-copy.js](../quiz64/src/english-copy.js) |
| Host replies | [host-reactions.js](../quiz64/src/host-reactions.js) |
| Observations, claims, prediction and routines | [engine.js](../quiz64/src/engine.js) |
| Session, freeze, restore and feedback | [survey.js](../quiz64/src/survey.js) |
| Author question/evidence map | [QUESTION-MAP.md](../quiz64/docs/QUESTION-MAP.md) |
| Implemented interface contract | [IMPLEMENTATION-CONTRACT.md](../quiz64/docs/IMPLEMENTATION-CONTRACT.md) |
| App commands | [package.json](../quiz64/package.json) and [README](../quiz64/README.md) |

The experimental JSON in this context folder is an authoring candidate, not a module consumed by the app. Read the [integration map](questions/BUILD-INTEGRATION-MAP.md) before designing an adapter. New schemas must version question meanings, missingness, source roles, target/window fields, routing and saved-state behavior explicitly.

Current maintained context takes precedence over stale copied documentation in any historical worktree. Re-read the central context at the beginning and end of a task. Do not overwrite local changes or retarget the approved-app link without recording the new revision and reason.
