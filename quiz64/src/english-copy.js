/** Respondent-facing English voice. data.js owns all evidence and routing semantics.
 * Hooks may be playful; answer actions, intensity, subjects and time windows stay literal.
 * Generic route replacements inherit the same voice without inventing a close person.
 */
export const ENGLISH_COPY = {
  q01: [
    "Who knows the version of you that would never make LinkedIn?",
    "Pick one close person to keep in mind for a few questions. You can leave this open.",
    [
      "My mom. She's seen several eras.",
      "My dad. He knows the behind-the-scenes version.",
      "My partner. They've seen the extended cut.",
      "A close friend. Unfortunately, they know the lore.",
      "No particular person for this conversation.",
    ],
  ],
  q02: [
    "Who's in your household cast?",
    "The people, not the chair currently wearing all your clothes. Pick your living arrangement.",
    [
      "Just me. Every mysterious noise is my problem.",
      "People I share a home with. An ensemble cast.",
      "Family. Plenty of shared history.",
      "I'd rather keep this one private.",
    ],
  ],
  q03: [
    "Three days off. Trip money. Your brain opens which tab first?",
    "You have enough for one small trip. Nothing's booked yet. What comes first?",
    [
      "Who to bring. The right person makes the story.",
      "Where to go. Destination before guest list.",
      "What I want. For once, I'm the itinerary.",
      "Open a map and see what looks good. We'll find a plot.",
    ],
  ],
  q04: [
    "A local says, “Trust me, take this detour.” The internet has zero opinions.",
    "It's safe, unfamiliar, and a little out of the way. Do you go?",
    [
      "Go. Someone has to become the first review.",
      "Ask a few questions before saying yes.",
      "Stick to the route. Boring can be a love language.",
      "Only if my travel companion is into it too.",
    ],
  ],
  q05: [
    "The restaurant is viral. Your friend is becoming hangry in real time.",
    "You planned to eat here, but the wait is 90 minutes. What's your first move?",
    [
      "Find food now. The famous noodles will survive without us.",
      "Stay. We planned the day around this place.",
      "Ask what they want and decide together.",
      "Grab myself a snack and let them choose.",
    ],
  ],
  q06: [
    "You're on a trip. “Quick favor?” has found your location.",
    "Work or family needs something handled now. It's important, but not an emergency. What do you do?",
    [
      "Handle it now. The trip can pause.",
      "Say when I can help later. Finish the current plan.",
      "Ask someone else to cover it. I'm away.",
      "Do the smallest useful fix, then get back to the trip.",
    ],
  ],
  q07: [
    "You ordered a salad. The group ordered a financial event.",
    "On a trip with friends, the bill includes pricey extras you didn't use. They suggest splitting evenly. Your move?",
    [
      "Ask everyone to pay for what they actually used.",
      "Split evenly. I'd pay a little to end the table math.",
      "Explain my share privately and ask to adjust it.",
      "Pay the extra. Say nothing. Notice everything.",
    ],
  ],
  q08: [
    "Last time a plan went off-script, did you also go off-script?",
    "Think of the most recent time in the past month. What did you actually do when the plan fell apart?",
    [
      "Changed course immediately. New plot, let's go.",
      "Made a new plan before doing anything.",
      "Asked someone else what they wanted to do.",
      "Carried on and hoped the problem got bored.",
    ],
  ],
  q09: [
    "A month's worth of bills just landed in your account. As a gift. Breathe.",
    "It's yours to keep. What gets first dibs?",
    [
      "Savings. I want the cushion before the confetti.",
      "A new experience I've been putting off.",
      "Something that buys my time back.",
      "The recognizable brand. Yes, the logo is part of the appeal.",
    ],
  ],
  q10: [
    "{close} orders the extras. Apparently, so does your wallet.",
    "You're out together. They suggest splitting the bill evenly, including extras only they ordered. What do you do?",
    [
      "Ask them to cover their extras. The dessert knows whose it is.",
      "Explain my share privately and adjust the split.",
      "Split evenly. Less math, more evening.",
      "Pay the extra and leave it unmentioned.",
    ],
  ],
  q13: [
    "Family needs a loan. Your bank balance would also like one.",
    "Your month is already tight. They promise to pay you back. What's your response?",
    [
      "Say what I can afford and lend that amount.",
      "Ask what's going on and find another way to help.",
      "Lend it. I don't want family left stranded.",
      "Decline. My own bills have called dibs.",
    ],
  ],
  q15: [
    "Your housemates believe in a cleaning fairy. It's you. You're the fairy.",
    "You've been doing more than your share. How do you handle it?",
    [
      "Ask to split the chores by task.",
      "Make a schedule. The trash needs shared custody.",
      "Do it myself. Discussing the dish takes longer.",
      "Stop doing their share. Let the magic wear off.",
    ],
  ],
  q16: [
    "Think of the last friend-group bill that got… interesting.",
    "In the past month, when a shared cost got awkward, what did you actually do?",
    [
      "Said the amount plainly. Gave the number a voice.",
      "Sent a careful message privately.",
      "Paid or lent the money and let it go.",
      "Paid my share and left the rest for someone else to sort.",
    ],
  ],
  q17: [
    "When do you usually log off being a person?",
    "Over the past month, what time did you usually go to sleep? Count actual sleep, not getting into bed to scroll.",
    [
      "Before 11 p.m. Early credits.",
      "11 p.m. to 1 a.m. The late showing.",
      "After 1 a.m. Bonus content.",
      "It varies, or I work shifts. Different showtimes.",
    ],
  ],
  q18: [
    "{close} goes quiet after a hard day. Your brain starts writing… what?",
    "You haven't heard back. What's your first interpretation or response?",
    [
      "They're probably busy. Silence can just be silence.",
      "Worry they're upset with me and send a check-in.",
      "Reread my message, looking for what I did wrong.",
      "Ask directly if we're okay. Skip the detective season.",
    ],
  ],
  q19: [
    "It's 11 p.m. Today deserves a one-star review.",
    "How much of the story do you share with {close}?",
    [
      "The whole thing. I ask them to listen.",
      "The trailer, then I go quiet.",
      "I sort it out privately before telling them anything.",
      "Someone else gets the first call.",
    ],
  ],
  q20: [
    "How often did dinner have a tracking number?",
    "In the last 7 days, how many dinners came from a restaurant, takeout, or delivery? Eating there counts too.",
    [
      "None. Zero restaurant dinners.",
      "1–2 dinners. An occasional guest appearance.",
      "3–4 dinners. A recurring character.",
      "5–7 dinners. A series regular.",
    ],
  ],
  q21: [
    "Last time you felt ignored by {close}, what made it out of your head?",
    "Think of the most recent time in the past month. Pick what you actually did, not the comeback you wrote in the shower.",
    [
      "Said what was bothering me. Out loud, to them.",
      "Eased into the conversation gently.",
      "Asked for time, then came back to talk.",
      "Let it pass without having the conversation.",
    ],
  ],
  q22: [
    "You had a fight. {close} sends a raccoon eating grapes.",
    "No apology. No explanation. Just a very well-fed raccoon. What do you send back?",
    [
      "“He's incredible. Can we talk about yesterday?”",
      "A meme back, then a request to talk tonight.",
      "A meme back. Let the raccoon handle the rest.",
      "“I need a day. Then let's talk.”",
    ],
  ],
  q23: [
    "{close} says “it's fine.” The period says otherwise.",
    "You forgot something important to them. What do you do next?",
    [
      "Apologize and ask what would help make it right.",
      "Apologize and explain what happened.",
      "Plan something thoughtful to make up for it.",
      "Ask for some space and agree on when we'll talk.",
    ],
  ],
  q24: [
    "{close} cancels. A new date is apparently sold separately.",
    "They haven't suggested another time. What's your first interpretation or response?",
    [
      "They're busy. We'll find another time.",
      "Worry they're pulling away and want reassurance.",
      "Ask directly whether we're okay.",
      "Wait. I don't have enough information to write the story.",
    ],
  ],
  q29: [
    "Last hangout where you carried more than {close}: did you say something?",
    "Think of the latest time in the past month you paid more or did more of the organizing. What did you actually do?",
    [
      "Pointed out the imbalance and asked for a fairer split.",
      "Sent a careful private message about my share.",
      "Covered the extra and kept the peace.",
      "Stopped covering the extra without explaining why.",
    ],
  ],
  q30: [
    "Something went wrong. Did {close} get the live coverage or the recap?",
    "Think of your most recent setback in the past month. What did you actually share?",
    [
      "Told them quickly and asked for support.",
      "Gave them a smaller version first.",
      "Worked through it privately before saying anything.",
      "Talked to someone else before telling them.",
    ],
  ],
  q31: [
    "You lose your job. The family group chat is still sending recipes.",
    "Imagine this happened today. Who in your family would you tell, and when?",
    [
      "Tell them quickly. I need my people around me.",
      "Tell one person privately first.",
      "Wait until I have a plan to go with the news.",
      "Handle it on my own for a while.",
    ],
  ],
  q32: [
    "Your family had a plan for your life. Cute. Was it your plan?",
    "Think of the latest disagreement in the past month about something they wanted you to do. What did you actually do?",
    [
      "Said no and stuck with my own plan.",
      "Found a compromise we could live with.",
      "Went along with what they wanted.",
      "Avoided the conversation for now.",
    ],
  ],
  q33: [
    "You bring a friend to the party. They become the party.",
    "Everyone loves them. You're standing there holding two drinks. What's your move?",
    [
      "Introduce them to more people. Enjoy watching them shine.",
      "Stay close and make sure I'm not forgotten.",
      "Make it a double act. We can be iconic together.",
      "Head out early. My social battery is done.",
    ],
  ],
  q41: [
    "A soaked cat looks at you like you're customer support for the weather.",
    "You can't take it home. How would you respond?",
    [
      "Bring food and water. Catering, not accommodation.",
      "Contact a rescue that can help.",
      "Ask nearby people who can pitch in.",
      "Leave. I can't safely help right now.",
    ],
  ],
  q42: [
    "You're running on 2%. A stranger needs directions. Your bus is coming.",
    "You're exhausted, and the bus arrives in two minutes. What do you do?",
    [
      "Stay and help them. I'll catch another bus.",
      "Give quick directions, then catch my bus.",
      "Point them toward staff before I go.",
      "Apologize and catch my bus. That's what I have capacity for.",
    ],
  ],
  q43: [
    "Your movement plan has competition. The competition brought snacks.",
    "You've got one free hour and an appealing alternative to your planned movement. What wins?",
    [
      "The original movement plan. Keeping the appointment.",
      "The alternative. Reschedule the movement.",
      "The alternative. Skip movement today.",
      "A shorter bit of movement, then join in. A crossover episode.",
    ],
  ],
  q44: [
    "Last time dinner fell apart, what was the edible backup plan?",
    "Think of the latest stressful dinner-plan failure in the past month. What did you actually do about eating?",
    [
      "Made the meal I'd planned anyway.",
      "Made a quick version of the original plan.",
      "Ordered comfort food right away. Dinner needed a soft landing.",
      "Put off eating until I could think clearly.",
    ],
  ],
  q45: [
    "You're about to sleep. One more task appears like a post-credits scene.",
    "It would help, but it's optional and can wait until morning. What do you do?",
    [
      "Move it to tomorrow and go to bed.",
      "Finish it, then sleep later.",
      "Finish it and shift tomorrow's wake-up so I can still sleep.",
      "Decline it. Tonight is closed.",
    ],
  ],
  q46: [
    "This week's movement count. Tiny walks are allowed to have main-character energy.",
    "In the last 7 days, on how many days did you deliberately move? Walks, wheelchair exercise, and movement that works for your body all count.",
    ["0 days.", "1–2 days.", "3–4 days.", "5–7 days."],
  ],
  q47: [
    "Last time life stepped on your movement plan, what survived?",
    "Think of the latest time in the past month a hard day got in the way. What did you actually do?",
    [
      "Kept the original plan.",
      "Changed the plan to fit the day.",
      "Skipped it and didn't replace it.",
      "Did a shorter version. The pocket edition.",
    ],
  ],
  q57: [
    "“Pack a bag.” Your friend has a last-minute trip and almost no notice.",
    "You've never been there. You have the time, but only tonight to decide. What do you do?",
    [
      "Go. The map can explain itself later.",
      "Check the details before saying yes.",
      "Pick something familiar instead.",
      "Only go if someone I know joins.",
    ],
  ],
  q58: [
    "{close} cancels something you cared about. Then offers a sequel.",
    "They suggest a replacement plan without mentioning what happened. How do you respond?",
    [
      "Rebook, and explain why the cancellation hurt.",
      "Start warmly, then gently bring up the cancellation.",
      "Ask for a day and set a time to talk.",
      "Accept the new plan and leave it unmentioned.",
    ],
  ],
  q59: [
    "A group bill includes something you didn't use. Your wallet has questions.",
    "Your friends suggest splitting everything evenly. How do you handle it?",
    [
      "Ask to take that item off my share.",
      "Message the organizer privately about my share.",
      "Say it's okay and pay it. Simplicity is worth it here.",
      "Pay it. Keep the irritation to myself.",
    ],
  ],
  q60: [
    "Someone gives you spending money. Your shopping cart sits up straight.",
    "You can make one optional purchase. What matters most in your choice?",
    [
      "Something reliable, with money left over to save.",
      "Something that gives me time and options back.",
      "Something that makes me happy. That's the reason.",
      "The recognizable version. I like that people know it.",
    ],
  ],
  q61: [
    "The team needs one more favor. You're at 1%, no charger in sight.",
    "It's optional. You're already exhausted. What do you offer?",
    [
      "A no. I need to recover.",
      "The whole task. I'll get it done for the team.",
      "Help finding someone with capacity to share it.",
      "A small piece, then my evening belongs to me.",
    ],
  ],
  q62: [
    "You let {close} down. The apology is still in your drafts.",
    "Imagine a different mistake from the one earlier. How would you begin making it right?",
    [
      "Apologize directly and ask what would help.",
      "Apologize and explain what led to it.",
      "Arrange something thoughtful to make up for it.",
      "Agree on some space and a time to reconnect.",
    ],
  ],
  q63: [
    "You want to help. Your available resources: one hour and good intentions.",
    "Someone needs a hand. You have no spare money. What do you do?",
    [
      "Use the hour to help directly.",
      "Find a person or service better placed to help.",
      "Say I can't take it on today.",
      "Offer ten minutes, then hand it back.",
    ],
  ],
  q64: [
    "The plan falls apart. Everyone looks at you like you wrote the next episode.",
    "It's the last minute. Someone asks, “So what now?” What do you do first?",
    [
      "Pick a workable next step. We can move now.",
      "Pause, get the details, make a new plan.",
      "Ask what the affected people want, then plan around it.",
      "Let this one go. I don't have capacity for a new version.",
    ],
  ],
  q65: [
    "A plan hit a surprise problem. What was the face-to-inner-monologue ratio?",
    "Think of the latest time in the past month. Pick the closest combination of what you felt and what you did.",
    [
      "A flash of irritation. I said what needed changing.",
      "Properly angry inside. Quiet outside while I decided.",
      "Mildly bothered. Took a reset, moved to the next step.",
      "Felt stuck. Asked someone to help untangle it.",
    ],
  ],
  q66: [
    "The deadline was getting closer. Their reply was not.",
    "Think of the latest time in the past month a message you needed sat unread. What did you feel and do?",
    [
      "Uneasy. Sent one clear check-in.",
      "Very worried. Checked the details again.",
      "Not especially worried. Assumed they were busy and carried on.",
      "Uncertain. Put the phone away for a bit.",
    ],
  ],
  q67: [
    "The plan you were looking forward to got canceled. Plot twist nobody ordered.",
    "Think of the latest time in the past month. What happened inside, and what did you do next?",
    [
      "Disappointed. Said I wanted to reschedule.",
      "Sad. Took a quiet evening and revisited it later.",
      "Barely bothered. Made another plan.",
      "Let down. Asked what had changed.",
    ],
  ],
  q68: [
    "You called someone the wrong name. In front of other people. Lovely.",
    "If this happened in the past month, think of the most recent time. What did you feel and do?",
    [
      "Embarrassed. Laughed and corrected myself.",
      "Intensely embarrassed. Went quiet for a beat.",
      "A little awkward. Kept the conversation moving.",
      "Embarrassed. Apologized and let the moment pass.",
    ],
  ],
  q69: [
    "Your brain remembered the promise. After the other person waited. Excellent timing.",
    "Think of the latest time in the past month. What did you feel, and how did you respond?",
    [
      "Guilty. Apologized plainly.",
      "Awful. Explained what happened and offered a fix.",
      "A little guilty. Set a reminder for next time.",
      "Guilty. Asked for some time, then came back to it.",
    ],
  ],
  q70: [
    "That good news you'd been quietly hoping for? It actually happened.",
    "Think of the latest time in the past month. How did the happy get out?",
    [
      "Delighted. Called someone to celebrate.",
      "Fizzing with excitement. Made a plan for the next step.",
      "Happy. Kept it private and let it sink in.",
      "Pleased. Told them exactly how much it meant.",
    ],
  ],
  q71: [
    "The stressful thing finally ended. Did the rest of you get the memo?",
    "Think of the latest time in the past month a stressful situation ended. What did relief look like for you?",
    [
      "Felt relieved. Exhaled before doing anything else.",
      "The relief arrived slowly. Then I rested.",
      "Felt relieved and told the person who'd helped.",
      "Felt relieved, then checked the next small step.",
    ],
  ],
  q72: [
    "Does your sleep schedule have a pattern, or is it more of a guest appearance?",
    "Over the past month, how consistent were the times you went to sleep and woke up? Include shifts and changing days.",
    [
      "Changed a lot from day to day.",
      "A loose pattern. Roughly in the same universe.",
      "Usually consistent.",
      "Very consistent. Similar times day to day.",
    ],
  ],
  q73: [
    "And this past week: same sleep schedule, or surprise remix?",
    "In just the last 7 days, how consistent were your sleep and wake times? This can differ from your usual month.",
    [
      "Changed a lot from day to day.",
      "A loose pattern.",
      "Usually consistent.",
      "Very consistent.",
    ],
  ],
  q74: [
    "When your body sends a notification, does it get left on read?",
    "Over the past month, how did you notice and respond to cues like hunger, tension, pain, or needing a bathroom break?",
    [
      "Often noticed late or put them off.",
      "Noticed some. Depended on the day.",
      "Usually noticed and responded.",
      "Consistently made room for them.",
    ],
  ],
  q75: [
    "Your skin lives with you rent-free. How much attention did it get?",
    "Over the past month, how did you notice or care for skin comfort? No 12-step routine required.",
    [
      "Rarely kept track of it.",
      "Noticed issues when they appeared.",
      "Had a small routine or check-in.",
      "Kept track of what helped it feel comfortable.",
    ],
  ],
  q76: [
    "This week's energy: enough to run the day, or a lot of low-battery pop-ups?",
    "In the last 7 days, how often did your energy feel enough for your day? Use your own meaning of “enough.”",
    ["Rarely.", "Some days.", "Most days.", "Nearly every day."],
  ],
  q77: [
    "Your water bottle: beverage or desk accessory?",
    "Over the past month, how often did you remember a drink break on busy days? Count the break, not how aesthetic the bottle is.",
    [
      "Almost no busy days.",
      "Some busy days.",
      "Most busy days.",
      "Nearly every busy day.",
    ],
  ],
  q78: [
    "Anything your body would like to add to the group chat?",
    "Optional: choose one health context, or use Other for more than one. Share only what you're comfortable recording on this device.",
    [
      "Allergies or sensitivities.",
      "An existing condition or ongoing treatment.",
      "A cycle or recurring body pattern.",
      "None of these, or I'd rather not say.",
    ],
  ],
  q94: [
    "When does your day usually start loading?",
    "Over the past month, what time did you usually wake up? Sleepy staring at the ceiling still counts as awake.",
    [
      "Before 6 a.m.",
      "6 to before 8 a.m.",
      "8 to 9 a.m.",
      "After 9 a.m.",
      "It varies too much for one range.",
    ],
  ],
  q95: [
    "How much sleep makes it into the final cut?",
    "Over the past month, how long did you usually actually sleep? Time in bed thinking about everything doesn't count.",
    [
      "Under 6 hours.",
      "6 to under 7 hours.",
      "7 to under 9 hours.",
      "9 hours or more.",
      "It varies too much for one range.",
    ],
  ],
  q96: [
    "Last time “one more thing” tried to steal bedtime, who won?",
    "Think of the latest night in the past month an optional task competed with sleep. What did you actually do?",
    [
      "Stopped and went to sleep. Rolled the credits.",
      "Finished the task and slept later.",
      "Moved the task or changed tomorrow's plan.",
      "Asked someone how they handle a night like that.",
    ],
  ],
  q97: [
    "Do your meals have regular time slots, or just surprise cameos?",
    "Over the past month, how predictable were your usual meal times? Think timing, not what was on the plate.",
    [
      "Varied a lot.",
      "Had a loose pattern.",
      "Usually predictable.",
      "Very predictable.",
    ],
  ],
  q98: [
    "This week, did meals keep their appointments?",
    "In just the last 7 days, how predictable were your meal times? Count the week you had, including any lunch that auditioned for dinner.",
    [
      "Changed from day to day.",
      "Had a loose pattern.",
      "Predictable most days.",
      "Very predictable.",
    ],
  ],
  q99: [
    "On a usual day, does your battery last as long as your to-do list?",
    "Over the past month, how often did your energy feel enough for your day? Enough means enough for you.",
    ["Rarely.", "Some days.", "Most days.", "Nearly every day."],
  ],
  q100: [
    "You slept. Did it feel like a recharge or just a very long blink?",
    "Over the past month, how often did sleep leave you feeling restored? Think your usual pattern, not one unusually good night.",
    [
      "Rarely restored.",
      "Restored on some days.",
      "Restored most days.",
      "Every day or nearly every day.",
    ],
  ],
  q101: [
    "Zooming out: how often does movement make the weekly lineup?",
    "During a typical week in the past month, on how many days did you deliberately move? Walks, wheelchair workouts, stretches: your version counts.",
    ["0 days.", "1–2 days.", "3–4 days.", "5–7 days."],
  ],
  q102: [
    "And this week: did sleep actually hit refresh?",
    "In just the last 7 days, how often did you wake up feeling restored? The pillow can keep its marketing claims.",
    [
      "Rarely restored.",
      "Restored on some days.",
      "Restored most days.",
      "Every day or nearly every day.",
    ],
  ],
};

