import { IconButton } from '@material-ui/core'
import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function TableActionButtons({ onDelete, onEdit }) {
    return (
        <div>
            <IconButton onClick={onEdit}>
                <EditIcon />
            </IconButton>
            <IconButton color="secondary" onClick={onDelete}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}
