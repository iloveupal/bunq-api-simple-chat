import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-virtual-list';

import styled from 'styled-components';

import MessageListItem from './MessageListItem';


const ListWrapper = styled.div`
    flex: 1 1 auto;
    
    display: flex;
    
    height: calc( 100vh - 100px );
    overflow-y: scroll;
`;


export class MessagesList extends PureComponent {
    static propTypes = {
        virtual: PropTypes.object.isRequired,
    }

    render () {
        return (
            <div style={this.props.virtual.style}>
                { this.props.virtual.items.map((item, index) => (
                    <MessageListItem
                        data={item}
                        key={item.id}
                        array={this.props.virtual.items}
                        index={index}
                    />
                )) }
            </div>
        );
    }
}

export default class VirtualMessagesListContainer extends PureComponent {
    static propTypes = {
        items: PropTypes.array.isRequired,
        conversationId: PropTypes.string.isRequired,
    };

    saveListWrapperRef = (ref) => {
        this.VirtualMessagesList = VirtualList({ container: ref })(MessagesList);
        this.Container = ref;
    };

    componentDidUpdate (prevProps) {
        // on the initial loading - or conversation switch, scroll the messages to bottom, just like in a real chat.
        if (
            !prevProps.items.length && this.props.items.length ||
            prevProps.conversationId !== this.props.conversationId
        ) {
            this.scrollToBottom();
        }
    }

    scrollToBottom () {
        this.Container.scrollTo(0, this.Container.scrollHeight);
    }

    render () {
        return (
            <ListWrapper ref={this.saveListWrapperRef}>
                {this.VirtualMessagesList && (
                    <this.VirtualMessagesList
                        items={this.props.items}
                        itemHeight={MessageListItem.HEIGHT}
                        itemBuffer={20}
                    />
                )}
            </ListWrapper>
        );
    }
}