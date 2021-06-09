import {createAsyncThunk,  createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchUser =  createAsyncThunk(
    'user/fetchToken',
    async (userData, thunkAPI) => {
        const res = await axios.post(`${process.env.REACT_APP_LINK}login`, userData);
        return res.data
    }
);

const initialState = {
    firstName: sessionStorage.firstName || '',
    lastName: sessionStorage.lastName || '',
    token: sessionStorage.token || '',
    isLoading: false,
    hasError: false
}

const userSlice  = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [fetchUser.pending]: (state, action) => {
            state.isLoading = true
            state.hasError = false
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
            state.token = action.payload.token;
            sessionStorage.setItem('token', state.token);
            state.firstName = action.payload.firstName;
            sessionStorage.setItem('firstName', state.firstName);
            state.lastName = action.payload.lastName;
            sessionStorage.setItem('lastName', state.lastName)

        },
        [fetchUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
});




export const selectToken = state => state.user.token;
export const selectFirstName = state => state.user.firstName;
export const selectLastName = state => state.user.lastName;

export default userSlice.reducer;