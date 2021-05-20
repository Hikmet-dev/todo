import React from "react";
import { Grid, Typography } from "@material-ui/core";
import DoneSort from "../components/DoneSort";
import DateSort from "../components/DateSort";

export const FilterPanel = ({onChange, sortParam, doneSort}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <DoneSort onChange={doneSort} />
      </Grid>
      <Grid item xs={6} alignItems="center" container>
        <Typography variant="subtitle1" gutterBottom>Sort by date</Typography>
        <DateSort onChange={onChange} dataSort={sortParam.date} />
      </Grid>
    </Grid>
  );
}
