import React from 'react';
import { TextField } from '@material-ui/core';

export default function CreateToDo(props) {
    return (
        <TextField id="outlined-basic" label="New to do" variant="outlined" size="small" fullWidth type="text" value={props.valueNew} onChange={props.onChange} onKeyUp={props.onKeyPress} />
    )
}
