import React, {  useState, useEffect, useMemo } from 'react';

import { Container, Grid, Typography, List, CircularProgress, SnackbarContent  } from '@material-ui/core';
import CreateToDo  from './components/CreateToDo';
import { FilterPanel } from './container/FilterPanel';
import { ToDoListItem } from './components/ToDoListItem';
import { Pagination } from './components/Pagination';
import axios from 'axios';

const getURL = 'https://todo-api-learning.herokuapp.com/v1/tasks/6';
const postURL = 'https://todo-api-learning.herokuapp.com/v1/task/6';


 
function App() {
  
  const [toDoList, setToDoList] = useState([]);
  const [sortParam, setSortParam] = useState({ done: "all", date: "ascending" });
  const [pageCount, setPageCount] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [loadStatus, setLoadStatus] = useState({isLoading: false, error: null});










  // useEffect(() => {
  //   let doneParam;


  //   switch(sortParam.done) {
  //     case 'true': 
  //        doneParam = 'filterBy=done&';
  //     break;
  //     case 'false':
  //       doneParam = 'filterBy=undone&';
  //       break;
  //     default:
  //       doneParam = '';
  //       break;
  //   };

  //   axios.get(`${getURL}?${doneParam}order=${ sortParam.date === 'ascending' ? 'asc' : 'desc'}`)
  //   .then(res => {const pageCountN = res.data.length % itemPerPage 
  //     ? Math.floor(res.data.length / itemPerPage) 
  //     : res.data.length / itemPerPage;
  //     const activePageN = activePage <= pageCountN ? activePage : pageCountN;
  //     setActivePage(activePageN);
  //     setPageCount(pageCountN);
  //     const startItem = (activePageN - 1) * itemPerPage;
  //     const endItem = activePageN * itemPerPage;
  //     return {data : res.data, startItem : startItem, endItem : endItem}})
  //   .then(({data,  startItem, endItem}) => {setToDoList(data.slice(startItem, endItem));})
  //   .then(() => setLoadStatus(param => ({...param, isLoading: true})))
  //   .catch(err => setLoadStatus(param => ({...param, error : err})));
    
  //   console.log("memo");


  // }, [sortParam, itemPerPage, activePage]);






  const { getToDoList, getActivePage, getPageCount, isLoading } = useMemo(async () => {

    let doneParam;

    switch(sortParam.done) {
      case 'true': 
         doneParam = 'filterBy=done&';
      break;
      case 'false':
        doneParam = 'filterBy=undone&';
        break;
      default:
        doneParam = '';
        break;
    };



    const getToDoList = await axios.get(`${getURL}?${doneParam}order=${ sortParam.date === 'ascending' ? 'asc' : 'desc'}`).then(res => res.data);
    const countrer =   getToDoList.length % itemPerPage ? Math.floor(getToDoList.length / itemPerPage ) + 1 : getToDoList.length / itemPerPage;
    const activePageN = activePage <= countrer ? activePage : countrer;

    console.log(getToDoList);
    const toDoListSlice = await getToDoList.slice((activePageN - 1) * countrer, activePageN * countrer);

    console.log(toDoListSlice);


    const changeLoadStatus = async (toDoListSlice) => {
      if (!toDoListSlice) {
        setLoadStatus(param => ({...param, isLoading: true}));
        return true;
      }
      return false
    };

    const dadsaas = await changeLoadStatus(toDoListSlice)
    console.log(dadsaas);

    return {
      getToDoList: toDoListSlice,
      getActivePage : getActivePage,
      getPageCount : getPageCount, 
      isLoading : dadsaas

    }
  }, [sortParam, itemPerPage, activePage])




    const createNewToDo = (e) => {
      if(e.key === "Enter" && e.target.value.trim()) {
        axios.post(postURL, {name: e.target.value.trim(), done: false}).then(result => console.log(result)).catch(error => console.log(error));
      };
    };

    const changeDoneStatus = (e) => {

        axios.patch(`${postURL}/${e.target.value}`, {done: e.target.checked}).then(res => console.log(res)).catch(err => console.log(err));

      };


    const changeTask = (e) => {
      if (e.key === "Enter" && e.target.value.trim()) {

        axios.patch(`${postURL}/${e.target.name}`, {name : e.target.value}).then(res => console.log(res)).catch(err => console.log(err));
      } 
            
    }


    const deleteToDoItem = (e) => {
      axios.delete(`${postURL}/${e.currentTarget.value}`).then(res => console.log(res)).catch(err => console.log(err));
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
    }
    


  return (
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
        {loadStatus.isLoading && (pageCount > 1 && <Pagination onPageNow={clickOnPage} pageCount={pageCount} activePage={activePage}  />) }
      </Grid>

      <List>
{loadStatus.isLoading
        ?  (getToDoList.map(task => <ToDoListItem key={task.uuid} task={task} onCheck={changeDoneStatus} onDelete={deleteToDoItem} onChange={changeTask} />)) 
        : <CircularProgress />}
     {loadStatus.error &&  <SnackbarContent message={loadStatus.error.message} />}
      
      </List>

    
    
    </Container>


  );
}

export default App;