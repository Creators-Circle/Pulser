import { createStore, combineReducers } from 'redux';


//  reducer for INCREMENT/DECREMENT
const pulseData = (state = [], action) => {
  // let last = state[ state.length - 1 ]
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

// store all reducers in one variable
const combinedReducers = combineReducers({
  pulseData
});

const store = createStore(combinedReducers);

export default store;

export const exportPulseData = pulseData; //  new variable created for export to make pulseData available for testing
