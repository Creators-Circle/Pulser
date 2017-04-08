import userReducer from '../client/src/reducers/userReducer.jsx';

const assert = require('assert');
const deepFreeze = require('deep-freeze');

describe('userReducer', () => {
  let testState = {};
  const resultState = {
    name: 'Alice',
    email: 'alice@y.com',
    role: 'presenter',
    avatar: 'alice_photo',
    id: 'a056fe6'
  };
  deepFreeze(testState);

  describe('UNDEFINED ACTION', () => {
    it('should return default state if action is undefined', () => {
      assert.deepEqual(testState, userReducer(testState, { type: 'TEST' }));
    });
  });

  describe('STORE_USER', () => {
    it('should store user\'s information', () => {
      assert.deepEqual(resultState,
        userReducer(testState, {
          type: 'STORE_USER',
          payload: {
            name: 'Alice',
            email: 'alice@y.com',
            role: 'presenter',
            avatar: 'alice_photo',
            id: 'a056fe6'
          }
        })
      );
    });
  });

  describe('CHANGE_ROLE', () => {
    it('should change the role of the user', () => {
      testState = {
        name: 'Alice',
        email: 'alice@y.com',
        role: 'audience',
        avatar: 'alice_photo',
        id: 'a056fe6'
      };
      assert.deepEqual(resultState,
        userReducer(testState, { type: 'CHANGE_ROLE', role: 'presenter' })
      );
    });

    it('should not accept other roles aside from presenter or audience', () => {
      testState = {
        name: 'Alice',
        email: 'alice@y.com',
        role: 'presenter',
        avatar: 'alice_photo',
        id: 'a056fe6'
      };
      assert.deepEqual(testState, userReducer(testState, {type: 'CHANGE_ROLE', role: 'scrum master'}));
    });
  });
});
