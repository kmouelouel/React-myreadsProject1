import React, { Component } from 'react'; 
import { Route} from 'react-router-dom'
import './App.css';
import Search from './Components/Search';
import ListBooks from './Components/ListBooks'; 

class App extends Component {
  render() {
    return (
        <div className="App">
            <Route exact path='/' component={ListBooks} />
            <Route path='/search' component={Search} />     
      </div>
    );
  }
}

export default App;
