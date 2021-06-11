import React from 'react';
import { AppBar, Toolbar, Button, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {toggleLoginForm, selectLoginForm,  logOut, selectAuthStatus} from '../features/auth/authSlice';
import {selectLastName, selectFirstName, clearUserData, selectIsLoading} from '../features/user/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'space-between'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const NavBar = () => {
  const LoginForm = useSelector(selectLoginForm);
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const authStatus = useSelector(selectAuthStatus)
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const classes = useStyles();

  return(
    <div className={classes.root}>
      
      <AppBar position="static">
      <Toolbar>
      <Grid container alignItems="center"   justify="space-between">
        <Grid item xs={3}>
        <Typography variant="h6" className={classes.title}>
        To do list
        </Typography>
        </Grid>
        {(authStatus && isLoading) && (<>
          <Grid item xs={8}>
          <Typography variant="body1" align='right'>
          {`${firstName} ${lastName}`}
          </Typography>
          </Grid>
          <Grid item xs={1}>
           <Button color="inherit" onClick={() => dispatch(logOut())}>Log Out</Button>
          </Grid>
         </>
        )}
        <Grid item xs={1}>
        {!(authStatus && isLoading) && <Button color="inherit" onClick={() => {dispatch(toggleLoginForm()); dispatch(clearUserData()) } }>{LoginForm ? 'Sign up' : 'Login'}</Button>}
        </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    </div>

  )
};
