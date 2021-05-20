import React from 'react';
import { ListItemText , ListItem, ListItemSecondaryAction, IconButton, Checkbox } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ToDoListItem({task, date, done, id, onCheck, onDelete}) {

 return(
    <ListItem key={id}>
        <Checkbox color="primary"  onChange={onCheck} checked={done} value={id} />
        <ListItemText  primary={task} />
        <ListItemText  primary={date} />
        <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={onDelete} value={id}>
                      <DeleteIcon />
                    </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
 )   
}