import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import NotFound from '../NotFound';
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

const Img = styled.img`
  width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const Image = ({photo}) => (
  <div>
    <Img key={photo.id} src={photo.src} /> 
  </div>
);

const Viewer = styled.div`
  height: 100vh;
  text-align:center;
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
              <Viewer>
                <Image {...data} {...this.props}/>
              </Viewer>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default Photo;