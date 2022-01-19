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

const CollectEmail = (props) => {
  const { values, errors } : FormikProps<RegistrationInput> = useFormikContext(); 

  const canGoNext = !!values.email && !errors.email;

  return (
    <BaseStep
      title='First...'
      stepString={'1/4'}
      innerContent={(
        <>
          <FloatField name='email' id='email' label='Email' type='email'/>
          <Animate animation=''>
            <div className='text-sm text-gray-500 mt-8' >
              <p className=''>
                So that we can keep in touch about important things, we need a valid email.
              </p>
              <p className='mt-2'>
                We promise we won't bug you with spam. Or sell your information. Just notifications that you can control in your account panel after you finish signup.
              </p>
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

export default CollectEmail;
