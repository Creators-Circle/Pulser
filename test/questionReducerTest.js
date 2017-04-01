import questionReducer from '../client/src/reducers/questionReducer.jsx';

const assert = require('assert');
const deepFreeze = require('deep-freeze');

describe('questionReducer', () => {
  let resultState;
  let testState = {
    enabled: false,
    324234: { votes: 3, questionText: 'sample question', upvoted: false }
  };
  deepFreeze(testState);

  describe('UNDEFINED ACTION', () => {
    it('should return default state if action is undefined', () => {
      assert.deepEqual(testState, questionReducer(testState, { type: 'TEST' }));
    });
  });

  describe('CREATE_QUESTION', () => {
    it('should add a new question to the store', () => {
      resultState = {
        enabled: false,
        324234: { votes: 3, questionText: 'sample question', upvoted: false },
        435353: { votes: 0, questionText: 'Who am I?', upvoted: false }
      };
      assert.deepEqual(resultState,
        questionReducer(testState, { type: 'CREATE_QUESTION', questionId: 435353, questionText: 'Who am I?' })
      );
    });
  });

  describe('UPVOTE', () => {
    it('should increment the question matching the questionId', () => {
      testState = { 324234: { votes: 2, questionText: 'sample question' }, enabled: false };
      resultState = { 324234: { votes: 3, questionText: 'sample question' }, enabled: false };
      assert.deepEqual(resultState,
        questionReducer(testState, { type: 'UPVOTE', questionId: 324234 })
      );
    });
  });

  describe('DOWNVOTE', () => {
    it('should decrement the question matching the questionId', () => {
      testState = { 324234: { votes: 3, questionText: 'sample question' }, enabled: false };
      resultState = { 324234: { votes: 2, questionText: 'sample question' }, enabled: false };
      assert.deepEqual(resultState,
        questionReducer(testState, { type: 'DOWNVOTE', questionId: 324234 })
      );
    });
  });

  describe('CLEAR_QUESTIONS', () => {
    it('should clear the store of all questions', () => {
      resultState = { enabled: false };
      assert.deepEqual(resultState,
        questionReducer(testState, {type: 'CLEAR_QUESTIONS'})
      );
    });
  });

  describe('TOGGLE_UPVOTED', () => {
    it('should toggle the upvoted value for a given question', () => {
      testState = { 324234: { votes: 3, questionText: 'sample question', upvoted: false }, enabled: false };
      resultState = { 324234: { votes: 3, questionText: 'sample question', upvoted: true }, enabled: false };
      assert.deepEqual(resultState,
        questionReducer(testState, { type: 'TOGGLE_UPVOTED', questionId: 324234 })
      );
    });
  });
});
