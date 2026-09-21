/** Display-only game identity. No scoring, random rolls, clocks or held-out answers. */
export const GAME_OUTCOME_VERSION = 'genii-character-pairs-v1';
const ORDER = ['activation_tempo','social_signal_style','friction_posture','structure_reliance','novelty_aperture'];
const PAIRS = {
  '0:1': ['The quiet opening act','The room-reading narrator','The undercover starter','The conversation catalyst'],
  '0:2': ['The patient peacekeeper','The deliberate line-drawer','The soft-landing starter','The first-move fixer'],
  '0:3': ['The unhurried improviser','The deliberate plot architect','The first-draft adventurer','The launch-plan specialist'],
  '0:4': ['The keeper of good things','The side-quest scout','The familiar-route sprinter','The side-quest director'],
  '1:2': ['The backstage peacekeeper','The quiet boundary officer','The room-temperature diplomat','The clear-air correspondent'],
  '1:3': ['The private improviser','The backstage architect','The live-commentary improviser','The group-chat producer'],
  '1:4': ['The keeper of the good corner','The undercover explorer','The familiar-face host','The open-door adventurer'],
  '2:3': ['The soft-landing improviser','The peace-plan architect','The reroute negotiator','The boundary blueprint maker'],
  '2:4': ['The comfort-zone diplomat','The low-drama explorer','The familiar-ground defender','The side-quest negotiator'],
  '3:4': ['The familiar-route freestyler','The detour collector','The keeper of the good plan','The itinerary with a plot twist'],
};
const SINGLE = [ ['The opening-scene observer','The first-move specialist'],['The backstage correspondent','The visible-signal sender'],['The temperature keeper','The repair-and-boundary specialist'],['The working improviser','The plan architect'],['The reliable-favorite curator','The side-quest scout'] ];
const LINES = {
  activation_tempo: {
    left: {gentle:'You give the scene a moment before stepping in.',playful:'The first move can wait until the room has explained itself.',sharp:'The scene gets an observation period before it gets you.'},
    right:{gentle:'A small first move helps you find your way in.',playful:'You would rather give the idea a test drive than another meeting.',sharp:'The situation can finish its presentation after you try something.'}
  },
  social_signal_style:{
    left:{gentle:'The quieter channel often suits the message.',playful:'Some messages work better without a press conference.',sharp:'Your signal does not need an audience to count.'},
    right:{gentle:'You tend to make the message clear to the room.',playful:'The room usually gets an actual message, not a decoding assignment.',sharp:'You prefer the message where people can read it.'}
  },
  friction_posture:{
    left:{gentle:'You often give tension a little space first.',playful:'Not every awkward moment gets promoted to a summit.',sharp:'An awkward moment has to earn its formal hearing.'},
    right:{gentle:'You look for a way to name or repair the mismatch.',playful:'The awkward thing is already here; you might as well give it a name.',sharp:'You are willing to address the elephant before it signs a lease.'}
  },
  structure_reliance:{
    left:{gentle:'The plan can take shape as you go.',playful:'The plan is allowed to learn on the job.',sharp:'Your first draft does not need a constitution.'},
    right:{gentle:'A few clear coordinates help you move forward.',playful:'A little structure keeps the plot from eating the afternoon.',sharp:'A plan should come with at least a few actual coordinates.'}
  },
  novelty_aperture:{
    left:{gentle:'A reliable favorite has earned its place.',playful:'The familiar option has a good reference from you.',sharp:'Being new is not, by itself, a qualification.'},
    right:{gentle:'An unfamiliar option can be worth a small try.',playful:'You leave a little room in the day for a side quest.',sharp:'The unfamiliar gets an audition, not automatic rejection.'}
  }
};
export function buildGameOutcome(projection = {}, voice = 'playful') {
  const axes = (projection.axes || []).filter(a=>ORDER.includes(a.axisId) && ['supported','strongly_supported'].includes(a.supportLevel) && ['left','right'].includes(a.direction));
  const ranked = [...axes].sort((a,b)=> (b.supportLevel==='strongly_supported')-(a.supportLevel==='strongly_supported') || (b.supportingEvidenceIds?.length || 0)-(a.supportingEvidenceIds?.length || 0) || ORDER.indexOf(a.axisId)-ORDER.indexOf(b.axisId));
  const selected = ranked.slice(0,2).sort((a,b)=>ORDER.indexOf(a.axisId)-ORDER.indexOf(b.axisId));
  let label='Plot still developing', ruleId='plot-still-developing';
  if(selected.length===2){const [a,b]=selected;const pair=`${ORDER.indexOf(a.axisId)}:${ORDER.indexOf(b.axisId)}`; const variant=(a.direction==='right'?2:0)+(b.direction==='right'?1:0);label=PAIRS[pair][variant];ruleId=`pair-${pair.replace(':','-')}-${variant}`;}
  else if(selected.length===1){const a=selected[0];label=SINGLE[ORDER.indexOf(a.axisId)][a.direction==='right'?1:0];ruleId=`single-${a.axisId}-${a.direction}`;}
  const axisIds=selected.map(a=>a.axisId);
  const evidenceIds=[...new Set(selected.flatMap(a=>a.supportingEvidenceIds || []))];
  const hook=selected.length ? selected.map(a=>LINES[a.axisId][a.direction][voice] || LINES[a.axisId][a.direction].playful).join(' ') : 'A few pages are still blank. Genii is leaving room for your version.';
  return {kind:'playful_nickname',version:GAME_OUTCOME_VERSION,label,ruleId,axisIds,evidenceIds,hook,provisional:true};
}
/** Deliberately tiny public DTO. Never accept free text, receipts or snapshot IDs. */
export function createChallengeCard(outcome) {
  return { title:outcome.label, caption:`I got “${outcome.label}” in Genii. What would it call you?`, invitation:'Take your own turn. Compare titles, then debate the receipts.', kind:'game_nickname_only' };
}
