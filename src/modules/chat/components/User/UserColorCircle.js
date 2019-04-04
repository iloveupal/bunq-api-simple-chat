/**
 * This component helps us visually identify users because colors are easily distinguishable.
 * The idea is not new, you can see this stuff in Telegram, for example.
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { stringToColor } from 'Utils/color';


const getInitials = (name) => {
    let initials = name.match(/\b\w/g) || [];

    return initials.join('');
};

const ColorCircle = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: ${(props) => props.color};
    font-weight: bold;
    font-family: sans-serif;
    color: white;
`;


export default class UserColorCircle extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
    };

    render () {
        return (
            <ColorCircle
                color={stringToColor(this.props.name)}
            >
                {getInitials(this.props.name)}
            </ColorCircle>
        )
    }
}