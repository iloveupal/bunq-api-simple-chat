import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Spinner from 'Modules/chat/components/Spinner';

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    
    font-family: sans-serif;
    font-weight: bold;
`;

export default class ChatRouteLoading extends PureComponent {
    static propTypes = {
        text: PropTypes.string,
    }

    render () {
        return (
            <Container>
                <span>{ this.props.text }</span>
                <Spinner />
            </Container>
        )
    }
}