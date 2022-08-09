import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';
import '../styles/Login.css';
import logo from '../image/logo-trybetunes.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.ableLoginButton = this.ableLoginButton.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.validateName = this.validateName.bind(this);
    this.state = {
      name: '',
      isLoginButtonDisabled: true,
      loading: false,
    };
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateName());
  }

  validateName() {
    const { name } = this.state;
    const numMinCarac = 3;
    if (name.length >= numMinCarac) {
      this.setState({ isLoginButtonDisabled: false });
    } else {
      this.setState({ isLoginButtonDisabled: true });
    }
  }

  async ableLoginButton() {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false });
    history.push('/search');
  }

  render() {
    const {
      name,
      isLoginButtonDisabled,
      loading,
    } = this.state;
    return (
      <div>
        <div className="container-logo">
          <img className="logo" src={ logo } alt="logo" />
        </div>
        <div
          data-testid="page-login"
          className="container-login"
        >
          <label htmlFor="name">
            <input
              placeholder="Nome"
              className="nome_login"
              data-testid="login-name-input"
              type="text"
              id="name"
              name="name"
              value={ name }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            className="button_login"
            data-testid="login-submit-button"
            type="submit"
            disabled={ isLoginButtonDisabled }
            onClick={ this.ableLoginButton }
          >
            Entrar
          </button>
          <br />
          { loading && <Loading /> }
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
