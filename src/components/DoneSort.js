import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';


export default function DoneSort({onChange}) {

    return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
    <Button onClick={onChange} value="none">All</Button>
    <Button onClick={onChange} value="true">Done</Button>
    <Button onClick={onChange} value="false" >Undone</Button>
    </ButtonGroup>

    )
}
