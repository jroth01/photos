import React, {Component, Fragment} from 'react';
import NotFound from '../NotFound';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Heading from '../../components/Heading';
import ImageList from '../../components/ImageList';

export const ALBUM_BY_ID = (id) => gql`
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
`;

class Album extends Component {
  render() {
    const id = this.props.match.params.id.toString();
    return (<Query query={ALBUM_BY_ID(id)}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) {
            return (<div>{error.message}</div>)
          }
          if (!data.album) return (<NotFound/>)
          const { album } = data;
          return (
            <Fragment>
              <Heading title={`Album: ${album.name}`}>
                {album && <small> Date: {album.date}</small>}
              </Heading>
              <ImageList {...data}/>
            </Fragment>
          )
        }}
      </Query>)
  }
}

export default Album;