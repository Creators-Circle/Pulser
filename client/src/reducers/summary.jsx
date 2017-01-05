// reducer for storing lecture's summary

const summary = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SUMMARY':
      return action.summary;
    default:
      return state;
  }
};

export default summary;
