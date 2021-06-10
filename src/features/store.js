import { configureStore } from '@reduxjs/toolkit';
import  authReducer  from './auth/authSlice';
import filterSlice from './filter/filterSlice';
import userSlice from './user/userSlice';
import errorSlice from './error/errorSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        filter: filterSlice,
        user: userSlice,
        error: errorSlice
    },
  });