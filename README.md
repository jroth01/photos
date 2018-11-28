# Photos

**An example React + React-Router photo album app using the Apollo GraphQL Client**.

The home page is a list of links to photo albums. The links take the user to an album page with a list of photos. The photos are clickable to open in a new photo detail page. 

**Note**: Depends on the companion [graphql server](www.github.com/jroth/01/graphql-photos-server) to also be running. By default the `server` will run and be recognized on `localhost:4000`. 

# Run Locally

1. First, clone the companion [graphql server](www.github.com/jroth/01/graphql-photos-server) and follow the steps in that repo's README to run it locally.

2. Once the graphql server is up and running, clone this repo and run:

```
npm install && npm start
```

# Heroku Deployment

The react app is deployed for free on Heroku. The server is deployed separately, also on Heroku. 

Because it's free tier, Heroku will put both the client and server dynos to sleep when not in use. (That way they can save on AWS costs and provide a convenient PaaS to hobbyists)

If no one visits the app in some time, Heroku must first wake the client app. 

Once active, the client app tries to connect to the server, which Heroku must also wake. 

## *TL;DR*

_The first page load will be slow if no one has visited the free tier Heroku app(s) in some time!_ 

Free tier Heroku apps are sleepy. You get what you pay for :) 

## Links to Deployed Client + GraphQL Server

