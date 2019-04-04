export const CHAT_ROUTE__LOADING = 'CHAT_ROUTE__LOADING';
export const CHAT_ROUTE__LOGIN = 'CHAT_ROUTE__LOGIN';
export const CHAT_ROUTE__CONVERSATIONS = 'CHAT_ROUTE__CONVERSATIONS';
export const CHAT_ROUTE__ERROR = 'CHAT_ROUTE__ERROR';

export const createRoute = (name, params = null) => ({
    name,
    params,
});