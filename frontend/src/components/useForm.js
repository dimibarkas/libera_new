import { Container, makeStyles } from '@material-ui/core';
import { useState } from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormcontrol-root': {
            width: "80%",
            margin: theme.spacing(1)
        }
    },
    headerLabel: {
        fontFamily: "Montserrat-Light",
        letterSpacing: "0.5px",
        paddingBottom: "2rem",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}))

export function useForm(initialValues, validateOnChange = false, validate) {

    const [formData, updateFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (validateOnChange) {
            validate({ [e.target.name]: e.target.value })
        }
    };

    return {
        formData,
        updateFormData,
        errors,
        setErrors,
        handleChange
    }
}
export function Form(props) {
    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <Container maxWidth="lg" className={classes.container}>
            <form className={classes.root} autoComplete="false" autoCorrect="false" {...other}>
                {props.children}
            </form>
        </Container>
    )
}

