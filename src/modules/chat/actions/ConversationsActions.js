import {makeActionCreator} from 'Framework/reduxActions';

import {
    ACTION_TYPES__CHAT_CONVERSATIONS_SET_LOADING_STATE,
    ACTION_TYPES_CHAT_CONVERSATIONS_SET,
} from 'Modules/chat/action-types/ConversationsActionTypes';

import {
    getCurrentUser,
} from 'Modules/chat/domains/users/UsersSelectors';

import {
    API_CHATS__GET_CONVERSATIONS_OF_USER,
    ApiService,
} from 'Modules/chat/api/ChatsApi';

import { CHAT_ROUTE__ERROR, createRoute } from 'Modules/chat/constants/ChatRoutes';

import { setCurrentRoute } from 'Modules/chat/actions/ChatActions';

import { reduceConversationsArrayById } from 'Modules/chat/domains/conversations/ConversationsUtils';


export const setConversationsLoadingState = makeActionCreator(ACTION_TYPES__CHAT_CONVERSATIONS_SET_LOADING_STATE);
export const setUserConversations = makeActionCreator(ACTION_TYPES_CHAT_CONVERSATIONS_SET);


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
        .catch(( error ) => setCurrentRoute(createRoute(CHAT_ROUTE__ERROR, { error })));
};
