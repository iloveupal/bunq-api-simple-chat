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
    width: ${(props) => props.small ? '20px' : '40px'};
    height: ${(props) => props.small ? '20px' : '40px'};
    border-radius: ${(props) => props.small ? '10px' : '20px'};
    background-color: ${(props) => props.color};
    font-weight: bold;
    font-family: sans-serif;
    font-size: ${(props) => props.small ? '10px' : '14px'};
    color: white;
    cursor: pointer;
`;


export default class UserColorCircle extends PureComponent {
    static propTypes = {
        name: PropTypes.string,
        id: PropTypes.string.isRequired,
        small: PropTypes.bool,
    };

    render () {
        return (
            <ColorCircle
                color={stringToColor(this.props.id)}
                small={!!this.props.small}
                title={this.props.name}
            >
                {this.props.name && getInitials(this.props.name)}
            </ColorCircle>
        )
    }
}