// test for userLectures reducer
const assert = require('assert');
import lectures from '../client/src/reducers/userLectures.jsx';

describe('userLectures', function() {
  var testState = [{id:'1232ds', name:'test presentation', date: '2017-01-03 22:58:04.039861+00'}];

  describe('UNDEFINED ACTION', function(){
    it('should return default state if action is undefined', function () {
      assert.deepEqual(testState, lectures(testState, {type: 'TEST'}));
    });
  });
  describe('STORE_USER_LECTURES', function() {
    it('should add a new lectures', function() {
      assert.deepEqual(testState, lectures([],
        {type:'STORE_USER_LECTURES',
        lectures:[{id:'1232ds', name:'test presentation', date: '2017-01-03 22:58:04.039861+00'}]}));
    });
  });
});
