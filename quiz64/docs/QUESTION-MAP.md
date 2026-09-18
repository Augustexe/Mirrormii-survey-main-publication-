# Genii Switch Modes v3 — question and evidence map

Version: `genii-switch-modes.v3` · 32 profile/context candidates + 8 sealed checks · 36–40 respondent questions.

This is the implemented v3 map. The v2 experimental bank remains frozen in project context. Visual layout and styles are unchanged.

## Output contract

- Opening route, goal, and tone fields are direct facts, never scored traits.
- Linked action/motive answers stay one event and do not create two independent supports.
- Routine measures are direct typed projections; variable/Other/Skip remain unknown.
- Claims retain scope, alternatives, next validation, and exact answer receipts.
- Checks freeze after training and never update the portrait.

## n01 · slot-01

**What has been taking up the most room in your head lately?**

Pick the closest answer. This guides the conversation; it is not a diagnosis.

- Role: `self_report`
- Window: `current`
- Target: `self`
- Domain/facet: `conversation_route`
- Claim limit: A selected topic is not a diagnosis, trait, or proof of a problem.

Options:
- **a.** Friends and where I fit — literal/context only
- **b.** Work, school, or what comes next — literal/context only
- **c.** Dating or family stuff — literal/context only
- **d.** My routines, energy, or body — literal/context only
- **e.** Something else, or I can't name it yet — literal/context only

## n02 · slot-02

**Which sounds closest to your social life these days?**

Pick the closest answer. This guides the conversation; it is not a diagnosis.

- Role: `self_report`
- Window: `current`
- Target: `self_and_social_circle`
- Domain/facet: `social_context`
- Claim limit: Does not establish loneliness, belonging insecurity, or relationship quality.

Options:
- **a.** I see people often and feel known by at least a few — literal/context only
- **b.** I see people often, but still edit parts of myself — literal/context only
- **c.** I have a small circle and that mostly suits me — literal/context only
- **d.** My people-time has been changing lately — literal/context only
- **e.** I don't get many local chances to connect, and I'd like more — literal/context only
- **f.** None of these quite fits — literal/context only

## n03 · slot-03

**If this chat got one thing right about you, what would you want it to help with?**

Pick the closest answer. This guides the conversation; it is not a diagnosis.

- Role: `self_report`
- Window: `current`
- Target: `self`
- Domain/facet: `chosen_goal`
- Claim limit: A desired kind of help is not evidence that the person needs or received it.

Options:
- **a.** Help me understand a pattern I keep repeating — literal/context only
- **b.** Help me put words to what I feel — literal/context only
- **c.** Help me decide what to do next — literal/context only
- **d.** Give me a funny, weirdly accurate read — literal/context only
- **e.** I don't have a specific goal — literal/context only

## n04 · slot-04

**Optional, and you can keep it broad: is there something you feel a bit tender or unsure about lately?**

Pick the closest answer. This guides the conversation; it is not a diagnosis.

- Role: `self_report`
- Window: `current`
- Target: `self`
- Domain/facet: `optional_tender_topic`
- Claim limit: Do not infer universal insecurity, pathology, or a stable self-esteem trait.

Options:
- **a.** How I come across to people — literal/context only
- **b.** Whether I am doing enough or keeping up — literal/context only
- **c.** A choice or goal I care about — literal/context only
- **d.** Something else — literal/context only
- **e.** I'd rather not say, or nothing comes to mind — literal/context only

## n05 · slot-05

**Would you want an optional feature where you invite one chosen friend to guess or gently challenge one of your reads? Nothing would be shared unless you chose to invite them.**

Pick the closest answer. This guides the conversation; it is not a diagnosis.

- Role: `self_report`
- Window: `current`
- Target: `self_and_chosen_friend`
- Domain/facet: `consensual_friend_challenge`
- Claim limit: Does not establish relationship trust or sharing consent.

Options:
- **a.** Yes, that sounds fun — literal/context only
- **b.** Maybe, after I see my own read — literal/context only
- **c.** No, keep this just for me — literal/context only
- **d.** Not sure yet — literal/context only

