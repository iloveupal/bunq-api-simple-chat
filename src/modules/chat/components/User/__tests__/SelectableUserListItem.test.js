import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import { SelectableUserListItem } from '../SelectableUserListItem';


describe('SelectableUserListItem', () => {
    it('should match snapshot', () => {
        const wrapper = mount(
            <SelectableUserListItem data={{ name: 'Test', id: '1' }} isSelected={true} onClick={jest.fn()}/>
        );

        expect(wrapper).toMatchSnapshot();
    });
});