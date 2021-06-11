import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {selectFilterByButtons, selectFilterBy, changeFilterBy } from '../features/filter/filterSlice';


export default function DoneSort() {
    const filterByButtons = useSelector(selectFilterByButtons);
    const filterBy = useSelector(selectFilterBy);
    const dispatch = useDispatch();
    return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
    {filterByButtons
        .map(button => 
        <Button 
            key={button}
            size="medium"
            variant={ filterBy === button && "contained"}
            onClick={e => dispatch(changeFilterBy(e.currentTarget.value))}
            value={button}
            >{button}</Button> )}
    </ButtonGroup>
    )
}
