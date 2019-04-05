import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import PlusIcon from './images/plus-circle.svg';


const PlusIconContainer = styled.img`
    width: 18px;
    height: 18px;
    margin-right: 10px;
    padding-bottom: 2px;
`;

const Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    width: 300px;
    height: 50px;
    padding-left: 15px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
        background-color: #333;
    }
`;

const Text = styled.span`
    color: white;
    font-size: 11px;
    font-family: sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1.5px;
`;

export default class CreateConversationButton extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
    };

    render () {
        return (
            <Container>
                <PlusIconContainer src={PlusIcon}/>
                <Text>new conversation</Text>
            </Container>
        );
    }
}