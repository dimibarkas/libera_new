import { IconButton } from '@material-ui/core'
import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function TableActionButtons() {
    return (
        <div>
            <IconButton>
                <EditIcon />
            </IconButton>
            <IconButton color="secondary">
                <DeleteIcon />
            </IconButton>
        </div>
    )
}
