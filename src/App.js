import React, { useState } from 'react';

import { Container, Grid, Typography, List } from '@material-ui/core';
import CreateToDo  from './components/CreateToDo';
import FilterPanel from './container/FilterPanel';
import ToDoListItem from './components/ToDoListItem';




function App() {
  const [newToDo, setNewToDo] = useState('');
  const handleNewToDo = (e) => {
    setNewToDo(e.target.value)
  };

  const [toDoList, setToDoList] = useState([]);

  const createNeToDo = (e) => {
    if(e.key === "Enter") {
      setToDoList(prev => [...prev, {id: Date.now(),  task: e.target.value, date: new Date(Date.now()).toLocaleString(), done: false } ]);
      setNewToDo('')
    };
  };

  const changeDoneStatus = (e) => {
      const taskId = toDoList.findIndex(item => item.id == e.target.value);
      toDoList[taskId].done 
      ? toDoList[taskId].done = !toDoList[taskId].done 
      : toDoList[taskId].done = !toDoList[taskId].done;
    };




  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="h2" align="center">To do list</Typography>
      <Grid pt={50}>
      <CreateToDo onChange={handleNewToDo} onKeyPress={createNeToDo}  valueNew={newToDo} />
      
      
      
      </Grid>
      <FilterPanel />
      <List>
      {toDoList.map(({id, task, date, done}) => <ToDoListItem task={task}  date={date} done={done} id={id} onCheck={changeDoneStatus} />)}
      </List>
      

    </Container>


  );
}

export default App;
