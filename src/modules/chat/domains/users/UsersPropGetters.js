import lodashGet from 'lodash/get';

export const getUserName = (user) => lodashGet(user, 'name');
export const getUserId = (user) => lodashGet(user, 'id');
