// Entry point for the build script in your package.json
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Hello from './hello';

const helloContainer = document.getElementById('root');
if(!!helloContainer){
  const profile={id: 2}
  ReactDOM.render(<Hello profile={profile}/>, helloContainer);
}
