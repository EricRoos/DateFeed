// Entry point for the build script in your package.json
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink
} from "@apollo/client";

import Profile from './profile';
import ActivityFeed from './activity-feed';


const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
const client = new ApolloClient({
  link: new HttpLink({
    uri: '/graphql',
    credentials: 'same-origin',
    headers: {
        'X-CSRF-Token': csrfToken
    }
  }),
  cache: new InMemoryCache()
});

function renderComponent(component, container){
  if(!!container){
    const provider = (
      <ApolloProvider client={client}>
        {component}
      </ApolloProvider>
    )
    ReactDOM.render(provider, container);
  }
}
const helloContainer = document.getElementById('root');
renderComponent(<ActivityFeed />, helloContainer);
