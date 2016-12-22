// reducer for tracking the number of clicks from each audience member
// state = {user: [time, time, ...]}
// action = {type: 'ADDCLICKTOUSER', user: String, time: String}
const usersClicks = (state = {}, action) => {
  if (action.time === undefined || action.user === undefined) {
    return state;
  }
  let user = action.user;
  let time = action.time;
  let addObj = {};
  switch (action.type) {
    case 'ADDCLICKTOUSER':
      Object.assign(addObj, state);
      if (state[user]) {
        addObj[action.user] = state[user].concat([time]);
      } else {
        addObj[action.user] = [time];
      }
      return addObj;
    default:
      return state;
  }
};

export default usersClicks;
