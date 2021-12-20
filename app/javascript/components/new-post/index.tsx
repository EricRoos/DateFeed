import * as React from 'react';

import {
  Formik,
  Form,
} from 'formik';
import { Navigate, Route } from 'react-router-dom';

import TextInput from '../inputs/text';
import useCreatePost from './mutation';
import PostInputType from '../models/post_input_type';
import PostInputSchema from '../models/post_input_schema';

import Button from '../inputs/button';

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

  if(called && !loading && !data.createPost.errors.length){
    return (
      <Navigate to='/' replace />
    )
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
        <Button type='submit' disabled={!!loading} >{ !!loading ? 'Sharing...' : 'Share'}</Button>
      </Form>
    </Formik>
  )
};

export default NewPost;
