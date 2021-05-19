import React from "react";
import { Grid } from "@material-ui/core";
import DoneSort from "../components/DoneSort";
import DateSort from "../components/DateSort";

export default function FilterPanel() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <DoneSort />
      </Grid>
      <Grid item xs={6}>
        <DateSort />
      </Grid>
    </Grid>
  );
}
