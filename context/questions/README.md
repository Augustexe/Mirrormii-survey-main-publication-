# Questions

There are three banks/states to keep distinct:

- **Approved R6 baseline:** [R6 author map](../../../runs/20260918T011159Z-16d23238fdf9/scratch/handoff/quiz64/docs/QUESTION-MAP.md) and source in that approved handoff. 76 candidates → 64 route slots (56 + 8).
- **Frozen failed experiment:** [EXPERIMENTAL-40.md](EXPERIMENTAL-40.md) and [experimental-40.json](experimental-40.json). These v2 bytes and their evaluation must not be rewritten.
- **Switch Modes v3 implementation test:** current branch `codex/evidence-first-survey-implementation`, [implemented map](../../quiz64/docs/QUESTION-MAP.md), and `quiz64/src/data.js`. It has 32 profile/context candidates, four conditional follow-ups, and eight sealed checks. This is implemented and verified locally, but not deployed or automatically approved as the replacement survey.

Read [author notes](BANK-AUTHOR-NOTES.md), [shared-source synthesis](SOURCE-SYNTHESIS.md), [source-to-bank map](SOURCE-TO-BANK-MAP.md), [next revision](NEXT-REVISION-PATCHES.md), and [integration map](BUILD-INTEGRATION-MAP.md). These existing artifacts are the starting point; do not create another disconnected bank.

Before changing wording or mappings again, start a new candidate version. Preserve the exact frozen v2 and the v3 implementation evidence in their runs. The original evaluation's hashes and scores only apply to its original bytes; v3 contract tests do not retroactively improve that failed result.
