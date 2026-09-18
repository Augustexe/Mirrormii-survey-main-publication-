# MirrorMii Genie Survey

A local Genii prototype: an attentive, playful conversation about personality, feelings, and everyday health routines.

**Stage: approved visual baseline; question-bank and evidence refinement in progress.** The active English build is [quiz64](quiz64/README.md), with 64 adaptive route slots and an integrated evidence portrait. The internal workspace project ID is `mirrormii-genie-survey`; the team repository is `Augustexe/mirrormii-survey`. Brand and character sources are recorded in [asset provenance](quiz64/docs/ASSETS.json).

Start with [the product spec](docs/PRODUCT-SPEC.md), [the decision register](docs/DECISIONS.md), and [the environment guide](docs/ENVIRONMENT.md). [The data design](docs/DATA-DESIGN.md) describes proposed Lark integration boundaries. [Research](docs/RESEARCH.md) separates outside examples from company truth.

This repository contains application source, specifications and collaborator instructions. This revision is local: production deployment, backend integration, business database writes, accounts and payments are outside its scope. Backend handoff remains Desmond's responsibility.

## Working together

1. Read `AGENTS.md` and the current decision register.
2. Use one branch per bounded change; update the spec and decision register together.
3. Distinguish founder requirements, verified company facts, proposals, and unknowns.
4. Review the behavior and evidence before merging. Never put survey responses or credentials in Git.

## Team quick start

Use Node.js 24 and npm from the repository root:

```sh
npm ci --prefix quiz64
npm run dev --prefix quiz64
npm test --prefix quiz64
npm run build --prefix quiz64
```

Open the URL printed by Vite. Open `/preview.html` on that same origin for synthetic result fixtures without completing the quiz.

Read [the team handoff](docs/TEAM-HANDOFF.md), [the evidence review](docs/EVIDENCE-REVIEW.md), [the glossary](CONTEXT.md), and [the complete answer-to-evidence map](quiz64/docs/QUESTION-MAP.md).

The approved visual baseline is commit `b0d7a89b964e0c0d00adec1093435a570f606343`. Preserve its layout and design while iterating the question bank and inference rules. The earlier `demo30/` is retained as historical prototype source; active development belongs in `quiz64/`.
