import React from 'react'
import { TextField } from '@material-ui/core'

export default function Input(props) {
    const { name, label, value, onChange, inputRef, error = null } = props;
    return (
        <TextField
            fullWidth
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            inputRef={inputRef}
            {...(error && { error: true, helperText: error })}
        />
    )
}
