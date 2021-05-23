import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

export default function CreateToDo({onKeyPress}) {
    const [newToDo, setNewToDo] = useState('');
    const handleNewToDo = (e) => {
        setNewToDo(e.target.value);
      };
    return (
        <TextField 
            id="outlined-basic" 
            label="New to do" 
            variant="outlined" 
            size="small" 
            fullWidth={true} 
            type="text" 
            value={newToDo} 
            onChange={e => handleNewToDo(e)} 
            onKeyPress={onKeyPress} 
            onKeyUp={e => e.key === "Enter" && setNewToDo('')} 
        />
        )
}
