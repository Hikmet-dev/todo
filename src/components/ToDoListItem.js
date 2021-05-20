import React, { useState } from 'react';
import { ListItemText , ListItem, ListItemIcon, ListItemSecondaryAction, IconButton, Checkbox, Input } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export const ToDoListItem = ({task, key, onCheck, onDelete}) => {
  const [chanher, setChanher] = useState(false);

  const showInput = (e) => {
    setChanher(!chanher)
  }; 

 return(
    <ListItem key={key} button >
      <ListItemIcon>
        <Checkbox 
          color="primary"  
          onChange={onCheck} 
          checked={task.done} 
          value={task.id} 
        />
      </ListItemIcon>
      {chanher 
        ? (<Input 
            defaultValue={task.task} 
            autoFocus="true" 
            onBlur={e => showInput(e)} 
            onKeyDown={e => e.key === "Escape" && setChanher(false)} 
          />) 
        : (<ListItemText  
            primary={task.task}  
            onClick={e => showInput(e)}
          />)
      }
        
        <ListItemText  primary={task.date} />
        <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={onDelete} value={task.id}>
                      <DeleteIcon />
                    </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
 )   
}