import * as React from 'react';
import Toast from '../toast';

interface PageContextValues {
  showToast: Function;
}
const iniContextValues : PageContextValues = {
  showToast: () => {
    console.warn('calling initial toast impl');
  }
};

export const PageContext = React.createContext(iniContextValues);

const asPage = (Component) => {
  return function Page(props) {
    const [ currentToast, setToast ] = React.useState(undefined);
    const ttl = 1500;

    const showToast = (message) => {
      setToast(message);
      setTimeout( () => setToast(undefined), ttl);
    }

    return (
      <PageContext.Provider value={{showToast}}>
        { <Component {...props} /> }
        { currentToast && <Toast message={currentToast} /> }
      </PageContext.Provider>
    )
  };
}


export default asPage;
