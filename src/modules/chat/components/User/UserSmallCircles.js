import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styled from 'styled-components';

import UserColorCircle from 'Modules/chat/components/User/UserColorCircle';

import { getUsers } from 'Modules/chat/domains/users/UsersSelectors';


const CirclesContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    padding-top: 5px;
`;

const ItemContainer = styled.div`
    padding-right: 5px;
`;

const mapStateToProps = (state) => ({
    usersData: getUsers(state),
});


export class UserSmallCircles extends PureComponent {
    static propTypes = {
        users: PropTypes.array.isRequired,
        usersData: PropTypes.object.isRequired,
    }

    render () {
        return (
            <CirclesContainer>
                {
                    this.props.users.map(( { userid } ) => (
                        <ItemContainer key={userid}>
                            <UserColorCircle
                                id={userid}
                                name={this.props.usersData[userid].name}
                                small
                            />
                        </ItemContainer>
                    ))
                }
            </CirclesContainer>
        )
    }
}

export default connect(mapStateToProps)(UserSmallCircles);