import * as React from 'react';

import {
  useField,
  FieldHookConfig
} from 'formik';

interface OtherSearchFieldProps {
  label : string
}
const TextInput = ({ label, ...props} : OtherSearchFieldProps & FieldHookConfig<string>) => {
   const [field, meta, helpers] = useField(props);
   return (
     <div className=''>
       <label className='text-gray-800 font-semibold block my-3 text-md'>
         {label}
       </label>
       <input {...field} type={props.type} className='w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none'/>
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </div>
   );
};

export default TextInput;
