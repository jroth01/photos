import React, { Component, Fragment } from 'react';
import AlbumList from '../../components/AlbumList';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const ALBUMS_ALL = gql`
  query{
    albums{
      id
      name
      date
    }
  }
`;

class Home extends Component {
  render() {
    return (
      <Query query={ALBUMS_ALL}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>{error.message}</div>
          if (!data.albums) return <div>No albums</div>
          return (
            <Fragment>
              <AlbumList {...data} />
            </Fragment>
          )
        }}
      </Query>
    )
  }
};

export default Home;
