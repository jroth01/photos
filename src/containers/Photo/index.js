import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import NotFound from '../NotFound';
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const PHOTO = (id) => gql`
  query{
    photo(id: "${id}"){
      id
      name
      src
      album {
        id
        photos {
          id
          src
        }
      }
    }
  }
`

const Viewer = styled.div`
  height: 100vh;
  text-align:center;
`;

const newURL = (url, photoId) => {
  const path = url.split('/');
  path.pop()
  path.push(`${photoId}`);
  return path.join('/');
}

const Previous = withRouter( ({ history, photo, prev, index, match }) => {
  if (!prev) {
    return <Btn disabled>Prev</Btn>
  } else {
    const album = photo.album;
    const previousPhoto =  album.photos[index - 1]; 
    const prevURL = newURL(match.url, previousPhoto.id); 
    console.log('prev', prevURL);
    return <Btn onClick={() => { history.push(prevURL) }}>Prev</Btn>
  }
});

const Next = withRouter( ({ history, photo, next, index, match }) => {
  if (!next) {
    return <Btn disabled>Next</Btn>
  } else {
    const album = photo.album;
    const nextPhoto =  album.photos[index + 1]; 
    const nextURL = newURL(match.url, nextPhoto.id);
    console.log('next', nextURL);
    return <Btn onClick={() => { history.push(nextURL) }}>Next</Btn>
  }
});

const NavButtons = (props) => (
  <div>
    <Previous {...props}/>
    <Next {...props}/>
  </div>
);

class ImageViewer extends Component {
  constructor(props) {
    super(props);
    const { photo } = this.props;
    const album = photo.album;
    const index = album.photos.map(photo => photo.id).indexOf(photo.id);
    console.log(index, album)
    this.state = {
      index: index,
      next: index + 1 < album.photos.length,
      prev: index - 1 >= 0,
    }
  }
  render() {
    return (
    <Viewer>
      {/* <NavButtons {...this.state} {...this.props}/> */}
      <Image {...this.props}/>
    </Viewer>)
  }
}

const Img = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const Btn = styled.button`
  display:inline-block;
  margin: 8px;
`;

const WIDTH = '100%';

const Image = ({photo}) => (
  <div>
    <Img key={photo.id} width={WIDTH} src={photo.src} /> 
  </div>
);

class Photo extends Component{
  render() {
    const id = this.props.match.params.id.toString()
    return (<Query query={PHOTO(id)}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>{error.message}</div>
          if (!data.photo) return <NotFound/>
          return (
            <Fragment>
             <ImageViewer {...data} {...this.props}/>
            </Fragment>
          )
        }}
      </Query>)
  }
}

export default Photo;