// reducer for creating questions, incrementing votes, and clearing question data

// state = {
//   questionId: {votes: #, questionText: 'sample question'},
//   questionId: {votes: #, questionText: 'sample question'},
//   questionId: {votes: #, questionText: 'sample question'}
// }

// action = {type: 'CREATE_QUESTION', questionId: string, questionText: string}
// action = {type: 'UPVOTE', questionId: string}
// action = {type: 'CLEAR_QUESTIONS'}

const questionReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_QUESTION':
      return Object.assign(state, {
        [action.questionId]: {
          questionText: action.questionText,
          votes: 1,
          upvoted: false
        }
      });
    case 'UPVOTE':
      return Object.assign(state, {
        [action.questionId]: Object.assign(state[action.questionId], state[action.questionId].votes++)
      });
    case 'DOWNVOTE':
      return Object.assign(state, {
        [action.questionId]: Object.assign(state[action.questionId], state[action.questionId].votes--)
      });
    case 'TOGGLE_UPVOTED':
      return Object.assign(state, {
        [action.questionId]: Object.assign(state[action.questionId], state[action.questionId].upvoted=!state[action.questionId].upvoted)
      }); 
    case 'CLEAR_QUESTIONS':
      return {};
    default:
      return state;
  }
};
export default questionReducer;
