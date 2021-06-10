import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {toggleLoginForm, selectLoginForm,  logOut, selectAuthStatus} from '../features/auth/authSlice';
import {selectLastName, selectFirstName, clearUserData} from '../features/user/userSlice';

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

export const NavBar = () => {
  const LoginForm = useSelector(selectLoginForm);
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const authStatus = useSelector(selectAuthStatus)
  const dispatch = useDispatch();

  const classes = useStyles();

  return(
    <div className={classes.root}>
      <AppBar position="static">
      <Toolbar>

        <Typography variant="h6" className={classes.title}>
        To do list
        </Typography>

        {authStatus && (
          <div><Typography variant="body2" >
          {`${firstName} ${lastName}`}
          </Typography>
          <Button color="inherit" onClick={() => dispatch(logOut())}>Log Out</Button></div>
        )}
        {!authStatus && <Button color="inherit" onClick={() => {dispatch(toggleLoginForm()); dispatch(clearUserData()) } }>{LoginForm ? 'Sign up' : 'Login'}</Button>}
      </Toolbar>
    </AppBar>
    </div>

  )
};
