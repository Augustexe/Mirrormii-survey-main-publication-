# Root v2 question map

Version: **genii-root.v2**. The route contains 56 training slots and 8 sealed checks. Every candidate is assigned to exactly one slot.

## Route slots

| Slot | Candidates in preference order | Primary domain | Window | Evidence |
| --- | --- | --- | --- | --- |
| slot-01 | q01 | context | Context | self_report |
| slot-02 | q02 | context | Context | self_report |
| slot-03 | q03 | personality | Scenario | hypothetical |
| slot-04 | q04 | personality | Scenario | hypothetical |
| slot-05 | q05 | personality | Scenario | hypothetical |
| slot-06 | q06 | personality | Scenario | hypothetical |
| slot-07 | q07 | personality | Scenario | hypothetical |
| slot-08 | q08 | personality | Latest · past month | actual_event |
| slot-09 | q09 | personality | Scenario | hypothetical |
| slot-10 | q10 -> q81 | personality | Scenario | hypothetical |
| slot-11 | q94 | health | Usual · past month | self_report |
| slot-12 | q13 | personality | Scenario | hypothetical |
| slot-13 | q95 | health | Usual · past month | self_report |
| slot-14 | q15 -> q82 | personality | Scenario | hypothetical |
| slot-15 | q16 | personality | Latest · past month | actual_event |
| slot-16 | q17 | health | Usual · past month | self_report |
| slot-17 | q18 -> q83 | emotion | Scenario | hypothetical |
| slot-18 | q19 -> q84 | emotion | Scenario | hypothetical |
| slot-19 | q20 | health | Recent · last 7 days | self_report |
| slot-20 | q21 -> q85 | emotion | Latest · past month | actual_event |
| slot-21 | q22 -> q86 | emotion | Scenario | hypothetical |
| slot-22 | q23 -> q87 | emotion | Scenario | hypothetical |
| slot-23 | q24 -> q88 | emotion | Scenario | hypothetical |
| slot-24 | q29 -> q89 | personality | Latest · past month | actual_event |
| slot-25 | q30 -> q90 | emotion | Latest · past month | actual_event |
| slot-26 | q31 | personality | Scenario | hypothetical |
| slot-27 | q32 | personality | Latest · past month | actual_event |
| slot-28 | q65 | emotion | Latest · past month | actual_event |
| slot-29 | q66 | emotion | Latest · past month | actual_event |
| slot-30 | q67 | emotion | Latest · past month | actual_event |
| slot-31 | q68 | emotion | Latest · past month | actual_event |
| slot-32 | q69 | emotion | Latest · past month | actual_event |
| slot-33 | q70 | emotion | Latest · past month | actual_event |
| slot-34 | q71 | emotion | Latest · past month | actual_event |
| slot-35 | q33 | personality | Scenario | hypothetical |
| slot-36 | q41 | personality | Scenario | hypothetical |
| slot-37 | q42 | personality | Scenario | hypothetical |
| slot-38 | q43 | health | Scenario | hypothetical |
| slot-39 | q44 | health | Latest · past month | actual_event |
| slot-40 | q45 | health | Scenario | hypothetical |
| slot-41 | q46 | health | Recent · last 7 days | self_report |
| slot-42 | q47 | health | Latest · past month | actual_event |
| slot-43 | q74 | health | Usual · past month | self_report |
| slot-44 | q75 | health | Usual · past month | self_report |
| slot-45 | q77 | health | Usual · past month | self_report |
| slot-46 | q78 | health | Context | self_report |
| slot-47 | q97 | health | Usual · past month | self_report |
| slot-48 | q98 | health | Recent · last 7 days | self_report |
| slot-49 | q99 | health | Usual · past month | self_report |
| slot-50 | q101 | health | Usual · past month | self_report |
| slot-51 | q72 | health | Usual · past month | self_report |
| slot-52 | q73 | health | Recent · last 7 days | self_report |
| slot-53 | q76 | health | Recent · last 7 days | self_report |
| slot-54 | q100 | health | Usual · past month | self_report |
| slot-55 | q102 | health | Recent · last 7 days | self_report |
| slot-56 | q96 | health | Latest · past month | actual_event |
| slot-57 | q57 | personality | Scenario | hypothetical |
| slot-58 | q58 -> q92 | emotion | Scenario | hypothetical |
| slot-59 | q59 | personality | Scenario | hypothetical |
| slot-60 | q60 | personality | Scenario | hypothetical |
| slot-61 | q61 | health | Scenario | hypothetical |
| slot-62 | q62 -> q93 | emotion | Scenario | hypothetical |
| slot-63 | q63 | personality | Scenario | hypothetical |
| slot-64 | q64 | personality | Scenario | hypothetical |

## Candidate records

Each option lists literal observations. Tags are legacy scored observations. Measures are direct reported bands. Signals are emotion records with an explicit layer.

### q01 | Who gets the unfiltered version of you?

- Slot: slot-01; chapter: 1; role: context; test: no
- Domain: context; subject: close_person; window: Context; evidence: self_report
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: Who gets the unfiltered version of you? Setup: Before the story starts, choose the recurring close person who may appear later.
  - a: My mother. She has the complete chat history. facts={"close":"mother"} reaction="Your mother has the receipts. Noted."
  - b: My father. An unexpected but strong contender. facts={"close":"father"} reaction="Unexpected contender officially on the board."
  - c: My partner. They have seen the extended cut. facts={"close":"partner"} reaction="The extended cut has been screened."
  - d: A close friend. Unfortunately, they know the lore. facts={"close":"friend"} reaction="Your friend knows the lore. Dangerous, useful."
  - e: No recurring close person for this survey. facts={"close":"none"} reaction="No recurring close person; we’ll keep the frame open."

### q02 | Who lives with you and the collection of useful cables?

- Slot: slot-02; chapter: 1; role: context; test: no
- Domain: context; subject: household; window: Context; evidence: self_report
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: Who lives with you and the collection of useful cables? Setup: Pick the closest living arrangement; a mixed answer is welcome.
  - a: Just me. Every mysterious noise is my problem. facts={"household":"alone"} reaction="Just you, with the place to yourself."
  - b: People I share a home with. The sponge has a rota. facts={"household":"shared"} reaction="A shared home, with the sponge rota."
  - c: Family. Privacy is more of a suggestion. facts={"household":"family"} reaction="Family household; privacy stays a suggestion."
  - d: I would rather leave the household unspecified. facts={"household":"unspecified"} reaction="Household unspecified. That’s okay."

### q03 | Three free days and enough money for one small trip. Who comes to mind first?

- Slot: slot-03; chapter: 1; role: hypothetical; test: no
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: Three free days and enough money for one small trip. Who comes to mind first? Setup: A light opener: the tickets are not bought yet.
  - a: The person who would make the story funniest. tags=[{"d":"D1","v":"people","target":"general"}] reaction="A funny story gets first casting rights."
  - b: The place. I need a destination before a companion. tags=[{"d":"D1","v":"task","target":"general"}] reaction="Destination first. The map has the floor."
  - c: Me. I am taking the free days and negotiating later. tags=[{"d":"D1","v":"self","target":"general"}] reaction="You are taking the days; negotiations can follow."
  - d: Nobody yet. I open a map and see what happens. tags=[{"d":"D1","v":"task","target":"general"},{"d":"D3","v":"improvise","target":"general"}] reaction="Nobody yet. Letting the map improvise is allowed."

### q04 | A local suggests a detour nobody has reviewed online. Your move?

- Slot: slot-04; chapter: 1; role: hypothetical; test: no
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: A local suggests a detour nobody has reviewed online. Your move? Setup: The detour is safe enough, strange enough, and inconvenient enough.
  - a: Absolutely. The review section can meet us there. tags=[{"d":"D2","v":"novel","target":"general"},{"d":"D3","v":"improvise","target":"general"}] reaction="You are willing to let the review section catch up in person."
  - b: Ask a few questions, then decide. tags=[{"d":"D2","v":"conditional","target":"general"},{"d":"D3","v":"plan","target":"general"}] reaction="Questions first, then the detour gets a vote."
  - c: Keep the original route. Reliable is a beautiful word. tags=[{"d":"D2","v":"familiar","target":"general"},{"d":"D3","v":"plan","target":"general"}] reaction="Original route selected; reliability has a fan."
  - d: Try it only if the person with me is keen too. tags=[{"d":"D2","v":"conditional","target":"general"}] reaction="The companion’s yes matters here."

### q05 | The saved restaurant has a 90-minute queue and your companion is starving.

- Slot: slot-05; chapter: 1; role: hypothetical; test: no
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: The saved restaurant has a 90-minute queue and your companion is starving. Setup: The famous place is still famous. Your companion is now mostly stomach.
  - a: Find food now. The queue can write its memoir. tags=[{"d":"D1","v":"people","target":"general"}] reaction="Food now. The queue can keep its memoir."
  - b: Stay; we came for this and planned around it. tags=[{"d":"D1","v":"task","target":"general"},{"d":"D3","v":"plan","target":"general"}] reaction="You stay with the plan despite the hunger clock."
  - c: Ask what they want and choose together. tags=[{"d":"D1","v":"people","target":"general"}] reaction="You turn the decision into a joint call."
  - d: I grab something small and let them decide. tags=[{"d":"D1","v":"self","target":"general"}] reaction="You get a small thing and leave the choice open."

### q06 | Mid-trip, work or family asks you to handle something right now.

