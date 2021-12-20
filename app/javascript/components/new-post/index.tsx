import * as React from 'react';

import {
  Formik,
  Form,
} from 'formik';

import TextInput from '../inputs/text';
import useCreatePost from './mutation';
import PostInputType from '../models/post_input_type';
import PostInputSchema from '../models/post_input_schema';

const NewPost = () => {
  const initialValues = { content: '' }

  const [ createPost , {
    error,
    data,
    loading,
    called
  }] = useCreatePost();

  function handleSubmit(values, actions){
    createPost({variables: {postInput: { ...values }}}).then( (resp) => {
      const { post, errors } = resp.data.createPost;
      if(post){
        actions.resetForm();
      }else{
        errors.forEach( e => actions.setFieldError(e.field, e.messages.join(", ")) )
      }
    });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PostInputSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <TextInput id='content' name='content' type='text' label='Content' />
        </div>
        <button type='submit'>Search</button>
      </Form>
    </Formik>
  )
};

export default NewPost;