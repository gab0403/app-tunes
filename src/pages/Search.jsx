import React from 'react';
import Header from '../Header';

class Search extends React.Component {
  constructor() {
    super();
    this.validateSearch = this.validateSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      artist: '',
      isShearchButtonDisabled: true,
    };
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateSearch());
  }

  validateSearch() {
    const { artist } = this.state;
    const numMinCarac = 2;
    if (artist.length >= numMinCarac) {
      this.setState({ isShearchButtonDisabled: false });
    } else {
      this.setState({ isShearchButtonDisabled: true });
    }
  }

  render() {
    const {
      artist,
      isShearchButtonDisabled,
    } = this.state;
    return (
      <div data-testid="page-search">
        Shearch
        <label htmlFor="search">
          <input
            data-testid="search-artist-input"
            type="text"
            id="search"
            name="artist"
            placeholder="Pesquise seu artista favorito"
            value={ artist }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ isShearchButtonDisabled }
          /* onClick={ this.validateSearch } */
        >
          Pesquisar
        </button>
        <Header />
      </div>
    );
  }
}

export default Search;
