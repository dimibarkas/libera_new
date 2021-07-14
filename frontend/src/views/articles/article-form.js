import { Grid, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import { Input } from '../../components/controls';
import { useForm, Form } from '../../components/useForm';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory, useLocation } from "react-router";
import { getArticleById, postArticle } from '../../services/article-service';
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
    input: {
        width: "50%",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        }
    },
    headerLabel: {
        fontFamily: "Montserrat-Light",
        letterSpacing: "0.5px",
        paddingBottom: "2rem",
    },
}));

export default function ArticleForm() {

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
        updateFormData,
        handleChange,
        errors,
        setErrors
    } = useForm(initialValues, true, validate);

    console.log(formData);
    const accessToken = useSelector(state => state.user.authInfo.accessToken)
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();

    let path = location.pathname.split("/");
    const id = path.pop() || path.pop();

    const fetchArticleData = async (id) => {
        if (id !== "new") {
            try {
                const res = await getArticleById(accessToken, id)
                updateFormData(res.data)
            } catch (error) {

            }
        }
        return
    }

    useEffect(() => {
        fetchArticleData(id);
    }, [id]);

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
            <Typography component="h2" variant="h3" className={classes.headerLabel}>
                Neuen Artikel hinzufügen
            </Typography>
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
