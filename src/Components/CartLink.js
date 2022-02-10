import React from 'react';
import { Link } from 'react-router-dom';
import Img from '../logo.png';

export default class CartLink extends React.Component {
  render() {
    return (
      <Link data-testid="shopping-cart-button" to="/Cart">
        <img
          src={ Img }
          alt="cart logo"
          height="30px"
        />
      </Link>
    );
  }
}
