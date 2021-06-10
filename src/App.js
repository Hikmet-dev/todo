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


function App() {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const authStatus = useSelector(selectAuthStatus);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  
  instanceHeroku.interceptors.response.use(undefined, (error) =>  {
    if( [422, 404, 400].includes(error.response?.status) ) {
      setError(error.response.data)
      setOpen(true);
      console.log(error.response.data);
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
      {error && (<Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                              <Alert severity="error" onClose={handleClose} > 
                              <AlertTitle>{`Error ${error.statusCode}`}</AlertTitle>
                              {error.message} 
                              </Alert>
                            </Snackbar>)}       
    </Container>
  );
};

export default App;