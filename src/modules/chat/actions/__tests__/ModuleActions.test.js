import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
    initializeChatModuleActionConstructor,
} from '../ModuleActions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('ModuleActions.initializeChatModule', () => {
    it('should call the api correctly and dispatch actions correctly', () => {
        const apiService = jest.fn(() => Promise.resolve({
            data: [{
                id: '1',
                name: 'Hannah',
            }, {
                id: '2',
                name: 'Jeremy'
            }],
            status: 200,
        }));

        const store = mockStore({});

        const initializeChatModule = initializeChatModuleActionConstructor(apiService);

        return store.dispatch(initializeChatModule).then(() => {
            const actions = store.getActions();

            expect(apiService).toHaveBeenCalledWith('API_CHATS__GET_USERS');

            expect(actions).toEqual([{
                "type": "ACTION_TYPES__CHAT_SET_CURRENT_ROUTE",
                "payload": {
                    "name": "CHAT_ROUTE__LOADING",
                    "params": null
                },
                "meta": null
            }, {
                "type": "ACTION_TYPES__CHAT_SET_USERS",
                "payload": {
                    "1": {
                        "id": "1",
                        "name": "Hannah"
                    },
                    "2": {
                        "id": "2",
                        "name": "Jeremy"
                    }
                },
                "meta": null
            }, {
                "type": "ACTION_TYPES__CHAT_SET_CURRENT_ROUTE",
                "payload": {
                    "name": "CHAT_ROUTE__LOGIN",
                    "params": null
                },
                "meta": null
            }]);
        });
    });
});