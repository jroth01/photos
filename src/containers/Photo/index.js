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
    }
  }
`

const Viewer = styled.div`
  height: 100vh;
  text-align:center;
`;

const Img = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const Btn = styled.button`
  display:inline-block;
  margin: 8px;
`;

const Image = ({photo}) => (
  <div>
    <Img key={photo.id} width={200} height={200/ (16/9)} src={photo.src} /> 
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
              <Viewer>
                <Image photo={data.photo}/>
                <Btn disabled>previous</Btn>
                <Btn disabled>next</Btn>
              </Viewer>
            </Fragment>
          )
        }}
      </Query>)
  }
}

export default Photo;