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
  HttpLink,
  ApolloLink,
  useSubscription
} from "@apollo/client";

import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';

import { createConsumer } from '@rails/actioncable';

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
const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription'
  )
}

const wsHost = window.location.origin.replace("http", "ws") +"/cable";
const cable = createConsumer(wsHost);


const link = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({cable}),
  new createUploadLink({
    uri: '/graphql',
    credentials: 'same-origin',
    headers: {
      'X-CSRF-Token': csrfToken,
      'X-ApiToken': appToken,
    }
  }),
);
const client = new ApolloClient({
  link,
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

const withGeoLocation = (Component) => {
  return function withGeoLocation(props){
    return (
      <Geolocation>
        <Component {...props} />
      </Geolocation>
    )
  }
};

const ActivityFeedPage = withGeoLocation(ActivityFeed);
const EditProfilePage = withGeoLocation(EditProfile);
const SearchPage = withGeoLocation(Search);
const NewPostPage = withGeoLocation(NewPost);
const NoLocationDataPage = () => (
  <div>
    No Location Data
  </div>
)
const App = () => (
  <>
    <Nav />
    <div id='app' className='container px-3'>
      <Routes>
        <Route path='/' element={<ActivityFeedPage />} />
        <Route path='/me' element={<EditProfilePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/new-post' element={<NewPostPage />} />
        <Route path='/no-location-data' element={<NoLocationDataPage />} />
      </Routes>
    </div>
  </>
);
const AppWithRouter = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

const Page = asPage(AppWithRouter);

renderComponent(<Page/>, appContainer);
