import test from 'node:test';
import assert from 'node:assert/strict';
import { buildDossierStory } from '../src/dossier-story.js';
import { makeDossierFixture } from '../src/dossier-fixtures.js';
import { getResult, createSession, currentQuestion, answerQuestion, serializeSession, restoreSession } from '../src/dossier-session.js';

test('expanded story cites only scored profile receipts across every edition and voice', () => {
  for (const route of ['everyday','work_study','social']) for (const voice of ['gentle','playful','sharp']) for (const fixture of ['complete','mixed','sparse','skipped']) {
    const result = getResult(makeDossierFixture(fixture,{route,voice}));
    const before = JSON.stringify(result);
    const story = buildDossierStory(result);
    const allowed = new Set(result.receipts.filter(row=>!row.missingness && row.phase !== 'heldout').map(row=>row.evidenceId));
    for(const section of [story.opening,...story.chapters,...story.caseFiles]) {
      for(const id of section.evidenceIds) assert.ok(allowed.has(id),`${fixture}/${route}/${voice}: ${id}`);
      assert.ok(section.title && section.paragraphs.length);
    }
    assert.equal(JSON.stringify(result),before,'editorial layer must not mutate the frozen reading');
    assert.doesNotMatch(JSON.stringify(story),/undefined|NaN|\[object Object\]/);
    if(fixture==='skipped') { assert.equal(story.caseFiles.length,0); assert.ok(story.chapters.every(c=>c.evidenceIds.length===0)); }
  }
});

test('voice changes narrative delivery while preserving source citations', () => {
  const result = getResult(makeDossierFixture('complete'));
  const gentle = buildDossierStory({...result,config:{...result.config,voice:'gentle'}});
  const sharp = buildDossierStory({...result,config:{...result.config,voice:'sharp'}});
  assert.notDeepEqual(gentle.opening.paragraphs,sharp.opening.paragraphs);
  assert.deepEqual(gentle.caseFiles.map(c=>c.evidenceIds),sharp.caseFiles.map(c=>c.evidenceIds));
});

test('restored question-card notes survive saving without becoming evidence', () => {
  const state = createSession({route:'everyday'});
  const q = currentQuestion(state).template;
  const answer = q.options[0].id;
  const plain = answerQuestion(state,q.itemId,answer);
  const noted = answerQuestion(state,q.itemId,answer,{note:'A private, unscored context note.'});
  const restored = restoreSession(serializeSession(noted));
  assert.equal(restored.responses[q.itemId].note,'A private, unscored context note.');
  assert.deepEqual(noted.events.map(e=>e.predicates),plain.events.map(e=>e.predicates));
  assert.ok(!JSON.stringify(noted.events).includes('private, unscored context note'));
});
