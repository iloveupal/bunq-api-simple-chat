import { getCurrentConversation } from 'Modules/chat/domains/conversations/ConversationsSelectors';

export const getMessages = (state) => state.chat.messages || {};

export const getMessagesByConversationId = (conversationId, state) => {
    return getMessages(state)[conversationId] || [];
};

export const getMessagesForCurrentConversation = (state) => {
    return getMessagesByConversationId(getCurrentConversation(state), state);
};