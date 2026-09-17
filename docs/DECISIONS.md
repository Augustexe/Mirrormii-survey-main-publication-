# Decisions and remaining choices

Updated 2026-09-17 · Owner: Jerry · Authority: latest conversation and [active personality/health contract](PERSONALITY-HEALTH-SPEC.md). Earlier decisions below remain historical where explicitly superseded.

## Active revision — 2026-09-17

| ID | Decision and effect on earlier direction |
| --- | --- |
| D-015 | Root survey blends personality, health habits and emotional context. Supersedes D-003's exclusion of health from the main purpose; it does not authorize diagnostic claims. |
| D-016 | Preserve the broadly good current bank and repair coverage, repetition and question–answer agreement. Baseline is quiz64 at ec89aa7, 56 context/training plus eight heldout items; legacy M-001/M-002/M-004/M-010 do not describe it. |
| D-017 | Result is an integrated portrait with routine/behavior bars and separate confidence. Supersedes the card/reveal-led priority; final family/stencil/one-liner assignment under D-012 is deferred. |
| D-018 | Capture internal feelings, outward response and recovery separately. Quietness is not proof of low emotional intensity. |
| D-019 | True/False preserves the original result and records feedback only. Supersedes any D-010/D-011 or founder-brief rule that changes evidence, confidence or the portrait from endorsement. Explicit survey-answer edits remain separate. |
| D-020 | Include Other, fully bypass known-inapplicable prompts, distinguish custom/no-experience/skip/omission, and retain versioned provenance. Exact Other scope and unknown-context behavior remain open. |
| D-021 | Jerry delegated Q4. Selected benchmarks: frozen unseen-choice predictions versus a no-profile baseline, and reported usual-versus-pressure behavior. Keep evaluation, contextual contrast and endorsement separate. No peer ranking or health-quality score selected. |
| D-022 | Q5 confirmed: usual patterns and recent state are shown separately. Exact recall windows are open. |
| D-023 | After an expanded explanation, Q6 confirmed all three sleep layers: direct usual routine, directly reported recent changes, and contextual sleep behavior/prediction. No exact timing/duration inferred from unrelated personality choices. |
| D-024 | Q7 requests health coverage broader than sleep, eating, movement and rest/energy. Additional areas and proposed recall windows remain open. |
| D-025 | Q8 confirms all seven feeling families: frustration/anger, worry, disappointment/sadness, embarrassment, guilt, joy/excitement and relief. |
| D-026 | Q9 places feedback-only True/False beside each individual interpretation. |
| D-027 | Q10 selects relevant replacements to maintain roughly 60 questions per route. Supersedes the recommendation to default to a shorter route; requires a larger bank of applicable alternatives. |

The active [Product Spec v0.4](PRODUCT-SPEC.md) and [core specification](PERSONALITY-HEALTH-SPEC.md) govern this revision. Approximately 60 questions remains the working scale; do not reinstate old 12/30/96 tiers as current requirements. Backend remains Desmond's scope. Record unresolved choices during the grilling interview before dependent runtime changes.

Fresh native Lark reads succeeded on 2026-09-17. Relevant schema/vision/emotion sources include drafts, and the aggregate packet remains incomplete. See runs/20260917T193810Z-a886d9810122/output/COMPANY-CONTEXT.md for sources/states. Historical access failures below do not describe current native access.

## Historical product direction — 2026-09-14

| ID | Decision and current scope |
| --- | --- |
| D-001 | Dedicated MirrorMii survey marketing project; local MVP implementation is now authorized, superseding planning-only status |
| D-002 | Genie guides a funny, cheeky conversation and character reveal |
| D-003 | The full brief supersedes the initial wellbeing framing: playful behavioral inference, not a wellness assessment or diagnosis |
| D-004 | Broad reach, sharing, comparison, disagreement and an eventual affiliate system are intended |
| D-005 | Lark Base is the intended operational home for survey, user and account business records; production architecture is still open |
| D-006 | Current company truth comes from canonical Lark; canon imagery comes from Eagle metadata and founder direction |
| D-007 | Develop source for team collaboration through GitHub |
| D-008 | Use the existing `Augustexe/mirrormii-survey` repository; inspect and reconcile its source/instructions before integration |
| D-009 | Three nested depths: quick 10–12, medium 25–35, deep roughly 80–120 prompts; deep mode uses short resumable chapters |
| D-010 | Important latent signals recur through different masks; context, contradictions and explicit corrections matter |
| D-011 | Confidence represents evidence progression; accusations and honest prediction checks are core interaction mechanics |
| D-012 | Character summoning uses roughly 6–8 core families plus secondary tendencies; entertaining public identity and private explanation are separate layers |
| D-013 | Keep the tone loving and specific; avoid clinical/deterministic claims, humiliation and moralized answers |
| D-014 | Build the local working loop now; remote publication, Lark business writes, authentication changes and payments are outside this work |

