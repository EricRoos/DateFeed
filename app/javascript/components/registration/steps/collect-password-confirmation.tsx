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

const CollectPasswordConfirmation = (props) => {
  const { values, errors } : FormikProps<RegistrationInput> = useFormikContext(); 

  const canGoNext = !!values.passwordConfirmation && !errors.passwordConfirmation

  return (
    <BaseStep
      title='Just to confirm.'
      stepString={'3/4'}
      innerContent={(
        <>
          <FloatField name='passwordConfirmation' id='passwordConfirmation' label='Re-Enter Password' type='password'/>
          <Animate animation=''>
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

export default CollectPasswordConfirmation;
