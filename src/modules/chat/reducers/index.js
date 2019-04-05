import {
    ACTION_TYPES__CHAT_SET_CURRENT_ROUTE, ACTION_TYPES__CHAT_SET_CURRENT_USER,
    ACTION_TYPES__CHAT_SET_USERS,
} from 'Modules/chat/action-types/ChatActionTypes';

import {
    ACTION_TYPES__CHAT_CONVERSATIONS_SET_LOADING_STATE,
    ACTION_TYPES__CHAT_CONVERSATIONS_SET, ACTION_TYPES__CHAT_CONVERSATIONS_SET_CURRENT,
} from 'Modules/chat/action-types/ConversationsActionTypes';



const initialState = {
    userConversations: {},
    userConversationsLoading: false,
    users: {},
    currentUser: null,
    currentConversation: null,
    messages: {},
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
        default:
            return { ...state };
    }
}