## n06 · slot-06

**If Genii checks whether a read fits, what approach would feel right to you?**

Pick the closest answer. This guides the conversation; it is not a diagnosis.

- Role: `self_report`
- Window: `current`
- Target: `self`
- Domain/facet: `fit_feedback_tone_and_permission`
- Claim limit: Does not establish agreement, disagreement, or current fit of any interpretation.

Options:
- **a.** Ask gently and keep it brief — literal/context only
- **b.** Be direct; I'll tell you whether it fits — literal/context only
- **c.** Keep it playful, but let me say what missed — literal/context only
- **d.** Ask permission before opening feedback — literal/context only

## n07 · slot-07

**A social invitation arrived, and your enthusiasm did not RSVP at the same speed. Thinking of the latest example this past month, what did you actually do?**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `friends_or_group`
- Domain/facet: `social_purpose_vs_enjoyment`
- Claim limit: Purpose and enjoyment are separate; neither attendance nor refusal establishes sociability, selfishness, or people-pleasing.

Options:
- **a.** Attended as planned — D_MODE:join@social
- **b.** Joined for part of it — D_MODE:partial@social
- **c.** Suggested a different way to take part — D_MODE:reshape@social
- **d.** Declined and let them know — D_MODE:decline@social

## n08 · slot-08

**What mattered most in that choice?**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `same_friends_or_group`
- Domain/facet: `social_motive`
- Claim limit: Direct motive report for one event, not a hidden motive diagnosis.
- Follow-up predicate: authored `n07` answer only

Options:
- **a.** I was looking forward to it — D_MOTIVE:enjoyment@social
- **b.** I cared about the occasion's purpose — D_MOTIVE:purpose@social
- **c.** I wanted time with those people — D_MOTIVE:company@social
- **d.** My time, energy, or other plans decided it — D_MOTIVE:capacity@social
- **e.** Avoiding tension mattered most — D_MOTIVE:avoid_tension@social
- **f.** Something else — literal/context only

## n09 · slot-09

**A close friend asks you to come along to a low-key thing. You like them, but the event itself is not your scene. What's your move?**

Choose what you would most likely do; this is an intention, not proof of past behavior.

- Role: `hypothetical`
- Window: `scenario`
- Target: `close_friend`
- Domain/facet: `friend_context_shift`
- Claim limit: Does not establish what the respondent does in real events.

Options:
- **a.** Go; the friend is the good part — D_MODE:join@social, D_SUPPORT:show_up@relationship
- **b.** Suggest something we'd both enjoy — D_MODE:reshape@social, D_SUPPORT:alternative@relationship
- **c.** Pass kindly; liking them doesn't make every plan my plan — D_MODE:decline@social, D_SUPPORT:decline@relationship
- **d.** Ask what they need from me before deciding — D_MODE:clarify@social, D_SUPPORT:clarify@relationship

## n10 · slot-10

**Same low-key event, but the person asking is someone you know only a little. What would you most likely do?**

Choose what you would most likely do; this is an intention, not proof of past behavior.

- Role: `hypothetical`
- Window: `scenario`
- Target: `acquaintance_or_newer_friend`
- Domain/facet: `accompaniment_context_shift`
- Claim limit: Difference from n09 may reflect event comfort, not a global closeness trait.

Options:
- **a.** Go; trying the event sounds fine — D_MODE:join@social
- **b.** Ask for details, then decide — D_MODE:clarify@social
- **c.** Suggest another way to hang out — D_MODE:reshape@social
- **d.** Pass; the event isn't for me — D_MODE:decline@social

## n11 · slot-11

**In the past month, think of a recent moment when you contributed to something other people would notice. What did you most want from it?**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `work_school_or_group`
- Domain/facet: `recognition_motive`
- Claim limit: Wanting credit or visibility is not proof of insecurity, vanity, or narcissism.

