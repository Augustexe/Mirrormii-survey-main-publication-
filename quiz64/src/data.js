import { applyEnglishCopy } from "./english-copy.js";
import { HOST_REACTIONS } from "./host-reactions.js";

export const VERSION = "genii-root.v2";

export const DIMS = {
  D1: "First move",
  D2: "Risk & novelty",
  D3: "Planning",
  D4: "Money motive",
  D5: "Closeness worry",
  D6: "Closeness distance",
  D7: "Conflict style",
  D8: "Fairness & effort",
  D9: "Recognition & rivalry",
  D10: "Mood-driven urgency",
  D11: "Duty & autonomy",
  D12: "Repair after mistakes",
  D13: "Care & its limits",
  D14a: "Sleep rhythm",
  D14b: "Eating habits",
  D14c: "Movement",
  D14d: "Recovery",
};

export const CHAPTERS = [
  {
    id: 1,
    title: "The opening lore",
    subtitle:
      "A trip, a group bill, and a few choices that say more than a bio.",
    kicker: "THE OPENING LORE",
  },
  {
    id: 2,
    title: "Small choices",
    subtitle:
      "Your time, your money, and the people asking for a tiny bit of both.",
    kicker: "SMALL CHOICES",
  },
  {
    id: 3,
    title: "Close to home",
    subtitle: "The people who know the unedited version.",
    kicker: "CLOSE TO HOME",
  },
  {
    id: 4,
    title: "Family plot",
    subtitle: "Expectations, care costs, and the family group chat.",
    kicker: "FAMILY PLOT",
  },
  {
    id: 5,
    title: "Inside voice, outside face",
    subtitle: "What you felt, what you showed, and what helped it pass.",
    kicker: "INSIDE VOICE, OUTSIDE FACE",
  },
  {
    id: 6,
    title: "A body with opinions",
    subtitle: "Drink breaks, dinner plans, and a body that would like a word.",
    kicker: "A BODY WITH OPINIONS",
  },
  {
    id: 7,
    title: "Rhythms and recovery",
    subtitle: "Your usual rhythm, your actual week, and the gap between them.",
    kicker: "RHYTHMS AND RECOVERY",
  },
  {
    id: 8,
    title: "One last thing",
    subtitle: "New scenes for the final reading.",
    kicker: "ONE LAST THING",
  },
];
const tag = (d, v, target = "general") => ({ d, v, target });
const opt = (text, tags = [], why = "", facts) => ({
  text,
  tags,
  why,
  ...(facts ? { facts } : {}),
});
const q = (n, chapter, title, setup, options, extra = {}) => ({
  id: `q${String(n).padStart(2, "0")}`,
  chapter,
  title,
  setup,
  role: extra.role || "hypothetical",
  test: extra.test === true,
  ...(extra.applicable ? { applicable: extra.applicable } : {}),
  options: options.map((o, i) => ({ id: String.fromCharCode(97 + i), ...o })),
  ...(extra.baseline ? { baseline: extra.baseline } : {}),
});

