import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { renderCurrentRoute } from 'Framework/router';

import routes from './routes';
import { initializeChatModule } from 'Modules/chat/actions/ChatActions';


const mapStateToProps = (state) => ({
    currentRoute: state.chat.currentRoute,
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

        return renderCurrentRoute(routes, this.props.currentRoute);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatModule);