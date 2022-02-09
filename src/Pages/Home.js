import React from 'react';
import Header from '../Components/Header';

export default class Home extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
      </>
    );
  }
}