- Slot: slot-06; chapter: 1; role: hypothetical; test: no
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: Mid-trip, work or family asks you to handle something right now. Setup: It is important, but not literally on fire.
  - a: Handle it. The trip can pause. tags=[{"d":"D1","v":"people","target":"general"},{"d":"D11","v":"duty","target":"general"}] reaction="The current plan yields to the immediate request."
  - b: Say I can do it later and finish the current plan. tags=[{"d":"D1","v":"task","target":"general"},{"d":"D11","v":"autonomy","target":"general"}] reaction="You set a later boundary and keep the thread."
  - c: Ask someone else to cover it. tags=[{"d":"D1","v":"self","target":"general"},{"d":"D11","v":"autonomy","target":"general"}] reaction="You route the ask to someone else."
  - d: Work out the smallest useful fix, then return. tags=[{"d":"D1","v":"task","target":"general"},{"d":"D3","v":"plan","target":"general"}] reaction="Smallest useful fix, then back to the trip."

### q07 | A surprise cost appears on a trip with your group of friends.

- Slot: slot-07; chapter: 1; role: hypothetical; test: no
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: A surprise cost appears on a trip with your group of friends. Setup: You ordered the salad; someone else added expensive extras you did not use, then suggests an even split.
  - a: Split it by what each of us used. tags=[{"d":"D8","v":"proportional","target":"friends"},{"d":"D7","v":"direct","target":"friends"}] reaction="You split by actual use."
  - b: Pay evenly to avoid public arithmetic. tags=[{"d":"D8","v":"absorb","target":"friends"}] reaction="Even split to avoid table arithmetic."
  - c: Quietly explain my share and ask to adjust it. tags=[{"d":"D8","v":"proportional","target":"friends"},{"d":"D7","v":"soften","target":"friends"}] reaction="You name your share and ask for an adjustment."
  - d: Pay the extra and say nothing. tags=[{"d":"D8","v":"absorb","target":"friends"},{"d":"D7","v":"hint","target":"friends"}] reaction="You absorb the extra cost and do not announce it."

### q08 | What did you actually do the last time a plan went sideways?

- Slot: slot-08; chapter: 1; role: actual; test: no
- Domain: personality; subject: self; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: What did you actually do the last time a plan went sideways? Setup: Choose a recent real response; skip if there is no useful example.
  - a: I changed course immediately. tags=[{"d":"D3","v":"improvise","target":"general"}] reaction="You changed course immediately."
  - b: I made a new plan before moving. tags=[{"d":"D3","v":"plan","target":"general"}] reaction="You paused for a new plan."
  - c: I asked somebody else what they wanted to do. tags=[{"d":"D1","v":"people","target":"general"},{"d":"D3","v":"consult","target":"general"}] reaction="You asked someone else what they wanted."
  - d: I carried on and hoped the problem got bored. tags=[{"d":"D3","v":"avoid","target":"general"}] reaction="You carried on and waited it out."

### q09 | A windfall equal to one month of costs lands today.

- Slot: slot-09; chapter: 2; role: hypothetical; test: no
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: A windfall equal to one month of costs lands today. Setup: It is yours to use, save, or give a job later.
  - a: Put it somewhere safe first. tags=[{"d":"D4","v":"security","target":"general"},{"d":"D3","v":"plan","target":"general"}] reaction="Safe place first for the windfall."
  - b: Use it for a new experience I have been postponing. tags=[{"d":"D4","v":"enjoyment","target":"general"},{"d":"D2","v":"novel","target":"general"}] reaction="A new experience gets the windfall."
  - c: Buy the thing that gives me time back. tags=[{"d":"D4","v":"freedom","target":"general"}] reaction="Time back gets priority."
  - d: Buy the recognizable version. The logo may have a point. tags=[{"d":"D4","v":"status","target":"general"},{"d":"D9","v":"recognition","target":"general"}] reaction="The recognizable version gets a seat."

### q10 | You and {close} planned an outing. They ordered extras and suggest splitting everything evenly.

- Slot: slot-10; chapter: 2; role: hypothetical; test: no
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: You and {close} planned an outing. They ordered extras and suggest splitting everything evenly. Setup: The extra dessert has entered the shared spreadsheet.
  - a: Ask to split the extras by who ordered them. tags=[{"d":"D8","v":"proportional","target":"close"},{"d":"D7","v":"direct","target":"close"}] reaction="Extras follow whoever ordered them."
  - b: Explain my share privately and adjust the total. tags=[{"d":"D8","v":"proportional","target":"close"},{"d":"D7","v":"soften","target":"close"}] reaction="You explain your share privately."
  - c: Pay evenly; it is easier than doing arithmetic together. tags=[{"d":"D8","v":"absorb","target":"close"}] reaction="Even split keeps the arithmetic brief."
  - d: Pay and leave the dessert unmentioned. tags=[{"d":"D8","v":"absorb","target":"close"},{"d":"D7","v":"avoid","target":"close"}] reaction="Dessert stays unmentioned."

### q13 | A family member asks to borrow money while your month is tight.

- Slot: slot-12; chapter: 2; role: hypothetical; test: no
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: A family member asks to borrow money while your month is tight. Setup: They promise to repay you, with the confidence of a person who has not seen your spreadsheet.
  - a: Say what I can afford and lend that amount. tags=[{"d":"D8","v":"limit","target":"family"},{"d":"D7","v":"direct","target":"family"}]
  - b: Ask what happened and work out another kind of help. tags=[{"d":"D8","v":"limit","target":"family"},{"d":"D11","v":"duty","target":"family"}]
  - c: Lend it; family should not be stranded. tags=[{"d":"D8","v":"absorb","target":"family"},{"d":"D11","v":"duty","target":"family"}]
  - d: Decline. My own bills are already doing theatre. tags=[{"d":"D8","v":"limit","target":"family"},{"d":"D11","v":"autonomy","target":"family"}]

### q15 | The people you live with think the house cleans itself.

- Slot: slot-14; chapter: 2; role: hypothetical; test: no
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: The people you live with think the house cleans itself. Setup: You are the house. The sponge has entered negotiations.
  - a: Suggest we split the chores by task. tags=[{"d":"D8","v":"proportional","target":"household"},{"d":"D7","v":"direct","target":"household"}]
  - b: Make a rota; the bin needs a custody agreement. tags=[{"d":"D8","v":"proportional","target":"household"},{"d":"D3","v":"plan","target":"general"}]
  - c: Do it myself; discussing the dish takes longer. tags=[{"d":"D8","v":"absorb","target":"household"},{"d":"D7","v":"avoid","target":"household"}]
  - d: Stop doing their share and wait for the magic to end. tags=[{"d":"D8","v":"limit","target":"household"}]

### q16 | What did you actually do the last time a money split with friends got awkward?

- Slot: slot-15; chapter: 2; role: actual; test: no
- Domain: personality; subject: self; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: What did you actually do the last time a money split with friends got awkward? Setup: Think of a real friends’ bill or shared cost; skip if none comes to mind.
  - a: Named the amount plainly. tags=[{"d":"D8","v":"proportional","target":"friends"},{"d":"D7","v":"direct","target":"friends"}]
  - b: Sent a careful message privately. tags=[{"d":"D8","v":"proportional","target":"friends"},{"d":"D7","v":"soften","target":"friends"}]
  - c: Paid or lent it and moved on. tags=[{"d":"D8","v":"absorb","target":"friends"},{"d":"D7","v":"avoid","target":"friends"}]
  - d: Kept my share and let someone else handle the rest. tags=[{"d":"D8","v":"proportional","target":"friends"}]

### q17 | What time do you usually stop being available to consciousness?

- Slot: slot-16; chapter: 3; role: context; test: no
- Domain: health; subject: self; window: Usual · past month; evidence: self_report
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: What time do you usually stop being available to consciousness? Setup: Report your usual pattern; shifts and variation are valid answers.
  - a: Before 11 p.m. Tomorrow me has excellent representation. facts={"bedtime":"before 23:00"} reaction="Before eleven; tomorrow has a representative."
  - b: Between 11 p.m. and 1 a.m. One more episode is a reasonable proposal. facts={"bedtime":"23:00-01:00"} reaction="Eleven to one; the clock keeps late hours."
  - c: After 1 a.m. The internet becomes important at midnight. facts={"bedtime":"after 01:00"} reaction="After one; that is a late handoff to tomorrow."
  - d: It varies or I work shifts. Time and I have an arrangement. facts={"bedtime":"variable-or-shifts"} reaction="Variable or shifts; the clock stays flexible."

### q18 | When {close} goes quiet after a hard day, what is your first story?

- Slot: slot-17; chapter: 3; role: hypothetical; test: no
- Domain: emotion; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: When {close} goes quiet after a hard day, what is your first story? Setup: Use the selected close person if you have one; skip if this does not fit.
  - a: They are probably busy. The silence and I can coexist. tags=[{"d":"D5","v":"secure","target":"close"}]
  - b: I worry they are upset with me and send a check-in. tags=[{"d":"D5","v":"worry","target":"close"},{"d":"D6","v":"support","target":"close"}]
  - c: I reread my message and look for what I did wrong. tags=[{"d":"D5","v":"reassurance","target":"close"},{"d":"D6","v":"private","target":"close"}]
  - d: I ask directly whether we are okay. tags=[{"d":"D5","v":"reassurance","target":"close"},{"d":"D7","v":"direct","target":"close"}]

### q19 | It is 11 p.m. after a cursed day. Who gets the first version?

