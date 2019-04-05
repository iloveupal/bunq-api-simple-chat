import lodashGet from 'lodash/get';

export const getUsers = (state) => lodashGet(state, 'chat.users', {});
export const getUsersArray = (state) => Object.values(getUsers(state));
export const getUserById = (state, id) => getUsers(state)[id];

export const getCurrentUser = (state) => lodashGet(state, 'chat.currentUser', null);
export const getCurrentUserObject = (state) => getUserById(state, getCurrentUser(state));