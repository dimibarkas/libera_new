import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link as RouterLink } from "react-router-dom"


export const mainListItems = (
    <div>

        <ListItem button>
            <RouterLink to="/dashboard" variant="body2" style={{
                textDecoration: "none",
                '&:visited': {
                    color: "inherit"
                },
                color: "inherit",
                display: "flex",
                alignItems: "center"
            }}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </RouterLink>
        </ListItem>
        <RouterLink to="/orders" variant="body2" style={{
            textDecoration: "none",
            '&:visited': {
                color: "inherit"
            },
            color: "inherit",
            display: "flex",
            alignItems: "center"
        }}>
            <ListItem button>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Bestellungen" />
            </ListItem>
        </RouterLink>
        <ListItem button>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Kunden" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Einkaufslisten" />
        </ListItem>
        <RouterLink to="/articles" variant="body2" style={{
            textDecoration: "none",
            '&:visited': {
                color: "inherit"
            },
            color: "inherit",
            display: "flex",
            alignItems: "center"
        }}>
            <ListItem button>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Artikel" />
            </ListItem>
        </RouterLink>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Gespeicherte Listen</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Heute" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Gestern" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Letzte Woche" />
        </ListItem>
    </div>
);