import { Grid, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import React from 'react'
import { Input } from '../../components/controls';
import { useForm, Form } from '../../components/useForm';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory, useLocation } from "react-router";
import { postArticle } from '../../services/article-service';
import { useSelector } from 'react-redux';
import { useSnackbar } from "notistack"
import { mutate } from 'swr';

const initialValues = {
    name: ""
}

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: "Montserrat-Light",
        marginTop: "3em",
    },
    inputContainer: {
        marginTop: "20px",
    },
    toolbar: {
        borderBottom: "0.5px solid grey"
    },
    //Besser mit MUI-Grid lösen
    input: {
        width: "50%",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        }
    },
}));

export default function ArticleForm() {
    const accessToken = useSelector(state => state.user.authInfo.accessToken)
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();

    let path = location.pathname.split("/");
    const id = path.pop() || path.pop();
    console.log(id);

    const validate = (fieldValues = formData) => {
        let temp = { ...errors }
        if ("name" in fieldValues) {
            temp.name = fieldValues.name?.length > 3 ? "" : "Name des Artikels muss länger als drei Zeichen sein."
        }
        setErrors({
            ...temp
        })

        if (fieldValues === formData)
            return Object.values(temp).every(item => item === "")
    }

    const {
        formData,
        handleChange,
        errors,
        setErrors
    } = useForm(initialValues, true, validate);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await postArticle(accessToken, formData.name)
            if (res.status === 201) {
                enqueueSnackbar("Artikel wurde erfolgreich erstellt", { variant: 'success' })

                history.goBack();
                mutate("/api/articles");
            }
        } catch (error) {
            enqueueSnackbar(`Ein Fehler ist aufgerteten ${error}`, { variant: 'error' })
            onAbort();
        }

    }

    const onAbort = () => {
        history.goBack();
    }

    return (

        <Form onSubmit={handleSubmit}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    variant="contained"
                    type="submit"
                >
                    <SaveIcon />
                </IconButton>
                <IconButton
                    variant="contained"
                    onClick={onAbort}
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <Grid container spacing={2} className={classes.inputContainer}>
                <Grid item xs={12} md={6}>
                    <Input
                        label="Name des Artikels"
                        value={formData.name}
                        onChange={handleChange}
                        name="name"
                        error={errors.name}
                    />
                </Grid>
            </Grid>
        </Form>
    )
}
