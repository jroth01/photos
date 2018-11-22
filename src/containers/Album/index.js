import React from 'react';
import {Link } from 'react-router-dom'
import NotFound from '../NotFound';
import ALBUMS from '../../data/albums';
import PHOTOS from '../../data/photos';

const AlbumHeader = ({album}) => (
  <div>
    <h1 style={{margin:0}}>Album: {album.name}</h1>
   <small> Date: {album.date}</small>
  </div>
);

const ImageList = ({album, photos}) => (
  <div>
    {photos.map(photo => 
      <span key={photo.id}>
        <Link to={`/album/${album.id}/photo/${photo.id}`}>
        <img width={200} height={200 / (16/9)} src={photo.src} />
        </Link>
      </span>
    )}
  </div>
);

const Album = ({match}) => {
  const album = ALBUMS.find(album => album.id.toString() === match.params.id);
  if (!album) {
    return (<NotFound resource={`Album ${match.params.id}`}/>);
  } else {
    const photos = PHOTOS.filter(photo => photo.albumId === album.id)
    return(
      <div>
        <AlbumHeader album={album}/>
        <ImageList album={album} photos={photos}/>
      </div>
    );
  }

}

export default Album;