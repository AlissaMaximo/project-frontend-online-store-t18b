import React from 'react';
import './stars.css';
import { addAvaliation, getAvaliations } from '../services/storageAPI';
// import imgStar from './images/star.png';

export default class Avaliations extends React.Component {
  state={
    email: '',
    stars: 0,
    coments: '',
    buttonclicked: false,
  }

  handleImgClick = ({ target }) => {
    target.className = 'selected';
  }

handleChangeinputs = ({ target }) => {
  const { name } = target;
  const { value } = target;
  this.setState({
    [name]: value,
  });
}

handleSubmit = (event) => {
  event.preventDefault();
  const { buttonclicked } = this.state;
  const { email, stars, coments } = this.state;
  const avaliation = { email, stars, coments };
  addAvaliation(avaliation);
  // ideia do caio para sempre atualizar o state com um valor diferente do atual
  this.setState({
    buttonclicked: !buttonclicked,
  });
}

  // função que cria os inputs checkobx
  createInputRadio = () => {
    const array = ['1', '2', '3', '4', '5'];
    return array.map((number) => (
      <label key={ number } htmlFor={ `star${number}` }>
        {/* img para formatar o formato do checkbox em estrela */}
        {/* <img
          src={ imgStar }
          width="20px"
          onClick={ this.handleImgClick }
        /> */}
        {number}
        <input
          type="radio"
          id={ `star${number}` }
          value={ number }
          name="stars"
          required
          data-testid={ `${number}-rating` }
          onClick={ this.handleChangeinputs }
        />
      </label>
    ));
  }

  // pega avaliações salvas no localSotorage e faz um map
  showAvaliationsMade = () => {
    const savedAvaliations = getAvaliations();
    return savedAvaliations.map(({ email, stars, coments }, index) => (
      <div className="saved-avaliation" key={ index }>
        <p>{email}</p>
        <p>{stars}</p>
        <p>{coments}</p>
      </div>
    ));
  }

  render() {
    const { buttonclicked } = this.state;
    return (
      <>
        <form onSubmit={ this.handleSubmit } className="avaliations-form">
          <div className="email-starsDiv">
            <label htmlFor="input-email">
              <input
                name="email"
                type="email"
                id="input-email"
                placeholder="Email"
                data-testid="product-detail-email"
                required
                onChange={ this.handleChangeinputs }
              />
            </label>
            <div className="stars-div">
              {this.createInputRadio()}
            </div>
          </div>
          <label htmlFor="text-area">
            <textarea
              name="coments"
              id="text-area"
              placeholder="Mensagem (opcional)"
              data-testid="product-detail-evaluation"
              onChange={ this.handleChangeinputs }
            />
          </label>
          <button type="submit" data-testid="submit-review-btn">Avaliar</button>
        </form>
        <section>
          Avaliações realizadas
          <section className="saved-avaliations">
            {/* chama a função que retorna avalia... com o state estando true ou false */}
            {buttonclicked ? this.showAvaliationsMade() : this.showAvaliationsMade() }
          </section>
        </section>
      </>
    );
  }
}
