import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import UserListItem from '../UserListItem';


describe('UserListItem', () => {
    it('should match snapshot', () => {
        const wrapper = mount(
            <UserListItem id={'1'} name={'Test'} onClick={jest.fn()}/>
        );

        expect(wrapper).toMatchSnapshot();
    });
});