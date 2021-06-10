import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filterByButtons: [
        {name: 'all', value: undefined},
        {name: 'done', value: true},
        {name: 'undone', value: false}
    ],
    filterBy: undefined,
    orderValue: ['ASC', 'DESC'],
    order: 'DESC'
};

export const  filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        toggleOrder: (state, action) => {
            state.order = action.payload;
        },
        toggleFilterBy: (state, action) => {
            state.filterBy = action.payload;
        }
    }
});

export const {toggleOrder, toggleFilterBy} = filterSlice.actions;

export const selectOrderValue = state => state.filter.orderValue;
export const selectFilterBy = state => state.filter.filterBy;
export const selectOrder = state => state.filter.order.toUpperCase();
export const selectFilterByButtons = state => state.filter.filterByButtons;

export default filterSlice.reducer;