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
    this.setState((previous) => ({
      itemQuantity: previous.itemQuantity + 1,
    }));
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
    // passar uma função que atualiza o estado, mas que esta no pai , mesmo que seja chamanda só no filho ela atualiza o estado do pai (handleCartSize)
    const {
      product: { price,
        thumbnail,
        title,
        id,
        available_quantity: availableQuantity }, handleCartSize,
    } = this.props;
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
              availableQuantity,
              quantity: itemQuantity + 1 });
            this.handleProductQuantity();
            handleCartSize();
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
    available_quantity: PropTypes.number,
  }).isRequired,
  shipping: PropTypes.bool.isRequired,
  handleCartSize: PropTypes.func.isRequired,
};
