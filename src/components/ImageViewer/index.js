import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const Image = ({photo}) => (
  <div>
    <Img key={photo.id} src={photo.src} /> 
  </div>
);

const Viewer = styled.div`
  height: 100vh;
  text-align:center;
`;

const ImageViewer = (props) => (
  <Viewer>
    <Image {...props}/>
  </Viewer>
);

export default ImageViewer;