# Genie Survey — Living Product Spec

Version 0.1 · 2026-09-14 · Planning draft · Owner: Jerry Zhang

## Product idea

Genie guides visitors through an entertaining questionnaire about personality, habits, and health or wellbeing in everyday life and work. The intended reward is a personality-style result worth sending to friends. The experience draws inspiration from the presence and reactions of Talking Tom/Talking Ben and the identity appeal of personality quizzes.

This is a new MirrorMii marketing project. Its monetization, product structure, questionnaire, result system, affiliate mechanics, and visual treatment will be developed with the founder. Current company grounding remains pending because live Lark access was unavailable in this session.

## Confirmed from the founder's brief

- Build a large marketing campaign around a survey-based website.
- Genie is the central character and helps the visitor complete the questionnaire.
- Explore personality, habits, and health in work and daily life.
- Make the experience fun and the outcome easy to share repeatedly.
- Broad audience reach is the ambition; the founder described the audience as “everybody.”
- Include an affiliate system in the product planning.
- Route survey answers, users, and account information into Lark Base, with agents able to read and write within the eventual defined system.
- Ground the project in MirrorMii company truth and imagery.
- Establish a dedicated environment and GitHub collaboration home.
- Begin with deep, iterative planning; the founder will provide visual direction and assets.

No launch date, budget, first market, audience age, price, reward amount, question count, result taxonomy, or production stack has been chosen.

## The first decision: what the visitor gets

These are alternatives for discussion, not approved product promises.

| Direction | Visitor takeaway | Sharing hook | Product consequence |
| --- | --- | --- | --- |
| A. Personality + daily habits | “That sounds like me.” | A named archetype friends can compare | Needs memorable original types, grounded explanations, and stable scoring |
| B. Lifestyle snapshot | “That explains my current routine.” | A current-state card and gentle reflection | Needs a stated time window and clear separation from enduring personality |
| C. Playful character match | “I got this Genie identity.” | Cute identity reveal or humorous reaction | Needs character variety and a stronger bridge to MirrorMii business value |

**Working recommendation:** explore A first, with current habits as explanatory detail. Keep enduring traits and recent behavior separate in both questions and results. This is a design hypothesis, not a validated personality instrument or an approved company claim.

The word “health” needs definition before writing questions: general energy/sleep/routine reflection, a health assessment, and clinical screening are different products. The current draft assumes no diagnosis or treatment output; any change to that scope requires a separate evidence and product design pass.

## Proposed visitor journey

1. A friend, creator, or campaign link promises a specific interesting result.
2. Genie welcomes the visitor and explains what they will get and the expected time.
3. The visitor answers short, clear questions. Genie acknowledges responses and helps with confusing wording.
4. A reveal presents an original identity or profile, reasons connected to answers, and a compact share card.
5. The visitor chooses what to share. A friend opens the shared result and can start their own quiz.
6. An optional next step offers saved results, a useful deeper experience, or a relevant MirrorMii product pathway.

Starting hypothesis: mobile web; guest start; a free result before optional account creation; short reactions that do not delay progress. Questionnaire length stays open. Test a short path and a deeper optional path instead of assuming a large campaign requires a long questionnaire.

## Genie's job

Genie should provide presence, warmth, progress, and a satisfying reveal. Explore idle, greeting, thinking, acknowledgement, encouragement, clarification, and reveal states. Tapping Genie may create a small delight; completing the questionnaire must remain clear.

Start by comparing scripted branching against conversational assistance. A language model is not required to choose every next question. If model-generated conversation is used, it must preserve the question's meaning, answer encoding, and scoring contract. Versioned scoring should remain reproducible independently of Genie's wording.

Open: voice or text, 2D or 3D, humor level, interruption frequency, whether answers are buttons or conversation, animation budget, and what changes between repeat visits. Audio must be optional; the journey must work without motion or sound.

## Questionnaire and result design

Build backward from the chosen result. For each question, record its purpose, dimension, options, skip behavior, scoring contribution, and which result explanation it supports. Avoid questions collected only because data may be useful later.

Proposed domains: social energy, planning/flexibility, work rhythm, recovery routines, and self-described daily energy. These are draft categories, not validated dimensions. The actual domains await founder direction and company alignment.

Before a pilot, define scoring, ties, missing answers, incomplete results, and result consistency. Freeze question and scoring versions for each participant. Skips must remain missing values rather than silently becoming negative scores. The same answers under the same versions should produce the same scored result. Generated wording must not invent evidence or change the score.

