import React from "react";
import { Grid, Typography } from "@material-ui/core";
import DoneSort from "../components/DoneSort";
import DateSort from "../components/DateSort";
import { ItemPerPageFilter } from '../components/ItemPerPageFilter';

export const FilterPanel = ({onChange, sortParam, doneSort, onChangeItemFilter, itemPerPage}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <DoneSort onChange={doneSort} doneSort={sortParam.done} />
      </Grid>
      <Grid item xs={3} alignItems="center" container>
        <Typography variant="subtitle1">Sort by:</Typography>
        <DateSort onChange={onChange} dataSort={sortParam.date} />
      </Grid>
      <Grid item xs={3} alignItems="center" container>
        <Typography variant="subtitle1">Page count</Typography>
        <ItemPerPageFilter  onChangeItemFilter={onChangeItemFilter} itemPerPage={itemPerPage}/>
      </Grid>
    </Grid>
  );
}
