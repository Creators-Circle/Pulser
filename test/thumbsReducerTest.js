import thumbsReducer from '../client/src/reducers/thumbsReducer.jsx';

const assert = require('assert');
const deepFreeze = require('deep-freeze');

describe('thumbsReducer', () => {
  let resultState;
  const testState = {
    topicId: '1234',
    displayed: false,
    up: 0,
    down: 0,
    side: 0
  };
  deepFreeze(testState);

  describe('UNDEFINED ACTION', () => {
    it('should return default state if action is undefined', () => {
      assert.deepEqual(testState, thumbsReducer(testState, { type: 'TEST' }));
    });
  });

  describe('SET_TOPIC_ID', () => {
    it('should change the value of topicId to the provided uuid', () => {
      resultState = {
        topicId: '323242',
        topicName: 'ArgleBargle',
        displayed: false,
        up: 0,
        down: 0,
        side: 0
      };
      assert.deepEqual(resultState,
        thumbsReducer(testState,
          {
            type: 'SET_TOPIC',
            topicId: '323242',
            topicName: 'ArgleBargle'
          })
      );
    });
  });

  describe('THUMB_CLICKED', () => {
    it('should increment the specific thumbChoice included in the action - up', () => {
      resultState = {
        topicId: 1234,
        displayed: false,
        up: 1,
        down: 0,
        side: 0
      };
      assert.deepEqual(resultState,
        thumbsReducer(testState,
        { type: 'THUMB_CLICKED', thumbChoice: 'up' })
      );
    });

    it('should increment the specific thumbChoice included in the action - down', () => {
      resultState = {
        topicId: 1234,
        displayed: false,
        up: 0,
        down: 1,
        side: 0
      };
      assert.deepEqual(resultState,
        thumbsReducer(testState,
        { type: 'THUMB_CLICKED', thumbChoice: 'down' })
      );
    });

    it('should increment the specific thumbChoice included in the action - side', () => {
      resultState = {
        topicId: 1234,
        displayed: false,
        up: 0,
        down: 0,
        side: 1
      };
      assert.deepEqual(resultState,
        thumbsReducer(testState,
        { type: 'THUMB_CLICKED', thumbChoice: 'side' })
      );
    });
  });

  describe('CLEAR_TOPIC', () => {
    it('should reset the count of all thumbChoice(s) in the store', () => {
      resultState = {
        topicId: 0,
        displayed: false,
        up: 0,
        down: 0,
        side: 0
      };
      assert.deepEqual(resultState,
        thumbsReducer(testState,
        { type: 'CLEAR_TOPIC' })
      );
    });
  });
});
