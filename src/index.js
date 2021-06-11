import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './features/store';
import { Provider } from 'react-redux';
import {instanceHeroku} from './instanceAxios';
import {createError } from './features/error/errorSlice';
import {logOut} from './features/auth/authSlice';


instanceHeroku.interceptors.request.use(request => {
  return request;
}, error =>{
  return Promise.reject(error);
});

instanceHeroku.interceptors.response.use(undefined, (error) =>  {
  if([422, 404, 400].includes(error.response?.status)){
    store.dispatch(createError(error.response.data));
    if(error.response.data.message === 'Invalid token') store.dispatch(logOut());
    console.log(`interceptors:`, error.response.data);
  } 
  return Promise.reject(error);
});



ReactDOM.render(
<Provider store={store}>
<App />
</Provider>,
  document.getElementById('root')
);
reportWebVitals();
