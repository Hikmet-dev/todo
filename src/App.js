import React, {  useLayoutEffect, useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import * as jwt from 'jsonwebtoken';
import { instanceHeroku } from './instanceAxios'; 
import { Container, Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ToDoList } from './container/ToDoList';
import { Auth } from './container/Auth';
import { NavBar } from './components/NavBar';
import { selectAuthStatus, toggleAuthStatus } from './features/auth/authSlice';
import { selectIsLoading } from './features/user/userSlice';
import {createError, selectErrorStatus, selectErrorStatusCode, selectErrorMesage} from './features/error/errorSlice';

function App() {
  const [open, setOpen] = useState(false);
  const authStatus = useSelector(selectAuthStatus);
  const isLoading = useSelector(selectIsLoading);
  const errorStatus = useSelector(selectErrorStatus);
  const errorStatusCode = useSelector(selectErrorStatusCode);
  const errorMessage = useSelector(selectErrorMesage);
  const dispatch = useDispatch();
  
  instanceHeroku.interceptors.response.use(undefined, (error) =>  {
    if( [422, 404, 400].includes(error.response?.status) ) {
      dispatch(createError(error.response.data));
      setOpen(true);
    }
    return Promise.reject(error);
  });

  useLayoutEffect(() => {
    if(sessionStorage.getItem('token')) {
      const exp = jwt.decode(sessionStorage.getItem('token').split(' ')[1])?.exp
      instanceHeroku.defaults.headers = {'Authorization': sessionStorage.getItem('token')}
      if(Date.now() > exp) dispatch(toggleAuthStatus(true))
    }
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };
  return (
    <Container>
      <NavBar />
      {(authStatus && isLoading) && <ToDoList />}
      {!(authStatus && isLoading) && <Auth />}
      {errorStatus && (<Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                              <Alert severity="error" onClose={handleClose} > 
                              <AlertTitle>{`Error ${errorStatusCode}`}</AlertTitle>
                              {errorMessage} 
                              </Alert>
                            </Snackbar>)}       
    </Container>
  );
};

export default App;