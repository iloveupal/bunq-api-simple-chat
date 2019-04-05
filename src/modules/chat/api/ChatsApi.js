import lodashRange from 'lodash/range';

import PropTypes from 'prop-types';
import { HttpApi, MockHttpApi } from 'Framework/api';


export const API_CHATS__GET_USERS = 'API_CHATS__GET_USERS';
export const API_CHATS__GET_SINGLE_USER = 'API_CHATS__GET_SINGLE_USER';
export const API_CHATS__POLL_MESSAGES = 'API_CHATS__POLL_MESSAGES';
export const API_CHATS__GET_LIMITED_MESSAGES = 'API_CHATS__GET_LIMITED_MESSAGES';
export const API_CHATS__GET_LAST_SEEN_OF_USER = 'API_CHATS__GET_LAST_SEEN_OF_USER';
export const API_CHATS__GET_CONVERSATION_DETAILS = 'API_CHATS__GET_CONVERSATION_DETAILS';
export const API_CHATS__GET_CONVERSATIONS_OF_USER = 'API_CHATS__GET_CONVERSATIONS_OF_USER';
export const API_CHATS__SEND_MESSAGE = 'API_CHATS__SEND_MESSAGE';
export const API_CHATS__CREATE_PERSONAL_CONVERSATION = 'API_CHATS__CREATE_PERSONAL_CONVERSATION';
export const API_CHATS__CREATE_GROUP_CONVERSATION = 'API_CHATS__CREATE_GROUP_CONVERSATION';
export const API_CHATS__UPDATE_LAST_SEEN_OF_USER = 'API_CHATS__UPDATE_LAST_SEEN_OF_USER';


export const ApiRequestsConfig = {
    [API_CHATS__GET_USERS]: {
        method: 'get',
        uri: () => '/users',
        mockResponse: () => ({
            data: [{"id":"1","name":"Wessel"},{"id":"2","name":"Quint"}, {"id":"3","name":"Mani"},{"id":"4","name":"Menno"}, {"id":"5","name":"Patrick"}],
        }),
    },
    [API_CHATS__GET_SINGLE_USER]: {
        method: 'get',
        uri: ({ userId }) => `/user/${userId}`,
        propTypes: {
            userId: PropTypes.string.isRequired,
        },
        mockResponse: () => ({
            data: {"id":"1","name":"Wessel"},
        })
    },
    [API_CHATS__POLL_MESSAGES]: {
        method: 'get',
        uri: ({ conversationId, lastMessageId }) => `/conversation/${conversationId}/new/${lastMessageId}`,
        propTypes: {
            conversationId: PropTypes.string.isRequired,
            lastMessageId: PropTypes.string.isRequired,
        },
    },
    [API_CHATS__GET_LIMITED_MESSAGES]: {
        method: 'get',
        uri: ({ conversationId }) => `/conversation/${conversationId}/message/limited`,
        query: ({ limit, offset }) => ({ limit, offset }),
        propTypes: {
            conversationId: PropTypes.string.isRequired,
            limit: PropTypes.number,
            offset: PropTypes.number,
        },
        mockResponse: () => ({
            data: [{"id":"30","senderId":"1","message":"Bang bang","timestamp":"2014-10-24 11:42:27","conversationid":"1","status":"0"}, {"id":"29","senderId":"2","message":"you shot me down","timestamp":"2014-10-24 11:42:16","conversationid":"1","status":"0"}],
        }),
    },
    [API_CHATS__GET_LAST_SEEN_OF_USER]: {
        method: 'get',
        uri: ({ conversationId, userId }) => `/conversation/${conversationId}/lastseen/${userId}`,
        propTypes: {
            conversationId: PropTypes.string.isRequired,
            userId: PropTypes.string.isRequired,
        },
    },
    [API_CHATS__GET_CONVERSATION_DETAILS]: {
        method: 'get',
        uri: ({ conversationId }) => `/conversation/${conversationId}`,
        propTypes: {
            conversationId: PropTypes.string.isRequired,
        },
    },
    [API_CHATS__GET_CONVERSATIONS_OF_USER]: {
        method: 'get',
        uri: ({ userId }) => `/conversation/user/${userId}`,
        propTypes: {
            userId: PropTypes.string.isRequired,
        },
        mockResponse: () => ({
            data: lodashRange(50).map(num => ({
                conversation: {
                    conversationId: String(num),
                    name: `Chat #${num}`,
                },
                users: [],
            }))
        }),
    },
    [API_CHATS__SEND_MESSAGE]: {
        method: 'post',
        uri: ({ conversationId }) => `/conversation/${conversationId}/message/send`,
        body: ({ userId, message }) => ({
            senderId: userId,
            message,
        }),
        propTypes: {
            userId: PropTypes.string.isRequired,
            conversationId: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
        },
    },
    [API_CHATS__CREATE_PERSONAL_CONVERSATION]: {
        method: 'post',
        uri: () => '/conversation/personal',
        body: ({ users }) => ({
            users: users.join(','),
        }),
        propTypes: {
            users: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        },
    },
    [API_CHATS__CREATE_GROUP_CONVERSATION]: {
        method: 'post',
        uri: () => '/conversation/group',
        body: ({ users, name }) => ({
            users: users.join(','),
            name,
        }),
        propTypes: {
            users: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            name: PropTypes.string.isRequired,
        },
    },
    [API_CHATS__UPDATE_LAST_SEEN_OF_USER]: {
        method: 'put',
        uri: ({ conversationId, userId }) => `/conversation/${conversationId}/seen/${userId}`,
        propTypes: {
            conversationId: PropTypes.string.isRequired,
            userId: PropTypes.string.isRequired,
        },
    }
};

// export const ApiService = (requestName, params) => HttpApi(ApiRequestsConfig[requestName], params);
export const ApiService = (requestName, params) => MockHttpApi(ApiRequestsConfig[requestName], params);