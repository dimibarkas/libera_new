import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from "../components/controls/button"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Link as RouterLink } from "react-router-dom"
import { IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from "../redux/store/darkmode/actions/index"
import Brightness7Icon from "@material-ui/icons/Brightness7"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { logout } from '../redux/store/user/actions';
import { useSnackbar } from "notistack"

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://dimitriosbarkas.de/">
                Dimitrios Barkas
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        textDecoration: "none",
        '&:visited': {
            color: "inherit"
        }
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
    getStartedButtonContainer: {
        margin: "2em 0",
        display: "flex",
        justifyContent: "center",
    }
}));

const tiers = [
    {
        icon: <ShoppingCartIcon fontSize="large" />,
        title: 'Bestellungen aufnehmen',
        description: [
            'schnell und einfach',
            'intuitive Bedienung',
            'für Desktop- und Mobile Ansicht',
            'Bestellungen verwalten'],
    },
    {
        icon: <AssignmentIcon fontSize="large" />,
        title: 'Einkaufsplan generieren',
        subheader: 'Wichtigstes Feature',
        price: '15',
        description: [
            'auf Basis der aufgenommenen Bestellungen',
            'Zusammenfassung und Bereitstellung als PDF',
        ]
    },
    {
        icon: <ImportContactsIcon fontSize="large" />,
        title: 'Stammdaten verwalten',
        price: '30',
        description: [
            'Kunden',
            'Artikel',
            'Bestellungen',
            'Benutzer'
        ],
    },
];
const footers = [
    {
        title: 'Company',
        description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
        title: 'Features',
        description: ['Cool Feature', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
    },
    {
        title: 'Resources',
        description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
    },

];

export default function LandingPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const darkModeState = useSelector((state) => state.darkMode);
    const userState = useSelector((state) => state.user);
    const { enqueueSnackbar } = useSnackbar();

    const handleDarkModeToggle = () => {
        dispatch(toggleDarkMode())
    }

    const onLogoutClick = () => {
        if (userState.loggedIn) {
            dispatch(logout())
            enqueueSnackbar("Erfolgreich ausgeloggt", { variant: 'info' })
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Dimitrios Barkas
                    </Typography>

                    <div>
                        <IconButton onClick={handleDarkModeToggle}>
                            {darkModeState.isEnabled ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <RouterLink to="/login" className={classes.link}>
                            <Button color="primary" variant="outlined" onClick={onLogoutClick} text={userState.loggedIn ? "Logout" : "Login"} />
                        </RouterLink>
                    </div>
                </Toolbar>
            </AppBar>
            {/* Hero unit */}
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Libera
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    Erfassen Sie die Bestellungen Ihrer Kunden digitial und unkompliziert über diese App.
                </Typography>
                <div className={classes.getStartedButtonContainer}>
                    <RouterLink to="/dashboard" className={classes.link}>
                        <Button text={"JETZT STARTEN"} />
                    </RouterLink>
                </div>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">

                <Grid container spacing={3} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={tier.title} xs={12} sm={12} md={4}>
                            <Card>
                                <CardHeader
                                    avatar={tier.icon}
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center', variant: 'subtitle1' }}
                                    subheaderTypographyProps={{ align: 'center' }}
                                    className={classes.cardHeader}
                                />
                                <CardContent>
                                    <div className={classes.cardPricing}>

                                    </div>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography component="li" variant="subtitle1" align="center" key={line}>
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/* Footer */}
            <Container maxWidth="md" component="footer" className={classes.footer}>
                <Grid container spacing={4} justifyContent="space-evenly">
                    {footers.map((footer) => (
                        <Grid item xs={6} sm={3} key={footer.title}>
                            <Typography variant="h6" color="textPrimary" gutterBottom>
                                {footer.title}
                            </Typography>
                            <ul>
                                {footer.description.map((item) => (
                                    <li key={item}>
                                        <Link href="#" variant="subtitle1" color="textSecondary">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
                </Grid>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
            {/* End footer */}
        </React.Fragment>
    );
}