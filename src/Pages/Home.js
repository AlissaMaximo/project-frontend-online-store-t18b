import React from 'react';
import Header from '../Components/Header';
import * as api from '../services/api';
import Product from '../Components/Product';

export default class Home extends React.Component {
  state = {
    results: [],
    currentCategoryId: '',
    inputValue: '',
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  handleClick = async (event) => {
    if (event && event.target.button) {
      event.preventDefault();
    }
    const { currentCategoryId, inputValue } = this.state;
    const products = await api
      .getProductsFromCategoryAndQuery(currentCategoryId, inputValue);
    this.setState({
      results: products.results,
    });
  }

  handleCategorySelect = ({ target }) => {
    const selectedCategoryId = target.id;
    this.setState({ currentCategoryId: selectedCategoryId },
      (event) => this.handleClick(event));
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
        <div>
          <Header
            handleClick={ this.handleClick }
            handleInputChange={ this.handleInputChange }
            handleCategorySelect={ this.handleCategorySelect }
          />
        </div>
        { results.length > 0 ? this.toRender() : this.message()}
      </>
    );
  }
}
