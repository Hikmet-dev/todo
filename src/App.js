import React, { useEffect, useState } from 'react';

import { Container, Grid, Typography, List } from '@material-ui/core';
import CreateToDo  from './components/CreateToDo';
import { FilterPanel } from './container/FilterPanel';
import { ToDoListItem } from './components/ToDoListItem';

const falsy = /^(?:f(?:alse)?|no?|0+)$/i;
Boolean.parse = val => !falsy.test(val) && !!val;


function App() {
  
  const [toDoList, setToDoList] = useState([]);
  const [sortParam, setSortParam] = useState({ done: "all", date: "descending" });
  const [sortListItem, setSortListItem] = useState([]);



  useEffect(() => {
    if (sortParam.done !== "all") {
      const newArr = toDoList.filter(item => item.done === Boolean.parse(sortParam.done))
                              .sort((a, b) =>  sortParam.date ===  "descending" ? b.id - a.id : a.id - b.id);
      setSortListItem(newArr);
    } else {
      const newArr = toDoList.sort((a, b) =>  sortParam.date ===  "descending" ? b.id - a.id : a.id - b.id);;
      setSortListItem(newArr);
    }

  }, [sortParam, toDoList]);


    const createNewToDo = (e) => {
      if(e.key === "Enter" && e.target.value) {
        setToDoList(prev => [{id: Date.now(),  task: e.target.value.trim(), date: new Date(Date.now()).toLocaleString(), done: false }, ...prev]);
      };
    };

    const changeDoneStatus = (e) => {
        const taskId = toDoList.findIndex(item => item.id.toString() === e.target.value); 
        const newArr = [...(toDoList.filter((item, index) => index !== taskId)), {...toDoList[taskId], done: !toDoList[taskId].done }];
        setToDoList(newArr);
      };
    const changeTask = (e) => {
      if (e.key === "Enter" && e) {
        console.log(e.target.value);
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
 
      
      {sortListItem.map(task => <ToDoListItem key={task.id} task={task} onCheck={changeDoneStatus} onDelete={deleteToDoItem} onChange={changeTask} />)}
      
      </List>
    </Container>


  );
}

export default App;