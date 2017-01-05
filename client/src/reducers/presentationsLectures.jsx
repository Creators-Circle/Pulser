// reducer for storing data about a presentation, including a lectureId for that lecture
// state = { lectureId1 : {name: String, id: String}, ...}
// action = {type: STRING, presentationId: String, presentationName: String, lectureId: String }
const presentationsLectures = (state = {}, action) => {
  switch (action.type) {
    case 'ASSIGN_LECTURE_ID':
      if (action.presentationName === undefined || action.presentationId === undefined || action.lectureId === undefined) {
        return state;
      } else {
        return Object.assign(state, {[action.lectureId]: {name: action.presentationName, id: action.presentationId}});
      }
    default:
      return state;
  }
};
export default presentationsLectures;