[Photos App on Heroku](https://graphql-photos-app.herokuapp.com)


[Companion Graphql Server +  Query Playground](https://graphql-photos.herokuapp.com)

## Build Config
Build configuration is extremely minimal thanks to `create-react-app`. It abstracts away bundling and minification so one can quickly prototype and focus on development. 

The Heroku react buildpack references the [`static.json`](./static.json), which allows index.js to hanldle the app's declarative routing. 





# Declarative Routing 

Delarative routing ensures a user can access content directly via url without navigating through a contextual heirarchy. In this case, the user can enter a url to go directly to an album or an individual photo within an album.  

# Implementation w/ React-Router

The basic routing setup uses react-router's `Switch`. Swtich attempts to match a url to a route and render the appropriate component. If there is no match, it renders a `NotFound` 404 page.  


Here's an example from /routes/AlbumSwitch.js 

```jsx
import React, {Component} from 'react'
import { Switch, Route } from "react-router-dom";
import NotFound from '../containers/NotFound';
import Album from '../containers/Album';
import Home from '../containers/Home';
import Photo from '../containers/Photo';

class AlbumSwitch extends Component {
  render() {
    let { location } = this.props;
    return (
      <div>
        <Switch location={location}>
          <Route exact path="/" component={Home} />
          <Route exact path="/album/:id" component={Album} />
          <Route exact path="/album/:id/photo/:id" component={Photo} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default AlbumSwitch;
```
Each route maps to an individual page (React component) of the application defined under `/containers`. 

The base route `/` takes the user to the `Home` page. 

An unrecognized route, such as `/foo`, will render the `NotFound` component. 

# Parameterized and Nested Routes

React-Router supports route parameters for urls to dynamic content.

Take for example the following route that allows a user to access albums directly by url

```
<Route exact path="/album/:id" component={Album} />
```

The route `/album/:id` accepts a single parameter: an `id` .

As one might guess, `/:id` in the url corresponds to a unique id of an album returned by the server. 

## Using url parameters within a component
That `id` parameter from the url passed to the `props` of the matching route's `Album` component via `match.params`.

React-router makes parameters automatically accessible within the `Album` component's props as
```js
match.params.id
```

The `Album` component uses the parameter to fetch data for the entity with that `id`, and do whatever with the response. 

## Nesting routes with parameters

React-router lets you combine route parameters with nested routes. 


Take for example the route to an individual photo within an album:
```
<Route exact path="/album/:id/photo/:id" component={Photo} />
```

The route `/album/:id/photo/:id` accepts two `:id` parameters. The first corresponds to a unique album id, the second is the unique id of photo within that album. 

The nested url reflects the fact that photos are child entities of albums.

Just like before, the `Photo` component uses the id parameters to fetch data. 

Moving on to fetching that data with GraphQL + the Apollo Client . 

# What's GraphQL?

GraphQL exposes a single endpoint through which a client can execute queries and define the structure of the data it receives. 

It's an alternative to REST.

One can use it directly over a database, or indirectly as a layer over legacy REST apis. 

# Why Use GraphQL?
The beauty of graphql is it's simplicity.

**There's just one endpoint** - not a series of imperatively defined endpoints.

**It's self documenting**. It exposes it's typed schema directly to the client, so there's no ambiguity about the response to a query. 

**You get exactly and only what you ask for**. The query result provides the minimal amount of data needed, delivered in the structure the client actually uses. 

Legacy rest APIS exist at every major company, and usually repond with extraneous data in a convoluted, ever-changing structure.  GraphQL allows you to make response payloads tiny and predicatable.

Integrating GraphQL over a REST api allows you to remove large amounts of a client side codebase related to fetching, awaiting, parsing, and restructuring api payloads. Same with state management boilerplate. 

You effectively offload that work to your GraphQL server, which is a more sensible place for data-pruning tedium. That way you can keep your UI as stupid and stateless as possible. 

Tiny payloads = no parsing = less client side code.


# Fetching with Apollo GraphQL Client

The Apollo client allows for decalarative data fetching from a GraphQL endpoint in React.

## Forming a query with `graphql-tag`
Here's an example of the query executed from the `Home` page. It gets an array of albums from a graphql endpoint. 

The query is written using `graphql-tag`, which allows one to form queries using ES6 template literals. 

```js
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
```

The above dictates a query on `albums`. It defines the exact JSON object structure of all objects returned in the resulting array.

Each album object will be returned with only 3 properties:
```gql
{
  id
  name
  date
}
```
## Using the query with the `Apollo Client`

The Apollo Client's `Query` component takes in a query and exposes the result to it's children. 

The result is _declarative AF_. 

Here's the entire `Home` page in 35 lines.


```js
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
```

Based on the state of the query, the UI renders itself accordingly.

All properties of the response `data` are passed to the `<AlbumList>`   : 
```
  <Fragment>
      <AlbumList {...data} />
  </Fragment>
```

In this case, the `data` object just contains one property, `albums`, so use of the spread operator here is admittedly lazy.

 But if we changed the query to retrieve additional properties other than `albums`, it would automatically pass them to `<AlbumList>` with no code change needed in the component. 


# GraphQL Results + Declarative Routing

How does `<AlbumList/>` use the query result with dynamic routing?

Using the `Link` component from `React-Router`, we can wrap each list item in a link to one of the app's parameterized routes. 

That way, the user can click on a link to an album and be taken to it's page. The url will be updated in the browser with history preserved. 

Here's the `AlbumList` component. It just maps over the album array and renders a link for each album:
```js
import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../Heading';

const AlbumList = ({albums}) => (
  <div>
    <Heading title="Albums"/>
    <ul>
      {albums.map(album => 
      <li key={album.id}>
        <Link to={`/album/${album.id}`}>
          {album.name} - <small>{album.date}</small>
        </Link>
      </li>
      )}
    </ul>
  </div>
);

export default AlbumList;
```

What a beautifully dumb component! It's completely stateless. It's just based on the `albums` prop, which contains the minimal amount of data needed in a flat structure.

All it does is render itself accordingly. 

No parsing logic needed from either the parent `Home`, or child `AlbumList

# Cached Queries

The Apollo Client is configured to use in-memory caching, which helps reduce the amount of state management needed. 

Repeated visits to the same pages directly via browser url or hyperlink will execute the same query, but the results are returned from memory rather than re-fetched over the network. 

```js
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})
```









