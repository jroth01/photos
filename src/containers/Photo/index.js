import React from 'react';
import PHOTOS from '../../data/photos';

const Photo = ({match}) => {
  let photo = PHOTOS.find(photo => photo.id === match.params.id);
  console.log(match)
  if (!photo) {
    return (<div>404 photo not found :(</div>);
  } else {
    return(
      <div>
        PHOTO
        {/* <small> Date: {photo.date}</small> */}
        <div>
        {/* <img key={photo.id} width={200} height={200/ (16/9)} src={photo.src} /> */}
        </div>
      </div>
    );
  }

}

export default Photo;