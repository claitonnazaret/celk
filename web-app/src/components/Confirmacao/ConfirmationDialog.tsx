import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core';

const ConfirmationDialog = ({ open, options, onCancel, onConfirm }) => {
    const style = useTheme();

    const {
        title,
        maxWidth,
        description,
        confirmationText,
        cancellationText,
        dialogProps,
        confirmationButtonProps,
        cancellationButtonProps,
    } = options;

    return (
        <Dialog fullWidth {...dialogProps} maxWidth={maxWidth} open={open} onClose={onCancel}>
            {title && (
                <DialogTitle style={{ backgroundColor: style.palette.primary.main, color: '#fff' }}>
                    {title}
                </DialogTitle>
            )}
            {description && (
                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>
                </DialogContent>
            )}
            <DialogActions>
                <Button variant="outlined" {...cancellationButtonProps} onClick={onCancel}>
                    {cancellationText}
                </Button>
                <Button variant="contained" color="primary" {...confirmationButtonProps} onClick={onConfirm}>
                    {confirmationText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
