import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Product extends React.Component {
  render() {
    const { product: { price, thumbnail, title, id } } = this.props;
    return (
      <div
        className="product"
        data-testid="product"
      >
        <Link to={ `/productDetails/${id}` } data-testid="product-detail-link">
          {title}
        </Link>
        <img src={ thumbnail } alt="imagem do produto" />
        <p>{price}</p>
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
};
