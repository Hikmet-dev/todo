import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';

export default function DoneSort({onChange, doneSort}) {
    return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
    <Button onClick={onChange} variant={ doneSort === "" && "contained"} value="">All</Button>
    <Button onClick={onChange} variant={ doneSort === "true" && "contained"} value="true">Done</Button>
    <Button onClick={onChange} variant={ doneSort === "false" && "contained"} value="false" >Undone</Button>
    </ButtonGroup>

    )
}
