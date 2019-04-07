import lodashGet from 'lodash/get';


export const getConversationName = (data) => lodashGet(data, 'conversation.name');
export const getConversationId = (data) => lodashGet(data, 'conversation.conversationId');
export const getConversationType = (data) => lodashGet(data, 'conversation.type');

export const getConversationUsers = (data) => lodashGet(data, 'users');