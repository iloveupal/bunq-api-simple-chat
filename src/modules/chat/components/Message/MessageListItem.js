import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { getUsers } from 'Modules/chat/domains/users/UsersSelectors';

import {
    getMessageSenderId
} from 'Modules/chat/domains/messages/MessagesPropGetters';

import { getUserName } from 'Modules/chat/domains/users/UsersPropGetters';

import UserColorCircle from 'Modules/chat/components/User/UserColorCircle';


const Container = styled.div`
    flex: 0 0 auto;
    display: flex;
    flex-flow: row nowrap;
    padding-left: 15px;
    box-sizing: border-box;
    align-items: flex-start;
    min-height: 30px;
    padding-bottom: 15px;
`;

const CircleContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    width: 45px;
`;

const Text = styled.span`
    display: flex;
    flex: 1;
    color: white;
    font-family: sans-serif;
    font-size: 14px;
    word-break: break-word;
`;

const renderUserCircle = (props) => {
    // we only render the circle if the previous message is not from the same sender.

    const prevMessage = props.array[props.index - 1];

    if ( prevMessage && ( getMessageSenderId(prevMessage) === getMessageSenderId(props.data) )) {
        return null;
    }

    const sender = props.userData[getMessageSenderId(props.data)];

    return (
        <UserColorCircle
            id={getMessageSenderId(props.data)}
            name={getUserName(sender)}
            small
        />
    );
};

class MessageListItem extends PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
        // we add context of the message in the array so we can display message differently depending on it's neighbours.
        index: PropTypes.number.isRequired,
        array: PropTypes.array.isRequired,
        userData: PropTypes.object.isRequired,
    };

    static HEIGHT = 30;

    render() {
        return (
            <Container>
                <CircleContainer>
                    { renderUserCircle(this.props) }
                </CircleContainer>
                <Text>
                    { this.props.data.message }
                </Text>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    userData: getUsers(state),
});


export default connect(mapStateToProps)(MessageListItem);
