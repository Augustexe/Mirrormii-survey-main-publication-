# English question bank and evidence map

Respondent-facing wording after the 2026-09-17 voice pass. The 64-slot route selects from 76 candidates. Mapping columns are author-only. Wording lives in `src/english-copy.js`; routing and semantics live in `src/data.js`.

## q01 · slot-01

Who knows the version of you that would never make LinkedIn?

Pick one close person to keep in mind for a few questions. You can leave this open.

Source: self_report; window: context.

| Answer | Wording | Evidence |
|---|---|---|
| a | My mom. She's seen several eras. | close=mother |
| b | My dad. He knows the behind-the-scenes version. | close=father |
| c | My partner. They've seen the extended cut. | close=partner |
| d | A close friend. Unfortunately, they know the lore. | close=friend |
| e | No particular person for this conversation. | close=none |

## q02 · slot-02

Who's in your household cast?

The people, not the chair currently wearing all your clothes. Pick your living arrangement.

Source: self_report; window: context.

| Answer | Wording | Evidence |
|---|---|---|
| a | Just me. Every mysterious noise is my problem. | household=alone |
| b | People I share a home with. An ensemble cast. | household=shared |
| c | Family. Plenty of shared history. | household=family |
| d | I'd rather keep this one private. | household=unspecified |

## q03 · slot-03

Three days off. Trip money. Your brain opens which tab first?

You have enough for one small trip. Nothing's booked yet. What comes first?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Who to bring. The right person makes the story. | D1:people (general) |
| b | Where to go. Destination before guest list. | D1:task (general) |
| c | What I want. For once, I'm the itinerary. | D1:self (general) |
| d | Open a map and see what looks good. We'll find a plot. | D1:task (general); D3:improvise (general) |

## q04 · slot-04

A local says, “Trust me, take this detour.” The internet has zero opinions.

It's safe, unfamiliar, and a little out of the way. Do you go?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Go. Someone has to become the first review. | D2:novel (general); D3:improvise (general) |
| b | Ask a few questions before saying yes. | D2:conditional (general); D3:plan (general) |
| c | Stick to the route. Boring can be a love language. | D2:familiar (general); D3:plan (general) |
| d | Only if my travel companion is into it too. | D2:conditional (general) |

## q05 · slot-05

The restaurant is viral. Your friend is becoming hangry in real time.

You planned to eat here, but the wait is 90 minutes. What's your first move?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Find food now. The famous noodles will survive without us. | D1:people (general) |
| b | Stay. We planned the day around this place. | D1:task (general); D3:plan (general) |
| c | Ask what they want and decide together. | D1:people (general) |
| d | Grab myself a snack and let them choose. | D1:self (general) |

## q06 · slot-06

You're on a trip. “Quick favor?” has found your location.

Work or family needs something handled now. It's important, but not an emergency. What do you do?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Handle it now. The trip can pause. | D1:people (general); D11:duty (general) |
| b | Say when I can help later. Finish the current plan. | D1:task (general); D11:autonomy (general) |
| c | Ask someone else to cover it. I'm away. | D1:self (general); D11:autonomy (general) |
| d | Do the smallest useful fix, then get back to the trip. | D1:task (general); D3:plan (general) |

## q07 · slot-07

You ordered a salad. The group ordered a financial event.

On a trip with friends, the bill includes pricey extras you didn't use. They suggest splitting evenly. Your move?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Ask everyone to pay for what they actually used. | D8:proportional (friends); D7:direct (friends) |
| b | Split evenly. I'd pay a little to end the table math. | D8:absorb (friends) |
| c | Explain my share privately and ask to adjust it. | D8:proportional (friends); D7:soften (friends) |
| d | Pay the extra. Say nothing. Notice everything. | D8:absorb (friends); D7:hint (friends) |

## q08 · slot-08

Last time a plan went off-script, did you also go off-script?

Think of the most recent time in the past month. What did you actually do when the plan fell apart?

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Changed course immediately. New plot, let's go. | D3:improvise (general) |
| b | Made a new plan before doing anything. | D3:plan (general) |
| c | Asked someone else what they wanted to do. | D1:people (general); D3:consult (general) |
| d | Carried on and hoped the problem got bored. | D3:avoid (general) |

## q09 · slot-09

A month's worth of bills just landed in your account. As a gift. Breathe.

It's yours to keep. What gets first dibs?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Savings. I want the cushion before the confetti. | D4:security (general); D3:plan (general) |
| b | A new experience I've been putting off. | D4:enjoyment (general); D2:novel (general) |
| c | Something that buys my time back. | D4:freedom (general) |
| d | The recognizable brand. Yes, the logo is part of the appeal. | D4:status (general); D9:recognition (general) |

