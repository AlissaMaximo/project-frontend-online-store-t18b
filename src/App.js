import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Cart from './Pages/Cart';
import ProductDetails from './Pages/ProductDetails';
import Home from './Pages/Home';
import Buy from './Pages/Buy';

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
        <Route exact path="/Buy" render={ (props) => <Buy { ...props } /> } />
      </Switch>
    </Router>
  );
}

export default App;
