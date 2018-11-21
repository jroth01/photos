import React, {Component} from 'react'
import styled from 'styled-components'
import Carousel from '../../components/Carousel'
import IMAGES from './images.js';

const Container = styled.div`
  // background-color:black;
  display: grid;
  justify-content: center; 
  align-items: center;
  height: 100vh;
`;

const width = 500;
const Image = styled.img`
  width: ${width}px;
  height: ${width / (16/ 9)}px;
`;

class Viewer extends Component {
  render() {
    return (
      <Container>
        <div>
        <Image src={IMAGES[0]}/>
        </div>
        {/* <Carousel imageArray={IMAGES}/> */}
      </Container>
    )
  }
} 

export default Viewer; 