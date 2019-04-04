import lodashGet from 'lodash/get';


export const reduceArrayByKey = (key, array) => array.reduce((acc, curr) => {
    acc[lodashGet(curr, key)] = curr;
    return acc;
}, {});