import React, {  useState } from 'react';
import { Container, Snackbar} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ToDoList } from './container/ToDoList';
import axios from 'axios';
import { LogIn } from './components/LogIn';

function App() {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [auth] = useState(false);
  axios.interceptors.response.use(undefined, (error) =>  {
    if( [422, 404, 400].includes(error.response?.status) ) {
      setError(error)
      setOpen(true);
      console.log("erroer");
    }
    return Promise.reject(error);
  });
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') return;
      setOpen(false);
    };
  return (
    <Container>
      {auth && <ToDoList />}
      {!auth && <LogIn />}
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