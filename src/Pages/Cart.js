import React from 'react';
import { getCartIten } from '../services/storageAPI';

export default class Cart extends React.Component {
  state = {
    cartItensData: [],
  }

  componentDidMount() {
    const cartItensData = getCartIten();
    this.setState({ cartItensData });
  }

  showCartItens = () => {
    const cartItensData = getCartIten();
    return cartItensData.map(({
      title,
      price,
      thumbnail,
      id,
      quantity,
    }) => (
      <div key={ id } className="containerCart">
        <h3 data-testid="shopping-cart-product-name">{ title }</h3>
        <img src={ thumbnail } alt={ `imagem do produto ${title}` } />
        <p>{ price }</p>
        <div data-testid="shopping-cart-product-quantity">{ quantity }</div>
      </div>
    ));
  }

  render() {
    const { cartItensData } = this.state;
    if (cartItensData.length > 0) return this.showCartItens();
    return (
      <div className="containerCart">
        <h2 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h2>
      </div>
    );
  }
}
