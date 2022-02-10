import React from 'react';
import PropTypes from 'prop-types';
import CartLink from './CartLink';

export default class Header extends React.Component {
  render() {
    const { handleClick, handleInputChange } = this.props;
    return (
      <>
        <form onSubmit={ (event) => handleClick(event) }>
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
        <CartLink />
      </>
    );
  }
}
Header.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
