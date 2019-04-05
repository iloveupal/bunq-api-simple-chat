import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    getConversationsOfCurrentUser,
    getCurrentConversation,
} from 'Modules/chat/domains/conversations/ConversationsSelectors';

import {
    getConversationId,
} from 'Modules/chat/domains/conversations/ConversationsPropGetters';

import {
    loadConversations,
    setCurrentConversation,
} from 'Modules/chat/actions/ConversationsActions';

import ConversationList from 'Modules/chat/components/Conversation/ConversationList';
import Header from 'Modules/chat/components/Header/Header';
import ChatRouteConversationComponent from './ChatRouteConversationComponent';

import ChatWindow from './components/chat-window';
import SelectConversationInvitation from './components/select-conversation-invitation';


const mapStateToProps = (state) => ({
    conversations: getConversationsOfCurrentUser(state),
    isConversationSelected: !!getCurrentConversation(state)
});

const mapDispatchToProps = (dispatch) => ({
    loadConversations: () => dispatch(loadConversations()),
    onConversationSelected: (id) => dispatch(setCurrentConversation(id)),
});

export class ChatRouteConversations extends PureComponent {
    static propTypes = {
        conversations: PropTypes.object.isRequired,
        isConversationSelected: PropTypes.bool.isRequired,
        loadConversations: PropTypes.func.isRequired,
        onConversationSelected: PropTypes.func.isRequired,
    };

    componentDidMount () {
        this.props.loadConversations();
    }

    handleConversationListItemClick = (data) => {
        const conversationId = getConversationId(data);

        this.props.onConversationSelected(conversationId);
    };

    render () {
        return (
            <Fragment>
                <Header />
                <ChatRouteConversationComponent>
                    <ConversationList
                        items={Object.values(this.props.conversations)}
                        onClick={this.handleConversationListItemClick}
                    />
                    {this.props.isConversationSelected ? (
                        <ChatWindow />
                    ) : (
                        <SelectConversationInvitation />
                    )}
                </ChatRouteConversationComponent>
            </Fragment>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatRouteConversations);