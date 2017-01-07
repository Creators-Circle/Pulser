// reducer for creating thumbs, incrementing tally for each thumbType, and clearing thumbs data

// state = {
//   up: 0,
//   down: 0,
//   side: 0
// }

// action = {type: 'CREATE_THUMBS'}
// action = {type: 'CLICK_THUMB', thumbType: 'thumbsup'}
// action = {type: 'CLEAR_THUMBS'}

const thumbsReducer = (state = {up: 0, down: 0, side: 0}, action) => {
  switch (action.type) {
    case 'THUMB_CLICKED':
      return Object.assign(state, {
        [action.thumbType]: state[action.thumbType] + 1
      });
    case 'CLEAR_THUMBS':
      return {up: 0, down: 0, side: 0};
    default:
      return state;
  }
};
export default thumbsReducer;
