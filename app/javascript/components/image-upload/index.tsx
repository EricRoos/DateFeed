import * as React from 'react';
import { PageContext } from '../as-page';
import { gql, useMutation } from "@apollo/client";
import Icon from 'supercons';

import Button from '../inputs/button';

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
  const { showToast } = React.useContext(PageContext);
  const [mutate] = useMutation(MUTATION);
  const [ image, setImage ] = React.useState(undefined);


  function setValidImage({target}){
    const {
      validity,
      files: [file],
    } = target;
    if (validity.valid){
      setImage(file)
    }
  }
  function saveImage(){
    mutate({ variables: { file: image } }).then( () => {
      setImage(undefined);
      showToast('Image Saved');
    });
  }
  return (
    <div className='divide-y divide-gray-300'>
      <div className='pb-2'>
        Add New Image
      </div>
      <div className='pt-2 pb-2'>
          <label>
            <div className='drop-shadow aspect-[9/16] w-full aspect-video bg-gray-200 border border-solid border-gray-300 flex justify-center items-center cursor-pointer scale-75'>
              {!image && (
                <Icon glyph='plus-fill' />
              )}
              {!!image && (
                <img src={URL.createObjectURL(image)} className='w-full h-auto' />
              )}
            </div>
            <input type="file" required onChange={setValidImage} className='hidden'/>
          </label>

      </div>
      { !!image && (
        <div className='pt-2 pb-2'>
          <div className='flex flex-col gap-2'>
            <Button className='flex w-full justify-center' onClick={saveImage}>Save</Button>
            <Button className='flex w-full justify-center bg-gray-300' onClick={ () => setImage(undefined) }>Clear</Button>
          </div>
        </div>
      ) }
    </div>
  );
}

export default ImageUpload;
