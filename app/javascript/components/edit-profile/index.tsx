import * as React from 'react';
import Icon from 'supercons';
import { PageContext } from '../as-page';

import TextInput from '../inputs/text';
import SelectInput from '../inputs/select';
import Button from '../inputs/button';
import Panel from '../panel';

import ProfileType from '../models/profile';
import ProfileInputSchema from '../models/profile_input_schema';

import useProfileData from '../profile/query';

import useEditProfile from './mutation';



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
const ProfileForm = (props : ProfileFormProps) => {
  const { showToast } = React.useContext(PageContext);
  const [ editProfile,{ loading }] = useEditProfile();
  const initialValues = props.profile;

  function handleSubmit(values, actions){
    const payload = ProfileInputSchema.cast(values, {stripUnknown: true});
    editProfile({variables: { profile: payload }}).then( () => {
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
                <SelectInput id='age' name='age' label='Age' disabled={loading}>
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
                </div>
                <div className='pt-2'>
                </div>
              </div>
            </Form>
        </Formik>
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
                    <Icon glyph='settings' />
                    <div>
                      Preferences 
                    </div>
                  </h2>
                </div>
                <div className='py-2'>
                </div>
                <div className='pt-2'>
                </div>
              </div>
            </Form>
        </Formik>
      </Panel>


    </div>
  )
}

export default EditProfile;
