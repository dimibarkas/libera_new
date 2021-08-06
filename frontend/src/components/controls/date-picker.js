import React from 'react'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import deLocale from "date-fns/locale/de"

export default function DatePicker(props) {

    const { name, label, value, handleChange, fullWidth, margin, className, disableToolbar, variant, onClose, open, onOpen } = props;

    const convertToEventParameters = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
            <KeyboardDatePicker
                color="default"
                open={open}
                fullWidth={fullWidth}
                disableToolbar={disableToolbar}
                variant={variant}
                inputVariant="outlined"
                label={label}
                format="EE,dd.MM.yyyy"
                name={name}
                value={value}
                margin={margin}
                onChange={date => handleChange(convertToEventParameters(name, date))}
                className={className}
                style={{ marginTop: "0px", marginBottom: "0px" }}
                onClose={onClose}
                onOpen={onOpen}
            />

        </MuiPickersUtilsProvider>
    )
}
