import React, { forwardRef, useMemo } from 'react';
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
import { Link } from "react-router-dom"

function ListItemLink(props) {
    const { icon, primary, to } = props;
    const CustomLink = useMemo(
        () =>
            forwardRef((linkProps, ref) => (
                <Link ref={ref} to={to} {...linkProps} />
            )),
        [to],
    )

    return (
        <ListItem button component={CustomLink}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={primary} />
        </ListItem>
    )
}


export const mainListItems = (
    <>
        <ListItemLink icon={<DashboardIcon />} primary={"Dashboard"} to={"/dashboard"} />
        <ListItemLink icon={<ShoppingCartIcon />} primary={"Bestellungen"} to={"/orders"} />
        <ListItemLink icon={<PeopleIcon />} primary={"Kunden"} to={"/customers"} />
        <ListItemLink icon={<BarChartIcon />} primary={"Einkaufslisten"} to={"/buylists"} />
        <ListItemLink icon={<LayersIcon />} primary={"Artikel"} to={"/articles"} />
    </>
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