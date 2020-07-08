import React, { useEffect, useState } from 'react';
import {
    Button,
    Container,
    CssBaseline,
    Grid,
    Icon,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Tooltip,
    Zoom,
    TextField as TextMui,
    Link, ListItemAvatar, Avatar, ListItemText, Typography, ListItem,
} from '@material-ui/core';
import { TableHeader, Titulo, useConfirm, useNotificacao } from 'components';
import { useStylesPrincipal } from 'styles';
import { DataType } from 'types/TableTypes';
import { UnidadeFederativaService } from 'services/UnidadeFederativaService';
import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import { columns, validate } from './utils';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core';
import { ptBR } from '@material-ui/core/locale';
import { includes } from 'lodash';

const UnidadeFederativaPage = () => {
    const defaultTheme = createMuiTheme({}, ptBR);
    const classes = useStylesPrincipal();
    const confirm = useConfirm();
    const notificacao = useNotificacao();
    const [loading, setLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [ordenacao, setOrdenacao] = useState('');
    const [search, setSearch] = useState('');
    const INIT_VALUES = {
        id: undefined,
        nome: undefined,
        sigla: undefined,
    };
    const [uf, setUF] = useState(INIT_VALUES);
    const [dados, setDados] = useState<DataType>({
        content: [],
        pageable: {
            pageNumber: 0,
            pageSize: 10,
        },
        last: true,
        totalPages: 0,
        totalElements: 0,
        size: 10,
        number: 0,
        first: true,
        numberOfElements: 0,
    });

    const pesquisar = (search = '', page = 0, size = 10, sort = 'id,asc') => {
        setLoading(true);
        UnidadeFederativaService.listAll('', search, `page=${page}&size=${size}&sort=${sort}`)
            .then(({ data }) => {
                setDados((state) => ({ ...state, ...data }));
            })
            .catch((error) => {
                // @ts-ignore
                notificacao({ tipo: 'error', mensagem: error.message });
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        pesquisar();
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        pesquisar(search, newPage, 10, ordenacao);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(Number(event.target.value));
        pesquisar(search, 0, Number(event.target.value));
    };

    const ordenar = (sort = 'id,asc') => {
        setOrdenacao(sort);
        pesquisar(search, 0, rowsPerPage, sort);
    };

    const editar = (uf) => {
        setUF(uf);
    };

    const deletar = (id) => {
        // @ts-ignore
        confirm({
            description: `Deseja deletar a Unidade Federativa ${id}?`,
        }).then(() => {
            setLoading(true);
            UnidadeFederativaService.deletar(id)
                .then(({ data }) => {
                    pesquisar();
                    // @ts-ignore
                    notificacao({ tipo: 'success', mensagem: 'Unidade Federativa foi deletada' });
                })
                .catch((error) => {
                    // @ts-ignore
                    notificacao({ tipo: 'error', mensagem: error.message });
                })
                .finally(() => setLoading(false));
        });
    };

    const buttons = (uf) => {
        return (
            <TableCell align="center">
                <Tooltip title={`Editar ${uf['nome']}`} placement="top" arrow TransitionComponent={Zoom}>
                    <IconButton aria-label="delete" size="small" onClick={() => editar(uf)}>
                        <Icon fontSize="inherit" color="primary">
                            create
                        </Icon>
                    </IconButton>
                </Tooltip>
                <Tooltip title={`Excluir ${uf['nome']}`} placement="top" arrow TransitionComponent={Zoom}>
                    <IconButton aria-label="delete" size="small" onClick={() => deletar(uf['id'])}>
                        <Icon fontSize="inherit" color="error">
                            delete
                        </Icon>
                    </IconButton>
                </Tooltip>
            </TableCell>
        );
    };

    const onSubmit = async (values, form) => {
        setLoading(true);
        UnidadeFederativaService.save(values)
            .then(({ data }) => {
                pesquisar();
                form.reset();
                setUF(INIT_VALUES);
                // @ts-ignore
                notificacao({ tipo: 'success', mensagem: 'Unidade Federativa salva com sucesso' });
            })
            .catch((error) => {
                const message = includes(error.message, '422') ? 'Sigla já cadastrada' : error.message;
                // @ts-ignore
                notificacao({ tipo: 'error', mensagem: message });
            })
            .finally(() => setLoading(false));
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container maxWidth="lg">
                <Paper style={{ padding: 16 }}>
                    <CssBaseline />
                    <Titulo
                        titulo="Unidades Federativas"
                        breadcrumb="Cadastro"
                        bcNavs={[
                            <Link key="cliente" color="textSecondary" variant="subtitle2">
                                Unidades Federativas
                            </Link>,
                        ]}
                        loading={loading}
                    />
                    <Paper variant="outlined" style={{ padding: 16 }}>
                        <Form
                            onSubmit={onSubmit}
                            initialValues={uf}
                            validate={validate}
                            render={({ handleSubmit, form, submitting, pristine, values }) => (
                                <form onSubmit={handleSubmit} noValidate>
                                    <Paper style={{ padding: 16 }} elevation={0}>
                                        <Grid container alignItems="flex-start" spacing={2}>
                                            <Grid item xs={12} md={10} lg={10}>
                                                <TextField label="Nome" name="nome" />
                                            </Grid>
                                            <Grid item xs={12} md={2} lg={2}>
                                                <TextField
                                                    label="Sigla"
                                                    name="sigla"
                                                    inputProps={{
                                                        style: {
                                                            textTransform: 'uppercase',
                                                        },
                                                        maxLength: 2,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container alignContent="flex-start" spacing={2}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <Button
                                                    variant="outlined"
                                                    onClick={form.reset}
                                                    style={{ marginRight: 5 }}
                                                >
                                                    Limpar
                                                </Button>
                                                <Button variant="contained" type="submit">
                                                    Salvar
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </form>
                            )}
                        />
                    </Paper>
                    <Container maxWidth="md">
                        <Grid container alignContent="center" spacing={2} style={{ marginBottom: 15 }}>
                            <Grid item xs={12} md={9} lg={9}>
                                <TextMui
                                    fullWidth
                                    name="pesquisa"
                                    value={search}
                                    label="Pesquisar"
                                    onChangeCapture={({ target }) => setSearch(target['value'])}
                                />
                            </Grid>
                            <Grid item xs={12} md={3} lg={3}>
                                <Button
                                    variant="text"
                                    size="small"
                                    style={{
                                        marginTop: 10,
                                        marginRight: 5,
                                    }}
                                    onClick={() => {
                                        setSearch('');
                                        pesquisar('');
                                    }}
                                    title="Limpar"
                                >
                                    <Icon>clear</Icon>
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        marginTop: 10,
                                    }}
                                    title="Pesquisar"
                                    onClick={() => pesquisar(search)}
                                >
                                    <Icon>search</Icon>
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                    <TableContainer className={classes.container} style={{ marginTop: 25 }}>
                        <Table stickyHeader aria-label="sticky table" size="small">
                            <TableHeader columns={columns} func={ordenar} />
                            <TableBody>
                                <>
                                    {dados.content.length ? (
                                        <>
                                            {dados.content.map((row, index) => {
                                                return (
                                                    <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                                                        <>
                                                            {columns.map((column, index) => {
                                                                const value = row[column.id];
                                                                return (
                                                                    <>
                                                                        {column.id === 'actions' ? (
                                                                            <>{buttons(row)}</>
                                                                        ) : (
                                                                            <>
                                                                                <TableCell
                                                                                    key={index}
                                                                                    align={column.align}
                                                                                >
                                                                                    {column.format
                                                                                        ? column.format(value)
                                                                                        : column.parse
                                                                                        ? column.parse(value)
                                                                                        : value}
                                                                                </TableCell>
                                                                            </>
                                                                        )}
                                                                    </>
                                                                );
                                                            })}
                                                        </>
                                                    </TableRow>
                                                );
                                            })}
                                        </>
                                    ) : (
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            <TableCell key={0} align="center" colSpan={columns.length}>
                                                {'Não há dados a serem listados'}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        hidden={dados.content.length === 0}
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={dados.totalElements}
                        rowsPerPage={dados.pageable.pageSize}
                        page={dados.pageable.pageNumber}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        <Avatar alt="Claiton Nazaret" src="/images/image.png" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography component="span" variant="subtitle1" color="secondary">
                                Teste Celk
                            </Typography>
                        }
                        secondary={
                            <>
                                <Typography component="span" variant="body2" className={classes.inline} color="inherit">
                                    por Nazaret, Claiton
                                </Typography>
                                {' — Desde já agradeço a oportunidade…'}
                            </>
                        }
                    />
                </ListItem>
            </Container>
        </ThemeProvider>
    );
};

export default UnidadeFederativaPage;
