import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


export const ButtonRow = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
`;

const ButtonContainer = styled.div`
    height: 40px;
    min-width: 150px;
    padding: 0 15px;
    border-radius: 5px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: sans-serif;
    font-weight: ${(props) => props.primary ? 'bold' : 'normal'};
    cursor: pointer;
    opacity: ${(props) => props.isDisabled ? '0.5' : '1'};
    
    ${(props) => !props.isDisabled && '&:hover { background-color: #333; }'}
`;

export default class Button extends PureComponent {
    static propTypes = {
        primary: PropTypes.bool,
        isDisabled: PropTypes.bool,
        children: PropTypes.node,
        onClick: PropTypes.func.isRequired,
    };

    render () {
        return (
            <ButtonContainer
                primary={this.props.primary}
                isDisabled={this.props.isDisabled}
                onClick={this.props.isDisabled ? null : this.props.onClick}
            >
                {this.props.children}
            </ButtonContainer>
        );
    }
};
