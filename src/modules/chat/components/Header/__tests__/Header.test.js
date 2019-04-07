import React from 'react';
import { shallow } from 'enzyme';

import { Header } from '../Header';


describe('Header', () => {
    it('should match snapshot', () => {
        const wrapper = shallow(
            <Header currentUser={{ name: 'Test', id: '1 '}} isConversationsLoading={false} onLogout={jest.fn()} onCreateConversation={jest.fn()}/>
        );

        expect(wrapper).toMatchSnapshot();
    });
});