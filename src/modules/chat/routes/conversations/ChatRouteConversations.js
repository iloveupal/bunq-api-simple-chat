import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    getConversationsOfCurrentUser,
    getConversationsIsLoading,
} from 'Modules/chat/domains/conversations/ConversationsSelectors';

import { loadConversations } from 'Modules/chat/actions/ConversationsActions';
import ConversationList from 'Modules/chat/components/Conversation/ConversationList';
import Header from 'Modules/chat/components/Header/Header';
import ChatRouteConversationComponent from './ChatRouteConversationComponent';


const mapStateToProps = (state) => ({
    conversations: getConversationsOfCurrentUser(state),
    isLoading: getConversationsIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadConversations: () => dispatch(loadConversations()),
});

export class ChatRouteConversations extends PureComponent {
    static propTypes = {
        conversations: PropTypes.object.isRequired,
        isLoading: PropTypes.bool,
        loadConversations: PropTypes.func.isRequired,
    };

    componentDidMount () {
        this.props.loadConversations();
    }

    handleConversationListItemClick = (data) => {
        console.log(data);
    };

    render () {
        if ( this.props.isLoading ) {
            return null;
        }


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