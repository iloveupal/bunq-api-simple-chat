import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import appReducers from './createReducers';

/* eslint-disable no-underscore-dangle */

const composeEnhancers = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function () {
    return createStore(
        appReducers,
        composeEnhancers(
            applyMiddleware(thunk)
        ),
    );
}
/* eslint-enable */