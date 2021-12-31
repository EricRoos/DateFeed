import * as React from 'react';

import { useField } from 'formik';

const Toggle = (props) => {
  const [ field, meta, helpers] = useField(props);

  return (
    <label htmlFor={props.id} className="inline-flex items-center cursor-pointer">
      <span className="relative">
        <span className="block w-10 h-6 bg-gray-300 rounded-full shadow-inner"></span>
        <span className={`absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-100 ease-in-out ${ !field.value ? 'bg-white' : 'bg-orange-600 transform translate-x-full'}`}>
          <input {...field} {...props} type="checkbox" className="absolute opacity-0 w-0 h-0"/>
        </span>
      </span>
    </label>
  );
};

export default Toggle;
