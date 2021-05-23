import React from 'react';
import { Select, MenuItem } from "@material-ui/core";



export const ItemPerPageFilter = ({onChangeItemFilter, itemPerPage}) => {
    return(
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={itemPerPage}
          onChange={onChangeItemFilter}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
    )
}