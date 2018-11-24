import React, {Component, Fragment} from 'react';
import {Link } from 'react-router-dom'
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

const ImageList = ({album}) => (
  <div>
    {album.photos.map(photo => 
      <span key={photo.id}>
        <Link to={`/album/${album.id}/photo/${photo.id}`}>
        <img width={200} height={200 / (16/9)} src={photo.src} />
        </Link>
      </span>
    )}
  </div>
);

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