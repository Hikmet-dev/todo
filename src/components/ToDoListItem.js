import React, { useState } from 'react';
import { ListItemText , ListItem, ListItemIcon, ListItemSecondaryAction, IconButton, Checkbox, Input } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export const ToDoListItem = ({task, onCheck, onDelete, onChange}) => {
  const [chanher, setChanher] = useState(false);

  const showInput = (e) => {
    setChanher(!chanher)
  }; 

 return(
 <ListItem>
      <ListItemIcon>
        <Checkbox 
          color="primary"  
          onChange={onCheck} 
          checked={task.done} 
          value={task.uuid} 
        />
      </ListItemIcon>
      {chanher 
        ? (<Input 
            defaultValue={task.name}
            autoFocus={true}
            name={`${task.uuid}`}
            onBlur={e => showInput(e)} 
            onKeyDown={e => e.key === "Escape" && setChanher(false)} 
            onKeyPress={onChange}
            onKeyUp={e => e.key === "Enter" && setChanher(false)}
          />) 
        : (<ListItemText  
            primary={task.name}  
            onClick={e => showInput(e)}
          />)
      }
        
        <ListItemText  primary={task.createdAt} />
        <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={onDelete} value={task.uuid}>
                      <DeleteIcon />
                    </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
   
 )   
};