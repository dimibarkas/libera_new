import { IconButton, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles(theme => ({
    actionButtons: {
        [theme.breakpoints.down("xs")]: {
            display: "none"
        }
    },
    moreVert: {
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    list: {
        width: "100%",
    }
}))

export default function TableActionButtons({ onDelete, onEdit }) {
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
            <div className={classes.actionButtons}>
                {onEdit ?
                    <IconButton onClick={onEdit}>
                        <EditIcon />
                    </IconButton>
                    : ""}
                <IconButton color="secondary" onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <div className={classes.moreVert}>
                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} >
                    {onEdit ?
                        <MenuItem button onClick={onEdit}>
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="Bearbeiten" />
                        </MenuItem>
                        : ""}
                    <MenuItem button onClick={onDelete}>
                        <ListItemIcon >
                            <DeleteIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Löschen" />
                    </MenuItem>
                </Menu>
            </div>
        </>
    )
}

