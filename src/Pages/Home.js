import React from 'react';
import Header from '../Components/Header';
import * as api from '../services/api';
import Product from '../Components/Product';

export default class Home extends React.Component {
  state = {
    results: [],
  }

  handleClick = async (event, string) => {
    event.preventDefault();
    const products = await api.getProductsFromCategoryAndQuery('', string);
    this.setState({
      results: products.results,
    });
  }

  toRender = () => {
    const { results } = this.state;
    return (
      <section className="product-section">
        {results.map((product) => (
          <Product key={ product.id } product={ product } />
        ))}
      </section>
    );
  }

  message = () => (
    <h3 data-testid="home-initial-message">
      Digite algum termo de pesquisa ou escolha uma categoria.
    </h3>)

  render() {
    const { results } = this.state;
    return (
      <>
        <Header handleClick={ this.handleClick } />
        { results.length > 0 ? this.toRender() : this.message()}
      </>
    );
  }
}
