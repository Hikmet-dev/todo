import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Grid } from '@material-ui/core';
import { InputAuth } from './InputAuth';


export const SignUp = ({signUpSubmit}) => {
    return(
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            }}
            validationSchema={Yup.object({
                firstName: Yup.string().required('Required'),
                lastName: Yup.string().required('Required'),
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string().min(8, 'Must be 8 characters or more').required('Required')})
            }
            onSubmit={(values, { setSubmitting }) => {
              signUpSubmit(values);
              setSubmitting(false);
              }}>
            <Form>
              <InputAuth name="firstName" label="First name" />
              <InputAuth name="lastName" label="Last name" />
              <InputAuth name="email" label="Email" />
              <InputAuth name="password" label="Password"  type="password" autoComplete="current-password" />
              <Grid item >
              <Button 
                variant="contained" 
                color="primary"
                type="submit"
                fullWidth 
                >Sign up</Button>
              </Grid>

            </Form>
        </Formik>
    );
};