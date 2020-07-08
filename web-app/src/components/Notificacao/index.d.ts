import * as React from 'react';
import { SnackbarProps } from '@material-ui/core';
import { AlertProps } from '@material-ui/lab';

export interface NotificacaoOptions {
    tipo: 'success' | 'error' | 'info' | 'warning';
    mensagem: string;
    snackbarProps?: SnackbarProps;
    alertProps?: AlertProps;
    tempo?: number;
}

export interface NotificacaoProviderProps {
    defaultOptions?: NotificacaoOptions;
}

export const NotificacaoProvider: React.ComponentType<NotificacaoProviderProps>;

export const useNotificacao: () => (options?: NotificacaoOptions) => Promise<void>;
