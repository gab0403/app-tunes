import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.validateSearch = this.validateSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.buttonSearch = this.buttonSearch.bind(this);
    this.state = {
      artist: '',
      isSearchButtonDisabled: true,
      loading: false,
      api: false,
      albunsList: [],
      empty: false,
      searchArtist: '',
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
      this.setState({ isSearchButtonDisabled: false });
    } else {
      this.setState({ isSearchButtonDisabled: true });
    }
  }

  async buttonSearch() {
    const { artist } = this.state;
    this.setState({ loading: true });
    const request = await searchAlbumsAPI(artist);
    this.setState({
      loading: false,
      api: true,
      albunsList: request,
      searchArtist: artist,
      artist: '',
      empty: request.length === 0,
    });
  }

  render() {
    const {
      artist,
      isSearchButtonDisabled,
      loading,
      api,
      albunsList,
      searchArtist,
      empty,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Pagina Search
        {loading ? <Loading /> : (
          <div>
            {api && <p>{`Resultado de álbuns de: ${searchArtist}`}</p>}
            <label htmlFor="search-artist">
              <input
                data-testid="search-artist-input"
                type="text"
                placeholder="Pesquise seu artista favorito"
                id="search"
                name="artist"
                onChange={ this.onInputChange }
                value={ artist }
              />
            </label>
            <button
              disabled={ isSearchButtonDisabled }
              type="submit"
              data-testid="search-artist-button"
              onClick={ this.buttonSearch }
            >
              Pesquisar
            </button>
          </div>
        )}
        {empty ? <p>Nenhum álbum foi encontrado</p> : (
          albunsList
            .map((album) => (
              <div
                key={ album.collectionId }
              >
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  { album.collectionName }
                </Link>
              </div>
            ))
        )}
      </div>

    );
  }
}

export default Search;
