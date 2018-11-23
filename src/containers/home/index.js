import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  albumsAllAsync,
} from '../../modules/album';

class AlbumList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.albumsAllAsync();
  }
  render() {
    const {loading, data} = this.props;
    const albums = data;
    if(loading) {
      return (<div>Loading</div>)
    }
    if (!albums || !albums.length) {
      return (<div>No albums found.</div>)
    }
    return (
      <ul>
        {albums.map(album => 
        <li key={album.id}>
          <Link to={`/album/${album.id}`}>
            {album.name} - <small>{album.date}</small>
          </Link>
        </li>
        )}
      </ul>
    );
  }
}

const Home = (props) => (
  <div>
    <h1 style={{margin:0}}>Albums</h1>
    <AlbumList {...props}/>
  </div>
);

const mapStateToProps = ({ album }) => ({
  ...album
});

const mapDispatchToProps = dispatch => bindActionCreators({albumsAllAsync},dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);