## q10 · slot-10

{close} orders the extras. Apparently, so does your wallet.

You're out together. They suggest splitting the bill evenly, including extras only they ordered. What do you do?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Ask them to cover their extras. The dessert knows whose it is. | D8:proportional (close); D7:direct (close) |
| b | Explain my share privately and adjust the split. | D8:proportional (close); D7:soften (close) |
| c | Split evenly. Less math, more evening. | D8:absorb (close) |
| d | Pay the extra and leave it unmentioned. | D8:absorb (close); D7:avoid (close) |

## q81 · slot-10

Someone important to you orders the extras. Apparently, so does your wallet.

You're out together. They suggest splitting the bill evenly, including extras only they ordered. What do you do?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Ask them to cover their extras. The dessert knows whose it is. | D8:proportional (general); D7:direct (general) |
| b | Explain my share privately and adjust the split. | D8:proportional (general); D7:soften (general) |
| c | Split evenly. Less math, more evening. | D8:absorb (general) |
| d | Pay the extra and leave it unmentioned. | D8:absorb (general); D7:avoid (general) |

## q94 · slot-11

When does your day usually start loading?

Over the past month, what time did you usually wake up? Sleepy staring at the ceiling still counts as awake.

Source: self_report; window: past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Before 6 a.m. | wake=before 06:00 |
| b | 6 to before 8 a.m. | wake=06:00-08:00 |
| c | 8 to 9 a.m. | wake=08:00-09:00 |
| d | After 9 a.m. | wake=after 09:00 |
| e | It varies too much for one range. | wake=variable |

## q13 · slot-12

Family needs a loan. Your bank balance would also like one.

Your month is already tight. They promise to pay you back. What's your response?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Say what I can afford and lend that amount. | D8:limit (family); D7:direct (family) |
| b | Ask what's going on and find another way to help. | D8:limit (family); D11:duty (family) |
| c | Lend it. I don't want family left stranded. | D8:absorb (family); D11:duty (family) |
| d | Decline. My own bills have called dibs. | D8:limit (family); D11:autonomy (family) |

## q95 · slot-13

How much sleep makes it into the final cut?

Over the past month, how long did you usually actually sleep? Time in bed thinking about everything doesn't count.

Source: self_report; window: past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Under 6 hours. | sleepDuration=under-6-hours |
| b | 6 to under 7 hours. | sleepDuration=6-to-under-7-hours |
| c | 7 to under 9 hours. | sleepDuration=7-to-under-9-hours |
| d | 9 hours or more. | sleepDuration=9-hours-or-more |
| e | It varies too much for one range. | sleepDuration=variable |

## q15 · slot-14

Your housemates believe in a cleaning fairy. It's you. You're the fairy.

You've been doing more than your share. How do you handle it?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Ask to split the chores by task. | D8:proportional (household); D7:direct (household) |
| b | Make a schedule. The trash needs shared custody. | D8:proportional (household); D3:plan (general) |
| c | Do it myself. Discussing the dish takes longer. | D8:absorb (household); D7:avoid (household) |
| d | Stop doing their share. Let the magic wear off. | D8:limit (household) |

## q82 · slot-14

The shared project is starting to feel suspiciously like your solo debut.

One deadline, several people, different amounts of free time. How do you handle the workload?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Name each person's contribution and split the work. | D8:proportional (general); D7:direct (general) |
| b | Send a private message about my share. | D8:proportional (general); D7:soften (general) |
| c | Take on the extra to keep things moving. | D8:absorb (general) |
| d | State what I can do and stop there. | D8:limit (general) |

## q16 · slot-15

Think of the last friend-group bill that got… interesting.

In the past month, when a shared cost got awkward, what did you actually do?

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Said the amount plainly. Gave the number a voice. | D8:proportional (friends); D7:direct (friends) |
| b | Sent a careful message privately. | D8:proportional (friends); D7:soften (friends) |
| c | Paid or lent the money and let it go. | D8:absorb (friends); D7:avoid (friends) |
| d | Paid my share and left the rest for someone else to sort. | D8:proportional (friends) |

## q17 · slot-16

When do you usually log off being a person?

Over the past month, what time did you usually go to sleep? Count actual sleep, not getting into bed to scroll.

Source: self_report; window: past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Before 11 p.m. Early credits. | bedtime=before 23:00 |
| b | 11 p.m. to 1 a.m. The late showing. | bedtime=23:00-01:00 |
| c | After 1 a.m. Bonus content. | bedtime=after 01:00 |
| d | It varies, or I work shifts. Different showtimes. | bedtime=variable-or-shifts |

## q18 · slot-17

{close} goes quiet after a hard day. Your brain starts writing… what?

