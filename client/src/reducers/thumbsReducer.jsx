// reducer for creating thumbs, incrementing tally for each thumbType, and clearing thumbs data

// state = {
//   topicId: 0,
//   displayed: false,
//   up: 0,
//   down: 0,
//   side: 0
// }

// action = {type: 'THUMB_CLICKED', thumbChoice: 'up'}
// action = {type: 'CLEAR_TOPIC'}

const thumbsReducer = (state = {topicId: 0, displayed: false, up: 0, down: 0, side: 0}, action) => {
  switch (action.type) {
    case 'TOGGLE_DISPLAY':
      return Object.assign({}, state, {
        displayed: !state.displayed
      });
    case 'SET_TOPIC_ID':
      return Object.assign({}, state, {
        topicId: action.topicId
      });
    case 'THUMB_CLICKED':
      return Object.assign({}, state, {
        [action.thumbChoice]: state[action.thumbChoice] + 1
      });
    case 'CLEAR_TOPIC':
      return {topicId: 0, displayed: false, up: 0, down: 0, side: 0};
    default:
      return state;
  }
};
export default thumbsReducer;
