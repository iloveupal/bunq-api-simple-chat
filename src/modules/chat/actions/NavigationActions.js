import {makeActionCreator} from 'Framework/reduxActions';
import { ACTION_TYPES__CHAT_SET_CURRENT_ROUTE } from 'Modules/chat/action-types/NavigationActionTypes';
import {
    CHAT_ROUTE__LOGIN,
    CHAT_ROUTE__LOADING,
    CHAT_ROUTE__CONVERSATIONS,
    CHAT_ROUTE__ERROR,
} from 'Modules/chat/routes/RoutesConstants';

const setCurrentRoute = makeActionCreator(ACTION_TYPES__CHAT_SET_CURRENT_ROUTE);

const createRoute = (name, params = null) => ({
    name,
    params,
});

const navigate = (route, params) => (dispatch) => {
    dispatch(
        setCurrentRoute(
            createRoute(route, params)
        )
    );
};

export const navigateToLoading = (params) => navigate(CHAT_ROUTE__LOADING, params);
export const navigateToLogin = (params) => navigate(CHAT_ROUTE__LOGIN, params);
export const navigateToError = (params) => navigate(CHAT_ROUTE__ERROR, params);
export const navigateToConversations = (params) => navigate(CHAT_ROUTE__CONVERSATIONS, params);