- Slot: slot-18; chapter: 3; role: hypothetical; test: no
- Domain: emotion; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: It is 11 p.m. after a cursed day. Who gets the first version? Setup: The day has already filed its paperwork; choose how much to share.
  - a: I tell {close} the whole story and ask them to listen. tags=[{"d":"D6","v":"support","target":"close"}]
  - b: I tell {close} a small version, then go quiet. tags=[{"d":"D6","v":"selective","target":"close"}]
  - c: I process it privately before telling {close} anything. tags=[{"d":"D6","v":"private","target":"close"}]
  - d: I talk to someone else first. tags=[{"d":"D6","v":"selective","target":"general"}]

### q20 | In the last seven days, how many dinners arrived from a restaurant or takeaway?

- Slot: slot-19; chapter: 3; role: context; test: no
- Domain: health; subject: self; window: Recent · last 7 days; evidence: self_report
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: In the last seven days, how many dinners arrived from a restaurant or takeaway? Setup: Count meals, not virtue. The delivery app is not a moral authority.
  - a: None. The kitchen has proof of life. facts={"takeaway":"0 days / last 7"} measures=[{"id":"takeaway_days","value":0,"label":"None in the last seven days."}] reaction="No takeaway dinners in the last seven days."
  - b: One or two. The app knows me casually. facts={"takeaway":"1-2 days / last 7"} measures=[{"id":"takeaway_days","value":1,"label":"One or two days."}] reaction="One or two takeaway dinners."
  - c: Three or four. We are becoming close. facts={"takeaway":"3-4 days / last 7"} measures=[{"id":"takeaway_days","value":2,"label":"Three or four days."}] reaction="Three or four takeaway dinners."
  - d: Five to seven. The doorbell is my dinner bell. facts={"takeaway":"5-7 days / last 7"} measures=[{"id":"takeaway_days","value":3,"label":"Five to seven days."}] reaction="Five to seven takeaway dinners."

### q21 | The last time you felt ignored by {close}, what did you actually do?

- Slot: slot-20; chapter: 3; role: actual; test: no
- Domain: emotion; subject: self; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: The last time you felt ignored by {close}, what did you actually do? Setup: Choose a close-person response; skip if there is no safe or useful example.
  - a: Said what was bothering me. tags=[{"d":"D7","v":"direct","target":"close"}]
  - b: Eased into it gently. tags=[{"d":"D7","v":"soften","target":"close"}]
  - c: Asked for time and came back to talk. tags=[{"d":"D7","v":"pause","target":"close"},{"d":"D6","v":"private","target":"close"}]
  - d: Avoided the conversation and let it pass. tags=[{"d":"D7","v":"avoid","target":"close"},{"d":"D6","v":"private","target":"close"}]

### q22 | After a fight, {close} sends a raccoon eating grapes. No explanation.

- Slot: slot-21; chapter: 3; role: hypothetical; test: no
- Domain: emotion; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: After a fight, {close} sends a raccoon eating grapes. No explanation. Setup: The raccoon is excellent at conflict avoidance. What do you do?
  - a: “He is incredible. Can we talk about yesterday?” tags=[{"d":"D7","v":"direct","target":"close"},{"d":"D12","v":"repair","target":"close"}]
  - b: Send one back, then ask to talk tonight. tags=[{"d":"D7","v":"soften","target":"close"},{"d":"D12","v":"repair","target":"close"}]
  - c: Send one back and leave it there. tags=[{"d":"D7","v":"avoid","target":"close"}]
  - d: Say I need a day before we talk. tags=[{"d":"D7","v":"pause","target":"close"},{"d":"D6","v":"private","target":"close"}]

### q23 | You forgot something important to {close}. What comes next?

- Slot: slot-22; chapter: 3; role: hypothetical; test: no
- Domain: emotion; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: You forgot something important to {close}. What comes next? Setup: The full stop in “it’s fine” has entered the room.
  - a: Apologize and ask how to make it right. tags=[{"d":"D12","v":"repair","target":"close"},{"d":"D7","v":"direct","target":"close"}]
  - b: Apologize and explain what happened. tags=[{"d":"D12","v":"explain","target":"close"},{"d":"D7","v":"soften","target":"close"}]
  - c: Arrange something thoughtful to make up for it. tags=[{"d":"D12","v":"action","target":"close"},{"d":"D3","v":"plan","target":"general"}]
  - d: Ask for space, then agree when to talk. tags=[{"d":"D12","v":"pause","target":"close"},{"d":"D7","v":"pause","target":"close"}]

### q24 | When {close} cancels a catch-up and suggests no new date, what do you assume first?

- Slot: slot-23; chapter: 3; role: hypothetical; test: no
- Domain: emotion; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: When {close} cancels a catch-up and suggests no new date, what do you assume first? Setup: Choose the closest first interpretation; skip if this scene does not fit.
  - a: They are busy; we will find another time. tags=[{"d":"D5","v":"secure","target":"close"}]
  - b: I worry they are pulling away and want reassurance. tags=[{"d":"D5","v":"worry","target":"close"},{"d":"D6","v":"support","target":"close"}]
  - c: Ask directly whether we are okay. tags=[{"d":"D5","v":"reassurance","target":"close"},{"d":"D7","v":"direct","target":"close"}]
  - d: Wait; I do not choose an explanation yet. tags=[{"d":"D5","v":"uncertain","target":"close"},{"d":"D6","v":"private","target":"close"}]

### q29 | What did you actually do the last time an outing with {close} became uneven?

- Slot: slot-24; chapter: 4; role: actual; test: no
- Domain: personality; subject: self; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: What did you actually do the last time an outing with {close} became uneven? Setup: The bill or effort stopped matching; choose a real response or skip.
  - a: Named the imbalance and asked to split it fairly. tags=[{"d":"D8","v":"proportional","target":"close"},{"d":"D7","v":"direct","target":"close"}]
  - b: Sent a careful message about my share. tags=[{"d":"D8","v":"proportional","target":"close"},{"d":"D7","v":"soften","target":"close"}]
  - c: Covered it and kept the peace. tags=[{"d":"D8","v":"absorb","target":"close"}]
  - d: Stopped covering it without discussing why. tags=[{"d":"D8","v":"limit","target":"close"},{"d":"D7","v":"avoid","target":"close"}]

### q30 | What did you actually do the last time a setback happened to you?

- Slot: slot-25; chapter: 4; role: actual; test: no
- Domain: emotion; subject: self; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: What did you actually do the last time a setback happened to you? Setup: Choose what you told {close}, or skip if there is no useful example.
  - a: Told {close} quickly and asked them to stay with me in it. tags=[{"d":"D6","v":"support","target":"close"}]
  - b: Told {close} a small version first. tags=[{"d":"D6","v":"selective","target":"close"}]
  - c: Worked it out privately before saying anything. tags=[{"d":"D6","v":"private","target":"close"}]
  - d: Talked to someone else before {close}. tags=[{"d":"D6","v":"selective","target":"general"}]

### q31 | You lose your job. Who in the family hears it, and when?

- Slot: slot-26; chapter: 4; role: hypothetical; test: no
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: You lose your job. Who in the family hears it, and when? Setup: Imagine the news arriving today; skip if this scene does not fit.
  - a: Tell the family quickly; I need people around me. tags=[{"d":"D6","v":"support","target":"family"}]
  - b: Tell one person privately first. tags=[{"d":"D6","v":"selective","target":"family"}]
  - c: Wait until I have a plan. tags=[{"d":"D6","v":"private","target":"family"},{"d":"D3","v":"plan","target":"general"}]
  - d: Handle it alone for a while. tags=[{"d":"D6","v":"distance","target":"family"}]

### q32 | What did you actually do the last time family wanted something different from you?

- Slot: slot-27; chapter: 4; role: actual; test: no
- Domain: personality; subject: self; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: What did you actually do the last time family wanted something different from you? Setup: Think of the latest such disagreement in the past month. Choose “No example to use” if this has not happened in the past month.
  - a: Said no and kept my plan. tags=[{"d":"D11","v":"autonomy","target":"family"},{"d":"D7","v":"direct","target":"family"}]
  - b: Found a compromise. tags=[{"d":"D11","v":"conditional","target":"family"}]
  - c: Went along with them. tags=[{"d":"D11","v":"duty","target":"family"},{"d":"D1","v":"people","target":"general"}]
  - d: Avoided the conversation for now. tags=[{"d":"D7","v":"avoid","target":"family"}]

### q33 | The friend you brought becomes the centre of the party.

- Slot: slot-35; chapter: 5; role: hypothetical; test: no
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: The friend you brought becomes the centre of the party. Setup: Everyone is delighted. Your ego would like a small private meeting.
  - a: Introduce them to more people and enjoy it. tags=[{"d":"D9","v":"noncompetitive","target":"general"}]
  - b: Stay close and make sure I am not forgotten. tags=[{"d":"D9","v":"recognition","target":"general"}]
  - c: Turn it into a joint bit. We can be famous together. tags=[{"d":"D9","v":"competitive","target":"general"},{"d":"D1","v":"people","target":"general"}]
  - d: Leave early; the social battery has become a witness. tags=[{"d":"D14d","v":"rest","target":"general"}]

### q41 | A soaked stray cat looks at you like you control the weather.

- Slot: slot-36; chapter: 6; role: hypothetical; test: no
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: A soaked stray cat looks at you like you control the weather. Setup: You cannot take it home. Your options are still real.
  - a: Bring food and water. Catering, not accommodation. tags=[{"d":"D13","v":"bounded","target":"general"}]
  - b: Contact a rescue with cat capacity. tags=[{"d":"D13","v":"coordinate","target":"general"},{"d":"D3","v":"plan","target":"general"}]
  - c: Ask nearby people who can help. tags=[{"d":"D13","v":"coordinate","target":"general"},{"d":"D1","v":"people","target":"general"}]
  - d: Leave; I cannot safely help right now. tags=[{"d":"D13","v":"limit","target":"general"},{"d":"D1","v":"self","target":"general"}]

