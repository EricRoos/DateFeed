import * as React from 'react';

import {
  Field
} from 'formik';

const FloatField = ({label, ...props}) => {
  return (
    <div>
      <div className='text-center'>
        <label htmlFor={props.id} className='text-lg text-gray-500 pt-2 pb-6'>{label}</label>
      </div>
      <div >
        <div className="relative z-0 w-full mb-5">
          <Field
            {...props}
            className="text-center pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 border-gray-200"
          />
          <span className="text-sm text-red-600 hidden invalid:show" id="error">is required</span>
        </div>
      </div>
    </div>
  );
}

export default FloatField;
