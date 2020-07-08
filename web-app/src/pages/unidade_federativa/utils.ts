import { ColumnInterface } from 'types/TableTypes';

const validate = (values) => {
    const errors = {};
    if (!values['nome']) {
        errors['nome'] = 'Obrigatório';
    }
    if (!values['sigla']) {
        errors['sigla'] = 'Obrigatório';
    } else if (values['sigla'].length < 2) {
        errors['sigla'] = 'Sigla deve conter 2 dígitos';
    }
    return errors;
};

const columns: ColumnInterface[] = [
    { id: 'id', label: 'Cód.', width: '10%', align: 'center', sort: true },
    { id: 'nome', label: 'Nome', width: '30%', sort: true },
    { id: 'sigla', label: 'Sigla', width: '10%', align: 'center', sort: true },
    {
        id: 'dataCadastro',
        label: 'Dt.Cadastro',
        width: '20%',
        align: 'center',
        format: (valor) =>
            new Intl.DateTimeFormat('pt-BR', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }).format(new Date(valor)),
        sort: true,
    },
    {
        id: 'dataAtualizacao',
        label: 'Dt.Atualização',
        width: '20%',
        align: 'center',
        format: (valor) =>
            new Intl.DateTimeFormat('pt-BR', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }).format(new Date(valor)),
        sort: true,
    },
    { id: 'actions', label: 'Ações', width: '20%', align: 'center' },
];

export { validate, columns };
