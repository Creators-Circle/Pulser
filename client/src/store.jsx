import { createStore, combineReducers } from 'redux';

// import reducers here
import user from './reducers/userReducer';
import usersClicks from './reducers/usersClicks';
import presentationStartTime from './reducers/presentationStartTime';
import pulseData from './reducers/pulseData';

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
  switch (action.type) {
    case 'ADDCLICKTOUSER':
      let newState = Object.assign({}, ...state);
      if (action.time === undefined || action.user === undefined) {
        return state;
      } else if (state[action.user] === undefined) {
        return Object.assign({}, state, {[action.user]: [action.time]});
      } else {
        return Object.assign({}, state, {[action.user]: [...state[action.user], action.time]});
      }
    default:
      return state;
  }
};
// store all reducers in one variable
const combinedReducers = combineReducers({
  pulseData,
  presentationStartTime,
  user,
  usersClicks
});

const store = createStore(combinedReducers);

export default store;

// testing user clicks
store.dispatch({ type: 'ADDCLICKTOUSER', user: 'duck', time: 1 });
store.dispatch({ type: 'ADDCLICKTOUSER', user: 'duck', time: 3 });
store.dispatch({ type: 'ADDCLICKTOUSER', user: 'rubber', time: 1 });
//

// testing line chart -- delete this once the set time functionality is working in the client side
store.dispatch({type: 'SET_TIME_START'});
console.log('time', store.getState().presentationStartTime);
// --------------------------------------------------------------------/
