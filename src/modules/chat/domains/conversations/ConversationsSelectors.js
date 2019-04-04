import lodashGet from 'lodash/get';
import { getCurrentUser } from 'Modules/chat/domains/users/UsersSelectors';

const getUserConversations = (state) => lodashGet(state, 'chat.userConversations', {});

export const getConversationsOfCurrentUser = (state) => getUserConversations(state)[getCurrentUser(state)] || {};

export const getConversationsIsLoading = (state) => lodashGet(state, 'chat.userConversationsLoading', false);