export const QUESTIONS = [
  q(
    1,
    1,
    "Who gets the unfiltered version of you?",
    "Before the story starts, choose the recurring close person who may appear later.",
    [
      opt(
        "My mother. She has the complete chat history.",
        [],
        "You explicitly chose your mother.",
        { close: "mother" },
      ),
      opt(
        "My father. An unexpected but strong contender.",
        [],
        "You explicitly chose your father.",
        { close: "father" },
      ),
      opt(
        "My partner. They have seen the extended cut.",
        [],
        "You explicitly chose your partner.",
        { close: "partner" },
      ),
      opt(
        "A close friend. Unfortunately, they know the lore.",
        [],
        "You explicitly chose a close friend.",
        { close: "friend" },
      ),
      opt(
        "No recurring close person for this survey.",
        [],
        "You explicitly chose not to use a close-person target.",
        { close: "none" },
      ),
    ],
    { role: "context" },
  ),
  q(
    2,
    1,
    "Who lives with you and the collection of useful cables?",
    "Pick the closest living arrangement; a mixed answer is welcome.",
    [
      opt(
        "Just me. Every mysterious noise is my problem.",
        [],
        "You explicitly reported living alone.",
        { household: "alone" },
      ),
      opt(
        "People I share a home with. The sponge has a rota.",
        [],
        "You explicitly reported a shared household.",
        { household: "shared" },
      ),
      opt(
        "Family. Privacy is more of a suggestion.",
        [],
        "You explicitly reported living with family.",
        { household: "family" },
      ),
      opt(
        "I would rather leave the household unspecified.",
        [],
        "You chose not to specify your household.",
        { household: "unspecified" },
      ),
    ],
    { role: "context" },
  ),
  q(
    3,
    1,
    "Three free days and enough money for one small trip. Who comes to mind first?",
    "A light opener: the tickets are not bought yet.",
    [
      opt(
        "The person who would make the story funniest.",
        [tag("D1", "people")],
        "You put a person first and begin imagining the trip.",
      ),
      opt(
        "The place. I need a destination before a companion.",
        [tag("D1", "task")],
        "You start with the practical trip decision.",
      ),
      opt(
        "Me. I am taking the free days and negotiating later.",
        [tag("D1", "self")],
        "You put your own capacity or desire first.",
      ),
      opt(
        "Nobody yet. I open a map and see what happens.",
        [tag("D1", "task"), tag("D3", "improvise")],
        "You start by exploring without choosing a companion.",
      ),
    ],
  ),
  q(
    4,
    1,
    "A local suggests a detour nobody has reviewed online. Your move?",
    "The detour is safe enough, strange enough, and inconvenient enough.",
    [
      opt(
        "Absolutely. The review section can meet us there.",
        [tag("D2", "novel"), tag("D3", "improvise")],
        "You accept novelty without waiting for more information.",
      ),
      opt(
        "Ask a few questions, then decide.",
        [tag("D2", "conditional"), tag("D3", "plan")],
        "You add information before accepting uncertainty.",
      ),
      opt(
        "Keep the original route. Reliable is a beautiful word.",
        [tag("D2", "familiar"), tag("D3", "plan")],
        "You choose the known route.",
      ),
      opt(
        "Try it only if the person with me is keen too.",
        [tag("D2", "conditional")],
        "You make novelty depend on a companion’s agreement.",
      ),
    ],
  ),
  q(
    5,
    1,
    "The saved restaurant has a 90-minute queue and your companion is starving.",
    "The famous place is still famous. Your companion is now mostly stomach.",
    [
      opt(
        "Find food now. The queue can write its memoir.",
        [tag("D1", "people")],
        "You respond first to the companion’s immediate need.",
      ),
      opt(
        "Stay; we came for this and planned around it.",
        [tag("D1", "task"), tag("D3", "plan")],
        "You prioritize the existing plan.",
      ),
      opt(
        "Ask what they want and choose together.",
        [tag("D1", "people")],
        "You involve the companion before changing course.",
      ),
      opt(
        "I grab something small and let them decide.",
        [tag("D1", "self")],
        "You protect your own immediate need first.",
      ),
    ],
  ),
  q(
    6,
    1,
    "Mid-trip, work or family asks you to handle something right now.",
    "It is important, but not literally on fire.",
    [
      opt(
        "Handle it. The trip can pause.",
        [tag("D1", "people"), tag("D11", "duty")],
        "You put the request and its people first.",
      ),
      opt(
        "Say I can do it later and finish the current plan.",
        [tag("D1", "task"), tag("D11", "autonomy")],
        "You protect the plan while setting a boundary.",
      ),
      opt(
        "Ask someone else to cover it.",
        [tag("D1", "self"), tag("D11", "autonomy")],
        "You protect the trip and redistribute the request.",
      ),
      opt(
        "Work out the smallest useful fix, then return.",
        [tag("D1", "task"), tag("D3", "plan")],
        "You reduce the interruption to a bounded task.",
      ),
    ],
  ),
  q(
    7,
    1,
    "A surprise cost appears on a trip with your group of friends.",
    "You ordered the salad; someone else added expensive extras you did not use, then suggests an even split.",
    [
      opt(
        "Split it by what each of us used.",
        [tag("D8", "proportional", "friends"), tag("D7", "direct", "friends")],
        "You request a consumption-based split directly.",
      ),
      opt(
        "Pay evenly to avoid public arithmetic.",
        [tag("D8", "absorb", "friends")],
        "You knowingly accept the extra cost for simplicity.",
      ),
      opt(
        "Quietly explain my share and ask to adjust it.",
        [tag("D8", "proportional", "friends"), tag("D7", "soften", "friends")],
        "You request a fair split privately.",
      ),
      opt(
        "Pay the extra and say nothing.",
        [tag("D8", "absorb", "friends"), tag("D7", "hint", "friends")],
        "You knowingly absorb the extra cost without raising it.",
      ),
    ],
  ),
  q(
    8,
    1,
    "What did you actually do the last time a plan went sideways?",
    "Choose a recent real response; skip if there is no useful example.",
    [
      opt(
        "I changed course immediately.",
        [tag("D3", "improvise")],
        "You report acting quickly when the plan failed.",
      ),
      opt(
        "I made a new plan before moving.",
        [tag("D3", "plan")],
        "You report pausing to organize a new plan.",
      ),
      opt(
        "I asked somebody else what they wanted to do.",
        [tag("D1", "people"), tag("D3", "consult")],
        "You report consulting the group before deciding.",
      ),
      opt(
        "I carried on and hoped the problem got bored.",
        [tag("D3", "avoid")],
        "You report leaving the problem alone for the moment.",
      ),
    ],
    { role: "actual" },
  ),

  q(
    9,
    2,
    "A windfall equal to one month of costs lands today.",
    "It is yours to use, save, or give a job later.",
    [
      opt(
        "Put it somewhere safe first.",
        [tag("D4", "security"), tag("D3", "plan")],
        "You prioritize financial safety and delay spending.",
      ),
      opt(
        "Use it for a new experience I have been postponing.",
        [tag("D4", "enjoyment"), tag("D2", "novel")],
        "You use the money for a new experience and enjoyment.",
      ),
      opt(
        "Buy the thing that gives me time back.",
        [tag("D4", "freedom")],
        "You spend to preserve time and independence.",
      ),
      opt(
        "Buy the recognizable version. The logo may have a point.",
        [tag("D4", "status"), tag("D9", "recognition")],
        "You identify recognition or status as part of the appeal.",
      ),
    ],
  ),
  q(
    10,
    2,
    "You and {close} planned an outing. They ordered extras and suggest splitting everything evenly.",
    "The extra dessert has entered the shared spreadsheet.",
    [
      opt(
        "Ask to split the extras by who ordered them.",
        [tag("D8", "proportional", "close"), tag("D7", "direct", "close")],
        "You request a consumption-based split directly.",
      ),
      opt(
        "Explain my share privately and adjust the total.",
        [tag("D8", "proportional", "close"), tag("D7", "soften", "close")],
        "You request a fair split with a softer opening.",
      ),
      opt(
        "Pay evenly; it is easier than doing arithmetic together.",
        [tag("D8", "absorb", "close")],
        "You accept the extra cost for simplicity.",
      ),
      opt(
        "Pay and leave the dessert unmentioned.",
        [tag("D8", "absorb", "close"), tag("D7", "avoid", "close")],
        "You absorb the extra cost without raising it.",
      ),
    ],
    { applicable: "close" },
  ),
  q(
    11,
    2,
    "A rough day, midnight, and a cart full of tiny solutions.",
    "The cart contains one lamp shaped like a duck.",
    [
      opt(
        "Buy the duck. It has never personally disappointed me.",
        [tag("D10", "act"), tag("D4", "enjoyment")],
        "You make an immediate mood-related purchase.",
      ),
      opt(
        "Sleep on it. The duck will still be a duck tomorrow.",
        [tag("D10", "wait"), tag("D3", "plan")],
        "You delay the purchase while emotions settle.",
      ),
      opt(
        "Read reviews and compare prices.",
        [tag("D3", "plan"), tag("D4", "security")],
        "You gather information before spending.",
      ),
      opt(
        "Close the app. My feelings can remain unlit.",
        [tag("D10", "wait"), tag("D4", "security")],
        "You decline the mood-related purchase.",
      ),
    ],
  ),
  q(
    12,
    2,
    "Friends made fast money on a tip and invite you in.",
    "You have only ten minutes to decide whether to join the uncertain move.",
    [
      opt(
        "Join. Ten minutes is plenty of plot.",
        [tag("D2", "novel")],
        "You accept a new and uncertain opportunity quickly.",
      ),
      opt(
        "Look up the downside before deciding.",
        [tag("D2", "conditional"), tag("D3", "plan")],
        "You investigate uncertainty before committing.",
      ),
      opt(
        "Decline. I would rather keep the money I have.",
        [tag("D2", "familiar"), tag("D4", "security")],
        "You prefer the known financial position.",
      ),
      opt(
        "Join only with a small amount I can lose.",
        [tag("D2", "conditional"), tag("D4", "security")],
        "You limit risk before trying the opportunity.",
      ),
    ],
  ),
  q(
    13,
    2,
    "A family member asks to borrow money while your month is tight.",
    "They promise to repay you, with the confidence of a person who has not seen your spreadsheet.",
    [
      opt(
        "Say what I can afford and lend that amount.",
        [tag("D8", "limit", "family"), tag("D7", "direct", "family")],
        "You state a capacity limit and set a bounded contribution.",
      ),
      opt(
        "Ask what happened and work out another kind of help.",
        [tag("D8", "limit", "family"), tag("D11", "duty", "family")],
        "You explore a bounded way to help without promising cash.",
      ),
      opt(
        "Lend it; family should not be stranded.",
        [tag("D8", "absorb", "family"), tag("D11", "duty", "family")],
        "You carry the financial cost because of family duty.",
      ),
      opt(
        "Decline. My own bills are already doing theatre.",
        [tag("D8", "limit", "family"), tag("D11", "autonomy", "family")],
        "You protect your own financial capacity.",
      ),
    ],
  ),
  q(
    14,
    2,
    "Your friends plan a group trip that costs more than you can afford.",
    "Your friends are excited and the cancellation policy is a villain.",
    [
      opt(
        "Say I cannot afford this trip and suggest a cheaper version.",
        [tag("D4", "security"), tag("D7", "direct", "friends")],
        "You state the budget constraint to the group and propose an alternative.",
      ),
      opt(
        "Go anyway and solve the money problem later.",
        [tag("D4", "enjoyment")],
        "You choose the experience despite the immediate budget problem.",
      ),
      opt(
        "Join for one night within a fixed amount.",
        [tag("D4", "security"), tag("D3", "plan")],
        "You make participation fit a planned limit.",
      ),
      opt(
        "Decline with a vague excuse. The budget remains private.",
        [tag("D4", "security"), tag("D7", "avoid", "friends")],
        "You protect the budget without explaining the reason.",
      ),
    ],
  ),
  q(
    15,
    2,
    "The people you live with think the house cleans itself.",
    "You are the house. The sponge has entered negotiations.",
    [
      opt(
        "Suggest we split the chores by task.",
        [
          tag("D8", "proportional", "household"),
          tag("D7", "direct", "household"),
        ],
        "You explicitly renegotiate the division of labor.",
      ),
      opt(
        "Make a rota; the bin needs a custody agreement.",
        [tag("D8", "proportional", "household"), tag("D3", "plan")],
        "You organize an explicit division of labor.",
      ),
      opt(
        "Do it myself; discussing the dish takes longer.",
        [tag("D8", "absorb", "household"), tag("D7", "avoid", "household")],
        "You absorb the labor to avoid a discussion.",
      ),
      opt(
        "Stop doing their share and wait for the magic to end.",
        [tag("D8", "limit", "household")],
        "You stop covering the others’ share.",
      ),
    ],
    { applicable: "shared" },
  ),
  q(
    16,
    2,
    "What did you actually do the last time a money split with friends got awkward?",
    "Think of a real friends’ bill or shared cost; skip if none comes to mind.",
    [
      opt(
        "Named the amount plainly.",
        [tag("D8", "proportional", "friends"), tag("D7", "direct", "friends")],
        "You report stating the financial issue directly.",
      ),
      opt(
        "Sent a careful message privately.",
        [tag("D8", "proportional", "friends"), tag("D7", "soften", "friends")],
        "You report raising the issue privately and gently.",
      ),
      opt(
        "Paid or lent it and moved on.",
        [tag("D8", "absorb", "friends"), tag("D7", "avoid", "friends")],
        "You report carrying the cost without reopening it.",
      ),
      opt(
        "Kept my share and let someone else handle the rest.",
        [tag("D8", "proportional", "friends")],
        "You report limiting your contribution.",
      ),
    ],
    { role: "actual" },
  ),

  q(
    17,
    3,
    "What time do you usually stop being available to consciousness?",
    "Report your usual pattern; shifts and variation are valid answers.",
    [
      opt(
        "Before 11 p.m. Tomorrow me has excellent representation.",
        [],
        "You explicitly report an earlier sleep rhythm.",
        { bedtime: "before 23:00" },
      ),
      opt(
        "Between 11 p.m. and 1 a.m. One more episode is a reasonable proposal.",
        [],
        "You explicitly report a middle sleep rhythm.",
        { bedtime: "23:00-01:00" },
      ),
      opt(
        "After 1 a.m. The internet becomes important at midnight.",
        [],
        "You explicitly report a later sleep rhythm.",
        { bedtime: "after 01:00" },
      ),
      opt(
        "It varies or I work shifts. Time and I have an arrangement.",
        [],
        "You explicitly report a variable rhythm.",
        { bedtime: "variable-or-shifts" },
      ),
    ],
    { role: "context" },
  ),
  q(
    18,
    3,
    "When {close} goes quiet after a hard day, what is your first story?",
    "Use the selected close person if you have one; skip if this does not fit.",
    [
      opt(
        "They are probably busy. The silence and I can coexist.",
        [tag("D5", "secure", "close")],
        "You describe a benign explanation for the silence.",
      ),
      opt(
        "I worry they are upset with me and send a check-in.",
        [tag("D5", "worry", "close"), tag("D6", "support", "close")],
        "You explicitly fear the silence means they are upset with you and seek contact.",
      ),
      opt(
        "I reread my message and look for what I did wrong.",
        [tag("D5", "reassurance", "close"), tag("D6", "private", "close")],
        "You question the relationship and process the uncertainty privately.",
      ),
      opt(
        "I ask directly whether we are okay.",
        [tag("D5", "reassurance", "close"), tag("D7", "direct", "close")],
        "You seek explicit reassurance through a direct question.",
      ),
    ],
    { applicable: "close" },
  ),
  q(
    19,
    3,
    "It is 11 p.m. after a cursed day. Who gets the first version?",
    "The day has already filed its paperwork; choose how much to share.",
    [
      opt(
        "I tell {close} the whole story and ask them to listen.",
        [tag("D6", "support", "close")],
        "You disclose fully and seek connection from the selected person.",
      ),
      opt(
        "I tell {close} a small version, then go quiet.",
        [tag("D6", "selective", "close")],
        "You disclose selectively to the selected person.",
      ),
      opt(
        "I process it privately before telling {close} anything.",
        [tag("D6", "private", "close")],
        "You initially keep the experience to yourself.",
      ),
      opt(
        "I talk to someone else first.",
        [tag("D6", "selective", "general")],
        "You seek another support person before the selected close person.",
      ),
    ],
    { applicable: "close" },
  ),
  q(
    20,
    3,
    "In the last seven days, how many dinners arrived from a restaurant or takeaway?",
    "Count meals, not virtue. The delivery app is not a moral authority.",
    [
      opt(
        "None. The kitchen has proof of life.",
        [],
        "You explicitly report no takeaway dinners.",
        { takeaway: "0 days / last 7" },
      ),
      opt(
        "One or two. The app knows me casually.",
        [],
        "You explicitly report occasional takeaway dinners.",
        { takeaway: "1-2 days / last 7" },
      ),
      opt(
        "Three or four. We are becoming close.",
        [],
        "You explicitly report frequent takeaway dinners.",
        { takeaway: "3-4 days / last 7" },
      ),
      opt(
        "Five to seven. The doorbell is my dinner bell.",
        [],
        "You explicitly report takeaway as the usual dinner source.",
        { takeaway: "5-7 days / last 7" },
      ),
    ],
    { role: "context" },
  ),
  q(
    21,
    3,
    "The last time you felt ignored by {close}, what did you actually do?",
    "Choose a close-person response; skip if there is no safe or useful example.",
    [
      opt(
        "Said what was bothering me.",
        [tag("D7", "direct", "close")],
        "You report naming the issue directly.",
      ),
      opt(
        "Eased into it gently.",
        [tag("D7", "soften", "close")],
        "You report opening the conversation gently.",
      ),
      opt(
        "Asked for time and came back to talk.",
        [tag("D7", "pause", "close"), tag("D6", "private", "close")],
        "You report an explicit pause with a return.",
      ),
      opt(
        "Avoided the conversation and let it pass.",
        [tag("D7", "avoid", "close"), tag("D6", "private", "close")],
        "You report leaving the issue unaddressed.",
      ),
    ],
    { role: "actual", applicable: "close" },
  ),
  q(
    22,
    3,
    "After a fight, {close} sends a raccoon eating grapes. No explanation.",
    "The raccoon is excellent at conflict avoidance. What do you do?",
    [
      opt(
        "“He is incredible. Can we talk about yesterday?”",
        [tag("D7", "direct", "close"), tag("D12", "repair", "close")],
        "You maintain contact and reopen repair directly.",
      ),
      opt(
        "Send one back, then ask to talk tonight.",
        [tag("D7", "soften", "close"), tag("D12", "repair", "close")],
        "You soften the opening and arrange a conversation.",
      ),
      opt(
        "Send one back and leave it there.",
        [tag("D7", "avoid", "close")],
        "You resume contact without addressing the disagreement.",
      ),
      opt(
        "Say I need a day before we talk.",
        [tag("D7", "pause", "close"), tag("D6", "private", "close")],
        "You request space and keep the conversation possible.",
      ),
    ],
    { applicable: "close" },
  ),
  q(
    23,
    3,
    "You forgot something important to {close}. What comes next?",
    "The full stop in “it’s fine” has entered the room.",
    [
      opt(
        "Apologize and ask how to make it right.",
        [tag("D12", "repair", "close"), tag("D7", "direct", "close")],
        "You own the mistake and ask about repair.",
      ),
      opt(
        "Apologize and explain what happened.",
        [tag("D12", "explain", "close"), tag("D7", "soften", "close")],
        "You pair an apology with context.",
      ),
      opt(
        "Arrange something thoughtful to make up for it.",
        [tag("D12", "action", "close"), tag("D3", "plan")],
        "You initiate a concrete repair gesture.",
      ),
      opt(
        "Ask for space, then agree when to talk.",
        [tag("D12", "pause", "close"), tag("D7", "pause", "close")],
        "You coordinate a pause and a return.",
      ),
    ],
    { applicable: "close" },
  ),
  q(
    24,
    3,
    "When {close} cancels a catch-up and suggests no new date, what do you assume first?",
    "Choose the closest first interpretation; skip if this scene does not fit.",
    [
      opt(
        "They are busy; we will find another time.",
        [tag("D5", "secure", "close")],
        "You choose a benign explanation for the cancellation.",
      ),
      opt(
        "I worry they are pulling away and want reassurance.",
        [tag("D5", "worry", "close"), tag("D6", "support", "close")],
        "You fear withdrawal and seek reassurance.",
      ),
      opt(
        "Ask directly whether we are okay.",
        [tag("D5", "reassurance", "close"), tag("D7", "direct", "close")],
        "You seek explicit reassurance with a direct question.",
      ),
      opt(
        "Wait; I do not choose an explanation yet.",
        [tag("D5", "uncertain", "close"), tag("D6", "private", "close")],
        "You hold uncertainty without assigning a reason.",
      ),
    ],
    { role: "hypothetical", applicable: "close" },
  ),

  q(
    25,
    4,
    "A family holiday clashes with plans you made for yourself.",
    "Everyone says it is only one weekend, as if weekends grow on trees.",
    [
      opt(
        "Change my plans; family comes first this time.",
        [tag("D11", "duty", "family"), tag("D1", "people")],
        "You prioritize the family commitment.",
      ),
      opt(
        "Keep my plans and explain why.",
        [tag("D11", "autonomy", "family"), tag("D7", "direct", "family")],
        "You protect your plan and state the choice.",
      ),
      opt(
        "Split the time between both.",
        [tag("D11", "conditional", "family"), tag("D3", "plan")],
        "You negotiate a planned compromise.",
      ),
      opt(
        "Ask what is actually needed before deciding.",
        [tag("D11", "conditional", "family"), tag("D1", "people")],
        "You gather the family’s concrete need first.",
      ),
    ],
  ),
  q(
    26,
    4,
    "A parent or elder criticizes your choice at a family meal.",
    "The critique arrives in front of an audience and beside the potatoes.",
    [
      opt(
        "Say I am happy with my choice.",
        [tag("D7", "direct", "family"), tag("D11", "autonomy", "family")],
        "You state your choice directly.",
      ),
      opt(
        "Explain the plan so they understand.",
        [tag("D7", "soften", "family"), tag("D3", "plan")],
        "You give context in an attempt to lower tension.",
      ),
      opt(
        "Make a joke and change the subject.",
        [tag("D7", "avoid", "family")],
        "You redirect the public criticism.",
      ),
      opt(
        "Reconsider it. Their opinion matters to me.",
        [tag("D11", "duty", "family")],
        "You give family expectations weight in the decision.",
      ),
    ],
  ),
  q(
    27,
    4,
    "Family pushes a food or health habit on you.",
    "They have brought advice, enthusiasm, and no appointment.",
    [
      opt(
        "Thank them and choose my own routine.",
        [tag("D11", "autonomy", "family"), tag("D7", "soften", "family")],
        "You preserve autonomy while keeping the opening gentle.",
      ),
      opt(
        "Tell them plainly to stop.",
        [tag("D11", "autonomy", "family"), tag("D7", "direct", "family")],
        "You set a direct boundary.",
      ),
      opt(
        "Try it for their sake.",
        [tag("D11", "duty", "family")],
        "You accommodate the family request for now.",
      ),
      opt(
        "Change the subject and keep doing my thing.",
        [tag("D11", "autonomy", "family"), tag("D7", "avoid", "family")],
        "You protect your routine without entering the argument.",
      ),
    ],
  ),
  q(
    28,
    4,
    "The dinner-after-a-fight scene, this time with a family member.",
    "They send a recipe video as if the disagreement was a minor seasoning issue.",
    [
      opt(
        "Reply warmly, then ask to talk about it.",
        [tag("D7", "direct", "family"), tag("D12", "repair", "family")],
        "You reopen repair with the family member.",
      ),
      opt(
        "Start with the recipe and bring it up gently later.",
        [tag("D7", "soften", "family"), tag("D12", "repair", "family")],
        "You soften the repair opening.",
      ),
      opt(
        "Reply about the recipe and leave the disagreement alone.",
        [tag("D7", "avoid", "family"), tag("D12", "avoid", "family")],
        "You resume ordinary contact without repair.",
      ),
      opt(
        "Ask for a day and name a time to return.",
        [tag("D7", "pause", "family"), tag("D12", "pause", "family")],
        "You coordinate a pause with a return.",
      ),
    ],
  ),
  q(
    29,
    4,
    "What did you actually do the last time an outing with {close} became uneven?",
    "The bill or effort stopped matching; choose a real response or skip.",
    [
      opt(
        "Named the imbalance and asked to split it fairly.",
        [tag("D8", "proportional", "close"), tag("D7", "direct", "close")],
        "You report naming the uneven cost or effort directly.",
      ),
      opt(
        "Sent a careful message about my share.",
        [tag("D8", "proportional", "close"), tag("D7", "soften", "close")],
        "You report raising the uneven share privately.",
      ),
      opt(
        "Covered it and kept the peace.",
        [tag("D8", "absorb", "close")],
        "You report carrying the extra cost or effort.",
      ),
      opt(
        "Stopped covering it without discussing why.",
        [tag("D8", "limit", "close"), tag("D7", "avoid", "close")],
        "You report withdrawing your extra contribution without a discussion.",
      ),
    ],
    { role: "actual", applicable: "close" },
  ),
  q(
    30,
    4,
    "What did you actually do the last time a setback happened to you?",
    "Choose what you told {close}, or skip if there is no useful example.",
    [
      opt(
        "Told {close} quickly and asked them to stay with me in it.",
        [tag("D6", "support", "close")],
        "You report disclosing promptly and seeking connection.",
      ),
      opt(
        "Told {close} a small version first.",
        [tag("D6", "selective", "close")],
        "You report selective disclosure to the selected person.",
      ),
      opt(
        "Worked it out privately before saying anything.",
        [tag("D6", "private", "close")],
        "You report processing the setback privately.",
      ),
      opt(
        "Talked to someone else before {close}.",
        [tag("D6", "selective", "general")],
        "You report seeking another support person first.",
      ),
    ],
    { role: "actual", applicable: "close" },
  ),
  q(
    31,
    4,
    "You lose your job. Who in the family hears it, and when?",
    "Imagine the news arriving today; skip if this scene does not fit.",
    [
      opt(
        "Tell the family quickly; I need people around me.",
        [tag("D6", "support", "family")],
        "You disclose quickly and seek family support.",
      ),
      opt(
        "Tell one person privately first.",
        [tag("D6", "selective", "family")],
        "You choose a limited, private disclosure.",
      ),
      opt(
        "Wait until I have a plan.",
        [tag("D6", "private", "family"), tag("D3", "plan")],
        "You delay disclosure while organizing next steps.",
      ),
      opt(
        "Handle it alone for a while.",
        [tag("D6", "distance", "family")],
        "You keep the setback private at first.",
      ),
    ],
  ),
  q(
    32,
    4,
    "What did you actually do the last time family wanted something different from you?",
    "Think of the latest such disagreement in the past month. Choose “No example to use” if this has not happened in the past month.",
    [
      opt(
        "Said no and kept my plan.",
        [tag("D11", "autonomy", "family"), tag("D7", "direct", "family")],
        "You report protecting your choice directly.",
      ),
      opt(
        "Found a compromise.",
        [tag("D11", "conditional", "family")],
        "You report negotiating a workable agreement.",
      ),
      opt(
        "Went along with them.",
        [tag("D11", "duty", "family"), tag("D1", "people")],
        "You report prioritizing the family request.",
      ),
      opt(
        "Avoided the conversation for now.",
        [tag("D7", "avoid", "family")],
        "You report deferring the disagreement.",
      ),
    ],
    { role: "actual" },
  ),

  q(
    33,
    5,
    "The friend you brought becomes the centre of the party.",
    "Everyone is delighted. Your ego would like a small private meeting.",
    [
      opt(
        "Introduce them to more people and enjoy it.",
        [tag("D9", "noncompetitive")],
        "You connect the friend despite losing attention.",
      ),
      opt(
        "Stay close and make sure I am not forgotten.",
        [tag("D9", "recognition")],
        "You seek recognition in the group.",
      ),
      opt(
        "Turn it into a joint bit. We can be famous together.",
        [tag("D9", "competitive"), tag("D1", "people")],
        "You convert comparison into shared performance.",
      ),
      opt(
        "Leave early; the social battery has become a witness.",
        [tag("D14d", "rest")],
        "You protect capacity by leaving early.",
      ),
    ],
  ),
  q(
    34,
    5,
    "A colleague presents shared work and says “I” until “we” files a missing-person report.",
    "The credits are wrong in public.",
    [
      opt(
        "Mention what I contributed right there.",
        [tag("D9", "recognition"), tag("D7", "direct", "colleague")],
        "You clarify your contribution publicly.",
      ),
      opt(
        "Speak to them afterward.",
        [tag("D9", "recognition"), tag("D7", "soften", "colleague")],
        "You address attribution privately.",
      ),
      opt(
        "Send the lead a record of the work.",
        [tag("D8", "proportional", "colleague"), tag("D3", "plan")],
        "You use documentation to seek fair attribution.",
      ),
      opt(
        "Leave it this time and keep clearer records next time.",
        [tag("D3", "plan")],
        "You defer the conflict and plan future protection.",
      ),
    ],
  ),
  q(
    35,
    5,
    "A friend gets the opportunity you wanted. You are happy for them.",
    "Your ego would prefer to lie face down for ten minutes.",
    [
      opt(
        "Call to celebrate; my floor moment can wait.",
        [tag("D9", "noncompetitive")],
        "You prioritize connection despite disappointment.",
      ),
      opt(
        "Congratulate them, then mute updates briefly.",
        [tag("D9", "comparison"), tag("D6", "private", "friend")],
        "You support them while limiting painful comparison.",
      ),
      opt(
        "Ask how they did it and make a plan.",
        [tag("D9", "competitive"), tag("D3", "plan")],
        "You turn comparison into a plan.",
      ),
      opt(
        "Wait until I can reply warmly.",
        [tag("D9", "comparison"), tag("D10", "wait")],
        "You delay contact while emotions settle.",
      ),
    ],
  ),
  q(
    36,
    5,
    "A friend asks to borrow money after a rough week.",
    "You care about them and your budget has also had a rough week.",
    [
      opt(
        "State what I can lend and when I need it back.",
        [tag("D8", "limit", "friend"), tag("D7", "direct", "friend")],
        "You set a bounded loan and repayment expectation.",
      ),
      opt(
        "Offer a smaller amount or practical help.",
        [tag("D8", "limit", "friend")],
        "You help within a defined limit.",
      ),
      opt(
        "Lend it without making the friendship an invoice.",
        [tag("D8", "absorb", "friend"), tag("D11", "duty", "friend")],
        "You accept the financial cost for the friendship.",
      ),
      opt(
        "Decline; I cannot add this cost.",
        [tag("D8", "limit", "friend"), tag("D11", "autonomy", "friend")],
        "You protect your own financial capacity.",
      ),
    ],
  ),
  q(
    37,
    5,
    "Your mistake got the team blamed, and nobody knows it was you.",
    "The correction would be embarrassing. The silence is also doing a lot.",
    [
      opt(
        "Own it and tell the team how I will fix it.",
        [tag("D12", "repair", "colleague")],
        "You take responsibility and propose a repair.",
      ),
      opt(
        "Apologize to the lead privately and explain what led to it.",
        [tag("D12", "explain", "colleague"), tag("D7", "soften", "colleague")],
        "You apologize and disclose the mistake in a private conversation.",
      ),
      opt(
        "Fix the work quietly and hope the blame evaporates.",
        [tag("D12", "action", "colleague"), tag("D7", "avoid", "colleague")],
        "You repair the output without owning it publicly.",
      ),
      opt(
        "Leave the project if the damage is too large.",
        [tag("D12", "exit", "colleague"), tag("D11", "autonomy", "colleague")],
        "You choose to exit rather than continue the repair.",
      ),
    ],
  ),
  q(
    38,
    5,
    "A group of friends hid something and asks you to pick a side.",
    "The hidden thing is theirs to tell; your role is not a courtroom.",
    [
      opt(
        "Ask what happened before choosing.",
        [tag("D1", "people"), tag("D3", "plan")],
        "You gather context before taking a side.",
      ),
      opt(
        "Stand with the group immediately.",
        [tag("D11", "duty", "friends")],
        "You prioritize loyalty to the group.",
      ),
      opt(
        "Say I will not carry a secret that harms someone.",
        [tag("D13", "limit"), tag("D7", "direct", "friends")],
        "You set a direct care and responsibility limit.",
      ),
      opt(
        "Stay out until the people involved talk themselves.",
        [tag("D7", "avoid", "friends")],
        "You stay out of the group conflict.",
      ),
    ],
  ),
  q(
    39,
    5,
    "Your colleagues want you to take credit for a win you only partly made.",
    "The applause is available. So is the awkward footnote.",
    [
      opt(
        "Name everyone’s contribution.",
        [tag("D9", "noncompetitive"), tag("D8", "proportional", "colleague")],
        "You distribute recognition according to contribution.",
      ),
      opt(
        "Accept the credit and share it later.",
        [tag("D9", "recognition"), tag("D3", "plan")],
        "You accept recognition while planning a later share.",
      ),
      opt(
        "Correct the record immediately.",
        [tag("D7", "direct", "colleague")],
        "You clarify the credit directly.",
      ),
      opt(
        "Let it pass; the result matters more than the names.",
        [tag("D9", "noncompetitive")],
        "You accept an uneven recognition outcome.",
      ),
    ],
  ),
  q(
    40,
    5,
    "What did you actually do the last time a colleague took the spotlight?",
    "Choose a real workplace, school, or project example; skip if none comes to mind.",
    [
      opt(
        "Congratulated them and stayed involved.",
        [tag("D9", "noncompetitive")],
        "You report staying involved despite comparison.",
      ),
      opt(
        "Made sure my part was visible.",
        [tag("D9", "recognition")],
        "You report protecting accurate recognition.",
      ),
      opt(
        "Stepped back and processed it privately.",
        [tag("D9", "comparison")],
        "You report reducing comparison exposure.",
      ),
      opt(
        "Turned the feeling into a next move.",
        [tag("D9", "competitive")],
        "You report converting comparison into action.",
      ),
    ],
    { role: "actual" },
  ),

  q(
    41,
    6,
    "A soaked stray cat looks at you like you control the weather.",
    "You cannot take it home. Your options are still real.",
    [
      opt(
        "Bring food and water. Catering, not accommodation.",
        [tag("D13", "bounded")],
        "You provide immediate care within a limit.",
      ),
      opt(
        "Contact a rescue with cat capacity.",
        [tag("D13", "coordinate"), tag("D3", "plan")],
        "You seek organized help.",
      ),
      opt(
        "Ask nearby people who can help.",
        [tag("D13", "coordinate"), tag("D1", "people")],
        "You mobilize other people to help.",
      ),
      opt(
        "Leave; I cannot safely help right now.",
        [tag("D13", "limit"), tag("D1", "self")],
        "You state a current capacity or safety limit.",
      ),
    ],
  ),
  q(
    42,
    6,
    "You are exhausted. A stranger asks for help finding their stop.",
    "Your own bus is arriving in two minutes.",
    [
      opt(
        "Stay and help. The bus and I will meet again.",
        [tag("D13", "direct"), tag("D1", "people")],
        "You accept a personal cost to provide direct help.",
      ),
      opt(
        "Give quick directions, then catch my bus.",
        [tag("D13", "bounded")],
        "You provide limited help while protecting capacity.",
      ),
      opt(
        "Point them to staff before I go.",
        [tag("D13", "coordinate"), tag("D1", "task")],
        "You connect them to another source of help.",
      ),
      opt(
        "Apologize, protect my remaining energy, and catch my bus.",
        [tag("D13", "limit"), tag("D14d", "rest")],
        "You explicitly prioritize recovery capacity.",
      ),
    ],
  ),
  q(
    43,
    6,
    "Your planned movement meets an appealing alternative.",
    "You have one hour, and the alternative has excellent snacks.",
    [
      opt(
        "Keep the movement plan.",
        [tag("D14c", "planned"), tag("D3", "plan")],
        "You follow the planned movement.",
      ),
      opt(
        "Move it to another time and take the alternative.",
        [tag("D14c", "adjust"), tag("D3", "plan")],
        "You reschedule movement around the alternative.",
      ),
      opt(
        "Skip movement today.",
        [tag("D14c", "skip")],
        "You choose to skip the planned movement.",
      ),
      opt(
        "Do a shorter version, then join the alternative.",
        [tag("D14c", "adjust"), tag("D3", "improvise")],
        "You adapt the movement plan to fit both.",
      ),
    ],
  ),
  q(
    44,
    6,
    "What did you actually eat the last time a stressful dinner plan fell apart?",
    "Choose a real recent response; skip if you have no useful example.",
    [
      opt(
        "Made the meal I had planned.",
        [tag("D14b", "planned")],
        "You report following the planned meal.",
      ),
      opt(
        "Adapted the plan into a quick version.",
        [tag("D14b", "bounded")],
        "You report adapting the meal within a boundary.",
      ),
      opt(
        "Ordered comfort food immediately.",
        [tag("D14b", "comfort"), tag("D10", "act")],
        "You report choosing immediate comfort while stressed.",
      ),
      opt(
        "Delayed eating until I could think clearly.",
        [tag("D14b", "delay"), tag("D10", "wait")],
        "You report delaying the meal while stressed.",
      ),
    ],
    { role: "actual" },
  ),
  q(
    45,
    6,
    "You are about to sleep when an optional extra task appears.",
    "It would help, but it can wait until morning.",
    [
      opt(
        "Go to bed and move the task.",
        [tag("D14a", "protect"), tag("D14d", "rest")],
        "You protect sleep and recovery.",
      ),
      opt(
        "Do the task, then sleep later.",
        [tag("D14a", "delay"), tag("D14d", "obligation")],
        "You delay sleep for the optional obligation.",
      ),
      opt(
        "Move tomorrow’s wake-up later so I can finish this and still sleep.",
        [tag("D14a", "adjust"), tag("D3", "plan")],
        "You change tomorrow’s sleep timing to fit the task while preserving sleep.",
      ),
      opt(
        "Decline the task; tonight is closed.",
        [tag("D14a", "protect"), tag("D14d", "rest")],
        "You decline the task to protect sleep.",
      ),
    ],
  ),
  q(
    46,
    6,
    "In the last seven days, on how many days did you deliberately get some movement?",
    "Walks, wheelchair exercise, and movement that works for your body all count.",
    [
      opt(
        "Zero. A factual answer, not a confession.",
        [],
        "You explicitly report no deliberate movement days.",
        { movement: "0 days / last 7" },
      ),
      opt(
        "One or two. Witnesses exist.",
        [],
        "You explicitly report occasional movement.",
        { movement: "1-2 days / last 7" },
      ),
      opt(
        "Three or four. A recurring event.",
        [],
        "You explicitly report regular movement.",
        { movement: "3-4 days / last 7" },
      ),
      opt(
        "Five to seven. My calendar has trainers on.",
        [],
        "You explicitly report frequent movement.",
        { movement: "5-7 days / last 7" },
      ),
    ],
    { role: "context" },
  ),
  q(
    47,
    6,
    "What did you actually do the last time a movement plan met a hard day?",
    "Choose a real response or skip.",
    [
      opt(
        "Kept the plan.",
        [tag("D14c", "planned")],
        "You report following the movement plan.",
      ),
      opt(
        "Adapted it to fit the day.",
        [tag("D14c", "adjust"), tag("D3", "plan")],
        "You report adapting the movement plan.",
      ),
      opt(
        "Skipped it and did not replace it.",
        [tag("D14c", "skip")],
        "You report skipping the movement plan.",
      ),
      opt(
        "Did a shorter version.",
        [tag("D14c", "adjust")],
        "You report reducing the movement plan.",
      ),
    ],
    { role: "actual" },
  ),
  q(
    48,
    6,
    "What did you actually do the last time a stranger or animal needed help?",
    "Choose a real response or skip.",
    [
      opt(
        "Helped directly.",
        [tag("D13", "direct"), tag("D1", "people")],
        "You report providing direct help.",
      ),
      opt(
        "Connected them to someone better placed.",
        [tag("D13", "coordinate"), tag("D3", "plan")],
        "You report coordinating appropriate help.",
      ),
      opt(
        "Helped briefly, then left.",
        [tag("D13", "bounded")],
        "You report bounded help.",
      ),
      opt(
        "Left because I had no safe capacity.",
        [tag("D13", "limit"), tag("D1", "self")],
        "You report setting a capacity or safety limit.",
      ),
    ],
    { role: "actual" },
  ),

  q(
    49,
    7,
    "Your day has one free hour and three unfinished tasks.",
    "The tasks are all mildly urgent, which is their favourite disguise.",
    [
      opt(
        "Do the task affecting someone else first.",
        [tag("D1", "people"), tag("D11", "duty")],
        "You prioritize the other person’s need.",
      ),
      opt(
        "Do the task with the nearest deadline.",
        [tag("D1", "task"), tag("D3", "plan")],
        "You prioritize the immediate task.",
      ),
      opt(
        "Take the hour to recover.",
        [tag("D1", "self"), tag("D14d", "rest")],
        "You explicitly protect personal recovery.",
      ),
      opt(
        "Take one small task, then stop.",
        [tag("D1", "task"), tag("D14d", "bounded")],
        "You make a bounded contribution and stop.",
      ),
    ],
  ),
  q(
    50,
    7,
    "What did you actually want the last time you made an optional purchase?",
    "Choose the literal motive that best describes a recent decision; no income estimate is wanted.",
    [
      opt(
        "Safety. I wanted the sensible, reliable choice.",
        [tag("D4", "security")],
        "You report prioritizing safety or reliability.",
      ),
      opt(
        "Freedom. I wanted to save time or keep options open.",
        [tag("D4", "freedom")],
        "You report prioritizing independence or saved time.",
      ),
      opt(
        "Enjoyment. I wanted the thing because it pleased me.",
        [tag("D4", "enjoyment")],
        "You report prioritizing enjoyment.",
      ),
      opt(
        "Status. I liked being seen with that version.",
        [tag("D4", "status")],
        "You report prioritizing visible recognition.",
      ),
    ],
    { role: "actual" },
  ),
  q(
    51,
    7,
    "Your phone offers a limited-time deal while you are upset.",
    "The countdown timer has the confidence of a tiny auctioneer.",
    [
      opt(
        "Buy now; the deal may fix the evening.",
        [tag("D10", "act"), tag("D4", "enjoyment")],
        "You act on an emotional purchase prompt.",
      ),
      opt(
        "Wait until tomorrow.",
        [tag("D10", "wait"), tag("D3", "plan")],
        "You delay a mood-linked purchase.",
      ),
      opt(
        "Compare the deal with the normal price.",
        [tag("D3", "plan"), tag("D4", "security")],
        "You verify the offer before acting.",
      ),
      opt(
        "Close it; tomorrow can make the decision.",
        [tag("D10", "wait")],
        "You reject the pressured purchase without choosing a familiar alternative.",
      ),
    ],
  ),
  q(
    52,
    7,
    "A plan you made carefully is suddenly impossible.",
    "The plan has left a note saying it will not be back.",
    [
      opt(
        "Improvise from whatever is available.",
        [tag("D3", "improvise")],
        "You act with an incomplete plan.",
      ),
      opt(
        "Pause and make a replacement plan.",
        [tag("D3", "plan")],
        "You reorganize before acting.",
      ),
      opt(
        "Ask the people affected what they prefer.",
        [tag("D1", "people"), tag("D3", "consult")],
        "You involve affected people before choosing a new plan.",
      ),
      opt(
        "Drop it; I no longer have the energy.",
        [tag("D3", "stop"), tag("D14d", "rest")],
        "You end the plan to protect capacity.",
      ),
    ],
  ),
  q(
    53,
    7,
    "{close} says you hurt them, and you think they have part of it wrong.",
    "Being right and repairing things have both requested a speaking slot.",
    [
      opt(
        "Ask what landed badly before explaining my view.",
        [tag("D12", "repair", "close"), tag("D7", "soften", "close")],
        "You listen before adding your explanation.",
      ),
      opt(
        "Apologize, then explain my intent immediately.",
        [tag("D12", "explain", "close"), tag("D7", "direct", "close")],
        "You apologize and lead with context about your intent.",
      ),
      opt(
        "Apologize for the impact and discuss the facts later.",
        [tag("D12", "repair", "close"), tag("D7", "pause", "close")],
        "You prioritize repair while pausing the factual dispute.",
      ),
      opt(
        "Say I cannot discuss it right now.",
        [tag("D12", "pause", "close"), tag("D6", "private", "close")],
        "You request space before engaging.",
      ),
    ],
    { applicable: "close" },
  ),
  q(
    54,
    7,
    "Your usual sleep plan meets an unexpectedly late night.",
    "Tomorrow still exists, annoyingly.",
    [
      opt(
        "Stop and sleep as soon as I reasonably can.",
        [tag("D14a", "protect"), tag("D14d", "rest")],
        "You protect sleep and recovery.",
      ),
      opt(
        "Finish the important thing, then sleep.",
        [tag("D14a", "delay"), tag("D14d", "obligation")],
        "You accept later sleep for an obligation.",
      ),
      opt(
        "Keep going; the night has momentum.",
        [tag("D14a", "delay")],
        "You continue despite the late hour.",
      ),
      opt(
        "Change tomorrow’s plan to make room for sleep.",
        [tag("D14a", "adjust"), tag("D3", "plan")],
        "You adjust the next plan to protect recovery.",
      ),
    ],
  ),
  q(
    55,
    7,
    "You are hungry, stressed, and the fastest option is not your usual dinner.",
    "The fastest option has already opened the door.",
    [
      opt(
        "Eat the comfort food; hungry is a current fact.",
        [tag("D14b", "comfort"), tag("D10", "act")],
        "You respond immediately with explicitly comforting food.",
      ),
      opt(
        "Wait and make the meal I intended.",
        [tag("D14b", "planned"), tag("D3", "plan")],
        "You follow the planned meal despite the stress.",
      ),
      opt(
        "Choose a quick version that still works for me.",
        [tag("D14b", "bounded"), tag("D3", "plan")],
        "You adapt the meal within a boundary.",
      ),
      opt(
        "Skip it until I can think clearly.",
        [tag("D14b", "delay"), tag("D10", "wait")],
        "You delay eating while stressed.",
      ),
    ],
  ),
  q(
    56,
    7,
    "What did you actually do the last time your energy and obligation disagreed?",
    "Choose a real recent pattern or skip.",
    [
      opt(
        "Finished the obligation first.",
        [tag("D14d", "obligation"), tag("D1", "task")],
        "You report prioritizing the obligation.",
      ),
      opt(
        "Protected rest and moved the task.",
        [tag("D14d", "rest"), tag("D1", "self")],
        "You report protecting recovery.",
      ),
      opt(
        "Asked someone to share or move it.",
        [tag("D14d", "connection")],
        "You report coordinating a different workload.",
      ),
      opt(
        "Did a small part and stopped.",
        [tag("D14d", "bounded")],
        "You report making the obligation manageable.",
      ),
    ],
    { role: "actual" },
  ),

  q(
    57,
    8,
    "A friend offers a last-minute trip to a place you have never visited.",
    "You have the time, but only one evening to decide.",
    [
      opt(
        "Go. The map can explain itself later.",
        [tag("D2", "novel")],
        "You choose an unplanned novel experience.",
      ),
      opt(
        "Check the details before saying yes.",
        [tag("D2", "conditional")],
        "You gather information first.",
      ),
      opt(
        "Choose a familiar plan instead.",
        [tag("D2", "familiar")],
        "You choose the known option.",
      ),
      opt(
        "Go only if someone I know joins.",
        [tag("D2", "conditional")],
        "You condition novelty on familiar company.",
      ),
    ],
    { role: "holdout", test: true, baseline: "b" },
  ),
  q(
    58,
    8,
    "{close} cancels a plan that mattered to you.",
    "They offer a replacement without mentioning the cancellation.",
    [
      opt(
        "Rebook, and say why the cancellation hurt.",
        [tag("D7", "direct", "close")],
        "You reopen the issue directly.",
      ),
      opt(
        "Start warmly, then bring it up gently.",
        [tag("D7", "soften", "close")],
        "You use a softer opening.",
      ),
      opt(
        "Ask for a day, then set a time to talk.",
        [tag("D7", "pause", "close")],
        "You request space with a return.",
      ),
      opt(
        "Accept the new plan and say nothing about it.",
        [tag("D7", "avoid", "close")],
        "You leave the cancellation unaddressed.",
      ),
    ],
    { role: "holdout", test: true, applicable: "close", baseline: "a" },
  ),
  q(
    59,
    8,
    "Your friends’ bill includes a shared item you did not use.",
    "Your friends want one clean split and your calculator wants a union representative.",
    [
      opt(
        "Ask to remove my share of that item.",
        [tag("D8", "proportional", "friends"), tag("D7", "direct", "friends")],
        "You request a consumption-based split.",
      ),
      opt(
        "Message the organizer privately.",
        [tag("D8", "proportional", "friends"), tag("D7", "soften", "friends")],
        "You request a fair adjustment privately.",
      ),
      opt(
        "Tell them it is okay and pay it for simplicity.",
        [tag("D8", "absorb", "friends"), tag("D7", "direct", "friends")],
        "You accept the extra cost and state that choice directly.",
      ),
      opt(
        "Pay and keep the irritation to yourself.",
        [tag("D8", "absorb", "friends"), tag("D7", "hint", "friends")],
        "You absorb the cost without raising it.",
      ),
    ],
    { role: "holdout", test: true, baseline: "a" },
  ),
  q(
    60,
    8,
    "A surprise gift leaves you with one optional purchase.",
    "The gift is yours; the category motive is the question.",
    [
      opt(
        "Choose the reliable version and keep the rest safe.",
        [tag("D4", "security")],
        "You prioritize safety or reliability.",
      ),
      opt(
        "Choose the option that saves time and opens choices.",
        [tag("D4", "freedom")],
        "You prioritize freedom or saved time.",
      ),
      opt(
        "Choose the one that simply delights me.",
        [tag("D4", "enjoyment")],
        "You prioritize enjoyment.",
      ),
      opt(
        "Choose the recognizable version.",
        [tag("D4", "status")],
        "You prioritize visible status.",
      ),
    ],
    { role: "holdout", test: true, baseline: "b" },
  ),
  q(
    61,
    8,
    "An extra task would help your team, but you are already out of battery.",
    "It is optional, and the team will survive a conversation.",
    [
      opt(
        "Decline and recover.",
        [tag("D14d", "rest")],
        "You protect recovery capacity.",
      ),
      opt(
        "Take it on and finish the team’s need.",
        [tag("D14d", "obligation")],
        "You prioritize the team obligation.",
      ),
      opt(
        "Find someone with capacity to share it.",
        [tag("D14d", "connection")],
        "You coordinate a shared way to complete it.",
      ),
      opt(
        "Offer a smaller piece and protect the rest of the evening.",
        [tag("D14d", "bounded")],
        "You make a bounded contribution.",
      ),
    ],
    { role: "holdout", test: true, baseline: "d" },
  ),
  q(
    62,
    8,
    "You let {close} down again, in a different situation.",
    "The repair starts with one clear sentence.",
    [
      opt(
        "Apologize directly and ask what would help.",
        [tag("D12", "repair", "close")],
        "You own the mistake and ask about repair.",
      ),
      opt(
        "Apologize and explain what led to it.",
        [tag("D12", "explain", "close")],
        "You combine an apology with context.",
      ),
      opt(
        "Arrange a thoughtful concrete way to make up for it.",
        [tag("D12", "action", "close")],
        "You initiate a concrete repair action.",
      ),
      opt(
        "Agree on space and a time to reconnect.",
        [tag("D12", "pause", "close")],
        "You coordinate space and a return.",
      ),
    ],
    { role: "holdout", test: true, applicable: "close", baseline: "a" },
  ),
  q(
    63,
    8,
    "You want to help someone, but you have one hour and no spare money.",
    "The need is genuine; your capacity is also genuine.",
    [
      opt(
        "Use the hour to do the task myself.",
        [tag("D13", "direct")],
        "You provide direct care within the hour.",
      ),
      opt(
        "Find someone or a service better placed to help.",
        [tag("D13", "coordinate")],
        "You coordinate appropriate support.",
      ),
      opt(
        "Say I cannot take this on today.",
        [tag("D13", "limit")],
        "You state a capacity limit.",
      ),
      opt(
        "Offer ten minutes, then hand it back.",
        [tag("D13", "bounded")],
        "You provide a clearly bounded amount of help.",
      ),
    ],
    { role: "holdout", test: true, baseline: "b" },
  ),
  q(
    64,
    8,
    "A plan fails at the last minute and someone asks what happens next.",
    "The plot has finally admitted it was improvising.",
    [
      opt(
        "Choose a workable next step immediately.",
        [tag("D3", "improvise")],
        "You act quickly on a replacement step.",
      ),
      opt(
        "Pause, gather details, and make a new plan.",
        [tag("D3", "plan")],
        "You organize before acting.",
      ),
      opt(
        "Ask the affected people what they prefer, then plan around it.",
        [tag("D3", "consult")],
        "You consult before creating the next plan.",
      ),
      opt(
        "Drop it; there is no capacity for a new version.",
        [tag("D3", "stop")],
        "You stop instead of making a replacement plan.",
      ),
    ],
    { role: "holdout", test: true, baseline: "b" },
  ),
];
// Root v2 authoring metadata. QUESTIONS remains the candidate bank; the
// engine chooses one eligible candidate for each ROUTE_SLOTS entry.
const authorSource = {
  kind: "authorial",
  ref: "PERSONALITY-HEALTH-SPEC.md",
  version: VERSION,
};
const shortWindow = (window) =>
  ({
    past_month: "Usual · past month",
    last_7_days: "Recent · last 7 days",
    latest_instance_past_month: "Latest · past month",
    scenario: "Scenario",
  })[window] || "Context";
