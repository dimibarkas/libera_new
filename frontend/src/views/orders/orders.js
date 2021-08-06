import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import useTable from '../../components/useTable';
import { TableBody, TableCell, TableRow } from '@material-ui/core';
import CircularIndeterminate from '../../components/circular-indeterminate';
import useSWR from 'swr'
import Error from '../../components/error';
import { useHistory } from "react-router"
import TableActionButtons from '../../components/table-action-buttons';
import { useSnackbar } from "notistack"
import { mutate } from 'swr';
import ConfirmDialog from "../../components/confirm-dialog"
import { format } from 'date-fns';
import { deleteOrderById, listOrders } from '../../services/order-service';
import { de } from 'date-fns/locale';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    headerLabel: {
        fontFamily: "Montserrat-Light",
        letterSpacing: "0.5px",
        paddingBottom: "2rem",
        [theme.breakpoints.down("lg")]: {
            paddingBottom: "0.5rem"
        }
    },
    card: {
        display: "flex",
    },
    dateContainer: {
        paddingBottom: "2rem",
        fontFamily: "Montserrat-Light",
        [theme.breakpoints.up("lg")]: {
            display: "none"
        }
    }
}));

const headCells = [
    { id: "customer_name", label: "Kundenname", align: "left" },
    { id: "actions", label: "Aktionen", align: "right" }
]

export default function Orders() {
    const accessToken = useSelector(state => state.user.authInfo.accessToken)
    const date = useSelector(state => state.date)
    const history = useHistory();
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
    const [selectedDate, setSelectedDate] = useState(new Date(date.date));
    const { enqueueSnackbar } = useSnackbar();

    function calcDiffDays(second) {
        return Math.round((second - new Date()) / (1000 * 60 * 60 * 24))
    }

    const onAdd = () => {
        history.push("/orders/new")
    }

    const onDelete = async (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
        try {
            const res = await deleteOrderById(accessToken, id);
            if (res.status === 200) {
                enqueueSnackbar("Bestellung wurde erfolgreich gelöscht.", { variant: 'success' })
                mutate("/api/orders");
            }
        } catch (error) {
            enqueueSnackbar("Bestellung konnte nicht gelöscht werden.", { variant: 'error' })
        }
    }

    const onEdit = (id) => {
        history.push(`/orders/${id}`)
    }

    const fetcher = url => listOrders(url, accessToken)
    const { data, error } = useSWR("/api/orders/current/" + calcDiffDays(new Date(date.date)), fetcher);
    const classes = useStyles();
    const { TableContainer, TableHead } = useTable(headCells, data, onAdd, true, selectedDate, setSelectedDate);

    if (error) return <Error />

    if (!data) return <CircularIndeterminate />

    return (
        < div className={classes.root} >
            <CssBaseline />
            <Container maxWidth="lg" className={classes.container}>
                <Typography component="h2" variant="h4" className={classes.headerLabel}>
                    Bestellungen
                </Typography>
                <Typography component="h6" variant="subtitle2" className={classes.dateContainer}>
                    {format(new Date(date.date), 'EE,dd.MM.yyyy', { locale: de })}
                </Typography>
                <TableContainer>
                    <TableHead />
                    <TableBody>
                        {data.ordersList === [] ? <TableRow>Keine Daten gefunden</TableRow> :
                            data.ordersList.map(item => (
                                <TableRow key={item._id}>
                                    <TableCell>{item.customer_name}</TableCell>
                                    <TableCell align="right">
                                        <TableActionButtons
                                            onDelete={() => setConfirmDialog({
                                                isOpen: true,
                                                title: "Möchten Sie die Bestellung wirklich löschen?",
                                                onConfirm: () => onDelete(item._id)
                                            })}
                                            onEdit={() => onEdit(item._id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TableContainer>
            </Container>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

        </div>
    )
}
