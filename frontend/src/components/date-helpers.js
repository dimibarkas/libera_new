import { Divider, IconButton, ListItem, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import { Button, DatePicker } from './controls'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import TodayIcon from '@material-ui/icons/Today';

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

export default function DateHelpers() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <>
            <div className={classes.datepicker}>
                <Button variant="outlined" text={"HEUTE"} />
                <IconButton>
                    <ChevronLeftIcon />
                </IconButton>
                <DatePicker className={classes.datePicker} />
                <IconButton >
                    <ChevronRightIcon />
                </IconButton>
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
                        Bestellungen heute
                    </MenuItem>
                    <Divider />
                    <MenuItem button>
                        <ListItemIcon>
                            <CalendarTodayIcon />
                        </ListItemIcon>
                        Datum auswählen
                    </MenuItem>
                </Menu>
            </div>
        </>
    )
}