You haven't heard back. What's your first interpretation or response?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | They're probably busy. Silence can just be silence. | D5:secure (close) |
| b | Worry they're upset with me and send a check-in. | D5:worry (close); D6:support (close) |
| c | Reread my message, looking for what I did wrong. | D5:reassurance (close); D6:private (close) |
| d | Ask directly if we're okay. Skip the detective season. | D5:reassurance (close); D7:direct (close) |

## q83 · slot-17

Someone important to you goes quiet after a hard day. Your brain starts writing… what?

You haven't heard back. What's your first interpretation or response?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | They're probably busy. Silence can just be silence. | D5:secure (general) |
| b | Worry they're upset with me and send a check-in. | D5:worry (general); D6:support (general) |
| c | Reread my message, looking for what I did wrong. | D5:reassurance (general); D6:private (general) |
| d | Ask directly if we're okay. Skip the detective season. | D5:reassurance (general); D7:direct (general) |

## q19 · slot-18

It's 11 p.m. Today deserves a one-star review.

How much of the story do you share with {close}?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | The whole thing. I ask them to listen. | D6:support (close) |
| b | The trailer, then I go quiet. | D6:selective (close) |
| c | I sort it out privately before telling them anything. | D6:private (close) |
| d | Someone else gets the first call. | D6:selective (general) |

## q84 · slot-18

It's 11 p.m. Today deserves a one-star review.

How much of the story do you share with someone important to you?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | The whole thing. I ask them to listen. | D6:support (general) |
| b | The trailer, then I go quiet. | D6:selective (general) |
| c | I sort it out privately before telling them anything. | D6:private (general) |
| d | Someone else gets the first call. | D6:selective (general) |

## q20 · slot-19

How often did dinner have a tracking number?

In the last 7 days, how many dinners came from a restaurant, takeout, or delivery? Eating there counts too.

Source: self_report; window: last_7_days.

| Answer | Wording | Evidence |
|---|---|---|
| a | None. Zero restaurant dinners. | takeaway_days=0; takeaway=0 days / last 7 |
| b | 1–2 dinners. An occasional guest appearance. | takeaway_days=1; takeaway=1-2 days / last 7 |
| c | 3–4 dinners. A recurring character. | takeaway_days=2; takeaway=3-4 days / last 7 |
| d | 5–7 dinners. A series regular. | takeaway_days=3; takeaway=5-7 days / last 7 |

## q21 · slot-20

Last time you felt ignored by {close}, what made it out of your head?

Think of the most recent time in the past month. Pick what you actually did, not the comeback you wrote in the shower.

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Said what was bothering me. Out loud, to them. | D7:direct (close) |
| b | Eased into the conversation gently. | D7:soften (close) |
| c | Asked for time, then came back to talk. | D7:pause (close); D6:private (close) |
| d | Let it pass without having the conversation. | D7:avoid (close); D6:private (close) |

## q85 · slot-20

Last time you felt ignored by someone important to you, what made it out of your head?

Think of the most recent time in the past month. Pick what you actually did, not the comeback you wrote in the shower.

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Said what was bothering me. Out loud, to them. | D7:direct (general) |
| b | Eased into the conversation gently. | D7:soften (general) |
| c | Asked for time, then came back to talk. | D7:pause (general); D6:private (general) |
| d | Let it pass without having the conversation. | D7:avoid (general); D6:private (general) |

## q22 · slot-21

You had a fight. {close} sends a raccoon eating grapes.

No apology. No explanation. Just a very well-fed raccoon. What do you send back?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | “He's incredible. Can we talk about yesterday?” | D7:direct (close); D12:repair (close) |
| b | A meme back, then a request to talk tonight. | D7:soften (close); D12:repair (close) |
| c | A meme back. Let the raccoon handle the rest. | D7:avoid (close) |
| d | “I need a day. Then let's talk.” | D7:pause (close); D6:private (close) |

## q86 · slot-21

You had a fight. someone important to you sends a raccoon eating grapes.

No apology. No explanation. Just a very well-fed raccoon. What do you send back?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | “He's incredible. Can we talk about yesterday?” | D7:direct (general); D12:repair (general) |
| b | A meme back, then a request to talk tonight. | D7:soften (general); D12:repair (general) |
| c | A meme back. Let the raccoon handle the rest. | D7:avoid (general) |
| d | “I need a day. Then let's talk.” | D7:pause (general); D6:private (general) |

## q23 · slot-22

{close} says “it's fine.” The period says otherwise.

You forgot something important to them. What do you do next?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Apologize and ask what would help make it right. | D12:repair (close); D7:direct (close) |
| b | Apologize and explain what happened. | D12:explain (close); D7:soften (close) |
| c | Plan something thoughtful to make up for it. | D12:action (close); D3:plan (general) |
| d | Ask for some space and agree on when we'll talk. | D12:pause (close); D7:pause (close) |

