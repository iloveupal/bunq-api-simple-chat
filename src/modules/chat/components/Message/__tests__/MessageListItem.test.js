import React from 'react';
import { shallow } from 'enzyme';

import { MessageListItem } from '../MessageListItem';


describe('MessageListItem', () => {
    it('should match snapshot', () => {
        const wrapper = shallow(
            <MessageListItem
                data={{ message: '1', id: '2', senderId: '1' }}
                index={0}
                array={[ { message: '1', id: '2', senderId: '1' }, { message: '2', id: '3', senderId: '1' } ]}
                userData={{
                    1: {
                        name: 'Test',
                    }
                }}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });
});