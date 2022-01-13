import * as React from 'react';
import BaseStep from './base-step';
import Animate from '../../animate';
import Button from '../../inputs/button';
import FloatField from '../../inputs/float-field';

import useConfirmAccount from './confirm-account';

import {
  FormikProps,
  useFormikContext
} from 'formik'

import RegistrationInput from '../type';

const ConfirmAccount = (props) => {
  const { values, errors } = useFormikContext(); 
  const [ confirmAccount, { loading } ] = useConfirmAccount();

  const canGoNext = !!values.confirmationToken && !errors.confirmationToken

  function checkCode(){
    confirmAccount({variables: { confirmationToken: values.confirmationToken }}).then( (resp) => {
      props.onNext();
    });
  }
  
  return (
    <BaseStep
      title='One last thing.'
      stepString={'4/4'}
      innerContent={(
        <>
          <FloatField name='confirmationToken' id='confirmationToken' label='Confirmation Code' type='text'/>
          <Animate animation=''>
            <div className='text-sm text-gray-500 mt-8' >
              <p className='mt-2'>
                Check your email for the confirmation code we sent you. 
              </p>
            </div>
          </Animate>
        </>
      )}
      actionContent={(
        <div className='flex flex-col gap-2'>
          { canGoNext && (
            <div className='w-full'>
              <Animate animation='pulse animate__infinite'>
                <Button onClick={checkCode} className='w-full'>Confirm</Button>
              </Animate>
            </div>
          ) }
          <Button disabled className='w-full bg-gray-300'>Cancel</Button>
        </div>
      )}
    />
  )
}
export default ConfirmAccount;
