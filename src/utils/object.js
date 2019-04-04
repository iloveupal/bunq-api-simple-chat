export const reduceArrayByKey = (key, array) => array.reduce((acc, curr) => {
    acc[curr[key]] = curr;
    return acc;
}, {});