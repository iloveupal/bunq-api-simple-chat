import {
    ACTION_TYPES__CHAT_SET_MODAL_STATE
} from 'Modules/chat/action-types/ModalActionTypes';

import { makeActionCreator } from 'Framework/reduxActions';
import {MODAL_CREATE_CONVERSATION} from 'Modules/chat/modals/ModalConstants';


const setModalState = makeActionCreator(ACTION_TYPES__CHAT_SET_MODAL_STATE);

export const openModal = (modalId, modalProps = {}) => (dispatch) => {
    dispatch(setModalState({
        id: modalId,
        props: modalProps,
    }));
};

export const closeModal = () => (dispatch) => dispatch(setModalState(null));

export const openCreateConversationModal = (props) => openModal(MODAL_CREATE_CONVERSATION, props);