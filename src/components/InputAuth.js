import React from 'react';
import { useField } from 'formik';
import { Input, FormHelperText  } from '@material-ui/core';

export const InputAuth = ({ ...props }) => {
    const [field, meta] = useField(props);
    return(
        <>
        <Input fullWidth error={(meta.touched && meta.error) && true} {...field} {...props} />
            {(meta.touched && meta.error) 
                && <FormHelperText id="component-error-text">{meta.error}</FormHelperText>}
        </>
    )
};