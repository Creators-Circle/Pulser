const deepFreeze = require('deep-freeze');
const assert = require('assert');
import activeLecture from '../client/src/reducers/activeLecture';

describe('activeLecture', function() {

 var testState

  beforeEach(function() {
  // runs before all tests in this block
    testState = {lectureId: 'aaabbb', id: '1Tt1MS8EhDTrmF6SUQBcnSs0yxQnUB7pwDJnzrLVfzX8', name: 'Copy of REGEX'};
    deepFreeze(testState);
  });

  describe('ASSIGN_LECTURE_ID', function(){
    it('it should associate a given presentationId and name with a given lectureId', function(){
      assert.deepEqual(activeLecture({}, {type: 'ASSIGN_LECTURE_ID', lectureId: 'aaabbb', name: 'Copy of REGEX', presentationId: '1Tt1MS8EhDTrmF6SUQBcnSs0yxQnUB7pwDJnzrLVfzX8'}), testState);
    });
  });
});