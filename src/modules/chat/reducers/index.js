import {
    ACTION_TYPES__CHAT_SET_CURRENT_ROUTE,
    ACTION_TYPES__CHAT_SET_USERS,
} from 'Modules/chat/action-types/ChatActionTypes';

const initialState = {
    userConversations: {},
    users: {},
    currentUser: null,
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
        default:
            return { ...state };
    }
}