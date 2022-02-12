import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addCartIten, getCartIten } from '../services/storageAPI';

export default class Product extends React.Component {
  state = {
    itemQuantity: 0,
  }

  componentDidMount() {
    const { product: { id } } = this.props;
    const cartItens = getCartIten();
    const product = cartItens.find((iten) => iten.id === id);
    this.ifShippingFree();

    if (product) {
      this.setState({ itemQuantity: product.quantity });
    }
  }

  handleProductQuantity = () => {
    this.setState((previous) => ({ itemQuantity: previous.itemQuantity + 1 }));
  }

  ifShippingFree = () => {
    const { shipping } = this.props;
    if (shipping) {
      return (
        <p data-testid="free-shipping">Frete Grátis</p>
      );
    } return (<p>Sem Frete Grátis</p>);
  }

  render() {
    const { product: { price, thumbnail, title, id } } = this.props;
    const { itemQuantity } = this.state;
    return (
      <div
        className="product"
        data-testid="product"
      >
        <Link to={ `/productDetails/${id}` } data-testid="product-detail-link">
          {title}
        </Link>
        {this.ifShippingFree()}
        <img src={ thumbnail } alt="imagem do produto" />
        <p>{price}</p>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => {
            addCartIten({
              title,
              price,
              thumbnail,
              id,
              quantity: itemQuantity + 1 });
            this.handleProductQuantity();
          } }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}
Product.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  shipping: PropTypes.bool.isRequired,
};
