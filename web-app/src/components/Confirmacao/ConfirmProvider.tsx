import React, { useState, useCallback } from 'react';
import ConfirmContext from './ConfirmContext';
import ConfirmationDialog from './ConfirmationDialog';

const _defaultOptions = {
    title: 'Confirmação',
    maxWidth: 'xs',
    description: '',
    confirmationText: 'Confirmar',
    cancellationText: 'Cancelar',
    dialogProps: {},
    confirmationButtonProps: {},
    cancellationButtonProps: {},
};

const ConfirmProvider = ({ children, defaultOptions = {} }) => {
    const [options, setOptions] = useState({ ..._defaultOptions, ...defaultOptions });
    const [resolveReject, setResolveReject] = useState([]);
    const [resolve, reject] = resolveReject;

    const confirm = useCallback((options = {}) => {
        return new Promise((resolve, reject) => {
            setOptions({ ..._defaultOptions, ...defaultOptions, ...options });
            // @ts-ignore
            setResolveReject([resolve, reject]);
        });
    }, []);

    const handleClose = useCallback(() => {
        setResolveReject([]);
    }, []);

    const handleCancel = useCallback(() => {
        // @ts-ignore
        reject();
        handleClose();
    }, [reject, handleClose]);

    const handleConfirm = useCallback(() => {
        // @ts-ignore
        resolve();
        handleClose();
    }, [resolve, handleClose]);

    return (
        <>
            <ConfirmContext.Provider value={confirm}>{children}</ConfirmContext.Provider>
            <ConfirmationDialog
                open={resolveReject.length === 2}
                options={options}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
    );
};

export default ConfirmProvider;
