import * as React from 'react';

import {
  Formik,
  Form,
} from 'formik';

import TextInput from '../inputs/text';
import useCreatePost from './mutation';
interface NewPostFields {
  content: String;
}
const NewPost = () => {
  const initialValues: NewPostFields = { content: '' };

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
