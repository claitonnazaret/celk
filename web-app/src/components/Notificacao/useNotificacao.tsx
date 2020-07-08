import { useContext } from 'react';
import NotificacaoContext from './NotificacaoContext';

const useNotificacao = () => {
    const confirm = useContext(NotificacaoContext);
    return confirm;
};

export default useNotificacao;
