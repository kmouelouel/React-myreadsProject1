import React, { Component } from 'react'; 
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Search from './Components/Search';
import ListBooks from './Components/ListBooks'; 

class App extends Component {
  render() {
    return (
        <div className="App">
            <Switch>
                <Route exact path='/' component={ListBooks} />
                <Route path='/search' component={Search} /> 
                <Route render={() => <div><h1>404 Error</h1><h3> Page not found</h3></div>} />
            </Switch>          
      </div>
    );
  }
}

export default App;
