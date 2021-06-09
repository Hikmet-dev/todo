import { createSlice } from '@reduxjs/toolkit';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';



const initialState = {
    loginForm: true,
    authStatus: false
  };



  export const authSlice = createSlice({
      name:  'auth',
      initialState,
      reducers: {
        toggleLoginForm: (state) => {
            state.loginForm = !state.loginForm
        },
        toggleAuthStatus: (state, action) => {
            state.authStatus = action.payload;
        },
        checkTokenStatus: (state, action) => {
          const token = action.payload.split(' ')[1];
          const exp = jwt.decode(token)?.exp;
          if (Date.now() > exp) state.authStatus = true;
          axios.defaults.headers = {'Authorization': action.payload};
        },
        logOut: (state) =>  {
          console.log(state);
        }
      }
  });

export const { toggleLoginForm, toggleAuthStatus, checkTokenStatus, logOut  } = authSlice.actions;

export const selectLoginForm = state => state.auth.loginForm;
export const selectAuthStatus = state => state.auth.authStatus;
export default authSlice.reducer;


