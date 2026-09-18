import { HOST_REACTIONS } from "./host-reactions.js";

// Genii Switch Modes v3 — question/evidence implementation test.
// Derived from the frozen experimental-40 v2 bank plus the reviewed narrow patches.
// The UI/layout is unchanged; this module owns question meaning, evidence mappings, and route order.

export const VERSION = "genii-switch-modes.v3";
export const DIMS = {
  "D_MODE": "Mode switches",
  "D_MOTIVE": "What mattered",
  "D_SUPPORT": "Support by relationship",
  "D_RECOGNITION": "Recognition and credit",
  "D_CRITICISM": "First response to criticism",
  "D_REPAIR": "Repair after impact",
  "D_REPLY": "Waiting for a reply",
  "D_NEED": "Expressing a need",
  "D_RECEIVE": "Receiving help",
  "D_RECOVERY": "After an awkward conversation",
  "D_BOUNDARY": "Help and capacity",
  "D_HELP_MOTIVE": "Why you helped or declined",
  "D_ROLE": "Role in a shared plan",
  "D_CHANGE": "When plans change",
  "D_EXPRESSION": "What showed outside",
  "D_INTENSITY": "What happened inside",
  "D_UNCERTAINTY": "Reversible uncertainty",
  "D_GOAL": "When a goal slips"
};
export const CHAPTERS = [
  {
    "id": 1,
    "title": "Start where you are",
    "subtitle": "The current chapter, the kind of help you want, and how Genii should talk to you.",
    "kicker": "START WHERE YOU ARE"
  },
  {
    "id": 2,
    "title": "Who changes the answer?",
    "subtitle": "The same invitation can feel different depending on the person, purpose, and cost.",
    "kicker": "WHO CHANGES THE ANSWER?"
  },
  {
    "id": 3,
    "title": "When people matter",
    "subtitle": "Credit, criticism, replies, needs, and the choices that happen around them.",
    "kicker": "WHEN PEOPLE MATTER"
  },
  {
    "id": 4,
    "title": "Capacity has a vote",
    "subtitle": "Helping, changing plans, inner feelings, and what happens when the calendar objects.",
    "kicker": "CAPACITY HAS A VOTE"
  },
  {
    "id": 5,
    "title": "Your everyday rhythm",
    "subtitle": "Three direct routine pairs: usual month beside the week you actually had.",
    "kicker": "YOUR EVERYDAY RHYTHM"
  },
  {
    "id": 6,
    "title": "The sealed what-ifs",
    "subtitle": "New scenes. Predictions freeze before your answers appear.",
    "kicker": "THE SEALED WHAT-IFS"
  }
];
export const MEASURES = {
  "sleep_restoration": {
    "domain": "sleep",
    "label": "Waking restored",
    "low": "Not often",
    "high": "Most mornings",
    "min": 1,
    "max": 3,
    "unit": "ordinal",
    "description": "How often sleep felt restoring, reported directly."
  },
  "meal_regularity": {
    "domain": "eating",
    "label": "Meal timing",
    "low": "Often shifted",
    "high": "Mostly steady",
    "min": 1,
    "max": 3,
    "unit": "ordinal",
    "description": "How steady meal timing felt, not diet quality."
  },
  "daytime_energy": {
    "domain": "recovery",
    "label": "Enough energy for the day",
    "low": "Not often",
    "high": "Most days",
    "min": 1,
    "max": 3,
    "unit": "ordinal",
    "description": "Subjective available energy, with no cause inferred."
  }
};
export const QUESTIONS = [
  {
    "id": "n01",
    "chapter": 1,
    "title": "What has been taking up the most room in your head lately?",
    "setup": "Pick the closest answer. This guides the conversation; it is not a diagnosis.",
    "role": "context",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Friends and where I fit",
        "why": "Friends and where I fit",
        "tags": [],
        "facts": {
          "currentFriction": "friends"
        }
      },
      {
        "id": "b",
        "text": "Work, school, or what comes next",
        "why": "Work, school, or what comes next",
        "tags": [],
        "facts": {
          "currentFriction": "work_future"
        }
      },
      {
        "id": "c",
        "text": "Dating or family stuff",
        "why": "Dating or family stuff",
        "tags": [],
        "facts": {
          "currentFriction": "relationships"
        }
      },
      {
        "id": "d",
        "text": "My routines, energy, or body",
        "why": "My routines, energy, or body",
        "tags": [],
        "facts": {
          "currentFriction": "routines_body"
        }
      },
      {
        "id": "e",
        "text": "Something else, or I can't name it yet",
        "why": "Something else, or I can't name it yet",
        "tags": [],
        "facts": {
          "currentFriction": "other_unsure"
        }
      }
    ],
    "meta": {
      "domain": "conversation_route",
      "window": "current",
      "evidence": "self_report",
      "target": "self",
      "source": "experimental-40.v2#n01",
      "claimLimit": "A selected topic is not a diagnosis, trait, or proof of a problem."
    }
  },
  {
    "id": "n02",
    "chapter": 1,
    "title": "Which sounds closest to your social life these days?",
    "setup": "Pick the closest answer. This guides the conversation; it is not a diagnosis.",
    "role": "context",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "I see people often and feel known by at least a few",
        "why": "I see people often and feel known by at least a few",
        "tags": [],
        "facts": {
          "socialContext": "social_often_known"
        }
      },
      {
        "id": "b",
        "text": "I see people often, but still edit parts of myself",
        "why": "I see people often, but still edit parts of myself",
        "tags": [],
        "facts": {
          "socialContext": "social_often_edit"
        }
      },
      {
        "id": "c",
        "text": "I have a small circle and that mostly suits me",
        "why": "I have a small circle and that mostly suits me",
        "tags": [],
        "facts": {
          "socialContext": "small_circle_suits"
        }
      },
      {
        "id": "d",
        "text": "My people-time has been changing lately",
        "why": "My people-time has been changing lately",
        "tags": [],
        "facts": {
          "socialContext": "social_changing"
        }
      },
      {
        "id": "e",
        "text": "I don't get many local chances to connect, and I'd like more",
        "why": "I don't get many local chances to connect, and I'd like more",
        "tags": [],
        "facts": {
          "socialContext": "low_access_wants_more"
        }
      },
      {
        "id": "f",
        "text": "None of these quite fits",
        "why": "None of these quite fits",
        "tags": [],
        "facts": {
          "socialContext": "social_other"
        }
      }
    ],
    "meta": {
      "domain": "social_context",
      "window": "current",
      "evidence": "self_report",
      "target": "self_and_social_circle",
      "source": "experimental-40.v2#n02",
      "claimLimit": "Does not establish loneliness, belonging insecurity, or relationship quality."
    }
  },
  {
    "id": "n03",
    "chapter": 1,
    "title": "If this chat got one thing right about you, what would you want it to help with?",
    "setup": "Pick the closest answer. This guides the conversation; it is not a diagnosis.",
    "role": "context",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Help me understand a pattern I keep repeating",
        "why": "Help me understand a pattern I keep repeating",
        "tags": [],
        "facts": {
          "chosenGoal": "understand_pattern"
        }
      },
      {
        "id": "b",
        "text": "Help me put words to what I feel",
        "why": "Help me put words to what I feel",
        "tags": [],
        "facts": {
          "chosenGoal": "name_feeling"
        }
      },
      {
        "id": "c",
        "text": "Help me decide what to do next",
        "why": "Help me decide what to do next",
        "tags": [],
        "facts": {
          "chosenGoal": "next_step"
        }
      },
      {
        "id": "d",
        "text": "Give me a funny, weirdly accurate read",
        "why": "Give me a funny, weirdly accurate read",
        "tags": [],
        "facts": {
          "chosenGoal": "playful_read"
        }
      },
      {
        "id": "e",
        "text": "I don't have a specific goal",
        "why": "I don't have a specific goal",
        "tags": [],
        "facts": {
          "chosenGoal": "none_specific"
        }
      }
    ],
    "meta": {
      "domain": "chosen_goal",
      "window": "current",
      "evidence": "self_report",
      "target": "self",
      "source": "experimental-40.v2#n03",
      "claimLimit": "A desired kind of help is not evidence that the person needs or received it."
    }
  },
  {
    "id": "n04",
    "chapter": 1,
    "title": "Optional, and you can keep it broad: is there something you feel a bit tender or unsure about lately?",
    "setup": "Pick the closest answer. This guides the conversation; it is not a diagnosis.",
    "role": "context",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "How I come across to people",
        "why": "How I come across to people",
        "tags": [],
        "facts": {
          "tenderTopic": "tender_social_image"
        }
      },
      {
        "id": "b",
        "text": "Whether I am doing enough or keeping up",
        "why": "Whether I am doing enough or keeping up",
        "tags": [],
        "facts": {
          "tenderTopic": "tender_comparison"
        }
      },
      {
        "id": "c",
        "text": "A choice or goal I care about",
        "why": "A choice or goal I care about",
        "tags": [],
        "facts": {
          "tenderTopic": "tender_goal"
        }
      },
      {
        "id": "d",
        "text": "Something else",
        "why": "Something else",
        "tags": [],
        "facts": {
          "tenderTopic": "tender_other"
        }
      },
      {
        "id": "e",
        "text": "I'd rather not say, or nothing comes to mind",
        "why": "I'd rather not say, or nothing comes to mind",
        "tags": [],
        "facts": {
          "tenderTopic": "tender_none"
        }
      }
    ],
    "meta": {
      "domain": "optional_tender_topic",
      "window": "current",
      "evidence": "self_report",
      "target": "self",
      "source": "experimental-40.v2#n04",
      "claimLimit": "Do not infer universal insecurity, pathology, or a stable self-esteem trait."
    }
  },
  {
    "id": "n05",
    "chapter": 1,
    "title": "Would you want an optional feature where you invite one chosen friend to guess or gently challenge one of your reads? Nothing would be shared unless you chose to invite them.",
    "setup": "Pick the closest answer. This guides the conversation; it is not a diagnosis.",
    "role": "context",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Yes, that sounds fun",
        "why": "Yes, that sounds fun",
        "tags": [],
        "facts": {
          "friendChallengePreference": "friend_challenge_yes"
        }
      },
      {
        "id": "b",
        "text": "Maybe, after I see my own read",
        "why": "Maybe, after I see my own read",
        "tags": [],
        "facts": {
          "friendChallengePreference": "friend_challenge_maybe"
        }
      },
      {
        "id": "c",
        "text": "No, keep this just for me",
        "why": "No, keep this just for me",
        "tags": [],
        "facts": {
          "friendChallengePreference": "friend_challenge_no"
        }
      },
      {
        "id": "d",
        "text": "Not sure yet",
        "why": "Not sure yet",
        "tags": [],
        "facts": {
          "friendChallengePreference": "friend_challenge_unsure"
        }
      }
    ],
    "meta": {
      "domain": "consensual_friend_challenge",
      "window": "current",
      "evidence": "self_report",
      "target": "self_and_chosen_friend",
      "source": "experimental-40.v2#n05",
      "claimLimit": "Does not establish relationship trust or sharing consent."
    }
  },
  {
    "id": "n06",
    "chapter": 1,
    "title": "If Genii checks whether a read fits, what approach would feel right to you?",
    "setup": "Pick the closest answer. This guides the conversation; it is not a diagnosis.",
    "role": "context",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Ask gently and keep it brief",
        "why": "Ask gently and keep it brief",
        "tags": [],
        "facts": {
          "feedbackTone": "feedback_gentle"
        }
      },
      {
        "id": "b",
        "text": "Be direct; I'll tell you whether it fits",
        "why": "Be direct; I'll tell you whether it fits",
        "tags": [],
        "facts": {
          "feedbackTone": "feedback_direct"
        }
      },
      {
        "id": "c",
        "text": "Keep it playful, but let me say what missed",
        "why": "Keep it playful, but let me say what missed",
        "tags": [],
        "facts": {
          "feedbackTone": "feedback_playful"
        }
      },
      {
        "id": "d",
        "text": "Ask permission before opening feedback",
        "why": "Ask permission before opening feedback",
        "tags": [],
        "facts": {
          "feedbackTone": "feedback_permission_first"
        }
      }
    ],
    "meta": {
      "domain": "fit_feedback_tone_and_permission",
      "window": "current",
      "evidence": "self_report",
      "target": "self",
      "source": "experimental-40.v2#n06",
      "claimLimit": "Does not establish agreement, disagreement, or current fit of any interpretation."
    }
  },
  {
    "id": "n07",
    "chapter": 2,
    "title": "A social invitation arrived, and your enthusiasm did not RSVP at the same speed. Thinking of the latest example this past month, what did you actually do?",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Attended as planned",
        "why": "Attended as planned",
        "tags": [
          {
            "d": "D_MODE",
            "v": "join",
            "target": "social"
          }
        ]
      },
      {
        "id": "b",
        "text": "Joined for part of it",
        "why": "Joined for part of it",
        "tags": [
          {
            "d": "D_MODE",
            "v": "partial",
            "target": "social"
          }
        ]
      },
      {
        "id": "c",
        "text": "Suggested a different way to take part",
        "why": "Suggested a different way to take part",
        "tags": [
          {
            "d": "D_MODE",
            "v": "reshape",
            "target": "social"
          }
        ]
      },
      {
        "id": "d",
        "text": "Declined and let them know",
        "why": "Declined and let them know",
        "tags": [
          {
            "d": "D_MODE",
            "v": "decline",
            "target": "social"
          }
        ]
      }
    ],
    "meta": {
      "domain": "social_purpose_vs_enjoyment",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "friends_or_group",
      "source": "experimental-40.v2#n07",
      "claimLimit": "Purpose and enjoyment are separate; neither attendance nor refusal establishes sociability, selfishness, or people-pleasing."
    }
  },
  {
    "id": "n08",
    "chapter": 2,
    "title": "What mattered most in that choice?",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "I was looking forward to it",
        "why": "I was looking forward to it",
        "tags": [
          {
            "d": "D_MOTIVE",
            "v": "enjoyment",
            "target": "social"
          }
        ]
      },
      {
        "id": "b",
        "text": "I cared about the occasion's purpose",
        "why": "I cared about the occasion's purpose",
        "tags": [
          {
            "d": "D_MOTIVE",
            "v": "purpose",
            "target": "social"
          }
        ]
      },
      {
        "id": "c",
        "text": "I wanted time with those people",
        "why": "I wanted time with those people",
        "tags": [
          {
            "d": "D_MOTIVE",
            "v": "company",
            "target": "social"
          }
        ]
      },
      {
        "id": "d",
        "text": "My time, energy, or other plans decided it",
        "why": "My time, energy, or other plans decided it",
        "tags": [
          {
            "d": "D_MOTIVE",
            "v": "capacity",
            "target": "social"
          }
        ]
      },
      {
        "id": "e",
        "text": "Avoiding tension mattered most",
        "why": "Avoiding tension mattered most",
        "tags": [
          {
            "d": "D_MOTIVE",
            "v": "avoid_tension",
            "target": "social"
          }
        ]
      },
      {
        "id": "f",
        "text": "Something else",
        "why": "Something else",
        "tags": []
      }
    ],
    "meta": {
      "domain": "social_motive",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "same_friends_or_group",
      "source": "experimental-40.v2#n08",
      "claimLimit": "Direct motive report for one event, not a hidden motive diagnosis."
    },
    "dependsOn": {
      "questionId": "n07",
      "authored": true
    }
  },
  {
    "id": "n09",
    "chapter": 2,
    "title": "A close friend asks you to come along to a low-key thing. You like them, but the event itself is not your scene. What's your move?",
    "setup": "Choose what you would most likely do; this is an intention, not proof of past behavior.",
    "role": "hypothetical",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Go; the friend is the good part",
        "why": "Go; the friend is the good part",
        "tags": [
          {
            "d": "D_MODE",
            "v": "join",
            "target": "social"
          },
          {
            "d": "D_SUPPORT",
            "v": "show_up",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "b",
        "text": "Suggest something we'd both enjoy",
        "why": "Suggest something we'd both enjoy",
        "tags": [
          {
            "d": "D_MODE",
            "v": "reshape",
            "target": "social"
          },
          {
            "d": "D_SUPPORT",
            "v": "alternative",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "c",
        "text": "Pass kindly; liking them doesn't make every plan my plan",
        "why": "Pass kindly; liking them doesn't make every plan my plan",
        "tags": [
          {
            "d": "D_MODE",
            "v": "decline",
            "target": "social"
          },
          {
            "d": "D_SUPPORT",
            "v": "decline",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "d",
        "text": "Ask what they need from me before deciding",
        "why": "Ask what they need from me before deciding",
        "tags": [
          {
            "d": "D_MODE",
            "v": "clarify",
            "target": "social"
          },
          {
            "d": "D_SUPPORT",
            "v": "clarify",
            "target": "relationship"
          }
        ]
      }
    ],
    "meta": {
      "domain": "friend_context_shift",
      "window": "scenario",
      "evidence": "hypothetical",
      "target": "close_friend",
      "source": "experimental-40.v2#n09",
      "claimLimit": "Does not establish what the respondent does in real events."
    }
  },
  {
    "id": "n10",
    "chapter": 2,
    "title": "Same low-key event, but the person asking is someone you know only a little. What would you most likely do?",
    "setup": "Choose what you would most likely do; this is an intention, not proof of past behavior.",
    "role": "hypothetical",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Go; trying the event sounds fine",
        "why": "Go; trying the event sounds fine",
        "tags": [
          {
            "d": "D_MODE",
            "v": "join",
            "target": "social"
          }
        ]
      },
      {
        "id": "b",
        "text": "Ask for details, then decide",
        "why": "Ask for details, then decide",
        "tags": [
          {
            "d": "D_MODE",
            "v": "clarify",
            "target": "social"
          }
        ]
      },
      {
        "id": "c",
        "text": "Suggest another way to hang out",
        "why": "Suggest another way to hang out",
        "tags": [
          {
            "d": "D_MODE",
            "v": "reshape",
            "target": "social"
          }
        ]
      },
      {
        "id": "d",
        "text": "Pass; the event isn't for me",
        "why": "Pass; the event isn't for me",
        "tags": [
          {
            "d": "D_MODE",
            "v": "decline",
            "target": "social"
          }
        ]
      }
    ],
    "meta": {
      "domain": "accompaniment_context_shift",
      "window": "scenario",
      "evidence": "hypothetical",
      "target": "acquaintance_or_newer_friend",
      "source": "experimental-40.v2#n10",
      "claimLimit": "Difference from n09 may reflect event comfort, not a global closeness trait."
    }
  },
  {
    "id": "n11",
    "chapter": 3,
    "title": "In the past month, think of a recent moment when you contributed to something other people would notice. What did you most want from it?",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "The thing itself going well",
        "why": "The thing itself going well",
        "tags": [
          {
            "d": "D_RECOGNITION",
            "v": "outcome",
            "target": "work"
          }
        ]
      },
      {
        "id": "b",
        "text": "People knowing I helped",
        "why": "People knowing I helped",
        "tags": [
          {
            "d": "D_RECOGNITION",
            "v": "claim_credit",
            "target": "work"
          }
        ]
      },
      {
        "id": "c",
        "text": "A chance to show what I can do",
        "why": "A chance to show what I can do",
        "tags": [
          {
            "d": "D_RECOGNITION",
            "v": "show_skill",
            "target": "work"
          }
        ]
      },
      {
        "id": "d",
        "text": "I wasn't looking for anything in particular",
        "why": "I wasn't looking for anything in particular",
        "tags": [
          {
            "d": "D_RECOGNITION",
            "v": "none_specific",
            "target": "work"
          }
        ]
      }
    ],
    "meta": {
      "domain": "recognition_motive",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "work_school_or_group",
      "source": "experimental-40.v2#n11",
      "claimLimit": "Wanting credit or visibility is not proof of insecurity, vanity, or narcissism."
    }
  },
  {
    "id": "n12",
    "chapter": 3,
    "title": "Think of a recent time this month someone around you got praise for something you also care about. Your inner scoreboard might wake up. What did you actually do next?",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Congratulated them",
        "why": "Congratulated them",
        "tags": [
          {
            "d": "D_RECOGNITION",
            "v": "congratulate",
            "target": "work"
          }
        ]
      },
      {
        "id": "b",
        "text": "Asked how they got the opportunity",
        "why": "Asked how they got the opportunity",
        "tags": [
          {
            "d": "D_RECOGNITION",
            "v": "learn_process",
            "target": "work"
          }
        ]
      },
      {
        "id": "c",
        "text": "Made my own contribution visible",
        "why": "Made my own contribution visible",
        "tags": [
          {
            "d": "D_RECOGNITION",
            "v": "claim_credit",
            "target": "work"
          }
        ]
      },
      {
        "id": "d",
        "text": "Returned to what I was working on",
        "why": "Returned to what I was working on",
        "tags": [
          {
            "d": "D_RECOGNITION",
            "v": "return_to_task",
            "target": "work"
          }
        ]
      }
    ],
    "meta": {
      "domain": "recognition_comparison",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "peer_or_comparison_group",
      "source": "experimental-40.v2#n12",
      "claimLimit": "A single action does not imply envy, competitiveness, or insecurity."
    }
  },
  {
    "id": "n13",
    "chapter": 3,
    "title": "Think of the latest criticism you received this month. Before deciding whether it was fair, what did you do first?",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Asked what they meant or for an example",
        "why": "Asked what they meant or for an example",
        "tags": [
          {
            "d": "D_CRITICISM",
            "v": "clarify",
            "target": "feedback"
          }
        ]
      },
      {
        "id": "b",
        "text": "Explained my side",
        "why": "Explained my side",
        "tags": [
          {
            "d": "D_CRITICISM",
            "v": "explain",
            "target": "feedback"
          }
        ]
      },
      {
        "id": "c",
        "text": "Took time before responding",
        "why": "Took time before responding",
        "tags": [
          {
            "d": "D_CRITICISM",
            "v": "pause",
            "target": "feedback"
          }
        ]
      },
      {
        "id": "d",
        "text": "Looked for one part I could use",
        "why": "Looked for one part I could use",
        "tags": [
          {
            "d": "D_CRITICISM",
            "v": "revise",
            "target": "feedback"
          }
        ]
      }
    ],
    "meta": {
      "domain": "response_to_credible_criticism",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "critic_or_feedback_source",
      "source": "experimental-40.v2#n13",
      "claimLimit": "Does not measure openness, resilience, or establish that every criticism was accurate."
    }
  },
  {
    "id": "n14",
    "chapter": 3,
    "title": "In the past month, was there a moment you realized something you said or did landed badly with someone? What happened next? The tiny repair department is open.",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "I checked in and tried to make it right",
        "why": "I checked in and tried to make it right",
        "tags": [
          {
            "d": "D_REPAIR",
            "v": "check_in",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "b",
        "text": "I explained what I meant",
        "why": "I explained what I meant",
        "tags": [
          {
            "d": "D_REPAIR",
            "v": "explain",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "c",
        "text": "I gave them space and came back later",
        "why": "I gave them space and came back later",
        "tags": [
          {
            "d": "D_REPAIR",
            "v": "space_return",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "d",
        "text": "I wasn't sure what to do",
        "why": "I wasn't sure what to do",
        "tags": [
          {
            "d": "D_REPAIR",
            "v": "uncertain",
            "target": "relationship"
          }
        ]
      }
    ],
    "meta": {
      "domain": "repair_after_impact",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "person_affected",
      "source": "experimental-40.v2#n14",
      "claimLimit": "A single repair episode does not establish empathy, fault, or relationship outcome."
    }
  },
  {
    "id": "n15",
    "chapter": 3,
    "title": "Think of a recent time this month a particular person's reply mattered to you and took longer than you'd hoped. What did you actually do while waiting? You do not need to name them.",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Sent one follow-up message",
        "why": "Sent one follow-up message",
        "tags": [
          {
            "d": "D_REPLY",
            "v": "follow_up",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "b",
        "text": "Waited without checking the chat",
        "why": "Waited without checking the chat",
        "tags": [
          {
            "d": "D_REPLY",
            "v": "wait",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "c",
        "text": "Checked the chat or their status",
        "why": "Checked the chat or their status",
        "tags": [
          {
            "d": "D_REPLY",
            "v": "check",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "d",
        "text": "Couldn't tell what I did",
        "why": "Couldn't tell what I did",
        "tags": [
          {
            "d": "D_REPLY",
            "v": "unsure",
            "target": "relationship"
          }
        ]
      }
    ],
    "meta": {
      "domain": "chosen_person_reply_context",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "person_whose_reply_mattered_to_respondent",
      "source": "experimental-40.v2#n15",
      "claimLimit": "A wait response alone does not imply attachment style, rejection fear, or the other person's intent."
    }
  },
  {
    "id": "n16",
    "chapter": 3,
    "title": "In the past month, when you wanted something from a person whose opinion mattered to you, how did you let them know?",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Said what I wanted plainly",
        "why": "Said what I wanted plainly",
        "tags": [
          {
            "d": "D_NEED",
            "v": "direct",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "b",
        "text": "Hinted or waited to see if they'd notice",
        "why": "Hinted or waited to see if they'd notice",
        "tags": [
          {
            "d": "D_NEED",
            "v": "hint",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "c",
        "text": "Tried to handle it myself",
        "why": "Tried to handle it myself",
        "tags": [
          {
            "d": "D_NEED",
            "v": "self_handle",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "d",
        "text": "Decided it wasn't worth bringing up",
        "why": "Decided it wasn't worth bringing up",
        "tags": [
          {
            "d": "D_NEED",
            "v": "withhold",
            "target": "relationship"
          }
        ]
      }
    ],
    "meta": {
      "domain": "need_expression",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "person_whose_response_was_wanted",
      "source": "experimental-40.v2#n16",
      "claimLimit": "Does not establish a universal communication style or the reason for withholding."
    }
  },
  {
    "id": "n17",
    "chapter": 3,
    "title": "Think of the latest time someone offered you practical help this month. Did you take the assist?",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Accepted it",
        "why": "Accepted it",
        "tags": [
          {
            "d": "D_RECEIVE",
            "v": "accept",
            "target": "support"
          }
        ]
      },
      {
        "id": "b",
        "text": "Accepted after talking through the details",
        "why": "Accepted after talking through the details",
        "tags": [
          {
            "d": "D_RECEIVE",
            "v": "clarify_accept",
            "target": "support"
          }
        ]
      },
      {
        "id": "c",
        "text": "Declined and handled it myself",
        "why": "Declined and handled it myself",
        "tags": [
          {
            "d": "D_RECEIVE",
            "v": "decline",
            "target": "support"
          }
        ]
      },
      {
        "id": "d",
        "text": "Declined but asked for a different kind of support",
        "why": "Declined but asked for a different kind of support",
        "tags": [
          {
            "d": "D_RECEIVE",
            "v": "redirect",
            "target": "support"
          }
        ]
      }
    ],
    "meta": {
      "domain": "receiving_help",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "person_offering_help",
      "source": "experimental-40.v2#n17",
      "claimLimit": "One response does not show dependency, independence, or comfort with all help."
    }
  },
  {
    "id": "n18",
    "chapter": 3,
    "title": "After a recent awkward conversation this month, once you had said your piece, what happened next for you?",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "We talked again and understood each other better",
        "why": "We talked again and understood each other better",
        "tags": [
          {
            "d": "D_RECOVERY",
            "v": "talk_again",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "b",
        "text": "I took time away from the conversation",
        "why": "I took time away from the conversation",
        "tags": [
          {
            "d": "D_RECOVERY",
            "v": "take_time",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "c",
        "text": "I talked it through with someone else",
        "why": "I talked it through with someone else",
        "tags": [
          {
            "d": "D_RECOVERY",
            "v": "talk_elsewhere",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "d",
        "text": "I focused on another activity",
        "why": "I focused on another activity",
        "tags": [
          {
            "d": "D_RECOVERY",
            "v": "activity",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "e",
        "text": "I kept turning it over in my head",
        "why": "I kept turning it over in my head",
        "tags": [
          {
            "d": "D_RECOVERY",
            "v": "replay",
            "target": "relationship"
          }
        ]
      }
    ],
    "meta": {
      "domain": "recovery_after_explanation",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "self_after_explanation",
      "source": "experimental-40.v2#n18",
      "claimLimit": "Does not establish emotional regulation or recovery time unless directly measured elsewhere."
    }
  },
  {
    "id": "n19",
    "chapter": 4,
    "title": "In the past month, think of a request for help that competed with your time or energy. Your calendar is a witness. What did you do?",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Helped, even though it squeezed my own plan",
        "why": "Helped, even though it squeezed my own plan",
        "tags": [
          {
            "d": "D_BOUNDARY",
            "v": "full_help",
            "target": "capacity"
          }
        ]
      },
      {
        "id": "b",
        "text": "Helped in a smaller way I could manage",
        "why": "Helped in a smaller way I could manage",
        "tags": [
          {
            "d": "D_BOUNDARY",
            "v": "limited_help",
            "target": "capacity"
          }
        ]
      },
      {
        "id": "c",
        "text": "Offered another time or person",
        "why": "Offered another time or person",
        "tags": [
          {
            "d": "D_BOUNDARY",
            "v": "reschedule",
            "target": "capacity"
          }
        ]
      },
      {
        "id": "d",
        "text": "Said no",
        "why": "Said no",
        "tags": [
          {
            "d": "D_BOUNDARY",
            "v": "decline",
            "target": "capacity"
          }
        ]
      }
    ],
    "meta": {
      "domain": "helping_boundary",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "requester",
      "source": "experimental-40.v2#n19",
      "claimLimit": "Saying no is not selfishness; saying yes is not proof of generosity or coercion."
    }
  },
  {
    "id": "n20",
    "chapter": 4,
    "title": "What mattered most in that choice, whether you helped or not?",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "I wanted to help that person",
        "why": "I wanted to help that person",
        "tags": [
          {
            "d": "D_HELP_MOTIVE",
            "v": "care",
            "target": "capacity"
          }
        ]
      },
      {
        "id": "b",
        "text": "It felt like the right thing to do",
        "why": "It felt like the right thing to do",
        "tags": [
          {
            "d": "D_HELP_MOTIVE",
            "v": "principle",
            "target": "capacity"
          }
        ]
      },
      {
        "id": "c",
        "text": "My available time or energy set the limit",
        "why": "My available time or energy set the limit",
        "tags": [
          {
            "d": "D_HELP_MOTIVE",
            "v": "capacity",
            "target": "capacity"
          }
        ]
      },
      {
        "id": "d",
        "text": "I felt pressure or found it hard to refuse",
        "why": "I felt pressure or found it hard to refuse",
        "tags": [
          {
            "d": "D_HELP_MOTIVE",
            "v": "pressure",
            "target": "capacity"
          }
        ]
      },
      {
        "id": "e",
        "text": "Something else",
        "why": "Something else",
        "tags": []
      }
    ],
    "meta": {
      "domain": "helping_motive",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "same_requester",
      "source": "experimental-40.v2#n20",
      "claimLimit": "Directly reported motive for one event; not a moral judgment."
    },
    "dependsOn": {
      "questionId": "n19",
      "authored": true
    }
  },
  {
    "id": "n21",
    "chapter": 4,
    "title": "For a shared plan or task you cared about this month, what role did you actually take?",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Set the plan and kept track of the pieces",
        "why": "Set the plan and kept track of the pieces",
        "tags": [
          {
            "d": "D_ROLE",
            "v": "organize",
            "target": "group"
          }
        ]
      },
      {
        "id": "b",
        "text": "Took one piece and let others handle theirs",
        "why": "Took one piece and let others handle theirs",
        "tags": [
          {
            "d": "D_ROLE",
            "v": "own_piece",
            "target": "group"
          }
        ]
      },
      {
        "id": "c",
        "text": "Asked what others wanted before choosing a role",
        "why": "Asked what others wanted before choosing a role",
        "tags": [
          {
            "d": "D_ROLE",
            "v": "invite_input",
            "target": "group"
          }
        ]
      },
      {
        "id": "d",
        "text": "Stayed flexible and adjusted as we went",
        "why": "Stayed flexible and adjusted as we went",
        "tags": [
          {
            "d": "D_ROLE",
            "v": "adapt",
            "target": "group"
          }
        ]
      }
    ],
    "meta": {
      "domain": "control_and_delegation",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "shared_task_or_plan",
      "source": "experimental-40.v2#n21",
      "claimLimit": "Organizing does not imply controlling; adapting does not imply passivity."
    }
  },
  {
    "id": "n22",
    "chapter": 4,
    "title": "Thinking about that shared plan: did it change, and if so, what did you do first?",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Worked out the new details",
        "why": "Worked out the new details",
        "tags": [
          {
            "d": "D_CHANGE",
            "v": "replan",
            "target": "group"
          }
        ]
      },
      {
        "id": "b",
        "text": "Said what part was frustrating or inconvenient",
        "why": "Said what part was frustrating or inconvenient",
        "tags": [
          {
            "d": "D_CHANGE",
            "v": "state_impact",
            "target": "group"
          }
        ]
      },
      {
        "id": "c",
        "text": "Went with it and adjusted on the fly",
        "why": "Went with it and adjusted on the fly",
        "tags": [
          {
            "d": "D_CHANGE",
            "v": "adapt",
            "target": "group"
          }
        ]
      },
      {
        "id": "d",
        "text": "Asked to keep the original plan",
        "why": "Asked to keep the original plan",
        "tags": [
          {
            "d": "D_CHANGE",
            "v": "keep_original",
            "target": "group"
          }
        ]
      },
      {
        "id": "e",
        "text": "The plan didn't change",
        "why": "The plan didn't change",
        "tags": [
          {
            "d": "D_CHANGE",
            "v": "no_change",
            "target": "group"
          }
        ]
      }
    ],
    "meta": {
      "domain": "response_to_changed_plan",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "same_group_or_plan",
      "source": "experimental-40.v2#n22",
      "claimLimit": "One changed plan does not establish rigidity or flexibility as a trait."
    },
    "dependsOn": {
      "questionId": "n21",
      "authored": true
    }
  },
  {
    "id": "n23",
    "chapter": 4,
    "title": "Think of a recent moment this month you felt irritated with someone. What did you show on the outside?",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "I said I was irritated",
        "why": "I said I was irritated",
        "tags": [
          {
            "d": "D_EXPRESSION",
            "v": "name_it",
            "target": "emotion"
          }
        ],
        "signals": [
          {
            "family": "frustration",
            "layer": "response",
            "value": "name_it",
            "label": "I said I was irritated"
          }
        ]
      },
      {
        "id": "b",
        "text": "I stayed polite and dealt with it later",
        "why": "I stayed polite and dealt with it later",
        "tags": [
          {
            "d": "D_EXPRESSION",
            "v": "polite_later",
            "target": "emotion"
          }
        ],
        "signals": [
          {
            "family": "frustration",
            "layer": "response",
            "value": "polite_later",
            "label": "I stayed polite and dealt with it later"
          }
        ]
      },
      {
        "id": "c",
        "text": "It came out in my tone or actions",
        "why": "It came out in my tone or actions",
        "tags": [
          {
            "d": "D_EXPRESSION",
            "v": "showed",
            "target": "emotion"
          }
        ],
        "signals": [
          {
            "family": "frustration",
            "layer": "response",
            "value": "showed",
            "label": "It came out in my tone or actions"
          }
        ]
      },
      {
        "id": "d",
        "text": "I stepped away",
        "why": "I stepped away",
        "tags": [
          {
            "d": "D_EXPRESSION",
            "v": "step_away",
            "target": "emotion"
          }
        ],
        "signals": [
          {
            "family": "frustration",
            "layer": "response",
            "value": "step_away",
            "label": "I stepped away"
          }
        ]
      }
    ],
    "meta": {
      "domain": "inner_feeling_vs_outward_action",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "self_and_interaction_partner",
      "source": "experimental-40.v2#n23",
      "claimLimit": "A quiet exterior is not evidence of low intensity or calmness."
    }
  },
  {
    "id": "n24",
    "chapter": 4,
    "title": "How strong did the irritation feel inside at the time?",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "A small flicker",
        "why": "A small flicker",
        "tags": [
          {
            "d": "D_INTENSITY",
            "v": "low",
            "target": "emotion"
          }
        ],
        "signals": [
          {
            "family": "frustration",
            "layer": "feeling",
            "value": "low",
            "label": "A small flicker"
          }
        ]
      },
      {
        "id": "b",
        "text": "Noticeable, but manageable",
        "why": "Noticeable, but manageable",
        "tags": [
          {
            "d": "D_INTENSITY",
            "v": "medium",
            "target": "emotion"
          }
        ],
        "signals": [
          {
            "family": "frustration",
            "layer": "feeling",
            "value": "medium",
            "label": "Noticeable, but manageable"
          }
        ]
      },
      {
        "id": "c",
        "text": "Strong; it took up real space",
        "why": "Strong; it took up real space",
        "tags": [
          {
            "d": "D_INTENSITY",
            "v": "high",
            "target": "emotion"
          }
        ],
        "signals": [
          {
            "family": "frustration",
            "layer": "feeling",
            "value": "high",
            "label": "Strong; it took up real space"
          }
        ]
      },
      {
        "id": "d",
        "text": "Hard to tell now",
        "why": "Hard to tell now",
        "tags": [
          {
            "d": "D_INTENSITY",
            "v": "unsure",
            "target": "emotion"
          }
        ],
        "signals": [
          {
            "family": "frustration",
            "layer": "feeling",
            "value": "unsure",
            "label": "Hard to tell now"
          }
        ]
      }
    ],
    "meta": {
      "domain": "inner_feeling_intensity",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "self",
      "source": "experimental-40.v2#n24",
      "claimLimit": "Retrospective self-rating for one event, not a stable emotional-intensity scale."
    },
    "dependsOn": {
      "questionId": "n23",
      "authored": true
    }
  },
  {
    "id": "n25",
    "chapter": 4,
    "title": "This month, when a decision felt uncertain but reversible, what did you actually do?",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Picked a direction and tried it",
        "why": "Picked a direction and tried it",
        "tags": [
          {
            "d": "D_UNCERTAINTY",
            "v": "try",
            "target": "decision"
          }
        ]
      },
      {
        "id": "b",
        "text": "Got one or two more details first",
        "why": "Got one or two more details first",
        "tags": [
          {
            "d": "D_UNCERTAINTY",
            "v": "check",
            "target": "decision"
          }
        ]
      },
      {
        "id": "c",
        "text": "Asked someone I trust what they thought",
        "why": "Asked someone I trust what they thought",
        "tags": [
          {
            "d": "D_UNCERTAINTY",
            "v": "consult",
            "target": "decision"
          }
        ]
      },
      {
        "id": "d",
        "text": "Waited until it felt clearer",
        "why": "Waited until it felt clearer",
        "tags": [
          {
            "d": "D_UNCERTAINTY",
            "v": "wait",
            "target": "decision"
          }
        ]
      }
    ],
    "meta": {
      "domain": "chosen_risk_control",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "self_and_decision",
      "source": "experimental-40.v2#n25",
      "claimLimit": "Does not establish decisiveness, anxiety, or control in other stakes."
    }
  },
  {
    "id": "n26",
    "chapter": 4,
    "title": "If a goal you cared about slipped behind schedule this month, what did you do next?",
    "setup": "Use the latest real example from the past month. No example, Other, and Skip stay separate.",
    "role": "actual",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Made the next step smaller",
        "why": "Made the next step smaller",
        "tags": [
          {
            "d": "D_GOAL",
            "v": "shrink_step",
            "target": "goal"
          }
        ]
      },
      {
        "id": "b",
        "text": "Put in extra time to catch up",
        "why": "Put in extra time to catch up",
        "tags": [
          {
            "d": "D_GOAL",
            "v": "extra_effort",
            "target": "goal"
          }
        ]
      },
      {
        "id": "c",
        "text": "Changed the plan or deadline",
        "why": "Changed the plan or deadline",
        "tags": [
          {
            "d": "D_GOAL",
            "v": "revise",
            "target": "goal"
          }
        ]
      },
      {
        "id": "d",
        "text": "Paused to figure out what was getting in the way",
        "why": "Paused to figure out what was getting in the way",
        "tags": [
          {
            "d": "D_GOAL",
            "v": "diagnose",
            "target": "goal"
          }
        ]
      }
    ],
    "meta": {
      "domain": "goal_response",
      "window": "latest_instance_past_month",
      "evidence": "actual_event",
      "target": "self_and_goal",
      "source": "experimental-40.v2#n26",
      "claimLimit": "Does not establish motivation or ability from one goal episode."
    }
  },
  {
    "id": "n27",
    "chapter": 5,
    "title": "Over the past month, how often did your usual sleep leave you feeling restored when you woke up?",
    "setup": "A direct report, not a health score. Variation is a real answer.",
    "role": "context",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Most mornings",
        "why": "Most mornings",
        "tags": [],
        "measures": [
          {
            "id": "sleep_restoration",
            "value": 3,
            "label": "Most mornings"
          }
        ]
      },
      {
        "id": "b",
        "text": "Some mornings",
        "why": "Some mornings",
        "tags": [],
        "measures": [
          {
            "id": "sleep_restoration",
            "value": 2,
            "label": "Some mornings"
          }
        ]
      },
      {
        "id": "c",
        "text": "Not often",
        "why": "Not often",
        "tags": [],
        "measures": [
          {
            "id": "sleep_restoration",
            "value": 1,
            "label": "Not often"
          }
        ]
      },
      {
        "id": "d",
        "text": "It varied too much to say",
        "why": "It varied too much to say",
        "tags": []
      }
    ],
    "meta": {
      "domain": "sleep_restoration_usual",
      "window": "past_month",
      "evidence": "self_report",
      "target": "self",
      "source": "experimental-40.v2#n27",
      "claimLimit": "Do not infer duration, adequacy, cause, or medical status."
    }
  },
  {
    "id": "n28",
    "chapter": 5,
    "title": "And over just the last seven days, how often did sleep leave you feeling restored when you woke up?",
    "setup": "A direct report, not a health score. Variation is a real answer.",
    "role": "context",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Most mornings",
        "why": "Most mornings",
        "tags": [],
        "measures": [
          {
            "id": "sleep_restoration",
            "value": 3,
            "label": "Most mornings"
          }
        ]
      },
      {
        "id": "b",
        "text": "Some mornings",
        "why": "Some mornings",
        "tags": [],
        "measures": [
          {
            "id": "sleep_restoration",
            "value": 2,
            "label": "Some mornings"
          }
        ]
      },
      {
        "id": "c",
        "text": "Not often",
        "why": "Not often",
        "tags": [],
        "measures": [
          {
            "id": "sleep_restoration",
            "value": 1,
            "label": "Not often"
          }
        ]
      },
      {
        "id": "d",
        "text": "It varied too much to say",
        "why": "It varied too much to say",
        "tags": []
      }
    ],
    "meta": {
      "domain": "sleep_restoration_recent",
      "window": "last_7_days",
      "evidence": "self_report",
      "target": "self",
      "source": "experimental-40.v2#n28",
      "claimLimit": "No sleep cause, duration, or clinical conclusion."
    }
  },
  {
    "id": "n29",
    "chapter": 5,
    "title": "Over the past month, how steady was your usual meal timing from day to day?",
    "setup": "A direct report, not a health score. Variation is a real answer.",
    "role": "context",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Mostly steady",
        "why": "Mostly steady",
        "tags": [],
        "measures": [
          {
            "id": "meal_regularity",
            "value": 3,
            "label": "Mostly steady"
          }
        ]
      },
      {
        "id": "b",
        "text": "Some days steady, some not",
        "why": "Some days steady, some not",
        "tags": [],
        "measures": [
          {
            "id": "meal_regularity",
            "value": 2,
            "label": "Some days steady, some not"
          }
        ]
      },
      {
        "id": "c",
        "text": "Often shifted around",
        "why": "Often shifted around",
        "tags": [],
        "measures": [
          {
            "id": "meal_regularity",
            "value": 1,
            "label": "Often shifted around"
          }
        ]
      },
      {
        "id": "d",
        "text": "My days varied too much for a usual pattern",
        "why": "My days varied too much for a usual pattern",
        "tags": []
      }
    ],
    "meta": {
      "domain": "meal_regular_usual",
      "window": "past_month",
      "evidence": "self_report",
      "target": "self",
      "source": "experimental-40.v2#n29",
      "claimLimit": "Do not infer eating disorder, adequacy, body state, or health cause."
    }
  },
  {
    "id": "n30",
    "chapter": 5,
    "title": "And over just the last seven days, how steady was your meal timing from day to day?",
    "setup": "A direct report, not a health score. Variation is a real answer.",
    "role": "context",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Mostly steady",
        "why": "Mostly steady",
        "tags": [],
        "measures": [
          {
            "id": "meal_regularity",
            "value": 3,
            "label": "Mostly steady"
          }
        ]
      },
      {
        "id": "b",
        "text": "Some days steady, some not",
        "why": "Some days steady, some not",
        "tags": [],
        "measures": [
          {
            "id": "meal_regularity",
            "value": 2,
            "label": "Some days steady, some not"
          }
        ]
      },
      {
        "id": "c",
        "text": "Often shifted around",
        "why": "Often shifted around",
        "tags": [],
        "measures": [
          {
            "id": "meal_regularity",
            "value": 1,
            "label": "Often shifted around"
          }
        ]
      },
      {
        "id": "d",
        "text": "My days varied too much for a usual pattern",
        "why": "My days varied too much for a usual pattern",
        "tags": []
      }
    ],
    "meta": {
      "domain": "meal_regular_recent",
      "window": "last_7_days",
      "evidence": "self_report",
      "target": "self",
      "source": "experimental-40.v2#n30",
      "claimLimit": "No diet-quality, adequacy, medical, or causal claim."
    }
  },
  {
    "id": "n31",
    "chapter": 5,
    "title": "Over the past month, how often did you have enough energy for the things you wanted or needed to do?",
    "setup": "A direct report, not a health score. Variation is a real answer.",
    "role": "context",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Most days",
        "why": "Most days",
        "tags": [],
        "measures": [
          {
            "id": "daytime_energy",
            "value": 3,
            "label": "Most days"
          }
        ]
      },
      {
        "id": "b",
        "text": "Some days",
        "why": "Some days",
        "tags": [],
        "measures": [
          {
            "id": "daytime_energy",
            "value": 2,
            "label": "Some days"
          }
        ]
      },
      {
        "id": "c",
        "text": "Not often",
        "why": "Not often",
        "tags": [],
        "measures": [
          {
            "id": "daytime_energy",
            "value": 1,
            "label": "Not often"
          }
        ]
      },
      {
        "id": "d",
        "text": "It depended too much on the day to say",
        "why": "It depended too much on the day to say",
        "tags": []
      }
    ],
    "meta": {
      "domain": "daytime_energy_usual",
      "window": "past_month",
      "evidence": "self_report",
      "target": "self",
      "source": "experimental-40.v2#n31",
      "claimLimit": "No medical, sleep, nutrition, or mental-health cause inferred."
    }
  },
  {
    "id": "n32",
    "chapter": 5,
    "title": "And over just the last seven days, how often did you have enough energy for the things you wanted or needed to do?",
    "setup": "A direct report, not a health score. Variation is a real answer.",
    "role": "context",
    "test": false,
    "options": [
      {
        "id": "a",
        "text": "Most days",
        "why": "Most days",
        "tags": [],
        "measures": [
          {
            "id": "daytime_energy",
            "value": 3,
            "label": "Most days"
          }
        ]
      },
      {
        "id": "b",
        "text": "Some days",
        "why": "Some days",
        "tags": [],
        "measures": [
          {
            "id": "daytime_energy",
            "value": 2,
            "label": "Some days"
          }
        ]
      },
      {
        "id": "c",
        "text": "Not often",
        "why": "Not often",
        "tags": [],
        "measures": [
          {
            "id": "daytime_energy",
            "value": 1,
            "label": "Not often"
          }
        ]
      },
      {
        "id": "d",
        "text": "It depended too much on the day to say",
        "why": "It depended too much on the day to say",
        "tags": []
      }
    ],
    "meta": {
      "domain": "daytime_energy_recent",
      "window": "last_7_days",
      "evidence": "self_report",
      "target": "self",
      "source": "experimental-40.v2#n32",
      "claimLimit": "No medical, sleep, nutrition, or mental-health cause inferred."
    }
  },
  {
    "id": "h01",
    "chapter": 6,
    "title": "Your group has already picked a restaurant you don't care about, but you'd enjoy the company. What's your likeliest move?",
    "setup": "Your answer stays outside the portrait that made this prediction.",
    "role": "holdout",
    "test": true,
    "options": [
      {
        "id": "a",
        "text": "Go for the people",
        "why": "Go for the people",
        "tags": [
          {
            "d": "D_MODE",
            "v": "join",
            "target": "social"
          }
        ]
      },
      {
        "id": "b",
        "text": "Suggest a place I'd also enjoy",
        "why": "Suggest a place I'd also enjoy",
        "tags": [
          {
            "d": "D_MODE",
            "v": "reshape",
            "target": "social"
          }
        ]
      },
      {
        "id": "c",
        "text": "Join for part of it",
        "why": "Join for part of it",
        "tags": [
          {
            "d": "D_MODE",
            "v": "partial",
            "target": "social"
          }
        ]
      },
      {
        "id": "d",
        "text": "Skip this one",
        "why": "Skip this one",
        "tags": [
          {
            "d": "D_MODE",
            "v": "decline",
            "target": "social"
          }
        ]
      }
    ],
    "meta": {
      "domain": "social_purpose_vs_enjoyment",
      "window": "scenario",
      "evidence": "hypothetical",
      "target": "friend_group",
      "source": "experimental-40.v2#h01",
      "claimLimit": "No inference about actual event behavior; check answer must not update the frozen profile."
    },
    "baseline": "a"
  },
  {
    "id": "h02",
    "chapter": 6,
    "title": "A close friend is nervous about giving a short talk and asks you to sit in the audience. What would you most likely do?",
    "setup": "Your answer stays outside the portrait that made this prediction.",
    "role": "holdout",
    "test": true,
    "options": [
      {
        "id": "a",
        "text": "Go to support them",
        "why": "Go to support them",
        "tags": [
          {
            "d": "D_SUPPORT",
            "v": "show_up",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "b",
        "text": "Help them practice another way",
        "why": "Help them practice another way",
        "tags": [
          {
            "d": "D_SUPPORT",
            "v": "alternative",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "c",
        "text": "Ask what kind of support would help",
        "why": "Ask what kind of support would help",
        "tags": [
          {
            "d": "D_SUPPORT",
            "v": "clarify",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "d",
        "text": "Say I can't make it",
        "why": "Say I can't make it",
        "tags": [
          {
            "d": "D_SUPPORT",
            "v": "decline",
            "target": "relationship"
          }
        ]
      }
    ],
    "meta": {
      "domain": "friend_accompaniment_context",
      "window": "scenario",
      "evidence": "hypothetical",
      "target": "close_friend",
      "source": "experimental-40.v2#h02",
      "claimLimit": "Held out from profile; one hypothetical answer is not validated prediction accuracy."
    },
    "baseline": "a"
  },
  {
    "id": "h03",
    "chapter": 6,
    "title": "A teammate gets public credit for work you also helped with. What would you most likely do next?",
    "setup": "Your answer stays outside the portrait that made this prediction.",
    "role": "holdout",
    "test": true,
    "options": [
      {
        "id": "a",
        "text": "Let the moment pass",
        "why": "Let the moment pass",
        "tags": [
          {
            "d": "D_RECOGNITION",
            "v": "none_specific",
            "target": "work"
          }
        ]
      },
      {
        "id": "b",
        "text": "Mention my part in the work",
        "why": "Mention my part in the work",
        "tags": [
          {
            "d": "D_RECOGNITION",
            "v": "claim_credit",
            "target": "work"
          }
        ]
      },
      {
        "id": "c",
        "text": "Congratulate them, then talk privately about credit",
        "why": "Congratulate them, then talk privately about credit",
        "tags": [
          {
            "d": "D_RECOGNITION",
            "v": "claim_credit",
            "target": "work"
          }
        ]
      },
      {
        "id": "d",
        "text": "Focus on the next task",
        "why": "Focus on the next task",
        "tags": [
          {
            "d": "D_RECOGNITION",
            "v": "return_to_task",
            "target": "work"
          }
        ]
      }
    ],
    "meta": {
      "domain": "recognition_and_comparison",
      "window": "scenario",
      "evidence": "hypothetical",
      "target": "peer_group",
      "source": "experimental-40.v2#h03",
      "claimLimit": "Does not reveal motive, insecurity, or fairness of the situation."
    },
    "baseline": "a"
  },
  {
    "id": "h04",
    "chapter": 6,
    "title": "A reviewer points out a concrete flaw in a draft you care about. What's your first move?",
    "setup": "Your answer stays outside the portrait that made this prediction.",
    "role": "holdout",
    "test": true,
    "options": [
      {
        "id": "a",
        "text": "Ask for a specific example",
        "why": "Ask for a specific example",
        "tags": [
          {
            "d": "D_CRITICISM",
            "v": "clarify",
            "target": "feedback"
          }
        ]
      },
      {
        "id": "b",
        "text": "Explain what I was aiming for",
        "why": "Explain what I was aiming for",
        "tags": [
          {
            "d": "D_CRITICISM",
            "v": "explain",
            "target": "feedback"
          }
        ]
      },
      {
        "id": "c",
        "text": "Take a beat before answering",
        "why": "Take a beat before answering",
        "tags": [
          {
            "d": "D_CRITICISM",
            "v": "pause",
            "target": "feedback"
          }
        ]
      },
      {
        "id": "d",
        "text": "Mark what I would revise",
        "why": "Mark what I would revise",
        "tags": [
          {
            "d": "D_CRITICISM",
            "v": "revise",
            "target": "feedback"
          }
        ]
      }
    ],
    "meta": {
      "domain": "response_to_credible_criticism",
      "window": "scenario",
      "evidence": "hypothetical",
      "target": "person_giving_feedback",
      "source": "experimental-40.v2#h04",
      "claimLimit": "Hypothetical intent only; heldout answer never enters profile evidence."
    },
    "baseline": "a"
  },
  {
    "id": "h05",
    "chapter": 6,
    "title": "You notice a joke you made left someone quieter than before. What would you most likely do?",
    "setup": "Your answer stays outside the portrait that made this prediction.",
    "role": "holdout",
    "test": true,
    "options": [
      {
        "id": "a",
        "text": "Check in with them",
        "why": "Check in with them",
        "tags": [
          {
            "d": "D_REPAIR",
            "v": "check_in",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "b",
        "text": "Explain that I meant it playfully",
        "why": "Explain that I meant it playfully",
        "tags": [
          {
            "d": "D_REPAIR",
            "v": "explain",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "c",
        "text": "Give them room, then follow up",
        "why": "Give them room, then follow up",
        "tags": [
          {
            "d": "D_REPAIR",
            "v": "space_return",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "d",
        "text": "Wait to see if they bring it up",
        "why": "Wait to see if they bring it up",
        "tags": [
          {
            "d": "D_REPAIR",
            "v": "uncertain",
            "target": "relationship"
          }
        ]
      }
    ],
    "meta": {
      "domain": "repair_after_impact",
      "window": "scenario",
      "evidence": "hypothetical",
      "target": "person_affected",
      "source": "experimental-40.v2#h05",
      "claimLimit": "Does not establish actual repair or the impact of a real interaction."
    },
    "baseline": "a"
  },
  {
    "id": "h06",
    "chapter": 6,
    "title": "Someone whose reply matters has not answered your invitation to meet this weekend. What would you most likely do next?",
    "setup": "Your answer stays outside the portrait that made this prediction.",
    "role": "holdout",
    "test": true,
    "options": [
      {
        "id": "a",
        "text": "Send one follow-up",
        "why": "Send one follow-up",
        "tags": [
          {
            "d": "D_REPLY",
            "v": "follow_up",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "b",
        "text": "Wait without checking the chat",
        "why": "Wait without checking the chat",
        "tags": [
          {
            "d": "D_REPLY",
            "v": "wait",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "c",
        "text": "Check the chat or their status",
        "why": "Check the chat or their status",
        "tags": [
          {
            "d": "D_REPLY",
            "v": "check",
            "target": "relationship"
          }
        ]
      },
      {
        "id": "d",
        "text": "Decide later; I'm not sure",
        "why": "Decide later; I'm not sure",
        "tags": [
          {
            "d": "D_REPLY",
            "v": "unsure",
            "target": "relationship"
          }
        ]
      }
    ],
    "meta": {
      "domain": "chosen_person_reply_context",
      "window": "scenario",
      "evidence": "hypothetical",
      "target": "specific_person_whose_reply_matters",
      "source": "experimental-40.v2#h06",
      "claimLimit": "Does not infer rejection fear or the other person's intention."
    },
    "baseline": "a"
  },
  {
    "id": "h07",
    "chapter": 6,
    "title": "A trusted friend offers to pick up one errand for you this week. What would you most likely do?",
    "setup": "Your answer stays outside the portrait that made this prediction.",
    "role": "holdout",
    "test": true,
    "options": [
      {
        "id": "a",
        "text": "Accept the offer",
        "why": "Accept the offer",
        "tags": [
          {
            "d": "D_RECEIVE",
            "v": "accept",
            "target": "support"
          }
        ]
      },
      {
        "id": "b",
        "text": "Say what kind of help would fit",
        "why": "Say what kind of help would fit",
        "tags": [
          {
            "d": "D_RECEIVE",
            "v": "redirect",
            "target": "support"
          }
        ]
      },
      {
        "id": "c",
        "text": "Thank them and handle it myself",
        "why": "Thank them and handle it myself",
        "tags": [
          {
            "d": "D_RECEIVE",
            "v": "decline",
            "target": "support"
          }
        ]
      },
      {
        "id": "d",
        "text": "Ask if we can revisit it later",
        "why": "Ask if we can revisit it later",
        "tags": [
          {
            "d": "D_RECEIVE",
            "v": "clarify_accept",
            "target": "support"
          }
        ]
      }
    ],
    "meta": {
      "domain": "receiving_help",
      "window": "scenario",
      "evidence": "hypothetical",
      "target": "trusted_friend_offering_help",
      "source": "experimental-40.v2#h07",
      "claimLimit": "Does not imply dependence, refusal discomfort, or actual recovery."
    },
    "baseline": "a"
  },
  {
    "id": "h08",
    "chapter": 6,
    "title": "A friend asks you to help them move a shelf tonight, but you had planned a quiet evening. What would you most likely do?",
    "setup": "Your answer stays outside the portrait that made this prediction.",
    "role": "holdout",
    "test": true,
    "options": [
      {
        "id": "a",
        "text": "Help tonight",
        "why": "Help tonight",
        "tags": [
          {
            "d": "D_BOUNDARY",
            "v": "full_help",
            "target": "capacity"
          }
        ]
      },
      {
        "id": "b",
        "text": "Offer a smaller bit of help",
        "why": "Offer a smaller bit of help",
        "tags": [
          {
            "d": "D_BOUNDARY",
            "v": "limited_help",
            "target": "capacity"
          }
        ]
      },
      {
        "id": "c",
        "text": "Suggest another time",
        "why": "Suggest another time",
        "tags": [
          {
            "d": "D_BOUNDARY",
            "v": "reschedule",
            "target": "capacity"
          }
        ]
      },
      {
        "id": "d",
        "text": "Say I can't tonight",
        "why": "Say I can't tonight",
        "tags": [
          {
            "d": "D_BOUNDARY",
            "v": "decline",
            "target": "capacity"
          }
        ]
      }
    ],
    "meta": {
      "domain": "helping_boundary",
      "window": "scenario",
      "evidence": "hypothetical",
      "target": "requester",
      "source": "experimental-40.v2#h08",
      "claimLimit": "One intended choice cannot establish selfishness, generosity, or a stable boundary style."
    },
    "baseline": "a"
  }
];
export const ROUTE_SLOTS = [
  {
    "id": "slot-01",
    "candidates": [
      "n01"
    ]
  },
  {
    "id": "slot-02",
    "candidates": [
      "n02"
    ]
  },
  {
    "id": "slot-03",
    "candidates": [
      "n03"
    ]
  },
  {
    "id": "slot-04",
    "candidates": [
      "n04"
    ]
  },
  {
    "id": "slot-05",
    "candidates": [
      "n05"
    ]
  },
  {
    "id": "slot-06",
    "candidates": [
      "n06"
    ]
  },
  {
    "id": "slot-07",
    "candidates": [
      "n07"
    ]
  },
  {
    "id": "slot-08",
    "candidates": [
      "n08"
    ]
  },
  {
    "id": "slot-09",
    "candidates": [
      "n09"
    ]
  },
  {
    "id": "slot-10",
    "candidates": [
      "n10"
    ]
  },
  {
    "id": "slot-11",
    "candidates": [
      "n11"
    ]
  },
  {
    "id": "slot-12",
    "candidates": [
      "n12"
    ]
  },
  {
    "id": "slot-13",
    "candidates": [
      "n13"
    ]
  },
  {
    "id": "slot-14",
    "candidates": [
      "n14"
    ]
  },
  {
    "id": "slot-15",
    "candidates": [
      "n15"
    ]
  },
  {
    "id": "slot-16",
    "candidates": [
      "n16"
    ]
  },
  {
    "id": "slot-17",
    "candidates": [
      "n17"
    ]
  },
  {
    "id": "slot-18",
    "candidates": [
      "n18"
    ]
  },
  {
    "id": "slot-19",
    "candidates": [
      "n19"
    ]
  },
  {
    "id": "slot-20",
    "candidates": [
      "n20"
    ]
  },
  {
    "id": "slot-21",
    "candidates": [
      "n21"
    ]
  },
  {
    "id": "slot-22",
    "candidates": [
      "n22"
    ]
  },
  {
    "id": "slot-23",
    "candidates": [
      "n23"
    ]
  },
  {
    "id": "slot-24",
    "candidates": [
      "n24"
    ]
  },
  {
    "id": "slot-25",
    "candidates": [
      "n25"
    ]
  },
  {
    "id": "slot-26",
    "candidates": [
      "n26"
    ]
  },
  {
    "id": "slot-27",
    "candidates": [
      "n27"
    ]
  },
  {
    "id": "slot-28",
    "candidates": [
      "n28"
    ]
  },
  {
    "id": "slot-29",
    "candidates": [
      "n29"
    ]
  },
  {
    "id": "slot-30",
    "candidates": [
      "n30"
    ]
  },
  {
    "id": "slot-31",
    "candidates": [
      "n31"
    ]
  },
  {
    "id": "slot-32",
    "candidates": [
      "n32"
    ]
  },
  {
    "id": "slot-33",
    "candidates": [
      "h01"
    ]
  },
  {
    "id": "slot-34",
    "candidates": [
      "h02"
    ]
  },
  {
    "id": "slot-35",
    "candidates": [
      "h03"
    ]
  },
  {
    "id": "slot-36",
    "candidates": [
      "h04"
    ]
  },
  {
    "id": "slot-37",
    "candidates": [
      "h05"
    ]
  },
  {
    "id": "slot-38",
    "candidates": [
      "h06"
    ]
  },
  {
    "id": "slot-39",
    "candidates": [
      "h07"
    ]
  },
  {
    "id": "slot-40",
    "candidates": [
      "h08"
    ]
  }
];
for (const question of QUESTIONS) {
  const reactions = HOST_REACTIONS[question.id];
  if (!reactions) continue;
  for (const option of question.options)
    if (reactions[option.id]) option.reaction = reactions[option.id];
}

export const QUESTIONS_BY_ID = new Map(QUESTIONS.map((question) => [question.id, question]));
