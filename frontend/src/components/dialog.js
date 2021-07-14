import React from 'react'
import { Dialog as MuiDialog, DialogContent, DialogTitle, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),

    }
}))

export default function Dialog(props) {
    const { title, children, openDialog, setOpenDialog } = props;
    const classes = useStyles();
    return (
        <MuiDialog open={openDialog} fullWidth classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </MuiDialog>
    )
}
