import React, { Component } from 'react';
import styled from "styled-components";
import Thumbnail from '../Thumbnail';
import NavButton from '../NavButton';
import Circle from '../Circle';

const ROWSIZE = 5;
const WIDTH = 150;

const Wrapper = styled.div`
  display: grid;
`;

const Row = styled.div`
  display: grid;
  justify-self: center;
  align-self: center;
  grid-template-columns: 1fr repeat(${ROWSIZE}, minmax(${WIDTH}px, 1fr)) 1fr;
  grid-column-gap: 16px;
`;

const Nav = styled.div`
  user-select: none;    
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  opacity: 1;
`;

const ThumnailWrapper = styled.div`
  line-height: 0;
  display: inline-block;
`;


class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedIndex: this.props.selectedIndex || null, 
      hover: null, 
      start: 0,
      end: ROWSIZE,
      rows: Math.ceil(this.props.imageArray.length / ROWSIZE),
      filtered: this.props.imageArray.slice(0, ROWSIZE),
    };
  }
  changeRow = (forward) => {
    const { start, end } = this.state;
    const nextEnd = forward ? end + ROWSIZE: end - ROWSIZE;
    const nextStart = forward ? start + ROWSIZE: start - ROWSIZE;
    this.nextRow(nextStart, nextEnd)
  }
  nextRow = (nextStart, nextEnd) => {
    const { imageArray } = this.props;
    const fullRowRemaining = nextStart >= 0 && nextEnd <= imageArray.length;
    const partial = nextStart >= 0 && imageArray.length - nextStart > 0;
    if (fullRowRemaining || partial) {
      this.setState({
        start: nextStart,
        end: nextEnd,
        filtered: imageArray.slice(nextStart, nextEnd)
      });
    }
  }
  mouseOver = (index) =>  {
    this.setState({
      hover: index,
    });
  }
  fillColumns = (filtered) => {
    if (filtered.length < ROWSIZE) {
      return [...Array(ROWSIZE - filtered.length).keys()].map(x => <div key={`fill-${x}`}></div>);
    }
  }
  render() {
    const { start, end, hover, filtered } = this.state;
    const { imageArray } = this.props;
    return (
    <Wrapper>
      <Row>
        <Nav>
          <NavButton prev disabled={start === 0} onClick={() => this.changeRow(false)}/>
        </Nav>
        { filtered.map( (src, index) => 
        <ThumnailWrapper 
          key={`thumb-${index}`} 
          onMouseOver={() => this.mouseOver(index)} 
          onMouseLeave={() => this.mouseOver(null)}
          >
          <Thumbnail index={index} hoverIndex={hover}  width={WIDTH} src={src}/>
        </ThumnailWrapper>)}
        {this.fillColumns(filtered)}
        <Nav>
          <NavButton next disabled={end >= imageArray.length} onClick={() => this.changeRow(true)}/>
        </Nav>
      </Row>
      <Circle/>
     </Wrapper>
     );
  }
};

export default Carousel;