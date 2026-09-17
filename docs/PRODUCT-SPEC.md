# Genii Personality and Health Survey — Product Spec

Version 0.4 · 2026-09-17 · Owner: Jerry Zhang · Status: specification refinement; next implementation pending shared understanding

**A funny conversation that reveals how you feel, respond, and handle everyday health routines.**

The root survey blends personality, emotional context and health-related habits. Questions remain recognizable, surprising and affectionate; traceable evidence makes the interpretation useful. The existing bank is broadly good. Repair coverage, repetition and routing rather than replace it wholesale.

The active detailed contract is [PERSONALITY-HEALTH-SPEC.md](PERSONALITY-HEALTH-SPEC.md). Jerry's latest decisions govern over earlier documents. The [founder brief](FOUNDER-BRIEF.md) remains creative and historical source material; its personality-only framing, correction-based rescoring and example percentages are superseded where they conflict with the active contract. Original v0.3 documents are preserved in this specification run's output/reference directory.

## Scope and implementation status

The review baseline is the React quiz64 app at commit ec89aa7: 64 authored questions, comprising 56 context/training questions and eight internal heldout checks. It has deterministic evidence mappings, separate unscored notes, missing-evidence handling and conservative prediction abstention. Technical verification does not establish personality accuracy.

This revision concerns the root survey, evidence semantics and private result. It does not reactivate the earlier 12/30/96-depth implementation or require final Genii family names, one-liners or character matching. Each route should stay around 60 questions using relevant replacements from an expanded bank when questions are omitted. Broader health coverage beyond sleep, eating, movement and rest/energy is confirmed; the additional domains remain open.

Backend integration belongs to Desmond. Production accounts, Lark writes, payments, publication and remote integration remain separate work. This document records requirements; it does not claim that Other, full adaptive bypass, emotional measurements, domain bars or True/False review are implemented.

## Confirmed experience

| Moment | Required behavior |
| --- | --- |
| Start | Explain the playful personality-and-health-habit purpose plainly; retain the brand assets and established visual direction |
| Answer | One coherent situation and response frame; short, distinct choices whose literal meaning matches the question |
| Express a different answer | Offer Other, distinct from Skip or no recalled experience; keep custom text separate from authored categorical scoring |
| Adapt | Omit known irrelevant questions entirely and use relevant replacements; solo households must not encounter shared-household chores or an N/A screen |
| Build a portrait | Separate usual patterns from recent state, and internal feelings from outward action and recovery |
| Read the result | One integrated portrait with routine/behavior bars, separate confidence and accessible evidence |
| Review an interpretation | True/False beside each individual interpretation logs feedback while preserving the original result, bars, confidence and evidence |
| Test a prediction | Freeze an unseen-choice prediction before the answer; report agreement and coverage separately from endorsement |

Preserve the approved Simplified Chinese voice and semantic parity when localization resumes. This round develops English and the shared evidence contract. Humor should live in the scenario and phrasing without making answer categories ambiguous. Keep author-facing datapoint mappings outside respondent quiz copy.

## Evidence model

Keep direct self-reports, actual-event accounts, hypothetical intentions, inferences, comparisons and respondent endorsements distinct. Actual-event accounts remain self-reports, not externally observed behavior. Question scenery alone does not support an additional dimension.

Each observation needs stable question/option IDs, version, role, context/relationship target, explicit recall window where relevant, and its literal measurements or authored tags. Each inference needs source IDs, contrary evidence, role composition and method/version. Unknown, skipped, omitted and custom responses must not become neutral or negative trait evidence.

The emotional contract separates **internal feelings, outward response and recovery**. Someone can feel intense anger and speak calmly. Silence alone does not establish calmness; directness alone does not establish aggression. Emotional recovery, relationship repair and physical rest are not interchangeable measures.

Seven feeling families are confirmed for bank coverage: frustration/anger, worry, disappointment/sadness, embarrassment, guilt, joy/excitement and relief. These are scenario families, not permanent labels or a validated emotional scale.

Current direct health facts are q17 bedtime band, q20 takeaway dinner days and q46 movement days. Other health questions mostly concern choices under pressure. These facts cannot establish sleep adequacy, diet quality, fitness or overall health. Select intended claims before adding the measurements needed to support them.

Survey-answer edits are distinct from True/False review. Answer edits replace or supersede observations and recompute affected eligibility. Review feedback attaches to the original result snapshot and never silently changes it.

## Sleep scope — confirmed

Include all three layers:

1. **Usual routine:** directly reported bedtime, wake time, duration and regularity.
2. **Recent changes:** directly reported disruption and restfulness, separate from usual patterns.
3. **Contextual behavior:** evidence-backed interpretations and predictions about protecting or delaying sleep when work, stress or a need for personal downtime interferes.

Do not guess exact clock times or duration from unrelated personality answers. An interpretation such as “you delay sleep to decompress when overwhelmed” needs observations supporting both the action and the stated reason. Exact windows, units and response formats are still to be specified.

## Result and confidence

