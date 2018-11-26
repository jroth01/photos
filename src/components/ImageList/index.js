import React from 'react'; 
import { Link } from 'react-router-dom';
import Image from '../Image'

const ImageList = ({album}) => {
  return (
  <div>
    {album.photos.map(photo => 
      <span key={photo.id}>
        <Link to={`/album/${album.id}/photo/${photo.id}`}>
          <Image photo={photo}/>
        </Link>
      </span>
    )}
  </div>
)};

export default ImageList;