import * as React from 'react';

import useSearch from './query';
import TextInput from '../inputs/text';

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


const Search = () => {
  const initialValues: SearchFields = { minAge: 18, maxAge: 99 }
  const { setSearchVars, error, profiles, loading } = useSearch(initialValues);

  function handleSubmit(values, actions){
    setSearchVars(values);
  }
  return (
    <div>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <TextInput id='minAge' name='minAge' type='number' label='Min Age' />
            </div>
            <div>
              <TextInput id='maxAge' name='maxAge' type='number' label='Max Age' />
            </div>
            <button type='submit'>Search</button>
          </Form>
        </Formik>
      </div>
      <div>
        <ul>
          { !error && !loading && !!profiles.length && profiles.map( d =>(
            <li>[{d.id}]{d.name}({d.age})</li>
          )) }
        </ul>
      </div>
    </div>
  )
}

export default Search;