The main result is an integrated portrait, not a grid of identity cards. Routine/behavior bars use meaningful labels and endpoints or units. Show usual patterns and recent state separately. Keep evidence and uncertainty accessible through progressive disclosure. Final character templates and comic identity labels are deferred.

A bar's position must not double as confidence or an overall health score. Numeric percentages require a defined meaning; decorative “72% healthy,” “80% anxious” or implied population percentiles are not authorized. Missing evidence is not zero. Confidence describes evidence coverage and its limits; the demo establishes no calibrated probability.

True/False means “this interpretation fits me / does not fit me.” Preserve the exact statement, result version and evidence snapshot, then log the response separately. Neither answer changes the profile or counts as another supporting observation, a prediction hit, or a reason to force clarification. Unanswered review is neither agreement nor disagreement.

## Selected benchmarks

Jerry delegated benchmark selection. Use two separate comparisons:

1. **Predictive value:** frozen predictions on unseen situations versus a predictor without the personal profile. Both receive the same permitted scenario/context information. Report eligible/answered items, predictions attempted, abstentions, matches and baseline results so agreement cannot hide low coverage.
2. **Context sensitivity:** reported usual behavior versus behavior under pressure. In one session this describes a self-reported contrast, not measured improvement, longitudinal change or proof of predictive accuracy.

The handoff's 80% target and independent 20-item test are historical proposals, not achieved results or automatically approved acceptance thresholds. The eight current internal checks do not fulfill that independent protocol. Peer rankings and clinical/health-quality comparisons are outside the selected benchmarks. True/False resonance remains separate.

## Visual direction and accessibility

Retain Genii brand colors and authorized assets, strong typography, readable glass surfaces and purposeful motion. Preserve asset provenance; exploratory artwork is not a canon master. The result should become cohesive and expressive without hiding evidence behind decorative numbers.

Use one clear current question and primary action. Support keyboard navigation, visible focus, readable contrast, mobile scrolling and reduced motion. Long choices and Other input must work on narrow screens; sticky controls cannot cover content. Motion must not block answers or access to the result.

Earlier visual work remains a reference, not authority to restore obsolete depth cards, rescoring interactions or character assignments. Final layout and bar scales require the remaining specification decisions.

## Acceptance requirements for the next implementation

These are future requirements, not a report of passing checks.

| Area | Required evidence |
| --- | --- |
| Adaptive route | Solo/no-selected-person contexts omit irrelevant prompts without interstitials; backtracking updates eligibility and progress |
| Other and missingness | Choice, Other, Skip, no actual example and system omission remain distinct; custom text is not silently mapped to a scored category |
| Question integrity | Stem and answers share a subject, scenario and actual/hypothetical/routine frame; repeated scenes are reviewed through a counterpart map |
| Emotion | Feeling, action and recovery have separate evidence; calmness or explosive behavior is not inferred from an unrelated choice |
| Health | Each routine/behavior claim has direct or explicitly inferential support; source facts are not repackaged as predictions |
| Time context | Usual and recent evidence remain separate; no trend is implied from a first session |
| Result bars | Every axis has named endpoints/units, a defined scale, source IDs, a missing state and separate confidence |
| Feedback | Both True and False preserve the result/confidence, record versioned endorsement and cannot affect prediction evaluation |
| Evaluation | Heldout answers never enter the frozen profile; baseline information rules match; abstentions and denominators are visible |
| Accessibility | Mobile/desktop, long text, keyboard, focus and reduced-motion flows work with routing and review controls |
| Handoff | Question map, evidence schema, source/version provenance and known limits are reviewable by Desmond |

Use independent review for implementation. Jerry requested Luna for implementation and coordinating-agent verification; no next-version implementation has been dispatched from this specification interview.

## Company grounding and source authority

Fresh native reads on 2026-09-17 verified MirrorMii OS Base revision 201 and relevant Wiki/source documents. TwinsXM schema revision 27 includes personality, sleep/fatigue, diet, activity and psychology/emotion; its corresponding Brand Facts row is draft. The draft company Emotion × Mechanism Map provides creative vocabulary, not a respondent scoring scale. Sally's 80% intent is attributed in the supplied handoff, which also says the framework awaits her confirmation.

The protected aggregate packet remains incomplete. Targeted reads succeeded; do not describe Lark as generally inaccessible or treat drafts as approved capabilities. Source links, revisions and states are in output/COMPANY-CONTEXT.md; exact implementation gaps are in output/SPEC-GAP-AUDIT.md.

Specification run: runs/20260917T193810Z-a886d9810122.

## Open decisions

Round 3 confirmed broader health coverage, all seven feeling families, claim-level True/False and relevant replacements to maintain roughly 60 questions. Additional health domains, recall windows, scales, detailed Other behavior and unknown-context routing remain open. Q7's request for broader coverage did not confirm the suggested past-month/last-seven-days windows. The [core specification's decision tree](PERSONALITY-HEALTH-SPEC.md#11-interview-decision-tree) records status. Recommendations are not accepted decisions; record answers before implementing dependent behavior.
