const deepFreeze = require('deep-freeze');
const assert = require('assert');
const io = require('socket.io');
import activeLecture from '../client/src/reducers/activeLecture';

describe('activeLecture', function() {

 var testState

  beforeEach(function() {
  // runs before all tests in this block
    testState = {
      lectureId: 'aaabbb',
      presentationId: '1Tt1MS8EhDTrmF6SUQBcnSs0yxQnUB7pwDJnzrLVfzX8',
      name: 'Copy of REGEX',
      embedUrl: 'google.com',
      socket: 'argle'
    };
    deepFreeze(testState);
  });

  describe('ASSIGN_LECTURE_ID', function(){
    it('it should associate a given presentationId and name with a given lectureId', function(){
      assert.deepEqual(activeLecture({}, {
        type: 'ASSIGN_LECTURE_ID',
        lectureId: 'aaabbb',
        presentationId: '1Tt1MS8EhDTrmF6SUQBcnSs0yxQnUB7pwDJnzrLVfzX8',
        name: 'Copy of REGEX',
        embedUrl: 'google.com',
        socket: 'argle'
      }), testState);
    });
  });
});