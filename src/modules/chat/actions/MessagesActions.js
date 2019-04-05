import { makeActionCreator } from 'Framework/reduxActions';

import {
    ACTION_TYPES__CHAT_SET_MESSAGES,
    ACTION_TYPES__CHAT_SET_MESSAGES_LOADING_STATE,
} from 'Modules/chat/action-types/MessagesActionTypes';

import {
    ApiService,
    API_CHATS__GET_LIMITED_MESSAGES,
} from 'Modules/chat/api/ChatsApi';

import { navigateToError } from './NavigationActions';


export const setMessages = makeActionCreator(ACTION_TYPES__CHAT_SET_MESSAGES);
export const setMessagesLoadingState = makeActionCreator(ACTION_TYPES__CHAT_SET_MESSAGES_LOADING_STATE);

export const requestMessages = ({ conversationId, limit, offset }) => (dispatch) => {
    dispatch(setMessagesLoadingState({ conversationId, state: true }));

    ApiService(API_CHATS__GET_LIMITED_MESSAGES, {
        conversationId,
        limit,
        offset,
    })
        .then(
            ({ data }) => {
                dispatch(setMessagesLoadingState({ conversationId, state: false }));
                dispatch(setMessages({
                    offset,
                    limit,
                    conversationId,
                    data,
                }));
            }
        )
        .catch(
            (error) => {
                dispatch(setMessagesLoadingState({ conversationId, state: false }));
                navigateToError({error});
            }
        );
};