Options:
- **a.** The thing itself going well — D_RECOGNITION:outcome@work
- **b.** People knowing I helped — D_RECOGNITION:claim_credit@work
- **c.** A chance to show what I can do — D_RECOGNITION:show_skill@work
- **d.** I wasn't looking for anything in particular — D_RECOGNITION:none_specific@work

## n12 · slot-12

**Think of a recent time this month someone around you got praise for something you also care about. Your inner scoreboard might wake up. What did you actually do next?**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `peer_or_comparison_group`
- Domain/facet: `recognition_comparison`
- Claim limit: A single action does not imply envy, competitiveness, or insecurity.

Options:
- **a.** Congratulated them — D_RECOGNITION:congratulate@work
- **b.** Asked how they got the opportunity — D_RECOGNITION:learn_process@work
- **c.** Made my own contribution visible — D_RECOGNITION:claim_credit@work
- **d.** Returned to what I was working on — D_RECOGNITION:return_to_task@work

## n13 · slot-13

**Think of the latest criticism you received this month. Before deciding whether it was fair, what did you do first?**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `critic_or_feedback_source`
- Domain/facet: `response_to_credible_criticism`
- Claim limit: Does not measure openness, resilience, or establish that every criticism was accurate.

Options:
- **a.** Asked what they meant or for an example — D_CRITICISM:clarify@feedback
- **b.** Explained my side — D_CRITICISM:explain@feedback
- **c.** Took time before responding — D_CRITICISM:pause@feedback
- **d.** Looked for one part I could use — D_CRITICISM:revise@feedback

## n14 · slot-14

**In the past month, was there a moment you realized something you said or did landed badly with someone? What happened next? The tiny repair department is open.**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `person_affected`
- Domain/facet: `repair_after_impact`
- Claim limit: A single repair episode does not establish empathy, fault, or relationship outcome.

Options:
- **a.** I checked in and tried to make it right — D_REPAIR:check_in@relationship
- **b.** I explained what I meant — D_REPAIR:explain@relationship
- **c.** I gave them space and came back later — D_REPAIR:space_return@relationship
- **d.** I wasn't sure what to do — D_REPAIR:uncertain@relationship

## n15 · slot-15

**Think of a recent time this month a particular person's reply mattered to you and took longer than you'd hoped. What did you actually do while waiting? You do not need to name them.**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `person_whose_reply_mattered_to_respondent`
- Domain/facet: `chosen_person_reply_context`
- Claim limit: A wait response alone does not imply attachment style, rejection fear, or the other person's intent.

Options:
- **a.** Sent one follow-up message — D_REPLY:follow_up@relationship
- **b.** Waited without checking the chat — D_REPLY:wait@relationship
- **c.** Checked the chat or their status — D_REPLY:check@relationship
- **d.** Couldn't tell what I did — D_REPLY:unsure@relationship

## n16 · slot-16

**In the past month, when you wanted something from a person whose opinion mattered to you, how did you let them know?**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `person_whose_response_was_wanted`
- Domain/facet: `need_expression`
- Claim limit: Does not establish a universal communication style or the reason for withholding.

Options:
- **a.** Said what I wanted plainly — D_NEED:direct@relationship
- **b.** Hinted or waited to see if they'd notice — D_NEED:hint@relationship
- **c.** Tried to handle it myself — D_NEED:self_handle@relationship
- **d.** Decided it wasn't worth bringing up — D_NEED:withhold@relationship

## n17 · slot-17

**Think of the latest time someone offered you practical help this month. Did you take the assist?**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `person_offering_help`
- Domain/facet: `receiving_help`
- Claim limit: One response does not show dependency, independence, or comfort with all help.

Options:
- **a.** Accepted it — D_RECEIVE:accept@support
- **b.** Accepted after talking through the details — D_RECEIVE:clarify_accept@support
- **c.** Declined and handled it myself — D_RECEIVE:decline@support
- **d.** Declined but asked for a different kind of support — D_RECEIVE:redirect@support

## n18 · slot-18

