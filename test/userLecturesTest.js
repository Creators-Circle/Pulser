import lectures from '../client/src/reducers/userLectures.jsx';

const assert = require('assert');
const deepFreeze = require('deep-freeze');

describe('userLectures', () => {
  const testState = [];
  deepFreeze(testState);
  const resultState = [{
    id: '1232ds',
    name: 'test presentation',
    date: '2017-01-03 22:58:04.039861+00'
  }];

  describe('UNDEFINED ACTION', () => {
    it('should return default state if action is undefined', () => {
      assert.deepEqual(testState, lectures(testState, { type: 'TEST' }));
    });
  });

  describe('STORE_USER_LECTURES', () => {
    xit('should add new lectures', () => {
      assert.deepEqual(resultState,
        lectures(testState,
          {
            type: 'STORE_USER_LECTURES',
            lectures: [{
              id: '1232ds',
              name: 'test presentation',
              date: '2017-01-03 22:58:04.039861+00'}]
          }
        )
      );
    });
  });
});
