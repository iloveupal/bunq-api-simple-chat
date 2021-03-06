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
    ACTION_TYPES__CHAT_CONVERSATION_ADD,
    ACTION_TYPES__SET_IS_CONVERSATION_CREATING,
} from 'Modules/chat/action-types/ConversationsActionTypes';

import {
    ACTION_TYPES__CHAT_SET_MODAL_STATE,
} from 'Modules/chat/action-types/ModalActionTypes';

import {
    mergeMessages,
} from 'Modules/chat/domains/messages/MessagesUtils';


const initialState = {
    userConversations: {},
    userConversationsLoading: false,
    users: {},
    currentUser: null,
    currentConversation: null,
    isCreatingConversation: false,
    messages: {},
    messagesLoadingState: {},
    messagesSendingState: {},
    messagesAllLoaded: {},
    currentRoute: null,
    currentModal: null,
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
        case ACTION_TYPES__CHAT_CONVERSATION_ADD:
            return {
                ...state,
                userConversations: {
                    ...state.userConversations,
                    [state.currentUser]: {
                        ...state.userConversations[state.currentUser],
                        [action.payload.id]: action.payload.data,
                    },
                }
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
        case ACTION_TYPES__CHAT_SET_MODAL_STATE:
            return {
                ...state,
                currentModal: action.payload,
            };
        case ACTION_TYPES__SET_IS_CONVERSATION_CREATING:
            return {
                ...state,
                isCreatingConversation: action.payload,
            };
        default:
            return { ...state };
    }
}