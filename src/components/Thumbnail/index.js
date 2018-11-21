import React, {Component} from 'react';
import styled from "styled-components";

const SCALE_FACTOR = 1.5;
const ASPECT_RATIO = (16 / 9);

const getTranslation = (width, shift) => {
  const shiftAmt = width * (SCALE_FACTOR - 1);
  return `translate3d(${shift ? shiftAmt: -shiftAmt}px, 0, 0)`
};

const getTransform  = ({width, index, hoverIndex}) =>  {
  let transform = `scale(1)`;
  if (index === hoverIndex) {
    transform = `scale(${SCALE_FACTOR})`;
  } else if (hoverIndex !== null) {
    transform = getTranslation(width, index > hoverIndex);
  }
  return transform;
}

const getBoxShadow = ({index, selected}) => {
  const shadow = `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`;
  return index === selected ? shadow : ``;
}

const Container = styled.div`
  display: inline-block;
  box-sizing: border-box;
`;

const placeholder = `https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png`;

const Thumb = styled.div`
  background: ${props => `url(${props.src})`} no-repeat;
  background-size: cover;
  background-color: #e8eaed;
  box-shadow: ${props => getBoxShadow(props)};
  background-position: center;
  width: ${props => props.width}px;
  height: ${props => props.width / ASPECT_RATIO}px;
  cursor: pointer;
  transform-origin: center;
  transition: transform 0.3s;
  transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1);
  transform: ${props => getTransform(props)};
`;

class Thumbnail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (  
    <Container ref="container">
      <Thumb {...this.props}/>
    </Container>
    )
  }
}

export default Thumbnail;
