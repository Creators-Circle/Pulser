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

export default presentationStartTime;
