import React from 'react';
import { getCategories } from '../services/api';

export default class Categories extends React.Component {
  state = {
    categories: [],
  }

  componentDidMount() {
    this.handleCategories();
  }

  handleCategories = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    return (
      <details>
        <summary>Categorias:</summary>
        { (categories.length > 0) && (
          categories.map(({ id, name }) => (
            <div key={ id }>
              <label htmlFor={ id } data-testid="category">
                {' '}
                {name}
                <input name="categorie" type="radio" id={ id } />
              </label>
            </div>
          ))
        ) }
      </details>
    );
  }
}