Use original names, question wording, scoring, and visuals. MBTI and 16Personalities are references for understandable identity and sharing; the project must decide its own promise and methodology.

## Distribution, sharing, and repeat use

Separate two loops:

- **Organic sharing:** complete → identify with result → share → friend visits → friend completes.
- **Affiliate acquisition:** partner link → eligible conversion → attribution validation → approved reward.

The result itself should be useful without recruiting others. Explore friend comparison, a small collectible result card, or a fresh themed edition as reasons to return. Repeating an unchanged personality test, answering a daily check-in, and sending the same result to another friend need separate metrics.

Broad reach remains the ambition. Choose one first distribution cohort so the team can test a specific promise. Candidate cohorts could be workplace friend groups, students, or existing MirrorMii followers; none is selected, and age/market boundaries remain open.

## Business model options

| Model | Free value | Revenue event | Main question |
| --- | --- | --- | --- |
| Audience and product funnel | Quiz + shareable result | Later MirrorMii product purchase or subscription | Which real company offer is relevant, and why? |
| Paid deeper result | Quiz + meaningful summary | One-time report or expanded experience | Is there enough added value to buy? |
| Recurring companion | Initial identity + introduction to Genie | Subscription for ongoing utility | What recurring job makes people come back? |

Affiliate rewards must correspond to the selected model. Decide whether they reward valid completion, qualified signup, or paid conversion. Paying for raw completions can encourage low-quality responses; test eligible-event quality before setting rewards.

No prices, commission percentages, payout promises, sales forecast, or paid plan are approved. Keep commission, payment fees, refunds, operating costs, and acquisition costs visible in unit economics.

## Measurement and learning

Define events before launch: landing view, quiz start, question seen, answer saved, quiz completed, result viewed, share attempted, shared-result visit, referred completion, optional signup, purchase, refund, and affiliate qualification. A share attempt is not proof a message was delivered.

Proposed measures:

- Completion rate = completed valid sessions / started sessions for a stated cohort and version.
- Attributed referral yield = eligible referred completions / original completed users for a stated observation window. Deduplicate and distinguish organic from paid sources.
- Result resonance = participant feedback on accuracy, usefulness, delight, and willingness to send to a named friend.
- Conversion and margin = chosen business outcome with costs and refunds included.
- Reliability = acknowledged submissions durably saved, sync lag, unresolved writes, duplicate rate, and recoverability.

Set pilot thresholds after choosing the promise, cohort, business outcome, and traffic plan. Any scenario calculator values are hypothetical, never observed performance.

## Lark and agent architecture

Confirmed destination intent: Lark Base houses the business records and supports agent operations. See `DATA-DESIGN.md` for a proposed model.

Recommended boundary for evaluation: public browser → server-side intake → durable handling/reconciliation → Lark survey records → bounded agent workflows. Whether temporary persistence or a separate authentication provider is acceptable remains open. Do not silently change the founder's all-in-Lark intent.

The company-canon Base and the future survey-response destination serve different purposes. No survey tables have been chosen or created. Decide whether the survey needs dedicated tables or its own linked Base after checking current schema, access, and capacity.

## Failure and trust requirements to settle before build

- Resume or clearly report an interrupted session; do not claim an answer was saved before durable acceptance.
- Reconcile an ambiguous Lark write before retrying creation. Use stable submission identifiers.
- Prevent one visitor from accessing another visitor's raw answers through share or account endpoints.
- Share only the selected result, never raw health answers, email, or account identifiers in URLs/cards.
- Keep marketing contact permission separate from quiz participation and optional sensitive questions.
- Define withdrawal/deletion, retention, account recovery, affiliate disputes, and handling of duplicate submissions.
- Choose supported markets and ages before deciding what personal and health information to collect.

These are product requirements to specify, not a claim that a legal or medical review has been completed.

## Planning sequence

1. **Promise:** result identity, emotional payoff, business purpose, and first distribution cohort.
2. **Experience:** Genie behavior, question format, reveal, share card, and optional signup.
3. **Method:** dimensions, question bank, scoring, time window, and result explanations.
4. **Economics:** paid value, affiliate event, attribution, rewards, and margin assumptions.
5. **Data:** current Lark schema, volume target, accounts, data boundaries, and agent permissions.
6. **Design:** founder references, canon asset selection, motion/audio, accessibility, and mobile performance.
7. **Pilot:** prototype with test data, user sessions, result quality, sharing observation, and intake failure tests.
8. **Build plan:** only after choices are reconciled, define the stack, milestones, task owners, and release criteria.

Planning continues through conversation. This document is the first structured draft, not an implementation-ready or approved specification.
