const assert = require('assert');
const deepFreeze = require('deep-freeze');
import usersClicks from '../client/src/reducers/usersClicks';

//POINTERS:
// 1) place an x before a block of tests or an individual test to disable that test as pending
// 2) use deepFreeze to test purity of inputs

  describe('usersClicks', function() {
    var testState;

    beforeEach(function() {
      testState = {Ari: [9, 5, 6], Ross: [5], Christian: []};
      testState.length
      deepFreeze(testState);
    });

    describe('undefined parameters', function(){
      it('should return state if action.type is undefined', function(){
        assert.deepEqual(testState, usersClicks(testState, {type:'ARGLEBARGLE', user:'Ari', time: 10}) )
      });

      it('should return state if action.user is undefined', function(){
        assert.deepEqual(testState, usersClicks(testState, {type:'ARGLEBARGLE', user:'Ari', time: 10}) )
      });

      it('should return state if action.time is undefined', function(){
        assert.deepEqual(testState, usersClicks(testState, {type:'ARGLEBARGLE', user:'Ari', time: 10}) )
      });
    })

    it('should add a click to a user\'s clicks array if a user is specified', function() {
      assert.equal(4, usersClicks(testState, {type:'ADDCLICKTOUSER', user:'Ari', time: 10}).Ari.length)
    })

    it('should add a user to state on their first click', function() {
      assert.deepEqual({Ari: [10]}, usersClicks({}, {type:'ADDCLICKTOUSER', user:'Ari', time: 10}) );
    })
  })
