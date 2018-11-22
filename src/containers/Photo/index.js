import React from 'react';
import styled from 'styled-components';
import NotFound from '../NotFound';
import PHOTOS from '../../data/photos';
import ALBUMS from '../../data/albums';

const Viewer = styled.div`
  height: 100vh;
  text-align:center;
`;

const Img = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const Btn = styled.button`
  display:inline-block;
  margin: 8px;
`;

const Image = ({photo}) => (
  <div>
    <Img key={photo.id} width={200} height={200/ (16/9)} src={photo.src} /> 
  </div>
);

const Photo = ({match}) => {
  let photo = PHOTOS.find(photo => photo.id.toString() === match.params.id);
  if (!photo) {
    return (<NotFound resource={`Photo ${match.params.id}`}/>);
  } else {
    let albumId = photo.albumId; 
    let album = ALBUMS.find(album => album.id === albumId);
    return(
      <Viewer>
        <Image photo={photo}/>
        <Btn disabled>previous</Btn>
        <Btn disabled>next</Btn>
      </Viewer>
    );
  }
}

export default Photo;