### q42 | You are exhausted. A stranger asks for help finding their stop.

- Slot: slot-37; chapter: 6; role: hypothetical; test: no
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: You are exhausted. A stranger asks for help finding their stop. Setup: Your own bus is arriving in two minutes.
  - a: Stay and help. The bus and I will meet again. tags=[{"d":"D13","v":"direct","target":"general"},{"d":"D1","v":"people","target":"general"}]
  - b: Give quick directions, then catch my bus. tags=[{"d":"D13","v":"bounded","target":"general"}]
  - c: Point them to staff before I go. tags=[{"d":"D13","v":"coordinate","target":"general"},{"d":"D1","v":"task","target":"general"}]
  - d: Apologize, protect my remaining energy, and catch my bus. tags=[{"d":"D13","v":"limit","target":"general"},{"d":"D14d","v":"rest","target":"general"}]

### q43 | Your planned movement meets an appealing alternative.

- Slot: slot-38; chapter: 6; role: hypothetical; test: no
- Domain: health; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: Your planned movement meets an appealing alternative. Setup: You have one hour, and the alternative has excellent snacks.
  - a: Keep the movement plan. tags=[{"d":"D14c","v":"planned","target":"general"},{"d":"D3","v":"plan","target":"general"}]
  - b: Move it to another time and take the alternative. tags=[{"d":"D14c","v":"adjust","target":"general"},{"d":"D3","v":"plan","target":"general"}]
  - c: Skip movement today. tags=[{"d":"D14c","v":"skip","target":"general"}]
  - d: Do a shorter version, then join the alternative. tags=[{"d":"D14c","v":"adjust","target":"general"},{"d":"D3","v":"improvise","target":"general"}]

### q44 | What did you actually eat the last time a stressful dinner plan fell apart?

- Slot: slot-39; chapter: 6; role: actual; test: no
- Domain: health; subject: self; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: What did you actually eat the last time a stressful dinner plan fell apart? Setup: Choose a real recent response; skip if you have no useful example.
  - a: Made the meal I had planned. tags=[{"d":"D14b","v":"planned","target":"general"}]
  - b: Adapted the plan into a quick version. tags=[{"d":"D14b","v":"bounded","target":"general"}]
  - c: Ordered comfort food immediately. tags=[{"d":"D14b","v":"comfort","target":"general"},{"d":"D10","v":"act","target":"general"}]
  - d: Delayed eating until I could think clearly. tags=[{"d":"D14b","v":"delay","target":"general"},{"d":"D10","v":"wait","target":"general"}]

### q45 | You are about to sleep when an optional extra task appears.

- Slot: slot-40; chapter: 6; role: hypothetical; test: no
- Domain: health; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: You are about to sleep when an optional extra task appears. Setup: It would help, but it can wait until morning.
  - a: Go to bed and move the task. tags=[{"d":"D14a","v":"protect","target":"general"},{"d":"D14d","v":"rest","target":"general"}]
  - b: Do the task, then sleep later. tags=[{"d":"D14a","v":"delay","target":"general"},{"d":"D14d","v":"obligation","target":"general"}]
  - c: Move tomorrow’s wake-up later so I can finish this and still sleep. tags=[{"d":"D14a","v":"adjust","target":"general"},{"d":"D3","v":"plan","target":"general"}]
  - d: Decline the task; tonight is closed. tags=[{"d":"D14a","v":"protect","target":"general"},{"d":"D14d","v":"rest","target":"general"}]

### q46 | In the last seven days, on how many days did you deliberately get some movement?

- Slot: slot-41; chapter: 6; role: context; test: no
- Domain: health; subject: self; window: Recent · last 7 days; evidence: self_report; counterpart: q101
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: In the last seven days, on how many days did you deliberately get some movement? Setup: Walks, wheelchair exercise, and movement that works for your body all count.
  - a: Zero. A factual answer, not a confession. facts={"movement":"0 days / last 7"} measures=[{"id":"movement_consistency","value":0,"label":"Zero days."}]
  - b: One or two. Witnesses exist. facts={"movement":"1-2 days / last 7"} measures=[{"id":"movement_consistency","value":1,"label":"One or two days."}]
  - c: Three or four. A recurring event. facts={"movement":"3-4 days / last 7"} measures=[{"id":"movement_consistency","value":2,"label":"Three or four days."}]
  - d: Five to seven. My calendar has trainers on. facts={"movement":"5-7 days / last 7"} measures=[{"id":"movement_consistency","value":3,"label":"Five to seven days."}]

### q47 | What did you actually do the last time a movement plan met a hard day?

- Slot: slot-42; chapter: 6; role: actual; test: no
- Domain: health; subject: self; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: What did you actually do the last time a movement plan met a hard day? Setup: Choose a real response or skip.
  - a: Kept the plan. tags=[{"d":"D14c","v":"planned","target":"general"}]
  - b: Adapted it to fit the day. tags=[{"d":"D14c","v":"adjust","target":"general"},{"d":"D3","v":"plan","target":"general"}]
  - c: Skipped it and did not replace it. tags=[{"d":"D14c","v":"skip","target":"general"}]
  - d: Did a shorter version. tags=[{"d":"D14c","v":"adjust","target":"general"}]

### q57 | A friend offers a last-minute trip to a place you have never visited.

- Slot: slot-57; chapter: 8; role: holdout; test: yes
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: A friend offers a last-minute trip to a place you have never visited. Setup: You have the time, but only one evening to decide.
  - a: Go. The map can explain itself later. tags=[{"d":"D2","v":"novel","target":"general"}]
  - b: Check the details before saying yes. tags=[{"d":"D2","v":"conditional","target":"general"}]
  - c: Choose a familiar plan instead. tags=[{"d":"D2","v":"familiar","target":"general"}]
  - d: Go only if someone I know joins. tags=[{"d":"D2","v":"conditional","target":"general"}]

### q58 | {close} cancels a plan that mattered to you.

- Slot: slot-58; chapter: 8; role: holdout; test: yes
- Domain: emotion; subject: close; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: {close} cancels a plan that mattered to you. Setup: They offer a replacement without mentioning the cancellation.
  - a: Rebook, and say why the cancellation hurt. tags=[{"d":"D7","v":"direct","target":"close"}]
  - b: Start warmly, then bring it up gently. tags=[{"d":"D7","v":"soften","target":"close"}]
  - c: Ask for a day, then set a time to talk. tags=[{"d":"D7","v":"pause","target":"close"}]
  - d: Accept the new plan and say nothing about it. tags=[{"d":"D7","v":"avoid","target":"close"}]

### q59 | Your friends’ bill includes a shared item you did not use.

- Slot: slot-59; chapter: 8; role: holdout; test: yes
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: Your friends’ bill includes a shared item you did not use. Setup: Your friends want one clean split and your calculator wants a union representative.
  - a: Ask to remove my share of that item. tags=[{"d":"D8","v":"proportional","target":"friends"},{"d":"D7","v":"direct","target":"friends"}]
  - b: Message the organizer privately. tags=[{"d":"D8","v":"proportional","target":"friends"},{"d":"D7","v":"soften","target":"friends"}]
  - c: Tell them it is okay and pay it for simplicity. tags=[{"d":"D8","v":"absorb","target":"friends"},{"d":"D7","v":"direct","target":"friends"}]
  - d: Pay and keep the irritation to yourself. tags=[{"d":"D8","v":"absorb","target":"friends"},{"d":"D7","v":"hint","target":"friends"}]

### q60 | A surprise gift leaves you with one optional purchase.

- Slot: slot-60; chapter: 8; role: holdout; test: yes
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: A surprise gift leaves you with one optional purchase. Setup: The gift is yours; the category motive is the question.
  - a: Choose the reliable version and keep the rest safe. tags=[{"d":"D4","v":"security","target":"general"}]
  - b: Choose the option that saves time and opens choices. tags=[{"d":"D4","v":"freedom","target":"general"}]
  - c: Choose the one that simply delights me. tags=[{"d":"D4","v":"enjoyment","target":"general"}]
  - d: Choose the recognizable version. tags=[{"d":"D4","v":"status","target":"general"}]

### q61 | An extra task would help your team, but you are already out of battery.

- Slot: slot-61; chapter: 8; role: holdout; test: yes
- Domain: health; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: An extra task would help your team, but you are already out of battery. Setup: It is optional, and the team will survive a conversation.
  - a: Decline and recover. tags=[{"d":"D14d","v":"rest","target":"general"}]
  - b: Take it on and finish the team’s need. tags=[{"d":"D14d","v":"obligation","target":"general"}]
  - c: Find someone with capacity to share it. tags=[{"d":"D14d","v":"connection","target":"general"}]
  - d: Offer a smaller piece and protect the rest of the evening. tags=[{"d":"D14d","v":"bounded","target":"general"}]

### q62 | You let {close} down again, in a different situation.

- Slot: slot-62; chapter: 8; role: holdout; test: yes
- Domain: emotion; subject: close; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: You let {close} down again, in a different situation. Setup: The repair starts with one clear sentence.
  - a: Apologize directly and ask what would help. tags=[{"d":"D12","v":"repair","target":"close"}]
  - b: Apologize and explain what led to it. tags=[{"d":"D12","v":"explain","target":"close"}]
  - c: Arrange a thoughtful concrete way to make up for it. tags=[{"d":"D12","v":"action","target":"close"}]
  - d: Agree on space and a time to reconnect. tags=[{"d":"D12","v":"pause","target":"close"}]

