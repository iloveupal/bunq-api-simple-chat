import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentConversationObject } from 'Modules/chat/domains/conversations/ConversationsSelectors';
import { getConversationId } from 'Modules/chat/domains/conversations/ConversationsPropGetters';
import { getMessagesForCurrentConversation } from 'Modules/chat/domains/messages/MessagesSelectors';
import { requestMessages } from 'Modules/chat/actions/MessagesActions';

import {
    CHAT__MESSAGES_DEFAULT_LIMIT,
    CHAT__MESSAGES_DEFAULT_POLLING_INTERVAL,
} from 'Modules/chat/domains/messages/MessagesConstants';


const mapStateToProps = (state) => ({
    conversation: getCurrentConversationObject(state),
    messages: getMessagesForCurrentConversation(state),
});

const mapDispatchToProps = (dispatch) => ({
    onLoadMoreMessages: ({ conversationId, offset }) => dispatch(requestMessages({ conversationId, offset })),
    onPollNewMessages: (conversationId) => console.log('Poll conversation id' + conversationId),
});

export class ChatWindow extends PureComponent {
    static propTypes = {
        conversation: PropTypes.object.isRequired,
        messages: PropTypes.array.isRequired,
        isLoadingMessages: PropTypes.bool,
        allPreviousMessagesLoaded: PropTypes.bool,
        onLoadMoreMessages: PropTypes.func.isRequired,
        onPollNewMessages: PropTypes.func.isRequired,
    };

    componentDidMount () {
        this.setUpPolling();
        this.checkMessages();
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    componentDidUpdate (prevProps) {
        if ( getConversationId(prevProps.conversation) !== getConversationId(this.props.conversation) ) {
            this.setUpPolling();
            this.checkMessages();
        }
    }

    setUpPolling = () => {
        if ( this.interval ) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(
            this.pollNewMessages,
            CHAT__MESSAGES_DEFAULT_POLLING_INTERVAL
        );
    };

    checkMessages = () => {
        if ( !this.props.messages.length ) {
            this.requestOlderMessages();
        }
    };

    pollNewMessages = () => {
        this.props.onPollNewMessages(getConversationId(this.props.conversation));
    };

    requestOlderMessages = () => {
        if ( this.props.isLoadingMessages || this.props.allPreviousMessagesLoaded ) {
            return;
        }

        const offset = this.props.messages.length;

        this.props.onLoadMoreMessages({
            conversationId: getConversationId(this.props.conversation),
            limit: CHAT__MESSAGES_DEFAULT_LIMIT,
            offset,
        });
    };

    render () {
        return (
            <div style={{ color: 'white' }}>
                Test { this.props.messages.length }
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);