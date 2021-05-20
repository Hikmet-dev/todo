import React, { useState } from 'react';
import { ListItemText , ListItem, ListItemIcon, ListItemSecondaryAction, IconButton, Checkbox, Input } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export const ToDoListItem = ({task, date, done, id, onCheck, onDelete}) => {
  const [chanher, setChanher] = useState(false);

  const showInput = (e) => {
    setChanher(!chanher)
  }; 

 return(
    <ListItem key={id} button >
      <ListItemIcon>
        <Checkbox color="primary"  onChange={onCheck} checked={done} value={id} />
      </ListItemIcon>
      {chanher 
        ? (<Input defaultValue={task} onBlur={e => showInput(e)} onKeyPress={e => e.key === "Escape" && setChanher(false)} />) 
        : (<ListItemText  primary={task}  onClick={e => showInput(e)}/>)}
        
        <ListItemText  primary={date} />
        <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={onDelete} value={id}>
                      <DeleteIcon />
                    </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
 )   
}