# MirrorMii Genie Survey

A local Genii prototype: an attentive, playful conversation about personality, feelings, and everyday health routines.

**Stage: local implementation and review.** The active English build is [quiz64](quiz64/README.md), with 64 adaptive route slots and an integrated evidence portrait. The internal workspace project ID is `mirrormii-genie-survey`; the team repository is `Augustexe/mirrormii-survey`. Brand and character sources are recorded in [asset provenance](quiz64/docs/ASSETS.json).

Start with [the product spec](docs/PRODUCT-SPEC.md), [the decision register](docs/DECISIONS.md), and [the environment guide](docs/ENVIRONMENT.md). [The data design](docs/DATA-DESIGN.md) describes proposed Lark integration boundaries. [Research](docs/RESEARCH.md) separates outside examples from company truth.

This repository contains application source, specifications and collaborator instructions. This revision is local: production deployment, backend integration, business database writes, accounts and payments are outside its scope. Backend handoff remains Desmond's responsibility.

## Working together

1. Read `AGENTS.md` and the current decision register.
2. Use one branch per bounded change; update the spec and decision register together.
3. Distinguish founder requirements, verified company facts, proposals, and unknowns.
4. Review the behavior and evidence before merging. Never put survey responses or credentials in Git.

The founder selected the existing [Augustexe/mirrormii-survey](https://github.com/Augustexe/mirrormii-survey) team repository. The Taste revision is isolated on `codex/genii-taste-survey`. This work does not push, merge or publish. Inspect current remote conventions before any later integration; older planning/access notes are historical evidence.
