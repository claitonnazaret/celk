import React, { useState, useCallback } from 'react';
import NotificacaoContext from './NotificacaoContext';
import NotificacaoSnackbar from './NotificacaoSnackbar';

const _defaultOptions = {
    tipo: 'success',
    mensagem: '',
    snackbarProps: {},
    alertProps: {},
};

const NotificacaoProvider = ({ children, defaultOptions = {} }) => {
    const [options, setOptions] = useState({ ..._defaultOptions, ...defaultOptions });
    const [resolveReject, setResolveReject] = useState([]);
    const [resolve] = resolveReject;

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

    const handleConfirm = useCallback(() => {
        // @ts-ignore
        resolve();
        handleClose();
    }, [resolve, handleClose]);

    return (
        <>
            <NotificacaoContext.Provider value={confirm}>{children}</NotificacaoContext.Provider>
            <NotificacaoSnackbar open={resolveReject.length === 2} options={options} handleClose={handleConfirm} />
        </>
    );
};

export default NotificacaoProvider;