## q87 · slot-22

They say “it's fine.” The period says otherwise.

You forgot something important to someone you care about. What do you do next?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Apologize and ask what would help make it right. | D12:repair (general); D7:direct (general) |
| b | Apologize and explain what happened. | D12:explain (general); D7:soften (general) |
| c | Plan something thoughtful to make up for it. | D12:action (general); D3:plan (general) |
| d | Ask for some space and agree on when we'll talk. | D12:pause (general); D7:pause (general) |

## q24 · slot-23

{close} cancels. A new date is apparently sold separately.

They haven't suggested another time. What's your first interpretation or response?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | They're busy. We'll find another time. | D5:secure (close) |
| b | Worry they're pulling away and want reassurance. | D5:worry (close); D6:support (close) |
| c | Ask directly whether we're okay. | D5:reassurance (close); D7:direct (close) |
| d | Wait. I don't have enough information to write the story. | D5:uncertain (close); D6:private (close) |

## q88 · slot-23

Someone important to you cancels. A new date is apparently sold separately.

They haven't suggested another time. What's your first interpretation or response?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | They're busy. We'll find another time. | D5:secure (general) |
| b | Worry they're pulling away and want reassurance. | D5:worry (general); D6:support (general) |
| c | Ask directly whether we're okay. | D5:reassurance (general); D7:direct (general) |
| d | Wait. I don't have enough information to write the story. | D5:uncertain (general); D6:private (general) |

## q29 · slot-24

Last hangout where you carried more than {close}: did you say something?

Think of the latest time in the past month you paid more or did more of the organizing. What did you actually do?

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Pointed out the imbalance and asked for a fairer split. | D8:proportional (close); D7:direct (close) |
| b | Sent a careful private message about my share. | D8:proportional (close); D7:soften (close) |
| c | Covered the extra and kept the peace. | D8:absorb (close) |
| d | Stopped covering the extra without explaining why. | D8:limit (close); D7:avoid (close) |

## q89 · slot-24

Last hangout where you carried more than someone important to you: did you say something?

Think of the latest time in the past month you paid more or did more of the organizing. What did you actually do?

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Pointed out the imbalance and asked for a fairer split. | D8:proportional (general); D7:direct (general) |
| b | Sent a careful private message about my share. | D8:proportional (general); D7:soften (general) |
| c | Covered the extra and kept the peace. | D8:absorb (general) |
| d | Stopped covering the extra without explaining why. | D8:limit (general); D7:avoid (general) |

## q30 · slot-25

Something went wrong. Did {close} get the live coverage or the recap?

Think of your most recent setback in the past month. What did you actually share?

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Told them quickly and asked for support. | D6:support (close) |
| b | Gave them a smaller version first. | D6:selective (close) |
| c | Worked through it privately before saying anything. | D6:private (close) |
| d | Talked to someone else before telling them. | D6:selective (general) |

## q90 · slot-25

Something went wrong. Did someone important to you get the live coverage or the recap?

Think of your most recent setback in the past month. What did you actually share?

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Told them quickly and asked for support. | D6:support (general) |
| b | Gave them a smaller version first. | D6:selective (general) |
| c | Worked through it privately before saying anything. | D6:private (general) |
| d | Talked to someone else before telling them. | D6:selective (general) |

## q31 · slot-26

You lose your job. The family group chat is still sending recipes.

Imagine this happened today. Who in your family would you tell, and when?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Tell them quickly. I need my people around me. | D6:support (family) |
| b | Tell one person privately first. | D6:selective (family) |
| c | Wait until I have a plan to go with the news. | D6:private (family); D3:plan (general) |
| d | Handle it on my own for a while. | D6:distance (family) |

## q32 · slot-27

Your family had a plan for your life. Cute. Was it your plan?

Think of the latest disagreement in the past month about something they wanted you to do. What did you actually do?

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Said no and stuck with my own plan. | D11:autonomy (family); D7:direct (family) |
| b | Found a compromise we could live with. | D11:conditional (family) |
| c | Went along with what they wanted. | D11:duty (family); D1:people (general) |
| d | Avoided the conversation for now. | D7:avoid (family) |

## q65 · slot-28

A plan hit a surprise problem. What was the face-to-inner-monologue ratio?

Think of the latest time in the past month. Pick the closest combination of what you felt and what you did.

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | A flash of irritation. I said what needed changing. | frustration/feeling:present; frustration/response:direct |
| b | Properly angry inside. Quiet outside while I decided. | frustration/feeling:high; frustration/response:pause |
| c | Mildly bothered. Took a reset, moved to the next step. | frustration/feeling:low; frustration/recovery:reset |
| d | Felt stuck. Asked someone to help untangle it. | frustration/feeling:uncertain; frustration/response:support |

