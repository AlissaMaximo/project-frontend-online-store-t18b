import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartLink from './CartLink';
import Categories from './Categories';
import '../css/Header.css';

export default class Header extends React.Component {
  render() {
    const { handleClick, handleInputChange, handleCategorySelect } = this.props;
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
        <CartLink />
      </header>
    );
  }
}
Header.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleCategorySelect: PropTypes.func.isRequired,
};
