import { makeStyles, TableCell, TableHead as MuiTableHead, TableRow } from '@material-ui/core'
import React, { useState } from 'react'

const useStyles = makeStyles(theme => ({
    cardcontainer: {
        marginTop: theme.spacing(3),
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    }
}))

export default function useCard() {

    const classes = useStyles();
    const [page, setPage] = useState(0);


    const CardContainer = props => (
        <div className={classes.cardcontainer}>
            {props.children}
        </div>
    )

    return {
        CardContainer
    }
}
