import React, {Component} from 'react';
import {Link } from 'react-router-dom'
import NotFound from '../NotFound';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  albumWithPhotosAsync,
} from '../../modules/album';

const AlbumHeader = ({album}) => (
  <div>
    <h1 style={{margin:0}}>Album: {album.name}</h1>
   <small> Date: {album.date}</small>
  </div>
);

const ImageList = ({album}) => (
  <div>
    {album.photos.map(photo => 
      <span key={photo.id}>
        <Link to={`/album/${album.id}/photo/${photo.id}`}>
        <img width={200} height={200 / (16/9)} src={photo.src} />
        </Link>
      </span>
    )}
  </div>
);

class Album2 extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { albumWithPhotosAsync, match } = this.props;
    albumWithPhotosAsync(match.params.id);
  }
  render() {
    const { match, data } = this.props;
    const album = data;
    if (!album) {
      return (<NotFound resource={`Album ${match.params.id}`}/>);
    } else {
      return(
        <div>
          <AlbumHeader album={album}/>
          {album.photos && <ImageList album={album}/>}
        </div>
      );
    }
  }
}

const mapStateToProps = ({ album }) => ({
  ...album
});

const mapDispatchToProps = dispatch => bindActionCreators({albumWithPhotosAsync},dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Album2);