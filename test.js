const deepFreeze = require('deep-freeze')

const pulseData = (state = [0], action) => {
  let last = state[state.length-1];
  switch (action.type) {
    case 'INCREMENT':
      return state.concat([++last])
    case 'DECREMENT':
      if(last !== 0){
      return state.concat([--last])
      } 
      return state.concat([0]);
    default:
      return state;
  }
}
  //pulseData

var assert = require('assert');
describe('Reducers', function() {
  describe('pulseData', function() {
    // it('should preserve the original state', function() { //run the function, then check whether the imput is mutated
    //   //should be handled by deepFreeze
    // });
    describe('INCREMENT', function() {
      beforeEach(function(){
      var testState = [1,2,3,4,5], testStateLength = testState.length
      deepFreeze(testState); // don't allow testState to be overwritten
    });
      
      it('last value should be one greater than the immediately preceding', function() {
        var testState = [1,2,3,4,5], testStateLength = testState.length
        deepFreeze(testState); // don't allow testState to be overwritten
        assert.equal(6, pulseData(testState, {type: 'INCREMENT'})[testStateLength])
      });

      it('new array should be longer by 1', function() {
        var testState = [1,2,3,4,5], testStateLength = testState.length
        deepFreeze(testState); // don't allow testState to be overwritten
        assert.equal(pulseData(testState, {type: 'INCREMENT'}).length, testStateLength+1);
      });

    });

    describe('DECREMENT', function() {
      it('last value should be one less than the immediately preceding', function() {
        var testState = [1,2,3,4,5], testStateLength = testState.length
        deepFreeze(testState); // don't allow testState to be overwritten
        assert.equal(4, pulseData(testState, {type: 'DECREMENT'})[testStateLength])      
      });

      it('new array should be longer by 1', function() {
        var testState = [1,2,3,4,5], testStateLength = testState.length
        let lengthBefore = testState.length;
        deepFreeze(testState); // don't allow testState to be overwritten
        assert.equal(pulseData(testState, {type: 'DECREMENT'}).length, lengthBefore+1);
      });

      it('pushes 0 when decrementing from 0', function() {
        var testState = [1, 0];
        
        deepFreeze(testState); // don't allow testState to be overwritten
        assert.equal([1, 0, 0], pulseData(testState, {type: 'DECREMENT'}));
      });
    });

  });
});