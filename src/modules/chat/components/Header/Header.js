import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import styled from 'styled-components';

import { getCurrentUserObject } from 'Modules/chat/domains/users/UsersSelectors';
import { logout } from 'Modules/chat/actions/UserActions';
import { openCreateConversationModal } from 'Modules/chat/actions/ModalActions';
import { getUserId, getUserName } from 'Modules/chat/domains/users/UsersPropGetters';
import { getConversationsIsLoading } from 'Modules/chat/domains/conversations/ConversationsSelectors';

import UserColorCircle from 'Modules/chat/components/User/UserColorCircle';
import Spinner from 'Modules/chat/components/Spinner';
import CreateConversationButton from 'Modules/chat/components/Conversation/CreateConversationButton';


const Container = styled.div`
    position: fixed;
    top: 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: 100vw;
    background-color: #222;
    border-bottom: 1px solid #333;
    box-sizing: border-box;
`;

const HeaderRightSubgroup = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    padding-right: 30px;
`;

const LogoutButton = styled.div`
    margin-left: 15px;
    color: #ccc;
    cursor: pointer;
    font-size: 11px;
    font-family: sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1.5px;
    
    &:hover {
        color: white;
    }
`;

const HeaderSpinnerContainer = styled.div`
    padding-left: 15px;
`;

const mapStateToProps = (state) => ({
    currentUser: getCurrentUserObject(state),
    isConversationsLoading: getConversationsIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch(logout()),
    onCreateConversation: () => dispatch(openCreateConversationModal()),
});


export class Header extends PureComponent {
    static propTypes = {
        currentUser: PropTypes.object.isRequired,
        isConversationsLoading: PropTypes.bool.isRequired,
        onLogout: PropTypes.func.isRequired,
        onCreateConversation: PropTypes.func.isRequired,
    }

    render () {
        return (
            <Container>
                { this.props.isConversationsLoading ? (
                    <HeaderSpinnerContainer>
                        <Spinner />
                    </HeaderSpinnerContainer>
                ) : (
                    <CreateConversationButton onClick={this.props.onCreateConversation}/>
                )}
                <HeaderRightSubgroup>
                    <UserColorCircle small id={getUserId(this.props.currentUser)} name={getUserName(this.props.currentUser)}/>
                    <LogoutButton onClick={this.props.onLogout}>
                        Logout
                    </LogoutButton>
                </HeaderRightSubgroup>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);