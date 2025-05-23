import { Divider, Grid, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Input } from '../../components/controls';
import { useForm, Form } from '../../components/useForm';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory, useLocation } from "react-router";
import { getCustomerById, postCustomer, updateCustomerById } from '../../services/customer-service';
import { useSelector } from 'react-redux';
import { useSnackbar } from "notistack"
import { mutate } from 'swr';

const initialValues = {
    name: "",
    street: "",
    nr: "",
    zipcode: "",
    city: "",
    country: "",
    phone: ""
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
    subtitle: {
        fontFamily: "Montserrat-Light",
    }
}));

export default function CustomerForm() {
    const [currentMode, setCurrentMode] = useState(null);

    const validate = (fieldValues = formData) => {
        let temp = { ...errors }
        if ("name" in fieldValues) {
            temp.name = fieldValues.name?.length > 3 ? "" : "Name des Kunden muss länger als drei Zeichen sein."
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

    const accessToken = useSelector(state => state.user.authInfo.accessToken)
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();

    let path = location.pathname.split("/");
    const id = path.pop() || path.pop();


    useEffect(() => {
        async function determineAddOrEditMode(id) {
            if (id === "new") {
                setCurrentMode("Kunde hinzufügen")
            } else {
                setCurrentMode("Kunde bearbeiten")
                const res = await getCustomerById(accessToken, id);
                updateFormData({
                    name: res.data.name,
                    street: res.data.address.street,
                    nr: res.data.address.nr,
                    zipcode: res.data.address.zipcode,
                    city: res.data.address.city,
                    country: res.data.address.country,
                    phone: res.data.phone
                });
            }
        };
        determineAddOrEditMode(id);
    }, [id, accessToken, updateFormData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const customerInfo = {
            name: formData.name,
            address: {
                street: formData.street,
                nr: formData.nr,
                zipcode: formData.zipcode,
                city: formData.city,
                country: formData.country
            },
            phone: formData.phone
        };
        if (validate()) {
            if (currentMode === "Kunde bearbeiten") {
                try {
                    const res = await updateCustomerById(accessToken, id, customerInfo)
                    if (res.status === 200) {
                        enqueueSnackbar("Kunde wurde erfolgreich bearbeitet.", { variant: 'success' })
                        history.goBack();
                        mutate("/api/customers");
                        return
                    }
                } catch (error) {
                    enqueueSnackbar("Kunde wurde nicht bearbeitet.", { variant: 'warning' })
                    history.goBack();
                    return
                }
            }
            try {
                const res = await postCustomer(accessToken, customerInfo)
                if (res.status === 201) {
                    enqueueSnackbar("Kunde wurde erfolgreich erstellt.", { variant: 'success' })
                    history.goBack();
                    mutate("/api/customers");
                }
            } catch (error) {
                enqueueSnackbar(`Ein Fehler ist aufgerteten ${error}.`, { variant: 'error' })
                onAbort();
            }
        }
    }

    const onAbort = () => {
        history.goBack();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Typography component="h2" variant="h3" className={classes.headerLabel}>
                {currentMode}
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
                        label="Name des Kunden"
                        value={formData.name}
                        onChange={handleChange}
                        name="name"
                        error={errors.name}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography component="h6" variant="h5" className={classes.subtitle}>Kontaktdaten</Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Input
                        label="Straße"
                        value={formData.street}
                        onChange={handleChange}
                        name="street"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Input
                        label="Hausnummer"
                        value={formData.nr}
                        onChange={handleChange}
                        name="nr"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Input
                        label="Postleitzahl"
                        value={formData.zipcode}
                        onChange={handleChange}
                        name="zipcode"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Input
                        label="Stadt"
                        value={formData.city}
                        onChange={handleChange}
                        name="city"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Input
                        label="Land"
                        value={formData.country}
                        onChange={handleChange}
                        name="country"
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography component="h6" variant="h6" className={classes.subtitle}>Telefon</Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Input
                        label="Telefonnummer"
                        value={formData.phone}
                        onChange={handleChange}
                        name="phone"
                    />
                </Grid>
            </Grid>
        </Form>
    )
}
