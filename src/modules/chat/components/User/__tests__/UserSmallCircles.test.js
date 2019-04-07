import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import { UserSmallCircles } from '../UserSmallCircles';


describe('UserSmallCircles', () => {
    it('should match snapshot', () => {
        const wrapper = mount(
            <UserSmallCircles
                users={[{ userid: '1' }, { userid: '2' }]}
                usersData={{
                    '1': {
                        name: 'Test',
                    },
                    '2': {
                        test: 'Test 2',
                    }
                }}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });
});