import React, {  useState, useMemo } from 'react';

import { Container, Grid, Typography, List, CircularProgress  } from '@material-ui/core';
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
  const [activePage, setActivePage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [loadStatus, setLoadStatus] = useState({isLoading: true, error: null});




  const clickOnPage = (e) => {
    setActivePage(Number(e.currentTarget.value));

  };

  const changeItemPerPageFilter = (e) => {
      setItemPerPage(e.target.value)

  };




  const {activePageNow} = useMemo(() => {


      axios.get(`${getURL}?order=${ sortParam.date === 'ascending' ? 'asc' : 'desc'}`).then(res => {setToDoList(res.data); setLoadStatus(param => ({...param, isLoading: true}))}).catch(err => setLoadStatus(param => ({...param, error : err})));
    

    

    let newArr;
    switch (sortParam.done) {
      case 'all':
        newArr = [...toDoList];
        break;
      default:
        newArr = [...toDoList].filter(item => item.done.toString() === sortParam.done);
        break
    };
    const pageCount = newArr.length % itemPerPage ? Math.floor(newArr.length / itemPerPage) + 1 : newArr.length / itemPerPage
    setPageCount(pageCount);

    const startItem = (activePage - 1) * itemPerPage;
    const endItem = activePage * itemPerPage;
    const newArwe = newArr.slice(startItem, endItem).sort((a, b) =>  sortParam.date ===  "ascending" ? b.id - a.id : a.id - b.id);
    
    
    return    {
      sortListToDo : newArwe,
      activePageNow : activePage < pageCount ? activePage : pageCount,
    }             
    
    

  }, [toDoList, activePage, itemPerPage, sortParam])




    const createNewToDo = (e) => {
      if(e.key === "Enter" && e.target.value) {
        setToDoList(prev => [{id: Date.now(),  task: e.target.value.trim(), date: new Date(Date.now()).toLocaleString(), done: false }, ...prev]);
        axios.post(postURL, {name: e.target.value.trim(), done: false}).then(result => console.log(result)).catch(error => console.log(error));
      };
    };

    const changeDoneStatus = (e) => {
        // const taskId = toDoList.findIndex(item => item.id.toString() === e.target.value); 
        // const newtaskList = [...toDoList];
        // newtaskList[taskId].done = e.target.checked;
        // setToDoList(newtaskList);

        axios.patch(`${postURL}/${e.target.value}`, {done: e.target.checked}).then(res => console.log(res)).catch(err => console.log(err));

      };


    const changeTask = (e) => {
      if (e.key === "Enter" && e.target.value.trim()) {
        // const taskId = toDoList.findIndex(item => item.id.toString() === e.target.name); 
        // const newtaskList = [...toDoList];
        // newtaskList[taskId].task = e.target.value;
        // setToDoList(newtaskList);

        axios.patch(`${postURL}/${e.target.name}`, {name : e.target.value}).then(res => console.log(res)).catch(err => console.log(err));
      } 
            
    }


    const deleteToDoItem = (e) => {
      // const taskId = toDoList.findIndex(item => item.id.toString() === e.currentTarget.value);
      // const newArr = toDoList.filter((item, index) => index !== taskId);
      // setToDoList(newArr);

      axios.delete(`${postURL}/${e.currentTarget.value}`).then(res => console.log(res)).catch(err => console.log(err));
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
      {pageCount > 1 && <Pagination onPageNow={clickOnPage} pageCount={pageCount} activePage={activePageNow}  /> }
      </Grid>

      <List>
{loadStatus.isLoading 
        ?  (toDoList.map(task => <ToDoListItem key={task.uuid} task={task} onCheck={changeDoneStatus} onDelete={deleteToDoItem} onChange={changeTask} />)) 
        : <CircularProgress />}
     
      
      </List>

    
    
    </Container>


  );
}

export default App;