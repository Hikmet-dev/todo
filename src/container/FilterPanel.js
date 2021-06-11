import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { ItemPerPageFilter } from '../components/ItemPerPageFilter';
import { makeStyles } from '@material-ui/core/styles';
import DoneSort from "../components/DoneSort";
import DateSort from "../components/DateSort";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  paper: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    justifyContent: 'space-between'
  },
}));

export const FilterPanel = ({onChangeItemFilter, itemPerPage}) => {
  const classes = useStyles();

  return (
    <div className={classes.paper} >
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
    </div>

  );
}
