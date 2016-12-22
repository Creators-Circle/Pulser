import { createStore, combineReducers } from 'redux';

// import reducers here
import user from './reducers/userReducer';
import usersClicks from './reducers/usersClicks';
import presentationStartTime from './reducers/presentationStartTime';
import pulseData from './reducers/pulseData';

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
