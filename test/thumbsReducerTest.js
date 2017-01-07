// tests for question reducer
const assert = require('assert');
const deepFreeze = require('deep-freeze');
import  thumbsReducer  from '../client/src/reducers/thumbsReducer.jsx';

//POINTERS:
// 1) place an x before a block of tests or an individual test to disable that test as pending
// 2) use deepFreeze to test purity of inputs

describe('thumbsReducer', function() {
  var testState = {
    up: 0,
    down: 0,
    side: 0
  }
  
  deepFreeze(testState);
  describe('UNDEFINED ACTION', function(){
    it('should return default state if action is undefined', function () {
      assert.deepEqual(testState, thumbsReducer(testState, {type: 'TEST'}));
    });
  });

  // describe('CREATE_THUMBS', function () {
  //   it('it should add a new thumb to the store', function () {
  //     assert.deepEqual(testState,
  //       thumbsReducer({324234:{votes: 3, questionText: 'sample question', upvoted: false}},
  //         {type: 'CREATE_THUMBS', questionId: 435353, questionText: 'Who am I?'}));
  //   });
  // });

  describe('THUMB_CLICKED', function () {
    it('it should increment the specific thumbType included in the action', function() {
      assert.deepEqual({up: 1, down: 0, side: 0},
        thumbsReducer(testState,
        {type: 'THUMB_CLICKED', thumbType: 'up'}));
    });
  });

  describe('CLEAR_THUMBS', function () {
    it('it should reset the count of all thumbType(s) in the store', function() {
      assert.deepEqual({up: 0, down: 0, side: 0},
        thumbsReducer({up: 1, down: 0, side: 0},
        {type: 'CLEAR_THUMBS'}));
    });
  });

});
