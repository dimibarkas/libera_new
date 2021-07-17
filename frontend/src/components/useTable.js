import { makeStyles, Table, TableCell, TableHead as MuiTableHead, TableRow, TablePagination as MuiTablePagination, Toolbar } from '@material-ui/core'
import { Button } from "./controls"
import React, { useState } from 'react'
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
        alignItems: "center",
        padding: "revert",
        [theme.breakpoints.down("xs")]: {
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

export default function useTable(headCells, records, onAdd, showDateHelpers) {

    const classes = useStyles();
    const pages = [20, 50];
    const [page, setPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(pages[page])


    const TableContainer = props => (
        <>
            <Toolbar className={classes.toolbar}>
                {showDateHelpers ?
                    <div className={classes.dateHelper}>
                        <DateHelpers />
                    </div>
                    : ""}

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
            </Toolbar>
            <Table className={classes.table}>
                {props.children}
                <TablePagination />
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
