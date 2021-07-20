import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
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
    const [positionData, updatePositionData] = useState({ number: "1", article: null });

    useEffect(() => {
        console.log(positionData)
    }, [positionData])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        updatePositionData(value);
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
                            <TableCell align="left" >Anzahl</TableCell>
                            <TableCell align="left">Artikel</TableCell>
                            <TableCell align="center">Aktionen</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="left"><TextField /></TableCell>
                            <TableCell align="left">
                                <TextField fullWidth />
                            </TableCell>
                            <TableCell align="center"><IconButton disabled><AddIcon /></IconButton></TableCell>
                        </TableRow>
                        {data.data.positions.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="left">{row.number}</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="center"><TableActionButtons /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PositionDialog
                positionData={positionData}
                updatePositionData={updatePositionData}
                open={open}
                onClose={handleClose}
                token={token}
            />
        </>
    )
}

function PositionDialog(props) {
    const classes = useStyles();
    const { onClose, positionData, updatePositionData, open, token } = props;

    const handleClose = () => {
        onClose()
    }

    const handleChange = (e) => {
        updatePositionData({
            ...positionData,
            [e.target.id]: e.target.value
        })
    }

    const handleOnAdd = () => {
        onClose(positionData)
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Position hinzufügen</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="number"
                            variant="outlined"
                            id="number"
                            name="number"
                            onChange={handleChange}
                            value={positionData.number}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AsyncAutocompleteArticles
                            name="article"
                            token={token}
                            handleChange={handleChange}
                            value={positionData.article}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button text="Abbrechen" color="default" />
                <Button text="Hinzufügen" onClick={handleOnAdd} />
            </DialogActions>
        </Dialog>
    );
}
