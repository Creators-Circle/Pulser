// reducer for storing user's id for the user's summary view
const userIdSummary = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_USERID':
      return action.userId;
    default:
      return state;
  }
};

export default userIdSummary;
