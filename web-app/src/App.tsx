import React, { useState } from 'react';
import './App.css';
import UnidadeFederativaPage from './pages/unidade_federativa/UnidadeFederativaPage';
import { ConfirmProvider } from 'components';
import { NotificacaoProvider } from 'components';

function App() {
    return (
        <ConfirmProvider>
            <NotificacaoProvider>
                <UnidadeFederativaPage />
            </NotificacaoProvider>
        </ConfirmProvider>
    );
}

export default App;
