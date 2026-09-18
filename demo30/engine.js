import {QUESTIONS,DIMS,VERSION} from './data.js';
export const KEY='genii.evidence30.v1';
export function fresh(){return {version:VERSION,answers:{},notes:{},cursor:0,started:false,locked:null,reviewed:false,testSeen:false};}
export function selected(q,answers){return q.options.find(o=>o.id===answers[q.id]);}
export function facts(answers){return Object.assign({},...QUESTIONS.filter(q=>!q.test).map(q=>selected(q,answers)?.facts||{}));}
export function targetName(t,f){return t==='close'?`chosen ${f.close||'close person'}`:t==='household'?`household (${f.household||'unspecified'})`:t;}
export function evidence(answers){
 const f=facts(answers), rows=[];
 for(const q of QUESTIONS.filter(q=>!q.test)){
  const a=selected(q,answers); if(!a || q.applicable==='shared'&&f.household==='alone')continue;
  for(const tag of a.tags)rows.push({...tag,target:targetName(tag.target,f),question:q.id,questionTitle:q.title,answer:a.text,why:a.why,role:q.role||'hypothetical'});
 }
 return rows;
}
export function profile(answers){
 const rows=evidence(answers),groups={};
 for(const row of rows){const key=`${row.d}|${row.target}`;const g=groups[key]||={d:row.d,target:row.target,counts:{},rows:[]};g.counts[row.v]=(g.counts[row.v]||0)+1;g.rows.push(row);}
 return Object.values(groups).map(g=>{const ranked=Object.entries(g.counts).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]));const n=new Set(g.rows.map(r=>r.question)).size;const tie=ranked.length>1&&ranked[0][1]===ranked[1][1];return {...g,n,top:tie?null:ranked[0][0],mixed:ranked.length>1,status:n<2?'Thin evidence':tie?'Mixed evidence':ranked[0][1]/g.rows.length<.67?'Context-dependent':'Repeated pattern'};});
}
export function trainingAnswers(answers){return Object.fromEntries(QUESTIONS.filter(q=>!q.test&&Object.hasOwn(answers,q.id)).map(q=>[q.id,answers[q.id]]));}
export function signature(answers){return JSON.stringify(trainingAnswers(answers));}
export function predict(q,answers){
 const rows=evidence(answers),f=facts(answers);const support=new Set();
 const scores=q.options.map(o=>{
  const parts=o.tags.map(t=>{const relevant=rows.filter(r=>r.d===t.d&&r.target===targetName(t.target,f));relevant.forEach(r=>support.add(r.question));
   const domain=new Set(QUESTIONS.flatMap(x=>x.options.flatMap(a=>a.tags.filter(z=>z.d===t.d).map(z=>z.v))));
   return {d:t.d,target:targetName(t.target,f),value:t.v,sources:relevant.map(r=>r.question),score:relevant.length?(relevant.filter(r=>r.v===t.v).length+1)/(relevant.length+domain.size):0};
  });return {id:o.id,score:parts.reduce((n,p)=>n+p.score,0)/Math.max(1,parts.length),parts};
 }).sort((a,b)=>b.score-a.score);
 const winnerSources=new Set(scores[0].parts.flatMap(p=>p.sources)); const tied=Math.abs(scores[0].score-scores[1].score)<.025;const abstain=winnerSources.size<2||tied;
 return {question:q.id,option:abstain?null:scores[0].id,reason:winnerSources.size<2?'Too few observations supporting the leading option':tied?'No clear lead between options':'Highest evidence match',sources:[...support],scores,baseline:q.baseline};
}
export function freeze(answers){return {version:VERSION,signature:signature(answers),training:trainingAnswers(answers),profile:profile(answers),facts:facts(answers),predictions:QUESTIONS.filter(q=>q.test).map(q=>predict(q,answers))};}
export function stats(state){
 if(!state.locked)return null;
 const trials=state.locked.predictions.map(p=>{const q=QUESTIONS.find(q=>q.id===p.question),a=selected(q,state.answers);return {...p,actual:a?.id||null,skipped:!a,hit:!!a&&p.option===a.id,baselineHit:!!a&&p.baseline===a.id};});
 const attempted=trials.filter(t=>!t.skipped),predicted=attempted.filter(t=>t.option);
 return {trials,answered:attempted.length,skipped:trials.length-attempted.length,predicted:predicted.length,abstained:attempted.length-predicted.length,hits:predicted.filter(t=>t.hit).length,baselineHits:predicted.filter(t=>t.baselineHit).length,baselineAll:attempted.filter(t=>t.baselineHit).length};
}
export function setAnswer(state,id,value){
 const q=QUESTIONS.find(q=>q.id===id);if(!q||value!=='skip'&&!q.options.some(o=>o.id===value))throw Error('Invalid answer');
 if(q.applicable==='shared'&&facts(state.answers).household==='alone')value='skip';
 if(q.test&&!state.locked)throw Error('Predictions must be locked first');
 if(q.test&&Object.hasOwn(state.answers,id))throw Error('Test answers are final for this attempt');
 if(!q.test&&state.answers[id]!==value){if(state.testSeen)state.reviewed=true;state.locked=null;for(const t of QUESTIONS.filter(x=>x.test))delete state.answers[t.id];}
 state.answers[id]=value;
 if(id==='q2'&&facts(state.answers).household==='alone'){state.answers.q15='skip';delete state.notes.q15;}
 return state;
}
export function restore(raw){
 try{const x=JSON.parse(raw);if(x?.version!==VERSION)return fresh();const s=fresh();s.started=x.started===true;s.cursor=Number.isInteger(x.cursor)?Math.min(30,Math.max(0,x.cursor)):0;
  for(const q of QUESTIONS){const v=x.answers?.[q.id];if(v==='skip'||q.options.some(o=>o.id===v))s.answers[q.id]=v;if(typeof x.notes?.[q.id]==='string')s.notes[q.id]=x.notes[q.id].slice(0,1200);}
  if(facts(s.answers).household==='alone')s.answers.q15='skip';
  const ready=QUESTIONS.filter(q=>!q.test).every(q=>Object.hasOwn(s.answers,q.id));
  if(x.locked&&ready&&x.locked.signature===signature(s.answers))s.locked=freeze(s.answers);
  else {for(const q of QUESTIONS.filter(q=>q.test))delete s.answers[q.id];s.cursor=Math.min(24,s.cursor);}
  s.reviewed=x.reviewed===true;s.testSeen=x.testSeen===true;return s;
 }catch{return fresh();}
}
export function label(v){return ({plan:'Plan before acting',improvise:'Act, then adjust',security:'Protect the budget',enjoyment:'Pay for enjoyment',convenience:'Pay for convenience',status:'Value recognizable status',direct:'Direct action',soften:'A softer opening',avoid:'Leave it unaddressed',pause:'Explicit pause',hint:'Unspoken dissatisfaction',support:'Seek connection or support',private:'Process privately',selective:'Choose another support person',secure:'Benign interpretation',reassurance:'Question the relationship or message',repair:'Own it and discuss repair',explain:'Apologize with context',action:'Repair through action',proportional:'Match contributions to costs',absorb:'Carry the extra cost',novel:'Try something new',conditional:'Investigate or add conditions',familiar:'Choose the familiar',people:'Attend to people first',task:'Attend to the task first',self:'Protect personal capacity',autonomy:'Prioritize own choice',duty:'Give weight to family expectations',noncompetitive:'Connect despite comparison',comparison:'Limit painful comparison',competitive:'Turn comparison into action',recognition:'Value recognition',act:'Choose immediate relief',wait:'Pause before acting',coordinate:'Coordinate help',bounded:'Offer bounded help',limit:'State a capacity limit',rest:'Prioritize recovery',obligation:'Prioritize obligations'})[v]||v;}
export function identity(groups){
 const repeated=groups.filter(g=>g.n>=2&&g.top&&g.status==='Repeated pattern');
 if(!repeated.length)return {title:'Still getting to know you',line:'There is not enough repeated evidence for a strong headline yet.'};
 const find=(d,v)=>repeated.some(g=>g.d===d&&g.top===v);
 if(find('D3','plan')&&find('D4','security'))return {title:'The Fine-Print Romantic',line:'You can appreciate a good idea and still want to know what it costs.'};
 const direct=repeated.find(g=>g.d==='D7'&&g.top==='direct');
 if(direct){const context=direct.target==='friend'?'friends in group situations':direct.target.startsWith('chosen ')?'your '+direct.target:direct.target;return {title:'The Direct Approach',line:`With ${context}, you repeatedly chose to raise the issue directly. Other relationships may work differently.`};}
 if(find('D14d','rest'))return {title:'The Boundary Enthusiast',line:'You have discovered that being available is not a full-time obligation.'};
 if(find('D10','act'))return {title:'The Right-Now Romantic',line:'The present moment makes a compelling case. Future you may request amendments.'};
 if(find('D6','support'))return {title:'The Shared-Lore Specialist',line:'Some things become easier when the right person hears the unedited version.'};
 return {title:'The Contextual Human',line:'Your choices change with the situation. The useful part is learning where and why.'};
}
