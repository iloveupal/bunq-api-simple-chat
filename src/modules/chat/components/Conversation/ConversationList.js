/**
 * We need a virtual list because the amount of conversations is enormous.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-virtual-list';

import { getConversationId } from 'Modules/chat/domains/conversations/ConversationsPropGetters';

import ConversationListItem from './ConversationListItem';




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

const VirtualConversationList = VirtualList()(ConversationList);

export default class VirtualConversationListContainer extends PureComponent {
    static propTypes = {
        items: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired,
    }

    render () {
        return (
            <VirtualConversationList
                items={this.props.items}
                onClick={this.props.onClick}
                itemHeight={ConversationListItem.HEIGHT}
                // to make sure no lags occur.
                itemBuffer={20}
            />
        );
    }
}