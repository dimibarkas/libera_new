import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import { listArticles } from '../../services/article-service';
import useTable from '../../components/useTable';
import { TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import CircularIndeterminate from '../../components/circular-indeterminate';
import useSWR from 'swr'
import Error from '../../components/error';
import { useHistory } from "react-router"
import TableActionButtons from '../../components/table-action-buttons';
import { deleteCustomer } from '../../services/customer-service';
import { useSnackbar } from "notistack"
import { mutate } from 'swr';
import ConfirmDialog from "../../components/confirm-dialog"
import { selectProps, TablePaginationActions } from '../../components/custom-table-pagination';

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
    },
    card: {
        display: "flex",
    }
}));

const headCells = [
    { id: "name", label: "Kundenname", align: "inherit" },
    { id: "actions", label: "Aktionen", align: "right" }
]

export default function Customers() {
    const accessToken = useSelector(state => state.user.authInfo.accessToken)
    const history = useHistory();
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });
    const { enqueueSnackbar } = useSnackbar();
    const [page, setPage] = useState(0)

    const handleChangePage = (e, newPage) => {
        setPage(newPage)
    }

    const onAdd = () => {
        history.push("/customers/new")
    }

    const onDelete = async (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
        try {
            const res = await deleteCustomer(accessToken, id);
            if (res.status === 200) {
                enqueueSnackbar("Kunde wurde erfolgreich gelöscht.", { variant: 'success' })
                mutate("/api/customers");
            }
        } catch (error) {
            enqueueSnackbar("Kunde konnte nicht gelöscht werden.", { variant: 'error' })
        }
    }

    const onEdit = (id) => {
        history.push(`/customers/${id}`)
    }

    const fetcher = url => listArticles(url, accessToken)
    const { data, error } = useSWR(`/api/customers/search?page=${page}`, fetcher);
    const classes = useStyles();
    const { TableContainer, TableHead } = useTable(headCells, data, onAdd);

    if (error) return <Error />

    if (!data) return <CircularIndeterminate />

    return (
        < div className={classes.root} >
            <CssBaseline />
            <Container maxWidth="lg" className={classes.container}>
                <Typography component="h2" variant="h4" className={classes.headerLabel}>
                    Kunden
                </Typography>
                <TableContainer>
                    <TableHead />
                    <TableBody>
                        {
                            data.customers.map(item => (
                                <TableRow key={item._id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell align="right">
                                        <TableActionButtons
                                            onDelete={() => setConfirmDialog({
                                                isOpen: true,
                                                title: "Möchten Sie den Kunden wirklich löschen?",
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
                <TablePagination
                    component="div"
                    count={data.total_results}
                    rowsPerPage={data.entries_per_page}
                    page={page}
                    onPageChange={handleChangePage}
                    labelRowsPerPage={""}
                    SelectProps={selectProps}
                    ActionsComponent={TablePaginationActions}
                />
            </Container>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    )
}

