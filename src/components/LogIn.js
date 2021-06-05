import React from 'react';
import { useFormik  } from 'formik';
import * as Yup from 'yup';
import { Input, Button, FormHelperText  } from '@material-ui/core';

export const LogIn = () => {
        const formik = useFormik({
          initialValues: {
            email: '',
            password: ''
          },
          validationSchema: Yup.object({
              email: Yup.string().email('Invalid email address').required('Required'),
              password: Yup.string().min(8, 'Must be 8 characters or more').required('Required')
          }) ,
          onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
          },
        });
    return(
        <form onSubmit={formik.handleSubmit}>
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
                >Log in</Button>
        </form>
    )
};