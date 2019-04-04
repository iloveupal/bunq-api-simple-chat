import {reduceArrayByKey} from 'Utils/object';

import {
    getConversationName,
    getConversationId
} from './ConversationsPropGetters';


export const reduceConversationsArrayById = (conversationsArray) => reduceArrayByKey('conversation.conversationId', conversationsArray);

/**
 * Get a visual conversation name that we can render. If there's no actual name, render smth like "Conversation ${conversationId}".
 * @param data A convo object as it comes from the api
 */
export const renderConversationName = (data) => {
    const conversationName = getConversationName(data);
    const conversationId = getConversationId(data);

    return conversationName || `Conversation #${conversationId}`;
};