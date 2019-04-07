import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Button, ButtonRow, Input, MultipleSelect, Switch } from '..';

describe('UiKit', () => {
    test('Button should match the snapshot', () => {
        const component = renderer.create(
            <Button
                onClick={jest.fn()}
            >
                Test
            </Button>
        );

        expect(component.toJSON()).toMatchSnapshot();

        component.update(
            <Button
                primary
                onClick={jest.fn()}
            >
                Test
            </Button>
        );

        expect(component.toJSON()).toMatchSnapshot();

        component.update(
            <Button
                isDisabled
                onClick={jest.fn()}
            >
                Test
            </Button>
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    test('ButtonRow should match the snapshot', () => {
        const component = renderer.create(
            <ButtonRow>
                <div />
                <div />
            </ButtonRow>
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    test('Input should match the snapshot', () => {
        const component = renderer.create(
            <Input
                value={'test'}
                onChange={jest.fn()}
            />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    test('MultipleSelect should match the snapshot', () => {
        const component = renderer.create(
            <MultipleSelect
                options={['1', '2']}
                value={['1']}
                renderItem={({ option, isSelected }) => <div key={option}>{String(isSelected)}</div>}
                onChange={jest.fn()}
            />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    test('MultipleSelect should call onChange when the inner component calls onClick', () => {
        const TestComponent = ({ option, isSelected, onClick }) => (
            <div onClick={onClick} key={option} testId="1"/>
        );

        const onChangeFn = jest.fn();

        const component = renderer.create(
            <MultipleSelect
                options={['1']}
                value={['1']}
                renderItem={TestComponent}
                onChange={onChangeFn}
            />
        );

        component.root.findByProps({ testId: '1' }).props.onClick();

        expect(onChangeFn).toHaveBeenCalled();
    });

    test('MultipleSelect should pass isSelected to selected components', () => {
        const TestComponent = ({ option, isSelected, onClick }) => (
            <div onClick={onClick} key={option} testId={option} isSelected={isSelected} />
        );

        const component = renderer.create(
            <MultipleSelect
                options={['1', '2', '3']}
                value={['1', '2']}
                renderItem={TestComponent}
                onChange={jest.fn()}
            />
        );

        expect(component.root.findByProps({ testId: '1' }).props.isSelected).toBe(true);
        expect(component.root.findByProps({ testId: '2' }).props.isSelected).toBe(true);
        expect(component.root.findByProps({ testId: '3' }).props.isSelected).toBe(false);
    });
});