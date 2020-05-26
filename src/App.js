import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import  ToDoList  from "./components/ToDoList";
import { EnhancedAddItem } from "./components/AddToDoItem";
import './App.scss';

function App() {

  let routes = (
    <Switch>
      <Route path="/addToDoItem" component={ EnhancedAddItem } />
      <Route path="/" exact component={ ToDoList } />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className="App">
      { routes }
    </div>
  );
}

export default App;
