import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';
import React from 'react'

const testOptions = [
    {
        id: 1,
        title: "Test 1"
    },
    {
        id: 2,
        title: "Test 2"
    },
    {
        id: 3,
        title: "Test 3"
    },
]

export default function Select(props) {
    const { name, label, value, onChange, options = testOptions } = props;
    return (
        <FormControl
            fullWidth
            variant="outlined">
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                fullWidth
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {options?.map(item =>
                    (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                )}
            </MuiSelect>
        </FormControl>
    )
}
