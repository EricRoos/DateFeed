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
     <>
       <label>
         {label}
         <input {...field} type={props.type} />
       </label>
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </>
   );
};

export default TextInput;
