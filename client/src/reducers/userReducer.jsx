// reducer for storing user's information
const user = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_USER':
      return {name: action.name, email: action.email, role: action.role, avatar: action.avatar};
    default:
      return state;
  }
};

export default user;
