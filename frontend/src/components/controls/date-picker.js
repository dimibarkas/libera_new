import React from 'react'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import deLocale from "date-fns/locale/de"

export default function DatePicker(props) {

    const { name, label, value, handleChange, fullWidth, className } = props;

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
            <KeyboardDatePicker
                fullWidth={fullWidth}
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                label={label}
                format="dd.MM.yyyy"
                name={name}
                value={value}
                onChange={handleChange}
                className={className}
                style={{ marginTop: "0px", marginBottom: "0px" }}
            />

        </MuiPickersUtilsProvider>
    )
}
