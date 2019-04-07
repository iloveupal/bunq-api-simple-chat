import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
    getConversationUsers,
} from 'Modules/chat/domains/conversations/ConversationsPropGetters';

import {
    renderConversationName,
} from 'Modules/chat/domains/conversations/ConversationsUtils';

import UserSmallCircles from 'Modules/chat/components/User/UserSmallCircles';


const Container = styled.div`
    display: flex;
    height: 80px;
    width: 300px;
    background-color: #222;
    padding-left: 15px;
    padding-top: 15px;
    box-sizing: border-box;
    font-family: sans-serif;
    flex-flow: column nowrap;
    cursor: pointer;
    
    &:hover {
        background-color: #333;
    }
`;

const ConversationName = styled.span`
    font-weight: bold;
    font-size: 14px;
    color: white;
`;


export default class ConversationListItem extends PureComponent {
    static propTypes = {
        data: PropTypes.shape({
            users: PropTypes.array.isRequired,
            conversation: PropTypes.object.isRequired,
        }).isRequired,
        onClick: PropTypes.func.isRequired,
    };

    static HEIGHT = 80;

    handleClick = () => {
        this.props.onClick(this.props.data);
    };

    render () {
        return (
            <Container onClick={this.handleClick}>
                <ConversationName>
                    { renderConversationName(this.props.data) }
                </ConversationName>

                <UserSmallCircles
                    users={getConversationUsers(this.props.data)}
                />
            </Container>
        );
    }
}
