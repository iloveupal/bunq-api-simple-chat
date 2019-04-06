import React from 'react';

import {
    CHAT_ROUTE__CONVERSATIONS,
    CHAT_ROUTE__LOADING,
    CHAT_ROUTE__LOGIN,
} from './RoutesConstants';

import ChatRouteLoading from './loading/ChatRouteLoading';
import ChatRouteLogin from './login/ChatRouteLogin';
import ChatRouteConversations from './conversations/ChatRouteConversations';


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
    [CHAT_ROUTE__CONVERSATIONS]: {
        Component: ChatRouteConversations,
    }
};