**After a recent awkward conversation this month, once you had said your piece, what happened next for you?**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `self_after_explanation`
- Domain/facet: `recovery_after_explanation`
- Claim limit: Does not establish emotional regulation or recovery time unless directly measured elsewhere.

Options:
- **a.** We talked again and understood each other better — D_RECOVERY:talk_again@relationship
- **b.** I took time away from the conversation — D_RECOVERY:take_time@relationship
- **c.** I talked it through with someone else — D_RECOVERY:talk_elsewhere@relationship
- **d.** I focused on another activity — D_RECOVERY:activity@relationship
- **e.** I kept turning it over in my head — D_RECOVERY:replay@relationship

## n19 · slot-19

**In the past month, think of a request for help that competed with your time or energy. Your calendar is a witness. What did you do?**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `requester`
- Domain/facet: `helping_boundary`
- Claim limit: Saying no is not selfishness; saying yes is not proof of generosity or coercion.

Options:
- **a.** Helped, even though it squeezed my own plan — D_BOUNDARY:full_help@capacity
- **b.** Helped in a smaller way I could manage — D_BOUNDARY:limited_help@capacity
- **c.** Offered another time or person — D_BOUNDARY:reschedule@capacity
- **d.** Said no — D_BOUNDARY:decline@capacity

## n20 · slot-20

**What mattered most in that choice, whether you helped or not?**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `same_requester`
- Domain/facet: `helping_motive`
- Claim limit: Directly reported motive for one event; not a moral judgment.
- Follow-up predicate: authored `n19` answer only

Options:
- **a.** I wanted to help that person — D_HELP_MOTIVE:care@capacity
- **b.** It felt like the right thing to do — D_HELP_MOTIVE:principle@capacity
- **c.** My available time or energy set the limit — D_HELP_MOTIVE:capacity@capacity
- **d.** I felt pressure or found it hard to refuse — D_HELP_MOTIVE:pressure@capacity
- **e.** Something else — literal/context only

## n21 · slot-21

**For a shared plan or task you cared about this month, what role did you actually take?**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `shared_task_or_plan`
- Domain/facet: `control_and_delegation`
- Claim limit: Organizing does not imply controlling; adapting does not imply passivity.

Options:
- **a.** Set the plan and kept track of the pieces — D_ROLE:organize@group
- **b.** Took one piece and let others handle theirs — D_ROLE:own_piece@group
- **c.** Asked what others wanted before choosing a role — D_ROLE:invite_input@group
- **d.** Stayed flexible and adjusted as we went — D_ROLE:adapt@group

## n22 · slot-22

**Thinking about that shared plan: did it change, and if so, what did you do first?**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `same_group_or_plan`
- Domain/facet: `response_to_changed_plan`
- Claim limit: One changed plan does not establish rigidity or flexibility as a trait.
- Follow-up predicate: authored `n21` answer only

Options:
- **a.** Worked out the new details — D_CHANGE:replan@group
- **b.** Said what part was frustrating or inconvenient — D_CHANGE:state_impact@group
- **c.** Went with it and adjusted on the fly — D_CHANGE:adapt@group
- **d.** Asked to keep the original plan — D_CHANGE:keep_original@group
- **e.** The plan didn't change — D_CHANGE:no_change@group

## n23 · slot-23

**Think of a recent moment this month you felt irritated with someone. What did you show on the outside?**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `self_and_interaction_partner`
- Domain/facet: `inner_feeling_vs_outward_action`
- Claim limit: A quiet exterior is not evidence of low intensity or calmness.

Options:
- **a.** I said I was irritated — D_EXPRESSION:name_it@emotion · frustration/response:name_it
- **b.** I stayed polite and dealt with it later — D_EXPRESSION:polite_later@emotion · frustration/response:polite_later
- **c.** It came out in my tone or actions — D_EXPRESSION:showed@emotion · frustration/response:showed
- **d.** I stepped away — D_EXPRESSION:step_away@emotion · frustration/response:step_away

## n24 · slot-24

