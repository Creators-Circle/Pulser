import { createStore, combineReducers } from 'redux';

//  reducer for INCREMENT/DECREMENT
// x = time of clicks, y = number of clicks
const pulseData = (state = [{x: 0, y: 0}], action) => {
  let last = state[ state.length - 1 ].y;
  switch (action.type) {
    case 'INCREMENT':
      return [...state, { x: action.time, y: ++last }];
    case 'DECREMENT':
      if (last !== 0) {
        return [...state, { x: action.time, y: --last }];
      }
      return [...state, { x: action.time, y: 0 }];
    default:
      return state;
  }
};

// reducer for storing the time the presentation starts
const presentationStartTime = (state = 0, action) => {
  let startTime = new Date();
  switch (action.type) {
    case 'SET_TIME_START':
      return startTime;
    default:
      return state;
  }
};
// reducer for tracking the number of clicks from each audience member
// state = {user: [time, time, ...]}
// action = {type: 'ADDCLICKTOUSER', user: String, time: String}
const usersClicks = (state = {}, action) => {
  if (action.time === undefined || action.user === undefined || state === undefined) {
    return state;
  }
  let user = action.user;
  let time = action.time;
  let addObj = {};
  switch (action.type) {
    case 'ADDCLICKTOUSER':
      if (state[user]) {
        addObj[action.user] = state[user].concat([time]);
      } else {
        addObj[action.user] = [time];
      }
      return {...state, ...addObj};
    default:
      return state;
  }
};

// store all reducers in one variable
const combinedReducers = combineReducers({
  pulseData,
  presentationStartTime,
  usersClicks
});

const store = createStore(combinedReducers);

export default store;

// testing line chart -- delete this once the set time functionality is working in the client side
store.dispatch({type: 'SET_TIME_START'});
console.log('time', store.getState().presentationStartTime);
// --------------------------------------------------------------------/

export const exportPulseData = pulseData; // new variable created for export to make pulseData available for testing
export const exportUsersClicks = usersClicks;
