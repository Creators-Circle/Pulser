// reducer for storing user's information
const user = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_USER':
      return {name: action.name, email: action.email, role: action.role, avatar: action.avatar};
    case 'CHANGE_ROLE':
      return action.role === 'presenter' || action.role === 'audience'
        ? Object.assign(state, {role: action.role}) : state;
    case 'ASSIGN_NSP':
      return action.nsp ? Object.assign(state, {nsp: action.nsp}) : state;
    default:
      return state;
  }
};

export default user;
