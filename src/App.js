import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './Pages/Home';
import './App.css';
import Cart from './Pages/Cart';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={ (props) => <Home { ...props } /> } />
        <Route exact path="/Cart" render={ (props) => <Cart { ...props } /> } />
      </Switch>
    </Router>
  );
}

export default App;
