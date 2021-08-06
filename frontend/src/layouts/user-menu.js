import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Popover } from '@material-ui/core'
import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/store/user/actions';
import { useSnackbar } from "notistack"

export default function UserMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const { enqueueSnackbar } = useSnackbar();

    const handleLogout = () => {
        dispatch(logout())
        enqueueSnackbar("Erfolgreich ausgeloggt", { variant: 'info' })
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <IconButton color="inherit" onClick={handleClick}>
                <AccountCircleIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List dense={true}>
                    <ListItem >

                        <ListItemText primary={"Angemeldet als: " + user.tokenData.username} />
                    </ListItem>
                    <ListItem >
                        <ListItemIcon>
                            <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Mein Account" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Abmelden" onClick={handleLogout} />
                    </ListItem>
                </List>
            </Popover>
        </>
    )
}
