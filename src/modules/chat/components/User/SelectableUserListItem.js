import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
    getUserId,
    getUserName,
} from 'Modules/chat/domains/users/UsersPropGetters';

import UserColorCircle from 'Modules/chat/components/User/UserColorCircle';
import UserName from 'Modules/chat/components/User/UserName';


const Container = styled.div`
    height: 40px;
    flex: 1 1 auto;
    padding: 0 15px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    cursor: pointer;
    
    background-color: ${(props) => props.isSelected ? '#333' : '#222'};
    
    &:first-child {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    
    &:last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
`;

const UserNameContainer = styled.div`
    padding-left: 20px;
`;

export class SelectableUserListItem extends PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
        isSelected: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    render() {
        return (
            <Container
                isSelected={this.props.isSelected}
                onClick={this.props.onClick}
            >
                <UserColorCircle
                    id={getUserId(this.props.data)}
                    name={getUserName(this.props.data)}
                />
                <UserNameContainer>
                    <UserName name={getUserName(this.props.data)}/>
                </UserNameContainer>
            </Container>
        );
    }
}

export default SelectableUserListItem;