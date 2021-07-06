import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, useHistory } from "react-router-dom"
import { useSnackbar } from 'notistack';
import { postRegister } from '../services/accountService';

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
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    headerLabel: {
        fontFamily: "Montserrat-Light",
        letterSpacing: "0.5px",
        paddingBottom: "2rem",
    },
    loginLabel: {
        fontFamily: "Montserrat-Regular"
    },
    link: {
        textDecoration: "none",
        '&:visited': {
            color: "inherit"
        }
    },
}));

const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: ""
}

export default function SignUp() {
    const classes = useStyles();
    const history = useHistory();
    const [formData, updateFormData] = useState(initialState)
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const submitRegisterForm = async (event) => {
        event.preventDefault();
        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const fullName = formData.firstname + " " + formData.lastname;
            const resp = await postRegister(
                fullName,
                formData.username,
                formData.password
            );
            if (!resp || resp.status !== 201) {
                enqueueSnackbar("Registrierung fehlgeschlagen", { variant: 'error' })
                updateFormData(initialState)
            } else {
                enqueueSnackbar("Registrierung erfolgreich", { variant: 'success' })
                history.push("/login")
            }
        }
        updateFormData(initialState)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography variant="h4" component="h2" className={classes.headerLabel} color="textPrimary">
                    <RouterLink to="/" className={classes.link}>
                        Libera
                    </RouterLink>
                </Typography>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.loginLabel}>
                    Registrieren
                </Typography>
                <form className={classes.form} noValidate onSubmit={submitRegisterForm}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstname"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Vorname"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastname"
                                label="Nachname"
                                name="lastName"
                                autoComplete="lname"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Benutzername"
                                name="username"
                                autoComplete="username"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Passwort"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Registrier mich
                    </Button>
                    <Grid container >
                        <Grid item>
                            <RouterLink to="login" variant="body2">
                                Account vorhanden? Einloggen
                            </RouterLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}