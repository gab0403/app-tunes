import React from 'react';
import Loading from './pages/Loading';
import { getUser } from './services/userAPI';

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
      <header data-testid="header-component">
        Header
        {loading ? <Loading />
          : (
            <p data-testid="header-user-name">
              { loginName }
            </p>
          )}
      </header>
    );
  }
}

export default Header;
