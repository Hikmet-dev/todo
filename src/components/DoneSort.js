import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';


export default function DoneSort() {

    return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
    <Button >All</Button>
    <Button>Done</Button>
    <Button>Undone</Button>
    </ButtonGroup>

    )
}