### q63 | You want to help someone, but you have one hour and no spare money.

- Slot: slot-63; chapter: 8; role: holdout; test: yes
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: You want to help someone, but you have one hour and no spare money. Setup: The need is genuine; your capacity is also genuine.
  - a: Use the hour to do the task myself. tags=[{"d":"D13","v":"direct","target":"general"}]
  - b: Find someone or a service better placed to help. tags=[{"d":"D13","v":"coordinate","target":"general"}]
  - c: Say I cannot take this on today. tags=[{"d":"D13","v":"limit","target":"general"}]
  - d: Offer ten minutes, then hand it back. tags=[{"d":"D13","v":"bounded","target":"general"}]

### q64 | A plan fails at the last minute and someone asks what happens next.

- Slot: slot-64; chapter: 8; role: holdout; test: yes
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: A plan fails at the last minute and someone asks what happens next. Setup: The plot has finally admitted it was improvising.
  - a: Choose a workable next step immediately. tags=[{"d":"D3","v":"improvise","target":"general"}]
  - b: Pause, gather details, and make a new plan. tags=[{"d":"D3","v":"plan","target":"general"}]
  - c: Ask the affected people what they prefer, then plan around it. tags=[{"d":"D3","v":"consult","target":"general"}]
  - d: Drop it; there is no capacity for a new version. tags=[{"d":"D3","v":"stop","target":"general"}]

### q65 | Your plan acquires a surprise problem.

- Slot: slot-28; chapter: 5; role: actual; test: no
- Domain: emotion; subject: self; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: Your plan acquires a surprise problem. Setup: Think of the latest time this happened in the past month. Choose “No example to use” if this has not happened in the past month. The plan has sent a tiny emergency memo. What was the inside voice?
  - a: I felt a flash of irritation and said what needed changing. signals=[{"family":"frustration","layer":"feeling","value":"present","label":"A flash of irritation"},{"family":"frustration","layer":"response","value":"direct","label":"Said what needed changing"}] reaction="A flash of irritation, then you named the change."
  - b: I felt properly angry and went quiet before deciding. signals=[{"family":"frustration","layer":"feeling","value":"high","label":"Properly angry"},{"family":"frustration","layer":"response","value":"pause","label":"Went quiet before deciding"}] reaction="Anger showed up; you went quiet before deciding."
  - c: I was mildly bothered, gave myself a reset, and moved to the next step. signals=[{"family":"frustration","layer":"feeling","value":"low","label":"Mildly bothered"},{"family":"frustration","layer":"recovery","value":"reset","label":"Gave myself a reset"}] reaction="Mild bother, a reset, then the next step."
  - d: I felt stuck and asked someone to help untangle it. signals=[{"family":"frustration","layer":"feeling","value":"uncertain","label":"Felt stuck"},{"family":"frustration","layer":"response","value":"support","label":"Asked for help"}] reaction="Feeling stuck led to asking for help."

### q66 | A needed message sits unread while the deadline approaches.

- Slot: slot-29; chapter: 5; role: actual; test: no
- Domain: emotion; subject: self; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: A needed message sits unread while the deadline approaches. Setup: Think of the latest time this happened in the past month. Choose “No example to use” if this has not happened in the past month. Your brain has opened seventeen tabs about one blue tick.
  - a: I felt uneasy and sent one clear check-in. signals=[{"family":"worry","layer":"feeling","value":"present","label":"Felt uneasy"},{"family":"worry","layer":"response","value":"check_in","label":"Sent one check-in"}] reaction="Uneasy, then one clear check-in."
  - b: I felt very worried and checked the details again. signals=[{"family":"worry","layer":"feeling","value":"high","label":"Very worried"},{"family":"worry","layer":"response","value":"checking","label":"Checked the details"}] reaction="Very worried, then a second detail check."
  - c: I did not feel especially worried. I assumed they were busy and carried on. signals=[{"family":"worry","layer":"feeling","value":"low","label":"Did not feel especially worried"},{"family":"worry","layer":"response","value":"continue","label":"Carried on"}] reaction="You assumed busy and carried on."
  - d: I felt uncertain, then put the phone away for a while. signals=[{"family":"worry","layer":"feeling","value":"uncertain","label":"Felt uncertain"},{"family":"worry","layer":"recovery","value":"space","label":"Put the phone away"}] reaction="Uncertain, then phone away."

### q67 | A plan you wanted gets canceled at the last minute.

- Slot: slot-30; chapter: 5; role: actual; test: no
- Domain: emotion; subject: self; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: A plan you wanted gets canceled at the last minute. Setup: Think of the latest time this happened in the past month. Choose “No example to use” if this has not happened in the past month. The cancellation arrived with no useful footnotes.
  - a: I felt disappointed and said I wanted to reschedule. signals=[{"family":"disappointment","layer":"feeling","value":"present","label":"Felt disappointed"},{"family":"disappointment","layer":"response","value":"reschedule","label":"Asked to reschedule"}] reaction="Disappointment and a reschedule request."
  - b: I felt sad, took the evening quietly, and revisited it later. signals=[{"family":"disappointment","layer":"feeling","value":"present","label":"Felt sad"},{"family":"disappointment","layer":"recovery","value":"space","label":"Took the evening quietly"}] reaction="Sadness, a quiet evening, then revisit."
  - c: I was barely bothered and made another plan. signals=[{"family":"disappointment","layer":"feeling","value":"low","label":"Barely bothered"},{"family":"disappointment","layer":"response","value":"adjust","label":"Made another plan"}] reaction="Barely bothered; another plan."
  - d: I felt let down and asked what had changed. signals=[{"family":"disappointment","layer":"feeling","value":"present","label":"Felt let down"},{"family":"disappointment","layer":"response","value":"context","label":"Asked what changed"}] reaction="Let down, then ask what changed."

### q68 | You call someone by the spectacularly wrong name in a group.

- Slot: slot-31; chapter: 5; role: actual; test: no
- Domain: emotion; subject: self; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: You call someone by the spectacularly wrong name in a group. Setup: Think of the latest time this happened in the past month. Choose “No example to use” if this has not happened in the past month. The room has noticed. Your dignity is taking a short break.
  - a: I felt embarrassed and laughed, then corrected myself. signals=[{"family":"embarrassment","layer":"feeling","value":"present","label":"Felt embarrassed"},{"family":"embarrassment","layer":"response","value":"repair","label":"Corrected and laughed"}] reaction="Embarrassed, laughed, corrected."
  - b: I felt intensely embarrassed and went quiet for a beat. signals=[{"family":"embarrassment","layer":"feeling","value":"high","label":"Intensely embarrassed"},{"family":"embarrassment","layer":"response","value":"pause","label":"Went quiet"}] reaction="Intensely embarrassed; a quiet beat."
  - c: I felt a little awkward and kept the conversation moving. signals=[{"family":"embarrassment","layer":"feeling","value":"low","label":"A little awkward"},{"family":"embarrassment","layer":"response","value":"continue","label":"Kept moving"}] reaction="A little awkward; the conversation continues."
  - d: I felt embarrassed, apologized, and let the moment move on. signals=[{"family":"embarrassment","layer":"feeling","value":"present","label":"Felt embarrassed"},{"family":"embarrassment","layer":"recovery","value":"repair","label":"Apologized"}] reaction="Embarrassed, apologized, let the moment move on."

### q69 | You remember a promise only after the other person has waited.

- Slot: slot-32; chapter: 5; role: actual; test: no
- Domain: emotion; subject: self; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: You remember a promise only after the other person has waited. Setup: Think of the latest time this happened in the past month. Choose “No example to use” if this has not happened in the past month. The reminder notification has chosen violence.
  - a: I felt guilty and apologized plainly. signals=[{"family":"guilt","layer":"feeling","value":"present","label":"Felt guilty"},{"family":"guilt","layer":"response","value":"repair","label":"Apologized"}] reaction="Guilty, then a plain apology."
  - b: I felt awful, explained the miss, and offered a fix. signals=[{"family":"guilt","layer":"feeling","value":"high","label":"Felt awful"},{"family":"guilt","layer":"recovery","value":"repair","label":"Offered a fix"}] reaction="Awful feeling, context, and a fix."
  - c: I felt a little guilty and set a reminder for next time. signals=[{"family":"guilt","layer":"feeling","value":"low","label":"Felt a little guilty"},{"family":"guilt","layer":"response","value":"prevention","label":"Set a reminder"}] reaction="A little guilt, then a reminder."
  - d: I felt guilty, asked for a little time, then came back to it. signals=[{"family":"guilt","layer":"feeling","value":"present","label":"Felt guilty"},{"family":"guilt","layer":"recovery","value":"pause","label":"Came back later"}] reaction="Guilty, asked for time, returned."

### q70 | Someone tells you good news you had been quietly hoping for.

