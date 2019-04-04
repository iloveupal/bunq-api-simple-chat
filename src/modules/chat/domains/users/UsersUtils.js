import { reduceArrayByKey } from 'Utils/object';

export const reduceUserArrayById = (userArray) => reduceArrayByKey('id', userArray);