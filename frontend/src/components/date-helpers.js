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

export default function DateHelpers({ selectedDate, handleDateChange, setSelectedDate }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false)

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
                    color="default"
                    variant="outlined"
                    text={"Heute"}
                    onClick={() => handleDateChange(currentDate)}
                    endIcon={<TodayIcon
                        color="action"
                        style={{ marginRight: "0.25em", marginLeft: "1em" }}
                    />}

                />
                <IconButton onClick={() => { handleDateChange(subDays(selectedDate, 1)) }}>
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton onClick={() => { handleDateChange(addDays(selectedDate, 1)) }} >
                    <ChevronRightIcon />
                </IconButton>
                <DatePicker
                    open={open}
                    value={selectedDate}
                    handleChange={(date) => setSelectedDate(date.target.value)}
                    className={classes.datePicker}
                    margin="dense"
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                />
                <Button
                    color="default"
                    variant="outlined"
                    text={"Einkaufsliste anzeigen"}
                    endIcon={<AssignmentIcon color="action" style={{ marginRight: "0.25em", marginLeft: "1em" }} />}
                    style={{ marginLeft: "10px" }} />
            </div>
            <div className={classes.moreVert}>
                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} >
                    <MenuItem button onClick={() => handleDateChange(currentDate)}>
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
                    <MenuItem button>
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
