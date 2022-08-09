import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './pages/Loading';
import { getUser } from './services/userAPI';
import logo from './image/logo-trybetunes.png';
import icone from './image/icone.jpg';
import './styles/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.getLoginName = this.getLoginName.bind(this);
    this.state = {
      loading: false,
      loginName: '',
    };
  }

  componentDidMount() {
    this.getLoginName();
  }

  async getLoginName() {
    this.setState({ loading: true });
    const userObject = await getUser();
    this.setState({
      loginName: userObject.name,
      loading: false,
    });
  }

  render() {
    const {
      loginName,
      loading,
    } = this.state;
    return (
      <header className="header" data-testid="header-component">
        <div className="container-header">
          <img className="logo-header" src={ logo } alt="logo" />
          <div className="container-name">
            {loading ? <Loading />
              : (
                <div className="container-name-icone">
                  <img className="icon-user" src={ icone } alt="icone do usuario" />
                  <p className="name" data-testid="header-user-name">
                    { loginName }
                  </p>
                </div>
              )}

          </div>
        </div>
        <div className="container-pages">
          <Link
            to="/search"
            data-testid="link-to-search"
            className="pages"
          >
            Search
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="pages"
          >
            Favorites
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="pages"
          >
            Profile
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
