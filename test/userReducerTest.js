// tests for user reducer
const assert = require('assert');
const deepFreeze = require('deep-freeze');
import  user  from '../client/src/reducers/userReducer.jsx';

//POINTERS:
// 1) place an x before a block of tests or an individual test to disable that test as pending
// 2) use deepFreeze to test purity of inputs

describe('userReducer', function() {
  var testState = {name:"Alice", email: "alice@y.com",role:'presenter', avatar:"alice_photo"};
  deepFreeze(testState);
  describe('UNDEFINED ACTION', function(){
    it('should return default state if action is undefined', function () {
      assert.deepEqual(testState, user(testState, {type: 'TEST'}));
    });
  });

  describe('STORE_USER', function () {
    it('it should store user\'s information', function () {
      assert.deepEqual(testState,
        user({}, {type: 'STORE_USER',name:"Alice", email: "alice@y.com", role:'presenter', avatar:"alice_photo"}));
    });
  });

  describe('CHANGE_ROLE', function () {
    it('it should change the role of the user', function() {
      assert.deepEqual(testState,
        user({name:"Alice", email: "alice@y.com",role:'audience', avatar:"alice_photo"},
        {type: 'CHANGE_ROLE', role: 'presenter'}));
    });
    it('it should not accept other roles aside from presenter or audience', function() {
      assert.deepEqual(testState, user({name:"Alice", email: "alice@y.com",role:'presenter', avatar:"alice_photo"},
      {type: 'CHANGE_ROLE', role:'scrum master'}))
    })
  });
<<<<<<< HEAD
=======

  // describe('ASSIGN_LECTURE', function () {
  //   var lectureTestState = {name:'Alice', email: "alice@y.com",role:'presenter', avatar:"alice_photo", lecture:'123abc'};
  //   deepFreeze(lectureTestState);
  //   it('it should assign the user to a namespace', function () {
  //     assert.deepEqual(lectureTestState, user({name:"Alice", email: "alice@y.com",role:'presenter', avatar:"alice_photo"}, 
  //     {type: 'ASSIGN_LECTURE', lecture: '123abc'}));
  //   })
  // })
>>>>>>> lecturesPresentations
});
