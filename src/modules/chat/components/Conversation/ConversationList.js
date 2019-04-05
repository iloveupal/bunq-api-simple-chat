/**
 * We need a virtual list because the amount of conversations is enormous.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import VirtualList from 'react-virtual-list';

import { getConversationId } from 'Modules/chat/domains/conversations/ConversationsPropGetters';

import ConversationListItem from './ConversationListItem';


const ListWrapper = styled.div`
    display: block;
    height: calc(100vh - 50px);
    overflow-y: scroll;
`;


export class ConversationList extends PureComponent {
    static propTypes = {
        virtual: PropTypes.object.isRequired,
        itemHeight: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired,
    }

    render () {
        return (
            <div style={this.props.virtual.style}>
                { this.props.virtual.items.map((item) => (
                    <ConversationListItem
                        data={item}
                        key={getConversationId(item)}
                        onClick={this.props.onClick}
                    />
                )) }
            </div>
        );
    }
}

export default class VirtualConversationListContainer extends PureComponent {
    static propTypes = {
        items: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    saveListWrapperRef = (ref) => {
        this.VirtualConversationList = VirtualList({ container: ref })(ConversationList);
    };

    render () {
        return (
            <ListWrapper ref={this.saveListWrapperRef}>
                {this.VirtualConversationList && (
                    <this.VirtualConversationList
                        items={this.props.items}
                        onClick={this.props.onClick}
                        itemHeight={ConversationListItem.HEIGHT}
                        // to make sure no lags occur.
                        itemBuffer={20}
                    />
                )}
            </ListWrapper>
        );
    }
}