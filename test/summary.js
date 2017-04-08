import summary from '../client/src/reducers/summary.jsx';

const assert = require('assert');
const deepFreeze = require('deep-freeze');

describe('summary', () => {
  const resultState = { user: [ { name: 'tester' } ], clicks: [ { 'id': '121' } ], questions: [ {question: 'is this working'} ] };
  const testState = {};
  deepFreeze(testState);

  describe('UNDEFINED ACTION', () => {
    it('should return default state if action is undefined', () => {
      assert.deepEqual(testState, summary(testState, { type: 'TEST' }));
    });
  });

  describe('UPDATE_SUMMARY', () => {
    it('should update the value of the state', () => {
      assert.deepEqual(resultState, summary(testState, {
        type: 'UPDATE_SUMMARY',
        payload: {
          user: [ { name: 'tester' } ],
          clicks: [ { 'id': '121' } ],
          questions: [ { question: 'is this working' } ]
        }
      }));
    });
  });
});
