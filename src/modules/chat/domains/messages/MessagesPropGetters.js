import lodashGet from 'lodash/get';

export const getMessageSenderId = (message) => lodashGet(message, 'senderId');
