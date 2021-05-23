import React, {  useState, useMemo } from 'react';

import { Container, Grid, Typography, List } from '@material-ui/core';
import CreateToDo  from './components/CreateToDo';
import { FilterPanel } from './container/FilterPanel';
import { ToDoListItem } from './components/ToDoListItem';
import { Pagination } from './components/Pagination';

function App() {
  
  const [toDoList, setToDoList] = useState([]);
  const [sortParam, setSortParam] = useState({ done: "all", date: "ascending" });
  const [activePage, setActivePage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0)





  const clickOnPage = (e) => {
    setActivePage(Number(e.currentTarget.value));

  };

  const changeItemPerPageFilter = (e) => {
      setItemPerPage(e.target.value)

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
    setPageCount(newArr.length % itemPerPage ? Math.floor(newArr.length / itemPerPage) + 1 : newArr.length / itemPerPage);
    // setActivePage(param => param <= pageCount ? param : pageCount);
    const startitem = (activePage - 1) * itemPerPage;
    const endItem = activePage * itemPerPage;
    const newArwe = newArr.slice(startitem, endItem).sort((a, b) =>  sortParam.date ===  "ascending" ? b.id - a.id : a.id - b.id);
    
    
    return newArwe;
    
    

  }, [toDoList, activePage, itemPerPage, sortParam])




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
      {pageCount > 1 && <Pagination onPageNow={clickOnPage} pageCount={pageCount} activePage={activePage}  /> }
      </Grid>

      <List>

      {sortListToDo.map(task => <ToDoListItem key={task.id} task={task} onCheck={changeDoneStatus} onDelete={deleteToDoItem} onChange={changeTask} />)}
      
      </List>

    
    
    </Container>


  );
}

export default App;