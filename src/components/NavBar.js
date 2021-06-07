import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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


export const NavBar = ({handleLog, logIn, user, logout}) => {


  const classes = useStyles();
    return(
      <div className={classes.root}>
        <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" className={classes.title}>
          To do list
          </Typography>

          {user && (
            <div><Typography variant="body2" >
            {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Button color="inherit" onClick={logout}>Log Out</Button></div>
          )}
          {!user && <Button color="inherit" onClick={handleLog}>{logIn ? 'Sign up' : 'Login'}</Button>}
        </Toolbar>
      </AppBar>
      </div>

    )
};
