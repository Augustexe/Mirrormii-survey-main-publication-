# Genii 64 survey

Genii is a local React/Vite survey experience with a deterministic, context-aware route. Each attempt has 64 ordered route slots: 56 training questions followed by eight internally authored heldout checks. The bank contains replacement candidates so close-person, household, solo, and unknown context can choose an eligible scene without inventing a fact or showing an inapplicable question.

The implementation contract is [`docs/IMPLEMENTATION-CONTRACT.md`](docs/IMPLEMENTATION-CONTRACT.md). Product, health/personality, and host behavior requirements are [`../docs/PRODUCT-SPEC.md`](../docs/PRODUCT-SPEC.md), [`../docs/PERSONALITY-HEALTH-SPEC.md`](../docs/PERSONALITY-HEALTH-SPEC.md), and [`../docs/HOST-EXPERIENCE.md`](../docs/HOST-EXPERIENCE.md).

## Run locally

```sh
/Users/jerryzhang/Workspace-Draft/system/bin/dev npm install --prefix quiz64
/Users/jerryzhang/Workspace-Draft/system/bin/dev npm run dev --prefix quiz64 -- --port 4188
/Users/jerryzhang/Workspace-Draft/system/bin/dev npm run build --prefix quiz64
```

The build uses a relative base path and local assets. It has no runtime data requests, account, analytics, backend, messaging, or survey API. Answers stay in the browser unless the respondent explicitly downloads the private JSON export.

## Developer result preview

Open `preview.html` beside the survey entry to inspect complete, mixed, sparse, or fully skipped synthetic answers immediately. The preview invokes the same engine and result component, uses independently authored heldout answers, marks exports synthetic, and never writes survey localStorage. The development landing page links to it. It is a local review surface, not an authenticated admin page; remove the separate preview entry from a public build if it should not be discoverable.

The current visual detail contract is in [`docs/LUMINOUS-DETAILS.md`](docs/LUMINOUS-DETAILS.md), building on [`docs/LIVING-WORLD.md`](docs/LIVING-WORLD.md) and [`docs/LAUNCH-VISUALS.md`](docs/LAUNCH-VISUALS.md).

## Evidence behavior

`src/engine.js` owns routing, validation, evidence rows, profile groups, descriptive domain bars, emotion layers, heldout predictions, statistics, restore, and export. `src/survey.js` exposes route-aware helpers to the UI. The current route is derived from the answers and records omitted candidates with reasons. Context changes clear dependent answers, notes, and Other text, as well as all frozen checks; prior frozen results and claim feedback remain in separate history snapshots.

Training evidence freezes before the eight checks are shown. Heldout answers never enter the profile, portrait, or prediction sources. A prediction can abstain when exact support is too thin or tied. Export keeps respondent-owned answers, including already given check responses, while unresolved check options, scores, evaluation, and future check titles remain hidden until every terminal check is answered.

The portrait contains literal evidence claims only for repeated supported patterns. Thin and mixed groups remain inspectable without becoming claims. Domain axes preserve separate usual past-month and recent last-seven-day values with separate qualitative evidence confidence. Direct facts, actual events, hypotheticals, self-reports, and endorsements retain distinct provenance. Emotion records keep feeling, outward response, and recovery as separate layers across the authored families; a quiet action does not imply a calm feeling.

`skip`, `no_example`, and `other` are distinct. Skip is a missing response; no-example is meaningful for actual-event questions and is unscored; Other stores optional bounded text and is unscored. Notes are optional bounded strings and never affect scoring. There is no clinical score, diagnosis, calibrated probability, population benchmark, or claim of scientific personality accuracy.

Per-claim True/False feedback appends an immutable result, claim, and evidence snapshot. It does not alter the portrait, evidence weights, confidence, or predictions. Restore recomputes frozen snapshots from complete validated training answers, rejects forged history, validates exact feedback bindings, clamps the route cursor, and removes hidden or invalid candidate answers. The current versioned key is `genii.evidence64.v2`; the prior legacy key is left untouched. The UI also uses `genii.heldout-seen.v1` for prior check exposure and `genii.motion.v1` for motion preference. If localStorage is unavailable, the tab remains usable and the UI explains that the respondent should keep the tab open or export answers.

## Verification

From the project root, the managed test command is:

```sh
/Users/jerryzhang/Workspace-Draft/system/bin/dev npm test --prefix quiz64
```

The owned engine suite passed all 18 tests on 2026-09-17, and the full bank-plus-engine suite passed all 26 tests after the bank's `q102` candidate was assigned to the route. The production build also passed. The covered engine behavior includes 64-slot routing across context combinations, missingness and Other semantics, direct recall windows, literal emotion layers, heldout secrecy and abstention, context invalidation, immutable feedback, malformed and forged restore payloads, private export filtering, prior exposure, and source mutation.

The final browser interaction evidence is recorded in the allocated run's [review handoff](docs/RELEASE-REVIEW.md).
