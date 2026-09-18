# Genii survey workspace

Start with [project context](context/README.md). The maintained [working set](context/WORKING-SET.md) contains the evidence, questions, ICP and psychology documents to edit. [Current state](context/CURRENT.md) separates confirmed requirements, implemented behavior and experimental candidates.

**Source distinction:** this checkout's `src/` is the older 12/30/96-question prototype. The approved 64-question React app is in the release worktree identified by [CODE-MAP.md](context/CODE-MAP.md). The newest 40-question bank is an evaluated candidate and is not installed in either app. Choose the correct source before running tests or changing questions.

`context/` holds maintained knowledge. `docs/` is a compatibility link to that folder. Project runs hold frozen outputs, evaluation results and receipts; see the [run catalog](context/history/RUN-CATALOG.md). No historical run was deleted.

For the older prototype only, existing commands remain `npm run dev`, `npm test`, `npm run check`, and `npm run build`. Use the approved app's own package scripts for R6 work. Central workspace execution follows AGENTS.md and the managed toolchain; generated artifacts belong in an allocated run.

Read [AGENTS.md](AGENTS.md) before editing. No public release, backend change or new company capability is implied by this documentation consolidation.
