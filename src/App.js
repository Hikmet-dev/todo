import React, {  useState, useMemo } from 'react';

import { Container, Grid, Typography, List } from '@material-ui/core';
import CreateToDo  from './components/CreateToDo';
import { FilterPanel } from './container/FilterPanel';
import { ToDoListItem } from './components/ToDoListItem';
import { Pagination } from './components/Pagination'



function App() {
  
  const [toDoList, setToDoList] = useState([]);
  const [sortParam, setSortParam] = useState({ done: "all", date: "ascending" });
  const [activePage, setActivePage] = useState(0);
  const [itemPerPage] = useState(5);
  const [itemPerPageNow, setItemPerPageNow] = useState({firs: 0, last: itemPerPage});




  const clickOnPage = (e) => {
    setActivePage(Number(e.currentTarget.value));
    const first = (Number(e.currentTarget.value) - 1) * itemPerPage;
    const last = Number(e.currentTarget.value) * itemPerPage;
    setItemPerPageNow({firs: first, last: last});

  };




  const sortListToDo = useMemo(() => {
    let newArr;
    switch (sortParam.done) {
      case 'all':
        newArr = toDoList;
        break;
      default:
        newArr = toDoList.filter(item => item.done.toString() === sortParam.done);
    };
    return newArr.sort((a, b) =>  sortParam.date ===  "ascending" ? b.id - a.id : a.id - b.id);
  }, [sortParam, toDoList])




    const createNewToDo = (e) => {
      if(e.key === "Enter" && e.target.value) {
        setToDoList(prev => [{id: Date.now(),  task: e.target.value.trim(), date: new Date(Date.now()).toLocaleString(), done: false }, ...prev]);
      };
    };

    const changeDoneStatus = (e) => {
        const taskId = toDoList.findIndex(item => item.id.toString() === e.target.value); 
        const newtaskList = [...toDoList];
        newtaskList[taskId].done = e.target.checked;
        setToDoList(newtaskList);
      };

      
    const changeTask = (e) => {
      if (e.key === "Enter" && e) {
        const taskId = toDoList.findIndex(item => item.id.toString() === e.target.name); 
        const newtaskList = [...toDoList];
        newtaskList[taskId].task = e.target.value;
        setToDoList(newtaskList);
      } 
            
    }


    const deleteToDoItem = (e) => {
      const taskId = toDoList.findIndex(item => item.id.toString() === e.currentTarget.value);
      const newArr = toDoList.filter((item, index) => index !== taskId);
      setToDoList(newArr);
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
      <Grid pt={50}>
      <CreateToDo onKeyPress={createNewToDo} />
      
      
      
      </Grid>
      <FilterPanel onChange={taskSort} sortParam={sortParam} doneSort={doneSort} />
      <List>

      {sortListToDo.slice(itemPerPageNow.firs, itemPerPageNow.last).map(task => <ToDoListItem task={task} onCheck={changeDoneStatus} onDelete={deleteToDoItem} onChange={changeTask} />)}
      
      </List>

    {sortListToDo.length >= itemPerPage && <Pagination onPageNow={clickOnPage} pageCount={sortListToDo.length % itemPerPage ? Math.floor(sortListToDo.length / itemPerPage + 1) : sortListToDo.length / itemPerPage } activePage={activePage}  /> }
    
    </Container>


  );
}

export default App;