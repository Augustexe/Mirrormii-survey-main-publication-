# Genii Evidence Display V1

Status: **candidate product contract; not a visual implementation or approved public result**  
Machine contract: `RESULT_DISPLAY_V1` in `quiz64/src/question-bank-v1.js`

## Display thesis

The result should feel like one memorable Genii read, then let the respondent inspect how it was earned. It is not a dashboard of personality percentages.

```text
memorable read
→ strongest supported patterns
→ inside/outside distinctions
→ short reasons
→ exact receipts on demand
→ unknowns and counterexamples
→ separate prediction booth
→ correction
```

## Default compact result

### 1. Your current Genii read

Show, in order:

- one provisional identity label, only when an exact audited claim is available;
- one central tension, only when exact audited synthesis language is available;
- the scope line: “This describes patterns in the situations you answered, not your whole personality.”

If no audited identity claim passes, do not invent one. Use the honest fallback:

> **A few patterns are showing up. Genii is not naming the whole creature yet.**

### 2. The patterns that actually showed up

Display at most three supported or mixed patterns. Each row contains:

- human endpoint labels, never 0–5 or a percentage;
- `supported`, `mixed`, `thin` or `unknown` in plain language;
- number of independent situations;
- one context split when relevant;
- expandable counterexample.

Example shape:

> **When things stall: more likely to create a next move**  
> Supported in three separate situations · different pattern in one higher-stakes setting  
> `Why?`

The prose above must be an audited claim before use. Until then, render the approved axis label and endpoint without adding a sentence.

### 3. What happened outside / what happened inside

Keep evidence kinds visibly separate:

| Outside | Inside |
| --- | --- |
| Reported actions | Reported emotions |
| Communication and repair choices | Selected fantasies |
| Boundaries and follow-through | Selected temptations |
| Context-specific response patterns | Desired understanding |

Use labels such as “You said you did…,” “You reported feeling…,” and “In an imagined no-fallout prompt, you selected…”. Never collapse these into “You are…”.

Projective content is private by default and collapsed behind:

> **A private pull you recognized**

It never appears in share-safe output without a future explicit public allowlist and separate consent design.

### 4. Why Genii thinks this

Default collapsed. First expansion shows short neutral receipts:

- situation label;
- exact neutral meaning of the selected answer;
- actual / repeated report / hypothetical / stated preference;
- context: setting, audience and stakes;
- counterexample when present.

A second explicit action may reveal exact private answer wording. Other text is never promoted into an authored score.

### 5. What Genii is not claiming

Always display at least one relevant limit:

- “We did not see enough independent situations yet.”
- “Your answers differed by context, so Genii kept both patterns.”
- “This came from an imagined situation, not a report of what you did.”
- “This does not establish a formal trait, diagnosis or probability.”

Unknown is a valid result state, not an error screen.

### 6. Did Genii call it?

Held-out checks appear only after profile and baseline predictions are frozen.

For this base bank, report item-level outcomes only:

- prediction;
- answer;
- match / mismatch / abstention;
- fixed no-profile baseline answer;
- explicit line: “One check per pattern is exploratory and is not an accuracy score.”

Never convert five checks into a personality-accuracy percentage.

### 7. Your right of reply

Every interpretation supports:

- Fits
- Partly fits
- Does not fit
- Prefer not to say

The response is an immutable correction overlay. It does not silently rescore the snapshot or count as a prediction hit.

## Private evidence view

Adds:

- all eligible audited claims;
- exact answer receipts;
- source status and source-unit identity;
- context splits and counterevidence;
- missingness reasons;
- corrections;
- next validation prompts.

## Share-safe view

Disabled in Question Bank V1 because both public allowlists are empty. A later bank version must approve exact claim templates and axis labels. Runtime callers cannot enable sharing by supplying their own IDs.

When enabled, share-safe must omit:

- exact private answers;
- fantasies, temptations and desires;
- sensitive contexts;
- missingness;
- correction reasons;
- receipts and debug scores;
- any generated paraphrase.

## Visual hierarchy

1. One large identity/tension surface.
2. Two or three pattern rows.
3. Inside/outside reveal.
4. Evidence drawer.
5. Unknowns and limits.
6. Prediction booth.
7. Correction controls.

The interface may be playful and animated. Animation cannot imply confidence, goodness, diagnosis or measurement precision.

## Approval gaps

- Exact identity labels and synthesis claims are not yet authored or audited.
- Public axis names and endpoints are not approved.
- No human session establishes comprehension or usefulness.
- No held-out performance claim is justified by five exploratory checks.
- No share-safe content is enabled.
