import * as React from 'react';
import BaseStep from './base-step';
import Animate from '../../animate';
import Button from '../../inputs/button';
import FloatField from '../../inputs/float-field';

import {
  FormikProps,
  useFormikContext
} from 'formik'


import RegistrationInput from '../type';

const CollectPassword = (props) => {
  const { values, errors } : FormikProps<RegistrationInput> = useFormikContext(); 

  const canGoNext = !!values.password && !errors.password;

  return (
    <BaseStep
      title='Security things'
      stepString={'2/4'}
      innerContent={(
        <>
          <FloatField name='password' id='password' label='Password' type='password'/>
          <Animate animation=''>
            <div className='text-sm text-gray-500 mt-8' >
              <ul>
                <li>At least 6 characters</li>
              </ul>
            </div>
          </Animate>
        </>
      )}
      actionContent={(
        <div className='flex flex-col gap-2'>
        <div className='w-full'>
          { canGoNext && (
              <Animate animation='pulse animate__infinite'>
                <Button onClick={props.onNext} className='w-full'>Next</Button>
              </Animate>
          ) }
          { !canGoNext && (
              <Button disabled className='w-full opacity-25'>Next</Button>
          ) }
        </div>
        <Button onClick={props.onBack} className='w-full bg-gray-300'>Cancel</Button>
        </div>
      )}
    />
  );
};

export default CollectPassword;
