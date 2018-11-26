import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../Heading';

const AlbumList = ({albums}) => (
  <div>
    <Heading title="Albums"/>
    <ul>
      {albums.map(album => 
      <li key={album.id}>
        <Link to={`/album/${album.id}`}>
          {album.name} - <small>{album.date}</small>
        </Link>
      </li>
      )}
    </ul>
  </div>
);

export default AlbumList; 