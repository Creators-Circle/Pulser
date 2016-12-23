const deepFreeze = require('deep-freeze');
const assert = require('assert');
import pulseData from '../client/src/reducers/pulseData';

//POINTERS:
// 1) place an x before a block of tests or an individual test to disable that test as pending
// 2) use deepFreeze to test purity of inputs

describe('pulseData', function() { //you can nest describes to make nested groups of tests

 var testState, testStateLength

  beforeEach(function() {
  // runs before all tests in this block
    testState = [{x: 0,y: 1},{x: 0,y: 2},{x: 0,y: 3},{x: 0,y: 4},{x: 0,y: 5}], testStateLength = testState.length
    deepFreeze(testState);
  });

  describe('UNDEFINED ACTION', function(){ //if action is undefined
    it('should return state if action is undefined', function(){
      assert.deepEqual(testState, pulseData(testState, {type: 'ARGLEBARGLE'}));
    });
  });

  describe('UNDEFINED STATE', function() {
    it('should return a default state if state is undefined', function() {
      assert.deepEqual([{x: 0, y: 0}, {x: 0, y: 1}], pulseData(undefined, {type: 'INCREMENT',time: 0}));
    });
  });

  describe('RETURNS ARRAY', function() {
    it('returns an array', function() {
      assert.equal(Array.isArray(testState), Array.isArray(pulseData(testState, {type: 'INCREMENT',time: 0})));
    });
  });

  describe('INCREMENT', function() {
    it('last value after running INCREMENT should be 1 greater than the last value before running INCREMENT', function() {
      assert.deepEqual([{x: 0,y: 1},{x: 0,y: 2},{x: 0,y: 3},{x: 0,y: 4},{x: 0,y: 5},{x:0, y:6}], pulseData(testState, {type: 'INCREMENT',time: 0}));
    });

    it('returned array should be longer by 1 value after running INCREMENT', function() {
      assert.equal(pulseData(testState, {type: 'INCREMENT', time: 0}).length, testStateLength+1);
    });

    it('tracks different time values', function() {
      assert.deepEqual([{x: 0,y: 1},{x: 0,y: 2},{x: 0,y: 3},{x: 0,y: 4},{x: 0,y: 5},{x:1, y:6}], pulseData(testState, {type: 'INCREMENT',time: 1}));
    });
  });

  describe('DECREMENT', function() {
    it('last value after running DECREMENT should be 1 less than the last value before running DECREMENT', function() {
      assert.deepEqual([{x: 0,y: 1},{x: 0,y: 2},{x: 0,y: 3},{x: 0,y: 4},{x: 0,y: 5},{x: 0,y: 4}], pulseData(testState, {type: 'DECREMENT', time: 0}));
    });

    it('returned array should be longer by 1 value after running DECREMENT', function() {
      assert.equal(pulseData(testState, {type: 'DECREMENT', time: 0}).length, testStateLength+1);
    });

    it('tracks different time values', function() {
      assert.deepEqual([{x: 0,y: 1},{x: 0,y: 2},{x: 0,y: 3},{x: 0,y: 4},{x: 0,y: 5},{x:1, y:4}], pulseData(testState, {type: 'DECREMENT',time: 1}));
    });

    it('pushes 0 to array when DECREMENTING from 0', function() {
      var zeroTestState = [{x: 0,y: 0}]; deepFreeze(zeroTestState);
      assert.deepEqual([{x: 0,y: 0}, {x: 0,y: 0}], pulseData(zeroTestState, {type: 'DECREMENT', time: 0}));
    });
  });
});
