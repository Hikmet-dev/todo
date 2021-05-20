import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';


export default function DoneSort({onChange}) {

    return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
    <Button onClick={(e) => onChange(e)} >All</Button>
    <Button onClick={(e) => onChange(e)} >Done</Button>
    <Button onClick={(e) => onChange(e)} >Undone</Button>
    </ButtonGroup>

    )
}
