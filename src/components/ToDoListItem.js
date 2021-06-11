import React, { useState } from 'react';
import { ListItemText , ListItem, ListItemIcon, ListItemSecondaryAction, IconButton, Checkbox, Input, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export const ToDoListItem = ({task, onCheck, onDelete, onChange}) => {
  const [changeInput, setChangeInput] = useState(false);
  const [disab, setDisab] = useState(false);
  const showInput = (e) => {
    setChangeInput(!changeInput)
  }; 
  const buttonDisabled = () => {
    setDisab(true)
  }
const date = task.createdAt.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)[0];
const time = task.createdAt.match(/T(((([0-1][0-9])|(2[0-3])):?[0-5][0-9]))/g)[0].replace('T', '');
console.log(time);
 return(
   <Grid container>
    <ListItem>
      <Grid item xs={1}>
      <ListItemIcon>
        <Checkbox 
          color="primary"  
          onChange={onCheck} 
          checked={task.done} 
          value={task.id} 
        />
      </ListItemIcon>
      </Grid>
      <Grid item xs={8}>
      {changeInput 
        ? (<Input
            fullWidth
            defaultValue={task.name}
            autoFocus={true}
            name={`${task.id}`}
            onBlur={e => showInput(e)} 
            onKeyDown={e => e.key === "Escape" && setChangeInput(false)} 
            onKeyPress={onChange}
            onKeyUp={e => e.key === "Enter" && setChangeInput(false)}
          />) 
        : (<ListItemText  
            primary={task.name}  
            onClick={e => showInput(e)}
          />)
      }
      </Grid>
        <Grid item xs={2}>
        <ListItemText  primary={`${time} ${date}`} />
        </Grid>
      <Grid item xs={1}>
        <ListItemSecondaryAction>
                    <IconButton edge="end" disabled={disab} aria-label="delete" onClick={(e) => {onDelete(e); buttonDisabled()}} value={task.id}>
                      <DeleteIcon />
                    </IconButton>
        </ListItemSecondaryAction>
        </Grid>
        </ListItem>
   </Grid>
      
 )   
};