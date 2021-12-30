// Entry point for the build script in your package.json
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import Toast from './toast';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink
} from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";

import Profile from './profile';
import ActivityFeed from './activity-feed';
import Search from './search';
import TimeLine from './time-line';
import NewPost from './new-post';
import Nav from './nav';
import EditProfile from './edit-profile';
import Geolocation from './geolocation';

import asPage from './as-page';

const appToken = document.querySelector('meta[name=app_token]').getAttribute('content');

const csrfTokenElement = document.querySelector('meta[name=csrf-token]')
let csrfToken = '';
if(!!csrfTokenElement){
  csrfToken = csrfTokenElement.getAttribute('content');
}
const client = new ApolloClient({
  link: new createUploadLink({
    uri: '/graphql',
    credentials: 'same-origin',
    headers: {
      'X-CSRF-Token': csrfToken,
      'X-ApiToken': appToken,
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

const appContainer = document.getElementById('root');

const App = () => (
  <>
    <Nav />
    <div id='app' className='container px-3'>
      <Routes>
        <Route path='/' element={<ActivityFeed />} />
        <Route path='/me' element={<EditProfile />} />
        <Route path='/search' element={<Search />} />
        <Route path='/new-post' element={<NewPost/>} />
      </Routes>
    </div>
    <Geolocation/>
  </>
);
const AppWithRouter = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

const Page = asPage(AppWithRouter);

renderComponent(<Page/>, appContainer);
