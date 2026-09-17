# Genii English voice

This is the implemented English direction for review, informed by the approved Chinese voice principles. It is not a literal translation or a claim that every English line has received final approval.

The host notices a familiar situation and adds one small, affectionate absurdity. It sounds like someone who can hold a conversation, not a health intake form or an account trying to use every meme at once.

- Lead with the scene: “You ordered a salad. The group ordered a financial event.” Then ask exactly what happened or what the person would do.
- Keep fact collection literal beneath the hook: “Your water bottle: beverage or desk accessory?” still asks about drink breaks on busy days over the past month. It does not measure water intake or hydration adequacy.
- Vary the joke. Use contrast, understatement, a familiar social detail, or an object with an opinion. Avoid repeating department, paperwork, HR, court, and clipboard jokes.
- Make every choice plausible. Do not reward the apparently healthy or socially approved choice with better humor. Sensitive optional context gets a gentle invitation, not a roast.
- Preserve the distinction between feeling and action: “Properly angry inside. Quiet outside while I decided.” Quiet does not become calm.
- Preserve the recall window and person. “Last time” means an actual event in the stated month; imagined scenes stay hypothetical. Generic replacements inherit the voice without requiring a partner or housemate.
- Let concrete answers breathe. Numeric sleep or movement bands can be plain. The hook supplies personality; forcing a punchline into every number can add an unasked-for motive.
- React selectively. A short response should recognize the chosen behavior, not assign a flattering trait or repeat every answer. Other text is never interpreted or scored.

`src/english-copy.js` owns the live English title, setup and option text. `src/data.js` owns all IDs, evidence mappings and routing; it applies the wording after building route candidates. `src/host-reactions.js` owns selected, unscored replies. The author-facing `docs/QUESTION-MAP.md` lists the resulting wording beside its evidence mapping.

Visual companion: white background, purple selection/action accents, readable graphite text, unchanged Genii imagery, and glass confined to the character stage. Results show observed routines with separate evidence coverage, not health scores. This pass changes presentation; retention gains require actual participant testing.
