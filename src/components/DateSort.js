import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';

export default function DateSort({dataSort, onChange}) {
    return(<>
    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
        <Button value="ascending"   onClick={onChange} >Ascending</Button>
        <Button value="descending" onClick={onChange} >Descending</Button>
    </ButtonGroup>  
      </>
    );
};