- Slot: slot-33; chapter: 5; role: actual; test: no
- Domain: emotion; subject: self; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: Someone tells you good news you had been quietly hoping for. Setup: Think of the latest time this happened in the past month. Choose “No example to use” if this has not happened in the past month. The news is excellent. Your face has issued a press release.
  - a: I felt delighted and called someone to celebrate. signals=[{"family":"joy","layer":"feeling","value":"present","label":"Felt delighted"},{"family":"joy","layer":"response","value":"celebrate","label":"Called to celebrate"}] reaction="Delighted; call to celebrate."
  - b: I felt fizzing excitement and made a plan for the next step. signals=[{"family":"joy","layer":"feeling","value":"present","label":"Felt excited"},{"family":"joy","layer":"response","value":"act","label":"Planned next step"}] reaction="Fizzing excitement; plan the next step."
  - c: I felt happy, took it in privately, and let the moment land. signals=[{"family":"joy","layer":"feeling","value":"present","label":"Felt happy"},{"family":"joy","layer":"recovery","value":"savor","label":"Let it land"}] reaction="Happy, private pause, let it land."
  - d: I felt pleased and said exactly how much it meant. signals=[{"family":"joy","layer":"feeling","value":"present","label":"Felt pleased"},{"family":"joy","layer":"response","value":"express","label":"Said what it meant"}] reaction="Pleased; say what it meant."

### q71 | The stressful thing you have been carrying finally ends.

- Slot: slot-34; chapter: 5; role: actual; test: no
- Domain: emotion; subject: self; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: The stressful thing you have been carrying finally ends. Setup: Think of the latest time this happened in the past month. Choose “No example to use” if this has not happened in the past month. The problem has left the building and taken its clipboard.
  - a: I felt relieved and exhaled before doing anything else. signals=[{"family":"relief","layer":"feeling","value":"present","label":"Felt relieved"},{"family":"relief","layer":"recovery","value":"rest","label":"Exhaled first"}] reaction="Relief, then an exhale."
  - b: I felt relief arrive slowly, then rested. signals=[{"family":"relief","layer":"feeling","value":"present","label":"Relief arrived slowly"},{"family":"relief","layer":"recovery","value":"rest","label":"Rested"}] reaction="Relief arrived slowly; rest followed."
  - c: I felt relieved and told the person who had helped me. signals=[{"family":"relief","layer":"feeling","value":"present","label":"Felt relieved"},{"family":"relief","layer":"response","value":"connect","label":"Told the helper"}] reaction="Relief, then tell the person who helped."
  - d: I felt relieved, then checked the next small step. signals=[{"family":"relief","layer":"feeling","value":"present","label":"Felt relieved"},{"family":"relief","layer":"response","value":"next_step","label":"Checked next step"}] reaction="Relief, then the next small step."

### q72 | Over the past month, how regular was your usual sleep timing?

- Slot: slot-51; chapter: 7; role: context; test: no
- Domain: health; subject: self; window: Usual · past month; evidence: self_report; counterpart: q73
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: Over the past month, how regular was your usual sleep timing? Setup: Count your ordinary pattern, including shifts or changing days.
  - a: It changed a lot from day to day. measures=[{"id":"sleep_regularity","value":0,"label":"It changed a lot from day to day."}] reaction="Sleep timing changed a lot over the month."
  - b: It had a loose pattern. measures=[{"id":"sleep_regularity","value":1,"label":"It had a loose pattern."}] reaction="A loose pattern."
  - c: It was usually consistent. measures=[{"id":"sleep_regularity","value":2,"label":"It was usually consistent."}] reaction="Usually consistent timing."
  - d: It was very consistent. measures=[{"id":"sleep_regularity","value":3,"label":"It was very consistent."}] reaction="Very consistent timing."

### q73 | In the last seven days, how regular was your sleep timing?

- Slot: slot-52; chapter: 7; role: context; test: no
- Domain: health; subject: self; window: Recent · last 7 days; evidence: self_report; counterpart: q72
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: In the last seven days, how regular was your sleep timing? Setup: Look at the actual week. Sleep timing gets its own report card here.
  - a: It changed a lot from day to day. measures=[{"id":"sleep_regularity","value":0,"label":"It changed a lot from day to day."}] reaction="Recent sleep timing changed a lot."
  - b: It had a loose pattern. measures=[{"id":"sleep_regularity","value":1,"label":"It had a loose pattern."}] reaction="Recent sleep timing had a loose pattern."
  - c: It was usually consistent. measures=[{"id":"sleep_regularity","value":2,"label":"It was usually consistent."}] reaction="Recent sleep timing was usually consistent."
  - d: It was very consistent. measures=[{"id":"sleep_regularity","value":3,"label":"It was very consistent."}] reaction="Recent sleep timing was very consistent."

### q74 | Over the past month, how often did you notice body cues before deciding what to do?

- Slot: slot-43; chapter: 6; role: context; test: no
- Domain: health; subject: self; window: Usual · past month; evidence: self_report
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: Over the past month, how often did you notice body cues before deciding what to do? Setup: Cues can be hunger, tension, temperature, pain, or needing a break. Choose what fits your experience.
  - a: I often noticed late or postponed them. measures=[{"id":"body_attention","value":0,"label":"I often noticed late or postponed them."}] reaction="Body cues noticed late or postponed."
  - b: I noticed some, depending on the day. measures=[{"id":"body_attention","value":1,"label":"I noticed some, depending on the day."}] reaction="Some noticed, depending on the day."
  - c: I usually noticed and responded. measures=[{"id":"body_attention","value":2,"label":"I usually noticed and responded."}] reaction="Usually noticed and answered."
  - d: I made room for them consistently. measures=[{"id":"body_attention","value":3,"label":"I made room for them consistently."}] reaction="Consistent room made for them."

### q75 | Over the past month, how did skin comfort or care show up in your routine?

- Slot: slot-44; chapter: 6; role: context; test: no
- Domain: health; subject: self; window: Usual · past month; evidence: self_report
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: Over the past month, how did skin comfort or care show up in your routine? Setup: Skin comfort has its own notes. What did you notice or do?
  - a: I rarely tracked it. measures=[{"id":"skin_attention","value":0,"label":"I rarely tracked it."}] reaction="Skin care rarely tracked."
  - b: I noticed issues when they appeared. measures=[{"id":"skin_attention","value":1,"label":"I noticed issues when they appeared."}] reaction="Issues noticed when they appeared."
  - c: I had a small routine or check-in. measures=[{"id":"skin_attention","value":2,"label":"I had a small routine or check-in."}] reaction="A small routine or check-in."
  - d: I tracked what helped my comfort. measures=[{"id":"skin_attention","value":3,"label":"I tracked what helped my comfort."}] reaction="You tracked what helped comfort."

### q76 | In the last seven days, how often did your energy feel enough for the day?

- Slot: slot-53; chapter: 7; role: context; test: no
- Domain: health; subject: self; window: Recent · last 7 days; evidence: self_report; counterpart: q99
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: In the last seven days, how often did your energy feel enough for the day? Setup: Enough is your own threshold. Some days arrive with more battery than others.
  - a: Rarely. measures=[{"id":"felt_energy","value":0,"label":"Rarely."}] reaction="Energy rarely felt enough."
  - b: Some days. measures=[{"id":"felt_energy","value":1,"label":"Some days."}] reaction="Energy felt enough on some days."
  - c: Most days. measures=[{"id":"felt_energy","value":2,"label":"Most days."}] reaction="Energy felt enough most days."
  - d: Nearly every day. measures=[{"id":"felt_energy","value":3,"label":"Nearly every day."}] reaction="Energy felt enough nearly every day."

### q77 | Over the past month, on how many busy days did you remember a drink break?

- Slot: slot-45; chapter: 6; role: context; test: no
- Domain: health; subject: self; window: Usual · past month; evidence: self_report
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: Over the past month, on how many busy days did you remember a drink break? Setup: Use your own rough count. The drink-break department keeps imperfect minutes.
  - a: Almost none. measures=[{"id":"hydration_cues","value":0,"label":"Almost none."}] reaction="Drink breaks on almost no busy days."
  - b: Some busy days. measures=[{"id":"hydration_cues","value":1,"label":"Some busy days."}] reaction="Some busy days included a drink break."
  - c: Most busy days. measures=[{"id":"hydration_cues","value":2,"label":"Most busy days."}] reaction="Most busy days included a break."
  - d: Nearly every busy day. measures=[{"id":"hydration_cues","value":3,"label":"Nearly every busy day."}] reaction="Nearly every busy day included a break."

### q78 | Is there optional health context you want to record for this conversation?

- Slot: slot-46; chapter: 6; role: context; test: no
- Domain: health; subject: self; window: Context; evidence: self_report
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: Is there optional health context you want to record for this conversation? Setup: Choose one context, or use Other for more than one. It stays a reported fact.
  - a: Allergies or sensitivities. facts={"healthContext":"allergies-or-sensitivities"} reaction="Allergies or sensitivities can have a line in the notes."
  - b: An existing condition or ongoing treatment. facts={"healthContext":"existing-condition-or-treatment"} reaction="An existing condition or treatment gets a careful line."
  - c: A cycle or recurring body pattern. facts={"healthContext":"cycle-or-recurring-pattern"} reaction="A cycle or recurring body pattern gets space here."
  - d: None of these, or I would rather not say. facts={"healthContext":"none-or-prefer-not-to-say"} reaction="No optional health context today."

### q97 | On your usual days this past month, how regular were your meal times?

- Slot: slot-47; chapter: 6; role: context; test: no
- Domain: health; subject: self; window: Usual · past month; evidence: self_report; counterpart: q98
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: On your usual days this past month, how regular were your meal times? Setup: Think of the pattern that showed up most often, including days when the clock went rogue.
  - a: They varied a lot. measures=[{"id":"meal_regularity","value":0,"label":"They varied a lot."}]
  - b: They had a loose pattern. measures=[{"id":"meal_regularity","value":1,"label":"They had a loose pattern."}]
  - c: They were usually predictable. measures=[{"id":"meal_regularity","value":2,"label":"They were usually predictable."}]
  - d: They were very predictable. measures=[{"id":"meal_regularity","value":3,"label":"They were very predictable."}]

