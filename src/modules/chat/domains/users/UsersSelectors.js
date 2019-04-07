export const getUsers = (state) => state.chat.users;
export const getUsersArray = (state) => Object.values(getUsers(state));
export const getUserById = (state, id) => getUsers(state)[id];

export const getCurrentUser = (state) => state.chat.currentUser;
export const getCurrentUserObject = (state) => getUserById(state, getCurrentUser(state));