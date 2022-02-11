import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { getCartIten } from '../services/storageAPI';
import CartItem from '../Components/CartItem';
/* Ref: dados 27 Estados do Brasil >> https://gist.github.com/quagliato/9282728 */
import BrazilianStates from '../Components/BrazilianStates';

export default class Buy extends Component {
  state = {
    Nome: '',
    CPF: '',
    Email: '',
    Telefone: '',
    CEP: '',
    Endereco: '',
    Complemento: '',
    Numero: '',
    Cidade: '',
    Estado: '',
    Methods: '',
    wasSubmitted: 'false',
  };

  handleInput = ({ target }) => {
    if (target.type !== 'submit') {
      console.log('foi');
      this.setState({ [target.name]: target.value });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleInput(event);
    if (Object.values(this.state).every((value) => value.length > 0)) {
      Object.keys(this.state).forEach((state) => this.setState({ [state]: '' }));
      this.setState({ wasSubmitted: 'true' });
    }
  };

  amountItens = () => {
    const cartItensData = getCartIten();
    if (cartItensData.length > 0) {
      const amount = cartItensData
        .map(({ price, quantity }) => price * quantity)
        .reduce((acc, item) => acc + item)
        .toFixed(2);
      return amount;
    }
  };

  showProducts = () => {
    const cartItensData = getCartIten();
    return cartItensData.map((item) => (
      <CartItem
        key={ item.id }
        { ...item }
        amountItens={ this.amountItens }
        hasButton={ false }
      />
    ));
  };

  render() {
    const {
      Nome,
      CPF,
      Email,
      Telefone,
      CEP,
      Endereco,
      Complemento,
      Numero,
      Cidade,
      wasSubmitted,
    } = this.state;
    return (
      <>
        <div className="container-revise-products">
          <h3>Revise seu produto</h3>

          <div className="container-products">{this.showProducts()}</div>
        </div>
        <form onChange={ (event) => this.handleInput(event) }>
          <div className="container-buyer-info">
            <h3>Informações do comprador</h3>

            <input
              type="text"
              placeholder="Nome Completo"
              value={ Nome }
              name="Nome"
              data-testid="checkout-fullname"
            />
            <input
              type="number"
              placeholder="CPF"
              value={ CPF }
              name="CPF"
              data-testid="checkout-cpf"
            />
            <input
              type="email"
              placeholder="Email"
              value={ Email }
              name="Email"
              data-testid="checkout-email"
            />
            <input
              type="tel"
              placeholder="Telefone"
              value={ Telefone }
              name="Telefone"
              data-testid="checkout-phone"
            />
            <input
              type="number"
              placeholder="CEP"
              value={ CEP }
              name="CEP"
              data-testid="checkout-cep"
            />
            <input
              type="text"
              placeholder="Endereço"
              value={ Endereco }
              name="Endereco"
              data-testid="checkout-address"
            />
            <input
              type="text"
              placeholder="Complemento"
              value={ Complemento }
              name="Complemento"
            />
            <input
              type="number"
              placeholder="Número"
              value={ Numero }
              name="Numero"
              data-testid="checkout-phone"
            />
            <input
              type="text"
              placeholder="Cidade"
              value={ Cidade }
              name="Cidade"
            />
            <BrazilianStates />
          </div>
          <div className="container-payment-methods">
            <h3>Selecione o método de pagamento</h3>

            <label htmlFor="Boleto">
              Boleto
              <input type="radio" name="Methods" value="Boleto" id="Boleto" />
            </label>

            <label htmlFor="Visa">
              Visa
              <input type="radio" name="Methods" value="Visa" id="Visa" />
            </label>

            <label htmlFor="MasterCard">
              MasterCard
              <input
                type="radio"
                name="Methods"
                value="MasterCard"
                id="MasterCard"
              />
            </label>

            <label htmlFor="Elo">
              Elo
              <input type="radio" name="Methods" value="Elo" id="Elo" />
            </label>
          </div>
          <button type="submit" onClick={ (event) => this.handleSubmit(event) }>
            {' '}
            Comprar
            {' '}
          </button>
        </form>
        {wasSubmitted === 'true' && <Redirect to="/" />}
      </>
    );
  }
}
