import React, { useState } from 'react';
import { LogIn } from '../components/LogIn';
import { SignUp } from '../components/SignUp';
import { Grid, Button } from '@material-ui/core';


export const Auth = () => {
const [logIn, setLogIn] = useState(true);

const handleLog = (e) => {
    setLogIn(!logIn)
}
    return(
        <Grid container justify="center"   alignItems="center" >
        <Grid item>  
        {logIn ? <LogIn /> : <SignUp />}
        <Button color="primary" onClick={handleLog} fullWidth>{logIn ? 'Sign up' : 'Log in'}</Button>
        </Grid>
    </Grid>
    )
};