const genericSources = {
  q81: "q10",
  q82: null,
  q83: "q18",
  q84: "q19",
  q85: "q21",
  q86: "q22",
  q87: "q23",
  q88: "q24",
  q89: "q29",
  q90: "q30",
  q92: "q58",
  q93: "q62",
};
ENGLISH_COPY.q82 = [
  "The shared project is starting to feel suspiciously like your solo debut.",
  "One deadline, several people, different amounts of free time. How do you handle the workload?",
  [
    "Name each person's contribution and split the work.",
    "Send a private message about my share.",
    "Take on the extra to keep things moving.",
    "State what I can do and stop there.",
  ],
];
for (const [id, source] of Object.entries(genericSources)) {
  if (!source) continue;
  const [title, setup, options] = ENGLISH_COPY[source];
  const generic = (text) =>
    text
      .replaceAll("{close}", "someone important to you")
      .replace(/^someone/, "Someone");
  ENGLISH_COPY[id] = [generic(title), generic(setup), options.map(generic)];
}
// Avoid the tautology in the generic repair scene.
ENGLISH_COPY.q87[0] = "They say “it's fine.” The period says otherwise.";
ENGLISH_COPY.q87[1] =
  "You forgot something important to someone you care about. What do you do next?";

export function applyEnglishCopy(questions) {
  for (const question of questions) {
    const copy = ENGLISH_COPY[question.id];
    if (!copy) continue;
    const [title, setup, options] = copy;
    if (options.length !== question.options.length)
      throw new Error(`Copy/option mismatch: ${question.id}`);
    question.title = title;
    question.setup = setup;
    question.options.forEach((option, index) => {
      option.text = options[index];
    });
  }
}
