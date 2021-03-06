import { makeActionCreator } from 'Framework/reduxActions';

import {
    ACTION_TYPES__CHAT_SET_CURRENT_USER,
    ACTION_TYPES__CHAT_SET_USERS,
} from 'Modules/chat/action-types/UsersActionTypes';

import {
    navigateToConversations,
    navigateToLogin,
} from './NavigationActions';

import {setCurrentConversation} from './ConversationsActions';


export const setUsers = makeActionCreator(ACTION_TYPES__CHAT_SET_USERS);
export const setCurrentUser = makeActionCreator(ACTION_TYPES__CHAT_SET_CURRENT_USER);


export const selectUser = (userId) => (dispatch) => {
    dispatch(setCurrentUser(userId));
    dispatch(navigateToConversations());
};

export const logout = () => (dispatch) => {
    dispatch(navigateToLogin());
    dispatch(setCurrentUser(null));
    dispatch(setCurrentConversation(null));
};