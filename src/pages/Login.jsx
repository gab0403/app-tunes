import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

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
      <div data-testid="page-login">
        <label htmlFor="name">
          Nome
          <input
            data-testid="login-name-input"
            type="text"
            id="name"
            name="name"
            value={ name }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ isLoginButtonDisabled }
          onClick={ this.ableLoginButton }
        >
          Entrar
        </button>
        { loading && <Loading /> }
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
