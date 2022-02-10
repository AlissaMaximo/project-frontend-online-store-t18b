import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import Cart from './Pages/Cart';
import ProductDetails from './Pages/ProductDetails';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={ (props) => <Home { ...props } /> } />
        <Route exact path="/Cart" render={ (props) => <Cart { ...props } /> } />
        <Route
          path="/productDetails/:productid"
          render={ (props) => <ProductDetails { ...props } /> }
        />
      </Switch>
    </Router>
  );
}

export default App;
