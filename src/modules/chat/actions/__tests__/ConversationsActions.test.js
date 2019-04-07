import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
    loadConversationsActionConstructor,
    createConversationActionConstructor,
} from '../ConversationsActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ConversationActions.loadConversations', () => {
    it('should request api correctly and dispatch actions correctly', () => {
        const apiService = jest.fn(() => Promise.resolve({
            data: [{ conversation: { conversationId: '2' } }],
        }));

        const loadConversations = loadConversationsActionConstructor(apiService);

        const store = mockStore({
            chat: {
                currentUser: '1',
            }
        });

        return store.dispatch(loadConversations()).then(() => {
            const actions = store.getActions();

            expect(apiService).toHaveBeenCalledWith("API_CHATS__GET_CONVERSATIONS_OF_USER", { userId: '1' });

            expect(actions).toEqual(
                [
                    {
                        type: 'ACTION_TYPES__CHAT_CONVERSATIONS_SET_LOADING_STATE',
                        payload: true,
                        meta: null
                    },
                    {
                        type: 'ACTION_TYPES__CHAT_CONVERSATIONS_SET_LOADING_STATE',
                        payload: false,
                        meta: null
                    },
                    {
                        type: 'ACTION_TYPES__CHAT_CONVERSATIONS_SET',
                        payload: {
                            userId: '1',
                            conversations: {
                                '2': {
                                    conversation: {
                                        conversationId: '2'
                                    }
                                }
                            }
                        },
                        meta: null
                    }
                ]
            );
        });
    });
});

describe('ConversationActions.createConversation', () => {
    it('should request api correctly and dispatch actions correctly', () => {
        const apiService = jest.fn(() => Promise.resolve({
            data: { id: '1' },
            status: 200,
        }));

        const createConversation = createConversationActionConstructor(apiService);

        const store = mockStore({});

        return store.dispatch(createConversation({ name: 'test', participants: [{ id: '1' }, { id: '2' }], })).then(() => {
            const actions = store.getActions();

            expect(apiService).toHaveBeenCalledWith("API_CHATS__CREATE_GROUP_CONVERSATION", {"name": "test", "users": ["1", "2"]});

            expect(actions).toEqual([{
                "type": "ACTION_TYPES__SET_IS_CONVERSATION_CREATING",
                "payload": true,
                "meta": null
            }, {
                "type": "ACTION_TYPES__CHAT_CONVERSATION_ADD",
                "payload": {
                    "data": {
                        "conversation": {
                            "id": "1",
                            "conversationId": "1",
                            "name": "test"
                        },
                        "users": [{
                            "conversationId": "1",
                            "userid": "1"
                        }, {
                            "conversationId": "1",
                            "userid": "2"
                        }]
                    },
                    "id": "1"
                },
                "meta": null
            }, {
                "type": "ACTION_TYPES__CHAT_CONVERSATIONS_SET_CURRENT",
                "payload": "1",
                "meta": null
            }, {
                "type": "ACTION_TYPES__CHAT_SET_MODAL_STATE",
                "payload": null,
                "meta": null
            }, {
                "type": "ACTION_TYPES__SET_IS_CONVERSATION_CREATING",
                "payload": false,
                "meta": null
            }]);
        });
    });
});