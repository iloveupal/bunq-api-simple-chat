import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    flex: 1 1 auto;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: sans-serif;
`;

export default class SelectConversationInvitation extends PureComponent {
    render () {
        return (
            <Container>
                Please select a conversation to continue
            </Container>
        );
    }
}