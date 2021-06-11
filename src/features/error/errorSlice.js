import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    errorStatus: false,
    statusCode: '',
    errorMesage: '',
    errorStack: {}
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        createError: (state, action) =>{
            state.statusCode = action.payload.statusCode;
            state.errorMesage = action.payload.message;
            state.errorStatus = true;
            console.log('createError');
        },
        closeError: (state, action) => {
            if(action.payload === 'clickaway') return;
            state.errorStatus = false;
            state.statusCode = state.errorMesage = '';
            state.errorStack = {};
        }
    }
});

export const { createError, closeError } = errorSlice.actions;

export const selectErrorStatus = state => state.error.errorStatus;
export const selectErrorStatusCode = state => state.error.statusCode;
export const selectErrorMesage = state => state.error.errorMesage;
export const selectErrorStack = state => state.error.errorStack;

export default errorSlice.reducer;