const meta = (domain, window, evidence, extra = {}) => ({
  domain,
  window,
  windowLabel: shortWindow(window),
  evidence,
  source: { ...authorSource },
  ...extra,
});
const setMeta = (
  id,
  domain,
  window = null,
  evidence = "hypothetical",
  extra = {},
) => {
  const question = QUESTIONS.find((item) => item.id === id);
  if (question)
    question.meta = {
      domain,
      window,
      windowLabel: shortWindow(window),
      evidence,
      source: { ...authorSource },
      subject: "self",
      ...extra,
    };
};
for (const question of QUESTIONS)
  setMeta(
    question.id,
    question.test
      ? "personality"
      : question.role === "actual"
        ? "personality"
        : question.role === "context"
          ? "context"
          : "personality",
    question.role === "actual"
      ? "latest_instance_past_month"
      : question.role === "context"
        ? null
        : "scenario",
    question.role === "actual"
      ? "actual_event"
      : question.role === "context"
        ? "self_report"
        : "hypothetical",
  );
setMeta("q01", "context", null, "self_report", { subject: "close_person" });
setMeta("q02", "context", null, "self_report", { subject: "household" });
setMeta("q17", "health", "past_month", "self_report", {
  subject: "self",
  fact: "bedtime_band",
});
setMeta("q20", "health", "last_7_days", "self_report", {
  measure: "takeaway_days",
});
setMeta("q46", "health", "last_7_days", "self_report", {
  measure: "movement_consistency",
});
for (const [id, family] of [
  ["q18", "worry"],
  ["q19", "worry"],
  ["q21", "frustration"],
  ["q22", "frustration"],
  ["q23", "guilt"],
  ["q24", "worry"],
  ["q28", "disappointment"],
  ["q30", "disappointment"],
  ["q53", "guilt"],
  ["q58", "frustration"],
  ["q62", "guilt"],
])
  setMeta(
    id,
    "emotion",
    id === "q21" || id === "q30" ? "latest_instance_past_month" : "scenario",
    id === "q21" || id === "q30" ? "actual_event" : "hypothetical",
    {
      emotionFamily: family,
      subject: id === "q58" || id === "q62" ? "close" : "self",
    },
  );
