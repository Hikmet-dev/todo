import React, {  useEffect, useState } from 'react';
import { Container, Snackbar} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ToDoList } from './container/ToDoList';
import axios from 'axios';
import { Auth } from './container/Auth';
import { NavBar } from './components/NavBar';
import * as jwt from 'jsonwebtoken';

function App() {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [logIn, setLogIn] = useState(true);
  const [user, setUser] = useState();
  const [auth, setAuth] = useState(false);

  axios.interceptors.response.use(undefined, (error) =>  {
    if( [422, 404, 400].includes(error.response?.status) ) {
      setError(error)
      setOpen(true);
      console.log("erroer");
    }
    return Promise.reject(error);
  });

  useEffect(() => {

    if(sessionStorage.getItem('token')) {
      const exp = jwt.decode(sessionStorage.getItem('token').split(' ')[1])?.exp
      axios.defaults.headers = {'Authorization': sessionStorage.getItem('token')}
      Date.now() > exp ? setAuth(true) : setAuth(false);
    }

    if(user){
      setAuth(true);
      sessionStorage.setItem('token', user.token)
      sessionStorage.setItem('firstName', user.firstName);
      sessionStorage.setItem('lastName', user.lastName)
    }
  }, [user]);


  const logout = () => {
    setUser(undefined);
    setAuth(false);
    sessionStorage.clear();

  };
  const getDataUser = (authData) => {
    setUser(authData)
  };
  const handleLog = (e) => {
    setLogIn(!logIn)
};
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Container>
      <NavBar handleLog={handleLog} logIn={logIn} user={user} logout={logout} />
      {auth && <ToDoList token={user?.token} />}
      {!auth && <Auth logIn={logIn} getDataUser={getDataUser} />}
      {error && (<Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                              <Alert severity="error" onClose={handleClose} > 
                              <AlertTitle>{error.name}</AlertTitle>
                              {error.message} 
                              </Alert>
                            </Snackbar>)}       
    </Container>
  );
};

export default App;