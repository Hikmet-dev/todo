import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';




export const  Pagination = ({onPageNow, pageCount, activePage}) =>  {

    const pageArr = new Array(pageCount).fill(1).map((e, i) => i + 1);

   

    return (
        <ButtonGroup variant="primary" color="primary" aria-label="contained primary button group">
            
            <Button onClick={onPageNow} value="1">First page</Button>
                {pageArr.map(page => <Button onClick={onPageNow} value={page} variant={ activePage === page &&  'contained'}>{page}</Button>)}
            <Button onClick={onPageNow} value={pageArr.length}>Last page</Button>
        </ButtonGroup>
    )
}