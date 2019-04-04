import React from 'react';


import {
    CHAT_ROUTE__LOADING,
    CHAT_ROUTE__LOGIN,
} from 'Modules/chat/constants/ChatRoutes';

import ChatRouteLoading from './loading/ChatRouteLoading';
import ChatRouteLogin from './login/ChatRouteLogin';


export default {
    default: {
        Component: () => (<div>Not found</div>),
    },
    [CHAT_ROUTE__LOADING]: {
        Component: ChatRouteLoading,
    },
    [CHAT_ROUTE__LOGIN]: {
        Component: ChatRouteLogin,
    },
};
