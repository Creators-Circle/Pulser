const deepFreeze = require('deep-freeze');
import { exportPulseData } from './client/src/store.jsx'
var pulseData = exportPulseData; //this will need to be changed if the exports in store.jsx are changed
const assert = require('assert');

/*YOUR VARS FOR ALL TESTS GO HERE UNTIL BEFOREEACH GETS FIGURED OUT*/
var testState = [1,2,3,4,5], testStateLength = testState.length
deepFreeze(testState); // don't allow testState to be overwritten (tests purity)
/*END YOUR VARS FOR ALL TESTS GO HERE UNTIL BEFOREEACH GETS FIGURED OUT */      

/*YOUR TESTS GO IN THIS SECTION*/
//POINTERS:
// 1) place an x before a block of tests or an individual test to disable that test as pending
// 2) use deepFreeze to test purity of inputs

describe('Reducers', function() { //describe creates a header
  describe('pulseData', function() { //you can nest describes to make nested groups of tests
    
    describe('UNDEFINED ACTION', function(){ //if action is undefined
      it('should return state if inputted action is undefined', function(){
        assert.deepEqual(testState, pulseData(testState, {type: 'ARGLEBARGLE'}))
      })
    })

    describe('UNDEFINED STATE', function() {
      it('sets a default state if none is provided', function() {
        assert.deepEqual([0, 1], pulseData(undefined, {type: 'INCREMENT'}))      
      });
    });

    describe('INCREMENT', function() { 
      it('last value after running INCREMENT should be 1 greater than the last value before running INCREMENT', function() {
        assert.equal(6, pulseData(testState, {type: 'INCREMENT'})[testStateLength])
      })

      it('returned array should be longer by 1 after running INCREMENT', function() {
        assert.equal(pulseData(testState, {type: 'INCREMENT'}).length, testStateLength+1);
      })

    });

    describe('DECREMENT', function() {
      it('last value after running DECREMENT should be 1 less than the last value before running DECREMENT', function() {
        assert.equal(4, pulseData(testState, {type: 'DECREMENT'})[testStateLength])      
      });

      it('returned array should be longer by 1 after running DECREMENT', function() {
        assert.equal(pulseData(testState, {type: 'DECREMENT'}).length, testStateLength+1);
      });

      it('pushes 0 to array when decrementing from 0', function() {
        var zeroTestState = [1, 0]; deepFreeze(zeroTestState);
        assert.deepEqual([1, 0, 0], pulseData(zeroTestState, {type: 'DECREMENT'}));
      });
    });

  });
});