import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  getCartIten,
  removeCartIten,
  addCartIten,
} from '../services/storageAPI';

// O cart Item foi criado, para passar como filho para o Cart.
class CartItem extends Component {
  state = {
    itemQuantity: 0,
  };

  componentDidMount() {
    const { id } = this.props;
    const cartItens = getCartIten();
    const product = cartItens.find((iten) => iten.id === id);
    if (product) {
      this.setState({
        itemQuantity: product.quantity,
        maxQuantity: product.availableQuantity,
      });
    }
  }

  handleDisabled = () => {
    const { itemQuantity, maxQuantity } = this.state;
    if (itemQuantity >= maxQuantity) {
      return true;
    }
    return false;
  }

  // Continuação da explicação da ***CART*** Aqui!!
  // Pego a função que veio como props, passo como segundo parametro na função que
  // Incrementa, Decrementa e exclui, para mudar ao vivasso o state do pai;
  handleQuantityIncrease = () => {
    const { amountItens } = this.props;
    this.setState(
      (previous) => ({ itemQuantity: previous.itemQuantity + 1 }),
      () => amountItens(),
    );
  };

  handleQuantityDecrease = (id) => {
    const { itemQuantity } = this.state;
    const { amountItens } = this.props;
    if (itemQuantity > 1) {
      this.setState(
        (previous) => ({ itemQuantity: previous.itemQuantity - 1 }),
        () => amountItens(),
      );
    } else {
      this.removeIten(id);
    }
  };

  removeIten = (id) => {
    const { attProducts, amountItens } = this.props;
    removeCartIten(id);
    const cartItensData = getCartIten();
    attProducts(cartItensData);
    amountItens();
  };

  render() {
    const { id,
      thumbnail, price, title, hasButton,
      available_quantity: availableQuantity } = this.props;

    const { itemQuantity } = this.state;

    return (
      <div key={ id } className="containerProducts">
        {/* Pô irmão, botões de adicionar e remover produtos */}
        <div className="title-quantity">
          {hasButton && (
            <button type="button" onClick={ () => this.removeIten(id) }>
              X
            </button>
          )}
        </div>
        <div className="container-dataCart">
          <h3 data-testid="shopping-cart-product-name">{title}</h3>
          <img src={ thumbnail } alt={ `imagem do produto ${title}` } />
          <p>{price}</p>
          {/* Pô irmão, botões de adicionar e remover unidade/quantidade */}
          <div className="container-quantity-button">
            {hasButton && (
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => {
                  addCartIten({
                    availableQuantity,
                    title,
                    price,
                    thumbnail,
                    id,
                    quantity: itemQuantity - 1,
                  });
                  this.handleQuantityDecrease(id);
                } }
              >
                -

              </button>
            )}
            <div data-testid="shopping-cart-product-quantity">
              {itemQuantity}
            </div>
            {hasButton && (
              <button
                type="button"
                data-testid="product-increase-quantity"
                disabled={ this.handleDisabled() }
                onClick={ () => {
                  addCartIten({
                    availableQuantity,
                    title,
                    price,
                    thumbnail,
                    id,
                    quantity: itemQuantity + 1,
                  });
                  this.handleQuantityIncrease();
                } }
              >
                +

              </button>
            )}

          </div>
        </div>
        <hr />
      </div>
    );
  }
}

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  attProducts: PropTypes.func.isRequired,
  amountItens: PropTypes.func.isRequired,
  available_quantity: PropTypes.number.isRequired,
  hasButton: PropTypes.bool.isRequired,
};

export default CartItem;
