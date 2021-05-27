import React, {  useState, useEffect, useCallback} from  'react';

import { Container, Grid, Typography, List, CircularProgress} from '@material-ui/core';

import { CreateToDo }  from '../components/CreateToDo';
import { Pagination } from '../components/Pagination';
import { ToDoListItem } from '../components/ToDoListItem';
import { FilterPanel } from './FilterPanel';


import axios from 'axios';
const getURL = 'https://todo-api-learning.herokuapp.com/v1/tasks/6';
const postURL = 'https://todo-api-learning.herokuapp.com/v1/task/6';



export const ToDoList = () => {

    const [toDoList, setToDoList] = useState([]);
    const [sortParam, setSortParam] = useState({ done: "", date: "ascending" });
    const [pageCount, setPageCount] = useState(1);
    const [activePage, setActivePage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(false)




    const getToDoList =  useCallback( async () => {
      

        const filterOptions = { 'true': 'done', 'false': 'undone' };

        const { data } = await axios.get(getURL, { 
          params : { 
            filterBy: filterOptions[sortParam.done] ?? '', 
            order : sortParam.date === 'ascending' ? 'asc' : 'desc'   
          }
        });
        
        const paginator =  (data, activePage, itemPerPage) => {
          const paginCount =  data.length % itemPerPage
          ? (Math.floor(data.length / itemPerPage) + 1) 
          : (data.length / itemPerPage);
          
          const activePagin =  activePage <= paginCount ? activePage : paginCount;
          const sliceStart =  (activePagin - 1) * itemPerPage;
          const sliceEnd =  activePagin * itemPerPage;
          
          return {
            paginCount: paginCount,
            activePagin : activePagin,
            sliceStart : sliceStart,
            sliceEnd : sliceEnd
          }
        };
        
        const {paginCount, activePagin, sliceStart, sliceEnd} = paginator(data, activePage, itemPerPage);
        
    setActivePage(activePagin);
    setPageCount(paginCount);
    
    const todolister = await data.slice(sliceStart, sliceEnd);
    setToDoList(todolister)
    
    await setIsLoading(true);


  }, [activePage, itemPerPage, sortParam]);
  
  
  useEffect(() => {
    
    getToDoList();
    
console.log('useEf');

  }, [getToDoList]);


  const createNewToDo = async (e) => {
    if(e.key === "Enter" && e.target.value.trim()) {
      await axios.post(postURL, {name: e.target.value.trim(), done: false});
      getToDoList();
    };
  };

  const changeDoneStatus = async (e) => {
    await axios.patch(`${postURL}/${e.target.value}`, {done: e.target.checked});
    getToDoList();
    };

  const changeTask = async (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      await axios.patch(`${postURL}/${e.target.name}`, {name : e.target.value});
      getToDoList();
    }; 
  };

  const deleteToDoItem = async (e) => {
    await axios.delete(`${postURL}/${e.currentTarget.value}`);
    getToDoList();
  };
  
  const clickOnPage = (e) => {
    setActivePage(Number(e.currentTarget.value));
  };

  const changeItemPerPageFilter = (e) => {
      setItemPerPage(e.target.value)
  };

  const taskSort = (e) => {
    setSortParam(param => ({...param, date: e.currentTarget.value}) );
  };

  const doneSort = (e) => {
    setSortParam(param => ({...param, done: e.currentTarget.value}) );
  };

    return(
        <Container maxWidth="md">
        <Typography variant="h1" component="h2" align="center">To do list</Typography>
            <Grid item pt={50}>
            <CreateToDo onKeyPress={createNewToDo} />
            </Grid>
            <FilterPanel 
                onChange={taskSort} 
                sortParam={sortParam} 
                doneSort={doneSort} 
                onChangeItemFilter={changeItemPerPageFilter}
                itemPerPage={itemPerPage} />
            <Grid item alignItems="center" container xs={12}>
                {isLoading && (pageCount > 1 && <Pagination onPageNow={clickOnPage} pageCount={pageCount} activePage={activePage}  />) }
            </Grid>

            <List>

        {isLoading
                ?  (toDoList.map(task => <ToDoListItem key={task.uuid} task={task} onCheck={changeDoneStatus} onDelete={deleteToDoItem} onChange={changeTask} />)) 
                :   <CircularProgress />}
            </List>
        </Container>
    );
};