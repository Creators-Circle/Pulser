import { createStore, combineReducers } from 'redux';


//  reducer for INCREMENT/DECREMENT
const pulseData = (state = [{x: 0, y: 0}], action) => {
  let last = state.length ? state[ state.length - 1 ].y : 0;
  let time = new Date();
  let seconds = 1;
  switch (action.type) {
    case 'INCREMENT':
      return [...state, { x: seconds, y: ++last }]
    case 'DECREMENT':
      if (last !== 0) {
        return [...state, { x: seconds, y: --last }]
      }
      return state.concat([0]);
    default:
      return state;
  }
};

// for storing the time the presentation starts
const presentationStartTime = (state = 0, action) => {
  let startTime = new Date();
  switch (action.type) {
    case 'SET_TIME_START':
      return startTime
    default:
      return state
  }
}

// store all reducers in one variable
const combinedReducers = combineReducers({
  pulseData,
  presentationStartTime
});

const store = createStore(combinedReducers);

export default store;

store.dispatch({type: 'SET_TIME_START'});
console.log('time', store.getState().presentationStartTime)


export const exportPulseData = pulseData; //  new variable created for export to make pulseData available for testing
