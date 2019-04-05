import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    min-height: 100vh;
    width: 100%;
    background-color: #222222;
    justify-content: center;
    align-items: center;
    padding: 50px 0;
    box-sizing: border-box;
`;

const Title = styled.div`
    color: white;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 20px;
    width: 300px;
    padding-bottom: 25px;
`;

export default class ChatRouteLoginComponent extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
    }

    render () {
        return (
            <Container>
                <Title>Please select your account</Title>
                { this.props.children }
            </Container>
        )
    }
}