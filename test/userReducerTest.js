const assert = require('assert');
import  user  from '../client/src/reducers/userReducer.jsx';

describe('userReducer', function() {
  var testState = {};

  describe('STORE USER', function(){
    it('it should store user\'s information', function(){
      assert.deepEqual({name:"Alice", email: "alice@y.com",role:'presenter', avatar:"alice_photo"},
        user(testState, {type: 'STORE_USER',name:"Alice", email: "alice@y.com", role:'presenter', avatar:"alice_photo"}))
    });
  });

  describe('UNDEFINED ACTION', function(){
    it('should return default state if action is undefined', function(){
      assert.deepEqual(testState, user(testState, {type: 'TEST'}));
    });
  });

});
