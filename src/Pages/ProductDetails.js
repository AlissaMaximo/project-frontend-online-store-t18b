import React from 'react';
import PropTypes from 'prop-types';
import CartLink from '../Components/CartLink';
import * as api from '../services/api';
import { addCartIten, getCartIten } from '../services/storageAPI';

export default class ProductDetails extends React.Component {
  state = {
    loading: true,
    itemQuantity: 0,
  }

  componentDidMount() {
    this.handleProduct();
    const { match: { params: { productid } } } = this.props;
    const cartItens = getCartIten();
    const product = cartItens.find((iten) => iten.id === productid);

    if (product) {
      this.setState({ itemQuantity: product.quantity });
    }
  }

  handleProductQuantity = () => {
    this.setState((previous) => ({ itemQuantity: previous.itemQuantity + 1 }));
  }

  handleProduct = async () => {
    const { match: { params: { productid } } } = this.props;
    const product = await api.getProductFromId(productid);
    this.setState({
      product,
      loading: false,
    });
  }

  createDetailsList = () => {
    const { product: { attributes } } = this.state;
    return attributes.map((attribute) => (
      <li key={ attribute.id }>{`${attribute.name}: ${attribute.value_name}`}</li>
    ));
  }

  toRender = () => {
    const { product: { title, price, thumbnail, id }, itemQuantity } = this.state;
    return (
      <>
        <div className="details-page-header">
          <CartLink />
        </div>
        <section className="details-section">
          <h3 data-testid="product-detail-name">{title}</h3>
          <h4>{price}</h4>
          <img
            src={ thumbnail }
            className="details-image"
            alt="imagem do produto"
          />
          <div className="details-info">
            <ol>
              {this.createDetailsList()}
            </ol>
          </div>
          <div className="container-quantity">
            <p className="quantity">
              {itemQuantity}
            </p>
            <button
              data-testid="product-detail-add-to-cart"
              type="button"
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
        </section>
      </>
    );
  }

  message = () => (
    <h3>Carregando...</h3>
  )

  render() {
    const { loading } = this.state;
    return (
      <div className="details-page">
        {loading ? this.message() : this.toRender() }
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      productid: PropTypes.string,
    }),
  }).isRequired,
};
