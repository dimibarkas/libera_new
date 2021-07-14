import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import { listArticles } from '../../services/article-service';
import useTable from '../../components/useTable';
import { TableBody, TableCell, TableRow } from '@material-ui/core';
import CircularIndeterminate from '../../components/circular-indeterminate';
import useSWR from 'swr'
import Error from '../../components/error';
import useCard from '../../components/useCard';
import Card from "../../components/card"
import { useHistory } from "react-router"
import TableActionButtons from '../../components/table-action-buttons';

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
    const history = useHistory();

    const onAdd = () => {
        history.push("/articles/new")
    }

    const accessToken = useSelector(state => state.user.authInfo.accessToken)
    const fetcher = url => listArticles(url, accessToken)
    const { data, error } = useSWR("/api/articles", fetcher);
    const classes = useStyles();
    const { TableContainer, TableHead } = useTable(headCells, data, onAdd);
    const { CardContainer } = useCard();

    if (error) return <Error />

    if (!data) return <CircularIndeterminate />

    return (
        < div className={classes.root} >
            <CssBaseline />
            <Container maxWidth="lg" className={classes.container}>
                <Typography component="h2" variant="h3" className={classes.headerLabel}>
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
                                        <TableActionButtons />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TableContainer>
                <CardContainer>
                    {
                        data.articles.map(item => (
                            <Card key={item._id} row={item} />
                        ))
                    }
                </CardContainer>
            </Container>
        </div>
    )
}
