import React from 'react';
import { LogIn } from '../components/LogIn';
import { SignUp } from '../components/SignUp';
import { Grid } from '@material-ui/core';
import axios from 'axios';

export const instanceAuth = axios.create({
    baseURL: process.env.REACT_APP_LINK
})


export const Auth = ({logIn, getDataUser}) => {
const logInSubmit = async (values) => {
    try{
        const loginReq = await instanceAuth.post('login', values);
        getDataUser(loginReq.data)
    } catch (error) {
        console.log(error);
    }
};

const signUpSubmit = async (values) => {
    try {
      await instanceAuth.post('signup', values);
      logInSubmit({email: values.email, password: values.password}); 
    } catch(error) {
      console.log(error.response.data);
    }
  };

    return(
        <Grid container spacing={10} justify="center"   alignItems="center" >
        <Grid item xs={5} >  
        {logIn ? <LogIn logInSubmit={logInSubmit}  /> : <SignUp signUpSubmit={signUpSubmit} />}
        </Grid>
    </Grid>
    )
};