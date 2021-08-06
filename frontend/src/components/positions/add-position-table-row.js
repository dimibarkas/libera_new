import { IconButton, TableCell, TableRow, TextField } from '@material-ui/core'
import AddIcon from "@material-ui/icons/Add"
import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { AsyncAutocompleteArticles } from '../controls'

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        }
    }
}))

const initialState = {
    ammount: "1",
    article: "",
}

export default function AddPositionTableRow({ onAdd, onDelete, token }) {
    const [position, updatePosition] = useState(initialState)
    const classes = useStyles()

    const inputRef = React.createRef();

    const handleChange = (e) => {
        updatePosition({
            ...position,
            [e.target.name]: e.target.value
        })
    }

    function focusTextInput() {
        inputRef.current.focus();
    }


    return (
        <TableRow className={classes.root}>

            <TableCell align="left">
                <AsyncAutocompleteArticles
                    inputRef={inputRef}
                    token={token}
                    name="article"
                    value={position.article}
                    handleChange={(newValue) => {
                        updatePosition({
                            ...position,
                            article: newValue === null ? "" : newValue.name
                        })
                    }}
                />
            </TableCell>
            <TableCell align="center">
                <TextField
                    name="ammount"
                    type="number"
                    value={position.ammount}
                    onChange={handleChange}
                    InputProps={{ inputProps: { min: 0, step: 1.0, lang: "de-DE" } }}
                />
            </TableCell>
            <TableCell align="center">
                <IconButton
                    onClick={() => {
                        onAdd(position.ammount, position.article);
                        updatePosition(initialState)
                        focusTextInput()
                    }
                    }
                    disabled={position.ammount <= 0 || position.article === ""}
                >
                    <AddIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}
