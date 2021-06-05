import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, Button, FormHelperText  } from '@material-ui/core';


export const SignUp = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(8, 'Must be 8 characters or more').required('Required')        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    });
    return(
        <form onSubmit={formik.handleSubmit}>
            <Input 
                placeholder="First name" 
                id="firstName" 
                {...formik.getFieldProps('firstName')}
                fullWidth
                error={(formik.touched.firstName && formik.errors.firstName) && true}
                />
                {(formik.touched.firstName && formik.errors.firstName) 
                    && <FormHelperText id="component-error-text">{formik.errors.firstName}</FormHelperText>}
            <Input 
                placeholder="Last name" 
                id="lastName" 
                {...formik.getFieldProps('lastName')}
                fullWidth
                error={(formik.touched.lastName && formik.errors.lastName)  && true}
                />
                {(formik.touched.lastName && formik.errors.lastName) 
                    && <FormHelperText id="component-error-text">{formik.errors.lastName}</FormHelperText>}
            <Input 
                placeholder="Email" 
                id="email" 
                {...formik.getFieldProps('email')}
                fullWidth
                error={(formik.touched.email && formik.errors.email)  && true}
                />
                {(formik.touched.email && formik.errors.email) 
                    && <FormHelperText id="component-error-text">{formik.errors.email}</FormHelperText>}
            <Input 
                placeholder="Password" 
                id="password" 
                {...formik.getFieldProps('password')}
                fullWidth
                error={(formik.touched.password && formik.errors.password)  && true} 
            />
                {(formik.touched.password && formik.errors.password) 
                    && <FormHelperText id="component-error-text">{formik.errors.password}</FormHelperText>}
            <Button 
                variant="contained" 
                color="secondary" 
                type="submit"
                fullWidth
                >Sign up</Button>
        </form>
    );
};