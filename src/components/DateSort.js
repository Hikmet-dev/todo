import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import {selectOrder, selectOrderValue, toggleOrder} from '../features/filter/filterSlice';

export default function DateSort() {
  const order = useSelector(selectOrder);
  const orderValue = useSelector(selectOrderValue);
  const dispatch = useDispatch();

    return(<>
    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
      {orderValue
          .map(item => 
          <Button 
            key={item}
            size="medium"
            variant={ order === item && "contained"}
            onClick={e => dispatch(toggleOrder(e.currentTarget.value))}
            value={item}
            >{item}</Button>)}
    </ButtonGroup>  
      </>
    );
};