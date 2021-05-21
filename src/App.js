import React, {  useState, useMemo } from 'react';

import { Container, Grid, Typography, List } from '@material-ui/core';
import CreateToDo  from './components/CreateToDo';
import { FilterPanel } from './container/FilterPanel';
import { ToDoListItem } from './components/ToDoListItem';
import { Pagination } from './components/Pagination'


const falsy = /^(?:f(?:alse)?|no?|0+)$/i;
Boolean.parse = val => !falsy.test(val) && !!val;


function App() {
  
  const [toDoList, setToDoList] = useState([]);
  const [sortParam, setSortParam] = useState({ done: "all", date: "ascending" });



  



  const sortListToDo = useMemo(() => {

    let newArr;
    switch (sortParam.done) {
      case 'true' || 'false':
        newArr = toDoList.filter(item => item.done.toString() === sortParam.done);
        break;
      default:
        newArr = toDoList;
    };
    const newter = newArr.sort((a, b) =>  sortParam.date ===  "ascending" ? b.id - a.id : a.id - b.id);

    return newter

 
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
    <Container maxWidth="sm">
      <Typography variant="h1" component="h2" align="center">To do list</Typography>
      <Grid pt={50}>
      <CreateToDo onKeyPress={createNewToDo} />
      
      
      
      </Grid>
      <FilterPanel onChange={taskSort} sortParam={sortParam} doneSort={doneSort} />
      <List>

      {sortListToDo.slice(0, 5).map(task => <ToDoListItem task={task} onCheck={changeDoneStatus} onDelete={deleteToDoItem} onChange={changeTask} />)}
      
      </List>


    <Pagination />
    </Container>


  );
}

export default App;