At that stage, the full brief selected a character identity supported by a behavioral reading. D-017 now changes this iteration's primary result and defers final character assignment. Attention/sharing and future personalization remain context; paid offer and business conversion are still undecided.

## Historical MVP implementation choices — 2026-09-14

These choices make the prototype concrete. They do not claim psychological validation or final founder approval of every question, weight, family name or production architecture.

| ID | Choice | Rationale / remaining validation |
| --- | --- | --- |
| M-001 | 12 / 30 / 96 nested questions | Within the brief's ranges; measure actual completion times and fatigue |
| M-002 | Nine draft behavioral signals; eight provisional families | Enough evidence variety and recognizable identities for a testable first bank |
| M-003 | Deterministic ES-module scoring and authored dialogue | Reproducible readings, corrections and prediction checks without external model credentials |
| M-004 | Dependency-free browser app, Node 24 development server, standalone HTML build | Reviewable locally, including when this execution session cannot bind a port |
| M-005 | Guest start and versioned localStorage with resume/deletion | Complete the MVP loop without pretending production accounts or Lark storage exist |
| M-006 | Existing unchanged Genii V2 expressions retained as fallback and provenance | PNG-only presentation is superseded by M-009 for this local prototype; canon still has one guide identity |
| M-007 | Public identity allowlist for PNG/result URL; local referral/affiliate preview | Exercise sharing while keeping private evidence out of public exports and avoiding fake commission |
| M-008 | Two original generated draft references remain historical prototype evidence | New render has two interactive reference sheets under M-009; neither generation nor code variant replaces a canon master |
| M-009 | Mobile-first living-pearl Genii and glass-panel redesign | User-authorized 2026-09-14: local procedural WebGL character variant, cursor gaze, tap reactions, canon image fallback, owned scene/charm imagery, readable swipe cards and phone navigation; no Eagle master mutation |
| M-010 | Keep the lightweight ES-module stack with scoped offline bundling | Existing survey logic stays unchanged; native WebGL and CSS implement the requested motion without a framework/runtime dependency |

## Remaining product and production decisions

| ID | Open decision | When needed |
| --- | --- | --- |
| Q-004 | First distribution cohort, markets, languages and age range | Before a public pilot |
| Q-007 | Final family/visual mapping, copy intensity, voice/audio and expanded motion | After reviewing the working reveal and existing character fit |
| Q-008 | Question/weight tuning, evidence thresholds, confidence calibration and held-out validation | Before claims of accuracy or improvement; refine through prototype tests |
| Q-009 | Account value, timing, minimum information and recovery | Before cross-device saving or account launch |
| Q-010 | Paid offer, price experiment and connection to verified MirrorMii products | Before monetization claims or checkout |
| Q-011 | Eligible affiliate event, attribution window, qualification, reversals, commission and payout | Before a real affiliate program |
| Q-012 | Whether all-in-Lark allows a durable temporary queue and external identity provider | Before production backend selection |
| Q-013 | Survey Base/tables, agent read/write roles and automated intake authority | Before any business-data provisioning or write |
| Q-014 | Traffic/throughput targets, retention, deletion and support ownership | Before production data collection |
| Q-015 | Pilot sample, thresholds, observation windows, launch timing, budget and collaborators | Before interpreting campaign metrics or launching |

At the 2026-09-14 stage, Q-001/Q-003/Q-005/Q-006 were retired. The current revision reopens result structure under D-017 and includes health habits under D-015; it does not reinstate clinical assessment. Legacy nested-depth counts are not the current root requirement. Q-002's commercial event remains under Q-010/Q-011. Current specification choices are tracked in the core document.

## Historical verification snapshot — 2026-09-14

Current Eagle metadata identifies authorized V2 master expressions of one Genii. Current Lark company content remains pending. Fresh checks on 2026-09-14 still encounter this session's network-disabled sandbox, loopback EPERM and Lark Keychain initialization failure. This does not establish broken native logins.

Remote contents, team conventions and default branch remain unverified; no push or integration has occurred. Local feature verification belongs to the current MVP run's evidence, separate from these product decisions. Record future changes with date, scope and the decision they supersede.
