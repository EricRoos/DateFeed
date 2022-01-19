import * as React from 'react';
import {
  gql
} from "@apollo/client";

import Modal from 'react-modal';

import Icon from 'supercons';
import { PageContext } from '../as-page';

import TextInput from '../inputs/text';
import SelectInput from '../inputs/select';
import Button from '../inputs/button';
import Toggle from '../inputs/toggle';

import Panel from '../panel';

import ProfileType from '../models/profile';
import ProfileInputSchema from '../models/profile_input_schema';

import useProfileData from '../profile/query';

import useEditProfile from './mutation';
import { MutationResponse } from './mutation';

import ImageUpload from '../image-upload';


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


function AgeOptions(){
  let options = [];
  for(let i = 18; i < 100 ; i++){
    options.push(<SelectInput.Option key={i} value={i}>{i}</SelectInput.Option>);
  }
  return options;
}

interface ProfileFormProps {
  profile: ProfileType;
}

const ProfilePreferences = () => {
  return (
    <Formik
      initialValues={{darkMode: false}}
      onSubmit={(values) => {
        const {
          darkMode
        } = values;
        const bodyEle = document.querySelector("html")
        if(darkMode){
          bodyEle.classList.add("dark");
        }else{
          bodyEle.classList.remove("dark");
        }
      }}
    >
      {({handleChange,submitForm}) => (
        <Form>
          <div className='flex p-2'>
            <div className='flex-grow'>Dark Mode</div>
            <div className='flex-shrink text-right'>
              <Toggle name='darkMode' id='darkModeToggle' onChange={ (ev) => { handleChange(ev); submitForm(); } }/>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const ProfileForm = (props : ProfileFormProps) => {
  const { showToast } = React.useContext(PageContext);
  const [ editProfile,{ client, loading }] = useEditProfile();

  const initialValues = props.profile;

  function handleSubmit(values, actions){
    editProfile({
      update: (cache, result) => {
        cache.writeFragment({
          id: cache.identify({...result.data.editProfile.profile}),
          fragment: gql`
            fragment DeltaProfile on Profile {
              name
              age
            }
          `,
          data: result.data.editProfile.profile,
        })
      },
      variables: { profile: {
        name: values.name,
        age: !!values.age ? parseInt(values.age) : null
      }}
    }).then( (resp) => {
      showToast('Profile updated');
    });
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
        <Form>
          <div className='divide-y divide-gray-300'>
            <div className='pb-2'>
              <h2 className='text-lg flex items-center gap-2'>
                <Icon glyph='profile' />
                <div>
                  Information
                </div>
              </h2>
            </div>
            <div className='py-2'>
              <div className='mb-2'>
                <TextInput id='name' name='name' type='text' label='Name' disabled={loading}/>
              </div>
              <div className='mb-2'>
                <SelectInput as='number' id='age' name='age' label='Age' disabled={loading}>
                  <SelectInput.Option value=''>{''}</SelectInput.Option>
                  { AgeOptions() }
                </SelectInput>
              </div>
            </div>
            <div className='pt-2'>
              <Button disabled={loading} type='submit'>{ loading ? 'Saving' : 'Save' }</Button>
            </div>
          </div>
        </Form>
    </Formik>
  );
};
const EditProfile = () => {
  const { loading, error, data } = useProfileData(null);
  const [ isAddImageOpen, setIsAddImageOpen ] = React.useState(false);

  if(loading){
    return (
      <p>loading...</p>
    );
  }
  if(error) {
    return (
      <p>Something went wrong</p>
    )
  }
  return (
    <div>
      <Panel>
        <div className='py-3'>
          <h1 className='text-2xl flex items-center'>
            <div className='tracking-wider'>
              My Profile
            </div>
          </h1>
        </div>
      </Panel>

      <Panel>
        <ProfileForm profile={data.profile} /> 
      </Panel>

      <Panel>
        <Formik
          initialValues={{}}
          onSubmit={() => {}}
        >
            <Form>
              <div className='divide-y divide-gray-300'>
                <div className='pb-2'>
                  <h2 className='text-lg flex items-center gap-2'>
                    <Icon glyph='photo-fill'/>
                    <div>
                      Pics 
                    </div>
                  </h2>
                </div>
                <div className='py-2'>
                  <Modal className='dark:bg-slate-900 bg-gray-100' style={{content: {...Modal.defaultStyles.content, backgroundColor: undefined, zIndex: 30, height: '80vh'}}} isOpen={isAddImageOpen}>
                    <button className='absolute top-4 right-4' onClick={() => setIsAddImageOpen(false) }>
                      <Icon glyph='view-close' />
                    </button>
                    <ImageUpload profile={data.profile} />
                  </Modal>
                  <Button onClick={ () =>setIsAddImageOpen(true) }>
                    <span className='text-sm'>Add Photo</span>
                  </Button>
                </div>
                <div className='pt-2'>
                  <div className='flex flex-wrap gap-4 justify-between'>
                    { data.profile.profileImages.map( profileImage => (
                      <div className='w-1/5 aspect-ratio-[9/16] bg-gray-300 flex justify-center items-center' key={profileImage.id}>
                        <img src={profileImage.url} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Form>
        </Formik>
      </Panel>

      <Panel>
        <div className='divide-y divide-gray-300'>
          <div className='pb-2'>
            <h2 className='text-lg flex items-center gap-2'>
              <Icon glyph='settings' />
              <div>
                Preferences 
              </div>
            </h2>
          </div>
          <div className='py-2'>
            <ProfilePreferences />
          </div>
        </div>
      </Panel>
    </div>
  )
}

export default EditProfile;
