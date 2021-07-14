import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        width: "100%",
        minHeight: "65vh",
    },
}));

export default function Error() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <WarningIcon fontSize="large" />
            <p>Beim laden der Daten ist ein Fehler aufgetreten...</p>
            <p>Bitte wenden Sie sich nicht an den Entwickler des Systems.</p>
        </div>
    );
}