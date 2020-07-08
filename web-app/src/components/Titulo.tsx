import React, { FunctionComponent } from 'react';
import { Backdrop, Breadcrumbs, CircularProgress, createStyles, Divider, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.snackbar + 1,
            color: '#fff',
        },
    }),
);

export type TituloProps = {
    titulo: string;
    breadcrumb: string | undefined;
    loading: boolean;
    bcNavs?: any[];
};

const Titulo: FunctionComponent<TituloProps> = ({ titulo, breadcrumb, bcNavs, loading }) => {
    const classes = useStyles();

    return (
        <>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Typography variant="h5" component="h6">
                {titulo}
            </Typography>
            <Divider light />
            <Breadcrumbs>
                {bcNavs}
                <Typography color="textPrimary" variant="subtitle2">
                    {breadcrumb}
                </Typography>
            </Breadcrumbs>
        </>
    );
};

export default Titulo;
