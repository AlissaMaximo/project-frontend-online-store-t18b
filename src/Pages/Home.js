import React from 'react';
import Categories from '../Components/Categories';
import Header from '../Components/Header';
import * as api from '../services/api';
import Product from '../Components/Product';
import { getCartIten } from '../services/storageAPI';

export default class Home extends React.Component {
  state = {
    results: [],
    currentCategoryId: '',
    inputValue: '',
    cartSize: 0,
  }

  componentDidMount() {
    this.handleCartSize();
  }

// função que pega no localStorage a quantidade total de produtos e atualiza o state
handleCartSize = () => {
  const cart = getCartIten();
  const quantitys = cart.map((item) => item.quantity);
  const cartSize = quantitys.reduce((acc, valorAtural) => acc + valorAtural, 0);
  this.setState({
    cartSize,
  });
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
    this.handleCartSize();
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
          <Product
            key={ product.id }
            product={ product }
            handleCartSize={ this.handleCartSize }
          />
        ))}
      </section>
    );
  }

  message = () => (
    <h3 data-testid="home-initial-message">
      Digite algum termo de pesquisa ou escolha uma categoria.
    </h3>)

  render() {
    const { results, cartSize } = this.state;
    return (
      <>
        <div>
          <Header
            handleClick={ this.handleClick }
            handleInputChange={ this.handleInputChange }
          />
          <div data-testid="shopping-cart-size">
            {cartSize}
          </div>
        </div>
        <Categories
          handleCategorySelect={ this.handleCategorySelect }
          handleClick={ this.handleClick }
        />
        { results.length > 0 ? this.toRender() : this.message()}
      </>
    );
  }
}
