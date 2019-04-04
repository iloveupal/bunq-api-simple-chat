import React, { PureComponent } from 'react';

import ellipsis from './Ellipsis.svg';


export default class Spinner extends PureComponent {
    render () {
        return (
            <img src={ellipsis} />
        )
    }
}