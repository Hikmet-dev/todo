import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

export default function DateSort({dataSort, onChange}) {
    return(<>
    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
    <Button size="medium" value="asc" onClick={onChange} variant={ dataSort === "asc" && "contained"}><ArrowUpwardIcon fontSize="inherit" /></Button>
    <Button size="medium" value="desc" onClick={onChange} variant={ dataSort === "desc" && "contained"}><ArrowDownwardIcon fontSize="inherit" /></Button>
    </ButtonGroup>  
      </>
    );
};