**How strong did the irritation feel inside at the time?**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `self`
- Domain/facet: `inner_feeling_intensity`
- Claim limit: Retrospective self-rating for one event, not a stable emotional-intensity scale.
- Follow-up predicate: authored `n23` answer only

Options:
- **a.** A small flicker — D_INTENSITY:low@emotion · frustration/feeling:low
- **b.** Noticeable, but manageable — D_INTENSITY:medium@emotion · frustration/feeling:medium
- **c.** Strong; it took up real space — D_INTENSITY:high@emotion · frustration/feeling:high
- **d.** Hard to tell now — D_INTENSITY:unsure@emotion · frustration/feeling:unsure

## n25 · slot-25

**This month, when a decision felt uncertain but reversible, what did you actually do?**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `self_and_decision`
- Domain/facet: `chosen_risk_control`
- Claim limit: Does not establish decisiveness, anxiety, or control in other stakes.

Options:
- **a.** Picked a direction and tried it — D_UNCERTAINTY:try@decision
- **b.** Got one or two more details first — D_UNCERTAINTY:check@decision
- **c.** Asked someone I trust what they thought — D_UNCERTAINTY:consult@decision
- **d.** Waited until it felt clearer — D_UNCERTAINTY:wait@decision

## n26 · slot-26

**If a goal you cared about slipped behind schedule this month, what did you do next?**

Use the latest real example from the past month. No example, Other, and Skip stay separate.

- Role: `actual_event`
- Window: `latest_instance_past_month`
- Target: `self_and_goal`
- Domain/facet: `goal_response`
- Claim limit: Does not establish motivation or ability from one goal episode.

Options:
- **a.** Made the next step smaller — D_GOAL:shrink_step@goal
- **b.** Put in extra time to catch up — D_GOAL:extra_effort@goal
- **c.** Changed the plan or deadline — D_GOAL:revise@goal
- **d.** Paused to figure out what was getting in the way — D_GOAL:diagnose@goal

## n27 · slot-27

**Over the past month, how often did your usual sleep leave you feeling restored when you woke up?**

A direct report, not a health score. Variation is a real answer.

- Role: `self_report`
- Window: `past_month`
- Target: `self`
- Domain/facet: `sleep_restoration_usual`
- Claim limit: Do not infer duration, adequacy, cause, or medical status.

Options:
- **a.** Most mornings — literal/context only · sleep_restoration=3 (Most mornings)
- **b.** Some mornings — literal/context only · sleep_restoration=2 (Some mornings)
- **c.** Not often — literal/context only · sleep_restoration=1 (Not often)
- **d.** It varied too much to say — literal/context only

## n28 · slot-28

**And over just the last seven days, how often did sleep leave you feeling restored when you woke up?**

A direct report, not a health score. Variation is a real answer.

- Role: `self_report`
- Window: `last_7_days`
- Target: `self`
- Domain/facet: `sleep_restoration_recent`
- Claim limit: No sleep cause, duration, or clinical conclusion.

Options:
- **a.** Most mornings — literal/context only · sleep_restoration=3 (Most mornings)
- **b.** Some mornings — literal/context only · sleep_restoration=2 (Some mornings)
- **c.** Not often — literal/context only · sleep_restoration=1 (Not often)
- **d.** It varied too much to say — literal/context only

## n29 · slot-29

**Over the past month, how steady was your usual meal timing from day to day?**

A direct report, not a health score. Variation is a real answer.

- Role: `self_report`
- Window: `past_month`
- Target: `self`
- Domain/facet: `meal_regular_usual`
- Claim limit: Do not infer eating disorder, adequacy, body state, or health cause.

Options:
- **a.** Mostly steady — literal/context only · meal_regularity=3 (Mostly steady)
- **b.** Some days steady, some not — literal/context only · meal_regularity=2 (Some days steady, some not)
- **c.** Often shifted around — literal/context only · meal_regularity=1 (Often shifted around)
- **d.** My days varied too much for a usual pattern — literal/context only

## n30 · slot-30

