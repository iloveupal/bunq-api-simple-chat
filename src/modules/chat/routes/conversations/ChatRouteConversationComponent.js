import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';


const Container = styled.div`
    padding-top: 50px;
`;

export default class ChatRouteConversationComponent extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
    }

    render () {
        return (
            <Container>
                { this.props.children }
            </Container>
        )
    }
}