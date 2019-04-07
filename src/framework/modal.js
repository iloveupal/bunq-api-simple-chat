import React from 'react';
import Modal from 'react-modal';

export const renderCurrentModal = (modalsConfig, currentModalState) => {
    const currentModalConfig = (
        currentModalState &&
        currentModalState.id &&
        modalsConfig &&
        modalsConfig[currentModalState.id]
    );

    if ( !currentModalConfig ) {
        return null;
    }

    return (
        <Modal
            isOpen={true}
            style={currentModalConfig.style}
            contentLabel={currentModalConfig.title}
            ariaHideApp={false}
        >
            <currentModalConfig.Component
                {...currentModalState}
            />
        </Modal>
    );
};