for (const [id, measureId, window] of [
  ["q43", "movement_consistency", "scenario"],
  ["q44", "meal_response", "latest_instance_past_month"],
  ["q45", "sleep_protection", "scenario"],
  ["q47", "movement_response", "latest_instance_past_month"],
  ["q54", "sleep_protection", "scenario"],
  ["q55", "meal_response", "scenario"],
  ["q56", "felt_energy", "latest_instance_past_month"],
  ["q61", "felt_energy", "scenario"],
])
  setMeta(
    id,
    "health",
    window,
    window === "latest_instance_past_month" ? "actual_event" : "hypothetical",
    { measure: measureId },
  );

export const MEASURES = {
  sleep_timing: {
    domain: "sleep",
    label: "Usual bedtime",
    low: "before 11 p.m.",
    high: "after 1 a.m.",
    min: 0,
    max: 3,
    unit: "ordinal",
    description: "Reported usual bedtime band.",
  },
  sleep_restoration: {
    domain: "sleep",
    label: "Sleep restoration",
    low: "rarely refreshed",
    high: "usually refreshed",
    min: 0,
    max: 3,
    unit: "ordinal",
    description: "Reported sleep restoration across usual and recent windows.",
  },
  sleep_regularity: {
    domain: "sleep",
    label: "Sleep timing consistency",
    low: "very irregular",
    high: "very regular",
    min: 0,
    max: 3,
    unit: "ordinal",
    description:
      "Reported sleep timing consistency across usual and recent windows.",
  },
  sleep_wake: {
    domain: "sleep",
    label: "Usual wake time",
    low: "before 6 a.m.",
    high: "after 9 a.m.",
    min: 0,
    max: 3,
    unit: "ordinal",
    description: "Reported usual wake-time band.",
  },
  sleep_duration: {
    domain: "sleep",
    label: "Usual sleep duration",
    low: "under 6 hours",
    high: "9 hours or more",
    min: 0,
    max: 3,
    unit: "ordinal",
    description: "Reported usual sleep-duration band.",
  },
  meal_regularity: {
    domain: "eating",
    label: "Meal timing regularity",
    low: "very varied",
    high: "very regular",
    min: 0,
    max: 3,
    unit: "ordinal",
    description: "Reported usual or recent meal timing pattern.",
  },
  takeaway_days: {
    domain: "eating",
    label: "Takeaway dinners",
    low: "none in seven days",
    high: "five to seven days",
    min: 0,
    max: 3,
    unit: "ordinal",
    description:
      "Reported takeaway dinner count. It does not rate diet quality.",
  },
  movement_consistency: {
    domain: "movement",
    label: "Movement consistency",
    low: "none or rare",
    high: "most days",
    min: 0,
    max: 3,
    unit: "ordinal",
    description: "Reported movement frequency or routine.",
  },
  body_attention: {
    domain: "body",
    label: "Body cue attention",
    low: "often postponed",
    high: "usually noticed and addressed",
    min: 0,
    max: 3,
    unit: "ordinal",
    description: "Reported attention to body cues.",
  },
  skin_attention: {
    domain: "skin",
    label: "Skin care attention",
    low: "rarely tracked",
    high: "regularly tracked",
    min: 0,
    max: 3,
    unit: "ordinal",
    description: "Reported skin experience and routine attention.",
  },
  felt_energy: {
    domain: "recovery",
    label: "Felt energy",
    low: "usually depleted",
    high: "usually enough for the day",
    min: 0,
    max: 3,
    unit: "ordinal",
    description: "Reported energy, not a medical measurement.",
  },
  hydration_cues: {
    domain: "hydration",
    label: "Drink-break routine",
    low: "almost never remembered",
    high: "nearly every busy day",
    min: 0,
    max: 3,
    unit: "ordinal",
    description: "Reported drink-break recall.",
  },
  sleep_interference: {
    domain: "sleep",
    label: "Sleep and optional tasks",
    low: "protect sleep",
    high: "delay sleep",
    min: 0,
    max: 2,
    unit: "ordinal",
    description: "Reported response to an optional task at bedtime.",
  },
};
const addMeasures = (id, measureId, labels) => {
  const question = QUESTIONS.find((item) => item.id === id);
  labels.forEach((label, index) => {
    const option = question?.options[index];
    if (option) option.measures = [{ id: measureId, value: index, label }];
  });
};
addMeasures("q20", "takeaway_days", [
  "None in the last seven days.",
  "One or two days.",
  "Three or four days.",
  "Five to seven days.",
]);
addMeasures("q46", "movement_consistency", [
  "Zero days.",
  "One or two days.",
  "Three or four days.",
  "Five to seven days.",
]);

