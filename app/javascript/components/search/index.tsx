import * as React from 'react';

import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  useField,
  FieldHookConfig
} from 'formik';

interface SearchFields {
  minAge: number;
  maxAge: number;
}

interface OtherSearchFieldProps {
  label : string
}
const SearchField = ({ label, ...props} : OtherSearchFieldProps & FieldHookConfig<string>) => {
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


const Search = () => {
  const initialValues: SearchFields = { minAge: 18, maxAge: 99 }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log(values);
      }}
    >
      <Form>
        <div>
          <SearchField id='minAge' name='minAge' type='number' label='Min Age' />
        </div>
        <div>
          <SearchField id='maxAge' name='maxAge' type='number' label='Max Age' />
        </div>
        <button type='submit'>Search</button>
      </Form>
    </Formik>
  )
}

export default Search;
