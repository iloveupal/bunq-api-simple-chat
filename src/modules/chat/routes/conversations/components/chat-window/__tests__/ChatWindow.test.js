import React from 'react';
import { shallow } from 'enzyme';

import { ChatWindow } from '../ChatWindow';
import MessagesList from 'Modules/chat/components/Message/MessagesList';

import {
    CHAT__MESSAGES_DEFAULT_POLLING_INTERVAL,
    CHAT__MESSAGES_DEFAULT_LIMIT,
} from 'Modules/chat/domains/messages/MessagesConstants';


describe('ChatWindow', () => {
    it('should start polling', () => {
        jest.useFakeTimers();

        const onPollNewMessages = jest.fn();

        const wrapper = shallow(
            <ChatWindow
                conversation={{
                    conversation: {
                        id: '1',
                        conversationId: '1',
                    },
                    users: [],
                }}
                messages={[ { id: '430', message: 'Test' } ]}
                onLoadMoreMessages={jest.fn()}
                onPollNewMessages={onPollNewMessages}
            />
        );

        expect(setInterval).toHaveBeenCalledWith(wrapper.instance().pollNewMessages, CHAT__MESSAGES_DEFAULT_POLLING_INTERVAL);
    });

    it('should poll with correct conversationId and messageId', () => {
        const onPollNewMessages = jest.fn();

        const wrapper = shallow(
            <ChatWindow
                conversation={{
                    conversation: {
                        id: '1',
                        conversationId: '1',
                    },
                    users: [],
                }}
                messages={[ { id: '430', message: 'Test' }, { id: '450', message: 'Test 2'} ]}
                onLoadMoreMessages={jest.fn()}
                onPollNewMessages={onPollNewMessages}
            />
        );

        wrapper.instance().pollNewMessages();

        expect(onPollNewMessages).toHaveBeenCalledWith('1');
    });

    it('should load older messages when the child list calls onReachedTop', () => {
        const onLoadMoreMessages = jest.fn();

        const wrapper = shallow(
            <ChatWindow
                conversation={{
                    conversation: {
                        id: '1',
                        conversationId: '1',
                    },
                    users: [],
                }}
                messages={[ { id: '430', message: 'Test' }, { id: '450', message: 'Test 2'} ]}
                onLoadMoreMessages={onLoadMoreMessages}
                onPollNewMessages={jest.fn()}
                isLoadingMessages={true}
            />
        );

        expect(wrapper.find(MessagesList).at(0).props().onReachedTop).toEqual(null);

        const wrapperNotLoading = shallow(
            <ChatWindow
                conversation={{
                    conversation: {
                        id: '1',
                        conversationId: '1',
                    },
                    users: [],
                }}
                messages={[ { id: '430', message: 'Test' }, { id: '450', message: 'Test 2'} ]}
                onLoadMoreMessages={onLoadMoreMessages}
                onPollNewMessages={jest.fn()}
                isLoadingMessages={false}
            />
        );

        wrapperNotLoading.find(MessagesList).at(0).props().onReachedTop();

        expect(onLoadMoreMessages).toHaveBeenCalledWith({
            conversationId: '1',
            limit: CHAT__MESSAGES_DEFAULT_LIMIT,
            offset: 2,
        });
    });
});