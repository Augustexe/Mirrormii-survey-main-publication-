# Genii conversation design

2026-09-17. Current presentation pass: `codex/genii-launch-visuals`, based on `codex/genii-voice-polish`. The [launch visual refinement](LAUNCH-VISUALS.md) supersedes presentation details below; questionnaire and evidence requirements remain unchanged.

## Design read

The product is an observant, playful host for North American participants of all genders. Its first job is to make everyday behavior feel recognizable. The visual system should feel airy, tactile, curious and composed, while keeping one question and its answers unmistakably central.

Use an explicitly white canvas, purple as a secondary accent, graphite typography, a small number of translucent surfaces, and the canonical Genii. A new glass sculpture provides depth around the supplied character, without changing its design. It is an environment asset, not a replacement mascot or a new canon master.

Taste settings: design variance 7, motion intensity 5, visual density 3. Apply the installed Leonxlnx `design-taste-frontend` and `redesign-existing-projects` skills to presentation. The approved survey specification governs routing, evidence, answer collection and results. User requirements for purple/lilac and descriptive bars override generic skill exclusions.

## Presentation decisions

- Opening: one concise invitation, one useful promise and one primary action; asymmetry from the visual composition rather than competing panels.
- Questions: clear recall window and scenario, distinct readable answer rows, inline answer-specific acknowledgment, optional elaboration and a deliberate Continue. No extra reaction screens after every response.
- Progress: real route counts and named chapters; changing context replaces questions inside the same route rather than presenting irrelevant screens.
- Portrait: a continuous editorial layout with measured routine axes, explicit endpoints, separate confidence, usual/recent distinction, and expandable source evidence. No arbitrary health percentage or implied peer percentile.
- Review: True/False sits beside each interpretation and records the participant's feedback without rewriting the result. Technical checks remain in progressive disclosure.
- Motion: purposeful arrivals, short state transitions and responsive controls. Respect reduced motion and reduced transparency. Do not use animation to hide loading or scoring uncertainty.
- Responsive: preserve the same content hierarchy at 320 px through desktop; shorten visual decoration before reducing answer readability.

## References considered

- [React Bits](https://reactbits.dev/) was inspected as an animation/component reference. No component code or license obligations are imported merely by viewing it; the existing Motion dependency covers this build's needs.
- [Motion accessibility](https://motion.dev/docs/react-accessibility) recommends respecting the operating system's reduced-motion setting. The implementation uses the installed Motion version and CSS fallbacks; no remote runtime dependency is required.
- [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) documents modal focus, labeling and Escape behavior. These are acceptance criteria for the existing dialog implementation, not a claim that Radix is installed.

## Prior full-build review gates

The current copy/visibility pass reuses existing tests and performs a focused browser review. The longer process below records the preceding build; it is not another required checklist for this pass.

1. Data and route: every reachable slot resolves once; equivalents preserve purpose; Other, Skip, no example and automatic omission remain distinct.
2. Evidence: direct reports, events and hypothetical choices retain provenance and windows. Internal feeling, outward action and recovery never silently substitute for each other.
3. Interaction: complete a real 64-question route, edit context, resume, inspect evidence, review claims and export. Confirm predictions remain hidden until checks are resolved.
4. Visual: inspect desktop/mobile, question and portrait states, the explicit light theme, long answers and unknown evidence. Compare the actual render with the prior build.
5. Accessibility: keyboard, focus return/trapping, selected state, contrast, reduced motion/transparency, enlarged text, narrow/short viewports and automated axe checks.
6. Delivery: production build, local performance measurements, independent review, isolated commit, source/build handoff and SHA-256 receipt. No publication.

Automated checks establish behavior and measurable presentation properties. They do not certify design awards, personality validity, health efficacy, or a quantitative Taste score.
