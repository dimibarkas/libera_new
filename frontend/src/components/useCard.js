import { makeStyles } from '@material-ui/core'
import React from 'react'

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
    const CardContainer = props => (
        <div className={classes.cardcontainer}>
            {props.children}
        </div>
    )

    return {
        CardContainer
    }
}