## q66 · slot-29

The deadline was getting closer. Their reply was not.

Think of the latest time in the past month a message you needed sat unread. What did you feel and do?

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Uneasy. Sent one clear check-in. | worry/feeling:present; worry/response:check_in |
| b | Very worried. Checked the details again. | worry/feeling:high; worry/response:checking |
| c | Not especially worried. Assumed they were busy and carried on. | worry/feeling:low; worry/response:continue |
| d | Uncertain. Put the phone away for a bit. | worry/feeling:uncertain; worry/recovery:space |

## q67 · slot-30

The plan you were looking forward to got canceled. Plot twist nobody ordered.

Think of the latest time in the past month. What happened inside, and what did you do next?

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Disappointed. Said I wanted to reschedule. | disappointment/feeling:present; disappointment/response:reschedule |
| b | Sad. Took a quiet evening and revisited it later. | disappointment/feeling:present; disappointment/recovery:space |
| c | Barely bothered. Made another plan. | disappointment/feeling:low; disappointment/response:adjust |
| d | Let down. Asked what had changed. | disappointment/feeling:present; disappointment/response:context |

## q68 · slot-31

You called someone the wrong name. In front of other people. Lovely.

If this happened in the past month, think of the most recent time. What did you feel and do?

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Embarrassed. Laughed and corrected myself. | embarrassment/feeling:present; embarrassment/response:repair |
| b | Intensely embarrassed. Went quiet for a beat. | embarrassment/feeling:high; embarrassment/response:pause |
| c | A little awkward. Kept the conversation moving. | embarrassment/feeling:low; embarrassment/response:continue |
| d | Embarrassed. Apologized and let the moment pass. | embarrassment/feeling:present; embarrassment/recovery:repair |

## q69 · slot-32

Your brain remembered the promise. After the other person waited. Excellent timing.

Think of the latest time in the past month. What did you feel, and how did you respond?

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Guilty. Apologized plainly. | guilt/feeling:present; guilt/response:repair |
| b | Awful. Explained what happened and offered a fix. | guilt/feeling:high; guilt/recovery:repair |
| c | A little guilty. Set a reminder for next time. | guilt/feeling:low; guilt/response:prevention |
| d | Guilty. Asked for some time, then came back to it. | guilt/feeling:present; guilt/recovery:pause |

## q70 · slot-33

That good news you'd been quietly hoping for? It actually happened.

Think of the latest time in the past month. How did the happy get out?

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Delighted. Called someone to celebrate. | joy/feeling:present; joy/response:celebrate |
| b | Fizzing with excitement. Made a plan for the next step. | joy/feeling:present; joy/response:act |
| c | Happy. Kept it private and let it sink in. | joy/feeling:present; joy/recovery:savor |
| d | Pleased. Told them exactly how much it meant. | joy/feeling:present; joy/response:express |

## q71 · slot-34

The stressful thing finally ended. Did the rest of you get the memo?

Think of the latest time in the past month a stressful situation ended. What did relief look like for you?

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Felt relieved. Exhaled before doing anything else. | relief/feeling:present; relief/recovery:rest |
| b | The relief arrived slowly. Then I rested. | relief/feeling:present; relief/recovery:rest |
| c | Felt relieved and told the person who'd helped. | relief/feeling:present; relief/response:connect |
| d | Felt relieved, then checked the next small step. | relief/feeling:present; relief/response:next_step |

## q33 · slot-35

You bring a friend to the party. They become the party.

Everyone loves them. You're standing there holding two drinks. What's your move?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Introduce them to more people. Enjoy watching them shine. | D9:noncompetitive (general) |
| b | Stay close and make sure I'm not forgotten. | D9:recognition (general) |
| c | Make it a double act. We can be iconic together. | D9:competitive (general); D1:people (general) |
| d | Head out early. My social battery is done. | D14d:rest (general) |

## q41 · slot-36

A soaked cat looks at you like you're customer support for the weather.

You can't take it home. How would you respond?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Bring food and water. Catering, not accommodation. | D13:bounded (general) |
| b | Contact a rescue that can help. | D13:coordinate (general); D3:plan (general) |
| c | Ask nearby people who can pitch in. | D13:coordinate (general); D1:people (general) |
| d | Leave. I can't safely help right now. | D13:limit (general); D1:self (general) |

## q42 · slot-37

You're running on 2%. A stranger needs directions. Your bus is coming.

