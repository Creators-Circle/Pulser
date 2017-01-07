// tests for question reducer
const assert = require('assert');
const deepFreeze = require('deep-freeze');
import  questionReducer  from '../client/src/reducers/questionReducer.jsx';

//POINTERS:
// 1) place an x before a block of tests or an individual test to disable that test as pending
// 2) use deepFreeze to test purity of inputs

describe('questionReducer', function() {
  var testState = {
    324234:{votes: 3, questionText: 'sample question', upvoted: false},
    435353:{votes: 1, questionText: 'Who am I?', upvoted: false}
  }
  
  deepFreeze(testState);
  describe('UNDEFINED ACTION', function(){
    it('should return default state if action is undefined', function () {
      assert.deepEqual(testState, questionReducer(testState, {type: 'TEST'}));
    });
  });

  describe('CREATE_QUESTION', function () {
    it('it should add a new question to the store', function () {
      assert.deepEqual(testState,
        questionReducer({324234:{votes: 3, questionText: 'sample question', upvoted: false}},
          {type: 'CREATE_QUESTION', questionId: 435353, questionText: 'Who am I?'}));
    });
  });

  describe('UPVOTE', function () {
    it('it should increment the question matching the questionId', function() {
      assert.deepEqual({324234:{votes: 3, questionText: 'sample question'}},
        questionReducer({324234:{votes: 2, questionText: 'sample question'}},
        {type: 'UPVOTE', questionId: 324234}));
    });
  });

  describe('DOWNVOTE', function () {
    it('it should decrement the question matching the questionId', function() {
      assert.deepEqual({324234:{votes: 2, questionText: 'sample question'}},
        questionReducer({324234:{votes: 3, questionText: 'sample question'}},
        {type: 'DOWNVOTE', questionId: 324234}));
    });
  });

  describe('CLEAR_QUESTIONS', function () {
    it('it should clear the store of all questions', function() {
      assert.deepEqual({},
        questionReducer(testState,
        {type: 'CLEAR_QUESTIONS'}));
    });
  });

  describe('TOGGLE_UPVOTED', function () {
    it('it should toggle the upvoted value for a given question', function() {
      assert.deepEqual({324234:{votes: 3, questionText: 'sample question', upvoted: false}},
        questionReducer({324234:{votes: 3, questionText: 'sample question', upvoted: true}},
        {type: 'TOGGLE_UPVOTED', questionId: 324234}));
    });
  });
});
