import { Grid, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { AsyncAutocompleteCustomers, DatePicker } from '../../components/controls';
import { useForm, Form } from '../../components/useForm';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory, useLocation } from "react-router";
import { postCustomer, updateCustomerById } from '../../services/customer-service';
import { getOrderbyId } from '../../services/order-service';
import { addBusinessDays } from 'date-fns';
import { useSelector } from 'react-redux';
import { useSnackbar } from "notistack"
import { mutate } from 'swr';
import Positions from '../../components/positions/positions';

const nextBusinessDay = addBusinessDays(new Date(), 1)

const initialValues = {
    customer_name: null,
    date: new Date(nextBusinessDay),
    positions: {}
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
        marginTop: "1em",
        display: "inline-block"
    },
    subtitleWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
    }
}));

export default function OrderForm() {

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

    useState(() => {
        console.log(formData)
    }, [formData])

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
                setCurrentMode("Bestellung hinzufügen")
            } else {
                setCurrentMode("Bestellung bearbeiten")
                const res = await getOrderbyId(accessToken, id);
                console.log(res.data)
                updateFormData({
                    customer_name: res.data.customer_name,
                    date: res.data.date,
                    positions: res.data.positions,
                });
            }
        };
        determineAddOrEditMode(id);
    }, [id, accessToken, updateFormData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const customerInfo = {
            customer_name: formData.customer_name,
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
            <Typography component="h2" variant="h4" className={classes.headerLabel}>
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
                    <AsyncAutocompleteCustomers
                        handleChange={handleChange}
                        value={formData.customer_name}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DatePicker
                        fullWidth={true}
                        handleChange={handleChange}
                        value={formData.date}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Positions id={id} token={accessToken} />
                </Grid>

            </Grid>
        </Form>
    )
}