You're exhausted, and the bus arrives in two minutes. What do you do?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Stay and help them. I'll catch another bus. | D13:direct (general); D1:people (general) |
| b | Give quick directions, then catch my bus. | D13:bounded (general) |
| c | Point them toward staff before I go. | D13:coordinate (general); D1:task (general) |
| d | Apologize and catch my bus. That's what I have capacity for. | D13:limit (general); D14d:rest (general) |

## q43 · slot-38

Your movement plan has competition. The competition brought snacks.

You've got one free hour and an appealing alternative to your planned movement. What wins?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | The original movement plan. Keeping the appointment. | D14c:planned (general); D3:plan (general) |
| b | The alternative. Reschedule the movement. | D14c:adjust (general); D3:plan (general) |
| c | The alternative. Skip movement today. | D14c:skip (general) |
| d | A shorter bit of movement, then join in. A crossover episode. | D14c:adjust (general); D3:improvise (general) |

## q44 · slot-39

Last time dinner fell apart, what was the edible backup plan?

Think of the latest stressful dinner-plan failure in the past month. What did you actually do about eating?

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Made the meal I'd planned anyway. | D14b:planned (general) |
| b | Made a quick version of the original plan. | D14b:bounded (general) |
| c | Ordered comfort food right away. Dinner needed a soft landing. | D14b:comfort (general); D10:act (general) |
| d | Put off eating until I could think clearly. | D14b:delay (general); D10:wait (general) |

## q45 · slot-40

You're about to sleep. One more task appears like a post-credits scene.

It would help, but it's optional and can wait until morning. What do you do?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Move it to tomorrow and go to bed. | D14a:protect (general); D14d:rest (general) |
| b | Finish it, then sleep later. | D14a:delay (general); D14d:obligation (general) |
| c | Finish it and shift tomorrow's wake-up so I can still sleep. | D14a:adjust (general); D3:plan (general) |
| d | Decline it. Tonight is closed. | D14a:protect (general); D14d:rest (general) |

## q46 · slot-41

This week's movement count. Tiny walks are allowed to have main-character energy.

In the last 7 days, on how many days did you deliberately move? Walks, wheelchair exercise, and movement that works for your body all count.

Source: self_report; window: last_7_days.

| Answer | Wording | Evidence |
|---|---|---|
| a | 0 days. | movement_consistency=0; movement=0 days / last 7 |
| b | 1–2 days. | movement_consistency=1; movement=1-2 days / last 7 |
| c | 3–4 days. | movement_consistency=2; movement=3-4 days / last 7 |
| d | 5–7 days. | movement_consistency=3; movement=5-7 days / last 7 |

## q47 · slot-42

Last time life stepped on your movement plan, what survived?

Think of the latest time in the past month a hard day got in the way. What did you actually do?

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Kept the original plan. | D14c:planned (general) |
| b | Changed the plan to fit the day. | D14c:adjust (general); D3:plan (general) |
| c | Skipped it and didn't replace it. | D14c:skip (general) |
| d | Did a shorter version. The pocket edition. | D14c:adjust (general) |

## q74 · slot-43

When your body sends a notification, does it get left on read?

Over the past month, how did you notice and respond to cues like hunger, tension, pain, or needing a bathroom break?

Source: self_report; window: past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Often noticed late or put them off. | body_attention=0 |
| b | Noticed some. Depended on the day. | body_attention=1 |
| c | Usually noticed and responded. | body_attention=2 |
| d | Consistently made room for them. | body_attention=3 |

## q75 · slot-44

Your skin lives with you rent-free. How much attention did it get?

Over the past month, how did you notice or care for skin comfort? No 12-step routine required.

Source: self_report; window: past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Rarely kept track of it. | skin_attention=0 |
| b | Noticed issues when they appeared. | skin_attention=1 |
| c | Had a small routine or check-in. | skin_attention=2 |
| d | Kept track of what helped it feel comfortable. | skin_attention=3 |

## q77 · slot-45

Your water bottle: beverage or desk accessory?

Over the past month, how often did you remember a drink break on busy days? Count the break, not how aesthetic the bottle is.

Source: self_report; window: past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Almost no busy days. | hydration_cues=0 |
| b | Some busy days. | hydration_cues=1 |
| c | Most busy days. | hydration_cues=2 |
| d | Nearly every busy day. | hydration_cues=3 |

## q78 · slot-46

Anything your body would like to add to the group chat?

Optional: choose one health context, or use Other for more than one. Share only what you're comfortable recording on this device.

Source: self_report; window: context.

| Answer | Wording | Evidence |
|---|---|---|
| a | Allergies or sensitivities. | healthContext=allergies-or-sensitivities |
| b | An existing condition or ongoing treatment. | healthContext=existing-condition-or-treatment |
| c | A cycle or recurring body pattern. | healthContext=cycle-or-recurring-pattern |
| d | None of these, or I'd rather not say. | healthContext=none-or-prefer-not-to-say |

