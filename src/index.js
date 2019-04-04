import React from 'react';
import { render } from 'react-dom';

import App from './app-bootstrapper/createApp';
import ChatModule from 'Modules/chat';


render(
    <App
        Module={ChatModule}
    />,
    document.getElementById('app'),
);
