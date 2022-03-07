import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import ProfileEdit from './pages/ProfileEdit';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Album from './pages/Album';
import Search from './pages/Search';
import Login from './pages/Login';

class App extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.validateName = this.validateName.bind(this);

    this.state = {
      name: '',
      isLoginButtonDisabled: true,
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

  render() {
    const {
      name,
      isLoginButtonDisabled,
    } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Login
              name={ name }
              isLoginButtonDisabled={ isLoginButtonDisabled }
              onInputChange={ this.onInputChange }
            />

          </Route>
          <Route path="/search" exact component={ Search } />
          <Route path="/album/:id" exact component={ Album } />
          <Route path="/favorites" exact component={ Favorites } />
          <Route path="/profile" exact component={ Profile } />
          <Route path="/profile/edit" exact component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
