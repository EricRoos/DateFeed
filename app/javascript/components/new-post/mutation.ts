import * as React from "react";
import {
  useMutation,
  gql,
  MutationTuple,
} from "@apollo/client";

import PostType from '../models/post';
import PostInputType from '../models/post_input_type';
import ValidationErrorType from '../models/validation_error_type';

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($postInput: CreatePostInput!){
    createPost(postInput: $postInput){
      post {
        id
        content
      }
      errors {
        field
        messages
      }
    }
  }

`
interface MutationVariables {
  postInput: PostInputType;
}

interface CreatePostMutationData {
  post: PostType;
  errors: ValidationErrorType[];
}

interface MutationResponse {
  createPost: CreatePostMutationData;
}

const useCreatePost = () => {
  return useMutation<MutationResponse, MutationVariables>(CREATE_POST_MUTATION);
}

export default useCreatePost;
