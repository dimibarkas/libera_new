import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        [theme.breakpoints.down("xs")]: {
            dispay: "none",
        }
    },
    root: {
        marginTop: "1em",
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    date: {
        display: "flex",
        flexDirection: "row-reverse",
        padding: theme.spacing(3),
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function BuyListDialog({ open, setBuyListDialog }) {
    const date = useSelector(state => state.date)
    const classes = useStyles();

    return (
        <div>
            <Dialog fullScreen open={open} onClose={() => setBuyListDialog(false)} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => setBuyListDialog(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Einkaufsliste
                        </Typography>
                        <Button autoFocus color="inherit" onClick={() => setBuyListDialog(false)}>
                            Drucken
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <Paper className={classes.paper}>
                                <div className={classes.date}>
                                    {format(new Date(date.date), 'EE,dd.MM.yyyy', { locale: de })}
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper}>
                                <TableContainer >
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">Artikelname</TableCell>
                                                <TableCell align="left">Anzahl</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableBody>
                                                <TableRow >
                                                    <TableCell align="left">{"Tomaten"}</TableCell>
                                                    <TableCell align="left"></TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper}>
                                <TableContainer >
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">Artikelname</TableCell>
                                                <TableCell align="left">Anzahl</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableBody>
                                                <TableRow >
                                                    <TableCell align="left">{"Broccoli 5kg"}</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Dialog>
        </div>
    );
}