import React, {  useLayoutEffect } from 'react';
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
import { closeError, selectErrorStatus, selectErrorStatusCode, selectErrorMesage, } from './features/error/errorSlice';

function App() {
  const authStatus = useSelector(selectAuthStatus);
  const isLoading = useSelector(selectIsLoading);
  const errorStatus = useSelector(selectErrorStatus);
  const errorStatusCode = useSelector(selectErrorStatusCode);
  const errorMessage = useSelector(selectErrorMesage);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if(sessionStorage.getItem('token')) {
      const exp = jwt.decode(sessionStorage.getItem('token').split(' ')[1])?.exp
      instanceHeroku.defaults.headers = {'Authorization': sessionStorage.getItem('token')}
      if(Date.now() > exp) dispatch(toggleAuthStatus(true))
    }
  });

  return (
    <Container>
      <NavBar />
      {(authStatus && isLoading) && <ToDoList />}
      {!(authStatus && isLoading) && <Auth />}
      <Snackbar
        open={errorStatus}
        autoHideDuration={6000} 
        onClose={(event, reason)=> dispatch(closeError(reason))}>
          <Alert
            severity="error" 
            onClose={(event, reason)=> dispatch(closeError(reason))}> 
            <AlertTitle>{`Error ${errorStatusCode}`}</AlertTitle>
            {errorMessage} 
          </Alert>
        </Snackbar>     
    </Container>
  );
};

export default App;