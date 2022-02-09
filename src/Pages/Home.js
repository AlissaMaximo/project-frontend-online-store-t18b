import React from 'react';
import { Link } from 'react-router-dom';
import Img from '../logo.png';
import Header from '../Components/Header';

export default class Home extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>

        <Link data-testid="shopping-cart-button" to="/Cart">
          <img
            src={ Img }
            alt="cart logo"
            height="30px"
          />
        </Link>

      </>
    );
  }
}