const emotionQuestion = (id, title, setup, rows) => {
  const question = q(
    id,
    5,
    title,
    `Think of the latest time this happened in the past month. Choose “No example to use” if this has not happened in the past month. ${setup}`,
    rows.map(([text, why]) => opt(text, [], why)),
    { role: "actual" },
  );
  return question;
};
const addedEmotion = [
  emotionQuestion(
    65,
    "Your plan acquires a surprise problem.",
    "The plan has sent a tiny emergency memo. What was the inside voice?",
    [
      [
        "I felt a flash of irritation and said what needed changing.",
        "Reports frustration and a direct response.",
      ],
      [
        "I felt properly angry and went quiet before deciding.",
        "Reports anger and a pause.",
      ],
      [
        "I was mildly bothered, gave myself a reset, and moved to the next step.",
        "Reports lower frustration and recovery through a reset.",
      ],
      [
        "I felt stuck and asked someone to help untangle it.",
        "Reports frustrated uncertainty and support.",
      ],
    ],
  ),
  emotionQuestion(
    66,
    "A needed message sits unread while the deadline approaches.",
    "Your brain has opened seventeen tabs about one blue tick.",
    [
      [
        "I felt uneasy and sent one clear check-in.",
        "Reports worry and one direct response.",
      ],
      [
        "I felt very worried and checked the details again.",
        "Reports worry and a checking response.",
      ],
      [
        "I did not feel especially worried. I assumed they were busy and carried on.",
        "Reports low worry explicitly and continued.",
      ],
      [
        "I felt uncertain, then put the phone away for a while.",
        "Reports uncertainty and bounded recovery.",
      ],
    ],
  ),
  emotionQuestion(
    67,
    "A plan you wanted gets canceled at the last minute.",
    "The cancellation arrived with no useful footnotes.",
    [
      [
        "I felt disappointed and said I wanted to reschedule.",
        "Reports disappointment and a reschedule response.",
      ],
      [
        "I felt sad, took the evening quietly, and revisited it later.",
        "Reports sadness and recovery through space.",
      ],
      [
        "I was barely bothered and made another plan.",
        "Reports low disappointment and adjustment.",
      ],
      [
        "I felt let down and asked what had changed.",
        "Reports disappointment and a context request.",
      ],
    ],
  ),
  emotionQuestion(
    68,
    "You call someone by the spectacularly wrong name in a group.",
    "The room has noticed. Your dignity is taking a short break.",
    [
      [
        "I felt embarrassed and laughed, then corrected myself.",
        "Reports embarrassment and repair.",
      ],
      [
        "I felt intensely embarrassed and went quiet for a beat.",
        "Reports embarrassment and a pause.",
      ],
      [
        "I felt a little awkward and kept the conversation moving.",
        "Reports mild embarrassment and continued engagement.",
      ],
      [
        "I felt embarrassed, apologized, and let the moment move on.",
        "Reports embarrassment and recovery.",
      ],
    ],
  ),
  emotionQuestion(
    69,
    "You remember a promise only after the other person has waited.",
    "The reminder notification has chosen violence.",
    [
      [
        "I felt guilty and apologized plainly.",
        "Reports guilt and direct repair.",
      ],
      [
        "I felt awful, explained the miss, and offered a fix.",
        "Reports guilt and concrete recovery.",
      ],
      [
        "I felt a little guilty and set a reminder for next time.",
        "Reports guilt and prevention.",
      ],
      [
        "I felt guilty, asked for a little time, then came back to it.",
        "Reports guilt and a recovery pause.",
      ],
    ],
  ),
  emotionQuestion(
    70,
    "Someone tells you good news you had been quietly hoping for.",
    "The news is excellent. Your face has issued a press release.",
    [
      [
        "I felt delighted and called someone to celebrate.",
        "Reports joy and connection.",
      ],
      [
        "I felt fizzing excitement and made a plan for the next step.",
        "Reports joy and action.",
      ],
      [
        "I felt happy, took it in privately, and let the moment land.",
        "Reports joy and savoring.",
      ],
      [
        "I felt pleased and said exactly how much it meant.",
        "Reports joy and expression.",
      ],
    ],
  ),
  emotionQuestion(
    71,
    "The stressful thing you have been carrying finally ends.",
    "The problem has left the building and taken its clipboard.",
    [
      [
        "I felt relieved and exhaled before doing anything else.",
        "Reports relief and recovery.",
      ],
      [
        "I felt relief arrive slowly, then rested.",
        "Reports relief and physical recovery.",
      ],
      [
        "I felt relieved and told the person who had helped me.",
        "Reports relief and connection.",
      ],
      [
        "I felt relieved, then checked the next small step.",
        "Reports relief and a bounded action.",
      ],
    ],
  ),
];
const emotionFamilies = [
  "frustration",
  "worry",
  "disappointment",
  "embarrassment",
  "guilt",
  "joy",
  "relief",
];
for (const [index, question] of addedEmotion.entries()) {
  question.meta = meta(
    "emotion",
    "latest_instance_past_month",
    "actual_event",
    { subject: "self", emotionFamily: emotionFamilies[index] },
  );
  QUESTIONS.push(question);
}
const addSignals = (question, rows) =>
  rows.forEach((items, index) => {
    question.options[index].signals = items.map(
      ([family, layer, value, label]) => ({ family, layer, value, label }),
    );
  });
