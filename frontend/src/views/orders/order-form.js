import { Divider, Grid, IconButton, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { AsyncAutocompleteCustomers, DatePicker } from '../../components/controls';
import { useForm, Form } from '../../components/useForm';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory, useLocation } from "react-router";
import { updateOrderById, getOrderbyId, postOrder } from '../../services/order-service';
import { useSelector } from 'react-redux';
import { useSnackbar } from "notistack"
import { mutate } from 'swr';
import AddIcon from "@material-ui/icons/Add"
import TableActionButtons from '../../components/table-action-buttons';
import AddPositionTableRow from '../../components/positions/add-position-table-row';
import PositionDialog from '../../components/positions/position-dialog';
import "./index.css"

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
    },
    onAddButtonMobile: {
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    }
}));

export default function OrderForm() {
    const [currentMode, setCurrentMode] = useState(null);
    const date = useSelector(state => state.date)

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

    const handleChange = (e, newValue) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const initialValues = {
        customer_name: null,
        date: new Date(date.date),
        positions: []
    }


    const {
        formData,
        updateFormData,
        errors,
        setErrors
    } = useForm(initialValues, true, validate);

    useEffect(() => {
        console.log(formData)
    }, [formData])

    const accessToken = useSelector(state => state.user.authInfo.accessToken)
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [positionDialog, setPositionDialog] = useState(false);

    let path = location.pathname.split("/");
    const id = path.pop() || path.pop();

    useEffect(() => {
        async function determineAddOrEditMode(id) {
            if (id === "new") {
                setCurrentMode("add")
            } else {
                setCurrentMode("edit")
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

    function calcDiffDays(second) {
        return Math.round((second - new Date()) / (1000 * 60 * 60 * 24))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderInfo = {
            customer_name: formData.customer_name,
            date: formData.date,
            positions: formData.positions
        };
        if (validate()) {
            if (currentMode === "edit") {
                try {
                    const res = await updateOrderById(accessToken, id, orderInfo)
                    if (res.status === 200) {
                        enqueueSnackbar("Bestellung wurde erfolgreich bearbeitet.", { variant: 'success' })
                        history.goBack();
                        mutate("/api/orders/current/" + calcDiffDays(new Date(date.date)));
                        return
                    }
                } catch (error) {
                    enqueueSnackbar("Bestellung wurde nicht bearbeitet.", { variant: 'warning' })
                    history.goBack();
                    return
                }
            }
            try {
                const res = await postOrder(accessToken, orderInfo)
                if (res.status === 201) {
                    enqueueSnackbar("Bestellung wurde erfolgreich erstellt.", { variant: 'success' })
                    history.goBack();
                    mutate("/api/orders/current/" + calcDiffDays(new Date(date.date)));
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

    const addPosition = (ammount, article) => {
        updateFormData({
            ...formData,
            positions: [...formData.positions, { number: ammount, name: article }]
        })
    }

    const deletePosition = (article) => {
        console.log(article)
        updateFormData({
            ...formData,
            positions: formData.positions.filter(element => element.name !== article)
        })
    }

    const handleClosePositionDialog = () => {
        setPositionDialog(false)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Typography component="h2" variant="h4" className={classes.headerLabel}>
                {currentMode === "edit" ? "Bestellung bearbeiten" : "Bestellung hinzufügen"}
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
                        value={formData.customer_name}
                        handleChange={
                            (newValue) => {
                                updateFormData({
                                    ...formData,
                                    customer_name: newValue === null ? "" : newValue.name
                                })
                            }
                        }
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DatePicker
                        fullWidth={true}
                        handleChange={handleChange}
                        value={formData.date}
                        name="date"
                        disableToolbar
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <>
                        <div className={classes.subtitleWrapper}>
                            <Typography component="h6" variant="h5" className={classes.subtitle}>Positionen</Typography>
                            <IconButton className={classes.onAddButtonMobile} onClick={() => setPositionDialog(true)}>
                                <AddIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" >Artikel</TableCell>
                                        <TableCell align="center">Anzahl</TableCell>
                                        <TableCell align="center">Aktionen</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <AddPositionTableRow onAdd={addPosition} token={accessToken} />
                                    {formData.positions.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="center">{row.number}</TableCell>
                                            <TableCell align="center">
                                                <TableActionButtons
                                                    onDelete={() => deletePosition(row.name)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <PositionDialog
                            open={positionDialog}
                            onClose={handleClosePositionDialog}
                            token={accessToken}
                            onAdd={addPosition}
                        />
                    </>
                </Grid>

            </Grid>
        </Form>
    )
}
