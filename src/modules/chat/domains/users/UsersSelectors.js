import lodashGet from 'lodash/get';

export const getUsers = (store) => lodashGet(store, 'chat.users', {});
export const getUsersArray = (store) => Object.values(getUsers(store));