addSignals(addedEmotion[0], [
  [
    ["frustration", "feeling", "present", "A flash of irritation"],
    ["frustration", "response", "direct", "Said what needed changing"],
  ],
  [
    ["frustration", "feeling", "high", "Properly angry"],
    ["frustration", "response", "pause", "Went quiet before deciding"],
  ],
  [
    ["frustration", "feeling", "low", "Mildly bothered"],
    ["frustration", "recovery", "reset", "Gave myself a reset"],
  ],
  [
    ["frustration", "feeling", "uncertain", "Felt stuck"],
    ["frustration", "response", "support", "Asked for help"],
  ],
]);
addSignals(addedEmotion[1], [
  [
    ["worry", "feeling", "present", "Felt uneasy"],
    ["worry", "response", "check_in", "Sent one check-in"],
  ],
  [
    ["worry", "feeling", "high", "Very worried"],
    ["worry", "response", "checking", "Checked the details"],
  ],
  [
    ["worry", "feeling", "low", "Did not feel especially worried"],
    ["worry", "response", "continue", "Carried on"],
  ],
  [
    ["worry", "feeling", "uncertain", "Felt uncertain"],
    ["worry", "recovery", "space", "Put the phone away"],
  ],
]);
addSignals(addedEmotion[2], [
  [
    ["disappointment", "feeling", "present", "Felt disappointed"],
    ["disappointment", "response", "reschedule", "Asked to reschedule"],
  ],
  [
    ["disappointment", "feeling", "present", "Felt sad"],
    ["disappointment", "recovery", "space", "Took the evening quietly"],
  ],
  [
    ["disappointment", "feeling", "low", "Barely bothered"],
    ["disappointment", "response", "adjust", "Made another plan"],
  ],
  [
    ["disappointment", "feeling", "present", "Felt let down"],
    ["disappointment", "response", "context", "Asked what changed"],
  ],
]);
addSignals(addedEmotion[3], [
  [
    ["embarrassment", "feeling", "present", "Felt embarrassed"],
    ["embarrassment", "response", "repair", "Corrected and laughed"],
  ],
  [
    ["embarrassment", "feeling", "high", "Intensely embarrassed"],
    ["embarrassment", "response", "pause", "Went quiet"],
  ],
  [
    ["embarrassment", "feeling", "low", "A little awkward"],
    ["embarrassment", "response", "continue", "Kept moving"],
  ],
  [
    ["embarrassment", "feeling", "present", "Felt embarrassed"],
    ["embarrassment", "recovery", "repair", "Apologized"],
  ],
]);
addSignals(addedEmotion[4], [
  [
    ["guilt", "feeling", "present", "Felt guilty"],
    ["guilt", "response", "repair", "Apologized"],
  ],
  [
    ["guilt", "feeling", "high", "Felt awful"],
    ["guilt", "recovery", "repair", "Offered a fix"],
  ],
  [
    ["guilt", "feeling", "low", "Felt a little guilty"],
    ["guilt", "response", "prevention", "Set a reminder"],
  ],
  [
    ["guilt", "feeling", "present", "Felt guilty"],
    ["guilt", "recovery", "pause", "Came back later"],
  ],
]);
addSignals(addedEmotion[5], [
  [
    ["joy", "feeling", "present", "Felt delighted"],
    ["joy", "response", "celebrate", "Called to celebrate"],
  ],
  [
    ["joy", "feeling", "present", "Felt excited"],
    ["joy", "response", "act", "Planned next step"],
  ],
  [
    ["joy", "feeling", "present", "Felt happy"],
    ["joy", "recovery", "savor", "Let it land"],
  ],
  [
    ["joy", "feeling", "present", "Felt pleased"],
    ["joy", "response", "express", "Said what it meant"],
  ],
]);
addSignals(addedEmotion[6], [
  [
    ["relief", "feeling", "present", "Felt relieved"],
    ["relief", "recovery", "rest", "Exhaled first"],
  ],
  [
    ["relief", "feeling", "present", "Relief arrived slowly"],
    ["relief", "recovery", "rest", "Rested"],
  ],
  [
    ["relief", "feeling", "present", "Felt relieved"],
    ["relief", "response", "connect", "Told the helper"],
  ],
  [
    ["relief", "feeling", "present", "Felt relieved"],
    ["relief", "response", "next_step", "Checked next step"],
  ],
]);

