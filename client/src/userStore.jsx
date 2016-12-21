import { createStore, combineReducers } from 'redux';

//  Reducer to set up the store with basic details.
const setUserDetails = (state = [ {username: 'Sneaky', role: 'Presenter', realname: 'Ross'} ], action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return [ ...state, {username: action.username} ];
    case 'SET_ROLE':
      return [ ...state, {role: action.role} ];
    case 'SET_REALNAME':
      return [ ...state, {realname: action.realname} ];
    default:
      return state;
  }
};

// store all reducers in one variable.  Set up now to ease refactoring later.
const combinedReducers = combineReducers({
  setUserDetails
});

//  Create userStore with combinedReducers.
const userStore = createStore(combinedReducers);

//  Export for use.
export default userStore;

// testing line chart -- delete this once the set time functionality is working in the client side

// --------------------------------------------------------------------/

export const userStoreReducer = reducer; //  export reducer for testing
