import lodashUniqBy from 'lodash/uniqBy';


export const mergeMessages = (messages = [], { data, offset, limit, isNew }) => {
    // we reverse the messages order so that the latest message comes last.
    data = data.reverse();

    // if there were no messages, we do not merge,
    if ( !messages.length ) {
        return data;
    }

    // else we want to know if 'data' is the result of polling new messages or retrieving the older ones. This can save us sorting time.
    const newMessagesArray = isNew ? messages.concat(data) : data.concat(messages);

    return lodashUniqBy(newMessagesArray, (message) => message.id);
};

export const getLatestMessageId = (messages = []) => {
    if ( !messages.length ) {
        return -1;
    }

    return parseInt(messages[messages.length - 1].id, 10);
};