**And over just the last seven days, how steady was your meal timing from day to day?**

A direct report, not a health score. Variation is a real answer.

- Role: `self_report`
- Window: `last_7_days`
- Target: `self`
- Domain/facet: `meal_regular_recent`
- Claim limit: No diet-quality, adequacy, medical, or causal claim.

Options:
- **a.** Mostly steady — literal/context only · meal_regularity=3 (Mostly steady)
- **b.** Some days steady, some not — literal/context only · meal_regularity=2 (Some days steady, some not)
- **c.** Often shifted around — literal/context only · meal_regularity=1 (Often shifted around)
- **d.** My days varied too much for a usual pattern — literal/context only

## n31 · slot-31

**Over the past month, how often did you have enough energy for the things you wanted or needed to do?**

A direct report, not a health score. Variation is a real answer.

- Role: `self_report`
- Window: `past_month`
- Target: `self`
- Domain/facet: `daytime_energy_usual`
- Claim limit: No medical, sleep, nutrition, or mental-health cause inferred.

Options:
- **a.** Most days — literal/context only · daytime_energy=3 (Most days)
- **b.** Some days — literal/context only · daytime_energy=2 (Some days)
- **c.** Not often — literal/context only · daytime_energy=1 (Not often)
- **d.** It depended too much on the day to say — literal/context only

## n32 · slot-32

**And over just the last seven days, how often did you have enough energy for the things you wanted or needed to do?**

A direct report, not a health score. Variation is a real answer.

- Role: `self_report`
- Window: `last_7_days`
- Target: `self`
- Domain/facet: `daytime_energy_recent`
- Claim limit: No medical, sleep, nutrition, or mental-health cause inferred.

Options:
- **a.** Most days — literal/context only · daytime_energy=3 (Most days)
- **b.** Some days — literal/context only · daytime_energy=2 (Some days)
- **c.** Not often — literal/context only · daytime_energy=1 (Not often)
- **d.** It depended too much on the day to say — literal/context only

## h01 · slot-33 · sealed check

**Your group has already picked a restaurant you don't care about, but you'd enjoy the company. What's your likeliest move?**

Your answer stays outside the portrait that made this prediction.

- Role: `hypothetical`
- Window: `scenario`
- Target: `friend_group`
- Domain/facet: `social_purpose_vs_enjoyment`
- Claim limit: No inference about actual event behavior; check answer must not update the frozen profile.

Options:
- **a.** Go for the people — D_MODE:join@social
- **b.** Suggest a place I'd also enjoy — D_MODE:reshape@social
- **c.** Join for part of it — D_MODE:partial@social
- **d.** Skip this one — D_MODE:decline@social

## h02 · slot-34 · sealed check

**A close friend is nervous about giving a short talk and asks you to sit in the audience. What would you most likely do?**

Your answer stays outside the portrait that made this prediction.

- Role: `hypothetical`
- Window: `scenario`
- Target: `close_friend`
- Domain/facet: `friend_accompaniment_context`
- Claim limit: Held out from profile; one hypothetical answer is not validated prediction accuracy.

Options:
- **a.** Go to support them — D_SUPPORT:show_up@relationship
- **b.** Help them practice another way — D_SUPPORT:alternative@relationship
- **c.** Ask what kind of support would help — D_SUPPORT:clarify@relationship
- **d.** Say I can't make it — D_SUPPORT:decline@relationship

## h03 · slot-35 · sealed check

**A teammate gets public credit for work you also helped with. What would you most likely do next?**

Your answer stays outside the portrait that made this prediction.

- Role: `hypothetical`
- Window: `scenario`
- Target: `peer_group`
- Domain/facet: `recognition_and_comparison`
- Claim limit: Does not reveal motive, insecurity, or fairness of the situation.

Options:
- **a.** Let the moment pass — D_RECOGNITION:none_specific@work
- **b.** Mention my part in the work — D_RECOGNITION:claim_credit@work
- **c.** Congratulate them, then talk privately about credit — D_RECOGNITION:claim_credit@work
- **d.** Focus on the next task — D_RECOGNITION:return_to_task@work

