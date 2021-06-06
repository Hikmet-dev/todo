import React from 'react';
import { Formik, Form  } from 'formik';
import * as Yup from 'yup';
import { Button  } from '@material-ui/core';
import { InputAuth } from './InputAuth';

export const LogIn = () => {
    return(
        <Formik 
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string().min(8, 'Must be 8 characters or more').required('Required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                }, 400);
            }}>
            <Form>
            <InputAuth name="email" placeholder="Email"   />
            <InputAuth name="password" placeholder="Password"   />
            <Button 
                variant="contained" 
                color="secondary" 
                type="submit"
                fullWidth
                >Log in</Button>
            </Form>
        </Formik>
    )
};