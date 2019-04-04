import { combineReducers } from 'redux';
import { reducers as chatReducers } from "Modules/chat";


export default combineReducers(
    {
        chat: chatReducers,
    }
);
