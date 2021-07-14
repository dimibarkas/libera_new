import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "65vh",
    },
}));

export default function NoMatch() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <WarningIcon fontSize="large" style={{ marginBottom: "2em" }} />
            <Typography variant="h3">404</Typography>
            <Typography variant="h5">Die Seite konnte nicht gefunden werden.</Typography>
        </div>
    );
}