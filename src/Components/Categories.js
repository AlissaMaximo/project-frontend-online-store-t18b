import React from 'react';
import PropTypes from 'prop-types';
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
    const { handleCategorySelect } = this.props;
    return (
      <details className="container-details">
        <summary className="container-summary">Categorias:</summary>
        <div className="container-details-itens">

          <label htmlFor="all">
            Todos
            <input
              name="categorie"
              type="radio"
              id="all"
              onChange={ handleCategorySelect }
            />
          </label>
          { (categories.length > 0) && (
            categories.map(({ id, name }) => (
              <div key={ id }>
                <label htmlFor={ id } data-testid="category">
                  {name}
                  <input
                    name="categorie"
                    type="radio"
                    id={ id }
                    onChange={ handleCategorySelect }
                  />
                </label>
              </div>
            ))
          ) }
        </div>
      </details>
    );
  }
}

Categories.propTypes = {
  handleCategorySelect: PropTypes.func.isRequired,
}.isRequired;
