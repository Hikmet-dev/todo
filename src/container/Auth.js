import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoginForm, toggleAuthStatus } from '../features/auth/authSlice';
import { LogIn } from '../components/LogIn';
import { SignUp } from '../components/SignUp';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import {fetchUser} from '../features/user/userSlice';


export const instanceAuth = axios.create({
    baseURL: process.env.REACT_APP_LINK
})


export const Auth = () => {
  const loginForm = useSelector(selectLoginForm);
  const dispatch = useDispatch()

  const logInSubmit = (values) => {
        // const loginReq = await instanceAuth.post('login', values);
        // getDataUser(loginReq.data)
        dispatch(fetchUser(values));
        // dispatch(toggleAuthStatus(true))
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
        {loginForm ? <LogIn logInSubmit={logInSubmit}  /> : <SignUp signUpSubmit={signUpSubmit} />}
        </Grid>
    </Grid>
    )
};