const addedHealth = [
  q(
    72,
    6,
    "Over the past month, how regular was your usual sleep timing?",
    "Count your ordinary pattern, including shifts or changing days.",
    [
      opt(
        "It changed a lot from day to day.",
        [],
        "Reports very irregular usual sleep timing.",
      ),
      opt(
        "It had a loose pattern.",
        [],
        "Reports partly regular usual sleep timing.",
      ),
      opt(
        "It was usually consistent.",
        [],
        "Reports usually regular sleep timing.",
      ),
      opt("It was very consistent.", [], "Reports very regular sleep timing."),
    ],
    { role: "context" },
  ),
  q(
    73,
    6,
    "In the last seven days, how regular was your sleep timing?",
    "Look at the actual week. Sleep timing gets its own report card here.",
    [
      opt(
        "It changed a lot from day to day.",
        [],
        "Reports very irregular recent sleep timing.",
      ),
      opt(
        "It had a loose pattern.",
        [],
        "Reports partly regular recent sleep timing.",
      ),
      opt(
        "It was usually consistent.",
        [],
        "Reports usually regular recent sleep timing.",
      ),
      opt(
        "It was very consistent.",
        [],
        "Reports very regular recent sleep timing.",
      ),
    ],
    { role: "context" },
  ),
  q(
    74,
    6,
    "Over the past month, how often did you notice body cues before deciding what to do?",
    "Cues can be hunger, tension, temperature, pain, or needing a break. Choose what fits your experience.",
    [
      opt(
        "I often noticed late or postponed them.",
        [],
        "Reports often postponing body cues.",
      ),
      opt(
        "I noticed some, depending on the day.",
        [],
        "Reports variable attention to body cues.",
      ),
      opt(
        "I usually noticed and responded.",
        [],
        "Reports usually attending to body cues.",
      ),
      opt(
        "I made room for them consistently.",
        [],
        "Reports consistent body-cue attention.",
      ),
    ],
    { role: "context" },
  ),
  q(
    75,
    6,
    "Over the past month, how did skin comfort or care show up in your routine?",
    "Skin comfort has its own notes. What did you notice or do?",
    [
      opt(
        "I rarely tracked it.",
        [],
        "Reports little routine attention to skin experience.",
      ),
      opt(
        "I noticed issues when they appeared.",
        [],
        "Reports reactive skin attention.",
      ),
      opt(
        "I had a small routine or check-in.",
        [],
        "Reports a regular skin-care attention pattern.",
      ),
      opt(
        "I tracked what helped my comfort.",
        [],
        "Reports active attention to skin comfort.",
      ),
    ],
    { role: "context" },
  ),
  q(
    76,
    6,
    "In the last seven days, how often did your energy feel enough for the day?",
    "Enough is your own threshold. Some days arrive with more battery than others.",
    [
      opt("Rarely.", [], "Reports low recent felt energy."),
      opt("Some days.", [], "Reports variable recent felt energy."),
      opt("Most days.", [], "Reports usually sufficient recent felt energy."),
      opt(
        "Nearly every day.",
        [],
        "Reports consistently sufficient recent felt energy.",
      ),
    ],
    { role: "context" },
  ),
  q(
    77,
    6,
    "Over the past month, on how many busy days did you remember a drink break?",
    "Use your own rough count. The drink-break department keeps imperfect minutes.",
    [
      opt(
        "Almost none.",
        [],
        "Reports remembering drink breaks on almost no busy days.",
      ),
      opt(
        "Some busy days.",
        [],
        "Reports remembering drink breaks on some busy days.",
      ),
      opt(
        "Most busy days.",
        [],
        "Reports remembering drink breaks on most busy days.",
      ),
      opt(
        "Nearly every busy day.",
        [],
        "Reports remembering drink breaks on nearly every busy day.",
      ),
    ],
    { role: "context" },
  ),
  q(
    78,
    6,
    "Is there optional health context you want to record for this conversation?",
    "Choose one context, or use Other for more than one. It stays a reported fact.",
    [
      opt(
        "Allergies or sensitivities.",
        [],
        "Reports an optional allergy or sensitivity context.",
        { healthContext: "allergies-or-sensitivities" },
      ),
      opt(
        "An existing condition or ongoing treatment.",
        [],
        "Reports an optional existing-condition context.",
        { healthContext: "existing-condition-or-treatment" },
      ),
      opt(
        "A cycle or recurring body pattern.",
        [],
        "Reports an optional recurring body pattern.",
        { healthContext: "cycle-or-recurring-pattern" },
      ),
      opt(
        "None of these, or I would rather not say.",
        [],
        "Reports no optional context for this attempt.",
        { healthContext: "none-or-prefer-not-to-say" },
      ),
    ],
    { role: "context" },
  ),
  q(
    97,
    6,
    "On your usual days this past month, how regular were your meal times?",
    "Think of the pattern that showed up most often, including days when the clock went rogue.",
    [
      opt("They varied a lot.", [], "Reports very varied usual meal timing."),
      opt(
        "They had a loose pattern.",
        [],
        "Reports partly regular usual meal timing.",
      ),
      opt(
        "They were usually predictable.",
        [],
        "Reports usually regular usual meal timing.",
      ),
      opt(
        "They were very predictable.",
        [],
        "Reports very regular usual meal timing.",
      ),
    ],
    { role: "context" },
  ),
  q(
    98,
    6,
    "In the last seven days, how did your meal timing hold up?",
    "Look at the actual week, with its meetings, errands, and suspiciously late snacks.",
    [
      opt(
        "It changed from day to day.",
        [],
        "Reports very varied recent meal timing.",
      ),
      opt(
        "It had a loose pattern.",
        [],
        "Reports partly regular recent meal timing.",
      ),
      opt(
        "It was predictable most days.",
        [],
        "Reports usually regular recent meal timing.",
      ),
      opt(
        "It was very predictable.",
        [],
        "Reports very regular recent meal timing.",
      ),
    ],
    { role: "context" },
  ),
  q(
    99,
    6,
    "On your usual days this past month, how often did your energy feel enough for the day?",
    "Use your own threshold for enough. Your ordinary battery has the deciding vote.",
    [
      opt("Rarely.", [], "Reports low usual felt energy."),
      opt("Some days.", [], "Reports variable usual felt energy."),
      opt("Most days.", [], "Reports usually sufficient usual felt energy."),
      opt(
        "Nearly every day.",
        [],
        "Reports consistently sufficient usual felt energy.",
      ),
    ],
    { role: "context" },
  ),
  q(
    100,
    6,
    "Over the past month, how often did your usual sleep leave you feeling restored?",
    "Think of the ordinary pattern, not the one heroic night that arrived with a cape.",
    [
      opt("Rarely restored.", [], "Reports low usual sleep restoration."),
      opt(
        "Restored on some days.",
        [],
        "Reports variable usual sleep restoration.",
      ),
      opt(
        "Restored most days.",
        [],
        "Reports usually sufficient usual sleep restoration.",
      ),
      opt(
        "Every day or nearly every day.",
        [],
        "Reports consistently sufficient usual sleep restoration.",
      ),
    ],
    { role: "context" },
  ),
  q(
    101,
    6,
    "During a typical week in the past month, on how many days did you deliberately get some movement?",
    "Count movement that works for your body, from a walk to a wheelchair workout to an excellent stretch.",
    [
      opt("Zero days.", [], "Reports rare usual movement."),
      opt("One or two days.", [], "Reports occasional usual movement."),
      opt("Three or four days.", [], "Reports frequent usual movement."),
      opt("Five to seven days.", [], "Reports very frequent usual movement."),
    ],
    { role: "context" },
  ),
  q(
    102,
    6,
    "In the last seven days, how often did sleep leave you feeling restored?",
    "Think of the actual week, including the night your pillow became a negotiation partner.",
    [
      opt("Rarely restored.", [], "Reports low recent sleep restoration."),
      opt(
        "Restored on some days.",
        [],
        "Reports variable recent sleep restoration.",
      ),
      opt(
        "Restored most days.",
        [],
        "Reports usually sufficient recent sleep restoration.",
      ),
      opt(
        "Every day or nearly every day.",
        [],
        "Reports consistently sufficient recent sleep restoration.",
      ),
    ],
    { role: "context" },
  ),
];
const healthDefs = {
  q72: ["sleep_regularity", "past_month"],
  q73: ["sleep_regularity", "last_7_days"],
  q74: ["body_attention", "past_month"],
  q75: ["skin_attention", "past_month"],
  q76: ["felt_energy", "last_7_days"],
  q77: ["hydration_cues", "past_month"],
  q97: ["meal_regularity", "past_month"],
  q98: ["meal_regularity", "last_7_days"],
  q99: ["felt_energy", "past_month"],
  q100: ["sleep_restoration", "past_month"],
  q101: ["movement_consistency", "past_month"],
  q102: ["sleep_restoration", "last_7_days"],
};
for (const question of addedHealth) {
  const definition = healthDefs[question.id];
  question.chapter = ["q72", "q73", "q76", "q100", "q102"].includes(question.id)
    ? 7
    : 6;
  question.meta = definition
    ? meta("health", definition[1], "self_report", {
        subject: "self",
        measure: definition[0],
      })
    : meta("health", null, "self_report", { subject: "self", optional: true });
  QUESTIONS.push(question);
}
for (const [id, counterpart] of [
  ["q72", "q73"],
  ["q73", "q72"],
  ["q76", "q99"],
  ["q99", "q76"],
  ["q97", "q98"],
  ["q98", "q97"],
  ["q100", "q102"],
  ["q102", "q100"],
  ["q101", "q46"],
  ["q46", "q101"],
]) {
  const question = QUESTIONS.find((item) => item.id === id);
  question.meta = { ...question.meta, counterpart };
}
const healthMeasureLabels = {
  q72: [
    "It changed a lot from day to day.",
    "It had a loose pattern.",
    "It was usually consistent.",
    "It was very consistent.",
  ],
  q73: [
    "It changed a lot from day to day.",
    "It had a loose pattern.",
    "It was usually consistent.",
    "It was very consistent.",
  ],
  q74: [
    "I often noticed late or postponed them.",
    "I noticed some, depending on the day.",
    "I usually noticed and responded.",
    "I made room for them consistently.",
  ],
  q75: [
    "I rarely tracked it.",
    "I noticed issues when they appeared.",
    "I had a small routine or check-in.",
    "I tracked what helped my comfort.",
  ],
  q76: ["Rarely.", "Some days.", "Most days.", "Nearly every day."],
  q77: [
    "Almost none.",
    "Some busy days.",
    "Most busy days.",
    "Nearly every busy day.",
  ],
  q97: [
    "They varied a lot.",
    "They had a loose pattern.",
    "They were usually predictable.",
    "They were very predictable.",
  ],
  q98: [
    "It changed from day to day.",
    "It had a loose pattern.",
    "It was predictable most days.",
    "It was very predictable.",
  ],
  q99: ["Rarely.", "Some days.", "Most days.", "Nearly every day."],
  q100: [
    "Rarely restored.",
    "Restored on some days.",
    "Restored most days.",
    "Every day or nearly every day.",
  ],
  q101: [
    "Zero days.",
    "One or two days.",
    "Three or four days.",
    "Five to seven days.",
  ],
  q102: [
    "Rarely restored.",
    "Restored on some days.",
    "Restored most days.",
    "Every day or nearly every day.",
  ],
};
const healthMeasureIds = {
  q72: "sleep_regularity",
  q73: "sleep_regularity",
  q74: "body_attention",
  q75: "skin_attention",
  q76: "felt_energy",
  q77: "hydration_cues",
  q97: "meal_regularity",
  q98: "meal_regularity",
  q99: "felt_energy",
  q100: "sleep_restoration",
  q101: "movement_consistency",
  q102: "sleep_restoration",
};
for (const [id, labels] of Object.entries(healthMeasureLabels))
  labels.forEach((label, index) => {
    const option = QUESTIONS.find((question) => question.id === id).options[
      index
    ];
    option.measures = [{ id: healthMeasureIds[id], value: index, label }];
  });

