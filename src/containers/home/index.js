import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const ALBUMS_QUERY = gql`
  query{
    albums{
      id
      name
      date
    }
  }
`

class Home extends Component {
  render() {
    return (
      <Query query={ALBUMS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>{error.message}</div>
          if (!data.albums) return <div>No albums</div>
          return (
            <Fragment>
              <h1 style={{margin:0}}>Albums</h1>
              <ul>
                {data.albums.map(album => 
                <li key={album.id}>
                  <Link to={`/album/${album.id}`}>
                    {album.name} - <small>{album.date}</small>
                  </Link>
                </li>
                )}
              </ul>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default Home
