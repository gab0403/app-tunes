import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from './services/favoriteSongsAPI';
import Loading from './pages/Loading';

class MusicCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isChecked: false,
      favorite: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.favoriteMusic = this.favoriteMusic.bind(this);
    this.musicFavoriteCheck = this.musicFavoriteCheck.bind(this);
  }

  componentDidMount() {
    this.musicFavoriteCheck();
  }

  onInputChange({ target: { checked } }) {
    this.setState({ isChecked: checked }, () => this.favoriteMusic());
  }

  async favoriteMusic() {
    const { music } = this.props;
    const { isChecked } = this.state;
    this.setState({
      loading: true,
    });
    if (isChecked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({
      loading: false,
    });
  }

  async musicFavoriteCheck() {
    const { music } = this.props;
    const request = await getFavoriteSongs();
    this.setState({
      favorite: request,
    }, () => {
      const { favorite } = this.state;
      const fav = favorite.some((element) => music.trackId === element.trackId);
      this.setState({ isChecked: fav });
    });
  }

  render() {
    const { music } = this.props;
    const { isChecked, loading } = this.state;
    return (
      <div
        key={ music.trackName }
      >
        <p>{ music.trackName }</p>
        <div>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
        </div>
        {loading ? <Loading />
          : (
            <label htmlFor="check">
              Favorita
              <input
                name="check"
                id="check"
                data-testid={ `checkbox-music-${music.trackId}` }
                type="checkbox"
                checked={ isChecked }
                onChange={ this.onInputChange }
              />
            </label>

          )}
      </div>
    );
  }
}

MusicCards.propTypes = {
  music: PropTypes.shape(),
}.isRequired;

export default MusicCards;
