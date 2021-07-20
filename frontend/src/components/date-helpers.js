import { IconButton, ListItemIcon, makeStyles, Menu, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import { Button, DatePicker } from './controls'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TodayIcon from '@material-ui/icons/Today';
import { addDays, subDays } from 'date-fns'

const useStyles = makeStyles(theme => ({
    datepicker: {
        [theme.breakpoints.down("xs")]: {
            display: "none"
        }
    },
    moreVert: {
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
}))

export default function DateHelpers({ selectedDate, handleDateChange }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

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
                <Button variant="outlined" text={"HEUTE"} onClick={() => handleDateChange(currentDate)} />
                <IconButton onClick={() => { handleDateChange(subDays(selectedDate, 1)) }}>
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton onClick={() => { handleDateChange(addDays(selectedDate, 1)) }} >
                    <ChevronRightIcon />
                </IconButton>
                <DatePicker
                    value={selectedDate}
                    handleChange={handleDateChange}
                    className={classes.datePicker}
                />
            </div>
            <div className={classes.moreVert}>
                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} >
                    <MenuItem button>
                        <ListItemIcon>
                            <TodayIcon />
                        </ListItemIcon>
                        Datum wählen
                    </MenuItem>
                </Menu>
            </div>
        </>
    )
}
