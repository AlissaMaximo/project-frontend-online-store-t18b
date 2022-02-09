import React from 'react';
import PropTypes from 'prop-types';

export default class Product extends React.Component {
  render() {
    const { product: { price, thumbnail, title } } = this.props;
    return (
      <div className="product" data-testid="product">
        <p>{title}</p>
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
  }).isRequired,
};
