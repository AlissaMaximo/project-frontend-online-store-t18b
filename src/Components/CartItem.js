import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCartIten, removeCartIten, addCartIten } from '../services/storageAPI';

class CartItem extends Component {
  state = {
    itemQuantity: 0,
  }

  componentDidMount() {
    const { id } = this.props;
    const cartItens = getCartIten();
    const product = cartItens.find((iten) => iten.id === id);

    if (product) {
      this.setState({ itemQuantity: product.quantity });
    }
  }

  handleQuantityIncrease = () => {
    this.setState((previous) => ({ itemQuantity: previous.itemQuantity + 1 }));
  }

  handleQuantityDecrease = (id) => {
    const { itemQuantity } = this.state;
    if (itemQuantity > 1) {
      this.setState((previous) => ({ itemQuantity: previous.itemQuantity - 1 }));
    } else {
      this.removeIten(id);
    }
  }

  removeIten = (id) => {
    const { attProducts } = this.props;
    removeCartIten(id);
    const cartItensData = getCartIten();
    attProducts(cartItensData);
  }

  render() {
    const { id, thumbnail, price, title } = this.props;
    const { itemQuantity } = this.state;
    return (
      <div key={ id } className="containerProducts">
        {/* Pô irmão, botões de adicionar e remover produtos */}
        <div className="title-quantity">
          <button
            type="button"
            onClick={ () => this.removeIten(id) }
          >
            X

          </button>
        </div>
        <div className="container-dataCart">
          <h3 data-testid="shopping-cart-product-name">{title}</h3>
          <img src={ thumbnail } alt={ `imagem do produto ${title}` } />
          <p>{price}</p>
          {/* Pô irmão, botões de adicionar e remover unidade/quantidade */}
          <div className="container-quantity-button">
            <button
              type="button"
              data-testid="product-decrease-quantity"
              onClick={ () => {
                addCartIten({
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
            <div data-testid="shopping-cart-product-quantity">{itemQuantity}</div>
            <button
              type="button"
              data-testid="product-increase-quantity"
              onClick={ () => {
                addCartIten({
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
};

export default CartItem;
