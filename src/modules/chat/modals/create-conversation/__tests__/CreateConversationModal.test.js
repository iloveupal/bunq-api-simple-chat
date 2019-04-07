import React from 'react';
import { shallow } from 'enzyme';

import { CreateConversationModal } from '../CreateConversationModal';


describe('CreateConversationModal', () => {
    it('should update state properly', () => {
        const wrapper = shallow(
            <CreateConversationModal
                users={[{ id: '1', name: 'Test 1'}, { id: '2', name: 'test 2'}]}
                isSubmitting={false}
                onSubmitForm={jest.fn()}
                onCloseModal={jest.fn()}
            />
        );

        wrapper.find({ property: 'name'}).props().onChange('Lalala');
        wrapper.find({ property: 'type'}).props().onChange('personal');
        wrapper.find({ property: 'participants'}).props().onChange([{ id: '1', name: 'Test 1'}]);

        expect(wrapper.state()).toEqual({
            name: 'Lalala',
            type: 'personal',
            participants: [{ id: '1', name: 'Test 1'}],
        });
    });

    it('should only call onFormSubmit when form is valid with correct parameters', () => {
        const onSubmitForm = jest.fn();

        const wrapper = shallow(
            <CreateConversationModal
                users={[{ id: '1', name: 'Test 1'}, { id: '2', name: 'test 2'}]}
                isSubmitting={false}
                onSubmitForm={onSubmitForm}
                onCloseModal={jest.fn()}
            />
        );

        wrapper.find({ property: 'name'}).props().onChange('');
        wrapper.find({ property: 'type'}).props().onChange('group');
        wrapper.find({ property: 'participants'}).props().onChange([{ id: '1', name: 'Test 1'}]);

        wrapper.find({ role: 'submit' }).props().onClick();

        expect(onSubmitForm).toHaveBeenCalledTimes(0);

        wrapper.find({ property: 'name'}).props().onChange('sdfsdf');
        wrapper.find({ role: 'submit' }).props().onClick();

        expect(onSubmitForm).toHaveBeenCalledTimes(1);
        expect(onSubmitForm).toHaveBeenCalledWith({
            name: 'sdfsdf',
            type: 'group',
            participants: [{ id: '1', name: 'Test 1'}],
        });
    });
});