## q97 · slot-47

Do your meals have regular time slots, or just surprise cameos?

Over the past month, how predictable were your usual meal times? Think timing, not what was on the plate.

Source: self_report; window: past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Varied a lot. | meal_regularity=0 |
| b | Had a loose pattern. | meal_regularity=1 |
| c | Usually predictable. | meal_regularity=2 |
| d | Very predictable. | meal_regularity=3 |

## q98 · slot-48

This week, did meals keep their appointments?

In just the last 7 days, how predictable were your meal times? Count the week you had, including any lunch that auditioned for dinner.

Source: self_report; window: last_7_days.

| Answer | Wording | Evidence |
|---|---|---|
| a | Changed from day to day. | meal_regularity=0 |
| b | Had a loose pattern. | meal_regularity=1 |
| c | Predictable most days. | meal_regularity=2 |
| d | Very predictable. | meal_regularity=3 |

## q99 · slot-49

On a usual day, does your battery last as long as your to-do list?

Over the past month, how often did your energy feel enough for your day? Enough means enough for you.

Source: self_report; window: past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Rarely. | felt_energy=0 |
| b | Some days. | felt_energy=1 |
| c | Most days. | felt_energy=2 |
| d | Nearly every day. | felt_energy=3 |

## q101 · slot-50

Zooming out: how often does movement make the weekly lineup?

During a typical week in the past month, on how many days did you deliberately move? Walks, wheelchair workouts, stretches: your version counts.

Source: self_report; window: past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | 0 days. | movement_consistency=0 |
| b | 1–2 days. | movement_consistency=1 |
| c | 3–4 days. | movement_consistency=2 |
| d | 5–7 days. | movement_consistency=3 |

## q72 · slot-51

Does your sleep schedule have a pattern, or is it more of a guest appearance?

Over the past month, how consistent were the times you went to sleep and woke up? Include shifts and changing days.

Source: self_report; window: past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Changed a lot from day to day. | sleep_regularity=0 |
| b | A loose pattern. Roughly in the same universe. | sleep_regularity=1 |
| c | Usually consistent. | sleep_regularity=2 |
| d | Very consistent. Similar times day to day. | sleep_regularity=3 |

## q73 · slot-52

And this past week: same sleep schedule, or surprise remix?

In just the last 7 days, how consistent were your sleep and wake times? This can differ from your usual month.

Source: self_report; window: last_7_days.

| Answer | Wording | Evidence |
|---|---|---|
| a | Changed a lot from day to day. | sleep_regularity=0 |
| b | A loose pattern. | sleep_regularity=1 |
| c | Usually consistent. | sleep_regularity=2 |
| d | Very consistent. | sleep_regularity=3 |

## q76 · slot-53

This week's energy: enough to run the day, or a lot of low-battery pop-ups?

In the last 7 days, how often did your energy feel enough for your day? Use your own meaning of “enough.”

Source: self_report; window: last_7_days.

| Answer | Wording | Evidence |
|---|---|---|
| a | Rarely. | felt_energy=0 |
| b | Some days. | felt_energy=1 |
| c | Most days. | felt_energy=2 |
| d | Nearly every day. | felt_energy=3 |

## q100 · slot-54

You slept. Did it feel like a recharge or just a very long blink?

Over the past month, how often did sleep leave you feeling restored? Think your usual pattern, not one unusually good night.

Source: self_report; window: past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Rarely restored. | sleep_restoration=0 |
| b | Restored on some days. | sleep_restoration=1 |
| c | Restored most days. | sleep_restoration=2 |
| d | Every day or nearly every day. | sleep_restoration=3 |

## q102 · slot-55

And this week: did sleep actually hit refresh?

In just the last 7 days, how often did you wake up feeling restored? The pillow can keep its marketing claims.

Source: self_report; window: last_7_days.

| Answer | Wording | Evidence |
|---|---|---|
| a | Rarely restored. | sleep_restoration=0 |
| b | Restored on some days. | sleep_restoration=1 |
| c | Restored most days. | sleep_restoration=2 |
| d | Every day or nearly every day. | sleep_restoration=3 |

## q96 · slot-56

Last time “one more thing” tried to steal bedtime, who won?

Think of the latest night in the past month an optional task competed with sleep. What did you actually do?

Source: actual_event; window: latest_instance_past_month.

| Answer | Wording | Evidence |
|---|---|---|
| a | Stopped and went to sleep. Rolled the credits. | D14a:protect (general); D14d:rest (general) |
| b | Finished the task and slept later. | D14a:delay (general); D14d:obligation (general) |
| c | Moved the task or changed tomorrow's plan. | D14a:adjust (general); D3:plan (general) |
| d | Asked someone how they handle a night like that. | D14d:connection (general) |

