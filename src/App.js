import React, { useEffect, useState } from 'react';

import { Container, Grid, Typography, List } from '@material-ui/core';
import CreateToDo  from './components/CreateToDo';
import { FilterPanel } from './container/FilterPanel';
import ToDoListItem from './components/ToDoListItem';




function App() {
  const [newToDo, setNewToDo] = useState('');
  const [toDoList, setToDoList] = useState([]);
  const [sortParam, setSortParam] = useState({ done: null, date: "descending" });


  const handleNewToDo = (e) => {
    setNewToDo(e.target.value)
  };

    const createNewToDo = (e) => {
      if(e.key === "Enter" && e.target.value) {
        setToDoList(prev => [{id: Date.now(),  task: e.target.value.trim(), date: new Date(Date.now()).toLocaleString(), done: false }, ...prev]);
        setNewToDo('')
        console.log(toDoList);
      };
    };

    const changeDoneStatus = (e) => {
        const taskId = toDoList.findIndex(item => item.id.toString() === e.target.value); 
        const newArr = [...(toDoList.filter((item, index) => index !== taskId)), {...toDoList[taskId], done: !toDoList[taskId].done }];
        setToDoList(newArr);
        console.log(newArr);


      };


    const taskSort = (e) => {
      setSortParam(param => ({...param, date: e.target.value}) );
    };
    const doneSort = (e) => {
      console.log(e.target);
      // setSortParam(param => ({...param, date: e.target.value}) );
    }
    

    useEffect(() => {
      if (sortParam.date === "ascending") {
        setToDoList(list => list.sort((a, b) => a.id - b.id));
      } else {
        setToDoList(list => list.sort((a, b) => b.id - a.id));
      }


    }, [sortParam])


  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="h2" align="center">To do list</Typography>
      <Grid pt={50}>
      <CreateToDo onChange={handleNewToDo} onKeyPress={createNewToDo}  valueNew={newToDo} />
      
      
      
      </Grid>
      <FilterPanel onChange={taskSort} sortParam={sortParam} doneSort={doneSort} />
      <List>
      {toDoList.map(({id, task, date, done}) => <ToDoListItem task={task}  date={date} done={done} id={id} onCheck={changeDoneStatus} />)}
      </List>
    </Container>


  );
}

export default App;
