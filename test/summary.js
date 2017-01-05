// test for summary reducer
const assert = require('assert');
import summary from '../client/src/reducers/summary.jsx';

describe('summary', function () {
  var testState = {user:[{name:'tester'}],clicks:[{'id':'121'}],questions:[{question:"is this working"}]};
  describe('UNDEFINED ACTION', function(){
    it('should return default state if action is undefined', function () {
      assert.deepEqual(testState, summary(testState, {type: 'TEST'}));
    });
  });
  describe('UPDATE_SUMMARY', function(){
    it('should update the value of the state ', function () {
      assert.deepEqual(testState, summary({}, {type: 'UPDATE_SUMMARY', summary:{user:[{name:'tester'}],clicks:[{'id':'121'}],questions:[{question:"is this working"}]}}));
    });
  });

});
