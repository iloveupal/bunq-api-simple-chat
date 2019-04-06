import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import keycode from 'keycode';

import styled from 'styled-components';

import { getMessagesSendingStateForCurrentConversation } from 'Modules/chat/domains/messages/MessagesSelectors';
import { sendMessage } from 'Modules/chat/actions/MessagesActions';

import Spinner from 'Modules/chat/components/Spinner';


const MessageInput = styled.input`
    height: 50px;
    position: absolute;
    bottom: 0;
    right: 50px;
    background-color: #222;
    width: calc( 100vw - 350px );
    border: none;
    color: white;
    box-sizing: border-box;
    padding-left: 26px;
    font-size: 14px;
    
    &:focus {
        outline: none;
    }
    
    &::placeholder {
        color: #ccc;
    }
`;

const Container = styled.div`
    height: 50px;
    position: absolute;
    bottom: 0;
    right: 50px;
    background-color: #222;
    width: calc( 100vw - 350px );
    
    display: flex;
    flex-direction: row;
    align-items: center;
    
    padding-left: 26px;
    box-sizing: border-box;
`;


class MessageCompose extends PureComponent {
    static propTypes = {
        isMessageSending: PropTypes.bool.isRequired,
        onMessageSend: PropTypes.func.isRequired,
    };

    handleKeyUp = (event) => {
        if ( keycode.isEventKey(event, 'enter') ) {
            this.props.onMessageSend(event.target.value);
            event.target.value = '';
        }
    };

    render() {
        return this.props.isMessageSending ? (
            <Container>
                <Spinner />
            </Container>
        ) : (
            <MessageInput
                placeholder={'Write a message. Press Enter to send...'}
                onKeyUp={this.handleKeyUp}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    isMessageSending: !!getMessagesSendingStateForCurrentConversation(state),
});

const mapDispatchToProps = (dispatch) => ({
    onMessageSend: (message) => dispatch(sendMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageCompose);