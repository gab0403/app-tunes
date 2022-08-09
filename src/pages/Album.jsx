import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Loading from './Loading';
import MusicCard from '../MusicCard';
import getMusics from '../services/musicsAPI';
import '../styles/Album.css';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      album: [],
      loading: false,
      nameArtist: '',
      nameAlbum: '',
      imgAlbum: '',
    };

    this.music = this.music.bind(this);
  }

  componentDidMount() {
    this.music();
  }

  async music() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ loading: true });
    const request = await getMusics(id);
    this.setState({
      album: request,
      loading: false,
      nameArtist: request[0].artistName,
      nameAlbum: request[0].collectionName,
      imgAlbum: request[0].artworkUrl100,
    });
  }

  render() {
    const { album, loading, nameArtist, nameAlbum, imgAlbum } = this.state;
    return (
      <div className="container-album-music">
        <div data-testid="page-album" className="container-music">
          <Header />
          <img src={ imgAlbum } alt="Name" className="img-album" />
          <p data-testid="artist-name" className="name-artista">
            Artista:
            {' '}
            { nameArtist }
          </p>
          <p data-testid="album-name" className="album-name">
            Album:
            {' '}
            { nameAlbum }
          </p>
        </div>
        <div className="container-audio">
          <p className="title-music">Musicas</p>
          {loading ? <Loading />
            : (
              album.map((element, index) => (
                index !== 0 && (
                  <MusicCard
                    className="music-container"
                    key={ element.trackId }
                    trackId={ element.trackId }
                    previewUrl={ element.previewUrl }
                    trackName={ element.trackName }
                    music={ element }
                  />)
              ))
            )}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
