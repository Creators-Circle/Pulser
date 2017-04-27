import search from '../client/src/reducers/searchValue.jsx';

const assert = require('assert');
const deepFreeze = require('deep-freeze');

describe('searchValue', () => {
  const testState = 'arglebargle';
  const resultState = 'search';
  deepFreeze(testState);

  describe('UNDEFINED ACTION', () => {
    it('should return default state if action is undefined', () => {
      assert.deepEqual(testState, search(testState, {type: 'TEST'}));
    });
  });

  describe('UPDATE_SEARCH_VALUE', () => {
    it('should update the value of the state ', () => {
      assert.deepEqual(resultState, search(testState, {type: 'UPDATE_SEARCH_VALUE', value: 'search'}));
    });
  });
});
