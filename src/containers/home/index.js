import React from 'react';
import {Link} from 'react-router-dom';
import ALBUM_DATA from '../../data/albums';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  albumsAllAsync,
} from '../../modules/album';

const Home = () => (
  <div>
    <h1>Home</h1>
    <h3>Albums</h3>
    <p>List of inspections</p>
    <ul>
      {ALBUM_DATA.map(album => 
      <li key={album.id}>
        <Link to={`/album/${album.id}`}>{album.name} - <small>{album.date}</small></Link>
      </li>
      )}
    </ul>
  </div>
);

const mapStateToProps = ({ album }) => ({
  parentId: album.parentId,
  albumsRequested: album.albumsRequested,
});

const mapDispatchToProps = dispatch => bindActionCreators({albumsAllAsync},dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);