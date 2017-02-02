export const StoreUser = (name, email, avatar, id) => {
  return {
    type: 'STORE_USER',
    name: name,
    email: email,
    avatar: avatar,
    id: id
  };
};
