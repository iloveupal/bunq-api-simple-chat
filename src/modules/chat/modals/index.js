import {
    MODAL_CREATE_CONVERSATION,
} from './ModalConstants';

import CreateConversationModal from './create-conversation/CreateConversationModal';


export default {
    [MODAL_CREATE_CONVERSATION]: {
        Component: CreateConversationModal,
        style: {
            content: {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)',
                padding: 0,
            }
        },
        title: 'New Conversation',
    }
};