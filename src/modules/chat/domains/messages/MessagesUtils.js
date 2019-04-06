import lodashUniqBy from 'lodash/uniqBy';


export const mergeMessages = (messages = [], { data, offset, limit, isNew }) => {
    // if there were no messages, we do not merge,

    // we reverse the messages order so that the latest message comes last.
    data = data.reverse();

    if ( !messages.length ) {
        return data;
    }

    // else we want to know if 'data' is the result of polling new messages or retrieving the older ones. This can save us sorting time.
    const newMessagesArray = isNew ? data.concat(messages) : messages.concat(data);

    return lodashUniqBy(messages, (message) => message.id);
};