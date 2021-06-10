import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoginForm } from '../features/auth/authSlice';
import { LogIn } from '../components/LogIn';
import { SignUp } from '../components/SignUp';
import { Grid } from '@material-ui/core';
import axios from 'axios';


export const instanceAuth = axios.create({
    baseURL: process.env.REACT_APP_LINK
})


export const Auth = () => {
  const loginForm = useSelector(selectLoginForm);

const signUpSubmit = async (values) => {
    try {
      await instanceAuth.post('signup', values);
    } catch(error) {
      console.log(error.response.data);
    }
  };
    return(
        <Grid container spacing={10} justify="center"   alignItems="center" >
        <Grid item xs={5} >  
        {loginForm ? <LogIn /> : <SignUp signUpSubmit={signUpSubmit} />}
        </Grid>
    </Grid>
    )
};