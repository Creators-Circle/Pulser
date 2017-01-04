// reducer for storing data about a presentation, including a lectureId for that lecture
// state = { lectureId: lectureId : name: String, id: String, ...}
// action = {type: STRING, presentationId: String, presentationName: String, lectureId: String }
const activeLecture = (state = {}, action) => {
  switch (action.type) {
    case 'ASSIGN_LECTURE_ID':
      if (action.lectureId === undefined) {
        return state;
      } else {
        return Object.assign(state, {
          lectureId: action.lectureId,
          name: action.name,
          id: action.presentationId,
          embedUrl: action.embedUrl,
          socket: action.socket
        });
      }
    default:
      return state;
  }
};
export default activeLecture;
