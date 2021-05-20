import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';

export default function DateSort({dataSort, onChange}) {
    return(<>
        <TextField
        id="outlined-select-currency"
        select
        label="Select"
        variant="outlined"
        value={dataSort}
        onChange={onChange}
        size="small"
      >
          <MenuItem key="1" value="ascending" size="small">Ascending</MenuItem>
          <MenuItem key="2" value="descending" size="small">Descending</MenuItem>
      </TextField> 
      </>
    );
};