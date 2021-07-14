import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from "@material-ui/core"
import { Button } from "./controls"
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation"

const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
    },
    dialogContent: {
        textAlign: "center",
    },
    dialogTitle: {
        textAlign: "center",
    },
    dialogActions: {
        justifyContent: "center",
    },
    titleIcon: {
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: "default",
        },
        '& .MuiSvgIcon-root': {
            fontSize: "3rem",
        }
    }
}))


export default function ConfirmDialog(props) {
    const classes = useStyles();
    const { confirmDialog, setConfirmDialog } = props;
    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocationIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.DialogsubTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button
                    text="Abbrechen"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                />
                <Button
                    text="Bestätigen"
                    onClick={confirmDialog.onConfirm}
                />
            </DialogActions>
        </Dialog>
    )
}