const sleepDirect = [
  q(
    94,
    3,
    "What time do you usually wake up?",
    "Use your ordinary past-month pattern.",
    [
      opt("Before 6 a.m.", [], "Reports an earlier usual wake-time band.", {
        wake: "before 06:00",
      }),
      opt("6 to 8 a.m.", [], "Reports a middle usual wake-time band.", {
        wake: "06:00-08:00",
      }),
      opt("8 to 9 a.m.", [], "Reports a later usual wake-time band.", {
        wake: "08:00-09:00",
      }),
      opt("After 9 a.m.", [], "Reports a later usual wake-time band.", {
        wake: "after 09:00",
      }),
      opt(
        "It varies too much for one band.",
        [],
        "Reports a variable usual wake-time pattern.",
        { wake: "variable" },
      ),
    ],
    { role: "context" },
  ),
  q(
    95,
    3,
    "How long do you usually sleep?",
    "Think of your ordinary past-month pattern.",
    [
      opt(
        "Under 6 hours.",
        [],
        "Reports a shorter usual sleep-duration band.",
        { sleepDuration: "under-6-hours" },
      ),
      opt(
        "6 to under 7 hours.",
        [],
        "Reports a middle-short usual sleep-duration band.",
        { sleepDuration: "6-to-under-7-hours" },
      ),
      opt(
        "7 to under 9 hours.",
        [],
        "Reports a middle usual sleep-duration band.",
        { sleepDuration: "7-to-under-9-hours" },
      ),
      opt(
        "9 hours or more.",
        [],
        "Reports a longer usual sleep-duration band.",
        { sleepDuration: "9-hours-or-more" },
      ),
      opt(
        "It varies too much for one band.",
        [],
        "Reports a variable usual sleep-duration pattern.",
        { sleepDuration: "variable" },
      ),
    ],
    { role: "context" },
  ),
];
sleepDirect.push(
  q(
    96,
    7,
    "Think of the latest night this month when an optional task competed with sleep.",
    "Choose “No example to use” if this has not happened in the past month. What did you actually do?",
    [
      opt(
        "Stopped and went to sleep.",
        [tag("D14a", "protect"), tag("D14d", "rest")],
        "You report protecting sleep.",
      ),
      opt(
        "Finished the task and slept later.",
        [tag("D14a", "delay"), tag("D14d", "obligation")],
        "You report delaying sleep for an optional task.",
      ),
      opt(
        "Moved the task or changed tomorrow.",
        [tag("D14a", "adjust"), tag("D3", "plan")],
        "You report adjusting the plan to protect sleep.",
      ),
      opt(
        "Asked someone how they handle a night like that.",
        [tag("D14d", "connection")],
        "You report seeking a practical way through the situation.",
      ),
    ],
    { role: "actual" },
  ),
);
for (const question of sleepDirect) {
  question.chapter = question.id === "q96" ? 7 : 2;
  question.meta =
    question.id === "q96"
      ? meta("health", "latest_instance_past_month", "actual_event", {
          subject: "self",
          measure: "sleep_interference",
        })
      : meta("health", "past_month", "self_report", {
          subject: "self",
          measure: question.id === "q94" ? "sleep_wake" : "sleep_duration",
        });
  QUESTIONS.push(question);
}

// Generic equivalents are used when the selected close person or household
// does not exist. They retain the same D-tag construct with a general target.
const generic = (id, sourceId, role = null, test = false) => {
  const original = QUESTIONS.find((question) => question.id === sourceId);
  const options = original.options.map((option) => ({
    ...option,
    text: option.text.replaceAll("{close}", "someone important"),
    ...(HOST_REACTIONS[sourceId]?.[option.id]
      ? { reaction: HOST_REACTIONS[sourceId][option.id] }
      : {}),
    tags: (option.tags || []).map((tagValue) => ({
      ...tagValue,
      target:
        tagValue.target === "close" || tagValue.target === "household"
          ? "general"
          : tagValue.target,
    })),
  }));
  const question = {
    ...original,
    id: `q${id}`,
    applicable: undefined,
    title: original.title.replaceAll("{close}", "someone important"),
    setup: original.setup.replaceAll("{close}", "someone important"),
    options,
  };
  if (role) question.role = role;
  if (test) question.test = true;
  question.meta = meta(
    test ? "personality" : original.meta?.domain || "personality",
    test ? "scenario" : original.meta?.window || "scenario",
    test ? "hypothetical" : original.meta?.evidence || "hypothetical",
    { subject: "general" },
  );
  return question;
};
const householdFallback = q(
  82,
  2,
  "A shared project workload needs a fair plan.",
  "The project has one deadline and several people with different capacity.",
  [
    opt(
      "Name the contributions and split the work.",
      [tag("D8", "proportional"), tag("D7", "direct")],
      "You map contributions and renegotiate the work.",
    ),
    opt(
      "Send a private message about my share.",
      [tag("D8", "proportional"), tag("D7", "soften")],
      "You raise the workload privately.",
    ),
    opt(
      "Take the extra work to keep it moving.",
      [tag("D8", "absorb")],
      "You absorb the extra effort.",
    ),
    opt(
      "State what I can do and stop there.",
      [tag("D8", "limit")],
      "You set a capacity limit.",
    ),
  ],
);
householdFallback.meta = meta("personality", "scenario", "hypothetical", {
  subject: "self",
});
const genericFallbacks = [
  generic(81, "q10"),
  householdFallback,
  generic(83, "q18"),
  generic(84, "q19"),
  generic(85, "q21"),
  generic(86, "q22"),
  generic(87, "q23"),
  generic(88, "q24"),
  generic(89, "q29"),
  generic(90, "q30"),
  generic(91, "q53"),
  generic(92, "q58", "holdout", true),
  generic(93, "q62", "holdout", true),
];
QUESTIONS.push(...genericFallbacks);
for (const question of QUESTIONS) {
  const reactions = HOST_REACTIONS[question.id];
  if (reactions)
    for (const option of question.options)
      if (reactions[option.id]) option.reaction = reactions[option.id];
}
// These legacy scenes are superseded by direct, literal candidates above.
// Removing them keeps QUESTIONS an auditable routed bank rather than an archive.
const retiredIds = new Set([
  "q11",
  "q12",
  "q14",
  "q25",
  "q26",
  "q27",
  "q28",
  "q34",
  "q35",
  "q36",
  "q37",
  "q38",
  "q39",
  "q40",
  "q48",
  "q49",
  "q50",
  "q51",
  "q52",
  "q53",
  "q54",
  "q55",
  "q56",
  "q91",
]);
for (let index = QUESTIONS.length - 1; index >= 0; index -= 1)
  if (retiredIds.has(QUESTIONS[index].id)) QUESTIONS.splice(index, 1);

const train = [
  ["q01"],
  ["q02"],
  ["q03"],
  ["q04"],
  ["q05"],
  ["q06"],
  ["q07"],
  ["q08"],
  ["q09"],
  ["q10", "q81"],
  ["q94"],
  ["q13"],
  ["q95"],
  ["q15", "q82"],
  ["q16"],
  ["q17"],
  ["q18", "q83"],
  ["q19", "q84"],
  ["q20"],
  ["q21", "q85"],
  ["q22", "q86"],
  ["q23", "q87"],
  ["q24", "q88"],
  ["q29", "q89"],
  ["q30", "q90"],
  ["q31"],
  ["q32"],
  ["q65"],
  ["q66"],
  ["q67"],
  ["q68"],
  ["q69"],
  ["q70"],
  ["q71"],
  ["q33"],
  ["q41"],
  ["q42"],
  ["q43"],
  ["q44"],
  ["q45"],
  ["q46"],
  ["q47"],
  ["q74"],
  ["q75"],
  ["q77"],
  ["q78"],
  ["q97"],
  ["q98"],
  ["q99"],
  ["q101"],
  ["q72"],
  ["q73"],
  ["q76"],
  ["q100"],
  ["q102"],
  ["q96"],
];
const checks = [
  ["q57"],
  ["q58", "q92"],
  ["q59"],
  ["q60"],
  ["q61"],
  ["q62", "q93"],
  ["q63"],
  ["q64"],
];
export const ROUTE_SLOTS = [...train, ...checks].map((candidates, index) => ({
  id: `slot-${String(index + 1).padStart(2, "0")}`,
  candidates,
}));
for (const slot of ROUTE_SLOTS)
  for (const questionId of slot.candidates) {
    const question = QUESTIONS.find((item) => item.id === questionId);
    if (question) question.meta = { ...question.meta, slot: slot.id };
  }
applyEnglishCopy(QUESTIONS);

export const QUESTIONS_BY_ID = Object.fromEntries(
  QUESTIONS.map((question) => [question.id, question]),
);
