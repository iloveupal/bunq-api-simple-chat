import { reduceUserArrayById } from 'Modules/chat/domains/users/UsersUtils';

import {
    ApiService,
    API_CHATS__GET_USERS,
} from 'Modules/chat/api/ChatsApi';

import {
    navigateToLoading,
    navigateToLogin,
    navigateToError,
} from './NavigationActions';

import {
    setUsers
} from './UserActions';


export const finishChatModuleInitialization = (users) => (dispatch) => {
    dispatch(setUsers(users));
    dispatch(navigateToLogin());
};

export const initializeChatModule = (dispatch) => {
    dispatch(navigateToLoading());

    ApiService(API_CHATS__GET_USERS)
        .then(
            ({ data }) =>
                dispatch(finishChatModuleInitialization(reduceUserArrayById(data)))
        )
        .catch(
            ( error ) =>
                dispatch(navigateToError({ error }))
        );
};
