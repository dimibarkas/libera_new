import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { listArticles } from '../../services/article-service';
import useTable from '../../components/useTable';
import { TableBody, TableCell, TableRow, TablePagination, useTheme, IconButton } from '@material-ui/core';
import CircularIndeterminate from '../../components/circular-indeterminate';
import useSWR from 'swr'
import Error from '../../components/error';
import { useHistory } from "react-router"
import TableActionButtons from '../../components/table-action-buttons';
import { deleteArticle } from '../../services/article-service';
import { useSnackbar } from "notistack"
import { mutate } from 'swr';
import ConfirmDialog from "../../components/confirm-dialog"
import { changePage } from "../../redux/store/articles/actions"
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import PropTypes from 'prop-types';

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
    { id: "name", label: "Artikelname", align: "inherit" },
    { id: "actions", label: "Aktionen", align: "right" }
]

export default function Articles() {
    const accessToken = useSelector(state => state.user.authInfo.accessToken)
    const history = useHistory();
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch()
    const page = useSelector(state => state.articles_table.page)

    const handleChangePage = (event, newPage) => {
        dispatch(changePage(newPage))
    }

    const onAdd = () => {
        history.push("/articles/new")
    }

    const onDelete = async (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
        try {
            const res = await deleteArticle(accessToken, id);
            if (res.status === 200) {
                enqueueSnackbar("Artikel wurde erfolgreich gelöscht.", { variant: 'success' })
                mutate(`/api/articles/search?page=${page}`);
            }
        } catch (error) {
            enqueueSnackbar("Artikel konnte nicht gelöscht werden", { variant: 'error' })
        }
    }

    const onEdit = (id) => {
        history.push(`/articles/${id}`)
    }

    const fetcher = url => listArticles(url, accessToken)
    const { data, error } = useSWR(`/api/articles/search?page=${page}`, fetcher);
    const classes = useStyles();
    const { TableContainer, TableHead } = useTable(headCells, data, onAdd);

    if (error) return <Error />

    if (!data) return <CircularIndeterminate />

    return (
        <div className={classes.root} >
            <CssBaseline />
            <Container maxWidth="lg" className={classes.container}>
                <Typography component="h2" variant="h4" className={classes.headerLabel}>
                    Artikel
                </Typography>
                <TableContainer>
                    <TableHead />
                    <TableBody>
                        {
                            data.articles.map(item => (
                                <TableRow key={item._id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell align="right">
                                        <TableActionButtons
                                            onDelete={() => setConfirmDialog({
                                                isOpen: true,
                                                title: "Möchten Sie den Artikel wirklich löschen?",
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


/**
 * Cusom Pagination
 */
const selectProps = {
    style: {
        display: "none"
    }
}

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

