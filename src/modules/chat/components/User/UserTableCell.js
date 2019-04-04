import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserColorCircle from './UserColorCircle';
import UserName from './UserName';


const Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 10px;
    width: 300px;
    cursor: pointer;
    
    &:hover {
        background-color: #f2f2f2;
    }
`;

const UserNameContainer = styled.div`
    padding-left: 20px;
`;

export default class UserTableCell extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        onClick: PropTypes.func,
    };

    handleClick = () => {
        if ( this.props.onClick ) {
            this.props.onClick(this.props.id);
        }
    }

    render () {
        return (
            <Container onClick={this.handleClick}>
                <UserColorCircle
                    name={this.props.name}
                    id={this.props.id}
                />
                <UserNameContainer>
                    <UserName name={this.props.name}/>
                </UserNameContainer>
            </Container>
        )
    }
}