### q98 | In the last seven days, how did your meal timing hold up?

- Slot: slot-48; chapter: 6; role: context; test: no
- Domain: health; subject: self; window: Recent · last 7 days; evidence: self_report; counterpart: q97
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: In the last seven days, how did your meal timing hold up? Setup: Look at the actual week, with its meetings, errands, and suspiciously late snacks.
  - a: It changed from day to day. measures=[{"id":"meal_regularity","value":0,"label":"It changed from day to day."}]
  - b: It had a loose pattern. measures=[{"id":"meal_regularity","value":1,"label":"It had a loose pattern."}]
  - c: It was predictable most days. measures=[{"id":"meal_regularity","value":2,"label":"It was predictable most days."}]
  - d: It was very predictable. measures=[{"id":"meal_regularity","value":3,"label":"It was very predictable."}]

### q99 | On your usual days this past month, how often did your energy feel enough for the day?

- Slot: slot-49; chapter: 6; role: context; test: no
- Domain: health; subject: self; window: Usual · past month; evidence: self_report; counterpart: q76
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: On your usual days this past month, how often did your energy feel enough for the day? Setup: Use your own threshold for enough. Your ordinary battery has the deciding vote.
  - a: Rarely. measures=[{"id":"felt_energy","value":0,"label":"Rarely."}]
  - b: Some days. measures=[{"id":"felt_energy","value":1,"label":"Some days."}]
  - c: Most days. measures=[{"id":"felt_energy","value":2,"label":"Most days."}]
  - d: Nearly every day. measures=[{"id":"felt_energy","value":3,"label":"Nearly every day."}]

### q100 | Over the past month, how often did your usual sleep leave you feeling restored?

- Slot: slot-54; chapter: 7; role: context; test: no
- Domain: health; subject: self; window: Usual · past month; evidence: self_report; counterpart: q102
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: Over the past month, how often did your usual sleep leave you feeling restored? Setup: Think of the ordinary pattern, not the one heroic night that arrived with a cape.
  - a: Rarely restored. measures=[{"id":"sleep_restoration","value":0,"label":"Rarely restored."}]
  - b: Restored on some days. measures=[{"id":"sleep_restoration","value":1,"label":"Restored on some days."}]
  - c: Restored most days. measures=[{"id":"sleep_restoration","value":2,"label":"Restored most days."}]
  - d: Every day or nearly every day. measures=[{"id":"sleep_restoration","value":3,"label":"Every day or nearly every day."}]

### q101 | During a typical week in the past month, on how many days did you deliberately get some movement?

- Slot: slot-50; chapter: 6; role: context; test: no
- Domain: health; subject: self; window: Usual · past month; evidence: self_report; counterpart: q46
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: During a typical week in the past month, on how many days did you deliberately get some movement? Setup: Count movement that works for your body, from a walk to a wheelchair workout to an excellent stretch.
  - a: Zero days. measures=[{"id":"movement_consistency","value":0,"label":"Zero days."}]
  - b: One or two days. measures=[{"id":"movement_consistency","value":1,"label":"One or two days."}]
  - c: Three or four days. measures=[{"id":"movement_consistency","value":2,"label":"Three or four days."}]
  - d: Five to seven days. measures=[{"id":"movement_consistency","value":3,"label":"Five to seven days."}]

### q102 | In the last seven days, how often did sleep leave you feeling restored?

- Slot: slot-55; chapter: 7; role: context; test: no
- Domain: health; subject: self; window: Recent · last 7 days; evidence: self_report; counterpart: q100
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: In the last seven days, how often did sleep leave you feeling restored? Setup: Think of the actual week, including the night your pillow became a negotiation partner.
  - a: Rarely restored. measures=[{"id":"sleep_restoration","value":0,"label":"Rarely restored."}]
  - b: Restored on some days. measures=[{"id":"sleep_restoration","value":1,"label":"Restored on some days."}]
  - c: Restored most days. measures=[{"id":"sleep_restoration","value":2,"label":"Restored most days."}]
  - d: Every day or nearly every day. measures=[{"id":"sleep_restoration","value":3,"label":"Every day or nearly every day."}]

### q94 | What time do you usually wake up?

- Slot: slot-11; chapter: 2; role: context; test: no
- Domain: health; subject: self; window: Usual · past month; evidence: self_report
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: What time do you usually wake up? Setup: Use your ordinary past-month pattern.
  - a: Before 6 a.m. facts={"wake":"before 06:00"}
  - b: 6 to 8 a.m. facts={"wake":"06:00-08:00"}
  - c: 8 to 9 a.m. facts={"wake":"08:00-09:00"}
  - d: After 9 a.m. facts={"wake":"after 09:00"}
  - e: It varies too much for one band. facts={"wake":"variable"}

### q95 | How long do you usually sleep?

- Slot: slot-13; chapter: 2; role: context; test: no
- Domain: health; subject: self; window: Usual · past month; evidence: self_report
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: How long do you usually sleep? Setup: Think of your ordinary past-month pattern.
  - a: Under 6 hours. facts={"sleepDuration":"under-6-hours"}
  - b: 6 to under 7 hours. facts={"sleepDuration":"6-to-under-7-hours"}
  - c: 7 to under 9 hours. facts={"sleepDuration":"7-to-under-9-hours"}
  - d: 9 hours or more. facts={"sleepDuration":"9-hours-or-more"}
  - e: It varies too much for one band. facts={"sleepDuration":"variable"}

### q96 | Think of the latest night this month when an optional task competed with sleep.

- Slot: slot-56; chapter: 7; role: actual; test: no
- Domain: health; subject: self; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: Think of the latest night this month when an optional task competed with sleep. Setup: Choose “No example to use” if this has not happened in the past month. What did you actually do?
  - a: Stopped and went to sleep. tags=[{"d":"D14a","v":"protect","target":"general"},{"d":"D14d","v":"rest","target":"general"}]
  - b: Finished the task and slept later. tags=[{"d":"D14a","v":"delay","target":"general"},{"d":"D14d","v":"obligation","target":"general"}]
  - c: Moved the task or changed tomorrow. tags=[{"d":"D14a","v":"adjust","target":"general"},{"d":"D3","v":"plan","target":"general"}]
  - d: Asked someone how they handle a night like that. tags=[{"d":"D14d","v":"connection","target":"general"}]

### q81 | You and someone important planned an outing. They ordered extras and suggest splitting everything evenly.

- Slot: slot-10; chapter: 2; role: hypothetical; test: no
- Domain: personality; subject: general; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: You and someone important planned an outing. They ordered extras and suggest splitting everything evenly. Setup: The extra dessert has entered the shared spreadsheet.
  - a: Ask to split the extras by who ordered them. tags=[{"d":"D8","v":"proportional","target":"general"},{"d":"D7","v":"direct","target":"general"}] reaction="Extras follow whoever ordered them."
  - b: Explain my share privately and adjust the total. tags=[{"d":"D8","v":"proportional","target":"general"},{"d":"D7","v":"soften","target":"general"}] reaction="You explain your share privately."
  - c: Pay evenly; it is easier than doing arithmetic together. tags=[{"d":"D8","v":"absorb","target":"general"}] reaction="Even split keeps the arithmetic brief."
  - d: Pay and leave the dessert unmentioned. tags=[{"d":"D8","v":"absorb","target":"general"},{"d":"D7","v":"avoid","target":"general"}] reaction="Dessert stays unmentioned."

### q82 | A shared project workload needs a fair plan.

- Slot: slot-14; chapter: 2; role: hypothetical; test: no
- Domain: personality; subject: self; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: A shared project workload needs a fair plan. Setup: The project has one deadline and several people with different capacity.
  - a: Name the contributions and split the work. tags=[{"d":"D8","v":"proportional","target":"general"},{"d":"D7","v":"direct","target":"general"}]
  - b: Send a private message about my share. tags=[{"d":"D8","v":"proportional","target":"general"},{"d":"D7","v":"soften","target":"general"}]
  - c: Take the extra work to keep it moving. tags=[{"d":"D8","v":"absorb","target":"general"}]
  - d: State what I can do and stop there. tags=[{"d":"D8","v":"limit","target":"general"}]

### q83 | When someone important goes quiet after a hard day, what is your first story?

- Slot: slot-17; chapter: 3; role: hypothetical; test: no
- Domain: emotion; subject: general; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: When someone important goes quiet after a hard day, what is your first story? Setup: Use the selected close person if you have one; skip if this does not fit.
  - a: They are probably busy. The silence and I can coexist. tags=[{"d":"D5","v":"secure","target":"general"}]
  - b: I worry they are upset with me and send a check-in. tags=[{"d":"D5","v":"worry","target":"general"},{"d":"D6","v":"support","target":"general"}]
  - c: I reread my message and look for what I did wrong. tags=[{"d":"D5","v":"reassurance","target":"general"},{"d":"D6","v":"private","target":"general"}]
  - d: I ask directly whether we are okay. tags=[{"d":"D5","v":"reassurance","target":"general"},{"d":"D7","v":"direct","target":"general"}]

### q84 | It is 11 p.m. after a cursed day. Who gets the first version?

