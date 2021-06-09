import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {selectFilterByButtons, selectFilterBy, toggleFilterBy } from '../features/filter/filterSlice';


export default function DoneSort() {
    const filterByButtons = useSelector(selectFilterByButtons);
    const filterBy = useSelector(selectFilterBy);
    const dispatch = useDispatch();
    return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
    {filterByButtons.map(button => <Button key={button.name} variant={ filterBy === button.value && "contained"} onClick={e => dispatch(toggleFilterBy(e.currentTarget.value))}  value={button.value}>{button.name}</Button> )}
    </ButtonGroup>
    )
}
