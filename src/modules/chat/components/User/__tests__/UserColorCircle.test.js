import { mount } from 'enzyme';
import React from 'react';
import 'jest-styled-components';

import UserColorCircle from '../UserColorCircle';


describe('UserColorCircle', () => {
    it('should match snapshot', () => {
        const wrapper = mount(
            <UserColorCircle id={'1'} name={'Test'} />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('small. should match snapshot', () => {
        const wrapper = mount(
            <UserColorCircle id={'1'} name={'Test'} small/>
        );

        expect(wrapper).toMatchSnapshot();
    });
});