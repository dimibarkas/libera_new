import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid"
import { Link as RouterLink, useHistory } from "react-router-dom"
import { postLogin } from '../services/account-services';
import { useSnackbar } from "notistack"
import { useDispatch } from "react-redux"
import { login } from "../redux/store/user/actions/index"

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https:/dimitriosbarkas.de/">
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
        marginTop: theme.spacing(1),
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
    username: "",
    password: ""
}

export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [formData, updateFormData] = useState(initialState)
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const submitLoginForm = async (event) => {
        event.preventDefault();
        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const resp = await postLogin(
                formData.username,
                formData.password
            );
            if (!resp || resp.status !== 200) {
                enqueueSnackbar("Login fehlgeschlagen", { variant: 'error' })
            } else {
                dispatch(
                    login(resp.data.access_token, resp.data.refresh_token)
                )
                enqueueSnackbar("Login erfolgreich", { variant: 'success' })
                history.push("/dashboard")
            }
        }
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
                    Log-in
                </Typography>
                <form className={classes.form} noValidate onSubmit={submitLoginForm}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Benutzername"
                        name="username"
                        autoComplete="email"
                        onChange={handleChange}
                        value={formData.username}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Passwort"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        value={formData.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        LogIn
                    </Button>
                    <Grid container direction="row-reverse">
                        <Grid item>
                            <RouterLink to="/register" variant="body2" >
                                {"Registrieren"}
                            </RouterLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}