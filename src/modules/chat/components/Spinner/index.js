import React, { PureComponent } from 'react';
import styled from 'styled-components';

import ellipsis from './Ellipsis.svg';

const SpinnerImage = styled.img`
    width: 30px;
    height: 30px;
`;


export default class Spinner extends PureComponent {
    render () {
        return (
            <SpinnerImage src={ellipsis} />
        )
    }
}