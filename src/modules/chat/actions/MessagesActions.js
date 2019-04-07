import lodashIsArray from 'lodash/isArray';

import { makeActionCreator } from 'Framework/reduxActions';

import {
    ACTION_TYPES__CHAT_SET_MESSAGES,
    ACTION_TYPES__CHAT_SET_MESSAGES_LOADING_STATE,
    ACTION_TYPES__CHAT_SET_MESSAGES_ALL_LOADED,
    ACTION_TYPES__CHAT_SET_MESSAGES_SENDING_STATE,
} from 'Modules/chat/action-types/MessagesActionTypes';

import {
    getLatestMessageIdByConversation,
} from 'Modules/chat/domains/messages/MessagesSelectors';

import { getCurrentConversation } from 'Modules/chat/domains/conversations/ConversationsSelectors';
import { getCurrentUser } from 'Modules/chat/domains/users/UsersSelectors';

import { navigateToError } from './NavigationActions';

import {
    ApiService,
    API_CHATS__GET_LIMITED_MESSAGES, API_CHATS__SEND_MESSAGE, API_CHATS__POLL_MESSAGES,
} from 'Modules/chat/api/ChatsApi';


export const setMessages = makeActionCreator(ACTION_TYPES__CHAT_SET_MESSAGES);
export const setMessagesLoadingState = makeActionCreator(ACTION_TYPES__CHAT_SET_MESSAGES_LOADING_STATE);
export const setMessagesAllLoaded = makeActionCreator(ACTION_TYPES__CHAT_SET_MESSAGES_ALL_LOADED);
export const setMessagesSendingState = makeActionCreator(ACTION_TYPES__CHAT_SET_MESSAGES_SENDING_STATE);

export const requestMessagesActionConstructor = (apiService) => ({ conversationId, limit, offset }) => (dispatch) => {
    dispatch(setMessagesLoadingState({ conversationId, state: true }));

    return apiService(API_CHATS__GET_LIMITED_MESSAGES, {
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

                if ( data.length < limit ) {
                    dispatch(setMessagesAllLoaded({ conversationId, state: true }));
                }
            }
        )
        .catch(
            (error) => {
                dispatch(setMessagesLoadingState({ conversationId, state: false }));
                navigateToError({error});
            }
        );
};

export const requestMessages = requestMessagesActionConstructor(ApiService);


export const sendMessageActionConstructor = (apiService) => (message) => (dispatch, getState) => {
    const state = getState();

    const conversationId = getCurrentConversation(state);
    const userId = getCurrentUser(state);

    dispatch(setMessagesSendingState({
        conversationId,
        state: true,
    }));

    return apiService(API_CHATS__SEND_MESSAGE, {
        conversationId,
        userId,
        message,
    })
        .then(
            ({ data }) => {
                if ( data.id ) {
                    dispatch(setMessages({
                        isNew: true,
                        conversationId,
                        data: [{
                            id: data.id,
                            senderId: userId,
                            message,
                        }],
                    }));

                    dispatch(setMessagesSendingState({
                        conversationId,
                        state: false,
                    }));
                }
                else {
                    throw new Error("Message wasn't sent");
                }
            }
        )
        .catch(
            (error) => {
                dispatch(setMessagesSendingState({
                    conversationId,
                    state: false,
                }));
                navigateToError({error});
            }
        );
};

export const sendMessage = sendMessageActionConstructor(ApiService);


export const pollNewMessagesActionConstructor = (apiService) => (conversationId) => (dispatch, getState) => {
    const lastMessageId = getLatestMessageIdByConversation(conversationId, getState());

    if ( lastMessageId === -1 ) {
        return;
    }

    return apiService(API_CHATS__POLL_MESSAGES, {
        conversationId,
        lastMessageId: String(lastMessageId),
    })
        .then(
            ({ data, status }) => {
                if ( status !== 200 ) {
                    return;
                }

                if ( lodashIsArray(data) ) {
                    dispatch(setMessages({
                        isNew: true,
                        conversationId,
                        data,
                    }));
                }
            }
        )
        .catch(
            (error) => {
                navigateToError({error});
            }
        );
};

export const pollNewMessages = pollNewMessagesActionConstructor(ApiService);
