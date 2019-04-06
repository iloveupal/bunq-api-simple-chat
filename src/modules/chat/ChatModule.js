import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { renderCurrentRoute } from 'Framework/router';
import { renderCurrentModal } from 'Framework/modal';

import routes from './routes';
import modals from './modals';

import { initializeChatModule } from 'Modules/chat/actions/ChatActions';


const mapStateToProps = (state) => ({
    currentRoute: state.chat.currentRoute,
    currentModal: state.chat.currentModal,
});

const mapDispatchToProps = (dispatch) => ({
    initializeModule: () => dispatch(initializeChatModule),
});


export class ChatModule extends PureComponent {
    static propTypes = {
        currentRoute: PropTypes.object,
        initializeModule: PropTypes.func.isRequired,
    }

    componentDidMount () {
       this.props.initializeModule();
    }

    render () {
        if ( !this.props.currentRoute ) {
            return null;
        }

        return (
            <Fragment>
                { renderCurrentRoute(routes, this.props.currentRoute) }
                { renderCurrentModal(modals, this.props.currentModal) }
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatModule);