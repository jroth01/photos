import React, {Component, Fragment} from 'react';
import NotFound from '../NotFound';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ImageViewer from '../../components/ImageViewer';

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
`;

class Photo extends Component{
  render() {
    const id = this.props.match.params.id.toString()
    return (
      <Query query={PHOTO(id)}>
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
      </Query>
    )
  }
}

export default Photo;