import { makeActionCreator } from 'Framework/reduxActions';
import { reduceConversationsArrayById } from 'Modules/chat/domains/conversations/ConversationsUtils';

import {
    ACTION_TYPES__CHAT_CONVERSATIONS_SET_LOADING_STATE,
    ACTION_TYPES__CHAT_CONVERSATIONS_SET,
    ACTION_TYPES__CHAT_CONVERSATIONS_SET_CURRENT,
} from 'Modules/chat/action-types/ConversationsActionTypes';

import {
    getCurrentUser,
} from 'Modules/chat/domains/users/UsersSelectors';

import {
    API_CHATS__GET_CONVERSATIONS_OF_USER,
    ApiService,
} from 'Modules/chat/api/ChatsApi';

import { navigateToError } from 'Modules/chat/actions/NavigationActions';


export const setConversationsLoadingState = makeActionCreator(ACTION_TYPES__CHAT_CONVERSATIONS_SET_LOADING_STATE);
export const setUserConversations = makeActionCreator(ACTION_TYPES__CHAT_CONVERSATIONS_SET);
export const setCurrentConversation = makeActionCreator(ACTION_TYPES__CHAT_CONVERSATIONS_SET_CURRENT);

export const loadConversations = () => (dispatch, getState) => {
    const state = getState();

    const userId = getCurrentUser(state);

    dispatch(setConversationsLoadingState(true));

    ApiService(API_CHATS__GET_CONVERSATIONS_OF_USER, { userId })
        .then(({ data }) => {
            dispatch(setConversationsLoadingState(false));
            dispatch(setUserConversations({
                userId,
                conversations: reduceConversationsArrayById(data),
            }));
        })
        .catch(( error ) => navigateToError({ error }));
};
