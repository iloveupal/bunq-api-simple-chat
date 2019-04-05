import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    getConversationsOfCurrentUser,
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


const mapStateToProps = (state) => ({
    conversations: getConversationsOfCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadConversations: () => dispatch(loadConversations()),
    onConversationSelected: (id) => dispatch(setCurrentConversation(id)),
});

export class ChatRouteConversations extends PureComponent {
    static propTypes = {
        conversations: PropTypes.object.isRequired,
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
            <ChatRouteConversationComponent>
                <Header />
                <ConversationList
                    items={Object.values(this.props.conversations)}
                    onClick={this.handleConversationListItemClick}
                />

            </ChatRouteConversationComponent>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatRouteConversations);