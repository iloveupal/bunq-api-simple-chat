import lodashGet from 'lodash/get';

export const getUsers = (state) => lodashGet(state, 'chat.users', {});
export const getUsersArray = (state) => Object.values(getUsers(state));

export const getCurrentUser = (state) => lodashGet(state, 'chat.currentUser', null);