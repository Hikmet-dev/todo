import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {toggleLoginForm, selectLoginForm } from '../features/auth/authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const NavBar = ({ logout}) => {
  const LoginForm = useSelector(selectLoginForm);
  const dispatch = useDispatch();

  const classes = useStyles();

  return(
    <div className={classes.root}>
      <AppBar position="static">
      <Toolbar>

        <Typography variant="h6" className={classes.title}>
        To do list
        </Typography>

        {sessionStorage.getItem('firstName') && (
          <div><Typography variant="body2" >
          {`${sessionStorage.getItem('firstName')} ${sessionStorage.getItem('lastName')}`}
          </Typography>
          <Button color="inherit" onClick={logout}>Log Out</Button></div>
        )}
        {!sessionStorage.getItem('firstName') && <Button color="inherit" onClick={() =>dispatch(toggleLoginForm())}>{LoginForm ? 'Sign up' : 'Login'}</Button>}
      </Toolbar>
    </AppBar>
    </div>

  )
};
