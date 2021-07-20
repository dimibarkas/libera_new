import { makeStyles, Table, TableCell, TableHead as MuiTableHead, TableRow, TablePagination as MuiTablePagination, Toolbar } from '@material-ui/core'
import { Button } from "./controls"
import React, { useEffect, useState } from 'react'
import AddIcon from "@material-ui/icons/Add"
import DateHelpers from './date-helpers'

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
        [theme.breakpoints.up("sm")]: {
            flexDirection: "row-reverse"
        },
        flexWrap: "wrap"
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
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    }
}))

const initialDate = () => {
    let currentDate = new Date()
    currentDate.setHours(12, 0, 0, 0);
    return currentDate
}
export default function useTable(headCells, records, onAdd, showDateHelpers) {
    const classes = useStyles();
    const pages = [20, 50];
    const [page, setPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(pages[page])
    const [selectedDate, setSelectedDate] = useState(initialDate);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate)
    }

    useEffect(() => {
        console.log(selectedDate)
    }, [selectedDate])

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
                        <DateHelpers selectedDate={selectedDate} handleDateChange={handleDateChange} />
                    </div>
                    :
                    ""
                }

            </Toolbar>
            <Table className={classes.table}>
                {props.children}
                {/* <TablePagination /> */}
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setEntriesPerPage(parseInt(event.target.value, 10))
    }

    const TablePagination = () => (
        <MuiTablePagination
            className={classes.pagination}
            page={page}
            rowsPerPageOptions={pages}
            rowsPerPage={entriesPerPage}
            count={records.total_results}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            align="right"
        />
    )

    return {
        TableContainer,
        TableHead,
        TablePagination
    }
}
