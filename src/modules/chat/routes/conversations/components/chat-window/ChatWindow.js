import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const POLLING_INTERVAL = 5000;

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export class ChatWindow extends PureComponent {
    static propTypes = {
        conversation: PropTypes.object.isRequired,
        messages: PropTypes.array.isRequired,
        onLoadMoreMessages: PropTypes.func.isRequired,
        onPollNewMessages: PropTypes.func.isRequired,
    };

    componentDidMount () {
        this.interval = setInterval(
            this.pollNewMessages,
            POLLING_INTERVAL
        );
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    pollNewMessages = () => {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);