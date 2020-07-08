import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const NotificacaoSnackbar = ({ open, options, handleClose }) => {
    const { tipo, mensagem, snackbarProps, alertProps, tempo } = options;

    const TYPE = {
        success: 1800,
        info: 3500,
        warning: 3500,
        error: 6000,
    };

    return (
        <Snackbar open={open} autoHideDuration={tempo ? tempo : TYPE[tipo]} onClose={handleClose} {...snackbarProps}>
            <Alert {...alertProps} onClose={handleClose} severity={tipo} variant="filled">
                {mensagem}
            </Alert>
        </Snackbar>
    );
};

export default NotificacaoSnackbar;
