import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { ItemPerPageFilter } from '../components/ItemPerPageFilter';
import DoneSort from "../components/DoneSort";
import DateSort from "../components/DateSort";

export const FilterPanel = ({onChangeItemFilter, itemPerPage}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <DoneSort />
      </Grid>
      <Grid item xs={3} alignItems="center" container>
        <Typography variant="subtitle1">Sort by:</Typography>
        <DateSort />
      </Grid>
      <Grid item xs={3} alignItems="center" container>
        <Typography variant="subtitle1">Page count</Typography>
        <ItemPerPageFilter  onChangeItemFilter={onChangeItemFilter} itemPerPage={itemPerPage}/>
      </Grid>
    </Grid>
  );
}
