import * as React from 'react';

import {
  useField,
  FieldHookConfig
} from 'formik';

interface OtherSearchFieldProps {
  label : string
}

const InputOption = ({children, ...props}) => (
  <option {...props}>{children}</option>
);

const SelectInput = ({ label,children, ...props} : OtherSearchFieldProps & FieldHookConfig<string>) => {
   const [field, meta, helpers] = useField(props);
   return (
     <div className=''>
       <label className='font-semibold block mb-1 text-md'>
         {label}
       </label>
       <select {...field} className='text-black w-full border border-solid border-gray-300 bg-gray-100 px-4 py-2 rounded-lg focus:outline-none'>
         {children}
       </select>
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </div>
   );
};

SelectInput.Option = InputOption;

export default SelectInput;
