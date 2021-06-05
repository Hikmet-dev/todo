import React from 'react';
import { useFormik  } from 'formik';
import { Input, Grid, Button, FormHelperText  } from '@material-ui/core';

const validate = values => {
    const errors = {};
    if (!values.email) errors.email = 'Required';
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Invalid email address';
    if(!values.password) errors.password = 'Required';
    if (values.password.length < 7) errors.password = 'Must be 8 characters or more';
    return errors;
};


export const LogIn = () => {
        const formik = useFormik({
          initialValues: {
            email: '',
            password: ''
          },
          validate,
          onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
          },
        });
    return(
    <Grid container spacing={6} justify="center">
        <Grid item xs={6} >     
        <form onSubmit={formik.handleSubmit}>
            <Input 
                placeholder="Email" 
                id="email" 
                name="email"
                fullWidth
                error={(formik.touched.email && formik.errors.email)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
                value={formik.values.email} 
                />
                {(formik.touched.email && formik.errors.email) 
                    && <FormHelperText id="component-error-text">{formik.errors.email}</FormHelperText>}
            <Input 
                placeholder="Password" 
                id="password" 
                name="password"
                fullWidth
                error={(formik.touched.password && formik.errors.password)} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur} 
                value={formik.values.password} 
            />
                {(formik.touched.password && formik.errors.password) 
                    && <FormHelperText id="component-error-text">{formik.errors.password}</FormHelperText>}
            <Button 
                variant="contained" 
                color="secondary" 
                type="submit"
                >Log in</Button>
        </form>
      </Grid>
    </Grid>
    )
};