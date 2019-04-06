import lodashThrottle from 'lodash/throttle';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { getLatestMessageId } from 'Modules/chat/domains/messages/MessagesUtils';

import MessageListItem from './MessageListItem';


// ideally, when there are less than 40 messages left to scroll, we should start fetching new messages.
const SCROLL_THRESHOLD = MessageListItem.HEIGHT * 40;
const REACHED_TOP_EVENT_THROTTLE = 1000;

const ListWrapper = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-flow: column;
    height: calc( 100vh - 100px );
    overflow-y: scroll;
    padding-top: 20px;
    box-sizing: border-box;
    width: calc( 100% - 300px );
`;

export default class MessagesList extends PureComponent {
    static propTypes = {
        items: PropTypes.array.isRequired,
        conversationId: PropTypes.string.isRequired,
        onReachedTop: PropTypes.func,
    };

    componentDidUpdate (prevProps) {
        if (
            prevProps.conversationId !== this.props.conversationId ||
            getLatestMessageId(prevProps.items) < getLatestMessageId(this.props.items)
        ) {
            this.scrollToBottom();
        }
    }

    saveListWrapperRef = (ref) => {
        this.Container = ref;
    };

    containerScrollEventListener = () => {
        const currentScroll = this.Container.scrollTop;

        if ( currentScroll < SCROLL_THRESHOLD && this.props.onReachedTop ) {
            this.handleOnReachedTop();
        }
    };

    handleOnReachedTop = lodashThrottle(() => {
        this.props.onReachedTop();
    }, 3000);

    scrollToBottom () {
        this.Container.scrollTo(0, this.Container.scrollHeight);
    }

    render () {
        return (
            <ListWrapper ref={this.saveListWrapperRef} onScroll={this.containerScrollEventListener}>
                { this.props.items.map((data, index, array) => (
                    <MessageListItem
                        data={data}
                        key={data.id}
                        array={array}
                        index={index}
                    />
                )) }
            </ListWrapper>
        );
    }
}