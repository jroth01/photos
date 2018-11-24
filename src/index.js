import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import App from './containers/App'

import 'sanitize.css/sanitize.css'
import './index.css'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const GRAPHQL_SERVER = 'http://localhost:4000';

const httpLink = createHttpLink({
  uri:  GRAPHQL_SERVER,
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const target = document.querySelector('#root')

render(
  <ApolloProvider client={client}>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>
  </ApolloProvider>,
  target
)
