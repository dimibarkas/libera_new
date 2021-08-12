import { makeStyles, Table, TableCell, TableHead as MuiTableHead, TableRow, Toolbar } from '@material-ui/core'
import { Button } from "./controls"
import React from 'react'
import AddIcon from "@material-ui/icons/Add"
import DateHelpers from './date-helpers'
import { changeActualDate } from '../redux/store/orders/actions'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: "600",
            color: theme.palette.primary.main,
        }
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        padding: "revert",
        [theme.breakpoints.up("lg")]: {
            flexDirection: "row-reverse",
        },
        // flexWrap: "wrap"

    },
    actionTableCell: {
        '& MuiTableCell-alignRight': {
            paddingRight: "1rem",
        }
    },
    link: {
        textDecoration: "none",
        '&:visited': {
            color: "inherit"
        }
    },
    pagination: {
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    dateHelper: {
        display: "flex",
        alignItems: "center",
    },
    onAddButtonContainer: {
        flexShrink: "0",

    },
    datePicker: {
        [theme.breakpoints.down("md")]: {
            display: "none"
        }
    }
}))


export default function useTable(headCells, records, onAdd, showDateHelpers, selectedDate, setSelectedDate, buyListDialog, setBuyListDialog) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleDateChange = (newDate) => {
        dispatch(changeActualDate(newDate))
        setSelectedDate(newDate)
    }

    const TableContainer = props => (
        <>
            <Toolbar className={classes.toolbar}>
                <div className={classes.onAddButtonContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.addButton}
                        startIcon={<AddIcon />}
                        onClick={onAdd}
                        text={"Hinzufügen"}
                    />
                </div>
                {showDateHelpers ?
                    <div className={classes.dateHelper}>
                        <DateHelpers
                            selectedDate={selectedDate}
                            handleDateChange={handleDateChange}
                            setSelectedDate={setSelectedDate}
                            buyListDialog={buyListDialog}
                            setBuyListDialog={setBuyListDialog}
                        />
                    </div>
                    :
                    ""
                }
            </Toolbar>
            <Table className={classes.table}>
                {props.children}
            </Table>
        </>
    )

    const TableHead = props => {
        const classes = useStyles();
        return (
            <MuiTableHead>
                <TableRow>
                    {
                        headCells.map(headCell => (
                            <TableCell
                                key={headCell.id}
                                align={headCell.align}
                                className={classes.actionTableCell}
                            >{headCell.label}</TableCell>
                        ))
                    }
                </TableRow>
            </MuiTableHead>
        )
    }

    return {
        TableContainer,
        TableHead
    }
}
