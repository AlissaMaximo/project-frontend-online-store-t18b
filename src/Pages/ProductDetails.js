import React from 'react';
import PropTypes from 'prop-types';
import CartLink from '../Components/CartLink';
import * as api from '../services/api';

export default class ProductDetails extends React.Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.handleProduct();
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
    const { product: { title, price, thumbnail } } = this.state;
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
