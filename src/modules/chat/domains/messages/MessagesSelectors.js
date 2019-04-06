import { getCurrentConversation } from 'Modules/chat/domains/conversations/ConversationsSelectors';

export const getMessages = (state) => state.chat.messages || {};
export const getMessagesLoadingState = (state) => state.chat.messagesLoadingState || {};
export const getMessagesAllLoaded = (state) => state.chat.messagesAllLoaded || {};

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