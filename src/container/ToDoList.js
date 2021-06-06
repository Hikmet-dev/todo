import React, {  useState, useEffect, useCallback} from  'react';
import { Container, Grid, List, CircularProgress} from '@material-ui/core';
import { CreateToDo }  from '../components/CreateToDo';
import { Pagination } from '../components/Pagination';
import { ToDoListItem } from '../components/ToDoListItem';
import { FilterPanel } from './FilterPanel';
import axios from 'axios';
const instanceToDo = axios.create({
    baseURL: "https://data-multi-user.herokuapp.com/",
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
})
 
export const ToDoList = () => {
  const [toDoList, setToDoList] = useState([]);
  const [sortParam, setSortParam] = useState({ done: "", date: "desc" });
  const [pageCount, setPageCount] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false)

  const getToDoList =  useCallback( async () => {
    try{
      const  {data: {pageCount, tasks}}  = await instanceToDo.get('/tasks', {
        params: {
          filterBy: sortParam.done,
          order: sortParam.date,
          page: activePage,
          taskCount: itemPerPage
        }
      });
      setPageCount(pageCount);
      setToDoList(tasks)
      await setIsLoading(true);
    } catch(error) {
      console.log(error.message);
    }


}, [sortParam, activePage, itemPerPage]);
  
  useEffect(() => {getToDoList()}, [getToDoList]);

  const createNewToDo = async (e) => {
    try{
      if(e.key === "Enter" && e.target.value.trim()) {
        await instanceToDo.post('/task', {name: e.target.value.trim(), done: false});
        getToDoList();
      };
    } catch(error) {
      console.log(error);
    }
  };

  const changeTask = async (e) => {
    try{
      if (e.key === "Enter" && e.target.value.trim()) {
        await instanceToDo.patch(`/task/${e.target.name}`, {name : e.target.value});
        getToDoList();
      }; 
    } catch(error) {
      console.log(error);
    }
  };

  const changeDoneStatus = async (e) => {
    try{
      await instanceToDo.patch(`/task/${e.target.value}`, {done: e.target.checked});
      getToDoList();
    } catch(error) {
      console.log(error);
    }
  };

  const deleteToDoItem = async (e) => {
    try {
      await instanceToDo.delete(`/task/${e.currentTarget.value}`);
      getToDoList();
    } catch(error) {
      console.log(error);
    }
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
    setSortParam(param => ({...param, done: e.currentTarget.value}));
    setActivePage(1);
  };

  return(
      <Container maxWidth="md">
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
              ?  (toDoList.map(task => <ToDoListItem key={task.id} task={task} onCheck={changeDoneStatus} onDelete={deleteToDoItem} onChange={changeTask} />)) 
              :   <CircularProgress />}
          </List>
      </Container>
  );
};