import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const NameLabel = styled.div`
    color: ${(props) => props.white ? 'white' : '#222222'};
    font-family: sans-serif;
    font-weight: bold;
    font-size: 14px;
`;


export default class UserName extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        white: PropTypes.bool,
    };

    render () {
        return (
            <NameLabel white={this.props.white}>
                {this.props.name}
            </NameLabel>
        )
    }
}