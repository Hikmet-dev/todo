import React from 'react';
import { Formik } from 'formik';
import { Input, Grid, Button  } from '@material-ui/core';


export const LogIn = () => {


    return(
        <Grid container spacing={6} justify="center">
                    <Grid item xs={6} >
        <Formik 
            initialValues={{email: '', password: ''}}
            
        >




        </Formik>




        </Grid>
        </Grid>
    )
};