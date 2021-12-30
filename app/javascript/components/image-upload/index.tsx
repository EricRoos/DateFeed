import * as React from 'react';
import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
  mutation ($file: Upload!) {
    addPhoto(file: $file) {
      profileImage {
        id
      }
    }
  }
`;

function ImageUpload() {
  const [mutate] = useMutation(MUTATION);

  function onChange({target}){
    const {
      validity,
      files: [file],
    } = target;
    console.log(file)
    if (validity.valid) mutate({ variables: { file } });
  }

  return <input type="file" required onChange={onChange} />;
}

export default ImageUpload;
