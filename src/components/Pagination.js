import Reac from 'react';
import { ButtonGroup, Button } from '@material-ui/core';




export const  Pagination = ({onPageNow, pageCount, activePage}) =>  {

    const page = (e) => {
        let arr = [];
        for (let i = 1; i <= pageCount; i++){
            arr.push(i);
        }
        return arr;
    }
   

    return (
        <ButtonGroup variant="primary" color="primary" aria-label="contained primary button group">
            
            <Button onClick={onPageNow} value="1">First page</Button>
                {page(pageCount).map(page => <Button onClick={onPageNow} value={page} variant={ activePage === page &&  'contained'}>{page}</Button>)}
            <Button onClick={onPageNow} value={page(pageCount).length}>Last page</Button>
        </ButtonGroup>
    )
}