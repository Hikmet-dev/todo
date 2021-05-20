import React, { useEffect, useState } from 'react';

import { Container, Grid, Typography, List } from '@material-ui/core';
import CreateToDo  from './components/CreateToDo';
import { FilterPanel } from './container/FilterPanel';
import { ToDoListItem } from './components/ToDoListItem';




function App() {
  
  const [toDoList, setToDoList] = useState([]);
  const [sortParam, setSortParam] = useState({ done: null, date: "descending" });
  const [sortListItem, setSortListItem] = useState([]);



    const createNewToDo = (e) => {
      if(e.key === "Enter" && e.target.value) {
        setToDoList(prev => [{id: Date.now(),  task: e.target.value.trim(), date: new Date(Date.now()).toLocaleString(), done: false }, ...prev]);
      };
    };
    const changeToDoItem = (e) =>{

    }
    const changeDoneStatus = (e) => {
        const taskId = toDoList.findIndex(item => item.id.toString() === e.target.value); 
        const newArr = [...(toDoList.filter((item, index) => index !== taskId)), {...toDoList[taskId], done: !toDoList[taskId].done }];
        setToDoList(newArr);
      };


    const deleteToDoItem = (e) => {
      const taskId = toDoList.findIndex(item => item.id.toString() === e.currentTarget.value);
      const newArr = toDoList.filter((item, index) => index !== taskId);
      setToDoList(newArr);
    };


    const taskSort = (e) => {
      setSortParam(param => ({...param, date: e.target.value}) );
    };
    const doneSort = (e) => {
      console.log(e.currentTarget.value);
      setSortParam(param => ({...param, done: e.currentTarget.value}) );
    }
    

    useEffect(() => {
      if (sortParam.date === "ascending") {
        setToDoList(list => list.sort((a, b) => a.id - b.id));
      } else {
        setToDoList(list => list.sort((a, b) => b.id - a.id));
      }
      if (sortParam.done === "true") {
        const newarr =  toDoList.filter(item => item.done === true);
        setSortListItem(newarr);
      } else if (sortParam.done === "false" ) {
        const newarr =  toDoList.filter(item => item.done === false);
        setSortListItem(newarr);
      } else {
        const newarr =  toDoList.filter(item => item);
        setSortListItem(newarr);
      }


    }, [sortParam, toDoList]);

  


  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="h2" align="center">To do list</Typography>
      <Grid pt={50}>
      <CreateToDo onKeyPress={createNewToDo} />
      
      
      
      </Grid>
      <FilterPanel onChange={taskSort} sortParam={sortParam} doneSort={doneSort} />
      <List>
 
      
      {sortListItem.map(({id, task, date, done}) => <ToDoListItem task={task}  date={date} done={done} id={id} onCheck={changeDoneStatus} onDelete={deleteToDoItem}/>)}
      
      </List>
    </Container>


  );
}

export default App;
//     {toDoList.map(({id, task, date, done}) => <ToDoListItem task={task}  date={date} done={done} id={id} onCheck={changeDoneStatus} onDelete={deleteToDoItem}/>)}