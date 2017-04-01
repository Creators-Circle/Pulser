import usersClicks from '../client/src/reducers/usersClicks';

const assert = require('assert');
const deepFreeze = require('deep-freeze');
let resultState;
let testState;
describe('usersClicks', () => {
  it('should return state if action.type is undefined', () => {
    resultState = { 'Ari': [10] };
    assert.deepEqual(resultState, usersClicks(resultState, {
      type: 'ARGLEBARGLE',
      user: 'Ari',
      time: 10
    }));
  });

  it('should return state if action.user is not a proper name value', () => {
    resultState = { 'Ari': [10, 11], 'Ross': [11, 12] };
    assert.deepEqual(resultState, usersClicks(resultState, {
      type: 'ADDCLICKTOUSER',
      user: 99,
      time: 10
    }));
  });

  it('should return state if action.time is undefined', () => {
    resultState = { 'Ari': [10, 11], 'Ross': [11, 12] };
    assert.deepEqual(resultState, usersClicks(resultState, {
      type: 'ADDCLICKTOUSER',
      user: 'Ari',
      time: undefined
    }));
  });

  it('should add a click to a user\'s clicks array if a user is specified', () => {
    testState = {
      Ari: [9, 5, 6],
      Ross: [5],
      Christian: []
    };
    assert.equal(4, usersClicks(testState, {
      type: 'ADDCLICKTOUSER',
      user: 'Ari',
      time: 10
    }).Ari.length);
  });

  it('should add a user to state on their first click', () => {
    resultState = { Ari: [10] };
    testState = {};
    assert.deepEqual(resultState, usersClicks(testState, {
      type: 'ADDCLICKTOUSER',
      user: 'Ari',
      time: 10
    }));
  });
});
