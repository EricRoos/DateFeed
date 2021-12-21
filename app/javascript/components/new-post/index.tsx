import * as React from 'react';

import {
  Formik,
  Form,
} from 'formik';
import { Navigate, Route } from 'react-router-dom';

import { PageContext } from '../as-page';


import TextInput from '../inputs/text';
import useCreatePost from './mutation';
import PostInputType from '../models/post_input_type';
import PostInputSchema from '../models/post_input_schema';
import Panel from '../panel';

import Button from '../inputs/button';

const NewPost = () => {
  const initialValues = { content: '' }
  const { showToast } = React.useContext(PageContext);

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
        showToast('Post saved');
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
    <Panel>
      <div className='divide-y divide-gray-300'>
        <div>
          <h1 className='text-xl'>Write Post</h1>
        </div>
        <div className='pt-2'>
          <p className='text-gray-600 text-sm'>Lorem Ipsum</p>
          <Formik
            initialValues={initialValues}
            validationSchema={PostInputSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className='mb-2'>
                <TextInput id='content' name='content' type='text' label='Content' />
              </div>
              <Button type='submit' disabled={!!loading} >{ !!loading ? 'Sharing...' : 'Share'}</Button>
            </Form>
          </Formik>
        </div>
      </div>
    </Panel>
  )
};

export default NewPost;
