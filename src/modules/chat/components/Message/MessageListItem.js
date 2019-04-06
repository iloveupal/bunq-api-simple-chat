import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import {getUsers} from 'Modules/chat/domains/users/UsersSelectors';
import {getUserName} from 'Modules/chat/domains/users/UsersPropGetters';

import UserColorCircle from 'Modules/chat/components/User/UserColorCircle';


const Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
    padding-left: 15px;
    box-sizing: border-box;
    align-items: center;
    height: 30px;
`;

const CircleContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    width: 45px;
`;

const Text = styled.div`
    color: white;
    font-family: sans-serif;
    font-size: 14px;
`;

const renderUserCircle = (props) => {
    // we only render the circle if the previous message is not from the same sender.

    const prevMessage = props.array[props.index - 1];

    if ( prevMessage && ( prevMessage.senderId === props.data.senderId )) {
        return null;
    }

    return (
        <UserColorCircle
            id={props.data.senderId}
            name={getUserName(props.userData[props.data.senderId])}
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
                    { this.props.data.message.slice(0, 40) }
                </Text>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    userData: getUsers(state),
});


export default connect(mapStateToProps)(MessageListItem);
