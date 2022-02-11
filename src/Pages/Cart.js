import React from 'react';
import { getCartIten } from '../services/storageAPI';
import CartItem from '../Components/CartItem';

export default class Cart extends React.Component {
  state = {
    cartItensData: [],
  }

  componentDidMount() {
    const cartItensData = getCartIten();
    this.setState({ cartItensData });
  }

  attProducts = (cartItensData) => {
    this.setState({ cartItensData });
  }

  showCartItens = () => {
    const cartItensData = getCartIten();
    return cartItensData.map((item) => (
      <CartItem key={ item.id } { ...item } attProducts={ this.attProducts } />
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
