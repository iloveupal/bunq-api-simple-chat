import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUsersArray } from 'Modules/chat/domains/users/UsersSelectors';
import {
    getUserId,
    getUserName,
} from 'Modules/chat/domains/users/UsersPropGetters';

import { selectUser } from 'Modules/chat/actions/UserActions';

import UserTableCell from 'Modules/chat/components/User/UserTableCell';
import ChatRouteLoginComponent from 'Modules/chat/routes/login/ChatRouteLoginComponent';


const mapStateToProps = (state) => ({
    users: getUsersArray(state),
});

const mapDispatchToProps = (dispatch) => ({
    onUserSelected: (userId) => dispatch(selectUser(userId)),
});


export class ChatRouteLogin extends PureComponent {
    static propTypes = {
        users: PropTypes.array.isRequired,
        onUserSelected: PropTypes.func.isRequired,
    };

    handleUserTableCellClick = (id) => {
        this.props.onUserSelected(id);
    }

    render () {
        return (
            <ChatRouteLoginComponent>
                { this.props.users.map((user) => {
                    return (
                        <UserTableCell
                            key={getUserId(user)}
                            id={getUserId(user)}
                            name={getUserName(user)}
                            onClick={this.handleUserTableCellClick}
                        />
                    )
                }) }
            </ChatRouteLoginComponent>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRouteLogin);