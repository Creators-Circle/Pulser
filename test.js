deepFreeze = require('deep-freeze')

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
    beforeEach(function(){
      let testState = [1,2,3,4,5], testStateLength = testState.length
      deepFreeze(testState); // don't allow testState to be overwritten
    })
    // it('should preserve the original state', function() { //run the function, then check whether the imput is mutated
    //   //should be handled by deepFreeze
    // });
    describe('INCREMENT', function() {
      it('last value should be one greater than the immediately preceding', function() {
        assert.equal(6, pulseData(testState, 'INCREMENT')[testStateLength-1])
      });

      it('new array should be longer by 1', function() {
        assert.equal(pulseData(testState, 'INCREMENT').length, testStateLength+1);
      });

    });

    describe('DECREMENT', function() {
      it('last value should be one less than the immediately preceding', function() {
        assert.equal(4, pulseData(testState, 'INCREMENT')[testStateLength-1])      
      });

      it('new array should be longer by 1', function() {
        let lengthBefore = testState.length;
        assert.equal(pulseData(testState, 'INCREMENT').length, lengthBefore+1);
      });
    });

  });
});