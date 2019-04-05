import { makeActionCreator } from 'Framework/reduxActions';

import {
    ACTION_TYPES__CHAT_SET_CURRENT_USER,
    ACTION_TYPES__CHAT_SET_USERS,
} from 'Modules/chat/action-types/ChatActionTypes';

import {
    navigateToConversations,
    navigateToLogin,
} from './NavigationActions';


export const setUsers = makeActionCreator(ACTION_TYPES__CHAT_SET_USERS);
export const setCurrentUser = makeActionCreator(ACTION_TYPES__CHAT_SET_CURRENT_USER);


export const selectUser = (userId) => (dispatch) => {
    dispatch(setCurrentUser(userId));
    dispatch(navigateToConversations());
};

export const logout = () => (dispatch) => {
    dispatch(navigateToLogin());
    dispatch(setCurrentUser(null));
};