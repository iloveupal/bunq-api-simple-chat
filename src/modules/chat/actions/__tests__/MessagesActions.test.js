import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
    pollNewMessagesActionConstructor,
    sendMessageActionConstructor,
    requestMessagesActionConstructor,
} from '../MessagesActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('MessagesActions.pollNewMessages', () => {
    it('should not dispatch any actions when there are no new messages', () => {
        const apiService = () => Promise.resolve({
            data: { message: 'No new messages'},
            status: 503,
        });

        const pollNewMessages = pollNewMessagesActionConstructor(apiService);

        const store = mockStore({
            chat: {
                messages: {
                    1: [{ id: '134' }],
                }
            }
        });

        return store.dispatch(pollNewMessages(1)).then(() => {
            const actions = store.getActions();

            expect(actions).toEqual([]);
        });
    });

    it('should dispatch actions when there are new messages and call the api properly', () => {
        const apiService = jest.fn(() => Promise.resolve({
            data: [{
                id: '150',
                message: 'test',
            }],
            status: 200,
        }));

        const pollNewMessages = pollNewMessagesActionConstructor(apiService);

        const store = mockStore({
            chat: {
                messages: {
                    1: [{ id: '134' }],
                }
            }
        });

        return store.dispatch(pollNewMessages(1)).then(() => {
            const actions = store.getActions();

            expect(actions).toEqual([{
                "type": "ACTION_TYPES__CHAT_SET_MESSAGES",
                "payload": {
                    "isNew": true,
                    "conversationId": 1,
                    "data": [{
                        "id": "150",
                        "message": "test"
                    }]
                },
                "meta": null
            }]);

            expect(apiService).toHaveBeenCalledWith("API_CHATS__POLL_MESSAGES", {"conversationId": 1, "lastMessageId": "134"});
        });
    });
});

describe('MessagesActions.sendMessageActionConstructor', () => {
    it('should send a message and call the api correctly', () => {
        const apiService = jest.fn(() => Promise.resolve({
            data: { id: '203' },
            status: 200,
        }));

        const sendMessage = sendMessageActionConstructor(apiService);

        const store = mockStore({
            chat: {
                currentUser: '3',
                currentConversation: '5',
            }
        });

        return store.dispatch(sendMessage('Boom')).then(() => {
            const actions = store.getActions();

            expect(actions).toEqual([{
                "type": "ACTION_TYPES__CHAT_SET_MESSAGES_SENDING_STATE",
                "payload": {
                    "conversationId": "5",
                    "state": true
                },
                "meta": null
            }, {
                "type": "ACTION_TYPES__CHAT_SET_MESSAGES",
                "payload": {
                    "isNew": true,
                    "conversationId": "5",
                    "data": [{
                        "id": "203",
                        "senderId": "3",
                        "message": "Boom"
                    }]
                },
                "meta": null
            }, {
                "type": "ACTION_TYPES__CHAT_SET_MESSAGES_SENDING_STATE",
                "payload": {
                    "conversationId": "5",
                    "state": false
                },
                "meta": null
            }]);

            expect(apiService).toHaveBeenCalledWith("API_CHATS__SEND_MESSAGE", {"conversationId": "5", "message": "Boom", "userId": "3"});
        });
    });
});

describe('MessagesActions.requestMessages', () => {
    it('should call the api properly and dispatch actions properly', () => {
        const apiService = jest.fn(() => Promise.resolve({
            data: [{
                id: '150',
                message: 'test',
            }, {
                id: '149',
                message: 'test 2',
            }],
            status: 200,
        }));

        const requestMessages = requestMessagesActionConstructor(apiService);

        const store = mockStore({});

        return store.dispatch(requestMessages({ conversationId: '3', offset: 0, limit: 2 })).then(() => {
            const actions = store.getActions();

            expect(actions).toEqual([{
                "type": "ACTION_TYPES__CHAT_SET_MESSAGES_LOADING_STATE",
                "payload": {
                    "conversationId": "3",
                    "state": true
                },
                "meta": null
            }, {
                "type": "ACTION_TYPES__CHAT_SET_MESSAGES_LOADING_STATE",
                "payload": {
                    "conversationId": "3",
                    "state": false
                },
                "meta": null
            }, {
                "type": "ACTION_TYPES__CHAT_SET_MESSAGES",
                "payload": {
                    "offset": 0,
                    "limit": 2,
                    "conversationId": "3",
                    "data": [{
                        "id": "150",
                        "message": "test"
                    }, {
                        "id": "149",
                        "message": "test 2"
                    }]
                },
                "meta": null
            }]);

            expect(apiService).toHaveBeenCalledWith("API_CHATS__GET_LIMITED_MESSAGES", {"conversationId": "3", "limit": 2, "offset": 0});
        });
    });
});
