import { createSlice } from '@reduxjs/toolkit';

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
        logOut: (state) =>  {
          sessionStorage.clear();
          state.authStatus = false;
        }
      }
  });

export const { toggleLoginForm, toggleAuthStatus, logOut  } = authSlice.actions;

export const selectLoginForm = state => state.auth.loginForm;
export const selectAuthStatus = state => state.auth.authStatus;

export default authSlice.reducer;