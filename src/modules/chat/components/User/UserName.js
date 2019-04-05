import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const NameLabel = styled.div`
    color: white;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 14px;
`;


export default class UserName extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
    };

    render () {
        return (
            <NameLabel>
                {this.props.name}
            </NameLabel>
        )
    }
}