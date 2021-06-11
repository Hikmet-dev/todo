import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

export const  CreateToDo = ({onKeyPress}) =>  {
    const [newToDo, setNewToDo] = useState('');
        return (
        <TextField
            margin='normal'
            id="outlined-basic" 
            label="New to do" 
            variant="outlined" 
            size="small" 
            fullWidth 
            type="text" 
            value={newToDo} 
            onChange={e => setNewToDo(e.target.value)} 
            onKeyPress={onKeyPress} 
            onKeyUp={e => e.key === "Enter" && setNewToDo('')} 
        />
        )
    };
