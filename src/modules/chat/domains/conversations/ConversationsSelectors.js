import { getCurrentUser } from 'Modules/chat/domains/users/UsersSelectors';


const getUserConversations = (state) => state.chat.userConversations;

export const getConversationsOfCurrentUser = (state) => getUserConversations(state)[getCurrentUser(state)] || {};

export const getConversationsIsLoading = (state) => state.chat.userConversationsLoading;

export const getCurrentConversation = (state) => state.chat.currentConversation;

export const getCurrentConversationObject = (state) => getConversationsOfCurrentUser(state)[getCurrentConversation(state)];

export const getIsCreatingConversation = (state) => state.chat.isCreatingConversation;
