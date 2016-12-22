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
export default usersClicks;
