import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    const {
      name,
      isLoginButtonDisabled,
      onInputChange,
    } = this.props;
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
            onChange={ onInputChange }
          />
        </label>
        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ isLoginButtonDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string.isRequired,
  isLoginButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Login;
