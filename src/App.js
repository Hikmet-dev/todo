import React from 'react';
import { Container, Grid } from '@material-ui/core';
import CreateToDo  from './components/CreateToDo';
import FilterPanel from './container/FilterPanel';
import Pagin from './components/Pagin';




function App() {

   


  return (
    <Container maxWidth="sm">
      <Grid pt={50}>
      <CreateToDo />
      </Grid>
      <FilterPanel />

    <Pagin />

    </Container>


  );
}

export default App;
