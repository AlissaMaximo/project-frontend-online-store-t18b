import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartLink from './CartLink';
import Categories from './Categories';
import '../css/Header.css';

export default class Header extends React.Component {
  render() {
    const { handleClick, handleInputChange, handleCategorySelect, cartSize } = this.props;
    return (
      <header className="container-header">
        <Link to="/" className="link-home">
          <h2>Home</h2>
        </Link>
        <nav className="nav-header">
          <form className="form-header" onSubmit={ (event) => handleClick(event) }>
            <Categories
              handleCategorySelect={ handleCategorySelect }
              handleClick={ handleClick }
            />
            <input
              type="text"
              placeholder="Digite sua busca aqui"
              id="input"
              onChange={ handleInputChange }
              data-testid="query-input"
            />
            <button type="submit" id="button" data-testid="query-button">
              pesquisar
            </button>
          </form>
        </nav>
        <div data-testid="shopping-cart-size" className="cartLink">
          <CartLink />
          {cartSize}
        </div>

      </header>
    );
  }
}
Header.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleCategorySelect: PropTypes.func.isRequired,
  cartSize: PropTypes.number.isRequired,
};
