import {
    ACTION_TYPES__CHAT_SET_CURRENT_ROUTE,
} from 'Modules/chat/action-types/NavigationActionTypes';

import {
    ACTION_TYPES__CHAT_SET_CURRENT_USER,
    ACTION_TYPES__CHAT_SET_USERS,
} from 'Modules/chat/action-types/UsersActionTypes';

import {
    ACTION_TYPES__CHAT_SET_MESSAGES_LOADING_STATE,
    ACTION_TYPES__CHAT_SET_MESSAGES,
    ACTION_TYPES__CHAT_SET_MESSAGES_ALL_LOADED,
    ACTION_TYPES__CHAT_SET_MESSAGES_SENDING_STATE,
} from 'Modules/chat/action-types/MessagesActionTypes';

import {
    ACTION_TYPES__CHAT_CONVERSATIONS_SET_LOADING_STATE,
    ACTION_TYPES__CHAT_CONVERSATIONS_SET,
    ACTION_TYPES__CHAT_CONVERSATIONS_SET_CURRENT,
} from 'Modules/chat/action-types/ConversationsActionTypes';

import {
    mergeMessages,
} from 'Modules/chat/domains/messages/MessagesUtils';


const initialState = {
    userConversations: {},
    userConversationsLoading: false,
    users: {},
    currentUser: null,
    currentConversation: null,
    messages: {},
    messagesLoadingState: {},
    messagesSendingState: {},
    messagesAllLoaded: {},
    currentRoute: null,
};

export default function (state = initialState, action) {
    switch( action.type ) {
        case ACTION_TYPES__CHAT_SET_CURRENT_ROUTE:
            return {
                ...state,
                currentRoute: action.payload,
            };
        case ACTION_TYPES__CHAT_SET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case ACTION_TYPES__CHAT_SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            };
        case ACTION_TYPES__CHAT_CONVERSATIONS_SET_LOADING_STATE:
            return {
                ...state,
                userConversationsLoading: action.payload,
            };
        case ACTION_TYPES__CHAT_CONVERSATIONS_SET:
            return {
                ...state,
                userConversations: {
                    ...state.userConversations,
                    [action.payload.userId]: action.payload.conversations,
                },
            };
        case ACTION_TYPES__CHAT_CONVERSATIONS_SET_CURRENT:
            return {
                ...state,
                currentConversation: action.payload,
            };
        case ACTION_TYPES__CHAT_SET_MESSAGES_LOADING_STATE:
            return {
                ...state,
                messagesLoadingState: {
                    ...state.messagesLoadingState,
                    [action.payload.conversationId]: action.payload.state,
                },
            };
        case ACTION_TYPES__CHAT_SET_MESSAGES_ALL_LOADED:
            return {
                ...state,
                messagesAllLoaded: {
                    ...state.messagesAllLoaded,
                    [action.payload.conversationId]: action.payload.state,
                }
            };
        case ACTION_TYPES__CHAT_SET_MESSAGES:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.conversationId]: mergeMessages(state.messages[action.payload.conversationId], action.payload),
                },
            };
        case ACTION_TYPES__CHAT_SET_MESSAGES_SENDING_STATE:
            return {
                ...state,
                messagesSendingState: {
                    ...state.messagesSendingState,
                    [action.payload.conversationId]: action.payload.state,
                },
            };
        default:
            return { ...state };
    }
}