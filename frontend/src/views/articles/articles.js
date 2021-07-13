import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import { listArticles } from '../../services/article-service';

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
}));

export default function Articles() {

    const accessToken = useSelector(state => state.user.authInfo.accessToken)

    const [isLoading, setLoading] = useState(true);
    const [result, setResult] = useState([]);

    const fetchArticles = async () => {
        setLoading(true);
        const res = await listArticles(accessToken);
        setResult(res);
        setLoading(false);
    };

    useEffect(() => {
        fetchArticles();
    })

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />

            <Container maxWidth="lg" className={classes.container}>
                <Typography component="h2" variant="h3" className={classes.headerLabel}>
                    Artikel
                </Typography>

            </Container>

        </div>
    )
}
