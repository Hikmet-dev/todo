import React, {  useState, useEffect, useCallback} from  'react';
import { useSelector } from 'react-redux';
import { Container, Grid, List, CircularProgress} from '@material-ui/core';
import { instanceHeroku } from '../instanceAxios';
import { CreateToDo }  from '../components/CreateToDo';
import { Pagination } from '../components/Pagination';
import { ToDoListItem } from '../components/ToDoListItem';
import { FilterPanel } from './FilterPanel';
import {selectOrder, selectFilterBy} from '../features/filter/filterSlice';
import {selectToken } from '../features/user/userSlice';


export const ToDoList = () => {
  const [toDoList, setToDoList] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const order = useSelector(selectOrder);
  const token = useSelector(selectToken)
  const filterBy = useSelector(selectFilterBy);

  const getToDoList =  useCallback( async () => {
      if(sessionStorage.token) {
        const  {data: {pageCount, tasks}}  = await instanceHeroku.get('/tasks', {
          params: {
            filterBy: filterBy,
            order: order,
            page: activePage,
            taskCount: itemPerPage
          },
          headers: {
            'Authorization': token 
          }
        });
        setPageCount(pageCount);
        setToDoList(tasks)
      }
      if(!sessionStorage.token) {
        setPageCount(1);
        setToDoList([])
      }
      
      await setIsLoading(true);

}, [order, filterBy, token, activePage, itemPerPage]);
  
  useEffect((token) => {getToDoList(token)}, [getToDoList]);

  const createNewToDo = async (e) => {
      if(e.key === "Enter" && e.target.value.trim()) {
        await instanceHeroku.post('/task', {name: e.target.value.trim(), done: false}, {headers: {
          'Authorization': token 
        }});
        getToDoList();
      };
  };

  const changeTask = async (e) => {

      if (e.key === "Enter" && e.target.value.trim()) {
        await instanceHeroku.patch(`/task/${e.target.name}`, {name : e.target.value});
        getToDoList();
      }; 
  };

  const changeDoneStatus = async (e) => {
      await instanceHeroku.patch(`/task/${e.target.value}`, {done: e.target.checked});
      getToDoList();
  };

  const deleteToDoItem = async (e) => {
      await instanceHeroku.delete(`/task/${e.currentTarget.value}`);
      getToDoList();

  };
  
  const clickOnPage = (e) => {
    setActivePage(Number(e.currentTarget.value));
  };

  const changeItemPerPageFilter = (e) => {
      setItemPerPage(e.target.value)
  };


  return(
      <Container maxWidth="md">
          <Grid item pt={50}>
          <CreateToDo onKeyPress={createNewToDo} />
          </Grid>
          <FilterPanel  
              onChangeItemFilter={changeItemPerPageFilter}
              itemPerPage={itemPerPage} />
          <Grid item alignItems="center" container xs={12}>
              {isLoading && (pageCount > 1 && <Pagination onPageNow={clickOnPage} pageCount={pageCount} activePage={activePage}  />) }
          </Grid>
          <List>
      {isLoading
              ?  (toDoList.map(task => <ToDoListItem key={task.id} task={task} onCheck={changeDoneStatus} onDelete={deleteToDoItem} onChange={changeTask} />)) 
              :   <CircularProgress />}
          </List>
      </Container>
  );
};