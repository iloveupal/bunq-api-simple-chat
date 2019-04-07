import { makeActionCreator } from 'Framework/reduxActions';
import { reduceConversationsArrayById } from 'Modules/chat/domains/conversations/ConversationsUtils';

import {
    ACTION_TYPES__CHAT_CONVERSATIONS_SET_LOADING_STATE,
    ACTION_TYPES__CHAT_CONVERSATIONS_SET,
    ACTION_TYPES__CHAT_CONVERSATIONS_SET_CURRENT,
    ACTION_TYPES__CHAT_CONVERSATION_ADD,
    ACTION_TYPES__SET_IS_CONVERSATION_CREATING,
} from 'Modules/chat/action-types/ConversationsActionTypes';

import {
    CONVERSATION_TYPE__GROUP,
    CONVERSATION_TYPE__PERSONAL,
} from 'Modules/chat/domains/conversations/ConversationsConstants';

import {
    getCurrentUser,
} from 'Modules/chat/domains/users/UsersSelectors';

import {
    getUserId,
} from 'Modules/chat/domains/users/UsersPropGetters';

import {
    API_CHATS__CREATE_GROUP_CONVERSATION,
    API_CHATS__CREATE_PERSONAL_CONVERSATION,
    API_CHATS__GET_CONVERSATIONS_OF_USER,
    ApiService,
} from 'Modules/chat/api/ChatsApi';

import { navigateToError } from './NavigationActions';
import { closeModal } from './ModalActions';


export const setConversationsLoadingState = makeActionCreator(ACTION_TYPES__CHAT_CONVERSATIONS_SET_LOADING_STATE);
export const setUserConversations = makeActionCreator(ACTION_TYPES__CHAT_CONVERSATIONS_SET);
export const addConversation = makeActionCreator(ACTION_TYPES__CHAT_CONVERSATION_ADD);
export const setCurrentConversation = makeActionCreator(ACTION_TYPES__CHAT_CONVERSATIONS_SET_CURRENT);
export const setIsCreatingConversation = makeActionCreator(ACTION_TYPES__SET_IS_CONVERSATION_CREATING);

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

export const createConversation = ({ name, type, participants }) => (dispatch) => {
    const users = participants.map((user) => getUserId(user));

    dispatch(setIsCreatingConversation(true));

    ApiService(
        (
            type === CONVERSATION_TYPE__PERSONAL
                ? API_CHATS__CREATE_PERSONAL_CONVERSATION
                : API_CHATS__CREATE_GROUP_CONVERSATION
        ),
        (
            type === CONVERSATION_TYPE__PERSONAL
                ? { users }
                : { users, name }
        )
    )
        .then(
            ({ data, status }) => {
                if ( status === 200 && data.id ) {
                    dispatch(addConversation({
                        data: {
                            conversation: {
                                id: data.id,
                                conversationId: data.id,
                                name,
                            },
                            users: participants.map((user) => ({
                                conversationId: data.id,
                                userid: getUserId(user),
                            })),
                        },
                        id: data.id,
                    }));
                    dispatch(setCurrentConversation(data.id));

                    dispatch(closeModal());
                }
                else {
                    // todo: add some sort of error banner.
                }
                dispatch(setIsCreatingConversation(false));
            }
        )
        .catch((error) => { navigateToError({ error }) });
};