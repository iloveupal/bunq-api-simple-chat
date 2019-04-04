import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import createStore from './createStore';


const store = createStore();


export default class App extends React.PureComponent {
    static propTypes = {
        Module: PropTypes.func.isRequired,
    }

    render () {
        const { Module } = this.props;

        return (
            <Provider store={store}>
                <Module />
            </Provider>
        );
    }
}
