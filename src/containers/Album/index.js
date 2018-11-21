import React from 'react';
import { Route, Link } from 'react-router-dom'
import Photo from '../Photo';
import ALBUMS from '../../data/albums';
import PHOTOS from '../../data/photos';

const Album = ({match}) => {
  let album = ALBUMS.find(album => album.id === match.params.id);
  if (!album) {
    return (<div>404 album not found :(</div>);
  } else {
    let photos = PHOTOS.filter(photo => photo.albumId === album.id)
    return(
      <div>
        <h1 style={{margin:0}}>Album: {album.name}</h1>
        <small> Date: {album.date}</small>
        <div>
        {photos.map(photo => 
        <span key={photo.id}>
        <Link to={`/album/${album.id}/photo/${photo.id}`}>
        <img  width={200} height={200/ (16/9)} src={photo.src} />
        </Link>
        </span>
        )}
        </div>
        <Route path={`${match.path}/photos/:photoId`} component={Photo} />
      </div>
    );
  }

}

export default Album;