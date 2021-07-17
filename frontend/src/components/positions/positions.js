import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add'
import CircularIndeterminate from '../circular-indeterminate';
import useOrder from '../use-order';
import Error from '../error';
import TableActionButtons from '../table-action-buttons';
import { AsyncAutocompleteArticles, Button } from '../controls';

const useStyles = makeStyles(theme => ({
    subtitle: {
        fontFamily: "Montserrat-Light",
        marginTop: "1em",
        display: "inline-block"
    },
    subtitleWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
    },
    dialogActions: {
        justifyContent: "center",
    },
}))

export default function Positions({ id, token }) {
    const classes = useStyles();
    const { data, error } = useOrder(id, token);
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    if (error) return <Error />

    if (!data) return <CircularIndeterminate />

    return (
        <>
            <div className={classes.subtitleWrapper}>
                <Typography component="h6" variant="h5" className={classes.subtitle}>Positionen</Typography>
                <IconButton onClick={handleClickOpen}>
                    <AddIcon />
                </IconButton>
            </div>
            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Anzahl</TableCell>
                            <TableCell align="center6">Artikel</TableCell>
                            <TableCell align="right">Aktionen</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.data.positions.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell >{row.number}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="right"><TableActionButtons /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PositionDialog selectedValue={selectedValue} open={open} onClose={handleClose} token={token} />
        </>
    )
}

function PositionDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open, token } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle>Position hinzufügen</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <TextField type="numbe´" pattern="\d*" fullWidth variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <AsyncAutocompleteArticles token={token} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>

                <Button text="Abbrechen" color="default" />
                <Button text="Hinzufügen" />
            </DialogActions>
        </Dialog>
    );
}
