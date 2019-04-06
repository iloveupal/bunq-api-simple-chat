import lodashThrottle from 'lodash/throttle';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-virtual-list';

import styled from 'styled-components';

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


export class MessagesList extends PureComponent {
    static propTypes = {
        virtual: PropTypes.object.isRequired,
    };

    render () {
        return (
            <div style={this.props.virtual.style}>
                { this.props.virtual.items.map((item, index) => {
                    if (!item) {
                        return null;
                    }

                    return (<MessageListItem
                        data={item}
                        key={item.id}
                        array={this.props.virtual.items}
                        index={index}
                    />);
                }) }
            </div>
        );
    }
}

export default class VirtualMessagesListContainer extends PureComponent {
    static propTypes = {
        items: PropTypes.array.isRequired,
        conversationId: PropTypes.string.isRequired,
        onReachedTop: PropTypes.func,
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

    componentWillUnmount () {
        // this.Container.removeEventListener('scroll', this.containerScrollEventListener);
    }

    saveListWrapperRef = (ref) => {
        this.VirtualMessagesList = VirtualList({ container: ref })(MessagesList);
        this.Container = ref;

        // this.Container.addEventListener('scroll', this.containerScrollEventListener);
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
                {/*{this.VirtualMessagesList && (*/}
                    {/*<this.VirtualMessagesList*/}
                        {/*items={this.props.items}*/}
                        {/*itemHeight={MessageListItem.HEIGHT}*/}
                        {/*itemBuffer={20}*/}
                    {/*/>*/}
                {/*)}*/}

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