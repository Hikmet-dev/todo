import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Grid } from '@material-ui/core';
import { InputAuth } from './InputAuth';
import {useDispatch } from 'react-redux';
import { userRegistration } from '../features/user/userSlice';
import { toggleAuthStatus } from '../features/auth/authSlice';

export const SignUp = () => {
  const dispatch = useDispatch();
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
              dispatch(userRegistration(values));
              dispatch(toggleAuthStatus(true))
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