// tests for thumbs reducer
const assert = require('assert');
const deepFreeze = require('deep-freeze');
import  thumbsReducer  from '../client/src/reducers/thumbsReducer.jsx';

//POINTERS:
// 1) place an x before a block of tests or an individual test to disable that test as pending
// 2) use deepFreeze to test purity of inputs

describe('thumbsReducer', function() {
  var testState = {
    topicId: '',
    displayed: false,
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

  describe('SET_TOPIC_ID', function () {
    it('it should change the value of topicId to the provided uuid', function() {
      assert.deepEqual({topicId: '323242', displayed: false, up: 0, down: 0, side: 0},
        thumbsReducer(testState,
        {type: 'SET_TOPIC_ID', topicId: '323242'}));
    });
  });

  xdescribe('THUMB_CLICKED', function () {
    it('it should increment the specific thumbType included in the action', function() {
      assert.deepEqual({topicId: '', displayed: false, up: 1, down: 0, side: 0},
        thumbsReducer(testState,
        {type: 'THUMB_CLICKED', thumbType: 'up'}));
    });
  });

  describe('CLEAR_TOPIC', function () {
    it('it should reset the count of all thumbType(s) in the store', function() {
      assert.deepEqual({topicId: '', displayed: false, up: 0, down: 0, side: 0},
        thumbsReducer({topicId: 2324, displayed: true, up: 1, down: 0, side: 0},
        {type: 'CLEAR_TOPIC'}));
    });
  });

});
