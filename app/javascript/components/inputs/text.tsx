import * as React from 'react';

import {
  useField,
  FieldHookConfig
} from 'formik';

interface OtherSearchFieldProps {
  label : string
}
const TextInput = ({ label, ...props} : OtherSearchFieldProps & FieldHookConfig<string>) => {
  const [field, meta, helpers] = useField(props.name);
  const fieldElement = React.createRef<HTMLInputElement>();

  function MarkInvalid(){
    const { current } = fieldElement;
    if(current){
      current.setCustomValidity(meta.error || "");
    }
  }

  React.useEffect( () => {
    MarkInvalid();
  }, [field]);

  return (
    <div className=''>
      <label htmlFor={props.id} className='font-semibold block mb-1 text-md'>
        {label}
      </label>
      <input {...field}
        id={props.id}
        onChange={ (ev) => {
          let val = ev.target.value;
          if(!!val && props.type === 'number'){
            helpers.setValue(parseInt(val));
          }else{
            helpers.setValue(val);
          }
          MarkInvalid();
        }}
        ref={fieldElement}
        disabled={props.disabled}
        type={props.type}
        className='text-black w-full border border-solid border-gray-300 bg-gray-100 px-4 py-2 rounded-lg focus:outline-none invalid:border-red-500'
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextInput;
