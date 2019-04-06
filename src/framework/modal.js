import React from 'react';
import Modal from 'react-modal';

export const renderCurrentModal = (modalsConfig, currentModalState, onModalClose) => {
    const currentModalConfig = (
        currentModalState &&
        currentModalState.id &&
        modalsConfig &&
        modalsConfig[currentModalState.id]
    );

    return (
        <Modal
            isOpen={!!currentModalConfig}
            onRequestClose={onModalClose}
            style={currentModalConfig.style}
            contentLabel={currentModalConfig.title}
        >
            <currentModalConfig.Component
                {...currentModalState}
            />
        </Modal>
    );
};
