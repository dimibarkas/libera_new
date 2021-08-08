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
import useSWR from 'swr';
import { generateBuyList } from '../services/order-service';
import Error from './error';
import CircularIndeterminate from './circular-indeterminate';

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

function calcDiffDays(second) {
    return Math.round((second - new Date()) / (1000 * 60 * 60 * 24))
}

export default function BuyListDialog({ open, setBuyListDialog }) {
    const date = useSelector(state => state.date)
    const classes = useStyles();
    const fetcher = url => generateBuyList(url)
    const { data, error } = useSWR("/api/orders/buylist/" + calcDiffDays(new Date(date.date)), fetcher);

    if (error) return <Error />

    if (!data) return <CircularIndeterminate />

    const leftSide = data.buyList.slice(0, 38);
    const rightSide = data.buyList.slice(38);

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
                                    <br />
                                    Stück insgesamt: {data.totalNumArticles}
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
                                            {
                                                leftSide.map(item => (
                                                    <TableRow key={item.name}>
                                                        <TableCell align="left">{item.name}</TableCell>
                                                        <TableCell align="left">{item.number === 0 ? "" : item.number}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
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
                                            {
                                                rightSide.map(item => (
                                                    <TableRow key={item.name}>
                                                        <TableCell align="left">{item.name}</TableCell>
                                                        <TableCell align="left">{item.number === 0 ? "" : item.number}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
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