## q57 · slot-57 · held-out

“Pack a bag.” Your friend has a last-minute trip and almost no notice.

You've never been there. You have the time, but only tonight to decide. What do you do?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Go. The map can explain itself later. | D2:novel (general) |
| b | Check the details before saying yes. | D2:conditional (general) |
| c | Pick something familiar instead. | D2:familiar (general) |
| d | Only go if someone I know joins. | D2:conditional (general) |

## q58 · slot-58 · held-out

{close} cancels something you cared about. Then offers a sequel.

They suggest a replacement plan without mentioning what happened. How do you respond?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Rebook, and explain why the cancellation hurt. | D7:direct (close) |
| b | Start warmly, then gently bring up the cancellation. | D7:soften (close) |
| c | Ask for a day and set a time to talk. | D7:pause (close) |
| d | Accept the new plan and leave it unmentioned. | D7:avoid (close) |

## q92 · slot-58 · held-out

Someone important to you cancels something you cared about. Then offers a sequel.

They suggest a replacement plan without mentioning what happened. How do you respond?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Rebook, and explain why the cancellation hurt. | D7:direct (general) |
| b | Start warmly, then gently bring up the cancellation. | D7:soften (general) |
| c | Ask for a day and set a time to talk. | D7:pause (general) |
| d | Accept the new plan and leave it unmentioned. | D7:avoid (general) |

## q59 · slot-59 · held-out

A group bill includes something you didn't use. Your wallet has questions.

Your friends suggest splitting everything evenly. How do you handle it?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Ask to take that item off my share. | D8:proportional (friends); D7:direct (friends) |
| b | Message the organizer privately about my share. | D8:proportional (friends); D7:soften (friends) |
| c | Say it's okay and pay it. Simplicity is worth it here. | D8:absorb (friends); D7:direct (friends) |
| d | Pay it. Keep the irritation to myself. | D8:absorb (friends); D7:hint (friends) |

## q60 · slot-60 · held-out

Someone gives you spending money. Your shopping cart sits up straight.

You can make one optional purchase. What matters most in your choice?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Something reliable, with money left over to save. | D4:security (general) |
| b | Something that gives me time and options back. | D4:freedom (general) |
| c | Something that makes me happy. That's the reason. | D4:enjoyment (general) |
| d | The recognizable version. I like that people know it. | D4:status (general) |

## q61 · slot-61 · held-out

The team needs one more favor. You're at 1%, no charger in sight.

It's optional. You're already exhausted. What do you offer?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | A no. I need to recover. | D14d:rest (general) |
| b | The whole task. I'll get it done for the team. | D14d:obligation (general) |
| c | Help finding someone with capacity to share it. | D14d:connection (general) |
| d | A small piece, then my evening belongs to me. | D14d:bounded (general) |

## q62 · slot-62 · held-out

You let {close} down. The apology is still in your drafts.

Imagine a different mistake from the one earlier. How would you begin making it right?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Apologize directly and ask what would help. | D12:repair (close) |
| b | Apologize and explain what led to it. | D12:explain (close) |
| c | Arrange something thoughtful to make up for it. | D12:action (close) |
| d | Agree on some space and a time to reconnect. | D12:pause (close) |

## q93 · slot-62 · held-out

You let someone important to you down. The apology is still in your drafts.

Imagine a different mistake from the one earlier. How would you begin making it right?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Apologize directly and ask what would help. | D12:repair (general) |
| b | Apologize and explain what led to it. | D12:explain (general) |
| c | Arrange something thoughtful to make up for it. | D12:action (general) |
| d | Agree on some space and a time to reconnect. | D12:pause (general) |

## q63 · slot-63 · held-out

You want to help. Your available resources: one hour and good intentions.

Someone needs a hand. You have no spare money. What do you do?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Use the hour to help directly. | D13:direct (general) |
| b | Find a person or service better placed to help. | D13:coordinate (general) |
| c | Say I can't take it on today. | D13:limit (general) |
| d | Offer ten minutes, then hand it back. | D13:bounded (general) |

## q64 · slot-64 · held-out

The plan falls apart. Everyone looks at you like you wrote the next episode.

It's the last minute. Someone asks, “So what now?” What do you do first?

Source: hypothetical; window: scenario.

| Answer | Wording | Evidence |
|---|---|---|
| a | Pick a workable next step. We can move now. | D3:improvise (general) |
| b | Pause, get the details, make a new plan. | D3:plan (general) |
| c | Ask what the affected people want, then plan around it. | D3:consult (general) |
| d | Let this one go. I don't have capacity for a new version. | D3:stop (general) |
