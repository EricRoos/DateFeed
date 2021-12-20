import * as React from 'react';

import TextInput from '../inputs/text';
import Button from '../inputs/button';

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

interface EditProfileFields {
  name: String;
  age: Number;
}


const EditProfile = () => {
  const initialValues = {};

  function handleSubmit(values, actions){
  }
  return (
    <div className='shadow rounded p-3 mt-2 bg-gray-800 text-white'>
      <h1 className='text-xl'>Edit Info</h1>
      <hr/>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className='mb-2'>
            <TextInput id='name' name='name' type='text' label='Name' />
          </div>
          <div className='mb-2'>
            <TextInput id='age' name='age' type='number' label='Age' />
          </div>
          <Button type='submit'>Edit</Button>
        </Form>
      </Formik>
    </div>
  )
}

export default EditProfile;
