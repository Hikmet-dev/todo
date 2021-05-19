import React from 'react';
import { ListItemText , ListItem, ListItemSecondaryAction, IconButton, Icon, Checkbox} from '@material-ui/core';

export default function ToDoListItem(props) {
 return(
    <ListItem key={props.key}>
        <Checkbox color="primary" checked={props.done} id={props.key}/>
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