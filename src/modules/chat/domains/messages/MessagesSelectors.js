import { getCurrentConversation } from 'Modules/chat/domains/conversations/ConversationsSelectors';
import { getLatestMessageId } from './MessagesUtils';


export const getMessages = (state) => state.chat.messages || {};
export const getMessagesLoadingState = (state) => state.chat.messagesLoadingState || {};
export const getMessagesAllLoaded = (state) => state.chat.messagesAllLoaded || {};
export const getMessagesSendingState = (state) => state.chat.messagesSendingState || {};

export const getMessagesByConversationId = (conversationId, state) => {
    return getMessages(state)[conversationId] || [];
};

export const getMessagesForCurrentConversation = (state) => {
    return getMessagesByConversationId(getCurrentConversation(state), state);
};

export const getMessagesLoadingStateByConversation = (conversationId, state) => {
    return getMessagesLoadingState(state)[conversationId] || false;
};

export const getMessagesLoadingStateForCurrentConversation = (state) => {
    return getMessagesLoadingStateByConversation(getCurrentConversation(state), state);
};

export const getMessagesAllLoadedByConversation = (conversationId, state) => {
    return getMessagesAllLoaded(state)[conversationId] || false;
};

export const getMessagesAllLoadedForCurrentConversation = (state) => {
    return getMessagesAllLoadedByConversation(getCurrentConversation(state), state);
};

export const getMessagesSendingStateByConversation = (conversationId, state) => {
    return getMessagesSendingState(state)[conversationId];
};

export const getMessagesSendingStateForCurrentConversation = (state) => {
    return getMessagesSendingStateByConversation(getCurrentConversation(state), state);
};

export const getLatestMessageIdByConversation = (conversationId, state) => {
    return getLatestMessageId(getMessagesByConversationId(conversationId, state));
};
