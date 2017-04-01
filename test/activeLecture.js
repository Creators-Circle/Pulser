import activeLecture from '../client/src/reducers/activeLecture';

const deepFreeze = require('deep-freeze');
const assert = require('assert');

describe('activeLecture', () => {
  let testState, resultState;

  beforeEach(() => {
    resultState = {
      lectureId: 'aaabbb',
      presentationId: '1Tt1MS8EhDTrmF6SUQBcnSs0yxQnUB7pwDJnzrLVfzX8',
      name: 'Copy of REGEX',
      embedUrl: 'google.com',
      socket: 'argle'
    };

    testState = {
      lectureId: null,
      presentationId: 'ArgleBargle',
      name: 'fancypants',
      embedUrl: null,
      socket: 'bargle'
    };
    deepFreeze(testState);
  });

  describe('ASSIGN_LECTURE_ID', () => {
    it('should associate a given presentationId and name with a given lectureId', () => {
      assert.deepEqual(activeLecture(testState, {
        type: 'ASSIGN_LECTURE_ID',
        lectureId: 'aaabbb',
        presentationId: '1Tt1MS8EhDTrmF6SUQBcnSs0yxQnUB7pwDJnzrLVfzX8',
        name: 'Copy of REGEX',
        embedUrl: 'google.com',
        socket: 'argle'
      }), resultState);
    });
  });
});
