import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { LogIn } from '../components/LogIn';
import { SignUp } from '../components/SignUp';
import { selectLoginForm } from '../features/auth/authSlice';

export const Auth = () => {
  const loginForm = useSelector(selectLoginForm);

    return(
        <Grid container spacing={10} justify="center"   alignItems="center" >
        <Grid item xs={5} >  
        {loginForm ? <LogIn /> : <SignUp/>}
        </Grid>
    </Grid>
    )
};