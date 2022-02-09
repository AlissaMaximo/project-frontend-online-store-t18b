import React from 'react';

export default class Cart extends React.Component {
  render() {
    return (
      <div>
        <h2 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h2>
      </div>
    );
  }
}
