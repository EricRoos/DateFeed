import * as React from 'react';
import Icon from 'supercons';

import TextInput from '../inputs/text';
import SelectInput from '../inputs/select';
import Button from '../inputs/button';
import Panel from '../panel';


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

const EditProfile = () => {
  const initialValues = {};

  function handleSubmit(values, actions){
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
                    <TextInput id='name' name='name' type='text' label='Name' />
                  </div>
                  <div className='mb-2'>
                    <SelectInput id='age' name='age' label='Age'>
                      <SelectInput.Option value=''>{''}</SelectInput.Option>
                      { AgeOptions() }
                    </SelectInput>
                  </div>
                </div>
                <div className='pt-2'>
                  <Button type='submit'>Edit</Button>
                </div>
              </div>
            </Form>
        </Formik>
      </Panel>

      <Panel>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
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
          initialValues={initialValues}
          onSubmit={handleSubmit}
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
