import React from 'react';
import { shallow }  from 'enzyme';
import 'jest-styled-components';

import ConversationListItem from '../ConversationListItem';

describe('ConversationListItem', () => {
    it('should match snapshot', () => {
        const wrapper = shallow(
            <ConversationListItem
                data={{ conversation: { conversationId: 1, name: 'Test' }, users: [{ userid: 1, }]}}
                onClick={jest.fn()}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });
});
