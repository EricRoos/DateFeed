import * as React from 'react';
import { PageContext } from '../as-page';
import { gql, useMutation } from "@apollo/client";
import Icon from 'supercons';

import ProfileType from '../models/profile';
import Button from '../inputs/button';

const MUTATION = gql`
  mutation ($file: Upload!) {
    addPhoto(file: $file) {
      profileImage {
        id
        url
      }
    }
  }
`;

interface Props {
  profile: ProfileType;
}
function ImageUpload( props : Props ) {
  const { showToast } = React.useContext(PageContext);
  const [mutate, { loading, error }] = useMutation(MUTATION);
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
    mutate({
      update: (cache, result) => {
        const newProfileImage = result.data.addPhoto.profileImage;
        cache.modify({
          id: cache.identify({...props.profile}),
          fields: {
            profileImages(existingImages = [], { readField }) {
              const newProfileImageRef = cache.writeFragment({
                data: newProfileImage,
                fragment: gql`
                  fragment NewProfileImage on ProfileImage {
                    id
                    url
                  }
                `
              });
              return [...existingImages, newProfileImageRef];
            }
          }
        });
      },
      variables: { file: image }
    }).then( () => {
      setImage(undefined);
      showToast('Image Saved');
    });
  }
  if(error){
    return (
      <div>
        <p>Something went wrong.</p>
        <p>{error.message}</p>
      </div>
    )
  }
  return (
    <div className='divide-y divide-gray-300'>
      <div className='pb-2'>
        Add New Image
      </div>
      <div className='pt-2 pb-2'>
          <label>
            <div className='drop-shadow w-full aspect-[9/16] bg-gray-200 border border-solid border-gray-300 flex justify-center items-center cursor-pointer'>
              {!image && (
                <Icon glyph='plus-fill' />
              )}
              {!!image && (
                <img src={URL.createObjectURL(image)} className='' />
              )}
            </div>
            <input type="file" required onChange={setValidImage} className='hidden'/>
          </label>

      </div>
      { !!image && (
        <div className='pt-2 pb-2'>
          <div className='flex flex-col gap-2'>
            <Button className='flex w-full justify-center' onClick={saveImage}>{ loading ? 'Saving' : 'Save' }</Button>
            <Button className='flex w-full justify-center bg-gray-300' onClick={ () => setImage(undefined) }>Clear</Button>
          </div>
        </div>
      ) }
    </div>
  );
}

export default ImageUpload;