## h04 · slot-36 · sealed check

**A reviewer points out a concrete flaw in a draft you care about. What's your first move?**

Your answer stays outside the portrait that made this prediction.

- Role: `hypothetical`
- Window: `scenario`
- Target: `person_giving_feedback`
- Domain/facet: `response_to_credible_criticism`
- Claim limit: Hypothetical intent only; heldout answer never enters profile evidence.

Options:
- **a.** Ask for a specific example — D_CRITICISM:clarify@feedback
- **b.** Explain what I was aiming for — D_CRITICISM:explain@feedback
- **c.** Take a beat before answering — D_CRITICISM:pause@feedback
- **d.** Mark what I would revise — D_CRITICISM:revise@feedback

## h05 · slot-37 · sealed check

**You notice a joke you made left someone quieter than before. What would you most likely do?**

Your answer stays outside the portrait that made this prediction.

- Role: `hypothetical`
- Window: `scenario`
- Target: `person_affected`
- Domain/facet: `repair_after_impact`
- Claim limit: Does not establish actual repair or the impact of a real interaction.

Options:
- **a.** Check in with them — D_REPAIR:check_in@relationship
- **b.** Explain that I meant it playfully — D_REPAIR:explain@relationship
- **c.** Give them room, then follow up — D_REPAIR:space_return@relationship
- **d.** Wait to see if they bring it up — D_REPAIR:uncertain@relationship

## h06 · slot-38 · sealed check

**Someone whose reply matters has not answered your invitation to meet this weekend. What would you most likely do next?**

Your answer stays outside the portrait that made this prediction.

- Role: `hypothetical`
- Window: `scenario`
- Target: `specific_person_whose_reply_matters`
- Domain/facet: `chosen_person_reply_context`
- Claim limit: Does not infer rejection fear or the other person's intention.

Options:
- **a.** Send one follow-up — D_REPLY:follow_up@relationship
- **b.** Wait without checking the chat — D_REPLY:wait@relationship
- **c.** Check the chat or their status — D_REPLY:check@relationship
- **d.** Decide later; I'm not sure — D_REPLY:unsure@relationship

## h07 · slot-39 · sealed check

**A trusted friend offers to pick up one errand for you this week. What would you most likely do?**

Your answer stays outside the portrait that made this prediction.

- Role: `hypothetical`
- Window: `scenario`
- Target: `trusted_friend_offering_help`
- Domain/facet: `receiving_help`
- Claim limit: Does not imply dependence, refusal discomfort, or actual recovery.

Options:
- **a.** Accept the offer — D_RECEIVE:accept@support
- **b.** Say what kind of help would fit — D_RECEIVE:redirect@support
- **c.** Thank them and handle it myself — D_RECEIVE:decline@support
- **d.** Ask if we can revisit it later — D_RECEIVE:clarify_accept@support

## h08 · slot-40 · sealed check

**A friend asks you to help them move a shelf tonight, but you had planned a quiet evening. What would you most likely do?**

Your answer stays outside the portrait that made this prediction.

- Role: `hypothetical`
- Window: `scenario`
- Target: `requester`
- Domain/facet: `helping_boundary`
- Claim limit: One intended choice cannot establish selfishness, generosity, or a stable boundary style.

Options:
- **a.** Help tonight — D_BOUNDARY:full_help@capacity
- **b.** Offer a smaller bit of help — D_BOUNDARY:limited_help@capacity
- **c.** Suggest another time — D_BOUNDARY:reschedule@capacity
- **d.** Say I can't tonight — D_BOUNDARY:decline@capacity

## Routine definitions

- `sleep_restoration`: Waking restored; Not often → Most mornings; How often sleep felt restoring, reported directly.
- `meal_regularity`: Meal timing; Often shifted → Mostly steady; How steady meal timing felt, not diet quality.
- `daytime_energy`: Enough energy for the day; Not often → Most days; Subjective available energy, with no cause inferred.
