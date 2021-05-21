import React from 'react';
import { ButtonGroup, IconButton } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

export default function DateSort({dataSort, onChange}) {
    return(<>
    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
        <IconButton aria-label="delete" size="medium" value="ascending"   onClick={onChange} variant={ dataSort === "ascending" && "contained"}>
          <ArrowUpwardIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="delete" size="medium" value="descending" onClick={onChange} variant={ dataSort === "descending" && "seconcontaineddary"}>
          <ArrowDownwardIcon fontSize="inherit" />
        </IconButton>
    </ButtonGroup>  
      </>
    );
};