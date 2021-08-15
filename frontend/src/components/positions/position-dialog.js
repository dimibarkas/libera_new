import React, { useEffect, useRef, useState } from 'react'
import { Dialog as MuiDialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles, TextField, Button } from "@material-ui/core"
import { AsyncAutocompleteArticles } from '../controls';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles(theme => ({
    root: {
        justifyContent: "center",
    },
    dialogWrapper: {
        padding: theme.spacing(2),
        textAlign: "center",
    },
    titleIcon: {
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: "default",
        },
        '& .MuiSvgIcon-root': {
            fontSize: "3rem",
        }
    },
    titleText: {
        marginBottom: "1em"
    },
    label: {
        textTransform: "none"
    },
    buttonRoot: {
        margin: theme.spacing(0.5),
    },
}))

const initialState = {
    ammount: "1",
    article: "",
}

export default function PositionDialog(props) {
    const { open, token, onClose, onAdd } = props;
    const [position, updatePosition] = useState(initialState)
    const classes = useStyles();

    const ref = useRef(null);

    const handleChange = (e) => {
        updatePosition({
            ...position,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        console.log(position)
    }, [position]);

    const backDrop = () => {
        onClose()
        updatePosition(initialState)
    }

    const handleFocus = (event) => {
        event.target.select();
    }

    const handleAsyncChange = (newValue) => {
        updatePosition({
            ...position,
            article: newValue === null ? "" : newValue.name
        });
        ref.current.focus();
    }

    return (
        <MuiDialog open={open} onClose={(e, r) => r === "backdropClick" ? backDrop() : ""} classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle>
                Position hinzufügen
            </DialogTitle>
            <DialogContent>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <AsyncAutocompleteArticles
                            token={token}
                            name="article"
                            value={position.article}
                            handleChange={(newValue) => handleAsyncChange(newValue)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            name="ammount"
                            type="number"
                            value={position.ammount}
                            onChange={handleChange}
                            InputProps={{ inputProps: { min: 0, step: 1.0, lang: "de-DE" } }}
                            onFocus={handleFocus}
                            ref={ref}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={classes.root}>
                <Button
                    fullWidth
                    classes={{
                        root: classes.buttonRoot,
                        label: classes.label
                    }}
                    variant="contained"
                    color="primary"
                    startIcon={<AddShoppingCartIcon />}
                    autoFocus
                    onClick={() => {
                        onAdd(position.ammount, position.article);
                        updatePosition(initialState)
                        onClose()
                    }
                    }
                    disabled={position.ammount <= 0 || position.article === ""}
                >
                    Speichern
                </Button>
            </DialogActions>
        </MuiDialog>
    )
}
