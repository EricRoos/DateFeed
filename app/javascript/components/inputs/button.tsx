import * as React from 'react';

const Button = ({children, ...props}) => {
  return (
    <button {...props} className='flex items-center px-4 py-2 bg-blue-200 rounded-lg shadow-xs cursor-pointer hover:bg-blue-500 hover:text-gray-100'>
      {children}
    </button>
  );
}

export default Button;
