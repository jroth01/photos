import React, { Component } from 'react';
import styled from 'styled-components';

const StyledImg = styled.img`
  width: 100%;
  padding: 8px;
  max-width: 300px;
  height:auto;
`;

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }
  setLoaded = () => {
    this.setState({loaded: true});
  }
  render() {
    const {photo} = this.props;
    return (
      <span>
        <StyledImg hidden={!this.state.loaded} {...this.state} onLoad={() => this.setLoaded()} src={photo.thumb || photo.src} />
        <StyledImg hidden={this.state.loaded}  {...this.state} src={photo.avatar} />
      </span>
    );
  }
};

export default Image;