// reducer for storing all the lectures of a user
const userLectures = (state = [], action) => {
  console.log(action, 'in userLectures');
  switch (action.type) {
    case 'STORE_USER_LECTURES':
      return action.payload;
    default:
      return state;
  }
};

export default userLectures;
