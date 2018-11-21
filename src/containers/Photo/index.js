import React from 'react';
import NotFound from '../NotFound';
import PHOTOS from '../../data/photos';

const Photo = ({match}) => {
  console.log(match)
  let photo = PHOTOS.find(photo => photo.id.toString() === match.params.id);
  console.log(match)
  if (!photo) {
    return (<NotFound resource={`Photo ${match.params.id}`}/>);
  } else {
    return(
      <div>
         <h1 style={{margin:0}}>Photo: {photo.name}</h1>
        <small> Date: {photo.date}</small>
        <div>
        <img key={photo.id} width={200} height={200/ (16/9)} src={photo.src} />
        </div>
      </div>
    );
  }

}

export default Photo;