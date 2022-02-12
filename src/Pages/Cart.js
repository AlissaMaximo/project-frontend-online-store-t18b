import React from 'react';
import { Redirect } from 'react-router-dom';
import { getCartIten } from '../services/storageAPI';
import CartItem from '../Components/CartItem';

export default class Cart extends React.Component {
  state = {
    amount: 0,
    checkout: false,
    cartItensData: [],
  };

  componentDidMount() {
    const cartItensData = getCartIten();
    this.setState({ cartItensData });
    this.amountItens();
  }

  attProducts = (cartItensData) => {
    this.setState({ cartItensData });
  };

  showCartItens = () => {
    const cartItensData = getCartIten();
    return cartItensData.map((item) => (
      <CartItem
        key={ item.id }
        { ...item }
        attProducts={ this.attProducts }
        amountItens={ this.amountItens }
        hasButton
      />
    ));
  };

  handleCheckoutButton = () => this.setState({ checkout: true });

  // Aqui Eu utilizo um map para pegar todos os valores(Não só o reduce, por vim tudo como objeto).
  // O reduce vem depois como uma forma de somar os valores, depois jogo lá no amount do state para fazer a soma.
  // Passo essa função como props
  // resto da Explicação Compenent Cart item;
  amountItens = () => {
    const cartItensData = getCartIten();
    if (cartItensData.length > 0) {
      const amount = cartItensData
        .map(({ price, quantity }) => price * quantity)
        .reduce((acc, item) => acc + item)
        .toFixed(2);
      this.setState({ amount });
    }
  };

  render() {
    const { cartItensData, amount, checkout } = this.state;
    if (cartItensData.length > 0) {
      return (
        <div className="containerCart">
          <p>{`Valor Total: R$${amount}`}</p>
          {this.showCartItens()}
          <button
            type="button"
            data-testid="checkout-products"
            onClick={ this.handleCheckoutButton }
          >
            Finalizar Compra
          </button>
          { checkout && <Redirect to="/Buy" /> }
        </div>
      );
    }
    return (
      <div className="containerCart">
        <h2 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h2>
      </div>
    );
  }
}