- Slot: slot-18; chapter: 3; role: hypothetical; test: no
- Domain: emotion; subject: general; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: It is 11 p.m. after a cursed day. Who gets the first version? Setup: The day has already filed its paperwork; choose how much to share.
  - a: I tell someone important the whole story and ask them to listen. tags=[{"d":"D6","v":"support","target":"general"}]
  - b: I tell someone important a small version, then go quiet. tags=[{"d":"D6","v":"selective","target":"general"}]
  - c: I process it privately before telling someone important anything. tags=[{"d":"D6","v":"private","target":"general"}]
  - d: I talk to someone else first. tags=[{"d":"D6","v":"selective","target":"general"}]

### q85 | The last time you felt ignored by someone important, what did you actually do?

- Slot: slot-20; chapter: 3; role: actual; test: no
- Domain: emotion; subject: general; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: The last time you felt ignored by someone important, what did you actually do? Setup: Choose a close-person response; skip if there is no safe or useful example.
  - a: Said what was bothering me. tags=[{"d":"D7","v":"direct","target":"general"}]
  - b: Eased into it gently. tags=[{"d":"D7","v":"soften","target":"general"}]
  - c: Asked for time and came back to talk. tags=[{"d":"D7","v":"pause","target":"general"},{"d":"D6","v":"private","target":"general"}]
  - d: Avoided the conversation and let it pass. tags=[{"d":"D7","v":"avoid","target":"general"},{"d":"D6","v":"private","target":"general"}]

### q86 | After a fight, someone important sends a raccoon eating grapes. No explanation.

- Slot: slot-21; chapter: 3; role: hypothetical; test: no
- Domain: emotion; subject: general; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: After a fight, someone important sends a raccoon eating grapes. No explanation. Setup: The raccoon is excellent at conflict avoidance. What do you do?
  - a: “He is incredible. Can we talk about yesterday?” tags=[{"d":"D7","v":"direct","target":"general"},{"d":"D12","v":"repair","target":"general"}]
  - b: Send one back, then ask to talk tonight. tags=[{"d":"D7","v":"soften","target":"general"},{"d":"D12","v":"repair","target":"general"}]
  - c: Send one back and leave it there. tags=[{"d":"D7","v":"avoid","target":"general"}]
  - d: Say I need a day before we talk. tags=[{"d":"D7","v":"pause","target":"general"},{"d":"D6","v":"private","target":"general"}]

### q87 | You forgot something important to someone important. What comes next?

- Slot: slot-22; chapter: 3; role: hypothetical; test: no
- Domain: emotion; subject: general; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: You forgot something important to someone important. What comes next? Setup: The full stop in “it’s fine” has entered the room.
  - a: Apologize and ask how to make it right. tags=[{"d":"D12","v":"repair","target":"general"},{"d":"D7","v":"direct","target":"general"}]
  - b: Apologize and explain what happened. tags=[{"d":"D12","v":"explain","target":"general"},{"d":"D7","v":"soften","target":"general"}]
  - c: Arrange something thoughtful to make up for it. tags=[{"d":"D12","v":"action","target":"general"},{"d":"D3","v":"plan","target":"general"}]
  - d: Ask for space, then agree when to talk. tags=[{"d":"D12","v":"pause","target":"general"},{"d":"D7","v":"pause","target":"general"}]

### q88 | When someone important cancels a catch-up and suggests no new date, what do you assume first?

- Slot: slot-23; chapter: 3; role: hypothetical; test: no
- Domain: emotion; subject: general; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: When someone important cancels a catch-up and suggests no new date, what do you assume first? Setup: Choose the closest first interpretation; skip if this scene does not fit.
  - a: They are busy; we will find another time. tags=[{"d":"D5","v":"secure","target":"general"}]
  - b: I worry they are pulling away and want reassurance. tags=[{"d":"D5","v":"worry","target":"general"},{"d":"D6","v":"support","target":"general"}]
  - c: Ask directly whether we are okay. tags=[{"d":"D5","v":"reassurance","target":"general"},{"d":"D7","v":"direct","target":"general"}]
  - d: Wait; I do not choose an explanation yet. tags=[{"d":"D5","v":"uncertain","target":"general"},{"d":"D6","v":"private","target":"general"}]

### q89 | What did you actually do the last time an outing with someone important became uneven?

- Slot: slot-24; chapter: 4; role: actual; test: no
- Domain: personality; subject: general; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: What did you actually do the last time an outing with someone important became uneven? Setup: The bill or effort stopped matching; choose a real response or skip.
  - a: Named the imbalance and asked to split it fairly. tags=[{"d":"D8","v":"proportional","target":"general"},{"d":"D7","v":"direct","target":"general"}]
  - b: Sent a careful message about my share. tags=[{"d":"D8","v":"proportional","target":"general"},{"d":"D7","v":"soften","target":"general"}]
  - c: Covered it and kept the peace. tags=[{"d":"D8","v":"absorb","target":"general"}]
  - d: Stopped covering it without discussing why. tags=[{"d":"D8","v":"limit","target":"general"},{"d":"D7","v":"avoid","target":"general"}]

### q90 | What did you actually do the last time a setback happened to you?

- Slot: slot-25; chapter: 4; role: actual; test: no
- Domain: emotion; subject: general; window: Latest · past month; evidence: actual_event
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: What did you actually do the last time a setback happened to you? Setup: Choose what you told someone important, or skip if there is no useful example.
  - a: Told someone important quickly and asked them to stay with me in it. tags=[{"d":"D6","v":"support","target":"general"}]
  - b: Told someone important a small version first. tags=[{"d":"D6","v":"selective","target":"general"}]
  - c: Worked it out privately before saying anything. tags=[{"d":"D6","v":"private","target":"general"}]
  - d: Talked to someone else before someone important. tags=[{"d":"D6","v":"selective","target":"general"}]

### q92 | someone important cancels a plan that mattered to you.

- Slot: slot-58; chapter: 8; role: holdout; test: yes
- Domain: personality; subject: general; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: someone important cancels a plan that mattered to you. Setup: They offer a replacement without mentioning the cancellation.
  - a: Rebook, and say why the cancellation hurt. tags=[{"d":"D7","v":"direct","target":"general"}]
  - b: Start warmly, then bring it up gently. tags=[{"d":"D7","v":"soften","target":"general"}]
  - c: Ask for a day, then set a time to talk. tags=[{"d":"D7","v":"pause","target":"general"}]
  - d: Accept the new plan and say nothing about it. tags=[{"d":"D7","v":"avoid","target":"general"}]

### q93 | You let someone important down again, in a different situation.

- Slot: slot-62; chapter: 8; role: holdout; test: yes
- Domain: personality; subject: general; window: Scenario; evidence: hypothetical
- Source: PERSONALITY-HEALTH-SPEC.md (authorial, genii-root.v2)
- Prompt: You let someone important down again, in a different situation. Setup: The repair starts with one clear sentence.
  - a: Apologize directly and ask what would help. tags=[{"d":"D12","v":"repair","target":"general"}]
  - b: Apologize and explain what led to it. tags=[{"d":"D12","v":"explain","target":"general"}]
  - c: Arrange a thoughtful concrete way to make up for it. tags=[{"d":"D12","v":"action","target":"general"}]
  - d: Agree on space and a time to reconnect. tags=[{"d":"D12","v":"pause","target":"general"}]

## Measures

| ID | Domain | Label | Endpoints | Unit | Meaning |
| --- | --- | --- | --- | --- | --- |
| sleep_timing | sleep | Usual bedtime | before 11 p.m. to after 1 a.m. | ordinal | Reported usual bedtime band. |
| sleep_restoration | sleep | Sleep restoration | rarely refreshed to usually refreshed | ordinal | Reported sleep restoration across usual and recent windows. |
| sleep_regularity | sleep | Sleep timing consistency | very irregular to very regular | ordinal | Reported sleep timing consistency across usual and recent windows. |
| sleep_wake | sleep | Usual wake time | before 6 a.m. to after 9 a.m. | ordinal | Reported usual wake-time band. |
| sleep_duration | sleep | Usual sleep duration | under 6 hours to 9 hours or more | ordinal | Reported usual sleep-duration band. |
| meal_regularity | eating | Meal timing regularity | very varied to very regular | ordinal | Reported usual or recent meal timing pattern. |
| takeaway_days | eating | Takeaway dinners | none in seven days to five to seven days | ordinal | Reported takeaway dinner count. It does not rate diet quality. |
| movement_consistency | movement | Movement consistency | none or rare to most days | ordinal | Reported movement frequency or routine. |
| body_attention | body | Body cue attention | often postponed to usually noticed and addressed | ordinal | Reported attention to body cues. |
| skin_attention | skin | Skin care attention | rarely tracked to regularly tracked | ordinal | Reported skin experience and routine attention. |
| felt_energy | recovery | Felt energy | usually depleted to usually enough for the day | ordinal | Reported energy, not a medical measurement. |
| hydration_cues | hydration | Drink-break routine | almost never remembered to nearly every busy day | ordinal | Reported drink-break recall. |
| sleep_interference | sleep | Sleep and optional tasks | protect sleep to delay sleep | ordinal | Reported response to an optional task at bedtime. |

## Coverage checks

- Training route slots 33 to 39 are the seven literal emotion families. Every candidate scene records an explicit feeling and a separate response or recovery signal.
- Direct health sources include usual and recent sleep regularity, usual and recent meal timing, usual and recent movement consistency, usual and recent felt energy, usual sleep restoration and recent restfulness, body cues, skin comfort, wake time, sleep duration, takeaway count, drink-break frequency, and actual sleep interference.
- Optional health context q78 records allergies or sensitivities, existing conditions or treatment, cycles or recurring body patterns, or none or prefer not to say. Other remains an engine state and is never authored as a tag.
- Candidate count: 76. Routed IDs: 76. Unique routed IDs: 76.
