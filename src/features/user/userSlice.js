import {createAsyncThunk,  createSlice } from '@reduxjs/toolkit';
import {instanceHeroku} from '../../instanceAxios';

export const fetchUser =  createAsyncThunk(
    'user/fetchToken',
    async (userData, thunkAPI) => { 
        const res = await instanceHeroku.post(`login`, userData);
        return res.data
    }
);

export const userRegistration = createAsyncThunk(
    'user/registration',
    async (userData, thunkAPI) => {
        const res = await instanceHeroku.post(`signup`, userData);
        return res.data 
    });

const initialState = {
    firstName: sessionStorage.firstName || '',
    lastName: sessionStorage.lastName || '',
    token: sessionStorage.token || '',
    isLoading: true,
    hasError: false
}

const userSlice  = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserData: (state) => {
            state.firstName = state.lastName = state.token = '';
            state.isLoading = state.hasError = false;
        }
    },
    extraReducers: {
        [fetchUser.pending]: (state, action) => {
            state.isLoading = false
            state.hasError = false
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.token = action.payload.token;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            sessionStorage.setItem('token', state.token);
            sessionStorage.setItem('firstName', state.firstName);
            sessionStorage.setItem('lastName', state.lastName);
            state.isLoading = true;
            state.hasError = false;
        },
        [fetchUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [userRegistration.pending]: (state) => {
            state.isLoading = false
            state.hasError = false
        },
        [userRegistration.fulfilled]: (state, action) => {
            state.token = action.payload.token;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            sessionStorage.setItem('token', state.token);
            sessionStorage.setItem('firstName', state.firstName);
            sessionStorage.setItem('lastName', state.lastName);
            state.isLoading = true;
            state.hasError = false;
        },
        [userRegistration.rejected]: (state) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
});

export const { clearUserData } = userSlice.actions;

export const selectToken = state => state.user.token;
export const selectFirstName = state => state.user.firstName;
export const selectLastName = state => state.user.lastName;
export const selectIsLoading = state => state.user.isLoading;

export default userSlice.reducer;