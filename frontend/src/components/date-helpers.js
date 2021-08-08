import { Divider, IconButton, ListItemIcon, makeStyles, Menu, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import { Button, DatePicker } from './controls'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TodayIcon from '@material-ui/icons/Today';
import { addDays, subDays } from 'date-fns'
import AssignmentIcon from '@material-ui/icons/Assignment';
import EventIcon from '@material-ui/icons/Event';
import { changeActualDate } from '../redux/store/orders/actions'
import { useDispatch, useSelector } from 'react-redux'
const useStyles = makeStyles(theme => ({
    datepicker: {
        [theme.breakpoints.down("md")]: {
            display: "none"
        },
        display: "flex",
        alignItems: "center"
    },
    moreVert: {
        [theme.breakpoints.up("lg")]: {
            display: "none"
        }
    },
}))

export default function DateHelpers({ selectedDate, handleDateChange, setSelectedDate, buyListDialog, setBuyListDialog }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false)
    const date = useSelector(state => state.date)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const currentDate = () => {
        let date = new Date()
        date.setHours(12, 0, 0, 0)
        return date
    }

    return (
        <>
            <div className={classes.datepicker}>
                <Button
                    variant="outlined"
                    text={"Heute"}
                    onClick={() => handleDateChange(currentDate())}
                    endIcon={
                        <TodayIcon
                            color="action"
                            style={{ marginRight: "0.25em", marginLeft: "1em" }}
                        />}

                />
                <IconButton onClick={() => { handleDateChange(subDays(new Date(date.date), 1)) }}>
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton onClick={() => { handleDateChange(addDays(new Date(date.date), 1)) }} >
                    <ChevronRightIcon />
                </IconButton>
                <DatePicker
                    open={open}
                    value={new Date(date.date)}
                    handleChange={(date) => dispatch(changeActualDate(date.target.value))}
                    className={classes.datePicker}
                    margin="dense"
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    disableToolbar
                />
                <Button
                    variant="outlined"
                    text={"Einkaufsliste anzeigen"}
                    endIcon={<AssignmentIcon color="action" style={{ marginRight: "0.25em", marginLeft: "1em" }} />}
                    style={{ marginLeft: "10px" }}
                    onClick={() => setBuyListDialog(true)}
                />

            </div>
            <div className={classes.moreVert}>
                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} >
                    <MenuItem button onClick={() => handleDateChange(currentDate())}>
                        <ListItemIcon >
                            <TodayIcon />
                        </ListItemIcon>
                        Heute
                    </MenuItem>
                    <MenuItem button onClick={() => setOpen(true)}>
                        <ListItemIcon >
                            <EventIcon />
                        </ListItemIcon>
                        Datum wählen
                    </MenuItem>
                    <Divider />
                    <MenuItem button onClick={() => setBuyListDialog(true)}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        Einkaufsliste anzeigen
                    </MenuItem>
                </Menu>
            </div>
        </>
    )
}
