import React from 'react';
import { Link } from 'react-router-dom';
import Img from '../logo.png';
import Categories from '../Components/Categories';
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

        <div>
          <Header handleClick={ this.handleClick } />
          <Link data-testid="shopping-cart-button" to="/Cart">
            <img
              src={ Img }
              alt="cart logo"
              height="30px"
            />
          </Link>
        </div>
        <Categories />
        { results.length > 0 ? this.toRender() : this.message()}
      </>
    );
  }
}
