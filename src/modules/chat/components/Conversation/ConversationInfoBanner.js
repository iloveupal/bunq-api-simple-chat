import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styled from 'styled-components';

import {
    getCurrentConversationObject,
} from 'Modules/chat/domains/conversations/ConversationsSelectors';

import {
    renderConversationName,
    renderConversationType,
} from 'Modules/chat/domains/conversations/ConversationsUtils';
import UserSmallCircles from 'Modules/chat/components/User/UserSmallCircles';


const Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;

const NameAndTypeContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    padding-right: 15px;
`;

const Name = styled.div`
    font-family: sans-serif;
    font-size: 13px;
    color: white;
    font-weight: bold;
`;

const Type = styled.div`
    font-family: sans-serif;
    font-size: 13px;
    color: #ccc;
`;



class ConversationInfoBanner extends PureComponent {
    static propTypes = {
        data: PropTypes.object,
    };

    render() {
        if ( !this.props.data ) {
            return null;
        }

        return (
            <Container>
                <NameAndTypeContainer>
                    <Name>{renderConversationName(this.props.data)}</Name>
                    <Type>{renderConversationType(this.props.data)}</Type>
                </NameAndTypeContainer>
                <UserSmallCircles users={this.props.data.users} />
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    data: getCurrentConversationObject(state),
});

export default connect(mapStateToProps)(ConversationInfoBanner);