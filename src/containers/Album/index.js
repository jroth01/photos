import React, {Component, Fragment} from 'react';
import {Link } from 'react-router-dom'
import styled from 'styled-components';
import NotFound from '../NotFound';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const ALBUM = (id) => gql`
  query{
    album(id: "${id}"){
      id
      name
      date
      photos {
        id
        src
        avatar
        thumb
      }
    }
  }
`

const AlbumHeader = ({album}) => (
  <div>
  <h1 style={{margin:0}}>Album: {album && album.name}</h1>
  {album && <small> Date: {album.date}</small>}
  </div>
);

const WIDTH = 200;

const Wrapper = styled.span`
  overflow: hidden;
  position: relative;
`;


const Image = styled.img`
  // width: 100%;
  padding: 8px;
  // max-width: 200px;
  // height:auto;
`


class ProgressiveImg extends Component {
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
      <Wrapper>
        <Image width= {WIDTH} height={WIDTH /(16/9)} {...this.state} onLoad={() => this.setLoaded()} hidden={!this.state.loaded} src={photo.thumb || photo.src} />
        <Image width= {WIDTH} height={WIDTH /(16/9)}  {...this.state} hidden={this.state.loaded} src={photo.avatar} />
      </Wrapper>
    );
  }
}

const ImageList = ({album}) => {
  return (
  <div>
    {album.photos.map(photo => 
      <span key={photo.id}>
        <Link to={`/album/${album.id}/photo/${photo.id}`}>
        <ProgressiveImg photo={photo}/>
        {/* <Image width={WIDTH} height={WIDTH / (16/9)} src={photo.thumb || photo.src} /> */}
        </Link>
      </span>
    )}
  </div>
)};

class Album extends Component {
  render() {
    const id = this.props.match.params.id.toString()
    return (<Query query={ALBUM(id)}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) {
            return (<div>{error.message}</div>)
          }
         
          if (!data.album) return <NotFound/>
          return (
            <Fragment>
              <AlbumHeader {...data}/>
              <ImageList {...data}/>
            </Fragment>
          )
        }}
      </Query>)
  }
}

export default Album;