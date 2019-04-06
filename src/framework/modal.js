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
            style={currentModalConfig && currentModalConfig.style}
            contentLabel={currentModalConfig &&currentModalConfig.title}
            ariaHideApp={false}
        >
            { currentModalConfig && (
                <currentModalConfig.Component
                    {...currentModalState}
                />
            )}
        </Modal>
    );
};
