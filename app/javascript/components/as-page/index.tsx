import * as React from 'react';
import Toast from '../toast';
import{
  gql,
  useSubscription
} from "@apollo/client";

interface PageContextValues {
  showToast: Function;
  resolvedQueries: Object[];
}
const iniContextValues : PageContextValues = {
  showToast: () => {
    console.warn('calling initial toast impl');
  },
  resolvedQueries: []
};

export const PageContext = React.createContext(iniContextValues);

const QueryResolveWatcher = ({children, onNewMessage}) => {
  const query = gql`
    subscription Notifications{
      graphqlResolve {
        result
        jobId
      }
    }
  `

  const { data, loading, error } = useSubscription(
    query
  );

  React.useEffect( () => {
    if(data && !!data.graphqlResolve && !!data.graphqlResolve.result){
      onNewMessage(data.graphqlResolve);
    }
  }, [data]);

  if(loading){
    return null;
  };
  return children;
};

const NotificationWatcher = ({onNewMessage}) => {
  const query = gql`
    subscription Notifications{
      notifications {
        messages
      }
    }
  `

  const { data, loading, error } = useSubscription(
    query
  )
  React.useEffect( () => {
    if(data && !!data.notifications && !!data.notifications.messages){
      data.notifications.messages.forEach( msg => {
        onNewMessage(msg)
      });
    }
  }, [data])

  return null;
};

const asPage = (Component) => {
  return function Page(props) {
    const [ currentToast, setToast ] = React.useState(undefined);
    const [ resolvedQueries, setResolvedQueries ] = React.useState([]);
    const ttl = 3000;

    const showToast = (message) => {
      setToast(message);
      setTimeout( () => setToast(undefined), ttl);
    }

    return (
      <>
        <NotificationWatcher onNewMessage={showToast} />
        <QueryResolveWatcher onNewMessage={(msg) => setResolvedQueries([...resolvedQueries, msg])}>
          <PageContext.Provider value={{showToast, resolvedQueries}}>
            { <Component {...props} /> }
            { currentToast && <Toast message={currentToast} /> }
          </PageContext.Provider>
        </QueryResolveWatcher>
      </>
    )
  };
}


export default asPage;
