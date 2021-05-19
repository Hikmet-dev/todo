import React from 'react';
import { ListItemText , ListItem, ListItemSecondaryAction, IconButton, Icon, Checkbox } from '@material-ui/core';

export default function ToDoListItem(props) {
 return(
    <ListItem key={props.id}>
        <Checkbox color="primary"  onChange={props.onCheck} checked={props.done} value={props.id} />
        <ListItemText  primary={props.task} />
        <ListItemText  primary={props.date} />
        <ListItemSecondaryAction>

        <IconButton edge="end" aria-label="delete">
                      <Icon />
        </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
 )   
}