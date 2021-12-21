import * as React from 'react';

interface PanelProps {
  children: React.ReactNode;
}
const Panel = (props) => (
  <div className='rounded p-3 mt-2 bg-gray-200 border-gray-300 border-solid border'>
    { props.children }
  </div>
);

export default Panel;
