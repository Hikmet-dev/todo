import React, {  useState, useEffect, useCallback} from 'react';

import { Container, Grid, Typography, List, CircularProgress, Snackbar} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
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
  const [open, setOpen] =useState(false)
  
  
  
  axios.interceptors.response.use(undefined, function aziosSatta(error) {
    if( error.response.status === 422 || error.response.status === 404 || error.response.status === 400 ) {
      // console.log('iter');
      setLoadStatus(param => ({...param, error : error}))
      setOpen(true);
    }
    return Promise.reject(error);
  });



   const getToDoList =  useCallback( async () => {
      
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
        
        const { data } = await axios.get(`${getURL}?${doneParam}order=${ sortParam.date === 'ascending' ? 'asc' : 'desc'}`);
        
        const paginator = async (data, activePage, itemPerPage) => {
          const paginCount = await data.length % itemPerPage
          ? (Math.floor(data.length / itemPerPage) + 1) 
          : (data.length / itemPerPage);
          
          const activePagin = await activePage <= paginCount ? activePage : paginCount;
          const sliceStart = await (activePagin - 1) * itemPerPage;
          const sliceEnd = await activePagin * itemPerPage;
          
          return {
            paginCount: paginCount,
            activePagin : activePagin,
            sliceStart : sliceStart,
            sliceEnd : sliceEnd
          }
        };
        
        const {paginCount, activePagin, sliceStart, sliceEnd} = await paginator(data, activePage, itemPerPage);
        
    setActivePage(activePagin);
    setPageCount(paginCount);
    
    const todolister = await data.slice(sliceStart, sliceEnd);
    setToDoList(todolister)
    
    await setLoadStatus(param => ({...param, isLoading: true}));
  }, [activePage, itemPerPage, sortParam]);
  
  
  useEffect(() => {
    
    getToDoList();
    
  }, [getToDoList, sortParam]);

 
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
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    


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
          ?  (toDoList.map(task => <ToDoListItem key={task.uuid} task={task} onCheck={changeDoneStatus} onDelete={deleteToDoItem} onChange={changeTask} />)) 
          :   <CircularProgress />}

  {loadStatus.error && (<Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                          <Alert severity="error" onClose={handleClose} > 
                          <AlertTitle>{loadStatus.error.name}</AlertTitle>
                          {loadStatus.error.message} 
                          </Alert>
                        </Snackbar>)}
         
      
      </List>
      
    
    
    </Container>


  );
};

export default App;