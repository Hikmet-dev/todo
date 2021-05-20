import React from 'react';
import { ListItemText , ListItem, ListItemSecondaryAction, IconButton, Icon, Checkbox } from '@material-ui/core';

export default function ToDoListItem({task, date, done, id, onCheck}) {

 return(
    <ListItem key={id}>
        <Checkbox color="primary"  onChange={onCheck} checked={done} value={id} />
        <ListItemText  primary={task} />
        <ListItemText  primary={date} />
        <ListItemSecondaryAction>

        <IconButton edge="end" aria-label="delete">
                      <Icon />
        </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
 )   
}