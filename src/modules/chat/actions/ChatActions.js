import { makeActionCreator } from 'Framework/reduxActions';

import { reduceUserArrayById } from 'Modules/chat/domains/users/UsersUtils';

import {
    ACTION_TYPES__CHAT_SET_CURRENT_ROUTE,
    ACTION_TYPES__CHAT_SET_USERS,
} from 'Modules/chat/action-types/ChatActionTypes';

import {
    createRoute,
    CHAT_ROUTE__LOADING,
    CHAT_ROUTE__LOGIN,
    CHAT_ROUTE__ERROR,
} from 'Modules/chat/constants/ChatRoutes';

import {
    ApiService,
    API_CHATS__GET_USERS,
} from 'Modules/chat/api/ChatsApi';


export const setCurrentRoute = makeActionCreator(ACTION_TYPES__CHAT_SET_CURRENT_ROUTE);
export const setUsers = makeActionCreator(ACTION_TYPES__CHAT_SET_USERS);

export const finishChatModuleInitialization = (payload) => (dispatch) => {
    dispatch(setUsers(payload));
    dispatch(setCurrentRoute(createRoute(CHAT_ROUTE__LOGIN)));
};

export const initializeChatModule = (dispatch) => {
    dispatch(setCurrentRoute(createRoute(CHAT_ROUTE__LOADING)));

    ApiService(API_CHATS__GET_USERS)
        .then(({ data }) => dispatch(finishChatModuleInitialization(reduceUserArrayById(data))))
        .catch(( error ) => dispatch(setCurrentRoute(createRoute(CHAT_ROUTE__ERROR, { error }))));
};