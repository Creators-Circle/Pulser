// reducer for storing the Google picker so that it can be set back to visible later

const picker = (state = false, action) => {
  switch (action.type) {
    case 'SET_PICKER':
      return action.picker;
    default:
      return state;
  }
};
export default picker;
