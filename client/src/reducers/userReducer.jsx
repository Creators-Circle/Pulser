// reducer for storing user's information
const user = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_USER':
      return {name: action.name, email: action.email, role: action.role, avatar: action.avatar, id: action.id};
    case 'CHANGE_ROLE':
      return action.role === 'presenter' || action.role === 'audience'
        ? Object.assign(state, {role: action.role}) : state;
    default:
      return state;
  }
};

export default user;
