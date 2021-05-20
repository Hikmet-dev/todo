import React from 'react';
import { TextField } from '@material-ui/core';

export default function CreateToDo({onChange, onKeyPress, valueNew}) {
    return (
        <TextField id="outlined-basic" label="New to do" variant="outlined" size="small" fullWidth type="text" value={valueNew} onChange={onChange} onKeyUp={onKeyPress} />
        )
}
