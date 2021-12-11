// Entry point for the build script in your package.json
import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './components/hello';

const helloContainer = document.getElementById('root');
if(!!helloContainer){
  ReactDOM.render(<Hello/>, helloContainer);
}
