import { configureStore } from '@reduxjs/toolkit';
import  authReducer  from './auth/authSlice';
import filterSlice from './filter/filterSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        filter: filterSlice
    },
  });